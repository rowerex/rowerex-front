import React from "react";
import Bike from "./Bike.js";

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

const Bikes = () => {
  const bikesList = DUMMY_BIKES.map((bike) => (
    <Bike
      id={bike.id}
      key={bike.id}
      bikeName={bike.bikeName}
      totalDistance={bike.totalDistance}
      totalRideTime={bike.totalRideTime}
    />
  ));

  return <ul>{bikesList}</ul>;
};
export default Bikes;
