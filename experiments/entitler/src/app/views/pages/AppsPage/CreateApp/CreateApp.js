import React from "react";
import {
  Grid,
  Button,
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

const CreateApp = ({ saveApp, setMessageProps, onClose = () => {} }) => {
  const classes = useStyles();
  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const submitHandler = ({ appName, appDescription, latestRecord }) => {
    saveApp({
      variables: {
        name: appName,
        desc: appDescription,
        latest_record: latestRecord ? "Y" : "N",
      },
    })
      .then((response) => {
        setMessageProps({
          isOpen: true,
          message: `${response.data.saveApp.name} has been created successfully with App ID ${response.data.saveApp.id}.`,
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
      .finally(() => onClose());
  };

  const resetForm = () =>
    reset({
      appName: "",
      appDescription: "",
      latestRecord: true,
    });

  return (
    <div className={classes.root}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        autoComplete="off"
        noValidate
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Controller
              name="appName"
              control={control}
              render={({ field, formState }) => (
                <TextField
                  id="app-name-text"
                  className={classes.textField}
                  variant="filled"
                  label="App Name"
                  error={!!formState.errors?.appName}
                  {...field}
                />
              )}
              defaultValue=""
            />
            {formState.errors.appName && (
              <div style={{ color: "red" }}>
                {formState.errors.appName.message}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="appDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  id="app-description-text"
                  className={classes.textField}
                  variant="filled"
                  label="App Description"
                  error={!!formState.errors?.appDescription}
                  {...field}
                />
              )}
              defaultValue=""
            />
            {formState.errors.appDescription && (
              <div style={{ color: "red" }}>
                {formState.errors.appDescription.message}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="latestRecord"
              control={control}
              render={({ field, formState }) => (
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
              defaultValue={true}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={resetForm}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Create App
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateApp;
