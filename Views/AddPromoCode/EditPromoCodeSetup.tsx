import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "antd";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button, Input, Label } from "reactstrap";
import CustomInput from "../../Components/UI/CustomInput";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { TiArrowBackOutline } from "react-icons/ti";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { useHistory, useLocation } from "react-router";
import {
  getKYCCustomerPromoDetails,
  resetCustomerPromoDetails,
  resetPromoUpdateMessage,
  updatePromoCodeData,
} from "../../redux/action/PromoCodeSummaryAction";
import moment from "moment";
import { getAllMasterData } from "../../redux/action/NotificationMasterAction";
import {
  getRemitCountryReferenceData,
  getTargetGroupList,
} from "../../redux/action/TargetGroupAction";
import { getPayoutCountryRecords } from "../../redux/action/RemitPayoutCountryAction";
import { getPayGroupRecords } from "../../redux/action/RemitAgentTagAction";
import { getBankSetupRecords } from "../../redux/action/BankSetupAction";
import CustomTable from "../../Components/CustomTable/CustomTable";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

function EditPromoCodeSetup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiCustomerMessage, setCustomerApiMessage] = useState(false);
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const [dateErr, setDateErr] = useState(false);
  const [promoCodeDataError, setPromoCodeDataErr] = useState({
    promoNameErr: "",
    promoCodeErr: "",
    promoValueErr: false,
    totalPromoValueErr: false,
    multipleUseCountErr: false,
    notificationIdErr: "",
    birthDayMonthErr: "",
  });

  const promoCodeUpdateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.PromoCodeSummaryReducer.getPromoCodeUpdateError
  );

  const NotificationMasterData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationMasterReducer?.getMasterResponse
  );

  const remitCountryList: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getRemitCountryReferenceData
  );

  const payoutCountryRecords = useSelector(
    (state: RootStateOrAny) =>
      state.RemitPayoutCountryReducer?.getPayoutCountryRecordsResponse
  );

  const bankSetuprecords = useSelector(
    (state: RootStateOrAny) => state.BankSetupReducer?.getBankSetupResponse
  );

  const payGroupRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitAgentTagReducer?.getPayGroupRegordsResponse
  );

  const targetGroupData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.TargetGroupReducer.getAllTargetGroupList
  );

  const CustomerEnquiryDetailList: any = useSelector(
    (state: RootStateOrAny) =>
      state.PromoCodeSummaryReducer.getPromoCustomerDetails
  );

  const fetchMasterData = useCallback(async () => {
    try {
      dispatch(getAllMasterData());
    } catch (err) {}
  }, [dispatch]);

  const fetchRemitCountryReferencedata = useCallback(() => {
    try {
      dispatch(getRemitCountryReferenceData("remit-country"));
    } catch (err) {}
  }, [dispatch, "remit-country"]);

  const fetchTargetGroupData = useCallback(() => {
    try {
      dispatch(getTargetGroupList());
    } catch (err) {}
  }, [dispatch]);

  const resetCustomerData = useCallback(async () => {
    try {
      dispatch(resetCustomerPromoDetails());
    } catch (err) {}
  }, [dispatch]);

  const fetchPayoutCountryData = useCallback(async () => {
    try {
      dispatch(
        getPayoutCountryRecords(promoCodeData?.promoCodeRequest?.payoutCountry)
      );
    } catch (err) {}
  }, [dispatch]);

  const fetchPayoutBankData = useCallback(async () => {
    try {
      dispatch(
        getBankSetupRecords(
          promoCodeData?.promoCodeRequest?.payoutCountry,
          false
        )
      );
    } catch (err) {}
  }, [dispatch]);

  const fetchPickupAgentData = useCallback(async () => {
    try {
      dispatch(
        getPayGroupRecords({
          countryCode: promoCodeData?.promoCodeRequest?.payoutCountry,
          paymentMethod: promoCodeData?.promoCodeRequest?.payoutMode,
        })
      );
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (promoCodeUpdateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetPromoUpdateMessage());
      }, 4000);
    } else if (promoCodeUpdateError?.data) {
      resetCustomerData().then(() => {
        history.push({
          pathname: "/dashboard/marketing/Promo-Code-Summary",
          state: {
            value: "",
          },
        });
      });
    }
  }, [promoCodeUpdateError]);

  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  useEffect(() => {
    fetchRemitCountryReferencedata();
    fetchTargetGroupData();
  }, [fetchRemitCountryReferencedata, fetchTargetGroupData]);

  useEffect(() => {
    fetchPayoutCountryData();
    fetchPayoutBankData();
    fetchPickupAgentData();
  }, [fetchPayoutCountryData, fetchPayoutBankData, fetchPickupAgentData]);

  useEffect(() => {
    if (CustomerEnquiryDetailList?.message) {
      setCustomerApiMessage(true);
      setTimeout(function () {
        setCustomerApiMessage(false);
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

  const [promoCodeData, setPromoCodeData] = useState({
    id: location?.state?.value?.promoCodeUserResponse?.id,
    groupCode: location?.state?.value?.promoCodeUserResponse?.groupCode,
    groupName: location?.state?.value?.promoCodeUserResponse?.groupName,
    customerId: location?.state?.value?.promoCodeUserResponse?.customerId,
    customerName: location?.state?.value?.promoCodeUserResponse?.customerName,
    promoCodeRequest: {
      id: location?.state?.value?.id,
      entityId: location?.state?.value?.entityId,
      countryCode: location?.state?.value?.countryCode,
      promoName: location?.state?.value?.promoName,
      promoCode: location?.state?.value?.promoCode,
      validFrom: location?.state?.value?.validFrom,
      validTo: location?.state?.value?.validTo,
      promoValue: location?.state?.value?.promoValue,
      totalPromoValue: location?.state?.value?.totalPromoValue,
      multipleUse: location?.state?.value?.multipleUse,
      multipleUseCount: location?.state?.value?.multipleUseCount,
      firstTimeTransaction: location?.state?.value?.firstTimeTransaction,
      payoutCountry: location?.state?.value?.payoutCountry,
      payoutCountryDescription:
        location?.state?.value?.payoutCountryDescription,
      payoutMode: location?.state?.value?.payoutMode,
      payoutModeDescription: location?.state?.value?.payoutModeDescription,
      payoutBank: location?.state?.value?.payoutBank,
      payoutBankDescription: location?.state?.value?.payoutBankDescription,
      freeServiceCharge: location?.state?.value?.freeServiceCharge,
      promotionType: location?.state?.value?.promotionType,
      notificationId:
        location?.state?.value?.promotionType === "OPEN"
          ? "NULL"
          : location?.state?.value?.notificationId,
      notificationType: location?.state?.value?.notificationType,
      birthDayMonth: location?.state?.value?.birthDayMonth,
      birthDayMonthDescription:
        location?.state?.value?.birthDayMonthDescription,
      pickUpAgent: location?.state?.value?.pickUpAgent,
      pickUpAgentDescription: location?.state?.value?.pickupAgentDescription,
      activate: location?.state?.value?.activate,
      send: location?.state?.value?.send,
    },
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

  const handle_PromoData_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromoCodeData({
      ...promoCodeData,
      promoCodeRequest: {
        ...promoCodeData.promoCodeRequest,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handle_PromoValue_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromoCodeData({
      ...promoCodeData,
      promoCodeRequest: {
        ...promoCodeData.promoCodeRequest,
        [e.target.name]: parseFloat(e.target.value),
      },
    });
  };

  const handle_PromoRedemCount_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromoCodeData({
      ...promoCodeData,
      promoCodeRequest: {
        ...promoCodeData.promoCodeRequest,
        [e.target.name]: parseFloat(e.target.value),
      },
    });
  };

  const handle_MultipleUseCount_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromoCodeData({
      ...promoCodeData,
      promoCodeRequest: {
        ...promoCodeData.promoCodeRequest,
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };

  const handle_RecieverCountry_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "ALL") {
      setPromoCodeData({
        ...promoCodeData,
        promoCodeRequest: {
          ...promoCodeData.promoCodeRequest,
          payoutCountry: "ALL",
          payoutCountryDescription: "ALL",
          payoutMode: "ALL",
          payoutModeDescription: "ALL",
          payoutBank: "",
          payoutBankDescription: "",
          pickUpAgent: "",
          pickUpAgentDescription: "",
        },
      });
    } else {
      const remitCountry = JSON.parse(e.target.value);
      setPromoCodeData({
        ...promoCodeData,
        promoCodeRequest: {
          ...promoCodeData.promoCodeRequest,
          payoutCountry: remitCountry?.code,
          payoutCountryDescription: remitCountry?.description,
          payoutMode: "ALL",
          payoutModeDescription: "ALL",
          payoutBank: "",
          payoutBankDescription: "",
          pickUpAgent: "",
          pickUpAgentDescription: "",
        },
      });
      dispatch(getPayoutCountryRecords(remitCountry?.code));
      dispatch(getBankSetupRecords(remitCountry?.code, false));
    }
  };

  const handle_PaymentMethod_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value === "ALL") {
      setPromoCodeData({
        ...promoCodeData,
        promoCodeRequest: {
          ...promoCodeData.promoCodeRequest,
          payoutMode: "ALL",
          payoutModeDescription: "ALL",
          payoutBank: "",
          payoutBankDescription: "",
          pickUpAgent: "",
          pickUpAgentDescription: "",
        },
      });
    } else {
      const paymentMethodData = JSON.parse(e.target.value);
      setPromoCodeData({
        ...promoCodeData,
        promoCodeRequest: {
          ...promoCodeData.promoCodeRequest,
          payoutMode: paymentMethodData?.paymentMethodCode,
          payoutModeDescription: paymentMethodData?.description,
          payoutBank: "",
          payoutBankDescription: "",
          pickUpAgent: "",
          pickUpAgentDescription: "",
        },
      });
      dispatch(
        getPayGroupRecords({
          countryCode: promoCodeData?.promoCodeRequest?.payoutCountry,
          paymentMethod: paymentMethodData?.paymentMethodCode,
        })
      );
    }
  };

  const handle_PaymentBank_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const paymentBankData = JSON.parse(e.target.value);
    setPromoCodeData({
      ...promoCodeData,
      promoCodeRequest: {
        ...promoCodeData.promoCodeRequest,
        payoutBank: paymentBankData?.bankCode,
        payoutBankDescription: paymentBankData?.bankName,
      },
    });
  };

  const handle_CashPickUpAgent_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pickUpAgentData = JSON.parse(e.target.value);
    setPromoCodeData({
      ...promoCodeData,
      promoCodeRequest: {
        ...promoCodeData.promoCodeRequest,
        pickUpAgent: pickUpAgentData?.payAgentCode,
        pickUpAgentDescription: pickUpAgentData?.payAgentName,
      },
    });
  };

  const handle_GroupCode_onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const group = JSON.parse(e.target.value);
    setPromoCodeData({
      ...promoCodeData,
      groupCode: group?.groupCode,
      groupName: group?.groupName,
    });
  };

  const validate = () => {
    let promoName = customValidator(
      "promoCodeMandatoryFields",
      "Promo Name",
      promoCodeData?.promoCodeRequest?.promoName
    );

    let promoCode = customValidator(
      "promoCodeField",
      "Promo Code",
      promoCodeData?.promoCodeRequest?.promoCode
    );

    let notificationId = customValidator(
      "promoCodeMandatoryFields",
      "Notification Id",
      promoCodeData?.promoCodeRequest?.notificationId
    );

    let birthDayMonth = customValidator(
      "promoCodeMandatoryFields",
      "Birthday Month",
      location?.state?.value?.promotionType === "BIRTHDAY"
        ? promoCodeData?.promoCodeRequest?.birthDayMonth
        : "null"
    );

    if (
      !(
        promoName === "null" &&
        promoCode === "null" &&
        notificationId === "null" &&
        birthDayMonth === "null" &&
        !isNaN(promoCodeData?.promoCodeRequest?.promoValue) &&
        !isNaN(promoCodeData?.promoCodeRequest?.totalPromoValue) &&
        !isNaN(promoCodeData?.promoCodeRequest?.multipleUseCount)
      )
    ) {
      setPromoCodeDataErr({
        promoNameErr: promoName,
        promoCodeErr: promoCode,
        promoValueErr: isNaN(promoCodeData?.promoCodeRequest?.promoValue)
          ? true
          : false,
        totalPromoValueErr: isNaN(
          promoCodeData?.promoCodeRequest?.totalPromoValue
        )
          ? true
          : false,
        multipleUseCountErr: isNaN(
          promoCodeData?.promoCodeRequest?.multipleUseCount
        )
          ? true
          : false,
        notificationIdErr: notificationId,
        birthDayMonthErr: birthDayMonth,
      });
      setDateErr(false);
      return false;
    } else if (
      Date.parse(promoCodeData?.promoCodeRequest?.validFrom) >
        Date.parse(promoCodeData?.promoCodeRequest?.validTo) ||
      Date.parse(promoCodeData?.promoCodeRequest?.validFrom) ==
        Date.parse(promoCodeData?.promoCodeRequest?.validTo)
    ) {
      setDateErr(true);
      setPromoCodeDataErr({
        promoNameErr: "",
        promoCodeErr: "",
        promoValueErr: false,
        totalPromoValueErr: false,
        multipleUseCountErr: false,
        notificationIdErr: "",
        birthDayMonthErr: "",
      });
    } else {
      setPromoCodeDataErr({
        promoNameErr: "",
        promoCodeErr: "",
        promoValueErr: false,
        totalPromoValueErr: false,
        multipleUseCountErr: false,
        notificationIdErr: "",
        birthDayMonthErr: "",
      });
      setDateErr(false);
      return true;
    }
  };

  const promoCode_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updatePromoCodeData(promoCodeData));
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeCustomerMessage = () => {
    setCustomerApiMessage(false);
  };

  const handle_Cancel = () => {
    resetCustomerData().then(() => {
      history.goBack();
    });
  };

  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  return (
    <div className="EditPromoCodeSetup">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">
            Edit Promo Code - {location?.state?.value?.promotionType}
          </h1>
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
            message={
              promoCodeUpdateError?.errorDetails?.length > 0
                ? promoCodeUpdateError?.errorDetails[0].message
                : promoCodeUpdateError?.message
            }
            closeMessage={closeMessage}
          />
        )}
        {apiCustomerMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={CustomerEnquiryDetailList?.message}
            closeMessage={closeCustomerMessage}
          />
        )}
        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <form onSubmit={promoCode_onSubmit}>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Promo Name<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <CustomInput
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="promoName"
                        value={promoCodeData?.promoCodeRequest?.promoName}
                        onChange={handle_PromoData_onChange}
                      />
                      {promoCodeDataError?.promoNameErr &&
                        promoCodeDataError?.promoNameErr !== "null" && (
                          <Label className="text-red">
                            {promoCodeDataError?.promoNameErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Promo Code<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="text"
                        className="no-border remit_feesAndCharges"
                        name="promoCode"
                        maxLength={4}
                        value={promoCodeData?.promoCodeRequest?.promoCode}
                        onChange={handle_PromoData_onChange}
                      />
                      {promoCodeDataError?.promoCodeErr &&
                        promoCodeDataError?.promoCodeErr !== "null" && (
                          <Label className="text-red">
                            {promoCodeDataError?.promoCodeErr}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Valid From
                      </label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="datetime-local"
                        className="no-border remit_feesAndCharges"
                        name="validFrom"
                        value={promoCodeData?.promoCodeRequest?.validFrom}
                        onChange={handle_PromoData_onChange}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">Valid To</label>
                    </div>
                    <div className="col me-4">
                      <Input
                        type="datetime-local"
                        className="no-border remit_feesAndCharges"
                        name="validTo"
                        value={promoCodeData?.promoCodeRequest?.validTo}
                        onChange={handle_PromoData_onChange}
                        min={
                          moment(
                            promoCodeData?.promoCodeRequest?.validFrom?.split(
                              "T"
                            )[0]
                          ).format("YYYY-MM-DD") + "T00:00"
                        }
                      />
                      {dateErr && (
                        <Label className="text-red">
                          Invalid Date Range. Valid To Should be greater than
                          Valid From Date.
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
                        First Time Transaction
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          promoCodeData?.promoCodeRequest?.firstTimeTransaction
                        }
                        onChange={() =>
                          setPromoCodeData({
                            ...promoCodeData,
                            promoCodeRequest: {
                              ...promoCodeData.promoCodeRequest,
                              firstTimeTransaction:
                                !promoCodeData?.promoCodeRequest
                                  ?.firstTimeTransaction,
                              multipleUse: false,
                              totalPromoValue: 1,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2 d-flex">
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Multiple Use<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <Switch
                          disabled={
                            promoCodeData?.promoCodeRequest
                              ?.firstTimeTransaction
                          }
                          className="toggle-switch"
                          checkedChildren="Yes"
                          unCheckedChildren="NO"
                          checked={promoCodeData?.promoCodeRequest?.multipleUse}
                          onChange={() =>
                            setPromoCodeData({
                              ...promoCodeData,
                              promoCodeRequest: {
                                ...promoCodeData.promoCodeRequest,
                                multipleUse:
                                  !promoCodeData?.promoCodeRequest?.multipleUse,
                                multipleUseCount: 1,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          No.of Use<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        {!promoCodeData?.promoCodeRequest?.multipleUse && (
                          <input
                            className="border-0 form-control"
                            type="text"
                            value={promoCodeData?.promoCodeRequest?.multipleUseCount?.toString()}
                            style={{
                              background: "#CFCFCF",
                              borderRadius: "0px",
                              height: "35px",
                            }}
                            readOnly={true}
                          />
                        )}
                        {promoCodeData?.promoCodeRequest?.multipleUse && (
                          <Input
                            type="number"
                            className="no-border remit_feesAndCharges"
                            name="multipleUseCount"
                            min={2}
                            value={
                              promoCodeData?.promoCodeRequest?.multipleUseCount
                            }
                            onChange={handle_MultipleUseCount_onChange}
                          />
                        )}
                        {promoCodeDataError?.multipleUseCountErr && (
                          <Label className="text-red">
                            No.of Use can't be empty.
                          </Label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Total Redemptions Per Promo
                        <span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      {promoCodeData?.promoCodeRequest
                        ?.firstTimeTransaction && (
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={promoCodeData?.promoCodeRequest?.totalPromoValue?.toString()}
                          style={{
                            background: "#CFCFCF",
                            minWidth: "150px",
                            borderRadius: "0px",
                            height: "35px",
                          }}
                          readOnly={true}
                        />
                      )}
                      {!promoCodeData?.promoCodeRequest
                        ?.firstTimeTransaction && (
                        <Input
                          type="number"
                          className="no-border remit_feesAndCharges"
                          name="totalPromoValue"
                          min={1}
                          value={
                            promoCodeData?.promoCodeRequest?.totalPromoValue
                          }
                          onChange={handle_PromoRedemCount_onChange}
                        />
                      )}
                      {promoCodeDataError?.totalPromoValueErr && (
                        <Label className="text-red">
                          Total Redemptions Per Promo can't be empty.
                        </Label>
                      )}
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Value Per Remit<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      {promoCodeData?.promoCodeRequest?.freeServiceCharge && (
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={promoCodeData?.promoCodeRequest?.promoValue?.toString()}
                          style={{
                            background: "#CFCFCF",
                            minWidth: "150px",
                            borderRadius: "0px",
                            height: "35px",
                          }}
                          readOnly={true}
                        />
                      )}
                      {!promoCodeData?.promoCodeRequest?.freeServiceCharge && (
                        <Input
                          type="number"
                          className="no-border remit_feesAndCharges"
                          name="promoValue"
                          min={1}
                          value={promoCodeData?.promoCodeRequest?.promoValue}
                          onChange={handle_PromoValue_onChange}
                        />
                      )}
                      {promoCodeDataError?.promoValueErr && (
                        <Label className="text-red">
                          Value Per Remit can't be empty.
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
                        Free Service Charge<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={
                          promoCodeData?.promoCodeRequest?.freeServiceCharge
                        }
                        onChange={() =>
                          setPromoCodeData({
                            ...promoCodeData,
                            promoCodeRequest: {
                              ...promoCodeData.promoCodeRequest,
                              freeServiceCharge:
                                !promoCodeData?.promoCodeRequest
                                  ?.freeServiceCharge,
                              promoValue: 0,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Type Of Promo<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.promotionType}
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
                  {location?.state?.value?.promotionType === "GROUP" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Group Name<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <Input
                          type="select"
                          className="no-border score-dropdown remit_feesAndCharges"
                          name="groupCode"
                          onChange={handle_GroupCode_onChange}
                        >
                          <option selected hidden className="cursor">
                            {promoCodeData?.groupName}
                          </option>

                          {targetGroupData?.data
                            ?.filter((group) => group.statusCode !== "INACTIVE")
                            ?.map((e: any, i: number) => {
                              return (
                                <option key={i} value={JSON.stringify(e)}>
                                  {e?.groupName}
                                </option>
                              );
                            })}
                        </Input>
                      </div>
                    </div>
                  )}
                  {location?.state?.value?.promotionType === "INDIVIDUAL" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Customer Name<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={
                            location?.state?.value?.promoCodeUserResponse
                              ?.customerName
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
                  )}

                  {location?.state?.value?.promotionType === "BIRTHDAY" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          BirthDay Month<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <Input
                          type="select"
                          className="no-border score-dropdown remit_feesAndCharges"
                          name="birthDayMonth"
                          onChange={handle_PromoData_onChange}
                        >
                          <option selected hidden className="cursor">
                            {
                              promoCodeData?.promoCodeRequest
                                ?.birthDayMonthDescription
                            }
                          </option>
                          <option value="01">JANUARY</option>
                          <option value="02">FEBRUARY</option>
                          <option value="03">MARCH</option>
                          <option value="04">APRIL</option>
                          <option value="05">MAY</option>
                          <option value="06">JUNE</option>
                          <option value="07">JULY</option>
                          <option value="08">AUGUST</option>
                          <option value="09">SEPTEMBER</option>
                          <option value="10">OCTOBER</option>
                          <option value="11">NOVEMBER</option>
                          <option value="12">DECEMBER</option>
                        </Input>
                        {promoCodeDataError?.birthDayMonthErr &&
                          promoCodeDataError?.birthDayMonthErr !== "null" && (
                            <Label className="text-red">
                              {promoCodeDataError?.birthDayMonthErr}
                            </Label>
                          )}
                      </div>
                    </div>
                  )}

                  {location?.state?.value?.promotionType !== "OPEN" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Notification Id For Remittance
                          <span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <Input
                          type="select"
                          className="no-border score-dropdown remit_feesAndCharges"
                          name="notificationId"
                          onChange={handle_PromoData_onChange}
                        >
                          <option selected hidden className="cursor">
                            {promoCodeData?.promoCodeRequest?.notificationId}
                          </option>

                          {NotificationMasterData?.data?.map(
                            (e: any, i: number) => {
                              return (
                                <option key={i} value={e?.notificationId}>
                                  {e?.notificationId}
                                </option>
                              );
                            }
                          )}
                        </Input>
                        {promoCodeDataError?.notificationIdErr &&
                          promoCodeDataError?.notificationIdErr !== "null" && (
                            <Label className="text-red">
                              {promoCodeDataError?.notificationIdErr}
                            </Label>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {location?.state?.value?.promotionType === "GROUP" && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-12 d-flex">
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Reciever Country<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <Input
                          type="select"
                          className="no-border score-dropdown remit_feesAndCharges"
                          name="payoutCountry"
                          onChange={handle_RecieverCountry_onChange}
                        >
                          <option selected hidden className="cursor">
                            {
                              promoCodeData?.promoCodeRequest
                                ?.payoutCountryDescription
                            }
                          </option>
                          <option>ALL</option>

                          {remitCountryList?.data?.map((e: any, i: number) => {
                            return (
                              <option key={i} value={JSON.stringify(e)}>
                                {e?.description}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                    </div>
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Payment Method<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <Input
                          type="select"
                          className="no-border score-dropdown remit_feesAndCharges"
                          name="payoutMode"
                          onChange={handle_PaymentMethod_onChange}
                        >
                          <option selected hidden className="cursor">
                            {
                              promoCodeData?.promoCodeRequest
                                ?.payoutModeDescription
                            }
                          </option>
                          <option className="cursor">ALL</option>

                          {payoutCountryRecords?.data?.map(
                            (e: any, i: number) => {
                              return (
                                <option
                                  value={JSON.stringify(e)}
                                  selected={
                                    promoCodeData?.promoCodeRequest
                                      ?.payoutMode === e.paymentMethodCode
                                  }
                                >
                                  {e?.description}
                                </option>
                              );
                            }
                          )}
                        </Input>
                      </div>
                    </div>
                    {promoCodeData?.promoCodeRequest?.payoutMode === "1" && (
                      <div className="col-3 me-2">
                        <div className="col">
                          <label className="KYCViewCustomer-label">
                            Payout Bank
                          </label>
                        </div>
                        <div className="col me-4">
                          <Input
                            type="select"
                            className="no-border score-dropdown remit_feesAndCharges"
                            name="payoutBank"
                            onChange={handle_PaymentBank_onChange}
                          >
                            <option selected hidden className="cursor">
                              {
                                promoCodeData?.promoCodeRequest
                                  ?.payoutBankDescription
                              }
                            </option>

                            {bankSetuprecords?.data?.map(
                              (e: any, i: number) => {
                                return (
                                  <option
                                    value={JSON.stringify(e)}
                                    selected={
                                      promoCodeData?.promoCodeRequest
                                        ?.payoutBank === e.bankCode
                                    }
                                  >
                                    {e?.bankName}
                                  </option>
                                );
                              }
                            )}
                          </Input>
                        </div>
                      </div>
                    )}
                    {promoCodeData?.promoCodeRequest?.payoutMode === "2" && (
                      <div className="col-3 me-2">
                        <div className="col">
                          <label className="KYCViewCustomer-label">
                            Cash Pickup Agent
                          </label>
                        </div>
                        <div className="col me-4">
                          <Input
                            type="select"
                            className="no-border score-dropdown remit_feesAndCharges"
                            name="pickUpAgent"
                            onChange={handle_CashPickUpAgent_onChange}
                          >
                            <option selected hidden className="cursor">
                              {
                                promoCodeData?.promoCodeRequest
                                  ?.pickUpAgentDescription
                              }
                            </option>

                            {payGroupRecordsData?.data?.map(
                              (e: any, i: number) => {
                                return (
                                  <option
                                    value={JSON.stringify(e)}
                                    selected={
                                      promoCodeData?.promoCodeRequest
                                        ?.pickUpAgent == e.payAgentCode
                                    }
                                  >
                                    {e?.payAgentName}
                                  </option>
                                );
                              }
                            )}
                          </Input>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Activate<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={promoCodeData?.promoCodeRequest?.activate}
                        onChange={() =>
                          setPromoCodeData({
                            ...promoCodeData,
                            promoCodeRequest: {
                              ...promoCodeData.promoCodeRequest,
                              activate:
                                !promoCodeData?.promoCodeRequest?.activate,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Send<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        className="toggle-switch"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={promoCodeData?.promoCodeRequest?.send}
                        onChange={() =>
                          setPromoCodeData({
                            ...promoCodeData,
                            promoCodeRequest: {
                              ...promoCodeData.promoCodeRequest,
                              send: !promoCodeData?.promoCodeRequest?.send,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {location?.state?.value?.promotionType === "INDIVIDUAL" && (
                <div className="col-7 d-flex justify-content-between align-items-center mb-3">
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
                      </div>
                      <div className="col  me-2">
                        <Button
                          color="danger"
                          className="kyc-FilterSubmitButton me-2"
                          onClick={handle_customer_Submit}
                        >
                          Replace Customer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {CustomerEnquiryDetailList?.data && (
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
              )}
              <div className="col">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Cancel"}
                  marginLeft={true}
                  onCancel={handle_Cancel}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPromoCodeSetup;
