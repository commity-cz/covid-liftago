import React, {useContext} from 'react';
import {AppBar, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {FirebaseContext} from "../../firebase";
import {ExitToApp, HelpOutline} from '@material-ui/icons';
import UserContext from "../../user/context";
import classNames from "classnames";

const useStyles = makeStyles(({spacing}: Theme) => ({
  title: {
    flexGrow: 1,
  },
  spaceBottom: {
    marginBottom: spacing(2)
  },
}));

const Header: React.FC<StandardProps> = ({className, ...others}) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  return (
    <AppBar position="static" {...others} className={classNames(className, classes.spaceBottom)}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>DobroVoz</Typography>
        <IconButton href="https://docs.google.com/document/d/1uzV6UMqLd-VrlBVdAopFtxVz9sHHRz3KkMuWPnBxFiI/" target="_blank" color="inherit">
          <HelpOutline/>
        </IconButton>
        {
          user &&
          <IconButton onClick={_ => firebase?.doSignOut()} color="inherit">
            <ExitToApp/>
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
