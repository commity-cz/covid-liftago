import React from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(({spacing}) => ({
  wrapper: {
    margin: spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

type Props = {
  open: boolean,
  processing: boolean,
  handleClose: () => void,
  handleCancel: () => void,
};

const CancelDialog: React.FC<Props> = ({open, handleClose, handleCancel, processing}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">Zrušení přepravy</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Opravu chcete zrušit přepravu?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ne
        </Button>
        <div className={classes.wrapper}>
          <Button onClick={handleCancel} disabled={processing} color="primary">
            Ano
          </Button>
          {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </DialogActions>
    </Dialog>
  )
};

export default CancelDialog
