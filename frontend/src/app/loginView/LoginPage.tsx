import React, {FormEvent, useState} from 'react';
import {Button, Grid, makeStyles, Paper, TextField, Theme} from '@material-ui/core';
import {Face, Fingerprint} from '@material-ui/icons'

const useStyles = makeStyles(({ spacing }: Theme) => ({
  margin: {
    margin: spacing(2),
  },
  padding: {
    padding: spacing()
  }
}));

type Props = {
  errorMessage?: string;
  onSubmit: (email: string, password: string) => void;
};

const LoginPage: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleForm}>
      <Paper className={classes.padding}>
          <div className={classes.margin}>
              <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                      <Face />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                      <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email" type="email" fullWidth autoFocus required />
                  </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                      <Fingerprint />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                      <TextField value={password} onChange={e => setPassword(e.target.value)} label="Heslo" type="password" fullWidth required />
                  </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Button variant="outlined" color="primary" type="submit" style={{ textTransform: "none" }}>Login</Button>
              </Grid>
          </div>
      </Paper>
    </form>
  );
};

export default LoginPage;
