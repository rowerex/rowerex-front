import React from "react";
import ListElement from "../UI/ListElement/ListElement";
import image from "../../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import Button from "../UI/Button/Button";

const DUMMY_PARTS = [
  {
    id: "p1",
    bikeName: "Willier Filante SLR",
    partName: "Shimano Dura-ace FC-R9100",
    partType: "Crankset",
    rideTimeToService: "16:30 h",
    distanceToService: "432 km",
  },
  {
    id: "p2",
    bikeName: "Canyon Neuron CF 8",
    partName: "SRAM Eagle X01 CN-EAGL-X01-A1",
    partType: "Chain",
    rideTimeToService: "9:12 h",
    distanceToService: "322 km",
  },
  {
    id: "p3",
    bikeName: "Merida Matts HFS '06",
    partName: "Marzocchi Bomber MX Comp ETA 120 mm",
    partType: "Front Fork",
    rideTimeToService: "99:10 h",
    distanceToService: "- km",
  },
  {
    id: "p4",
    bikeName: null,
    partName: "Shimano Deore XT CN-HG93",
    partType: "chain",
    rideTimeToService: "5:30 h",
    distanceToService: "200 km",
  },
];

const Parts = () => {

  const partList = DUMMY_PARTS.map((part) => (
    <ListElement
      id={part.id}
      key={part.id}
      image={image}
      title={part.partName}
      label={part.partType}
      stats={[{
        label: 'Ride time to service',
        value: part.rideTimeToService,
      },
        {
          label: 'Distance to service',
          value: part.distanceToService,
        },]}
      buttons={[<Button variant="service">Service</Button>]}
    />
  ));
  return <ul>{partList}</ul>;
};
export default Parts;
