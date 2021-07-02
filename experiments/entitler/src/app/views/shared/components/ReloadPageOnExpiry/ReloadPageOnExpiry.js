import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";

import { MAX_EXPIRY_IN_MILLISECONDS } from "app/utils/constants/usual-suspects";
import { useStyles } from "./styles";

const ReloadPageOnExpiry = ({ maxExpiry = MAX_EXPIRY_IN_MILLISECONDS }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, maxExpiry);
    // maxExpiry react prop will be reset to the initial value on reload
    // because of re-render of the component
  }, [maxExpiry]);

  return (
    <Dialog
      className={classes.root}
      onClose={() => setIsOpen(false)}
      open={isOpen}
      disableBackdropClick={true}
    >
      <DialogTitle>Session Expired!</DialogTitle>
      <hr />
      <DialogContent className={classes.dialogBody}>
        <Typography variant="body2">
          Your session has expired. Please reload the UI to start a fresh
          session.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setIsOpen(false);
            window.location.reload();
          }}
        >
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReloadPageOnExpiry;
