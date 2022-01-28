import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import useBikes from "../services/useBikes";

const BikesView = () => {
  const [bikes, error] = useBikes();
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Bikes
      </Header>
      {error !== null ? (
        <p>Error fetching bikes: {error}</p>
      ) : (
        <Bikes bikes={bikes} />
      )}
    </>
  );
};

export default BikesView;
