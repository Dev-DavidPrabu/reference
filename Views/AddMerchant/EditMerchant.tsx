import { Switch } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Input, Label } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { customValidator } from "../../Constants/Validation";
import { getPositionHeldReferenceData } from "../../redux/action/CustomerEnquiryAction";
import {
  resetMerchantUpdateMessage,
  updateMerchantData,
} from "../../redux/action/MerchantSetupAction";

function EditMerchant() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [mobileNum, setMobileNum] = useState( location?.state?.value?.merchantPhoneNumber?.substring(3) || "");
  const [countryCode, setCountryCode] = useState(location?.state?.value?.merchantPhoneNumber?.substring(0, 3) || "+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [contactNum, setContactNum] = useState(location?.state?.value?.contactNumber?.substring(3) || "");
  const [contactCountryCode, setContactCountryCode] = useState( location?.state?.value?.contactNumber?.substring(0, 3) || "+60");
  const [contactNumErr, setContactNumErr] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [merchantSummaryData, setMerchantSummaryData] = useState({
    id: location?.state?.value?.id,
    mirsCode: location?.state?.value?.mirsCode,
    oldRegistrationCode: location?.state?.value?.oldRegistrationCode,
    merchantActivationDate: location?.state?.value?.merchantActivationDate,
    merchantApprovalDate: location?.state?.value?.merchantApprovalDate,
    merchantName: location?.state?.value?.merchantName,
    merchantAddress: location?.state?.value?.merchantAddress,
    merchantPhoneNumber: location?.state?.value?.merchantPhoneNumber,
    merchantLatitude: location?.state?.value?.merchantLatitude,
    merchantLongitude: location?.state?.value?.merchantLongitude,
    operationStartHour: location?.state?.value?.operationStartHour,
    operationEndHour: location?.state?.value?.operationEndHour,
    contactPerson: location?.state?.value?.contactPerson,
    contactNumber: location?.state?.value?.contactNumber,
    contactPersonEmail: location?.state?.value?.contactPersonEmail,
    merchantStatus: location?.state?.value?.merchantStatus,
    merchantCategory: location?.state?.value?.merchantCategory,
    isSuperMerchant: location?.state?.value?.isSuperMerchant,
    isMerchant: location?.state?.value?.isMerchant,
    companyRegistrationNumber:
      location?.state?.value?.companyRegistrationNumber,
    companyExpiryDate: location?.state?.value?.companyExpiryDate,
    businessRegistrationNumber:
      location?.state?.value?.businessRegistrationNumber,
    businessExpiryDate: location?.state?.value?.businessExpiryDate,
    incomeTaxNumber: location?.state?.value?.incomeTaxNumber,
  });

  const [merchantSummaryDataErr, setMerchantSummaryDataErr] = useState({
    mirsCodeErr: "",
    merchantNameErr: "",
    oldRegistrationCodeErr: "",
    merchantAddressErr: "",
    merchantLatitudeErr: "",
    merchantLongitudeErr: "",
    operationStartHourErr: "",
    operationEndHourErr: "",
    contactPersonErr: "",
    contactPersonEmailErr: "",
    merchantCategoryErr: "",
  });

  const merchantUpdateError: any = useSelector(
    (state: RootStateOrAny) => state.MerchantSetupReducer.getMerchantUpdateError
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
    if (merchantUpdateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantUpdateMessage());
      }, 4000);
    }
  }, [merchantUpdateError]);

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

    if (
      !(
        mirsCode === "null" &&
        merchantName === "null" &&
        merchantAddress === "null" &&
        merchantLongitude === "null" &&
        merchantLatitude === "null" &&
        operationStartHour === "null" &&
        operationEndHour === "null" &&
        contactPersonEmail === "null" &&
        merchantCategory === "null" &&
        oldRegistrationCode === "null" &&
        contactPerson === "null"
      )
    ) {
      setMerchantSummaryDataErr({
        mirsCodeErr: mirsCode,
        merchantNameErr: merchantName,
        oldRegistrationCodeErr: oldRegistrationCode,
        merchantAddressErr: merchantAddress,
        merchantLatitudeErr: merchantLatitude,
        merchantLongitudeErr: merchantLongitude,
        operationStartHourErr: operationStartHour,
        operationEndHourErr: operationEndHour,
        contactPersonErr: contactPerson,
        contactPersonEmailErr: contactPersonEmail,
        merchantCategoryErr: merchantCategory,
      });
      return false;
    } else {
      setMerchantSummaryDataErr({
        mirsCodeErr: "",
        merchantNameErr: "",
        oldRegistrationCodeErr: "",
        merchantAddressErr: "",
        merchantLatitudeErr: "",
        merchantLongitudeErr: "",
        operationStartHourErr: "",
        operationEndHourErr: "",
        contactPersonErr: "",
        contactPersonEmailErr: "",
        merchantCategoryErr: "",
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

  const editMerchant_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate_mobileNumber() && validate_contactNumber()) {
      if (validate()) {
        dispatch(updateMerchantData(merchantSummaryData))
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
    <div className="EditMerchant">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">Edit Merchant</h1>
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
            message={merchantUpdateError?.message}
            closeMessage={closeMessage}
          />
        )}

        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <form onSubmit={editMerchant_onSubmit}>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-2 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Merchant Code<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.merchantCode}
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>
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

                  <div className="col-2 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Activation Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.merchantActivationDate}
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-2 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Approval Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.merchantApprovalDate}
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
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
                        No of Branches<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.noOfBranch}
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>
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
                          {merchantSummaryData?.merchantCategory}
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
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={
                          location?.state?.value?.companyRegistrationNumber
                        }
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Company Expiry Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.companyExpiryDate}
                        style={{
                          background: "#CFCFCF",
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
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Business Registration No
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={
                          location?.state?.value?.businessRegistrationNumber
                        }
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Business Expiry Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.businessExpiryDate}
                        style={{
                          background: "#CFCFCF",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Income Tax No<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.incomeTaxNumber}
                        style={{
                          background: "#CFCFCF",
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

export default EditMerchant;
