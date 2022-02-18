import React, { useRef } from "react";
import useToken from "../../../services/useToken";
import Dropdown from "../../UI/Input/Dropdown";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const CreateNewPart = (props) => {
    const modelRef = useRef(null);
    const nameRef = useRef(null);
    const productionDateRef = useRef(null);
    console.log("derp useref");

        const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };



    const submitHandler = (event) => {
        event.preventDefault();

        console.log("derp");

        const newPart = {
            name: nameRef.current.value,
            modelId: modelRef.current.value,
            productionDate: productionDateRef.current.value,
        };

        console.log(newPart);
        addPart(newPart);
    };

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
            <Dropdown name="Type" />
            <Input isRequired={true} name="Model" ref={modelRef} />
            <Input isRequired={true} name="Name" ref={nameRef} />
            <Input isRequired={true} name="Purchase date" type="date" ref={productionDateRef} />

            <Button size="big" type="submit" onClick={props.onConfirm}>
                Create New Part
            </Button>
        </form>
    );
};

export default CreateNewPart;