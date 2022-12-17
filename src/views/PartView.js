import React, {useContext, useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/photo-part.svg";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Button from "../components/UI/Buttons/Button";
import ServicePart from "../components/Forms/ServicePart";
import PartsContext from "../store/PartsContext";
import classes from "./ElementView.module.scss";
import SwitchButton from "../components/UI/Buttons/SwitchButton";
import Problem from "../components/UI/Problem/Problem";
import displayPartName from "../services/displayPartName";
import Timeline from "../components/UI/Timeline/Timeline";
import RetirePart from "../components/Modals/RetirePart";
import DetachPart from "../components/Modals/DetachPart";
import ChooseBikeToInstallPart from "../components/Modals/ChooseBikeToInstallPart";

const PartView = () => {
  const {partId} = useParams();
  const {isLoading, error, sendRequest: getPart} = useHttp();
  const [part, setPart] = useState(false);
  const [servicePartModalOpen, setServicePartModalOpen] = useState(false);
  const [retireModalOpen, setRetireModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [partIsInvalidated, setPartIsInvalidated] = useState(false);

  const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
  const {partsDispatcher} = useContext(PartsContext)
  const [isRetired, setIsRetired] = useState(false);
  const [partDetailsSection, setPartDetailsSection] = useState("history");

  const closeServiceModal = () => {
    setServicePartModalOpen(false);
    setPartIsInvalidated(true);
  };
  const closeRetireModal = () => {
    setRetireModalOpen(false);
    setPartIsInvalidated(true);
  };
  const closeInstallModal = () => {
    setInstallModalOpen(false);
    setPartIsInvalidated(true);
  };
  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
    setPartIsInvalidated(true);
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

    const history = <Timeline events={part.history.map((event) => (
      {date: event.date.substring(0, 10), label: event.type, description: event.description}
    ))}/>

    let problems = <></>;
    if (part.problems.length > 0) {
      problems = <ul>{part.problems.map((problem) => (
        <Problem type={problem.type === "wear" ? "Wear limit exceeded" : "Service interval exceeded"}
                 exceptions={problem.exceptions}/>))}
      </ul>
    }

    return (
      <>
        <HeaderBig color="black" image={Image} alt="image of a part" label={part.partType}
                   description={part.bikeName ? `installed to ${part.bikeName}` : (part.status === 'retired' ? 'retired' : 'on shelf')}
                   reminders={part.problems.length} link={part.bikeId === null ? `/parts` : `/bikes/${part.bikeId}`}>
          {displayPartName(part.modelName, part.id)}
        </HeaderBig>
        <div className={classes.container}>
          <section id="problems">
            {problems}
          </section>
          {part.status !== 'retired' && (<>
            <Button size="big" variant="service" onClick={() => setServicePartModalOpen(true)}>
              Service
            </Button>
            <Button size="big" variant="detach" onClick={() => setInstallModalOpen(true)}>
              Install
            </Button>
            <Button size="big" variant="detach" onClick={() => setRemoveModalOpen(true)}>
              Remove
            </Button>
            <Button size="big" variant="retire" onClick={() => setRetireModalOpen(true)}>
              Retire
            </Button>
          </>)}
          <SwitchButton firstOption="History" secondOption="Info" onFirstClick={handleHistoryClick}
                        onSecondClick={handleInfoClick}/>
          {partDetailsSection === "history" &&
            <section id="history">
              <h3>Part history</h3>

              {history} </section>}

          {partDetailsSection === "info" &&
            <section id="info">
              <h3>Part info</h3>
              <Stats stats={[
                {label: 'Model', value: part.modelName},
                {label: 'Type', value: part.partType},
                {label: 'Description', value: part.name},
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
            </section>
          }
        </div>

        {servicePartModalOpen === true && (
          <ServicePart
            modelName={part.modelName}
            partId={part.id}
            onSuccess={closeServiceModal}
            onClose={closeServiceModal}
          />
        )}
        {retireModalOpen === true && (
          <RetirePart
            partName={part.modelName}
            partId={part.id}
            onSuccess={closeRetireModal}
            onClose={closeRetireModal}
          />
        )}
        {removeModalOpen === true && (
          <DetachPart
            partName={part.modelName}
            bikeName={part.bikeName}
            partId={part.id}
            onSuccess={closeRemoveModal}
            onClose={closeRemoveModal}
          />
        )}
        {installModalOpen === true && (
          <ChooseBikeToInstallPart
            partName={part.modelName}
            partId={part.id}
            onSuccess={closeInstallModal}
            onClose={closeInstallModal}
          />
        )}
      </>
    );
  } else {
    return <p> something went wrong</p>
  }
};

export default PartView;
