import { useCallback, useEffect, useState } from "react";
import "./GlobalSettings.scss";
import { Input, Switch } from "antd";
import { Button, Label } from "reactstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  editGlobalSettingsData,
  getGlobalSettingsData,
} from "../../redux/action/GlobalSettingsAction";
import { FaRegEdit } from "react-icons/fa";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";

const GlobalSettings = (props: any) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    isIdNumberValidationEnabled: true,
    idNumberValidationCount: 0,
    invalidOtpMaxCount: 0,
    deviceBindCount: 0,
    mobileNumberBindCount: 0,
    deviceThresholdLimit: 0,
    deviceThresholdLimitMail: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [cardStatus, setCardStatus] = useState(true);
  const [fixError, setFixError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const globalSettingsData = useSelector(
    (state: RootStateOrAny) =>
      state.globalSettingsReducer?.globalSettingsResponse
  );
  let mobileData = globalSettingsData?.data;
  useEffect(() => {
    if (globalSettingsData?.data) {
      setIsLoading(false);
    }
  }, [globalSettingsData]);

  useEffect(() => {
    if (!globalSettingsData?.data) {
      setIsLoading(true);
    }
  }, [globalSettingsData]);

  const fetchDeviceHistoryRecords = useCallback(async () => {
    try {
      dispatch(getGlobalSettingsData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchDeviceHistoryRecords();
  }, []);

  useEffect(() => {
    setValue(mobileData);
  }, [mobileData]);

  const handleEnabled = (e: any) => {
    setValue({
      ...value,
      isIdNumberValidationEnabled: e,
    });
  };

  let mails: any[] = [];

  if (mobileData) {
    let settingKeys = Object.keys(mobileData);
    if (settingKeys.includes("deviceThresholdLimitMail")) {
      mails = value?.deviceThresholdLimitMail.split(",");
    }
  }

  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setDisabled(false);
    setButtonVisible(true);
  };

  const updatesRes = useSelector(
    (state: RootStateOrAny) =>
      state.globalSettingsReducer?.editGlobalSettingsResponse
  );

  useEffect(() => {
    if (updatesRes) {
      if (updatesRes?.data) {
        setIsLoading(false);
        setIsLoading(false);
        setApiMessage("GlobalSettings Updated Successfully");
        setButtonVisible(false);
        setDisabled(true);
        setCardStatus(true);
      } else if (updatesRes?.error) {
        setIsLoading(false);
        setFixError(updatesRes?.message);
      }
    }
  }, [updatesRes]);

  const postUpdatedGlobalSettings = useCallback(
    async (data: any) => {
      try {
        dispatch(editGlobalSettingsData(data));
      } catch (err) {}
    },
    [dispatch]
  );

  const submitHandler = () => {
    setIsLoading(true);
    var data = {
      id: mobileData?.id,
      isIdNumberValidationEnabled: value.isIdNumberValidationEnabled,
      idNumberValidationCount: Number(value.idNumberValidationCount),
      invalidOtpMaxCount: Number(value.invalidOtpMaxCount),
      deviceBindCount: Number(value.deviceBindCount),
      mobileNumberBindCount: Number(value.mobileNumberBindCount),
      forgetPassOtpAttempt: Number(mobileData?.forgetPassOtpAttempt),
      forgetPassDobAttempt: Number(mobileData?.forgetPassDobAttempt),
      staffInvalidPassMaxCount: Number(mobileData?.staffInvalidPassMaxCount),
      custInvPassMaxCount: Number(mobileData?.custInvPassMaxCount),
      deviceThresholdLimit: Number(value.deviceThresholdLimit),
      deviceThresholdLimitMail: value.deviceThresholdLimitMail,
    };
    postUpdatedGlobalSettings(data);
  };

  const onCancel = () => {
    setButtonVisible(false);
    setDisabled(true);
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);
  return (
    <div className="p-4">
      <div className="primary_heading">Global Settings</div>
      <CustomLoader isLoading={isLoading} size={50} />
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={cardStatus}
          closeMessage={() => closeMessage()}
          message={apiMessage}
          errorFix={fixError}
        />
      )}
      {isLoading ? null : (
        <div className="customerInfoWrapper">
          <div className="btnEdit">
            <Button className="btnPosition" onClick={handleEdit}>
              <FaRegEdit />
            </Button>
          </div>
          <div className="customerInfoForm">
            <div className="d-flex flex-column container ">
              <div>
                <h5 className="headerText">ID Number Validation</h5>
              </div>
              <div className="row p-2">
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      ID Number validation enable :
                    </Label>
                  </div>
                  <div className="col-4 p-2">
                    <Switch
                      checked={value?.isIdNumberValidationEnabled}
                      checkedChildren="Yes"
                      unCheckedChildren="NO"
                      onChange={(e) => handleEnabled(e)}
                      disabled={disabled}
                    />
                  </div>
                </div>
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      ID Number Max validation
                    </Label>
                  </div>
                  <div className="col-3 p-1 ">
                    <Input
                      className="border-0 global-setting-input formRadiusGlobal form-control"
                      type="text"
                      name="idNumberValidationCount"
                      readOnly={disabled}
                      value={value?.idNumberValidationCount}
                      onChange={handleChange}
                    ></Input>
                  </div>
                  <div className="col d-flex p-1"></div>
                </div>
              </div>
              <div>
                <h5 className="headerText">Limit Validation</h5>
              </div>
              <div className="row p-2">
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      Invalid OTP Max validation
                    </Label>
                  </div>
                  <div className="col-3 p-1">
                    <Input
                      className="border-0 global-setting-input formRadiusGlobal form-control"
                      type="text"
                      name="invalidOtpMaxCount"
                      value={value?.invalidOtpMaxCount}
                      readOnly={disabled}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col d-flex p-1"></div>
              </div>
              <div className="row p-2">
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      Device Bind Limit
                    </Label>
                  </div>
                  <div className="col-3 p-1">
                    <Input
                      className="border-0 global-setting-input formRadiusGlobal form-control"
                      type="text"
                      name="deviceBindCount"
                      value={value?.deviceBindCount}
                      readOnly={disabled}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col d-flex p-1"></div>
              </div>
              <div className="row p-2">
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      Mobile Number Bind Limit
                    </Label>
                  </div>
                  <div className="col-3 p-1">
                    <Input
                      className="border-0 global-setting-input formRadiusGlobal form-control"
                      type="text"
                      name="mobileNumberBindCount"
                      value={value?.mobileNumberBindCount}
                      readOnly={disabled}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col d-flex p-1"></div>
              </div>

              <div className="row p-2">
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      Threshold limit
                    </Label>
                  </div>
                  <div className="col-3 p-1">
                    <Input
                      className="border-0 global-setting-input formRadiusGlobal form-control"
                      type="text"
                      name="deviceThresholdLimit"
                      value={value?.deviceThresholdLimit}
                      readOnly={disabled}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col d-flex p-1"></div>
              </div>

              <div className="row p-2">
                <div className="col d-flex p-1">
                  <div className="col-7 p-1">
                    <Label className="global-setting-label">
                      Threshold email
                    </Label>
                  </div>
                  <div className="col-6 p-1">
                    {mails?.length > 0 &&
                      mails?.map((e: any, index: number) => {
                        return (
                          <Input
                            className="border-0  global-setting-mail form-control"
                            type="text"
                            name="deviceThresholdLimitMail"
                            value={e}
                            onChange={handleChange}
                            readOnly={disabled}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="col d-flex p-1"></div>
              </div>
            </div>
          </div>

          <div className="row p-2">
            <div className="col d-flex p-1">
              <div className="col-7 p-1"></div>
              <div className="col-7 ms-3 p-1">
                {buttonVisible && (
                  <div className="d-flex col-6 pt-4">
                    <SubmitCancelButton
                      button={"Save"}
                      secondButton={"Cancel"}
                      onSubmit={submitHandler}
                      onCancel={onCancel}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col d-flex p-1"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSettings;
