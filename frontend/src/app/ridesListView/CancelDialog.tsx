import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

type Props = {
  open: boolean,
  handleClose: () => void,
  handleCancel: () => void,
};

const CancelDialog: React.FC<Props> = ({open, handleClose, handleCancel}) => {
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
        <Button onClick={handleCancel} color="primary">
          Ano
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default CancelDialog
