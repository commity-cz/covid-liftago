import React, {useContext} from 'react';
import {AppBar, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {FirebaseContext} from "../../firebase";
import {ExitToApp} from '@material-ui/icons';
import UserContext from "../../user/context";

const useStyles = makeStyles(({spacing}: Theme) => ({
  title: {
    flexGrow: 1,
  },
  spaceBottom: {
    marginBottom: spacing(2)
  },
  icon: {
    cursor: 'pointer'
  }
}));

function Header() {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  return (
      <AppBar position="static" className={classes.spaceBottom}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>App Bar</Typography>
          {
            user &&
              <ExitToApp className={classes.icon} onClick={_ => firebase?.doSignOut()}/>
          }
        </Toolbar>
      </AppBar>
  );
}

export default Header;
