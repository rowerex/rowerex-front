import React from "react";
import classes from "./Stats.module.scss";

const Stats = (props) => {
  return (
    <div className={classes.stats}>
      {
        props.stats ? props.stats.map((stat, index) => (
          <div key={`timeline-item-${index}`} className={classes.statItem}>
            <p className={classes.statsLabel}>{stat.label}</p>
            <p className={classes.statsValue}>{stat.value}</p>
            <p className={classes.statsDescription}>{stat.description}</p>
          </div>
        )) : null
      }
    </div>
  );
};

export default Stats;
