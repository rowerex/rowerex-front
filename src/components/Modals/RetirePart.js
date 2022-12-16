import Button from "../UI/Buttons/Button";
import React, {useContext, useRef} from "react";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";
import classes from "./DetachPart.module.scss";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";

const RetirePart = (props) => {
  const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
  const {partsDispatcher} = useContext(PartsContext)
  const dateRef = useRef(null);

  const retire = (e) => {
    e.preventDefault();

    sendPart({
      path: "/parts/" + props.partId + "/retire",
      method: "POST",
      body: {
        retireTime: dateRef.current.value
      }
    }, retirePartHandler);
  }

  const retirePartHandler = () => {
    partsDispatcher({type: "INVALIDATE_PARTS"});
    props.onSuccess();
  }

  return (
    <Modal
      title="Retire Part"
      onClose={props.onClose}
    >
      <p>Retire <strong>{props.partName}</strong></p>
      <form>
        <Input isRequired={true} name="select date" type="date" ref={dateRef}/>
        <div className={classes.sideBySideWrapper}>
          <Button size="big" type="submit" variant="retire" onClick={retire}>Retire</Button>
        </div>
      </form>
    </Modal>
  );
};

export default RetirePart;
