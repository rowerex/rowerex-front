import React from "react";
import classes from "./ListElement.module.scss";
import Card from "../Card";
import image from "../../../assets/images/sram-X1X-horizon-rear-dereailleur.png";

const ListElement = (props) => {
  return (
    <Card className={classes.card}>
      <img
        className={classes.photo}
        src={image}
        alt={`photo of ${props.partName}`}
      />
      <div className={classes.content}>
        <p className={classes.label}>{props.label}</p>
        <h3>{props.title}</h3>
        <p className={classes.subtitle}>{props.subtitle}</p>
        <div className={classes.stats}>
          {
            props.stats ? props.stats.map((stat) => (
              <div>
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
