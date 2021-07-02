import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  dialogBody: {
    backgroundColor: theme.palette.background.paper,
    width: 300,
    height: 150,
  },
  dialogActions: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
}));
