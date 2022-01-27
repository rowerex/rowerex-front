import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";

const BikesView = () => {
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Bikes
      </Header>
      <Bikes/>
    </>
  );
};

export default BikesView;
