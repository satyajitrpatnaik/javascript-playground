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

const EditSiteModal = ({
  site,
  saveSite,
  open,
  handleClose,
  setMessageProps,
}) => {
  const classes = useStyles();
  const [defaultValues, setDefaultValues] = React.useState({});

  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    setDefaultValues({
      siteCode: site?.siteCode,
      factoryName: site?.factoryName,
      latestRecord:
        site?.latest_record && site.latest_record === "Y" ? true : false,
    });
  }, [site]);

  const resetForm = () => reset(defaultValues);

  const submitHandler = (data) => {
    const { siteCode, factoryName, latestRecord } = data;
    saveSite({
      variables: {
        id: Number(site.id),
        siteCode,
        factoryName,
        latestRecord: latestRecord ? "Y" : "N",
      },
    })
      .then((response) => {
        console.log(response);
        setMessageProps({
          isOpen: true,
          message: `The site "${response.data.saveSite.siteCode}" has been updated successfully.`,
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
      <DialogTitle>Edit Site - "{site.siteCode || ""}"</DialogTitle>
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
                name="siteCode"
                control={control}
                render={({ field, formState }) => (
                  <TextField
                    id="site-code-text"
                    variant="filled"
                    label="Site Code"
                    fullWidth
                    error={!!formState.errors?.siteCode}
                    {...field}
                  />
                )}
                defaultValue={defaultValues.siteCode}
              />
              {formState.errors.siteCode && (
                <span style={{ color: "red" }}>
                  {formState.errors.siteCode.message}
                </span>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="factoryName"
                control={control}
                render={({ field, formState }) => (
                  <TextField
                    id="factory-name-text"
                    variant="filled"
                    label="Factory Name"
                    fullWidth
                    error={!!formState.errors?.factoryName}
                    {...field}
                  />
                )}
                defaultValue={defaultValues.factoryName}
              />
              {formState.errors.factoryName && (
                <span style={{ color: "red" }}>
                  {formState.errors.factoryName.message}
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
              UPDATE SITE
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSiteModal;
