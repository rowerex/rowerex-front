import React from "react";
import Part from "./Part.js";

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
    <Part
      key={part.id}
      partName={part.partName}
      partType={part.partType}
      rideTimeToService={part.rideTimeToService}
      distanceToService={part.distanceToService}
    />
  ));

  return <ul>{partList}</ul>;
};
export default Parts;
