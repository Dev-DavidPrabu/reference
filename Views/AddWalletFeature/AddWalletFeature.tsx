import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import "./AddWalletFeature.scss";
import { Input, Label } from "reactstrap";
import {
  addNewWalletFeatureSummary,
  getWalletFeatureSummary,
  resetNewWalletSummary,
} from "../../redux/action/WalletFeatureSummaryAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import { useHistory } from "react-router";

const AddWalletFeature = () => {
  const [expanAll] = useState(true);
  const [check, setCheck] = useState(false);
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const history = useHistory();
  const [walletDetails, setWalletDetails] = useState({
    walletCode: "",
    description: "",
    walletType: "",
    LimitType: "",
    balanceMinLimits: "",
    balanceMaxLimits: "",
    feature: "",
    nationalRemittanceAllowed: false,
    foreignRemittanceOwnAllowed: false,
    cardToCardTxnAllowed: false,
    pwaInsuranceTxnAllowed: false,
    foreignRemittanceOnBehalfAllowed: false,
    foreignRemittanceAssistedAllowed: false,
    pwaTxnAllowed: false,
    giftPacksAllowed: false,
    splitBillAllowed: false,
    requestMoneyAllowed: false,
    cashInAtMerchantAllowed: false,
    cashOutAtMerchantAllowed: false,
    assistedLocalRemittanceAllowed: false,
    assistedPwaPaymentsAllowed: false,
    paymentAtMerchantPosAllowed: false,
  });
  const [error, setError] = useState({
    WalletFeatureCodeError: "",
    DescriptionError: "",
    WalletTypeError: "",
    setupLimitError: "",
    minmaxLimitError: "",
  });

  const [checkedItems, setCheckedItems]: any = useState({
    nationalRemittanceAllowed: false,
    foreignRemittanceOwnAllowed: false,
    cardToCardTxnAllowed: false,
    pwaInsuranceTxnAllowed: false,
    foreignRemittanceOnBehalfAllowed: false,
    foreignRemittanceAssistedAllowed: false,
    pwaTxnAllowed: false,
    giftPacksAllowed: false,
    splitBillAllowed: false,
    requestMoneyAllowed: false,
    cashInAtMerchantAllowed: false,
    cashOutAtMerchantAllowed: false,
    assistedLocalRemittanceAllowed: false,
    assistedPwaPaymentsAllowed: false,
    paymentAtMerchantPosAllowed: false,
  });
  let [setupLimitArray, setSetupLimitArray] = useState([
    {
      setUpType: "",
      maxLimit: "",
      minLimit: "",
    },
  ]);
  const [setupOptions, setSetupOption] = useState([
    "",
    "Balance",
    "Transaction",
    "Remit",
    "Topup",
    "Bank Sweep",
    "Cash Out Per Transaction",
    "P2P Per Day",
  ]);
  let [usedLimitType, setUsedLimitType] = useState([" "]);
  const handleFieldChange = (e: any) => {
    setWalletDetails({ ...walletDetails, [e.target.name]: e.target.value });
  };
  const newWalletFeatureData = useSelector(
    (state: RootStateOrAny) =>
      state.WalletFeatureSummaryReducer?.newWalletFeature
  );

  const resetNewWalletFeature = useCallback(async () => {
    try {
      dispatch(resetNewWalletSummary());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (newWalletFeatureData?.data) {
      setIsLoading(false);
      handleCancel();
      resetNewWalletFeature();
    } else if (newWalletFeatureData?.error) {
      setIsLoading(false);
      setApiMessage(newWalletFeatureData?.message);
    }
  }, [newWalletFeatureData]);

  const walletFeatureData = useSelector(
    (state: RootStateOrAny) =>
      state.WalletFeatureSummaryReducer?.getAllWalletFeatureResponse
  );

  let walletData = walletFeatureData?.data;
  useEffect(() => {
    if (walletFeatureData?.data) {
      setIsLoading(false);
    }
  }, [walletFeatureData]);

  const fetchAllWalletFeature = useCallback(async () => {
    try {
      dispatch(getWalletFeatureSummary());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchAllWalletFeature();
  }, [fetchAllWalletFeature]);

  const addNewWalletFeature = useCallback(
    async (data: any) => {
      try {
        setIsLoading(true);
        dispatch(addNewWalletFeatureSummary(data));
      } catch (err) {}
    },
    [dispatch]
  );

  const checkboxes = [
    {
      name: "nationalRemittanceAllowed",
      key: "checkBox1",
      label: "National Remittance Allowed",
    },
    {
      name: "foreignRemittanceOwnAllowed",
      key: "checkBox2",
      label: "Foreign Remittance Own Allowed",
    },
    {
      name: "cardToCardTxnAllowed",
      key: "checkBox3",
      label: "Card to Card Transaction Allowed",
    },
    {
      name: "pwaInsuranceTxnAllowed",
      key: "checkBox4",
      label: "PWA Insurance Transaction Allowed",
    },
    {
      name: "foreignRemittanceOnBehalfAllowed",
      key: "checkBox5",
      label: "Foreign Remittance On Behalf Allowed",
    },
    {
      name: "foreignRemittanceAssistedAllowed",
      key: "checkBox6",
      label: "Foreign Remittance Assists Allowed",
    },
    {
      name: "pwaTxnAllowed",
      key: "checkBox7",
      label: "PWA Transaction Allowed",
    },
    {
      name: "giftPacksAllowed",
      key: "checkBox8",
      label: "Gift Packs Allowed",
    },
  ];

  const checkboxeSecond = [
    {
      name: "splitBillAllowed",
      key: "checkBox9",
      label: "Split Bill Allowed",
    },
    {
      name: "requestMoneyAllowed",
      key: "checkBox10",
      label: "Request Money Allowed",
    },
    {
      name: "cashInAtMerchantAllowed",
      key: "checkBox11",
      label: "Cash in at Merchant Allowed",
    },
    {
      name: "cashOutAtMerchantAllowed",
      key: "checkBox12",
      label: "Cash-out at Merchant Allowed",
    },
    {
      name: "assistedLocalRemittanceAllowed",
      key: "checkBox13",
      label: "Assisted Local Remittance Allowed",
    },
    {
      name: "assistedPwaPaymentsAllowed",
      key: "checkBox14",
      label: "Assisted PWA Payments Allowed",
    },
    {
      name: "paymentAtMerchantPosAllowed",
      key: "checkBox15",
      label: "Payment at Merchant POS Allowed",
    },
  ];

  const OnClickEnableAll = () => {
    setCheck(!check);
  };

  const OnClickAddSetUp = () => {
    if (setupLimitArray.length > 4) {
      setError({
        WalletFeatureCodeError: "",
        DescriptionError: "",
        WalletTypeError: "",
        setupLimitError: "Maximum limit types added",
        minmaxLimitError: "",
      });
    } else {
      setSetupLimitArray([
        ...setupLimitArray,
        { setUpType: "", maxLimit: "", minLimit: "" },
      ]);
    }
  };
  const onChange = (value: any) => {
    setCheckedItems({
      ...checkedItems,
      [value.target.name]: value.target.checked,
    });
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  const Validation = () => {
    let WalletFeatureCode = customValidator(
      "startDate",
      "Wallet FeatureCode",
      walletDetails.walletCode
    );
    let Description = customValidator(
      "endDate",
      "Description",
      walletDetails.description
    );
    let WalletType = customValidator(
      "paymentMode",
      "Wallet Type",
      walletDetails.walletType
    );
    let setUpLimitValidation = "";

    let isFieldsEntered = setupLimitArray.filter((item: any) => {
      if (
        item.setUpType === "" ||
        item.maxLimit === "" ||
        item.minLimit === ""
      ) {
        return item;
      }
    });
    if (isFieldsEntered?.length > 0) {
      setUpLimitValidation = "*indicated Fields are mandatory";
    } else {
      const lookup = setupLimitArray.reduce((a: any, e: any) => {
        a[e.setUpType] = ++a[e.setUpType] || 0;
        return a;
      }, {});
      let isDuplicate = setupLimitArray.filter(
        (e: any) => lookup[e?.setUpType]
      );
      if (isDuplicate?.length > 0) {
        setUpLimitValidation = `${isDuplicate[0].setUpType} duplicate Setup limit found`;
      } else {
        setUpLimitValidation = "null";
      }
    }

    if (
      !(
        WalletFeatureCode === "null" &&
        Description === "null" &&
        setUpLimitValidation === "null"
      )
    ) {
      setError({
        WalletFeatureCodeError: WalletFeatureCode,
        DescriptionError: Description,
        WalletTypeError: WalletType,
        setupLimitError: setUpLimitValidation,
        minmaxLimitError: "",
      });
      return false;
    }
    setError({
      WalletFeatureCodeError: "",
      DescriptionError: "",
      WalletTypeError: "",
      setupLimitError: "",
      minmaxLimitError: "",
    });
    return true;
  };

  const handleSetupLimit = (e: any, index: any) => {
    setError({
      WalletFeatureCodeError: "",
      DescriptionError: "",
      WalletTypeError: "",
      setupLimitError: "",
      minmaxLimitError: "",
    });
    setupLimitArray[index].setUpType = e.target.value;
    setSetupLimitArray([...setupLimitArray]);
  };

  const handleValueLimit = (e: any, index: any) => {
    if (e.target.name === "maxLimit") {
      setupLimitArray[index].maxLimit = e.target.value;
    } else {
      setupLimitArray[index].minLimit = e.target.value;
    }
    setSetupLimitArray([...setupLimitArray]);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // if (Validation()) {
    let balminlimit = "";
    let balmaxlimit = "";
    let txnminlimit = "";
    let txnmaxlimit = "";
    let remitminlimit = "";
    let remitmaxlimit = "";
    let topUpminlimit = "";
    let topUpmaxlimit = "";
    let bankSweepminLimit = "";
    let bankSweepmaxLimit = "";
    let CashOutPerLimit = "";
    let P2pPerDayLimit = "";

    setupLimitArray.forEach((value: any) => {
      switch (value.setUpType) {
        case "Balance":
          balminlimit = value.minLimit;
          balmaxlimit = value.maxLimit;
          break;
        case "Transaction":
          txnminlimit = value.minLimit;
          txnmaxlimit = value.maxLimit;
          break;
        case "Remit":
          remitminlimit = value.minLimit;
          remitmaxlimit = value.maxLimit;
          break;
        case "Topup":
          topUpminlimit = value.minLimit;
          topUpmaxlimit = value.maxLimit;
          break;
        case "Bank Sweep":
          bankSweepminLimit = value.minLimit;
          bankSweepmaxLimit = value.maxLimit;
          break;
        case "Cash Out Per Transaction":
          CashOutPerLimit = value.maxLimit;
          break;
        case "P2P Per Day":
          P2pPerDayLimit = value.maxLimit;
          break;
        default:
          return;
      }
    });
    let payload = JSON.stringify({
      walletFeatureCode: walletDetails?.walletCode,
      description: walletDetails?.description,
      balanceMinLimits: balminlimit,
      topupMinLimits: topUpminlimit,
      txnMinLimits: txnminlimit,
      remMinLimits: remitminlimit,
      balanceMaxLimits: balmaxlimit,
      topupMaxLimits: topUpmaxlimit,
      txnMaxLimits: txnmaxlimit,
      remMaxLimits: remitmaxlimit,
      sweepInMaxThresholdBalance: bankSweepminLimit,
      sweepOutMinThresholdBalance: bankSweepmaxLimit,
      nationalRemittanceAllowed: checkedItems.nationalRemittanceAllowed
        ? "true"
        : "false",
      foreignRemittanceOwnAllowed: checkedItems.foreignRemittanceOwnAllowed
        ? "true"
        : "false",
      foreignRemittanceOnBehalfAllowed:
        checkedItems.foreignRemittanceOnBehalfAllowed ? "true" : "false",
      foreignRemittanceAssistedAllowed:
        checkedItems.foreignRemittanceAssistedAllowed ? "true" : "false",
      pwaTxnAllowed: checkedItems.pwaTxnAllowed ? "true" : "false",
      giftPacksAllowed: checkedItems.giftPacksAllowed ? "true" : "false",
      splitBillAllowed: checkedItems.splitBillAllowed ? "true" : "false",
      requestMoneyAllowed: checkedItems.requestMoneyAllowed ? "true" : "false",
      cashInAtMerchantAllowed: checkedItems.cashInAtMerchantAllowed
        ? "true"
        : "false",
      cashOutAtMerchantAllowed: checkedItems.cashOutAtMerchantAllowed
        ? "true"
        : "false",
      maxCashOutPerTxnLimit: CashOutPerLimit,
      maxP2pPerDayLimit: P2pPerDayLimit,
    });
    ///addNewWalletFeature(payload);
    dispatch(addNewWalletFeatureSummary(payload));
    // }
  };

  const handleCancel = () => {
    history.push({
      pathname: "/dashboard/wallet/walletFeatureSummary",
    });
  };

  const renderSetupLimit = (index: any) => {
    return (
      <>
        <div className="col d-flex mt-2">
          <div className="col-3 me-2">
            <div className="">
              <label className="wallet-inputLabelDetails">
                Select Limit Type
              </label>
            </div>
            <div className=" me-2">
              <Input
                className="wallet-input form-select wallet-inputboxsize"
                type="select"
                name="setupLimit"
                value={setupLimitArray[index]?.setUpType}
                onChange={(e) => handleSetupLimit(e, index)}
              >
                {setupOptions.map((item: any) => {
                  if (!usedLimitType.includes(item)) {
                    return <option>{item}</option>;
                  }
                })}
              </Input>
            </div>
          </div>
        </div>
        {setupLimitArray[index]?.setUpType && (
          <div className="col d-flex mt-2">
            <label className="wallet-limit-label">
              {`${setupLimitArray[index]?.setUpType}`} Limit
            </label>
          </div>
        )}
        <div className="col d-flex mt-2">
          {setupLimitArray[index]?.setUpType !== "Cash Out Per Transaction" &&
            setupLimitArray[index]?.setUpType !== "P2P Per Day" && (
              <div className="col-3 me-2">
                <div className="">
                  <label className="wallet-inputLabelDetails">
                    Minimum Limit
                  </label>
                  <span className="wallet-color">*</span>
                </div>
                <div className=" me-2">
                  <input
                    className="wallet-input form-control wallet-inputboxsize"
                    type="number"
                    value={setupLimitArray[index]?.minLimit}
                    name="minLimit"
                    onChange={(e) => handleValueLimit(e, index)}
                  />
                </div>
              </div>
            )}
          <div className="col-3 me-2">
            <div className="">
              <label className="wallet-inputLabelDetails">Maximum Limit</label>
              <span className="wallet-color">*</span>
            </div>
            <div className=" me-2">
              <input
                className="wallet-input form-control wallet-inputboxsize"
                type="number"
                name="maxLimit"
                value={setupLimitArray[index]?.maxLimit}
                onChange={(e) => handleValueLimit(e, index)}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="KYCViewCustomerProfile">
      <div className="p-3 d-flex">
        <h1 className="Enquiry-heading">Add Wallet Feature</h1>
      </div>
      <CustomLoader isLoading={isLoading} size={50} />
      <CommonEditSummary style={{ maxHeight: "fit-content" }} print={true}>
        <div>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={() => closeMessage()}
              message={apiMessage}
              errorFix={true}
            />
          )}
        </div>
        <div className="px-3" ref={componentRef}>
          <div className="p-3">
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="0"
              header="Setup Wallet Feature"
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-1">
                    <div className="">
                      <label className="wallet-inputLabelDetails">
                        Wallet Feature Code
                      </label>
                      <span className="wallet-color">*</span>
                    </div>
                    <div className=" me-2">
                      <input
                        className="wallet-input form-control wallet-inputboxsize"
                        type="text"
                        name="walletCode"
                        value={walletDetails?.walletCode}
                        onChange={handleFieldChange}
                      />
                      {error.WalletFeatureCodeError &&
                        error.WalletFeatureCodeError !== "null" && (
                          <Label className="text-red">
                            {error.WalletFeatureCodeError}
                          </Label>
                        )}
                    </div>
                  </div>
                  <div className="col-3 me-1">
                    <div className="">
                      <label className="wallet-inputLabelDetails">
                        Description
                      </label>
                      <span className="wallet-color">*</span>
                    </div>
                    <div className="me-2">
                      <textarea
                        className="wallet-input-textarea form-control"
                        name="description"
                        value={walletDetails?.description}
                        onChange={handleFieldChange}
                      />
                      {error.DescriptionError &&
                        error.DescriptionError !== "null" && (
                          <Label className="text-red">
                            {error.DescriptionError}
                          </Label>
                        )}
                    </div>
                  </div>
                  {/* <div className="col-3 me-1">
                    <div className="">
                      <label className="wallet-inputLabelDetails">
                        Wallet Type
                      </label>
                      <span className="wallet-color">*</span>
                    </div>
                    <div className="me-2">
                      <Input
                        className="wallet-input form-select wallet-inputboxsize"
                        type="select"
                        name="walletType"
                        value={walletDetails?.walletType}
                        onChange={handleFieldChange}
                      >
                        <option>Basic Wallet</option>
                        {walletData &&
                          walletData.map((item: any) => {
                            return <option>{item.walletFeatureCode}</option>;
                          })}
                      </Input>
                      {error.WalletTypeError &&
                        error.WalletTypeError !== "null" && (
                          <Label className="text-red">
                            {error.WalletTypeError}
                          </Label>
                        )}
                    </div>
                  </div> */}
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="1"
              header="Setup Limit"
            >
              <div className="justify-content-between align-items-center mb-4">
                <div className="col d-flex justify-content-end">
                  {error.setupLimitError &&
                    error.setupLimitError !== "null" && (
                      <div className="d-flex align-items-center wallet-color">
                        {error.setupLimitError}
                      </div>
                    )}
                  <div
                    className={`cursor ms-2`}
                    onClick={() => OnClickAddSetUp()}
                  >
                    <button
                      className="wallet-add-link border-0"
                      style={{ backgroundColor: "#39C570" }}
                    >
                      +Add
                    </button>
                  </div>
                </div>
                {setupLimitArray &&
                  setupLimitArray.map((e: any, index: number) => {
                    return renderSetupLimit(index);
                  })}
              </div>
            </CustomAccordion>
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="1"
              header="Enable/Disable Features"
            >
              <div className="justify-content-between align-items-center mb-4">
                {/* <div className="col d-flex">
                  <div className="col-5 me-2">
                    <div className="">
                      <label className="wallet-inputLabelDetails">
                        Select Feature
                      </label>
                    </div>
                    <div className=" me-2">
                      <Input
                        className="wallet-input form-select wallet-inputboxsize"
                        type="select"
                        value={walletDetails?.feature}
                      ></Input>
                    </div>
                  </div>
                </div> */}
                <div className="col d-flex mt-3">
                  <div className={`cursor`} onClick={() => OnClickEnableAll()}>
                    <span className="wallet-link">Enable All</span>
                  </div>
                </div>

                <div className="col d-flex mt-3">
                  <div className="col-6">
                   
                    {checkboxes.map((item: any) => (
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
                          name={item.name}
                          checked={check ? true : undefined}
                          onChange={onChange}
                        />
                        <label className="wallet-enable-label">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="col-6">
                    {checkboxeSecond.map((item) => (
                      <div className="form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
                          name={item.name}
                          checked={check ? true : undefined}
                          onChange={onChange}
                        />
                        <label className="wallet-enable-label">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <SubmitCancelButton
                    button={"Save"}
                    secondButton={"Cancel"}
                    onSubmit={handleSubmit}
                    onCancel={() => handleCancel()}
                  />
                </div>
              </div>
            </CustomAccordion>
          </div>
        </div>
      </CommonEditSummary>
    </div>
  );
};

export default AddWalletFeature;
