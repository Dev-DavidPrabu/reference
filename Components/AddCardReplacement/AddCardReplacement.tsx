import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { IoArrowUndoOutline } from "react-icons/io5";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";
import "./AddCardReplacement.scss";
import { MdFileUpload } from "react-icons/md";
import logofinal from "../../assets/logo-final.png";

const AddCardReplacement = (props: any) => {
  const [inputBelow, setInputBelow] = useState(false);
  const [cardReplacement, setCardReplacement] = useState({
    approverId: "",
    cardExpirydate: "",
    cardL4d: "",
    customerName: "",
    inputOperatorId: "",
    mobileNo: "",
    requestChannel: "",
    requestReasoncode: "",
    requeststatus: "",
    walletId: "",
    blcokExpirydate: "",
    replacementFee: "",
  });

  const handleChange = (e: any) => {
    setCardReplacement({
      ...cardReplacement,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickFile = () => {
    setInputBelow(true);
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold card-replacement-title">
            {props.showAddBlockCard === "add"
              ? "SRF - Add Card Replacement"
              : "SRF - Edit Card replacement "}
          </h1>
          <button
            className="card-replacement-back border-0"
            onClick={props.onCancel}
          >
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="card-replacement-body p-3">
            <div className="col d-flex p-1">
              <div className="col-8 p-1">
                <label className="card-replacement-label">Mobile Number</label>
                <div className="col-8 p-1 row">
                  <Input
                    className="border-1 card-replacement-inputCode form-select"
                    type="select"
                    readOnly={props.showAddBlockCard === "add" ? false : true}
                  >
                    <option>+65</option>
                    <option>+91</option>
                  </Input>
                  <Input
                    className="border-1 card-replacement-inputMobile form-control"
                    type="text"
                    value={cardReplacement.mobileNo}
                    readOnly={props.showAddBlockCard === "add" ? false : true}
                  />
                </div>
              </div>
            </div>
            <div className="col-10 card-replacement-formColor p-2 row">
              <div className="col-2 p-2">
                <label className="card-replacement-label">Wallet ID</label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-replacement-inputType form-control"
                    type="text"
                    readOnly={true}
                    value={cardReplacement.walletId}
                  />
                </div>
              </div>
              <div className="col-3 p-2">
                <label className="card-replacement-label">Customer Name</label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-replacement-inputType form-control"
                    type="text"
                    value={cardReplacement.customerName}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 p-2">
                <label className="card-replacement-label">Card L4D</label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-replacement-inputType form-control"
                    type="text"
                    value={cardReplacement.cardL4d}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 p-2">
                <label className="card-replacement-label">
                  Card Expiry Date
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-replacement-inputType form-control"
                    type="text"
                    value={cardReplacement.cardExpirydate}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-3 p-2">
                <label className="card-replacement-label">
                  Replacement Fee
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-replacement-inputType form-control"
                    type="text"
                    value={cardReplacement.replacementFee}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="col d-flex p-1">
              <div className="col-3 p-1 pt-3">
                <label className="card-replacement-label">Reason Code</label>
                <div className="col-12 row">
                  <Input
                    className="border-1 card-replacement-inputType form-select"
                    type="select"
                    value={cardReplacement.requestReasoncode}
                    onChange={handleChange}
                  >
                    <option></option>
                    <option></option>
                  </Input>
                </div>
                <div className="col-12 d-flex">
                  <div className="col-12 pt-3">
                    <label className="card-replacement-label">
                      Customer Signature
                    </label>
                    <div className="col-12 row">
                      <Input
                        className="border-1 card-replacement-inputReason form-control"
                        type="textarea"
                      ></Input>
                    </div>
                  </div>
                </div>

                <div className="col pt-3 d-flex">
                  <div className="col-12 pt-2 ">
                    <label className="card-replacement-label">Card Type</label>
                    <div className="col-12 row p-1">
                      <Input
                        className="border-1 card-replacement-inputReason form-control"
                        type="text"
                      ></Input>
                    </div>
                  </div>
                  <div className="col-12 pt-2">
                    <label className="card-replacement-label">URN</label>
                    <div className="col-12 row p-1">
                      <Input
                        className="border-1 card-replacement-inputReason form-control"
                        type="text"
                      ></Input>
                    </div>
                  </div>
                  {!inputBelow && (
                    <>
                      <div className="col-12 pt-2">
                        <label className="card-replacement-label">
                          ID Doc Type
                        </label>
                        <div className="col-12 p-1 row">
                          <Input
                            className="border-1 card-replacement-inputReason form-control"
                            type="text"
                          ></Input>
                        </div>
                      </div>
                      <div className="col-12 pt-2">
                        <label className="card-replacement-label">
                          ID Doc Number
                        </label>
                        <div className="col-12 p-1 row">
                          <Input
                            className="border-1 card-replacement-inputReason form-control"
                            type="text"
                          ></Input>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-3 p-1"></div>
              {inputBelow && (
                <>
                  <div className="col-3 p-1 divHeight">
                    <div className="col-12 imageDiv">
                      <img src={logofinal} alt="Selfie" className="col-12" />
                    </div>
                    <div className="btnDiv pt-3">
                      <Button className="saveBtnImage">Save</Button>
                    </div>
                  </div>
                  <div className="col-3 p-1 divHeight">
                    <div className="col-12 imageDiv">
                      <img src={logofinal} alt="Selfie" className="col-12" />
                    </div>
                    <div className="btnDiv pt-3">
                      <Button className="saveBtnImage">Save</Button>
                    </div>
                  </div>
                </>
              )}
            </div>
            {inputBelow && (
              <div className="col p-1 d-flex">
                <div className="col-3 p-1">
                  <label className="card-replacement-label">ID Doc Type</label>
                  <div className="col-12 p-1 row">
                    <Input
                      className="border-1 card-replacement-inputReason form-control"
                      type="text"
                    ></Input>
                  </div>
                </div>
                <div className="col-3 p-1">
                  <label className="card-replacement-label">
                    ID Doc Number
                  </label>
                  <div className="col-12 p-1 row">
                    <Input
                      className="border-1 card-replacement-inputReason form-control"
                      type="text"
                    ></Input>
                  </div>
                </div>
              </div>
            )}
            {!inputBelow && (
              <div className="col-6 p-1 d-flex">
                <div className="col-3">
                  <label className="card-replacement-label">ID Doc Front</label>
                  <div className="frontEyeCard eyeiconleftCard">
                    <Label>
                      <MdFileUpload type="file"></MdFileUpload>
                      <Input
                        style={{ display: "none" }}
                        type="file"
                        className="frontEyeCard"
                        onChange={handleClickFile}
                      ></Input>
                      <span>Upload</span>
                    </Label>
                  </div>
                </div>
                <div className="col-3">
                  <label className="card-replacement-label">ID Doc Back</label>
                  <div className="frontEyeCard eyeiconleftCard">
                    <Label>
                      <MdFileUpload type="file"></MdFileUpload>
                      <Input
                        style={{ display: "none" }}
                        type="file"
                        className="frontEyeCard"
                        onChange={handleClickFile}
                      ></Input>
                      <span>Upload</span>
                    </Label>
                  </div>
                </div>
                <div className="col-3">
                  <label className="card-replacement-label">Selfie</label>
                  <div className="frontEyeCard eyeiconleftCard">
                    <Label>
                      <MdFileUpload type="file"></MdFileUpload>
                      <Input
                        style={{ display: "none" }}
                        type="file"
                        className="frontEyeCard"
                        onChange={handleClickFile}
                      ></Input>
                      <span>Upload</span>
                    </Label>
                  </div>
                </div>
              </div>
            )}
            <div className="col-6 pt-4">
              <SubmitCancelButton
                button={"Submit"}
                secondButton={"Cancel"}
                onCancel={props.onCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardReplacement;
