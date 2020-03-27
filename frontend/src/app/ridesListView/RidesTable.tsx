import React, {useContext, useEffect, useState} from 'react';
import {DeliveryRide} from "../../firebase/model";
import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@material-ui/core";
import RidesTableTitle from "./RidesTableTitle";
import RidesTableRow from "./RidesTableRow";
import CancelDialog from "./CancelDialog";
import {FirebaseContext} from "../../firebase";
import {Alert, Color} from "@material-ui/lab";
import {useParams} from "react-router-dom";
import {pathOr} from "ramda";

const useStyles = makeStyles(({spacing}) => ({
  table: {
    minWidth: 650,
  },
  spaceBottom: {
    marginBottom: spacing(2),
  }
}));

type Props = {
  items: DeliveryRide[]
}

type AlertData = {
  severity: Color;
  message: string;
}

const useCancel = () => {
  const [open, setOpenState] = useState(false);
  const [rideId, setRideId] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [processing, setProcessing] = useState(false);
  const firebase = useContext(FirebaseContext);

  const setOpen = (rideId: string) => {
    setOpenState(true);
    setRideId(rideId);
  };
  const setClose = () => setOpenState(false);
  const cancelRide = () => {
    if (rideId) {
      setProcessing(true);
      firebase?.cancelDeliveryRide(rideId)
        .then(() => {
          setAlert({severity: 'success', message: 'Rozvoz úspěšně zrušen.'})

          setTimeout(() => {
            setAlert(null)
          }, 5000);
        })
        .catch(error => setAlert({severity: 'error', message: error.message}))
        .finally(() => {
          setOpenState(false);
          setProcessing(false);
        })
    }
  };

  return {
    alert,
    open,
    setOpen,
    setClose,
    cancelRide,
    processing
  }
};

const messageTexts = {
  'added': 'Úspěšně odesláno'
};

const RidesTable: React.FC<Props> = ({items}) => {
  const classes = useStyles();
  const {message} = useParams();
  const [messageText, setMessageText] = useState();
  const {alert, open, setOpen, setClose, cancelRide, processing} = useCancel();

  useEffect(() => {
    if (message) {
      setMessageText(pathOr(null, [message], messageTexts));

      setTimeout(() => {
        setMessageText(null)
      }, 5000);
    }
  }, [message]);

  return (
    <>
      {
        messageText &&
        <Alert severity="success" className={classes.spaceBottom}>{messageText}</Alert>
      }
      <RidesTableTitle/>
      {
        alert &&
          <Alert severity={alert.severity} className={classes.spaceBottom}>{alert.message}</Alert>
      }
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
            {items.map(item => <RidesTableRow data={item} key={item.id} handleCancel={setOpen} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <CancelDialog open={open} handleClose={setClose} handleCancel={cancelRide} processing={processing} />
    </>
  );
};

export default RidesTable;
