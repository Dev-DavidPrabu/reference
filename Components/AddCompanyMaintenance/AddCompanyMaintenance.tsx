import { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button, Col, Input, Label } from "reactstrap";
import "../AddCompanyMaintenance/AddCompanyMainteanance.scss";
import CustomButton from "../UI/CustomButton";
import DeleteConfirmationPopUp from "../DeletePopUp/DeleteConfirmationPopUp";
import { TiArrowBack, TiArrowBackOutline } from "react-icons/ti";
import { customValidator } from "../../Constants/Validation";
import {
  deletePayrollCompanyData,
  getAllCompanyData,
  getSelectedCompanyData,
  postNewPayrollCompanyData,
  restCreatedCompanyData,
  updatePayrollCompanyData,
} from "../../redux/action/CompanyMaintenanceAction";
import { getAllPostalCode } from "../../redux/action/StateCountryAction";
import statusIcon from "../../assets/status.svg";
import { payrollCompanyMaintenanceProps } from "../../models/PayrollCompanyMaintenanceModel";
import { getCountryReferenceData } from "../../redux/action/idTypeRoutingActions";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { getCurrentBalanceOftheCompany } from "../../redux/action/PreFundAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { Switch } from "antd";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";
import CustomLoader from "../Loader/CustomLoader";

