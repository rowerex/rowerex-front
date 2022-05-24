import React, {useState, useEffect, useContext} from "react";
import Bikes from "../components/Bikes/Bikes";
import Modal from "../components/UI/Modal/Modal";
import ConnectWithStrava from "../components/Modals/ConnectWithStrava/ConnectWithStrava";
import UserContext from "../store/UserContext";
import StravaBikes from "../components/Modals/StravaBikes";
import BikesProvider from "../store/BikesProvider";
import BikesContext from "../store/BikesContext";
import Button from "../components/UI/Button/Button";
import classes from './ListView.module.scss';

const BikesView = () => {
  const {bikes} = useContext(BikesContext)

  const [connectModalIsOpen, setConnectModalIsOpen] = useState(false);
  const [bikesListModalIsOpen, setBikesListModalIsOpen] = useState(false);
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user.user && !user.user.connectedWithStrava) {
      setConnectModalIsOpen(true);
    }
    if (user.user && user.user.connectedWithStrava && bikes.success && bikes.bikesList.length === 0) {
      setBikesListModalIsOpen(true);
    }
  }, [user, bikes]);

  const closeConnectModalHandler = () => {
    setConnectModalIsOpen(false);
  };
  const closeAddBikeModalHandler = () => {
    setBikesListModalIsOpen(false);
  };
  const openAddBikeModalHandler = () => {
    setBikesListModalIsOpen(true);
  };
  return (
    <BikesProvider>
      <div className={classes.viewContainer}>
      <h2>
        My Bikes
      </h2>
      <Button size="big" variant="add" onClick={openAddBikeModalHandler}>
        Add bike
      </Button>
      {connectModalIsOpen === true && (
        <Modal
          title="Connect with Strava"
          onClose={closeConnectModalHandler}>
          <ConnectWithStrava onSuccess={closeConnectModalHandler}/>
        </Modal>
      )}

      {bikesListModalIsOpen === true && (
        <Modal
          title="Add a bike from Strava"
          button="Connect"
          onClose={closeAddBikeModalHandler}>
          <StravaBikes onClose={closeAddBikeModalHandler}/>
        </Modal>
      )}
      <Bikes/>
      </div>
    </BikesProvider>
  );
};

export default BikesView;
