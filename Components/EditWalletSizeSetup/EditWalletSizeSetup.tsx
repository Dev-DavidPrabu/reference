import { Select, Switch } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import {
  getWalletFeatureCode,
  resetUpdatedWallet,
  updateWalletSizeSetupData,
} from "../../redux/action/WalletSizeSetupAction";
import CustomLoader from "../Loader/CustomLoader";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./EditWalletSizeSetup.scss";

const EditWalletSizeSetup = (props: any) => {
  const [walletValue, setWalletValue] = useState({
    id: "",
    accountTypeCode: "",
    accountName: "",
    walletFeatureCode: "",
    onBoardingChannel: "",
    onBoarding_ContentCode: "",
    termsConditionsURL: "",
    privacyPolicyURL: "",
  });
  const [agreementValue, setAgreementValue] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [walletStatus, setWalletStatus] = useState(true);
  const [walletError, setWalletError] = useState(false);
  const { Option } = Select;

  const updateWalletSizeSetupRecords = useSelector(
    (state: RootStateOrAny) =>
      state.WalletSizeSetupReducer?.updateWalletSizeSetupResponse
  );

  const fetchUpdateWalletSizeSetup = useCallback(
    async (body: any) => {
      try {
        dispatch(updateWalletSizeSetupData(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetUpdateWalletSizeSetup = useCallback(async () => {
    try {
      dispatch(resetUpdatedWallet());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (updateWalletSizeSetupRecords) {
      if (updateWalletSizeSetupRecords?.data) {
        setIsLoading(false);
        props.history.push({
          pathname: "/dashboard/Wallet-Size-Setup",
          state: true,
          message: "Wallet Size Setup Updated Successfully",
        });
        resetUpdateWalletSizeSetup();
      } else if (updateWalletSizeSetupRecords?.error) {
        setIsLoading(false);
        setWalletStatus(false);
        setApiMessage(updateWalletSizeSetupRecords?.message);
        setWalletError(true);
      }
    }
  }, [updateWalletSizeSetupRecords]);

  let walletFeatureCodeRecords = useSelector(
    (state: RootStateOrAny) =>
      state.WalletSizeSetupReducer?.getWalletFeatureCoderesponse
  );

  const fetchWalletFeatureCodeRecords = useCallback(async () => {
    try {
      dispatch(getWalletFeatureCode());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchWalletFeatureCodeRecords();
  }, [fetchWalletFeatureCodeRecords]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage]);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setWalletValue(props.location.state);
      setAgreementValue(props.location.state.agreement === "Y" ? true : false);
    }
  }, [props.location.state]);

  const onCancel = () => {
    props.history.push({
      pathname: "/dashboard/Wallet-Size-Setup",
    });
  };

  const handleEnabled = (e: any) => {
    setAgreementValue(e);
  };

  const submitHandler = () => {
    var body = JSON.stringify({
      id: walletValue.id,
      accountTypeCode: walletValue.accountTypeCode,
      accountName: walletValue.accountName,
      walletFeatureCode: walletValue.walletFeatureCode,
      onBoardingChannel: walletValue.onBoardingChannel,
      onBoarding_ContentCode: walletValue.onBoarding_ContentCode,
      agreement: agreementValue,
      privacyPolicyURL: walletValue.privacyPolicyURL,
      termsConditionsURL: walletValue.termsConditionsURL,
    });
    fetchUpdateWalletSizeSetup(body);
    setIsLoading(true);
  };

  const handleChangeWalletSize = (e: any) => {
    setWalletValue({ ...walletValue, [e.target.name]: e.target.value });
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  const handleChangeType = (e: any) => {
    let obj = JSON.parse(e);
    setWalletValue({
      ...walletValue,
      ["walletFeatureCode"]: obj.walletFeatureCode,
    });
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold wallet-size-title">Edit Wallet Size</h1>
          <button className="wallet-size-back border-0" onClick={onCancel}>
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
          <div className="wallet-size-body p-3">
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">
                  Wallet Size
                  <span className="container-body-label-color">*</span>
                </label>
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
                <label className="wallet-size-label">
                  Wallet Description
                  <span className="container-body-label-color">*</span>
                </label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="accountName"
                  readOnly={true}
                  value={walletValue.accountName}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">
                  Wallet Feature Code
                  <span className="container-body-label-color">*</span>
                </label>
              </div>
              <div className="col-3 p-1">
                <Select
                  onChange={handleChangeType}
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  id="fieldName1"
                  className="form-select card-Upgrade-placeholder border-0"
                  value={walletValue.walletFeatureCode}
                  disabled={false}
                  placeholder={"Select ID Type"}
                >
                  {walletFeatureCodeRecords?.data &&
                    walletFeatureCodeRecords?.data?.map(
                      (option: any, index: any) => {
                        return (
                          <Option key={index} value={JSON.stringify(option)}>
                            {option.walletFeatureCode}
                          </Option>
                        );
                      }
                    )}
                </Select>
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">On Boarding Channel</label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="onBoardingChannel"
                  readOnly={true}
                  value={walletValue.onBoardingChannel}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">
                  On Boarding Logo Content ID
                </label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="onBoarding_ContentCode"
                  value={walletValue.onBoarding_ContentCode}
                  onChange={handleChangeWalletSize}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">
                  Terms and Condition URL
                </label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="termsConditionsURL"
                  value={walletValue.termsConditionsURL}
                  onChange={handleChangeWalletSize}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">Privacy Policy URL</label>
              </div>
              <div className="col-6 p-1">
                <Input
                  className="border-1 card-Upgrade-inputMobile form-control"
                  type="text"
                  name="privacyPolicyURL"
                  value={walletValue.privacyPolicyURL}
                  onChange={handleChangeWalletSize}
                />
              </div>
            </div>
            <div className="col d-flex p-1">
              <div className="col-3 p-1">
                <label className="wallet-size-label">Agreement</label>
              </div>
              <div className="col-6 p-1">
                <Switch
                  checked={agreementValue}
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
                  button={"Submit"}
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

export default EditWalletSizeSetup;
