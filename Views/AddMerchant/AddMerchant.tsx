import { Switch } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import "./AddMerchant.scss";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input, Label } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import {
  resetMerchantCreateMessage,
  createMerchantData,
} from "../../redux/action/MerchantSetupAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import moment from "moment";
import { getPositionHeldReferenceData } from "../../redux/action/CustomerEnquiryAction";

function AddMerchant() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [contactNum, setContactNum] = useState("");
  const [contactCountryCode, setContactCountryCode] = useState("+60");
  const [contactNumErr, setContactNumErr] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [merchantSummaryData, setMerchantSummaryData] = useState({
    mirsCode: "",
    merchantName: "",
    oldRegistrationCode: "",
    merchantActivationDate: "",
    merchantApprovalDate: "",
    merchantAddress: "",
    merchantPhoneNumber: "",
    merchantLatitude: "",
    merchantLongitude: "",
    operationStartHour: "",
    operationEndHour: "",
    contactNumber: "",
    contactPerson: "",
    contactPersonEmail: "",
    merchantStatus: "ACTIVE",
    merchantCategory: "",
    isSuperMerchant: false,
    isMerchant: true,
    companyRegistrationNumber: "",
    companyExpiryDate: "",
    businessRegistrationNumber: "",
    businessExpiryDate: "",
    incomeTaxNumber: "",
  });

  const [merchantSummaryDataErr, setMerchantSummaryDataErr] = useState({
    mirsCodeErr: "",
    merchantNameErr: "",
    oldRegistrationCodeErr: "",
    merchantActivationDateErr: "",
    merchantApprovalDateErr: "",
    merchantAddressErr: "",
    merchantLatitudeErr: "",
    merchantLongitudeErr: "",
    operationStartHourErr: "",
    operationEndHourErr: "",
    contactPersonErr: "",
    contactPersonEmailErr: "",
    merchantCategoryErr: "",
    companyRegistrationNumberErr: "",
    companyExpiryDateErr: "",
    businessRegistrationNumberErr: "",
    businessExpiryDateErr: "",
    incomeTaxNumberErr: "",
  });

  const merchantCreateError: any = useSelector(
    (state: RootStateOrAny) => state.MerchantSetupReducer.getMerchantCreateError
  );

  const positionHeldList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getPositionHeldList
  );

  const fetchPositionHeldList = useCallback(async () => {
    try {
      dispatch(getPositionHeldReferenceData("positionheld"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchPositionHeldList();
  }, [fetchPositionHeldList]);

  useEffect(() => {
    if (merchantCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantCreateMessage());
      }, 4000);
    }
  }, [merchantCreateError]);

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
  };

  const handleChangeContactNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setContactNum(onlyNums);
  };

  const handle_Merchant_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerchantSummaryData({
      ...merchantSummaryData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let mirsCode = customValidator(
      "promoCodeMandatoryFields",
      "Mirs Code",
      merchantSummaryData?.mirsCode
    );

    let merchantName = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Name",
      merchantSummaryData?.merchantName
    );

    let merchantActivationDate = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Activation Date",
      merchantSummaryData?.merchantActivationDate
    );

    let merchantApprovalDate = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Approval Date",
      merchantSummaryData?.merchantApprovalDate
    );

    let merchantAddress = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Address",
      merchantSummaryData?.merchantAddress
    );

    let merchantLongitude = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Longitude",
      merchantSummaryData?.merchantLongitude
    );

    let merchantLatitude = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Latitude",
      merchantSummaryData?.merchantLatitude
    );

    let operationStartHour = customValidator(
      "promoCodeMandatoryFields",
      "Operation Start Hour",
      merchantSummaryData?.operationStartHour
    );

    let operationEndHour = customValidator(
      "promoCodeMandatoryFields",
      "Operation End Hour",
      merchantSummaryData?.operationEndHour
    );

    let contactPerson = customValidator(
      "promoCodeMandatoryFields",
      "Contact Person",
      merchantSummaryData?.contactPerson
    );

    let contactPersonEmail = customValidator(
      "emailAddressCustomerEdit",
      "Contact Person",
      merchantSummaryData?.contactPersonEmail
    );

    let merchantCategory = customValidator(
      "promoCodeMandatoryFields",
      "Merchant Category",
      merchantSummaryData?.merchantCategory
    );

    let oldRegistrationCode = customValidator(
      "promoCodeMandatoryFields",
      "Old Registration Code",
      merchantSummaryData?.oldRegistrationCode
    );
    let companyRegistrationNumber = customValidator(
      "promoCodeMandatoryFields",
      "Company Registration Number",
      merchantSummaryData?.companyRegistrationNumber
    );

    let companyExpiryDate = customValidator(
      "promoCodeMandatoryFields",
      "Company Expiry Date",
      merchantSummaryData?.companyExpiryDate
    );

    let businessRegistrationNumber = customValidator(
      "promoCodeMandatoryFields",
      "businessRegistrationNumber",
      merchantSummaryData?.businessRegistrationNumber
    );

    let businessExpiryDate = customValidator(
      "promoCodeMandatoryFields",
      "Business Expiry Date",
      merchantSummaryData?.businessExpiryDate
    );

    let incomeTaxNumber = customValidator(
      "promoCodeMandatoryFields",
      "Income Tax Number",
      merchantSummaryData?.incomeTaxNumber
    );

    if (
      !(
        mirsCode === "null" &&
        merchantName === "null" &&
        merchantActivationDate === "null" &&
        merchantApprovalDate === "null" &&
        merchantAddress === "null" &&
        merchantLongitude === "null" &&
        merchantLatitude === "null" &&
        operationStartHour === "null" &&
        operationEndHour === "null" &&
        contactPersonEmail === "null" &&
        merchantCategory === "null" &&
        oldRegistrationCode === "null" &&
        companyRegistrationNumber === "null" &&
        companyExpiryDate === "null" &&
        businessRegistrationNumber === "null" &&
        businessExpiryDate === "null" &&
        incomeTaxNumber === "null" &&
        contactPerson === "null"
      )
    ) {
      setMerchantSummaryDataErr({
        mirsCodeErr: mirsCode,
        merchantNameErr: merchantName,
        oldRegistrationCodeErr: oldRegistrationCode,
        merchantActivationDateErr: merchantActivationDate,
        merchantApprovalDateErr: merchantApprovalDate,
        merchantAddressErr: merchantAddress,
        merchantLatitudeErr: merchantLatitude,
        merchantLongitudeErr: merchantLongitude,
        operationStartHourErr: operationStartHour,
        operationEndHourErr: operationEndHour,
        contactPersonErr: contactPerson,
        contactPersonEmailErr: contactPersonEmail,
        merchantCategoryErr: merchantCategory,
        companyRegistrationNumberErr: companyRegistrationNumber,
        companyExpiryDateErr: companyExpiryDate,
        businessRegistrationNumberErr: businessRegistrationNumber,
        businessExpiryDateErr: businessExpiryDate,
        incomeTaxNumberErr: incomeTaxNumber,
      });
      return false;
    } else {
      setMerchantSummaryDataErr({
        mirsCodeErr: "",
        merchantNameErr: "",
        oldRegistrationCodeErr: "",
        merchantActivationDateErr: "",
        merchantApprovalDateErr: "",
        merchantAddressErr: "",
        merchantLatitudeErr: "",
        merchantLongitudeErr: "",
        operationStartHourErr: "",
        operationEndHourErr: "",
        contactPersonErr: "",
        contactPersonEmailErr: "",
        merchantCategoryErr: "",
        companyRegistrationNumberErr: "",
        companyExpiryDateErr: "",
        businessRegistrationNumberErr: "",
        businessExpiryDateErr: "",
        incomeTaxNumberErr: "",
      });
      return true;
    }
  };

  const validate_mobileNumber = () => {
    if (countryCode === "+60") {
      if (mobileNum?.length < 9 || mobileNum?.length > 13) {
        setMobileNumErr(true);
        return false;
      } else {
        merchantSummaryData.merchantPhoneNumber = mobileNo;
        setMobileNumErr(false);
        return true;
      }
    } else {
      if (mobileNum.length >= 5) {
        merchantSummaryData.merchantPhoneNumber = mobileNo;
        setMobileNumErr(false);
        return true;
      } else {
        setMobileNumErr(true);
        return false;
      }
    }
  };

  const validate_contactNumber = () => {
    if (contactCountryCode === "+60") {
      if (contactNum?.length < 9 || contactNum?.length > 13) {
        setContactNumErr(true);
        return false;
      } else {
        merchantSummaryData.contactNumber = contactNo;
        setContactNumErr(false);
        return true;
      }
    } else {
      if (contactNum.length >= 5) {
        merchantSummaryData.contactNumber = contactNo;
        setContactNumErr(false);
        return true;
      } else {
        setContactNumErr(true);
        return false;
      }
    }
  };

  const addMerchant_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate_mobileNumber() && validate_contactNumber()) {
      if (validate()) {
        dispatch(createMerchantData(merchantSummaryData));
      }
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const handle_Cancel = () => {
    history.goBack();
  };

  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  let contactNo = "+" + contactCountryCode.slice(1) + contactNum;
  return (
    <div className="AddMerchant">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">Add Merchant</h1>
          <div
            className={"d-flex commonEdit-BackButton"}
            onClick={handle_Cancel}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
          </div>
        </div>

        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={merchantCreateError?.message}
            closeMessage={closeMessage}
          />
        )}

        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <form onSubmit={addMerchant_onSubmit}>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant Name<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="merchantName"
                        value={merchantSummaryData?.merchantName}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.merchantNameErr &&
                        merchantSummaryDataErr?.merchantNameErr !== "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantNameErr}
                          </Label>
                        )}
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Activation Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="date"
                        className="no-border remit_feesAndCharges"
                        name="merchantActivationDate"
                        max={moment().format("YYYY-MM-DD")}
                        value={merchantSummaryData?.merchantActivationDate}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.merchantActivationDateErr &&
                        merchantSummaryDataErr?.merchantActivationDateErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantActivationDateErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Approval Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="date"
                        className="no-border remit_feesAndCharges"
                        name="merchantApprovalDate"
                        max={moment().format("YYYY-MM-DD")}
                        value={merchantSummaryData?.merchantApprovalDate}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.merchantApprovalDateErr &&
                        merchantSummaryDataErr?.merchantApprovalDateErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantApprovalDateErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant Phone No<span className="span-col">*</span>
                      </label>
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
                        <div className="col">
                          <div className="col">
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
                              onChange={handleChangeMobileNo}
                              maxLength={15}
                              minLength={5}
                            ></Input>
                            {mobileNumErr && (
                              <Label className="text-red">
                                Invalid Phone Number.
                              </Label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant Address
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="textarea"
                        className="no-border remit_feesAndCharges merchant-fontSize"
                        name="merchantAddress"
                        value={merchantSummaryData?.merchantAddress}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.merchantAddressErr &&
                        merchantSummaryDataErr?.merchantAddressErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantAddressErr}
                          </Label>
                        )}
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Longitude<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="merchantLongitude"
                        value={merchantSummaryData?.merchantLongitude}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.merchantLongitudeErr &&
                        merchantSummaryDataErr?.merchantLongitudeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantLongitudeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Latitude<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="merchantLatitude"
                        value={merchantSummaryData?.merchantLatitude}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.merchantLatitudeErr &&
                        merchantSummaryDataErr?.merchantLatitudeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantLatitudeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2 d-flex">
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Start Time<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          type="time"
                          className="no-border remit_feesAndCharges merchant-fontSize"
                          name="operationStartHour"
                          step={1}
                          value={merchantSummaryData?.operationStartHour}
                          onChange={handle_Merchant_onChange}
                        />
                        {merchantSummaryDataErr?.operationStartHourErr &&
                          merchantSummaryDataErr?.operationStartHourErr !==
                            "null" && (
                            <Label className="text-red">
                              {merchantSummaryDataErr?.operationStartHourErr}
                            </Label>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          End Time<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-2">
                        <Input
                          type="time"
                          className="no-border remit_feesAndCharges merchant-fontSize"
                          name="operationEndHour"
                          step={1}
                          value={merchantSummaryData?.operationEndHour}
                          onChange={handle_Merchant_onChange}
                        />
                        {merchantSummaryDataErr?.operationEndHourErr &&
                          merchantSummaryDataErr?.operationEndHourErr !==
                            "null" && (
                            <Label className="text-red">
                              {merchantSummaryDataErr?.operationEndHourErr}
                            </Label>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Contact Person
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges merchant-fontSize"
                        name="contactPerson"
                        value={merchantSummaryData?.contactPerson}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.contactPersonErr &&
                        merchantSummaryDataErr?.contactPersonErr !== "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.contactPersonErr}
                          </Label>
                        )}
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Contact Number<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-2">
                      <div className="col d-flex">
                        <div className="col-3 me-1">
                          <div className="col-11">
                            <Input
                              name="contactCountryCode"
                              type="select"
                              className="Kyc-FilterINputBox form-input"
                              value={contactCountryCode}
                              onChange={(e) =>
                                setContactCountryCode(e.target.value)
                              }
                            >
                              <option>+60</option>
                              <option>+65</option>
                              <option>+91</option>
                            </Input>
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="col">
                            <Input
                              name="contactNo"
                              type="text"
                              value={contactNum}
                              className={
                                contactNumErr
                                  ? "validation-error kyc-noBorder"
                                  : "Kyc-FilterINputBox form-input"
                              }
                              placeholder="contact number"
                              onChange={handleChangeContactNo}
                              maxLength={15}
                              minLength={5}
                            ></Input>
                            {contactNumErr && (
                              <Label className="text-red">
                                Invalid Contact Number.
                              </Label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Contact Person Email<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="contactPersonEmail"
                        value={merchantSummaryData?.contactPersonEmail}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.contactPersonEmailErr &&
                        merchantSummaryDataErr?.contactPersonEmailErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.contactPersonEmailErr}
                          </Label>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant Status
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="YES"
                        unCheckedChildren="NO"
                        checked={
                          merchantSummaryData?.merchantStatus == "ACTIVE"
                            ? true
                            : false
                        }
                        onChange={() =>
                          setMerchantSummaryData({
                            ...merchantSummaryData,
                            merchantStatus:
                              merchantSummaryData.merchantStatus == "ACTIVE"
                                ? "INACTIVE"
                                : "ACTIVE",
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant Category<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="merchantCategory"
                        style={{
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_Merchant_onChange}
                      >
                        <option selected hidden className="cursor">
                          Select
                        </option>
                        {positionHeldList?.data?.map((e: any, i: number) => {
                          return <option key={i}>{e.description}</option>;
                        })}
                      </Input>
                      {merchantSummaryDataErr?.merchantCategoryErr &&
                        merchantSummaryDataErr?.merchantCategoryErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.merchantCategoryErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        MIRS Code<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="mirsCode"
                        value={merchantSummaryData?.mirsCode}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.mirsCodeErr &&
                        merchantSummaryDataErr?.mirsCodeErr !== "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.mirsCodeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Old Registration Code<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="oldRegistrationCode"
                        value={merchantSummaryData?.oldRegistrationCode}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.oldRegistrationCodeErr &&
                        merchantSummaryDataErr?.oldRegistrationCodeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.oldRegistrationCodeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Super Merchant
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={merchantSummaryData?.isSuperMerchant}
                        onChange={() =>
                          setMerchantSummaryData({
                            ...merchantSummaryData,
                            isSuperMerchant:
                              !merchantSummaryData?.isSuperMerchant,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={merchantSummaryData?.isMerchant}
                        onChange={() =>
                          setMerchantSummaryData({
                            ...merchantSummaryData,
                            isMerchant: !merchantSummaryData?.isMerchant,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Company Registration No
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="companyRegistrationNumber"
                        value={merchantSummaryData?.companyRegistrationNumber}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.companyRegistrationNumberErr &&
                        merchantSummaryDataErr?.companyRegistrationNumberErr !==
                          "null" && (
                          <Label className="text-red">
                            {
                              merchantSummaryDataErr?.companyRegistrationNumberErr
                            }
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Company Expiry Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="date"
                        className="no-border remit_feesAndCharges"
                        name="companyExpiryDate"
                        min={moment().format("YYYY-MM-DD")}
                        value={merchantSummaryData?.companyExpiryDate}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.companyExpiryDateErr &&
                        merchantSummaryDataErr?.companyExpiryDateErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.companyExpiryDateErr}
                          </Label>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Business Registration No
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges merchant-fontSize"
                        name="businessRegistrationNumber"
                        value={merchantSummaryData?.businessRegistrationNumber}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.businessRegistrationNumberErr &&
                        merchantSummaryDataErr?.businessRegistrationNumberErr !==
                          "null" && (
                          <Label className="text-red">
                            {
                              merchantSummaryDataErr?.businessRegistrationNumberErr
                            }
                          </Label>
                        )}
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Business Expiry Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="date"
                        className="no-border remit_feesAndCharges"
                        name="businessExpiryDate"
                        min={moment().format("YYYY-MM-DD")}
                        value={merchantSummaryData?.businessExpiryDate}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.businessExpiryDateErr &&
                        merchantSummaryDataErr?.businessExpiryDateErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.businessExpiryDateErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Income Tax No<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="incomeTaxNumber"
                        value={merchantSummaryData?.incomeTaxNumber}
                        onChange={handle_Merchant_onChange}
                      />
                      {merchantSummaryDataErr?.incomeTaxNumberErr &&
                        merchantSummaryDataErr?.incomeTaxNumberErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantSummaryDataErr?.incomeTaxNumberErr}
                          </Label>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-0">
                <CustomButton
                  color="danger kyc-FilterSearchButton"
                  className="btn2"
                >
                  Submit
                </CustomButton>
                <CustomButton
                  color="secondary"
                  className="btn2"
                  component={"payrollEnquiry"}
                  onClick={handle_Cancel}
                >
                  Cancel
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMerchant;
