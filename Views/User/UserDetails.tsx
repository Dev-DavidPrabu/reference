import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Button, Label, Col, FormGroup } from "reactstrap";
import { FaRegEdit, FaReply } from "react-icons/fa";
import "./UserDetails.scss";
import { FiFilter } from "react-icons/fi";
import AddUser from "../../Components/UserCreate/AddUser";
import { getUserData } from "../../redux/action/UserCreateAction";
import { useReactToPrint } from "react-to-print";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { userDeatailsInfo } from "../../models/UserDetailModal";
import CustomUAM from "../../Components/CustomUAM/CustomUAM";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
let pageSize = 5;
const UserDetails = (props: any) => {
  const componentRef = useRef<any>();
  const [filterArea, setFilterArea] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [userType, setUserType] = useState("");
  const [userDetail, setUserDetail] = useState(Object);
  const [toPrint, setPrint] = useState(false);
  const [searchUserData, setsearchUserData] = useState("");
  const [searchCategory, setSearchCategory] = useState("id");
  const [apiMessage, setApiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);

  const dispatch = useDispatch();
  let userDetailsData = useSelector(
    (state: RootStateOrAny) => state.UserCreateReducer?.getUserDataResponse
  );
  const UserCreateStatus = useSelector(
    (state: any) => state.UserCreateReducer.createApiStatus
  );
  const toggleSearch = () => {
    setSearchField(!searchField);
    setFilterArea(false);
    setPrint(false);
  };
  let addUserInitData = {
    id: "",
    entityId: "",
    userName: "",
    fullName: "",
    emailId: "",
    mobileNumber: "",
    status: "",
    userType: "",
    loginId: "",
    countryCode: "",
  };
  const fetchAllUser = useCallback(async () => {
    try {
      dispatch(getUserData("userData"));
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllUser().then(() => {
      if (!userDetailsData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchAllUser]);
  useEffect(() => {
    if (userDetailsData) {
      if (userDetailsData.data) {
        setIsLoading(false);
      }
    }
  }, [userDetailsData]);

  function itemRender(current: number, type: string, originalElement: any) {
    if (type === "prev") {
      return <></>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }
  const addUser = () => {
    setShowAddUser(!showAddUser);
    setUserType("addUser");
    setUserDetail(addUserInitData);
  };
  const submitHandler = (value: string) => {
    setIsLoading(value !== "cancel");
    fetchAllUser();
    setShowAddUser(!showAddUser);
    if (value !== "cancel") {
      setApiMessage(value);
    }
    if (value === "cancel") {
      setApiMessage("");
    }
  };
  const editUser = (e: any) => {
    setShowAddUser(!showAddUser);
    setUserType("editUser");
    setUserDetail(e);
  };

  const deleteUser = () => {
    setUserType("deleteUser");
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  const closeSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  let userDetaildata = userDetailsData?.data;
  const Header = [
    {
      title: "User Id",
      dataIndex: "id",
      key: "UserId",
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
      checked: true,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "Username",
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
      checked: true,
      disabled: true,
    },
    {
      title: "Email Id",
      dataIndex: "emailId",
      key: "Emailid",
      sorter: {
        compare: (a: any, b: any) => a.emailId.localeCompare(b.emailId),
      },
      checked: true,
    },

    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileno",
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
      checked: true,
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      sorter: {
        compare: (a: any, b: any) => a.userType.localeCompare(b.userType),
      },
      render: (userType: any) => {
        return <label>{userType}</label>;
      },
      checked: true,
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      sorter: {
        compare: (a: any, b: any) => a.branchName - b.branchName,
      },
      render: (text: any, record: any, index: any) => {
        return (
          <>
            {record.branchName
              ? `${record.branchName}-${record.branchCode}`
              : "-"}
          </>
        );
      },
      checked: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      checked: true,
      render: (status: any) => {
        let value = status.toString().toUpperCase();
        return (
          <label
            className={` ${
              value === "ACTIVE" ? "text-success" : "text-danger"
            }`}
          >
            {value}
          </label>
        );
      },
    },
    {
      title: "Manage",
      dataIndex: "manage",
      value: "manage",
      label: "manage",
      render: (_: any, record: { key: React.Key }) =>
        true ? (
          <div className="d-flex">
            <div onClick={() => editUser(record)}>
              <FaRegEdit />
            </div>
          </div>
        ) : null,
    },
  ];
  let _data = userDetailsData?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      userDetaildata = userDetaildata?.filter((e: any | userDeatailsInfo) => {
        return (
          e.id?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.userName?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.emailId?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.mobileNumber
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.userType?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.branchName?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.status?.toUpperCase().includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      userDetaildata = userDetaildata?.filter((e: any | userDeatailsInfo) => {
        if (
          e[searchCategory]
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const navigateTo = (e: any) => {
    if (e === "userPage") {
      props.history.push({
        pathname: "/dashboard/user-Access-Management/User",
      });
    } else if (e === "userGroup") {
      props.history.push({
        pathname: "/dashboard/user-Access-Management/User-Groups",
      });
    } else if (e === "userRights") {
      props.history.push({
        pathname: "/dashboard/user-Access-Management/User-Rights",
      });
    } else if (e === "groupRights") {
      props.history.push({
        pathname: "/dashboard/user-Access-Management/Group-Rights",
      });
    }
  };

  const toggleRefresh = () => {
    setcolumns([]);
    setPrint(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns([]);
  };
  return (
    <div className="p-4">
      {!showAddUser && (
        <>
          <CommonHeaderSummary
            SummaryColumn={orginalColumns?.length > 0 ? orginalColumns : Header}
            TableData={userDetaildata}
            RightContent={"User"}
            SummaryFileName={"User"}
            Print={handlePrint}
            searchArea={toggleSearch}
            search={searchField}
            List={true}
            ListData={handleList}
            refresh={toggleRefresh}
            Refresh={true}
            Add={true}
            AddAction={addUser}
          />

          <CustomLoader isLoading={isLoading} size={50} />
          {filterArea && (
            <div className="user-filter-section mt-3 p-3">
              <div className="row mb-3">
                <div className="col-md-5">
                  {" "}
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      className="label-white-color"
                      sm={2}
                    >
                      User ID
                    </Label>
                    <Col sm={10}>
                      <Input type="email" name="email" id="exampleEmail" />
                    </Col>
                  </FormGroup>
                </div>
                <div className="col-md-5">
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      className="label-white-color"
                      sm={2}
                    >
                      User Name
                    </Label>
                    <Col sm={10}>
                      <Input type="email" name="email" id="exampleEmail" />
                    </Col>
                  </FormGroup>
                </div>
                <div className="col-md-2 d-flex justify-content-around">
                  <div className="fillter-icon-fillter cursor">
                    <FiFilter style={{ fontSize: "20px" }}></FiFilter>
                  </div>
                  <div
                    className="fillter-icon-arrow cursor"
                    onClick={() => setFilterArea(!filterArea)}
                  >
                    <FaReply></FaReply>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-5">
                  {" "}
                  <FormGroup row>
                    <Label
                      className="label-white-color"
                      for="exampleEmail"
                      sm={2}
                    >
                      Email Id
                    </Label>
                    <Col sm={10}>
                      <Input type="email" name="email" id="exampleEmail" />
                    </Col>
                  </FormGroup>
                </div>
                <div className="col-md-5">
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      className="label-white-color"
                      sm={2}
                    >
                      Mobile Number
                    </Label>
                    <Col sm={10}>
                      <Input type="email" name="email" id="exampleEmail" />
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </div>
          )}
          {searchField && (
            <div className="d-flex user-search mt-3 p-3">
              <select
                className=" form-select user-search-drop ms-2"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={"Select Field"}
              >
                <option value="id">User Id</option>
                <option value="userName">User Name</option>
                <option value="emailId">Email Id</option>
                <option value="mobileNumber">Mobile NO</option>
                <option value="userType">User Type</option>
                <option value="branchName">Branch Name</option>
                <option value="status">Status</option>
                <option value="any">Any</option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
                placeholder="Type your search keyword"
              />
              <div className="ms-1">
                <Button color="danger" className="btn--sizer">
                  Search
                </Button>
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
          <div className="w-100">
            <CustomUAM page={"userPage"} onClick={navigateTo} />
          </div>
          {apiMessage !== "" && (
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeMessage}
              message={
                apiMessage === "add"
                  ? "User has been Added Successfully"
                  : "User has been Updated Successfully"
              }
            />
          )}

          {toPrint && (
            <span
              className="span-col1 mt-3"
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
              to confirm and Print ! Or{" "}
              <a
                onClick={cancelPrint}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Cancel
              </a>
            </span>
          )}
          <div className="mt-3" ref={componentRef}>
            {isLoading ? null : (
              <div>
                {_data?.length > 0 ? (
                  <div>
                    <CustomHeader
                      editUser={editUser}
                      TableData={columns.length > 0 ? columns : Header}
                      Edit={true}
                      CustomTableHeader={userDetaildata}
                      deleteUser={deleteUser}
                      toPrint={toPrint ? true : false}
                      DisableMange={toPrint ? true : false}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center text-bold">
                    No User Found
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {""}
      {showAddUser && (
        <AddUser
          showAddUser={showAddUser}
          userType={userType}
          submitHandler={(value: string) => submitHandler(value)}
          userDetail={userDetail}
        />
      )}
    </div>
  );
};
export default UserDetails;
