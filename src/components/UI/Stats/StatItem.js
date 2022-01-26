import React from "react";
import classes from "./Stats.module.scss";

const StatItem = (props) => {
  return (
    <div className={classes.statItem}>
      <p className={classes.statsLabel}>{props.label}</p>
      <p className={classes.statsValue}>{props.value}</p>
    </div>
  );
};

export default StatItem;
