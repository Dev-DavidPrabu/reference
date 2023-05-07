import React, { useCallback, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  FormGroup,
  Label,
  CardBody,
  Button,
  Input,
  Card,
} from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import "./PreOnboarding.scss";
import {
  getAllPostalCode,
  getAllCountryData,
} from "../../redux/action/StateCountryAction";
import CustomInput from "../UI/CustomInput";
import {
  addNewCustomer,
  clearNewCustInfo,
  getSelectedPrefundUser,
  updateUserToCustomer,
} from "../../redux/action/CustomerOnboarding";
const PreOnboarding = (props: any) => {
  const [formEditable, setFormEditable] = useState(
    props.method === "addMethod" ? false : true
  );
  const [companyDetials, setCompanyDetails] = useState({
    companyId: "",
    companyName: "",
    countryCode: "",
    entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
    entityCode: "MTAMY",
    customerName: "",
    preferredName: "",
    mobileNumber: "",
    nationalityCode: "",
    idTypeCode: "",
    idValue: "",
    bankAccountNo: "",
    onboardingChannel: "",
    remarks: "",
    mothersMaidenName: "",
    residentAddress1: "",
    residentAddress2: "",
    residentPostcode: "",
    residentCityCode: "",
    residentCityDescription: "",
    residentStateCode: "",
    residentStateDescription: "",
    residentCountryCode: "Malasiya",
    residentCountryDescription: "",
    isSameAddress: false,
    mailAddress1: "",
    mailAddress2: "",
    mailPostcode: "",
    mailCityCode: "",
    mailCityDescription: "",
    mailStateCode: "",
    mailStateDescription: "",
    mailCountryCode: "Malasiya",
    mailCountryDescription: "",
    customerNumber: "",
    birthDate: "",
    emailAddress: "",
    bankName: "",
    occupation: "",
    preferredLanguage: "",
    id: "",
  });

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    fullNameError: "",
    MobileNoError: "",
    EmailIdError: "",
    postallCodeError: "",
    cityyError: "",
    nationalityError: "",
    idTypeError: "",
    idValueError: "",
  });

  const validate = () => {
    let fulllNameError = customValidator(
      "customerName",
      "Full Name",
      companyDetials?.customerName
    );
    let mobilleNoError = customValidator(
      "mobileno",
      "Mobile No",
      companyDetials?.mobileNumber
    );
    let emaillError = customValidator(
      "emailid",
      "Email Address​ ",
      companyDetials?.emailAddress
    );
    let postalCodeError = customValidator(
      "residentPostcode",
      "postal Code",
      companyDetials?.residentPostcode
    );
    let cityError = customValidator(
      "residentCityCode",
      "City",
      companyDetials?.residentCityCode
    );

    let nationalityError = customValidator(
      "required",
      "Nationality",
      companyDetials?.nationalityCode
    );
    let idTypeError = customValidator(
      "required",
      "Id Type",
      companyDetials?.idTypeCode
    );

    let idValueError = customValidator(
      "required",
      "id Value",
      companyDetials?.idValue
    );

    if (
      !(
        fulllNameError === "null" &&
        mobilleNoError === "null" &&
        nationalityError === "null" &&
        idTypeError === "null" &&
        idValueError === "null"
      )
    ) {
      setError("Please complete all required fields.");
      setErrors({
        fullNameError: fulllNameError,
        MobileNoError: mobilleNoError,
        EmailIdError: emaillError,
        postallCodeError: postalCodeError,
        cityyError: cityError,
        nationalityError: nationalityError,
        idTypeError: idTypeError,
        idValueError: idValueError,
      });
      return false;
    } else {
      setError("");
      setErrors({
        fullNameError: "",
        MobileNoError: "",
        EmailIdError: "",
        postallCodeError: "",
        cityyError: "",
        nationalityError: "",
        idTypeError: "",
        idValueError: "",
      });
      return true;
    }
  };
  const getAllpostalCode = useSelector(
    (residentStateDescription: RootStateOrAny) =>
      residentStateDescription.StateCountryReducer.getAllPostalCodeResponse
  );
  const dispatch = useDispatch();

  const newCustomerCreation = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerOnboardingReducer.postNewCustomerDataResponse
  );

  const selectedUserInfoPrefundAccount = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerOnboardingReducer.selectedPrefundUserInfo
  );

  useEffect(() => {
    if (Object?.keys(selectedUserInfoPrefundAccount).length > 0) {
      setCompanyDetails(selectedUserInfoPrefundAccount.data);
    }
  }, [selectedUserInfoPrefundAccount]);

  const addNewUserToTheCompany = useCallback(
    async (body) => {
      try {
        dispatch(addNewCustomer(body));
      } catch (err) {}
    },
    [dispatch]
  );
  const updateToTheCompany = useCallback(
    async (body) => {
      try {
        dispatch(updateUserToCustomer(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const updateCompanyUser = () => {
    if (validate()) {
      let companyInfo = companyDetials;

      updateToTheCompany(companyInfo).then(() => {
        props.cancelClickEven();
      });
    }
  };

  const resetCustomerInfo = useCallback(async () => {
    try {
      dispatch(clearNewCustInfo());
    } catch (err) {}
  }, [dispatch]);

  const selectedUserInfoCustomerInfo = useCallback(
    async (userInfoId) => {
      try {
        dispatch(getSelectedPrefundUser(userInfoId));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (props.method === "updateMethod") {
      selectedUserInfoCustomerInfo(props.userInfo.customerId);
    }
  }, [props.method]);

  useEffect(() => {
    if (companyDetials.isSameAddress) {
      setCompanyDetails({
        ...companyDetials,
        mailAddress1: companyDetials.residentAddress1,
        mailAddress2: companyDetials.residentAddress2,
        mailCityCode: companyDetials.residentCityCode,
        mailPostcode: companyDetials.residentPostcode,
        mailStateCode: companyDetials.residentStateCode,
      });
    } else {
      setCompanyDetails({
        ...companyDetials,
        mailAddress1: "",
        mailAddress2: "",
        mailCityCode: "",
        mailStateCode: "",
        mailPostcode: "",
      });
    }
  }, [companyDetials?.isSameAddress]);

  useEffect(() => {
    if (newCustomerCreation !== null) {
      if (newCustomerCreation.data) {
        props.cancelClickEven();
      } else {
        setError(newCustomerCreation.errorMessage);
      }
    }
  }, [newCustomerCreation]);

  const fetchAllPostalCode = useCallback(async () => {
    try {
      dispatch(getAllPostalCode());
    } catch (err) {}
  }, [dispatch]);

  const NewEmployeeOnboarding = () => {
    if (validate()) {
      addNewUserToTheCompany(companyDetials);
    }
  };

  const formMakeEditable = () => {
    setFormEditable(!formEditable);
  };

  const fetchAllCountryData = useCallback(async () => {
    try {
      dispatch(getAllCountryData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllPostalCode();
    fetchAllCountryData();
  }, [fetchAllPostalCode, fetchAllCountryData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "mailPostcode") {
      let cityState: any = getAllpostalCode.filter(
        (data: any) => data.code === e.target.value
      )[0];
      setCompanyDetails({
        ...companyDetials,
        mailCityCode: cityState.details.CITY,
        mailPostcode: cityState.code,
        mailStateCode: cityState.details.STATE,
      });
    } else if (e.target.name === "residentPostcode") {
      let cityState: any = getAllpostalCode.filter(
        (data: any) => data.code === e.target.value
      )[0];
      setCompanyDetails({
        ...companyDetials,
        residentCityCode: cityState.details.CITY,
        residentPostcode: cityState.code,
        residentStateCode: cityState.details.STATE,
      });
    } else {
      setCompanyDetails({ ...companyDetials, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <Card className="card-design">
        <div className="prefund-header">
          <Row>
            <Col
              xs="6"
              sm="1"
              style={{ cursor: "pointer" }}
              onClick={props.cancelClickEven}
            >
              <BiArrowBack></BiArrowBack>
            </Col>
            <Col
              xs="6"
              sm="8"
              style={{
                fontSize: "22px",
                textAlign: "center",
                marginTop: "5px",
                marginLeft: "5rem",
              }}
            >
              Customer Pre-Onboarding
            </Col>
            <Col sm="3"></Col>
          </Row>
        </div>
        <div style={{ height: "5%" }} className="prefund-buttons">
          <div className="prefund-heading-button">Record Reference </div>
          <div className="prefund-heading-button">Mode</div>
          <div className="prefund-heading-button">
            <div hidden={props.method === "addMethod" ? true : false}>
              <MdDelete className="edit-icon-size"></MdDelete>
              <MdEdit
                className="edit-icon-size"
                onClick={formMakeEditable}
              ></MdEdit>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Row>
              <Col sm="12" md={{ size: 10, offset: 2 }}>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="CustomerDetails"
                    for="Customer Details"
                    className="label-font"
                    sm={3}
                  >
                    Customer Details:
                  </Label>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Pre-Onboarding"
                    for="id"
                    className="label-font"
                    sm={3}
                  >
                    Pre-Onboarding UID
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      type="text"
                      className="input-size"
                      name="id"
                      id="id"
                      readOnly={true}
                      value={companyDetials?.id}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Full Name"
                    for="customerName"
                    className="label-font"
                    sm={3}
                  >
                    Full Name:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="customerName"
                      id="customerName"
                      value={companyDetials.customerName}
                      readOnly={formEditable}
                    />
                    {errors.fullNameError &&
                      errors?.fullNameError !== "null" && (
                        <Label className="text-red">
                          {errors.fullNameError}
                        </Label>
                      )}
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Preferred Name"
                    for="preferredName"
                    className="label-font"
                    sm={3}
                  >
                    Preferred Name:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="preferredName"
                      id="preferredName"
                      value={companyDetials.preferredName}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Nationality​"
                    for="nationalityCode"
                    className="label-font"
                    sm={3}
                  >
                    Nationality*​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="nationalityCode"
                      id="nationalityCode"
                      value={companyDetials.nationalityCode}
                      readOnly={formEditable}
                    />
                    {errors.nationalityError && (
                      <Label
                        style={{
                          textAlign: "center",
                        }}
                        className="text-red"
                      >
                        *{errors.nationalityError}
                      </Label>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Identification Number"
                    for="idTypeCode"
                    className="label-font"
                    sm={3}
                  >
                    Identification Number*​​:
                  </Label>
                  <Col sm={2}>
                    <Input
                      onChange={handleChange}
                      type="select"
                      className="input-size"
                      name="idTypeCode"
                      id="idTypeCode"
                      value={companyDetials.idTypeCode}
                      readOnly={formEditable}
                    >
                      <option key="-1">Select Id Type</option>
                      <option>IC</option>
                      <option>PASSPORT</option>
                    </Input>
                    {errors.idTypeError && errors?.idTypeError !== "null" && (
                      <Label className="text-red">{errors.idTypeError}</Label>
                    )}
                  </Col>
                  <Col sm={4}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="idValue"
                      id="idValue"
                      value={companyDetials.idValue}
                      readOnly={formEditable}
                    />
                    {errors.idValueError && errors?.idValueError !== "null" && (
                      <Label className="text-red">{errors.idValueError}</Label>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="birthdate"
                    for="birthDate"
                    className="label-font"
                    sm={3}
                  >
                    Date of Birth:
                  </Label>
                  <Col sm={6}>
                    <Input
                      onChange={handleChange}
                      type="date"
                      className="input-size"
                      name="birthDate"
                      id="birthDate"
                      value={companyDetials.birthDate}
                      dateFormat="yyyy-mm-dd"
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Mother’s Maiden Name​"
                    for="mothersMaidenName"
                    className="label-font"
                    sm={3}
                  >
                    Mother’s Maiden Name​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="mothersMaidenName"
                      id="mothersMaidenName"
                      value={companyDetials.mothersMaidenName}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Col sm={9}>
                    <hr></hr>
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Contact Details"
                    for="Contact Details"
                    className="label-font"
                    sm={3}
                  >
                    Contact Details:​
                  </Label>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="mobile Number"
                    for="residentCountryCode"
                    className="label-font"
                    sm={3}
                  >
                    Mobile Number*
                  </Label>
                  <Col sm={2}>
                    <Input
                      type="select"
                      name="residentCountryCode"
                      id="residentCountryCode"
                      onChange={handleChange}
                      value={companyDetials?.residentCountryCode}
                      readOnly={formEditable}
                    >
                      <option>+65</option>
                      <option>+91</option>
                      <option>+60</option>
                    </Input>
                  </Col>
                  <Col sm={4}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={companyDetials.mobileNumber}
                      readOnly={formEditable}
                    />
                    {errors.MobileNoError &&
                      errors?.MobileNoError !== "null" && (
                        <Label className="text-red">
                          {errors.MobileNoError}
                        </Label>
                      )}
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Email Address​"
                    for="emailAddress"
                    className="label-font"
                    sm={3}
                  >
                    Email Address​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="emailAddress"
                      id="emailAddress"
                      value={companyDetials.emailAddress}
                      readOnly={formEditable}
                    />
                    {errors.EmailIdError && errors?.EmailIdError !== "null" && (
                      <Label className="text-red">{errors.EmailIdError}</Label>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Col sm={9}>
                    <hr></hr>
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Resident Address"
                    for="Resident Address"
                    className="label-font"
                    sm={3}
                  >
                    Resident Address:
                  </Label>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label for="Address1" className="label-font" sm={3}>
                    Address Line 1:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="residentAddress1"
                      id="residentAddress1"
                      value={companyDetials.residentAddress1}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label for="residentAddress2" className="label-font" sm={3}>
                    Address Line 2:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      type="text"
                      className="input-size"
                      name="residentAddress2"
                      id="residentAddress2"
                      value={companyDetials.residentAddress2}
                      onChange={handleChange}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label for="residentPostcode" className="label-font" sm={3}>
                    Post Code:
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="select"
                      name="residentPostcode"
                      id="residentPostcode"
                      onChange={handleChange}
                      value={companyDetials.residentPostcode}
                      readOnly={formEditable}
                    >
                      <option key="-1">Select Postal Code</option>
                      {getAllpostalCode &&
                        getAllpostalCode?.map(
                          (residentPostcode: any, index: number) => {
                            return (
                              <option key={index}>
                                {residentPostcode.code}
                              </option>
                            );
                          }
                        )}
                    </Input>
                    {errors.postallCodeError &&
                      errors?.postallCodeError !== "null" && (
                        <Label className="text-red">
                          {errors.postallCodeError}
                        </Label>
                      )}
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label for="residentCityCode" className="label-font" sm={3}>
                    City:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="residentCityCode"
                      id="residentCityCode"
                      value={companyDetials.residentCityCode}
                      readOnly={formEditable}
                    />
                    {errors.cityyError && errors?.cityyError !== "null" && (
                      <Label className="text-red">{errors.cityyError}</Label>
                    )}
                  </Col>
                </FormGroup>
                <FormGroup row className="Form-group">
                  <Label for="residentStateCode" className="label-font" sm={3}>
                    State​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="residentStateDescription"
                      id="residentStateDescription"
                      value={companyDetials.residentStateDescription}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    for="residentCountryDescription"
                    className="label-font"
                    sm={3}
                  >
                    Country​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      type="text"
                      className="input-size"
                      name="residentCountryDescription"
                      id="residentCountryDescription"
                      value={"Malaysia"}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Col sm={9}>
                    <hr></hr>
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label for="Mailing" className="label-font" sm={3}>
                    Mailing Address:
                  </Label>
                  <Col sm={6} className="box">
                    <input
                      id="Check"
                      type="checkbox"
                      name="isSameAddress"
                      onClick={() =>
                        setCompanyDetails({
                          ...companyDetials,
                          isSameAddress: !companyDetials.isSameAddress,
                        })
                      }
                      className="checkbox"
                      checked={companyDetials.isSameAddress}
                      disabled={formEditable}
                    />
                    <label className="label">Same as Residential Address</label>
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Address one"
                    for="mailAddress1"
                    className="label-font"
                    sm={3}
                  >
                    Address Line 1:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="mailAddress1"
                      id="mailAddress1"
                      value={companyDetials.mailAddress1}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Address two"
                    for="mailAddress2"
                    className="label-font"
                    sm={3}
                  >
                    Address Line 2:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="mailAddress2"
                      id="mailAddress2"
                      value={companyDetials.mailAddress2}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Post Code"
                    for="mailPostcode"
                    className="label-font"
                    sm={3}
                  >
                    Post Code:
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="select"
                      name="mailPostcode"
                      id="mailPostcode"
                      onChange={handleChange}
                      value={companyDetials.mailPostcode}
                      readOnly={formEditable}
                    >
                      <option key="-1">Select Postal Code</option>
                      {getAllpostalCode &&
                        getAllpostalCode?.map(
                          (mailPostcode: any, index: number) => {
                            return (
                              <option key={index}>{mailPostcode.code}</option>
                            );
                          }
                        )}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="City"
                    for="mailCityCode"
                    className="label-font"
                    sm={3}
                  >
                    City:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="mailCityCode"
                      id="mailCityCode"
                      readOnly={formEditable}
                      value={companyDetials.mailCityCode}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="State"
                    for="State​"
                    className="label-font"
                    sm={3}
                  >
                    State​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      readOnly={formEditable}
                      name="mailStateCode"
                      id="mailStateCode"
                      value={companyDetials.mailStateCode}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Country"
                    for="Country​"
                    className="label-font"
                    sm={3}
                  >
                    Country​:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      type="text"
                      className="input-size"
                      name="mailCountryDescription"
                      id="mailCountryDescription"
                      value={"Malaysia"}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Col sm={9}>
                    <hr></hr>
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Other Details"
                    for="Details"
                    className="label-font"
                    sm={3}
                  >
                    Other Details:
                  </Label>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Bank Name"
                    for="bankName"
                    className="label-font"
                    sm={3}
                  >
                    Bank Name:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="bankName"
                      id="bankName"
                      value={companyDetials.bankName}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Bank Account"
                    for="bankAccountNo"
                    className="label-font"
                    sm={3}
                  >
                    Bank Account No:
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="bankAccountNo"
                      id="bankAccountNo"
                      value={companyDetials.bankAccountNo}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Occupation"
                    for="occupation"
                    className="label-font"
                    sm={3}
                  >
                    Occupation
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="occupation"
                      id="occupation"
                      value={companyDetials.occupation}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Prefered Language"
                    for="preferredLanguage"
                    className="label-font"
                    sm={3}
                  >
                    Prefered Language
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="preferredLanguage"
                      id="preferredLanguage"
                      value={companyDetials.preferredLanguage}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="Form-group">
                  <Label
                    data-testid="Link Employee"
                    for="linkEmployer"
                    className="label-font"
                    sm={3}
                  >
                    Link Employee
                  </Label>
                  <Col sm={6}>
                    <CustomInput
                      onChange={handleChange}
                      type="text"
                      className="input-size"
                      name="linkEmployer"
                      id="linkEmployer"
                      value={companyDetials.companyName}
                      readOnly={formEditable}
                    />
                  </Col>
                </FormGroup>

                {error && (
                  <Label
                    style={{
                      textAlign: "center",
                      marginTop: "2px",
                      fontSize: "18px",
                    }}
                    className="text-red"
                  >
                    *{error}
                  </Label>
                )}
                <div
                  style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Row>
                    <Col sm="12" md={{ size: 10, offset: 2 }}>
                      <CardBody
                        style={{
                          height: "100%",
                          background: "grey",
                          width: "75%",
                          borderRadius: "19px",
                        }}
                      >
                        <div className="Form-group">
                          <Row>
                            <Col sm={12}>
                              <CustomInput
                                placeholder="Message"
                                type="text"
                                className="input-size"
                                name="Cancel"
                                id="cancel"
                                readOnly={true}
                              />
                            </Col>
                          </Row>
                        </div>
                        <div className="Form-group">
                          <Row>
                            {props.method === "addMethod" ? (
                              <Col sm={2}>
                                <Button onClick={NewEmployeeOnboarding}>
                                  Submit{" "}
                                </Button>
                              </Col>
                            ) : (
                              <Col sm={2}>
                                <Button
                                  onClick={updateCompanyUser}
                                  disabled={formEditable}
                                >
                                  update{" "}
                                </Button>
                              </Col>
                            )}

                            <Col sm={2}>
                              <Button onClick={props.cancelClickEven}>
                                Cancel
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </CardBody>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default PreOnboarding;
