import React, { useState } from "react";
import { Button, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./UnlockConfirmationPopUp.scss";
const UnlockConfirmationPopUp = (props: any) => {
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemark(e.target.value);
  };
  const handleSubmit = () => {
    if (remark) {
      props.yesConfirmation(remark);
    } else {
      setError("Enter reason");
    }
  };

  return (
    <div>
      <Modal isOpen={props.showModal} centered={true}>
        <ModalHeader
          toggle={props.closeDeleteConfirmation}
          className="unlockModalPop-title border-0"
          cssModule={{ close: "border-0" }}
        >
          <p className="unlockdevice">
            {props.device && `Unlock ${props.device}`}
          </p>
          {props.selecetedCustomerData &&
            props.selecetedCustomerData.emailId && (
              <p className="unlockdevice">Unlock BO User</p>
            )}
        </ModalHeader>
        <ModalBody>
          {props.selecetedCustomerData &&
            props.selecetedCustomerData.mobileNumber && (
              <p className="remarktext">
                Mobile Number:{" "}
                {props.selecetedCustomerData &&
                  props.selecetedCustomerData.mobileNumber}
              </p>
            )}
          {props.selecetedCustomerData &&
            props.selecetedCustomerData.emailId && (
              <p className="remarktext">
                Login ID:{" "}
                {props.selecetedCustomerData &&
                  props.selecetedCustomerData.emailId}
              </p>
            )}
          {props.selecetedCustomerData &&
            props.selecetedCustomerData.deviceId && (
              <p className="remarktext">
                Device ID:{" "}
                {props.selecetedCustomerData &&
                  props.selecetedCustomerData.deviceId}
              </p>
            )}
          <div className="unlockModalPop-wrapper">
            <div className="unlockModalPop-body d-flex flex-column">
              {!props.unlock ? (
                <>
                  {props.approvalReject
                    ? props.approvalReject
                    : "Are you sure, you want to unlock the user? "}
                  {props.rejectApprovalTask && (
                    <input
                      onChange={(e: any) => {
                        props.setrejectManager(e.target.value);
                      }}
                      type="text"
                    />
                  )}
                </>
              ) : (
                <>
                  <span className="unlockModalPop-remark-label remarktext">
                    Remark
                  </span>
                  <input
                    className="col-9 form-input unlockModalPop-remark inputbox"
                    type="text"
                    onChange={handleChange}
                  />
                  {error && (
                    <Label className="unlockModalPop-error">*{error}</Label>
                  )}
                </>
              )}
            </div>
            <div className="unlockModalPop-buttons mt-3">
              <Button
                className="unlockModalPop-confirm-buttons"
                onClick={handleSubmit}
              >
                {props.unlock ? "Submit" : "Yes"}
              </Button>
              <Button
                className="unlockModalPop-cancel-buttons"
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

export default UnlockConfirmationPopUp;
