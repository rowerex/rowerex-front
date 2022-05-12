import Button from "../UI/Button/Button";
import React, {useContext} from "react";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";

const DetachPart = (props) => {
    const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
    const {partsDispatcher} = useContext(PartsContext)


    const submitHandler = (e) => {
        e.preventDefault();
        sendPart({
            path: "/parts/" + props.partId + "/remove",
            method: "POST",
        }, detachPartHandler);
    }
    const detachPartHandler = () => {
        console.log("detachparthandler")
        partsDispatcher({type: "INVALIDATE_PARTS"});
        props.onSuccess();
    }
    return (
        <>
            <p>Part to detach: <strong>{props.partName} </strong></p>
            <Button size="big" priority="secondary" type="submit" onClick={submitHandler}>Just detach</Button>
        </>
    );
};

export default DetachPart;