import React from "react";
import useParts from "./useParts";
import ListElement from "../UI/ListElement/ListElement";
import image from "../../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import Button from "../UI/Button/Button";

const Parts = (props) => {
  const [parts, error] = useParts();

  if (error !== null) {
    return <p>Error fetching parts: {error}</p>;
  }
  const partList = parts.map((part) => (
    <ListElement
      id={part.id}
      key={part.id}
      image={image}
      title={part.partName}
      label={part.partType}
      stats={[
        {
          label: "Ride time to service",
          value: part.rideTimeToService,
        },
        {
          label: "Distance to service",
          value: part.distanceToService,
        },
      ]}
      buttons={[<Button variant="service">Service</Button>]}
    />
  ));
  return <ul>{partList}</ul>;
};
export default Parts;
