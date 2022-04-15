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
  // useEffect(() => {
  //     const fetchParts = () => {
  //         partsDispatcher({type: "START_FETCH_PARTS"});
  //         fetch(process.env.REACT_APP_BACKENDURL + "/parts", {
  //             method: 'GET',
  //             headers: {
  //                 'X-AUTH-TOKEN': token.token,
  //             },
  //         })
  //             .then(res => res.json())
  //             .then(data => {
  //                 console.log(data);
  //                 partsDispatcher({type: "FETCH_PARTS_SUCCESS", parts: data})
  //             })
  //             .catch(error => partsDispatcher({type: "START_FETCH_ERROR"}))
  //     }
  //     fetchParts()
  // }, [])
  useEffect(() => {
    const updatePartList = parts => {
      partsDispatcher({type: "FETCH_PARTS_SUCCESS", parts: parts})
    }
    sendRequest({
        path: '/parts',
        headers: {'X-AUTH-TOKEN': token.token},
      },
      updatePartList
    )
  }, [])
  // if (err !== null) {
  //     return <p>Error fetching parts: {error}</p>;
  // }
  const partList = parts.partsList.map((part) => (
    <ListElement
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
