import classes from "./Problem.module.scss";
import {ReactComponent as ProblemIcon} from "../../../assets/icons/problem.svg";
import React from "react";

const Problem = (props) => {
  console.log(props.exceptions);
  return (
    <li className={classes.problem}>
      <ProblemIcon/>
      <div>
        <h4>{props.type}</h4>
        <ul>
          {props.exceptions.map((exception) => (
            <li><p className={classes.exception}>{`${exception.type}: ${exception.text}`}</p></li>))}
        </ul>
      </div>
    </li>
  )
}

export default Problem;