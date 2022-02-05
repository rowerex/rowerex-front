import React from "react";
import Dropdown from "../../UI/Input/Dropdown";
import Input from "../../UI/Input/Input";

const CreateNewPartForm = () => {
  return (
    <form>
      <Dropdown name="Type" />

      <Input name="Model" />
      <Input name="Name" />
      <Input name="Purchase date" type="date" />
    </form>
  );
};

export default CreateNewPartForm;
