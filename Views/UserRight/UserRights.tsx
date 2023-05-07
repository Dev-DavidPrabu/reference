import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Button, Label, Col, FormGroup } from "reactstrap";
import { FaReply } from "react-icons/fa";
import "../User/UserDetails.scss";

import "./UserRights.scss";
import { FiFilter } from "react-icons/fi";
import AddUserGroups from "../../Components/UserRightsCreate/AddUserGroups";

import {
  clearDeleteInfoRights,
  deleteUserRight,
  getUserRightsData,
} from "../../redux/action/UserRightsAction";
import { useReactToPrint } from "react-to-print";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { userRights, userRightsInfo } from "../../models/UserRightsModal";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomUAM from "../../Components/CustomUAM/CustomUAM";

const UserRights = (props: any) => {
  const [filterArea, setFilterArea] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [userType, setUserType] = useState("");
  const [userTypeUser, setUserTypeUser] = useState("");
  const [userDetail, setUserDetail] = useState<userRights>(Object);
  const [toPrint, setPrint] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [apiMessage, setApiMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userRightInfo, setSelectedRightInfo] = useState<userRights>(Object);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const dispatch = useDispatch();
  const componentRef = useRef<any>();

  let UserRightsData = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer?.getUserRightsResponse
  );
  const UserDeleteRight = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer.deleteUserRightResponse
  );
  const fetchAllUser = useCallback(async () => {
    try {
      dispatch(getUserRightsData());
      setIsLoading(true);
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (UserRightsData) {
      if (UserRightsData.data || UserRightsData.error) {
        setIsLoading(false);
      }
    }
  }, [UserRightsData]);

  useEffect(() => {
    if (UserDeleteRight) {
      if (UserDeleteRight) {
        fetchAllUser();
        clearDeleteInfoRights();
        setApiMessage(UserDeleteRight?.data?.message);
      } else if (UserDeleteRight.error) {
        setApiMessage("");
      }
    }
  }, [UserDeleteRight, fetchAllUser]);
  const addUser = () => {
    setShowAddUser(!showAddUser);
    setUserType("addUserRights");
  };
  const submitHandler = (value: string) => {
    setShowAddUser(!showAddUser);
    setUserDetail({
      id: "",
      status: "",
      userGroupName: "",
      userId: "",
      userName: "",
      loginId: "",
      UserType: "",
    });
    setApiMessage(value);
    fetchAllUser();
  };

  const closeMessage = () => {
    setApiMessage("");
  };
  const editUser = (e: userRights) => {
    setShowAddUser(!showAddUser);
    setUserTypeUser("editUser");
    setUserDetail(e);
  };
  const deleteUser = (userRightInf: userRights) => {
    setShowModal(!showModal);
    setSelectedRightInfo(userRightInf);
  };

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
    setPrint(false);
  };
  const deleteTheSelectedRecord = (userRightDetials: any) => {
    deletingTheSelectedRecord(userRightDetials?.id).then(() => {
      fetchAllUser();
      setShowModal(!showModal);
    });
  };

  const deletingTheSelectedRecord = useCallback(
    async (userRightId: string) => {
      try {
        dispatch(deleteUserRight(userRightId));
      } catch (err) {}
    },
    [dispatch]
  );
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const handlePrint = (data: any) => {
    setPrint(!toPrint);
    setcolumns(data);
  };

  const UserRightsHeader = [
    {
      title: "Full Name",
      dataIndex: "userName",
      key: "fullname",
      checked: true,
      disabled: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Login ID",
      dataIndex: "loginId",
      key: "loginId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.loginId.localeCompare(b.loginId),
      },
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userType.localeCompare(b.userType),
      },
    },
    {
      title: "Group Name",
      dataIndex: "userGroupName",
      key: "groupname",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.userGroupName.localeCompare(b.userGroupName),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
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
  ];
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const toggleSearch = () => {
    setSearchField(!searchField);
    setFilterArea(false);
    setPrint(false);
  };
  const closeSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  let usersRights = UserRightsData?.data;
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      usersRights = usersRights.filter((e: any | userRightsInfo) => {
        return (
          e.loginId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.userName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.userGroupName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.emailId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.mobileNumber
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.userType?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.status?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      usersRights = usersRights.filter((e: any | userRightsInfo) => {
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
  return (
    <div className="p-4">
      {!showAddUser && (
        <>
          <CommonHeaderSummary
            SummaryColumn={
              orginalColumns?.length > 0 ? orginalColumns : UserRightsHeader
            }
            SummaryFileName={"userRights"}
            RightContent={"UserRights"}
            TableData={usersRights}
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
                      Group Name
                    </Label>
                    <Col sm={10}>
                      <select
                        className=" form-select select-wide"
                        defaultValue={"Select Field"}
                      ></select>
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
                      Group ID
                    </Label>
                    <Col sm={10}>
                      <select
                        className=" form-select select-wide"
                        defaultValue={"Select Field"}
                      ></select>
                    </Col>
                  </FormGroup>
                </div>
              </div>
            </div>
          )}

          {searchField && (
            <div className="d-flex user-search mt-3 p-3 cursor">
              <select
                className=" form-select user-search-drop ms-2 cursor"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={"Select Field"}
              >
                <option selected className="cursor">
                  Select Field
                </option>
                <option value="userName" className="cursor">
                  Full Name
                </option>
                <option value="loginId" className="cursor">
                  Login ID
                </option>
                <option value="userGroupName" className="cursor">
                  Group Name
                </option>
                <option value="userType" className="cursor">
                  UserType
                </option>
                <option value="status" className="cursor">
                  Status
                </option>
                <option value="any" className="cursor">
                  Any
                </option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                placeholder="Type your search keyword"
                onChange={(ev) => handleSearch(ev)}
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
          <div className="w-100">
            <CustomUAM page={"userRights"} onClick={navigateTo} />
          </div>
          <div className="mt-3" ref={componentRef}>
            {apiMessage && (
              <CustomResponseMessage
                apiStatus={true}
                closeMessage={closeMessage}
                message={
                  apiMessage === "add"
                    ? "User Rights Added Successfully"
                    : apiMessage === "update"
                    ? "User Rights Updated Successfully"
                    : "User Rights Deleted Successfully"
                }
              />
            )}
            <CustomLoader isLoading={isLoading} size={50} />
            {isLoading ? null : (
              <div>
                {usersRights?.length > 0 ? (
                  <div>
                    <CustomHeader
                      TableData={
                        columns.length > 0 ? columns : UserRightsHeader
                      }
                      Delete={true}
                      Edit={true}
                      CustomTableHeader={usersRights}
                      editUser={editUser}
                      deleteUser={deleteUser}
                      toPrint={toPrint ? true : false}
                      DisableMange={toPrint ? true : false}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center text-bold">
                    No User Rights Found
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {""}
      {showAddUser && (
        <AddUserGroups
          showAddUser={showAddUser}
          userType={userType}
          submitHandler={submitHandler}
          userDetail={userDetail}
          userTypeUser={userTypeUser}
        />
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={userRightInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
};

export default UserRights;
