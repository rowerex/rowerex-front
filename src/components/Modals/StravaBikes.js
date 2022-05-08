import Button from "../UI/Button/Button";
import React, { useEffect, useState} from "react";
import useHttp from "../../hooks/useHttp";

import classes from "./StravaBikes.module.scss";

const StravaBikes = (props) => {
    const {isLoading: loadingBikes, error: bikesError, sendRequest: getBikes} = useHttp();
    const {isLoading: loadingAddBike, error: addBikeError, sendRequest: addBike} = useHttp();

    const [bikes, setBikes] = useState({});
    const [pendingChanges, setPendingChanges] = useState(false);
  let bikesList = <p> It seems like you don't have any bikes added to Strava. Add your bikes in Strava app.</p>


    useEffect(() => {
        const loadBikes = (loadedBikes)  => {
            console.log(loadedBikes)
           setBikes(loadedBikes);
        }
        getBikes({
            method: "GET",
            path: "/strava/bikes",
        }, loadBikes);
        setPendingChanges(false);
    }, [getBikes, pendingChanges])

    const handleAddClick = (bikeId) => {
        addBike({
                method: "POST",
                path: "/strava/bikes/" + bikeId + '/import',
            }, bikeAdded
        );
    }

        const bikeAdded = () => {
            setPendingChanges(true);
        }


    if (bikes.length > 0) {
        bikesList = (
            <ul>
                {bikes.map((bike) => (
                    <li className={classes.bike} key={bike.id}>{bike.name}
                        {bike.alreadyImported && <Button state="disabled"  value={bike.id} onClick={() => handleAddClick(bike.id)}>Added</Button>}
                        {!bike.alreadyImported && <Button variant="add" value={bike.id} onClick={() => handleAddClick(bike.id)}>Add</Button>}
                        </li>
                    ))}
            </ul>
        )
    }

    return (
        <>
            <p>
                Choose a bike to add:
            </p>
            {bikesList}
              <Button size="big"  onClick={props.onClose}> Close</Button>
        </>
    );
}

export default StravaBikes;
