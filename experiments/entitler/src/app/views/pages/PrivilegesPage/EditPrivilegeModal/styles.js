import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialog: {},
  dialogBody: {
    backgroundColor: theme.palette.background.paper,
    width: 1200,
    height: 500,
  },
  dialogActions: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
}));
