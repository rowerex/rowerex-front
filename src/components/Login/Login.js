import React, { useState } from "react";
import { postLogin } from "../../services/requests";
import Button from "../UI/Button/Button";
import classes from "./Login.module.scss";

async function loginUser(credentials) {
  return fetch(...postLogin(credentials)).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };
  return (
    <>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <Button type="submit" size="big">
            Login
          </Button>
        </div>
      </form>
    </>
  );
}
