import { Select } from "antd";
import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Input, FormGroup, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import {
  resetReconciliationDownloadPdf,
  resetReconciliationReports,
  PrefundReconciliationReport,
  DownloadReconciliationReport,
  resetReconciliationDownloadExcel,
} from "../../redux/action/PrefundReconciliationReportsAction";
import "./PrefundReconciliationReport.scss";

const PrefundReconciliationReports = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);
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
    nameError: "",
  });
  const dispatch = useDispatch();

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const header = [
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
      title: "Prefund Amount",
      dataIndex: "prefundAmount",
      key: "prefundAmount",
      sorter: {
        compare: (a: any, b: any) =>
          a.prefundAmount.localeCompare(b.prefundAmount),
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
        compare: (a: any, b: any) => a.companyCode.localeCompare(b.companyCode),
      },
      checked: true,
    },
   
  ];

  const fetchPreconciliationReport = useCallback(
    (value: any) => {
      dispatch(PrefundReconciliationReport(value));
    },
    [dispatch]
  );
  const resetPreconciliationReport = useCallback(() => {
    try {
      dispatch(resetReconciliationReports());
    } catch (err) {}
  }, [dispatch]);

  const fetchPreconciliationDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(DownloadReconciliationReport(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetPreconciliationPdf = useCallback(() => {
    try {
      dispatch(resetReconciliationDownloadPdf());
    } catch (err) {}
  }, [dispatch]);

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );
  const PrefundReconciliationReportData = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundReconciliationReportReducer?.getReconciliationResponseReport
  );
  const PrefundReconciliationDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundReconciliationReportReducer
        ?.getReconciliationDownloadPdfResponse
  );
  const PrefundReconciliationDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundReconciliationReportReducer
        ?.getReconciliationDownloadExcelResponse
  );

  useEffect(() => {
    if (PrefundReconciliationDownloadPdf?.data) {
      setIsLoading(false);
      if (PrefundReconciliationDownloadPdf?.data?.reportURL) {
        window.location.href =
          PrefundReconciliationDownloadPdf?.data?.reportURL;
      }
      dispatch(resetReconciliationDownloadPdf());
    } else if (PrefundReconciliationDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetReconciliationDownloadPdf());
    }
  }, [PrefundReconciliationDownloadPdf]);

  useEffect(() => {
    if (PrefundReconciliationDownloadExcel?.data) {
      setIsLoading(false);
      if (PrefundReconciliationDownloadExcel?.data?.reportURL) {
        window.location.href =
          PrefundReconciliationDownloadExcel?.data?.reportURL;
      }
      dispatch(resetReconciliationDownloadExcel());
    } else if (PrefundReconciliationDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetReconciliationDownloadExcel());
    }
  }, [PrefundReconciliationDownloadExcel]);
  const fetchAllCompanyName = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllCompanyName();
  }, [fetchAllCompanyName]);

  useEffect(() => {
    if (PrefundReconciliationReportData?.data?.prefundReconciliationResponse) {
      setIsLoading(false);
    }
  }, [PrefundReconciliationReportData]);

  const reportsData =
    PrefundReconciliationReportData?.data?.prefundReconciliationResponse;

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
    let NameError = customValidator(
      "endDate",
      "CardError",
      filterValue.companyName
    );

    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        NameError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartDateError,
        endDateDescriptionError: EndDateError,
        nameError: NameError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      nameError: "",
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
      fetchPreconciliationReport(record);
      setFilterValue({
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        companyName: filterValue.companyName,
      });
    }
  };

  const handleChange = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, companyName: "ALL" });
    } else {
      setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    }
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
    resetPreconciliationReport();
  };
  const downloadPdf = () => {
    fetchPreconciliationDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    fetchPreconciliationDownload(filterValue, fileExcel);
  };
  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    companyName: filterValue.companyName,
  };

  useEffect(() => {
    resetPreconciliationPdf();
    setTable(false);
  }, [resetPreconciliationPdf]);

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
  const TotalAmount = PrefundReconciliationReportData?.data;

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Prefund Reconciliation Report"}
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
                  error.nameError && (
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
                  <Input
                    type="select"
                    value={filterValue.companyName}
                    name="companyName"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option selected>ALL</option>
                    {companyGetData &&
                      companyGetData?.map((option: any, index: any) => {
                        return (
                          <option key={index} value={option.companyName}>
                            {option.companyName}
                          </option>
                        );
                      })}
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
          <div className="mt-3">
            {table && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : header}
                CustomTableHeader={reportsData}
                DisableMange={true}
                PrefundTable={true}
                TotalAmount={TotalAmount}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default PrefundReconciliationReports;
