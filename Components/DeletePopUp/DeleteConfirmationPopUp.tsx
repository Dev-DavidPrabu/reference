import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./DeleteConfirmaionPopUp.scss";
const DeleteConfirmaionPopUp = (props: any) => {
  return (
    <div>
      <Modal isOpen={props.showModal} centered={true}>
        {props.confirmheader && (
          <ModalHeader toggle={props.closeDeleteConfirmation} className="">
            Confirmation
          </ModalHeader>
        )}
        <ModalBody>
          <div
            className="modalpop-wrapper"
            style={{ alignItems: "flex-start" }}
          >
            <div className="modalpop-title">
              {props.approvalReject
                ? props.approvalReject
                : "Are you sure you want to delete this record? "}
            </div>
            {props.rejectApprovalTask && (
              <div className="mb-3 remarks-container">
                <div className="remarks-label">Remarks</div>
                <input
                  className="remarks-input"
                  onChange={(e: any) => {
                    props.setrejectManager(e.target.value);
                  }}
                  type="text"
                />
              </div>
            )}
            <div style={{ marginLeft: "1rem" }}>
              <Button
                className="modalpop-confirm-buttons border-0"
                onClick={() => {
                  props.deleteTheSelectedRecord(props.selectedFestivalInfo);
                }}
              >
                {props.buttonYes ? "Yes" : "Confirm"}
              </Button>
              <Button
                className="modalpop-cancel-button border-0"
                onClick={props.closeDeleteConfirmation}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DeleteConfirmaionPopUp;
