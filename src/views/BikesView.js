import React, {useState, useEffect, useContext} from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Bikes from "../components/Bikes/Bikes";
import Modal from "../components/UI/Modal/Modal";
import ConnectWithStrava from "../components/Modals/ConnectWithStrava/ConnectWithStrava";
import UserContext from "../store/UserContext";
import StravaBikes from "../components/Modals/StravaBikes";
import BikesProvider from "../store/BikesProvider";
import BikesContext from "../store/BikesContext";

const BikesView = () => {
  const {bikes} = useContext(BikesContext)

  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [bikesListModalIsOpen, setBikesListModalIsOpen] = useState(false);
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user.user && user.user.connectedWithStrava === false) {
      setConnectModalIsOpen(true);
    }
    if (user.user && user.user.connectedWithStrava === true && bikes.length===0) {
      setBikesListModalIsOpen(true);
    }
  }, [user]);

  const connectModalHandler = () => {
    setConnectModalIsOpen(false);
  };
  const bikesListModalHandler = () => {
    setBikesListModalIsOpen(false);
  };
  return (
    <BikesProvider>
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
      <Bikes/>
    </BikesProvider>
  );
};

export default BikesView;
