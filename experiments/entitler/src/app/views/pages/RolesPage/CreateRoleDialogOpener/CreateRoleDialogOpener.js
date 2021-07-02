import React from "react";
import { Button } from "@material-ui/core";

import { useStyles } from "./styles";
import DialogBox from "app/views/shared/components/DialogBox";

const CreateRoleDialogOpener = ({
  isCreateRoleDialogOpen,
  setIsCreateRoleDialogOpen,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => setIsCreateRoleDialogOpen(true)}
      >
        Create New Role
      </Button>
      <DialogBox
        isOpen={isCreateRoleDialogOpen}
        dialogTitle="Create New Role"
        handleClose={() => setIsCreateRoleDialogOpen(false)}
      >
        {children}
      </DialogBox>
    </div>
  );
};

export default CreateRoleDialogOpener;
