import { Switch } from "antd";
import moment from "moment";
import React, { useState, useCallback, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input, Label } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { customValidator } from "../../Constants/Validation";
import { getIdTypeData } from "../../redux/action/CustomerEnquiryAction";
import {
  createMerchantTellerData,
  getMerchantBranchSummaryList,
  resetMerchantTellerCreateMessage,
} from "../../redux/action/MerchantSetupAction";

function AddMerchantTeller() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [merchantTellerSummaryData, setMerchantTellerSummaryData] = useState({
    name: "",
    idType: "",
    idNumber: "",
    position: "",
    phoneNumber: "",
    approvalDate: "",
    status: "ACTIVE",
    userType: "",
    subMerchantCode: "",
    debitTransactionLimit: 0,
    creditTransactionLimit: 0,
    emailAddress: "",
  });

  const [merchantTellerSummaryDataErr, setMerchantTellerSummaryDataErr] =
    useState({
      nameErr: "",
      idTypeErr: "",
      idNumberErr: "",
      positionErr: "",
      approvalDateErr: "",
      userTypeErr: "",
      subMerchantCodeErr: "",
      debitTransactionLimitErr: false,
      creditTransactionLimitErr: false,
      emailAddressErr: "",
    });

  const idTypeDataList: any = useSelector(
    (state: RootStateOrAny) => state.KYCCustomerEnquiryReducer.getIdTypeList
  );

  const subMerchantCodeList: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getAllMerchantBranchList
  );

  const merchantTellerCreateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getMerchantTellerCreateError
  );

  const fetchIdTypeList = useCallback(async () => {
    try {
      dispatch(getIdTypeData("MY"));
    } catch (err) {}
  }, [dispatch]);

  const fetchSubMerchantCodeList = useCallback(async () => {
    try {
      dispatch(getMerchantBranchSummaryList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchIdTypeList();
    fetchSubMerchantCodeList();
  }, [fetchIdTypeList, fetchSubMerchantCodeList]);

  useEffect(() => {
    if (merchantTellerCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantTellerCreateMessage());
      }, 4000);
    }
  }, [merchantTellerCreateError]);

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
  };

  const handle_MerchantTeller_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMerchantTellerSummaryData({
      ...merchantTellerSummaryData,
      [e.target.name]: e.target.value,
    });
  };

  const handle_TransactionLimit_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMerchantTellerSummaryData({
      ...merchantTellerSummaryData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const validate = () => {
    let name = customValidator(
      "promoCodeMandatoryFields",
      "Name",
      merchantTellerSummaryData?.name
    );

    let idType = customValidator(
      "promoCodeMandatoryFields",
      "ID Type",
      merchantTellerSummaryData?.idType
    );

    let idNumber = customValidator(
      "promoCodeMandatoryFields",
      "ID Number",
      merchantTellerSummaryData?.idNumber
    );

    let position = customValidator(
      "promoCodeMandatoryFields",
      "Position",
      merchantTellerSummaryData?.position
    );

    let approvalDate = customValidator(
      "promoCodeMandatoryFields",
      "Approval Date",
      merchantTellerSummaryData?.approvalDate
    );

    let userType = customValidator(
      "promoCodeMandatoryFields",
      "User Type",
      merchantTellerSummaryData?.userType
    );

    let subMerchantCode = customValidator(
      "promoCodeMandatoryFields",
      "Sub Merchant Code",
      merchantTellerSummaryData?.subMerchantCode
    );

    let emailAddress = customValidator(
      "emailAddressCustomerEdit",
      "Email Address",
      merchantTellerSummaryData?.emailAddress
    );

    if (
      !(
        idNumber === "null" &&
        idType === "null" &&
        name === "null" &&
        position === "null" &&
        approvalDate === "null" &&
        userType === "null" &&
        subMerchantCode === "null" &&
        emailAddress === "null" &&
        !isNaN(merchantTellerSummaryData?.creditTransactionLimit) &&
        !isNaN(merchantTellerSummaryData?.debitTransactionLimit)
      )
    ) {
      setMerchantTellerSummaryDataErr({
        nameErr: name,
        idTypeErr: idType,
        idNumberErr: idNumber,
        positionErr: position,
        approvalDateErr: approvalDate,
        userTypeErr: userType,
        subMerchantCodeErr: subMerchantCode,
        debitTransactionLimitErr: isNaN(
          merchantTellerSummaryData?.debitTransactionLimit
        )
          ? true
          : false,
        creditTransactionLimitErr: isNaN(
          merchantTellerSummaryData?.creditTransactionLimit
        )
          ? true
          : false,
        emailAddressErr: emailAddress,
      });
      return false;
    } else {
      setMerchantTellerSummaryDataErr({
        nameErr: "",
        idTypeErr: "",
        idNumberErr: "",
        positionErr: "",
        approvalDateErr: "",
        userTypeErr: "",
        subMerchantCodeErr: "",
        debitTransactionLimitErr: false,
        creditTransactionLimitErr: false,
        emailAddressErr: "",
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
        merchantTellerSummaryData.phoneNumber = mobileNo;
        setMobileNumErr(false);
        return true;
      }
    } else {
      if (mobileNum.length >= 5) {
        merchantTellerSummaryData.phoneNumber = mobileNo;
        setMobileNumErr(false);
        return true;
      } else {
        setMobileNumErr(true);
        return false;
      }
    }
  };

  const addMerchantTeller_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate_mobileNumber()) {
      if (validate()) {
        dispatch(createMerchantTellerData(merchantTellerSummaryData));
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
  return (
    <div className="AddMerchantTeller">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">Add Merchant Teller</h1>
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
            message={merchantTellerCreateError?.message}
            closeMessage={closeMessage}
          />
        )}

        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <form onSubmit={addMerchantTeller_onSubmit}>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Sub Merchant Code<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="subMerchantCode"
                        style={{
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_MerchantTeller_onChange}
                      >
                        <option selected hidden className="cursor">
                          Select
                        </option>
                        {subMerchantCodeList?.data?.map((e: any, i: number) => {
                          return <option key={i}>{e.subMerchantCode}</option>;
                        })}
                      </Input>
                      {merchantTellerSummaryDataErr?.subMerchantCodeErr &&
                        merchantTellerSummaryDataErr?.subMerchantCodeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.subMerchantCodeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Name<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="name"
                        value={merchantTellerSummaryData?.name}
                        onChange={handle_MerchantTeller_onChange}
                      />
                      {merchantTellerSummaryDataErr?.nameErr &&
                        merchantTellerSummaryDataErr?.nameErr !== "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.nameErr}
                          </Label>
                        )}
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        ID Type<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="idType"
                        style={{
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_MerchantTeller_onChange}
                      >
                        <option selected hidden className="cursor">
                          Select
                        </option>
                        {idTypeDataList?.data?.map((e: any, i: number) => {
                          return (
                            <option key={i}>{e.idtypeCodeDescription}</option>
                          );
                        })}
                      </Input>
                      {merchantTellerSummaryDataErr?.idTypeErr &&
                        merchantTellerSummaryDataErr?.idTypeErr !== "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.idTypeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        ID Number<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="idNumber"
                        value={merchantTellerSummaryData?.idNumber}
                        onChange={handle_MerchantTeller_onChange}
                      />
                      {merchantTellerSummaryDataErr?.idNumberErr &&
                        merchantTellerSummaryDataErr?.idNumberErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.idNumberErr}
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
                        Position
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="position"
                        style={{
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_MerchantTeller_onChange}
                      >
                        <option selected hidden className="cursor">
                          Select
                        </option>
                        <option>Owner</option>
                        <option>Teller</option>
                        <option>Supervisor</option>
                      </Input>
                      {merchantTellerSummaryDataErr?.positionErr &&
                        merchantTellerSummaryDataErr?.positionErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.positionErr}
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
                        <div className="col-8">
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
                        Email Address<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="emailAddress"
                        value={merchantTellerSummaryData?.emailAddress}
                        onChange={handle_MerchantTeller_onChange}
                      />
                      {merchantTellerSummaryDataErr?.emailAddressErr &&
                        merchantTellerSummaryDataErr?.emailAddressErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.emailAddressErr}
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
                        name="approvalDate"
                        max={moment().format("YYYY-MM-DD")}
                        value={merchantTellerSummaryData?.approvalDate}
                        onChange={handle_MerchantTeller_onChange}
                      />
                      {merchantTellerSummaryDataErr?.approvalDateErr &&
                        merchantTellerSummaryDataErr?.approvalDateErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.approvalDateErr}
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
                        User Type
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="select"
                        className="no-border score-dropdown remit_feesAndCharges"
                        name="userType"
                        style={{
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        onChange={handle_MerchantTeller_onChange}
                      >
                        <option selected hidden className="cursor">
                          Select
                        </option>
                        <option>Owner</option>
                        <option>Teller</option>
                      </Input>
                      {merchantTellerSummaryDataErr?.userTypeErr &&
                        merchantTellerSummaryDataErr?.userTypeErr !==
                          "null" && (
                          <Label className="text-red">
                            {merchantTellerSummaryDataErr?.userTypeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Debit Txn Limit
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="number"
                        className="no-border remit_feesAndCharges merchant-fontSize"
                        name="debitTransactionLimit"
                        value={merchantTellerSummaryData?.debitTransactionLimit}
                        onChange={handle_TransactionLimit_onChange}
                      />
                      {merchantTellerSummaryDataErr?.debitTransactionLimitErr && (
                        <Label className="text-red">
                          Debit Transaction Limit can't be Empty*
                        </Label>
                      )}
                    </div>
                  </div>{" "}
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Credit Txn Limit
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="number"
                        className="no-border remit_feesAndCharges merchant-fontSize"
                        name="creditTransactionLimit"
                        value={
                          merchantTellerSummaryData?.creditTransactionLimit
                        }
                        onChange={handle_TransactionLimit_onChange}
                      />
                      {merchantTellerSummaryDataErr?.creditTransactionLimitErr && (
                        <Label className="text-red">
                          Credit Transaction Limit can't be Empty*
                        </Label>
                      )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Status
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="YES"
                        unCheckedChildren="NO"
                        checked={
                          merchantTellerSummaryData?.status == "ACTIVE"
                            ? true
                            : false
                        }
                        onChange={() =>
                          setMerchantTellerSummaryData({
                            ...merchantTellerSummaryData,
                            status:
                              merchantTellerSummaryData.status == "ACTIVE"
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

export default AddMerchantTeller;
