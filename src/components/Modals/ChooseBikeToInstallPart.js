import React, {useEffect, useRef, useState} from "react";
import Button from "../UI/Buttons/Button";
import Dropdown from "../UI/Input/Dropdown";
import useHttp from "../../hooks/useHttp";
import Modal from "../UI/Modal/Modal";
import Input from "../UI/Input/Input";

const ChooseBikeToInstallPart = (props) => {
  const [selectedBikeId, setSelectedBikeId] = useState("");
  const dateRef = useRef(null);
  const {isLoading, error, sendRequest: bikesRequest} = useHttp();
  const {installPartLoading, installPartError, sendRequest: installPartRequest} = useHttp();
  const [bikeList, setBikeList] = useState([]);
  const [bikesListIsValid, setBikesListIsValid] = useState(false);

  useEffect(() => {
    if (!bikesListIsValid) {
      const loadBikes = (loadedBikes) => {
        console.log(loadedBikes)
        setBikeList(loadedBikes);
        setBikesListIsValid(true);
      }
      bikesRequest({
        method: "GET",
        path: "/bikes",
      }, loadBikes);
    }
  }, [bikesRequest, bikesListIsValid])

  const bikeOptions = bikeList.map((bike) => {
    const option = {};
    option.label = bike.bikeName;
    option.value = bike.id;
    return option;
  })
  console.log(bikeList);
  const submitHandler = (e) => {
    e.preventDefault();

    installPartRequest({
      path: "/parts/" + props.partId + "/install/" + selectedBikeId,
      method: "POST",
      body: {
        installTime: dateRef.current.value
      }
    }, installPartHandler);
  }

  const installPartHandler = () => {
    props.onSuccess();
  }

  return (
    <Modal
      title="Install Part"
      onClose={props.onClose}
    >
      <p>Select bike to install <strong>{props.partName}</strong></p>
      <form>
        <Dropdown name="Select bike" isRequired="true" options={bikeOptions}
                  onChange={event => setSelectedBikeId(event.value)}/>
        <Input isRequired={true} name="select date" type="date" ref={dateRef}/>

        <Button size="big" type="submit" onClick={submitHandler}>Install</Button>
      </form>
    </Modal>
  );
}

export default ChooseBikeToInstallPart;
