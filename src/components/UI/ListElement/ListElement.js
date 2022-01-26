import React from "react";
import classes from "./ListElement.module.scss";
import Card from "../Card";

const ListElement = (props) => {
  return (
    <Card className={classes.card}>
      <img
        className={classes.photo}
        src={props.image}
        alt={`photo of ${props.title}`}
      />
      <div className={classes.content}>
        <p className={classes.label}>{props.label}</p>
        <h3>{props.title}</h3>
        <p className={classes.subtitle}>{props.subtitle}</p>
        <div className={classes.stats}>
          {
            props.stats ? props.stats.map((stat) => (
              <div className={classes.statItem}>
                <p className={classes.statsLabel}>{stat.label}</p>
                <p className={classes.statsValue}>{stat.value}</p>
              </div>
            )) : null
          }
        </div>
        <div className={classes.buttons}>
          {props.buttons}
        </div>
      </div>
    </Card>
  );
};

export default ListElement;
