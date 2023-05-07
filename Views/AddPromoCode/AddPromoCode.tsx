import React, { useEffect, useState, useCallback } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Input, Label } from "reactstrap";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import {
  ReferenceDataModel,
  SelectOptionCategory,
} from "../../models/ReferenceDataModel";
import Select from "react-select";
import { getTargetGroupList } from "../../redux/action/TargetGroupAction";
import "./AddPromoCode.scss";
import {
  getKYCCustomerPromoDetails,
  getPromoGroupCustomersList,
  resetCustomerPromoDetails,
  resetPromoCustomersList,
} from "../../redux/action/PromoCodeSummaryAction";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function AddPromoCode() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [isGroupErr, setIsGroupErr] = useState(false);
  const [isCustomerErr, setIsCustomerErr] = useState(false);
  const [promoCodeData, setPromoCodeData] = useState({
    paymentNetwork: "ALL",
    promotionType: "",
    groupCode: "",
    groupName: "",
    customerId: "",
    customerName: "",
  });

  const [promoCodeDataErr, setPromoCodeDataErr] = useState({
    paymentNetworkErr: "",
    promotionTypeErr: "",
  });

  const Header = [
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.toString().localeCompare(b.customerName?.toString()),
      },
    },
    {
      title: "Id Type",
      dataIndex: "idTypeCodeDescription",
      key: "idTypeCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idTypeCodeDescription
            ?.toString()
            .localeCompare(b.idTypeCodeDescription?.toString()),
      },
    },
    {
      title: "Id Number",
      dataIndex: "idValue",
      key: "idValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idValue?.toString().localeCompare(b.idValue?.toString()),
      },
    },
    {
      title: "Nationality",
      dataIndex: "nationalityCodeDescription",
      key: "nationalityCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCodeDescription
            ?.toString()
            .localeCompare(b.nationalityCodeDescription?.toString()),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.toString().localeCompare(b.mobileNumber?.toString()),
      },
    },
  ];

  const CustomerEnquiryDetailList: any = useSelector(
    (state: RootStateOrAny) =>
      state.PromoCodeSummaryReducer.getPromoCustomerDetails
  );

  const targetGroupData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.TargetGroupReducer.getAllTargetGroupList
  );

  const TargetGroupByCustomers: any = useSelector(
    (state: RootStateOrAny) =>
      state.PromoCodeSummaryReducer.getPromoGroupCustomersList
  );

  const targetGroupList = targetGroupData?.data?.filter(
    (group) => group.statusCode !== "INACTIVE"
  );
  const groupOptions: any = targetGroupList?.map((option: any) => {
    return {
      label: option.groupName,
      value: option.groupCode,
    };
  });

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCustomerPromoDetails());
      dispatch(resetPromoCustomersList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (CustomerEnquiryDetailList?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCustomerPromoDetails());
      }, 5000);
    } else if (CustomerEnquiryDetailList?.data) {
      if (mobileNo.length >= 3) {
        setPromoCodeData({
          ...promoCodeData,
          customerId: CustomerEnquiryDetailList?.data?.customerId,
          customerName: CustomerEnquiryDetailList?.data?.customerName,
        });
      }
    }
  }, [CustomerEnquiryDetailList]);

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
  };

  const handle_customer_Submit = () => {
    if (mobileNum.length >= 5) {
      setMobileNumErr(false);
      dispatch(getKYCCustomerPromoDetails(mobileNo));
    } else {
      setMobileNumErr(true);
    }
  };

  const group_OnChange_handler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setPromoCodeData({
      ...promoCodeData,
      groupCode: selectOptions.value,
      groupName: selectOptions.label,
    });
  };

  const group_OnSubmit_handler = () => {
    if (promoCodeData?.groupCode?.length === 0) {
      setIsGroupErr(true);
    } else {
      setIsGroupErr(false);
      dispatch(getPromoGroupCustomersList(promoCodeData?.groupCode));
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const validate = () => {
    let paymentNetwork = customValidator(
      "promoCodeMandatoryFields",
      "Payment Network",
      promoCodeData?.paymentNetwork
    );
    let promotionType = customValidator(
      "promoCodeMandatoryFields",
      "Type Of Promo",
      promoCodeData?.promotionType
    );

    if (!(paymentNetwork === "null" && promotionType === "null")) {
      setPromoCodeDataErr({
        paymentNetworkErr: paymentNetwork,
        promotionTypeErr: promotionType,
      });
      return false;
    } else {
      setPromoCodeDataErr({
        paymentNetworkErr: "",
        promotionTypeErr: "",
      });
      return true;
    }
  };

  const handle_PromoCodeData_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromoCodeData({ ...promoCodeData, [e.target.name]: e.target.value });
    setPromoCodeDataErr({ ...promoCodeDataErr, promotionTypeErr: "" });
    if (e.target.value === "GROUP") {
      dispatch(getTargetGroupList());
      setIsGroup(true);
      setIsCustomer(false);
    } else if (e.target.value === "INDIVIDUAL") {
      setIsCustomer(true);
      setIsGroup(false);
      setPromoCodeData({
        ...promoCodeData,
        [e.target.name]: e.target.value,
        groupCode: "",
        groupName: "",
      });
      dispatch(resetPromoCustomersList());
    } else {
      setIsCustomer(false);
      setIsGroup(false);
      setPromoCodeData({
        ...promoCodeData,
        [e.target.name]: e.target.value,
        groupCode: "",
        groupName: "",
      });
      dispatch(resetPromoCustomersList());
    }
  };

  const PromoCode_onSubmit = () => {
    if (validate()) {
      promoCodeData.groupCode = "";
      promoCodeData.groupName = "";
      promoCodeData.customerId = "";
      promoCodeData.customerName = "";
      dispatch(resetCustomerPromoDetails());
      dispatch(resetPromoCustomersList());
      history.push({
        pathname:
          "/dashboard/marketing/Promo-Code-Summary/Add-Promo-Code-Setup",
        state: {
          value: promoCodeData,
        },
      });
    }
  };

  const handle_Individual_onSubmit = () => {
    if (promoCodeData?.customerId?.length === 0) {
      setIsCustomerErr(true);
    } else {
      setIsCustomerErr(false);
      promoCodeData.groupCode = "";
      promoCodeData.groupName = "";
      dispatch(resetCustomerPromoDetails());
      dispatch(resetPromoCustomersList());
      history.push({
        pathname:
          "/dashboard/marketing/Promo-Code-Summary/Add-Promo-Code-Setup",
        state: {
          value: promoCodeData,
        },
      });
    }
  };

  const handle_Group_onSubmit = () => {
    if (promoCodeData?.groupCode?.length === 0) {
      setIsGroupErr(true);
    } else {
      setIsGroupErr(false);
      promoCodeData.customerId = "";
      promoCodeData.customerName = "";
      dispatch(resetCustomerPromoDetails());
      dispatch(resetPromoCustomersList());
      history.push({
        pathname:
          "/dashboard/marketing/Promo-Code-Summary/Add-Promo-Code-Setup",
        state: {
          value: promoCodeData,
        },
      });
    }
  };

  const handle_Cancel = () => {
    resetData().then(() => {
      history.goBack();
    });
  };

  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  return (
    <div className="AddPromoCode">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">Add Promo Code</h1>
          <div
            className={"d-flex commonEdit-BackButton"}
            onClick={handle_Cancel}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
          </div>
        </div>
        <div className="festive-package-step d-flex align-items-center justify-content-evenly my-3">
          <div className={"festive-package-one"}>Step 1</div>
          <div className="line"></div>
          <div className={"festive-package-three"}>Step 2</div>
        </div>

        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-12 d-flex">
              <div className="col-3 me-3">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Payment Network<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col me-2">
                  <Input
                    type="text"
                    className="no-border score-dropdown remit_feesAndCharges"
                    name="paymentNetwork"
                    value={promoCodeData?.paymentNetwork}
                  ></Input>
                  {promoCodeDataErr?.paymentNetworkErr &&
                    promoCodeDataErr?.paymentNetworkErr !== "null" && (
                      <Label className="text-red">
                        {promoCodeDataErr?.paymentNetworkErr}
                      </Label>
                    )}
                </div>
              </div>
              <div className="col-5 me-3">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Type Of Promo<span className="span-col">*</span>
                  </label>
                </div>
                <div className="row me-2">
                  <div className="col-8">
                    <Input
                      type="select"
                      className="no-border score-dropdown remit_feesAndCharges"
                      name="promotionType"
                      onChange={handle_PromoCodeData_onChange}
                    >
                      <option selected hidden className="cursor">
                        Select
                      </option>
                      <option>ALL</option>
                      <option>OPEN</option>
                      <option>INDIVIDUAL</option>
                      <option>GROUP</option>
                      <option>BIRTHDAY</option>
                    </Input>
                    {promoCodeDataErr?.promotionTypeErr &&
                      promoCodeDataErr?.promotionTypeErr !== "null" && (
                        <Label className="text-red">
                          {promoCodeDataErr?.promotionTypeErr}
                        </Label>
                      )}
                  </div>
                  {!(isCustomer || isGroup) && (
                    <div className="col-3">
                      <Button
                        onClick={PromoCode_onSubmit}
                        color="danger kyc-FilterSearchButton remit_feesAndCharges"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isCustomer && (
            <div className="col-7 d-flex justify-content-between align-items-center mb-2">
              <div className="col-2 me-4">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    C.Code<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-9 me-1">
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
              <div className="col-10 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Mobile Number<span className="span-col">*</span>
                  </label>
                </div>
                <div className="row">
                  <div className="col-5 me-2">
                    <Input
                      name="mobileNo"
                      type="text"
                      value={mobileNum}
                      className={
                        mobileNumErr
                          ? "validation-error kyc-noBorder"
                          : "Kyc-FilterINputBox form-input"
                      }
                      placeholder="Enter mobile number"
                      onChange={handleChangeMobileNo}
                      maxLength={15}
                      minLength={5}
                    ></Input>
                    {isCustomerErr && (
                      <Label className="text-red">Please add Customer*</Label>
                    )}
                  </div>
                  <div className="col  me-2">
                    <Button
                      color="danger"
                      className="kyc-FilterSubmitButton me-2"
                      onClick={handle_customer_Submit}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isGroup && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-12 d-flex">
                <div className="col-5 me-3">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Group<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="row me-2">
                    <div className="col-8">
                      <Select
                        options={groupOptions}
                        className="remit_feesAndCharges"
                        styles={customSelectStyles}
                        onChange={(selectOptions: any) =>
                          group_OnChange_handler(selectOptions)
                        }
                      />
                      {isGroupErr && (
                        <Label className="text-red">Please Select Group*</Label>
                      )}
                    </div>

                    <div className="col-3">
                      <Button
                        onClick={group_OnSubmit_handler}
                        color="danger kyc-FilterSearchButton remit_feesAndCharges"
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {apiMessage && (
          <div>
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeMessage}
              message={CustomerEnquiryDetailList?.message}
            />
          </div>
        )}
        {isCustomer && (
          <>
            <div className="mt-5 mb-5">
              <CustomTable
                TableData={Header}
                CustomTableHeader={
                  CustomerEnquiryDetailList?.data && [
                    CustomerEnquiryDetailList?.data,
                  ]
                }
                Delete={false}
                Edit={false}
                DisableMange={true}
                DisablePagination={false}
                toPrint={false}
              />
            </div>

            <div className="">
              <Button
                color="danger"
                onClick={handle_Individual_onSubmit}
                className="kyc-FilterSubmitButton me-2"
              >
                Next
              </Button>
            </div>
          </>
        )}
        {isGroup && (
          <>
            <div className="mt-5 mb-5">
              <CustomTable
                TableData={Header}
                CustomTableHeader={TargetGroupByCustomers?.data?.customerList}
                Delete={false}
                Edit={false}
                DisableMange={true}
                DisablePagination={false}
                toPrint={false}
              />
            </div>

            <div className="">
              <Button
                color="danger"
                onClick={handle_Group_onSubmit}
                className="kyc-FilterSubmitButton me-2"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddPromoCode;
