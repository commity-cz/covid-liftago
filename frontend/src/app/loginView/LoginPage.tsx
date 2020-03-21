import React from 'react';
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

function LoginPage() {
  const classes = useStyles();

  return (
      <Paper className={classes.padding}>
          <div className={classes.margin}>
              <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                      <Face />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                      <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                  </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                      <Fingerprint />
                  </Grid>
                  <Grid item md={true} sm={true} xs={true}>
                      <TextField id="username" label="Password" type="password" fullWidth required />
                  </Grid>
              </Grid>
              <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
              </Grid>
          </div>
      </Paper>
  );
}

export default LoginPage;
