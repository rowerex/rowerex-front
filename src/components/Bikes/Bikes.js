import React, {useContext, useEffect} from "react";
import ListElement from "../UI/ListElement/ListElement";
import image from "../../assets/images/Wilier-Filante-SLR.jpg";
import BikesContext from "../../store/BikesContext";
import useHttp from "../../hooks/useHttp";

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
    const bikeList = bikes.bikesList.map((bike) => (
            <ListElement
              link={`/bikes/${bike.id}`}
              id={bike.id}
                key={bike.id}
                image={image}
                title={bike.bikeName}
                stats={[
                    {
                        key: bike.id + '-distance',
                        label: 'Total distance',
                        value: bike.totalDistance,
                    },
                    {
                        key: bike.id + '-ride-time',
                        label: 'Total ride time',
                        value: bike.totalRideTime,
                    },]}
                buttons={[]}
            />
    ))

    return (
        <ul>{bikeList}</ul>
    );
};
export default Bikes;
