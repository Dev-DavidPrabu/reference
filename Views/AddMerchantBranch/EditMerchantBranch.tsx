import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Input, Label } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { customValidator } from "../../Constants/Validation";
import {
  resetMerchantBranchUpdateMessage,
  updateMerchantBranchData,
} from "../../redux/action/MerchantSetupAction";

function EditMerchantBranch() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [mobileNum, setMobileNum] = useState(
    location?.state?.value?.phoneNumber?.substring(3) || ""
  );
  const [countryCode, setCountryCode] = useState(
    location?.state?.value?.phoneNumber?.substring(0, 3) || "+60"
  );
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [contactNum, setContactNum] = useState(
    location?.state?.value?.contactNumber?.substring(3) || ""
  );
  const [contactCountryCode, setContactCountryCode] = useState(
    location?.state?.value?.contactNumber?.substring(0, 3) || "+60"
  );
  const [contactNumErr, setContactNumErr] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [merchantBranchSummaryData, setMerchantBranchSummaryData] = useState({
    id: location?.state?.value?.id,
    subMerchantCode: location?.state?.value?.subMerchantCode,
    merchantCode: location?.state?.value?.merchantCode,
    address: location?.state?.value?.address,
    phoneNumber: location?.state?.value?.phoneNumber,
    latitude: location?.state?.value?.latitude,
    longitude: location?.state?.value?.longitude,
    activationDate: location?.state?.value?.activationDate,
    approvalDate: location?.state?.value?.approvalDate,
    operationStartHour: location?.state?.value?.operationStartHour,
    operationEndHour: location?.state?.value?.operationEndHour,
    contactPerson: location?.state?.value?.contactPerson,
    contactNumber: location?.state?.value?.contactNumber,
    status: location?.state?.value?.status,
  });

  const [merchantBranchSummaryDataErr, setMerchantBranchSummaryDataErr] =
    useState({
      subMerchantCodeErr: "",
      addressErr: "",
      latitudeErr: "",
      longitudeErr: "",
      operationStartHourErr: "",
      operationEndHourErr: "",
      contactPersonErr: "",
    });

  const merchantBranchUpdateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getMerchantBranchUpdateError
  );

  useEffect(() => {
    if (merchantBranchUpdateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantBranchUpdateMessage());
      }, 4000);
    }
  }, [merchantBranchUpdateError]);

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

  const handle_MerchantBranch_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMerchantBranchSummaryData({
      ...merchantBranchSummaryData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let subMerchantCode = customValidator(
      "promoCodeMandatoryFields",
      "Sub Merchant Code",
      merchantBranchSummaryData?.subMerchantCode
    );

    let latitude = customValidator(
      "promoCodeMandatoryFields",
      "Latitude",
      merchantBranchSummaryData?.latitude
    );

    let address = customValidator(
      "promoCodeMandatoryFields",
      "Address",
      merchantBranchSummaryData?.address
    );

    let longitude = customValidator(
      "promoCodeMandatoryFields",
      "Longitude",
      merchantBranchSummaryData?.longitude
    );

    let operationStartHour = customValidator(
      "promoCodeMandatoryFields",
      "Operation Start Hour",
      merchantBranchSummaryData?.operationStartHour
    );

    let operationEndHour = customValidator(
      "promoCodeMandatoryFields",
      "Operation End Hour",
      merchantBranchSummaryData?.operationEndHour
    );

    let contactPerson = customValidator(
      "promoCodeMandatoryFields",
      "Contact Person",
      merchantBranchSummaryData?.contactPerson
    );

    if (
      !(
        address === "null" &&
        latitude === "null" &&
        longitude === "null" &&
        subMerchantCode === "null" &&
        operationStartHour === "null" &&
        operationEndHour === "null" &&
        contactPerson === "null"
      )
    ) {
      setMerchantBranchSummaryDataErr({
        subMerchantCodeErr: subMerchantCode,
        addressErr: address,
        latitudeErr: latitude,
        longitudeErr: longitude,
        operationStartHourErr: operationStartHour,
        operationEndHourErr: operationEndHour,
        contactPersonErr: contactPerson,
      });
      return false;
    } else {
      setMerchantBranchSummaryDataErr({
        subMerchantCodeErr: "",
        addressErr: "",
        latitudeErr: "",
        longitudeErr: "",
        operationStartHourErr: "",
        operationEndHourErr: "",
        contactPersonErr: "",
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
        merchantBranchSummaryData.phoneNumber = mobileNo;
        setMobileNumErr(false);
        return true;
      }
    } else {
      if (mobileNum.length >= 5) {
        merchantBranchSummaryData.phoneNumber = mobileNo;
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
        merchantBranchSummaryData.contactNumber = contactNo;
        setContactNumErr(false);
        return true;
      }
    } else {
      if (contactNum.length >= 5) {
        merchantBranchSummaryData.contactNumber = contactNo;
        setContactNumErr(false);
        return true;
      } else {
        setContactNumErr(true);
        return false;
      }
    }
  };

  const editMerchantBranch_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate_mobileNumber() && validate_contactNumber()) {
      if (validate()) {
        dispatch(updateMerchantBranchData(merchantBranchSummaryData));
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
    <div className="EditMerchantBranch">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">Edit Merchant Branch</h1>
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
            message={merchantBranchUpdateError?.message}
            closeMessage={closeMessage}
          />
        )}

        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <form onSubmit={editMerchantBranch_onSubmit}>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
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
                        Sub Merchant Name<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="subMerchantCode"
                        value={merchantBranchSummaryData?.subMerchantCode}
                        onChange={handle_MerchantBranch_onChange}
                      />
                      {merchantBranchSummaryDataErr?.subMerchantCodeErr &&
                        merchantBranchSummaryDataErr?.subMerchantCodeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantBranchSummaryDataErr?.subMerchantCodeErr}
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
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.activationDate}
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
                        Approval Date<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.approvalDate}
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
                        Address
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="textarea"
                        className="no-border remit_feesAndCharges merchant-fontSize"
                        name="address"
                        value={merchantBranchSummaryData?.address}
                        onChange={handle_MerchantBranch_onChange}
                      />
                      {merchantBranchSummaryDataErr?.addressErr &&
                        merchantBranchSummaryDataErr?.addressErr !== "null" && (
                          <Label className="text-red">
                            {merchantBranchSummaryDataErr?.addressErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Phone No<span className="span-col">*</span>
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
                        name="longitude"
                        value={merchantBranchSummaryData?.longitude}
                        onChange={handle_MerchantBranch_onChange}
                      />
                      {merchantBranchSummaryDataErr?.longitudeErr &&
                        merchantBranchSummaryDataErr?.longitudeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantBranchSummaryDataErr?.longitudeErr}
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
                        name="latitude"
                        value={merchantBranchSummaryData?.latitude}
                        onChange={handle_MerchantBranch_onChange}
                      />
                      {merchantBranchSummaryDataErr?.latitudeErr &&
                        merchantBranchSummaryDataErr?.latitudeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantBranchSummaryDataErr?.latitudeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2 d-flex">
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Start Time<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-3">
                        <Input
                          type="time"
                          className="no-border remit_feesAndCharges merchant-fontSize"
                          name="operationStartHour"
                          step={1}
                          value={merchantBranchSummaryData?.operationStartHour}
                          onChange={handle_MerchantBranch_onChange}
                        />
                        {merchantBranchSummaryDataErr?.operationStartHourErr &&
                          merchantBranchSummaryDataErr?.operationStartHourErr !==
                            "null" && (
                            <Label className="text-red">
                              {
                                merchantBranchSummaryDataErr?.operationStartHourErr
                              }
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
                      <div className="col me-3">
                        <Input
                          type="time"
                          className="no-border remit_feesAndCharges merchant-fontSize"
                          name="operationEndHour"
                          step={1}
                          value={merchantBranchSummaryData?.operationEndHour}
                          onChange={handle_MerchantBranch_onChange}
                        />
                        {merchantBranchSummaryDataErr?.operationEndHourErr &&
                          merchantBranchSummaryDataErr?.operationEndHourErr !==
                            "null" && (
                            <Label className="text-red">
                              {
                                merchantBranchSummaryDataErr?.operationEndHourErr
                              }
                            </Label>
                          )}
                      </div>
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
                        value={merchantBranchSummaryData?.contactPerson}
                        onChange={handle_MerchantBranch_onChange}
                      />
                      {merchantBranchSummaryDataErr?.contactPersonErr &&
                        merchantBranchSummaryDataErr?.contactPersonErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantBranchSummaryDataErr?.contactPersonErr}
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
                          merchantBranchSummaryData?.status == "ACTIVE"
                            ? true
                            : false
                        }
                        onChange={() =>
                          setMerchantBranchSummaryData({
                            ...merchantBranchSummaryData,
                            status:
                              merchantBranchSummaryData.status == "ACTIVE"
                                ? "INACTIVE"
                                : "ACTIVE",
                          })
                        }
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

export default EditMerchantBranch;
