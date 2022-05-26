import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import useQuery from "../hooks/useQuery";
import Button from "../components/UI/Buttons/Button";

const ConnectedView = () => {
    const {isLoading, error, sendRequest} = useHttp();
    const [connected, setConnected] = useState(false);

    let code = null;
    let queryParams = useQuery();
    code = queryParams.get('code');

    useEffect(() => {
        const submitStravaCode = () => {
            console.log("set connected")
            setConnected(true);
        };
        sendRequest({
            method: "POST",
            path: "/strava/authorize",
            body: {
                "code": code
            }
        }, submitStravaCode);

    }, [sendRequest, code])

    return (
        <>
            {!connected ? <p>Loading...</p> : <>
            <p>Successfully connected with Strava!</p>
            <NavLink to="/bikes">
                <Button size="big">Ok</Button>
            </NavLink>
            </> }
        </>
    );
}

export default ConnectedView;
