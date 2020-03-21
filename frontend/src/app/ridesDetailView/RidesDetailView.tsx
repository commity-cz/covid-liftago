import React from 'react';
import {Alert} from "@material-ui/lab";
import {Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";

function RidesDetailView() {
  return (
    <>
      <Alert severity="success">Úspěšně odesláno</Alert>
      <Grid container justify="center" style={{ marginTop: '16px' }}>
        <Link to="/" style={{textDecoration: 'none'}}>
          <Button variant="outlined" color="primary">Objednat nový svoz</Button>
        </Link>
      </Grid>
    </>
  );
}

export default RidesDetailView;
