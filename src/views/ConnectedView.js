import React, {useEffect, useState, useMemo} from "react";
import {useLocation} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import useToken from "../services/useToken";
import useQuery from "../hooks/useQuery";

const ConnectedView = () => {
    const {isLoading, error, sendRequest} = useHttp();
    const {token} = useToken();
    const [connected, setConnected] = useState(false);

    let queryParams = useQuery();
    let code = queryParams.get('code');
console.info(connected);
    useEffect(() => {
        const submitStravaCode = () => {
            console.log("set connected")
            setConnected(true);
        };
        sendRequest({
            method: "POST",
            path: "/strava/authorize",
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': token,
            },
            body: {
                "code": code
            }
        }, submitStravaCode);

    }, [sendRequest, code])

    return (
        <>
            {!connected ? <p>Loading...</p> : <p>Successfully connected with Strava!</p> }
        </>
    );
}

export default ConnectedView;