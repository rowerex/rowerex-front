import Button from "../../UI/Buttons/Button";
import React, {useEffect, useState} from "react";
import useToken from "../../../services/useToken";
import useHttp from "../../../hooks/useHttp";

const ConnectWithStrava = () => {
  const {isLoading, error, sendRequest: getStravaURL} = useHttp();
    const [authorizationUrl, setAuthorizationUrl] = useState("");
    const [buttonClicked, setButtonClicked] = useState(false);
    const {token} = useToken();

  console.log(authorizationUrl)


  useEffect(() => {
    const enableStravaConnection = (data) => {
      setAuthorizationUrl(data.authorizationUrl);
    };
    getStravaURL({
      method: "GET",
      path: "/strava/authorization-url",
      headers: {
        'X-AUTH-TOKEN': token,
        "Content-Type": "application/json",
      },
    }, enableStravaConnection);

  }, [getStravaURL]);



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
                It looks like you're not connected to Strava. Connect to Strava to import
                your bikes.
            </p>
            {authorizationUrl && <Button size="big" state={buttonState} onClick={handleButtonClick}> {buttonContent}</Button>}
        </>
    );
}

export default ConnectWithStrava;
