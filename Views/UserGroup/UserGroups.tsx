import { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Button, Label, Col, FormGroup } from "reactstrap";
import { FaReply } from "react-icons/fa";
import "../User/UserDetails.scss";
import "./UserGroup.scss";
import { FiFilter } from "react-icons/fi";
import {
  deleteUserGroupOne,
  getAllUserGroupData,
  resetDeleteGroupInfo,
} from "../../redux/action/UserGroupAction";
import { useReactToPrint } from "react-to-print";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { userGroupInfo } from "../../models/UserGroupModal";
import CustomUAM from "../../Components/CustomUAM/CustomUAM";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";

const UserGroups = (props: any) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [filterArea, setFilterArea] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(Object);
  const [searchUserData, setsearchUserData] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchField, setSearchField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(props?.location?.message || "");
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);

  const UserGroupsData = useSelector(
    (state: RootStateOrAny) =>
      state.UserGroupCreateReducer?.getUserGroupDataResponse
  );

  const DelelteUserGroupsData = useSelector(
    (state: RootStateOrAny) =>
      state.UserGroupCreateReducer?.deleteUserGroupDataResponse
  );

  const fetchAllUser = useCallback(async () => {
    try {
      dispatch(getAllUserGroupData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllUser().then(() => {
      if (!UserGroupsData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchAllUser]);
  useEffect(() => {
    if (UserGroupsData) {
      if (UserGroupsData.data) {
        setIsLoading(false);
      }
    }
  }, [UserGroupsData]);
  useEffect(() => {
    if (DelelteUserGroupsData) {
      setApiMessage(" ");
      fetchAllUser();
      resetDeleteGroupInfo();
    } else if (DelelteUserGroupsData?.error) {
      setApiMessage(DelelteUserGroupsData?.error);
    }
  }, [DelelteUserGroupsData]);
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);
  const componentRef = useRef<any>();

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  let userGroup = UserGroupsData?.data;

  const DataHeader = [
    {
      title: "User Group Id",
      dataIndex: "id",
      key: "UserId",
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
      checked: true,
    },
    {
      title: "User Group",
      dataIndex: "userGroupName",
      key: "Usergroup",
      sorter: {
        compare: (a: any, b: any) =>
          a.userGroupName.localeCompare(b.userGroupName),
      },
      checked: true,
      disabled: true,
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
  ];

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const toggleOption = () => {
    setSearchField(!searchField);
    setFilterArea(false);
  };
  const resetSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const selectedGroupDetails = (userGroupInfo: any) => {
    setShowModal(!showModal);
    setSelectedGroupInfo(userGroupInfo);
  };
  const deleteTheSelectedRecord = (userGroupDetials: any) => {
    deletingTheSelectedRecord(userGroupDetials?.id).then(() => {
      fetchAllUser();
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (userGroupId: string) => {
      try {
        dispatch(deleteUserGroupOne(userGroupId));
      } catch (err) {}
    },
    [dispatch]
  );

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      userGroup = userGroup.filter((e: any | userGroupInfo) => {
        return (
          e.id?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.userGroupName
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.emailId?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.mobileNumber
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.status?.toUpperCase().includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      userGroup = userGroup.filter((e: any | userGroupInfo) => {
        if (
          e[searchCategory].toUpperCase().includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }
  if (sortBy) {
    userGroup =
      userGroup &&
      userGroup.sort(function (a: any, b: any) {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return false;
      });
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

  const handleList = (filteredItems: any) => {
    setcolumns(filteredItems);
    setorginalColumns([]);
  };
  const addUser = () => {
    props.history.push({
      pathname: "/dashboard/user-Access-Management/User-Groups/Add-User-Group",
    });
  };

  return (
    <div className="p-4">
      {!showAddUser && (
        <>
          <CommonHeaderSummary
            SummaryColumn={
              orginalColumns?.length > 0 ? orginalColumns : DataHeader
            }
            TableData={userGroup}
            Print={handlePrint}
            searchArea={toggleOption}
            SummaryFileName={"User Group"}
            RightContent={"User Group"}
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
            <div className="d-flex user-search mt-3 p-3">
              <select
                className=" form-select user-search-drop ms-2"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={"Select Field"}
              >
                <option selected>Select Field</option>
                <option value="id">User Group Id</option>
                <option value="userGroupName">User Group</option>
                <option value="status">Status</option>
                <option value="any">Any</option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                onChange={(ev) => handleSearch(ev)}
                placeholder="Type your search keyword"
              />
              <div className="ms-1">
                <Button color="danger" className="btn--sizer">Search</Button>
              </div>
              <div>
                <Button
                  className="text-white  border-0 ms-1"
                  onClick={() => resetSearch()}
                >
                  <FaReply />
                </Button>
              </div>
            </div>
          )}
          <div className="w-100">
            <CustomUAM page={"userGroup"} onClick={navigateTo} />
          </div>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={() => closeMessage()}
              message={
                apiMessage === "add"
                  ? "Group Created Sucessfully"
                  : apiMessage === "edit"
                  ? "Group Edited Sucessfully"
                  : "Group Deleted Sucessfully"
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
            <CustomLoader isLoading={isLoading} size={50} />
            {isLoading ? null : (
              <div>
                {userGroup?.length > 0 ? (
                  <div>
                    <CustomHeader
                      TableData={columns.length > 0 ? columns : DataHeader}
                      Delete={true}
                      Edit={true}
                      CustomTableHeader={userGroup}
                      deleteUser={selectedGroupDetails}
                      editUser={(e: any) =>
                        props.history.push({
                          pathname:
                            "/dashboard/user-Access-Management/User-Groups/Edit-User-Group",
                          state: e,
                        })
                      }
                      toPrint={toPrint ? true : false}
                      DisableMange={toPrint ? true : false}
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center text-bold">
                    No User Group Found
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {""}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedGroupInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
};

export default UserGroups;
