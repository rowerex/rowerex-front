import React, {useContext, useEffect, useState} from "react";
import Button from "../UI/Button/Button";
import Dropdown from "../UI/Input/Dropdown";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";

const InstallPart = (props) => {
    const {partsListIsLoading, partsListIsError, sendRequest: getPartsList} = useHttp();
    const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
    const {parts, partsDispatcher} = useContext(PartsContext)
    const [selectedPartId, setSelectedPartId] = useState("");
    const [partsList, setPartsList] = useState([]);

    //TODO: refresh dropdown options after creating new part
    useEffect(() => {
        const loadParts = (loadedParts) => {
            console.log(loadedParts)
            setPartsList(loadedParts);
        }

        getPartsList({
            method: "GET",
            path: "/parts",
        }, loadParts);

    }, [getPartsList])

    const partOptions = partsList.map((part) => {
        const option = {};
        option.label = part.modelName;
        option.value = part.id;
        return option;
    })

    const submitHandler = (e) => {
        e.preventDefault();

        sendPart({
            path: "/parts/" + selectedPartId + "/install/" + props.bikeId,
            method: "POST",
        }, installPartHandler);
    }

    const installPartHandler = () => {
        console.log("installparthandler")
        partsDispatcher({type: "INVALIDATE_PARTS"});
        props.onSuccess();
    }

    return (
        <>
            <p>Select a part to install to {props.bikeName} </p>
            <Button priority="secondary" size="big" onClick={props.onClick}>Create new part </Button>
            <p>or</p>
            <Dropdown name="Select part" isRequired="true" options={partOptions}
                      onChange={event => setSelectedPartId(event.value)}/>
            <Button size="big" type="submit" onClick={submitHandler}>Install</Button>
        </>
    );
}

export default InstallPart;