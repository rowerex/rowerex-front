import React, { useEffect, useState } from "react";
import useToken from "../../../services/useToken";
import useHttp from "../../../hooks/useHttp";
import { ReactComponent as StravaButton } from "../../../assets/strava/btn_strava_connectwith_orange.svg";
import classes from "./ConnectWithStrava.module.scss";

const ConnectWithStrava = () => {
  const { sendRequest: getStravaURL } = useHttp();
  const [authorizationUrl, setAuthorizationUrl] = useState("");
  const { token } = useToken();

  useEffect(() => {
    const enableStravaConnection = (data) => {
      setAuthorizationUrl(data.authorizationUrl);
    };
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
    window.open(authorizationUrl, "_self");
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
