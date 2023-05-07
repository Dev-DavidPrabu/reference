import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import CustomButton from "../UI/CustomButton";
import "./CustomConfirmBlockPopup.scss";

const CustomConfirmBlockPopup = (props: any) => {
  const { cardDetails } = props;
  const [toggleData, setToggleData] = useState("");
  const [toggleVisible, setToggleVisible] = useState(false);

  useEffect(() => {
    if (props.toggleDetails !== undefined) {
      setToggleData(props.toggleDetails);
    }
  }, [props.toggleDetails]);

  const toggleYes = () => {
    if (toggleData && toggleVisible === false) {
      setToggleVisible(true);
    } else {
      props.confirmPopUpHandler("yes");
    }
  };

  return (
    <Modal
      isOpen={props.blockCardConfirmation}
      size={"sm"}
      centered={true}
      className="modelBody"
    >
      <ModalHeader>
        <h5 className="textBlock">Confirmation Message</h5>
        <div className="closeIconsBlock col-12">
          <AiOutlineClose onClick={() => props.confirmPopUpHandler("no")} />
        </div>
      </ModalHeader>
      <ModalBody>
        <div className="textFieldColor p-2">
          Please verify if the following details match with our records
        </div>
        <div className="container-fluid row p-2">
          <div className="col-5">
            <label className="block-card-view-label">Name</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.customerName}
              />
            </div>
          </div>
          <div className="col-3">
            <label className="block-card-view-label">ID Number</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.customerNumber}
              />
            </div>
          </div>
          <div className="col-3">
            <label className="block-card-view-label">ID Type</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.idTypeCode}
              />
            </div>
          </div>
        </div>
        <div className="container-fluid row p-2">
          <div className="col-5">
            <label className="block-card-view-label">Nationality</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.nationalityCodeDescription}
              />
            </div>
          </div>
          <div className="col-3">
            <label className="block-card-view-label">Mobile Number</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.mobileNumber}
              />
            </div>
          </div>
          <div className="col-3">
            <label className="block-card-view-label">Selfie Image</label>
            <div className="frontEyePopup eyeiconleftPopup">
              <Label>
                <BsEye type="file"></BsEye>
                <Input
                  style={{ display: "none" }}
                  type="file"
                  className="frontEyePopup"
                ></Input>
                <span>View</span>
              </Label>
            </div>
          </div>
        </div>
        <div className="container-fluid row p-2">
          <div className="col-5">
            <label className="block-card-view-label">Card</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.customerWalletDto?.cardUrn}
              />
            </div>
          </div>
          <div className="col-3">
            <label className="block-card-view-label">Wallet type</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.customerWalletDto?.walletType}
              />
            </div>
          </div>
          <div className="col-3">
            <label className="block-card-view-label">Card L4D</label>
            <div className="col-12 p-1">
              <Input
                className="border-1 block-card-view-inputMobilePopup form-control"
                type="text"
                readOnly={true}
                value={cardDetails?.customerWalletDto?.panLastFourdigits}
              />
            </div>
          </div>
        </div>
        {toggleData && toggleVisible && (
          <div className="textFieldColor p-2">{toggleData}</div>
        )}
        <div className="btnPosition p-2">
          <CustomButton className="yesBtn" onClick={toggleYes}>
            Yes
          </CustomButton>{" "}
          <CustomButton
            className="noBtn"
            onClick={() => props.confirmPopUpHandler("no")}
          >
            No
          </CustomButton>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default CustomConfirmBlockPopup;
