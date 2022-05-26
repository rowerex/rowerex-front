import React, {useState} from "react";
import classes from "./SwitchButton.module.scss";

const SwitchButton = (props) => {
  const [firstButtonClasses, setFirstButtonClasses] = useState(classes.button);
  const [secondButtonClasses, setSecondButtonClasses] = useState(classes.button_inactive);

  const handleFirstOptionClick = () => {
    setFirstButtonClasses(classes.button);
    setSecondButtonClasses(classes.button_inactive)
    props.onFirstClick();
  }

  const handleSecondOptionClick = () => {
    setFirstButtonClasses(classes.button_inactive);
    setSecondButtonClasses(classes.button)
    props.onSecondClick();
  }

  return (
    <div className={classes.buttonContainer}>
      <button
        type={props.type || "button"}
        className={firstButtonClasses}
        onClick={handleFirstOptionClick}
      >
        {props.firstOption}
      </button>
      <button
        type={props.type || "button"}
        className={secondButtonClasses}
        onClick={handleSecondOptionClick}
      >
        {props.secondOption}
      </button>
    </div>
  );
};

export default SwitchButton;
