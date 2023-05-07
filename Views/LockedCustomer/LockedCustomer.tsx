import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  MdMobileOff,
  MdOutlineDevicesOther,
  MdOutlineLockOpen,
} from "react-icons/md";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./LockedCustomer.scss";
import UnlockConfirmationPopUp from "../../Components/UnlockConfirmationPopUp/UnlockConfirmationPopUp";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { lockedCustomerInfo } from "../../models/LockedCustomerModel";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getLockedCustomerData,
  resetUnlockData,
  unlockedCustomerStatus,
  getLockedCustomerFilter,
} from "../../redux/action/LockedCustomerAction";
import { useReactToPrint } from "react-to-print";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomCurrentPageUserManagement from "../../Components/CustomCurrentPageUserManagement/CustomCurrentPageUserManagement";
import { useHistory } from "react-router";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHistory } from "react-icons/ai";

const LockedCustomer = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const componentRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNUmber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const dispatch = useDispatch();
  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState<any>();
  const [devices, setdevices] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [lockedStatus, setLockedStatus] = useState(false);
  const [error, setError] = useState("");

  const lockedCustomerData = useSelector(
    (state: RootStateOrAny) =>
      state.LockedCustomerReducer?.getLockedCustomerResponse
  );
  const updateLockedCustomerData = useSelector(
    (state: RootStateOrAny) =>
      state.LockedCustomerReducer?.unlockCustomerResponse
  );
  const [filterError, setFilterError] = useState("");

  const fetchLockedCustomer = useCallback(async () => {
    try {
      dispatch(getLockedCustomerData());
    } catch (err) {}
  }, [dispatch]);

  const fetchFilterLockedCustomer = useCallback(
    async (body: any) => {
      try {
        dispatch(getLockedCustomerFilter(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const updateUnlockedCustomer = useCallback(
    async (updatedStatus: any) => {
      try {
        dispatch(unlockedCustomerStatus(updatedStatus));
      } catch (err) {}
    },
    [dispatch]
  );
  const updateUnlockdata = useCallback(async () => {
    try {
      dispatch(resetUnlockData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchLockedCustomer();
  }, []);
  useEffect(() => {
    if (updateLockedCustomerData) {
      setApiMessage(true);
      if (updateLockedCustomerData?.data) {
        setLockedStatus(true);
        setError("Unlocked Successfully");
        updateUnlockdata();
        fetchLockedCustomer();
      } else if (updateLockedCustomerData?.error) {
        setLockedStatus(false);
        setError(updateLockedCustomerData.message);
      }
    }
  }, [updateLockedCustomerData]);

  useEffect(() => {
    if (lockedCustomerData) {
      if (lockedCustomerData?.data) {
        setIsLoading(false);
      } else if (lockedCustomerData?.error) {
        setIsLoading(false);
        setLockedStatus(false);
        setError(lockedCustomerData.message);
      }
    }
  }, [lockedCustomerData]);

  const lockedCustomerHeader = [
    {
      title: "Name",
      dataIndex: "userName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Device Locked Time",
      dataIndex: "deviceLockedTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.deviceLockedTime?.localeCompare(b.deviceLockedTime),
      },
      render: (time: any) => {
        return <>{time ? `${time}` : "-"}</>;
      },
    },
    {
      title: "Device Locked Date",
      dataIndex: "deviceLockedDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.deviceLockedDate?.localeCompare(b.deviceLockedDate),
      },
      render: (lockDate: any) => {
        return <>{lockDate ? `${lockDate}` : "-"}</>;
      },
    },
    {
      title: "Device Locked Reason",
      dataIndex: "lockedDeviceReason",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.lockedDeviceReason?.localeCompare(b.lockedDeviceReason),
      },
      render: (reason: any) => {
        return <>{reason ? `${reason}` : "-"}</>;
      },
    },
    {
      title: "Mobile locked Time",
      dataIndex: "mobileLockedTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileLockedTime - b.mobileLockedTime,
      },
    },
    {
      title: "Mobile locked Date",
      dataIndex: "mobileLockedDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileLockedDate - b.mobileLockedDate,
      },
    },
    {
      title: "Mobile Locked Reason",
      dataIndex: "lockedMobileReason",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.lockedMobileReason - b.lockedMobileReason,
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
      title: "Device Model",
      dataIndex: "deviceModel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.deviceModel?.localeCompare(b?.deviceModel),
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
    {
      title: "Manage",
      align: "center",
      dataIndex: "Manage",
      checked: true,
      render: (_: any, record: any) => {
        return (
          <>
            {record && (
              <div className="d-flex justify-content-center">
                <div
                  className={`ms-1 manageButton cursor`}
                  onClick={() => searchCustomerDetail(record)}
                >
                  <div
                    id="search"
                    className="d-flex justify-content-center mt-1"
                  >
                    <FiSearch />
                  </div>
                  <CustomTooltip target="search">
                    Customer Login record
                  </CustomTooltip>
                </div>
                <div
                  className={`ms-1 ${
                    record.mobileLocked
                      ? "manageButton"
                      : "manageButton-disabled"
                  } cursor`}
                  onClick={() => submitUnlockConfirmation(record, "Account")}
                >
                  <div
                    id="Account"
                    className="d-flex justify-content-center mt-1"
                  >
                    <MdOutlineLockOpen />
                  </div>
                  <CustomTooltip target="Account">Unlock account</CustomTooltip>
                </div>

                <div
                  className={`ms-2 cursor  ${
                    record.deviceLocked
                      ? "manageButton"
                      : "manageButton-disabled"
                  }`}
                  id="device"
                  onClick={() => submitUnlockConfirmation(record, "Device")}
                >
                  <div className="d-flex justify-content-center mt-1">
                    <MdMobileOff />
                  </div>
                  <CustomTooltip target="device">Unlock device</CustomTooltip>
                </div>

                <div
                  className={`ms-2 cursor  ${
                    record.mobileLocked && record.deviceLocked
                      ? "manageButton"
                      : "manageButton-disabled"
                  }`}
                  id="both"
                  onClick={() =>
                    submitUnlockConfirmation(record, "Account/Device")
                  }
                >
                  <div className="d-flex justify-content-center mt-1">
                    <MdOutlineDevicesOther />
                  </div>
                  <CustomTooltip target="both">
                    Unlock Account/Device
                  </CustomTooltip>
                </div>
                <div
                  className={`ms-1 manageButton cursor`}
                  onClick={() => AaccountDeviceHistory(record)}
                >
                  <div
                    id="history"
                    className="d-flex justify-content-center mt-1"
                  >
                    <AiOutlineHistory />
                  </div>
                  <CustomTooltip target="history">
                    Account/Device History
                  </CustomTooltip>
                </div>
              </div>
            )}
          </>
        );
      },
    },
  ];
  const closeUnlockConfimation = () => {
    setShowModal(!showModal);
  };
  const unlockConfirmation = (remark: any) => {
    let updateBody = {};
    if (selectedCustomerInfo?.deviceId && selectedCustomerInfo?.mobileNumber) {
      updateBody = {
        mobileNumber: selectedCustomerInfo?.mobileNumber,
        accountLockedReason: selectedCustomerInfo?.accountLockedReason,
        accountUnlockReason: remark,
        deviceId: selectedCustomerInfo?.deviceId,
        deviceLockedReason: selectedCustomerInfo?.deviceLockedReason,
        deviceUnlockReason: remark,
      };
    } else if (selectedCustomerInfo?.mobileNumber) {
      updateBody = {
        mobileNumber: selectedCustomerInfo?.mobileNumber,
        accountLockedReason: selectedCustomerInfo?.accountLockedReason,
        accountUnlockReason: remark,
      };
    } else {
      updateBody = {
        deviceId: selectedCustomerInfo?.deviceId,
        deviceLockedReason: selectedCustomerInfo?.deviceLockedReason,
        deviceUnlockReason: remark,
      };
    }
    updateUnlockedCustomer(updateBody).then(() => {
      setShowModal(false);
      fetchLockedCustomer();
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const submitUnlockConfirmation = (selectedUserInfo: any, type: string) => {
    setApiMessage(false);
    setShowModal(!showModal);
    setdevices(type);
    switch (type) {
      case "Account":
        setSelectedCustomerInfo({
          mobileNumber: selectedUserInfo.mobileNumber,
          accountLockedReason: selectedUserInfo.lockedMobileReason,
        });
        break;
      case "Device":
        setSelectedCustomerInfo({
          deviceId: selectedUserInfo.deviceId,
          deviceLockedReason: selectedUserInfo.lockedDeviceReason,
        });
        break;
      case "Account/Device":
        setSelectedCustomerInfo({
          deviceId: selectedUserInfo.deviceId,
          mobileNumber: selectedUserInfo.mobileNumber,
          deviceLockedReason: selectedUserInfo.lockedDeviceReason,
          accountLockedReason: selectedUserInfo.lockedMobileReason,
        });
        break;
      default:
        break;
    }
  };

  const searchCustomerDetail = (record: any) => {
    history.push({
      pathname: "/dashboard/User-Account-Unlock/Customer-Login-Records",
      state: {
        value: record,
      },
    });
  };

  const AaccountDeviceHistory = (record: any) => {
    history.push({
      pathname: "/dashboard/User-Account-Unlock/Locked-Account-History",
      state: {
        value: record,
      },
    });
  };
  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    resetFilter();
    fetchLockedCustomer();
    setSearchArea(false);
  };

  const applyFilter = () => {
    setIsLoading(true);
    let body = { name: fullName, number: phoneNUmber, code: countryCode };
    fetchFilterLockedCustomer(body);
    setfilterOption(false);
    setFilteredArea(true);
    setFilterError("");
  };

  const handleSubmit = () => {
    if (fullName) {
      applyFilter();
    } else if (phoneNUmber) {
      if (countryCode) {
        applyFilter();
      } else {
        setFilterError("Select country code");
      }
    } else {
      setFilterError("** any one field value is mandatory");
    }
  };
  const resetFilter = () => {
    setDate("");
    setFullName("");
    setPhoneNumber("");
    setCountryCode("");
  };
  const handleChangeFullName = (event: any) => {
    setFullName(event.target.value);
  };
  const handleChangePhnNumber = (event: any) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangecode = (event: any) => {
    setCountryCode(event.target.value);
  };
  const handleChangeDate = (event: any) => {
    setDate(event.target.value);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  let lockedData = lockedCustomerData?.data;
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      lockedData = lockedData.filter((e: any | lockedCustomerInfo) => {
        return (
          e.userName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.mobileNumber.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.lockedDate.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.lockedTime.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceId.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.reason.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      lockedData = lockedData.filter((e: any | lockedCustomerInfo) => {
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
  const handleList = (filteredItems: any, orginalList: any) => {
    let manage = {
      title: "Manage",
      align: "center",
      dataIndex: "Manage",
      checked: true,
      render: (_: any, record: any) => {
        return (
          <>
            {record && (
              <div className="d-flex justify-content-center">
                <div
                  className={`ms-1 manageButton cursor`}
                  onClick={() => searchCustomerDetail(record)}
                >
                  <div
                    id="search"
                    className="d-flex justify-content-center mt-1"
                  >
                    <FiSearch />
                  </div>
                  <CustomTooltip target="search">
                    Customer Login record
                  </CustomTooltip>
                </div>
                <div
                  className={`ms-1 ${
                    record.mobileLocked
                      ? "manageButton"
                      : "manageButton-disabled"
                  } cursor`}
                  onClick={() => submitUnlockConfirmation(record, "Account")}
                >
                  <div
                    id="Account"
                    className="d-flex justify-content-center mt-1"
                  >
                    <MdOutlineLockOpen />
                  </div>
                  <CustomTooltip target="Account">Unlock account</CustomTooltip>
                </div>

                <div
                  className={`ms-2 cursor  ${
                    record.deviceLocked
                      ? "manageButton"
                      : "manageButton-disabled"
                  }`}
                  id="device"
                  onClick={() => submitUnlockConfirmation(record, "Device")}
                >
                  <div className="d-flex justify-content-center mt-1">
                    <MdMobileOff />
                  </div>
                  <CustomTooltip target="device">Unlock device</CustomTooltip>
                </div>

                <div
                  className={`ms-2 cursor  ${
                    record.mobileLocked && record.deviceLocked
                      ? "manageButton"
                      : "manageButton-disabled"
                  }`}
                  id="both"
                  onClick={() =>
                    submitUnlockConfirmation(record, "Account/Device")
                  }
                >
                  <div className="d-flex justify-content-center mt-1">
                    <MdOutlineDevicesOther />
                  </div>
                  <CustomTooltip target="both">
                    Unlock Account/Device
                  </CustomTooltip>
                </div>
                <div
                  className={`ms-1 manageButton cursor`}
                  onClick={() => AaccountDeviceHistory(record)}
                >
                  <div
                    id="history"
                    className="d-flex justify-content-center mt-1"
                  >
                    <AiOutlineHistory />
                  </div>
                  <CustomTooltip target="history">
                    Account/Device History
                  </CustomTooltip>
                </div>
              </div>
            )}
          </>
        );
      },
    };

    filteredItems.push(manage);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setorginalColumns([]);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const changeToUser = (e: any) => {
    if (e === "lock") {
      props.history.push({
        pathname: "/dashboard/User-Account-Unlock/Locked-Account-History",
      });
    } else if (e === "customer") {
      props.history.push({
        pathname: "/dashboard/User-Account-Unlock/Customer-Login-Records",
      });
    } else if (e === "locked") {
      props.history.push({
        pathname: "/dashboard/User-Account-Unlock/Locked-Device-History",
      });
    } else if (e === "customer-mobile-device") {
      props.history.push({
        pathname: "/dashboard/User-Account-Unlock/unlock",
      });
    }
  };

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Unlock Customer Mobile or Device"}
        SummaryFileName={"Unlock Customer Mobile or Device"}
        List={true}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : lockedCustomerHeader
        }
        filterArea={toggleFiler}
        filter={true}
        filterEnabled={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        Refresh={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        TableData={Array.isArray(lockedData) ? lockedData : [lockedData]}
      />

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={apiMessage}
          message={error}
          closeMessage={closeMessage}
        />
      )}
      <div className="mt-3">
        {toPrint && (
          <span
            className="span-col1"
            style={{
              textAlign: "center",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Preview content. Please click{" "}
            <a
              onClick={Print}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </a>{" "}
            to confirm and Print !. Or{" "}
            <a
              onClick={cancelPrint}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Cancel
            </a>
          </span>
        )}
      </div>
      {filterOption && (
        <div className="lockFilterSection titleFilter mt-3 p-3">
          <p className="branchSetupTitleLocked">Filter</p>
          <span className={`colorRedLock`}>{filterError}</span>
          <div className="container-fluid filterContent">
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleSelect">Full Name</Label>
                  <Input
                    name="fullName"
                    type="text"
                    className="formRadiusLock form-input"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={handleChangeFullName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                {" "}
                <FormGroup className="inputFieldLock">
                  <Label for="exampleValue">Country Code</Label>
                  <Input
                    type="select"
                    name="code"
                    className="formRadiusLock form-select btn--sizer"
                    value={countryCode}
                    onChange={handleChangecode}
                  >
                    <option value="" disabled hidden>
                      Select Country Code
                    </option>
                    <option>+91</option>
                    <option>+60</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="col">
                {" "}
                <FormGroup className="inputFieldLock">
                  <Label for="exampleValue">Phone Number</Label>
                  <Input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    className="formRadiusLock"
                    value={phoneNUmber}
                    onChange={handleChangePhnNumber}
                  />
                </FormGroup>
              </div>
              <div className="col align-items-end d-flex ms-1">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Reset"}
                  onSubmit={handleSubmit}
                  onCancel={resetFilter}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {searchArea && (
        <div className="d-flex user-search mt-3 cursor">
          <select
            className=" form-select Functionuser-search-drop widthfield cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="userName" className="cursor">
              Name
            </option>
            <option value="mobileNumber" className="cursor">
              Mobile Number
            </option>
            <option value="lockedDate" className="cursor">
              Date
            </option>
            <option value="lockedTime" className="cursor">
              Time
            </option>
            <option value="deviceId" className="cursor">
              Device ID
            </option>

            <option value="reason" className="cursor">
              Reason
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input widthfield"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
            placeholder="Type your search keyword"
          />
          <div className="ms-1">
            {/* <Button className="btn btn-danger btn--sizer">Search</Button> */}
            <Button color="danger" className="btn--sizer">Search</Button>
            </div>
            <div className="ms-1">
                <Button
                  className="text-white  border-0 ms-1"
                  onClick={() => closeSearch()}
                >
                  <FaReply />
                </Button>
              </div>
        </div>
      )}
      {filteredArea && (
        <div className="row filteredAreaLock">
          <div className="col-sm-2">Filter Selected : </div>
          {fullName && (
            <>
              <div className="container conColorLock">
                <p className="paraTextLock">Full Name: {fullName}</p>
              </div>
            </>
          )}
          {countryCode && (
            <>
              <div className="container conColorLock">
                <p className="paraTextLock">Country Code: {countryCode}</p>
              </div>
            </>
          )}
          {phoneNUmber && (
            <>
              <div className="container conColorLock">
                <p className="paraTextLock">Phone Number: {phoneNUmber}</p>
              </div>
            </>
          )}
        </div>
      )}
      <CustomCurrentPageUserManagement
        page={"customer-mobile-device"}
        onClick={changeToUser}
      />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            <CustomHeader
              TableData={columns.length > 0 ? columns : lockedCustomerHeader}
              CustomTableHeader={lockedData}
              DefaultColumn={true}
              DisableMange={true}
              toPrint={toPrint ? true : false}
            />
          </Form>
        </div>
      )}
      <UnlockConfirmationPopUp
        showModal={showModal}
        device={devices}
        closeDeleteConfirmation={closeUnlockConfimation}
        yesConfirmation={unlockConfirmation}
        unlock={true}
        selecetedCustomerData={selectedCustomerInfo}
      ></UnlockConfirmationPopUp>
    </div>
  );
};

export default LockedCustomer;
