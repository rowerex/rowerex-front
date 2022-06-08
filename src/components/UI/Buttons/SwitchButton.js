import React, {useState} from "react";
import classes from "./SwitchButton.module.scss";

const SwitchButton = (props) => {
  const [firstButtonClasses, setFirstButtonClasses] = useState(classes.button);
  const [secondButtonClasses, setSecondButtonClasses] = useState(classes.button_inactive);
  const [thirdButtonClasses, setThirdButtonClasses] = useState(classes.button_inactive);


  const handleFirstOptionClick = () => {
    setFirstButtonClasses(classes.button);
    setSecondButtonClasses(classes.button_inactive)
    setThirdButtonClasses(classes.button_inactive);
    props.onFirstClick();
  }

  const handleSecondOptionClick = () => {
    setSecondButtonClasses(classes.button)
    setFirstButtonClasses(classes.button_inactive);
    setThirdButtonClasses(classes.button_inactive);
    props.onSecondClick();
  }

  const handleThirdOptionClick = () => {
    setThirdButtonClasses(classes.button)
    setFirstButtonClasses(classes.button_inactive);
    setSecondButtonClasses(classes.button_inactive);
    props.onThirdClick();
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
      {props.thirdOption &&
        <button
          type={props.type || "button"}
          className={thirdButtonClasses}
          onClick={handleThirdOptionClick}
        >
          {props.thirdOption}
        </button>}
    </div>
  );
};

export default SwitchButton;
