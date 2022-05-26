import React, {useContext, useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/Wilier-Filante-SLR.jpg";
import Card from "../components/UI/Card";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Button from "../components/UI/Buttons/Button";
import Modal from "../components/UI/Modal/Modal";
import ServicePart from "../components/Forms/ServicePart";
import PartsContext from "../store/PartsContext";
import classes from "./ElementView.module.scss";
import SwitchButton from "../components/UI/Buttons/SwitchButton";

const PartView = () => {
  const {partId} = useParams();
  const {isLoading, error, sendRequest: getPart} = useHttp();
  const [part, setPart] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [partIsInvalidated, setPartIsInvalidated] = useState(false);

  const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
  const {partsDispatcher} = useContext(PartsContext)
  const [isRetired, setIsRetired] = useState(false);
  const [partDetailsSection, setPartDetailsSection] = useState("history");

  const closeModalHandler = () => {
    setModalIsOpen(false);
    setPartIsInvalidated(true);
  };
  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    const loadPart = (loadedPart) => {
      setPart(loadedPart);
      setPartIsInvalidated(false);
    }
    getPart({
      method: "GET",
      path: "/parts/" + partId,
    }, loadPart)
  }, [getPart, partIsInvalidated])

  const retire = () => {
    sendPart({
      path: "/parts/" + partId + "/retire",
      method: "POST",
    }, retirePartHandler);
  }

  const retirePartHandler = () => {
    partsDispatcher({type: "INVALIDATE_PARTS"});
    setIsRetired(true);
  }
  const handleHistoryClick = () => {
    setPartDetailsSection("history");
  }
  const handleInfoClick = () => {
    setPartDetailsSection("info");
  }

  if (part) {
    console.log(part)

    const history = <Stats stats={part.history.map((event) => (
      {label: event.date, value: event.type, description: event.description}
    ))}/>

    let problems = <p>No problems found.</p>
    if (part.problems.length > 0) {
      problems = part.problems.map((type) => (
        <>
          <h4>{type === "wear" ? "wear limit exceeded" : "service interval exceeded"}</h4>
          {type.exceptions.map((exception) => (
            <p>{`${exception.type}: ${exception.text}`}</p>
          ))
          }
        </>))

    }
    return (
      <>
        <HeaderBig color="black" image={Image} alt="image of a part" label={part.partType}
                   description={part.bikeName ? `installed to ${part.bikeName}` : `on shelf`}>
          {part.modelName}
        </HeaderBig>
        <div className={classes.container}>
          <section id="problems">
            {problems}
          </section>
          <Button size="big" variant="service" onClick={openModalHandler}>
            Service
          </Button>
          <SwitchButton firstOption="History" secondOption="Info" onFirstClick={handleHistoryClick}
                        onSecondClick={handleInfoClick}/>
          {partDetailsSection === "history" &&
            <section id="history">
              {history} </section>}

          {partDetailsSection === "info" &&
            <section id="info">
              <Stats stats={[
                {
                  label: 'Distance since service',
                  value: part.distanceSinceService + ' / ' + (part.distanceServiceInterval ?? '-')
                },
                {
                  label: 'Ride time since service',
                  value: part.rideTimeSinceService + ' / ' + (part.rideTimeServiceInterval ?? '-')
                },
                {
                  label: 'Time since service',
                  value: part.timeSinceLastService + ' / ' + (part.timeServiceInterval ?? '-')
                },
              ]}/>
              <Stats stats={[
                {label: 'Total distance', value: part.totalDistance + ' / ' + (part.distanceDurability ?? '-')},
                {label: 'Total ride time', value: part.totalRideTime + ' / ' + (part.rideTimeDurability ?? '-')},
                {label: 'Age', value: part.totalTime + ' / ' + (part.timeDurability ?? '-')},
              ]}/>
              <Button size="big" onClick={retire}>{isRetired ? "Retired" : "Retire"}</Button>
            </section>
          }
        </div>

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
