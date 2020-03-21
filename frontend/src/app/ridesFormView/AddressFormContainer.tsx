import { Button, makeStyles, TextField, Theme } from "@material-ui/core";
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { Controller, ErrorMessage, useFormContext } from "react-hook-form";
import { getCurrentErrors, getFullName } from "../../formFunctions";
import AddressAutocomplete from "./AddressAutocomplete";

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

export type Contact = {
  "street": string,
  "houseNumber": string
  "city": string
  "zipCode": string
  "country": string
  "description": string
}

type Props = StandardProps & {
  errorPath: (string | number)[]
  baseName?: string
};

const AddressFormContainer: React.FC<Props> = ({ baseName = '', errorPath = [], ...others }) => {
  const classes = useStyles();
  const { register, formState, control, errors, setValue } = useFormContext();
  const [showAddressForm, setShowAddressForm] = useState(false);

  const names = useMemo(() => ({
    street: getFullName(baseName, 'street'),
    houseNumber: getFullName(baseName, 'houseNumber'),
    city: getFullName(baseName, 'city'),
    zipCode: getFullName(baseName, 'zipCode'),
    country: getFullName(baseName, 'country'),
    description: getFullName(baseName, 'description'),
  }), [baseName]);

  const currentErrors = useMemo(() => getCurrentErrors(errorPath, errors) as Contact, [errorPath, errors]);

  const handleSelect = (googleAddress: any) => {
    const address = {
      city: googleAddress.locality || googleAddress.political  || googleAddress.administrative_area_level_2 || '',
      street: googleAddress.route || googleAddress.locality || '',
      houseNumber: googleAddress.street_number || googleAddress.town_square || googleAddress.premise || '',
      zipCode: googleAddress.postal_code || '',
      country: "Czech republic",
    };

    setShowAddressForm(true);

    // we need set values after address form rendering
    setTimeout(() => {
      setValue(baseName, address)
    }, 100);
  };

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>

      {!showAddressForm && (
        <>
          <AddressAutocomplete onSelect={handleSelect}
                               error={formState.isSubmitted && !showAddressForm}/>
          <Button onClick={() => setShowAddressForm(true)}>Zadat adresu ručně</Button>
        </>
      )}

      {showAddressForm && (
        <>
          <div className={classes.row}>
            <Controller as={TextField}
                        name={names.street}
                        error={Boolean(currentErrors.street)}
                        label="Ulice"
                        rules={{ required: "Vyplňte název ulice" }}
                        helperText={<ErrorMessage errors={currentErrors} name={names.street}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
                        className={classes.marginRight}
            />

            <Controller as={TextField}
                        name={names.houseNumber}
                        error={Boolean(currentErrors.houseNumber)}
                        label="Číslo domu"
                        rules={{ required: "Vyplňte číslo domu" }}
                        helperText={<ErrorMessage errors={currentErrors} name={names.houseNumber}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
            />
          </div>

          <div className={classes.row}>
            <Controller as={TextField}
                        name={names.city}
                        error={Boolean(currentErrors.city)}
                        label="Město"
                        rules={{ required: "Vyplňte název města" }}
                        helperText={<ErrorMessage errors={currentErrors} name={names.city}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
                        className={classes.marginRight}

            />

            <Controller as={TextField}
                        name={names.zipCode}
                        error={Boolean(currentErrors.zipCode)}
                        label="PSČ"
                        rules={{ required: "Vyplňte PSČ" }}
                        helperText={<ErrorMessage errors={currentErrors} name={names.zipCode}/>}
                        control={control}
                        defaultValue=""
                        fullWidth
            />
          </div>

          <input type="hidden" name="country" ref={register}/>

        </>
      )}

      <div className={classes.filler}/>

      <Controller as={TextField}
                  name={names.description}
                  label="Doplňující popis (nepovinné)"
                  control={control}
                  defaultValue=""
                  multiline
      />
    </div>
  )
};

export default AddressFormContainer;
