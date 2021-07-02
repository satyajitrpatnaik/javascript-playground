import { makeStyles } from "@material-ui/core/styles";

import headerImg from "app/assets/images/header.jpg";

export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: "100",
    backgroundImage: `url(${headerImg})`,
    backgroundSize: "cover",
    "& h3": {
      color: "#FFDCA1",
      marginTop: "5px",
      textAlign: "center",
    },
  },
  wdLogo: {
    paddingTop: "10px",
    paddingLeft: "10px",
  },
  appSelector: {
    paddingRight: "30px",
  },
  navbar: {
    backgroundColor: "#363433",
  },
  productName: {
    backgroundColor: "#0D602F",
    paddingBottom: "5px",
  },
  navLinkContainer: {
    position: "relative",
    textAlign: "center",
    "&:hover, &.active": {
      backgroundColor: "#4D834D",
      "& div": {
        display: "block",
      },
    },
    "& a": {
      display: "inline-block",
      width: "100%",
      height: "100%",
      paddingTop: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      "&:link, &:visited": {
        color: "#fff",
        textTransform: "uppercase",
      },
      "&.active": {
        backgroundColor: "#4D834D",
      },
    },
  },
  subNav: {
    display: "none",
    position: "absolute",
    zIndex: "100",
    backgroundColor: "#363433",
    "& a": {
      display: "inline-block",
      height: "40px",
      paddingTop: "10px",
      "&:hover, &:active": {
        backgroundColor: "#184B25",
      },
      "&.active": {
        backgroundColor: "#184B25",
      },
    },
  },
}));
