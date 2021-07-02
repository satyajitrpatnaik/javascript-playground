import { useStyles } from "./styles";

const MarginFromTop = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default MarginFromTop;
