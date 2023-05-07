import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./LockedBackOfficeUser.scss";
import UnlockConfirmationPopUp from "../../Components/UnlockConfirmationPopUp/UnlockConfirmationPopUp";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { lockedBackOfficeUserInfo } from "../../models/LockedBackOfficeUserModel";
import { useReactToPrint } from "react-to-print";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getLockedBackOfficeData,
  resetUpdateUnlock,
  unlockedBackOffficeStatus,
} from "../../redux/action/LockedBackOfficeUserAction";

const LockedBackOfficeUser = (props: any) => {
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [showModal, setShowModal] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [iconClosedNumber, setIconClosedNumber] = useState(true);
  const [iconClosedDate, setIconClosedDate] = useState(true);
  const [fullName, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [date, setDate] = useState();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const dispatch = useDispatch();
  const [selectedCustomerInfo, setSelectedCustomerInfo] = useState<any>();

  const lockedBackOfficeData = useSelector(
    (state: RootStateOrAny) =>
      state.LockedBackOfficeUserReducer?.getLockedBackOfficeResponse
  );

  const UpdatedBackOfficeData = useSelector(
    (state: RootStateOrAny) =>
      state.LockedBackOfficeUserReducer?.unlockBackOfficeResponse
  );

  useEffect(() => {
    if (UpdatedBackOfficeData?.data) {
      fetchLockedBackOffice(emailId);
      setShowModal(false);
      resetUpdateUnlock();
    }
  }, [UpdatedBackOfficeData]);

  const fetchLockedBackOffice = useCallback(
    async (emailId: any) => {
      try {
        dispatch(getLockedBackOfficeData(emailId));
      } catch (err) {}
    },
    [dispatch]
  );

  const updateUnlockedBackOffice = useCallback(
    async (updatedStatus: any) => {
      try {
        dispatch(unlockedBackOffficeStatus(updatedStatus));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchLockedBackOffice(emailId);
  }, []);

  const lockedBackOfficeUserHeader = [
    {
      title: "Full Name",
      dataIndex: "userName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "LogIn ID",
      dataIndex: "emailId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.emailId.localeCompare(b.emailId),
      },
    },
    {
      title: "User Type",
      dataIndex: "userType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userType.localeCompare(b.userType),
      },
    },
    {
      title: "Last Login Date",
      dataIndex: "lastLoginDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.lastLoginDate.localeCompare(b.lastLoginDate),
      },
      render: (logInDate: any) => {
        return <div>{logInDate ? logInDate : "-"}</div>;
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
  const triggerUnlockConfirmation = (selectedUserInfo: any) => {
    setShowModal(!showModal);
    setSelectedCustomerInfo(selectedUserInfo);
  };
  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };

  const handleSubmit = () => {
    fetchLockedBackOffice(emailId).then(() => {
      setShowModal(false);
      setfilterOption(false);
      setFilteredArea(true);
    });
  };
  const handleChangeFullName = (event: any) => {
    setFullName(event.target.value);
  };
  const handleChangePhnNumber = (event: any) => {
    setEmailId(event.target.value);
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
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };
  let lockedStaffData = lockedBackOfficeData?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      lockedStaffData = lockedStaffData.filter(
        (e: any | lockedBackOfficeUserInfo) => {
          return (
            e.userName.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.emailId.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.reason.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      lockedStaffData = lockedStaffData.filter(
        (e: any | lockedBackOfficeUserInfo) => {
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

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const unLockConfirmed = async (remark: any) => {
    let updateReason = {
      emailId: selectedCustomerInfo?.emailId,
      lockedReason: selectedCustomerInfo?.reason,
      unlockReason: remark,
    };
    updateUnlockedBackOffice(updateReason);
  };

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Unlock BO User"}
        SummaryFileName={"Unlock BO User"}
        filterArea={toggleFiler}
        filter={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        SummaryColumn={
          orginalColumns.length > 0
            ? orginalColumns
            : lockedBackOfficeUserHeader
        }
        Print={handlePrint}
        TableData={
          lockedStaffData === undefined
            ? []
            : Array.isArray(lockedStaffData)
            ? lockedStaffData
            : [lockedStaffData]
        }
      />
      {filterOption && (
        <div className="lockBackFilterSection titleFilterBack mt-3 p-3">
          Filter
          <span className="colorRedLockedBack">
            {" "}
            ** any one field value is mandatory
          </span>
          <div className="container-fluid filterContentBack">
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleSelect">Full Name</Label>
                  <Input
                    name="userName"
                    type="text"
                    className="formRadiusLockBack form-input"
                    placeholder="Enter full name"
                    onChange={handleChangeFullName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                {" "}
                <FormGroup className="inputFieldLockBack">
                  <Label for="exampleValue">Email ID</Label>
                  <Input
                    type="text"
                    name="emailId"
                    placeholder="Enter Email Id"
                    className="formRadiusLockBack"
                    onChange={handleChangePhnNumber}
                  />
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Login Date</Label>
                  <Input
                    type="date"
                    name="lastLoginDate"
                    className="formRadiusLockBack"
                    onChange={handleChangeDate}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col buttonLockBack">
                <Button className="nextBtnLockBack" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button className="backBtnLockBack">Reset</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {filteredArea && (
        <div className="row filteredAreaLockBack">
          <div className="col-sm-2">Filter Selected : </div>
          {iconClosed && (
            <>
              <div className="container conColorLockBack">
                <p className="paraTextLockBack">Full Name: {fullName}</p>
              </div>
            </>
          )}
          {iconClosedNumber && (
            <>
              <div className="container conColorLockBack">
                <p className="paraTextLockBack">Email ID: {emailId}</p>
              </div>
            </>
          )}
          {iconClosedDate && (
            <>
              <div className="container conColorLockBack">
                <p className="paraTextLockBack">Last Login: {date}</p>
              </div>
            </>
          )}
        </div>
      )}
      {searchArea && (
        <div
          className="d-flex user-search mt-3  cursor"
          style={{ padding: "0 1rem" }}
        >
          <select
            className=" form-select user-search-drop widthfield cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="userName" className="cursor">
              Full Name
            </option>
            <option value="emailId" className="cursor">
              Email ID
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
          />
          <div className="ms-1">
            <Button color='danger' className="btn--sizer">Search</Button>
            <Button
              className="text-white  border-0 ms-3"
              onClick={() => closeSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      <div className="mt-3" ref={componentRef}>
        <Form form={form} component={false}>
          <CustomHeader
            TableData={
              columns.length > 0 ? columns : lockedBackOfficeUserHeader
            }
            CustomTableHeader={lockedStaffData}
            lock={false}
            unLock={true}
            unLockConfirm={triggerUnlockConfirmation}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </Form>
      </div>
      <UnlockConfirmationPopUp
        showModal={showModal}
        yesConfirmation={unLockConfirmed}
        selecetedCustomerData={selectedCustomerInfo}
        unlock={true}
        isReason={true}
        closeDeleteConfirmation={closeUnlockConfimation}
      ></UnlockConfirmationPopUp>
    </div>
  );
};

export default LockedBackOfficeUser;
