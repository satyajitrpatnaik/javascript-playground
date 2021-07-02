import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, Grid, TextField, Hidden, IconButton } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";

import { useStyles } from "./styles";
import { GET_ALL_PRIVILEGES_BY_APP_ID } from "app/gql/Queries";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import EditPrivilegeModal from "../EditPrivilegeModal";
import { defaultColDef, columnDefs } from "./colDefs";

const PrivilegesList = ({
  savePrivilege,
  setMessageProps,
  isCreateOrUpdatePrivilegeAllowed,
}) => {
  const classes = useStyles();
  const { appValue } = useAppValue();
  const [isEditPrivilegeModalOpen, setIsEditPrivilegeModalOpen] =
    React.useState(false);
  const [selectedPrivilege, setSelectedPrivilege] = React.useState(null);

  // Interesting Tip: https://github.com/apollographql/apollo-client/issues/5912#issuecomment-587877697
  // That is why variable is not set on the query here, instead it is set where it is invoked.
  const [getPrivileges, { data }] = useLazyQuery(GET_ALL_PRIVILEGES_BY_APP_ID);

  const [gridApi, setGridApi] = React.useState(null);

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
    if (appValue) {
      getPrivileges({ variables: { appId: String(appValue?.id) } });
    }
  }, [getPrivileges, appValue]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>List of Existing Privileges</h2>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="privilege-search-text"
            className={classes.privilegeSearchTextField}
            label="Filter..."
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
                  getPrivileges({ variables: { appId: String(appValue?.id) } })
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
                  getPrivileges({ variables: { appId: String(appValue?.id) } })
                }
                disabled={appValue === ""}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Hidden>
          {isCreateOrUpdatePrivilegeAllowed() && (
            <>
              <Hidden smDown>
                <Grid item xs={6}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setIsEditPrivilegeModalOpen(true)}
                    fullWidth
                    disabled={
                      selectedPrivilege === null ||
                      selectedPrivilege === undefined
                    }
                  >
                    Edit Privilege
                  </Button>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Grid item xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    color="primary"
                    onClick={() => setIsEditPrivilegeModalOpen(true)}
                    disabled={
                      selectedPrivilege === null ||
                      selectedPrivilege === undefined
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
      {isCreateOrUpdatePrivilegeAllowed() && (
        <h5 className={classes.text}>
          Tap on a row below to enable edit privilege button.
        </h5>
      )}
      <div className={classNames("ag-theme-alpine", classes.grid)}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={data?.Privileges || []}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={() => {
            const selectedPrivileges = gridApi.getSelectedRows();
            setSelectedPrivilege(selectedPrivileges[0]);
          }}
        ></AgGridReact>
      </div>
      {isEditPrivilegeModalOpen && selectedPrivilege && (
        <EditPrivilegeModal
          savePrivilege={savePrivilege}
          privilege={selectedPrivilege}
          open={true}
          handleClose={() => {
            setIsEditPrivilegeModalOpen(false);
            setSelectedPrivilege(null);
            gridApi.deselectAll();
          }}
          setMessageProps={setMessageProps}
        />
      )}
    </div>
  );
};

export default PrivilegesList;
