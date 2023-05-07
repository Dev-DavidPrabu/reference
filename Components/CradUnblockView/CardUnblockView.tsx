import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Button, Input, Label } from "reactstrap";
import { UnblockResponseMessage } from "../../redux/action/CardUnBlockAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./CardUnblockView.scss";

const CardUnblockView = (props: any) => {
  const [unBlockCardRecords, setUnBlockCardRecords] = useState({
    accountingAuthRefNo: "",
    accountingErrorMsg: "",
    accountingResponseCode: "",
    accountingUpdatedTime: "",
    accountTypeName: "",
    backDocumentContent: "",
    id: "",
    checkerName: "",
    approverTime: "",
    approverRemarks: "",
    cardExpiryDate: "",
    panLastFourdigits: "",
    customerName: "",
    customerSignatureFile: "",
    makerName: "",
    nationality: "",
    createdDate: "",
    primaryMobileNumber: "",
    requestChannel: "",
    reasonStatus: "",
    walletId: "",
    blcokExpirydate: "",
    idValue: "",
    idTypeCode: "",
    srfBackDocumentContent: "",
    srfFrontDocumentContent: "",
    srfIdTypeCode: "",
    srfIdValue: "",
    srfCustomerSignatureFile: "",
    srfPhotoContent: "",
    photoContent: "",
    frontDocumentContent: "",
  });

  const [newSelfie, setNewSelfie] = useState("");
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [status, setStatus] = useState("Approve");
  const [reason, setReason] = useState("");
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState("");
  const [lockedStatus, setLockedStatus] = useState(true);
  const [approveError, setApproveError] = useState(false);
  const dispatch = useDispatch();
  const getUnblockResponseMessage = useSelector(
    (state: any) =>
      state?.CardUnBlockReducer?.getUnblockResponseMessage?.data
        ?.responseMessage
  );

  const fetchUnblockResponseMessage = useCallback(
    async (data) => {
      try {
        dispatch(UnblockResponseMessage(data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    setNewSelfie(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.photoContent}`
    );
    setNewFront(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.frontDocumentContent}`
    );
    setNewBack(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.backDocumentContent}`
    );
  }, []);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setUnBlockCardRecords(props.location.state);
    }
  }, [props.location.state]);

  const handleCancel = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Card-Unblock",
    });
  };
  let locstatus = location?.state?.reasonStatus;
  const handleChangeReason = (e: any) => {
    setReason(e.target.value);
  };
  const statuschangehandler = (e: any) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;
  let operatorId = location?.state?.updatedBy;
  let id = location?.state?.id;

  const validate = () => {
    if (makerDetail === operatorId) {
      setLockedStatus(false);
      setApproveError(true);
      setApiMessage("Maker can't approve his own request.");
    } else {
      setApiMessage("");
      return true;
    }
  };
  const handleSubmit = (value: any, reason: any) => {
    if (validate()) {
      if (value === "Reject") {
        var body = JSON.stringify({
          reasonStatus: "REJECT",
          approverRemarks: reason,
          id: [id],
        });
        fetchUnblockResponseMessage(body);
      } else {
        var approveData = JSON.stringify({
          reasonStatus: "APPROVE",
          approverRemarks: reason,
          id: [id],
        });
        fetchUnblockResponseMessage(approveData);
      }
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };

  useEffect(() => {
    if (
      getUnblockResponseMessage &&
      getUnblockResponseMessage !== undefined &&
      getUnblockResponseMessage.length !== 0
    ) {
      props.history.push({
        pathname: "/dashboard/SRF/Card-Unblock",
        state: { getUnblockResponseMessage },
      });
    }
  });
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold block-card-title">
            SRF - Card Unblock View Details
          </h1>
          <button className="block-card-back border-0" onClick={handleCancel}>
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={lockedStatus}
          closeMessage={() => closeMessage()}
          message={apiMessage}
          errorFix={approveError}
        />
      )}
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="Unblock-card-view-body p-3">
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="Unblock-card-view-label">
                  SRF Request ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.id}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="Unblock-card-view-label">
                    Customer Name
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Unblock-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={unBlockCardRecords.customerName}
                    />
                  </div>
                </div>
                <div className="col-10 pt-3">
                  <label className="Unblock-card-view-label">
                    Request Status
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Unblock-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={unBlockCardRecords.reasonStatus}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="Unblock-card-view-label">
                  SRF Request Type
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.requestChannel}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="Unblock-card-view-label">Mobile No</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Unblock-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={unBlockCardRecords.primaryMobileNumber}
                    />
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="Unblock-card-view-label">
                    Input Channel
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Unblock-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={unBlockCardRecords.requestChannel}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3  mt-5">
                <div className="col-12 row cardDate">
                  <div className="col-4">
                    <label className="Unblock-card-view-label">
                      Pan Number
                    </label>
                    <div className="col-12 pt-2">
                      <Input
                        className="border-1 Unblock-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={unBlockCardRecords.panLastFourdigits}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="Unblock-card-view-label">
                      Card Expiry Date
                    </label>
                    <div className="col-8 pt-2">
                      <Input
                        className="border-1 Unblock-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={unBlockCardRecords.cardExpiryDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="block-card-view-label">Wallet Size</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={unBlockCardRecords.accountTypeName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">
                  Input Operator ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.makerName}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">Input Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.createdDate}
                  />
                </div>
              </div>
              {props.location.state?.nationality ? (
                <div className="col-4 p-1">
                  <label className="block-card-view-label">Nationality</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={unBlockCardRecords.nationality}
                    />
                  </div>
                </div>
              ) : null}
              {props.location.state?.customerSignature && (
                <>
                  <div className="col-3 p-1">
                    <label className="block-card-view-label">
                      Customer Old Signature
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="SelfieImage"
                        src={newSelfie}
                        className="col-12 signatureImg"
                      />
                    </div>
                  </div>
                  <div className="col-3 p-1">
                    <label className="block-card-view-label">
                      Customer New Signature
                    </label>
                    <div className="col-12 pt-2 signatureImg">
                      <img
                        alt="SelfieImage"
                        src={newSelfie}
                        className="col-12 signatureImg"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">Approver Name</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.checkerName}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">
                  Approver Time{" "}
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.approverTime}
                  />
                </div>
              </div>
              <div className="col-4 p-1">
                <label className="Unblock-card-view-label">
                  Approver Comments
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.approverRemarks}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">
                  Host Auth Ref No
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.accountingAuthRefNo}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">
                  Host Update Time
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.accountingUpdatedTime}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">
                  Host Response Code
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.accountingResponseCode}
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="Unblock-card-view-label">
                  Host Error Message
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.accountingErrorMsg}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              {unBlockCardRecords.customerSignatureFile !== undefined ? (
                <div className="col-3 p-1">
                  <label className="block-card-view-label">
                    Customer Signature
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="customer Signature"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.customerSignatureFile}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              ) : null}
              {unBlockCardRecords.srfCustomerSignatureFile !== undefined ? (
                <div className="col-3 p-1">
                  <label className="block-card-view-label">
                    SRF Customer Signature
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="SrfCustomerSignature"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.srfCustomerSignatureFile}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="container-fluid row p-2">
              {unBlockCardRecords.photoContent !== undefined ? (
                <div className="col-3 p-1">
                  <label className="block-card-view-label">Photo Content</label>
                  <div className="col-12 pt-2">
                    <img
                      alt="PhotoContent"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.photoContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              ) : null}
              {unBlockCardRecords.srfPhotoContent !== "" ? (
                <div className="col-3 p-1">
                  <label className="block-card-view-label">
                    SRF Photo Content
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="PhotoContent"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.srfPhotoContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div style={{ fontWeight: 800, fontSize: "16px" }}>
              Existing Customer Details
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">ID Doc Type</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.idTypeCode}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">ID Doc Number</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.idValue}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              {props.location.state?.frontDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    ID Doc Front Page
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="FrontDocImage"
                      src={newFront}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              )}
              {props.location.state?.backDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    ID Doc Back Page
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="BackDocImage"
                      src={newBack}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={{ fontWeight: 800, fontSize: "16px" }}>
              SRF Requested Details
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">
                  SRF ID TypeCode
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.srfIdTypeCode}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Unblock-card-view-label">SRF ID Value</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Unblock-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={unBlockCardRecords.srfIdValue}
                  />
                </div>
              </div>
            </div>

            <div className="container-fluid row p-2">
              {props.location.state?.srfBackDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    SRF Back Document Content
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="FrontDocImage"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.srfBackDocumentContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              )}
              {props.location.state?.srfFrontDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    SRF Front Document Content
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="BackDocImage"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.srfFrontDocumentContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              )}
              {props.location.state?.srfFrontDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    SRF Photo Content
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="BackDocImage"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${unBlockCardRecords.srfPhotoContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              )}
            </div>

            {locstatus === "CREATED" && (
              <div className="row filteredArea ps-4">
                <div className="col-2">
                  <Input
                    type="select"
                    name=""
                    className="form-select btn--sizer"
                    value={status}
                    onChange={statuschangehandler}
                  >
                    <option>Approve</option>
                    <option>Reject</option>
                  </Input>
                </div>
                <div className="col-1">
                  <Label>Remarks</Label>
                </div>
                <div className="col-3">
                  <Input
                    type="text"
                    name=""
                    className="form-control"
                    value={reason}
                    onChange={handleChangeReason}
                  />
                </div>
                <div className="col-2">
                  <Button
                    color="danger"
                    //disabled={!props.disableCustomRowSelection}
                    className="customApproval"
                    onClick={() => handleSubmit(status, reason)}
                    //handlesubmit={handleSubmit}
                    // onClick={() => props.handleSubmit(status, reason, upgrade)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUnblockView;
