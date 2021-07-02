import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  dialogBody: {
    padding: "30px",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "auto",
  },
  dialogActions: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
