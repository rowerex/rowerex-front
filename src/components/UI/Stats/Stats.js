import React from "react";
import classes from "./Stats.module.scss";

const Stats = (props) => {
  return (
    <div className={classes.stats}>
      {
        props.stats ? props.stats.map((stat, index) => (
          <div key={`timeline-item-${index}`} className={classes.statItem}>
            <div className={classes.statsLabel}>{stat.label}</div><div className={classes.statsValue}>{stat.value}</div>
          </div>
        )) : null
      }
    </div>
  );
};

export default Stats;
