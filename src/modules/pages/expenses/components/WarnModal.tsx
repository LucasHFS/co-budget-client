import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const WarnModal = ({open, handleClose, title, body, action}: any) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
        <Button onClick={action.handle}>{action.text}</Button>
      </DialogActions>
    </Dialog>
  )
}
