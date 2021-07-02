import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

import PageDetailsCard from "app/views/shared/components/PageDetailsCard";
import { useStyles } from "./styles";

function PageTiles({ pages }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {pages.map(({ id, title, description, path }) => (
          <Grid key={id} item xs={12} md={4}>
            <PageDetailsCard
              pageTitle={title}
              pageDescription={description}
              pagePath={path}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

PageTiles.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default PageTiles;
