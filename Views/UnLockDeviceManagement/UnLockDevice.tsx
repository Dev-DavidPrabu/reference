import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button, Form } from "antd";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { FormGroup, Input, Label } from "reactstrap";
import { lockedCustomerInfo } from "../../models/LockedCustomerModel";
import CustomCurrentPageUserManagement from "../../Components/CustomCurrentPageUserManagement/CustomCurrentPageUserManagement";
import {
  getLockedCustomerData,
  unlockedCustomerStatus,
} from "../../redux/action/LockedCustomerAction";
function UnLockDevice(props: any) {
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [iconClosedNumber, setIconClosedNumber] = useState(true);
  const [iconClosedDate, setIconClosedDate] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phoneNUmber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const dispatch = useDispatch();
  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState();
  const closeSearch = () => {
    setSearchArea(!searchArea);
  };

  const lockedCustomerData = useSelector(
    (state: RootStateOrAny) =>
      state.LockedCustomerReducer?.getLockedCustomerResponse
  );
  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };
  const handleSubmit = () => {
    setfilterOption(false);
    setFilteredArea(true);
  };
  const fetchLockedCustomer = useCallback(async () => {
    try {
      dispatch(getLockedCustomerData());
    } catch (err) {}
  }, [dispatch]);
  const updateUnlockedCustomer = useCallback(
    async (updatedStatus: any) => {
      try {
        dispatch(unlockedCustomerStatus(updatedStatus));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchLockedCustomer();
  }, []);

  let lockedData = lockedCustomerData?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      lockedData = lockedData.filter((e: any | lockedCustomerInfo) => {
        return (
          e.userName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.mobileNumber.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.lastLoginDate
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
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
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const handleChangeFullName = (event: any) => {
    setFullName(event.target.value);
  };
  const handleChangePhnNumber = (event: any) => {
    setPhoneNumber(event.target.value);
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
  const lockedDeviceHeader = [
    {
      title: "Date",
      dataIndex: "date",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.time.localeCompare(b.time),
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
      title: "Name",
      dataIndex: "name",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
    },
    {
      title: "IP",
      dataIndex: "ip",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.ip.localeCompare(b.ip),
      },
    },
    {
      title: "Geo Location",
      dataIndex: "geolocation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.geolocation.localeCompare(b.geolocation),
      },
    },
    {
      title: "Device ID",
      dataIndex: "deviceid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceid.localeCompare(b.deviceid),
      },
    },
    {
      title: "Device Model",
      dataIndex: "devicemodel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceid.localeCompare(b.deviceid),
      },
    },
    {
      title: "MN Block Status",
      dataIndex: "mnblockstatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mnblockstatus.localeCompare(b.mnblockstatus),
      },
    },
    {
      title: "Device Status",
      dataIndex: "devicestatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.devicestatus.localeCompare(b.devicestatus),
      },
    },

    {
      title: "Reason",
      dataIndex: "reason",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.reason.localeCompare(b.reason),
      },
    },
  ];
  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Unlock Mobile/Device"}
        SummaryFileName={"Unlock account/device"}
        List={true}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : lockedDeviceHeader
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
      {filterOption && (
        <div className="lockFilterSection titleFilter mt-3 p-3">
          Filter
          <span className="colorRedLock">
            {" "}
            ** any one field value is mandatory
          </span>
          <div className="container-fluid filterContent">
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleSelect">Device ID:</Label>
                  <Input
                    name="fullName"
                    type="text"
                    className="formRadiusLock form-input"
                    onChange={handleChangeFullName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                {" "}
                <FormGroup className="inputFieldLock">
                  <Label for="exampleValue">Mobile Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    className="formRadiusLock"
                    onChange={handleChangePhnNumber}
                  />
                </FormGroup>
              </div>

              <div className="col buttonLock">
                <Button className="nextBtnLock" onClick={() => handleSubmit()}>
                  Submit
                </Button>
                <Button className="backBtnLock">Reset</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <CustomCurrentPageUserManagement page={"lock"} />
      <CustomHeader
        TableData={columns.length > 0 ? columns : lockedDeviceHeader}
        CustomTableHeader={
          Array.isArray(lockedData) ? lockedData : [lockedData]
        }
        mobile={true}
        device={true}
      />
    </div>
  );
}

export default UnLockDevice;
