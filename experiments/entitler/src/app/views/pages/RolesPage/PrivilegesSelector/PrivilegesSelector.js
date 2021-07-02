import React from "react";
import { FormControl, TextField, Checkbox } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useLazyQuery } from "@apollo/client";

import { useStyles } from "./styles";
import { GET_ALL_PRIVILEGES_BY_APP_ID } from "app/gql/Queries";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";

const PrivilegesSelector = ({ field }) => {
  const classes = useStyles();
  const { onChange, value: reactHookFormFieldValue } = field;
  const [searchText, setSearchText] = React.useState("");
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const { appValue } = useAppValue();

  const [getPrivilegesByAppID, { data }] = useLazyQuery(
    GET_ALL_PRIVILEGES_BY_APP_ID,
    {
      variables: { appId: String(appValue?.id) },
      skip: appValue === "",
    }
  );

  React.useEffect(() => {
    getPrivilegesByAppID();
  }, [appValue, getPrivilegesByAppID]);

  React.useEffect(() => {
    if (data && data.Privileges) {
      const defaultOptions = data.Privileges.filter((privilege) =>
        reactHookFormFieldValue?.includes(Number(privilege.id))
      );
      setSelectedOptions(defaultOptions);
    }
  }, [reactHookFormFieldValue, data]);

  return (
    <FormControl variant="filled" className={classes.formControl} fullWidth>
      <Autocomplete
        multiple
        freeSolo
        id="select-multiple-privileges"
        options={(data && data.Privileges) || []}
        getOptionLabel={(option) => option && option.name}
        disableCloseOnSelect
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox className={classes.checkbox} checked={selected} />
            {option.name}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Privileges"
            placeholder="Privileges"
            onChange={(event) => setSearchText(event.target.value)}
          />
        )}
        inputValue={searchText}
        noOptionsText="No such privilege!"
        value={selectedOptions}
        onChange={(event, value) => {
          onChange(value.map((val) => Number(val.id)));
          setSelectedOptions(value);
        }}
      />
    </FormControl>
  );
};

export default PrivilegesSelector;
