import FileSaver from "file-saver";
import { useState, useCallback, useEffect } from "react";
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
  getPayrollCompanyReport,
  getPayrollCompanyReportDownlaod,
  ResetPayrollCompanyReport,
  ResetPayrollDownloadExcel,
  ResetPayrollDownloadPdf,
} from "../../redux/action/PayrollCompanyCreationAction";
import "./PayrollComapanyCreation.scss";

const PayrollComapanyCreation = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const { Option } = Select;
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    companyName: "ALL",
    companyCode: "ALL",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    companyNameError: "",
    companyCodeError: "",
  });

  const header = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => a.date?.localeCompare(b.date),
      },
      checked: true,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "name",
      sorter: {
        compare: (a: any, b: any) =>
          a.companyName?.localeCompare(b.companyName),
      },
      checked: true,
    },
    {
      title: "Company Registration Number",
      dataIndex: "companyRegistrationNo",
      key: "reg",
      sorter: {
        compare: (a: any, b: any) =>
          a.companyRegistrationNo?.localeCompare(b.companyRegistrationNo),
      },
      checked: true,
    },
    {
      title: "Company Code",
      dataIndex: "companyCode",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.name?.localeCompare(b.name),
      },
      checked: true,
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.createdBy?.localeCompare(b.createdBy),
      },
      checked: true,
    },
  ];

  let companyData = "comapanyMainatnce";

  let CompanyListResponse = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer?.getAllCompanyDataResponse
  );

  let code: any[] = [];

  if (CompanyListResponse) {
    code = CompanyListResponse?.filter((company: any) => {
      if (company.companyCode !== undefined) {
        return company;
      }
    });
  }
  const uniqueCode = Array.from(new Set(code.map((a) => a.companyCode))).map(
    (companyCode) => {
      return code.find((a) => a.companyCode === companyCode);
    }
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

  const PayrollCompanyReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollCompanyCreationReducer?.getPayrollCompanyReportResponse
  );
  const reportsData = PayrollCompanyReportResponse?.data;

  const fetchPayrollCreationReport = useCallback(
    (value: any) => {
      try {
        dispatch(getPayrollCompanyReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const PayrollCompanyCreationDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollCompanyCreationReducer?.getPayrollReportDownloadPdfResponse
  );
  const PayrollCompanyCreationDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollCompanyCreationReducer?.getPayrollReportDownloadExcelResponse
  );

  useEffect(() => {
    if (PayrollCompanyCreationDownloadPdf?.data) {
      setIsLoading(false);
      if (PayrollCompanyCreationDownloadPdf?.data?.reportURL) {
        window.location.href =
          PayrollCompanyCreationDownloadPdf?.data?.reportURL;
      }
      dispatch(ResetPayrollDownloadPdf());
    } else if (PayrollCompanyCreationDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(ResetPayrollDownloadPdf());
    }
  }, [PayrollCompanyCreationDownloadPdf]);

  useEffect(() => {
    if (PayrollCompanyCreationDownloadExcel?.data) {
      setIsLoading(false);
      if (PayrollCompanyCreationDownloadExcel?.data?.reportURL) {
        window.location.href =
          PayrollCompanyCreationDownloadExcel?.data?.reportURL;
      }
      dispatch(ResetPayrollDownloadExcel());
    } else if (PayrollCompanyCreationDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(ResetPayrollDownloadExcel());
    }
  }, [PayrollCompanyCreationDownloadExcel]);
  const fetchpayrollCompanyDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(getPayrollCompanyReportDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetPayrollReportData = useCallback(async () => {
    try {
      dispatch(ResetPayrollCompanyReport());
    } catch (err) {}
  }, [dispatch]);
  const resetPayrollPdf = useCallback(async () => {
    try {
      dispatch(ResetPayrollDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetPayrollReportData();
    setTable(false);
  }, [resetPayrollReportData]);
  useEffect(() => {
    resetPayrollPdf();
  }, [resetPayrollPdf]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  useEffect(() => {
    if (PayrollCompanyReportResponse?.data) {
      setIsLoading(false);
    }
  }, [PayrollCompanyReportResponse]);

  const downloadPdf = () => {
    setIsLoading(true);
    fetchpayrollCompanyDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchpayrollCompanyDownload(filterValue, fileExcel);
  };

  var data = {
    companyName: filterValue.companyName,
    companyCode: filterValue.companyCode,
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
  };

  const Validation = () => {
    let CompanyNameError = customValidator(
      "startDate",
      "companyName",
      filterValue.companyName
    );
    let CompanyCodeError = customValidator(
      "endDate",
      "companyCode",
      filterValue.companyCode
    );
    let StartError = customValidator(
      "startDate",
      "startDate",
      filterValue.fromDate
    );
    let EndError = customValidator("endDate", "endDate", filterValue.fromDate);

    if (
      !(
        CompanyNameError === "null" &&
        CompanyCodeError === "null" &&
        StartError === "null" &&
        EndError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartError,
        endDateDescriptionError: EndError,
        companyNameError: CompanyNameError,
        companyCodeError: CompanyCodeError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      companyNameError: "",
      companyCodeError: "",
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

  const handleChangeCode = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, companyCode: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, companyCode: obj.companyCode });
    }
    setButton(true);
  };

  const handleSubmit = () => {
    setFilteredArea(true);
    setfilterOption(true);
    setIsLoading(true);
    setTable(true);
    setButton(false);

    fetchPayrollCreationReport(data);

    setFilterValue({
      fromDate: filterValue.fromDate,
      toDate: filterValue.toDate,
      companyName: filterValue.companyName,
      companyCode: filterValue.companyCode, 
    });
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
      companyCode: "ALL",
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
      companyCode: "ALL",
    });
    resetPayrollReportData();
  };

  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    companyName: filterValue.companyName,
    companyCode: filterValue.companyCode,
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
          RightContent={"Payroll Company Creation"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
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
                  error.companyNameError &&
                  error.companyCodeError && (
                    <span className="colorRed">*Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">From Date</Label>
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
                    placeholder="select"
                    onChange={handleChangeName}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="PayrollCompanyCreationReport-input PayrollCompanyCreationReport-select-box form-control border-0 cursor"
                    value={filterValue.companyName}
                    style={{ height: "38px" }}
                  >
                    <Option selected value={"ALL"}>
                      ALL
                    </Option>
                    {CompanyListResponse &&
                      CompanyListResponse.length > 0 &&
                      CompanyListResponse.map((value: any) => {
                        return (
                          <Option
                            className="PayrollCompanyCreationReport-select-box"
                            value={JSON.stringify(value)}
                          >
                            {value.companyName}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Company Code</Label>
                  <Select
                    showSearch
                    placeholder="select"
                    onChange={handleChangeCode}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName2"
                    className="PayrollCompanyCreationReport-input PayrollCompanyCreationReport-select-box form-control border-0 cursor"
                    value={filterValue.companyCode}
                    style={{ height: "38px" }}
                  >
                    <Option value={"ALL"}>ALL</Option>
                    {uniqueCode &&
                      uniqueCode.length > 0 &&
                      uniqueCode.map((value: any) => {
                        return (
                          <Option
                            className="PayrollCompanyCreationReport-select-box"
                            value={JSON.stringify(value)}
                          >
                            {value.companyCode}
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

export default PayrollComapanyCreation;
