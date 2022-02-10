import React, { useState } from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Parts from "../components/Parts/Parts";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import CreateNewPart from "../components/Forms/CreateNewPart/CreateNewPart";

const PartsView = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalHandler = () => {
    setModalIsOpen(false);
  };
  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <Header image={Image} alt="cat looking at the bike part">
        My Parts
      </Header>
      {modalIsOpen === true && (
        <Modal
          title="Create new Part"
          onConfirm={modalHandler}
          onClose={modalHandler}
        >
          <CreateNewPart />
        </Modal>
      )}
      <Parts />

      <Button size="fab" variant="add" onClick={openModalHandler}>
        Create part
      </Button>
    </>
  );
};

export default PartsView;
