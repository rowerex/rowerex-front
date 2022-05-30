import React, {useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/photo-bike.svg";
import partImage from "../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import Button from "../components/UI/Buttons/Button";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Modal from "../components/UI/Modal/Modal";
import InstallPart from "../components/Modals/InstallPart";
import DetachPart from "../components/Modals/DetachPart";
import NewListElement from "../components/UI/ListElement/NewListElement";
import classes from "./ElementView.module.scss";
import SwitchButton from "../components/UI/Buttons/SwitchButton";

const DUMMY_BIKE = {
  bikeName: "Wilier Filante SLR",
  totalDistance: "213700 km",
  totalRideTime: "213 h",
  lastRide: "69 km",
  lastRideDate: "2.01.2022",
  rideCount: "455",
  firstRide: "10.05.2010",
  parts: [
    {
      id: "p1",
      modelName: "Shimano Dura-ace FC-R9100",
      partType: "Crankset",
    },
    {
      id: "p2",
      modelName: "SRAM Eagle X01 CN-EAGL-X01-A1",
      partType: "Chain",
    },
    {
      id: "p3",
      modelName: "Marzocchi Bomber MX Comp ETA 120 mm",
      partType: "Front Fork",
    },
    {
      id: "p4",
      modelName: "Shimano Deore XT CN-HG93",
      partType: "chain",
    },
  ]
};

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
      <NewListElement
        link={`/parts/${part.id}`}
        image={partImage}
        key={part.id}
        title={part.name}
        label={part.modelName}
        problem={part.hasAProblem}
        buttons={[
          <Button variant="detach" onClick={() => {
            setSelectedPart({
              id: part.id,
              name: part.name
            })
            openDetachPartModalHandler();
          }}>Detach</Button>]}
      />)
    );

    const parts = bike.parts.map((part) => (
      <NewListElement
        link={`/parts/${part.id}`}
        image={partImage}
        key={part.id}
        title={part.name}
        label={part.modelName}
        problem={part.hasAProblem}
        buttons={[
          <Button variant="detach" onClick={() => {
            setSelectedPart({
              id: part.id,
              name: part.name
            })
            openDetachPartModalHandler();
          }}>Detach</Button>]}
      />)
    );

    return (
      <>
        <HeaderBig image={Image} alt="image of a bike" label={bike.totalDistance} reminders={1}>
          {bike.name}
        </HeaderBig>
        <div className={classes.container}>
          <section id="partsWithProblems">
            <ul>
              {partsWithProblems}
            </ul>
          </section>
          <SwitchButton firstOption="Parts" secondOption="Info" onFirstClick={handlePartsClick}
                        onSecondClick={handleInfoClick}/>
          {bikeDetailsSection === "parts" && <section id="parts">
            <Button size="big" variant="add" onClick={openInstallPartModalHandler}>Install part</Button>

            <ul>
              {parts}
            </ul>
          </section>}
          {bikeDetailsSection === "info" &&
            <section id="info">
              <Stats stats={[
                {label: 'Total distance', value: bike.totalDistance},
                {label: 'Total ride time', value: bike.totalRideTime},
                {label: 'Last Ride Distance', value: DUMMY_BIKE.lastRide}, //todo get actual data
                {label: 'Last Ride Date', value: DUMMY_BIKE.lastRideDate}, //todo get actual data
                {label: 'Ride count', value: DUMMY_BIKE.rideCount}, //todo get actual data
                {label: 'First ride', value: DUMMY_BIKE.firstRide}, //todo get actual data
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
