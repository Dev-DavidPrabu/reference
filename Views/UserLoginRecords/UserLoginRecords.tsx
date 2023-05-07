import { Form } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./UserLoginRecords.scss";
import UnlockConfirmationPopUp from "../../Components/UnlockConfirmationPopUp/UnlockConfirmationPopUp";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { UserLoginRecordsInfo } from "../../models/UserLoginRecordsModel";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getLoginRecords,
  resetLoginRecords,
} from "../../redux/action/UserLoginRecordsAction";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { useHistory, useLocation } from "react-router";
import CustomCurrentPageUserManagement from "../../Components/CustomCurrentPageUserManagement/CustomCurrentPageUserManagement";

import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

const UserLoginRecords = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location: any = useLocation();
  const componentRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [iconClosedNumber, setIconClosedNumber] = useState(true);
  const [iconClosedStartDate, setIconClosedStartDate] = useState(true);
  const [iconClosedEndDate, setIconClosedEndDate] = useState(true);
  const [tableShow, setTableShow] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mobileNum, setMobileNum] = useState(
    location?.state?.value?.mobileNumber?.substring(3) || ""
  );
  const [countryCode, setCountryCode] = useState(
    location?.state?.value?.mobileNumber?.substring(0, 3) || "+60"
  );
  const [startDate, setStartDate] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [error, setError] = useState("");
  const [maximamDate, setMaximamDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    mobileNumError: "",
    deviceIdError: "",
    startDateError: "",
    endDateError: "",
  });
  const [filterDetail, setFilterDetail] = useState({
    mobileNum: "",
    deviceId: "",
    startDate: "",
    endDate: "",
  });

  const loginRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.UserLoginRecordsReducer?.getLoginRegordsResponse
  );
  const fetchLoginRecords = useCallback(
    async (mobileNo: any, deviceId: any, startDate: any, endDate: any) => {
      try {
        dispatch(getLoginRecords(mobileNo, deviceId, startDate, endDate));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (loginRecordsData) {
      if (loginRecordsData.data) {
        setApiMessage(false);
      } else if (loginRecordsData.error) {
        setError(loginRecordsData != undefined && loginRecordsData?.message);
        setApiMessage(true);
      }
    }
  }, [loginRecordsData]);

  useEffect(() => {
    if (loginRecordsData) {
      if (loginRecordsData?.data) {
        setIsLoading(false);
      }
    }
  }, [loginRecordsData]);
  useEffect(() => {
    if (loginRecordsData) {
      if (loginRecordsData?.message) {
        setIsLoading(false);
      }
    }
  }, [loginRecordsData]);

  const resetLoginRecordsData = useCallback(async () => {
    try {
      dispatch(resetLoginRecords());
    } catch (err) {}
  }, [dispatch]);

  const userLoginRecordsHeader = [
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Name",
      dataIndex: "userName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Login Date",
      dataIndex: "loginDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.loginDate.localeCompare(b.loginDate),
      },
    },
    {
      title: "Login Time",
      dataIndex: "loginTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.loginTime.localeCompare(b.loginTime),
      },
    },
    {
      title: "Device ID",
      dataIndex: "deviceId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceId.localeCompare(b.deviceId),
      },
    },
    {
      title: "Device Name",
      dataIndex: "deviceName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceName.localeCompare(b.deviceName),
      },
    },
    {
      title: "Device OS",
      dataIndex: "deviceOs",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceOs.localeCompare(b.deviceOs),
      },
    },
    {
      title: "Device Model",
      dataIndex: "deviceModel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceModel.localeCompare(b.deviceModel),
      },
    },
    {
      title: "Login Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      render: (status: any) => {
        let value = status.toString().toUpperCase();
        return (
          <label
            className={` ${
              value === "SUCCESS" ? "text-success" : "text-danger"
            }`}
          >
            {value}
          </label>
        );
      },
    },
    {
      title: "App Version",
      dataIndex: "appVersion",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.appVersion - b.appVersion,
      },
    },
    {
      title: "IP",
      dataIndex: "ipAddress",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.ipAddress.localeCompare(b.ipAddress),
      },
    },
    {
      title: "Geo Location",
      dataIndex: "geoLocation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.geoLocation.localeCompare(b.geoLocation),
      },
    },
  ];

  const validate = () => {
    let checkMobileNoError = customValidator(
      "mobileNum",
      "Mobile No",
      mobileNum
    );
    let checkDeviceIdError = customValidator("deviceId", "Device ID", deviceId);
    let checkStartDateError = customValidator(
      "startDate",
      "Start Date",
      startDate
    );
    let checkEndDateError = customValidator("endDate", "End date", endDate);

    if (!(checkStartDateError === "null" && checkEndDateError === "null")) {
      setErrors({
        mobileNumError: checkMobileNoError,
        deviceIdError: checkDeviceIdError,
        startDateError: checkStartDateError,
        endDateError: checkEndDateError,
      });

      return false;
    }
    setErrors({
      mobileNumError: "",
      deviceIdError: "",
      startDateError: "",
      endDateError: "",
    });

    return true;
  };

  const closeUnlockConfimation = () => {
    setShowModal(!showModal);
  };
  const triggerUnlockConfirmation = () => {
    setShowModal(!showModal);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
    setTableShow(false);
    setApiMessage(false);
    setDeviceId("");
    setMobileNum("");
    setEndDate("");
    setStartDate("");
    setIconClosed(true);
    setIconClosedNumber(true);
    setIconClosedStartDate(true);
    setIconClosedEndDate(true);
  };

  const handleSubmit = () => {
    if (validate()) {
      if (mobileNum || deviceId) {
        setErrors({ ...errors, mobileNumError: "", deviceIdError: "" });
        fetchLoginRecords(mobileNo, deviceId, startDate, endDate).then(() => {
          setTableShow(false);
          setfilterOption(false);
          setFilteredArea(true);
          setApiMessage(false);
          setIsLoading(true);
        });
      } else {
        setErrors({
          mobileNumError: "empty",
          deviceIdError: "empty",
          startDateError: "",
          endDateError: "",
        });
      }
    }
  };

  const handleReset = () => {
    setDeviceId("");
    setMobileNum("");
    setEndDate("");
    setStartDate("");
  };
  const handleChangeMobileNo = (event: any) => {
    setMobileNum(event.target.value);
    setFilterDetail({
      ...filterDetail,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeCountryCode = (event: any) => {
    setCountryCode(event.target.value);
    setFilterDetail({
      ...filterDetail,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangePhnNumber = (event: any) => {
    setDeviceId(event.target.value);
    setFilterDetail({
      ...filterDetail,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeStartDate = (event: any) => {
    setStartDate(event.target.value);
  };
  const handleChangeEndDate = (event: any) => {
    setEndDate(event.target.value);
    setFilterDetail({
      ...filterDetail,
      [event.target.name]: event.target.value,
    });
  };

  const closeSearch = () => {
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setTableShow(true);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };
  let UserLoginData = loginRecordsData?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      UserLoginData = UserLoginData?.filter((e: any | UserLoginRecordsInfo) => {
        return (
          e.mobileNumber
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.userName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.loginDate?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.loginTime?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceOs?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.appVersion?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      UserLoginData = UserLoginData?.filter((e: any | UserLoginRecordsInfo) => {
        if (
          e[searchCategory]
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  let mobileNo = "%2B" + countryCode.slice(1) + mobileNum;

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const handle_Back = () => {
    resetLoginRecordsData().then(() => {
      history.goBack();
    });
  };

  const unLockConfirmed = () => {};

  const startDates = (e: any) => {
    setStartDate(e.target.value);
    setFilterDetail({
      ...filterDetail,
      [e.target.name]: e.target.value,
    });
    var date = new Date(e.target.value);
    date.setDate(date.getDate() + 30);
    setMaximamDate(formatDate(date));
  };
  const formatDate = (date: any) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const changeToLock = (e: any) => {
    resetLoginRecordsData().then(() => {
      if (e === "locked") {
        props.history.push({
          pathname: "/dashboard/User-Account-Unlock/Locked-Device-History",
        });
      } else if (e === "customer") {
        props.history.push({
          pathname: "/dashboard/User-Account-Unlock/Customer-Login-Records",
        });
      } else if (e === "lock") {
        props.history.push({
          pathname: "/dashboard/User-Account-Unlock/Locked-Account-History",
        });
      } else if (e === "customer-mobile-device") {
        props.history.push({
          pathname: "/dashboard/User-Account-Unlock/unlock",
        });
      }
    });
  };

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Customer Login Records"}
        SummaryFileName={"Customer Login Records"}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        filterRemit={true}
        searchArea={toggleSearch}
        search={searchArea}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        Back={false}
        BackAction={handle_Back}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : userLoginRecordsHeader
        }
        Print={handlePrint}
        TableData={UserLoginData}
      />
      {filterOption && (
        <div className="userLoginFilterSection titleFilterUser mt-3 p-3">
          <p className="userLoginFilterSection-title">Filter</p>
          {(errors.mobileNumError || errors.deviceIdError) &&
            (errors?.mobileNumError !== "null" ||
              errors.deviceIdError !== "null") && (
              <span className="colorRedUser mandatory">
                {" "}
                *Mobile Number or Device ID is mandatory
              </span>
            )}
          <div className="container-fluid filterContentUser">
            <div className="d-flex row ">
              <div className="col-3 ps-4">
                <label className="labelUser label-align">Mobile No</label>
                <span className="container-body-label-color">*</span>
                <div className="col-8 row">
                  <Input
                    name="countryCode"
                    type="select"
                    className="border-1 formRadiusCode form-select "
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option></option>
                    <option>+91</option>
                    <option>+60</option>
                  </Input>
                  <Input
                    name="mobileNo"
                    type="text"
                    className="formRadiusUser form-input"
                    value={mobileNum}
                    onChange={handleChangeMobileNo}
                  />
                </div>
              </div>
              <div className="col-3">
                {" "}
                <FormGroup className="">
                  <Label for="exampleValue" className="labelUser">
                    Device ID
                  </Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="text"
                    name="deviceId"
                    value={deviceId}
                    className="formRadiusUser"
                    onChange={handleChangePhnNumber}
                  />
                </FormGroup>
              </div>
              <div className="col-3">
                <FormGroup className="">
                  <Label for="exampleEmail" className="labelUser">
                    Start Date
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Input
                    type="date"
                    name="startDate"
                    className="formRadiusDate hoverpointer"
                    value={startDate}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => startDates(e)}
                  ></Input>
                  {errors.startDateError &&
                    errors?.startDateError !== "null" && (
                      <Label className="text-red">
                        {errors.startDateError}
                      </Label>
                    )}
                </FormGroup>
              </div>
              <div className="col-3">
                <FormGroup className="">
                  <Label for="exampleEmail" className="labelUser">
                    End Date
                    <span className="container-body-label-color">*</span>
                  </Label>

                  <Input
                    type="date"
                    name="endDate"
                    className="formRadiusDate hoverpointer"
                    onChange={handleChangeEndDate}
                    max={new Date().toISOString().slice(0, 10)}
                    value={endDate}
                  ></Input>
                  {errors.endDateError && errors?.endDateError !== "null" && (
                    <Label className="text-red">{errors.endDateError}</Label>
                  )}
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col- buttonUser d-flex justify-content-end">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Reset"}
                  onSubmit={handleSubmit}
                  onCancel={handleReset}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredArea && <FiltersSelected value={filterDetail} />}

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={false}
          message={error}
          closeMessage={closeMessage}
        />
      )}
      {searchArea && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="mobileNumber" className="cursor">
              Mobile No
            </option>
            <option value="userName" className="cursor">
              Name
            </option>
            <option value="loginDate" className="cursor">
              Login Date
            </option>
            <option value="loginTime" className="cursor">
              Login Time
            </option>
            <option value="deviceId" className="cursor">
              Device ID
            </option>
            <option value="deviceName" className="cursor">
              Device Name
            </option>
            <option value="deviceOs" className="cursor">
              Device OS
            </option>
            <option value="appVersion" className="cursor">
              App Version
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
            placeholder="Type your search keyword"
          />
          <div className="ms-1">
            <Button color="danger" className="btn--sizer">Search</Button>
          </div>
          <div>
            <Button
              className="text-white  border-0 ms-1"
              onClick={() => closeSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      <CustomCurrentPageUserManagement
        page={"customer"}
        onClick={changeToLock}
      />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            {UserLoginData?.length > 0 && (
              <CustomHeader
                TableData={
                  columns.length > 0 ? columns : userLoginRecordsHeader
                }
                CustomTableHeader={
                  Array.isArray(UserLoginData) ? UserLoginData : [UserLoginData]
                }
                unLockConfirm={triggerUnlockConfirmation}
                toPrint={columns.length > 0 ? true : false}
                DisableMange={true}
              />
            )}
          </Form>
        </div>
      )}
      <UnlockConfirmationPopUp
        showModal={showModal}
        yesConfirmation={unLockConfirmed}
        closeDeleteConfirmation={closeUnlockConfimation}
      ></UnlockConfirmationPopUp>
    </div>
  );
};

export default UserLoginRecords;
