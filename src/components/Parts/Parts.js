import React, {useContext, useEffect} from "react";
import image from "../../assets/icons/list-element-part.svg";
import PartsContext from "../../store/PartsContext";
import useHttp from "../../hooks/useHttp";
import ListElement from "../UI/ListElement/ListElement";
import displayName from "../../services/displayName";

const Parts = () => {
  const {parts, partsDispatcher} = useContext(PartsContext)
  const {isLoading, error, sendRequest} = useHttp();

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

  if (error) {
    return <p>Error fetching parts: {error}</p>;
  }
  if (isLoading) {
    return <p>Loading parts...</p>;
  }
  const partList = parts.partsList.map((part) => (
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
  return <ul>{partList}</ul>;
}

export default Parts;
