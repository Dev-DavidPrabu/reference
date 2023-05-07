import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { TiEdit, TiPlus } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import "./GroupRights.scss";
import {
  clearDeleteGroupRight,
  deleteGroupRight,
  getGroupRightsData,
} from "../../redux/action/GroupRightsAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import NewGroupRights from "../../Components/Group/NewGroupRights";
import {
  GroupRightsModal,
  userGroupRightsInfo,
} from "../../models/GroupRightModal";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomUAM from "../../Components/CustomUAM/CustomUAM";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";

const GroupRights = (props: any) => {
  const componentRef = useRef<any>();
  const [searchField, setSearchField] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [newGroupRights, setNewGroupRights] = useState(false);
  const [userDetail, setUserDetail] = useState(Object);
  const [userType, setUserType] = useState("");
  const [filterArea, setFilterArea] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeletId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);

  let GroupRightsData = useSelector(
    (state: RootStateOrAny) => state.GroupRightsReducer?.getGroupRightsResponse
  );
  let DeleteGroupRightsData = useSelector(
    (state: RootStateOrAny) => state.GroupRightsReducer?.deleteGroupRights
  );
  const fetchAllUser = useCallback(async () => {
    try {
      dispatch(getGroupRightsData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (GroupRightsData) {
      if (GroupRightsData.data || GroupRightsData.error) {
        setIsLoading(false);
      }
    }
  }, [GroupRightsData]);
  useEffect(() => {
    if (DeleteGroupRightsData) {
      if (DeleteGroupRightsData) {
        fetchAllUser();
        setApiMessage(" ");
        clearDeleteGroupRight();
      } else if (DeleteGroupRightsData.error) {
        setApiMessage("");
      }
    }
  }, [DeleteGroupRightsData]);

  useEffect(() => {
    if (DeleteGroupRightsData.length === 0) {
      setApiMessage("");
    }
  }, [DeleteGroupRightsData]);

  let addUserInitData = {
    id: "",
    entityId: "",
    userName: "",
    emailId: "",
    mobileNumber: "",
    status: "",
    userType: "",
    loginId: "",
    countryCode: "",
  };

  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const toggleSearch = () => {
    setSearchField(!searchField);
    setFilterArea(false);
  };
  const handlePrint = (data: any) => {
    setPrint(!toPrint);
    setcolumns(data);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
    setPrint(false);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  let groupRightData = GroupRightsData?.data;

  const GroupRightHeader = [
    {
      title: "Group Name",
      dataIndex: "userGroupCode",
      key: "userGroupCode",
      checked: true,
      disabled: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.userGroupCode.localeCompare(b.userGroupCode),
      },
    },

    {
      title: "Function Name",
      dataIndex: "functionCode",
      key: "functionCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.functionCode.localeCompare(b.functionCode),
      },
    },
    {
      title: "Operations",
      dataIndex: "Operations",
      key: "operation",
      checked: true,
      render: (_: any, record: any) =>
        true ? (
          <>
            <td className="border-0">
              <div className="d-flex justify-content-evenly ">
                {" "}
                <div
                  className={`${
                    record.add
                      ? "header-group-icon-active Addicon  d-flex align-items-center justify-content-center"
                      : "header-group-icon-inactive Addicon  d-flex align-items-center justify-content-center"
                  }`}
                >
                  <TiPlus color={`${record.add ? "white" : ""}`} />
                </div>
                <div
                  className={`ms-1  ${
                    record.edit
                      ? "header-group-icon-active Addicon  d-flex align-items-center justify-content-center"
                      : "header-group-icon-inactive Addicon  d-flex align-items-center justify-content-center"
                  }`}
                >
                  <TiEdit color={`${record.edit ? "white" : ""}`} />{" "}
                </div>
                <div
                  className={`ms-1 ${
                    record.delete
                      ? "header-group-icon-active Addicon  d-flex align-items-center justify-content-center"
                      : "header-group-icon-inactive Addicon  d-flex align-items-center justify-content-center"
                  }`}
                >
                  <AiOutlineDelete color={`${record.delete ? "white" : ""}`} />
                </div>
              </div>
            </td>
          </>
        ) : null,
    },
    {
      title: "Authorisation",
      dataIndex: "Authorisation",
      key: "authorisation",
      checked: true,
      render: (_: any, record: any) =>
        true ? (
          <>
            <td className="border-0">
              {" "}
              <div className="d-flex justify-content-evenly">
                <div
                  className={`d-flex justify-content-center ${
                    record.approvalLevel1
                      ? "header-group-icon-active text-white Addicon"
                      : "header-group-icon-inactive Addicon"
                  }`}
                >
                  L1
                </div>
                <div
                  className={`d-flex justify-content-center ms-1 ${
                    record.approvalLevel2
                      ? "header-group-icon-active text-white Addicon"
                      : "header-group-icon-inactive Addicon"
                  }`}
                >
                  L2
                </div>
                <div
                  className={`d-flex justify-content-center ms-1 ${
                    record.approvalLevel3
                      ? "header-group-icon-active text-white Addicon"
                      : "header-group-icon-inactive Addicon"
                  }`}
                >
                  L3
                </div>
              </div>
            </td>
          </>
        ) : null,
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
  const closeMessage = () => {
    setApiMessage("");
  };
  const submitHandler = (value: any) => {
    setNewGroupRights(!newGroupRights);
    fetchAllUser();
    setApiMessage(value);
  };
  const addUser = () => {
    setNewGroupRights(!newGroupRights);
    setUserType("newGroupRights");
    setUserDetail(addUserInitData);
  };
  const editUser = (e: GroupRightsModal) => {
    setNewGroupRights(!newGroupRights);
    setUserType("editGroupRights");
    setUserDetail(e);
  };
  const resetSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const deleteUser = (e: any) => {
    setDeletId(e.id);
    setShowModal(!showModal);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const deleteTheSelectedRecord = (id: any) => {
    dispatch(deleteGroupRight(id));
    setShowModal(!showModal);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      groupRightData = groupRightData.filter((e: any | userGroupRightsInfo) => {
        return (
          e.functionCode
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.functionId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.userGroupCode
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.emailId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.mobileNumber
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.status?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      groupRightData = groupRightData.filter((e: any | userGroupRightsInfo) => {
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
      {!newGroupRights && (
        <>
          <CommonHeaderSummary
            SummaryColumn={
              orginalColumns?.length > 0 ? orginalColumns : GroupRightHeader
            }
            SummaryFileName={"groupRights"}
            RightContent={"GroupRights"}
            TableData={groupRightData}
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
            <div className="user-filter-section-rights mt-3 p-3">
              <div className="row mb-3">
                <div className="col-md-3">
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      className="label-white-color"
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
                <div className="col-md-3">
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      className="label-white-color"
                      sm={2}
                    >
                      Function UID
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="with a placeholder"
                      />
                    </Col>
                  </FormGroup>
                </div>
                <div className="col-md-3">
                  <FormGroup row>
                    <Label
                      for="exampleEmail"
                      className="label-white-color"
                      sm={2}
                    >
                      Function Name
                    </Label>
                    <Col sm={10}>
                      <select
                        className=" form-select select-wide"
                        defaultValue={"Select Field"}
                      ></select>
                    </Col>
                  </FormGroup>
                </div>
                <div className="col-md-3 d-flex justify-content-around">
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
            </div>
          )}

          {searchField && (
            <div className="d-flex user-search mt-3 p-3">
              <select
                className=" form-select user-search-drop ms-2 cursor"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={"Select Field"}
              >
                <option selected className="cursor">
                  Select Field
                </option>
                <option value="userGroupCode">Group Name</option>
                <option value="functionCode">Funtion Name</option>
                <option value="status">Status</option>
                <option value="any">Any</option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                placeholder="Type your search keyword"
                onChange={(ev) => handleSearch(ev)}
              />
              <div className="ms-1">
                <Button color="danger" className="btn--sizer">
                  Search
                </Button>
              </div>
              <div className="ms-1">
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
            <CustomUAM page={"groupRights"} onClick={navigateTo} />
          </div>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeMessage}
              message={
                apiMessage === "add"
                  ? "Group has been Added Successfully"
                  : apiMessage === "update"
                  ? "Group has been Updated Successfully"
                  : "Group has been Deleted Successfully"
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
                <div>
                  <CustomHeader
                    TableData={columns.length > 0 ? columns : GroupRightHeader}
                    Delete={true}
                    Edit={true}
                    CustomTableHeader={groupRightData}
                    editUser={editUser}
                    deleteUser={deleteUser}
                    toPrint={toPrint ? true : false}
                    DisableMange={toPrint ? true : false}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {""}
      {newGroupRights && (
        <NewGroupRights
          showAddUser={newGroupRights}
          userType={userType}
          submitHandler={submitHandler}
          userDetail={userDetail}
        />
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={deleteId}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
};

export default GroupRights;
