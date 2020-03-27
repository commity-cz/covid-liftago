import React from "react";
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {Link} from "react-router-dom";

const useStyles = makeStyles(({spacing}) => ({
  title: {
    marginBottom: spacing(2)
  },
  link: {
    textDecoration: 'none',
  }
}));

const RidesTableTitle: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container justify="space-between" alignItems="center" className={classes.title}>
      <Grid item>
        <Typography variant="h4">Přehled rozvozů</Typography>
      </Grid>
      <Grid item>
        <Link to="/" className={classes.link}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Zadat nový rozvoz
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
};

export default RidesTableTitle;
