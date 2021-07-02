import React from "react";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import { useStyles } from "./styles";
import NAV_LINKS from "app/utils/constants/navlinks";
import wdLogo from "app/assets/images/wdlogo-white.png";
import AppSelector from "app/views/pages/AppSelector";

const NavBar = (props) => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.wdLogo}>
          <figure>
            <img src={wdLogo} alt="Western Digital" />
          </figure>
        </Grid>
        <Grid item xs={6} className={classes.appSelector}>
          <AppSelector />
        </Grid>
      </Grid>
      <Grid container className={classes.navbar}>
        <Grid item xs={3} md={2} className={classes.productName}>
          <h3>ACCESS MANAGER</h3>
        </Grid>
        {NAV_LINKS.map((navLink) => {
          if (navLink.parentId === "root") {
            return (
              <Grid
                item
                key={navLink.id}
                xs={2}
                className={classNames(
                  classes.navLinkContainer,
                  "nav-link-container"
                )}
              >
                <NavLink to={navLink.path}>{navLink.title}</NavLink>
                <div className={classes.subNav}>
                  {navLink.children.map(({ id, path, title, parentId }) => {
                    return (
                      <NavLink key={id} to={path}>
                        {title}
                      </NavLink>
                    );
                  })}
                </div>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </header>
  );
};

export default NavBar;
