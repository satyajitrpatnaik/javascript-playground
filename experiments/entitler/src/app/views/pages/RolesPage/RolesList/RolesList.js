import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, TextField, Grid, Hidden, IconButton } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";

import { useStyles } from "./styles";
import { GET_ROLES_BY_APP_ID } from "app/gql/Queries";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import EditRoleModal from "../EditRoleModal";
import { defaultColDef, columnDefs } from "./GridColDefs";

const RolesList = ({
  saveRole,
  setMessageProps,
  isCreateOrUpdateRoleAllowed,
}) => {
  const classes = useStyles();
  const [gridApi, setGridApi] = React.useState(null);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState(null);
  const { appValue } = useAppValue();

  const [getRoles, { data }] = useLazyQuery(GET_ROLES_BY_APP_ID);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const handleWindowResize = React.useCallback(
    (event) => {
      if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    },
    [gridApi]
  );

  React.useEffect(() => {
    if (appValue) getRoles({ variables: { appId: String(appValue?.id) } });
  }, [getRoles, appValue]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>List of Existing Roles</h2>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="role-search-text"
            className={classes.roleSearchTextField}
            label="Filter ..."
            variant="filled"
            size="small"
            onChange={(e) => gridApi.setQuickFilter(e.target.value)} // https://www.ag-grid.com/javascript-grid/filter-quick/
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          md={6}
          justify="flex-end"
          spacing={2}
        >
          <Hidden smDown>
            <Grid item xs={6}>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() =>
                  getRoles({ variables: { appId: String(appValue?.id) } })
                }
                disabled={appValue === ""}
                fullWidth
              >
                Refresh
              </Button>
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={6}>
              <IconButton
                className={classes.iconButton}
                color="primary"
                onClick={() =>
                  getRoles({ variables: { appId: String(appValue?.id) } })
                }
                disabled={appValue === ""}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Hidden>
          {isCreateOrUpdateRoleAllowed() && (
            <>
              <Hidden smDown>
                <Grid item xs={6}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setIsEditRoleModalOpen(true)}
                    fullWidth
                    disabled={
                      selectedRole === null || selectedRole === undefined
                    }
                  >
                    Edit Role
                  </Button>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Grid item xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    color="primary"
                    onClick={() => setIsEditRoleModalOpen(true)}
                    disabled={
                      selectedRole === null || selectedRole === undefined
                    }
                  >
                    <EditIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Hidden>
            </>
          )}
        </Grid>
      </Grid>
      {isCreateOrUpdateRoleAllowed() && (
        <h5 className={classes.text}>
          Tap on a row below to enable edit role button.
        </h5>
      )}
      <div className={classNames("ag-theme-alpine", classes.grid)}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={data?.Roles || []}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={() => {
            const selectedRows = gridApi.getSelectedRows();
            setSelectedRole(selectedRows[0]);
          }}
        ></AgGridReact>
      </div>
      {isEditRoleModalOpen && selectedRole && (
        <EditRoleModal
          saveRole={saveRole}
          role={selectedRole}
          open={isEditRoleModalOpen}
          handleClose={() => {
            setIsEditRoleModalOpen(false);
            setSelectedRole(null);
            gridApi.deselectAll();
          }}
          setMessageProps={setMessageProps}
        />
      )}
    </div>
  );
};

export default RolesList;
