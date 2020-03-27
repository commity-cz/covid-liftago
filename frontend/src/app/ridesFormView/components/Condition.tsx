import React from "react";
import { Field } from "react-final-form";

type Props = StandardProps & {
  fieldName: string,
  condition: (value: any) => boolean
  children: React.ReactNode
};

export const When: React.FC<Props> = ({ fieldName, condition , children }) => (
  <Field name={fieldName} subscription={{ value: true }}>
    {({ input: { value } }) => (condition(value) ? children : null)}
  </Field>
)
