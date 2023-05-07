import "./EditToggle.scss";
import React from "react";

const EditToggle = (props: any) => {
  return (
    <>
      <input
        checked={!props.isOn}
        onChange={props.handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <div
          className={
            props.isOn
              ? "green_color react-switch-button d-flex"
              : "btn-danger react-switch-button d-flex"
          }
        >
          <div className="d-flex align-items-center text-white ms-2 edit-toggle">
            {props.isOn ? "Yes" : "No"}
          </div>
        </div>
      </label>
    </>
  );
};

export default EditToggle;
