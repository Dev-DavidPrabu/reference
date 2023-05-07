import { useCallback, useEffect, useState } from "react";
import FileSaver from "file-saver";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import {
  getUamReports,
  getUamDownloadReports,
  resetUamReports,
  resetUamDownlaodPdf,
  resetUamDownlaodExcel,
} from "../../redux/action/UamReportsAction";
import "./UAMreport.scss";

const UAMreport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    fromDate: "",
    todate: "",
    userType: "ALL",
    Status: "ALL",
  });
  const [error, setError] = useState({
    startDateError: "",
    endDateError: "",
  });

  const dispatch = useDispatch();
  const uamReport = useSelector(
    (state: RootStateOrAny) => state.UamReportsReducer?.getUamReportsResponse
  );
  const UamReportDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.UamReportsReducer?.getUamDownloadpdfResponse
  );
  const UamReportDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.UamReportsReducer?.getUamDownloadExcelResponse
  );
  useEffect(() => {
    if (UamReportDownloadPdf?.data) {
      setIsLoading(false);
      if (UamReportDownloadPdf?.data?.reportUrl) {
        window.location.href = UamReportDownloadPdf?.data?.reportUrl;
      }
      dispatch(resetUamDownlaodPdf());
    } else if (UamReportDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetUamDownlaodPdf());
    }
  }, [UamReportDownloadPdf]);

  useEffect(() => {
    if (UamReportDownloadExcel?.data) {
      setIsLoading(false);
      if (UamReportDownloadExcel?.data?.reportUrl) {
        window.location.href = UamReportDownloadExcel?.data?.reportUrl;
      }
      dispatch(resetUamDownlaodExcel());
    } else if (UamReportDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetUamDownlaodExcel());
    }
  }, [UamReportDownloadExcel]);

  const fetchUamReportsResponse = useCallback(
    (value: any) => {
      dispatch(getUamReports(value));
    },
    [dispatch]
  );
  const fetchUamDownloadReports = useCallback(
    (value: any, fileType: any) => {
      dispatch(getUamDownloadReports(value, fileType));
    },
    [dispatch]
  );
  useEffect(() => {
    if (uamReport?.data) {
      setIsLoading(false);
    }
  }, [uamReport]);

  const reportsData = uamReport?.data;
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.fromDate,
    ToDate: filterValue.todate,
    userType: filterValue.userType,
    Status: filterValue.Status,
  };
  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    fetchUamDownloadReports(filterValue, filePdf);
  };

  const downloadExcel = () => {
    fetchUamDownloadReports(filterValue, fileExcel);
  };

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    setButton(true);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setButton(true);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      fromDate: "",
      todate: "",
      userType: "ALL",
      Status: "ALL",
    });
  };
  const resetData = useCallback(async () => {
    try {
      dispatch(resetUamReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      fromDate: "",
      todate: "",
      userType: "ALL",
      Status: "ALL",
    });
    resetData();
  };
  const Validation = () => {
    let fromDate = customValidator(
      "startDate",
      "Start Date",
      filterValue.fromDate
    );
    let toDate = customValidator("startDate", "End Date", filterValue.todate);
    if (!(fromDate === "null" && toDate === "null")) {
      setError({
        startDateError: fromDate,
        endDateError: toDate,
      });
      return false;
    }
    setError({
      startDateError: "",
      endDateError: "",
    });
    return true;
  };
  const header = [
    {
      title: "User Name",
      dataIndex: "userName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName?.localeCompare(b.userName),
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
      title: "User ID",
      dataIndex: "userId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userId?.localeCompare(b.userId),
      },
    },
    {
      title: "Account Created",
      dataIndex: "accountCreated",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountCreated?.localeCompare(b.accountCreated),
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
      title: "User Type",
      dataIndex: "userType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userType?.localeCompare(b.userType),
      },
    },
    {
      title: "User Group",
      dataIndex: "userGroup",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userGroup?.localeCompare(b.userGroup),
      },
    },
    {
      title: "User Group ID",
      dataIndex: "userGroupId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.userGroupId?.localeCompare(b.userGroupId),
      },
    },
    {
      title: "Function Name",
      dataIndex: "functionName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.functionName?.localeCompare(b.functionName),
      },
    },
  ];
  const handleSubmit = () => {
    if (Validation()) {
      setfilterOption(true);
      setTable(true);
      setButton(false);
      setIsLoading(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        fromDate: filterValue.fromDate,
        toDate: filterValue.todate,
        userType: filterValue.userType,
        Status: filterValue.Status,
      };
      fetchUamReportsResponse(record);
      setFilteredArea(true);
      setFilterValue({
        mobileNumber: filterValue.mobileNumber,
        inputCode: filterValue.inputCode,
        fromDate: filterValue.fromDate,
        todate: filterValue.todate,
        userType: filterValue.userType,
        Status: filterValue.Status,
      }); 
    }
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
          RightContent={"UAM Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite UAMreport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {(error.startDateError || error.endDateError) && (
                  <span className="colorRed">
                    *Indicators Fields should be mandatory
                  </span>
                )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 inputcode btn--sizer form-select"
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
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.fromDate}
                    min={Mindates}
                    max={dates}
                    name="fromDate"
                    onChange={handleChange}
                    className="UAMreport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.todate}
                    name="todate"
                    onChange={handleChange}
                    min={filterValue.fromDate}
                    max={dates}
                    className="UAMreport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">User Type</Label>
                  <Input
                    type="select"
                    className="UAMreport-select-box form-select"
                    onChange={handleChange}
                    name="userType"
                    value={filterValue.userType}
                  >
                    <option value="ALL">ALL</option>
                    <option value="COMPANY_USER">COMPANY_USER</option>
                    <option value="STAFF">STAFF</option>
                    <option value="BRANCH_USER">BRANCH_USER</option>
                  </Input>
                </FormGroup>
              </div>

              <div className="status_select_container">
                <FormGroup>
                  <Label for="number">Status</Label>
                  <Input
                    type="select"
                    className="UAMreport-select-box form-select"
                    onChange={handleChange}
                    name="Status"
                    value={filterValue.Status}
                  >
                    <option value="ALL">ALL</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </Input>
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
          <>
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
          </>
        )}
      </>
    </div>
  );
};
export default UAMreport;
