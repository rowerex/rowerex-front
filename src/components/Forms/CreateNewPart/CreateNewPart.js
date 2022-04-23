import React, {useContext, useEffect, useRef, useState} from "react";
import Dropdown from "../../UI/Input/Dropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import useTypes from "../../../services/useTypes";
import classes from "./Form.module.scss";
import useHttp from "../../../hooks/useHttp";
import PartsContext from "../../../store/PartsContext";

const CreateNewPart = (props) => {
  const {isLoading, error, sendRequest: sendNewPartRequest} = useHttp();
  const {parts, partsDispatcher} = useContext(PartsContext)
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const nameRef = useRef(null);
  const [models, setModels] = useState([]);
  const productionDateRef = useRef(null);
  const [types, typesError, typesLoading] = useTypes();
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

  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newPart = {
      name: nameRef.current.value,
      modelId: selectedModel,
      productionDate: productionDateRef.current.value,
    };

    addPart(newPart);
  };

  useEffect(() => {
    async function getModels(selectedType) {
      const token = getToken();
      // console.log(token);

      const response = await fetch(process.env.REACT_APP_BACKENDURL + "/models?type=" + selectedType, {
        method: "GET",
        headers: {
          'X-AUTH-TOKEN': token,
          "Content-Type": "application/json",
        },

      });
      const data = await response.json();
      setModels(data);
    }

    getModels(selectedType)

  }, [selectedType])

  const addPartHandler = (partRequestData) => {
    partsDispatcher({type: "INVALIDATE_PARTS"});
    props.onSuccess();
  }

  async function addPart(part) {
    sendNewPartRequest({
      path: "/parts", method: "POST", body: part
    }, addPartHandler);
  }

  let buttonClasses = classes.button; //@todo change button class to error when error occurs
  let buttonContent = "Create New Part";

  if (isLoading) {
    buttonContent = "Sending...";
  }
  if (error) {
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
