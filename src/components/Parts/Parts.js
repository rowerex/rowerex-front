import React, {useContext, useEffect, useState} from "react";
import image from "../../assets/icons/list-element-part.svg";
import PartsContext from "../../store/PartsContext";
import useHttp from "../../hooks/useHttp";
import ListElement from "../UI/ListElement/ListElement";
import displayName from "../../services/displayName";
import SwitchButton from "../UI/Buttons/SwitchButton";
import Dropdown from "../UI/Input/Dropdown";
import Checkbox from "../UI/Input/Checkbox";
import classes from "./Parts.module.scss";

const Parts = () => {
  const {parts, partsDispatcher} = useContext(PartsContext)
  const {isLoading, error, sendRequest: getParts} = useHttp();
  const {sendRequest: getTypes} = useHttp();
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const [locationFilter, setLocationFilter] = useState("shelf");
  const [activeRemindersFilter, setActiveRemindersFilter] = useState(false);

  useEffect(() => {
    const loadTypes = (types) => {
      setTypes([{id: "Show all", name: "all"}, ...types])
    }
    getTypes({path: "/types"}, loadTypes);
  }, [])

  const typeOptions = types.map((type) => {
    const option = {};
    option.label = type.name;
    option.value = type.id;
    return option;
  })

  useEffect(() => {
    const updatePartList = parts => {
      partsDispatcher({type: "FETCH_PARTS_SUCCESS", parts: parts})
    }
    if (parts.invalidated) {
      getParts({path: '/parts'},
        updatePartList
      )
    }
  }, [parts])

  const handleShelfClick = () => {
    setLocationFilter("shelf");
  }

  const handleInstalledClick = () => {
    setLocationFilter("installed");
  }

  const handleAllClick = () => {
    setLocationFilter(null);
  }

  const handleReminderChange = () => {
    setActiveRemindersFilter(!activeRemindersFilter)
  }

  if (error) {
    return <p>Error fetching parts: {error}</p>;
  }
  if (isLoading) {
    return <p>Loading parts...</p>;
  }

  let partsToShow = parts.partsList;

  if (locationFilter != null) {
    if (locationFilter === "shelf") {
      partsToShow = partsToShow.filter((part) => (part.bikeId === null))
    }
    if (locationFilter === "installed") {
      partsToShow = partsToShow.filter((part) => (part.bikeId != null))
    }
  }

  if (activeRemindersFilter) {
    partsToShow = partsToShow.filter((part) => (part.hasAProblem === true))
  }

  if (selectedType) {
    partsToShow = partsToShow.filter((part) => (part.partType === selectedType))
  }

  const partList = partsToShow.map((part) => (
    <ListElement
      link={`/parts/${part.id}`}
      id={part.id}
      key={part.id}
      image={image}
      title={displayName(part.modelName, part.id)}
      label={part.partType}
      problem={part.hasAProblem}
    />
  ));
  return <>
    <SwitchButton firstOption="On Shelf"
                  secondOption="installed"
                  thirdOption="all "
                  onFirstClick={handleShelfClick}
                  onSecondClick={handleInstalledClick}
                  onThirdClick={handleAllClick}/>
    <Checkbox id="activeReminders"
              name="activeReminders"
              checked={activeRemindersFilter}
              onChange={handleReminderChange}> only with active reminders
    </Checkbox>
    <Dropdown value={selectedType} name="Type" options={typeOptions} placeholder="Select part type..."
              onChange={event => setSelectedType(event.value)}/>
    <ul className={classes.list}>{partList}</ul>
  </>
}

export default Parts;
