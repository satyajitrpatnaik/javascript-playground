import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";
import { NavLink } from "react-router-dom";

function PageDetailsCard({ pageTitle, pageDescription, pagePath, ...props }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {pageTitle.toUpperCase()}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {pageDescription}
        </Typography>
      </CardContent>
      <CardActionArea className={classes.actionsArea}>
        <CardActions>
          <NavLink className={classes.link} to={pagePath}>
            CLICK TO LOAD PAGE
          </NavLink>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

PageDetailsCard.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDescription: PropTypes.string.isRequired,
  pagePath: PropTypes.string.isRequired,
};

export default PageDetailsCard;
