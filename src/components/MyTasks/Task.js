import React from "react";
import classes from "./Task.module.scss";
import globalClasses from "../../common.scss";
import Card from "../UI/Card";
import { ReactComponent as ServiceIcon } from "../../assets/icons/serviceIcon.svg";
import Button from "../UI/Button/Button";

const Task = (props) => {
  return (
    <Card className={classes.card}>
      <ServiceIcon />
      <div>
        <p className={classes.partType}>{props.partType}</p>
        <h3>{props.partModel}</h3>
        <p>{props.location}</p>
        <Button>Service</Button>
      </div>
    </Card>
  );
};

export default Task;
