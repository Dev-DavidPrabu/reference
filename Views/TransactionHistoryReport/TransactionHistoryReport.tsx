import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, FormGroup, Label } from "reactstrap";
import { Select } from "antd";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import { getTransactionHistoryReport, getTxnHistoryReportDownlaod, ResetTxnHistoryDownloadExcel, ResetTxnHistoryDownloadPdf, ResetTxnHistoryReport } from "../../redux/action/TransactionHistoryReportAction";
import './TransactionHistoryReport.scss'
const TransactionHistoryReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);

  const [table, setTable] = useState(false);
  const dispatch = useDispatch();
  const { Option } = Select;
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    companyName: "",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
  });

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const header = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => a.dateRange.localeCompare(b.dateRange),
      },
      checked: true,
    },
    {
        title: "Credit Amount",
        dataIndex: "creditAmount",
        key: "creditAmount",
        sorter: {
          compare: (a: any, b: any) => a.creditAmount - b.creditAmount,
        },
        checked: true,
      },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
      checked: true,
    },
    
    {
      title: "Debit Amount",
      dataIndex: "debitAmount",
      key: "debitAmount",
      sorter: {
        compare: (a: any, b: any) =>
          a.debitAmount - b.debitAmount,
      },
      checked: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: {
        compare: (a: any, b: any) => a.description.localeCompare(b.description),
      },
      checked: true,
    },
    {
      title: "Prefund Balance",
      dataIndex: "prefundBalance",
      key: "prefundBalance",
      sorter: {
        compare: (a: any, b: any) =>
          a.prefundBalance - b.prefundBalance,
      },
      checked: true,
    },
    {
        title:"Time",
        dataIndex:"time",
        key:"time",
        sorter: {
            compare: (a: any, b: any) =>
              a.time.localeCompare(b.time),
          },
          checked: true,
    }
  ];
  let companyData = "comapanyMainatnce";

  let CompanyListResponse = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer?.getAllCompanyDataResponse
  );

  const fetchAllCompanyList = useCallback(
    (data: any) => {
      try {
        dispatch(getAllCompanyData(data));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    fetchAllCompanyList(companyData);
  }, [fetchAllCompanyList]);

  const TxnHistoryReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionHistoryReportReducer
        ?.getTransactionHistoryReport
  );

  const reportsData = TxnHistoryReportResponse?.data?.transactionHistoryResponse;
  const fetchTxnHistoryReport = useCallback(
    (value: any) => {
      try {
        dispatch(getTransactionHistoryReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const TxnHistoryDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionHistoryReportReducer
        ?.getTransactionHistoryDownloadPdfResponse
  );
  const TxnHistoryDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionHistoryReportReducer
        ?.getTransactionHistoryDownloadExcelResponse
  );

  useEffect(() => {
    if (TxnHistoryDownloadPdf?.data) {
      setIsLoading(false);
      if (TxnHistoryDownloadPdf?.data?.reportURL) {
        window.location.href = TxnHistoryDownloadPdf?.data?.reportURL;
      }
      dispatch(ResetTxnHistoryDownloadPdf());
    } else if (TxnHistoryDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(ResetTxnHistoryDownloadPdf());
    }
  }, [TxnHistoryDownloadPdf]);

  useEffect(() => {
    if (TxnHistoryDownloadExcel?.data) {
      setIsLoading(false);
      if (TxnHistoryDownloadExcel?.data?.reportURL) {
        window.location.href =
        TxnHistoryDownloadExcel?.data?.reportURL;
      }
      dispatch(ResetTxnHistoryDownloadExcel());
    } else if (TxnHistoryDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(ResetTxnHistoryDownloadExcel());
    }
  }, [TxnHistoryDownloadExcel]);
  const fetchTxnHistoryReportDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(getTxnHistoryReportDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetTxnHistoryReportData = useCallback(async () => {
    try {
      dispatch(ResetTxnHistoryReport());
    } catch (err) {}
  }, [dispatch]);
  
  useEffect(() => {
    ResetTxnHistoryReport();
    setTable(false);
  }, [ResetTxnHistoryReport]);
  

  useEffect(() => {
    if (TxnHistoryReportResponse?.data) {
      setIsLoading(false);
    }
  }, [TxnHistoryReportResponse]);

  const Validation = () => {
    let CompanyNameError = customValidator(
      "startDate",
      "companyName",
      filterValue.companyName
    );
    let StartError = customValidator(
      "startDate",
      "startDate",
      filterValue.fromDate
    );
    let EndError = customValidator("endDate", "endDate", filterValue.toDate);

    if (
      !(
        StartError === "null" &&
        EndError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartError,
        endDateDescriptionError: EndError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
    });
    return true;
  };
  const handleChangeName = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, companyName: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, companyName: obj.companyName });
    }
    setButton(true);
  };
  var data = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    companyName: filterValue.companyName,
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      setButton(false);

      fetchTxnHistoryReport(data);
      setFilterValue({
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        companyName: filterValue.companyName,
      });
    }
  }; 

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    setButton(true);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setButton(true);

    setFilterValue({
      fromDate: "",
      toDate: "",
      companyName: "ALL",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);

    setFilterValue({
      fromDate: "",
      toDate: "",
      companyName: "ALL",
    });
    resetTxnHistoryReportData();
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchTxnHistoryReportDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchTxnHistoryReportDownload(filterValue, fileExcel);
  };
  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    companyName: filterValue.companyName,
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
const TotalAmount =  TxnHistoryReportResponse?.data
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Transaction History Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite TransactionHistoryReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.endDateDescriptionError && (
                    <span className="colorRed">
                      *indicators fields are mandatory
                    </span>
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
                    value={filterValue.fromDate}
                    min={Mindates}
                    max={dates}
                    name="fromDate"
                    onChange={handleChange}
                    className="TransactionHistoryReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.toDate}
                    name="toDate"
                    onChange={handleChange}
                    min={filterValue.fromDate}
                    max={dates}
                    className="TransactionHistoryReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Company Name</Label>
                  <Select
                    showSearch
                    onChange={handleChangeName}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0 
                    }
                    id="fieldName1"
                    className="TransactionHistoryReport-input TransactionHistoryReport-select-box form-control border-0 cursor"
                    value={filterValue.companyName}
                    style={{ height: "38px" }}
                  >
                    {CompanyListResponse &&
                      CompanyListResponse.length > 0 &&
                      CompanyListResponse.map((value: any) => {
                        return (
                          <Option
                            className="TransactionHistoryReport-select-box"
                            value={JSON.stringify(value)}
                          >
                            {value.companyName}
                          </Option>
                        );
                      })}
                  </Select>
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
                TransactionHistoryReport={true}
                TotalAmount={TotalAmount}

              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default TransactionHistoryReport;
