import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  row: {
    width: "auto",
    marginTop: "300px",
  },
  flexItem: {
    color: "white",
  },
}));

export function LoadingMessage() {
  const classes = useStyles();
  return (
    <div className={classes.flexContainer}>
      <div className={classes.row}>
        <div className={classes.flexItem}>
          <h3>Loading Access Manager ...</h3>
        </div>
      </div>
    </div>
  );
}
