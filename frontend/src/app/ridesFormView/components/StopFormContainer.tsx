import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { TextField } from "mui-rff";
import React from 'react';
import * as yup from "yup";
import { StopKind } from "../../../model";
import AddressFormContainer, { addressSchema } from "./AddressFormContainer";
import ContactFormContainer, { contactSchema } from "./ContactFormContainer";

const useStyles = makeStyles(() => ({
  root: {},
  row: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export const stopSchema = yup.object().shape({
  stopId: yup.string().required(),
  contact: contactSchema,
  location: yup.object().shape({
    address: addressSchema
  }),
  noteForDriver: yup.string(),
  kind: yup.string().oneOf(["PICKUP", "DESTINATION", "FALLBACK_DESTINATION"]),
});

type Props = StandardProps & {
  kind: StopKind
  name: string
  updateValues: (path: string, value: any) => void
};

const StopFormContainer: React.FC<Props> = ({ kind, name, updateValues, ...others }) => {
  const classes = useStyles();
  const addressName = `${name}.location.address`;

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
        />

      </Grid>

    </Grid>
  )
};

export default StopFormContainer;
