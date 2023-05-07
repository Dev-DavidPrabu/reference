import FileSaver from "file-saver";
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
import {
  getTopupReport,
  getTopupReportDownlaod,
  ResetTopupDownloadExcel,
  ResetTopupDownloadPdf,
  ResetTopupReport,
} from "../../redux/action/TopupReconciliationReportAction";
import "./TopupReconciliationReport.scss";

const TopupReconciliationReport = () => {
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
    companyName: "ALL",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    companyNameError: "",
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
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
      checked: true,
    },
    {
      title: "Company Code",
      dataIndex: "companyCode",
      key: "companyCode",
      sorter: {
        compare: (a: any, b: any) => a.companyCode - b.companyCode,
      },
      checked: true,
    },
    {
      title: "Payment Description",
      dataIndex: "paymentDescription",
      key: "paymentDescription",
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentDescription.localeCompare(b.paymentDescription),
      },
      checked: true,
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: {
        compare: (a: any, b: any) => a.count - b.count,
      },
      checked: true,
    },
    {
      title: "Salary Credit Amount",
      dataIndex: "salaryCreditAmount",
      key: "salaryCreditAmount",
      sorter: {
        compare: (a: any, b: any) =>
          a.salaryCreditAmount - b.salaryCreditAmount,
      },
      checked: true,
    },
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

  const TopupReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.TopupReconciliationReportReducer
        ?.getTopupReconciliationReportResponse
  );

  const reportsData = TopupReportResponse?.data?.topUpReconciliationResponse;
  const fetchTopupReport = useCallback(
    (value: any) => {
      try {
        dispatch(getTopupReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const TopupReconciliationDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.TopupReconciliationReportReducer
        ?.getTopupReconciliationDownloadPdfResponse
  );
  const TopupReconciliationDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.TopupReconciliationReportReducer
        ?.getTopupReconciliationDownloadExcelResponse
  );

  useEffect(() => {
    if (TopupReconciliationDownloadPdf?.data) {
      setIsLoading(false);
      if (TopupReconciliationDownloadPdf?.data?.reportURL) {
        window.location.href = TopupReconciliationDownloadPdf?.data?.reportURL;
      }
      dispatch(ResetTopupDownloadPdf());
    } else if (TopupReconciliationDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(ResetTopupDownloadPdf());
    }
  }, [TopupReconciliationDownloadPdf]);

  useEffect(() => {
    if (TopupReconciliationDownloadExcel?.data) {
      setIsLoading(false);
      if (TopupReconciliationDownloadExcel?.data?.reportURL) {
        window.location.href =
          TopupReconciliationDownloadExcel?.data?.reportURL;
      }
      dispatch(ResetTopupDownloadExcel());
    } else if (TopupReconciliationDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(ResetTopupDownloadExcel());
    }
  }, [TopupReconciliationDownloadExcel]);
  const fetchTopupReportDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(getTopupReportDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetTopupReportData = useCallback(async () => {
    try {
      dispatch(ResetTopupReport());
    } catch (err) {}
  }, [dispatch]);
  const resetTopupPdf = useCallback(async () => {
    try {
      dispatch(ResetTopupDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    ResetTopupReport();
    setTable(false);
  }, [ResetTopupReport]);
  useEffect(() => {
    resetTopupPdf();
  }, [resetTopupPdf]);

  useEffect(() => {
    if (TopupReportResponse?.data) {
      setIsLoading(false);
    }
  }, [TopupReportResponse]);

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
        CompanyNameError === "null" &&
        StartError === "null" &&
        EndError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartError,
        endDateDescriptionError: EndError,
        companyNameError: CompanyNameError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      companyNameError: "",
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

      fetchTopupReport(data);
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
    resetTopupReportData();
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchTopupReportDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchTopupReportDownload(filterValue, fileExcel);
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

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Topup Reconciliation Report"}
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
                  error.endDateDescriptionError &&
                  error.companyNameError && (
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
                  <span className="container-body-label-color">*</span>

                  <Select
                    showSearch
                    placeholder="select"
                    onChange={handleChangeName}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="TopupReconciliationReport-input TopupReconciliationReport-select-box form-control border-0 cursor"
                    value={filterValue.companyName}
                    style={{ height: "38px" }}
                  >
                    <Option value={"ALL"}>ALL</Option>
                    {CompanyListResponse &&
                      CompanyListResponse.length > 0 &&
                      CompanyListResponse.map((value: any) => {
                        return (
                          <Option
                            className="TopupReconciliationReport-select-box"
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default TopupReconciliationReport;
