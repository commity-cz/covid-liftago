import {makeStyles, TextField, Theme} from "@material-ui/core";
import classNames from 'classnames';
import React, {useMemo} from 'react';
import {Controller, ErrorMessage, useFormContext} from "react-hook-form";
import {getCurrentErrors, getFullName} from "../../formFunctions";
import AddressAutocomplete from "./AddressAutocomplete";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
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
  const { control, errors } = useFormContext();

  const names = useMemo(() => ({
    street: getFullName(baseName, 'street'),
    houseNumber: getFullName(baseName, 'houseNumber'),
    city: getFullName(baseName, 'city'),
    zipCode: getFullName(baseName, 'zipCode'),
    country: getFullName(baseName, 'country'),
    description: getFullName(baseName, 'description'),
  }), [baseName]);

  const currentErrors = useMemo(() => getCurrentErrors(errorPath, errors) as Contact, [errorPath, errors]);

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>

      <AddressAutocomplete onSelect={console.log}/>

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
