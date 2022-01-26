import React from "react";
import ListElement from "../UI/ListElement/ListElement";
import Button from "../UI/Button/Button";
import image from "../../assets/images/Wilier-Filante-SLR.jpg";

const DUMMY_BIKES = [
  {
    id: "b1",
    bikeName: "Willier Filante SLR",
    totalDistance: "213700 km",
    totalRideTime: "213 h",
  },
  {
    id: "b2",
    bikeName: "Kellys Spider",
    totalDistance: "2674 km",
    totalRideTime: "5 h",
  },
  {
    id: "b3",
    bikeName: "Merida",
    totalDistance: "73982 km",
    totalRideTime: "213 h",
  },
  {
    id: "b4",
    bikeName: "Specialized Turbo Creo SL Comp Carbon EVO",
    totalDistance: "7356 km",
    totalRideTime: "555 h",
  },
  {
    id: "b5",
    bikeName: "Veturilo",
    totalDistance: "997 km",
    totalRideTime: "112 h",
  },
];

const Bikes = (props) => {
  let bikes = DUMMY_BIKES;
  if (props.bikes) {
    bikes = props.bikes;
  }
  const bikesList = bikes.map((bike) => (
    <ListElement
      id={bike.id}
      key={bike.id}
      image={image}
      title={bike.bikeName}
      stats={[
        {
          label: 'Total distance',
          value: bike.totalDistance,
        },
        {
          label: 'Total ride time',
          value: bike.totalRideTime,
        },]}
      buttons={[<Button variant="service">Service</Button>]}
    />
  ));

  return <ul>{bikesList}</ul>;
};
export default Bikes;
