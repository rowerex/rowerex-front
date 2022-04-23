import React, {useState, useEffect} from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import useBikes from "../services/useBikes";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import ConnectWithStrava from "../components/Modals/ConnectWithStrava/ConnectWithStrava";

const BikesView = () => {
  const [bikes, error, loading] = useBikes();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (bikes.length === 0 && loading === false) {
      setModalIsOpen(true);
    }
  }, [bikes, loading]);

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
          title="Connect with Strava"
          button="Connect"
          onClose={modalHandler}>
  <ConnectWithStrava onSuccess={modalHandler}/>
        </Modal>
      )}

      {error !== null ? (
        <p>Error fetching bikes: {error}</p>
      ) : (
        <Bikes bikes={bikes}/>
      )}
    </>
  );
};

export default BikesView;
