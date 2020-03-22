import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Controller, ErrorMessage, useFormContext } from "react-hook-form";
import { getFullName, hasError } from "../../formFunctions";
import AddressFormContainer from "./AddressFormContainer";
import ContactFormContainer from "./ContactFormContainer";

const useStyles = makeStyles(() => ({
  root: {},
  row: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

type Props = StandardProps & {
  errorPath: (string | number)[]
  baseName?: string
};

const StopFormContainer: React.FC<Props> = ({ baseName = '', errorPath = [], ...others }) => {
  const classes = useStyles();
  const { control, register, errors } = useFormContext();

  const names = useMemo(() => ({
    contact: getFullName(baseName, 'contact'),
    locationAddress: getFullName(baseName, 'location.address'),
    noteForDriver: getFullName(baseName, 'noteForDriver'),
    stopId: getFullName(baseName, 'stopId'),
    kind: getFullName(baseName, 'kind'),
  }), [baseName]);

  return (

    <Grid  {...others}
           className={classNames(classes.root, others.className)} container spacing={3}>

      <input type="hidden" name={names.stopId} ref={register}/>
      <input type="hidden" name={names.kind} ref={register}/>

      <Grid item xs={12} md={6}>
        <ContactFormContainer baseName={names.contact} errorPath={[...errorPath, 'contact']}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <AddressFormContainer baseName={names.locationAddress} errorPath={[...errorPath, 'location', 'address']}/>
      </Grid>

      <Grid item xs={12} className={classes.row}>
        <Controller as={TextField}
                    name={names.noteForDriver}
                    error={hasError(errors, names.noteForDriver)}
                    label="Poznámka pro řidiče / instrukce na místě (nepovinné)"
                    control={control}
                    rules={{ maxLength: { value: 80, message: "Poznámka může obsahovat maximálně 80 znaků" } }}
                    defaultValue=""
                    helperText={<ErrorMessage errors={errors} name={names.noteForDriver}/>}
        />
      </Grid>

    </Grid>
  )
};

export default StopFormContainer;
