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
import ListElement from "../components/UI/ListElement/ListElement";
import classes from "./ElementView.module.scss";
import displayPartName from "../services/displayPartName";

const BikeView = () => {
  const {bikeId} = useParams();
  const {isLoading, error, sendRequest: getBike} = useHttp();
  const [bike, setBike] = useState({});
  const [installPartModalIsOpen, setInstallPartModalIsOpen] = useState(false);
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

  if (bike.parts) {
    const partsWithProblems = bike.parts.filter((part) => (part.hasAProblem === true)).map((part) => (
      <ListElement
        link={`/parts/${part.id}`}
        image={partImage}
        key={part.id}
        title={displayPartName(part.modelName, part.id)}
        label={part.type}
        problem={part.hasAProblem}
      />)
    );
    const parts = bike.parts.map((part) => (
      <ListElement
        link={`/parts/${part.id}`}
        image={partImage}
        key={part.id}
        title={displayPartName(part.modelName, part.id)}
        label={part.type}
        problem={part.hasAProblem}
      />)
    );

    return (
      <>
        <HeaderBig image={Image} alt="image of a bike" label={bike.totalDistance} reminders={partsWithProblems.length}>
          {bike.name}
        </HeaderBig>
        <div className={classes.container}>
          {partsWithProblems.length > 0 && <section id="partsWithProblems">
            <ul>
              {partsWithProblems}
            </ul>
          </section>}
          <section id="info">
            <h3>Bike info</h3>

            <Stats stats={[
              {label: 'Total distance', value: bike.totalDistance},
              {label: 'Total ride time', value: bike.totalRideTime},
              {label: 'Ride count', value: bike.totalRides},
              {label: 'First ride', value: bike.productionDate.substring(0, 10),},
            ]}/>
          </section>
          <section id="parts">
            <Button size="big" variant="add" onClick={openInstallPartModalHandler}>Install part</Button>
            <h3>All parts</h3>

            <ul>
              {parts}
            </ul>
          </section>
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
      </>
    );
  } else {
    return <p> something went wrong</p>
  }
};

export default BikeView;
