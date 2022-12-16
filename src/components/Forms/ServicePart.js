import React, {useRef} from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Buttons/Button";
import useHttp from "../../hooks/useHttp";
import Modal from "../UI/Modal/Modal";
import displayName from "../../services/displayName";

const ServicePart = (props) => {
  const {isLoading, error, sendRequest} = useHttp();

  const descriptionRef = useRef(null);
  const serviceDateRef = useRef(null);

  const serviceHandler = () => {
    props.onSuccess();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const newServiceEntry = {
      description: descriptionRef.current.value,
      serviceTime: serviceDateRef.current.value,
    };

    sendRequest({
      path: "/parts/" + props.partId + "/service", method: "POST", body: newServiceEntry
    }, serviceHandler);
  };

  let buttonContent = "Add Service";

  if (isLoading) {
    buttonContent = "Sending...";
  }
  if (error) {
    console.log(error)
    buttonContent = "Something went wrong :(";
    console.log(buttonContent);
  }

  return (
    <Modal
      title="Service Part"
      onClose={props.onClose}
    >
      <p>Enter service data of <strong>{displayName(props.modelName, props.partId)}</strong></p>
      <form onSubmit={submitHandler}>
        <Input isRequired={true} name="Service date" type="date" ref={serviceDateRef}/>
        <Input isRequired={true} name="Description" ref={descriptionRef} type="textarea" maxLength={1024}/>
        <Button size="big" type="submit">
          {buttonContent}
        </Button>
      </form>
    </Modal>
  );
};

export default ServicePart;
