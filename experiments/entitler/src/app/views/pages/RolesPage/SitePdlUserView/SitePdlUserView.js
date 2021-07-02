import React from "react";
import { Tab, Tabs, Grid, Typography, Chip } from "@material-ui/core";

import TabPanel from "app/views/shared/components/TabPanel";
import { useStyles } from "./styles";
import classNames from "classnames";
import { Divider } from "@material-ui/core";

const SitePdlUserView = ({
  field,
  handlePdlDelete,
  handleUserDelete,
  selectedSite,
}) => {
  const classes = useStyles();
  const [sites, setSites] = React.useState([]);
  const [selectedTabValue, setSelectedTabValue] = React.useState(0);

  React.useEffect(() => {
    let existingSites = [];
    let pdls = field.value.pdlsSiteMap || [];
    let siteUsers = field.value.siteUser || [];
    pdls.forEach((pdl) => {
      if (pdl.site) existingSites.push(pdl.site.siteCode);
    });
    siteUsers.forEach((user) => {
      if (user.site) existingSites.push(user.site.siteCode);
    });
    existingSites = existingSites.filter(
      (value, index, self) => self.indexOf(value) === index
    );
    setSites(existingSites);
  }, [field]);

  React.useEffect(() => {
    let index = sites.findIndex((site) => site === selectedSite.siteCode);
    if (index >= 0) {
      setSelectedTabValue(index);
    } else {
      setSelectedTabValue(0);
    }
  }, [sites, selectedSite]);

  if (sites.length === 0) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTabValue}
        onChange={(event, newValue) => setSelectedTabValue(newValue)}
        className={classes.tabs}
      >
        {sites.map((site) => (
          <Tab key={site} label={site} />
        ))}
      </Tabs>
      {sites.map((site, index) => (
        <TabPanel key={site} value={selectedTabValue} index={index}>
          <Grid container direction="column">
            <Grid item className={classes.section}>
              <Typography>PDLs</Typography>
              {field.value.pdlsSiteMap &&
                field.value.pdlsSiteMap.map((pdl) => {
                  if (pdl.site.siteCode === sites[selectedTabValue]) {
                    return (
                      <Chip
                        label={pdl.pdllist}
                        key={pdl.pdllist}
                        color="secondary"
                        className={classNames(classes.chip)}
                        clickable
                        onDelete={() =>
                          handlePdlDelete(pdl.pdllist, sites[selectedTabValue])
                        }
                      />
                    );
                  }
                  return null;
                })}
            </Grid>
            <Divider />
            <Grid item className={classes.section}>
              <Typography>Users</Typography>
              {field.value.siteUser &&
                field.value.siteUser.map((siteUser) => {
                  if (siteUser.site.siteCode === sites[selectedTabValue]) {
                    return (
                      <Chip
                        label={siteUser.user.username}
                        key={siteUser.user.id}
                        color="primary"
                        className={classNames(classes.chip)}
                        clickable
                        onDelete={() =>
                          handleUserDelete(
                            siteUser.user.id,
                            sites[selectedTabValue]
                          )
                        }
                      />
                    );
                  }
                  return null;
                })}
            </Grid>
          </Grid>
        </TabPanel>
      ))}
    </div>
  );
};

export default SitePdlUserView;
