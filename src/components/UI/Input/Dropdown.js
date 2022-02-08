import React from "react";
import Select from "react-select";
import classes from "./Input.module.scss";
import "../../../common.scss";

const aquaticCreatures = [
  { label: "Shark", value: "Shark" },
  { label: "Dolphin", value: "Dolphin" },
  { label: "Whale", value: "Whale" },
  { label: "Octopus", value: "Octopus" },
  { label: "Crab", value: "Crab" },
  { label: "Lobster", value: "Lobster" },
];

const customStyles = {
  control: (provided, state) => ({
    padding: "0 8px",
    height: "42px",
    minWidth: 240,
    border: state.isFocused ? "2px solid #006b5c" : "1px solid #6f7976",
    borderRadius: "4px",
  }),

  valueContainer: () => ({
    fontSize: 16,
    letterSpacing: 0.5,
    position: "absolute",
    top: 10,
  }),

  input: () => ({
    fontSize: 16,
    letterSpacing: 0.5,
    position: 'absolute',
    top: 0,
    minWidth: 200,
  }),

  menu: (state) => ({
    position: "fixed",
    zIndex: 100,
    fontSize: 16,
    letterSpacing: 0.5,
    width: 240,
  }),
  indicatorsContainer: () => ({
    position: "absolute",
    top: 2,
    right: 0,
  }),
  option: (provided, state) => ({
    background: state.isFocused ? "#CAE1DC" : "#E6F1ED",
    lineHeight: 2,
    paddingLeft: 20,
  }),
  placeholder: () => ({
    fontSize: 16,
    letterSpacing: 0.5,
    top: 20,
  }),
};

const Dropdown = (props) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes.label} htmlFor={props.name}>
        {props.name}
      </label>
      <Select styles={customStyles} options={aquaticCreatures} />
    </div>
  );
};

export default Dropdown;
