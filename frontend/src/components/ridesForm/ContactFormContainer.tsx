import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { Path, pathOr } from 'ramda';
import React, { useMemo } from 'react';
import { Controller, ErrorMessage, useFormContext } from "react-hook-form";
import { getCurrentErrors, getFullName } from "../../formFunctions";

const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export type Contact = {
  name: string,
  email: string
  company: string
  phoneNumber: string
}

type Props = StandardProps & {
  errorPath: (string | number)[]
  baseName?: string
};

const ContactFormContainer: React.FC<Props> = ({ baseName = '', errorPath = [], ...others }) => {
  const classes = useStyles();
  const { control, errors } = useFormContext();

  const names = useMemo(() => ({
    name: getFullName(baseName, 'name'),
    email: getFullName(baseName, 'email'),
    phoneNumber: getFullName(baseName, 'phoneNumber'),
    company: getFullName(baseName, 'company'),
  }), [baseName]);

  const currentErrors = useMemo(() => getCurrentErrors(errorPath, errors) as Contact, [errorPath, errors]);

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>
      <Controller as={TextField}
                  name={names.name}
                  error={Boolean(currentErrors.name)}
                  rules={{ required: "Vyplňte celé jméno" }}
                  label="Jméno a příjmení"
                  control={control}
                  defaultValue=""
                  helperText={<ErrorMessage errors={currentErrors} name={names.name}/>}
      />

      <Controller as={TextField}
                  name={names.email}
                  error={Boolean(currentErrors.email)}
                  label="Email"
                  rules={{
                    required: "Vyplňte email",
                    pattern: {value: EMAIL_REGEXP, message: 'Zadejte platný email'}
                  }}
                  helperText={<ErrorMessage errors={currentErrors} name={names.email}/>}
                  type="email"
                  control={control}
                  defaultValue=""
      />

      <Controller as={TextField}
                  name={names.phoneNumber}
                  error={Boolean(currentErrors.phoneNumber)}
                  label="Telefonní číslo"
                  rules={{ required: "Vyplňte telefonní číslo ve formátu +420 777 123 456" }}
                  helperText={errors.phoneNumber ? <ErrorMessage errors={currentErrors}
                                                                 name={names.phoneNumber}/> : "Telefonní číslo zadejte ve formátu +420 777 123 456"}
                  type="tel"
                  control={control}
                  defaultValue=""
      />

      <Controller as={TextField}
                  name={names.company}
                  label="Společnost"
                  control={control}
                  defaultValue=""
      />
    </div>
  )
};

export default ContactFormContainer;
