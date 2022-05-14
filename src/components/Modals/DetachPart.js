import Button from "../UI/Button/Button";
import React, {useContext} from "react";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";
import classes from "./DetachPart.module.scss";

const DetachPart = (props) => {
    const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
    const {partsDispatcher} = useContext(PartsContext)

    const putOnShelf = () => {
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

    const retire = () => {
        sendPart({
            path: "/parts/" + props.partId + "/retire",
            method: "POST",
        }, retirePartHandler);
    }

    const retirePartHandler = () => {
        partsDispatcher({type: "INVALIDATE_PARTS"});
        props.onSuccess();
    }

    return (
        <>
            <p>Part to detach: <strong>{props.partName} </strong></p>
            <div className={classes.sideBySideWrapper}>
                <Button size="big" onClick={putOnShelf}>Put on shelf</Button>
                <Button size="big" priority="secondary" onClick={retire}>Retire</Button>
            </div>
        </>
    );
};

export default DetachPart;