import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { makeRequired, TextField } from "mui-rff";
import React from 'react';
import * as yup from "yup";
import { PhoneField } from "./fields/PhoneField";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export const contactSchema = yup.object().shape({
  name: yup.string().required('Vyplňte celé jméno'),
  phoneNumber: yup.string()
    .required("Vyplňte telefonní číslo ve formátu +420 777 123 456")
    .matches(/\+\d\d\d \d\d\d \d\d\d \d\d\d/, "Telefonní číslo zadejte ve formátu +420 777 123 456"),
  company: yup.string(),
});

export type Contact = yup.InferType<typeof contactSchema>

const required = makeRequired(contactSchema);

type Props = StandardProps & {
  name: string
};

const ContactFormContainer: React.FC<Props> = ({ name, ...others }) => {
  const classes = useStyles();

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>

      <TextField
        label="Jméno a příjmení / Firma / Místo"
        name={`${name}.name`}
        required={required.name}
      />

      <PhoneField
        label="Telefonní číslo"
        name={`${name}.phoneNumber`}
        required={required.phoneNumber}
      />

      <TextField
        label="Společnost (nepovinné)"
        name={`${name}.company`}
        required={required.company}
      />

    </div>
  )

};

export default ContactFormContainer;
