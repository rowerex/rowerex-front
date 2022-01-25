import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Parts from "../components/Parts/Parts";

const PartsView = () => {
  return (
    <>
      <Header image={Image} alt="cat looking at the bike part">
        My Parts
      </Header>
      <Parts />
    </>
  );
};

export default PartsView;
