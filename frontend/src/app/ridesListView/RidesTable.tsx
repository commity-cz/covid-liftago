import React from 'react';
import {DeliveryRide, statusName} from "../../firebase/model";
import {
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import {format} from 'date-fns'

const useStyles = makeStyles(({spacing}) => ({
  table: {
    minWidth: 650,
  },
  title: {
    marginBottom: spacing(2)
  }
}));

type Props = {
  items: DeliveryRide[]
}

const dateFormat = 'd. M. Y H:mm:ss';

const RidesTable: React.FC<Props> = ({items}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.title}>Seznam rozvozů</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Stav</TableCell>
              <TableCell>Vytvořeno</TableCell>
              <TableCell>Očekávané vyzvednutí</TableCell>
              <TableCell>Očekávané doručení</TableCell>
              <TableCell>Doručeno</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  {
                    item.rideStatus &&
                    statusName[item.rideStatus]
                  }
                </TableCell>
                <TableCell>
                  {format(new Date(item.created.seconds * 1000), dateFormat)}
                </TableCell>
                <TableCell>
                  {
                    item.pickupArrivalEstimateAt &&
                    format(new Date(item.pickupArrivalEstimateAt.seconds * 1000), dateFormat)
                  }
                </TableCell>
                <TableCell>
                  {
                    item.destinationArrivalEstimateAt &&
                    format(new Date(item.destinationArrivalEstimateAt.seconds * 1000), dateFormat)
                  }
                </TableCell>
                <TableCell>
                  {
                    item.completedAt &&
                    format(new Date(item.completedAt.seconds * 1000), dateFormat)
                  }
                </TableCell>
                <TableCell>
                  {
                    item.positionLink &&
                    <Link href={item.positionLink} target="_blank">Mapa</Link>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RidesTable;
