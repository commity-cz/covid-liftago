import React from 'react';
import {Link, makeStyles, Theme, Typography} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles(({spacing}: Theme) => ({
  container: {
    margin: `${spacing(2)}px 0`,
    textAlign: 'center'
  }
}));

const Footer: React.FC<StandardProps> = ({ className }) => {
  const classes = useStyles();

  return (
    <Typography variant="caption" className={classNames(className, classes.container)}>
      vytvořili <Link href="https://commity.cz/" target="_blank">Commity</Link>
    </Typography>
  );
};

export default Footer;
