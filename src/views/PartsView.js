import React, { useState } from "react";
import Header from "../components/Layout/Header/Header";
import Image from "../assets/images/vector.png";
import Parts from "../components/Parts/Parts";
import useParts from "../components/Parts/useParts";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Button/Button";
import CreateNewPartForm from "../components/Forms/CreateNewPartForm/CreateNewPartForm";

const PartsView = () => {
  const [parts, error] = useParts();
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
          button="Create"
          type="submit"
          onConfirm={modalHandler}
          onClose={modalHandler}
        >
          <CreateNewPartForm />
        </Modal>
      )}

      {error !== null ? (
        <p>Error fetching parts: {error}</p>
      ) : (
        <Parts parts={parts} />
      )}
      <Button size="fab" variant="add" onClick={openModalHandler}>
        Create part
      </Button>
    </>
  );
};

export default PartsView;
