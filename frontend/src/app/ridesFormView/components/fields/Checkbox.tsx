import {Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, FormControlLabel} from '@material-ui/core';
import React from 'react';
import {Field, FieldProps} from 'react-final-form';

export type CheckboxProps = Partial<Omit<MuiCheckboxProps, 'onChange'>> & {
  name: string;
  label: string;
  fieldProps?: Partial<FieldProps<any, any>>;
};

export function Checkbox(props: CheckboxProps) {
  const {name, fieldProps, label, ...rest} = props;

  return (
    <Field name={name} type="checkbox" {...fieldProps}>
      {({input: {name, value, onChange, checked, ...restInput}}) => (
        <FormControlLabel
          control={
            <MuiCheckbox
              onChange={onChange}
              name={name}
              value={value}
              inputProps={{...restInput}}
              {...(rest as any)}
            />
          }
          label={label}
        />

      )}
    </Field>
  );
}
