import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import useBikes from "../services/useBikes";
import Modal from "../components/UI/Modal/Modal";

const BikesView = () => {
  const [bikes, error] = useBikes();
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Bikes
      </Header>
      <Modal title="No bikes found" button="Connect">
        <p>
          It looks like you don’t have any bikes. Connect to Strava to import
          your bikes.
        </p>
      </Modal>
      {error !== null ? (
        <p>Error fetching bikes: {error}></p>
      ) : (
        <Bikes bikes={bikes} />
      )}
    </>
  );
};

export default BikesView;
