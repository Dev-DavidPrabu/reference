import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import {
  getAvgMonthlyTransactionReport,
  getAvgMonthlyTransactionReportDownload,
  resetAvgMonthlyTransactionDownloadExcel,
  resetAvgMonthlyTransactionDownloadPdf,
  resetAvgMonthlyTransactionReports,
} from "../../redux/action/AvgMonthlyTxnReportAction";
import { getMonthlyTransactionReport } from "../../redux/action/MonthlyTransactionReportAction";

const AvgDailyMonthlyTransactionReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState({
    FromDate: "",
    ToDate: "",
    TransactionType: "ALL",
    Status: "ALL",
  });
  const [error, setError] = useState({
    FromDateDescriptionError: "",
    ToDateDescriptionError: "",
  });
  const dispatch = useDispatch();

  const AvgMonthlyTransactionReportData = useSelector(
    (state: RootStateOrAny) =>
      state.AvgMonthlyTransactionReportReducer?.getAvgMonthlyTransactionResponse
  );
  const AvgMonthlyTransactionDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.AvgMonthlyTransactionReportReducer
        ?.getAvgMonthlyTransactionDownloadPdfResponse
  );
  const AvgMonthlyTransactionDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.AvgMonthlyTransactionReportReducer
        ?.getAvgMonthlyTransactionDownloadExcelResponse
  );

  useEffect(() => {
    if (AvgMonthlyTransactionDownloadPdf?.data) {
      setIsLoading(false);
      if (AvgMonthlyTransactionDownloadPdf?.data?.reportURL) {
        window.location.href =
          AvgMonthlyTransactionDownloadPdf?.data?.reportURL;
      }
      dispatch(resetAvgMonthlyTransactionDownloadPdf());
    } else if (AvgMonthlyTransactionDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetAvgMonthlyTransactionDownloadPdf());
    }
  }, [AvgMonthlyTransactionDownloadPdf]);

  useEffect(() => {
    if (AvgMonthlyTransactionDownloadExcel?.data) {
      setIsLoading(false);
      if (AvgMonthlyTransactionDownloadExcel?.data?.reportURL) {
        window.location.href =
          AvgMonthlyTransactionDownloadExcel?.data?.reportURL;
      }
      dispatch(resetAvgMonthlyTransactionDownloadExcel());
    } else if (AvgMonthlyTransactionDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetAvgMonthlyTransactionDownloadExcel());
    }
  }, [AvgMonthlyTransactionDownloadExcel]);

  const fetchAvgMonthlyTransactionReport = useCallback(
    (value: any) => {
      try {
        dispatch(getAvgMonthlyTransactionReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetAvgMonthlyTransaction = useCallback(() => {
    try {
      dispatch(resetAvgMonthlyTransactionReports());
    } catch (err) {}
  }, [dispatch]);

  const fetchAvgMonthlyTransactionDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(getAvgMonthlyTransactionReportDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (AvgMonthlyTransactionReportData?.data) {
      setIsLoading(false);
    }
  }, [AvgMonthlyTransactionReportData]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  var data = {
    fromDate: filterValue.FromDate,
    toDate: filterValue.ToDate,
    status: filterValue.Status,
    transactionType: filterValue.TransactionType,
  };

  const downloadPdf = () => {
    fetchAvgMonthlyTransactionDownload(data, filePdf);
  };

  const downloadExcel = () => {
    fetchAvgMonthlyTransactionDownload(data, fileExcel);
  };
  const reportsData = AvgMonthlyTransactionReportData?.data;
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      FromDate: "",
      ToDate: "",
      TransactionType: "",
      Status: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      FromDate: "",
      ToDate: "",
      TransactionType: "",
      Status: "",
    });
  };
  const Validation = () => {
    let FromDate = customValidator(
      "startDate",
      "startDate",
      filterValue.FromDate
    );
    let ToDate = customValidator("startDate", "startDate", filterValue.ToDate);
    if (!(FromDate === "null" && ToDate === "null")) {
      setError({
        FromDateDescriptionError: FromDate,
        ToDateDescriptionError: ToDate,
      });
      return false;
    }
    setError({
      FromDateDescriptionError: "",
      ToDateDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        fromDate: filterValue.FromDate,
        toDate: filterValue.ToDate,
        status: filterValue.Status,
        transactionType: filterValue.TransactionType,
      };
      fetchAvgMonthlyTransactionReport(record);
    }
  };
  const header = [
    {
      title: "Country",
      dataIndex: "country",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.country?.localeCompare(b.country),
      },
    },
    {
      title: "Average Daily Transactions",
      dataIndex: "avgDailyTransactions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.avgDailyTransactions - b.avgDailyTransactions,
      },
    },
    {
      title: "Average Daily Amount",
      dataIndex: "avgDailyAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.avgDailyAmount - b.avgDailyAmount,
      },
    },
    {
      title: "Total Service Charge",
      dataIndex: "totalServiceCharges",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalServiceCharges - b.totalServiceCharges,
      },
    },
    {
      title: "GST",
      dataIndex: "gst",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.gst - b.gst,
      },
    },
    {
      title: "Monthly Transaction",
      dataIndex: "monthlyTransactions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.monthlyTransactions - b.monthlyTransactions,
      },
    },
    {
      title: "Monthly Amount",
      dataIndex: "monthlyAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.monthlyAmount - b.monthlyAmount,
      },
    },
    {
      title: "Previous Month Transaction",
      dataIndex: "previousMonthTransactions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.PrevmonthTxn - b.PrevmonthTxn,
      },
    },
    {
      title: "Previous Month Amount",
      dataIndex: "previousMonthAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.previousMonthAmount - b.previousMonthAmount,
      },
    },
    {
      title: "Growth",
      dataIndex: "growth",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.growth - b.growth,
      },
    },
    {
      title: "Growth % age",
      dataIndex: "percentageGrowth",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.percentageGrowth - b.percentageGrowth,
      },
    },
  ];

  let value = {
    FromDate: filterValue.FromDate,
    ToDate: filterValue.ToDate,
    TransactionType: filterValue.TransactionType,
    Status: filterValue.Status,
  };
  const formatDate = (LastDate: any) => {
    let month = "" + (LastDate.getMonth() + 1);
    let day = "" + LastDate.getDate();
    let year = LastDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  var future = new Date (filterValue.FromDate);
  var LastDate = new Date(future.setDate(future.getDate() + 30));
  const dates = formatDate(LastDate);
  var firstDate = new Date();
  const maximum = formatDate(firstDate);
  
  //if(filterValue.FromDate == )
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Average Monthly Transaction Report"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite PayrollCompanyCreationReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.FromDateDescriptionError &&
                  error.ToDateDescriptionError && (
                    <span className="colorRed">* Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">From Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.FromDate}
                    name="FromDate"
                    onChange={handleChange}
                    className="PayrollCompanyCreationReport-input"
                    min={Mindates}
                   max={maximum}
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.ToDate}
                    name="ToDate"
                    onChange={handleChange}
                    min={filterValue.FromDate}
                    max={dates}
                    className="PayrollCompanyCreationReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Transaction Type</Label>
                  <Input
                    type="select"
                    value={filterValue.TransactionType}
                    name="TransactionType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="ALL">ALL</option>
                    <option value="MTA">MTA</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="status_select_container">
                <FormGroup>
                  <Label for="exampleEmail">Status</Label>
                  <Input
                    type="select"
                    value={filterValue.Status}
                    name="Status"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="ALL">ALL</option>
                    <option value="Paid">Paid</option>
                    <option value="Void">Void</option>
                    <option value="Refundrequest">Refund request</option>
                    <option value="Reprocessed">Reprocessed</option>
                    <option value="Refund">Refund</option>
                    <option value="Hold">Hold</option>
                    <option value="MIRSApprovalError">MIRS Approval Error</option>
                    <option value="MIRSerror">MIRS error</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                  </Input>
                </FormGroup>
              </div>
              <button
                className="generateBtn border-0 LOD_btn_margin"
                onClick={handleSubmit}
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
                scroll={true}
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default AvgDailyMonthlyTransactionReport;
