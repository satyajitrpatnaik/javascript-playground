import React from "react";
import { useLazyQuery } from "@apollo/client";
import classNames from "classnames";
import { AgGridReact } from "ag-grid-react";
import { Button, Grid, Hidden, IconButton, TextField } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import EditIcon from "@material-ui/icons/Edit";

import { GET_SITES } from "app/gql/Queries";
import { defaultColDef, columnDefs } from "./colDefs";
import { useStyles } from "./styles";
import EditSiteModal from "../EditSiteModal";

const SitesList = ({
  saveSite,
  setMessageProps,
  isCreateOrUpdateSiteAllowed,
}) => {
  const classes = useStyles();

  const [getSites, { data }] = useLazyQuery(GET_SITES, {
    fetchPolicy: "cache-and-network",
  });
  const [gridApi, setGridApi] = React.useState(null);
  const [selectedSite, setSelectedSite] = React.useState(null);
  const [isEditSiteModalOpen, setIsEditSiteModalOpen] = React.useState(false);

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
    getSites();
  }, [getSites]);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <div className={classes.root}>
      <h2 className={classes.text}>List of Sites</h2>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            id="site-search-text"
            className={classes.searchTextField}
            label="Filter ..."
            size="small"
            variant="filled"
            onChange={(e) => gridApi.setQuickFilter(e.target.value)}
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
                onClick={getSites}
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
                onClick={getSites}
              >
                <RefreshIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Hidden>
          {isCreateOrUpdateSiteAllowed() && (
            <>
              <Hidden smDown>
                <Grid item xs={6}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => setIsEditSiteModalOpen(true)}
                    fullWidth
                    disabled={
                      selectedSite === null || selectedSite === undefined
                    }
                  >
                    Edit Site
                  </Button>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Grid item xs={6}>
                  <IconButton
                    className={classes.iconButton}
                    color="primary"
                    onClick={() => setIsEditSiteModalOpen(true)}
                    disabled={
                      selectedSite === null || selectedSite === undefined
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
      {isCreateOrUpdateSiteAllowed() && (
        <h5 className={classes.text}>
          Tap on a row below to enable edit site button.
        </h5>
      )}
      <div className={classNames("ag-theme-alpine", classes.grid)}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={(data && data.Sites) || []}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="single"
          onSelectionChanged={() => {
            const selectedSites = gridApi.getSelectedRows();
            setSelectedSite(selectedSites[0]);
          }}
        ></AgGridReact>
      </div>
      {isEditSiteModalOpen && selectedSite && (
        <EditSiteModal
          site={selectedSite}
          saveSite={saveSite}
          setMessageProps={setMessageProps}
          open={true}
          handleClose={() => {
            setIsEditSiteModalOpen(false);
            setSelectedSite(null);
            gridApi.deselectAll();
          }}
        />
      )}
    </div>
  );
};

export default SitesList;
