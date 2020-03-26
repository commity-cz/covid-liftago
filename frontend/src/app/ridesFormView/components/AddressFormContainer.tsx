import { Button, makeStyles, Theme } from "@material-ui/core";
import classNames from 'classnames';
import { makeRequired, TextField } from "mui-rff";
import React from 'react';
import { useFormState } from "react-final-form";
import * as yup from "yup";
import { When } from "./Condition";
import AddressAutocomplete from "./fields/AddressAutocomplete";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
  },
  row: {
    display: 'flex',
  },
  filler: {
    flex: 1,
  },
  marginRight: {
    marginRight: theme.spacing(1)
  }
}));

export const addressSchema = yup.object().shape({
  street: yup.string().required('Vyplňte název ulice'),
  houseNumber: yup.string().required('Vyplňte číslo domu'),
  city: yup.string().required('Vyplňte název města'),
  zipCode: yup.string().required('Vyplňte PSČ')
    .matches(/\d\d\d ?\d\d/, 'Vyplňte PSČ ve formátu 123 45'),
  country: yup.string().required(),
  description: yup.string(),
});

export type Address = yup.InferType<typeof addressSchema>

const required = makeRequired(addressSchema);

type Props = StandardProps & {
  name: string
  updateAddress: (address: any) => void
};

const truthy = Boolean;
const falsy = (v: any) => !Boolean(v);

const AddressFormContainer: React.FC<Props> = ({ name, updateAddress, ...others }) => {
  const classes = useStyles();
  const {errors, submitFailed} = useFormState({subscription: {errors: true, submitFailed: true}});
  const hasError = submitFailed && Boolean(errors[`${name}.country`]);

  const handleManualSelection = () => {
    const address = {
      country: "Czech republic",
    };

    updateAddress(address);
  };

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>

      <When fieldName={`${name}.country`} condition={falsy}>
        <>
          <AddressAutocomplete onSelect={updateAddress} error={hasError}/>
          <Button onClick={() => handleManualSelection()}>Zadat adresu ručně</Button>
        </>
      </When>

      <When fieldName={`${name}.country`} condition={truthy}>
        <div className={classes.row}>

          <TextField
            label="Ulice"
            name={`${name}.street`}
            required={required.street}
            className={classes.marginRight}
            fullWidth
          />

          <TextField
            label="Číslo domu"
            name={`${name}.houseNumber`}
            required={required.houseNumber}
            fullWidth
          />
        </div>

        <div className={classes.row}>

          <TextField
            label="Město"
            name={`${name}.city`}
            required={required.city}
            className={classes.marginRight}
            fullWidth
          />

          <TextField
            label="PSČ"
            name={`${name}.zipCode`}
            required={required.zipCode}
            fullWidth
            className={classes.marginRight}
          />

        </div>

      </When>

      <div className={classes.filler}/>

      <TextField
        label="Doplňující popis (nepovinné)"
        name={`${name}.description`}
        required={required.description}
        multiline
      />

    </div>
  )
};

export default AddressFormContainer;
