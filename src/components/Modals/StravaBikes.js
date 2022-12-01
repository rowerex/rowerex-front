import Button from "../UI/Buttons/Button";
import React, {useContext, useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";

import classes from "./StravaBikes.module.scss";
import BikesContext from "../../store/BikesContext";
import StatefulButton from "../UI/Buttons/StatefulButton";

const StravaBikes = (props) => {
    const {isLoading: loadingBikes, error: bikesError, sendRequest: getBikes} = useHttp();
    const {isLoading: loadingAddBike, error: addBikeError, sendRequest: addBike} = useHttp();
    const {bikesDispatcher} = useContext(BikesContext);

    const [bikes, setBikes] = useState([]);
    let bikesList = <p> It seems like you don't have any bikes added to Strava. Add your bikes in Strava app.</p>


    useEffect(() => {
        const loadBikes = (loadedBikes) => {
            console.log(loadedBikes)
            setBikes(loadedBikes);
        }
        getBikes({
            method: "GET",
            path: "/strava/bikes",
        }, loadBikes);
    }, [getBikes])

    const handleAddClick = (bikeId) => {
        return addBike({
                method: "POST",
                path: "/strava/bikes/" + bikeId + '/import',
            }, bikeAdded
        );
    }

    const bikeAdded = () => {
        bikesDispatcher({type: "INVALIDATE_BIKES"});
    }

    if (bikes.length > 0) {
        bikesList = (
            <ul>
                {bikes.map((bike) => (
                    <li className={classes.bike} key={bike.id}>{bike.name}
                        {bike.alreadyImported && <Button state="disabled" value={bike.id}
                                                         onClick={() => handleAddClick(bike.id)}>Added</Button>}
                        {!bike.alreadyImported &&
                            <StatefulButton variant="add" value={bike.id} onClick={() => handleAddClick(bike.id)} successLabel={"Added"}>Add</StatefulButton>}
                    </li>
                ))}
            </ul>
        )
    }
    let content = bikesList;
    if (loadingBikes) {
        content = <p>Loading bikes...</p>;
    }
    if (bikesError) {
        content = <p>Something went wrong: {bikesError.error}</p>
    }

    return (
        <>
            {content}
            <Button size="big" onClick={props.onClose}> Close</Button>
        </>
    );
}

export default StravaBikes;
