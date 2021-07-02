import React from "react";
import { useQuery } from "@apollo/client";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FilledInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { debounce } from "lodash";

import { useStyles } from "./styles";
import { emailRegex } from "app/utils/constants/usual-suspects";
import { GET_SITES, GET_USERS } from "app/gql/Queries";

const SitePdlUsersMapper = ({
  addUser,
  addPdl,
  selectedSite,
  setSelectedSite,
}) => {
  const classes = useStyles();
  const { data: sites } = useQuery(GET_SITES);
  const { data: users } = useQuery(GET_USERS);

  const [pdl, setPdl] = React.useState("");
  const [isPdlError, setIsPdlError] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState("");

  const handlePdlTextChange = (e) => {
    setPdl(e.target.value);
    if (e.target.value !== "" && !emailRegex.test(e.target.value)) {
      setIsPdlError(true);
    } else {
      setIsPdlError(false);
    }
  };

  return (
    <div className={classes.root}>
      <FormHelperText>
        Select a site first to add a PDL or an user.
      </FormHelperText>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="site-select-label">Sites</InputLabel>
            <Select
              labelId="site-select-label"
              id="site-select-input"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              {sites?.Sites?.map((site) => (
                <MenuItem value={site} key={site.id}>
                  {site.siteCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel htmlFor="pdl-text">PDL</InputLabel>
            <FilledInput
              id="pdl-text"
              type="text"
              onChange={debounce((e) => handlePdlTextChange(e), 500)}
              error={isPdlError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => addPdl(pdl, selectedSite)}
                    edge="end"
                    disabled={selectedSite === "" || pdl === "" || isPdlError}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            {isPdlError && (
              <FormHelperText>PDL should be of email format.</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="user-select-label">Users</InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select-input"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => addUser(selectedUser, selectedSite)}
                    disabled={selectedSite === "" || selectedUser === ""}
                  >
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            >
              {users?.Users?.map((user) => (
                <MenuItem value={user} key={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
};

export default SitePdlUsersMapper;
