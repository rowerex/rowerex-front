import React, {useContext} from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Button from "../components/UI/Buttons/Button";
import {useNavigate} from "react-router-dom";
import TokenContext from "../store/TokenContext";

const UserVIew = () => {
  const {setToken} = useContext(TokenContext)
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setToken(false);
    navigate("/login");
  }

  return (
    <>
      <Header image={Image} alt="cat looking at the bike.">
        User
      </Header>
      <Button size="big" onClick={handleLogoutClick}>Logout</Button>
    </>
  );
};

export default UserVIew;
