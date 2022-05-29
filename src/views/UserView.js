import React, {useContext} from "react";
import Button from "../components/UI/Buttons/Button";
import {useNavigate} from "react-router-dom";
import TokenContext from "../store/TokenContext";
import classes from './ListView.module.scss';

const UserVIew = () => {
  const {setToken} = useContext(TokenContext)
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setToken(false);
    navigate("/login");
  }

  return (
    <div className={classes.viewContainer}>
      <h2>
        User
      </h2>
      <Button size="big" onClick={handleLogoutClick}>Logout</Button>
    </div>
  );
};

export default UserVIew;
