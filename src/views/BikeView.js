import React, {useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/photo-bike.svg";
import partImage from "../assets/icons/list-element-part.svg";
import Button from "../components/UI/Buttons/Button";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Modal from "../components/UI/Modal/Modal";
import InstallPart from "../components/Modals/InstallPart";
import DetachPart from "../components/Modals/DetachPart";
import ListElement from "../components/UI/ListElement/ListElement";
import classes from "./ElementView.module.scss";
import SwitchButton from "../components/UI/Buttons/SwitchButton";
import displayName from "../services/displayName";

const BikeView = () => {
  const {bikeId} = useParams();
  const {isLoading, error, sendRequest: getBike} = useHttp();
  const [bike, setBike] = useState({});
  const [installPartModalIsOpen, setInstallPartModalIsOpen] = useState(false);
  const [detachPartModalIsOpen, setDetachPartModalIsOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState({});
  const [bikeIsValid, setBikeIsValid] = useState(false);
  const [bikeDetailsSection, setBikeDetailsSection] = useState("parts");

  useEffect(() => {
    if (!bikeIsValid) {
      const loadBike = (loadedbike) => {
        setBike(loadedbike);
        setBikeIsValid(true);
      }
      getBike({
        method: "GET",
        path: "/bikes/" + bikeId,
      }, loadBike)
    }
  }, [getBike, bikeIsValid])

  const openInstallPartModalHandler = () => {
    setInstallPartModalIsOpen(true);
  }
  const closeInstallPartModalHandler = () => {
    setInstallPartModalIsOpen(false);
    setBikeIsValid(false);
  }

  const openDetachPartModalHandler = () => {
    setDetachPartModalIsOpen(true);
  }
  const closeDetachPartModalHandler = () => {
    setDetachPartModalIsOpen(false);
    setBikeIsValid(false);
  }

  const handlePartsClick = () => {
    setBikeDetailsSection("parts");
  }
  const handleInfoClick = () => {
    setBikeDetailsSection("info");
  }

  if (bike.parts) {
    const partsWithProblems = bike.parts.filter((part) => (part.hasAProblem === true)).map((part) => (
      <ListElement
        link={`/parts/${part.id}`}
        image={partImage}
        key={part.id}
        title={displayName(part.modelName, part.id)}
        label={part.type}
        problem={part.hasAProblem}
        buttons={[
          <Button variant="detach" size="icon" onClick={() => {
            setSelectedPart({
              id: part.id,
              name: displayName(part.modelName, part.id)
            })
            openDetachPartModalHandler();
          }}></Button>]}
      />)
    );

    const parts = bike.parts.map((part) => (
      <ListElement
        link={`/parts/${part.id}`}
        image={partImage}
        key={part.id}
        title={displayName(part.modelName, part.id)}
        label={part.type}
        problem={part.hasAProblem}
        buttons={[
          <Button variant="detach" size="icon" onClick={() => {
            setSelectedPart({
              id: part.id,
              name: displayName(part.modelName, part.id)
            })
            openDetachPartModalHandler();
          }}></Button>]}
      />)
    );

    return (
      <>
        <HeaderBig image={Image} alt="image of a bike" label={bike.totalDistance} reminders={partsWithProblems.length}>
          {bike.name}
        </HeaderBig>
        <div className={classes.container}>
          <section id="partsWithProblems">
            <h3>Parts with active reminders </h3>
            <ul>
              {partsWithProblems}
            </ul>
          </section>
          <SwitchButton firstOption="Parts" secondOption="Info" onFirstClick={handlePartsClick}
                        onSecondClick={handleInfoClick}/>
          {bikeDetailsSection === "parts" && <section id="parts">
            <Button size="big" variant="add" onClick={openInstallPartModalHandler}>Install part</Button>
            <h3>All parts</h3>

            <ul>
              {parts}
            </ul>
          </section>}
          {bikeDetailsSection === "info" &&
            <section id="info">
              <h3>Bike info</h3>

              <Stats stats={[
                {label: 'Total distance', value: bike.totalDistance},
                {label: 'Total ride time', value: bike.totalRideTime},
                {label: 'Ride count', value: bike.totalRides},
                {label: 'First ride', value: bike.productionDate.substring(0,10),},
              ]}/>
            </section>}
        </div>

        {installPartModalIsOpen === true && (
          <Modal
            title="Install part"
            onClose={closeInstallPartModalHandler}
          >
            <InstallPart bikeName={bike.name} bikeId={bike.id}
                         onSuccess={closeInstallPartModalHandler}/>
          </Modal>
        )}

        {detachPartModalIsOpen === true && (
          <Modal
            title="Detach part"
            onClose={closeDetachPartModalHandler}
          >
            <DetachPart partId={selectedPart.id} partName={selectedPart.name}
                        onSuccess={closeDetachPartModalHandler}/>
          </Modal>
        )}

      </>
    );
  } else {
    return <p> something went wrong</p>
  }
};

export default BikeView;
