import {Grid, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import {Controller, useFormContext} from "react-hook-form";
import { getFullName } from "../../formFunctions";
import ContactFormContainer, {Contact} from "./ContactFormContainer";

const useStyles = makeStyles(() => ({
  root: {},
  row: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

type Stop = {
  noteForDriver: string,
  location: any,
  contact: Contact
}

type Props = StandardProps & {
  errorPath: (string | number)[]
  baseName?: string
};

const StopFormContainer: React.FC<Props> = ({ baseName = '', errorPath = [], ...others }) => {
  const classes = useStyles();
  const { control } = useFormContext();

  const names = useMemo(() => ({
    contact: getFullName(baseName, 'contact'),
    locationAddress: getFullName(baseName, 'location.address'),
    noteForDriver: getFullName(baseName, 'noteForDriver')
  }), [baseName]);

  return (

    <Grid  {...others}
           className={classNames(classes.root, others.className)} container spacing={3}>

      <Grid item xs={12} md={6}>
        <ContactFormContainer baseName={names.contact} errorPath={[...errorPath, 'contact']}/>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* TODO address ￿*/}
        <ContactFormContainer baseName={names.locationAddress} errorPath={[...errorPath, 'location', 'address']}/>
      </Grid>

      <Grid item xs={12} className={classes.row}>
        <Controller as={TextField}
                    name={names.noteForDriver}
                    label="Poznámka pro řidiče"
                    control={control}
                    defaultValue=""
        />
      </Grid>


    </Grid>
  )
};

export default StopFormContainer;
