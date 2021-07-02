import React from "react";
import { Button } from "@material-ui/core";

import { useStyles } from "./styles";
import DialogBox from "app/views/shared/components/DialogBox";

const CreateAppDialogOpener = ({
  isCreateAppDialogOpen,
  setIsCreateAppDialogOpen,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => setIsCreateAppDialogOpen(true)}
      >
        Create New App
      </Button>
      <DialogBox
        isOpen={isCreateAppDialogOpen}
        dialogTitle="Create New App"
        handleClose={() => setIsCreateAppDialogOpen(false)}
      >
        {children}
      </DialogBox>
    </div>
  );
};

export default CreateAppDialogOpener;
