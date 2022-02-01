import React from "react";
import Input from "../../UI/Input/Input";

const CreateNewPartForm = () => {
  return (
    <form>
      <Input name="Type" />
      <Input name="Model" />
      <Input name="Name" />
      <Input name="Purchase date" type="date" />
    </form>
  );
};

export default CreateNewPartForm;
