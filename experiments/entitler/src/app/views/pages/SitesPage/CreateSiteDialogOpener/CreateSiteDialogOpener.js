import React from "react";
import { Button } from "@material-ui/core";

import DialogBox from "app/views/shared/components/DialogBox";
import { useStyles } from "./styles";

const CreateSiteDialogOpener = ({
  isCreateSiteDialogOpen,
  setIsCreateSiteDialogOpen,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={() => setIsCreateSiteDialogOpen(true)}
      >
        Create New Site
      </Button>
      <DialogBox
        isOpen={isCreateSiteDialogOpen}
        dialogTitle="Create New Site"
        handleClose={() => setIsCreateSiteDialogOpen(false)}
      >
        {children}
      </DialogBox>
    </div>
  );
};

export default CreateSiteDialogOpener;
