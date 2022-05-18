import React, {useContext, useEffect, useRef, useState} from "react";
import Dropdown from "../UI/Input/Dropdown";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import useTypes from "../../services/useTypes";
import classes from "./Form.module.scss";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";

const CreateNewPart = (props) => {
  const {isLoading, error, sendRequest} = useHttp();
  const {parts, partsDispatcher} = useContext(PartsContext)
  const [selectedType, setSelectedType] = useState(null);
  const [selectedModel, setSelectedModel] = useState("");

  const nameRef = useRef(null);
  const [models, setModels] = useState([]);
  const productionDateRef = useRef(null);
  const [types, typesError, typesLoading] = useTypes(); //todo ?? refactor to useHttp?
  const typeOptions = types.map((type) => {
    const option = {};
    option.label = type.name;
    option.value = type.id;
    return option;
  })
  const modelOptions = models.map((model) => {
    const option = {};
    option.label = model.name;
    option.value = model.id;
    return option;
  })

  const addPartHandler = (partRequestData) => {
    partsDispatcher({type: "INVALIDATE_PARTS"});
    props.onSuccess();
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const newPart = {
      name: nameRef.current.value,
      modelId: selectedModel,
      productionDate: productionDateRef.current.value,
    };

    sendRequest({
      path: "/parts", method: "POST", body: newPart
    }, addPartHandler);
  };

  useEffect(() => {
    if (selectedType !== null) {
      sendRequest({path: "/models?type=" + selectedType}, setModels);
    }
  }, [selectedType])

  let buttonClasses = classes.button; //@todo change button class to error when error occurs
  let buttonContent = "Create New Part";

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
      <Dropdown value={selectedType} name="Type" options={typeOptions}
                onChange={event => setSelectedType(event.value)}/>
      <Dropdown value={selectedModel} isRequired={true} options={modelOptions} name="Model"
                onChange={event => setSelectedModel(event.value)}/>
      <Input isRequired={true} name="Name" ref={nameRef}/>
      <Input isRequired={true} name="Purchase date" type="date" ref={productionDateRef}/>

      <Button classes={buttonClasses} size="big" type="submit">
        {buttonContent}
      </Button>
    </form>
  );
};

export default CreateNewPart;
