import { Button, Grid, Link, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { AlternateEmail, Fingerprint } from '@material-ui/icons'
import { Alert } from "@material-ui/lab";
import React, { FormEvent, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const useStyles = makeStyles(({ spacing }: Theme) => ({
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
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

type Props = {
  errorMessage: string | null;
  onSubmit: (email: string, password: string) => void;
};

const LoginPage: React.FC<Props> = ({ onSubmit, errorMessage }) => {
  const classes = useStyles();
  let query = useQuery();
  const passwordReset = query.get('reset')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleForm}>
      <Paper className={classes.paper}>
        {
          passwordReset &&
          <Alert severity="info">Na Váš email byl zaslán odkaz pro změnu hesla.</Alert>
        }
        {
          errorMessage &&
          <Alert severity="error">{errorMessage}</Alert>
        }
        <div className={classes.margin}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={1}>
              <AlternateEmail/>
            </Grid>
            <Grid item xs={11}>
              <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email" type="email" fullWidth
                         autoFocus required/>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={1}>
              <Fingerprint/>
            </Grid>
            <Grid item xs={11}>
              <TextField value={password} onChange={e => setPassword(e.target.value)} label="Heslo" type="password"
                         fullWidth required/>
            </Grid>
          </Grid>
          <Grid className={classes.buttonRow} container spacing={2} justify="space-between" alignItems={"flex-end"}>
            <Grid item xs={1}/>
            <Grid item xs={5}>
              <RouterLink to="/password-reset"><Link variant="body2">Zapomenuté heslo</Link></RouterLink>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="primary" type="submit" style={{ textTransform: "none" }}
                      fullWidth>Login</Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </form>
  );
};

export default LoginPage;
