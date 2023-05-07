import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import "./AddWhiteListDevicePopup.scss";
const AddWhiteListDevicePopup = (props: any) => {
  return (
    <div>
      <Modal isOpen={props.showModal} centered={true}>
        <ModalHeader
          toggle={props.closeDeleteConfirmation}
          className="addModalPop-title border-0"
        >
          <div className="container">
            Add White List Device
            <span className="closeIconAddPopup cursor">
              <AiOutlineClose onClick={() => props.iconClosePopup()} />
            </span>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="row p-2">
            <div className="col-4 p-1">
              <Label className="addModalPop-label">
                Device ID <span className="container-body-label-color">*</span>
              </Label>
            </div>
            <div className="col-8 p-1">
              <Input type="text" name="" />
            </div>
          </div>

          <div className="row p-2">
            <div className="col-4 p-1">
              <Label className="addModalPop-label">
                Name <span className="container-body-label-color">*</span>
              </Label>
            </div>
            <div className="col-8 p-1">
              <Input type="text" name="" />
            </div>
          </div>
          <div className="row p-2">
            <div className="col-4 p-1">
              <Label className="addModalPop-label">
                Date <span className="container-body-label-color">*</span>
              </Label>
            </div>
            <div className="col-8 p-1">
              <Input type="date" name="" />
            </div>
          </div>
          <div className="row addModalPop-buttonPosition p-2">
            <Button
              type="button"
              className="fs-14 addModalPop-confirm-buttons border-0"
            >
              Submit
            </Button>
            <Button
              className="fs-14 addModalPop-cancel-buttons border-"
              onClick={props.closePopupConfirmation}
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddWhiteListDevicePopup;
