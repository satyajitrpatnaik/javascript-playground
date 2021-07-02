import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  section: {
    minHeight: "50px",
    padding: "5px",
  },
  chip: {
    color: "white",
    marginTop: "5px",
    marginLeft: "5px",
  },
}));
