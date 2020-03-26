import React from 'react';
import {DeliveryRide, RideStatus} from "../../firebase/model";
import {IconButton, Link, makeStyles, TableCell, TableRow,} from "@material-ui/core";
import {format} from 'date-fns'
import {amber, green, lightBlue, red} from '@material-ui/core/colors';
import RideStatusBlock from "./RideStatusBlock";
import {Cancel, PlaceOutlined} from "@material-ui/icons";

const useStyles = makeStyles(({spacing}) => ({
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing(1),
  },
  right: {
    textAlign: 'right'
  },
  [RideStatus.PROCESSING]: {
    borderLeft: `5px solid ${amber[800]}`,
  },
  [RideStatus.ACCEPTED]: {
    borderLeft: `5px solid ${lightBlue[800]}`,
  },
  [RideStatus.WAITING]: {
    borderLeft: `5px solid ${lightBlue[800]}`,
  },
  [RideStatus.ON_BOARD]: {
    borderLeft: `5px solid ${lightBlue[800]}`,
  },
  [RideStatus.COMPLETED]: {
    borderLeft: `5px solid ${green[800]}`,
  },
  [RideStatus.CANCELLED]: {
    borderLeft: `5px solid ${red[800]}`,
  },
  [RideStatus.REJECTED]: {
    borderLeft: `5px solid ${red[800]}`,
  },
}));

type Props = {
  data: DeliveryRide,
  handleCancel: () => void
}

const dateFormat = 'd. M. Y H:mm';
const shortDateFormat = 'H:mm';

const RidesTableRow: React.FC<Props> = ({data, handleCancel}) => {
  const classes = useStyles();

  let attributes: any = {};
  if (data.rideStatus) {
    attributes.className = classes[data.rideStatus]
  }
  return (
    <TableRow {...attributes} key={data.id}>
      <TableCell>
        {
          data.rideStatus &&
          <RideStatusBlock status={data.rideStatus}/>
        }
      </TableCell>
      <TableCell>
        {data.userEmail}
      </TableCell>
      <TableCell>
        {format(new Date(data.created.seconds * 1000), dateFormat)}
      </TableCell>
      <TableCell>
        {
          data.pickupArrivalEstimateAt &&
          format(new Date(data.pickupArrivalEstimateAt.seconds * 1000), shortDateFormat)
        }
      </TableCell>
      <TableCell>
        {
          data.destinationArrivalEstimateAt &&
          format(new Date(data.destinationArrivalEstimateAt.seconds * 1000), shortDateFormat)
        }
      </TableCell>
      <TableCell>
        {
          data.completedAt &&
          format(new Date(data.completedAt.seconds * 1000), shortDateFormat)
        }
      </TableCell>
      <TableCell className={classes.right}>
        {
          data.positionLink &&
          <Link href={data.positionLink} target="_blank">
            <IconButton size="small"><PlaceOutlined/></IconButton>
          </Link>
        }
        {
          data.cancelLink &&
          <IconButton size="small" onClick={handleCancel}><Cancel/></IconButton>
        }
      </TableCell>
    </TableRow>
  );
};

export default RidesTableRow;
