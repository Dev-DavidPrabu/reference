import React, { useCallback, useEffect, useState } from "react";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Switch } from "antd";
import { useHistory, useLocation } from "react-router";
import {
  getBankReferenceData,
  getCountryReferenceData,
  getIdTypeData,
  updateCustomerProfile,
  getNationalityReferenceData,
  getOccupationReferenceData,
  getPostalCodeReferenceData,
  getSourceOfFundReferenceData,
  getSourceOfWealthReferenceData,
  getWalletLinkList,
  resetEditMessage,
  getOpsRemarksReferenceData,
  getSourceReferenceData,
  getPurposeOfCardReferenceData,
  uploadCustomerDocuments,
  getPositionHeldReferenceData,
} from "../../redux/action/CustomerEnquiryAction";
import { ApiEndPoints } from "../../Constants/Constants";
import { BsEye } from "react-icons/bs";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";
import CustomInput from "../../Components/UI/CustomInput";
import { Input, Label } from "reactstrap";
import moment from "moment";
import CustomButton from "../../Components/UI/CustomButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomValidationMessage from "../../Components/CustomValidationMessage/CustomValidationMessage";
import { MdFileUpload } from "react-icons/md";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import { Dots } from "react-activity";
import { toast } from "react-toastify";

function CustomerEnquiryEdit() {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const [isPrint, setPrint] = useState(false);
  const [expanAll, setExpandAll] = useState(true);
  const [imagePreviewInfo, setImagePreviewInfo] = useState();
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNum, setMobileNum] = useState(
    location?.state?.value?.mobileNumber?.substring(3) || ""
  );
  const [countryCode, setCountryCode] = useState(
    location?.state?.value?.mobileNumber?.substring(0, 3) || "+60"
  );
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [othersRemarks, setOthersRemarks] = useState(false);
  const [othersSource, setOthersSource] = useState(false);
  const [validationErr, setValidationErr] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [frontDocLoader, setFrontDocLoader] = useState(false);
  const [backDocLoader, setBackDocLoader] = useState(false);
  const [photoDocLoader, setPhotoDocLoader] = useState(false);
  const [defaultCompanyName, setDefaultCompanyName] = useState(false);
  const [companyNameReq, setCompanyNameReq] = useState(false);
  const [natureOFSelfEmp, setNatureOFSelfEmp] = useState(false);
  const [customerData, setCustomerData] = useState({
    customerId: location?.state?.value?.customerId,
    name: false,
    customerMobileNumber: false,
    customerWallet: false,
    documentDetails: false,
    personalProfile: false,
    employerProfile: false,
    cardProfile: false,
    riskProfile: false,
    bankProfile: false,
    opsRemarksAndSource: false,
    mmpRemitStatus: false,
    customerName: "",
    mobileNumber: "",
    accountType: "",
    accountName: "",
    kycIndiacator: "",
    isDocumentOriginal: location?.state?.value?.isDocumentOriginal,
    birthDate: "",
    gender: "",
    emailAddress: "",
    mothersMaidenName: "",
    residentAddress1: "",
    residentAddress2: "",
    residentPostcode: "",
    residentCityCode: "",
    residentCityDescription: "",
    residentStateCode: "",
    residentStateDescription: "",
    residentCountryCode: "",
    residentCountryDescription: "",
    isSameAddress: location?.state?.value?.isSameAddress ? true : false,
    mailAddress1: "",
    mailAddress2: "",
    mailCityCode: "",
    mailPostcode: "",
    mailCityDescription: "",
    mailStateCode: "",
    mailStateDescription: "",
    mailCountryCode: "",
    mailCountryDescription: "",
    mmpRemitAllowed: location?.state?.value?.mmpRemitAllowed,
    occupation: "",
    occupationDescription: "",
    natureOfBusiness: "",
    natureOfBusinessDescription: "",
    natureOfSelfEmployed: "",
    companyName: "",
    nationalityCode: "",
    nationalityCodeDescription: "",
    idTypeCode: "",
    idTypeCodeDescription: "",
    countryOfIssue: "",
    idValue: "",
    newIdDate: "",
    newIdExpiryDate: "",
    cardworksIdtypeMapping: "",
    immigrationVisaExpiryDate: "",
    purposeOfCard: "",
    sourceOfWealth: "",
    sourceOfWealthDescription: "",
    sourceOfFund: "",
    sourceOfFundDescription: "",
    bankName: "",
    bankAccountNo: "",
    opsRemarks: "",
    source: "",
    remarks: location?.state?.value?.remarks || "", 
    frontDocumentContent: location?.state?.value?.frontDocumentContent,
    backDocumentContent: location?.state?.value?.backDocumentContent,
    photoContent: location?.state?.value?.photoContent,
  });

  const [customerDataErr, setCustomerDataErr] = useState({
    emailAddressErr: "",
    idValueErr: "",
    idTypeCodeErr: "",
    countryOfIssueErr: "",
    newIdDateErr: "",
    idExpiryDateErr: "",
    visaExpiryDateErr: "",
    natureOfBusinessErr: "",
    natureOfSelfEmployedErr: "",
    companyNameErr: "",
  });

  const [idTypeData, setIdTypeData] = useState<any>({});
  const updateCustomerDetails: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.updateCustomerError
  );

  const walletLinkList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getAllWalletLinkList
  );

  let postalCodeList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getPostalCodeList
  );
  postalCodeList = postalCodeList?.data?.sort(
    (a: any, b: any) => parseInt(a?.code) - parseInt(b?.code)
  );

  const occupationList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getOccupationList
  );
  const nationalityList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getNationalityList
  );
  const sourceOfFundList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getSourceOfFundList
  );
  const sourceOfWealthList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getSourceOfWealthList
  );
  const bankList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getBankList
  );
  const countryList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getCountryList
  );
  const idTypeDataList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getIdTypeList
  );
  const opsRemarksList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getOpsRemarksList
  );
  const sourceList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getSourceList
  );
  const purposeOfCardList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getPurposeOfCardList
  );
  const positionHeldList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getPositionHeldList
  );
  let customerDetail = location?.state?.value;

  const fetchWalletLinkList = useCallback(async () => {
    try {
      dispatch(
        getWalletLinkList(location?.state?.value?.customerWalletDto?.walletType)
      );
    } catch (err) {}
  }, [dispatch]);

  const fetchPostalCodeList = useCallback(async () => {
    try {
      dispatch(getPostalCodeReferenceData("postalcode"));
    } catch (err) {}
  }, [dispatch]);

  const fetchOccupationList = useCallback(async () => {
    try {
      dispatch(getOccupationReferenceData("occupation"));
    } catch (err) {}
  }, [dispatch]);

  const fetchNationalityList = useCallback(async () => {
    try {
      dispatch(getNationalityReferenceData("nationality"));
    } catch (err) {}
  }, [dispatch]);

  const fetchSourceOfFundList = useCallback(async () => {
    try {
      dispatch(getSourceOfFundReferenceData("sourceoffund"));
    } catch (err) {}
  }, [dispatch]);

  const fetchSourceOfWealthList = useCallback(async () => {
    try {
      dispatch(getSourceOfWealthReferenceData("sourceofwealth"));
    } catch (err) {}
  }, [dispatch]);

  const fetchBankList = useCallback(async () => {
    try {
      dispatch(getBankReferenceData("bank"));
    } catch (err) {}
  }, [dispatch]);

  const fetchCountryList = useCallback(async () => {
    try {
      dispatch(getCountryReferenceData("country"));
    } catch (err) {}
  }, [dispatch]);

  const fetchIdTypeList = useCallback(async () => {
    try {
      dispatch(getIdTypeData(location?.state?.value?.nationalityCode));
    } catch (err) {}
  }, [dispatch]);

  const fetchOpsRemarksList = useCallback(async () => {
    try {
      dispatch(getOpsRemarksReferenceData("opsremarks"));
    } catch (err) {}
  }, [dispatch]);

  const fetchSourceList = useCallback(async () => {
    try {
      dispatch(getSourceReferenceData("source"));
    } catch (err) {}
  }, [dispatch]);

  const fetchPurposeOfCardList = useCallback(async () => {
    try {
      dispatch(getPurposeOfCardReferenceData("purposeofcard"));
    } catch (err) {}
  }, [dispatch]);

  const fetchPositionHeldList = useCallback(async () => {
    try {
      dispatch(getPositionHeldReferenceData("positionheld"));
    } catch (err) {}
  }, [dispatch]);

  const resetApiData = useCallback(async () => {
    try {
      dispatch(resetEditMessage());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchWalletLinkList();
    fetchPostalCodeList();
    fetchOccupationList();
    fetchNationalityList();
    fetchSourceOfFundList();
    fetchSourceOfWealthList();
    fetchBankList();
    fetchCountryList();
    fetchIdTypeList();
    fetchOpsRemarksList();
    fetchSourceList();
    fetchPurposeOfCardList();
    fetchPositionHeldList();
  }, [
    fetchWalletLinkList,
    fetchPostalCodeList,
    fetchOccupationList,
    fetchNationalityList,
    fetchSourceOfFundList,
    fetchSourceOfWealthList,
    fetchBankList,
    fetchCountryList,
    fetchIdTypeList,
    fetchOpsRemarksList,
    fetchSourceList,
    fetchPurposeOfCardList,
    fetchPositionHeldList,
  ]);

  useEffect(() => {
    if (updateCustomerDetails?.message) {
      setIsLoading(false);
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditMessage());
      }, 7000);
    } else if (updateCustomerDetails?.data) {
      setIsLoading(false);
      history.push({
        pathname: "/dashboard/KYC-Customer-Enquiry",
      });
    }
  }, [updateCustomerDetails]);

  useEffect(() => {
    if (idTypeData) {
      if (idTypeDataList?.data && Object.keys(idTypeData).length === 0) {
        const idTypeTemp = idTypeDataList?.data?.find(
          (e: any) => location?.state?.value?.idTypeCode === e?.idtypeCode
        );
        setIdTypeData(idTypeTemp);
      }
    }
  });

  useEffect(() => {
    if (occupationList?.data) {
      const occupationTemp = occupationList?.data?.find((e: any) =>
        customerData?.occupation?.length === 0
          ? customerDetail?.occupation === e?.code
          : customerData?.occupation === e?.code
      );
      if (occupationTemp) {
        if (occupationTemp?.value5?.toLowerCase() === "yes") {
          setDefaultCompanyName(true);
          setCompanyNameReq(false);
          setNatureOFSelfEmp(false);
        } else if (occupationTemp?.value1?.toLowerCase() === "yes") {
          setDefaultCompanyName(false);
          setCompanyNameReq(true);
          setNatureOFSelfEmp(false);
        } else {
          setDefaultCompanyName(false);
          setCompanyNameReq(false);
          setNatureOFSelfEmp(true);
        }
      }
    }
  });

  const handle_CustomerName_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerData({
      ...customerData,
      customerName: e.target.value,
      name: true,
    });
  };

  const handle_MobileNo_onChange = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setCustomerData({ ...customerData, customerMobileNumber: true });
    setMobileNum(onlyNums);
  };

  const handle_AccountType_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const accountTypeData = JSON.parse(e.target.value);
    setCustomerData({
      ...customerData,
      accountType: accountTypeData?.accountTypeCode,
      accountName: accountTypeData?.accountName,
      kycIndiacator: accountTypeData?.cardWorksKycIndicator,
      isDocumentOriginal: accountTypeData?.walletLevel === "ONE" ? "N" : "Y",
      customerWallet: true,
    });
  };

  const handle_PersonalDetails_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
      personalProfile: true,
    });
    customerDetail[e.target.name] = e.target.value;
  };

  const handle_ResidentPostalCode_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const residentPostcodeData = JSON.parse(e?.target?.value);
    setCustomerData({
      ...customerData,
      residentPostcode: residentPostcodeData?.code,
      residentCityCode: residentPostcodeData?.value1,
      residentStateCode: residentPostcodeData?.value2,
      residentCountryCode: residentPostcodeData?.value4,
      residentCountryDescription: residentPostcodeData?.value3,
      personalProfile: true,
    });
    customerDetail.residentPostcode = residentPostcodeData?.code;
    customerDetail.residentCityCode = residentPostcodeData?.value1;
    customerDetail.residentStateCode = residentPostcodeData?.value2;
    customerDetail.residentCountryDescription = residentPostcodeData?.value3;
  };

  const handle_MailPostalCode_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const mailPostcodeData = JSON.parse(e?.target?.value);
    setCustomerData({
      ...customerData,
      mailPostcode: mailPostcodeData?.code,
      mailCityCode: mailPostcodeData?.value1,
      mailStateCode: mailPostcodeData?.value2,
      mailCountryCode: mailPostcodeData?.value4,
      mailCountryDescription: mailPostcodeData?.value3,
      personalProfile: true,
    });
    customerDetail.mailPostcode = mailPostcodeData?.code;
    customerDetail.mailCityCode = mailPostcodeData?.value1;
    customerDetail.mailStateCode = mailPostcodeData?.value2;
    customerDetail.mailCountryDescription = mailPostcodeData?.value3;
  };

  const handle_AddressFlag_onChange = () => {
    setCustomerData({
      ...customerData,
      isSameAddress: !customerData.isSameAddress,
      mailAddress1: customerDetail?.residentAddress1,
      mailAddress2: customerDetail?.residentAddress2,
      mailPostcode: customerDetail?.residentPostcode,
      mailCityCode: customerDetail?.residentCityCode,
      mailStateCode: customerDetail?.residentStateCode,
      mailCountryCode: customerDetail?.residentCountryCode,
      mailCountryDescription: customerDetail?.residentCountryDescription,
      personalProfile: true,
    });
    customerDetail.mailAddress1 = customerDetail?.residentAddress1;
    customerDetail.mailAddress2 = customerDetail?.residentAddress2;
    customerDetail.mailPostcode = customerDetail?.residentPostcode;
    customerDetail.mailCityCode = customerDetail?.residentCityCode;
    customerDetail.mailStateCode = customerDetail?.residentStateCode;
    customerDetail.mailCountryDescription =
      customerDetail?.residentCountryDescription;
  };

  const handle_Occupation_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const occupationData = JSON.parse(e?.target?.value);
    if (occupationData?.value5?.toLowerCase() === "yes") {
      setCustomerData({
        ...customerData,
        occupation: occupationData?.code,
        occupationDescription: occupationData?.description,
        companyName: occupationData?.description,
        natureOfBusiness: "",
        natureOfBusinessDescription: "",
        natureOfSelfEmployed: "",
        employerProfile: true,
      });
      setDefaultCompanyName(true);
      setCompanyNameReq(false);
      setNatureOFSelfEmp(false);
    } else if (occupationData?.value1?.toLowerCase() === "yes") {
      setCustomerData({
        ...customerData,
        occupation: occupationData?.code,
        occupationDescription: occupationData?.description,
        companyName: "",
        natureOfBusiness: "",
        natureOfBusinessDescription: "",
        natureOfSelfEmployed: "",
        employerProfile: true,
      });
      setDefaultCompanyName(false);
      setCompanyNameReq(true);
      setNatureOFSelfEmp(false);
    } else {
      setCustomerData({
        ...customerData,
        occupation: occupationData?.code,
        occupationDescription: occupationData?.description,
        companyName: "",
        natureOfBusiness: "",
        natureOfBusinessDescription: "",
        natureOfSelfEmployed: "",
        employerProfile: true,
      });
      setDefaultCompanyName(false);
      setCompanyNameReq(false);
      setNatureOFSelfEmp(true);
    }
    customerDetail.natureOfBusiness = "";
    customerDetail.natureOfBusinessDescription = "";
    customerDetail.natureOfSelfEmployed = "";
    customerDetail.companyName = "";
  };

  const handle_NatureOfJob_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const natureOfJobData = JSON.parse(e?.target?.value);
    customerDetail.companyName = "";
    setCustomerData({
      ...customerData,
      natureOfBusiness: natureOfJobData?.code,
      natureOfBusinessDescription: natureOfJobData?.description,
      companyName: "",
      employerProfile: true,
    });
  };

  const handle_CompanyName_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
      employerProfile: true,
    });
  };

  const handle_Nationality_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nationalityData = JSON.parse(e?.target?.value);
    setCustomerData({
      ...customerData,
      nationalityCode: nationalityData?.code,
      nationalityCodeDescription: nationalityData?.description,
      cardworksIdtypeMapping: "",
      countryOfIssue: "",
      idValue: "",
      newIdDate: "",
      newIdExpiryDate: "",
      immigrationVisaExpiryDate: "",
      documentDetails: true,
    });
    customerDetail.idTypeCodeDescription = "";
    customerDetail.countryOfIssue = "";
    customerDetail.idValue = "";
    customerDetail.newIdDate = "";
    customerDetail.newIdExpiryDate = "";
    customerDetail.immigrationVisaExpiryDate = "";
    dispatch(getIdTypeData(nationalityData?.code));
  };

  const handle_Idtype_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idtype_Data = JSON.parse(e?.target?.value);
    setCustomerData({
      ...customerData,
      idTypeCode: idtype_Data?.idtypeCode,
      idTypeCodeDescription: idtype_Data?.idtypeCodeDescription,
      cardworksIdtypeMapping: idtype_Data?.cardworksCodeMapping,
      countryOfIssue: "",
      idValue: "",
      newIdDate: "",
      newIdExpiryDate: "",
      immigrationVisaExpiryDate: "",
      documentDetails: true,
    });
    setIdTypeData(idtype_Data);
    customerDetail.countryOfIssue = "";
    customerDetail.idValue = "";
    customerDetail.newIdDate = "";
    customerDetail.newIdExpiryDate = "";
    customerDetail.immigrationVisaExpiryDate = "";
  };

  const handle_IdTypeDates_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
      documentDetails: true,
    });
  };

  const handle_RiskProfile_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const riskProfileData = JSON.parse(e?.target?.value);
    setCustomerData({
      ...customerData,
      sourceOfWealth: riskProfileData?.code,
      sourceOfWealthDescription: riskProfileData?.description,
      riskProfile: true,
    });
  };

  const handle_purposeOfCard_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerData({
      ...customerData,
      purposeOfCard: e?.target?.value,
      cardProfile: true,
    });
  };

  const handle_sourceOfFund_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const riskProfileData = JSON.parse(e?.target?.value);
    setCustomerData({
      ...customerData,
      sourceOfFund: riskProfileData?.code,
      sourceOfFundDescription: riskProfileData?.description,
      cardProfile: true,
    });
  };

  const handle_BankProfile_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
      bankProfile: true,
    });
  };

  const handle_OPSRemarks_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "others") {
      setOthersRemarks(true);
      setCustomerData({
        ...customerData,
        [e.target.name]: "",
      });
    } else if(e.target.value === "NA"){
      setOthersRemarks(false);
      setCustomerData({
        ...customerData,
        [e.target.name]: e.target.value,
        opsRemarksAndSource: true,
      });
    } else {
      if (opsRemarksList?.data?.some((x: any) => x.code === e.target.value)) {
        setOthersRemarks(false);
      }
      setCustomerData({
        ...customerData,
        [e.target.name]: e.target.value,
        opsRemarksAndSource: true,
      });
    }
  };

  const handle_Source_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "others") {
      setOthersSource(true);
      setCustomerData({
        ...customerData,
        [e.target.name]: "",
      });
    } else if(e.target.value === "NA"){
      setOthersSource(false);
      setCustomerData({
        ...customerData,
        [e.target.name]: e.target.value,
        opsRemarksAndSource: true,
      });
    } else {
      if (sourceList?.data?.some((x: any) => x.code == e.target.value)) {
        setOthersSource(false);
      }
      setCustomerData({
        ...customerData,
        [e.target.name]: e.target.value,
        opsRemarksAndSource: true,
      });
    }
  };

  const handle_Remarks_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData({ ...customerData, opsRemarksAndSource: true, [e.target.name]: e.target.value });
  };

  const handle_MMPRemitAllowed_onChange = () => {
    setCustomerData({
      ...customerData,
      mmpRemitStatus: true,
      mmpRemitAllowed: !customerData?.mmpRemitAllowed,
    });
  };

  let lastDot,
    ext = "";
  const fileUploadValidation = (e: any) => {
    var files = e.target.files,
      fileExt = files[0];
    lastDot = fileExt?.name?.lastIndexOf(".");
    ext = fileExt?.name?.substring(lastDot + 1);
    if (
      ext === "jpg" ||
      ext === "jpeg" ||
      ext === "png" ||
      ext === "svg" ||
      ext === "tiff" ||
      ext === "tif" ||
      ext === "bmp" ||
      ext === "gif" ||
      ext === "pdf"
    ) {
      setFileUploadError(false);
      if (e.target.name === "idFrontDocumentFile") {
        setFrontDocLoader(true);
      } else if (e.target.name === "idBackDocumentFile") {
        setBackDocLoader(true);
      } else {
        setPhotoDocLoader(true);
      }
      return true;
    } else {
      setFileUploadError(true);
      return false;
    }
  };

  const handle_FileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fileUploadValidation(e)) {
      const dataValue: any = new FormData();
      const fileData = e.target.files;
      if (fileData) {
        dataValue.append(e.target.name, fileData[0]);
        await uploadCustomerDocuments(dataValue)
          .then((response: any) => {
            if (response?.data) {
              if (e.target.name === "idFrontDocumentFile") {
                setFrontDocLoader(false);
                setCustomerData({
                  ...customerData,
                  documentDetails: true,
                  frontDocumentContent: response?.data[0]?.contentCode,
                });
              } else if (e.target.name === "idBackDocumentFile") {
                setBackDocLoader(false);
                setCustomerData({
                  ...customerData,
                  documentDetails: true,
                  backDocumentContent: response?.data[0]?.contentCode,
                });
              } else {
                setPhotoDocLoader(false);
                setCustomerData({
                  ...customerData,
                  documentDetails: true,
                  photoContent: response?.data[0]?.contentCode,
                });
              }
              toast.success("Image uploaded successfully.");
            }
          })
          .catch((err) => {
            return err;
          });
      }
    }
  };

  const validate = () => {
    let emailAddress = customValidator(
      "emailAddressCustomerEdit",
      "Email Address",
      customerData?.emailAddress?.length === 0
        ? customerDetail?.emailAddress
        : customerData?.emailAddress
    );
    let idValueErr = customValidator(
      "customerEditMandatoryFields",
      "ID Value",
      customerData?.idValue?.length === 0
        ? customerDetail?.idValue
        : customerData?.idValue
    );

    let idTypeCodeErr = customValidator(
      "customerEditMandatoryFields",
      "ID Value",
      customerData?.idTypeCodeDescription?.length === 0
        ? customerDetail?.idTypeCodeDescription
        : customerData?.idTypeCodeDescription
    );

    let countryOfIssue = customValidator(
      "customerEditMandatoryFields",
      "Country Of Issue",
      idTypeData?.idtypeCode === "Passport"
        ? customerData?.countryOfIssue?.length === 0
          ? customerDetail?.countryOfIssue
          : customerData?.countryOfIssue
        : "null"
    );

    let newIdDateErr = customValidator(
      "customerEditMandatoryFields",
      "New Id Date",
      idTypeData?.isIssueDateMandatory
        ? customerData?.newIdDate?.length === 0
          ? customerDetail?.newIdDate
          : customerData?.newIdDate
        : "null"
    );

    let idExpiryDateErr = customValidator(
      "customerEditMandatoryFields",
      "Id Expiry Date",
      idTypeData?.isExpiryDateMandatory
        ? customerData?.newIdExpiryDate?.length === 0
          ? customerDetail?.newIdExpiryDate
          : customerData?.newIdExpiryDate
        : "null"
    );
    let visaExpiryDateErr = customValidator(
      "customerEditMandatoryFields",
      "Visa Expiry Date",
      idTypeData?.idtypeCode === "Passport"
        ? customerData?.immigrationVisaExpiryDate?.length === 0
          ? customerDetail?.immigrationVisaExpiryDate
          : customerData?.immigrationVisaExpiryDate
        : "null"
    );

    let natureOfBusinessErr = customValidator(
      "customerEditMandatoryFields",
      "Nature Of Job",
      companyNameReq
        ? customerData?.natureOfBusiness?.length === 0
          ? customerDetail?.natureOfBusiness
          : customerData?.natureOfBusiness
        : "null"
    );

    let natureOfSelfEmployedErr = customValidator(
      "customerEditMandatoryFields",
      "Nature Of Self Employement",
      natureOFSelfEmp
        ? customerData?.natureOfSelfEmployed?.length === 0
          ? customerDetail?.natureOfSelfEmployed
          : customerData?.natureOfSelfEmployed
        : "null"
    );

    let companyNameErr = customValidator(
      "customerEditMandatoryFields",
      "Company Name",
      companyNameReq
        ? customerData?.companyName?.length === 0
          ? customerDetail?.companyName
          : customerData?.companyName
        : "null"
    );

    if (
      (customerData?.documentDetails && idValueErr !== "null") ||
      (customerData?.documentDetails && idTypeCodeErr !== "null") ||
      (customerData?.documentDetails && countryOfIssue !== "null") ||
      (customerData?.emailAddress?.length > 0 && emailAddress !== "null") ||
      (idTypeData?.isIssueDateMandatory && newIdDateErr !== "null") ||
      (idTypeData?.isExpiryDateMandatory && idExpiryDateErr !== "null") ||
      (idTypeData?.idtypeCode === "Passport" && visaExpiryDateErr !== "null") ||
      (companyNameReq && natureOfBusinessErr !== "null") ||
      (natureOFSelfEmp && natureOfSelfEmployedErr !== "null") ||
      (companyNameReq && companyNameErr !== "null")
    ) {
      setCustomerDataErr({
        ...customerDataErr,
        emailAddressErr: emailAddress,
        idValueErr: idValueErr,
        idTypeCodeErr: idTypeCodeErr,
        countryOfIssueErr: countryOfIssue,
        newIdDateErr: newIdDateErr,
        idExpiryDateErr: idExpiryDateErr,
        visaExpiryDateErr: visaExpiryDateErr,
        natureOfBusinessErr: natureOfBusinessErr,
        natureOfSelfEmployedErr: natureOfSelfEmployedErr,
        companyNameErr: companyNameErr,
      });
      setValidationErr(true);
      return false;
    } else {
      setCustomerDataErr({
        emailAddressErr: "",
        idValueErr: "",
        idTypeCodeErr: "",
        countryOfIssueErr: "",
        newIdDateErr: "",
        idExpiryDateErr: "",
        visaExpiryDateErr: "",
        natureOfBusinessErr: "",
        natureOfSelfEmployedErr: "",
        companyNameErr: "",
      });
      setValidationErr(false);
      return true;
    }
  };

  const validate_mobileNumber = () => {
    if (countryCode === "+60") {
      if (mobileNum?.length < 9 || mobileNum?.length > 13) {
        setMobileNumErr(true);
        setValidationErr(true);
        return false;
      } else {
        customerData.mobileNumber = mobileNo;
        setMobileNumErr(false);
        setValidationErr(false);
        return true;
      }
    } else {
      if (mobileNum.length >= 5) {
        customerData.mobileNumber = mobileNo;
        setMobileNumErr(false);
        setValidationErr(false);
        return true;
      } else {
        setMobileNumErr(true);
        setValidationErr(true);
        return false;
      }
    }
  };

  const handle_Customer_onSubmit = () => {
    if (customerData?.customerMobileNumber) {
      if (validate_mobileNumber()) {
        if (validate()) {
          dispatch(updateCustomerProfile(customerData));

          setIsLoading(true);
        }
      }
    } else {
      if (validate()) {
        dispatch(updateCustomerProfile(customerData));

        setIsLoading(true);
      }
    }
  };

  const handleBack = async () => {
    resetApiData().then(() => {
      setApiMessage(false);
      history.goBack();
    });
  };

  const handlePrint = (data: any) => {
    setPrint(true);
  };

  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };

  const closeMessage = () => {
    resetApiData().then(() => {
      setApiMessage(false);
    });
  };

  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  return (
    <div className="CustomerEnquiryEdit">
      <CommonEditSummary
        name={"Edit Customer Profile"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        print={true}
        handlePrint={handlePrint}
        backCustomer={handleBack}
      >
        {false && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeMessage}
              message={
                updateCustomerDetails?.error +
                " " +
                updateCustomerDetails?.message
              }
            />
          </div>
        )}
        <div className="p-3">
          <CustomAccordion
            ExpandAll={expanAll}
            eventKey="0"
            header="Customer"
            print={isPrint}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Customer ID</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerId}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Title</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.titleDescription}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Name</label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="customerName"
                      defaultValue={customerDetail?.customerName}
                      onChange={handle_CustomerName_onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Mobile No</label>
                  </div>
                  <div className="col me-2">
                    <div className="col d-flex">
                      <div className="col-3 me-1">
                        <div className="col-11">
                          <Input
                            name="countryCode"
                            type="select"
                            className="Kyc-FilterINputBox form-input"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                          >
                            <option>+60</option>
                            <option>+65</option>
                            <option>+91</option>
                          </Input>
                        </div>
                      </div>
                      <div className="col-8 me-2">
                        <div className="col me-2">
                          <Input
                            name="mobileNo"
                            type="text"
                            value={mobileNum}
                            className={
                              mobileNumErr
                                ? "validation-error kyc-noBorder"
                                : "Kyc-FilterINputBox form-input"
                            }
                            placeholder="mobile number"
                            onChange={handle_MobileNo_onChange}
                            maxLength={15}
                            minLength={5}
                          ></Input>
                          {mobileNumErr && (
                            <Label className="text-red">
                              Invalid Mobile Number.
                            </Label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Customer Category
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerGroupDescription}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Date of Onboarding
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.dateOfOnboarding}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Wallet Size Name
                    </label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="accountType"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_AccountType_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.customerWalletDto?.accountTypeName}
                      </option>
                      {walletLinkList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={JSON.stringify(e)}>
                            {e.accountName}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>

                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Profile Status
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={
                        customerDetail?.statusCode === "A"
                          ? "ACTIVE"
                          : "INACTIVE"
                      }
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CustomAccordion>
          <CustomAccordion
            eventKey="1"
            header="Personal Profile"
            print={isPrint}
            ExpandAll={expanAll}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Date of Birth
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className=" edit-sum-input form-control"
                      defaultValue={customerDetail?.birthDate}
                      type="date"
                      name={"birthDate"}
                      onChange={handle_PersonalDetails_onChange}
                      max={moment().format("YYYY-MM-DD")}
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Gender</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="gender"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_PersonalDetails_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.gender}
                      </option>
                      <option>M</option>
                      <option>F</option>
                    </Input>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Marital Status
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.maritalStatus}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Race</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.raceDescription}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Email Address
                    </label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="emailAddress"
                      defaultValue={customerDetail?.emailAddress}
                      onChange={handle_PersonalDetails_onChange}
                    />
                    {customerDataErr?.emailAddressErr &&
                      customerDataErr.emailAddressErr !== "null" && (
                        <Label className="text-red">
                          {customerDataErr?.emailAddressErr}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Mother's Maiden Name
                    </label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="mothersMaidenName"
                      defaultValue={customerDetail?.mothersMaidenName}
                      onChange={handle_PersonalDetails_onChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="me-2 my-5">
              <label className="seperaterLabel">Residential Address</label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Address Line 1
                    </label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="residentAddress1"
                      defaultValue={customerDetail?.residentAddress1}
                      onChange={handle_PersonalDetails_onChange}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Address Line 2
                    </label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="residentAddress2"
                      defaultValue={customerDetail?.residentAddress2}
                      onChange={handle_PersonalDetails_onChange}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Postal Code</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="residentPostcode"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_ResidentPostalCode_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.residentPostcode}
                      </option>
                      {postalCodeList?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={JSON.stringify(e)}>
                            {e.code}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">City</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.residentCityCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">State</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.residentStateCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Country</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.residentCountryDescription}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex pt-4">
                <div className="col me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Mailing Address same as Residential Address
                    </label>
                  </div>
                  <div className="col me-2 mt-2">
                    <Switch
                      className="toggle-switch"
                      checkedChildren="Yes"
                      unCheckedChildren="NO"
                      checked={customerData?.isSameAddress}
                      onChange={handle_AddressFlag_onChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="me-2 my-5">
              <label className="seperaterLabel">Mailing Address</label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Address Line 1
                    </label>
                  </div>
                  <div className="col me-2">
                    {customerData?.isSameAddress ? (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.mailAddress1}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges customerEdit-inputBox"
                        name="mailAddress1"
                        defaultValue={customerDetail?.mailAddress1}
                        onChange={handle_PersonalDetails_onChange}
                      />
                    )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Address Line 2
                    </label>
                  </div>
                  <div className="col me-2">
                    {customerData?.isSameAddress ? (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.mailAddress2}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges customerEdit-inputBox"
                        name="mailAddress2"
                        defaultValue={customerDetail?.mailAddress2}
                        onChange={handle_PersonalDetails_onChange}
                      />
                    )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Postal Code</label>
                  </div>
                  <div className="col me-2">
                    {customerData?.isSameAddress ? (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.mailPostcode}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="mailPostcode"
                        style={{
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_MailPostalCode_onChange}
                      >
                        <option selected hidden className="cursor">
                          {customerDetail?.mailPostcode}
                        </option>
                        {postalCodeList?.map((e: any, i: number) => {
                          return (
                            <option key={i} value={JSON.stringify(e)}>
                              {e.code}
                            </option>
                          );
                        })}
                      </Input>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">City</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.mailCityCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">State</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.mailStateCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Country</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.mailCountryDescription}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CustomAccordion>
          <CustomAccordion
            eventKey="2"
            header="Employer Profile"
            print={isPrint}
            ExpandAll={expanAll}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Occupation</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="occupation"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_Occupation_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.occupationDescription}
                      </option>
                      {occupationList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={JSON.stringify(e)}>
                            {e.description}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
                {!defaultCompanyName && companyNameReq && (
                  <>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Nature of Job
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          type="select"
                          className="no-border score-dropdown remit_feesAndCharges"
                          name="natureOfBusinessDescription"
                          style={{
                            width: "91%",
                            minWidth: "150px",
                            borderRadius: "0px",
                            height: "35px",
                          }}
                          onChange={handle_NatureOfJob_onChange}
                        >
                          <option selected hidden className="cursor">
                            {customerDetail?.natureOfBusinessDescription}
                          </option>
                          {positionHeldList?.data?.map((e: any, i: number) => {
                            return (
                              <option key={i} value={JSON.stringify(e)}>
                                {e.description}
                              </option>
                            );
                          })}
                        </Input>
                        {customerDataErr?.natureOfBusinessErr &&
                          customerDataErr.natureOfBusinessErr !== "null" && (
                            <Label className="text-red">
                              {customerDataErr?.natureOfBusinessErr}
                            </Label>
                          )}
                      </div>
                    </div>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Company Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <CustomInput
                          type="text"
                          className="no-border remit_feesAndCharges customerEdit-inputBox"
                          name="companyName"
                          defaultValue={customerDetail?.companyName}
                          value={
                            customerData?.companyName?.length === 0
                              ? customerDetail?.companyName
                              : customerData?.companyName
                          }
                          onChange={handle_CompanyName_onChange}
                        />
                        {customerDataErr?.companyNameErr &&
                          customerDataErr.companyNameErr !== "null" && (
                            <Label className="text-red">
                              {customerDataErr?.companyNameErr}
                            </Label>
                          )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {!defaultCompanyName && natureOFSelfEmp && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-9 d-flex">
                  <div className="col-4 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Nature of Self Employment
                      </label>
                    </div>
                    <div className="col me-2">
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges customerEdit-inputBox"
                        name="natureOfSelfEmployed"
                        defaultValue={customerDetail?.natureOfSelfEmployed}
                        onChange={handle_CompanyName_onChange}
                      />
                      {customerDataErr?.natureOfSelfEmployedErr &&
                        customerDataErr.natureOfSelfEmployedErr !== "null" && (
                          <Label className="text-red">
                            {customerDataErr?.natureOfSelfEmployedErr}
                          </Label>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CustomAccordion>
          <CustomAccordion
            ExpandAll={expanAll}
            eventKey="3"
            header="ID Profile"
            print={isPrint}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Nationality</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="nationalityCode"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_Nationality_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.nationalityCodeDescription}
                      </option>
                      {nationalityList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={JSON.stringify(e)}>
                            {e?.description}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">ID Type</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="idTypeCodeDescription"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_Idtype_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.idTypeCodeDescription}
                      </option>
                      {idTypeDataList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={JSON.stringify(e)}>
                            {e.idtypeCodeDescription}
                          </option>
                        );
                      })}
                    </Input>
                    {customerDataErr?.idTypeCodeErr &&
                      customerDataErr.idTypeCodeErr !== "null" && (
                        <Label className="text-red">
                          {customerDataErr?.idTypeCodeErr}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">ID Number</label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="idValue"
                      key={customerDetail?.idValue}
                      defaultValue={customerDetail?.idValue}
                      onChange={handle_IdTypeDates_onChange}
                    />
                    {customerDataErr?.idValueErr &&
                      customerDataErr?.idValueErr !== "null" && (
                        <Label className="text-red">
                          {customerDataErr?.idValueErr}
                        </Label>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Country of Issue
                    </label>
                  </div>
                  <div className="col me-2">
                    {idTypeData?.idtypeCode != "Passport" ? (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.countryOfIssue}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="countryOfIssue"
                        style={{
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_IdTypeDates_onChange}
                      >
                        <option selected hidden className="cursor">
                          {customerDetail?.countryOfIssue}
                        </option>
                        {countryList?.data?.map((e: any, i: number) => {
                          return (
                            <option key={i} value={e.description}>
                              {e.description}
                            </option>
                          );
                        })}
                      </Input>
                    )}
                    {customerDataErr?.countryOfIssueErr &&
                      customerDataErr.countryOfIssueErr !== "null" && (
                        <Label className="text-red">
                          {customerDataErr?.countryOfIssueErr}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Issue Date</label>
                  </div>
                  <div className="col me-2">
                    {idTypeData?.isIssueDateMandatory ? (
                      <>
                        <input
                          className=" edit-sum-input form-control"
                          key={customerDetail}
                          defaultValue={customerDetail?.newIdDate}
                          type="date"
                          name={"newIdDate"}
                          onChange={handle_IdTypeDates_onChange}
                          max={moment().format("YYYY-MM-DD")}
                          style={{
                            width: "91%",
                            minWidth: "150px",
                            borderRadius: "0px",
                            height: "35px",
                          }}
                        />
                        {customerDataErr?.newIdDateErr &&
                          customerDataErr?.newIdDateErr !== "null" && (
                            <Label className="text-red">
                              {customerDataErr?.newIdDateErr}
                            </Label>
                          )}
                      </>
                    ) : (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.newIdDate}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Expiry Date</label>
                  </div>
                  <div className="col me-2">
                    {idTypeData?.isExpiryDateMandatory ? (
                      <>
                        <input
                          className=" edit-sum-input form-control"
                          defaultValue={customerDetail?.newIdExpiryDate}
                          key={customerDetail}
                          type="date"
                          name={"newIdExpiryDate"}
                          onChange={handle_IdTypeDates_onChange}
                          min={moment().format("YYYY-MM-DD")}
                          style={{
                            width: "91%",
                            minWidth: "150px",
                            borderRadius: "0px",
                            height: "35px",
                          }}
                        />
                        {customerDataErr?.idExpiryDateErr &&
                          customerDataErr?.idExpiryDateErr !== "null" && (
                            <Label className="text-red">
                              {customerDataErr?.idExpiryDateErr}
                            </Label>
                          )}
                      </>
                    ) : (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.newIdExpiryDate}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Visa Expiry Date
                    </label>
                  </div>
                  <div className="col me-2">
                    {idTypeData?.idtypeCode != "Passport" ? (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.immigrationVisaExpiryDate}
                        style={{
                          background: "#CFCFCF",
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <>
                        <input
                          className=" edit-sum-input form-control"
                          defaultValue={
                            customerDetail?.immigrationVisaExpiryDate
                          }
                          key={customerDetail}
                          type="date"
                          name={"immigrationVisaExpiryDate"}
                          onChange={handle_IdTypeDates_onChange}
                          min={moment().format("YYYY-MM-DD")}
                          style={{
                            width: "91%",
                            minWidth: "150px",
                            borderRadius: "0px",
                            height: "35px",
                          }}
                        />
                        {customerDataErr?.visaExpiryDateErr &&
                          customerDataErr.visaExpiryDateErr !== "null" && (
                            <Label className="text-red">
                              {customerDataErr?.visaExpiryDateErr}
                            </Label>
                          )}
                      </>
                    )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">PR Status</label>
                  </div>
                  <div className="col me-2">
                    <div className="my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={customerDetail?.prStatus === "Y" ? true : false}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Is Document Original
                    </label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerData?.isDocumentOriginal === "Y" ? true : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="me-2 my-5">
              <label className="seperaterLabel">Document Image</label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Front ID Image
                    </label>
                  </div>
                  <div className="row me-2 ps-1">
                    <div
                      className="KYC-customerImage me-2 ms-2  my-1"
                      id="frontIdUpload"
                    >
                      <Label>
                        <Input
                          type="file"
                          style={{ display: "none" }}
                          className={"Reference_textarea validation-error"}
                          name="idFrontDocumentFile"
                          onChange={handle_FileUpload}
                        />
                        <MdFileUpload
                          style={{ margin: "11px 5px", color: "white" }}
                        />
                        <CustomTooltip target="frontIdUpload">
                          Upload
                        </CustomTooltip>
                      </Label>
                    </div>
                    <div
                      className="KYC-customerImage  my-1"
                      id="frontIdView"
                      onClick={() => {
                        setIsisImagePreviewEnable(!isImagePreviewEnable);
                        setImagePreviewInfo(customerData?.frontDocumentContent);
                      }}
                    >
                      <BsEye style={{ margin: "11px 5px", color: "white" }} />
                      <CustomTooltip target="frontIdView">View</CustomTooltip>
                    </div>
                  </div>
                  <div>
                    <Dots
                      color="red"
                      size={23}
                      speed={1}
                      animating={frontDocLoader}
                    />
                  </div>
                </div>

                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Back ID Image
                    </label>
                  </div>
                  <div className="row me-2 ps-1">
                    <div
                      className="KYC-customerImage me-2 ms-2  my-1"
                      id="backIdUpload"
                    >
                      <Label>
                        <Input
                          type="file"
                          style={{ display: "none" }}
                          className={"Reference_textarea validation-error"}
                          name="idBackDocumentFile"
                          onChange={handle_FileUpload}
                        />
                        <MdFileUpload
                          style={{ margin: "11px 5px", color: "white" }}
                        />
                        <CustomTooltip target="backIdUpload">
                          Upload
                        </CustomTooltip>
                      </Label>
                    </div>
                    {customerData?.backDocumentContent && (
                      <div
                        className="KYC-customerImage my-1"
                        id="backIdView"
                        onClick={() => {
                          setIsisImagePreviewEnable(!isImagePreviewEnable);
                          setImagePreviewInfo(
                            customerData?.backDocumentContent
                          );
                        }}
                      >
                        <BsEye style={{ margin: "11px 5px", color: "white" }} />
                        <CustomTooltip target="backIdView">View</CustomTooltip>
                      </div>
                    )}
                  </div>
                  <div>
                    <Dots
                      color="red"
                      size={23}
                      speed={1}
                      animating={backDocLoader}
                    />
                  </div>
                </div>

                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Selfie Image
                    </label>
                  </div>
                  <div className="row me-2 ps-1">
                    <div
                      className="KYC-customerImage me-2 ms-2  my-1"
                      id="selfieUpload"
                    >
                      <Label>
                        <Input
                          type="file"
                          style={{ display: "none" }}
                          className={"Reference_textarea validation-error"}
                          name="photoContentFile"
                          onChange={handle_FileUpload}
                        />
                        <MdFileUpload
                          style={{ margin: "11px 5px", color: "white" }}
                        />
                        <CustomTooltip target="selfieUpload">
                          Upload
                        </CustomTooltip>
                      </Label>
                    </div>
                    <div
                      className="KYC-customerImage my-1"
                      id="selfieView"
                      onClick={() => {
                        setIsisImagePreviewEnable(!isImagePreviewEnable);
                        setImagePreviewInfo(customerData?.photoContent);
                      }}
                    >
                      <BsEye style={{ margin: "11px 5px", color: "white" }} />
                      <CustomTooltip target="selfieView">View</CustomTooltip>
                    </div>
                  </div>
                  <div>
                    <Dots
                      color="red"
                      size={23}
                      speed={1}
                      animating={photoDocLoader}
                    />
                  </div>
                </div>
              </div>
              {fileUploadError && (
                <Label className="text-red mt-3">
                  *GIF, JPEG, PNG, SVG, BMP, TIFF, PDF only these file types are
                  allowed
                </Label>
              )}
            </div>
          </CustomAccordion>
          <CustomAccordion
            ExpandAll={expanAll}
            eventKey="4"
            header="Card Profile"
            print={isPrint}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Brand Name</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.walletType}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Card Type</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.cardType}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Card Number</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={
                        customerDetail?.customerWalletDto?.panLastFourdigits
                      }
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Name Embossed
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={
                        customerDetail?.customerWalletDto?.preferredCardName
                      }
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">URN</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.cardUrn}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">CRN</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.cardCrn}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
              <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Purpose Of Card
                    </label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="purposeOfCard"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_purposeOfCard_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.customerWalletDto?.purposeOfCard}
                      </option>
                      {purposeOfCardList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={e.code}>
                            {e.code}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Source of Fund
                    </label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="sourceOfFund"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_sourceOfFund_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.sourceOfFundDescription}
                      </option>
                      {sourceOfFundList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={JSON.stringify(e)}>
                            {e.description}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
              </div>
            </div>

            <div className="me-2 my-5">
              <label className=" seperaterLabel">Code Details</label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Source Code</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.sourceCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Promo Code</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.promoCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Sales Code</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.salesCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Agent Code</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.agentCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Branch Name</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.branchName}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Referral Code
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.referralCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Referred Code
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerWalletDto?.referredCode}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="me-2 my-5">
              <label className=" seperaterLabel">Transaction Details</label>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Online Purchase
                    </label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerDetail?.customerWalletDto?.optInOutEcom == "Y"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Overseas Card Usage
                    </label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerDetail?.customerWalletDto
                            ?.optInOutOverseaRet === "Y"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Overseas ATM Withdrawals
                    </label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerDetail?.customerWalletDto
                            ?.optInOutOverseaCash === "Y"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Auto Billing Payment
                    </label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerDetail?.customerWalletDto
                            ?.optInOutDirectDebit === "Y"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Mail Order/Tel. Order Purchases</label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerDetail?.customerWalletDto?.optInOutMoto === "Y"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Visa payWave</label>
                  </div>
                  <div className="col me-2">
                    <div className=" my-1">
                      <Switch
                        disabled
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          customerDetail?.customerWalletDto?.optInOutContactLess === "Y"
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CustomAccordion>
          <CustomAccordion
            ExpandAll={expanAll}
            eventKey="5"
            header="Risk Profile"
            print={isPrint}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">PEPS Match</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.pepsMatch}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">MSSL Match</label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.msslMatch}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      SANCTION Match
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.sanctionMatch}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                {customerDetail?.pepsMatch && (
                  <div className="col-4 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Source of Wealth
                      </label>
                    </div>
                    <div className="col me-2">
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="sourceOfWealth"
                        style={{
                          width: "91%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_RiskProfile_onChange}
                      >
                        <option selected hidden className="cursor">
                          {customerDetail?.sourceOfWealthDescription}
                        </option>
                        {sourceOfWealthList?.data?.map((e: any, i: number) => {
                          return (
                            <option key={i} value={JSON.stringify(e)}>
                              {e.description}
                            </option>
                          );
                        })}
                      </Input>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CustomAccordion>
          <CustomAccordion
            ExpandAll={expanAll}
            eventKey="6"
            header="Bank Profile"
            print={isPrint}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Bank Name</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="bankName"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_BankProfile_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.bankName}
                      </option>
                      {bankList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={e.code}>
                            {e.description}
                          </option>
                        );
                      })}
                    </Input>
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Bank Account No
                    </label>
                  </div>
                  <div className="col me-2">
                    <CustomInput
                      type="text"
                      className="no-border remit_feesAndCharges customerEdit-inputBox"
                      name="bankAccountNo"
                      defaultValue={customerDetail?.bankAccountNo}
                      onChange={handle_BankProfile_onChange}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Customer Name
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.customerName}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      RPP Account Name
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.rppAccountName}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      RPP Check Timestamp
                    </label>
                  </div>
                  <div className="col me-2">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={customerDetail?.rppCheckTimeStamp}
                      style={{
                        background: "#CFCFCF",
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CustomAccordion>
          <CustomAccordion
            ExpandAll={expanAll}
            eventKey="7"
            header="Remarks"
            print={isPrint}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-9 d-flex">
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">OPS Remarks</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="opsRemarks"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_OPSRemarks_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.opsRemarks}
                      </option>
                      {opsRemarksList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={e?.code}>
                            {e?.code}
                          </option>
                        );
                      })}
                      <option>NA</option>
                      <option>others</option>
                    </Input>
                    {othersRemarks && (
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges customerEdit-inputBox mt-2"
                        name="opsRemarks"
                        value={customerData?.opsRemarks}
                        onChange={handle_OPSRemarks_onChange}
                      />
                    )}
                  </div>
                </div>
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">Source</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="source"
                      style={{
                        width: "91%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      onChange={handle_Source_onChange}
                    >
                      <option selected hidden className="cursor">
                        {customerDetail?.source}
                      </option>
                      {sourceList?.data?.map((e: any, i: number) => {
                        return (
                          <option key={i} value={e?.code}>
                            {e?.code}
                          </option>
                        );
                      })}
                      <option>NA</option>
                      <option>others</option>
                    </Input>
                    {othersSource && (
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges customerEdit-inputBox mt-2"
                        name="source"
                        value={customerData?.source}
                        onChange={handle_Source_onChange}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CustomAccordion>
        </div>
      </CommonEditSummary>
      <div className="d-flex justify-content-end p-3 mb-3 remarks-customerEdit">
        <CustomLoader isLoading={isLoading} size={40} />
        <div className="d-flex justify-content-center ms-2 mt-3 pb-3">
          <label className="KYCViewCustomer-label customerEdit-remarkLabel ms-4 me-3">
            Remarks
          </label>
          <div className="col">
            <CustomInput
              type="text"
              className="no-border remarks-inputBox remit_feesAndCharges me-2"
              name="remarks"
              value={customerData?.remarks}
              onChange={handle_Remarks_onChange}
            />
          </div>
          <CustomButton
            color="danger Reference-DefaultButton customerEdit-btn"
            className="btn2"
            onClick={handle_Customer_onSubmit}
          >
            Submit
          </CustomButton>
          <CustomButton
            color="secondary referenceData-cancelButton customerEdit-btn"
            className="btn2"
            component={"payrollEnquiry"}
            onClick={handleBack}
          >
            Cancel
          </CustomButton>
        </div>
      </div>
      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={
              updateCustomerDetails?.error +
              " " +
              updateCustomerDetails?.message
            }
          />
        </div>
      )}
      {validationErr && (
        <div className="px-3">
          <CustomValidationMessage
            closeMessage={closeMessage}
            message={
              "Invalid Fields :- " +
              `${
                mobileNumErr
                  ? `Invalid Mobile Number${
                      Object.values(customerDataErr).filter(
                        (e) => e !== "null" && e !== ""
                      ).length > 0
                        ? ", "
                        : ""
                    }`
                  : ""
              }` +
              Object.values(customerDataErr)
                .filter((e) => e !== "null" && e !== "")
                .join(", ")
            }
          />
        </div>
      )}
      <ImagePreview
        showModal={isImagePreviewEnable}
        imageInfo={imagePreviewInfo}
        closeModal={exitImagePreview}
        cloudfrontUrl={ApiEndPoints.cloudfrontUrlKyc}
      ></ImagePreview>
    </div>
  );
}

export default CustomerEnquiryEdit;