const AddCompanyMainteanance = (props: payrollCompanyMaintenanceProps) => {
  const dispatch = useDispatch();
  const [companyMaintenanceDetails, setCompanyMaintenanceDetails] = useState({
    id: "",
    companyAccountId: "",
    companyName: "",
    companyCode: "",
    companyRegistrationNo: "",
    entityId: "12345",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    companyEmail: "",
    countryCodeNo: "+60",
    countryCode: "+60",
    companyPhoneNo: "",
    authorizerName: "",
    authorizerMobileNo: "",
    statusCode: "Active",
    remarks: "",
    functionCode: "PAYROLL_COMPANY_MAINTENANCE",
    requestDetails: "",
    isExcelHashingAllowed: false,
    isCsvHashingAllowed: false,
    isTxtHashingAllowed: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    companyNameError: "",
   // companyCodeError: "",
    companyRegistrationNoError: "",
    address1Error: "",
    postalCodeError: "",
    countryError: "",
    companyEmailError: "",
    companyPhoneNoError: "",
    authorizerNameError: "",
    authorizerMobileNoError: "",
    countryCodeNoError: "",
  });
  const [comError, setComError] = useState({ companyNameErrors: "" });
  const [isDisableEditable, setIsDisableEditable] = useState(false);
  const [IsDisableSwitchExcel, setIsDisableSwitchExcel] = useState(false);
  const [IsDisableSwitchTxt, setIsDisableSwitchTxt] = useState(false);
  const [IsDisableSwitchCsv, setIsDisableSwitchCsv] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [hideBalance, setHideBalance] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [xlsx, setXlsx] = useState(false);
  const [csv, setCsv] = useState(false);
  const [txt, setTxt] = useState(false);

  const [companyIdFix, setCompanyIdFix] = useState({ companyname: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [formView, setFormView] = useState(false);
  const validate = () => {
    let storkecompanyNameError = customValidator(
      "companyname",
      "Company Name",
      companyMaintenanceDetails?.companyName
    );
    // let companyCodeError = customValidator(
    //   "companyCode",
    //   "Company Code",
    //   companyMaintenanceDetails?.companyCode
    // );
    let accesscompanyRegistrationNoError = customValidator(
      "companyregistrationno",
      "Company RegistrationNo",
      companyMaintenanceDetails?.companyRegistrationNo
    );
    let referenceaddress1Error = customValidator(
      "address1",
      "Address1",
      companyMaintenanceDetails?.address1
    );
    let checkCodeError = customValidator(
      "required",
      "postal Code",
      companyMaintenanceDetails?.postalCode
    );
    let allycountryError = customValidator(
      "required",
      "Country",
      companyMaintenanceDetails?.country
    );
    let spancompanyEmailError = customValidator(
      "companyEmail",
      "Company Email",
      companyMaintenanceDetails?.companyEmail
    );
    let handsetcompanyPhoneNoError = customValidator(
      "companyphoneno",
      "Company PhoneNo",
      companyMaintenanceDetails?.companyPhoneNo
    );

    let mainauthorizerNameError = customValidator(
      "authorizerName",
      "Authorizer Name",
      companyMaintenanceDetails?.authorizerName
    );

    let empoverauthorizerMobileNoError = customValidator(
      "companyphoneno",
      "Authorizer MobileNo",
      companyMaintenanceDetails?.authorizerMobileNo
    );

    if (
      companyMaintenanceDetails.countryCodeNo === "+60" ||
      companyMaintenanceDetails.countryCodeNo === "+65"
    ) {
      handsetcompanyPhoneNoError = customValidator(
        "malaysiaMobilenoCompanymaintenance",
        "Company PhoneNo",
        companyMaintenanceDetails?.companyPhoneNo
      );
    } else {
      handsetcompanyPhoneNoError = customValidator(
        "companyphoneno",
        "Company PhoneNo",
        companyMaintenanceDetails?.companyPhoneNo
      );
    }

    if (
      companyMaintenanceDetails.countryCode === "+60" ||
      companyMaintenanceDetails.countryCode === "+65"
    ) {
      empoverauthorizerMobileNoError = customValidator(
        "malaysiaMobilenoCompanymaintenance",
        "Authorizer MobileNo",
        companyMaintenanceDetails?.authorizerMobileNo
      );
    } else {
      empoverauthorizerMobileNoError = customValidator(
        "companyphoneno",
        "Authorizer MobileNo",
        companyMaintenanceDetails?.authorizerMobileNo
      );
    }

    if (
      !(
        storkecompanyNameError === "null" &&
        // companyCodeError === "null" &&
        accesscompanyRegistrationNoError === "null" &&
        referenceaddress1Error === "null" &&
        checkCodeError === "null" &&
        allycountryError === "null" &&
        spancompanyEmailError === "null" &&
        handsetcompanyPhoneNoError === "null" &&
        mainauthorizerNameError === "null" &&
        empoverauthorizerMobileNoError === "null"
      )
    ) {
      setError("Please complete all required fields.");
      setErrors({
        companyNameError: storkecompanyNameError,
        //companyCodeError: companyCodeError,
        companyRegistrationNoError: accesscompanyRegistrationNoError,
        address1Error: referenceaddress1Error,
        postalCodeError: checkCodeError,
        countryError: allycountryError,
        companyEmailError: spancompanyEmailError,
        companyPhoneNoError: handsetcompanyPhoneNoError,
        authorizerNameError: mainauthorizerNameError,
        authorizerMobileNoError: empoverauthorizerMobileNoError,
        countryCodeNoError: "",
      });
      return false;
    } else {
      setErrors({
        companyNameError: "",
        //companyCodeError: "",
        companyRegistrationNoError: "",
        address1Error: "",
        postalCodeError: "",
        countryError: "",
        companyEmailError: "",
        companyPhoneNoError: "",
        authorizerNameError: "",
        authorizerMobileNoError: "",
        countryCodeNoError: "",
      });
      return true;
    }
  };
  const validates = () => {
    let companyNameError = customValidator(
      "maxTransactionValue",
      "Company Name",
      companyIdFix.companyname
    );
    if (!(companyNameError === "null")) {
      setComError({
        companyNameErrors: companyNameError,
      });
      return false;
    } else {
      setComError({
        companyNameErrors: "",
      });
      return true;
    }
  };
  useEffect(() => {
    if (Object.keys(props.location.state.data)?.length === 0) {
      setIsDisableEditable(false);
    } else {
      setCompanyMaintenanceDetails(props.location.state.data);
      setCsv(props.location.state.data.isCsvFormatAllowed);
      setXlsx(props.location.state.data.isExcelFormatAllowed);
      setTxt(props.location.state.data.isTxtFormatAllowed);
      setIsDisableSwitchCsv(true);
      setIsDisableSwitchTxt(true);
      setIsDisableSwitchExcel(true);
      setIsDisableEditable(false);
    }
  }, [props.location.state.data]);

  let companyCountry = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer?.getAllCountryResponse
  );
  let companyi = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer?.postNewPayrollCompanytDataResponse
  );
  let companyPostalcode = useSelector(
    (state: RootStateOrAny) =>
      state.StateCountryReducer.getAllPostalCodeResponse
  );
  companyPostalcode = companyPostalcode?.sort(
    (a: any, b: any) => parseInt(a?.code) - parseInt(b?.code)
  );
  const currentBalanceInfo = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.currentBalanceResponse
  );

  const fetchAllPostalCode = useCallback(async () => {
    try {
      dispatch(getAllPostalCode());
    } catch (err) {}
  }, [dispatch]);
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let userType = userData.userInfo?.userType;
  const getCurrentBalance = useCallback(
    async (id: string) => {
      try {
        dispatch(getCurrentBalanceOftheCompany(id));
      } catch (err) {}
    },
    [dispatch]
  );

  const addCompanyRecordHandler = (method: string) => {
    if (props.location.state.isTittle) {
      props.history?.push({
        pathname: "/dashboard/Payroll-Company-Management/company-maintenance",
        state: false,
      });
    } else {
      props.history?.push({
        pathname: "/dashboard/payroll-account",
        state: false,
      });
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name === "postalCode") {
      let selectedStateCityInfo = companyPostalcode?.filter(
        (filterValue: any) => {
          if (filterValue.code === e.target.value) {
            return e;
          }
        }
      );

      setCompanyMaintenanceDetails({
        ...companyMaintenanceDetails,
        postalCode: selectedStateCityInfo[0].code,
        city: selectedStateCityInfo[0]?.details?.city,
        state: selectedStateCityInfo[0]?.details?.state,
        country: selectedStateCityInfo[0]?.details?.country,
      });
    } else if (e.target.name === "remark") {
      setCompanyMaintenanceDetails({
        ...companyMaintenanceDetails,
        remarks: e.target.value,
        requestDetails: e.target.value,
      });
    } else {
      setCompanyMaintenanceDetails({
        ...companyMaintenanceDetails,
        [e.target.name]: e.target.value,
      });
    }
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const deleteSelectedCompany = useCallback(
    async (registrationNo: string) => {
      try {
        dispatch(deletePayrollCompanyData(registrationNo));
      } catch (err) {}
    },
    [dispatch]
  );

  const deleteCompanyEventHandler = (choosenCompanyInfo: any) => {
    setShowModal(!showModal);
    deleteSelectedCompany(choosenCompanyInfo.id).then(() => {
      props.history.push(
        "/dashboard/Payroll-Company-Management/company-maintenance"
      );
    });
  };
  const clearCreateGroup = useCallback(async () => {
    try {
      dispatch(restCreatedCompanyData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (companyi) {
      if (companyi.data) {
        clearCreateGroup();
        props.history?.push({
          pathname: "/dashboard/Payroll-Company-Management/company-maintenance",
          state: true,
          message: "Company Created Sucessfully",
        });
      } else if (companyi.error) {
        setApiMessage(true);
      }
    }
  }, [companyi]);
  const closeDeleteConfimation = () => {
    setShowModal(!showModal);
  };

  const fetchCountryReferencedata = useCallback(async () => {
    try {
      dispatch(getCountryReferenceData("country"));
    } catch (err) {}
  }, [dispatch, "country"]);
  useEffect(() => {
    fetchCountryReferencedata();
    fetchAllPostalCode();
  }, [fetchCountryReferencedata, fetchAllPostalCode]);

  useEffect(() => {
    getCurrentBalance(companyMaintenanceDetails.companyAccountId);
  }, [companyMaintenanceDetails.id]);
  useEffect(() => {
    if (userType === "COMPANY_USER") {
      getCurrentBalance(companyMaintenanceDetails.id);
    }
  }, []);
  useEffect(() => {
    if (currentBalanceInfo) {
      if (currentBalanceInfo) {
        setIsLoading(false);
        setFormView(true);
      } else {
        setIsLoading(true);
      }
    }
  }, [currentBalanceInfo]);

  const createNewPayrollCompany = useCallback(
    async (body) => {
      try {
        dispatch(postNewPayrollCompanyData(body));
      } catch (err) {}
    },
    [dispatch]
  );
  const submitHandler = () => {
    if (validate()) {
      var body = JSON.stringify({
        companyAccountId: companyMaintenanceDetails.companyAccountId,
        companyName: companyMaintenanceDetails.companyName,
        //companyCode: companyMaintenanceDetails.companyCode,
        companyRegistrationNo: companyMaintenanceDetails.companyRegistrationNo,
        entityId: companyMaintenanceDetails.entityId,
        address1: companyMaintenanceDetails.address1,
        address2: companyMaintenanceDetails.address2,
        postalCode: companyMaintenanceDetails.postalCode,
        city: companyMaintenanceDetails.city,
        state: companyMaintenanceDetails.state,
        country: companyMaintenanceDetails.country,
        companyEmail: companyMaintenanceDetails.companyEmail,
        countryCodeNo: companyMaintenanceDetails.countryCodeNo,
        countryCode: companyMaintenanceDetails.countryCode,
        companyPhoneNo: companyMaintenanceDetails.companyPhoneNo,
        authorizerName: companyMaintenanceDetails.authorizerName,
        authorizerMobileNo: companyMaintenanceDetails.authorizerMobileNo,
        statusCode: companyMaintenanceDetails.statusCode,
        remarks: companyMaintenanceDetails.remarks,
        functionCode: companyMaintenanceDetails.functionCode,
        requestDetails: companyMaintenanceDetails.requestDetails,
        isExcelHashingAllowed: companyMaintenanceDetails.isExcelHashingAllowed,
        isCsvHashingAllowed: companyMaintenanceDetails.isCsvHashingAllowed,
        isTxtHashingAllowed: companyMaintenanceDetails.isTxtHashingAllowed,
        isExcelFormatAllowed: xlsx,
        isCsvFormatAllowed: csv,
        isTxtFormatAllowed: txt,
      });
      createNewPayrollCompany(body);
    }
  };

  const updateExsitingCompanyInfo = useCallback(
    async (body) => {
      try {
        dispatch(updatePayrollCompanyData(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchCompanyDataById = useCallback(async () => {
    let companyId = userData?.userInfo?.companyUserResponse[0]?.companyId;
    if (companyId) {
      try {
        dispatch(getSelectedCompanyData(companyId));
      } catch (err) {}
    }
  }, [dispatch]);
  const getSelectedCompanyInfo = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.selectedCompanyResponse
  );

  useEffect(() => {
    if (userType === "COMPANY_USER") {
      if (getSelectedCompanyInfo) {
        setCompanyMaintenanceDetails(getSelectedCompanyInfo);
      }
    }
  }, [getSelectedCompanyInfo]);

  useEffect(() => {
    if (userType === "COMPANY_USER") {
      fetchCompanyDataById();
    }
  }, [fetchCompanyDataById]);

  const updateHanlder = () => {
    if (validate()) {
      var body = JSON.stringify({
        id: companyMaintenanceDetails.id,
        companyAccountId: companyMaintenanceDetails.companyAccountId,
        companyName: companyMaintenanceDetails.companyName,
        companyCode: companyMaintenanceDetails.companyCode,
        companyRegistrationNo: companyMaintenanceDetails.companyRegistrationNo,

        address1: companyMaintenanceDetails.address1,
        address2: companyMaintenanceDetails.address2,
        postalCode: companyMaintenanceDetails.postalCode,
        city: companyMaintenanceDetails.city,
        state: companyMaintenanceDetails.state,
        country: companyMaintenanceDetails.country,
        companyEmail: companyMaintenanceDetails.companyEmail,
        countryCodeNo: companyMaintenanceDetails.countryCodeNo,
        countryCode: companyMaintenanceDetails.countryCode,
        companyPhoneNo: companyMaintenanceDetails.companyPhoneNo,
        authorizerName: companyMaintenanceDetails.authorizerName,
        authorizerMobileNo: companyMaintenanceDetails.authorizerMobileNo,
        statusCode: companyMaintenanceDetails.statusCode,
        remarks: companyMaintenanceDetails.remarks,
        functionCode: companyMaintenanceDetails.functionCode,
        requestDetails: companyMaintenanceDetails.requestDetails,
        isExcelHashingAllowed: companyMaintenanceDetails.isExcelHashingAllowed,
        isCsvHashingAllowed: companyMaintenanceDetails.isCsvHashingAllowed,
        isTxtHashingAllowed: companyMaintenanceDetails.isTxtHashingAllowed,
        isExcelFormatAllowed: xlsx,
        isCsvFormatAllowed: csv,
        isTxtFormatAllowed: txt,
      });
      updateExsitingCompanyInfo(body).then(() => {
        props.history?.push({
          pathname: "/dashboard/Payroll-Company-Management/company-maintenance",
          state: true,
          message: "Company Edited Sucessfully",
        });
      });
    }
  };
  let funtionCode = "Edit";
  const triggerDeleteConfirmation = () => {
    setShowModal(!showModal);
    setCompanyInfo(props.location.state.data);
  };
  const handleEdit = () => {
    setCompanyMaintenanceDetails({
      ...companyMaintenanceDetails,
      functionCode: "PAYROLL_COMPANY_MAINTENANCE",
    });
    setIsDisableEditable(false);
    setIsDisableSwitchCsv(true);
    setIsDisableSwitchTxt(true);
    setIsDisableSwitchExcel(true);
  };
  const handleEnabled = (e: any) => {
    setCompanyMaintenanceDetails({
      ...companyMaintenanceDetails,
      ["isExcelHashingAllowed"]: e,
    });
  };
  const handleEnabledCsv = (e: any) => {
    setCompanyMaintenanceDetails({
      ...companyMaintenanceDetails,
      ["isCsvHashingAllowed"]: e,
    });
  };
  const handleEnabledTxt = (e: any) => {
    setCompanyMaintenanceDetails({
      ...companyMaintenanceDetails,
      ["isTxtHashingAllowed"]: e,
    });
  };
  const handleXlsx = (e: any) => {
    setXlsx(e.target.checked);
    if (e.target.checked === true) {
      setIsDisableSwitchExcel(false);
    } else {
      setIsDisableSwitchExcel(true);
      setCompanyMaintenanceDetails({
        ...companyMaintenanceDetails,
        ["isExcelHashingAllowed"]: e === "false",
      });
    }
  };
  const handleCsv = (e: any) => {
    setCsv(e.target.checked);
    if (e.target.checked === true) {
      setIsDisableSwitchCsv(false);
    } else {
      setIsDisableSwitchCsv(true);
      setCompanyMaintenanceDetails({
        ...companyMaintenanceDetails,
        ["isCsvHashingAllowed"]: e === "false",
      });
    }
  };
  const handleTxt = (e: any) => {
    setTxt(e.target.checked);
    if (e.target.checked === true) {
      setIsDisableSwitchTxt(false);
    } else {
      setIsDisableSwitchTxt(true);
      setCompanyMaintenanceDetails({
        ...companyMaintenanceDetails,
        ["isTxtHashingAllowed"]: e === "false",
      });
    }
  };
  let user = userData.userInfo.companyUserResponse?.map((option: any) => {
    return option.companyName;
  });

  const handleChangeDrop = (e: any) => {
    setCompanyIdFix({ ...companyIdFix, [e.target.name]: e.target.value });
    let selected = companyGetData?.filter((filterValue: any) => {
      if (filterValue.companyAccountId === e.target.value) {
        return e;
      }
    });
    setCompanyMaintenanceDetails({
      ...companyMaintenanceDetails,
      id: selected[0]?.id,
      city: selected[0]?.city,
      postalCode: selected[0]?.postalCode,
      state: selected[0]?.state,
      country: selected[0]?.country,
      companyAccountId: selected[0]?.companyAccountId,
      companyName: selected[0]?.companyName,
      companyCode: selected[0]?.companyCode,
      companyRegistrationNo: selected[0]?.companyRegistrationNo,
      entityId: selected[0]?.entityId,
      address1: selected[0]?.address1,
      address2: selected[0]?.address2,
      companyEmail: selected[0]?.companyEmail,
      countryCodeNo: selected[0]?.countryCodeNo,
      countryCode: selected[0]?.countryCode,
      companyPhoneNo: selected[0]?.companyPhoneNo,
      authorizerName: selected[0]?.authorizerName,
      authorizerMobileNo: selected[0]?.authorizerMobileNo,
      statusCode: selected[0]?.statusCode,
      remarks: selected[0]?.remarks,
      functionCode: selected[0]?.functionCode,
      requestDetails: selected[0]?.requestDetails,
      isExcelHashingAllowed: selected[0]?.isExcelHashingAllowed,
      isCsvHashingAllowed: selected[0]?.isCsvHashingAllowed,
      isTxtHashingAllowed: selected[0]?.isTxtHashingAllowed,
    });
    setXlsx(selected[0]?.isExcelFormatAllowed);
    setTxt(selected[0]?.isTxtFormatAllowed);
    setCsv(selected[0]?.isCsvFormatAllowed);
  };
  const handleClickDrop = (e: any) => {
    if (validates()) {
      setHideBalance(true);
    }
  };

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllData();
  }, []);
  let userDatas = companyGetData?.map((option: any) => {
    return <option>{option.companyAccountId}</option>;
  });

  return (
    <div className="p-4">
      {/* <div className="d-flex">
      <div className="add-company-title pb-3">
        {props.location.state.isTittle
          ? "Payroll Company Maintenance"
          : "Company Account Enquiry"}
      </div>
      <div className="d-flex justify-content-end">
                <CustomButton
                  className={
                    userType === "COMPANY_USER backbtns"
                      ? "backbtns d-none"
                      : ""
                  }
                  onClick={() => addCompanyRecordHandler("addMethod")}
                >
                  <TiArrowBack />
                  Back
                </CustomButton>
        </div>
      </div>
       */}
      <div className="d-flex justify-content-between col-12">
        <h1 className="text-bold block-card-title">
          {props.location.state.isTittle
            ? "Payroll Company Maintenance"
            : "Company Account Enquiry"}
        </h1>
        {/* <CustomButton
                  className={
                    userType === "COMPANY_USER backbtns"
                      ? "backbtns d-none"
                      : ""
                  }
                  onClick={() => addCompanyRecordHandler("addMethod")}
                >
                  <TiArrowBack />
                  Back
                </CustomButton> */}
        <button
          className="block-card-back border-0"
          onClick={() => addCompanyRecordHandler("addMethod")}
        >
          {" "}
          <TiArrowBack />
          Back
        </button>
      </div>

      {userType === "COMPANY_USER" && (
        <div className="d-flex row">
          <div className="col-2 selectComany">Company Name</div>
          <div className="col-4">
            <Input
              type="select"
              name="companyname"
              className="form-select"
              value={companyIdFix.companyname}
              onChange={handleChangeDrop}
            >
              <option>Select CompanyName</option>
              {userData.userInfo.companyUserResponse?.map((option: any) => {
                return (
                  <option value={option.companyAccountId}>
                    {option.companyName}
                  </option>
                );
              })}
            </Input>
            {comError.companyNameErrors &&
              comError?.companyNameErrors !== "null" && (
                <Label className="text-red">{comError.companyNameErrors}</Label>
              )}
          </div>
          <div className="col-2">
            <Button
              className="Reference-DefaultButton viewBtn"
              onClick={handleClickDrop}
            >
              View
            </Button>
          </div>
        </div>
      )}
      {userType !== "COMPANY_USER" && !hideBalance ? (
        <>
          <CustomLoader isLoading={isLoading} size={50} />

          <>
            <div className="edit"></div>
            <div className="d-flex row justify-content-between align-items-center pb-3">
              <div
                className={`d-flex col justify-content-between ${
                  props.location.state.isTittle ? "d-none" : ""
                }`}
              >
                <div className="col-6 payroll-account-header d-flex p-3 ">
                  <div className="col-7 ">
                    <span className="payroll-account-label-color ms-2">
                      <MdOutlineAccountBalanceWallet />
                      <span className="ps-2">Account Balance:</span>
                      <label className="payroll-account-label-color ms-3">
                        {currentBalanceInfo?.balance}
                      </label>
                    </span>
                  </div>
                  <div className="col-6">
                    <span className="payroll-account-label-color ms-2">
                      <img src={statusIcon} />
                      <span className="ps-2">Status:</span>
                      <label className="payroll-account-header-label ms-3">
                        {userData.userInfo?.status}
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="d-flex justify-content-end">
                <CustomButton
                  className={
                    userType === "COMPANY_USER backBtnDevice"
                      ? "backBtnDevice d-none"
                      : ""
                  }
                  onClick={() => addCompanyRecordHandler("addMethod")}
                >
                  <TiArrowBackOutline style={{ margin: "auto 5px" }} />
                  Back
                </CustomButton>
              </div> */}
            </div>
            <div className="add-company-wrapper">
              {props.optionalIcons !== "addMethod" &&
              props.location.state.isView &&
              isDisableEditable ? (
                <>
                  <CustomButton
                    className="colourchangeDelete"
                    onClick={triggerDeleteConfirmation}
                  >
                    <BsTrash />
                  </CustomButton>
                  <Button className="colourchange" onClick={handleEdit}>
                    <FaRegEdit />
                  </Button>
                </>
              ) : (
                <></>
              )}

              <div className="add-company-maintenance-form">
                <div>
                  <h5 className="header-text">Company Details</h5>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    UID
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="id"
                      onChange={handleChange}
                      readOnly={true}
                      value={companyMaintenanceDetails.id}
                    />
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Account UID
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="companyAccountId"
                      onChange={handleChange}
                      readOnly={true}
                      value={companyMaintenanceDetails.companyAccountId}
                    />
                  </Col>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Company Name
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      style={{ height: "36px" }}
                      type="text"
                      className="companyInput-height"
                      name="companyName"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.companyName}
                    />
                    {errors.companyNameError &&
                      errors?.companyNameError !== "null" && (
                        <Label className="text-red">
                          {errors.companyNameError}
                        </Label>
                      )}
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Company Reg No
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="companyRegistrationNo"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.companyRegistrationNo}
                    />
                    {errors.companyRegistrationNoError &&
                      errors?.companyRegistrationNoError !== "null" && (
                        <Label className="text-red">
                          {errors.companyRegistrationNoError}
                        </Label>
                      )}
                  </Col>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Company Code
                    {/* <span className="container-body-label-color">*</span> */}
                  </Label>
                  <Col sm={4}>
                    <Input
                      style={{ height: "36px" }}
                      type="text"
                      className="companyInput-height"
                      name="companyCode"
                      onChange={handleChange}
                      readOnly={!isDisableEditable}
                      value={companyMaintenanceDetails?.companyCode}
                    />
                    {/* {errors?.companyCodeError &&
                      errors?.companyCodeError !== "null" && (
                        <Label className="text-red">
                          {errors.companyCodeError}
                        </Label>
                      )} */}
                  </Col>
                </div>
                <div>
                  <h5 className="header-text">Company Address</h5>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Address 1
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      className="AddressInput-height"
                      name="address1"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.address1}
                    />
                    {errors.address1Error &&
                      errors?.address1Error !== "null" && (
                        <Label className="text-red">
                          {errors.address1Error}
                        </Label>
                      )}
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Address 2
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      className="AddressInput-height"
                      name="address2"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.address2}
                    />
                  </Col>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Postal Code
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="select"
                      name="postalCode"
                      onChange={handleChange}
                      className="btn--sizer"
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.postalCode}
                    >
                      <option key="-1" value="">
                        Select Postal Code
                      </option>
                      {companyPostalcode &&
                        companyPostalcode.length > 0 &&
                        companyPostalcode.map((e: any, index: number) => {
                          return <option>{e.code}</option>;
                        })}
                    </Input>
                    {errors.postalCodeError &&
                      errors?.postalCodeError !== "null" && (
                        <Label className="text-red">
                          {errors.postalCodeError}
                        </Label>
                      )}
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    City
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      readOnly={true}
                      value={companyMaintenanceDetails.city}
                    ></Input>
                  </Col>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    State
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="state"
                      onChange={handleChange}
                      readOnly={true}
                      value={companyMaintenanceDetails.city}
                    ></Input>
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Country
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="country"
                      onChange={handleChange}
                      readOnly={true}
                      value={companyMaintenanceDetails.country}
                    ></Input>
                    {errors.countryError && errors?.countryError !== "null" && (
                      <Label className="text-red">{errors.countryError}</Label>
                    )}
                  </Col>
                </div>
                <div>
                  <h5 className="header-text">Contact Details</h5>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Mobile Number
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={1}>
                    <Input
                      type="select"
                      name="countryCodeNo"
                      className="btn--sizer"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.countryCodeNo}
                    >
                      <option>+60</option>
                      <option>+91</option>
                      <option>+65</option>
                    </Input>
                  </Col>
                  <Col sm={3}>
                    <Input
                      type="text"
                      name="companyPhoneNo"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.companyPhoneNo}
                    />
                    {errors.companyPhoneNoError &&
                      errors?.companyPhoneNoError !== "null" && (
                        <Label className="text-red">
                          {errors.companyPhoneNoError}
                        </Label>
                      )}
                  </Col>
                </div>
                <div>
                  <h5 className="header-text">Authorized Contact Person</h5>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Person Name
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="authorizerName"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.authorizerName}
                    />
                    {errors.authorizerNameError &&
                      errors?.authorizerNameError !== "null" && (
                        <Label className="text-red">
                          {errors.authorizerNameError}
                        </Label>
                      )}
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Mobile Number
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={1}>
                    <Input
                      type="select"
                      name="countryCode"
                      className="btn--sizer"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.countryCode}
                    >
                      <option>+60</option>
                      <option>+91</option>
                      <option>+65</option>
                    </Input>
                  </Col>
                  <Col sm={3}>
                    <Input
                      type="text"
                      name="authorizerMobileNo"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.authorizerMobileNo}
                    />
                    {errors.authorizerMobileNoError &&
                      errors?.authorizerMobileNoError !== "null" && (
                        <Label className="text-red">
                          {errors.authorizerMobileNoError}
                        </Label>
                      )}
                  </Col>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Email Address
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="companyEmail"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.companyEmail}
                    />
                    {errors.companyEmailError &&
                      errors?.companyEmailError !== "null" && (
                        <Label className="text-red">
                          {errors.companyEmailError}
                        </Label>
                      )}
                  </Col>
                  <Label
                    className="add-company-label-font-weight"
                    for="exampleText"
                    sm={2}
                  >
                    Remarks
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      className="companyInput-height"
                      name="remarks"
                      onChange={handleChange}
                      readOnly={isDisableEditable}
                      value={companyMaintenanceDetails.remarks}
                    />
                  </Col>
                </div>
                <div className="d-flex mt-2">
                  <Label
                    className="add-company-label-font-weight "
                    for="exampleText"
                    sm={2}
                  >
                    Allowed file format{" "}
                  </Label>
                  <Col sm={1}>
                    <Input
                      className="input_space "
                      type="checkbox"
                      id="checkbox2"
                      disabled={isDisableEditable}
                      checked={xlsx}
                      onChange={(e) => handleXlsx(e)}
                    />
                    <Label className=" spaceforLabel">xlsx</Label>
                  </Col>
                  <Col sm={1} className="checkboxLabel">
                    <Input
                      className="input_space "
                      type="checkbox"
                      id="checkbox2"
                      checked={csv}
                      disabled={isDisableEditable}
                      onChange={(e) => handleCsv(e)}
                    />
                    <Label className=" spaceforLabel">csv</Label>
                  </Col>
                  <Col sm={1} className="checkboxLabel">
                    <Input
                      className="input_space "
                      type="checkbox"
                      id="checkbox2"
                      checked={txt}
                      disabled={isDisableEditable}
                      onChange={(e) => handleTxt(e)}
                    />
                    <Label className=" spaceforLabel">txt</Label>
                  </Col>
                </div>
                <div className="d-flex mt-2 align-items-center">
                  <Label
                    className="add-company-label-font-weight "
                    for="exampleText"
                    sm={2}
                  >
                    Hash enabled{" "}
                  </Label>
                  <Col sm={1}>
                    <Switch
                      checkedChildren="YES"
                      unCheckedChildren="NO"
                      disabled={IsDisableSwitchExcel}
                      onChange={(e) => handleEnabled(e)}
                      checked={companyMaintenanceDetails.isExcelHashingAllowed}
                    />
                  </Col>
                  <Col sm={1} className="ms-5">
                    <Switch
                      checkedChildren="YES"
                      unCheckedChildren="NO"
                      onChange={(e) => handleEnabledCsv(e)}
                      disabled={IsDisableSwitchCsv}
                      checked={companyMaintenanceDetails.isCsvHashingAllowed}
                    />
                  </Col>
                  <Col sm={1} className="ms-5">
                    <Switch
                      checkedChildren="YES"
                      unCheckedChildren="NO"
                      disabled={IsDisableSwitchTxt}
                      onChange={(e) => handleEnabledTxt(e)}
                      checked={companyMaintenanceDetails.isTxtHashingAllowed}
                    />
                  </Col>
                </div>
              </div>
              {props.location.state.isView && (
                <div className="col d-flex">
                  <div className="col-2 ms-4"></div>
                  <div className="col-6 p-2">
                    <SubmitCancelButton
                      button={"Submit"}
                      secondButton={"Cancel"}
                      onSubmit={
                        Object.keys(props.location.state.data)?.length === 0
                          ? submitHandler
                          : updateHanlder
                      }
                      onCancel={() =>
                        props.history.push({
                          pathname:
                            "/dashboard/Payroll-Company-Management/company-maintenance",
                          state: false,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </>

          {apiMessage && (
            <CustomResponseMessage
              apiStatus={false}
              message={companyi.message}
              closeMessage={closeMessage}
            />
          )}
          <DeleteConfirmationPopUp
            showModal={showModal}
            closeDeleteConfirmation={closeDeleteConfimation}
            selectedFestivalInfo={companyInfo}
            deleteTheSelectedRecord={deleteCompanyEventHandler}
          ></DeleteConfirmationPopUp>
        </>
      ) : (
        userType !== "COMPANY_USER" && (
          <CustomResponseMessage
            status={false}
            message={"You are Not Added to any Company"}
          />
        )
      )}
    </div>
  );
};
export default AddCompanyMainteanance;
