import React, {useEffect, useState} from "react";
import HeaderBig from "../components/Layout/HeaderBig/HeaderBig";
import Image from "../assets/images/Wilier-Filante-SLR.jpg";
import partImage from "../assets/images/sram-X1X-horizon-rear-dereailleur.png";
import ListElement from "../components/UI/ListElement/ListElement";
import Button from "../components/UI/Button/Button";
import Card from "../components/UI/Card";
import Stats from "../components/UI/Stats/Stats";
import {useParams} from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Modal from "../components/UI/Modal/Modal";
import InstallPart from "../components/Modals/InstallPart";
import CreateNewPart from "../components/Forms/CreateNewPart/CreateNewPart";
import DetachPart from "../components/Modals/DetachPart";

const DUMMY_BIKE = {
    bikeName: "Wilier Filante SLR",
    totalDistance: "213700 km",
    totalRideTime: "213 h",
    lastRide: "69 km",
    lastRideDate: "2.01.2022",
    rideCount: "455",
    firstRide: "10.05.2010",
    parts: [
        {
            id: "p1",
            modelName: "Shimano Dura-ace FC-R9100",
            partType: "Crankset",
        },
        {
            id: "p2",
            modelName: "SRAM Eagle X01 CN-EAGL-X01-A1",
            partType: "Chain",
        },
        {
            id: "p3",
            modelName: "Marzocchi Bomber MX Comp ETA 120 mm",
            partType: "Front Fork",
        },
        {
            id: "p4",
            modelName: "Shimano Deore XT CN-HG93",
            partType: "chain",
        },
    ]
};

const BikeView = () => {
    const {bikeId} = useParams();
    const {isLoading, error, sendRequest: getBike} = useHttp();
    const [bike, setBike] = useState({});
    const [installPartModalIsOpen, setInstallPartModalIsOpen] = useState(false);
    const [createNewPartModalIsOpen, setCreateNewPartModalIsOpen] = useState(false);
    const [detachPartModalIsOpen, setDetachPartModalIsOpen] = useState(false);
    const [selectedPart, setSelectedPart] = useState({});

    useEffect(() => {
        const loadBike = (loadedbike) => {
            setBike(loadedbike);
        }
        getBike({
            method: "GET",
            path: "/bikes/" + bikeId,
        }, loadBike)

    }, [getBike])
    const openInstallPartModalHandler = () => {
        setInstallPartModalIsOpen(true);
    }
    const closeInstallPartModalHandler = () => {
        setInstallPartModalIsOpen(false);
    }

    const openCreateNewPartModalHandler = () => {
        setCreateNewPartModalIsOpen(true);
    }
    const closeCreateNewPartModalHandler = () => {
        setCreateNewPartModalIsOpen(false);
    }

    const openDetachPartModalHandler = () => {
        setDetachPartModalIsOpen(true);
    }
    const closeDetachPartModalHandler = () => {
        setDetachPartModalIsOpen(false);
    }
    // if (isLoading) {
    //   return <p> Loading bike</p>
    // }

    // const detachButtonClickHandler = () => {
    //     setSelectedPart({
    //         id: part.id,
    //         name: part.name
    //     })
    //     openDetachPartModalHandler();
    // }

    if (bike.parts) {
        return (
            <>
                <HeaderBig image={Image} alt="image of a bike">
                    {bike.name}
                </HeaderBig>
                <Card>
                    <h3>Bicycle stats</h3>
                    <Stats stats={[
                        {label: 'Total distance', value: bike.totalDistance},
                        {label: 'Total ride time', value: bike.totalRideTime},
                        {label: 'Last Ride Distance', value: DUMMY_BIKE.lastRide}, //todo get actual data
                        {label: 'Last Ride Date', value: DUMMY_BIKE.lastRideDate}, //todo get actual data
                        {label: 'Ride count', value: DUMMY_BIKE.rideCount}, //todo get actual data
                        {label: 'First ride', value: DUMMY_BIKE.firstRide}, //todo get actual data
                    ]}/>
                </Card>
                <ul>
                    {
                        bike.parts.map((part) => (
                            <ListElement
                                image={partImage}
                                key={part.id}
                                title={part.name}
                                label={part.modelName}
                                buttons={[<Button variant="service">Service</Button>,<Button variant="detach" priority="secondary" onClick={()=>{        setSelectedPart({
            id: part.id,
            name: part.name
        })
        openDetachPartModalHandler();}}>Detach</Button>]}
                            />
                        ))
                    }
                </ul>
                {installPartModalIsOpen === true && (
                    <Modal
                        title="Install part"
                        onClose={closeInstallPartModalHandler}
                    >
                        <InstallPart bikeName={bike.name} bikeId={bike.id} onClick={openCreateNewPartModalHandler}
                                     onSuccess={closeInstallPartModalHandler}/>
                    </Modal>
                )}
                {createNewPartModalIsOpen === true && (
                    <Modal
                        title="Create new Part"
                        onClose={closeCreateNewPartModalHandler}
                    >
                        <CreateNewPart onSuccess={closeCreateNewPartModalHandler}/>
                    </Modal>
                )}
                {detachPartModalIsOpen === true && (
                    <Modal
                        title="Detach part"
                        onClose={closeDetachPartModalHandler}
                    >t
                        <DetachPart partId={selectedPart.id} partName={selectedPart.name} onSuccess={closeCreateNewPartModalHandler}/>
                    </Modal>
                )}
                <Button size="fab" variant="add" onClick={openInstallPartModalHandler}>Install part</Button>

            </>
        );
    } else {
        return <p> something went wrong</p>
    }
};

export default BikeView;
