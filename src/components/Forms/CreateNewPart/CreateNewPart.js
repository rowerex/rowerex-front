import React, {useEffect, useRef, useState} from "react";
import Dropdown from "../../UI/Input/Dropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import useTypes from "../../../services/useTypes";

const CreateNewPart = (props) => {

  const [selectedType, setSelectedType] = useState("");

  const modelRef = useRef(null);
  const nameRef = useRef(null);
  const typeRef = useRef(null);
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
      modelId: modelRef.current.value,
      productionDate: productionDateRef.current.value,
    };

    console.log(newPart);
    addPart(newPart);
  };

  useEffect(()=> {
    async function getModels(selectedType) {
      const token = getToken();
      console.log(token);
      const response = await fetch("http://localhost:8080/api/models?type="+ selectedType, {
        method: "GET",
        headers: {
          'X-AUTH-TOKEN': token,
          "Content-Type": "application/json",
        },

      });
      const data = await response.json();
      console.log(data);
      setModels(data);
    }
    getModels(selectedType)


  },[selectedType])
  async function addPart(part) {
    const token = getToken();
    console.log(token);
    const response = await fetch("http://localhost:8080/api/parts", {
      method: "POST",
      body: JSON.stringify(part),
      headers: {
        'X-AUTH-TOKEN': token,
        "Content-Type": "application/json",
      },

    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={submitHandler}>
      <Dropdown value={selectedType} name="Type" options={typeOptions} ref={typeRef} onChange={event => setSelectedType(event.value)}/>
      <Dropdown isRequired={true} options={modelOptions} name="Model" ref={modelRef}/>
      <Input isRequired={true} name="Name" ref={nameRef}/>
      <Input isRequired={true} name="Purchase date" type="date" ref={productionDateRef}/>

      <Button size="big" type="submit" onClick={props.onConfirm}>
        Create New Part
      </Button>
    </form>
  );
};

export default CreateNewPart;
