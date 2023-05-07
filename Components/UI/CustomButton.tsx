import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

const CustomButton = (props: any) => {
  if (props.component === "payrollEnquiry") {
    return (      
      <Button
        data-testid={props.testid}
        style={props.style}
        id={props.id}
        onClick={props.onClick}
        className={props.className}
        color={props.color}
        outline={props.outline}
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button
        data-testid={props.testid}
        style={props.style}
        id={props.id}
        onClick={props.onClick}
        className={props.className}
        color={props.color}
        outline={props.outline}
        disabled={props.disabled}
        name={props.name}
      >
        {props.children}
      </Button>
    );
  }
};

export default CustomButton;
CustomButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  color: PropTypes.string,
  component: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.any,
  style: PropTypes.object,
  testid: PropTypes.string,
  outline: PropTypes.any,
  disabled: PropTypes.any,
  name: PropTypes.string,
};
