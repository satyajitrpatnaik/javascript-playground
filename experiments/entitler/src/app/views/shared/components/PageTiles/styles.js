import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15% 10% 0",
    [theme.breakpoints.down("md")]: {
      marginTop: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "35%",
    },
  },
}));
