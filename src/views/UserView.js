import React, {useContext} from "react";
import ReactGA from "react-ga4";
import Button from "../components/UI/Buttons/Button";
import {useNavigate} from "react-router-dom";
import TokenContext from "../store/TokenContext";
import classes from './ListView.module.scss';
import useHttp from "../hooks/useHttp";
import PartsContext from "../store/PartsContext";
import BikesContext from "../store/BikesContext";
import {ReactComponent as Strava} from "../assets/strava/api_logo_pwrdBy_strava_horiz_gray.svg";
const TRACKING_ID = "G-JB23VNT158";
ReactGA.initialize(TRACKING_ID);

const UserVIew = () => {
  const {isLoading, error, sendRequest: getRides} = useHttp();
  const {partsDispatcher} = useContext(PartsContext);
  const {bikesDispatcher} = useContext(BikesContext);

  const {setToken} = useContext(TokenContext)
  const navigate = useNavigate();

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
    getRides({
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
      <Button size="big" onClick={handleImportClick}>Import rides from Strava</Button>
      <Strava className={classes.strava}/>
    </div>
  );
};

export default UserVIew;
