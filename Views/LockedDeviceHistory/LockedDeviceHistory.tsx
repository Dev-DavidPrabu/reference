/* eslint-disable react/jsx-no-undef */
import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./LockedDeviceHistory.scss";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import CustomCurrentPageUserManagement from "../../Components/CustomCurrentPageUserManagement/CustomCurrentPageUserManagement";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getDeviceHistoryRecords } from "../../redux/action/DeviceMobileHistoryAction";
import { DeviceMobileHistoryRecordsInfo } from "../../models/DeviceMobileHistoryModel";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { useLocation } from "react-router";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

const LockedDeviceHistory = (props: any) => {
  const [form] = Form.useForm();
  const location: any = useLocation();
  const componentRef = useRef<any>();
  const componentRefs = useRef<any>();
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [iconClosedNumber, setIconClosedNumber] = useState(true);
  const [iconClosedDate, setIconClosedDate] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phoneNUmber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [searchAreaNew, setSearchAreaNew] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [searchCategoryNew, setSearchCategoryNew] = useState("");
  const [searchUserDataNew, setsearchUserDataNew] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [columnsNew, setcolumnsNew] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [orginalColumnsNew, setorginalColumnsNew] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [deviceId, setDeviceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    deviceIdError: "",
  });

  const deviceHistoryRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.DeviceMobileHistoryReducer?.getDeviceHistoryRegordsResponse
  );
  const fetchDeviceHistoryRecords = useCallback(
    async (deviceId: any) => {
      try {
        dispatch(getDeviceHistoryRecords(deviceId));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (location?.state?.value?.deviceId?.length != 0) {
      fetchDeviceHistoryRecords(location?.state?.value?.deviceId);
    }
  }, [fetchDeviceHistoryRecords, location?.state?.value?.deviceId]);

  useEffect(() => {
    if (deviceHistoryRecordsData) {
      if (deviceHistoryRecordsData?.data) {
        setIsLoading(false);
      }
    }
  }, [deviceHistoryRecordsData]);

  const deviceHistoryRecordsHeader = [
    {
      title: "Date",
      dataIndex: "actionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.actionDate.localeCompare(b.actionDate),
      },
    },
    {
      title: "Time",
      dataIndex: "actionTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.actionTime.localeCompare(b.actionTime),
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
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "UNLOCKED" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },

    {
      title: "System/BO User",
      dataIndex: "actionBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.actionBy.localeCompare(b.actionBy),
      },
    },
    {
      title: "Reason/Remark",
      dataIndex: "reason",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.reason.localeCompare(b.reason),
      },
    },
  ];

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
    setIconClosedNumber(true);
    setDeviceId("");
  };

  const validate = () => {
    let checkDeviceIdError = customValidator("deviceId", "deviceId", deviceId);
    if (checkDeviceIdError !== "null") {
      setErrors({
        deviceIdError: checkDeviceIdError,
      });
      return false;
    }
    setErrors({
      deviceIdError: "",
    });
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      fetchDeviceHistoryRecords(deviceId).then(() => {
        setfilterOption(false);
        setFilteredArea(true);
        setIsLoading(true);
      });
    }
  };
  const handleReset = () => {
    setDeviceId("");
  };
  const handleChangeDeviceId = (event: any) => {
    setDeviceId(event.target.value);
  };
  const handleChangeDate = (event: any) => {
    setDate(event.target.value);
  };

  const closeSearch = () => {
    setSearchArea(false);
  };
  const closeSearchNew = () => {
    setSearchAreaNew(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setSearchAreaNew(false);
  };
  const toggleSearchNew = () => {
    setSearchAreaNew(!searchAreaNew);
    setfilterOption(false);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const Prints: any = useReactToPrint({
    content: () => componentRefs.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);

    const timer = setTimeout(() => {
      Print();
    }, 500);
  };

  const handleChangeForPagination = (value: number) => {
    setCurrentPage(value);
  };

  const handlePrints = (filteredItems: any, orginalList: any) => {
    setcolumnsNew(filteredItems);
    setorginalColumnsNew(orginalList);

    const timers = setTimeout(() => {
      Prints();
    }, 500);
  };

  let deviceHistoryData = deviceHistoryRecordsData?.data;

  if (searchUserDataNew && searchCategoryNew !== "Select Field") {
    if (searchCategoryNew === "any") {
      deviceHistoryData = deviceHistoryData.filter(
        (e: any | DeviceMobileHistoryRecordsInfo) => {
          return (
            e.actionDate
              .toUpperCase()
              .includes(searchUserDataNew.toUpperCase()) ||
            e.actionTime
              .toUpperCase()
              .includes(searchUserDataNew.toUpperCase()) ||
            e.deviceId
              .toUpperCase()
              .includes(searchUserDataNew.toUpperCase()) ||
            e.status.toUpperCase().includes(searchUserDataNew.toUpperCase()) ||
            e.actionBy
              .toUpperCase()
              .includes(searchUserDataNew.toUpperCase()) ||
            e.reason.toUpperCase().includes(searchUserDataNew.toUpperCase())
          );
        }
      );
    } else {
      deviceHistoryData = deviceHistoryData.filter(
        (e: any | DeviceMobileHistoryRecordsInfo) => {
          if (
            e[searchCategoryNew]
              ?.toUpperCase()
              .includes(searchUserDataNew.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const toggleRefreshNew = () => {
    setFilteredArea(false);
    setcolumnsNew([]);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const handleListNew = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumnsNew(filteredItems);
    setorginalColumnsNew(orginalList);
    setTableModal(!showTableModal);
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
    <div className="">
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

            <option value="actionDate" className="cursor">
              Date
            </option>
            <option value="actionTime" className="cursor">
              Time
            </option>
            <option value="mobileNumber" className="cursor">
              Mobile No
            </option>
            <option value="status" className="cursor">
              Status
            </option>
            <option value="actionBy" className="cursor">
              System/BO user
            </option>
            <option value="reason" className="cursor">
              Reason/Remark
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            placeholder="Type your search keyword"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button className="searchBtnAccount">Search</Button>
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

      <div className="">
        <CommonHeaderSummary
          RightContent={"Device History"}
          SummaryFileName={"Device History"}
          filterEnabled={filterOption}
          filterArea={toggleFilter}
          filter={true}
          FieldList={handleListNew}
          searchArea={toggleSearchNew}
          search={searchAreaNew}
          List={true}
          ListData={handleListNew}
          Refresh={true}
          refresh={toggleRefreshNew}
          SummaryColumn={
            orginalColumnsNew.length > 0
              ? orginalColumnsNew
              : deviceHistoryRecordsHeader
          }
          Print={handlePrints}
          TableData={
            deviceHistoryData === undefined
              ? []
              : Array.isArray(deviceHistoryData)
              ? deviceHistoryData
              : [deviceHistoryData]
          }
        />
      </div>
      {filterOption && (
        <div className="userLoginFilterSection titleFilterUser mt-3 p-3 filterbox">
          <p className="filter filteralign">Filter</p>
          {errors.deviceIdError && errors?.deviceIdError !== "null" && (
            <span className="colorRedUser mandatory">
              {" "}
              ** any one field value is mandatory
            </span>
          )}
          <div className="container-fluid filterContentUser">
            <div className="row">
              <div className="col">
                {" "}
                <FormGroup className="inputFieldUser formgroup">
                  <Label for="exampleValue" className="label">
                    Device ID
                  </Label>
                  <Input
                    type="text"
                    name="deviceId"
                    placeholder="Enter device Id"
                    className="formRadiusUser"
                    value={deviceId}
                    onChange={handleChangeDeviceId}
                  />
                </FormGroup>
              </div>
              <div className="col buttonUser d-flex justify-content-end">
                {/* <Button
                color="danger"
                  className="nextBtnUserLogin formgroup submitBtn btn--sizer"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                color="secondary"
                  className="backBtnUserLogin formgroup resetBtn btn--sizer"
                  onClick={handleReset}
                >
                  Reset
                </Button> */}
                
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

      {searchAreaNew && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop cursor"
            onChange={(e) => setSearchCategoryNew(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="actionDate" className="cursor">
              Date
            </option>
            <option value="actionTime" className="cursor">
              Time
            </option>
            <option value="deviceId" className="cursor">
              Device ID
            </option>
            <option value="status" className="cursor">
              Status
            </option>
            <option value="actionBy" className="cursor">
              System/BO user
            </option>
            <option value="reason" className="cursor">
              Reason/Remark
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserDataNew(ev.currentTarget.value)}
          />
          <div className="ms-1">
          <Button color="danger" className="btn--sizer">Search</Button>
          </div>
          <div>
            <Button
              className="text-white  border-0 ms-1"
              onClick={() => closeSearchNew()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      {filteredArea && (
        <div className="row filteredAreaUserLogin">
          <div className="col-sm-2">Filter Selected : </div>
          {iconClosedNumber && (
            <>
              <div className="container conColorUserLogin">
                <p className="paraTextUserLogin">Device ID: {deviceId}</p>
              </div>
            </>
          )}
        </div>
      )}
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRefs}>
          <Form form={form} component={false}>
            <CustomHeader
              TableData={
                columnsNew.length > 0 ? columnsNew : deviceHistoryRecordsHeader
              }
              CustomTableHeader={deviceHistoryData}
              DisableMange={true}
              toPrint={toPrint ? true : false}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default LockedDeviceHistory;
