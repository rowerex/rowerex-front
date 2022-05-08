import React, {useState, useEffect, useContext} from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import useBikes from "../services/useBikes";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import ConnectWithStrava from "../components/Modals/ConnectWithStrava/ConnectWithStrava";
import UserContext from "../store/UserContext";
import StravaBikes from "../components/Modals/StravaBikes";

const BikesView = () => {
  const [bikes, error, loading] = useBikes();
  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [bikesListModalIsOpen, setBikesListModalIsOpen] = useState(false);
  const {user, userDispatcher} = useContext(UserContext);


  // useEffect(() => {
  //   if (bikes.length === 0 && loading === false) {
  //     setModalIsOpen(true);
  //   }
  // }, [bikes, loading]);
  console.log(user);
  useEffect(() => {
    if (user.user && user.user.connectedWithStrava === false) {
      setConnectModalIsOpen(true);
    }
    if (user.user && user.user.connectedWithStrava === true) {
      setBikesListModalIsOpen(true);
    }
  }, [user]);

  const connectModalHandler = (e) => {
    setConnectModalIsOpen(false);
  };
  const bikesListModalHandler = (e) => {
    setBikesListModalIsOpen(false);
  };
  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        My Bikes
      </Header>
      {connectModalIsOpen === true && (
        <Modal
          title="Connect with Strava"
          onClose={connectModalHandler}>
  <ConnectWithStrava onSuccess={connectModalHandler}/>
        </Modal>
      )}

      {bikesListModalIsOpen === true && (
          <Modal
              title="Add a bike from Strava"
              button="Connect"
              onClose={bikesListModalHandler}>
              <StravaBikes onClose={bikesListModalHandler}/>
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
