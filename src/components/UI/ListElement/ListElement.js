import React from "react";
import {ReactComponent as BellActive} from "../../../assets/icons/bell-active.svg";
import {ReactComponent as BellInactive} from "../../../assets/icons/bell-inactive.svg";
import classes from "./ListElement.module.scss";
import {NavLink} from "react-router-dom";

const ListElement = (props) => {

  return (
    <li className={classes.card}>
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
      <div className={classes.wrapper}>
        {props.problem ? <BellActive className={classes.bell}/> : <BellInactive className={classes.bell}/>}

          <NavLink className={classes.listElementContent}
            exact="true"
            to={props.link}
          >
            <h4>{props.title}</h4>
            <p className={classes.label}>{props.label}</p>

          </NavLink>
      </div>
      <div className={classes.buttons}>
        {props.buttons}
      </div>
    </li>
  );
};

export default ListElement;
