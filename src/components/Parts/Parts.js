import React, {useContext, useEffect} from "react";
import ListElement from "../UI/ListElement/ListElement";
import image from "../../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import Button from "../UI/Button/Button";
import PartsContext from "../../store/PartsContext";
import useHttp from "../../hooks/useHttp";

const Parts = () => {
  const {parts, partsDispatcher} = useContext(PartsContext)
  const {isLoading, error, sendRequest} = useHttp();

  useEffect(() => {
    const updatePartList = parts => {
      partsDispatcher({type: "FETCH_PARTS_SUCCESS", parts: parts})
    }
    if (parts.invalidated) {
      sendRequest({path: '/parts'},
        updatePartList
      )
    }
  }, [parts])

  if (error) {
    return <p>Error fetching parts: {error}</p>;
  }
  if (isLoading) {
    return <p>Loading parts...</p>;
  }
  const partList = parts.partsList.map((part) => (
      <ListElement
        link={`/parts/${part.id}`}
        id={part.id}
        key={part.id}
        image={image}
        title={part.modelName}
        label={part.partType}
        stats={[
          {
            label: "Ride time to service",
            value: part.rideTimeToService,
          },
          {
            label: "Distance to service",
            value: part.distanceToService,
          },
        ]}
        buttons={[<Button key={`service-button-{$part.id}`} variant="service">Service</Button>]}
      />
  ));
  return <ul>{partList}</ul>;
}

export default Parts;
