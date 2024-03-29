import React, {useContext, useEffect, useRef, useState} from "react";
import Button from "../UI/Buttons/Button";
import Dropdown from "../UI/Input/Dropdown";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";
import Modal from "../UI/Modal/Modal";
import CreateNewPart from "../Forms/CreateNewPart";
import Input from "../UI/Input/Input";
import displayPartName from "../../services/displayPartName";

const InstallPart = (props) => {
  const {partsListIsLoading, partsListIsError, sendRequest: getPartsList} = useHttp();
  const {sendPartIsLoading, sendPartIsError, sendRequest: sendPart} = useHttp();
  const {partsDispatcher} = useContext(PartsContext)
  const [selectedPartId, setSelectedPartId] = useState("");
  const [partsList, setPartsList] = useState([]);
  const [partsListIsValid, setPartsListIsValid] = useState(false);
  const [createNewPartModalIsOpen, setCreateNewPartModalIsOpen] = useState(false);
  const dateRef = useRef(null);

  useEffect(() => {
    if (!partsListIsValid) {
      const loadParts = (loadedParts) => {
        console.log(loadedParts)
        setPartsList(loadedParts);
        setPartsListIsValid(true);
      }
      getPartsList({
        method: "GET",
        path: "/view/installable-parts",
      }, loadParts);
    }
  }, [getPartsList, partsListIsValid])

  const partOptions = partsList.map((part) => {
    const option = {};
    option.label = displayPartName(part.modelName, part.id);
    option.value = part.id;
    return option;
  })

  const submitHandler = (e) => {
    e.preventDefault();

    sendPart({
      path: "/parts/" + selectedPartId + "/install/" + props.bikeId,
      method: "POST",
      body: {
        installTime: dateRef.current.value
      }}, installPartHandler);
  }

    const openCreateNewPartModalHandler = () => {
      setCreateNewPartModalIsOpen(true);
    }
    const closeCreateNewPartModalHandler = () => {
      setCreateNewPartModalIsOpen(false);
      setPartsListIsValid(false);

    }

    const installPartHandler = () => {
      partsDispatcher({type: "INVALIDATE_PARTS"});
      props.onSuccess();
    }

    return (
      <>
        <p>Select part to install to <strong>{props.bikeName}</strong></p>
        <Button size="big" onClick={openCreateNewPartModalHandler}>Create new part</Button>
        <p>or choose shelved part</p>
        <form>
          <Dropdown name="Select part" isRequired="true" options={partOptions}
                    onChange={event => setSelectedPartId(event.value)}/>
          <Input isRequired={true} name="select date" type="date" ref={dateRef}/>

          <Button size="big" type="submit" onClick={submitHandler}>Install</Button>
        </form>
        {createNewPartModalIsOpen === true && (
          <Modal
            title="Create new Part"
            onClose={closeCreateNewPartModalHandler}
          >
            <CreateNewPart onSuccess={closeCreateNewPartModalHandler}/>
          </Modal>
        )}
      </>
    );
  }

  export default InstallPart;
