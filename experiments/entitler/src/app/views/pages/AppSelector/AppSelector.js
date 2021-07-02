import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useLazyQuery } from "@apollo/client";

import { useStyles } from "./styles";
import { GET_ALL_APPS } from "app/gql/Queries";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import { useCurrentUser } from "app/views/shared/providers/UserProvider";
import { STARTS_WITH_ACCESSMANAGER_VIEW } from "app/utils/constants/entitlements";

const AppSelector = () => {
  const classes = useStyles();
  const [entitledApps, setEntitledApps] = React.useState([]);
  const { appValue, setAppValue } = useAppValue(); // from AppValue context provider
  const { currentUser } = useCurrentUser(); // from User context provider

  // fetching apps and filtering based on the privileges of the current logged in user
  const [getAllApps] = useLazyQuery(GET_ALL_APPS, {
    onCompleted: (data) => {
      const entitledAppStrings = currentUser?.privileges
        .filter((privilege) =>
          String(privilege).startsWith(STARTS_WITH_ACCESSMANAGER_VIEW)
        )
        .map((privilege) => privilege.split("_")[2].toLowerCase());
      if (data?.Apps && entitledAppStrings && entitledAppStrings.length > 0) {
        const filteredListOfApps = data.Apps.filter((app) => {
          return entitledAppStrings.includes(String(app.name));
        });
        setEntitledApps(filteredListOfApps);
        setAppValue(filteredListOfApps[0] ?? "NoApp"); // Setting the first item as default selected, else "NoApp" is set as value.
      } else {
        setAppValue("NoApp"); // Setting value as "NoApp" in case the current user has no app assigned to it using Privileges like "ACCESSMANAGER_VIEW_ACCESSMANAGER"
      }
    },
    onError: (error) => {
      console.error(error);
      throw new Error(
        "Please make sure you are connected to the network and try again."
      );
    },
  });

  React.useEffect(() => {
    // Query for all apps only when /users/me is successful in UserProvider
    if (currentUser) {
      getAllApps();
    }
  }, [currentUser, getAllApps]);

  return (
    <div className={classes.appSelector}>
      {entitledApps?.length > 0 && (
        <FormControl variant="filled" fullWidth>
          <InputLabel id="app-select-label">Application</InputLabel>
          <Select
            labelId="app-select-label"
            id="app-select-input"
            label="Application"
            defaultValue=""
            value={appValue}
            onChange={(e) => setAppValue(e.target.value)}
          >
            {entitledApps.map((app) => (
              <MenuItem value={app} key={app.id}>
                {app.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default AppSelector;
