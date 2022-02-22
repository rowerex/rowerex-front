import React from "react";
import ListElement from "../UI/ListElement/ListElement";
import image from "../../assets/images/Wilier-Filante-SLR.jpg";

const Bikes = (props) => {
  return (
    <>
      {
        props.bikes.map((bike) => (
          <ListElement
            id={bike.id}
            key={bike.id}
            image={image}
            title={bike.bikeName}
            stats={[
              {
                key: bike.id + '-distance',
                label: 'Total distance',
                value: bike.totalDistance,
              },
              {
                key: bike.id + '-ride-time',
                label: 'Total ride time',
                value: bike.totalRideTime,
              },]}
            buttons={[]}
          />
        ))
      }
    </>
  );
};
export default Bikes;
