import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { IoArrowUndoOutline } from "react-icons/io5";
import "./AddCardUpgrade.scss";
import { customValidator } from "../../Constants/Validation";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomLoader from "../Loader/CustomLoader";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { Select } from "antd";
import {
  getCustomerdetailMobile,
  getMobileNumberUpgrade,
  getUpgradeToggleIDList,
  getVerifyDetail,
  resetVerifyDetail,
} from "../../redux/action/CardUpgradeAction";
import { MdFileUpload } from "react-icons/md";
import {
  getIdtypeByCountry,
  uploadSelfieFile,
} from "../../redux/action/CardUnBlockAction";
import { validate } from "validate.js";

const AddCardUpgrade = (props: any) => {
  const [toggleData, setToggleData] = useState("");
  const [toggleVisible, setToggleVisible] = useState(false);
  const [cardUpgrade, setCardUpgrade] = useState({
    cardExpiryDate: "",
    panLastFourdigits: "",
    customerName: "",
    primaryMobileNumber: "",
    reasonStatus: "",
    customerId: "",
    idTypeCode: "",
    idValue: "",
    nationalityCodeDescription: "",
    cardUrn: "",
    reasonStatusCode: "",
    blockDate: "",
    remarks: "",
    existingWalletLevel: "",
    eligibleWalletLevel: "",
    cardL4d: "",
    cardExpirydate: "",
    requestedWalletName: "",
    existingWalletName: "",
    isDocOriginal: "",
    reqIdTypeCode: "",
    reqIdTypeCodeDescription: "",
    reqIdExpiryDate: "",
    walletType: "",
    immigrationVisaExpiryDate: "",
    prStatus: "",
    visaNumber: "",
    isOriginalAllowed: "",
    accountName: "",
    issueDate: "",
    idtypeExpiryDate: "",
    idtypeIssueDate: "",
    cardworksIdtypeMapping: "",
    fieldValidation: "",
    fieldValidationDescription: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    mobileNumError: "",
    idDocTypeError: "",
    idDocNumberError: "",
  });
  const [mobileError, setMobileError] = useState({ mobileNumError: "" });
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("+60");
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [btndisable, setBtndisable] = useState(false);
  const [addMessage, setAddMessage] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [message, setMessage] = useState(false);
  const [frontImg, setFrontImg] = useState("");
  const [backImg, setBackImg] = useState("");
  const [frontFileSelected, setFrontFileSelected] = useState<File>();
  const [backFileSelected, setBackFileSelected] = useState<File>();
  const [selfieFileSelected, setSelfieFileSelected] = useState<File>();
  const [errorSize, setErrorSize] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [preview, setPreview] = useState("");
  const [previewBack, setPreviewBack] = useState("");
  const [previewSelfie, setPreviewSelfie] = useState("");
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState();
  const [contentSelfieCode, setContentSelfieCode] = useState("");
  const [contentFrontCode, setContentFrontCode] = useState("");
  const [contentBackCode, setContentBackCode] = useState("");
  const [error, setError] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [selectedWallet, SetSelectedWallet] = useState({
    accountTypeCode: "",
    accountName: "",
    walletLevel: "",
  });
  const [issue, setIssue] = useState(false);
  const [issueDate, setIssueDate] = useState(false);

  let walletDetails = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer?.customerDetailResponse
  );

  let getMobileVerifyRes = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.getMobilenoVerifyResponse
  );

  let mobileCustomerdetail = useSelector(
    (state: RootStateOrAny) =>
      state.CardUpgradeReducer?.getCustomerDetailsResponse
  );

  let toggleResponse = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer?.getToggleresponse
  );

  const getIdtype = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.idTypeResponse
  );

  const errorCardResp = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer
  );

  const getVerifyNumber = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer?.getVerfiyDetailResponse
  );

  const fetchIdTypeByCountry = useCallback(
    (id: any) => {
      try {
        dispatch(getIdtypeByCountry(id));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchResetResponse = useCallback(() => {
    try {
      dispatch(resetVerifyDetail());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchResetResponse();
  }, [fetchResetResponse]);

  const fetchVerifyDetails = useCallback(
    (mobileNumber: any) => {
      try {
        dispatch(getVerifyDetail(mobileNumber));
      } catch (err) {}
    },
    [dispatch]
  );

 

  useEffect(() => {
    if (
      getVerifyNumber &&
      getVerifyNumber.error &&
      getVerifyNumber.error.length !== 0
    ) {
      setIsLoading(false);
      setApiStatus(false);
      setAddMessage(getVerifyNumber?.message);
      setApiMessage(true);
    } else if (getVerifyNumber?.error) {
      setApiStatus(false);
      setIsLoading(false);
      setAddMessage(getVerifyNumber?.message);
      setBtndisable(true);
      setApiMessage(true);
    }
  }, [getVerifyNumber]);

  const fetchToggeleResponse = useCallback(() => {
    try {
      dispatch(getUpgradeToggleIDList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (toggleResponse?.data) {
      const tempToggle = toggleResponse?.data?.filter(
        (each: any) => each.toggleId === "3005" && !each.enabled
      );
      if (tempToggle !== undefined) {
        const msg = tempToggle[0]?.statusMessage;
        setToggleData(msg);
        setToggleVisible(true);
      }
    }
  }, [toggleResponse?.data]);

  useEffect(() => {
    setFrontImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${getMobileVerifyRes?.data?.frontDocumentContent}`
    );
    setBackImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${getMobileVerifyRes?.data?.backDocumentContent}`
    );
  }, [getMobileVerifyRes]);

  const fetchCustomerCardUpGradeDetails = useCallback(
    (body: any) => {
      try {
        dispatch(getCustomerdetailMobile(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchVerifyMobilenumberRes = useCallback(
    (body: any) => {
      try {
        dispatch(getMobileNumberUpgrade(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (props.isLoadingData === true) {
      setIsLoadingData(true);
      setAddMessage("");
    } else if (props.message) {
      setIsLoadingData(false);
      setApiMessage(true);
      setAddMessage(props.message);
      setApiStatus(false);
    }
  }, [props.isLoadingData]);
  useEffect(() => {
    if (props.isLoadingData === true) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
  }, [props.isLoadingData]);

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

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage(false);
      setBtndisable(false);
      setToggleVisible(false);
    }
  }, [apiMessage]);

  useEffect(() => {
    if (walletDetails?.data) {
      setIsLoading(false);
      setAddMessage("");
      setCardUpgrade({
        ...cardUpgrade,
        requestedWalletName: walletDetails?.data?.requestedWalletName || "",
        existingWalletName: walletDetails?.data?.existingWalletName || "",
      });
    } else if (walletDetails?.error) {
      setApiStatus(false);
      setIsLoading(false);
      setAddMessage(walletDetails?.message);
      setBtndisable(true);
      setApiMessage(true);
    }
  }, [walletDetails]);

  useEffect(() => {
    if (mobileCustomerdetail?.data) {
      setIsLoading(false);
      setAddMessage("");
      setCardUpgrade({
        ...cardUpgrade,
        customerName:
          mobileCustomerdetail?.data?.customerWalletDto?.customerName || "",
        panLastFourdigits:
          mobileCustomerdetail?.data?.customerWalletDto?.panLastFourdigits ||
          "",
        cardExpiryDate:
          mobileCustomerdetail?.data?.customerWalletDto?.cardExpiryDate || "",
      });
      fetchIdTypeByCountry(mobileCustomerdetail?.data?.nationalityCode);
    } else if (mobileCustomerdetail?.error) {
      setApiStatus(false);
      setIsLoading(false);
      setAddMessage(mobileCustomerdetail?.message);
      setApiMessage(true);
    }
  }, [mobileCustomerdetail]);
  useEffect(() => {
    if (cardUpgrade.primaryMobileNumber === "") {
      setCardUpgrade({
        cardExpiryDate: "",
        panLastFourdigits: "",
        customerName: "",
        primaryMobileNumber: "",
        reasonStatus: "",
        customerId: "",
        idTypeCode: "",
        idValue: "",
        nationalityCodeDescription: "",
        cardUrn: "",
        reasonStatusCode: "",
        blockDate: "",
        remarks: "",
        existingWalletLevel: "",
        eligibleWalletLevel: "",
        cardL4d: "",
        cardExpirydate: "",
        requestedWalletName: "",
        existingWalletName: "",
        isDocOriginal: "",
        reqIdTypeCode: "",
        reqIdTypeCodeDescription: "",
        isOriginalAllowed: "",
        reqIdExpiryDate: "",
        walletType: "",
        immigrationVisaExpiryDate: "",
        prStatus: "",
        visaNumber: "",
        accountName: "",
        issueDate: "",
        idtypeExpiryDate: "",
        idtypeIssueDate: "",
        cardworksIdtypeMapping: "",
        fieldValidation: "",
        fieldValidationDescription: "",
      });
    }
  }, []);

  const validateField = () => {
    setMessage(false);
    let checkMobileNumError = customValidator(
      "primaryMobileNumber",
      "Mobile Number",
      cardUpgrade.primaryMobileNumber
    );

    let idDocTypeErrors = customValidator(
      "idTypeCode",
      "Id Doc Type",
      cardUpgrade.idTypeCode
    );
    let idDocNumberErrors = customValidator(
      "idValue",
      "Id Doc Number",
      cardUpgrade.idValue
    );

    if (
      !(
        checkMobileNumError === "null" &&
        idDocTypeErrors === "null" &&
        idDocNumberErrors === "null"
      )
    ) {
      setErrors({
        mobileNumError: checkMobileNumError,
        idDocTypeError: idDocTypeErrors,
        idDocNumberError: idDocNumberErrors,
      });
      return false;
    }
    setErrors({
      mobileNumError: "",
      idDocTypeError: "",
      idDocNumberError: "",
    });
    return true;
  };

  const submitHandler = () => {
    if (validateField()) {
      if (customTypeValidator()) {
        if (contentSelfieCode !== "") {
          setErrorSubmit(false);
          var body = {
            primaryMobileNumber: countryCode + cardUpgrade.primaryMobileNumber,
            reqWalletResponse: selectedWallet,
            srfIdTypeCode: cardUpgrade.idTypeCode,
            srfIdTypeCodeDescription: cardUpgrade.reqIdTypeCodeDescription,
            srfIdValue: cardUpgrade.idValue,
            srfCardworksIdtypeMapping: cardUpgrade.cardworksIdtypeMapping,
            srfNewIdDate: cardUpgrade.idtypeIssueDate,
            srfNewIdExpiryDate: cardUpgrade.idtypeExpiryDate,
            srfFrontDocumentContent: contentFrontCode,
            srfBackDocumentContent: contentBackCode,
            srfPhotoContent: contentSelfieCode,
            srfPrStatus: cardUpgrade.prStatus,
            srfVisaValue: cardUpgrade.visaNumber,
            srfImmigrationVisaExpiryDate: cardUpgrade.immigrationVisaExpiryDate,
            walletResponse: walletDetails?.data,
            srfCustomerSignatureFile: "",
            srfIsDocumentOriginal: cardUpgrade.isDocOriginal,
          };
          props.submitHandler(body);
        } else {
          setErrorSubmit(true);
        }
      }
    }
  };
  const handleChange = (e: any) => {
    setCardUpgrade({
      ...cardUpgrade,
      [e.target.name]: e.target.value,
    });
  };

  const validateMobileNumber = () => {
    setBtndisable(false);
    setMessage(true);
    let checkMobileNumError = customValidator(
      "primaryMobileNumber",
      "Mobile Number",
      cardUpgrade.primaryMobileNumber
    );
    if (checkMobileNumError !== "null") {
      setMobileError({
        mobileNumError: checkMobileNumError,
      });
      return false;
    } else {
      setMobileError({
        mobileNumError: "",
      });
      return true;
    }
  };

  useEffect(() => {
    if (errors.mobileNumError) {
      setMessage(false);
    }
  }, [errors.mobileNumError]);
  let MobileNumber = countryCode + cardUpgrade.primaryMobileNumber;

  const handleVerify = () => {
    if (validateMobileNumber()) {
      setIsLoading(true);
      var body = JSON.stringify({
        primaryMobileNumber: MobileNumber,
      });
      fetchVerifyMobilenumberRes(body);
      fetchToggeleResponse();
      fetchVerifyDetails(body);
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const handleChangeType = (e: any) => {
    let obj = JSON.parse(e);
    setCardUpgrade({
      ...cardUpgrade,
      idTypeCode: obj.idtypeCode,
      reqIdTypeCode: obj.idtypeCode,
      reqIdTypeCodeDescription: obj.idtypeCodeDescription,
      cardworksIdtypeMapping: obj.cardworksCodeMapping,
      fieldValidation: obj.fieldValidation,
      fieldValidationDescription: obj.fieldValidationDescription,
    });
    if (obj.isExpiryDateMandatory === true) {
      setIssue(true);
    } else {
      setIssue(false);
    }
    if (obj.isIssueDateMandatory === true) {
      setIssueDate(true);
    } else {
      setIssueDate(false);
    }
  };

  useEffect(() => {
    if (cardUpgrade.isDocOriginal !== "") {
      var data = JSON.stringify({
        reqIdTypeCode: cardUpgrade.idTypeCode,
        reqIdTypeCodeDescription: cardUpgrade.reqIdTypeCodeDescription,
        reqIdExpiryDate: cardUpgrade.idtypeExpiryDate,
        isDocOriginal: cardUpgrade.isDocOriginal,
        walletType: mobileCustomerdetail?.data?.customerWalletDto?.walletType,
        existingWalletLevel:
          mobileCustomerdetail?.data?.customerWalletDto?.accountType,
      });
      fetchCustomerCardUpGradeDetails(data);
    }
  }, [cardUpgrade.isDocOriginal]);

  const handleChangeWallet = (e: any) => {
    let obj = JSON.parse(e);
    setCardUpgrade({ ...cardUpgrade, ["accountName"]: obj.accountName });
    SetSelectedWallet({
      ...selectedWallet,
      ["accountTypeCode"]: obj.accountTypeCode,
      ["accountName"]: obj.accountName,
      ["walletLevel"]: obj.walletLevel,
    });
  };
  let modifiedDateDetails = mobileCustomerdetail?.data?.customerWalletDto
    ?.cardExpiryDate
    ? mobileCustomerdetail?.data?.customerWalletDto?.cardExpiryDate?.slice(
        0,
        2
      ) +
      "/" +
      mobileCustomerdetail?.data?.customerWalletDto?.cardExpiryDate?.slice(2)
    : "";

  const postSelfieDocUploadRes = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.docSelfieUploadResponse
  );

  const postSelfieDocUpload = useCallback(
    (value: any) => {
      try {
        dispatch(uploadSelfieFile(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (postSelfieDocUploadRes?.data) {
      if (
        selfieFileSelected !== undefined &&
        backFileSelected === undefined &&
        frontFileSelected === undefined
      ) {
        setContentSelfieCode(postSelfieDocUploadRes?.data[0].contentCode);
      } else if (
        selfieFileSelected !== undefined &&
        backFileSelected !== undefined &&
        frontFileSelected === undefined
      ) {
        setContentBackCode(postSelfieDocUploadRes?.data[0].contentCode);
        setContentSelfieCode(postSelfieDocUploadRes?.data[1].contentCode);
      } else if (
        selfieFileSelected !== undefined &&
        backFileSelected === undefined &&
        frontFileSelected !== undefined
      ) {
        setContentFrontCode(postSelfieDocUploadRes?.data[0].contentCode);
        setContentSelfieCode(postSelfieDocUploadRes?.data[1].contentCode);
      } else if (
        selfieFileSelected !== undefined &&
        backFileSelected !== undefined &&
        frontFileSelected !== undefined
      ) {
        setContentBackCode(postSelfieDocUploadRes?.data[0].contentCode);
        setContentFrontCode(postSelfieDocUploadRes?.data[1].contentCode);
        setContentSelfieCode(postSelfieDocUploadRes?.data[2].contentCode);
      }
    } else if (postSelfieDocUploadRes?.error) {
      setApiMessage(postSelfieDocUploadRes?.error);
      setIsLoading(false);
    }
  }, [postSelfieDocUploadRes]);

  const frontfileSelect = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFrontFileSelected(fileList[0]);
    setPreview(URL.createObjectURL(fileList[0]));
    setIsError(false);
    setErrorSize("");
    setErrorMsg(false);
  };

  const validateImage = () => {
    if (selfieFileSelected === undefined) {
      setError(true);
    } else if (selfieFileSelected !== undefined) {
      setError(false);
    }
    return true;
  };
  const validateDoc = () => {
    if (frontFileSelected === undefined || backFileSelected === undefined) {
      setError(true);
    } else if (
      frontFileSelected !== undefined ||
      backFileSelected !== undefined
    ) {
      setError(false);
    }
    return true;
  };

  const dataValue: any = new FormData();
  dataValue.append("idBackDocumentFile", backFileSelected);
  dataValue.append("idFrontDocumentFile", frontFileSelected);
  dataValue.append("photoContentFile", selfieFileSelected);

  const customTypeValidator = () => {
    let object: any = {};
    let dynamicRegex = "";
    if (cardUpgrade.fieldValidation === "^[A-Z0-9]") {
      dynamicRegex = `${cardUpgrade.fieldValidation}+$`;
    } else {
      dynamicRegex = cardUpgrade.fieldValidation;
    }
    let constraints_new: any = {
      value: {
        presence: {
          allowEmpty: false,
          message: "^  can't be empty",
        },
        format: {
          pattern: dynamicRegex,
          message: "^error",
        },
      },
    };
    let constraint = constraints_new["value"];
    object["value"] = cardUpgrade.idValue;
    const result = validate(object, { value: constraint });
    if (result) {
      setErrors({
        mobileNumError: "",
        idDocTypeError: "",
        idDocNumberError: cardUpgrade.fieldValidationDescription,
      });
      return false;
    }
    return true;
  };
  const handleSelfieSave = () => {
    setErrorSubmit(false);
    if (validateImage() && validateDoc()) {
      if (
        selfieFileSelected !== undefined &&
        (frontFileSelected !== undefined || backFileSelected !== undefined)
      ) {
        postSelfieDocUpload(dataValue);
        setError(false);
      }
    }
  };
  const backfileSelect = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setBackFileSelected(fileList[0]);
    setPreviewBack(URL.createObjectURL(fileList[0]));
    setIsError(false);
    setErrorSize("");
    setErrorMsg(false);
  };
  const selfiefileSelect = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setSelfieFileSelected(fileList[0]);
    setPreviewSelfie(URL.createObjectURL(fileList[0]));
    setIsError(false);
    setErrorSize("");
    setErrorMsg(false);
  };

  const buttonHandler = (e: any) => {
    setCardUpgrade({
      ...cardUpgrade,
      ["isDocOriginal"]: e,
    });
  };

  const d = new Date();
  let date = Number(d.getDate() + 2);
  let month = Number(d.getMonth());
  let year = Number(d.getFullYear());
  let tomorrow = new Date(year, month, date);


  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold card-Upgrade-title">
            {props.showAddUnBlockCard === "add" && "SRF - Card Upgrade"}
          </h1>
          <button
            className="card-Upgrade-back border-0"
            onClick={props.onCancel}
          >
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <CustomLoader isLoading={isLoadingData} size={50} />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="col-12">
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
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="card-Upgrade-body p-3">
            <div className="col d-flex p-1">
              <div className="col-8 p-1">
                <label className="card-Upgrade-label">Mobile Number</label>
                <div className="col-8 p-1 row">
                  <Input
                    className="border-1 card-Upgrade-inputCode form-select"
                    type="select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option>+60</option>
                    <option>+65</option>
                    <option>+91</option>
                  </Input>
                  <Input
                    className="border-1 card-Upgrade-inputMobile form-control"
                    type="text"
                    value={cardUpgrade.primaryMobileNumber}
                    name="primaryMobileNumber"
                    onChange={handleChange}
                  />
                  <div>
                    <div
                      className="Btn--block btn btn-danger"
                      onClick={handleVerify}
                    >
                      Get Customer details
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {errors.mobileNumError && errors?.mobileNumError !== "null" && (
              <Label className="errors">{errors.mobileNumError}</Label>
            )}
            {message &&
              mobileError.mobileNumError &&
              mobileError.mobileNumError !== "null" && (
                <p className="errors">{mobileError.mobileNumError}</p>
              )}
            <div className="col-7 card-Upgrade-formColor p-2 row">
              <div className="col-5 p-2">
                <label className="card-Upgrade-label card-Upgrade-textLeft">
                  Customer Name
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-Upgrade-inputType form-control"
                    type="text"
                    value={cardUpgrade.customerName}
                    readOnly={true}
                    name="customerName"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-4 p-2">
                <label className="card-Upgrade-label card-Upgrade-textLeft">
                  Pan Number
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-Upgrade-inputType form-control"
                    type="text"
                    value={cardUpgrade.panLastFourdigits}
                    readOnly={true}
                    name="panLastFourdigits"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-3 p-2">
                <label className="card-Upgrade-label card-Upgrade-textLeft">
                  Card Expiry Date
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 card-Upgrade-inputType form-control"
                    type="text"
                    value={modifiedDateDetails}
                    readOnly={true}
                    name="cardExpiryDate"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-12 p-1 pt-3">
                <div className="col pt-3 d-flex">
                  <div className="col-2 p-1">
                    <label className="card-Upgrade-label">ID Doc Type</label>
                    <div className="col-12 p-1 row">
                      <Select
                        onChange={handleChangeType}
                        showSearch
                        filterOption={(input: any, option: any) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        id="fieldName1"
                        className="form-select card-Upgrade-placeholder border-0"
                        value={cardUpgrade.idTypeCode}
                        disabled={false}
                        placeholder={"Select ID Type"}
                      >
                        {getIdtype?.data &&
                          getIdtype?.data?.map((option: any, index: any) => {
                            return (
                              <Option
                                key={index}
                                value={JSON.stringify(option)}
                              >
                                {option.idtypeCode}
                              </Option>
                            );
                          })}
                      </Select>
                    </div>

                    {errors.idDocTypeError &&
                      errors.idDocTypeError !== "null" && (
                        <p className="errors pt-2">{errors.idDocTypeError}</p>
                      )}
                  </div>
                  <div className="col-2 p-1">
                    <label className="card-Upgrade-label">ID Doc Number</label>
                    <div className="col-12 p-1 row">
                      <Input
                        className="border-1 card-Upgrade-inputReason form-control"
                        type="text"
                        name="idValue"
                        onChange={handleChange}
                        value={cardUpgrade.idValue}
                      ></Input>
                    </div>

                    {errors.idDocNumberError &&
                      errors.idDocNumberError !== "null" && (
                        <p className="errors p-1">{errors.idDocNumberError}</p>
                      )}
                  </div>
                  {issueDate === true ? (
                    <div className="col-2 walletChange mt-1">
                      <label className="card-Upgrade-label">Issue Date</label>
                      <div className="col-12 p-1 row">
                        <Input
                          className="border-1 card-Upgrade-inputReason form-control"
                          type="date"
                          name="idtypeIssueDate"
                          onChange={handleChange}
                          value={cardUpgrade.idtypeIssueDate}
                          max={new Date().toISOString().slice(0, 10)}
                        ></Input>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {issue === true ? (
                    <div className="col-2 walletChange mt-1">
                      <label className="card-Upgrade-label">Expiry Date</label>
                      <div className="col-12 p-1 row">
                        <Input
                          className="border-1 card-Upgrade-inputReason form-control"
                          type="date"
                          name="idtypeExpiryDate"
                          onChange={handleChange}
                          value={cardUpgrade.idtypeExpiryDate}
                          min={tomorrow.toISOString().slice(0, 10)}
                        ></Input>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-2 p-1">
                    <label className="card-Upgrade-label">
                      Is Doc Original
                    </label>
                    <div className="col-12 p-1 row">
                      <Input
                        type="select"
                        name="isDocOriginal"
                        className="card-Upgrade-inputReason"
                        value={cardUpgrade.isDocOriginal}
                        onChange={handleChange}
                      >
                        <option value="">Select Is Doc Original</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-12 row p-1 pt-3">
                {cardUpgrade.idTypeCode === "Passport" && (
                  <>
                    <div className="col-2 p-1">
                      <label className="card-Upgrade-label">PR Status</label>
                      <Input
                        type="select"
                        name="prStatus"
                        className="card-Upgrade-inputReason pt-2"
                        value={cardUpgrade.prStatus}
                        onChange={handleChange}
                      >
                        <option value="">Select Pr Status</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </Input>
                    </div>
                    <div className="col-2 p-1">
                      <label className="card-Upgrade-label">Visa Number</label>
                      <Input
                        type="text"
                        name="visaNumber"
                        className="card-Upgrade-inputReason pt-2"
                        onChange={handleChange}
                        value={cardUpgrade.visaNumber}
                      ></Input>
                      {cardUpgrade.idTypeCode === "Passport" &&
                        cardUpgrade.prStatus === "Y" &&
                        cardUpgrade.visaNumber === "" && (
                          <p
                            style={{
                              color: "crimson",
                              display: `${isError ? "block" : "none"}`,
                            }}
                          >
                            VisaNumber Can't be Empty
                          </p>
                        )}
                    </div>
                    <div className="col-2 passportWidth p-1">
                      <label className="card-Upgrade-label ps-1">
                        Immigration VisaExpiryDate
                      </label>
                      <Input
                        type="date"
                        name="immigrationVisaExpiryDate"
                        className="card-Upgrade-inputReason pt-2"
                        onChange={handleChange}
                        value={cardUpgrade.immigrationVisaExpiryDate}
                        min={tomorrow.toISOString().slice(0, 10)}
                      ></Input>
                      {cardUpgrade.idTypeCode === "Passport" &&
                        cardUpgrade.prStatus === "Y" &&
                        cardUpgrade.immigrationVisaExpiryDate === "" && (
                          <p
                            style={{
                              color: "crimson",
                              display: `${isError ? "block" : "none"}`,
                            }}
                          >
                            Immigration VisaExpiryDate Can't be Empty
                          </p>
                        )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-4">
                {frontFileSelected === undefined && (
                  <label className="card-Upgrade-label p-1">
                    {" "}
                    ID Doc Front
                  </label>
                )}
                {frontFileSelected !== undefined && (
                  <img
                    className="cus-img-view-point bg-light"
                    src={preview}
                    alt=""
                  />
                )}
                <div className="frontEyeCard eyeiconleftCard mt-3">
                  <Label>
                    <MdFileUpload type="file"></MdFileUpload>
                    <Input
                      style={{ display: "none" }}
                      type="file"
                      className="frontEyeCard"
                      onChange={frontfileSelect}
                    ></Input>
                    <span className="cursor-pointer">Upload</span>
                  </Label>
                </div>
                <Label>{frontFileSelected?.name}</Label>
              </div>
              <div className="col-4">
                {backFileSelected === undefined && (
                  <label className="card-Upgrade-label p-1"> ID Doc Back</label>
                )}
                {backFileSelected !== undefined && (
                  <img
                    className="cus-img-view-point bg-light"
                    src={previewBack}
                    alt=""
                  />
                )}
                <div className="frontEyeCard eyeiconleftCard mt-3">
                  <Label>
                    <MdFileUpload type="file"></MdFileUpload>
                    <Input
                      style={{ display: "none" }}
                      type="file"
                      className="frontEyeCard"
                      onChange={backfileSelect}
                    ></Input>
                    <span className="cursor-pointer">Upload</span>
                  </Label>
                </div>
                <Label>{backFileSelected?.name}</Label>
              </div>
              <div className="col-4">
                {selfieFileSelected === undefined && (
                  <label className="card-Upgrade-label p-1"> Selfie</label>
                )}
                {selfieFileSelected !== undefined && (
                  <img
                    className="cus-img-view-point bg-light"
                    src={previewSelfie}
                    alt=""
                  />
                )}
                <div className="frontEyeCard eyeiconleftCard mt-3">
                  <Label>
                    <MdFileUpload type="file"></MdFileUpload>
                    <Input
                      style={{ display: "none" }}
                      type="file"
                      className="frontEyeCard"
                      onChange={selfiefileSelect}
                    ></Input>
                    <span className="cursor-pointer">Upload</span>
                  </Label>
                </div>
                <Label>{selfieFileSelected?.name}</Label>
              </div>
            </div>
            <div className="col-12 row errorMsg d-flex pt-3">
              <div className="col-4">
                {error === true && (
                  <span className="container-body-label-color">
                    ID Front or Back Doc Image Should be mandatory
                  </span>
                )}
              </div>
              <div className="col-4">
                {errorSubmit === true && (
                  <span className="container-body-label-color">
                    Please Save and Submit
                  </span>
                )}
              </div>
              <div className="col-4">
                {error === true && (
                  <span className="container-body-label-color">
                    Selfie Image Should be mandatory
                  </span>
                )}
              </div>
            </div>
            <div className="col d-flex pt-3">
              <div className="col-3 text-center"></div>
              <div className="col-1"></div>
              <div className="col-3 savePosition">
                <div
                  style={{ color: "#fff" }}
                  className="Btn--block btn btn-danger"
                  onClick={handleSelfieSave}
                >
                  Save
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-3 text-center"></div>
            </div>
            <div className="col-12 row docArrange pt-4">
              <div className="col-2 walletChange p-1">
                <label className="card-Upgrade-label">Wallet Name</label>
                <div className="col-12 p-1 row">
                  <Select
                    onChange={handleChangeWallet}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="form-select card-Upgrade-placeholder border-0"
                    value={cardUpgrade.accountName}
                    disabled={false}
                    placeholder={"Select Wallet"}
                  >
                    {walletDetails?.data &&
                      walletDetails?.data?.map((option: any, index: any) => {
                        return (
                          <Option key={index} value={JSON.stringify(option)}>
                            {option.accountName}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
              </div>
            </div>
            {toggleData && toggleVisible && (
              <div className="col-12 pt-1">
                <div className="textFieldColor p-2">{toggleData}</div>
              </div>
            )}
            <div className="col d-flex p-1"></div>
            <div className="col-6 pt-4 p-1">
              <button
                className={`${
                  btndisable
                    ? "disablebutton border-0 text-white"
                    : "SubmitCancelButton-save border-0 text-white"
                }`}
                onClick={submitHandler}
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
  );
};
export default AddCardUpgrade;
