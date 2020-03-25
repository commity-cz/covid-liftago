import React from 'react';
import {DeliveryRide} from "../../firebase/model";
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
  items: DeliveryRide[]
}

const RidesTable: React.FC<Props> = ({items}) => {
  const classes = useStyles();

  return (
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
  );
};

export default RidesTable;
