import React from "react";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { cloneDeep } from "lodash";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useStyles } from "./styles";
import PrivilegesSelector from "app/views/pages/RolesPage/PrivilegesSelector";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import RoleTypeSelector from "../RoleTypeSelector";
import SitePdlUsersInput from "app/views/pages/RolesPage/SitePdlUsersInput";
import SitePdlUserView from "app/views/pages/RolesPage/SitePdlUserView";

const validationSchema = yup.object().shape({
  roleName: yup
    .string()
    .required("Role name is required.")
    .matches(/^\S*$/, "Role name cannot contain any whitespace characters."),
  roleTypeId: yup
    .number()
    .required("Role type is required.")
    .typeError("Choose one from available Role Types."),
  privilegeIds: yup.array(),
  sitePdlsAndUsers: yup.object(),
  latestRecord: yup.bool().required(),
});

const CreateRole = ({ saveRole, setMessageProps, onClose = () => {} }) => {
  const classes = useStyles();
  const { appValue } = useAppValue();

  const { control, handleSubmit, formState, reset, getValues, setValue } =
    useForm({
      mode: "onBlur",
      resolver: yupResolver(validationSchema),
    });

  const resetForm = () =>
    reset({
      roleName: "",
      roleTypeId: "",
      privilegeIds: [],
      sitePdlsAndUsers: {},
      latestRecord: true,
    });

  const submitHandler = ({
    roleName,
    roleTypeId,
    privilegeIds,
    sitePdlsAndUsers,
    latestRecord,
  }) => {
    let pdlsSiteMap = [];
    if (sitePdlsAndUsers.pdlsSiteMap) {
      pdlsSiteMap = sitePdlsAndUsers.pdlsSiteMap.map((item) => {
        return {
          pdllist: item.pdllist,
          latest_record: item.latest_record,
          siteid: Number(item.site.id),
        };
      });
    }
    let siteUsers = [];
    if (sitePdlsAndUsers.siteUser) {
      siteUsers = sitePdlsAndUsers.siteUser.map((item) => {
        return {
          userId: Number(item.user.id),
          siteId: Number(item.site.id),
        };
      });
    }
    let mutationVariables = {
      variables: {
        role: {
          name: roleName,
          domainId: Number(appValue?.id),
          latest_record: latestRecord ? "Y" : "N",
          roleTypeId,
          pdlsSiteMap,
        },
        privilegeIds,
        siteUsers,
      },
    };
    saveRole(mutationVariables)
      .then((response) => {
        setMessageProps({
          isOpen: true,
          message: `The role "${response.data.saveRole.name}" has been created successfully with ID ${response.data.saveRole.id}.`,
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

  const addUser = (user, site) => {
    let sitePdlsAndUsers = cloneDeep(getValues("sitePdlsAndUsers"));
    if (
      sitePdlsAndUsers.siteUser &&
      sitePdlsAndUsers.siteUser.find(
        (item) =>
          item.user.id === user.id && item.site.siteCode === site.siteCode
      ) === undefined
    ) {
      sitePdlsAndUsers.siteUser.push({ user, site });
    } else {
      sitePdlsAndUsers.siteUser = [{ user, site }];
    }
    setValue("sitePdlsAndUsers", sitePdlsAndUsers);
  };

  const addPdl = (pdllist, site) => {
    let sitePdlsAndUsers = cloneDeep(getValues("sitePdlsAndUsers")); // immutably to trigger re-render
    let pdlObject = {
      pdllist: pdllist,
      latest_record: "Y",
      site: site,
    };
    if (
      sitePdlsAndUsers.pdlsSiteMap &&
      sitePdlsAndUsers.pdlsSiteMap.find(
        (item) =>
          item.pdllist === pdllist && item.site.siteCode === site.siteCode
      ) === undefined
    ) {
      sitePdlsAndUsers.pdlsSiteMap.push(pdlObject);
    } else {
      sitePdlsAndUsers.pdlsSiteMap = [pdlObject];
    }
    setValue("sitePdlsAndUsers", sitePdlsAndUsers);
  };

  const handlePdlDelete = (pdllist, siteCode) => {
    let sitePdlsAndUsers = cloneDeep(getValues("sitePdlsAndUsers"));
    let index = sitePdlsAndUsers.pdlsSiteMap.findIndex((item) => {
      return item.pdllist === pdllist && item.site.siteCode === siteCode;
    });
    if (index >= 0) sitePdlsAndUsers.pdlsSiteMap.splice(index, 1);
    setValue("sitePdlsAndUsers", sitePdlsAndUsers);
  };

  const handleUserDelete = (userId, siteCode) => {
    let sitePdlsAndUsers = cloneDeep(getValues("sitePdlsAndUsers"));
    let index = sitePdlsAndUsers.siteUser.findIndex((item) => {
      return item.user.id === userId && item.site.siteCode === siteCode;
    });
    if (index >= 0) sitePdlsAndUsers.siteUser.splice(index, 1);
    setValue("sitePdlsAndUsers", sitePdlsAndUsers);
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
              name="roleName"
              control={control}
              render={({ field, formState }) => (
                <TextField
                  id="role-name-text"
                  variant="filled"
                  label="Role Name"
                  fullWidth
                  error={!!formState.errors?.roleName}
                  {...field}
                />
              )}
              defaultValue=""
            />
            {formState.errors.roleName && (
              <span style={{ color: "red" }}>
                {formState.errors.roleName.message}
              </span>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="roleTypeId"
              control={control}
              render={({ field, formState }) => (
                <RoleTypeSelector field={field} formState={formState} />
              )}
              defaultValue=""
            />
            {formState.errors.roleTypeId && (
              <span style={{ color: "red" }}>
                {formState.errors.roleTypeId.message}
              </span>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Controller
              name="privilegeIds"
              control={control}
              render={({ field }) => <PrivilegesSelector field={field} />}
              defaultValue={[]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="latestRecord"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  className={classes.checkbox}
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
          <Grid item xs={12}>
            <SitePdlUsersInput addUser={addUser} addPdl={addPdl} />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sitePdlsAndUsers"
              control={control}
              render={({ field }) => (
                <SitePdlUserView
                  field={field}
                  handlePdlDelete={handlePdlDelete}
                  handleUserDelete={handleUserDelete}
                />
              )}
              defaultValue={{}}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} lg={2}>
            <Button
              variant="contained"
              style={{ width: "150px" }}
              onClick={resetForm}
            >
              Reset
            </Button>
          </Grid>
          <Grid item xs={12} md={3} lg={2}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "200px" }}
              type="submit"
            >
              Create Role
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateRole;
