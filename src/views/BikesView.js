import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import useBikes from "../services/useBikes";
import Modal from "../components/UI/Modal/Modal";

const BikesView = () => {
  const [bikes, error] = useBikes();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (bikes.length === 0) {
      setModalIsOpen(true);
    }
  }, [bikes]);

  const modalHandler = (e) => {
    setModalIsOpen(false);
  };
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Bikes
      </Header>
      {modalIsOpen === true && (
        <Modal
          title="No bikes found"
          button="Connect"
          onConfirm={modalHandler}
          onClose={modalHandler}
        >
          <p>
            It looks like you don’t have any bikes. Connect to Strava to import
            your bikes.
          </p>
        </Modal>
      )}

      {error !== null ? (
        <p>Error fetching bikes: {error}></p>
      ) : (
        <Bikes bikes={bikes} />
      )}
    </>
  );
};

export default BikesView;
