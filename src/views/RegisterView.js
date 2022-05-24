import React, {useState} from "react";
import useHttp from "../hooks/useHttp";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {useNavigate} from "react-router-dom";
import classes from "./view.module.scss";

const RegisterView = () => {
    const {isLoading, error, sendRequest: sendRegisterRequest} = useHttp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const navigate = useNavigate();

    const registerUserHandler = () => {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordsDontMatch(false);
        if (password === passwordCheck) {
            sendRegisterRequest({
                path: "/register", method: "POST", headers: {}, body: {
                    email: email,
                    password: password,
                },
            }, registerUserHandler);
        }
    else {
        setPasswordsDontMatch(true);
        }
    };

    const handleLoginClick = () => {
        navigate("/login");
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };
    const passwordCheckChangeHandler = (e) => {
        setPasswordCheck(e.target.value);
    };

    if (error) {
        return <p>Error registering user: {error}</p>;
    }
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
      <div className={classes.formContainer}>
            <h1>Register:</h1>
          <p className={classes.content}>Never lose access to your gear<br/>and bike care reminders</p>
              <form onSubmit={handleSubmit}>
                <Input
                    isRequired={true}
                    type="email"
                    name="e-mail"
                    value={email.value}
                    onChange={emailChangeHandler}
                />
                <Input
                    isRequired={true}
                    name="password"
                    type="password"
                    value={password.value}
                    onChange={passwordChangeHandler}
                />
                <Input
                    isRequired={true}
                    name="repeat password"
                    type="password"
                    value={passwordCheck.value}
                    onChange={passwordCheckChangeHandler}
                />
                {passwordsDontMatch && <p>Entered passwords don't match.</p>}
                <div className={classes.buttonContainer}>
                    <Button type="submit" size="big">
                        Register
                    </Button>
                    <Button size="big" priority="secondary" onClick={handleLoginClick}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}
export default RegisterView;
