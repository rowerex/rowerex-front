import React, {useContext, useEffect, useRef, useState} from "react";
import Button from "../UI/Buttons/Button";
import Dropdown from "../UI/Input/Dropdown";
import useHttp from "../../hooks/useHttp";
import PartsContext from "../../store/PartsContext";
import Modal from "../UI/Modal/Modal";
import CreateNewPart from "../Forms/CreateNewPart";
import Input from "../UI/Input/Input";
import displayName from "../../services/displayName";

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
        path: "/parts",
      }, loadParts);
    }
  }, [getPartsList, partsListIsValid])

  const partOptions = partsList.map((part) => {
    const option = {};
    option.label = displayName(part.modelName, part.id);
    option.value = part.id;
    return option;
  })

  const submitHandler = (e) => {
    e.preventDefault();

    sendPart({
      path: "/parts/" + selectedPartId + "/install/" + props.bikeId,
      method: "POST", //@todo add 'installTime' in body
    }, installPartHandler);
  }

  const openCreateNewPartModalHandler = () => {
    setCreateNewPartModalIsOpen(true);
  }
  const closeCreateNewPartModalHandler = () => {
    setCreateNewPartModalIsOpen(false);
    setPartsListIsValid(false);

  }

  const installPartHandler = () => {
    console.log("installparthandler")
    partsDispatcher({type: "INVALIDATE_PARTS"});
    props.onSuccess();
  }

  return (
    <>
      <p>Select a part to install to <strong>{props.bikeName}</strong></p>
      <Button priority="secondary" size="big" onClick={openCreateNewPartModalHandler}>Create new part </Button>
      <p>or</p>
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
