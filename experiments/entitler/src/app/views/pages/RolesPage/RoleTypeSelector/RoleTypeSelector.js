import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { useQuery } from "@apollo/client";

import { useStyles } from "./styles";
import { useAppValue } from "app/views/shared/providers/AppValueProvider";
import { GET_ROLE_TYPES_BY_APP_ID } from "app/gql/Queries";

const RoleTypeSelector = ({ field, formState }) => {
  const classes = useStyles();
  const { appValue } = useAppValue();
  const { data: roleTypeData } = useQuery(GET_ROLE_TYPES_BY_APP_ID, {
    variables: { appId: appValue?.id },
    skip: appValue === "",
  });

  if (!roleTypeData) {
    return null;
  }

  return (
    <FormControl variant="filled" fullWidth className={classes.root}>
      <InputLabel id="role-type-select-label">Role Type</InputLabel>
      <Select
        labelId="role-type-select-label"
        id="role-type-select-input"
        {...field}
        error={!!formState.errors?.roleTypeId}
      >
        {roleTypeData?.RoleTypes?.map((roleType) => (
          <MenuItem value={roleType.id} key={roleType.id}>
            {roleType.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RoleTypeSelector;
