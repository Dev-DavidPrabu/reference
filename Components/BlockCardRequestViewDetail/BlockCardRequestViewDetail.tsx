import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Button, Input, Label } from "reactstrap";
import {
  getBlockCardRecords,
  ResponseMessage,
} from "../../redux/action/BlockCardRequestAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./BlockCardRequestViewDetail.scss";

const BlockCardRequestViewDetail = (props: any) => {
  const [blockCardRecords, setBlockCardRecords] = useState({
    checkerName: "",
    cardExpiryDate: "",
    panLastFourdigits: "",
    customerName: "",
    makerName: "",
    createdDate: "",
    approverTime: "",
    approverRemarks: "",
    accountingUpdatedTime: "",
    primaryMobileNumber: "",
    requestChannel: "",
    reasonCode: "",
    reasonStatus: "",
    walletId: "",
    blockExpirydate: "",
    customerId: "",
    id: "",
    requestType: "",
    customerSignatureFile: "",
    accountingAuthRefNo: "",
    accountingResponseCode: "",
    accountingErrorMsg: "",
    idTypeCode: "",
    idValue: "",
    frontDocumentContent: "",
    backDocumentContent: "",
    photoContent: "",
    blockExpiryDate: "",
    customerRemarks: "",
    nationality: "",
    accountTypeName: "",
    srfCustomerSignatureFile: "",
  });

  const [newSelfie, setNewSelfie] = useState("");
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const location: any = useLocation();
  const [status, setStatus] = useState("Approve");
  const [reason, setReason] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [lockedStatus, setLockedStatus] = useState(true);
  const [apiStatus, setApiStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const dispatch = useDispatch();

  const ApiResponseMessage = useSelector(
    (state: RootStateOrAny) => state.BlockCardRequestReducer?.getResponseMessage?.data
    ?.responseMessage
  );

  const test = useSelector(
    (state: RootStateOrAny) => state.BlockCardRequestReducer
  );

  let rejected = false;

  ApiResponseMessage?.data?.forEach((res: any) => {
    if (res.requestStatus === "REJECTED") {
      rejected = true;
    }
  });
  const fetchBlockCardRequest = useCallback(async () => {
    try {
      dispatch(getBlockCardRecords());
    } catch (err) {}
  }, [dispatch]);

  let approvedRes = false;
  ApiResponseMessage?.data?.forEach((res: any) => {
    if (res.requestStatus === "APPROVED") {
      approvedRes = true;
    }
  });
  useEffect(() => {
    if (ApiResponseMessage?.data) {
      setIsLoading(false);
      if (ApiResponseMessage?.data[0]?.reasonStatus === "REJECTED") {
        setApiMessage(ApiResponseMessage?.data?.responseMessage);
        setApiStatus(true);
      } else {
        setApiMessage(ApiResponseMessage?.data?.responseMessage);
        setApiStatus(true);
      }
      fetchBlockCardRequest();
    } else if (ApiResponseMessage?.error) {
      setIsLoading(false);
      setApiStatus(false);
      setApproveError(true);
      setApiMessage(ApiResponseMessage?.message);
      fetchBlockCardRequest();
    }
  }, [ApiResponseMessage]);
  useEffect(() => {
    if (props.location.state !== undefined) {
      setBlockCardRecords(props.location.state);
    }
  }, [props.location.state]);
  useEffect(() => {
    setNewSelfie(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.photoContent}`
    );
    setNewFront(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.customerSignature}`
    );
    setNewBack(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.srfCustomerSignature}`
    );
  }, [
    props.location.state?.customerSignature,
    props.location.state.frontDocumentContent,
    props.location.state?.photoContent,
    props.location.state?.srfCustomerSignature,
  ]);

  const handleCancel = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Block-Card-Request",
    });
  };
  const fetchResponseMessage = useCallback(
    async (data) => {
      try {
        dispatch(ResponseMessage(data));
      } catch (err) {}
    },
    [dispatch]
  );

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
        fetchResponseMessage(body);
      } else {
        var approveData = JSON.stringify({
          reasonStatus: "APPROVE",
          approverRemarks: reason,
          id: [id],
        });
        fetchResponseMessage(approveData);
      }
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };

  useEffect(() => {
    if (ApiResponseMessage &&
      ApiResponseMessage !== undefined &&
      ApiResponseMessage .length !== 0
      ) {
      props.history.push({
        pathname: "/dashboard/SRF/Block-Card-Request",
        state: { ApiResponseMessage },
      });
    }
  });

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold block-card-title">
            SRF - Block Card Request View Details
          </h1>
          <button className="block-card-back border-0" onClick={handleCancel}>
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
          <div className="block-card-view-body p-3">
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="block-card-view-label">SRF Request ID</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.id}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="block-card-view-label">Customer Name</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={blockCardRecords.customerName}
                    />
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="block-card-view-label">
                    Request Reason Code
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={blockCardRecords.reasonCode}
                    />
                  </div>
                </div>
              </div>

              <div className="col-3 p-1">
                <label className="block-card-view-label">
                  SRF Request Type
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.requestChannel}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="block-card-view-label">Mobile No</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={blockCardRecords.primaryMobileNumber}
                    />
                  </div>
                </div>
                {props?.location?.state?.blockExpiryDate && (
                  <div className="col-12 pt-3">
                    <label className="block-card-view-label">
                      Lock Expiry Date
                    </label>
                    <div className="col-12 pt-2">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={blockCardRecords.blockExpiryDate}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-3 p-1">
                <label className="block-card-view-label">Customer ID</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.customerId}
                  />
                </div>
                <div className="col-12 pt-3 row">
                  <div className="col-5">
                    <label className="block-card-view-label">Pan Number</label>
                    <div className="col-12 pt-2">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={blockCardRecords.panLastFourdigits}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="block-card-view-label">
                      Card Expiry Date
                    </label>
                    <div className="col-8 pt-2">
                      <Input
                        className="border-1 block-card-view-inputCardExpiry form-control"
                        type="text"
                        readOnly={true}
                        value={blockCardRecords.cardExpiryDate}
                      />
                    </div>
                  </div>
                </div>
                {props?.location?.state?.reasonCode === "Others" && (
                  <div className="col-12 pt-3">
                    <label className="block-card-view-label">
                      Reason for Card Block
                    </label>
                    <div className="col-12 pt-2">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={blockCardRecords.customerRemarks}
                      />
                    </div>
                  </div>
                )}

                <div className="col-12 pt-3">
                  <label className="block-card-view-label">Wallet Size</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={blockCardRecords.accountTypeName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="block-card-view-label">Request Status</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.reasonStatus}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="block-card-view-label">Input Channel</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.requestChannel}
                  />
                </div>
              </div>
              {props.location.state?.customerSignature && (
                <div className="col-4 p-1">
                  <label className="block-card-view-label">
                    Customer Signature
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="SelfieImage"
                      src={newFront}
                      className="col-12 selfieImage"
                    />
                  </div>
                </div>
              )}
              {props.location.state?.srfCustomerSignature && (
                <div className="col-4 p-1">
                  <label className="block-card-view-label">
                    SRF Customer Signature
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="SelfieImage"
                      src={newBack}
                      className="col-12 selfieImage"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="block-card-view-label">
                  Input operator ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.makerName}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="block-card-view-label">Input Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.createdDate}
                  />
                </div>
              </div>
            </div>

            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="block-card-view-label">ID DOC Type</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.idTypeCode}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="block-card-view-label">ID DOC number</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.idValue}
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
                      value={blockCardRecords?.nationality}
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="block-card-view-label">Approver Name</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.checkerName}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="block-card-view-label">Approver Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.approverTime}
                  />
                </div>
              </div>
              <div className="col-4 p-1">
                <label className="block-card-view-label">Checker Remarks</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.approverRemarks}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="block-card-view-label">
                  Accounting Auth Ref No
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.accountingAuthRefNo}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="block-card-view-label">
                  Accounting Update Time
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.accountingUpdatedTime}
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="block-card-view-label">
                  Accounting Response Code
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.accountingResponseCode}
                  />
                </div>
              </div>
              <div className="col-4 p-1">
                <label className="block-card-view-label">
                  Accounting Error Message
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 block-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={blockCardRecords.accountingErrorMsg}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="block-card-view-label">
                  Customer Signature
                </label>
                <div className="col-12 pt-2">
                  <img
                    alt="frontDocumentContent"
                    src={`https://dmbzkkf9wrum7.cloudfront.net/${blockCardRecords.customerSignatureFile}`}
                    className="col-12 SelfieUnblockImage"
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="block-card-view-label">
                  SRF Customer Signature
                </label>
                <div className="col-12 pt-2">
                  <img
                    alt="frontDocumentContent"
                    src={`https://dmbzkkf9wrum7.cloudfront.net/${blockCardRecords.srfCustomerSignatureFile}`}
                    className="col-12 SelfieUnblockImage"
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="block-card-view-label">Photo Content</label>
                <div className="col-12 pt-2">
                  <img
                    alt="frontDocumentContent"
                    src={`https://dmbzkkf9wrum7.cloudfront.net/${blockCardRecords.photoContent}`}
                    className="col-12 SelfieUnblockImage"
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              {props.location.state?.frontDocumentContent !== undefined ? (
                <div className="col-4">
                  <label className="block-card-view-label">
                    ID Doc Front Page
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="frontDocumentContent"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${blockCardRecords.frontDocumentContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              ) : null}
              {props.location.state?.backDocumentContent !== undefined ? (
                <div className="col-4">
                  <label className="block-card-view-label">
                    ID Doc Back Page
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="backDocumentContent"
                      src={`https://dmbzkkf9wrum7.cloudfront.net/${blockCardRecords.backDocumentContent}`}
                      className="col-12 SelfieUnblockImage"
                    />
                  </div>
                </div>
              ) : null}
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

export default BlockCardRequestViewDetail;
