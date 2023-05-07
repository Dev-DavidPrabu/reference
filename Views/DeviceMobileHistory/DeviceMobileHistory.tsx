import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./DeviceMobileHistory.scss";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import CustomCurrentPageUserManagement from "../../Components/CustomCurrentPageUserManagement/CustomCurrentPageUserManagement";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getMobileHistoryRecords } from "../../redux/action/DeviceMobileHistoryAction";
import { DeviceMobileHistoryRecordsInfo } from "../../models/DeviceMobileHistoryModel";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import LockedDeviceHistory from "../LockedDeviceHistory/LockedDeviceHistory";
import { useHistory, useLocation } from "react-router";
import { TiArrowBack, TiArrowBackOutline } from "react-icons/ti";
import CustomButton from "../../Components/UI/CustomButton";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

const DeviceMobileHistory = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const componentRef = useRef<any>();
  const location: any = useLocation();
  const componentRefs = useRef<any>();
  const [showModalList, setShowModalList] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [searchAreaNew, setSearchAreaNew] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [searchCategoryNew, setSearchCategoryNew] = useState("");
  const [searchUserDataNew, setsearchUserDataNew] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const dispatch = useDispatch();
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    mobileNumberError: "",
  });

  const mobileHistoryRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.DeviceMobileHistoryReducer?.getMobileHistoryRegordsResponse
  );
  const fetchMobileHistoryRecords = useCallback(
    async (mobileNumber: any) => {
      try {
        dispatch(getMobileHistoryRecords(mobileNumber));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    const tempMobileNo = "%2B" + location?.state?.value?.mobileNumber?.slice(1);
    fetchMobileHistoryRecords(tempMobileNo);
  }, [fetchMobileHistoryRecords]);

  let mobileNumber = "%2B" + countryCode.slice(1) + mobileNum;

  useEffect(() => {
    if (mobileHistoryRecordsData) {
      if (mobileHistoryRecordsData?.data) {
        setIsLoading(false);
      }
    }
  }, [mobileHistoryRecordsData]);

  const mobileHistoryRecordsHeader = [
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
      title: "Mobile No",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
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

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
    setIconClosed(true);
    setMobileNum("");
  };

  const validate = () => {
    let checkMobileNoError = customValidator(
      "mobileNumber",
      "mobileNumber",
      mobileNum
    );
    if (checkMobileNoError !== "null") {
      setErrors({
        mobileNumberError: checkMobileNoError,
      });
      return false;
    }
    setErrors({
      mobileNumberError: "",
    });
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      fetchMobileHistoryRecords(mobileNumber).then(() => {
        setfilterOption(false);
        setFilteredArea(true);
        setIsLoading(true);
      });
    }
  };
  const handleReset = () => {
    setMobileNum("");
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

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const handleChangeMobileNo = (event: any) => {
    setMobileNum(event.target.value);
  };

  let mobileHistoryData = mobileHistoryRecordsData?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      mobileHistoryData = mobileHistoryData.filter(
        (e: any | DeviceMobileHistoryRecordsInfo) => {
          return (
            e.mobileNumber
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase()) ||
            e.actionDate.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.actionTime.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.status.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.actionBy.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.reason.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      mobileHistoryData = mobileHistoryData.filter(
        (e: any | DeviceMobileHistoryRecordsInfo) => {
          if (
            e[searchCategory]
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase())
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

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const handle_Back = () => {
    history.goBack();
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
  const clicktoBack = () => {
    props.history.push({
      pathname: "/dashboard/User-Account-Unlock/Customer-Login-Records",
    });
  };

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Account History"}
        SummaryFileName={"Account History"}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        filter={true}
        searchArea={toggleSearch}
        search={searchArea}
        FieldList={handleList}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        Back={false}
        BackAction={handle_Back}
        SummaryColumn={
          orginalColumns.length > 0
            ? orginalColumns
            : mobileHistoryRecordsHeader
        }
        Print={handlePrint}
        TableData={
          mobileHistoryData === undefined
            ? []
            : Array.isArray(mobileHistoryData)
            ? mobileHistoryData
            : [mobileHistoryData]
        }
      />

      {filterOption && (
        <div className="userLoginFilterSection titleFilterUser mt-3 p-3 filterbox">
          <p className="filter">Filter</p>
          {errors.mobileNumberError && errors?.mobileNumberError !== "null" && (
            <span className="colorRedUser mandatory">
              {" "}
              *field value is mandatory
            </span>
          )}
          <div className="container-fluid filterContentUser">
            <div className="row align-items-end  col-12">
              <div className="col-2">
                <FormGroup className="formgroup">
                  <Label for="exampleSelect" className="label">
                    Country Code
                  </Label>
                  <span className="device-history-color">*</span>
                  <Input
                    name="countryCode"
                    type="select"
                    className="formRadiusCodeValue form-select btn--sizer"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    <option>+91</option>
                    <option>+60</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="col-4">
                <FormGroup className="formgroup">
                  <Label for="exampleSelect" className="label">
                    Mobile No
                  </Label>
                  <span className="device-history-color">*</span>
                  <Input
                    name="mobileNo"
                    type="text"
                    className="formRadiusUserAccount form-input"
                    value={mobileNum}
                    placeholder="Enter mobile number"
                    onChange={handleChangeMobileNo}
                  />
                </FormGroup>
              </div>
              <div className="col-2"></div>

              <div className="col-4 d-flex justify-content-end ms-1 mb-1">
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
      {filteredArea && (
        <div className="row filteredAreaUserLogin">
          <div className="col-sm-2">Filter Selected : </div>
          {iconClosed && (
            <>
              <div className="container conColorUserLogin">
                <p className="paraTextUserLogin">
                  Mobile Number: {countryCode + mobileNum}
                </p>
              </div>
            </>
          )}
        </div>
      )}
      {/* <div className="d-flex justify-content-end">
        <CustomButton className="backBtnDevice mt-4" onClick={clicktoBack}>
          <TiArrowBackOutline style={{ margin: "auto 5px" }} />
          Back
        </CustomButton>
      </div> */}
      {searchArea && (
        <div className="d-flex user-search mt-3 cursor">
          <select
            className=" form-select user-search-drop widthfield cursor"
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
            className="ms-1 user-search-input widthfield"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-3">
          <Button color="danger" className="btn--sizer">Search</Button>

            <Button
              className="text-white  border-0 ms-3"
              onClick={() => closeSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      <CustomCurrentPageUserManagement page={"lock"} onClick={changeToUser} />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            <CustomHeader
              TableData={
                columns.length > 0 ? columns : mobileHistoryRecordsHeader
              }
              CustomTableHeader={mobileHistoryData}
              DisableMange={true}
              toPrint={toPrint ? true : false}
            />
          </Form>
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
            <Button className="searchBtnAccount">Search</Button>
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
      <LockedDeviceHistory />
    </div>
  );
};

export default DeviceMobileHistory;
