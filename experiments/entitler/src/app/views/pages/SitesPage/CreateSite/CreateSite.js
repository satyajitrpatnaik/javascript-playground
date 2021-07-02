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
  siteCode: yup
    .string()
    .required("Site Code is required.")
    .matches(/^\S*$/, "Site name cannot contain any whitespace characters.")
    .matches(
      /^[A-Za-z]*$/,
      "Site name cannot contain any special characters and numbers."
    ),
  factoryName: yup.string().required("Factory name is required."),
  latestRecord: yup.bool(),
});

const CreateSite = ({ saveSite, setMessageProps, onClose = () => {} }) => {
  const classes = useStyles();

  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const submitHandler = ({ siteCode, factoryName, latestRecord }) => {
    saveSite({
      variables: {
        siteCode,
        factoryName,
        latestRecord: latestRecord ? "Y" : "N",
      },
    })
      .then((response) => {
        setMessageProps({
          isOpen: true,
          message: `The "${response.data.saveSite.siteCode}" site has been created successfully with Site ID ${response.data.saveSite.id}.`,
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
      siteCode: "",
      factoryName: "",
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
              name="siteCode"
              control={control}
              render={({ field, formState }) => (
                <TextField
                  id="site-code-text"
                  className={classes.textField}
                  variant="filled"
                  label="Site Code"
                  error={!!formState.errors?.siteCode}
                  {...field}
                />
              )}
              defaultValue=""
            />
            {formState.errors.siteCode && (
              <div style={{ color: "red" }}>
                {formState.errors.siteCode.message}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="factoryName"
              control={control}
              render={({ field }) => (
                <TextField
                  id="factory-name-text"
                  className={classes.textField}
                  variant="filled"
                  label="Factory Name"
                  error={!!formState.errors?.factoryName}
                  {...field}
                />
              )}
              defaultValue=""
            />
            {formState.errors.factoryName && (
              <div style={{ color: "red" }}>
                {formState.errors.factoryName.message}
              </div>
            )}
          </Grid>
          <Grid item xs={12}>
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
              Create Site
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateSite;
