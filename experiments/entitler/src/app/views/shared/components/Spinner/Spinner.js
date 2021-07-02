import React from "react";
import PropTypes from "prop-types";

import {
  CircularProgress,
  Backdrop,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.tooltip + 1,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginTop: 20,
  },
}));

const Spinner = ({ open, message }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" size={80} />
      {message && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              {message}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Backdrop>
  );
};

Spinner.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

Spinner.defaultProps = {
  open: false,
  message: "",
};

export default Spinner;
