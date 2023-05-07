import React, { useCallback, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaEraser } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Card, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import { payrollCompanyMaintenanceProps } from "../../models/PayrollCompanyMaintenanceModel";
import {
  restCreatedCompanyData,
  deletePayrollCompanyData,
  getAllCompanyData,
  getSelectedCompanyData,
  postNewPayrollCompanyData,
  restCompanyData,
  updatePayrollCompanyData,
} from "../../redux/action/CompanyMaintenanceAction";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import "./PayrollCompanyMaintenance.scss";

const PayrollCompanyMaintenance = (props: payrollCompanyMaintenanceProps) => {
  const dispatch = useDispatch();
  const [forEditElement, setForEditElement] = useState("");
  const [forDeleteElement, setForDeleteElement] = useState("");
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
  const [isDeletePopUpshown, setIsDeletePopUpshown] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    companyNameError: "",
    companyRegistrationNoError: "",
    address1Error: "",
    postalCodeError: "",
    cityError: "",
    countryError: "",
    companyEmailError: "",
    companyPhoneNoError: "",
    authorizerNameError: "",
    authorizerMobileNoError: "",
    countryCodeNoError: "",
  });

  const validate = () => {
    let storkecompanyNameError = customValidator(
      "companyname",
      "Company Name",
      companyDetials?.companyName
    );

    let accesscompanyRegistrationNoError = customValidator(
      "companyregistrationno",
      "Company RegistrationNo",
      companyDetials?.companyRegistrationNo
    );
    let referenceaddress1Error = customValidator(
      "address1",
      "Address1",
      companyDetials?.address1
    );
    let lookoutpostalCodeError = customValidator(
      "postalCode",
      "postal Code",
      companyDetials?.postalCode
    );
    let metropoliscityError = customValidator(
      "city",
      "City",
      companyDetials?.city
    );
    let allycountryError = customValidator(
      "required",
      "Country",
      companyDetials?.country
    );
    let spancompanyEmailError = customValidator(
      "companyEmail",
      "Company Email",
      companyDetials?.companyEmail
    );
    let handsetcompanyPhoneNoError = customValidator(
      "companyphoneno",
      "Company PhoneNo",
      companyDetials?.companyPhoneNo
    );

    let mainauthorizerNameError = customValidator(
      "authorizerName",
      "Authorizer Name",
      companyDetials?.authorizerName
    );

    let empoverauthorizerMobileNoError = customValidator(
      "companyphoneno",
      "Authorizer MobileNo",
      companyDetials?.authorizerMobileNo
    );

    if (
      !(
        storkecompanyNameError === "null" &&
        accesscompanyRegistrationNoError === "null" &&
        referenceaddress1Error === "null" &&
        lookoutpostalCodeError === "null" &&
        metropoliscityError === "null" &&
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
        companyRegistrationNoError: accesscompanyRegistrationNoError,
        address1Error: referenceaddress1Error,
        postalCodeError: lookoutpostalCodeError,
        cityError: metropoliscityError,
        countryError: allycountryError,
        companyEmailError: spancompanyEmailError,
        companyPhoneNoError: handsetcompanyPhoneNoError,
        authorizerNameError: mainauthorizerNameError,
        authorizerMobileNoError: empoverauthorizerMobileNoError,
        countryCodeNoError: "",
      });
      return false;
    }
    setErrors({
      companyNameError: "",
      companyRegistrationNoError: "",
      address1Error: "",
      postalCodeError: "",
      cityError: "",
      countryError: "",
      companyEmailError: "",
      companyPhoneNoError: "",
      authorizerNameError: "",
      authorizerMobileNoError: "",
      countryCodeNoError: "",
    });
    return true;
  };

  const getSelectedCompanyInfo = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.selectedCompanyResponse
  );
  const createdComapanyInfo = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.postNewPayrollCompanytDataResponse
  );

  const fetchAllData = useCallback(() => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (createdComapanyInfo !== undefined) {
      if (createdComapanyInfo.data) {
        props.showCompanyMaintenance();
        setError("");
        fetchAllData();
      } else if (createdComapanyInfo.error) {
        setError(createdComapanyInfo.message);
      }
    }
  }, [fetchAllData, createdComapanyInfo, props.showCompanyMaintenance]);

  useEffect(() => {
    if (Object.keys(props?.companyDataView).length > 0) {
      setCompanyDetails(getSelectedCompanyInfo);
    }
  }, [props?.companyDataView, getSelectedCompanyInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyDetails({ ...companyDetials, [e.target.name]: e.target.value });
  };

  const handleDropDownChages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      let cityState: any = props.postalCode.filter(
        (data: any) => data.code === e.target.value
      )[0];
      setCompanyDetails({
        ...companyDetials,
        [e.target.name]: e.target.value,
        city: cityState.details.CITY,
        state: cityState.details.STATE,
      });
    } else {
      setCompanyDetails({
        ...companyDetials,
        [e.target.name]: e.target.value,
        city: "",
        state: "",
      });
    }
  };

  const createNewPayrollCompany = useCallback(
    (body) => {
      try {
        dispatch(postNewPayrollCompanyData(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const ResetPreviousCreatedCompanyInfo = useCallback(() => {
    try {
      dispatch(restCreatedCompanyData());
    } catch (err) {}
  }, [dispatch]);

  const getCompanyInfo = useCallback(async () => {
    try {
      dispatch(getSelectedCompanyData(props.companyDataView.id));
    } catch (err) {}
  }, [dispatch, props.companyDataView.id]);

  useEffect(() => {
    if (props.companyDataView.id) {
      getCompanyInfo();
    }
    ResetPreviousCreatedCompanyInfo();
  }, [getCompanyInfo, ResetPreviousCreatedCompanyInfo]);

  const UpdatePayrollCompany = useCallback(
    async (companyDetials) => {
      try {
        dispatch(updatePayrollCompanyData(companyDetials));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetCompanyInfo = useCallback(async () => {
    try {
      dispatch(restCompanyData());
    } catch (err) {}
  }, [dispatch]);

  const DeleteCompanyRecord = useCallback(
    async (companyRegistrationNO) => {
      try {
        dispatch(deletePayrollCompanyData(companyRegistrationNO));
      } catch (err) {}
    },
    [dispatch]
  );

  const addMethod = () => {
    if (validate()) {
      createNewPayrollCompany(companyDetials);
    }
  };

  const updateMethod = () => {
    if (validate()) {
      UpdatePayrollCompany(companyDetials).then(() => {
        resetCompanyInfo();
        props.showCompanyMaintenance();
        fetchAllData();
      });
    }
  };

  const buttonElementForAddMethod = () => {
    return (
      <div className="payrollmaintance-btn-alignment">
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="primary"
          onClick={() => addMethod()}
          data-testid="Submitted"
        >
          Submit
        </CustomButton>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
          data-testid="Calceled"
        >
          Cancel
        </CustomButton>
      </div>
    );
  };
  const buttonElementForViewMethod = () => {
    return (
      <div className="payrollmaintance-btn-alignment">
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
        >
          Cancel
        </CustomButton>
      </div>
    );
  };

  const buttonElementForEditMethod = () => {
    return (
      <div className="payrollmaintance-btn-alignment">
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="primary"
          onClick={() => updateMethod()}
        >
          Update
        </CustomButton>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
        >
          Cancel
        </CustomButton>
      </div>
    );
  };

  const editCompanyRecordHandler = (_method: string) => {
    setForEditElement("editMethod");
  };

  const deleteCompanyRecordHandler = (_method: string) => {
    setForDeleteElement("deleteMethod");
  };

  const deleteCompanyEventHandler = () => {
    setIsDeletePopUpshown(!isDeletePopUpshown);
    deleteCompanyRecordHandler("deleteMethod");
  };
  const deletePopUpHandler = (confirmation: string) => {
    if (confirmation === "yes") {
      DeleteCompanyRecord(props.companyDataView.id).then(() => {
        fetchAllData();
        setIsDeletePopUpshown(!isDeletePopUpshown);
        props.cancelMethod();
      });
    } else {
      setIsDeletePopUpshown(!isDeletePopUpshown);
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
              onClick={props.showCompanyMaintenance}
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
              Payroll Company Maintenance
            </Col>
            <Col sm="3"></Col>
          </Row>
        </div>
        <div className="custom">
          <div className="bt-header" data-testid="Record">
            Record Reference
          </div>
          {forDeleteElement === "deleteMethod" ? (
            <div className="bt2">Delete</div>
          ) : forEditElement === "editMethod" ? (
            <div className="bt2">Edit</div>
          ) : props.onClickEvents === "addMethod" ? (
            <div className="bt2">Add</div>
          ) : props.onClickEvents === "viewMethod" ? (
            <div className="bt2">View</div>
          ) : null}
          {props.optionalIcons !== "addMethod" && (
            <div className=" aln-lft">
              <CustomButton
                className="colourchange"
                onClick={() => editCompanyRecordHandler("editMethod")}
              >
                <GrEdit></GrEdit>
              </CustomButton>
              <CustomButton
                className="colourchange"
                onClick={() => deleteCompanyEventHandler()}
              >
                <FaEraser></FaEraser>
              </CustomButton>
            </div>
          )}
        </div>
        <div className="create">
          <h4 style={{ marginTop: "1rem" }}>Company Details :</h4>
          <Form onSubmit={(e) => e.preventDefault()}>
            <div className="details">
              <FormGroup row className="Form-group">
                <Label
                  for="uid"
                  className="label-font"
                  sm={3}
                  data-testid="Records"
                >
                  UID
                </Label>
                <Col sm={5}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="uid"
                    id="uid"
                    value={companyDetials?.id}
                    readOnly={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label
                  for="uid"
                  className="label-font"
                  sm={3}
                  data-testid="Account-test"
                >
                  Account UID
                </Label>
                <Col sm={5}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="accountuid"
                    id="uid"
                    value={companyDetials?.companyAccountId}
                    readOnly={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label
                  for="company name"
                  className="label-font"
                  sm={3}
                  data-testid="Company-test"
                >
                  Company Name*
                </Label>
                <Col sm={5}>
                  <CustomInput
                    type="textarea"
                    name="companyName"
                    id="companyName"
                    value={companyDetials?.companyName}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.companyNameError &&
                    errors?.companyNameError !== "null" && (
                      <Label className="text-red">
                        {errors.companyNameError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label
                  for="registration"
                  className="label-font"
                  sm={3}
                  data-testid="Company-Reg"
                >
                  Company RegistrationNo*{" "}
                </Label>
                <Col sm={2}>
                  <CustomInput
                    type="text"
                    name="companyRegistrationNo"
                    id="registration"
                    value={companyDetials?.companyRegistrationNo}
                    onChange={handleChange}
                    readOnly={
                      props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.companyRegistrationNoError &&
                    errors?.companyRegistrationNoError !== "null" && (
                      <Label className="text-red">
                        {errors.companyRegistrationNoError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
            </div>
            <h4 style={{ marginTop: "2rem" }} data-testid="Address">
              Company Address :
            </h4>
            <div className="details">
              <FormGroup row className="Form-group">
                <Label
                  for="address1"
                  className="label-font"
                  sm={3}
                  data-testid="Address-one"
                >
                  Address 1*
                </Label>
                <Col sm={4}>
                  <CustomInput
                    type="textarea"
                    name="address1"
                    id="address1"
                    value={companyDetials?.address1}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.address1Error && errors?.address1Error !== "null" && (
                    <Label className="text-red">{errors.address1Error}</Label>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label
                  for="address2"
                  className="label-font"
                  sm={3}
                  data-testid="Address-two"
                >
                  Address 2
                </Label>
                <Col sm={4}>
                  <CustomInput
                    type="textarea"
                    name="address2"
                    id="address2"
                    value={companyDetials?.address2}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="city" className="label-font" sm={3}>
                  Postal Code*
                </Label>
                <Col sm={2}>
                  <Input
                    type="select"
                    name="postalCode"
                    id="postal code"
                    className="btn--sizer"
                    value={companyDetials?.postalCode}
                    onChange={handleDropDownChages}
                    disabled={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  >
                    <option key="-1" value="">
                      Select Postal Code
                    </option>
                    {props.postalCode &&
                      props.postalCode?.map(
                        (postalCode: any, index: number) => {
                          return <option key={index}>{postalCode.code}</option>;
                        }
                      )}
                  </Input>
                  {errors.postalCodeError &&
                    errors?.postalCodeError !== "null" && (
                      <Label className="text-red">
                        {errors.postalCodeError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="city" className="label-font" sm={3}>
                  City*
                </Label>
                <Col sm={4}>
                  <CustomInput
                    type="textarea"
                    name="city"
                    id="city"
                    value={companyDetials?.city}
                    onChange={handleChange}
                    readOnly={true}
                  />
                  {errors.cityError && errors?.cityError !== "null" && (
                    <Label className="text-red">{errors.cityError}</Label>
                  )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="state" className="label-font" sm={3}>
                  State
                </Label>
                <Col sm={4}>
                  <CustomInput
                    type="textarea"
                    name="state"
                    id="state"
                    defaultValue={companyDetials?.state}
                    onChange={handleChange}
                    readOnly={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="country" className="label-font" sm={3}>
                  Country*
                </Label>
                <Col sm={4}>
                  <Input
                    type="select"
                    name="country"
                    id="country"
                    value={companyDetials?.country}
                    onChange={handleChange}
                    disabled={true}
                  >
                    <option>{"Malaysia"}</option>
                  </Input>
                  {errors.countryError && errors?.countryError !== "null" && (
                    <Label className="text-red">{errors.countryError}</Label>
                  )}
                </Col>
              </FormGroup>
            </div>
            <h4 style={{ marginTop: "2rem" }}>Company Contact Details :</h4>
            <div className="details">
              <FormGroup row className="Form-group">
                <FormGroup row className="Form-group">
                  <Label for="telephone" className="label-font" sm={3}>
                    Telephone Number*
                  </Label>
                  <Col sm={2}>
                    <Input
                      name="countryCodeNo"
                      value={companyDetials?.countryCodeNo}
                      type="select"
                      onChange={handleChange}
                      readOnly={
                        forEditElement === "editMethod"
                          ? false
                          : props.onClickEvents === "viewMethod"
                          ? true
                          : forDeleteElement === "deleteMethod"
                          ? true
                          : false
                      }
                    >
                      <option>+65</option>
                      <option>+91</option>
                      <option>+60</option>
                    </Input>
                  </Col>
                  <Col sm={3}>
                    <CustomInput
                      type="text"
                      name="companyPhoneNo"
                      id="telephone"
                      value={companyDetials?.companyPhoneNo}
                      onChange={handleChange}
                      readOnly={
                        forEditElement === "editMethod"
                          ? false
                          : props.onClickEvents === "viewMethod"
                          ? true
                          : forDeleteElement === "deleteMethod"
                          ? true
                          : false
                      }
                    />
                    {errors.companyPhoneNoError &&
                      errors?.companyPhoneNoError !== "null" && (
                        <Label className="text-red">
                          {errors.companyPhoneNoError}
                        </Label>
                      )}
                  </Col>
                </FormGroup>
              </FormGroup>
            </div>
            <h4 style={{ marginTop: "2rem" }}>Authorized Contact Person :</h4>
            <div className="details">
              <FormGroup row className="Form-group">
                <Label for="pname" className="label-font" sm={3}>
                  Person Name*
                </Label>
                <Col sm={5}>
                  <CustomInput
                    type="text"
                    name="authorizerName"
                    id="company email"
                    value={companyDetials?.authorizerName}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.authorizerNameError &&
                    errors?.authorizerNameError !== "null" && (
                      <Label className="text-red">
                        {errors.authorizerNameError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="telephone" className="label-font" sm={3}>
                  Mobile Number*
                </Label>
                <Col sm={2}>
                  <Input
                    value={companyDetials?.countryCodeNo}
                    name="countryCodeNo"
                    type="select"
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  >
                    <option>+65</option>
                    <option>+91</option>
                    <option>+60</option>
                  </Input>
                </Col>
                <Col sm={3}>
                  <CustomInput
                    type="text"
                    name="authorizerMobileNo"
                    id="telephone"
                    value={companyDetials?.authorizerMobileNo}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.authorizerMobileNoError &&
                    errors?.authorizerMobileNoError !== "null" && (
                      <Label className="text-red">
                        {errors.authorizerMobileNoError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="company email" className="label-font" sm={3}>
                  {" "}
                  Email Address*
                </Label>
                <Col sm={5}>
                  <CustomInput
                    type="text"
                    name="companyEmail"
                    id="company email"
                    value={companyDetials?.companyEmail}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.companyEmailError &&
                    errors?.companyEmailError !== "null" && (
                      <Label className="text-red">
                        {errors.companyEmailError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="remarks" className="label-font" sm={3}>
                  Remarks
                </Label>
                <Col sm={5}>
                  <CustomInput
                    type="textarea"
                    name="remarks"
                    id="remarks"
                    value={companyDetials?.remarks}
                    onChange={handleChange}
                    readOnly={
                      forEditElement === "editMethod"
                        ? false
                        : props.onClickEvents === "viewMethod"
                        ? true
                        : forDeleteElement === "deleteMethod"
                        ? true
                        : false
                    }
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
            </div>

            {forEditElement === "editMethod"
              ? buttonElementForEditMethod()
              : forDeleteElement === "deleteMethod"
              ? null
              : props.onClickEvents === "addMethod"
              ? buttonElementForAddMethod()
              : buttonElementForViewMethod()}
          </Form>
          {}
        </div>
      </Card>
      <DeleteConfirmation
        deleteConfirmation={isDeletePopUpshown}
        deletePopUpHandler={deletePopUpHandler}
      ></DeleteConfirmation>
    </div>
  );
};

export default PayrollCompanyMaintenance;
