import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import useToken from "../../../services/useToken";
import useHttp from "../../../hooks/useHttp";
import { ReactComponent as StravaButton } from "../../../assets/strava/btn_strava_connectwith_orange.svg";
import classes from "./ConnectWithStrava.module.scss";
const TRACKING_ID = "G-JB23VNT158";
ReactGA.initialize(TRACKING_ID);

const ConnectWithStrava = () => {
  const { sendRequest: getStravaURL } = useHttp();
  const [authorizationUrl, setAuthorizationUrl] = useState("");
  const { token } = useToken();

  useEffect(() => {
    const enableStravaConnection = (data) => {
      setAuthorizationUrl(data.authorizationUrl);
    };
      ReactGA.event({
          category: "Strava",
          action: "connect-opened",
          label: "Opened Connect with Strava",
          transport: "xhr",
      });
    getStravaURL(
      {
        method: "GET",
        path: "/strava/authorization-url",
        headers: {
          "X-AUTH-TOKEN": token,
          "Content-Type": "application/json",
        },
      },
      enableStravaConnection
    );
  }, [getStravaURL]);

  const handleButtonClick = () => {
      ReactGA.event({
          category: "Strava",
          action: "connect-clicked",
          label: "Clicked Connect with Strava button",
          transport: "xhr",
      });

      window.open(authorizationUrl, "blank");
  };

  return (
    <>
      <p>
        We need permission to use data from your Strava account to track parts
        use. Authorize connection to import your bikes.
      </p>
      {authorizationUrl && (
        <StravaButton
          className={classes.stravaButton}
          onClick={handleButtonClick}
        />
      )}
    </>
  );
};

export default ConnectWithStrava;
