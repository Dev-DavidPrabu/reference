import { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import { Button, Input, Label } from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import {
  getCustomerdetailMob,
  getToggleIDList,
  resetToggle,
} from "../../redux/action/BlockCardRequestAction";
import CustomLoader from "../Loader/CustomLoader";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./AddBlockCardRequest.scss";
import moment from "moment";
import close from "../../assets/close.svg";
import { useLocation } from "react-router-dom";

const AddBlockCardRequest = (props: any) => {
  const [confirmData, setConfirmData] = useState(false);
  const [checkedprimaryMobileNumber, SetCheckedprimaryMobileNumber] =
    useState(false);
  const [temporaryfield, setTemporaryfield] = useState(false);
  const [remarksField, setRemarksField] = useState(false);
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState(false);
  const [countryCode, setCountryCode] = useState("+60");
  const [isLoading, setIsLoading] = useState(false);
  const [addMessage, setAddMessage] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [blockCardRequest, setBlockCardRequest] = useState({
    approverId: "",
    cardExpiryDate: "",
    panLastFourdigits: "",
    customerName: "",
    inputOperatorId: "",
    primaryMobileNumber: "",
    requestChannel: "",
    reasonStatus: "",
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
    nationalityCodeDescription: "",
    customerNumber: "",
  });
  const [primaryMobileNumber, setPrimaryMobileNumber] = useState("");
  const [mobileCode, setMobileCode] = useState("");
  const [code, setCode] = useState("");
  const [blockDate, setBlockDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [toggleData, setToggleData] = useState("");
  const [toggleVisible, setToggleVisible] = useState(false);
  const [dropData, setDropData] = useState("");
  const [dropVisible, setDropVisible] = useState(false);
  const [customerDetailsModel, setCustomerDetailsModel] = useState(false);
  const [errors, setErrors] = useState({
    mobileNumError: "",
  });
  const [remarkError, setRemarkError] = useState({
    remarkError: "",
  });
  const [newSign, setNewSign] = useState("");
  const [btndisable, setBtndisable] = useState(false);

  useEffect(() => {
    if (!toggleData) {
      setToggleData("");
    }
  }, [toggleData]);
  useEffect(() => {
    if (props.cardDetail !== undefined) {
      setBlockCardRequest(props.cardDetail);
      setPrimaryMobileNumber(props.cardDetail.primaryMobileNumber?.slice(3));
      setMobileCode(props.cardDetail.primaryMobileNumber?.slice(0, 3));
    }
  }, [props.cardDetail]);

  useEffect(() => {
    if (props.message) {
      setApiMessage(true);
      setAddMessage(props.message);
      setApiStatus(false);
      fetchResetToggleDetails();
      setToggleVisible(false);
      var body = JSON.stringify({
        primaryMobileNumber: MobileNumber,
      });
      fetchCustomerBlockCardDetails(body);
      setBlockCardRequest((prev) => {
        return { ...prev, primaryMobileNumber: "" };
      });
    }
  }, []);

  useEffect(() => {
    if (props.showAddBlockCard === "add") {
      setBlockCardRequest((prev) => {
        return { ...prev, primaryMobileNumber: "" };
      });
      fetchResetToggleDetails();
      setToggleVisible(false);
      setToggleData("");
    }
  }, []);

  useEffect(() => {
    if (props.isLoadingData === true) {
      setIsLoadingData(true);
    } else if (props.message) {
      setIsLoadingData(false);
      setApiMessage(true);
      setAddMessage(props.message);
      setApiStatus(false);
    }
  }, [props.isLoadingData]);

  let customerDetails = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.customerDetailResponse
  );

  let modifiedCustomerDetails = customerDetails?.data?.customerWalletDto
    ?.cardExpiryDate
    ? customerDetails?.data?.customerWalletDto?.cardExpiryDate.slice(0, 2) +
      "/" +
      customerDetails?.data?.customerWalletDto?.cardExpiryDate.slice(2)
    : "";

  let getMobileVerifyRes = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.getMobilenoVerifyResponse
  );

  useEffect(() => {
    if (getMobileVerifyRes?.error) {
      setApiStatus(false);
      setIsLoading(false);
      setApiMessage(true);
      setBtndisable(true);
      setAddMessage(getMobileVerifyRes?.message);
    } else {
      setBtndisable(false);
    }
  }, [getMobileVerifyRes]);

  const fetchCustomerBlockCardDetails = useCallback(
    (body: any) => {
      try {
        dispatch(getCustomerdetailMob(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (customerDetails?.data) {
      setIsLoading(false);
      SetCheckedprimaryMobileNumber(false);
      setAddMessage("");
      setNewSign(
        `https://dmbzkkf9wrum7.cloudfront.net/${customerDetails?.data?.photoContent}`
      );
    } else if (customerDetails?.error) {
      setApiStatus(false);
      setIsLoading(false);
      SetCheckedprimaryMobileNumber(true);
      setAddMessage("");
      setApiMessage(true);
    }
  }, [customerDetails]);

  useEffect(() => {
    if (customerDetails?.data === "") {
      SetCheckedprimaryMobileNumber(checkedprimaryMobileNumber);
    }
  }, [customerDetails]);

  const toggleDetails = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.toggleDetailResponse
  );
  const fetchToggleDetails = useCallback(() => {
    try {
      dispatch(getToggleIDList());
    } catch (err) {}
  }, [dispatch]);
  const fetchResetToggleDetails = useCallback(() => {
    try {
      dispatch(resetToggle());
    } catch (err) {}
  }, [dispatch]);

  const message =
    "WARNING - Your card will be permanently be cancelled upon this request to replace the card you need to visit the nearest Branch";

  useEffect(() => {
    if (toggleDetails) {
      if (toggleDetails?.data) {
        const tempToggle = toggleDetails?.data?.filter(
          (each: any) => !each.enabled && each.toggleId === "3002"
        );
        const msg = tempToggle[0]?.statusMessage;
        if (tempToggle !== undefined) {
          setToggleData(msg);
          setToggleVisible(true);
        }
      }
    }
  }, [toggleDetails]);

  const validateMobileNumber = () => {
    if (props.showAddBlockCard === "edit") {
      blockCardRequest.primaryMobileNumber = primaryMobileNumber;
    }
    let checkMobileNumError = customValidator(
      "mobileno",
      "Mobile Number",
      blockCardRequest.primaryMobileNumber
    );
    if (checkMobileNumError !== "null") {
      setErrors({
        mobileNumError: checkMobileNumError,
      });
      return false;
    } else {
      setErrors({
        mobileNumError: "",
      });
      return true;
    }
  };

  const validateRemarks = () => {
    if (remarksField) {
      let checkRemarksNumError = customValidator("remarks", "Remarks", remarks);
      if (checkRemarksNumError !== "null") {
        setRemarkError({
          remarkError: checkRemarksNumError,
        });
        return false;
      } else {
        setRemarkError({
          remarkError: "",
        });
        return true;
      }
    } else {
      return true;
    }
  };
  let MobileNumber = countryCode + blockCardRequest.primaryMobileNumber;

  const toggleYes = () => {
    if (validateMobileNumber() && validateRemarks()) {
      if (props.showAddBlockCard === "add") {
        var body = JSON.stringify({
          cardExpiryDate:
            customerDetails?.data?.customerWalletDto?.cardExpiryDate,
          panLastFourdigits:
            customerDetails?.data?.customerWalletDto?.panLastFourdigits,
          customerName: customerDetails?.data?.customerName,
          primaryMobileNumber: MobileNumber,
          reasonCode: code,
          blockExpiryDate: blockDate,
          reasonStatus: "",
          customerId: customerDetails?.data?.customerId,
          cardUrn: customerDetails?.data?.customerWalletDto?.cardUrn,
          idTypeCode: customerDetails?.data?.idTypeCode,
          idValue: "",
          nationalityCodeDescription:
            customerDetails?.data?.nationalityCodeDescription,
          customerRemarks: remarks,
        });
        props.submitHandler(body);
      } else if (props.showAddBlockCard === "edit") {
        var data = JSON.stringify({
          primaryMobileNumber: MobileNumber,
        });
        fetchCustomerBlockCardDetails(data);
      }
    }
  };

  useEffect(() => {
    if (customerDetails?.error) {
      setApiStatus(false);
      setIsLoading(false);
      setApiMessage(true);
      setBtndisable(true);
      setAddMessage(customerDetails?.message);
    } else {
      setBtndisable(false);
    }
  }, [customerDetails, isLoading]);

  useEffect(() => {
    if (customerDetails?.data && !confirmData) {
      setCustomerDetailsModel(true);
    }
  }, [customerDetails, isLoading, confirmData]);

  const handleVerify = () => {
    setConfirmData(false);
    setCode("");
    if (validateMobileNumber()) {
      setIsLoading(true);

      var body = JSON.stringify({
        primaryMobileNumber: MobileNumber,
      });
      fetchCustomerBlockCardDetails(body);

      SetCheckedprimaryMobileNumber(false);
      fetchToggleDetails();
      setConfirmData(false);
    }
  };

  const handleChange = (e: any) => {
    setBlockCardRequest({
      ...blockCardRequest,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeCode = (e: any) => {
    setCode(e.target.value);
    if (
      e.target.value === "FR" ||
      e.target.value === "LC" ||
      e.target.value === "SC"
    ) {
      setDropData(message);
      setDropVisible(true);
    } else {
      setDropData("");
      setDropVisible(false);
    }
    if (e.target.value === "TB") {
      setTemporaryfield(true);
      setRemarksField(false);
    } else if (e.target.value === "OT") {
      setTemporaryfield(true);
      setRemarksField(true);
    } else {
      setTemporaryfield(false);
      setRemarksField(false);
      setBlockDate("");
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage(false);
      setBtndisable(false);
    }
  }, [apiMessage]);
  const InputDisableFunction = () => {
    if (props.showAddBlockCard === "add") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <div className="p-4">
        <div className="col mb-2">
          <div className="d-flex justify-content-between col-9">
            <h1 className="text-bold block-card-title">
              {props.showAddBlockCard === "add"
                ? "SRF - Add Block Card Request "
                : "SRF - Edit Block Card Request "}
            </h1>
            <button
              className="block-card-back border-0"
              onClick={props.onCancel}
            >
              <IoArrowUndoOutline />
              Back
            </button>
          </div>
          <CustomLoader isLoading={isLoadingData} size={50} />
          {isLoadingData ? null : (
            <div className="col-9">
              {apiMessage && (
                <CustomResponseMessage
                  apiStatus={apiStatus}
                  closeMessage={() => closeMessage()}
                  message={addMessage}
                  errorFix={true}
                />
              )}
            </div>
          )}
        </div>
        <div className="col mb-2">
          <div className="d-flex justify-content-between col-9">
            <div className="block-card-body p-3">
              <div className="col d-flex p-1" style={{ position: "relative" }}>
                <div className="col-8 p-1">
                  <label className="block-card-label">Mobile Number</label>
                  {props.showAddBlockCard === "add" ? (
                    <div className="col-8 p-1 row">
                      <Input
                        className="border-1 block-card-inputCode form-select"
                        type="select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        disabled={InputDisableFunction()}
                      >
                        <option>+60</option>
                        <option>+65</option>
                        <option>+91</option>
                      </Input>
                      <Input
                        className="border-1 block-card-inputMobile form-control"
                        type="text"
                        value={blockCardRequest.primaryMobileNumber}
                        name="primaryMobileNumber"
                        onChange={handleChange}
                        readOnly={InputDisableFunction()}
                      />
                      <div>
                        <Button
                          className="btnVerify btn--sizer  border-0"
                          onClick={handleVerify}
                        >
                          Get Customer Details
                        </Button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {props.showAddBlockCard === "edit" ? (
                    <div className="col-8 p-1 row">
                      <Input
                        className="border-1 block-card-inputCode form-select"
                        type="select"
                        value={mobileCode}
                        disabled={InputDisableFunction()}
                      >
                        <option>+65</option>
                        <option>+91</option>
                      </Input>
                      <Input
                        className="border-1 block-card-inputMobile form-control"
                        type="text"
                        value={primaryMobileNumber}
                        name="primaryMobileNumber"
                        readOnly={InputDisableFunction()}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {errors.mobileNumError &&
                    errors?.mobileNumError !== "null" && (
                      <Label className="error-text-red">
                        {errors.mobileNumError}
                      </Label>
                    )}
                </div>
                {customerDetailsModel ? (
                  <div
                    className="addBlockCard-modal-content"
                    style={{ top: "175px", left: "70%" }}
                  >
                    <div className="addBlockCard-modal-title">
                      Confimation Message
                      <img
                        src={close}
                        alt="close"
                        onClick={() => {
                          setCountryCode("+60");
                          setBlockCardRequest({
                            approverId: "",
                            cardExpiryDate: "",
                            panLastFourdigits: "",
                            customerName: "",
                            inputOperatorId: "",
                            primaryMobileNumber: "",
                            requestChannel: "",
                            reasonStatus: "",
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
                            nationalityCodeDescription: "",
                            customerNumber: "",
                          });
                          setCustomerDetailsModel(false);
                          setConfirmData(false);
                        }}
                      />
                    </div>
                    <div className="model_hr"></div>
                    <div className="model_body">
                      <div className="cus_info_pop d-flex gap-3 mt-3">
                        Please verify if the following details match with our
                        records
                      </div>
                      <div className="col-3 p-1 popUp_img">
                        <label className="block-card-view-label d-flex justify-content-center">
                          Photo Image
                        </label>
                        <div className="pt-2 image_popup">
                          <img
                            alt="PhotoContent"
                            src={`https://dmbzkkf9wrum7.cloudfront.net/${customerDetails?.data?.photoContent}`}
                            className="col-12 SelfieUnblockImageADD"
                          />
                        </div>
                      </div>
                      <div className="d-flex gap-3 mt-3">
                        <div className="input_container">
                          <Label className="customer_details_pop">
                            Nationality
                          </Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              customerDetails?.data?.nationalityCodeDescription
                            }
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <Label className="customer_details_pop">
                            Mobile Number
                          </Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              customerDetails?.data?.customerWalletDto
                                ?.primaryMobileNumber
                            }
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <Label className="customer_details_pop">Name</Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              customerDetails?.data?.customerWalletDto
                                ?.customerName
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="d-flex gap-3 mt-3">
                        <div>
                          <Label className="customer_details_pop">
                            ID Number
                          </Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={customerDetails?.data?.customerNumber}
                            readOnly={true}
                          />
                        </div>
                        <div>
                          <Label className="customer_details_pop">
                            ID Type
                          </Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={customerDetails?.data?.idTypeCode}
                            readOnly={true}
                          />
                        </div>

                        <div>
                          <Label className="customer_details_pop">Card</Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              customerDetails?.data?.customerWalletDto?.cardUrn
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>

                      <div className="d-flex gap-3 mt-3">
                        <div>
                          <Label className="customer_details_pop">
                            Card Type
                          </Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              customerDetails?.data?.customerWalletDto?.cardType
                            }
                            readOnly={true}
                          />
                        </div>

                        <div>
                          <Label className="customer_details_pop">
                            Card Last 4 Digit
                          </Label>
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              customerDetails?.data?.customerWalletDto
                                ?.panLastFourdigits
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="flex-container">
                        <div
                          className="success_btn"
                          onClick={() => {
                            setConfirmData(true);
                            setCustomerDetailsModel(false);
                          }}
                        >
                          Yes
                        </div>

                        <button
                          className="btn_cancel"
                          onClick={() => {
                            setCountryCode("+60");
                            setBlockCardRequest({
                              approverId: "",
                              cardExpiryDate: "",
                              panLastFourdigits: "",
                              customerName: "",
                              inputOperatorId: "",
                              primaryMobileNumber: "",
                              requestChannel: "",
                              reasonStatus: "",
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
                              nationalityCodeDescription: "",
                              customerNumber: "",
                            });
                            setCustomerDetailsModel(false);
                            setConfirmData(false);
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {/* {checkedprimaryMobileNumber && (
                <div className="col-12 block-card-formColorForm p-2 row">
                  <span className="container-body-label-color">
                    {" "}
                    No wallet found for the mobile number. Please check and
                    Re-enter{" "}
                  </span>{" "}
                </div>
              )} */}
              <CustomLoader isLoading={isLoading} size={50} />
              {isLoading
                ? null
                : !checkedprimaryMobileNumber && (
                    <div className="col-12 block-card-formColor p-2 row">
                      <div className="col-3 p-2">
                        <label className="block-card-label">
                          Customer Name
                        </label>
                        <div className="col-8 pt-1">
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              props.showAddBlockCard === "add" && confirmData
                                ? customerDetails?.data?.customerName
                                : blockCardRequest.customerName
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-2 p-2">
                        <label className="block-card-label">Pan Number</label>
                        <div className="col-8 pt-1">
                          <Input
                            className="border-1 block-card-inputTypeForm form-control"
                            type="text"
                            value={
                              props.showAddBlockCard === "add" && confirmData
                                ? customerDetails?.data?.customerWalletDto
                                    ?.panLastFourdigits
                                : blockCardRequest.panLastFourdigits
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                      <div className="col-4 p-2">
                        <label className="block-card-label">
                          Card Expiry Date
                        </label>
                        <div className="col-8 pt-1">
                          <Input
                            className="border-1 block-card-inputType form-control"
                            type="text"
                            value={
                              props.showAddBlockCard === "add" && confirmData
                                ? modifiedCustomerDetails
                                : blockCardRequest.cardExpiryDate
                            }
                            readOnly={true}
                          />
                        </div>
                      </div>
                    </div>
                  )}

              <div className="container-fluid row p-1 col-12">
                <div className="col-6">
                  <label className="block-card-label p-1">ID Number</label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 block-card-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={
                        props.showAddBlockCard === "add" && confirmData
                          ? customerDetails?.data?.customerNumber
                          : blockCardRequest.customerNumber
                      }
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="block-card-label p-1">ID Type</label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 block-card-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={
                        props.showAddBlockCard === "add" && confirmData
                          ? customerDetails?.data?.idTypeCode
                          : blockCardRequest.idTypeCode
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="container-fluid row p-1">
                <div className="col-6">
                  <label className="block-card-label p-1">Nationality</label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 block-card-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={
                        props.showAddBlockCard === "add" && confirmData
                          ? customerDetails?.data?.nationalityCodeDescription
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="block-card-label p-1">Wallet type</label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 block-card-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={
                        confirmData
                          ? customerDetails?.data?.customerWalletDto?.walletType
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
              {customerDetails?.data?.photoContent && confirmData ? (
                <div className="container-fluid row p-1">
                  <div className="col-6">
                    <label className="block-card-label p-1">Selfie Image</label>
                    <div className="col-12 pt-2">
                      {newSign !==
                        "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                        <img
                          alt="Signature"
                          src={newSign}
                          className="col-12 selfieImage"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="col d-flex p-2">
                <div className="col-8 pt-1">
                  <label className="block-card-label">Reason Code</label>
                  <div className="col-8 p-1 row">
                    <Input
                      className="border-1 block-card-inputMobile form-select"
                      type="select"
                      value={code}
                      onChange={handleChangeCode}
                    >
                      <option>Select Reason Code</option>
                      <option value="FR">Fraud</option>
                      <option value="LC">Lost Card</option>
                      <option value="SC">Stolen Card</option>
                      <option value="TB">Temporary Block</option>
                      <option value="OT">Others</option>
                    </Input>
                  </div>
                  {temporaryfield && (
                    <div className="col-6 pt-1">
                      <label className="block-card-label">
                        Block Expiry Date
                      </label>
                      <div className="col-8 p-1 row">
                        <Input
                          className="border-1 block-card-inputReason form-control"
                          type="date"
                          value={blockDate}
                          min={moment().add(1, "days").format("YYYY-MM-DD")}
                          onChange={(e) => setBlockDate(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {remarksField && (
                    <div className="col-6 pt-1">
                      <label className="block-card-label">
                        Customer Remarks
                      </label>
                      <div className="col-12 p-1 row">
                        <Input
                          className="border-1 block-card-inputReason form-control"
                          type="text"
                          value={remarks}
                          onChange={(e) => setRemarks(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {remarkError.remarkError &&
                    remarkError.remarkError !== "null" && (
                      <Label className="error-text-red">
                        {remarkError.remarkError}
                      </Label>
                    )}
                </div>
              </div>
              {toggleData && toggleVisible && (
                <div className="col-12 pt-1">
                  <div className="textFieldColor p-2">{toggleData}</div>
                </div>
              )}
              {dropData && dropVisible && (
                <div className="col-12 pt-1">
                  <div className="textFieldColor p-2">{dropData}</div>
                </div>
              )}

              <div className="col-6 pt-2">
                <button
                  className={
                    btndisable
                      ? "disablebutton border-0 text-white"
                      : "SubmitCancelButton-save border-0 text-white"
                  }
                  onClick={toggleYes}
                  disabled={btndisable}
                >
                  Submit
                </button>
                <button
                  className="SubmitCancelButton-cancel border-0 ms-3"
                  onClick={props.onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlockCardRequest;
