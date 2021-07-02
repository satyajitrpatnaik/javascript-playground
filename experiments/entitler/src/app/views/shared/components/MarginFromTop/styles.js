import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xl")]: {
      marginTop: "8%",
    },
    [theme.breakpoints.down("lg")]: {
      marginTop: "7%",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "12%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "28%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "35%",
    },
  },
}));
