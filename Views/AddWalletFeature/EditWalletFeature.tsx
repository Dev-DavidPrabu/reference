import React, { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FormGroup, Input, Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomLoader from "../../Components/Loader/CustomLoader";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { addNewWalletFeatureSummary } from "../../redux/action/WalletFeatureSummaryAction";
import "./EditWalletFeature.scss";

const EditWalletFeature = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [walletDetails, setWalletDetails] = useState({
    assistedLocalRemittanceAllowed: false,
    assistedPwaPaymentsAllowed: false,
    balanceMaxLimits: 0,
    balanceMinLimits: 0,
    bankBalanceAccessAllowed: false,
    bankSweepInAllowed: false,
    bankSweepOutAllowed: false,
    cardToCardTxnAllowed: true,
    cashInAtMerchantAllowed: false,
    cashOutAtMerchantAllowed: false,
    description: "",
    foreignRemittanceAssistedAllowed: false,
    foreignRemittanceOnBehalfAllowed: false,
    foreignRemittanceOwnAllowed: true,
    giftPacksAllowed: false,
    id: "",
    interProductTransferAllowed: false,
    intraBankTransferAllowed: false,
    intraProductTransferAllowed: false,
    nationalRemittanceAllowed: false,
    paymentAtMerchantPosAllowed: false,
    pwaInsuranceTxnAllowed: true,
    pwaTxnAllowed: false,
    remMaxLimits: 0,
    remMinLimits: 0,
    requestMoneyAllowed: false,
    splitBillAllowed: false,
    statusCode: "", 
    sweepInMaxThresholdBalance: 0,
    sweepOutMinThresholdBalance: 0,
    topupMaxLimits: 0,
    topupMinLimits: 0,
    txnMaxLimits: 0,
    txnMinLimits: 0,
    walletFeatureCode: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const history = useHistory();
  const onChange = (value: any) => {
    setWalletDetails({
      ...walletDetails,
      [value.target.name]: value.target.checked,
    });
  };
  const dispatch = useDispatch();

  const closeMessage = () => {
    setApiMessage("");
  };
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
  const handleEnableAll = () => {
    setWalletDetails({
      ...walletDetails,
      cardToCardTxnAllowed: true,
      nationalRemittanceAllowed: true,
      foreignRemittanceOwnAllowed: true,
      pwaInsuranceTxnAllowed: true,
      foreignRemittanceOnBehalfAllowed: true,
      foreignRemittanceAssistedAllowed: true,
      pwaTxnAllowed: true,
      giftPacksAllowed: true,
    });
  };
  const handleOnchange = (e: any) => {
    setWalletDetails({ ...walletDetails, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    history.push({
      pathname: "/dashboard/wallet/walletFeatureSummary",
    });
  };
  const newWalletFeatureData = useSelector(
    (state: RootStateOrAny) =>
      state.WalletFeatureSummaryReducer?.newWalletFeature
  );
  useEffect(() => {
    if (newWalletFeatureData?.data) {
      setIsLoading(false);
      handleCancel();
    } else if (newWalletFeatureData?.error) {
      setIsLoading(false);
      setApiMessage(newWalletFeatureData?.message);
    }
  }, [newWalletFeatureData]);

  useEffect(() => {
    if (props.location?.state) {
      setWalletDetails(props.location.state?.data);
      setIsEdit(props.location.state?.edit);
    }
  }, [props.location.state]);
  const checkboxes = [
    {
      name: "enableAll",
      key: "enable",
      label: "Enable All",
    },
    {
      name: "nationalRemittanceAllowed",
      checked: walletDetails?.nationalRemittanceAllowed,
      label: "National Remittance Allowed",
    },
    {
      name: "foreignRemittanceOwnAllowed",
      checked: walletDetails.foreignRemittanceOwnAllowed,
      label: "Foreign Remittance Own Allowed",
    },
    {
      name: "cardToCardTxnAllowed",
      checked: walletDetails.cardToCardTxnAllowed,
      label: "Card to Card Transaction Allowed",
    },
    {
      name: "pwaInsuranceTxnAllowed",
      checked: walletDetails.pwaInsuranceTxnAllowed,
      label: "PWA Insurance Transaction Allowed",
    },
    {
      name: "foreignRemittanceOnBehalfAllowed",
      checked: walletDetails.foreignRemittanceOnBehalfAllowed,
      label: "Foreign Remittance On Behalf Allowed",
    },
    {
      name: "foreignRemittanceAssistedAllowed",
      checked: walletDetails.foreignRemittanceAssistedAllowed,
      label: "Foreign Remittance Assists Allowed",
    },
    {
      name: "pwaTxnAllowed",
      checked: walletDetails.pwaTxnAllowed,
      label: "PWA Transaction Allowed",
    },
    {
      name: "giftPacksAllowed",
      checked: walletDetails.giftPacksAllowed,
      label: "Gift Packs Allowed",
    },
  ];
  const handleSubmit = () => {
    setIsLoading(true);
    // if (Validation()) {
      let payload = JSON.stringify({
        id:walletDetails.id,
        walletFeatureCode: walletDetails?.walletFeatureCode,
        description: walletDetails?.description,
        balanceMinLimits:walletDetails?.balanceMinLimits,
        topupMinLimits: walletDetails?.topupMinLimits,
        txnMinLimits:walletDetails.txnMinLimits,
        remMinLimits: walletDetails.remMinLimits,
        balanceMaxLimits: walletDetails.balanceMaxLimits,
        topupMaxLimits: walletDetails.topupMaxLimits,
        txnMaxLimits: walletDetails.topupMaxLimits,
        remMaxLimits: walletDetails.remMaxLimits,
        sweepInMaxThresholdBalance: walletDetails.sweepInMaxThresholdBalance,
        sweepOutMinThresholdBalance: walletDetails.sweepOutMinThresholdBalance,

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
        requestMoneyAllowed: checkedItems.requestMoneyAllowed
          ? "true"
          : "false",
        cashInAtMerchantAllowed: checkedItems.cashInAtMerchantAllowed
          ? "true"
          : "false",
        cashOutAtMerchantAllowed: checkedItems.cashOutAtMerchantAllowed
          ? "true"
          : "false",
      });
      ///addNewWalletFeature(payload);
      dispatch(addNewWalletFeatureSummary(payload));
    // }
  };
  return (
    <div className="">
      <div className="p-3 d-flex">
        <h1 className="edit-wallet">
          {isEdit ? "Edit Wallet Feature" : "View Wallet Feature"}
        </h1>
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

        <div className="d-flex col">
          <div className="col p-3">
            <div className="col d-flex">
              <div className="col-6 me-1">
                <div className="">
                  <label className="edit-wallet-inputLabelDetails">
                    Wallet Feature Code
                  </label>
                  <span className="wallet-color">*</span>
                </div>
                <div className=" me-2">
                  <input
                    className="edit-wallet-input form-control edit-wallet-inputboxsize"
                    type="text"
                    name="walletFeatureCode"
                    readOnly={isEdit}
                    value={walletDetails?.walletFeatureCode}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
              <div className="col-6 me-1">
                <div className="">
                  <label className="edit-wallet-inputLabelDetails">
                    Description
                  </label>
                  <span className="edit-wallet-color">*</span>
                </div>
                <div className="me-2">
                  <textarea
                    className="edit-wallet-input-textarea form-control"
                    name="description"
                    readOnly={isEdit}
                    value={walletDetails?.description}
                    onChange={handleOnchange}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex col mt-3">
              <div className="col-3">
                <FormGroup>
                  <Label for="exampleEmail">Balance Min Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="balanceMinLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.balanceMinLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-3 ms-1">
                <FormGroup>
                  <Label for="exampleEmail">Balance Max Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="balanceMaxLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.balanceMaxLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-3 ms-1">
                <FormGroup>
                  <Label for="exampleEmail">Topup Max Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="topupMaxLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.topupMaxLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-3 ms-1">
                <FormGroup>
                  <Label for="exampleEmail">Topup Min Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="topupMinLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.topupMinLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>
            </div>
            <div className="d-flex col mt-3">
              <div className="col-3">
                <FormGroup>
                  <Label for="exampleEmail">Txn Min Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="txnMinLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.txnMinLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>

              <div className="col-3 ms-1">
                <FormGroup>
                  <Label for="exampleEmail">Txn Max Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="txnMaxLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.txnMaxLimits}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-3 ms-1">
                <FormGroup>
                  <Label for="exampleEmail">Remit Max Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="remMaxLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.remMaxLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-3 ms-1">
                <FormGroup>
                  <Label for="exampleEmail">Remit Min Limit</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="number"
                    name="remMinLimits"
                    className=""
                    readOnly={!isEdit}
                    value={walletDetails?.remMinLimits}
                    onChange={handleOnchange}
                  ></Input>
                </FormGroup>
              </div>
            </div>
            <div className="d-flex col mt-3">
              <div className="col-3">
                <FormGroup>
                  <Label for="exampleEmail">Status Code</Label>
                  <span className="edit-wallet-color">*</span>
                  <Input
                    type="select"
                    name="statusCode"
                    className="form-select btn--sizer"
                    disabled={!isEdit}
                    value={walletDetails?.statusCode}
                    onChange={handleOnchange}
                  >
                    <option>Active</option>
                    <option>InActive</option>
                  </Input>
                </FormGroup>
              </div>
            </div>

            <div className="mt-3">
              <SubmitCancelButton
                button={"Save"}
                onSubmit={handleSubmit}
                secondButton={"Cancel"}
                onCancel={handleCancel}
              />
            </div>
          </div>
          <div className="col d-flex flex-column">
            <div className="col-9 border-1 mt-4">
              {checkboxes.map((item: any) => (
                <div>
                  {item.name === "enableAll" ? (
                    <div
                      className={`${
                        isEdit ? "" : "d-none"
                      } d-flex justify-content-end edit-wallet-back-color edit-wallet-textcolor ms-3 cursor`}
                      onClick={handleEnableAll}
                    >
                      <div className="me-2">{item.label}</div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between edit-wallet-back-color shadow-md ms-3 mt-1 form-check form-switch">
                      <label className="d-flex align-items-center wallet-enable-label">
                        {item.label}
                      </label>
                      <input
                        type="checkbox"
                        className="form-check-input me-3"
                        role="switch"
                        name={item.name}
                        checked={item.checked}
                        onChange={onChange}
                        disabled={!isEdit}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CommonEditSummary>
    </div>
  );
};

export default EditWalletFeature;

