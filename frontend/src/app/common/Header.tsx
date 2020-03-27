import { AppBar, IconButton, makeStyles, Theme, Toolbar } from "@material-ui/core";
import { ExitToApp, HelpOutline } from '@material-ui/icons';
import classNames from "classnames";
import React, { useContext } from 'react';
import { FirebaseContext } from "../../firebase";
import UserContext from "../../user/context";

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  root: {
    marginBottom: spacing(2),
    background: "#FFFFFF"
  },
  filler: {
    flexGrow: 1,
  }
}));

const Header: React.FC<StandardProps> = ({ className, ...others }) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);

  return (
    <AppBar position="static" {...others} color={"transparent"} className={classNames(className, classes.root)}>
      <Toolbar>
        <img src="logo.svg" height={48} alt="Logo Dobrovoz"/>
        <div className={classes.filler}/>
        <IconButton href="https://docs.google.com/document/d/1uzV6UMqLd-VrlBVdAopFtxVz9sHHRz3KkMuWPnBxFiI/"
                    target="_blank" color="inherit"
                    title={"Manuál pro uživatele"}>
          <HelpOutline/>
        </IconButton>
        {
          user &&
          <IconButton onClick={_ => firebase?.doSignOut()} title={"Odhlásit"} color="inherit">
            <ExitToApp/>
          </IconButton>
        }
      </Toolbar>
    </AppBar>
  );
}

export default Header;
