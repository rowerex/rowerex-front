import React, {useContext} from "react";
import Button from "../components/UI/Buttons/Button";
import {useNavigate} from "react-router-dom";
import TokenContext from "../store/TokenContext";
import classes from './ListView.module.scss';
import useHttp from "../hooks/useHttp";
import PartsContext from "../store/PartsContext";
import BikesContext from "../store/BikesContext";

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
      <Button size="big" onClick={handleImportClick}>Import rides from strava</Button>
    </div>
  );
};

export default UserVIew;
