import React from "react";
import "./CustomPopUpComponent.scss";

function CustomPopUpComponent(props: any) {
  return (
    <div className="popup-box">
      <div className="box-s">
        <div className="box-header">
          <h3 style={{ color: "white" }}>{props.heading}</h3>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default CustomPopUpComponent;
