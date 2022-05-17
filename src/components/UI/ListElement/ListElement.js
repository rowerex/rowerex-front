import React from "react";
import classes from "./ListElement.module.scss";
import Card from "../Card";
import Stats from "../Stats/Stats";
import {NavLink} from "react-router-dom";

const ListElement = (props) => {

  return (
    <Card className={classes.card}>
      <NavLink
        exact="true"
        to={props.link}
      >
        <img
          className={classes.photo}
          src={props.image}
          alt={`photo of ${props.title}`}
        />
      </NavLink>
      <div className={classes.content}>
        <NavLink
          exact="true"
          to={props.link}
        >
          <p className={classes.label}>{props.label}</p>
          <h3>{props.title}</h3>
          <p className={classes.subtitle}>{props.subtitle}</p>
          <Stats stats={props.stats}/>
        </NavLink>
        <div className={classes.buttons}>
          {props.buttons}
        </div>
      </div>
    </Card>
  );
};

export default ListElement;
