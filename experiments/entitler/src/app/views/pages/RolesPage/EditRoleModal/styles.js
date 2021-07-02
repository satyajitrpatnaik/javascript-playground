import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialog: {},
  dialogBody: {
    backgroundColor: theme.palette.background.paper,
    width: "1200px",
    height: "500px",
  },
  dialogActions: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  checkbox: {
    marginTop: 20,
    marginLeft: 6,
  },
}));
