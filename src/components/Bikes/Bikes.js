import React, {useContext, useEffect} from "react";
import image from "../../assets/icons/list-element-bike.svg";
import BikesContext from "../../store/BikesContext";
import useHttp from "../../hooks/useHttp";
import ListElement from "../UI/ListElement/ListElement";

const Bikes = () => {
  const {bikes, bikesDispatcher} = useContext(BikesContext)
  const {isLoading, error, sendRequest} = useHttp();

  useEffect(() => {
    const updateBikeList = bikes => {
      bikesDispatcher({type: "FETCH_BIKES_SUCCESS", bikes: bikes})
    }
    if (bikes.invalidated) {
      sendRequest({path: '/bikes'},
        updateBikeList
      )
    }
  }, [bikes, bikesDispatcher, sendRequest])

  if (error) {
    return <p>Error fetching bikes: {error}</p>;
  }
  if (isLoading) {
    return <> <p>Loading bikes...</p></>;
  }
  console.log(bikes);
  const bikeList = bikes.bikesList.map((bike) => (<ListElement
    link={`/bikes/${bike.id}`}
    id={bike.id}
    key={bike.id}
    image={image}
    title={bike.bikeName}
    label={bike.totalDistance}
    problem={bike.hasAProblem}
  />))

  return (
    <ul>{bikeList}</ul>
  );
};
export default Bikes;
