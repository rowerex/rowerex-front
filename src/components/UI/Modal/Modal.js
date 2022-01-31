import React from "react";
import Card from "../Card";
import Button from "../Button/Button";
import classes from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose} />
      {/* <div className={classes.container}> */}
      <Card className={classes.modal}>
        <header>
          <h2 className={classes.title}>{props.title}</h2>
        </header>
        <div className={classes.content}>{props.children}</div>
        <footer>
          <Button size="big" onClick={props.onConfirm}>
            {props.button}
          </Button>
        </footer>
      </Card>
      {/* </div> */}
    </>
  );
};

export default Modal;
