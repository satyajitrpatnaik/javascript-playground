import React from "react";
import { Button } from "@material-ui/core";

import { useStyles } from "./styles";
import DialogBox from "app/views/shared/components/DialogBox";

const CreatePrivilegeDialogOpener = ({
  isCreatePrivilegeDialogOpen,
  setIsCreatePrivilegeDialogOpen,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => setIsCreatePrivilegeDialogOpen(true)}
      >
        Create New Privilege
      </Button>
      <DialogBox
        isOpen={isCreatePrivilegeDialogOpen}
        dialogTitle="Create New Privilege"
        handleClose={() => setIsCreatePrivilegeDialogOpen(false)}
      >
        {children}
      </DialogBox>
    </div>
  );
};

export default CreatePrivilegeDialogOpener;
