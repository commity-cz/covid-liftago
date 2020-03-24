import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { update } from "ramda";
import React from 'react';
import { StopKind } from "../../../model";
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
  kind: StopKind
  name: string
  updateValues: (path: string, value: any) => void
};

const StopFormContainer: React.FC<Props> = ({ kind, name, updateValues, ...others }) => {
  const classes = useStyles();
  const addressName = `${name}.location.address`

  return (

    <Grid  {...others}
           className={classNames(classes.root, others.className)} container spacing={3}>

      <Grid item xs={12} md={6}>
        <ContactFormContainer name={`${name}.contact`}/>
      </Grid>
      <Grid item xs={12} md={6}>
        <AddressFormContainer name={addressName} updateAddress={(value) => updateValues(addressName, value)}/>
      </Grid>

      <Grid item xs={12} className={classes.row}>

        <TextField
          label={kind === StopKind.PICKUP ? "Instrukce na místě vyzvednutí (nepovinné)" : "Instrukce na místě doručení (nepovinné)"}
          name={`${name}.noteForDriver`}
          // TODO required={true}
        />

      </Grid>

    </Grid>
  )
};

export default StopFormContainer;
