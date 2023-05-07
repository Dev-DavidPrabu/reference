import React, { useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { Input } from "reactstrap";
import imageFront from "../../assets/docFront.png";
import imageBack from "../../assets/docBack.png";
import imageSelfie from "../../assets/selfie.png";
import imageSign from "../../assets/sign.png";
import "./ViewCardReplacement.scss";

const ViewCardReplacement = (props: any) => {
  const [viewCardRecords, setViewCardRecords] = useState({
    approverId: "",
    cardExpirydate: "",
    cardL4d: "",
    customerName: "",
    inputOperatorId: "",
    mobileNo: "",
    requestChannel: "",
    requeststatus: "",
    walletId: "",
    blcokExpirydate: "",
    requestReasoncode: "",
    cardType: "",
  });
  useEffect(() => {
    if (props.location.state !== undefined) {
      setViewCardRecords(props.location.state);
    }
  }, [props.location.state]);
  const handleCancel = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Card-Replacement",
    });
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold replace-card-view-title">
            SRF - Card Replacement View Details
          </h1>
          <button
            className="replace-card-view-back border-0"
            onClick={handleCancel}
          >
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="replace-card-view-body p-3">
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  SRF Request ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="replace-card-view-label">
                    Customer Name
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 replace-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={viewCardRecords.customerName}
                    />
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="replace-card-view-label">
                    Request Reason Code
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={viewCardRecords.requestReasoncode}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  SRF Request Type
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={viewCardRecords.requestChannel}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="replace-card-view-label">Mobile No</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 replace-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={viewCardRecords.mobileNo}
                    />
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="block-card-view-label">
                    Request Status
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 replace-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={viewCardRecords.requeststatus}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="replace-card-view-label">Wallet ID</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={viewCardRecords.walletId}
                  />
                </div>
                <div className="col-12 pt-3 d-flex">
                  <div className="col-4">
                    <label className="replace-card-view-label">Card L4D</label>
                    <div className="col-8 pt-2">
                      <Input
                        className="border-1 replace-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={viewCardRecords.cardL4d}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="replace-card-view-label">
                      Card Expiry Date
                    </label>
                    <div className="col-8 pt-2">
                      <Input
                        className="border-1 replace-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={viewCardRecords.cardExpirydate}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="replace-card-view-label">
                    Input Channel
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 replace-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={viewCardRecords.requestChannel}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="replace-card-view-label">
                  Input Operator ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={viewCardRecords.inputOperatorId}
                  />
                </div>
              </div>
              <div className="col-1 inputTime p-1">
                <label className="replace-card-view-label">Input Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  Customer Signature File
                </label>
                <div className="col-6 pt-2">
                  <img
                    src={imageSign}
                    alt="Selfie"
                    className="col-12 signWidth"
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="replace-card-view-label">Approver ID</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={viewCardRecords.approverId}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="replace-card-view-label">Approver Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 p-1">
                <label className="replace-card-view-label">
                  Approver Remarks
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  Accounting Auth Ref No
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  Accounting Update Time
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="replace-card-view-label">
                  Accounting Response Code
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 p-1">
                <label className="replace-card-view-label">
                  Accounting Error Message
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="replace-card-view-label">Card Type</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={viewCardRecords.cardType}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="replace-card-view-label">URN</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="replace-card-view-label">ID Doc Type</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={viewCardRecords.approverId}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="replace-card-view-label">ID Doc Number</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="replace-card-view-label">
                  Replacement Fee
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 replace-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  ID Doc Front Page
                </label>
                <div className="col-12 pt-2 imageViewUnblockFront">
                  <img
                    src={imageFront}
                    alt="Selfie"
                    className="col-12 selfieHeight"
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="replace-card-view-label">
                  ID Doc Back Page
                </label>
                <div className="col-12 pt-2 imageViewUnblockBack">
                  <img
                    src={imageBack}
                    alt="Selfie"
                    className="col-12 selfieHeight"
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="replace-card-view-label">Selfie</label>
                <div className="col-12 pt-2 imageViewUnblock">
                  <img
                    src={imageSelfie}
                    alt="Selfie"
                    className="col-12 selfieHeight"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewCardReplacement;
