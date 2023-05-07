import { TiArrowBackOutline } from "react-icons/ti";
import { Col, Input, Label } from "reactstrap";
import CustomButton from "../UI/CustomButton";
import "../AddETerminal/AddETerminal.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  createTerminalDashboard,
  getDeviceList,
  resetCreateMessage,
  resetupdateTerminalDashboard,
  updateTerminalDashboard,
} from "../../redux/action/TerminalDashboardAction";
import { SelectOptionCategory } from "../../models/ReferenceDataModel";
import Select from "react-select";
import { getBranchDashboardRecords } from "../../redux/action/BranchDashboardAction";
import { clearFullNameInfoRight } from "../../redux/action/UserRightsAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";

import CustomLoader from "../Loader/CustomLoader";
import customSelectStyles from "../CustomSelectStyle/CustomSelectStyles";

const AddETerminal = (props: any) => {
  const dispatch = useDispatch();
  const [createTerminalData, setTerminalData] = useState({
    deviceId: "",
    deviceName: "",
    deviceModel: "",
    agentGroupCode: "",
    branchCode: "",
    emailAddress: "",
    tellerName: "",
    contactNumber: "",
    mid:""
  });
  const [branchDetails, setBranchDetails] = useState({
    mid: "",
    branchName: "",
    branchCode: "",
    agentName: "",
    longitude: "",
    latitude: "",
  });

  const [apiMessage, setApiMessage] = useState(false);
  const [userMessage, setUserMessage] = useState(false);
  const [userErrMessage, setUserErrMessage] = useState(false);

  const [deviceError, setDeviceError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [createErrMessage, setCreateErrMessage] = useState(false);
  const [tid, setTid] = useState("");
  const [updateErrMessage, setUpdateErrMessage] = useState(false);
  const [addError, setAddError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  let updateStatus = props.location?.title;
  const terminalDashboardData: any = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer.getAllDeviceResponse
  );

  const FullNameData = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer?.getUserRightsFullName
  );

  const branchDashboardRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.BranchDashboardReducer?.getBranchDashboardRegordsResponse
  );

  const createTerminalError = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer.getTerminalCreateError
  );
  const updatedTerminalError = useSelector(
    (state: RootStateOrAny) => state.TerminalDashboardReducer.getUpdatedTerminal
  );
  const fetchUpdatedTerminalDetails = useCallback(
    (body: any) => {
      try {
        dispatch(updateTerminalDashboard(body));
      } catch (err) {}
    },
    [dispatch]
  );
  const fetchResetUpdatedTerminalDetails = useCallback(() => {
    try {
      dispatch(resetupdateTerminalDashboard());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (updatedTerminalError?.data) {
      setIsLoading(false);
      props.history.push({
        pathname: "/dashboard/Branch-Management/Terminal-Dashboard",
        state: true,
        message: "Edited Successfully",
      });
      fetchResetUpdatedTerminalDetails();
    } else if (updatedTerminalError?.message) {
      setIsLoading(false);
      setUpdateErrMessage(true);
      setAddError(true);
      setApiStatus(false);
      setMessage(updatedTerminalError?.message);
    }
  }, [updatedTerminalError]);

  const fetchTerminalDevicedata = useCallback(() => {
    try {
      dispatch(getDeviceList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchTerminalDevicedata();
  }, [fetchTerminalDevicedata]);

  const fetchBranchDashboardRecords = useCallback(async () => {
    try {
      dispatch(getBranchDashboardRecords());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchBranchDashboardRecords();
  }, [fetchBranchDashboardRecords]);

  useEffect(() => {
    if (FullNameData) {
      if (FullNameData?.data) {
        if (FullNameData?.data?.userType == "BRANCH_USER") {
          setApiMessage(false);
          setUserMessage(true);
          setUserErrMessage(false);

          setTerminalData({
            ...createTerminalData,
            tellerName: FullNameData?.data?.userName,
            contactNumber: FullNameData?.data?.mobileNumber,
            emailAddress: FullNameData?.data?.emailId,
          });
          setTimeout(function () {
            setUserMessage(false);
            dispatch(clearFullNameInfoRight());
          }, 3500);
        } else {
          setApiMessage(false);
          setUserMessage(false);
          setUserErrMessage(true);

          setTerminalData({
            ...createTerminalData,
            tellerName: "",
            contactNumber: "",
            emailAddress: "",
          });
          setAddError(true);
          setTimeout(function () {
            setUserErrMessage(false);
            dispatch(clearFullNameInfoRight());
          }, 3500);
        }
      } else if (FullNameData.error) {
        setApiMessage(true);
        setUserMessage(false);
        setUserErrMessage(false);

        setTerminalData({
          ...createTerminalData,
          tellerName: "",
          contactNumber: "",
          emailAddress: "",
        });
        setAddError(true);
        setTimeout(function () {
          setApiMessage(false);
          dispatch(clearFullNameInfoRight());
        }, 3500);
      }
    }
  }, [FullNameData]);

  useEffect(() => {
    if (createTerminalError?.message) {
      setCreateErrMessage(true);
      setAddError(true);
      setTimeout(function () {
        setCreateErrMessage(false);
        dispatch(resetCreateMessage());
      }, 3500);
    }
  }, [createTerminalError]);

  useEffect(() => {
    if (props.location?.state?.tid) {
      setTid(props.location?.state?.tid);
      setTerminalData({
        ...createTerminalData,
        deviceId: props.location?.state?.deviceId,
        deviceModel: props.location?.state?.deviceModel,
        deviceName: props.location?.state?.deviceName,
        mid:props?.location?.state?.mid
      });
    }
  }, [props.location?.state?.tid]);

  useEffect(() => {
    if (!apiMessage) {
      setUpdateErrMessage(false);
    }
  }, []);

  const optionsDevice: any = terminalDashboardData?.data?.map((option: any) => {
    return {
      label: option.deviceId,
      value: option.deviceId,
      deviceName: option.deviceName,
      deviceModel: option.deviceModel,
    };
  });

  const optionsBranch: any = branchDashboardRecordsData?.data?.map(
    (option: any) => {
      return {
        label: `${option.branchName} - ${option.branchCode}`,
        value: option.branchCode,
      };
    }
  );

  const onChange_Devicehandler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setTerminalData({
      ...createTerminalData,
      deviceId: selectOptions.value,
      deviceModel: selectOptions.deviceModel,
      deviceName: selectOptions.deviceName,
    });
  };

  const onChange_Branchhandler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    branchDashboardRecordsData?.data?.filter((options: any) => {
      if (options.branchCode == selectOptions.value) {
        setTerminalData({
          ...createTerminalData,
          agentGroupCode: options?.agentGroupCode,
          branchCode: selectOptions.value,
        });
        setBranchDetails({
          mid: options?.mid,
          branchName: options?.branchName,
          branchCode: options?.branchCode,
          agentName: options?.agentGroupName,
          longitude: options?.longitude,
          latitude: options?.latitude,
        });
      }
    });
  };

  const validateSubmit = () => {
    if (
      !createTerminalData?.deviceId?.length &&
      !createTerminalData?.branchCode?.length
    ) {
      setDeviceError(true);
      setBranchError(true);
      return false;
    } else if (
      !createTerminalData?.deviceId?.length &&
      createTerminalData?.branchCode?.length
    ) {
      setDeviceError(true);
      setBranchError(false);
      return false;
    } else if (
      createTerminalData?.deviceId?.length &&
      !createTerminalData?.branchCode?.length
    ) {
      setDeviceError(false);
      setBranchError(true);
      return false;
    } else {
      setDeviceError(false);
      setBranchError(false);
      return true;
    }
  };

  const handle_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSubmit()) {
      if (props.location?.title !== "Edit Terminal") {
        let terminal = {
          deviceId: createTerminalData?.deviceId,
          agentGroupCode: createTerminalData?.agentGroupCode,
          branchCode: createTerminalData?.branchCode,
        };
        dispatch(createTerminalDashboard(terminal));
      } else if (props.location?.title === "Edit Terminal") {
        setIsLoading(true);
        var body = {
          terminalId: tid,
          branchCode: createTerminalData?.branchCode,
          agentGroupCode: createTerminalData?.agentGroupCode,
        };
        fetchUpdatedTerminalDetails(body);
      }
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeCreateErrMessage = () => {
    setCreateErrMessage(false);
  };
  const closeUserMessage = () => {
    setUserMessage(false);
  };
  const closeUserErrMessage = () => {
    setUserErrMessage(false);
  };
  const closeUpdateErrMessage = () => {
    setUpdateErrMessage(false);
  };

  const handleBack = () => {
    props.history.push({
      pathname: "/dashboard/Branch-Management/Terminal-Dashboard",
    });
    setUpdateErrMessage(false);
  };
  return (
    <div className="p-4">
      <div className="add-terminal-title pb-3"></div>
      <>
        <div className="edit"></div>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="d-flex col justify-content-between title">
            {props.location?.title ? "Edit Terminal" : "Add Terminal"}
          </div>
          <CustomButton onClick={handleBack} className="backBtnDevice">
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
        <CustomLoader isLoading={isLoading} size={50} />
        {apiMessage && (
          <div className="mb-2">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeMessage}
              message={FullNameData?.message}
            />
          </div>
        )}
        {createErrMessage && (
          <div className="mb-2">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeCreateErrMessage}
              message={createTerminalError?.message}
            />
          </div>
        )}
        {updateErrMessage && (
          <div className="mb-2">
            <CustomResponseMessage
              apiStatus={apiStatus}
              closeMessage={closeUpdateErrMessage}
              message={message}
              errorFix={addError}
            />
          </div>
        )}
        {userMessage && (
          <div className="mb-2">
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeUserMessage}
              message={"Successfully fetched user details."}
            />
          </div>
        )}
        {userErrMessage && (
          <div className="mb-2">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeUserErrMessage}
              message={"User is not a Branch User"}
            />
          </div>
        )}
        <form onSubmit={handle_onSubmit}>
          <div className="add-terminal-wrapper">
            <div className="add-terminal-maintenance-form">
              <div>
                <p className="mandatory-fields">
                  <span className="container-body-label-color">*</span>indicates
                  mandatory fields
                </p>
              </div>
              <div className="row mb-4">
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Device ID
                  <span className="container-body-label-color">*</span>
                </Label>

                {updateStatus ? (
                  <Col sm={4}>
                    <Input
                      style={{ height: "36px" }}
                      type="text"
                      name="deviceName"
                      disabled={updateStatus ? true : false}
                      value={createTerminalData?.deviceId}
                      className="no-border def_fontsize"
                    />
                  </Col>
                ) : (
                  <Col sm={4}>
                    <Select
                      options={optionsDevice}
                      className=""
                      styles={customSelectStyles}
                      isDisabled={updateStatus ? true : false}
                      onChange={(selectOptions: any) =>
                        onChange_Devicehandler(selectOptions)
                      }
                    />
                    {deviceError && (
                      <Label className="text-red">
                        please select Device Id.
                      </Label>
                    )}
                  </Col>
                )}

                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Device Name
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={4}>
                  <Input
                    style={{ height: "36px" }}
                    type="text"
                    name="deviceName"
                    disabled={updateStatus ? true : false}
                    value={createTerminalData?.deviceName}
                    className="no-border def_fontsize"
                  />
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Device Model{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={4}>
                  <Input
                    style={{ height: "36px" }}
                    type="text"
                    name="deviceModel"
                    disabled={updateStatus ? true : false}
                    value={createTerminalData?.deviceModel}
                    className="no-border def_fontsize"
                  />
                </Col>

                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Branch Name
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={4}>
                  <Select
                    options={optionsBranch}
                    className=""
                    styles={customSelectStyles}
                    onChange={(selectOptions: any) =>
                      onChange_Branchhandler(selectOptions)
                    }
                  />
                  {branchError && (
                    <Label className="text-red">
                      please select Branch Name.
                    </Label>
                  )}
                </Col>
              </div>

              <div className="row mb-4">
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Agent Group
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    value={branchDetails?.agentName}
                    className="no-border def_fontsize"
                    disabled={updateStatus ? true : false}
                    name="email"
                  />
                </Col>
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  MID
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    readOnly={true}
                    value={createTerminalData?.mid}
                    className="no-border def_fontsize referenceData-readOnly"
                    name="tellerName"
                  ></Input>
                </Col>
              </div>
              <div className="row mb-4">
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Latitude
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    value={branchDetails?.latitude}
                    className="no-border def_fontsize"
                    disabled={updateStatus ? true : false}
                    name="latitute"
                  ></Input>
                </Col>
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Longitude
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    value={branchDetails?.longitude}
                    className="no-border def_fontsize"
                    disabled={updateStatus ? true : false}
                    name="langitude"
                  ></Input>
                </Col>
              </div>
            </div>
            <div className="d-flex  align-items-center pb-5 Cnt-btn">
              <div className="col-sm-2 button-sub-can" />
                <button
                className="container-save border-0 text-white"
               
              >
                Submit
              </button>
              <button
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={() => {
                  handleBack();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};
export default AddETerminal;
