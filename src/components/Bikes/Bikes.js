import React from "react";
import ListElement from "../UI/ListElement/ListElement";
import Button from "../UI/Button/Button";
import image from "../../assets/images/Wilier-Filante-SLR.jpg";
import useBikes from "./useBikes";

const Bikes = () => {
  const [bikes, error] = useBikes();

  return (
    <>
      {error !== null
        ? <p>Error fetching bikes: {error}</p>
        : bikes.map((bike) => (
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
            buttons={[<Button variant="service">Service</Button>]}
          />
        ))}
    </>
  );
};
export default Bikes;
