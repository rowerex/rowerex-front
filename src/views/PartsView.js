import React, {useState} from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Parts from "../components/Parts/Parts";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import CreateNewPart from "../components/Forms/CreateNewPart/CreateNewPart";
import PartsProvider from "../store/PartsProvider";

const PartsView = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const closeModalHandler = () => {
        setModalIsOpen(false);
    };
    const openModalHandler = () => {
        setModalIsOpen(true);
    };


    return (
        <PartsProvider>
            <Header image={Image} alt="cat looking at the bike part">
                My Parts
            </Header>
            {modalIsOpen === true && (
                <Modal
                    title="Create new Part"
                    onClose={closeModalHandler}
                >
                    <CreateNewPart onSuccess={closeModalHandler}/>
                </Modal>
            )}
            <Parts/>
            <Button size="fab" variant="add" onClick={openModalHandler}>
                Create part
            </Button>
        </PartsProvider>
    );
};

export default PartsView;
