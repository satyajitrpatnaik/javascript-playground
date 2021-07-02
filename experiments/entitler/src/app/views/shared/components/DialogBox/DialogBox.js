import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";

const DialogBox = ({ isOpen, handleClose, dialogTitle, children }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.dialog}
      onClose={handleClose}
      open={isOpen}
      maxWidth={"lg"}
    >
      <DialogTitle>
        <Typography>{dialogTitle}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <hr />
      <DialogContent className={classes.dialogBody}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogBox;
