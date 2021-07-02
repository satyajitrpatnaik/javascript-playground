import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useStyles } from "./styles";

const validationSchema = yup.object().shape({
  appName: yup
    .string()
    .required("App Name is required.")
    .matches(/^\S*$/, "App name cannot contain any whitespace characters.")
    .matches(/^[A-Za-z]*$/, "App name cannot contain any special characters."),
  appDescription: yup.string().required("App Description is required."),
  latestRecord: yup.bool(),
});

const EditAppModal = ({ app, saveApp, open, handleClose, setMessageProps }) => {
  const classes = useStyles();
  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const [defaultValues, setDefaultValues] = React.useState({});
  React.useEffect(() => {
    setDefaultValues({
      appName: app?.name,
      appDescription: app?.desc,
      latestRecord:
        app?.latest_record && app.latest_record === "Y" ? true : false,
    });
  }, [app]);

  const resetForm = () => reset(defaultValues);

  const submitHandler = (data) => {
    const { appName, appDescription, latestRecord } = data;
    saveApp({
      variables: {
        id: Number(app.id),
        name: appName,
        desc: appDescription,
        latest_record: latestRecord ? "Y" : "N",
      },
    })
      .then((response) => {
        console.log(response);
        setMessageProps({
          isOpen: true,
          message: `${response.data.saveApp.name} has been edited successfully.`,
          severity: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        setMessageProps({
          isOpen: true,
          message: `Error Occurred : ${error.message}`,
          severity: "error",
        });
      })
      .finally(() => handleClose());
  };

  return (
    <Dialog
      className={classes.dialog}
      onClose={handleClose}
      open={open}
      maxWidth={"lg"}
    >
      <DialogTitle>Edit App - "{app.name || ""}"</DialogTitle>
      <hr />
      <DialogContent className={classes.dialogBody}>
        <form
          onSubmit={handleSubmit(submitHandler)}
          autoComplete="off"
          noValidate
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Controller
                name="appName"
                control={control}
                render={({ field, formState }) => (
                  <TextField
                    id="app-name-text"
                    variant="filled"
                    label="App Name"
                    fullWidth
                    error={!!formState.errors?.appName}
                    {...field}
                  />
                )}
                defaultValue={defaultValues.appName}
              />
              {formState.errors.appName && (
                <span style={{ color: "red" }}>
                  {formState.errors.appName.message}
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="appDescription"
                control={control}
                render={({ field, formState }) => (
                  <TextField
                    id="app-description-text"
                    variant="filled"
                    label="App Description"
                    fullWidth
                    error={!!formState.errors?.appDescription}
                    {...field}
                  />
                )}
                defaultValue={defaultValues.appDescription}
              />
              {formState.errors.appDescription && (
                <span style={{ color: "red" }}>
                  {formState.errors.appDescription.message}
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="latestRecord"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={field.value}
                        {...field}
                      />
                    }
                    label="Latest Record"
                  />
                )}
                defaultValue={defaultValues.latestRecord}
              />
            </Grid>
          </Grid>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={handleClose} color="default">
              CANCEL
            </Button>
            <Button onClick={resetForm} color="default">
              RESET
            </Button>
            <Button type="submit" color="primary">
              UPDATE APP
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppModal;
