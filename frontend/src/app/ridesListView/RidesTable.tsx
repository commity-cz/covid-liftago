import React, {useState} from 'react';
import {DeliveryRide} from "../../firebase/model";
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@material-ui/core";
import RidesTableTitle from "./RidesTableTitle";
import RidesTableRow from "./RidesTableRow";
import CancelDialog from "./CancelDialog";

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
}));

type Props = {
  items: DeliveryRide[]
}

const useCancelWindow = () => {
  const [open, setOpenState] = useState(false);
  const [link, setLink] = useState(null);

  const setOpen = () => setOpenState(true);
  const setClose = () => setOpenState(false);

  return {
    open,
    setOpen,
    setClose,
  }
};

const RidesTable: React.FC<Props> = ({items}) => {
  const classes = useStyles();
  const {open, setOpen, setClose} = useCancelWindow();

  return (
    <>
      <RidesTableTitle/>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Stav</TableCell>
              <TableCell>Uživatel</TableCell>
              <TableCell>Vytvořeno</TableCell>
              <TableCell>Očekávané vyzvednutí</TableCell>
              <TableCell>Očekávané doručení</TableCell>
              <TableCell>Doručeno</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => <RidesTableRow data={item} handleCancel={setOpen} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <CancelDialog open={open} handleClose={setClose} />
    </>
  );
};

export default RidesTable;
