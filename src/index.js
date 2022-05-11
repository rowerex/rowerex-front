import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "./normalize.scss";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./store/UserProvider";
import PartsProvider from "./store/PartsProvider";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <PartsProvider>
                    <App/>
                </PartsProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// comment to trigger build on 25.04.2022, can be removed
