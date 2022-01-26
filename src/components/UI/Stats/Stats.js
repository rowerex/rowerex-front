import React from "react";
import classes from "./Stats.module.scss";

const Stats = (props) => {
  return (
    <div className={classes.stats}>
      {props.children}
    </div>
  );
};

export default Stats;
