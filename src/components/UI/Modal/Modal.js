import React from "react";
import classes from "./Modal.module.scss";

const Modal = (props) => {
  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.backdrop} onClick={props.onClose}>
      <div className={classes.modal} onClick={handleChildClick}>
        <header>
          <h2 className={classes.title}>{props.title}</h2>
        </header>
        <div className={classes.modalContent}>{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;
