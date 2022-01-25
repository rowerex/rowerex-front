import React from "react";
import classes from "./Bike.module.scss";
import Card from "../UI/Card";
import image from "../../assets/images/Wilier-Filante-SLR.jpg";

const Bike = (props) => {
  return (
    <Card className={classes.card}>
      <img
        className={classes.photo}
        src={image}
        alt={`photo of ${props.bikeName}`}
      />
      <div className={classes.wrapper}>
        <h3>{props.bikeName}</h3>
        <div className={classes.stats}>
          <div>
            <p className={classes.statsLabel}>total distance</p>
            <p className={classes.statsValue}>{props.totalDistance}</p>
          </div>
          <div>
            <p className={classes.statsLabel}>total ride time</p>
            <p className={classes.statsValue}>{props.totalRideTime}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Bike;
