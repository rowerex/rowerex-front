import Button from "../UI/Buttons/Button";
import React, {useContext, useRef} from "react";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";
import classes from "./DetachPart.module.scss";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";

const DetachPart = (props) => {
  const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
  const {partsDispatcher} = useContext(PartsContext)
  const dateRef = useRef(null);

  const putOnShelf = (e) => {
    e.preventDefault();

    sendPart({
      path: "/parts/" + props.partId + "/remove",
      method: "POST",
      body: {
        detachTime: dateRef.current.value
      }
    }, detachPartHandler);
  }

  const detachPartHandler = () => {
    console.log("detachparthandler")
    partsDispatcher({type: "INVALIDATE_PARTS"});
    props.onSuccess();
  }

  return (
    <Modal
      title="Remove Part"
      onClose={props.onClose}
    >
      <p>Remove <strong>{props.partName}</strong> from <strong>{props.bikeName}</strong></p>
      <form>
        <Input isRequired={true} name="select date" type="date" ref={dateRef}/>
        <div className={classes.sideBySideWrapper}>
          <Button size="big" type="submit" onClick={putOnShelf}>Put on shelf</Button>
        </div>
      </form>
    </Modal>
  );
};

export default DetachPart;
