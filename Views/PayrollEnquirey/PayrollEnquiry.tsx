import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import { payrollCompanyMaintenanceProps } from "../../models/PayrollCompanyMaintenanceModel";
import { getSelectedCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import "./PayrollEnquiry.scss";
import { getCurrentBalanceOftheCompany } from "../../redux/action/PreFundAction";
import {
  getAllCountryData,
  getAllPostalCode,
} from "../../redux/action/StateCountryAction";
import {
  ApprovalTaskData,
  getApprovalTaskData,
  getApprovalTaskIdData,
  rejectApprovalTaskData,
} from "../../redux/action/ApprovalAction";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
const PayrollEnquiry = (props: payrollCompanyMaintenanceProps) => {
  //Selector for getting company info:
  const getSelectedCompanyInfo = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.selectedCompanyResponse
  );
  const currentBalanceInfo = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.currentBalanceResponse
  );

  let companyPostalcode = useSelector(
    (state: RootStateOrAny) =>
      state.StateCountryReducer.getAllPostalCodeResponse
  );
  let companyCountry = useSelector(
    (state: RootStateOrAny) =>
      state.StateCountryReducer.getAllCountryDataResponse
  );
  let ApprovalTask = useSelector(
    (state: RootStateOrAny) =>
      state.ApprovalTaskReducer?.postApprovalTaskResponse
  );
  useEffect(() => {
    dispatch(getApprovalTaskData());
  }, [ApprovalTask]);

  const ApprovalTaskManager = (comments: string) => {
    let Approvaldata = props.location.state;

    let taskManager = {
      functionCode: Approvaldata?.functionCode,
      remarks: comments,
      requestDetails: Approvaldata?.requestDetails
        ? Approvaldata.requestDetails
        : "",
      approvalTaskId: Approvaldata?.id,
    };
    dispatch(ApprovalTaskData(taskManager));
    props.history.push("/dashboard");
  };

  //aproval task id
  let ApprovalIdData = useSelector(
    (state: RootStateOrAny) =>
      state.ApprovalTaskReducer?.getApprovalTaskIdDataResponse
  );

  let RejectData = useSelector(
    (state: RootStateOrAny) =>
      state.ApprovalTaskReducer?.rejectApprovalTaskDataResponse
  );

  const RejectTaskManger = () => {
    let Approvaldata = props.location.state;
    let rejectdata = {
      functionCode: Approvaldata.functionCode,
      remarks: Approvaldata.makerComment,
      requestDetails: Approvaldata.requestDetails
        ? Approvaldata.requestDetails
        : "",
      approvalTaskId: Approvaldata.id,
    };
    dispatch(rejectApprovalTaskData(rejectdata));
    props.history.push("/dashboard");
  };

  const dispatch = useDispatch();
  const [companyDetials, setCompanyDetails] = useState({
    companyName: "",
    companyRegistrationNo: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "Malaysia",
    companyEmail: "",
    companyPhoneNo: "",
    authorizerName: "",
    authorizerMobileNo: "",
    statusCode: "A",
    remarks: "",
    countryCodeNo: "+60",
    id: "",
    companyAccountId: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const getCompanyInfo = useCallback(async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
      dispatch(
        getSelectedCompanyData(
          userData && userData.companyRegistrationNo
            ? userData.companyRegistrationNo
            : "123"
        )
      );
    } catch (err) {}
  }, [dispatch]);

  const getCurrentBalance = useCallback(async () => {
    try {
      let userData = JSON.parse(localStorage.getItem("userData") || "{}");
      let recordaccountId = {
        accountId:
          userData && userData.companyAccountId
            ? userData.companyAccountId
            : "6c214fa3-69cc-4a0d-883c-77a0e06e173d",
      };
      dispatch(getCurrentBalanceOftheCompany(recordaccountId));
    } catch (err) {}
  }, [dispatch]);

  const fetchAllPostalCode = useCallback(async () => {
    try {
      dispatch(getAllPostalCode());
    } catch (err) {}
  }, [dispatch]);

  const fetchAllCountry = useCallback(async () => {
    try {
      dispatch(getAllCountryData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    getCurrentBalance();
    if (props.location && props.location.state && props.location.state.id) {
      let Approvalid = props.location.state.id;
      dispatch(getApprovalTaskIdData(Approvalid));
    } else {
      getCompanyInfo();
    }
    fetchAllCountry();
    fetchAllPostalCode();
  }, [getCompanyInfo, getCurrentBalance]);

  useEffect(() => {
    if (
      getSelectedCompanyInfo &&
      Object.keys(getSelectedCompanyInfo).length > 0
    ) {
      setCompanyDetails(getSelectedCompanyInfo);
    }
  }, [getSelectedCompanyInfo]);
  useEffect(() => {
    if (ApprovalIdData && Object.keys(ApprovalIdData).length > 0) {
      setCompanyDetails(ApprovalIdData.data);
      setIsLoading(false);
    }
  }, [ApprovalIdData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyDetails({ ...companyDetials, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="fw-bold container-header " data-testid="header-title">
        Company Prefund Account Enquiry
      </h1>
      <Link to={{ pathname: "/dashboard/home" }}>
        <CustomButton className="float-right">
          <TiArrowBackOutline style={{ margin: "auto 5px" }} />
          Back
        </CustomButton>
      </Link>

      {!isLoading ? null : (
        <div className="add-company-wrapper">
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
                  value={companyDetials?.id}
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
                  value={companyDetials?.companyAccountId}
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
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  className="companyInput-height"
                  name="companyName"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.companyName}
                />
              </Col>
              <Label
                className="add-company-label-font-weight"
                for="exampleText"
                sm={2}
              >
                Company Reg No
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="companyRegistrationNo"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.companyRegistrationNo}
                />
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
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  className="AddressInput-height"
                  name="address1"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.address1}
                />
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
                  readOnly={true}
                  value={companyDetials?.address2}
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
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="code"
                  readOnly={true}
                  value={companyDetials?.postalCode}
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
              </Col>
              <Label
                className="add-company-label-font-weight"
                for="exampleText"
                sm={2}
              >
                City
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.city}
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
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.state}
                ></Input>
              </Col>
              <Label
                className="add-company-label-font-weight"
                for="exampleText"
                sm={2}
              >
                Country
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="country"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.country}
                >
                  <option key="-1" value="">
                    Select Country
                  </option>
                  {companyCountry &&
                    companyCountry.length > 0 &&
                    companyCountry.map((e: any, index: number) => {
                      return <option>{e.description}</option>;
                    })}
                </Input>
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
                Tel Number
              </Label>
              <Col sm={1}>
                <Input
                  type="select"
                  readOnly={true}
                  value={companyDetials?.countryCodeNo}
                >
                  <option>+65</option>
                  <option>+91</option>
                  <option>+60</option>
                </Input>
              </Col>
              <Col sm={3}>
                <Input
                  type="text"
                  name="companyPhoneNo"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.companyPhoneNo}
                />
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
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="authorizerName"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.authorizerName}
                />
              </Col>
              <Label
                className="add-company-label-font-weight"
                for="exampleText"
                sm={2}
              >
                Mobile Number
              </Label>
              <Col sm={1}>
                <Input
                  type="select"
                  readOnly={true}
                  value={companyDetials?.countryCodeNo}
                >
                  <option>+65</option>
                  <option>+91</option>
                  <option>+60</option>
                </Input>
              </Col>
              <Col sm={3}>
                <Input
                  type="text"
                  name="authorizerMobileNo"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.authorizerMobileNo}
                />
              </Col>
            </div>
            <div className="row mb-3">
              <Label
                className="add-company-label-font-weight"
                for="exampleText"
                sm={2}
              >
                Email Address
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="companyEmail"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.companyEmail}
                />
              </Col>
              <Label
                className="add-company-label-font-weight"
                for="exampleText"
                sm={2}
              >
                Remarks
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  className="companyInput-height"
                  name="remarks"
                  onChange={handleChange}
                  readOnly={true}
                  value={companyDetials?.remarks}
                />
              </Col>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollEnquiry;
