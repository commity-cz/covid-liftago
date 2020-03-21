import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import classNames from 'classnames';
import React, {useMemo} from 'react';
import {Controller, ErrorMessage, useFormContext} from "react-hook-form";
import {getCurrentErrors, getFullName} from "../../formFunctions";

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
