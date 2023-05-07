import { useCallback, useEffect, useState } from "react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import { getSelectedCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import { getCurrentBalanceOftheCompany } from "../../redux/action/PreFundAction";
import {
  getAllCountryData,
  getAllPostalCode,
} from "../../redux/action/StateCountryAction";
import "../../Views/PrefundAccountEnquiry/PrefundAccountEnquiry.scss";
import CustomButton from "../UI/CustomButton";
import "./PayrollAccountView.scss";
import statusIcon from "../../assets/status.svg";

const PayrollAccountView = (props: any) => {
  const data = props.location.state;

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

  const getCompanyInfo = useCallback(async () => {
    try {
      dispatch(getSelectedCompanyData(data.companyRegistrationNo));
    } catch (err) {}
  }, [dispatch, data]);

  const getCurrentBalance = useCallback(async () => {
    try {
      let recordaccountId = {
        accountId: "c60f4920-c5f9-4886-baf2-e25a054142ed",
      };

      dispatch(getCurrentBalanceOftheCompany(recordaccountId));
    } catch (err) {}
  }, [dispatch, data]);

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
    getCompanyInfo();
    fetchAllCountry();
    fetchAllPostalCode();
  }, [getCompanyInfo, getCurrentBalance]);

  useEffect(() => {
    if (props.history.location?.state) {
      setCompanyDetails(props.history.location?.state);
    }
  }, [props.history.location?.state]);

  const goBack = () => {
    props.history.push({
      pathname: "/dashboard/prefund-Account-enquiry",
    });
  };
  const handleChange = (e: any) => {
    setCompanyDetails({ ...companyDetials, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-bold payroll-account-title">
        Company Payroll Account Enquiry View
      </h1>

      <div className="d-flex justify-content-between">
        <div className="d-flex col justify-content-between ">
          <div className="col-10 payroll-account-header d-flex p-3 ">
            <div className="col-4 ">
              <span className="payroll-account-label-color ms-2">
                {" "}
                <MdOutlineAccountBalanceWallet />
                <span className="ps-2">Company:</span>
                <label className="payroll-account-label-color ms-3">
                  {companyDetials.companyName}
                </label>
              </span>
            </div>
            <div className="col-4 ">
              <span className="payroll-account-label-color ms-2">
                <MdOutlineAccountBalanceWallet />
                <span className="ps-2">Account Balance:</span>
                <label className="payroll-account-label-color ms-3">
                  {currentBalanceInfo?.currentBalance}
                </label>
              </span>
            </div>
            <div className="col-4">
              <span className="payroll-account-label-color ms-2">
                <img src={statusIcon} />
                <span className="ps-2">Status:</span>
                <label className="payroll-account-header-label ms-3">
                  {currentBalanceInfo?.recordStatus}
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="align-items-center d-flex">
          <CustomButton className="backBtnDevice" onClick={goBack}>
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
      </div>
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
                value={companyDetials.companyAccountId}
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
                value={companyDetials.companyName}
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
                value={companyDetials.companyRegistrationNo}
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
                value={companyDetials.address1}
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
                value={companyDetials.address2}
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
                  companyPostalcode.map((e: any, _index: number) => {
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
                value={companyDetials.city}
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
                value={companyDetials.state}
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
                  companyCountry.map((e: any, _index: number) => {
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
                value={companyDetials.countryCodeNo}
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
                value={companyDetials.companyPhoneNo}
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
                value={companyDetials.authorizerName}
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
                value={companyDetials.countryCodeNo}
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
                value={companyDetials.authorizerMobileNo}
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
                value={companyDetials.companyEmail}
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
                value={companyDetials.remarks}
              />
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollAccountView;
