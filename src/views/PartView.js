import React, {useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/Wilier-Filante-SLR.jpg";
import Card from "../components/UI/Card";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Button from "../components/UI/Button/Button";
import Modal from "../components/UI/Modal/Modal";
import ServicePart from "../components/Forms/ServicePart";

const PartView = () => {
  const {partId} = useParams();
  const {isLoading, error, sendRequest: getPart} = useHttp();
  const [part, setPart] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    const loadPart = (loadedPart) => {
      setPart(loadedPart);
    }
    getPart({
      method: "GET",
      path: "/parts/" + partId,
    }, loadPart)
  }, [getPart])

  if (part) {
    return (
      <>
        <HeaderBig image={Image} alt="image of a part" label={part.partType} description={part.bikeName ? `installed to ${part.bikeName}` : `on shelf`}>
          {part.modelName}
        </HeaderBig>
        <Card>
          <h3>Wear stats</h3>
          <Stats stats={[
            {label: 'Distance', value: part.totalDistance + ' / ' + (part.distanceDurability ?? '-')},
            {label: 'Ride time', value: part.totalRideTime + ' / ' + (part.rideTimeDurability ?? '-')},
            {label: 'Age', value: part.totalTime + ' / ' + (part.timeDurability ?? '-')},
          ]}/>
        </Card>
        <Card>
          <h3>Service stats</h3>
          <Stats stats={[
            {label: 'Distance', value: part.distanceSinceService + ' / ' + (part.distanceServiceInterval ?? '-')},
            {label: 'Ride time', value: part.rideTimeSinceService + ' / ' + (part.rideTimeServiceInterval ?? '-')},
            {label: 'Age', value: part.timeSinceLastService + ' / ' + (part.timeServiceInterval ?? '-')},
          ]}/>
          <Button size="big" variant="service" onClick={openModalHandler}>
            Service
          </Button>
        </Card>
        {modalIsOpen === true && (
          <Modal
            title="Service Part"
            onClose={closeModalHandler}
          >
            <ServicePart partId={part.id} onSuccess={closeModalHandler}/>
          </Modal>
        )}
      </>
    );
  } else {
    return <p> something went wrong</p>
  }
};

export default PartView;
