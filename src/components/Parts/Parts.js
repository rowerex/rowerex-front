import React, {useContext, useEffect, useState} from "react";
import image from "../../assets/icons/list-element-part.svg";
import PartsContext from "../../store/PartsContext";
import useHttp from "../../hooks/useHttp";
import ListElement from "../UI/ListElement/ListElement";
import displayName from "../../services/displayName";
import SwitchButton from "../UI/Buttons/SwitchButton";

const Parts = () => {
  const {parts, partsDispatcher} = useContext(PartsContext)
  const {isLoading, error, sendRequest} = useHttp();
  const [locationFilter, setLocationFilter] = useState("shelf");
  const [activeRemindersFilter, setActiveRemindersFilter] = useState(false);

  useEffect(() => {
    const updatePartList = parts => {
      partsDispatcher({type: "FETCH_PARTS_SUCCESS", parts: parts})
    }
    if (parts.invalidated) {
      sendRequest({path: '/parts'},
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
      partsToShow = partsToShow.filter((part)=> (part.bikeId === null))
    }
    if (locationFilter === "installed") {
      partsToShow = partsToShow.filter((part)=> (part.bikeId != null))
    }
  }

  if (activeRemindersFilter) {
    partsToShow = partsToShow.filter((part)=> (part.hasAProblem === true))
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
  return <>      <SwitchButton firstOption="On Shelf" secondOption="installed" thirdOption="all "
                               onFirstClick={handleShelfClick}
                               onSecondClick={handleInstalledClick} onThirdClick={handleAllClick}/>
    <input type="checkbox" id="activeReminders" name="activeReminders" checked={activeRemindersFilter} onChange={handleReminderChange}/>
    <label htmlFor="activeReminders">only with active reminders</label>

    <ul>{partList}</ul>
    ;
  </>
}

export default Parts;
