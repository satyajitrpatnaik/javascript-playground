import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  typography: {
    fontFamily: ["'Montserrat'", "sans-serif"].join(),
  },
});

export default Theme;
