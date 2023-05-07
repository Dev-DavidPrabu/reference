import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { Input, FormGroup, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import "./PayrollSummaryReport.scss";
import {
  getPayrolltxnSummaryReport,
  getPayrollTxnSummaryDownlaod,
  ResetPayrollSummaryReport,
  ResetPayrollSummaryDownloadPdf,
  ResetPayrollSummaryDownloadExcel,
} from "../../redux/action/PayroltxnSummaryAction";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import { customValidator } from "../../Constants/Validation";
import { Select } from "antd";

const PayrollSummaryReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);

  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    companyName: "ALL",
  });
  const { Option } = Select;

  const dispatch = useDispatch();
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
  });

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const header = [
    {
      title: "Account No",
      dataIndex: "accountNo",
      key: "accountNo",
      sorter: {
        compare: (a: any, b: any) => a.accountNo - b.accountNo,
      },
      checked: true,
    },

    {
      title: "company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName - b.companyName,
      },
      checked: true,
    },

    

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
      checked: true,
    },
    {
      title: "Error Code",
      dataIndex: "errorCode",
      key: "errorCode",
      sorter: {
        compare: (a: any, b: any) => a.errorCode.localeCompare(b.errorCode),
      },
      checked: true,
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      key: "fileName",
      sorter: {
        compare: (a: any, b: any) => a.fileName.localeCompare(b.fileName),
      },
      checked: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: {
        compare: (a: any, b: any) => a.amount - b.amount,
      },
      checked: true,
    },
    {
      title: "transactionRefNumber",
      dataIndex: "transactionRefNumber",
      key: "transactionRefNumber",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNumber.localeCompare(b.transactionRefNumber),
      },
      checked: true,
    },
  ];
  let companyData = "comapanyMainatnce";

  const CompanyListResponse = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer?.getAllCompanyDataResponse
  );

  let companyNameRes = CompanyListResponse?.map((value: any) => {
    return { ...value };
  });

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

  const PayrollTxnSummaryResponse = useSelector(
    (state: RootStateOrAny) =>
      state.PayroltxnSummaryReducer?.getPayrollTxnSummaryResponse
  );
  const reportsData = PayrollTxnSummaryResponse?.data;

  const PayrollSummaryDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PayroltxnSummaryReducer?.getPayrollTxnSummaryDownloadPdfResponse
  );
  const PayrollSummaryDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PayroltxnSummaryReducer?.getPayrollTxnSummaryDownloadExcelResponse
  );

  useEffect(() => {
    if (PayrollSummaryDownloadPdf?.data) {
      setIsLoading(false);
      if (PayrollSummaryDownloadPdf?.data?.reportURL) {
        window.location.href = PayrollSummaryDownloadPdf?.data?.reportURL;
      }
      dispatch(ResetPayrollSummaryDownloadPdf());
    } else if (PayrollSummaryDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(ResetPayrollSummaryDownloadPdf());
    }
  }, [PayrollSummaryDownloadPdf]);

  useEffect(() => {
    if (PayrollSummaryDownloadExcel?.data) {
      setIsLoading(false);
      if (PayrollSummaryDownloadExcel?.data?.reportURL) {
        window.location.href = PayrollSummaryDownloadExcel?.data?.reportURL;
      }
      dispatch(ResetPayrollSummaryDownloadExcel());
    } else if (PayrollSummaryDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(ResetPayrollSummaryDownloadExcel());
    }
  }, [PayrollSummaryDownloadExcel]);

  const fetchTxnSummaryDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(getPayrollTxnSummaryDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchPayrollSummaryReport = useCallback(
    (value: any) => {
      try {
        dispatch(getPayrolltxnSummaryReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.fromDate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.toDate
    );

    if (!(StartDateError === "null" && EndDateError === "null")) {
      setError({
        startDateDescriptionError: StartDateError,
        endDateDescriptionError: EndDateError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setButton(false);

      setIsLoading(true);
      setTable(true);
      var record = {
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        companyName: filterValue.companyName,
      };
      fetchPayrollSummaryReport(record);
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
    setButton(true);

    setTable(false);
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
    resetPayrollReportData();
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchTxnSummaryDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchTxnSummaryDownload(filterValue, fileExcel);
  };

  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    companyName: filterValue.companyName,
  };

  const resetPayrollReportData = useCallback(async () => {
    try {
      dispatch(ResetPayrollSummaryReport());
    } catch (err) {}
  }, [dispatch]);
  const resetPayrollPdf = useCallback(async () => {
    try {
      dispatch(ResetPayrollSummaryDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetPayrollReportData();
    setTable(false);
  }, [resetPayrollReportData]);
  useEffect(() => {
    resetPayrollPdf();
  }, [resetPayrollPdf]);

  useEffect(() => {
    if (PayrollTxnSummaryResponse?.data) {
      setIsLoading(false);
    }
  }, [PayrollTxnSummaryResponse]);

  const handleChangeCompany = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, companyName: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, companyName: obj.companyName });
    }
    setButton(true);
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
          RightContent={"Payroll Transaction Summary Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite PayrollCompanyCreationReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.endDateDescriptionError && (
                    <span className="colorRed">*Fields are mandatory</span>
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
                    name="fromDate"
                    min={Mindates}
                    max={dates}
                    onChange={handleChange}
                    className="PayrollCompanyCreationReport-input"
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
                    className="PayrollCompanyCreationReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Company Name</Label>
                  <Select
                   showSearch
                    placeholder="Select"
                    onChange={handleChangeCompany}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="EcddReport-input ECDDReport-select-box form-control border-0 cursor"
                    value={filterValue.companyName}
                    style={{ height: "38px" }}
                  >
                    <Option value="ALL">ALL</Option>
                    {companyNameRes &&
                      companyNameRes.length > 0 &&
                      companyNameRes.map((data: any) => {
                        return (
                          <Option
                            className="ECDDReport-select-box"
                            value={JSON.stringify(data)}
                          >
                            {data.companyName}
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default PayrollSummaryReport;
