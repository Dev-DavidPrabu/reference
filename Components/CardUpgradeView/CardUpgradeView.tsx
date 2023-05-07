import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Button, Input, Label } from "reactstrap";
import { rejectUpgradeStatus } from "../../redux/action/CardUpgradeAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./CardUpgradeView.scss";

const CardUpgradeView = (props: any) => {
  const [upgradeCardRecords, setUpgradeCardRecords] = useState({
    cardExpiryDate: "",
    panLastFourdigits: "",
    customerName: "",
    primaryMobileNumber: "",
    reasonStatus: "",
    customerId: "",
    idTypeCode: "",
    idValue: "",
    srfIdValue: "",
    srfIdTypeCode: "",
    nationalityCodeDescription: "",
    cardUrn: "",
    reasonStatusCode: "",
    blockDate: "",
    remarks: "",
    existingWalletLevel: "",
    eligibleWalletLevel: "",
    eligibleWalletName: "",
    cardL4d: "",
    cardExpirydate: "",
    approverId: "",
    createdBy: "",
    accountingAuthRefNo: "",
    accountingErrorMsg: "",
    accountingResponseCode: "",
    accountingUpdatedTime: "",
    approverTime: "",
    createdDate: "",
    id: "",
    requestChannel: "",
    requestType: "",
    updatedBy: "",
    updatedDate: "",
    makerName: "",
    checkerName: "",
    requestedWalletName: "",
    upgradeWalletName: "",
    approverRemarks: "",
    existingWalletName: "",
  });
  const [hiddenMaker, setHiddenMaker] = useState(false);
  const [newSelfie, setNewSelfie] = useState("");
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [signature, setSignature] = useState("");
  const [srfSignature, setSrfSignature] = useState("");
  const [oldSign, setOldSign] = useState("");
  const [status, setStatus] = useState("Approve");
  const [reason, setReason] = useState("");
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState("");
  const [lockedStatus, setLockedStatus] = useState(true);
  const [approveError, setApproveError] = useState(false);
  const dispatch = useDispatch();
  const [walletsize, setWalletsize] = useState(null);
  const [errorValidate, SeterroValidate] = useState(false);
  const blockCardUserAccess = useSelector(
    (state: any) => state.CardUnBlockReducer?.getUserAccessResponse
  );

  useEffect(() => {
    if (props.location.state !== undefined) {
      setUpgradeCardRecords(props.location.state);
    }
  }, [props.location.state]);

  const handleCancel = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Card-Upgrade",
    });
  };

  useEffect(() => {
    setNewSelfie(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.srfPhotoContent}`
    );
    setNewFront(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.srfFrontDocumentContent}`
    );
    setNewBack(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.srfBackDocumentContent}`
    );
    setSignature(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.customerSignatureFile}`
    );
    setSrfSignature(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.srfCustomerSignatureFile}`
    );
    setOldSign(
      `https://dmbzkkf9wrum7.cloudfront.net/${props.location.state?.customerOldSignatureFile}`
    );
  }, []);
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
  const fetchRejectUpgradeCard = useCallback(
    (data: any) => {
      try {
        dispatch(rejectUpgradeStatus(data));
      } catch (err) {}
    },
    [dispatch]
  );
  const handleSubmit = (value: any, reason: any) => {
    if (validate()) {
      if (value === "Reject") {
        var body = JSON.stringify({
          reasonStatus: "REJECT",
          approverRemarks: reason,
          srfUpgradeRequests: [{ id, walletLevel: "AC003" }],
        });
        fetchRejectUpgradeCard(body);
      } else {
        var approveData = JSON.stringify({
          reasonStatus: "APPROVE",
          approverRemarks: reason,
          srfUpgradeRequests: [{ id, walletLevel: "AC003" }],
        });
        fetchRejectUpgradeCard(approveData);
      }
    }
  };

  const conditionalSubmit = (value: any, reason: any) => {
    SeterroValidate(false);
    if (walletShow(upgradeCardRecords)) {
      if (walletsize !== null) {
        handleSubmit(value, reason);
      } else {
        SeterroValidate(true);
      }
    } else {
      handleSubmit(value, reason);
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };

  let makerRes = blockCardUserAccess?.data;
  let blockMakerAdd = false;
  let blockChecker = false;

  makerRes?.forEach((res: any) => {
    if (res.approvalLevelOne === true) {
      blockChecker = true;
    } else if (res.add === true) {
      blockMakerAdd = true;
    }
  });

  useEffect(() => {
    makerRes?.forEach((res: any) => {
      if (
        res?.add === true ||
        res?.delete === true ||
        res?.edit === true ||
        res?.view === true
      ) {
        setHiddenMaker(true);
      } else {
        setHiddenMaker(false);
      }
    });
  }, [makerRes]);

  const onClickEligble = (record: any, e: any) => {
    const value = parseInt(e.target.value);

    setWalletsize(e.target.value);
  };

  const walletShow = (record: any) => {
    if (
      record.reasonStatus === "APPROVED" ||
      record.reasonStatus === "REJECTED" ||
      hiddenMaker === true
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold block-card-title">
            SRF - Card Upgrade View Detailsss
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
          <div className="Upgrade-card-view-body p-3">
            <div className="container-fluid row p-2">
              <div className="col-3 p-1">
                <label className="Upgrade-card-view-label">
                  SRF Request ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.customerId}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="Upgrade-card-view-label">
                    Customer Name
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.customerName}
                    />
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="Upgrade-card-view-label">
                    Existing Wallet Size
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.existingWalletName}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="Upgrade-card-view-label">
                  SRF Request Type
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.requestType}
                  />
                </div>
                <div className="col-12 pt-3">
                  <label className="Upgrade-card-view-label">Mobile No</label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.primaryMobileNumber}
                    />
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="Upgrade-card-view-label">
                    Request Status
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.reasonStatus}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3 p-1 mt-5">
                <div className="col-12 pt-3 mt-3 d-flex">
                  <div className="col-4">
                    <label className="Upgrade-card-view-label">
                      Pan Number
                    </label>
                    <div className="col-8 pt-2">
                      <Input
                        className="border-1 Upgrade-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={upgradeCardRecords.panLastFourdigits}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="Upgrade-card-view-label">
                      Card Expiry Date
                    </label>
                    <div className="col-8 pt-2">
                      <Input
                        className="border-1 Upgrade-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={upgradeCardRecords.cardExpiryDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 pt-3">
                  <label className="Upgrade-card-view-label">
                    Input Channel
                  </label>
                  <div className="col-12 pt-2">
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.requestChannel}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Input Operator ID
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.makerName}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">Input Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.createdDate}
                  />
                </div>
              </div>
              {props.location.state?.customerOldSignatureFile && (
                <div className="col-3 p-1">
                  <label className="block-card-view-label">
                    Customer Old Signature
                  </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="SelfieImage"
                      src={oldSign}
                      className="col-12 signatureImg"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">Approver ID</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.checkerName}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">Approver Time</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.approverTime}
                  />
                </div>
              </div>
              <div className="col-4 p-1">
                <label className="Upgrade-card-view-label">
                  Approver Remarks
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.approverRemarks}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Host Auth Ref No
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.accountingAuthRefNo}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Host Update Time
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.accountingUpdatedTime}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Host Response Code
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.accountingResponseCode}
                  />
                </div>
              </div>
              <div className="col-3 p-1">
                <label className="Upgrade-card-view-label">
                  Host Error Message
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.accountingErrorMsg}
                  />
                </div>
                SRF - Card Upgrade View Detailsss
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">ID Doc Type</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.srfIdTypeCode}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">ID Doc Number</label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.srfIdValue}
                  />
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Eligible Wallet Size
                </label>
                <div className="col-12 pt-2">
                  {walletShow(upgradeCardRecords) ? (
                    <div>
                      <input
                        type="radio"
                        name={upgradeCardRecords.customerId}
                        value={"1"}
                        onChange={(e) => onClickEligble(upgradeCardRecords, e)}
                      />
                      20K Wallet
                    </div>
                  ) : (
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.eligibleWalletName}
                    />
                  )}
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Requested Wallet Size
                </label>
                <div className="col-12 pt-2">
                  {walletShow(upgradeCardRecords) ? (
                    <div>
                      <input
                        type="radio"
                        name={upgradeCardRecords.customerId}
                        value={"2"}
                        onChange={(e) => onClickEligble(upgradeCardRecords, e)}
                      />
                      20K Wallet
                    </div>
                  ) : (
                    <Input
                      className="border-1 Upgrade-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={upgradeCardRecords.requestedWalletName}
                    />
                  )}
                </div>
              </div>
              <div className="col-2 p-1">
                <label className="Upgrade-card-view-label">
                  Approved Wallet Size
                </label>
                <div className="col-12 pt-2">
                  <Input
                    className="border-1 Upgrade-card-view-inputMobile form-control"
                    type="text"
                    readOnly={true}
                    value={upgradeCardRecords.upgradeWalletName}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              {props.location.state?.customerSignatureFile && (
                <div className="col-3 p-1">
                  <label className="block-card-view-label">
                    Customer Signature
                  </label>
                  <div className="col-12 pt-2 selfieImage">
                    <img
                      alt="SelfieImage"
                      src={signature}
                      className="col-12 selfieImage"
                    />
                  </div>
                </div>
              )}
              {props.location.state?.srfCustomerSignatureFile && (
                <div className="col-4 p-1">
                  <label className="block-card-view-label">
                    SRF Customer Signature
                  </label>
                  <div className="col-12 pt-2 selfieImage">
                    <img
                      alt="SelfieImage"
                      src={srfSignature}
                      className="col-12 selfieImage"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="container-fluid row p-2">
              {props.location.state?.srfFrontDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    ID Doc Front Page{" "}
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
              {props.location.state?.srfBackDocumentContent && (
                <div className="col-4">
                  <label className="block-card-view-label">
                    ID Doc Back Page{" "}
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
              {props.location.state?.srfPhotoContent && (
                <div className="col-4">
                  <label className="block-card-view-label">Selfie </label>
                  <div className="col-12 pt-2">
                    <img
                      alt="SelfieDocImage"
                      src={newSelfie}
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
                <div
                  className="col-2"
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  <Button
                    color="danger"
                    //disabled={!props.disableCustomRowSelection}
                    className="customApproval"
                    onClick={() => conditionalSubmit(status, reason)}
                    //handlesubmit={handleSubmit}
                    // onClick={() => props.handleSubmit(status, reason, upgrade)}
                  >
                    Submit
                  </Button>
                </div>
                {errorValidate ? (
                  <div style={{ color: "red", width: "200px" }}>
                    Wallet Size is Required!
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUpgradeView;
