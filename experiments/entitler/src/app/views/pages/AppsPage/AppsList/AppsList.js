import React from "react";
import { useLazyQuery } from "@apollo/client";
import { Button, Grid, Hidden, IconButton, TextField } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";

import { GET_ALL_APPS } from "app/gql/Queries";
import { useStyles } from "./styles";
import EditAppModal from "../EditAppModal";
import { defaultColDef, columnDefs } from "./colDefs";

const AppsList = ({ saveApp, setMessageProps, isCreateOrUpdateAppAllowed }) => {
  const classes = useStyles();
  const [getApps, { data }] = useLazyQuery(GET_ALL_APPS, {
    fetchPolicy: "cache-and-network",
  });
  const [gridApi, setGridApi] = React.useState(null);
  const [selectedApp, setSelectedApp] = React.useState(null);
  const [isEditAppModalOpen, setIsEditAppModalOpen] = React.useState(false);

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
    // params.api.setDomLayout('autoHeight'); // uncomment if auto height of grid is needed
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
    getApps();
  }, [getApps]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>List of Existing Apps</h2>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="app-search-text"
            className={classes.appSearchTextField}
            label="Filter ..."
            size="small"
            variant="filled"
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
                onClick={getApps}
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
                onClick={getApps}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Hidden>
          {isCreateOrUpdateAppAllowed() && (
            <>
              <Hidden smDown>
                <Grid item xs={6}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setIsEditAppModalOpen(true)}
                    fullWidth
                    disabled={selectedApp === null || selectedApp === undefined}
                  >
                    Edit App
                  </Button>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Grid item xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    color="primary"
                    onClick={() => setIsEditAppModalOpen(true)}
                    disabled={selectedApp === null || selectedApp === undefined}
                  >
                    <EditIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Hidden>
            </>
          )}
        </Grid>
      </Grid>
      {isCreateOrUpdateAppAllowed() && (
        <h5 className={classes.text}>
          Tap on a row below to enable edit app button.
        </h5>
      )}
      <div className={classNames("ag-theme-alpine", classes.grid)}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={(data && data.Apps) || []}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={() => {
            const selectedApps = gridApi.getSelectedRows();
            setSelectedApp(selectedApps[0]);
          }}
        ></AgGridReact>
      </div>
      {isEditAppModalOpen && selectedApp && (
        <EditAppModal
          app={selectedApp}
          saveApp={saveApp}
          setMessageProps={setMessageProps}
          open={true}
          handleClose={() => {
            setIsEditAppModalOpen(false);
            setSelectedApp(null);
            gridApi.deselectAll();
          }}
        />
      )}
    </div>
  );
};

export default AppsList;
