import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import {
  deleteBranchData,
  getBranchDashboardFilter,
  getBranchDashboardRecords,
  restDeletebranchData,
} from "../../redux/action/BranchDashboardAction";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { branchDashboardRecords } from "../../models/BranchDashboardModel";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import "./BranchDashboard.scss";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import { branchList } from "../../models/UserRightsModal";
import { Link } from "react-router-dom";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Utils } from "../../Constants/Constants";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomNavigateDashBoard from "../../Components/CustomNavigateDashBoard/CustomNavigateDashBoard";
import { getAgentGroup } from "../../redux/action/AgentGroupAction";

const BranchDashboard = (props: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const componentRef = useRef<any>();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [apiMessage, setApiMessage] = useState(props.location?.state || "");
  const [deleteId, setDeletId] = useState<branchList>(Object);
  const [isLoading, setIsLoading] = useState(true);
  const [filterError, setFilterError] = useState(true);
  const [lockedStatus, setLockedStatus] = useState(true);
  const [lockedMessage, setLockedMessage] = useState("");
  const [GotoFilter,setGotoFilter]=useState(0)
  const [tableShow, setTableShow] = useState(true);
  const [toPrint, setPrint] = useState(false);
  const [filterRecordsError, setFilterRecordeError] = useState(false);
  const [filterDetail, setFilterDetail] = useState({
    branchName: "",
    branchCode: "",
    agentGroupName: "",
    mid: "",
    status: [],
  });

  const branchDashboardRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.BranchDashboardReducer?.getBranchDashboardRegordsResponse
  );
  let datas = branchDashboardRecordsData?.data;

  const branchDashboardFilter = useSelector(
    (state: RootStateOrAny) =>
      state.BranchDashboardReducer?.getBranchDashboardFilterResponse
  );

  const DeleteBranchDashboard = useSelector(
    (state: RootStateOrAny) =>
      state.BranchDashboardReducer?.deleteBranchDataResponse
  );
  let agentGroupList = useSelector(
    (state: RootStateOrAny) =>
      state.AgentGroupReducer?.getAllAgentGroupListResponse
  );
  let AgentGroupDataList = agentGroupList?.data;

  const agentList = useCallback(async () => {
    try {
      dispatch(getAgentGroup());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    agentList();
  }, [agentList]);

  let filterData = branchDashboardFilter?.data;

    if (filterData !== undefined) {
      datas = filterData;
    }

  const fetchBranchDashboardRecords = useCallback(async () => {
    try {
      dispatch(getBranchDashboardRecords());
    } catch (err) {}
  }, [dispatch]);

  const resetDeleteData = useCallback(async () => {
    try {
      dispatch(restDeletebranchData());
    } catch (err) {}
  }, [dispatch]);

  const fetchBranchDashboardFilterData = useCallback(
    async (filterDetail: any) => {
      try {
        dispatch(getBranchDashboardFilter(filterDetail));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchBranchDashboardRecords();
  }, [fetchBranchDashboardRecords]);

  useEffect(() => {
    if (branchDashboardRecordsData) {
      if (branchDashboardRecordsData?.data) {
        setIsLoading(false);
      }
    }
  }, [branchDashboardRecordsData]);


  useEffect(() => {
    if (branchDashboardRecordsData) {
      if (branchDashboardRecordsData?.data) {
        setIsLoading(false);
        setfilterOption(false);
        setFilteredArea(false);
        setApiMessage(false);
      }
    }
  }, [branchDashboardRecordsData]);
  useEffect(() => {
    if (branchDashboardRecordsData?.data) {
      setTableShow(true);
    } else if (branchDashboardRecordsData?.error) {
      setApiMessage(true);
      setLockedStatus(false);
      setIsLoading(false);
      setTableShow(true);
      setfilterOption(false);
      setFilteredArea(true);
      setFilterRecordeError(true);
      setLockedMessage(branchDashboardRecordsData?.message);
    }
  }, [branchDashboardRecordsData]);


  useEffect(() => {
    if (branchDashboardRecordsData) {
      if (branchDashboardRecordsData?.message) {
        setIsLoading(false);
      }
    }
  }, [branchDashboardRecordsData]);

  useEffect(() => {
    if (DeleteBranchDashboard) {
      if (DeleteBranchDashboard?.data) {
        setIsLoading(false);
        fetchBranchDashboardRecords();
        resetDeleteData();
      } else if (DeleteBranchDashboard.error) {
      }
    }
  }, [DeleteBranchDashboard]);

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
    setFilterDetail({
      branchName: "",
      branchCode: "",
      agentGroupName: "",
      mid: "",
      status: [],
    });
  };
  const closeSearch = () => {
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };


  const toggleRefresh = () => {
    setFilterDetail({
      branchName: "",
      branchCode: "",
      agentGroupName: "",
      mid: "",
      status: [],
    });
    setFilteredArea(false);
    setcolumns([]);
    
    setsearchUserData("");
    setSearchArea(false);
    setIsLoading(true);
    setApiMessage(false);
    fetchBranchDashboardRecords().then(() => {
      if (!branchDashboardRecordsData?.data) {
        setIsLoading(true);
      }
    });
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
  const deletingTheSelectedRecord = useCallback(
    async (branchCode: string) => {
      try {
        dispatch(deleteBranchData(branchCode));
      } catch (err) {}
    },
    [dispatch]
  );

  const deleteTheSelectedRecord = (branchCode: any) => {
    deletingTheSelectedRecord(branchCode).then(() => {
      fetchBranchDashboardRecords();
      setIsLoading(true);
      setShowModal(!showModal);
    });
  };
  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const deleteUser = (e: any) => {
    setDeletId(e.branchCode);
    setShowModal(!showModal);
  };
  const editBranch = (e: any) => {
    props.history.push({
      pathname: "/dashboard/Branch-Management/Branch-Dashboard/Edit-Branch",
      state: {
        data: e,
        isEditable: false,
        isView: true,
        isEdit: true,
        isTittle: true,
      },
    });
  };
  const agentGroupHeader = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchName.localeCompare(b.branchName),
      },
    },
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      key: "uid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchCode.localeCompare(b.branchCode),
      },
      render: (status: any, record: any) => {
        return (
          <Link
            to={{
              pathname:
                "/dashboard/Branch-Management/Branch-Dashboard/Edit-Branch",

              state: {
                data: record,
                isEditable: true,
                isView: true,
                isDelete: true,
                isTittle: true,
              },
            }}
          >
            {status}
          </Link>
        );
      },
    },
    {
      title: "Agent Group",
      dataIndex: "agentGroupName",
      key: "agentGroupName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.agentGroupName.localeCompare(b.agentGroupName),
      },
    },
    {
      title: "MID",
      dataIndex: "mid",
      key: "mid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mid.localeCompare(b.mid),
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
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "ACTIVE" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
  ];

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      let filterdatas = datas.filter((e: any | branchDashboardRecords) => {
        return (
          e.branchName?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.branchCode?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.agentGroupName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.mid?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.status?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
      datas=filterdatas
    } 
    else {
      datas = datas.filter((e: any | branchDashboardRecords) => {
        if (
          e[searchCategory]
            ?.toString()
            ?.toUpperCase()

            ?.includes(searchUserData?.toString()?.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const handleChange = (e: any) => {
    setFilterDetail({ ...filterDetail, [e.target.name]: e.target.value });
  };
  const handleChangeSelect = (e: any) => {
    setFilterDetail({ ...filterDetail, ["status"]: e.target.value });
  };

  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/Branch-Management/Branch-Dashboard/Add-Branch",
      state: {
        data: {},
        isEditable: false,
        isView: true,
        isTittle: false,
      },
    });
  };
  const handleClick = () => {
    if (filterDetail) {
      setFilteredArea(true)
      setIsLoading(true);
      fetchBranchDashboardFilterData(filterDetail);
      setTableShow(true);
    } else {
      setFilterError(false);
    }
  };
  const resetFilter = () => {
    setFilterDetail({
      branchName: "",
      branchCode: "",
      agentGroupName: "",
      mid: "",
      status: [],
    });
    setFilterError(true);
  };
  let locatonData = props.location?.state;
  useEffect(() => {
    if (locatonData === true) {
      setApiMessage(true);
      setLockedMessage(props?.location?.message);
    } else {
      setApiMessage(false);
    }
  }, []);
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  const navigateTo = (e: any) => {
    if (e === "eTerminal") {
      props.history.push({
        pathname: "/dashboard/Branch-Management/Terminal-Dashboard",
      });
    } else if (e === "branchPage") {
      props.history.push({
        pathname: "/dashboard/Branch-Management/Branch-Dashboard",
      });
    } else if (e === "agentGroup") {
      props.history.push({
        pathname: "/dashboard/Branch-Management/Agent-Group",
      });
    }
  };
  const handleSearchChange=(e:any)=>{
    if(e.target.value.length>0){
      setGotoFilter(e.target.value.length)
      setsearchUserData(e.target.value)
    }
    else{
      setGotoFilter(0)
      setsearchUserData(e.target.value)
    }
  }
  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Branch Dashboard"}
        SummaryFileName={"Branch Dashboard"}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        filter={true}
        searchArea={toggleSearch}
        search={searchArea}
        Add={true}
        AddAction={handleAdd}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : agentGroupHeader
        }
        Print={handlePrint}
        TableData={branchDashboardRecordsData?.error?Array:datas}
      />

      {searchArea && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop cursor"
            onChange={(e) =>  setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="branchName" className="cursor">
              Branch Name
            </option>
            <option value="branchCode" className="cursor">
              Branch Code
            </option>
            <option value="agentGroupName" className="cursor">
              Agent Group
            </option>
            <option value="mid" className="cursor">
              MID
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
            onChange={(ev) => handleSearchChange(ev)}
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
      {filterOption && (
        <div className="colorWhite payout-filter-section mt-3 p-3">
          <div className="d-flex justify-content-between">
            <p className="branchSetupTitle">Filter</p>

            <span className={`colorRedLock ${filterError && "d-none"}`}>
              {" "}
              ** All field value is mandatory
            </span>
          </div>
          <div className="container-fluid textboxs">
            <div className="row ">
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Branch Name</Label>
                  <Input
                    type="text"
                    name="branchName"
                    className="formRadiusBank"
                    placeholder="Enter Branch Name"
                    value={filterDetail.branchName}
                    onChange={handleChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Branch Code</Label>
                  <Input
                    type="text"
                    name="branchCode"
                    className="formRadiusBank"
                    placeholder="Enter Branch Code"
                    value={filterDetail.branchCode}
                    onChange={handleChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Agent group</Label>
                  <Input
                    type="select"
                    name="agentGroupName"
                    className="formRadiusBank form-select"
                    value={filterDetail.agentGroupName}
                    onChange={handleChange}
                  >
                    <option key="-1" value="">
                      Select Agent Group
                    </option>
                    {AgentGroupDataList &&
                      AgentGroupDataList.length > 0 &&
                      AgentGroupDataList.map((e: any) => {
                        return <option>{e.agentGroupName}</option>;
                      })}
                  </Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">MID</Label>
                  <Input
                    type="text"
                    name="mid"
                    className="formRadiusBank"
                    placeholder="Enter Branch Code"
                    value={filterDetail.mid}
                    onChange={handleChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Status</Label>
                  <Input
                    type="select"
                    name="status"
                    className="formRadiusBank form-select"
                    placeholder="Enter Status"
                    value={filterDetail.status}
                    onChange={handleChangeSelect}
                  >
                    <option value="" disabled hidden>
                      Select Status
                    </option>
                    {Utils.statusList.map((statusFilter: any, index: any) => {
                      return (
                        <option key={index} value={statusFilter}>
                          {statusFilter}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="col d-flex p-2 mt-2">
            <div className="col-6"></div>
            <div className="col-6 mr-2 d-flex justify-content-end">
         
                    <Button
                      color="danger"
                      className="kyc-FilterSubmitButton agent-filterBtn me-2"
                      onClick={handleClick}
                    >
                      Submit
                    </Button>
                    <Button
                      className="kyc-FilterResetButton agent-filterBtn me-2"
                      onClick={resetFilter}
                    >
                      Reset
                    </Button>
            </div>
          </div>
        </div>
      )}
      {filteredArea && <FiltersSelected value={filterDetail} />}
      {toPrint && (
        <span
          className="span-col1"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "10px",
          }}
        >
          {" "}
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
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={lockedStatus}
          closeMessage={closeMessage}
          message={lockedMessage}
          errorFix={filterRecordsError}
        />
      )}
      <CustomLoader isLoading={isLoading} size={50} />
      <CustomNavigateDashBoard page={"branchPage"} onClick={navigateTo} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            {tableShow && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : agentGroupHeader}
                CustomTableHeader={datas}
                Edit={true}
                editUser={editBranch}
                deleteUser={deleteUser}
                Delete={true}
                DeleteOnStatus={true}
                toPrint={toPrint ? true : false}
                DisableMange={toPrint ? true : false}
                SearchFilterGo={GotoFilter}
              />
            )}
          </Form>
        </div>
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

export default BranchDashboard;
