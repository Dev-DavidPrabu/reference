import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AgentGroup.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Button, Input } from "reactstrap";
import { FaRegEdit, FaReply } from "react-icons/fa";
import "antd/dist/antd.css";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import {
  deleteAgentGroup,
  getAgentGroup,
  getAgentGroupFilter,
  resetCreateMessage,
  resetDeleteAgent,
  resetEditMessage,
} from "../../redux/action/AgentGroupAction";
import { BsEye } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import CustomNavigateDashBoard from "../../Components/CustomNavigateDashBoard/CustomNavigateDashBoard";

function AgentGroup(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(true);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiEditMessage, setApiEditMessage] = useState(false);
  const [deleteAgentMessage, setdeleteAgentMessage] = useState(false);
  const [deleteAgentErrMessage, setdeleteAgentErrMessage] = useState(false);
  const [apiFilterMessage, setapiFilterMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterError, setFilterError] = useState(true);
  const [GotoFilter,setGotoFilter]=useState(0)
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [filterOption, setfilterOption] = useState(false);
  const date = new Date().toLocaleString();
  const [addAgentGroupFilter, setAddAgentGroupFilter] = useState({
    agentGroupName: "",
    agentGroupCode: "",
    status: "",
  });
  

  const Header = [
    {
      title: "Agent Group",
      dataIndex: "agentGroupName",
      key: "agentGroupName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.agentGroupName
            ?.toString()
            .localeCompare(b.agentGroupName?.toString()),
      },
    },
    {
      title: "Agent Code",
      dataIndex: "agentGroupCode",
      key: "agentGroupCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.agentGroupCode
            ?.toString()
            .localeCompare(b.agentGroupCode?.toString()),
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
            className={` ${
              status === "ACTIVE"
                ? "status-validated"
                : status === "INACTIVE" && "status-error"
            }`}
          >
            {status}
          </label>
        );
      },
    },
    {
      title: "Manage",
      render: (_: any, record: any) => (
        <div className="d-flex">
          <div className="d-flex  cursor justify-content-center">
            {record.status == "INACTIVE" && (
              <div
                className={`ms-2 manageButtonView ${
                  record.status === "INPROGRESS"
                    ? "customtable-manage-view"
                    : "disable-background"
                } `}
                onClick={() => handleView(record)}
              >
                <BsEye className=" " />
              </div>
            )}
            {record.status === "ACTIVE" && (
              <>
                <div
                  className={`ms-2 manage-button cursor disable-background`}
                  onClick={() => handleEdit(record)}
                >
                  <FaRegEdit />
                </div>
                <div
                  className={`ms-2 manage-button cursor disable-background`}
                  onClick={() => handleDelete(record)}
                >
                  <AiOutlineDelete />
                </div>
              </>
            )}
          </div>
        </div>
      ),
    },
  ];

  const agentGroupData: any = useSelector(
    (state: RootStateOrAny) =>
      state.AgentGroupReducer.getAllAgentGroupListResponse
  );

  let agentList: any = agentGroupData?.data;

  const agentGroupCreateError: any = useSelector(
    (state: RootStateOrAny) => state.AgentGroupReducer.getAgentGroupCreateError
  );

  const deleteAgent: any = useSelector(
    (state: RootStateOrAny) => state.AgentGroupReducer.getDeleteAgent
  );

  const agentGroupEditError: any = useSelector(
    (state: RootStateOrAny) => state.AgentGroupReducer.getAgentGroupEditError
  );

  const fetchAgentGroupdata = useCallback(async () => {
    try {
      dispatch(getAgentGroup());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAgentGroupdata().then(() => {
      if (!agentGroupData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchAgentGroupdata]);

  useEffect(() => {
    if (agentGroupData) {
      if (agentGroupData?.data) {
        setIsLoading(false);
        setapiFilterMessage(false);
      } else if (agentGroupData?.message) {
        setIsLoading(false);
        setapiFilterMessage(true);
      }
    }
  }, [agentGroupData]);

  useEffect(() => {
    if (agentGroupCreateError?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3000);
    }
  }, [agentGroupCreateError]);

  useEffect(() => {
    if (agentGroupEditError?.data) {
      setApiEditMessage(true);
      setTimeout(function () {
        setApiEditMessage(false);
        dispatch(resetEditMessage());
      }, 3000);
    }
  }, [agentGroupEditError]);

  useEffect(() => {
    if (deleteAgent?.data) {
      setdeleteAgentMessage(true);
      setdeleteAgentErrMessage(false);
      setTimeout(function () {
        setdeleteAgentMessage(false);
        dispatch(resetDeleteAgent());
        window.location.reload();
      }, 5000);
    } else if (deleteAgent?.message) {
      setdeleteAgentErrMessage(true);
      setdeleteAgentMessage(false);
      setTimeout(function () {
        setdeleteAgentErrMessage(false);
        dispatch(resetDeleteAgent());
      }, 5000);
    }
  }, [deleteAgent]);

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setTable(true);
    setAddAgentGroupFilter({
      agentGroupName: "",
      agentGroupCode: "",
      status: "",
    });
    setfilterOption(false);
    setcolumns([]);
    setIsLoading(true);
    fetchAgentGroupdata().then(() => {
    if (!agentGroupData?.data) {
      setIsLoading(true);
    }
  });
  };

  const handleEdit = (e: any) => {
    history.push({
      pathname: "/dashboard/Branch-Management/Agent-Group/Edit-Agent-Group",
      state: {
        value: e,
      },
    });
  };

  const handleView = (e: any) => {
    history.push({
      pathname: "/dashboard/Branch-Management/Agent-Group/Edit-Agent-Group",
      state: {
        value: e,
      },
    });
  };

  const handle_agentAdd = () => {
    history.push({
      pathname: "/dashboard/Branch-Management/Agent-Group/Add-Agent-Group",
      state: {},
    });
  };

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.agentGroupCode).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteAgentGroup(recordId));
      } catch (err) {}
    },
    [dispatch]
  );

  const handlePrint = (data: any) => {
    setSearchArea(false);
    setPrint(!toPrint);
    setcolumns(data);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
  };

  const closeFilterMessage = () => {
    setapiFilterMessage(false);
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeEditMessage = () => {
    setApiEditMessage(false);
  };

  const closeAgentMessage = () => {
    setdeleteAgentMessage(false);
  };

  const closeAgentErrMessage = () => {
    setdeleteAgentErrMessage(false);
  };

  const handle_FilteronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddAgentGroupFilter({
      ...addAgentGroupFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetFilter = () => {
    setAddAgentGroupFilter({
      agentGroupName: "",
      agentGroupCode: "",
      status: "",
    });
    setFilterError(true);
  };

  const handle_FilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      addAgentGroupFilter?.agentGroupName.length ||
      addAgentGroupFilter?.agentGroupCode.length ||
      addAgentGroupFilter?.status.length
    ) {
      setIsLoading(true);
      dispatch(getAgentGroupFilter(addAgentGroupFilter));
      setTable(true);
    } else {
    }
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {

      agentList = agentList.filter((e: any | ToggleSummaryInfo) => {

        return (
          e.agentGroupName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.agentGroupCode
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
      agentList = agentList.filter((e: any | ToggleSummaryInfo) => {
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
  return (
    <div className="AgentGroup">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Agent Group Dashboard"}
          SummaryFileName={"Agent Group Dashboard"}
          SummaryColumn={Header}
          TableData={agentList}
          Print={handlePrint}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={true}
          filterEnabled={filterOption}
          filterArea={toggleFilter}
          Add={true}
          Refresh={true}
          refresh={toggleRefresh}
          AddAction={handle_agentAdd}
        />
      </div>
      {searchArea && (
        <div
          className="d-flex user-search mt-3 p-3 cursor"
          style={{ marginLeft: "20px", marginRight: "15px", width: "auto" }}
        >
          <select
            className=" form-select user-search-drop ms-2 cursor"
            style={{ height: "35px", borderRadius: "0%" }}
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected hidden className="cursor">
              Select Field
            </option>

            <option value="agentGroupName" className="cursor">
              Agent Group
            </option>
            <option value="agentGroupCode" className="cursor">
              Agent Code
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
            style={{ height: "35px", borderRadius: "0%" }}
            placeholder="Type your search keyword"
            className="ms-1 user-search-input"
            onChange={(ev) => handleSearchChange(ev)}
          />
          <div className="ms-1">
            <Button color="danger kyc-FilterSearchButton">Search</Button>
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
        <div
          className="kyc-filterTab kyc-filterHeading mt-2 mb-2 px-4 p-3"
          style={{
            marginLeft: "20px",
            marginRight: "15px",
            width: "auto",
            minHeight: "auto",
          }}
        >
          Filter
          <form onSubmit={handle_FilterSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col d-flex">
                <div className="col-3 me-3">
                  <div className="col">
                    <label className="Kyc-Filterlabel">Agent Group</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      name="agentGroupName"
                      type="text"
                      className="Kyc-FilterINputBox form-input"
                      style={{ height: "35px" }}
                      value={addAgentGroupFilter?.agentGroupName}
                      onChange={handle_FilteronChange}
                    />
                  </div>
                </div>
                <div className="col-3 me-3">
                  <div className="col">
                    <label className="Kyc-Filterlabel">Agent Code</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      name="agentGroupCode"
                      type="text"
                      className="Kyc-FilterINputBox form-input"
                      style={{ height: "35px" }}
                      value={addAgentGroupFilter?.agentGroupCode}
                      onChange={handle_FilteronChange}
                    />
                  </div>
                </div>
                <div className="col-3 me-3">
                  <div className="col">
                    <label className="Kyc-Filterlabel">Status</label>
                  </div>
                  <div className="col me-2">
                    <Input
                      name="status"
                      type="select"
                      className="Kyc-FilterINputBox form-input"
                      style={{ height: "35px", appearance: "auto" }}
                      value={addAgentGroupFilter?.status}
                      onChange={handle_FilteronChange}
                    >
                      <option selected hidden>
                        select
                      </option>
                      <option>ACTIVE</option>
                      <option>INACTIVE</option>
                    </Input>
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="Kyc-Filterlabel"></label>
                  </div>

                  <div className="col  me-2">
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
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {apiFilterMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeFilterMessage}
            message={agentGroupData?.message}
          />
        </div>
      )}
      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Agent Group Created Successfully"}
          />
        </div>
      )}

      {apiEditMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeEditMessage}
            message={"Agent Group Updated Successfully"}
          />
        </div>
      )}

      {deleteAgentMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeAgentMessage}
            message={"Agent Group deleted Successfully"}
          />
        </div>
      )}

      {deleteAgentErrMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeAgentErrMessage}
            message={" " + deleteAgent?.message}
          />
        </div>
      )}

      <CustomLoader isLoading={isLoading} size={50} />
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

      {isLoading ? null : (
        <div className="px-3" ref={componentRef}>
          <CustomNavigateDashBoard page={"agentGroup"} onClick={navigateTo} />
          {
            table &&(  
              <>
            <CustomTable
              TableData={columns.length > 0 ? columns : Header}
              CustomTableHeader={agentList}
              DisableMange={true}
              toPrint={toPrint ? true : false}
              SearchFilterGo={GotoFilter}
            />
            {columns.length > 0 && (
              <p style={{ color: "red", marginTop: "5px" }}>Date : {date}</p>
            )}

            </>
            )
          }
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default AgentGroup;
