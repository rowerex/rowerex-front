import React, {useRef} from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Buttons/Button";
import classes from "./Form.module.scss";
import useHttp from "../../hooks/useHttp";

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
      path: "/parts/"+props.partId+"/service", method: "POST", body: newServiceEntry
    }, serviceHandler);
  };

  let buttonClasses = classes.button; //@todo change button class to error when error occurs
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
    <form className={classes.form} onSubmit={submitHandler}>
      <Input isRequired={true} name="Service date" type="date" ref={serviceDateRef}/>
      <Input isRequired={true} name="Description" ref={descriptionRef} type="textarea"/>
      <Button classes={buttonClasses} size="big" type="submit">
        {buttonContent}
      </Button>
    </form>
  );
};

export default ServicePart;
