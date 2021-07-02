import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "10%",
    marginRight: "10%",
    padding: "5%",
    border: "3px solid #fff",
    borderRadius: "10px",
    height: "auto",
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#fff",
    [theme.breakpoints.up("xl")]: {
      marginTop: "20%",
    },
    [theme.breakpoints.down("xl")]: {
      marginTop: "15%",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "20%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "25%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "55%",
    },
  },
}));
