import React, {useContext, useEffect, useState} from "react";
import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import useQuery from "../hooks/useQuery";
import Button from "../components/UI/Buttons/Button";
import classes from "./ListView.module.scss";
import Modal from "../components/UI/Modal/Modal";
import UserContext from "../store/UserContext";
const TRACKING_ID = "G-JB23VNT158";
ReactGA.initialize(TRACKING_ID);

const ConnectedView = () => {
    const {sendRequest: sendStravaCode} = useHttp();
    const [connected, setConnected] = useState(false);
    const {userDispatcher} = useContext(UserContext);

  let navigate = useNavigate();
    let code = null;
    let queryParams = useQuery();
    code = queryParams.get('code');

    useEffect(() => {
        const submitStravaCode = () => {
            console.log("set connected")
            setConnected(true);
            ReactGA.event({
                category: "Strava",
                action: "connected",
                label: "Connected with Strava",
                transport: "xhr",
            });
            userDispatcher({type: "INVALIDATE_USER"});
        };
        sendStravaCode({
            method: "POST",
            path: "/strava/authorize",
            body: {
                "code": code
            }
        }, submitStravaCode);

    }, [sendStravaCode, code])

    const closeModalHandler = () => {
        navigate("/");
    }

    return (
      <div className={classes.viewContainer}>
            {!connected ? <p>Loading...</p> : <>
                <Modal
                  title="Strava connection"
                onClose={closeModalHandler}
                >
                    <p>Successfully connected with Strava!</p>
                        <Button size="big" onClick={closeModalHandler}>Ok</Button>
                </Modal>
            </> }
        </div>
    );
}

export default ConnectedView;
