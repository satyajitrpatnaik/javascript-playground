import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "10px",
    marginRight: "10px",
    height: "50vh",
  },
  textField: {
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
  button: {
    width: "150px",
  },
}));
