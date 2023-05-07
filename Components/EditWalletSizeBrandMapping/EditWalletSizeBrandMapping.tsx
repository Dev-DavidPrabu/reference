import { Switch } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import {
  resetUpdatedWalletMapping,
  updateWalletSizeBrandMappingData,
} from "../../redux/action/WalletSizeBrandMappingAction";
import CustomLoader from "../Loader/CustomLoader";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./EditWalletSizeBrandMapping.scss";

const EditWalletSizeBrandMapping = (props: any) => {
  const [walletValue, setWalletValue] = useState({
    id: "",
    accountTypeCode: "",
    walletTypeCode: "",
    walletLevel: "",
    cardWorksKycIndicator: "",
    idleMonths: "",
    accountTypeDescription: "",
  });
  const [approvalFlagValue, setApprovalFlagValue] = useState(true);
  const [eKYCEnabled, SetEKYCEnabled] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [walletStatus, setWalletStatus] = useState(true);
  const [walletError, setWalletError] = useState(false);

  const updateWalletSizeBrandMappingRecords = useSelector(
    (state: RootStateOrAny) =>
      state.WalletSizeBrandMappingReducer?.updateWalletSizeBrandMappingResponse
  );

  const fetchUpdateWalletSizeBrandMapping = useCallback(
    async (body: any) => {
      try {
        dispatch(updateWalletSizeBrandMappingData(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetUpdateWalletSizeBrandMapping = useCallback(async () => {
    try {
      dispatch(resetUpdatedWalletMapping());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (updateWalletSizeBrandMappingRecords) {
      if (updateWalletSizeBrandMappingRecords?.data) {
        setIsLoading(false);
        props.history.push({
          pathname: "/dashboard/Wallet-Size-Brand-Mapping",
          state: true,
          message: "Wallet Size Brand Mapping Updated Successfully",
        });
        resetUpdateWalletSizeBrandMapping();
      } else if (updateWalletSizeBrandMappingRecords?.error) {
        setIsLoading(false);
        setApiMessage(updateWalletSizeBrandMappingRecords?.message);
        setWalletError(true);
        setWalletStatus(false);
      }
    }
  }, [updateWalletSizeBrandMappingRecords]);
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage]);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setWalletValue(props.location.state);
      setApprovalFlagValue(
        props.location.state.approvalFlag === "Y" ? true : false
      );
      SetEKYCEnabled(props.location.state.isEkycEnabled === "Y" ? true : false);
    }
  }, [props.location.state]);

  const onCancel = () => {
    props.history.push({
      pathname: "/dashboard/Wallet-Size-Brand-Mapping",
    });
  };

  const handleEnabled = (e: any) => {
    setApprovalFlagValue(e);
  };
  const handleEnableKYC = (e: any) => {
    SetEKYCEnabled(e);
  };

  const handleChangeWalletMapping = (e: any) => {
    setWalletValue({ ...walletValue, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    var body = JSON.stringify({
      id: walletValue.id,
      accountTypeCode: walletValue.accountTypeCode,
      walletTypeCode: walletValue.walletTypeCode,
      walletLevel: walletValue.walletLevel,
      isEkycEnabled: eKYCEnabled,
      cardWorksKycIndicator: walletValue.cardWorksKycIndicator,
      idleMonths: walletValue.idleMonths,
      approvalFlag: approvalFlagValue,
    });
    fetchUpdateWalletSizeBrandMapping(body);
    setIsLoading(true);
  };

  const closeMessage = () => {
    setApiMessage("");
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold wallet-Brand-title">
            Edit Wallet Size Brand Mapping
          </h1>
          <button className="wallet-Brand-back border-0" onClick={onCancel}>
            {" "}
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <CustomLoader isLoading={isLoading} size={50} />
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={walletStatus}
          closeMessage={() => closeMessage()}
          message={apiMessage}
          errorFix={walletError}
        />
      )}
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="wallet-Brand-body p-3">
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">Account Type Code</label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="accountTypeCode"
                  readOnly={true}
                  value={walletValue.accountTypeCode}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">
                  Wallet Type Code
                  <span className="container-body-label-color">*</span>
                </label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="walletTypeCode"
                  readOnly={true}
                  value={walletValue.walletTypeCode}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">
                  Wallet Level
                  <span className="container-body-label-color">*</span>
                </label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="walletLevel"
                  value={walletValue.walletLevel}
                  readOnly={true}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">eKYC Enabaled</label>
              </div>
              <div className="col-6 p-1">
                <Switch
                  checked={eKYCEnabled}
                  checkedChildren="Yes"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnableKYC(e)}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">
                  Card Works KYC Indicator
                </label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="cardWorksKycIndicator"
                  onChange={handleChangeWalletMapping}
                  value={walletValue.cardWorksKycIndicator}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">Idle Month</label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="idleMonths"
                  value={walletValue.idleMonths}
                  onChange={handleChangeWalletMapping}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-Brand-label">Approval Flag</label>
              </div>
              <div className="col-6 p-1">
                <Switch
                  checked={approvalFlagValue}
                  checkedChildren="Yes"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabled(e)}
                />
              </div>
            </div>
            <div className="col d-flex pt-5">
              <div className="col-3 p-1"></div>
              <div className="col-6 p-1">
                <SubmitCancelButton
                  button={"Update"}
                  secondButton={"Cancel"}
                  onSubmit={submitHandler}
                  onCancel={onCancel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWalletSizeBrandMapping;
