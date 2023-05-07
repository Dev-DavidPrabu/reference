import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "./TerminalDashboard.scss";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import {
  activateTerminalRes,
  approveTerminal,
  deleteTerminalGroup,
  getTerminalFilter,
  getTerminalList,
  rejectTerminal,
  resetTerminalDashboard,
  resetCreateMessage,
} from "../../redux/action/TerminalDashboardAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import { ImUserCheck } from "react-icons/im";
import CustomNavigateDashBoard from "../../Components/CustomNavigateDashBoard/CustomNavigateDashBoard";
import { getUserAccess } from "../../redux/action/CardUnBlockAction";

const TerminalDashboard = (props: any) => {
  const [form] = Form.useForm();
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [createErrMessage, setCreateErrMessage] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState("");
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [IsActive, setIsActive] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [tableShow, setTableShow] = useState(true);
  const [selectedId, setSelectedId] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [GotoFilter, setGotoFilter] = useState(0);
  const [terminalDataFilter, setTerminalDataFilter] = useState({
    agentGrpCode: "",
    branchCode: "",
    mid: "",
    status: "",
    tid: "",
  });

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
    fetchTerminalDashboarddata();
    setsearchUserData("");
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    fetchTerminalDashboarddata();
    setsearchUserData("");
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    let manage = {
      title: "Manage",
      className: !makerEdit && !makerDelete ? "d-none" : "",
      render: (_: any, record: any) => (
        <div className="d-flex">
          <div
            className={
              record?.status === "INACTIVE"
                ? `d-flex  cursor justify-content-center`
                : "d-flex  cursor justify-content-center disableColor"
            }
          >
            {makerEdit === true && record?.status === "INACTIVE" ? (
              <FaRegEdit onClick={() => editTerminal(record)} />
            ) : makerEdit === true ? (
              <FaRegEdit />
            ) : (
              ""
            )}
          </div>
          <div className="d-flex  cursor justify-content-center">
            <div
              className={
                record?.status == "ACTIVE"
                  ? `ms-2 status-validated cursor userIcon-size disable-background`
                  : `ms-2 status-error cursor userIcon-size disableColor`
              }
            >
              {makerDelete === true && record?.status === "ACTIVE" ? (
                <ImUserCheck onClick={() => handleDelete(record)} />
              ) : makerDelete === true ? (
                <ImUserCheck />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ),
    };
    filteredItems.push(manage);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setTerminalDataFilter({
      agentGrpCode: "",
      branchCode: "",
      mid: "",
      status: "",
      tid: "",
    });
    setfilterOption(false);
    setcolumns([]);
    setorginalColumns([]);
    setPrint(false);
    resetTerminalDashboard();
    setIsLoading(true);
    fetchTerminalDashboarddata().then(() => {
      if (!terminalDashboardData?.data) {
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
    setPrint(true);
  };
  const cancelPrint = () => {
    setPrint(false);
    setcolumns([]);
  };
  const terminalUserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );
  let terminalData = terminalUserAccess?.data;

  let makerAdd = false;
  let makerEdit = false;
  let makerDelete = false;
  let checkerLevelOne = false;

  terminalData?.forEach((res: any) => {
    if (res.add === true) {
      makerAdd = true;
    }
    if (res.edit === true) {
      makerEdit = true;
    }
    if (res.delete === true) {
      makerDelete = true;
    }
    if (res.approvalLevelOne === true) {
      checkerLevelOne = true;
    }
  });

  const terminalApprove = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer?.getTerminalApprove
  );
  const deactivateTerminal = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer?.deactivateTerminalResponse
  );

  useEffect(() => {
    if (deactivateTerminal?.data) {
      setIsLoading(false);
      setApiStatus(true);
      setApiMessage(true);
      setApiErrorMsg("E-Terminal De-activation Requested Successfully");
      fetchTerminalDashboarddata();
      setSelectedId([]);
      setShowDeleteModal(false);
    } else if (deactivateTerminal?.error) {
      setIsLoading(false);
      setApiStatus(false);
      setApproveError(true);
      setApiMessage(true);
      setApiErrorMsg(deactivateTerminal?.message);
      fetchTerminalDashboarddata();
      setSelectedId([]);
      setShowDeleteModal(false);
    }
  }, [deactivateTerminal]);

  useEffect(() => {
    if (terminalApprove?.data) {
      setIsLoading(false);
      setApiStatus(true);
      setApiMessage(true);
      setApiErrorMsg("E-Terminal Activate Successfully");
      fetchTerminalDashboarddata();
      setSelectedId([]);
    } else if (terminalApprove?.error) {
      setIsLoading(false);
      setApiStatus(false);
      setApproveError(true);
      setApiMessage(true);
      setApiErrorMsg(terminalApprove?.message);
      fetchTerminalDashboarddata();
      setSelectedId([]);
    }
  }, [terminalApprove]);
  const terminalReject = useSelector(
    (state: RootStateOrAny) => state.TerminalDashboardReducer?.getTerminalreject
  );
  useEffect(() => {
    if (terminalReject?.data) {
      setIsLoading(false);
      setApiStatus(true);
      setApiMessage(true);
      setApiErrorMsg("E-Terminal Rejected Successfully");
      fetchTerminalDashboarddata();
      setSelectedId([]);
    } else if (terminalReject?.error) {
      setIsLoading(false);
      setApiStatus(false);
      setApproveError(true);
      setApiMessage(true);
      setApiErrorMsg(terminalReject?.message);
      fetchTerminalDashboarddata();
      setSelectedId([]);
    }
  }, [terminalReject]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage(false);
    }
  }, []);

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("E_TERMINAL"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  const activateTerminal = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer?.activateTerminalResponse
  );

  const fetchActivateTerminal = useCallback(
    async (id: any) => {
      try {
        dispatch(activateTerminalRes(id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (activateTerminal?.data) {
      setShowDeleteModal(!showDeleteModal);
      setApiStatus(true);
      setApiMessage(true);
      setApiErrorMsg("E-Terminal Activation Requested Successfully");
      fetchTerminalDashboarddata();
      setSelectedId([]);
      setShowDeleteModal(false);
    } else if (activateTerminal?.error) {
      setShowDeleteModal(!showDeleteModal);
      setApiMessage(true);
      setApiStatus(false);
      setApiErrorMsg(activateTerminal?.message);
      setApproveError(true);
    }
  }, [activateTerminal]);
  let locationData = props.location?.state;
  useEffect(() => {
    if (locationData === true) {
      setApiMessage(true);
      setApiStatus(true);
      setApiErrorMsg(props?.location?.message);
    } else {
      setApiMessage(false);
    }
  }, []);

  const terminalDashboardHeader = [
    {
      title: "E-Terminal/TID",
      dataIndex: "tid",
      key: "tid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.tid?.toString().localeCompare(b.tid?.toString()),
      },
    },
    {
      title: "Agent Group Name",
      dataIndex: "agentGroupName",
      key: "agentGroupName",
      checked: true,
      width: "15%",
      sorter: {
        compare: (a: any, b: any) =>
          a.agentGroupName
            ?.toString()
            .localeCompare(b.agentGroupName?.toString()),
      },
    },
    {
      title: "Agent Group Code",
      dataIndex: "agentGrpCode",
      key: "agentGrpCode",
      checked: true,
      width: "15%",
      sorter: {
        compare: (a: any, b: any) =>
          a.agentGrpCode?.toString().localeCompare(b.agentGrpCode?.toString()),
      },
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.branchName?.toString().localeCompare(b.branchName?.toString()),
      },
    },
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      key: "branchCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.branchCode?.toString().localeCompare(b.branchCode?.toString()),
      },
    },
    {
      title: "Device ID",
      dataIndex: "deviceId",
      key: "deviceId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.deviceId?.toString().localeCompare(b.deviceId?.toString()),
      },
    },
    {
      title: "MID",
      dataIndex: "mid",
      key: "mid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mid?.toString().localeCompare(b.mid?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
      render: (status: any) => {
        return (
          <label
            style={{ wordWrap: "break-word", wordBreak: "break-word" }}
            className={` ${
              status === "ACTIVE"
                ? "status-validated"
                : status === "INACTIVE"
                ? "status-error"
                : "pendingColor"
            }`}
          >
            {status}
          </label>
        );
      },
    },
    {
      title: "MakerName",
      dataIndex: "makerName",
      key: "makerName",
      checked: true,

      sorter: {
        compare: (a: any, b: any) =>
          a.makerName?.toString().localeCompare(b.makerName?.toString()),
      },
    },
    {
      title: "ApproverName",
      dataIndex: "approverName",
      key: "approverName",
      checked: true,

      sorter: {
        compare: (a: any, b: any) =>
          a.approverName?.toString().localeCompare(b.approverName?.toString()),
      },
    },
    {
      title: "ApproverId",
      dataIndex: "approverId",
      key: "approverId",

      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approverId?.toString().localeCompare(b.approverId?.toString()),
      },
      render: (id: any) => {
        return <>{id ? `${id}` : "-"}</>;
      },
    },
    {
      title: "CreatedDate",
      dataIndex: "createdDate",
      key: "createdDate",
      onCell: () => {
        return {
          style: {
            whiteSpace: "nowrap",
            maxWidth: 160,
          },
        };
      },
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.createdDate?.toString().localeCompare(b.createdDate?.toString()),
      },
    },
    {
      title: "Manage",
      className: !makerEdit && !makerDelete ? "d-none" : "",
      render: (_: any, record: any) => (
        <div className={`${record?.status === "INACTIVE" ? "d-flex" : ""}`}>
          <div
            className={
              record?.status === "INACTIVE"
                ? `d-flex  cursor justify-content-center`
                : "d-flex  cursor justify-content-center disableColor d-none"
            }
          >
            {makerEdit === true && record?.status === "INACTIVE" ? (
              <FaRegEdit onClick={() => editTerminal(record)} />
            ) : makerEdit === true ? (
              <FaRegEdit />
            ) : (
              ""
            )}
          </div>
          <div className="d-flex  cursor justify-content-center">
            <div
              className={
                record?.status == "ACTIVE"
                  ? `ms-2 status-validated cursor userIcon-size disable-background`
                  : record?.status === "INACTIVE"
                  ? `ms-2 status-validated cursor userIcon-size text-red`
                  : `ms-2 status-error cursor userIcon-size disableColor`
              }
            >
              {(makerDelete === true && record?.status === "ACTIVE") ||
              record?.status === "INACTIVE" ? (
                <ImUserCheck onClick={() => handleDelete(record)} />
              ) : makerDelete === true ? (
                <ImUserCheck />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const createTerminalError = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer.getTerminalCreateError
  );

  const terminalDashboardData: any = useSelector(
    (state: RootStateOrAny) =>
      state.TerminalDashboardReducer.getAllTerminalResponse
  );

  let terminalDashboardList: any = terminalDashboardData?.data;

  const fetchTerminalDashboarddata = useCallback(async () => {
    try {
      dispatch(getTerminalList());
    } catch (err) {}
  }, [dispatch]);

  const fetchTerminalApproveData = useCallback(
    async (id: any, value: any, reason: any) => {
      try {
        dispatch(approveTerminal(value, id, reason));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchTerminalRejectData = useCallback(
    async (id: any, value: any) => {
      try {
        dispatch(rejectTerminal(value, id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchTerminalDashboarddata().then(() => {
      if (!terminalDashboardData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchTerminalDashboarddata]);

  useEffect(() => {
    if (terminalDashboardData) {
      if (terminalDashboardData?.data) {
        setIsLoading(false);
      } else if (terminalDashboardData?.message) {
        setIsLoading(false);
        setApiMessage(true);
      }
    }
  }, [terminalDashboardData]);

  useEffect(() => {
    if (createTerminalError?.data) {
      setCreateErrMessage(true);
      setTimeout(function () {
        setCreateErrMessage(false);
        dispatch(resetCreateMessage());
      }, 3500);
    }
  }, [createTerminalError]);

  const closeDeleteConfimationGroup = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowDeleteModal(!showDeleteModal);
    setSelectedRecordInfo(recordInfo);
    setIsActive(recordInfo?.status === "ACTIVE" ? true : false);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    if (IsActive) {
      deletingTheSelectedRecord(recordInfo?.tid);
    } else if (!IsActive) {
      fetchActivateTerminal(recordInfo?.tid);
    }
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteTerminalGroup(recordId));
      } catch (err) {}
    },
    [dispatch]
  );

  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/Branch-Management/Terminal-Dashboard/Add-ETerminal",
    });
  };

  const editTerminal = (record: any) => {
    props.history?.push({
      pathname:
        "/dashboard/Branch-Management/Terminal-Dashboard/Edit-ETerminal",
      state: record,
      title: "Edit Terminal",
    });
  };
  let newDatas = terminalDashboardList?.map((data: any, index: any) => {
    return { ...data, key: index };
  });

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedId(selectedRows);
      setApiMessage(false);
      if (makerDetail === selectedRows[0]?.makerId) {
        setApiStatus(false);
        setApproveError(true);
        setApiMessage(true);
        setApiErrorMsg("Maker can't approve his own request.");
      } else {
        setApiMessage(false);
      }
    },
    hideSelectAll: true,
    type: "radio",
    getCheckboxProps: (record: any) => ({
      disabled:
        record?.status === "ACTIVATION_PENDING" ||
        record?.status === "DEACTIVATION_PENDING"
          ? false
          : true,
    }),
  };
  
  let approveId = selectedId?.map((e: any) => {
    return e.tid;
  });

  const submitHandlers = (value: any, reason: any) => {
    if (selectedId.length > 0) {
      if (value === "Reject") {
        setIsLoading(true);
        let values = "reject";
        fetchTerminalRejectData(values, approveId);
      } else {
        setIsLoading(true);
        let approveVal = "approve";
        fetchTerminalApproveData(approveVal, approveId, reason);
      }
    } else {
      setApiErrorMsg("Please Select Any One Row");
      setApproveError(true);
      setApiStatus(false);
      setApiMessage(true);
    }
  };

  const closeSearch = () => {
    setSearchArea(false);
    setsearchUserData("");
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const handle_FilteronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminalDataFilter({
      ...terminalDataFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetFilter = () => {
    setTerminalDataFilter({
      agentGrpCode: "",
      branchCode: "",
      mid: "",
      status: "",
      tid: "",
    });
    setErrorMessage(false);
  };

  const handle_FilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      terminalDataFilter?.agentGrpCode.length ||
      terminalDataFilter?.branchCode.length ||
      terminalDataFilter?.mid.length ||
      terminalDataFilter?.tid.length ||
      terminalDataFilter?.status.length
    ) {
      setFilteredArea(true);
      setIsLoading(true);
      dispatch(getTerminalFilter(terminalDataFilter));
      setErrorMessage(false);
      setTableShow(true);
    } else {
      setErrorMessage(true);
    }
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      newDatas = newDatas.filter((e: any) => {
        return (
          e.tid
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.agentGrpCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.branchCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          // e.branchGrpName
          //   ?.toString()
          //   .toUpperCase()
          //   .includes(searchUserData.toUpperCase()) ||
          // e.branchName
          //   ?.toString()
          //   .toUpperCase()
          //   .includes(searchUserData.toUpperCase()) ||
          e.createdDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.deviceId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.deviceName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.deviceModel
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.mid
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.makerId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.makerName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.approverName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.approverId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.status
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      newDatas = newDatas.filter((e: any) => {
        if (
          e[searchCategory]
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const closeCreateErrMessage = () => {
    setCreateErrMessage(false);
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
  
  const handleSearchChange = (e: any) => {
    if (e.target.value.length > 0) {
      setGotoFilter(e.target.value.length);
      setsearchUserData(e.target.value);
    } else {
      setGotoFilter(0);
      setsearchUserData(e.target.value);
    }
  };

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"E-Terminal Dashboard"}
        SummaryFileName={"E-Terminal Dashboard"}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        filter={true}
        searchArea={toggleSearch}
        search={searchArea}
        FieldList={handleList}
        Add={makerAdd}
        AddAction={handleAdd}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : terminalDashboardHeader
        }
        Print={handlePrint}
        TableData={newDatas}
      />

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={apiStatus}
          closeMessage={() => closeMessage()}
          message={apiErrorMsg}
          errorFix={approveError}
        />
      )}
      {searchArea && (
        <div
          className="d-flex user-search mt-3 p-3 cursor"
          style={{ width: "auto" }}
        >
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected hidden className="cursor">
              Select Field
            </option>
            <option value="tid" className="cursor">
              E-Terminal/TID
            </option>
            <option value="agentGrpCode" className="cursor">
              Agent Group Code
            </option>
            <option value="branchCode" className="cursor">
              Branch Code
            </option>
            <option value="deviceId" className="cursor">
              Device ID
            </option>
            <option value="mid" className="cursor">
              MID
            </option>
            <option value="status" className="cursor">
              Status
            </option>
            <option value="makerName" className="cursor">
              Maker Name
            </option>
            <option value="approverName" className="cursor">
              Approver Name
            </option>
            <option value="createdDate" className="cursor">
              Created Date
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            placeholder="Type your search keyword"
            className="ms-1 user-search-input"
            onChange={(ev) => handleSearchChange(ev)}
          />
          <div className="ms-1">
            <Button color="danger kyc-FilterSearchButton btn--sizer">
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
        <form onSubmit={handle_FilterSubmit}>
          <div className="colorWhite Dashboardfilter mt-3 p-3">
            <p className="branchSetupTitle">Filter</p>
            <div className="container-fluid textboxsTerminal">
              {errorMessage && (
                <span className="colorRedUser fieldMandatory">
                  {" "}
                  ** any one field value is mandatory
                </span>
              )}
              <div className="row ">
                <div className="col">
                  <FormGroup>
                    <Label for="exampleSelect">E-Terminal/TID</Label>
                    <Input
                      type="text"
                      name="tid"
                      className="formRadiusBank def_fontsize"
                      value={terminalDataFilter?.tid}
                      onChange={handle_FilteronChange}
                    ></Input>{" "}
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleSelect">Agent Group Code</Label>
                    <Input
                      type="text"
                      name="agentGrpCode"
                      className="formRadiusBank def_fontsize"
                      value={terminalDataFilter?.agentGrpCode}
                      onChange={handle_FilteronChange}
                    ></Input>{" "}
                  </FormGroup>
                </div>
                <div className="col">
                  {" "}
                  <FormGroup>
                    <Label for="exampleEmail">Branch Code</Label>
                    <Input
                      type="text"
                      name="branchCode"
                      className="formRadiusBank def_fontsize"
                      value={terminalDataFilter?.branchCode}
                      onChange={handle_FilteronChange}
                    ></Input>{" "}
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail">MID</Label>
                    <Input
                      type="text"
                      name="mid"
                      className="formRadiusBank def_fontsize"
                      value={terminalDataFilter?.mid}
                      onChange={handle_FilteronChange}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail">Status</Label>
                    <Input
                      type="select"
                      name="status"
                      className="formRadiusBank form-select def_fontsize"
                      value={terminalDataFilter?.status}
                      onChange={handle_FilteronChange}
                    >
                      <option value="" disabled hidden>
                        Select Status
                      </option>
                      <option>ACTIVE</option>
                      <option>INACTIVE</option>
                      <option>ACTIVATION_PENDING</option>
                      <option>DEACTIVATION_PENDING</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="container-fluid buttonboxTerminal d-flex justify-content-end">
              {/* <Button
              color="secondary"
                className="backBtnBank"
                style={{ marginTop: "3px", marginRight: "0px",fontSize:"14px" }}
                onClick={handleResetFilter}
              >
                Reset
              </Button>
              <Button
                color="danger"
                className="nextBtnDashboard"
                style={{ marginTop: "3px",color:"#fff" }}
              >
                Submit
              </Button> */}
              <Button
                color="danger"
                className="kyc-FilterSubmitButton agent-filterBtn me-2"
              >
                Submit
              </Button>
              <Button
                className="kyc-FilterResetButton agent-filterBtn me-2"
                onClick={handleResetFilter}
              >
                Reset
              </Button>
              {/* <button className="container-save border-0 text-white">
                Submit
              </button>
              <button
                type="button"
                className="SubmitCancelButton-cancel border-0 ms-3 form-label-font-size"
                onClick={handleResetFilter}
              >
                Reset
              </button> */}
            </div>
          </div>
        </form>
      )}

      {apiMessage && (
        <div className="">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={terminalDashboardData?.message}
          />
        </div>
      )}

      {createErrMessage && (
        <div className="mb-2">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeCreateErrMessage}
            message={"E-terminal created successfully"}
          />
        </div>
      )}
      <div className="mt-3">
        {toPrint && (
          <span
            className="span-col1"
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
            to confirm and Print !. Or{" "}
            <a
              onClick={cancelPrint}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Cancel
            </a>
          </span>
        )}
      </div>
      <CustomNavigateDashBoard page={"eTerminal"} onClick={navigateTo} />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            {tableShow && (
              <CustomHeader
                rowSelection={checkerLevelOne ? rowSelection : !rowSelection}
                columns={terminalDashboardHeader}
                disableCustomRowSelection={true}
                approval={toPrint || !checkerLevelOne ? false : true}
                reason={true}
                handlesubmit={submitHandlers}
                TableData={
                  columns.length > 0 ? columns : terminalDashboardHeader
                }
                CustomTableHeader={
                  Array.isArray(newDatas) ? newDatas : [newDatas]
                }
                toPrint={toPrint ? true : false}
                DisableMange={true}
                SearchFilterGo={GotoFilter}
              />
            )}
          </Form>
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showDeleteModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
        confirmheader={true}
        approvalReject={
          IsActive
            ? "Are you sure you want to Deactivate this terminal device?"
            : "Are you sure you want to Activate this terminal device?"
        }
      ></DeleteConfirmaionPopUp>
    </div>
  );
};

export default TerminalDashboard;
