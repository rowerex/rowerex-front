import React from "react";
import classes from "./Part.module.scss";
import Card from "../UI/Card";
import image from "../../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import Button from "../UI/Button/Button";

const Part = (props) => {
  return (
    <Card className={classes.card}>
      <img
        className={classes.photo}
        src={image}
        alt={`photo of ${props.partName}`}
      />
      <div className={classes.wrapper}>
        <p className={classes.partType}>{props.partType}</p>
        <h3>{props.partName}</h3>
        <p className={classes.bikeName}>{props.bikeName}</p>
        <div className={classes.stats}>
          <div>
            <p className={classes.statsLabel}>distance to service</p>
            <p className={classes.statsValue}>{props.distanceToService}</p>
          </div>
          <div>
            <p className={classes.statsLabel}>ride time to service</p>
            <p className={classes.statsValue}>{props.rideTimeToService}</p>
          </div>
        </div>
        <div className={classes.buttons}>
          <Button variant="service">Service</Button>
        </div>
      </div>
    </Card>
  );
};

export default Part;
