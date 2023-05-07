import React from "react";

import "./PayrollCenterButton.scss";
import CustomButtonForHeader from "./CustomButtonForHeader";
import { FaCloudUploadAlt, FaPlusCircle } from "react-icons/fa";

const PayrollCenterButton = (props: any) => {
  return (
    <>
      <CustomButtonForHeader className="button-header button1-header btn1-width">
        {props.companyName ? props.companyName : "Custom Header 1"}
      </CustomButtonForHeader>
      <CustomButtonForHeader className="button-header button1-header btn1-width">
        Custom Header 2
      </CustomButtonForHeader>
      <CustomButtonForHeader
        className={"button-header button1-header btn2-width"}
      >
        {
          <div className="d-flex justify-content-between">
            <div hidden={!props.showPlusIcon} onClick={props.onClickAddEvent}>
              <FaPlusCircle></FaPlusCircle>{" "}
            </div>
            <div
              hidden={!props.showUploadIcon}
              onClick={props.onClickUploadEvent}
            >
              <FaCloudUploadAlt></FaCloudUploadAlt>
            </div>
          </div>
        }
      </CustomButtonForHeader>
    </>
  );
};

export default PayrollCenterButton;
