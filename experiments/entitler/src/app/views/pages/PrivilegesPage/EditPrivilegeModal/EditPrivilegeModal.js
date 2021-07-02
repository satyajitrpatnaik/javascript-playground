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

const EditPrivilegeModal = ({
  privilege,
  savePrivilege,
  open,
  handleClose,
  setMessageProps,
}) => {
  const classes = useStyles();
  const { appValue } = useAppValue();
  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  const [defaultValues, setDefaultValues] = React.useState({});
  React.useEffect(() => {
    setDefaultValues({
      privilegeName: privilege?.name,
      latestRecord:
        privilege?.latest_record && privilege.latest_record === "Y"
          ? true
          : false,
    });
  }, [privilege]);

  const resetForm = () => reset(defaultValues);

  const submitHandler = (data) => {
    const { privilegeName, latestRecord } = data;
    savePrivilege({
      variables: {
        id: Number(privilege.id),
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
      .finally(() => handleClose());
  };

  return (
    <Dialog
      className={classes.dialog}
      onClose={handleClose}
      open={open}
      maxWidth={"lg"}
    >
      <DialogTitle>Edit Privilege - "{privilege.name || ""}"</DialogTitle>
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
                defaultValue={defaultValues.privilegeName}
              />
              {formState.errors.privilegeName && (
                <span style={{ color: "red" }}>
                  {formState.errors.privilegeName.message}
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

export default EditPrivilegeModal;
