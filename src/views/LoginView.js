import React, {useState} from "react";
import useHttp from "../hooks/useHttp";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";

const LoginView = ({setToken}) => {
    const {isLoading, error, sendRequest: sendLoginRequest} = useHttp();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const loginUserHandler = (token) => {
        setToken(token);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendLoginRequest({
            path: "/login", method: "POST", body: {
                username,
                password,
            },
            headers: {
                "Content-Type": "application/json",
            },
        }, loginUserHandler);
    };

    const handleRegisterClick = () => {
            navigate("/register");
    }

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    };
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    if (error) {
        return <p>Error logging in: {error}</p>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    isRequired={true}
                    name="username"
                    value={username.value}
                    onChange={usernameChangeHandler}
                />
                <Input
                    isRequired={true}
                    name="password"
                    type="password"
                    value={password.value}
                    onChange={passwordChangeHandler}
                />
                <div>
                    <Button type="submit" size="big">
                        Login
                    </Button>
                    <Button  size="big" priority="secondary" onClick={handleRegisterClick}>
                        Register
                    </Button>
                </div>
            </form>
        </>
    );
}
export default LoginView;
