import { Form } from "antd";
import React, { useRef, useState } from "react";
import CommonHeaderSummary from "../../../Components/CommonHeaderSummary/CommonHeaderSummary";

import "./LockAccountHistory.scss";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import CustomHeader from "../../../Components/CustomTable/CustomTable";
import UnlockConfirmationPopUp from "../../../Components/UnlockConfirmationPopUp/UnlockConfirmationPopUp";

const LockAccountHistory = (props: any) => {
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
  const [toPrint, setPrint] = useState(false);

  let userLoginRecordsData = [
    {
      date: "15/05/2021",
      time: "09:10:11",
      mobile: "0192227225",
      name: "Guna",
      geolocation: "2.9837476347634'E",
      deviceid: "1213223",
      deviceModal: "VOG-L29",
      mnBlockStatus: "Yes",
      devicestatus: "No",
      reason: "Bind Limiy",
    },
    {
      date: "15/05/2021",
      time: "09:10:11",
      mobile: "0192227225",
      name: "Guna",
      geolocation: "2.9837476347634'E",
      deviceid: "1213223",
      deviceModal: "VOG-L29",
      mnBlockStatus: "Yes",
      devicestatus: "No",
      reason: "Bind Limiy",
    },
    {
      date: "15/05/2021",
      time: "09:10:11",
      mobile: "0192227225",
      name: "Guna",
      geolocation: "2.9837476347634'E",
      deviceid: "1213223",
      deviceModal: "VOG-L29",
      mnBlockStatus: "Yes",
      devicestatus: "No",
      reason: "Bind Limiy",
    },
    {
      date: "15/05/2021",
      time: "09:10:11",
      mobile: "0192227225",
      name: "Guna",
      geolocation: "2.9837476347634'E",
      deviceid: "1213223",
      deviceModal: "VOG-L29",
      mnBlockStatus: "Yes",
      devicestatus: "No",
      reason: "Bind Limiy",
    },
    {
      date: "15/05/2021",
      time: "09:10:11",
      mobile: "0192227225",
      name: "Guna",
      geolocation: "2.9837476347634'E",
      deviceid: "1213223",
      deviceModal: "VOG-L29",
      mnBlockStatus: "Yes",
      devicestatus: "No",
      reason: "Bind Limiy",
    },
  ];

  const userLoginRecordsHeader = [
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
      title: "Mobile No",
      dataIndex: "mobile",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobile.localeCompare(b.mobile),
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
      title: "Device Modal",
      dataIndex: "deviceModal",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceModal.localeCompare(b.deviceModal),
      },
    },
    {
      title: "MN Block Status",
      dataIndex: "mnBlockStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mnBlockStatus.localeCompare(b.mnBlockStatus),
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
  const closeUnlockConfimation = () => {
    setShowModal(!showModal);
  };
  const triggerUnlockConfirmation = () => {
    setShowModal(!showModal);
  };
  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
  };

  const handleSubmit = () => {
    setfilterOption(false);
    setFilteredArea(true);
  };
  const handleChangeFullName = (event: any) => {
    setFullName(event.target.value);
  };
  const handleChangePhnNumber = (event: any) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeDate = (event: any) => {
    setDate(event.target.value);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
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

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      userLoginRecordsData = userLoginRecordsData.filter((e: any) => {
        return (
          e.mobileNo?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.name.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.loginDate.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.loginTime.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.ip.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.geoLocation.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceId.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.deviceOs.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.appVersion.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      userLoginRecordsData = userLoginRecordsData.filter((e: any) => {
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

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Unlock BO User"}
        SummaryFileName={"Unlock BO Office User"}
        filterArea={toggleFiler}
        filter={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        List={handleList}
        SummaryColumn={columns.length > 0 ? columns : userLoginRecordsHeader}
        Print={handlePrint}
      />
      {filterOption && (
        <div className="userLoginFilterSection titleFilterUser mt-3 p-3">
          Filter
          <span className="colorRedUser">
            {" "}
            ** any one field value is mandatory
          </span>
          <div className="container-fluid filterContentUser">
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleSelect">Mobile No</Label>
                  <Input
                    name="mobileNo"
                    type="text"
                    className="formRadiusUser form-input"
                    placeholder="Enter mobile number"
                    onChange={handleChangeFullName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                {" "}
                <FormGroup className="inputFieldUser">
                  <Label for="exampleValue">Device ID</Label>
                  <Input
                    type="text"
                    name="deviceId"
                    placeholder="Enter device Id"
                    className="formRadiusUser"
                    onChange={handleChangePhnNumber}
                  />
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    className="formRadiusUser"
                    onChange={handleChangeDate}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    className="formRadiusUser"
                    onChange={handleChangeDate}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col buttonUser">
                <Button className="nextBtnUserLogin" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button className="backBtnUserLogin">Reset</Button>
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
                <p className="paraTextUserLogin">Full Name: {fullName}</p>
              </div>
            </>
          )}
          {iconClosedNumber && (
            <>
              <div className="container conColorUserLogin">
                <p className="paraTextUserLogin">Phone Number: {phoneNUmber}</p>
              </div>
            </>
          )}
          {iconClosedDate && (
            <>
              <div className="container conColorUserLogin">
                <p className="paraTextUserLogin">Last Login: {date}</p>
              </div>
            </>
          )}
        </div>
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

            <option value="mobileNo" className="cursor">
              Mobile No
            </option>
            <option value="name" className="cursor">
              Name
            </option>
            <option value="loginDate" className="cursor">
              Login Date
            </option>
            <option value="loginTime" className="cursor">
              Login Time
            </option>
            <option value="ip" className="cursor">
              IP
            </option>
            <option value="geoLocation" className="cursor">
              Geo Location
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
            placeholder="Type your search keyword"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger" className="">Search</Button>
          </div>
          <div>
            <Button className="text-white  border-0 ms-1">
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      <div className="mt-3" ref={componentRef}>
        <Form form={form} component={false}>
          <CustomHeader
            TableData={columns.length > 0 ? columns : userLoginRecordsHeader}
            CustomTableHeader={userLoginRecordsData}
            unLockConfirm={triggerUnlockConfirmation}
            lock={true}
            unLock={true}
            refresh={true}
          />
        </Form>
      </div>
      <UnlockConfirmationPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeUnlockConfimation}
      ></UnlockConfirmationPopUp>
    </div>
  );
};

export default LockAccountHistory;
