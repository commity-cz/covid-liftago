import {Grid, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import React from 'react';
import {Controller, useFormContext} from "react-hook-form";
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

  return (

    <Grid  {...others}
           className={classNames(classes.root, others.className)} container spacing={3}>

      <Grid item xs={12} md={6}>
        <ContactFormContainer baseName="contact" errorPath={['contact']}/>
      </Grid>
      <Grid item xs={12} md={6}>
        {/* TODO address ￿*/}
        <ContactFormContainer baseName="location.address" errorPath={['location', 'address']}/>
      </Grid>

      <Grid item xs={12} className={classes.row}>
        <Controller as={TextField}
                    name="noteForDriver"
                    label="Poznámka pro řidiče"
                    control={control}
                    defaultValue=""
        />
      </Grid>


    </Grid>
  )
};

export default StopFormContainer;
