import React, {useEffect, useState} from "react";
import classes from "./ListView.module.scss";
import Stats from "../components/UI/Stats/Stats";
import useHttp from "../hooks/useHttp";

const HistoryView = () => {
  const {isLoading, error, sendRequest: getPart} = useHttp();
  const [part, setPart] = useState(false);

  useEffect(() => {
    const loadPart = (loadedPart) => {
      setPart(loadedPart);
      console.log(loadedPart);
    }
    getPart({
      method: "GET",
      path: "/parts/6287b78f0da63", //todo get actual all parts history
    }, loadPart)
  }, [getPart])

  if (part) {
    const history = <Stats stats={part.history.map((event) => (
      {label: event.date.substring(0,10), value: event.type, title: part.modelName, description: event.description}
    ))}/>

    return (
      <div className={classes.viewContainer}>
        <h2>
          History      </h2>
        {history}
      </div>
    );
  }else {
    return <p> something went wrong</p>
  }

}


export default HistoryView;
