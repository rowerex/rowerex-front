import React from "react";
import Select from "react-select";
import classes from "./Input.module.scss";
import "../../../common.scss";

const customStyles = {
  control: (provided, state) => ({
    margin: "0 24px",
    padding: "0 8px",
    height: "42px",
    border: state.isFocused ? "2px solid #696969" : "1px solid #696969",

    borderRadius: "4px",
    fontWeight: 400
  }),

  valueContainer: () => ({
    fontSize: 16,
    fontWeight: 400,
    position: "absolute",
    top: 10,
  }),

  input: () => ({
    fontSize: 16,
    letterSpacing: 0,
    position: 'absolute',
    top: 0,
    minWidth: 350,
  }),

  menu: () => ({
    position: "absolute",
    top: "39px",
    zIndex: 100,
    fontSize: 16,
    fontWeight: 400,
    margin: "0 24px",
    width: "min(calc(100% - 48px),402px)",
    border: "2px solid #696969",
    borderTop: "none",
    background: "#FFFFFF",
    borderRadius: "0 0 4px 4px",
  }),
  indicatorsContainer: () => ({
    position: "absolute",
    top: 2,
    right: 24,
  }),
  option: (provided, state) => ({
    background: state.isFocused ? "#F2F2F2" : "#FFFFFF",
    lineHeight: 2,
    paddingLeft: 8,
    fontWeight: 400,
  }),
  placeholder: () => ({
    fontSize: 16,
    fontWeight: 400,
    top: 20,
  }),
};

const Dropdown = React.forwardRef((props, ref) => {
  return (
    <div className={classes.wrapper}>
      <label className={classes.label} htmlFor={props.name}>
        {props.name}
      </label>
      <Select selectedValue={props.value} onChange={props.onChange} styles={customStyles} options={props.options}
              placeholder={props.placeholder} ref={ref}/>
    </div>
  );
});

export default Dropdown;
