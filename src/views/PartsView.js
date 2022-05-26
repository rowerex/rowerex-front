import React, {useState} from "react";
import Parts from "../components/Parts/Parts";
import Modal from "../components/UI/Modal/Modal";
import Button from "../components/UI/Buttons/Button";
import CreateNewPart from "../components/Forms/CreateNewPart";
import classes from "./ListView.module.scss";

const PartsView = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  const openModalHandler = () => {
    setModalIsOpen(true);
  };

  return (
    <div className={classes.viewContainer}>
      <h2>
        My Parts
      </h2>
      <Button size="big" variant="add" onClick={openModalHandler}>
        Create part
      </Button>
      {modalIsOpen === true && (
        <Modal
          title="Create new Part"
          onClose={closeModalHandler}
        >
          <CreateNewPart onSuccess={closeModalHandler}/>
        </Modal>
      )}
      <Parts/>
    </div>
  );
};

export default PartsView;
