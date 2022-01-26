import React from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/Wilier-Filante-SLR.jpg";
import Parts from "../components/Parts/Parts";

const DUMMY_BIKE = {
  bikeName: "Wilier Filante SLR",
  totalDistance: "213700 km",
  totalRideTime: "213 h",
  lastRide: "69 km",
  lastRideDate: "2.01.2022",
  rideCount: "455",
  firstRide: "10.05.2010",
};

const BikeView = () => {
  return (
    <>
      <HeaderBig image={Image} alt="cat looking at the bike.">
        Wilier Filante SLR
      </HeaderBig>
      <Parts />
    </>
  );
};

export default BikeView;
