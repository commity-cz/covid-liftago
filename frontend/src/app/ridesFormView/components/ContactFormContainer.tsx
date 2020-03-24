import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { TextField } from "mui-rff";
import React from 'react';
import { PhoneField } from "./PhoneField";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

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
        // TODO required={true}
      />

      <PhoneField
        label="Telefonní číslo"
        name={`${name}.phoneNumber`}
        // TODO required={true} ￿￿
      />

      <TextField
        label="Společnost (nepovinné)"
        name={`${name}.company`}
      />

    </div>
  )

};

export default ContactFormContainer;
