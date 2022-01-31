import React from "react";
import Card from "../Card";
import Button from "../Button/Button";
import classes from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <>
      <div className={classes.backdrop} />
      <div className={classes.container}>
        <Card className={classes.modal}>
          <header>
            <h2>{props.title}</h2>
          </header>
          <div>
            <p>{props.message}</p>
          </div>
          <footer>
            <Button size="big">{props.button}</Button>
          </footer>
        </Card>
      </div>
    </>
  );
};

export default Modal;
