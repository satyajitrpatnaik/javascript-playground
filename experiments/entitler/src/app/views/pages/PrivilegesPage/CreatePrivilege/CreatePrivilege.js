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
import { useAppValue } from "app/views/shared/providers/AppValueProvider";

const validationSchema = yup.object().shape({
  privilegeName: yup
    .string()
    .required("Privilege name is required.")
    .matches(
      /^\S*$/,
      "Privilege name cannot contain any whitespace characters."
    ),
  latestRecord: yup.string().required(),
});

const CreatePrivilege = ({
  savePrivilege,
  setMessageProps,
  onClose = () => {},
}) => {
  const classes = useStyles();
  const { appValue } = useAppValue();

  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () =>
    reset({
      privilegeName: "",
      latestRecord: true,
    });

  const submitHandler = ({ privilegeName, latestRecord }) => {
    savePrivilege({
      variables: {
        name: privilegeName,
        appId: Number(appValue?.id),
        latestRecord: latestRecord ? "Y" : "N",
      },
    })
      .then((response) => {
        setMessageProps({
          isOpen: true,
          message: `The privilege "${response.data.savePrivilege.name}" has been created successfully with ID ${response.data.savePrivilege.id}.`,
          severity: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        setMessageProps({
          isOpen: true,
          message: `Error Occurred: ${error.message}`,
          severity: "error",
        });
      })
      .finally(() => onClose());
  };

  return (
    <div className={classes.root}>
      <form
        onSubmit={handleSubmit(submitHandler)}
        autoComplete="off"
        noValidate
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Controller
              name="privilegeName"
              control={control}
              render={({ field, formState }) => (
                <TextField
                  id="privilege-name-text"
                  variant="filled"
                  label="Privilege Name"
                  fullWidth
                  error={!!formState.errors?.privilegeName}
                  {...field}
                />
              )}
              defaultValue=""
            />
            {formState.errors.privilegeName && (
              <span style={{ color: "red" }}>
                {formState.errors.privilegeName.message}
              </span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={4}>
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
              defaultValue={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={3}>
            <Button
              variant="contained"
              style={{ width: "150px" }}
              onClick={resetForm}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "260px" }}
              type="submit"
            >
              Create Privilege
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreatePrivilege;
