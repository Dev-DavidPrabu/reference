import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

const CustomInput = (props: any) => {
  return (
    <Input
      type={props.type}
      data-testid={props.testid}
      disabled={props.disabled}
      checked={props.checked}
      defaultValue={props.defaultValue}
      id={props.id}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onClick={props.onClick}
      className={props.className}
      readOnly={props.readOnly}
      minLength={props.minLength}
    ></Input>
  );
};

export default CustomInput;
CustomInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  testid: PropTypes.string,
  minLength: PropTypes.number
};
