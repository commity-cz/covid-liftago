import { Button, CircularProgress, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { AlternateEmail } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import { makeValidate } from "mui-rff";
import React from 'react';
import { Form } from "react-final-form";
import * as yup from "yup";
import { TextField } from "../ridesFormView/components/fields/TextField";

const useStyles = makeStyles(({ spacing, zIndex }: Theme) => ({
  margin: {
    margin: spacing(2),
  },
  buttonRow: {
    marginTop: spacing(2),
  },
  paper: {
    padding: spacing(),
    margin: '0 auto',
    maxWidth: 500,
  },
  backdrop: {
    zIndex: zIndex.drawer + 1,
  },
}));

export const formSchema = yup.object().shape({
  email: yup.string()
    .required('Vyplňte email')
    .email('Vyplňte platný email'),
});

const validate = makeValidate(formSchema);

type Props = {
  errorMessage: string | null;
  onSubmit: (userData: any) => void;
};

const PasswordResetForm: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={classes.margin} noValidate>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={1}/>
              <Grid item xs={11}>
                <Typography gutterBottom variant="h5" component="h2">
                  Zapomenuté heslo
                </Typography>

                <Typography variant="body2" color="textSecondary" component="p">
                  Zadejte váš přihlašovací email. <br/>Na něj vám zašleme odkaz pro změnu hesla.
                </Typography>
              </Grid>
            </Grid>


            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={1}/>
              <Grid item xs={11}>
                {
                  errorMessage &&
                  <Alert severity="error">{errorMessage}</Alert>
                }
              </Grid>
            </Grid>


            <Grid container spacing={2} alignItems="flex-end">
              <Grid item xs={1}>
                <AlternateEmail/>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Email"
                  name='email'
                  type="email"
                  fullWidth
                  autoFocus
                  required/>
              </Grid>
            </Grid>

            <Grid className={classes.buttonRow} container spacing={2} justify="flex-end" alignItems={"flex-end"}>
              <Grid item xs={6}>
                <Button variant="outlined" color="primary" type="submit" style={{ textTransform: "none" }}
                        disabled={submitting || pristine}
                        fullWidth>
                  {submitting ? <CircularProgress size={20} color="inherit"/>
                    : "Obnovit heslo"
                  }
                </Button>

              </Grid>
            </Grid>
          </form>
        )}/>
    </Paper>

  );
};

export default PasswordResetForm;
