import { TextField } from '@material-ui/core';
import { TextFieldProps } from "@material-ui/core/TextField/TextField";
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Controller, ErrorMessage, useFormContext } from "react-hook-form";
import InputMask, { Props as InputMaskProps } from 'react-input-mask';
import { getFullName, hasError } from "../../formFunctions";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

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

  return (
    <div {...others}
         className={classNames(classes.root, others.className)}>
      <Controller as={TextField}
                  name={names.name}
                  error={hasError(errors, names.name)}
                  rules={{ required: "Vyplňte celé jméno" }}
                  label="Jméno a příjmení / Firma / Místo"
                  control={control}
                  defaultValue=""
                  helperText={<ErrorMessage errors={errors} name={names.name}/>}
      />

      <Controller as={InputMask as React.ComponentType<InputMaskProps & TextFieldProps>}
                  mask="+999 999 999 999"
                  name={names.phoneNumber}
                  label="Telefonní číslo"
                  error={hasError(errors, names.phoneNumber)}
                  rules={{
                    required: "Vyplňte telefonní číslo ve formátu +420 777 123 456",
                    pattern: {
                      value: /\+\d\d\d \d\d\d \d\d\d \d\d\d/,
                      message: "Telefonní číslo zadejte ve formátu +420 777 123 456"
                    }
                  }}
                  control={control}
                  defaultValue="+420"
                  children={(props: any) => {
                    return <TextField {...props}
                                      type="tel"
                                      helperText={<ErrorMessage errors={errors} name={names.phoneNumber}/>}
                    />
                  }}
      />

      <Controller as={TextField}
                  name={names.company}
                  label="Společnost (nepovinné)"
                  control={control}
                  defaultValue=""
      />
    </div>
  )

};

export default ContactFormContainer;
