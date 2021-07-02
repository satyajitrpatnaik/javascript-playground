import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@material-ui/lab";
import { Backdrop, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { useStyles } from "./styles";

const MessageBox = ({ isOpen, message, severity, handleClose }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <Alert
        variant="filled"
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              handleClose();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Backdrop>
  );
};

MessageBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string,
  severity: PropTypes.string,
  handleClose: PropTypes.func,
};

export default MessageBox;
