import React, {useState, useEffect} from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import useBikes from "../services/useBikes";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";

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
          title="No bikes found"
          button="Connect"
          onClose={modalHandler}>

          <p>
            It looks like you don’t have any bikes. Connect to Strava to import
            your bikes.
          </p>
          <Button size="big" onClick={()=>window.open(process.env.REACT_APP_BACKENDURL +"/strava/connect", "_blank")}>Connect with Strava </Button>
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
