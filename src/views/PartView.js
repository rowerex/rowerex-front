import React, {useContext, useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/Wilier-Filante-SLR.jpg";
import Card from "../components/UI/Card";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Button from "../components/UI/Buttons/Button";
import Modal from "../components/UI/Modal/Modal";
import ServicePart from "../components/Forms/ServicePart";
import PartsContext from "../store/PartsContext";

const PartView = () => {
    const {partId} = useParams();
    const {isLoading, error, sendRequest: getPart} = useHttp();
    const [part, setPart] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [partIsInvalidated, setPartIsInvalidated] = useState(false);

    const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
    const {partsDispatcher} = useContext(PartsContext)
    const [isRetired, setIsRetired] = useState(false);

    const closeModalHandler = () => {
        setModalIsOpen(false);
        setPartIsInvalidated(true);
    };
    const openModalHandler = () => {
        setModalIsOpen(true);
    };

    useEffect(() => {
        const loadPart = (loadedPart) => {
            setPart(loadedPart);
            setPartIsInvalidated(false);
        }
        getPart({
            method: "GET",
            path: "/parts/" + partId,
        }, loadPart)
    }, [getPart, partIsInvalidated])

    const retire = () => {
        sendPart({
            path: "/parts/" + partId + "/retire",
            method: "POST",
        }, retirePartHandler);
    }

    const retirePartHandler = () => {
        partsDispatcher({type: "INVALIDATE_PARTS"});
        setIsRetired(true);
    }
    if (part) {
        console.log(part)
        const history = part.history.map((event) => (
            <> <p>{event.date}</p>
                <p>{event.type}</p>
                <p>{event.description}</p>
            </>
        ))
        let problems = <p>No problems found.</p>
        if (part.problems.length > 0) {
            problems = part.problems.map((type) => (
                <>
                    <h4>{type === "wear" ? "wear limit exceeded" : "service interval exceeded"}</h4>
                    {type.exceptions.map((exception)=> (
                        <p>{`${exception.type}: ${exception.text}`}</p>
                        ))
                    }
                </>))

        }
        return (
            <>
                <HeaderBig image={Image} alt="image of a part" label={part.partType}
                           description={part.bikeName ? `installed to ${part.bikeName}` : `on shelf`}>
                    {part.modelName}
                </HeaderBig>
                    <Card>
                        <h3>Problems</h3>
                        {problems}
                    </Card>
                <Card>
                    <h3>Wear stats</h3>
                    <Stats stats={[
                        {label: 'Distance', value: part.totalDistance + ' / ' + (part.distanceDurability ?? '-')},
                        {label: 'Ride time', value: part.totalRideTime + ' / ' + (part.rideTimeDurability ?? '-')},
                        {label: 'Age', value: part.totalTime + ' / ' + (part.timeDurability ?? '-')},
                    ]}/>
                    <Button size="big" onClick={retire}>{isRetired ? "Retired" : "Retire"}</Button>
                </Card>
                <Card>
                    <h3>Service stats</h3>
                    <Stats stats={[
                        {
                            label: 'Distance',
                            value: part.distanceSinceService + ' / ' + (part.distanceServiceInterval ?? '-')
                        },
                        {
                            label: 'Ride time',
                            value: part.rideTimeSinceService + ' / ' + (part.rideTimeServiceInterval ?? '-')
                        },
                        {label: 'Age', value: part.timeSinceLastService + ' / ' + (part.timeServiceInterval ?? '-')},
                    ]}/>
                    <Button size="big" variant="service" onClick={openModalHandler}>
                        Service
                    </Button>
                </Card>
                <Card>
                    <h3>Part history</h3>
                    {history}
                    <Button size="big" onClick={retire}>{isRetired ? "Retired" : "Retire"}</Button>
                </Card>
                {modalIsOpen === true && (
                    <Modal
                        title="Service Part"
                        onClose={closeModalHandler}
                    >
                        <ServicePart partId={part.id} onSuccess={closeModalHandler}/>
                    </Modal>
                )}
            </>
        );
    } else {
        return <p> something went wrong</p>
    }
};

export default PartView;
