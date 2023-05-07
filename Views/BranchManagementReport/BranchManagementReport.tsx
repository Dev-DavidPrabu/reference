import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Select } from "antd";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import FileSaver from "file-saver";
import {
  getBranchManagementDownload,
  getBranchManagementReport,
  resetBranchManagementReports,
  resetBranchDownloadPdf,
  resetBranchDownloadExcel,
} from "../../redux/action/BranchManagementReportAction";
import "./BranchManagementReport.scss";
import { getAgentGroup } from "../../redux/action/AgentGroupAction";
import { getUserBranchList } from "../../redux/action/UserCreateAction";

const BranchManagementReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [excel, setExcel] = useState(false);
  const [button, setButton] = useState(true);
  const [Mindates, setMinDates] = useState("");
  const { Option } = Select;
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    AgentGroup: "ALL",
    BranchCode: "ALL",
    MID: "",
    TID: "",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    enddateDescriptionError: "",
  });
  const [report, setReport] = useState(false);
  const dispatch = useDispatch();

  const BranchManageReport = useSelector(
    (state: RootStateOrAny) =>
      state.BranchManagementReportReducer?.getBranchManagementResponse
  );

  const GetAgentGroupResponse = useSelector(
    (state: RootStateOrAny) =>
      state.AgentGroupReducer?.getAllAgentGroupListResponse
  );

  let AgentCode = GetAgentGroupResponse?.data;
  const fetchgetAgentGroup = useCallback(() => {
    try {
      dispatch(getAgentGroup());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchgetAgentGroup();
  }, [fetchgetAgentGroup]);

  const BranchListResponse = useSelector(
    (state: RootStateOrAny) =>
      state.UserCreateReducer?.getUserBranchResponseList
  );
  let BranchCodeList = BranchListResponse?.data;
  const fetchBranchList = useCallback(() => {
    try {
      dispatch(getUserBranchList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchBranchList();
  }, [fetchBranchList]);

  useEffect(() => {
    if (BranchManageReport?.data) {
      setTable(true);
      setIsLoading(false);
    }
  }, [BranchManageReport]);

  let reportsData = BranchManageReport?.data;

  const fetchBranchManagementResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getBranchManagementReport(value));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetBranchData = useCallback(async () => {
    try {
      dispatch(resetBranchManagementReports());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetBranchData();
    setTable(false);
  }, [resetBranchData]);
  const resetBranchDownloadReport = useCallback(async () => {
    try {
      dispatch(resetBranchDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  let filePdf = "pdf";
  let fileExcel = "Excel";
  const BranchDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.BranchManagementReportReducer?.getBranchDownloadReportPdf
  );
  const BranchDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.BranchManagementReportReducer?.getBranchDownloadReportExcel
  );
  useEffect(() => {
    if (BranchDownloadPdf?.data) {
      setIsLoading(false);
      if (BranchDownloadPdf?.data?.reportURL) {
        window.location.href = BranchDownloadPdf?.data?.reportURL;
      }
      dispatch(resetBranchDownloadPdf());
    } else if (BranchDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetBranchDownloadPdf());
    }
  }, [BranchDownloadPdf]);

  useEffect(() => {
    if (BranchDownloadExcel?.data) {
      setIsLoading(false);
      if (BranchDownloadExcel?.data?.reportURL) {
        window.location.href = BranchDownloadExcel?.data?.reportURL;
      }
      dispatch(resetBranchDownloadExcel());
    } else if (BranchDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetBranchDownloadExcel());
    }
  }, [BranchDownloadExcel]);

  const fetchBranchMangeDownload = useCallback(
    (value: any, fileType: any) => {
      dispatch(getBranchManagementDownload(value, fileType));
    },
    [dispatch]
  );

  const handleChangeCode = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, BranchCode: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, BranchCode: obj.branchCode });
    }
    setButton(true);
  };

  const handleChangeGroup = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, AgentGroup: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, AgentGroup: obj.agentGroupName });
    }
    setButton(true);
  };

  const downloadPdf = () => {
    fetchBranchMangeDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    fetchBranchMangeDownload(filterValue, fileExcel);
  };

  const pendingWalletDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.WalletUpgradeReducer?.downloadWalletPdfResponse
  );

  useEffect(() => {
    if (pendingWalletDownloadReport) {
      if (pendingWalletDownloadReport?.data) {
        setTable(true);
      }
    }
  }, [pendingWalletDownloadReport]);

  const handleChange = (e: any) => {
    setButton(true);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setButton(true);
    setFilterValue({
      mobileNumber: "",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      AgentGroup: "ALL",
      BranchCode: "ALL",
      MID: "",
      TID: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);
    setFilterValue({
      mobileNumber: "",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      AgentGroup: "ALL",
      BranchCode: "ALL",
      MID: "",
      TID: "",
    });
    resetBranchData();
  };
  const validation = () => {
    let startDate = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let enddate = customValidator("endDate", "enddate", filterValue.enddate);

    if (!(startDate === "null" && enddate === "null")) {
      setError({
        startDateDescriptionError: startDate,
        enddateDescriptionError: enddate,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      enddateDescriptionError: "",
    });
    return true;
  };
  const header = [
    {
      title: "Agent Group",
      dataIndex: "agentGroup",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.agentGroup?.localeCompare(b.agentGroup),
      },
    },
    {
      title: "Agent Code",
      dataIndex: "agentCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.agentCode?.localeCompare(b.agentCode),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status?.localeCompare(b.status),
      },
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchName?.localeCompare(b.branchName),
      },
    },
    {
      title: "Branch Code",
      dataIndex: "branchCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchCode?.localeCompare(b.branchCode),
      },
    },
    {
      title: "TID",
      dataIndex: "tid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.tid?.localeCompare(b.tid),
      },
    },
    {
      title: "Device ID",
      dataIndex: "deviceId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceId?.localeCompare(b.deviceId),
      },
    },
    {
      title: "MID",
      dataIndex: "mid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mid?.localeCompare(b.mid),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Mocker ID",
      dataIndex: "mockerId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mockerId?.localeCompare(b.mockerId),
      },
    },
    {
      title: "Approver ID",
      dataIndex: "approverId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approverId?.localeCompare(b.approverId),
      },
    },
  ];

  const handleSubmit = () => {
    setIsLoading(true);
    setFilteredArea(true);
    setButton(false);
    setfilterOption(true);
    setTable(true);
    var record = {
      mobileNumber: filterValue.mobileNumber
        ? filterValue.inputCode + filterValue.mobileNumber
        : "",
      startDate: filterValue.startDate,
      endDate: filterValue.enddate,
      AgentGroup: filterValue.AgentGroup,
      BranchCode: filterValue.BranchCode,
      MID: filterValue.MID,
      TID: filterValue.TID,
    };
    fetchBranchManagementResponse(record);
    setFilterValue({
      mobileNumber: filterValue.mobileNumber,
      startDate: filterValue.startDate,
      enddate: filterValue.enddate,
      inputCode: filterValue.inputCode,
      AgentGroup: filterValue.AgentGroup,
      BranchCode: filterValue.BranchCode,
      MID: filterValue.MID,
      TID: filterValue.TID,
    });
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.enddate,
    AgentGroup: filterValue.AgentGroup,
    BranchCode: filterValue.BranchCode,
    MID: filterValue.MID,
    TID: filterValue.TID,
  };
  const formatDate = (LastDate: any) => {
    let month = "" + (LastDate.getMonth() + 1);
    let day = "" + LastDate.getDate();
    let year = LastDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  var LastDate = new Date();
  const dates = formatDate(LastDate);
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Branch management report"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          TableData={reportsData}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />
        {filterOption && (
          <div className="colorWhite BranchManagementReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed"></p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 inputcode btn--sizer  form-select"
                      type="select"
                      name="inputCode"
                      onChange={handleChange}
                      value={filterValue.inputCode}
                    >
                      <option value="%2b60">+60</option>
                      <option value="%2b65">+65</option>
                      <option value="%2b91">+91</option>
                    </Input>
                    <Input
                      className="UnblockCardPending-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </div>

              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">From Date</Label>

                  <Input
                    type="date"
                    value={filterValue.startDate}
                    name="startDate"
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className="BranchManagementReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-3">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>

                  <Input
                    type="date"
                    value={filterValue.enddate}
                    name="enddate"
                    onChange={handleChange}
                    min={filterValue.startDate}
                    max={dates}
                    className="BranchManagementReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Agent Group</Label>
                  <Select
                    showSearch
                    onChange={handleChangeGroup}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    value={filterValue.AgentGroup}
                    className="BranchManagementReport-select form-control border-0 cursor"
                    style={{ height: "38px" }}
                  >
                    <Option value={"ALL"}>ALL</Option>
                    {AgentCode &&
                      AgentCode.length > 0 &&
                      AgentCode?.map((value: any) => {
                        return (
                          <Option value={JSON.stringify(value)}>
                            {value.agentGroupName}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Branch Code</Label>
                  <Select
                    showSearch
                    onChange={handleChangeCode}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    value={filterValue.BranchCode}
                    className="BranchManagementReport-select form-control border-0 cursor"
                    style={{ height: "38px" }}
                  >
                    <Option value={"ALL"}>ALL</Option>
                    {BranchCodeList &&
                      BranchCodeList.length > 0 &&
                      BranchCodeList?.map((value: any) => {
                        return (
                          <Option value={JSON.stringify(value)}>
                            {value.branchCode}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="text">MID</Label>
                  <Input
                    className="BranchManagementReport-input"
                    type="text"
                    onChange={handleChange}
                    name="MID"
                    value={filterValue.MID}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="text">TID</Label>
                  <Input
                    className="BranchManagementReport-input"
                    type="text"
                    onChange={handleChange}
                    name="TID"
                    value={filterValue.TID}
                  ></Input>
                </FormGroup>
              </div>

              <button
                className={`${
                  button
                    ? "generateBtn border-0 LOD_btn_margin"
                    : "disableButton LOD_btn_margin"
                }`}
                onClick={handleSubmit}
                disabled={button ? false : true}
              >
                Load Data
              </button>
            </div>
          </div>
        )}
        {filteredArea && <FiltersSelected value={value} />}
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <div className="mt-3">
            {table && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : header}
                CustomTableHeader={reportsData}
                DisableMange={true}
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default BranchManagementReport;
