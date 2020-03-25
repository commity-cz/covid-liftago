import React from 'react';
import {DeliveryRide} from "../../firebase/model";
import {
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

const RidesTable: React.FC<Props> = ({items}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.title}>Seznam rozvozů</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Vytvořeno</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{(new Date(item.created.seconds * 1000)).toLocaleString('cs-cz')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RidesTable;
