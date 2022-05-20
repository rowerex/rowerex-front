import React from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Button from "../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import useToken from "../services/useToken";

const UserVIew = () => {
    const {setToken} = useToken();
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
