import React from 'react';
import {Alert} from "@material-ui/lab";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

function RideUnavailableView() {
  return (
    <>
      <Alert severity="error">Nelze objednat další svoz. Přečerpán denní limit.</Alert>
      <Grid container justify="center" style={{ marginTop: '16px' }}>
        <Link to="/" style={{textDecoration: 'none'}}>
          <Button variant="outlined" color="primary">Zkusit znovu</Button>
        </Link>
      </Grid>
    </>
  );
}

export default RideUnavailableView;
