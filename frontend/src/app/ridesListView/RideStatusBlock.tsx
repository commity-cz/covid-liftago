import React from 'react';
import {RideStatus, statusName} from "../../firebase/model";
import {makeStyles, Typography} from "@material-ui/core";
import RideStatusIcon from "./RideStatusIcon";
import {amber, green, lightBlue, red} from "@material-ui/core/colors";
import classNames from "classnames";

const useStyles = makeStyles(({spacing}) => ({
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing(1),
  },
  [RideStatus.PROCESSING]: {
    color: amber[800],
  },
  [RideStatus.ACCEPTED]: {
    color: lightBlue[800],
  },
  [RideStatus.WAITING]: {
    color: lightBlue[800],
  },
  [RideStatus.ON_BOARD]: {
    color: lightBlue[800],
  },
  [RideStatus.COMPLETED]: {
    color: green[800],
  },
  [RideStatus.CANCELLED]: {
    color: red[800],
  },
  [RideStatus.REJECTED]: {
    color: red[800],
  },
}));

type Props = {
  status: RideStatus
}

const RideStatusBlock: React.FC<Props> = ({status}) => {
  const classes = useStyles();

  return (
    <Typography className={classes.status}>
      <RideStatusIcon status={status} className={classNames(classes.icon, classes[status])}/>
      {statusName[status]}
    </Typography>
  );
};

export default RideStatusBlock;
