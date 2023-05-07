import React, { useCallback, useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { IoArrowUndoOutline } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./DocUploadRequestAdd.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  addDocUploadReq,
  getIdtype,
  resetCreatedDataDoc,
} from "../../redux/action/DocUploadRequestAction";
import {
  getMobileNumberUnblock,
  resetVerifyRes,
} from "../../redux/action/CardUnBlockAction";
import CustomLoader from "../Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { Select } from "antd";
import { getIdtypeReferenceData } from "../../redux/action/idTypeRoutingActions";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { getAllPostalCode } from "../../redux/action/StateCountryAction";
import { validate } from "validate.js";
import { getMobileNumberUpgrade } from "../../redux/action/CardUpgradeAction";

const DocUploadRequestAdd = (props: any) => {
  const laoction: any = useLocation();
  const getMobileNoRes = useSelector(
    (state: RootStateOrAny) =>
      state.CardUpgradeReducer?.getCustomerDetailsResponse
  );
  const getAllpostalCode = useSelector(
    (residentStateDescription: RootStateOrAny) =>
      residentStateDescription.StateCountryReducer.getAllPostalCodeResponse
  );
  const [errors, setErrors] = useState({
    idDocTypeError: "",
    idDocNumberError: "",
  });
  const [docUploadRequest, setDocUploadRequest] = useState({
    cardExpirydate: "",
    cardL4d: "",
    customerName: "",
    mobileNo: "",
    requeststatus: "",
    walletId: "",
    reasonCode: "",
    idDocType: "",
    idDocNumber: "",
    oldAddress1: "",
    oldAddress2: "",
    oldPostalCode: "",
    oldCity: "",
    oldState: "",
    newAddress1: "",
    newAddress2: "",
    newPostalCode: "",
    newCity: "",
    newState: "",
    checkIdDoc: false,
    checkHomeadd: false,
    checkMailadd: false,
    sameAddress: false,
    isOriginalDocument: false,
    oldIdDocType1: "",
    oldIdDocNumber1: "",
    oldIssueDate: "",
    oldExpairyDate: "",
    countryCode: "+60",
    newIdDocType1: "",
    newIdDocNumber1: "",
    newIssueDate: "",
    newExpairyDate: "",
    oldAddress1Mail: "",
    oldAddress2Mail: "",
    oldPostalCodeMail: "",
    oldCityMail: "",
    oldStateMail: "",
    newAddress1Mail: "",
    newAddress2Mail: "",
    newPostalCodeMail: "",
    newCityMail: "",
    newStateMail: "",
    customerSignatureFile: false,
    customerSelfieFile: false,
    idtypeCodeDescription: "",
    cardworksCodeMapping: "",
    residentCityCode: "",
    residentStateCode: "",
    residentCountryCode: "",
    residentCountry: "",
    mailCityCode: "",
    mailStateCode: "",
    mailCountryCode: "",
    mailCountry: "",
    prStatus: "",
    visaNumber: "",
    immigrationVisaExpiryDate: "",
    isExpiryDateMandatory: "",
    fieldValidation: "",
    fieldValidationDescription: "",
    isIssueDateMandatory: "",
  });
  const [frontFileSelected, setFrontFileSelected] = useState<File>();
  const [backFileSelected, setBackFileSelected] = useState<File>();
  const [selfieFileSelected, setSelfieFileSelected] = useState<File>();
  const [customersignFileSelected, setCustomersignFileSelected] =
    useState<File>();
  const [Mindates, setMinDates] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [mobileError, setMobileError] = useState({
    mobileNumberErrorvalidate: "",
  });
  const { Option } = Select;
  const [apiMessage, setApiMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [addError, setAddError] = useState(false);
  const [isError, setIsError] = useState(false);
  const [btndisable, setBtndisable] = useState(false);
  const [frontImg, setFrontImg] = useState("");
  const [backImg, setBackImg] = useState("");
  const [signImg, setSignImg] = useState("");
  const [selfieImg, setSelfieImg] = useState("");
  const [noOfPic, setNoOfPic] = useState<any>([]);
  const [preview, setPreview] = useState("");
  const [backDocImg, setBackDocImg] = useState("");
  const [signDocImg, setDocImg] = useState("");
  const [selfieDocImg, setSelfieDocImg] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  const frontfileSelect = (e: any) => {
    const fileList = e.target.files;
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 1) {
      setErrorSize("Image size max upto 1Mb");
      setErrorMsg(true);
    } else {
      if (!fileList) return;
      setFrontFileSelected(fileList[0]);
      setPreview(URL.createObjectURL(fileList[0]));
      setIsError(false);
      setErrorSize("");
      setErrorMsg(false);
    }
  };
  const backfileSelect = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setBackFileSelected(fileList[0]);
    setBackDocImg(URL.createObjectURL(fileList[0]));
    setIsError(false);
  };

  const selfiefileSelect = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setSelfieFileSelected(fileList[0]);
    setSelfieDocImg(URL.createObjectURL(fileList[0]));
    setIsError(false);
  };

  const signfileSelect = (e: any) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setCustomersignFileSelected(fileList[0]);
    setDocImg(URL.createObjectURL(fileList[0]));
    setIsError(false);
  };

  const addDocUploadReqRes = useSelector(
    (state: RootStateOrAny) =>
      state.DocUploadRequestReducer?.postDocUploadRequestRes
  );
  const idtypeReferenceData = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer.getAllIdTypeResponse
  );
  const fetchAllPostalCode = useCallback(async () => {
    try {
      dispatch(getAllPostalCode());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllPostalCode();
  }, [fetchAllPostalCode]);

  const getDocUploadIdtypes = useSelector(
    (state: RootStateOrAny) => state.DocUploadRequestReducer?.getIdtypeDocRes
  );

  const fetchIdtype = useCallback(
    async (id: any) => {
      try {
        dispatch(getIdtype(id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchIdtype(getMobileNoRes?.data?.nationalityCode);
  }, [fetchIdtype, getMobileNoRes?.data?.nationalityCode]);

  const resetCreatedDataRes = useCallback(async () => {
    try {
      dispatch(resetCreatedDataDoc());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (addDocUploadReqRes?.data) {
      setIsLoading(false);
      if (addDocUploadReqRes?.data?.requestStatus === "CREATED") {
        props.history?.push({
          pathname: "/dashboard/SRF/Doc-Upload-Request",
          state: "DocUpload Request Created Sucessfully",
          message: "DocUpload Request Created Sucessfully",
        });
      }
      if (addDocUploadReqRes?.data?.requestStatus === "APPROVED") {
        props.history?.push({
          pathname: "/dashboard/SRF/Doc-Upload-Request",
          state: "DocUpload Request Approved Sucessfully",
          message: "DocUpload Request Approved Sucessfully",
        });
      }
      resetCreatedDataRes();
      setIsError(true);
    } else if (addDocUploadReqRes?.error) {
      setErrorMessage(addDocUploadReqRes?.message);
      setIsLoading(false);
      setApiMessage(true);
      setAddError(true);
      setIsError(false);
    }
  }, [addDocUploadReqRes]);

  const FetchAddDocUploadReq = useCallback(
    (body: any) => () => {
      try {
        dispatch(addDocUploadReq(body));
      } catch (err) {
       
      }
    },
    [dispatch]
  );

  const data: any = new FormData();
  let newVariable = idtypeReferenceData?.data?.filter((_data: any) => {
    return data.idtypeCode === docUploadRequest.newIdDocType1;
  });
  const handleChangeType = (e: any) => {
    let obj = JSON.parse(e);
    setDocUploadRequest({
      ...docUploadRequest,
      newIdDocType1: obj.idtypeCode,
      idtypeCodeDescription: obj.idtypeCodeDescription,
      cardworksCodeMapping: obj.cardworksCodeMapping,
      fieldValidation: obj.fieldValidation,
      fieldValidationDescription: obj.fieldValidationDescription,
    });
  };
  const handleChangePostal = (e: any) => {
    let obj = JSON.parse(e);
    setDocUploadRequest({
      ...docUploadRequest,
      newPostalCode: obj.code,
      newState: obj.details.state,
      newCity: obj.details.city,
      residentCityCode: obj.details.city,
      residentStateCode: obj.details.state,
      residentCountryCode: obj.details.countrycode,
      residentCountry: obj.details.country,
    });
  };
  const handleChangePostalMail = (e: any) => {
    let obj = JSON.parse(e);
    setDocUploadRequest({
      ...docUploadRequest,
      newPostalCodeMail: obj.code,
      newStateMail: obj.details.state,
      newCityMail: obj.details.city,
      mailCityCode: obj.details.city,
      mailStateCode: obj.details.state,
      mailCountryCode: obj.details.countrycode,
      mailCountry: obj.details.country,
    });
  };
  useEffect(() => {
    if (newVariable) {
      setNoOfPic(newVariable);
    }
  }, [docUploadRequest]);

  let totalPicture = noOfPic[0]?.noOfPicturesToCapture;
  let docIssueDate = noOfPic[0]?.isIssueDateMandatory;
  let docExpairyDate = noOfPic[0]?.isExpiryDateMandatory;

  let isMandatory =
    docUploadRequest.checkIdDoc === true ? frontFileSelected : true;
  let backmandatory =
    docUploadRequest.checkIdDoc === true && totalPicture === 2
      ? backFileSelected
      : true;
  let selfieMandatory =
    docUploadRequest.customerSelfieFile === true ? selfieFileSelected : true;
  let signMandatory =
    docUploadRequest.customerSignatureFile === true
      ? customersignFileSelected
      : true;
  let visnumberMandatory =
    docUploadRequest.newIdDocType1 === "Passport" &&
    docUploadRequest.prStatus === "Y" &&
    docUploadRequest.visaNumber === ""
      ? false
      : true;
  let visadateMandatory =
    docUploadRequest.newIdDocType1 === "Passport" &&
    docUploadRequest.prStatus === "Y" &&
    docUploadRequest.immigrationVisaExpiryDate === ""
      ? false
      : true;
  const submitHandler = () => {
    if (
      validateMobileNo() &&
      customTypeValidator() &&
      isMandatory &&
      backmandatory &&
      selfieMandatory &&
      signMandatory &&
      visnumberMandatory &&
      visadateMandatory
    ) {
      setIsLoading(true);

      data.append(
        "mobileNumber",
        docUploadRequest["countryCode"] + docUploadRequest["mobileNo"]
      );
      data.append("walletId", getMobileNoRes?.data?.customerWalletDto?.id);
      data.append("customerName", docUploadRequest["customerName"]);
      data.append("cardL4D", docUploadRequest["cardL4d"]);
      data.append(
        "cardExpiryDate",
        getMobileNoRes?.data?.customerWalletDto?.cardExpiryDate
      );
      data.append("idDocs", docUploadRequest["checkIdDoc"]);
      data.append("homeAddress", docUploadRequest["checkHomeadd"]);
      data.append("mailingAddress", docUploadRequest["checkMailadd"]);
      data.append("sameAddress", docUploadRequest["sameAddress"]);
      data.append(
        "customerSignatureFile",
        docUploadRequest["customerSignatureFile"]
      );
      data.append("customerSelfieFile", docUploadRequest["customerSelfieFile"]);

      if (docUploadRequest.checkHomeadd === true) {
        data.append("residentAddressLine1", docUploadRequest["newAddress1"]);
        data.append("residentAddressLine2", docUploadRequest["newAddress2"]);
        data.append("residentPostalCode", docUploadRequest["newPostalCode"]);
        data.append("residentCityCode", docUploadRequest["residentCityCode"]);
        data.append("residentCity", docUploadRequest["newCity"]);
        data.append("residentStateCode", docUploadRequest["residentStateCode"]);
        data.append("residentState", docUploadRequest["newState"]);
        data.append(
          "residentCountryCode",
          docUploadRequest["residentCountryCode"]
        );
        data.append("residentCountry", docUploadRequest["residentCountry"]);
      }

      if (docUploadRequest.checkMailadd === true) {
        data.append("mailingAddressLine1", docUploadRequest["newAddress1Mail"]);
        data.append("mailingAddressLine2", docUploadRequest["newAddress2Mail"]);
        data.append("mailingPostalCode", docUploadRequest["newPostalCodeMail"]);
        data.append("mailCityCode", docUploadRequest["mailCityCode"]);
        data.append("mailingCity", docUploadRequest["newCityMail"]);
        data.append("mailStateCode", docUploadRequest["mailStateCode"]);
        data.append("mailingState", docUploadRequest["newStateMail"]);
        data.append("mailCountryCode", docUploadRequest["mailCountryCode"]);
        data.append("mailCountry", docUploadRequest["mailCountry"]);
      }
      if (docUploadRequest.customerSignatureFile === true) {
        data.append("updateCustomerSignature", customersignFileSelected);
      }
      if (docUploadRequest.customerSelfieFile === true) {
        data.append("updateSelfieFile", selfieFileSelected);
      }
      if (docUploadRequest.checkIdDoc === true) {
        data.append("updateIdDocFrontPage", frontFileSelected);

        data.append("idDocType", docUploadRequest["idtypeCodeDescription"]);
        data.append("idTypeCode", docUploadRequest["newIdDocType1"]);
        data.append(
          "cardworksIdtypeMapping",
          docUploadRequest["cardworksCodeMapping"]
        );
        data.append("idDocNumber", docUploadRequest["newIdDocNumber1"]);
        data.append("originalDocument", docUploadRequest["isOriginalDocument"]);
        if (docUploadRequest.newIdDocType1 === "Passport") {
          data.append("prStatus", docUploadRequest["prStatus"]);
          data.append("visaNumber", docUploadRequest["visaNumber"]);
          data.append(
            "immigrationVisaExpiryDate",
            docUploadRequest["immigrationVisaExpiryDate"]
          );
        }
      }

      if (docUploadRequest.checkIdDoc === true && totalPicture === 2) {
        data.append("updateIdDocFrontPage", frontFileSelected);
        data.append("updateIdDocBackPage", backFileSelected);
        data.append("idDocIssueDate", docUploadRequest["newIssueDate"]);
        data.append("idDocExpiryDate", docUploadRequest["newExpairyDate"]);
        data.append("idDocType", docUploadRequest["idtypeCodeDescription"]);
        data.append("idTypeCode", docUploadRequest["newIdDocType1"]);
        data.append(
          "cardworksIdtypeMapping",
          docUploadRequest["cardworksCodeMapping"]
        );
        data.append("idDocNumber", docUploadRequest["newIdDocNumber1"]);
        data.append("originalDocument", docUploadRequest["isOriginalDocument"]);
        if (docUploadRequest.newIdDocType1 === "Passport") {
          data.append("prStatus", docUploadRequest["prStatus"]);
          data.append("visaNumber", docUploadRequest["visaNumber"]);
          data.append(
            "immigrationVisaExpiryDate",
            docUploadRequest["immigrationVisaExpiryDate"]
          );
        }
      }
      dispatch(FetchAddDocUploadReq(data));
    } else {
      setIsError(true);
    }
  };

  const handleChange = (e: any) => {
    setDocUploadRequest({
      ...docUploadRequest,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!apiMessage) {
      setErrorMessage("");
    }
  }, [apiMessage]);

  const onCancel = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Doc-Upload-Request",
    });
  };
  const fetchApproveUnBlockCard = useCallback(
    (mobileNumber: any) => {
      try {
        dispatch(getMobileNumberUpgrade(mobileNumber));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetVerifyMobileNo = useCallback(() => {
    try {
      dispatch(resetVerifyRes());
    } catch (err) {}
  }, [dispatch]);

  const validateMobileNo = () => {
    setMessage(true);
    let mobileNumberError = customValidator(
      "mobileno",
      "Mobile Number",
      docUploadRequest.mobileNo
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

  const customTypeValidator = () => {
    if (docUploadRequest.checkIdDoc) {
      let object: any = {};
      let dynamicRegex = "";
      if (docUploadRequest.fieldValidation === "^[A-Z0-9]") {
        dynamicRegex = `${docUploadRequest.fieldValidation}+$`;
      } else {
        dynamicRegex = docUploadRequest.fieldValidation;
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

      object["value"] = docUploadRequest.newIdDocNumber1 ?? 0;
      const result = validate(object, { value: constraint });

      if (result) {
        setErrors({
          idDocTypeError: "",
          idDocNumberError: docUploadRequest.fieldValidationDescription,
        });
        return false;
      }
      setErrors({
        idDocTypeError: "",
        idDocNumberError: "",
      });
      return true;
    }
    return true;
  };

  const handleButton = () => {
    if (validateMobileNo()) {
      setIsLoading(true);
      var body = {
        primaryMobileNumber:
          docUploadRequest.countryCode + docUploadRequest.mobileNo,
      };
      fetchApproveUnBlockCard(body);
    }
  };
  useEffect(() => {
    if (getMobileNoRes?.data) {
      setIsLoading(false);
    }
  }, [getMobileNoRes]);

  useEffect(() => {
    if (getMobileNoRes?.data) {
      setDocUploadRequest({
        ...docUploadRequest,
        oldIdDocNumber1: getMobileNoRes?.data?.idValue || "",
        oldIdDocType1: getMobileNoRes?.data?.idTypeCodeDescription || "",
        oldAddress1: getMobileNoRes?.data?.residentAddress1 || "",
        oldAddress2: getMobileNoRes?.data?.residentAddress2 || "",
        oldCity:
          getMobileNoRes?.data?.residentCityDescription === "undefined"
            ? ""
            : getMobileNoRes?.data?.residentCityDescription || "",
        oldState: getMobileNoRes?.data?.residentStateDescription || "",
        oldPostalCode: getMobileNoRes?.data?.residentPostcode || "",
        oldAddress1Mail: getMobileNoRes?.data?.mailAddress1 || "",
        oldAddress2Mail: getMobileNoRes?.data?.mailAddress2 || "",
        oldPostalCodeMail: getMobileNoRes?.data?.mailPostcode || "",
        oldCityMail: getMobileNoRes?.data?.mailCityDescription || "",
        oldStateMail: getMobileNoRes?.data?.mailStateDescription || "",
        customerName:
          getMobileNoRes?.data?.customerWalletDto?.customerName || "",
        cardL4d:
          getMobileNoRes?.data?.customerWalletDto?.panLastFourdigits || "",
        cardExpirydate:
          getMobileNoRes?.data?.customerWalletDto?.cardExpiryDate || "",
        oldIssueDate: getMobileNoRes?.data?.newIdDate || "",
        oldExpairyDate: getMobileNoRes?.data?.newIdExpiryDate || "",
      });
      setBtndisable(false);
      setApiMessage(false);
    } else if (getMobileNoRes?.error) {
      setBtndisable(true);
      setErrorMessage(getMobileNoRes?.message);
      setIsLoading(false);
      setApiStatus(false);
      setApiMessage(true);
      setAddError(true);
    }
  }, [getMobileNoRes]);

  useEffect(() => {
    if (docUploadRequest.mobileNo === "") {
      setDocUploadRequest({
        cardExpirydate: "",
        cardL4d: "",
        customerName: "",
        mobileNo: "",
        requeststatus: "",
        walletId: "",
        reasonCode: "",
        idDocType: "",
        idDocNumber: "",
        oldAddress1: "",
        oldAddress2: "",
        oldPostalCode: "",
        oldCity: "",
        oldState: "",
        sameAddress: false,
        isOriginalDocument: false,
        newAddress1: "",
        newAddress2: "",
        newPostalCode: "",
        newCity: "",
        newState: "",
        newAddress1Mail: "",
        newAddress2Mail: "",
        newPostalCodeMail: "",
        newCityMail: "",
        newStateMail: "",
        newIdDocType1: "",
        newIdDocNumber1: "",
        newIssueDate: "",
        newExpairyDate: "",
        checkIdDoc: false,
        checkHomeadd: false,
        checkMailadd: false,
        oldIdDocType1: "",
        oldIdDocNumber1: "",
        oldIssueDate: "",
        oldExpairyDate: "",
        countryCode: "",
        oldAddress1Mail: "",
        oldAddress2Mail: "",
        oldPostalCodeMail: "",
        oldCityMail: "",
        oldStateMail: "",
        customerSignatureFile: false,
        customerSelfieFile: false,
        idtypeCodeDescription: "",
        cardworksCodeMapping: "",
        residentCityCode: "",
        residentStateCode: "",
        residentCountryCode: "",
        residentCountry: "",
        mailCityCode: "",
        mailStateCode: "",
        mailCountryCode: "",
        mailCountry: "",
        prStatus: "",
        visaNumber: "",
        immigrationVisaExpiryDate: "",
        fieldValidation: "",
        fieldValidationDescription: "",
        isExpiryDateMandatory: "",
        isIssueDateMandatory: "",
      });
      resetVerifyMobileNo();
      setApiMessage(false);
      setBtndisable(false);
    }
  }, []);

  useEffect(() => {
    if (
      (docUploadRequest.checkIdDoc ||
        docUploadRequest.checkHomeadd ||
        docUploadRequest.checkMailadd ||
        docUploadRequest.sameAddress ||
        docUploadRequest.customerSignatureFile ||
        docUploadRequest.customerSelfieFile) === false
    ) {
      setBtndisable(true);
    } else {
      setBtndisable(false);
    }
  }, [
    docUploadRequest.checkIdDoc,
    docUploadRequest.checkHomeadd,
    docUploadRequest.checkMailadd,
    docUploadRequest.sameAddress,
    docUploadRequest.customerSignatureFile,
    docUploadRequest.customerSelfieFile,
  ]);

  const handleChangeIdDoc = (e: any) => {

    setDocUploadRequest({
      ...docUploadRequest,
      [e.target.name]: e.target.checked,
    });
  };

  const fetchIdtypeReferencedata = useCallback(() => {
    try {
      dispatch(getIdtypeReferenceData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchIdtypeReferencedata();
  }, [fetchIdtypeReferencedata]);

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  useEffect(() => {
    setFrontImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${getMobileNoRes?.data?.frontDocumentContent}`
    );
    setBackImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${getMobileNoRes?.data?.backDocumentContent}`
    );
    setSignImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${getMobileNoRes?.data?.signatureContent}`
    );
    setSelfieImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${getMobileNoRes?.data?.photoContent}`
    );
  }, [getMobileNoRes]);

  useEffect(() => {
    if (docUploadRequest.sameAddress === true) {
      setDocUploadRequest({
        ...docUploadRequest,
        newAddress1Mail: docUploadRequest.newAddress1,
        newAddress2Mail: docUploadRequest.newAddress2,
        newPostalCodeMail: docUploadRequest.newPostalCode,
        newCityMail: docUploadRequest.newCity,
        newStateMail: docUploadRequest.newState,
      });
    } else if (docUploadRequest.sameAddress === false) {
      setDocUploadRequest({
        ...docUploadRequest,
        newAddress1Mail: "",
        newAddress2Mail: "",
        newPostalCodeMail: "",
        newCityMail: "",
        newStateMail: "",
      });
    }
  }, [docUploadRequest.sameAddress]);

  const d = new Date();
  let date = Number(d.getDate() + 2);
  let month = Number(d.getMonth());
  let year = Number(d.getFullYear());
  let tomorrow = new Date(year, month, date);

  let expiryDate = getMobileNoRes?.data
    ? getMobileNoRes?.data?.customerWalletDto?.cardExpiryDate?.slice(0, 2) +
      "/" +
      getMobileNoRes?.data?.customerWalletDto?.cardExpiryDate?.slice(2)
    : "";

  const formatDate = (LastDate: any) => {
    let month = "" + (LastDate.getMonth() + 1);
    let day = "" + LastDate.getDate();
    let year = LastDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  var LastDate = new Date();
  const dates = formatDate(LastDate);

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold doc-uploadRequest-title">
            Doc Upload Request
          </h1>
          <button
            className="doc-uploadRequest-back border-0"
            onClick={onCancel}
          >
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={apiStatus}
          message={errorMessage}
          closeMessage={closeMessage}
          errorFix={addError}
        />
      )}
      <CustomLoader isLoading={isLoading} size={50} />
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="doc-uploadRequest-body p-3">
            <div className="col d-flex p-1">
              <div className="col-8 p-1">
                <label className="doc-uploadRequest-label">Mobile Number</label>
                <div className="col-8 p-1 row">
                  <Input
                    className="border-1 doc-uploadRequest-optionCode form-select"
                    type="select"
                    name="countryCode"
                    value={docUploadRequest.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+60">+60</option>
                    <option value="+65">+65</option>
                    <option value="+91">+91</option>
                  </Input>
                  <Input
                    className="border-1 doc-uploadRequest-inputMobile form-control"
                    type="text"
                    value={docUploadRequest.mobileNo}
                    name="mobileNo"
                    onChange={handleChange}
                  />
                  <div className="col-1">
                    <Button
                      color="danger"
                      className="Btn--block"
                      onClick={handleButton}
                    >
                      ValidateMobileNo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {message &&
              mobileError.mobileNumberErrorvalidate &&
              mobileError.mobileNumberErrorvalidate !== "null" && (
                <p className="errors">
                  {mobileError.mobileNumberErrorvalidate}
                </p>
              )}
            <div className="col-8 doc-uploadRequest-formColor p-2 row">
              <div className="col-4 p-2">
                <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                  Customer Name
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 doc-uploadRequest-inputType form-control"
                    type="text"
                    value={docUploadRequest.customerName}
                    readOnly={true}
                    name="customerName"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-2 p-2">
                <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                  PAN
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 doc-uploadRequest-inputType form-control"
                    type="text"
                    value={docUploadRequest.cardL4d}
                    readOnly={true}
                    name="cardL4d"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-3 p-2">
                <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                  Card Expiry Date
                </label>
                <div className="col-12 pt-1">
                  <Input
                    className="border-1 doc-uploadRequest-inputType form-control"
                    type="text"
                    value={expiryDate}
                    readOnly={true}
                    name="cardExpirydate"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className=" d-flex row mt-3">
              <div className="col-2">
                <Input
                  type="checkbox"
                  className="doc-uploadRequest-checkboxSize"
                  checked={docUploadRequest.checkIdDoc}
                  name="checkIdDoc"
                  onChange={handleChangeIdDoc}
                />
                <label className="doc-uploadRequest-label doc-uploadRequest-checkboxLabel">
                  ID Doc
                </label>
              </div>
              <div className="col-3 doc-uploadRequest-checkdiv">
                <Input
                  type="checkbox"
                  className="doc-uploadRequest-checkboxSize"
                  checked={docUploadRequest.checkHomeadd}
                  name="checkHomeadd"
                  onChange={handleChangeIdDoc}
                />
                <label className="doc-uploadRequest-label doc-uploadRequest-checkboxLabel">
                  Residential Address
                </label>
              </div>
              <div className="doc-uploadRequest-checkdiv1 col-3">
                <Input
                  type="checkbox"
                  className="doc-uploadRequest-checkboxSize"
                  checked={docUploadRequest.checkMailadd}
                  name="checkMailadd"
                  onChange={handleChangeIdDoc}
                />
                <label className="doc-uploadRequest-label doc-uploadRequest-checkboxLabel">
                  Mailing Address
                </label>
              </div>
              {(docUploadRequest.checkMailadd &&
                docUploadRequest.checkHomeadd) === true && (
                <div className="doc-uploadRequest-checkdiv1 col-3">
                  <Input
                    type="checkbox"
                    className="doc-uploadRequest-checkboxSize"
                    checked={docUploadRequest.sameAddress}
                    name="sameAddress"
                    onChange={handleChangeIdDoc}
                  />
                  <label className="doc-uploadRequest-label doc-uploadRequest-checkboxLabel">
                    Same Address
                  </label>
                </div>
              )}
              <div className="doc-uploadRequest-checkdiv col-3">
                <Input
                  type="checkbox"
                  className="doc-uploadRequest-checkboxSize"
                  checked={docUploadRequest.customerSignatureFile}
                  name="customerSignatureFile"
                  onChange={handleChangeIdDoc}
                />
                <label className="doc-uploadRequest-label doc-uploadRequest-checkboxLabel">
                  Customer Signature
                </label>
              </div>
              <div className="doc-uploadRequest-checkdiv col-3">
                <Input
                  type="checkbox"
                  className="doc-uploadRequest-checkboxSize"
                  checked={docUploadRequest.customerSelfieFile}
                  name="customerSelfieFile"
                  onChange={handleChangeIdDoc}
                />
                <label className="doc-uploadRequest-label doc-uploadRequest-checkboxLabel">
                  Customer Selfie
                </label>
              </div>
            </div>

            <div className="col-11 doc-uploadRequest-formColor mt-3 row d-flex flex-column">
              <p className="doc-uploadRequest-homeAddress mt-1">
                Residential Address
              </p>
              <p className="addressTitle">Old Address</p>
              <div className="d-flex">
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    Address 1
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldAddress1}
                      name="oldAddress1"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    Address 2
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldAddress2}
                      name="oldAddress2"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    Postal Code
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="select"
                      value={docUploadRequest.oldPostalCode}
                      name="oldPostalCode"
                      onChange={handleChange}
                      readOnly={true}
                    >
                      <option key="-1" value=""></option>
                      {getAllpostalCode &&
                        getAllpostalCode.map((e: any, _index: number) => {
                          return <option>{e.code}</option>;
                        })}
                    </Input>
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    City
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldCity}
                      name="oldCity"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    State
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldState}
                      name="oldState"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>

              {docUploadRequest.checkHomeadd === true && (
                <>
                  <p className="addressTitle">New Address</p>
                  <div className="d-flex newAddressBox">
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Address 1
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newAddress1}
                          name="newAddress1"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-3 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Address 2
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newAddress2}
                          name="newAddress2"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Postal Code
                      </label>
                      <div className="col-12 pt-1">
                        <Select
                          onChange={handleChangePostal}
                          showSearch
                          filterOption={(input: any, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          id="fieldName1"
                          className="form-select add-customer-placeholder border-0"
                          value={docUploadRequest.newPostalCode}
                          placeholder={"Select ID Type"}
                        >
                          {getAllpostalCode &&
                            getAllpostalCode?.map((option: any, index: any) => {
                              return (
                                <Option
                                  key={index}
                                  value={JSON.stringify(option)}
                                >
                                  {option.code}
                                </Option>
                              );
                            })}
                        </Select>
                      </div>
                    </div>
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        City
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newCity}
                          name="newCity"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        State
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newState}
                          name="newState"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-11 doc-uploadRequest-formColor mt-3 row d-flex flex-column">
              <p className="doc-uploadRequest-homeAddress mt-1">
                Mailing Address
              </p>
              <p className="addressTitle">Old Address</p>
              <div className="d-flex">
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    Address 1
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldAddress1Mail}
                      name="oldAddress1Mail"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    Address 2
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldAddress2Mail}
                      name="oldAddress2Mail"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    Postal Code
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="select"
                      value={docUploadRequest.oldPostalCodeMail}
                      name="oldPostalCodeMail"
                      onChange={handleChange}
                      readOnly={true}
                    >
                      <option key="-1" value=""></option>
                      {getAllpostalCode &&
                        getAllpostalCode.map((e: any, _index: number) => {
                          return <option>{e.code}</option>;
                        })}
                    </Input>
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    City
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldCityMail}
                      name="oldCityMail"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-2 p-2">
                  <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                    State
                  </label>
                  <div className="col-12 pt-1">
                    <Input
                      className="border-1 doc-uploadRequest-inputType form-control"
                      type="text"
                      value={docUploadRequest.oldStateMail}
                      name="oldStateMail"
                      onChange={handleChange}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>

              {docUploadRequest.checkMailadd === true && (
                <>
                  <p className="addressTitle">New Address</p>
                  <div className="d-flex newAddressBox">
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Address 1
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newAddress1Mail}
                          name="newAddress1Mail"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-3 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Address 2
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newAddress2Mail}
                          name="newAddress2Mail"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Postal Code
                      </label>
                      <div className="col-12 pt-1">
                        <Select
                          onChange={handleChangePostalMail}
                          showSearch
                          filterOption={(input: any, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          id="fieldName1"
                          className="form-select add-customer-placeholder border-0"
                          value={docUploadRequest.newPostalCodeMail}
                          placeholder={"Select ID Type"}
                        >
                          {getAllpostalCode &&
                            getAllpostalCode?.map((option: any, index: any) => {
                              return (
                                <Option
                                  key={index}
                                  value={JSON.stringify(option)}
                                >
                                  {option.code}
                                </Option>
                              );
                            })}
                        </Select>
                      </div>
                    </div>
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        City
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newCityMail}
                          name="newCityMail"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-2 p-2">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        State
                      </label>
                      <div className="col-12 pt-1">
                        <Input
                          className="border-1 doc-uploadRequest-inputType form-control"
                          type="text"
                          value={docUploadRequest.newStateMail}
                          name="newStateMail"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="col-11 doc-uploadRequest-formColor mt-3 row d-flex flex-column IdDoc-div">
              <p className="doc-uploadRequest-homeAddress mt-1">ID Document</p>
              <p className="addressTitle">Old Id Document</p>
              <div className="d-flex">
                <div className="col-3 ms-3">
                  <label className="card-Unblock-label">ID Doc Type</label>
                  <div className="col-10 p-1 row">
                    <Input
                      type="text"
                      name="oldIdDocType1"
                      className="doc-uploadRequest-inputCode"
                      value={docUploadRequest.oldIdDocType1}
                      onChange={handleChange}
                      readOnly={true}
                    ></Input>
                  </div>
                </div>
                <div className="col-2 p-2">
                  <FormGroup>
                    <Label
                      for="exampleEmail"
                      className="doc-uploadRequest-label"
                    >
                      ID Doc Number
                    </Label>
                    <Input
                      type="text"
                      name="oldIdDocNumber1"
                      className="doc-uploadRequest-inputCode"
                      placeholder="Enter Card L4D"
                      value={docUploadRequest.oldIdDocNumber1}
                      onChange={handleChange}
                      readOnly={true}
                    ></Input>
                  </FormGroup>
                </div>
                {docUploadRequest.oldIssueDate === undefined ? (
                  <div className="col-2 p-2">
                    <FormGroup>
                      <Label
                        for="exampleEmail"
                        className="doc-uploadRequest-label"
                      >
                        ID Doc Issue Date
                      </Label>
                      <Input
                        type="date"
                        name="oldIssueDate"
                        className="doc-uploadReID Doc Numberquest-inputCode"
                        onChange={handleChange}
                        value={docUploadRequest.oldIssueDate}
                        readOnly={true}
                      ></Input>
                    </FormGroup>
                  </div>
                ) : (
                  ""
                )}
                {docUploadRequest.oldExpairyDate === undefined ? (
                  <div className="col-2 p-2">
                    <FormGroup>
                      <Label
                        for="exampleEmail"
                        className="doc-uploadRequest-label"
                      >
                        {" "}
                        ID Doc Expiry Date
                      </Label>
                      <Input
                        type="date"
                        name="oldExpairyDate"
                        className="doc-uploadRequest-inputCode"
                        value={docUploadRequest.oldExpairyDate}
                        onChange={handleChange}
                        readOnly={true}
                      ></Input>
                    </FormGroup>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="row ms-1">
                {frontImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3">
                    <label className="doc-uploadRequest-label">
                      {" "}
                      ID Doc Front
                    </label>
                    <div className="col cus-img-view">
                      <img
                        src={frontImg}
                        alt=""
                        className="cus-img-view bg-light"
                      />
                    </div>
                  </div>
                )}
                {backImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3">
                    <label className="doc-uploadRequest-label">
                      {" "}
                      ID Doc Back
                    </label>
                    <div className="col cus-img-view">
                      <img
                        src={backImg}
                        alt=""
                        className="cus-img-view bg-light"
                      />
                    </div>
                  </div>
                )}
              </div>

              {docUploadRequest.checkIdDoc === true && (
                <>
                  <p className="addressTitle">New Id Document</p>
                  <div className="d-flex">
                    <div className="col-3 ms-3">
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
                          value={docUploadRequest.newIdDocType1}
                          placeholder={"Select ID Type"}
                        >
                          {getDocUploadIdtypes?.data &&
                            getDocUploadIdtypes?.data?.map(
                              (option: any, index: any) => {
                                return (
                                  <Option
                                    key={index}
                                    value={JSON.stringify(option)}
                                  >
                                    {option.idtypeCodeDescription}
                                  </Option>
                                );
                              }
                            )}
                        </Select>
                      </div>
                    </div>

                    <div className="col-2 ms-1">
                      <FormGroup>
                        <Label
                          for="exampleEmail"
                          className="doc-uploadRequest-label"
                        >
                          ID Doc Number
                        </Label>
                        <Input
                          type="text"
                          name="newIdDocNumber1"
                          className="doc-uploadRequest-inputCode"
                          placeholder="Enter ID doc Number"
                          value={docUploadRequest.newIdDocNumber1}
                          onChange={handleChange}
                        ></Input>
                      </FormGroup>
                      {docUploadRequest.newIdDocNumber1 === "" && (
                        <p
                          style={{
                            color: "crimson",
                            display: `${isError ? "block" : "none"}`,
                          }}
                        >
                          Id Doc Number Can't Empty
                        </p>
                      )}
                      {errors.idDocNumberError !== "" && (
                        <Label className="errors">
                          {errors.idDocNumberError}
                        </Label>
                      )}
                    </div>

                    {docUploadRequest.newIdDocType1 === "Passport" && (
                      <>
                        <div className="col-2 ms-1">
                          <FormGroup>
                            <Label
                              for="exampleEmail"
                              className="doc-uploadRequest-label"
                            >
                              Issue Date
                            </Label>
                            <Input
                              type="date"
                              name="isIssueDateMandatory"
                              className="doc-uploadRequest-inputCode"
                              onChange={handleChange}
                              value={docUploadRequest.isIssueDateMandatory}
                              min={Mindates}
                              max={dates}
                            ></Input>
                          </FormGroup>
                        </div>

                        <div className="col-2 ms-1">
                          <FormGroup>
                            <Label
                              for="exampleEmail"
                              className="doc-uploadRequest-label"
                            >
                              Expiry Date
                            </Label>
                            <Input
                              type="date"
                              name="isExpiryDateMandatory"
                              className="doc-uploadRequest-inputCode"
                              onChange={handleChange}
                              value={docUploadRequest.isExpiryDateMandatory}
                              min={tomorrow.toISOString().slice(0, 10)}
                            ></Input>
                          </FormGroup>
                        </div>
                      </>
                    )}

                    {docIssueDate === true && (
                      <div className="col-2 p-2">
                        <FormGroup>
                          <Label
                            for="exampleEmail"
                            className="doc-uploadRequest-label"
                          >
                            ID Doc Issue Date
                          </Label>
                          <Input
                            type="date"
                            name="newIssueDate"
                            className="doc-uploadRequest-inputCode"
                            onChange={handleChange}
                            value={docUploadRequest.newIssueDate}
                            readOnly={
                              !docUploadRequest.checkIdDoc ? true : false
                            }
                            max={new Date().toISOString().slice(0, 10)}
                          ></Input>
                        </FormGroup>
                        {docUploadRequest.newIssueDate === "" && (
                          <p
                            style={{
                              color: "crimson",
                              display: `${isError ? "block" : "none"}`,
                            }}
                          >
                            Id Doc Issue date Can't Empty
                          </p>
                        )}
                      </div>
                    )}
                    {docExpairyDate === true && (
                      <div className="col-2 p-2">
                        <FormGroup>
                          <Label
                            for="exampleEmail"
                            className="doc-uploadRequest-label"
                          >
                            ID Doc Expiry Date
                          </Label>
                          <Input
                            type="date"
                            name="newExpairyDate"
                            className="doc-uploadRequest-inputCode"
                            value={docUploadRequest.newExpairyDate}
                            onChange={handleChange}
                            min={tomorrow.toISOString().slice(0, 10)}
                          ></Input>
                        </FormGroup>
                        {docUploadRequest.newExpairyDate === "" && (
                          <p
                            style={{
                              color: "crimson",
                              display: `${isError ? "block" : "none"}`,
                            }}
                          >
                            Id Doc Issue date Can't Empty
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="row">
                <div className="col-2 mt-3 ms-0">
                  <Label
                    for="exampleEmail"
                    className="doc-uploadRequest-label ms-2"
                  >
                    OriginalDocument
                  </Label>
                  <FormGroup>
                    <Input
                      type="checkbox"
                      className="doc-uploadRequest-checkboxSize ms-2"
                      checked={docUploadRequest.isOriginalDocument}
                      name="isOriginalDocument"
                      onChange={handleChangeIdDoc}
                    ></Input>
                  </FormGroup>
                </div>
                {docUploadRequest.newIdDocType1 === "Passport" && (
                  <>
                    <div className="col-2 mt-3 ms-2">
                      <FormGroup>
                        <Label
                          for="exampleEmail"
                          className="doc-uploadRequest-label"
                        >
                          PR Status
                        </Label>
                        <Input
                          type="select"
                          name="prStatus"
                          className="doc-uploadRequest-inputCode"
                          value={docUploadRequest.prStatus}
                          onChange={handleChange}
                        >
                          <option value="">Select Pr Status</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-2 mt-3 ms-5">
                      <FormGroup>
                        <Label
                          for="exampleEmail"
                          className="doc-uploadRequest-label"
                        >
                          Visa Number
                        </Label>
                        <Input
                          type="text"
                          name="visaNumber"
                          className="doc-uploadRequest-inputCode"
                          onChange={handleChange}
                          value={docUploadRequest.visaNumber}
                        ></Input>
                        {docUploadRequest.newIdDocType1 === "Passport" &&
                          docUploadRequest.prStatus === "Y" &&
                          docUploadRequest.visaNumber === "" && (
                            <p
                              style={{
                                color: "crimson",
                                display: `${isError ? "block" : "none"}`,
                              }}
                            >
                              VisaNumber Can't be Empty
                            </p>
                          )}
                      </FormGroup>
                    </div>
                    <div className="col-3 mt-3 ms-5">
                      <FormGroup>
                        <Label
                          for="exampleEmail"
                          className="doc-uploadRequest-label"
                        >
                          Immigration VisaExpiryDate
                        </Label>
                        <Input
                          type="date"
                          name="immigrationVisaExpiryDate"
                          className="doc-uploadRequest-inputCode"
                          onChange={handleChange}
                          value={docUploadRequest.immigrationVisaExpiryDate}
                          min={tomorrow.toISOString().slice(0, 10)}
                        ></Input>
                        {docUploadRequest.newIdDocType1 === "Passport" &&
                          docUploadRequest.prStatus === "Y" &&
                          docUploadRequest.immigrationVisaExpiryDate === "" && (
                            <p
                              style={{
                                color: "crimson",
                                display: `${isError ? "block" : "none"}`,
                              }}
                            >
                              Immigration VisaExpiryDate Can't be Empty
                            </p>
                          )}
                      </FormGroup>
                    </div>
                  </>
                )}
              </div>
              {docUploadRequest.checkIdDoc === true && (
                <div className="row ms-1 mt-2">
                  {totalPicture === 1 ? (
                    <div className="col-3">
                      <label className="doc-uploadRequest-label">
                        {" "}
                        ID Doc Front
                      </label>
                      {frontFileSelected !== undefined && (
                        <img
                          className="cus-img-view bg-light imgView"
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
                            disabled={
                              docUploadRequest.checkIdDoc === true
                                ? false
                                : true
                            }
                          ></Input>
                          <span className="cursor-pointer">Upload</span>
                        </Label>
                      </div>
                      <Label>{frontFileSelected?.name}</Label>
                      {docUploadRequest.checkIdDoc === true &&
                        !frontFileSelected && (
                          <p
                            style={{
                              color: "crimson",
                              display: `${isError ? "block" : "none"}`,
                            }}
                          >
                            Please Upload Images
                          </p>
                        )}
                    </div>
                  ) : (
                    <>
                      <div className="col-3">
                        <label className="doc-uploadRequest-label">
                          {" "}
                          ID Doc Front
                        </label>
                        {frontFileSelected !== undefined && (
                          <img
                            className="cus-img-view bg-light imgView"
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
                              disabled={
                                docUploadRequest.checkIdDoc === true
                                  ? false
                                  : true
                              }
                            ></Input>
                            <span className="cursor-pointer">Upload</span>
                          </Label>
                        </div>
                        <Label>{frontFileSelected?.name}</Label>
                        {docUploadRequest.checkIdDoc === true &&
                          !frontFileSelected && (
                            <p
                              style={{
                                color: "crimson",
                                display: `${isError ? "block" : "none"}`,
                              }}
                            >
                              Please Upload Images
                            </p>
                          )}
                        <div className="pt-1"></div>

                        {errorMsg === true ? (
                          <span className="container-body-label-color">
                            {errorSize}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-3">
                        <label className="doc-uploadRequest-label">
                          {" "}
                          ID Doc Back
                        </label>
                        {backFileSelected !== undefined && (
                          <img
                            className="cus-img-view bg-light imgView"
                            src={backDocImg}
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
                              disabled={
                                docUploadRequest.checkIdDoc === true
                                  ? false
                                  : true
                              }
                            ></Input>
                            <span className="cursor-pointer">Upload</span>
                          </Label>
                        </div>
                        <Label>{backFileSelected?.name}</Label>
                        {docUploadRequest.checkIdDoc === true &&
                          !backFileSelected && (
                            <p
                              style={{
                                color: "crimson",
                                display: `${isError ? "block" : "none"}`,
                              }}
                            >
                              Please Upload Images
                            </p>
                          )}
                        <div className="pt-1"></div>

                        {errorMsg === true ? (
                          <span className="container-body-label-color">
                            {errorSize}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="col-8 d-flex ms-3 customerSignDiv">
              <div className="col-4 p-1 pt-3 signatureButtonDiv">
                <div className="col-12 d-flex">
                  {signImg !==
                    "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                    <div className="col-6 pt-3">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Existing Customer Signature
                      </label>
                      <div className="col cus-img-view">
                        <img
                          src={signImg}
                          alt=""
                          className="cus-img-view bg-light"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-4 mt-3">
                <div className="col-12 p-1 d-flex mt-3 justify-content-between">
                  {selfieImg !==
                    "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                    <div className="col-6">
                      <label className="doc-uploadRequest-label">
                        Existing Selfie
                      </label>
                      <div className="col cus-img-view">
                        <img
                          src={selfieImg}
                          alt=""
                          className="cus-img-view bg-light"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-8 d-flex ms-3 customerSignDiv">
              <div className="col-4 p-1 pt-3 signatureButtonDiv">
                {docUploadRequest.customerSignatureFile === true && (
                  <div className="col-12 d-flex">
                    <div className="col-6 pt-3">
                      <label className="doc-uploadRequest-label doc-uploadRequest-textLeft">
                        Updated Customer Signature
                      </label>
                      {customersignFileSelected !== undefined && (
                        <img
                          className="cus-img-view bg-light"
                          src={signDocImg}
                          alt=""
                        />
                      )}
                      <div className="col-12">
                        <div className="frontEyeCard eyeiconleftCard mt-3">
                          <Label>
                            <MdFileUpload type="file"></MdFileUpload>
                            <Input
                              style={{ display: "none" }}
                              type="file"
                              className="frontEyeCard"
                              onChange={signfileSelect}
                              disabled={
                                docUploadRequest.customerSignatureFile === true
                                  ? false
                                  : true
                              }
                            ></Input>
                            <span className="cursor-pointer">Upload</span>
                          </Label>
                        </div>
                        <Label>{customersignFileSelected?.name}</Label>
                        {docUploadRequest.customerSignatureFile === true &&
                          !customersignFileSelected && (
                            <p
                              style={{
                                color: "crimson",
                                display: `${isError ? "block" : "none"}`,
                              }}
                            >
                              Please Upload Images
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-4 mt-3">
                {docUploadRequest.customerSelfieFile === true && (
                  <div className="col-12 p-1 d-flex mt-3 justify-content-between">
                    <div className="col-6">
                      <label className="doc-uploadRequest-label">
                        Updated Selfie
                      </label>
                      {selfieFileSelected !== undefined && (
                        <img
                          className="cus-img-view bg-light"
                          src={selfieDocImg}
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
                            disabled={
                              docUploadRequest.customerSelfieFile === true
                                ? false
                                : true
                            }
                            onChange={selfiefileSelect}
                          ></Input>
                          <span className="cursor-pointer">Upload</span>
                        </Label>
                      </div>
                      <Label>{selfieFileSelected?.name}</Label>
                      {docUploadRequest.customerSelfieFile === true &&
                        !selfieFileSelected && (
                          <p
                            style={{
                              color: "crimson",
                              display: `${isError ? "block" : "none"}`,
                            }}
                          >
                            Please Upload Images
                          </p>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-6 pt-4">
              <div className="col-6 pt-4">
                <button
                  className={
                    btndisable
                      ? "disablebutton border-0 text-white"
                      : "SubmitCancelButton-save border-0 text-white"
                  }
                  onClick={submitHandler}
                  disabled={btndisable}
                >
                  Submit
                </button>

                <button
                  className="SubmitCancelButton-cancel border-0 ms-3"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DocUploadRequestAdd;
