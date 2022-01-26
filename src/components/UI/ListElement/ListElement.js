import React from "react";
import classes from "./ListElement.module.scss";
import Card from "../Card";
import Stats from "../Stats/Stats";

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
        <Stats stats={props.stats}/>
        <div className={classes.buttons}>
          {props.buttons}
        </div>
      </div>
    </Card>
  );
};

export default ListElement;
