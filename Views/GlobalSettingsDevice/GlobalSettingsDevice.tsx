import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Input, Switch } from "antd";
import { Label } from "reactstrap";
import CustomCurrentPageManagement from "../../Components/CustomCurrentPageUserManagement/CustomCurrentPageManagement";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getGlobalSettingsData } from "../../redux/action/GlobalSettingsAction";

const GlobalSettingsDevice = (props: any) => {
  const [channelValue, setChannelValue] = useState({
    id: "",
    channelCode: "",
    enabled: true,
    content: "",
  });
  const componentRef = useRef<any>();
  const [columns, setcolumns] = useState([]);
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const globalSettingsData = useSelector(
    (state: RootStateOrAny) =>
      state.globalSettingsReducer?.globalSettingsResponse
  );
  let mobileData = globalSettingsData?.data;
  const fetchDeviceHistoryRecords = useCallback(async () => {
    try {
      dispatch(getGlobalSettingsData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchDeviceHistoryRecords();
  }, []);

  const handleEnabled = (e: any) => {
    setChannelValue({
      ...channelValue,
      ["enabled"]: e,
    });
  };

  const iconClosePopup = () => {
    setShowModal(!showModal);
  };
  const closeAddWhiteList = () => {
    setShowModal(!showModal);
  };

  const triggerToAdd = () => {
    setShowModal(!showModal);
  };

  const changeToUser = () => {
    props.history.push({
      pathname: "/dashboard/User-Account-Unlock/Global-Settings-Mobile",
    });
  };
  return (
    <div className="p-4">
      <h1 className="fw-bold titleGlobal-headerGlobal">
        Global Settings Device
      </h1>

      <CustomCurrentPageManagement page={"device"} onClick={changeToUser} />

      <div className="customerInfoWrapper">
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
                    checked={mobileData?.isIdNumberValidationEnabled}
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    onChange={(e) => handleEnabled(e)}
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
                    className="border-0 global-setting-input formRadiusGlobal"
                    type="text"
                    name=""
                    value={mobileData?.idNumberValidationCount}
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
                    className="border-0 global-setting-input formRadiusGlobal"
                    type="text"
                    name=""
                    value={mobileData?.invalidOtpMaxCount}
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
                    className="border-0 global-setting-input formRadiusGlobal"
                    type="text"
                    name=""
                    value={mobileData?.deviceBindCount}
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
                    className="border-0 global-setting-input formRadiusGlobal"
                    type="text"
                    name=""
                    value={mobileData?.mobileNumberBindCount}
                  />
                </div>
              </div>
              <div className="col d-flex p-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettingsDevice;
