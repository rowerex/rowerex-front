import React from "react";
import Card from "../Card";
import classes from "./Modal.module.scss";

const Modal = (props) => {
  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={classes.backdrop} onClick={props.onClose}>
      <Card className={classes.modal} onClick={handleChildClick}>
        <header>
          <h2 className={classes.title}>{props.title}</h2>
        </header>
        <div className={classes.content}>{props.children}</div>
      </Card>
    </div>
  );
};

export default Modal;
