import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    height: "200px",
    backgroundImage: "linear-gradient(to right, #FFEB71, #FF806F)",
  },
  actionsArea: {
    position: "absolute",
    left: "10px",
    right: "10px",
    bottom: "5px",
  },
}));
