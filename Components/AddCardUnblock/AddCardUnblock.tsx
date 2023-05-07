import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { IoArrowUndoOutline } from "react-icons/io5";
import "./AddCardUnblock.scss";
import close from "../../assets/close.svg";
import {
  getIdtypeByCountry,
  getMobileNumberUnblock,
  resetAddDatas,
  uploadSelfieFile,
} from "../../redux/action/CardUnBlockAction";
import { getCustomerunblockdetailMob } from "../../redux/action/BlockCardRequestAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { Select } from "antd";
import { getIdtypeReferenceData } from "../../redux/action/idTypeRoutingActions";
import CustomLoader from "../Loader/CustomLoader";
import cameraviewfinder from "../../assets/cameraviewfinder.png";
import { createTrue } from "typescript";

const AddCardUnblock = (props: any) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    mobileNumberErrorvalidate: "",
    idDocTypeError: "",
    idDocNumberError: "",
  });
  const [mobileError, setMobileError] = useState({
    mobileNumberErrorvalidate: "",
  });
  const [apiMessage, setApiMessage] = useState(false);
  const [confirmData, setConfirmData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [addError, setAddError] = useState(false);
  const [btndisable, setBtndisable] = useState(false);
  const [CountryCode, setCountryCode] = useState("+60");

  const [cardUnblock, setCardUnblock] = useState({
    approverId: "",
    inputOperatorId: "",
    mobileNo: "",
    requestChannel: "",
    requestReasoncode: "",
    requeststatus: "",
    idDocType: "",
    idDocNumber: "",
    customerName: "",
    cardL4d: "",
    cardExpirydate: "",
    frontDoc: "",
    Nationality: "",
    MobileNumber: "",
    name: "",
    IDType: "",
    IDNumber: "",
    card: "",
    cardtype: "",
    last4digit: "",
    photoContent: "",
  });

  const { Option } = Select;
  const inputFile = useRef<any>();
  const inputSelfie = useRef<any>();
  const inputBack = useRef<any>();
  const [img] = useState(cameraviewfinder);
  const [image, setImage] = useState(true);
  const [backImage, setBackImage] = useState(true);
  const [selfie, setSelfie] = useState(true);
  const [uploadImage, setUploadImage] = useState("");
  const [uploadBackImage, setUploadBackImage] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [uploadBackImg, setUploadBackImg] = useState("");
  const [selfieImage, setSelfieImage] = useState("");
  const [selfieImg, setSelfieImg] = useState("");
  const [selfieFile, setSelfieFile] = useState<File>();
  const [docText, setDocText] = useState("");
  const [backText, setBackText] = useState("");
  const [selfieText, setSelfieText] = useState("");
  const [uploadFile, setUploadFile] = useState<File>();
  const [uploadBackFile, setUploadBackFile] = useState<File>();
  const [expiry, setExpiry] = useState("");
  const [contentSelfieCode, setContentSelfieCode] = useState("");
  const [contentFrontCode, setContentFrontCode] = useState("");
  const [contentBackCode, setContentBackCode] = useState("");
  const [apiRequest, setAppiRequest] = useState(false);
  const [selfivalidate, setSelfiValidate] = useState(false);
  const [takepic, setTakePic] = useState(false);
  const [backpic, setbackPic] = useState(false);
  const [docSave, setDocSave] = useState(false);
  const [docupdaeStatus, setDocupload] = useState(false);


  const [customerDetailsUnblockModel, setCustomerDetailsUnblockModel] =
    useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e: any) => {
    setCardUnblock({
      ...cardUnblock,
      [e.target.name]: e.target.value,
    });
  };

  let customerDetails = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.getUnblockCardRequestResponse
  );

  useEffect(() => {
    if (props.isLoadingData === true) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
  }, [props.isLoadingData]);

  useEffect(() => {
    if (props.message) {
      setApiMessage(true);
      setAddError(true);
      setErrorMessage(props.message);
      resetAddDatasList();
      setCardUnblock((prev) => {
        return { ...prev, mobileNo: "" };
      });
    }
  }, []);

  useEffect(() => {
    if (props.isLoadingData === true) {
      setIsLoadingData(true);
      setErrorMessage("");
    } else if (props.message) {
      setIsLoadingData(false);
      setApiMessage(true);
      setErrorMessage(props.message);
    }
  }, [props.isLoadingData]);

  const handleChangeType = (e: any) => {
    let obj = JSON.parse(e);
    setCardUnblock({ ...cardUnblock, ["idDocType"]: obj.idtypeCode });
  };

  const getMobileNoRes = useSelector(
    (state: RootStateOrAny) =>
      state.CardUnBlockReducer?.getUnBlockCardMobileNoResponse
  );

  let customerDetail = getMobileNoRes?.data;

  useEffect(() => {
    if (customerDetails?.data && !confirmData && !customerDetails?.error) {
      setCustomerDetailsUnblockModel(true);
      setCardUnblock((pre) => {
        return {
          ...pre,
          Nationality: customerDetails?.data?.raceDescription,
          MobileNumber:
            customerDetails?.data?.customerWalletDto?.primaryMobileNumber,
          name: customerDetails?.data?.customerWalletDto?.customerName,
          IDType: customerDetails?.data?.customerWalletDto?.idTypeCode,
          IDNumber: customerDetails?.data?.customerWalletDto?.idValue,
          card: customerDetails?.data?.customerWalletDto?.cardType,
          cardtype: customerDetails?.data?.customerWalletDto?.idValue,
          last4digit:
            customerDetails?.data?.customerWalletDto?.panLastFourdigits,
        };
      });
      setIsLoading(false);
      setIsLoadingData(false);
    }
  }, [customerDetails, isLoading, confirmData]);

  useEffect(() => {
    if (customerDetail) {
      setIsLoading(false);
    }
  }, [customerDetail]);

  const resetAddDatasList = useCallback(async () => {
    try {
      dispatch(resetAddDatas());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (getMobileNoRes?.data) {
      setIsLoading(false);
      setCardUnblock({
        ...cardUnblock,
        customerName:
          getMobileNoRes?.data?.customerWalletDto?.customerName || "",
        cardL4d:
          getMobileNoRes?.data?.customerWalletDto?.panLastFourdigits || "",
        cardExpirydate:
          getMobileNoRes?.data?.customerWalletDto?.cardExpiryDate || "",
      });
      setApiMessage(false);
    } else if (getMobileNoRes?.error) {
      setApiMessage(false);
      setIsLoading(false);

      setErrorMessage("");
      setCardUnblock({
        approverId: "",
        inputOperatorId: "",
        mobileNo: "",
        requestChannel: "",
        requestReasoncode: "",
        requeststatus: "",
        idDocType: "",
        idDocNumber: "",
        customerName: "",
        cardL4d: "",
        cardExpirydate: "",
        frontDoc: "",
        Nationality: "",
        MobileNumber: "",
        name: "",
        IDType: "",
        IDNumber: "",
        card: "",
        cardtype: "",
        last4digit: "",
        photoContent: "",
      });
      setCustomerDetailsUnblockModel(false);
    }
  }, [getMobileNoRes]);

  const fetchApproveUnBlockCard = useCallback(
    (mobileNumber: any) => {
      try {
        dispatch(getMobileNumberUnblock(mobileNumber));
      } catch (err) {}
    },
    [dispatch]
  );

  const getIdtype = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.idTypeResponse
  );

  const fetchIdTypeByCountry = useCallback(
    (id: any) => {
      try {
        dispatch(getIdtypeByCountry(id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchIdTypeByCountry(getMobileNoRes?.data?.nationalityCode);
  }, [fetchIdTypeByCountry, getMobileNoRes?.data?.nationalityCode]);

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
        selfieFile !== undefined &&
        uploadBackFile === undefined &&
        uploadFile === undefined
      ) {
        setContentSelfieCode(postSelfieDocUploadRes?.data[0].contentCode);
      } else if (
        selfieFile !== undefined &&
        uploadBackFile !== undefined &&
        uploadFile === undefined
      ) {
        setContentBackCode(postSelfieDocUploadRes?.data[0].contentCode);
        setContentSelfieCode(postSelfieDocUploadRes?.data[1].contentCode);
      } else if (
        selfieFile !== undefined &&
        uploadBackFile === undefined &&
        uploadFile !== undefined
      ) {
        setContentFrontCode(postSelfieDocUploadRes?.data[0].contentCode);
        setContentSelfieCode(postSelfieDocUploadRes?.data[1].contentCode);
      } else if (
        selfieFile !== undefined &&
        uploadBackFile !== undefined &&
        uploadFile !== undefined
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

  const validate = () => {
    setMessage(false);
    let mobileNumberErrors = customValidator(
      "mobileno",
      "Mobile Number",
      cardUnblock.mobileNo
    );
    let idDocTypeErrors = customValidator(
      "idDocType",
      "idDocType",
      cardUnblock.idDocType
    );
    let idDocNumberErrors = customValidator(
      "idDocNumber",
      "idDocNumber",
      cardUnblock.idDocNumber
    );
    if (selfieFile === null || uploadFile === null || uploadBackFile === null) {
      setError(true);
    } else if (
      selfieFile !== null ||
      uploadFile !== null ||
      uploadBackFile !== null
    ) {
      setError(false);
    }

    if (
      !(
        mobileNumberErrors === "null" &&
        idDocTypeErrors === "null" &&
        idDocNumberErrors === "null"
      )
    ) {
      setErrors({
        mobileNumberErrorvalidate: mobileNumberErrors,
        idDocTypeError: idDocTypeErrors,
        idDocNumberError: idDocNumberErrors,
      });
      return false;
    }
    setErrors({
      mobileNumberErrorvalidate: "",
      idDocTypeError: "",
      idDocNumberError: "",
    });
    return true;
  };
  const validateMobileNo = () => {
    setMessage(true);
    let mobileNumberError = customValidator(
      "mobileno",
      "Mobile Number",
      cardUnblock.mobileNo
    );

    if (mobileNumberError !== "null") {
      setMobileError({
        mobileNumberErrorvalidate: mobileNumberError,
      });
      return false;
    }
    setMobileError({
      mobileNumberErrorvalidate: "",
    });
    return true;
  };

  const getDetailsBtn = () => {
    setBtndisable(true);

    setConfirmData(confirmData);
    setAppiRequest(true);
    if (validateMobileNo()) {
      setApiMessage(false);
      setIsLoading(true);
      var body = {
        primaryMobileNumber: CountryCode + cardUnblock.mobileNo,
      };
      fetchApproveUnBlockCard(body);
      fetchCustomerBlockCardDetails(body);
    }
  };

  const fetchCustomerBlockCardDetails = useCallback(
    (body: any) => {
      try {
        dispatch(getCustomerunblockdetailMob(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage(false);
      setBtndisable(false);
    }
  }, [apiMessage]);
  const fetchIdtypeReferencedata = useCallback(() => {
    try {
      dispatch(getIdtypeReferenceData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchIdtypeReferencedata();
  }, [fetchIdtypeReferencedata]);
  const data: any = new FormData();
  const submitHandler = () => {
    if (selfieFile === undefined) {
      setSelfiValidate(true);
    }
    if (uploadBackFile === undefined) {
      setbackPic(true);
    }

    if (uploadFile === undefined) {
      setTakePic(true);
    }

    if (!docSave) {
      setDocupload(true);
    }
    if (validate()) {
      if (
        selfieFile !== undefined &&
        uploadFile !== undefined &&
        uploadBackFile !== undefined &&
        btndisable &&
        docSave
      ) {
        var body = {
          customerName: cardUnblock.customerName,
          primaryMobileNumber: CountryCode + cardUnblock.mobileNo,
          panLastFourdigits: cardUnblock.cardL4d,
          cardExpiryDate:
            getMobileNoRes?.data?.customerWalletDto?.cardExpiryDate,
          idTypeCode: cardUnblock.idDocType,
          idValue: cardUnblock.idDocNumber,
          customerId: getMobileNoRes?.data?.customerWalletDto?.customerId,
          cardUrn: getMobileNoRes?.data?.customerWalletDto?.cardUrn,
          backDocumentContent: contentBackCode,
          photoContent: contentSelfieCode,
          frontDocumentContent: contentFrontCode,
        };
        props.submitHandler(body, data);
      }
    }
  };
  useEffect(() => {
    let expiryDate = customerDetails?.data
      ? customerDetails?.data?.customerWalletDto?.cardExpiryDate?.slice(0, 2) +
        "/" +
        customerDetails?.data?.customerWalletDto?.cardExpiryDate?.slice(2)
      : "";

    if (confirmData) {
      setExpiry(expiryDate);
    } else {
      setExpiry("");
    }
  }, [customerDetails?.data, confirmData]);

  useEffect(() => {
    if (cardUnblock.mobileNo === "") {
      setCardUnblock({
        approverId: "",
        inputOperatorId: "",
        mobileNo: "",
        requestChannel: "",
        requestReasoncode: "",
        requeststatus: "",
        idDocType: "",
        idDocNumber: "",
        customerName: "",
        cardL4d: "",
        cardExpirydate: "",
        frontDoc: "",
        Nationality: "",
        MobileNumber: "",
        name: "",
        IDType: "",
        IDNumber: "",
        card: "",
        cardtype: "",
        last4digit: "",
        photoContent: "",
      });
      setExpiry("");
      setCustomerDetailsUnblockModel(false);
    }
  }, []);
  useEffect(() => {
    if (errors.mobileNumberErrorvalidate) {
      setMessage(false);
    }
  }, [errors.mobileNumberErrorvalidate]);

  const handleSelfieUpload = () => {
    inputSelfie.current.click();
  };
  const handleSelfieView = (e: any) => {
    setSelfiValidate(false);
    const [file] = e.target.files;
    let frontBlob = new Blob([file], { type: "image" });
    setSelfieImage(URL.createObjectURL(frontBlob));
    setSelfieFile(file);
    setSelfie(false);
    setSelfieImg(e.target.files[0].name);
  };

  const handleFileUpload = (e: any) => {
    setTakePic(false);
    const [file] = e.target.files;
    setUploadFile(file);
    let frontBlob = new Blob([file], { type: "image" });
    setUploadImage(URL.createObjectURL(frontBlob));
    setImage(false);
    setUploadImg(e.target.files[0].name);
  };
  const handleFileBackUpload = (e: any) => {
    setbackPic(false);
    const [file] = e.target.files;
    setUploadBackFile(file);
    let frontBlob = new Blob([file], { type: "image" });
    setUploadBackImage(URL.createObjectURL(frontBlob));
    setBackImage(false);
    setUploadBackImg(e.target.files[0].name);
  };

  const handleDocUpload = () => {
    inputFile.current.click();
  };

  const handleDocBackUpload = () => {
    inputBack.current.click();
  };
  const validateImage = () => {
    if (selfieFile === null || uploadFile === null || uploadBackFile === null) {
      setError(true);
    } else if (
      selfieFile !== null ||
      uploadFile !== null ||
      uploadBackFile !== null
    ) {
      setError(false);
    }
    return true;
  };

  const dataValue: any = new FormData();
  dataValue.append("idBackDocumentFile", uploadBackFile);
  dataValue.append("idFrontDocumentFile", uploadFile);
  dataValue.append("photoContentFile", selfieFile);

  const handleSelfieSave = () => {
    if (selfieFile === undefined) {
      setSelfiValidate(true);
    }
    if (uploadBackFile === undefined) {
      setbackPic(true);
    }

    if (uploadFile === undefined) {
      setTakePic(true);
    }
    if (
      selfieFile !== undefined &&
      uploadBackFile !== undefined &&
      uploadFile !== undefined
    ) {
      setDocSave(true);
      setDocupload(false);
      setSelfieText(selfieImg);
      setBackText(uploadBackImg);
      setDocText(uploadImg);
      setBtndisable(true);
      postSelfieDocUpload(dataValue);
    }
  };

  useEffect(() => {
    if (
      customerDetails &&
      customerDetails?.error &&
      customerDetails?.error !== null
    ) {
      return;
    }
  }, [customerDetails]);

  useEffect(() => {
    if (
      customerDetails &&
      customerDetails?.error &&
      customerDetails?.error !== null &&
      !isLoading &&
      apiRequest
    ) {
      setIsLoading(false);
      setApiMessage(true);
      setBtndisable(false);
      setErrorMessage(customerDetails?.message);
    }
    // else {
    //   setBtndisable(false);
    // }
  }, [customerDetails]);

  return (
    <>
      <div className="p-4" style={{ position: "relative" }}>
        <div className="col mb-2">
          <div className="d-flex justify-content-between col-12">
            <h1 className="text-bold card-Unblock-title">
              {props.showAddUnBlockCard === "add" && "SRF - Card Unblock"}
            </h1>
            <button
              className="card-Unblock-back border-0"
              onClick={() => {
                props.onCancel();
              }}
            >
              {" "}
              <IoArrowUndoOutline />
              Back
            </button>
          </div>
        </div>
        {isLoadingData ? null : (
          <div className="col-9">
            {apiMessage && (
              <CustomResponseMessage
                apiStatus={true}
                message={errorMessage}
                closeMessage={closeMessage}
                errorFix={addError}
              />
            )}
          </div>
        )}
        <CustomLoader isLoading={isLoadingData} size={50} />
        <CustomLoader isLoading={isLoading} size={50} />
        <div className="col mb-2" style={{ position: "relative" }}>
          <div className="d-flex justify-content-between col-12">
            <div className="card-Unblock-body p-3">
              <div className="col d-flex p-1">
                <div className="col-8 p-1">
                  <label className="card-Unblock-label">Mobile Number</label>
                  <span className="container-body-label-color">*</span>
                  <div className="col-8 p-1 row">
                    <Input
                      className="border-1 card-Unblock-inputCode form-select"
                      type="select"
                      onChange={(e) => setCountryCode(e.target.value)}
                      name="inputCode"
                      value={CountryCode}
                    >
                      <option>+60</option>
                      <option>+65</option>
                      <option>+91</option>
                    </Input>
                    <Input
                      className="border-1 card-Unblock-inputMobile form-control"
                      type="text"
                      value={cardUnblock.mobileNo}
                      name="mobileNo"
                      onChange={handleChange}
                    />

                    <div className="col-12">
                      <Button
                        color="danger"
                        className="Btn--block"
                        onClick={getDetailsBtn}
                      >
                        Get Customer Details
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="col-3 p-1"></div>
              </div>

              {errors.mobileNumberErrorvalidate &&
                errors.mobileNumberErrorvalidate !== "null" && (
                  <p className="errors">{errors.mobileNumberErrorvalidate}</p>
                )}
              {message &&
                mobileError.mobileNumberErrorvalidate &&
                mobileError.mobileNumberErrorvalidate !== "null" && (
                  <p className="errors">
                    {mobileError.mobileNumberErrorvalidate}
                  </p>
                )}
              <div className="col-10 card-Unblock-formColor p-2 row">
                <div className="col-3 p-2">
                  <label className="card-Unblock-label card-Unblock-textLeft">
                    Customer Name
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 card-Unblock-inputType form-control"
                      type="text"
                      value={
                        confirmData ? customerDetails.data.customerName : null
                      }
                      readOnly={true}
                      name="customerName"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="card-Unblock-label card-Unblock-textLeft">
                    Pan Number
                  </label>

                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 card-Unblock-inputType form-control"
                      type="text"
                      value={
                        confirmData
                          ? customerDetails?.data?.customerWalletDto
                              ?.panLastFourdigits
                          : ""
                      }
                      readOnly={true}
                      name="cardL4d"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-3 p-2">
                  <label className="card-Unblock-label card-Unblock-textLeft">
                    Card Expiry Date
                  </label>
                  <div className="col-7 pt-1">
                    <Input
                      className="border-1 card-Unblock-inputType form-control"
                      type="text"
                      value={confirmData ? expiry : ""}
                      readOnly={true}
                      name="cardExpirydate"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col d-flex pt-3">
                <div
                  className="col-3 uploadSpace p-2"
                  onClick={handleDocUpload}
                  style={{ position: "relative" }}
                >
                  {image === true ? (
                    <img className="uploadImage" src={img} alt="" />
                  ) : (
                    <img className="uploadImageNew" src={uploadImage} alt="" />
                  )}
                  {image === true ? (
                    <label className="card-Unblock-label">
                      Take Front ID Picture
                    </label>
                  ) : (
                    ""
                  )}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="cursor-pointer"
                    onChange={handleFileUpload}
                    ref={inputFile}
                  />
                  {takepic ? (
                    <div
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "245px",
                      }}
                    >
                      Front Id Picture is mandatory
                    </div>
                  ) : null}
                </div>

                <div className="col-1"></div>
                <div
                  className="col-3 uploadSpace p-2"
                  onClick={handleDocBackUpload}
                  style={{ position: "relative" }}
                >
                  {backImage === true ? (
                    <img className="uploadImage" src={img} alt="" />
                  ) : (
                    <img
                      className="uploadImageNew"
                      src={uploadBackImage}
                      alt=""
                    />
                  )}
                  {backImage === true ? (
                    <label className="card-Unblock-label">
                      Take Back ID Picture
                    </label>
                  ) : (
                    ""
                  )}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="cursor-pointer"
                    onChange={handleFileBackUpload}
                    ref={inputBack}
                  />
                  {backpic ? (
                    <div
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "245px",
                      }}
                    >
                      Back ID Picture Mandatory
                    </div>
                  ) : null}
                </div>

                {/* <div className="col-11 errorMsg d-flex pt-3">
                  {error === true && (
                    <span className="container-body-label-color">
                      Back ID Image Should be mandatory
                    </span>
                  )}
                </div> */}

                <div className="col-1"></div>
                <div
                  className="col-3 uploadSpace p-2"
                  onClick={handleSelfieUpload}
                  style={{ position: "relative" }}
                >
                  {selfie === true ? (
                    <img className="uploadSelfie" src={img} alt="" />
                  ) : (
                    <img className="uploadSelfieNew" src={selfieImage} alt="" />
                  )}
                  {selfie === true ? (
                    <label className="card-Unblock-label">Take Selfie</label>
                  ) : (
                    ""
                  )}
                  <input
                    style={{ display: "none" }}
                    type="file"
                    className="cursor-pointer"
                    onChange={handleSelfieView}
                    ref={inputSelfie}
                  />
                  {selfivalidate ? (
                    <div
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "245px",
                      }}
                    >
                      Take Selfie Mandatory
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-11 errorMsg d-flex pt-3 justify-content-between">
                <div className="marginmsg">
                  {" "}
                  {error && (
                    <span className="container-body-label-color">
                      Front Id image or Back Id Image Should be mandatory
                    </span>
                  )}
                </div>
                <div>
                  {error && (
                    <span className="container-body-label-color">
                      Selfie Image Should be mandatory
                    </span>
                  )}
                </div>
              </div>
              <div className="col d-flex pt-3">
                <div className="col-3 text-center"></div>
                <div className="col-1"></div>

                <div className="col-3 text-center">
                  {selfieText === "" ? (
                    <button
                      className={
                        selfieFile !== undefined &&
                        uploadFile !== undefined &&
                        uploadBackFile !== undefined
                          ? "SubmitCancelButton-save border-0 text-white"
                          : "disablebutton border-0 text-white"
                      }
                      onClick={handleSelfieSave}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <div>{docText}</div>
                      <div>{backText}</div>
                      <div>{selfieText}</div>
                    </>
                  )}
                  {docupdaeStatus ? (
                    <div style={{ color: "red" }}>Save Mandatory</div>
                  ) : null}
                </div>
                <div className="col-1"></div>
                <div className="col-3 text-center"></div>
              </div>

              <div className="col d-flex p-1">
                <div className="col-3 p-1 pt-3">
                  <div className="col pt-3 d-flex">
                    <div className="col-9 p-1">
                      <label className="card-Unblock-label">ID Doc Type</label>
                      <span className="container-body-label-color">*</span>
                      <div className="col-10 p-1 row">
                        <Select
                          onChange={handleChangeType}
                          showSearch
                          filterOption={(input: any, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          id="fieldName1"
                          className="form-select add-customer-placeholder border-0"
                          value={cardUnblock.idDocType}
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
                    <div className="col-12 p-1">
                      <label className="card-Unblock-label">
                        ID Doc Number
                      </label>
                      <span className="container-body-label-color">*</span>
                      <div className="col-9 p-1 row">
                        <Input
                          className="border-1 card-Unblock-inputReason form-control"
                          type="text"
                          value={cardUnblock.idDocNumber}
                          name="idDocNumber"
                          onChange={handleChange}
                        ></Input>
                      </div>
                      {errors.idDocNumberError &&
                        errors.idDocNumberError !== "null" && (
                          <p className="errors">{errors.idDocNumberError}</p>
                        )}
                    </div>
                  </div>
                </div>
                <div className="col-3 p-1"></div>
              </div>
              <div className="col-6 pt-4">
                <button
                  className={
                    selfieFile !== undefined &&
                    uploadFile !== undefined &&
                    uploadBackFile !== undefined &&
                    btndisable &&
                    docSave
                      ? "SubmitCancelButton-save border-0 text-white"
                      : "disablebutton border-0 text-white"
                  }
                  onClick={submitHandler}
                 
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
          {customerDetailsUnblockModel ? (
            <div className="addBlockCard-modal-content">
              <div className="addBlockCard-modal-title">
                Confimation Message
                <img
                  src={close}
                  alt="close"
                  onClick={() => {
                    setConfirmData(false);
                    setCustomerDetailsUnblockModel(false);
                    setCardUnblock({
                      approverId: "",
                      inputOperatorId: "",
                      mobileNo: "",
                      requestChannel: "",
                      requestReasoncode: "",
                      requeststatus: "",
                      idDocType: "",
                      idDocNumber: "",
                      customerName: "",
                      cardL4d: "",
                      cardExpirydate: "",
                      frontDoc: "",
                      Nationality: "",
                      MobileNumber: "",
                      name: "",
                      IDType: "",
                      IDNumber: "",
                      card: "",
                      cardtype: "",
                      last4digit: "",
                      photoContent: "",
                    });
                  }}
                />
              </div>
              <div className="model_hr"></div>
              <div className="model_body">
                <div className="cus_info_pop d-flex gap-3 mt-3">
                  Please verify if the following details match with our records
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
                    <Label className="customer_details_pop">Nationality</Label>
                    <Input
                      className="border-1 block-card-inputType form-control"
                      type="text"
                      value={cardUnblock.Nationality}
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
                      value={cardUnblock.MobileNumber}
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label className="customer_details_pop">Name</Label>
                    <Input
                      className="border-1 block-card-inputType form-control"
                      type="text"
                      value={cardUnblock.name}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="d-flex gap-3 mt-3">
                  <div>
                    <Label className="customer_details_pop">ID Type</Label>
                    <Input
                      className="border-1 block-card-inputType form-control"
                      type="text"
                      value={cardUnblock.IDType}
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label className="customer_details_pop">ID Number</Label>
                    <Input
                      className="border-1 block-card-inputType form-control"
                      type="text"
                      value={cardUnblock.IDNumber}
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <Label className="customer_details_pop">Card</Label>
                    <Input
                      className="border-1 block-card-inputType form-control"
                      type="text"
                      value={cardUnblock.card}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="d-flex gap-3 mt-3">
                  <div>
                    <Label className="customer_details_pop">Card Type</Label>
                    <Input
                      className="border-1 block-card-inputType form-control"
                      type="text"
                      value={cardUnblock.cardtype}
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
                      value={cardUnblock.last4digit}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="flex-container">
                  <div
                    className="success_btn"
                    onClick={() => {
                      setConfirmData(true);
                      setCustomerDetailsUnblockModel(false);
                    }}
                  >
                    Yes
                  </div>

                  <div
                    style={{ cursor: "pointer" }}
                    className="btn_cancel"
                    onClick={() => {
                      setConfirmData(false);
                      setCustomerDetailsUnblockModel(false);
                      setCountryCode("+60");
                      setCardUnblock({
                        approverId: "",
                        inputOperatorId: "",
                        mobileNo: "",
                        requestChannel: "",
                        requestReasoncode: "",
                        requeststatus: "",
                        idDocType: "",
                        idDocNumber: "",
                        customerName: "",
                        cardL4d: "",
                        cardExpirydate: "",
                        frontDoc: "",
                        Nationality: "",
                        MobileNumber: "",
                        name: "",
                        IDType: "",
                        IDNumber: "",
                        card: "",
                        cardtype: "",
                        last4digit: "",
                        photoContent: "",
                      });
                    }}
                  >
                    No
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
export default AddCardUnblock;
