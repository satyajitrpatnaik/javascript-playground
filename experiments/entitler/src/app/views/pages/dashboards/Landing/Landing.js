import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";

import { useCurrentUser } from "app/views/shared/providers/UserProvider";

const Landing = (props) => {
  const classes = useStyles();
  const { currentUser } = useCurrentUser();
  return (
    <div className={classes.root}>
      <Typography variant="h2">
        Hi {currentUser?.username ?? "User"}, Welcome to your "Favorite" Access
        Management Tool!
      </Typography>
    </div>
  );
};

export default Landing;
