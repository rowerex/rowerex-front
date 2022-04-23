import Button from "../../UI/Button/Button";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import useToken from "../../../services/useToken";
import UserContext from "../../../store/UserContext";
import useHttp from "../../../hooks/useHttp";

const ConnectWithStrava = () => {
    const {isLoading, error, sendRequest} = useHttp();
    const [authorizationUrl, setAuthorizationUrl] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    const {user, userDispatcher} = useContext(UserContext);
    const {token, setToken} = useToken();

    console.log(authorizationUrl)


    useEffect(() => {
        const enableStravaConnection = (data) => {
            setAuthorizationUrl(data.authorizationUrl);
        };
        sendRequest({
            method: "GET",
            path: "/strava/authorization-url",
            headers: {
                'X-AUTH-TOKEN': token,
                "Content-Type": "application/json",
            },
        }, enableStravaConnection);

    }, [sendRequest])

    const handleButtonClick = () => {
        window.open(authorizationUrl, "_self");
        setButtonClicked(true);
    }

    let buttonContent = "Connect with Strava"
    let buttonState;
    if (isLoading) {
        buttonContent = "Loading...";
    }
    if (error) {
        buttonContent = "Something went wrong :(";
        buttonState = "error";
        console.log(buttonContent);
    }
    if (buttonClicked) {
        buttonContent = "Connecting...";
        buttonState = "disabled";
    }

    return (
        <>
            <p>
                It looks like you don’t have any bikes. Connect to Strava to import
                your bikes.
            </p>
            {authorizationUrl && <Button size="big" state={buttonState} onClick={handleButtonClick}> {buttonContent}</Button>}
        </>
    );
}

export default ConnectWithStrava;
