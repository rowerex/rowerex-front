import React, {useContext, useEffect, useRef, useState} from "react";
import Dropdown from "../UI/Input/Dropdown";
import Input from "../UI/Input/Input";
import Button from "../UI/Buttons/Button";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";

const CreateNewPart = (props) => {
  const {isLoading, error, sendRequest: sendNewPart} = useHttp();
  const {sendRequest: getTypes} = useHttp();
  const {sendRequest: getModels} = useHttp();
  const { partsDispatcher} = useContext(PartsContext)
  const [selectedType, setSelectedType] = useState(null);
  const [selectedModel, setSelectedModel] = useState("");

  const nameRef = useRef(null);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const productionDateRef = useRef(null);

  useEffect(() => {
      getTypes({path: "/types"}, setTypes);
  }, [])

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

  const addPartHandler = () => {
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

    sendNewPart({
      path: "/parts", method: "POST", body: newPart
    }, addPartHandler);
  };

  useEffect(() => {
    if (selectedType !== null) {
      getModels({path: "/models?type=" + selectedType}, setModels);
    }
  }, [selectedType])

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
    <form onSubmit={submitHandler}>
      <Dropdown value={selectedType} name="Type" options={typeOptions}
                onChange={event => setSelectedType(event.value)}/>
      <Dropdown value={selectedModel} isRequired={true} options={modelOptions} name="Model"
                onChange={event => setSelectedModel(event.value)}/>
      <Input isRequired={true} name="description" ref={nameRef}/>
      <Input isRequired={true} name="Purchase date" type="date" ref={productionDateRef}/>

      <Button size="big" type="submit">
        {buttonContent}
      </Button>
    </form>
  );
};

export default CreateNewPart;
