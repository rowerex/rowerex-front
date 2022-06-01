import React from "react";
import classes from "./Modal.module.scss";
import Button from "../Buttons/Button";

const Modal = (props) => {
  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.backdrop} onClick={props.onClose}>
      <div className={classes.modal} onClick={handleChildClick}>
        <header>
          <h2 className={classes.title}>{props.title}</h2>
          <Button size="icon" variant="close" classes={classes.closeButton} onClick={props.onClose}/>
        </header>
        <div className={classes.modalContent}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
