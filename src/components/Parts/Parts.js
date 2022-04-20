import React, {useContext, useEffect} from "react";
import ListElement from "../UI/ListElement/ListElement";
import image from "../../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import Button from "../UI/Button/Button";
import PartsContext from "../../store/PartsContext";
import useToken from "../../services/useToken";
import useHttp from "../../hooks/useHttp";

const Parts = () => {
  const {parts, partsDispatcher} = useContext(PartsContext)
  const token = useToken();
  const {isLoading, error, sendRequest} = useHttp();

  useEffect(() => {
    const updatePartList = parts => {
      partsDispatcher({type: "FETCH_PARTS_SUCCESS", parts: parts})
    }
    if (parts.invalidated) {
      sendRequest({
          path: '/parts',
          headers: {'X-AUTH-TOKEN': token.token},
        },
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
      id={part.id}
      key={part.id}
      image={image}
      title={part.id + ' | ' + part.modelName}
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
