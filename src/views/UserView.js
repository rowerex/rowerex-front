import React, {useContext, useEffect, useState} from "react";
import ReactGA from "react-ga4";
import Button from "../components/UI/Buttons/Button";
import {useNavigate} from "react-router-dom";
import TokenContext from "../store/TokenContext";
import classes from './ListView.module.scss';
import useHttp from "../hooks/useHttp";
import PartsContext from "../store/PartsContext";
import BikesContext from "../store/BikesContext";
import {ReactComponent as Strava} from "../assets/strava/api_logo_pwrdBy_strava_horiz_gray.svg";
import StatefulButton from "../components/UI/Buttons/StatefulButton";
const TRACKING_ID = "G-JB23VNT158";
ReactGA.initialize(TRACKING_ID);

const UserVIew = () => {
  const [stravaStatus, setStravaStatus] = useState(false);
  const {isLoading, error, sendRequest} = useHttp();
  const {partsDispatcher} = useContext(PartsContext);
  const {bikesDispatcher} = useContext(BikesContext);

  const {setToken} = useContext(TokenContext)
  const navigate = useNavigate();

  useEffect(() => {
    const loadStravaStatus = (stravaStatus) => {
      console.log(stravaStatus)
      setStravaStatus(stravaStatus);
    }
    sendRequest({
      method: "GET",
      path: "/strava/synchronization/status",
    }, loadStravaStatus)
  }, [setStravaStatus])

  const handleLogoutClick = () => {
    setToken(false);
    navigate("/login");
  }

  const importHandler = () => {
    partsDispatcher({type: "INVALIDATE_PARTS"});
    bikesDispatcher({type: "INVALIDATE_BIKES"});
  }

  const handleImportClick = () => {
    ReactGA.event({
      category: "Strava",
      action: "import-clicked",
      label: "Clicked import rides from Strava",
      transport: "xhr",
    });
    return sendRequest({
      method: "GET",
      path: "/strava/rides/update",
    }, importHandler);
  }

  return (
    <div className={classes.viewContainer}>
      <h2>
        User
      </h2>
      <Button size="big" onClick={handleLogoutClick}>Logout</Button>
      <h2>
        Strava
      </h2>
      {!stravaStatus ? <p>Loading...</p> : <>
        <ul>
          <li>Import status: {stravaStatus.status}</li>
          <li>All imported rides: {stravaStatus.importedActivitiesCount}</li>
          {(stravaStatus.importedActivitiesCount > 0) && <li>Oldest ride: {stravaStatus.oldestActivity.date.substring(0,10)} {stravaStatus.oldestActivity.name}</li>}
          {(stravaStatus.importedActivitiesCount > 0) && <li>Latest ride: {stravaStatus.latestActivity.date.substring(0,10)} {stravaStatus.latestActivity.name}</li>}
        </ul>
      </> }
      <StatefulButton size="big" onClick={handleImportClick} successLabel={"Imported"} disableOnSuccess={false}>Import rides from Strava</StatefulButton>
      <Strava className={classes.strava}/>
    </div>
  );
};

export default UserVIew;
