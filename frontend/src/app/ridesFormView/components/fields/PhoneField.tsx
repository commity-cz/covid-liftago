import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { Field, FieldProps, useFormState } from 'react-final-form';
import InputMask from "react-input-mask";

export type TextFieldProps = Partial<Omit<MuiTextFieldProps, 'type' | 'onChange'>> & {
  name: string;
  fieldProps?: Partial<FieldProps<any, any>>;
};

export function PhoneField(props: TextFieldProps) {
  const { name, fieldProps, helperText, fullWidth = true, ...rest } = props;

  const formState = useFormState();
  const { errors, submitErrors, submitFailed, modified } = formState;
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    const showError = (!!errors[name] || !!submitErrors) && (submitFailed || (modified && modified[name]));
    setErrorState(showError ? errors[name] || submitErrors[name] : null);
  }, [errors, submitErrors, submitFailed, modified, name]);

  return (
    <Field name={name} {...fieldProps}>
      {({ input: { name, value, onChange, checked, ...restInput } }) => (
        <InputMask
          mask="+999 999 999 999"
          name={name}
          onChange={onChange}
          value={value}
          children={(props: any) => {
            return <MuiTextField {...props}
                                 type="tel"
                                 fullWidth={fullWidth}
                                 helperText={!!errorState ? errorState : helperText}
                                 error={!!errorState}
                                 name={name}
                                 inputProps={{ ...restInput }}
                                 {...rest}/>
          }}
        />

      )}
    </Field>
  );
}
