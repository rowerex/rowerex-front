import React, {useState} from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./Login.module.scss";
import useHttp from "../../hooks/useHttp";

const Login = ({setToken}) => {
    const {isLoading, error, sendRequest: sendLoginRequest} = useHttp();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                    name="username"
                    value={username.value}
                    onChange={usernameChangeHandler}
                />
                <Input
                    name="password"
                    type="password"
                    value={password.value}
                    onChange={passwordChangeHandler}
                />
                <div>
                    <Button type="submit" size="big">
                        Login
                    </Button>
                </div>
            </form>
        </>
    );
}
export default Login;
