import React, { useState } from "react";
import { postLogin } from "../../services/requests";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./Login.module.scss";

async function loginUser(credentials) {
  return fetch(...postLogin(credentials)).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log(username);
    console.log(password);
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

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
