import React from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/Wilier-Filante-SLR.jpg";
import ListElement from "../components/UI/ListElement/ListElement";
import Button from "../components/UI/Button/Button";

const DUMMY_BIKE = {
  bikeName: "Wilier Filante SLR",
  totalDistance: "213700 km",
  totalRideTime: "213 h",
  lastRide: "69 km",
  lastRideDate: "2.01.2022",
  rideCount: "455",
  firstRide: "10.05.2010",
  parts: [
    {
      id: "p1",
      partName: "Shimano Dura-ace FC-R9100",
      partType: "Crankset",
    },
    {
      id: "p2",
      partName: "SRAM Eagle X01 CN-EAGL-X01-A1",
      partType: "Chain",
    },
    {
      id: "p3",
      partName: "Marzocchi Bomber MX Comp ETA 120 mm",
      partType: "Front Fork",
    },
    {
      id: "p4",
      partName: "Shimano Deore XT CN-HG93",
      partType: "chain",
    },
  ]
};

const BikeView = () => {
  return (
    <>
      <HeaderBig image={Image} alt="image of a bike">
        Wilier Filante SLR
      </HeaderBig>
      <ul>
        {
          DUMMY_BIKE.parts.map((part) => (
            <ListElement
              key={part.id}
              title={part.partName}
              label={part.partType}
              buttons={[<Button variant="service">Service</Button>]}
            />
          ))
        }
      </ul>
    </>
  );
};

export default BikeView;
