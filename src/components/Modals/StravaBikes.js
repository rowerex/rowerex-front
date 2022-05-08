import Button from "../UI/Button/Button";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import useToken from "../../services/useToken";
import UserContext from "../../store/UserContext";
import useHttp from "../../hooks/useHttp";

import classes from "./StravaBikes.module.scss";

const StravaBikes = (props) => {
    const {isLoading, error, sendRequest} = useHttp();
    const [buttonClicked, setButtonClicked] = useState(false);
    const [bikes, setBikes] = useState([]);
  let bikesList = <p> It seems like you don't have any bikes added to Strava. Add your bikes in Strava app.</p>




    useEffect(() => {
        const loadBikes = (loadedBikes)  => {
           setBikes(loadedBikes);
            console.log(bikes);
        }
        sendRequest({
            method: "GET",
            path: "/strava/bikes",
        }, loadBikes);

    }, [sendRequest])

    if (bikes.length > 0) {
        bikesList = (

            <ul>
                {bikes.map((bike) => (
                    <li className={classes.bike} key={bike.id}>{bike.name}</li>
                    ))}
            </ul>
        )
    }

    const handleButtonClick = () => {
        setButtonClicked(true);
    }

    // let buttonContent = "Connect with Strava"
    // let buttonState;
    // if (isLoading) {
    //     buttonContent = "Loading...";
    // }
    // if (error) {
    //     buttonContent = "Something went wrong :(";
    //     buttonState = "error";
    //     console.log(buttonContent);
    // }
    // if (buttonClicked) {
    //     buttonContent = "Connecting...";
    //     buttonState = "disabled";
    // }

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
