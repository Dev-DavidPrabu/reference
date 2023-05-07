import { Select } from "antd";
import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, FormGroup, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import {
  getPrefundDebitReport,
  PrefundDebitDownloadReport,
  resetprefundDebitReport,
  resetprefundDebitReportExcelDownload,
  resetprefundDebitReportPdfDownload,
} from "../../redux/action/PrefundDebitReportAction";

const PrefundDebitReport = () => {
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
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    companyNameDescriptionError: "",
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const PrefunddebitReport = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundDebitReportReducer?.getPrefundDebitReportresponse
  );
  const fetchprefundDebitReport = useCallback(
    (value: any) => {
      dispatch(getPrefundDebitReport(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (PrefunddebitReport?.data) {
      setIsLoading(false);
    }
  }, [PrefunddebitReport]);

  const PrefundDebitDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundDebitReportReducer?.getPrefundDebitDownloadReportPdfResponse
  );
  const PrefundDebitDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundDebitReportReducer
        ?.getPrefundDebitdownloadReportExcelResponse
  );

  useEffect(() => {
    if (PrefundDebitDownloadPdf?.data) {
      setIsLoading(false);
      if (PrefundDebitDownloadPdf?.data?.reportURL) {
        window.location.href = PrefundDebitDownloadPdf?.data?.reportURL;
      }
      dispatch(resetprefundDebitReportPdfDownload());
    } else if (PrefundDebitDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetprefundDebitReportPdfDownload());
    }
  }, [PrefundDebitDownloadPdf]);

  useEffect(() => {
    if (PrefundDebitDownloadExcel?.data) {
      setIsLoading(false);
      if (PrefundDebitDownloadExcel?.data?.reportURL) {
        window.location.href = PrefundDebitDownloadExcel?.data?.reportURL;
      }
      dispatch(resetprefundDebitReportExcelDownload());
    } else if (PrefundDebitDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetprefundDebitReportExcelDownload());
    }
  }, [PrefundDebitDownloadExcel]);
  const fetchprefundDebitDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(PrefundDebitDownloadReport(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );
  let companyData = "comapanyMainatnce";

  const company = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer?.getAllCompanyDataResponse
  );

  const fetchCompany = useCallback(
    (data: any) => {
      try {
        dispatch(getAllCompanyData(data));
      } catch (error) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchCompany(companyData);
  }, [fetchCompany]);
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
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
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
      title: "Total Debit",
      dataIndex: "totalDebit",
      key: "totalDebit",
      sorter: {
        compare: (a: any, b: any) => a.totalDebit.localeCompare(b.totalDebit),
      },
      checked: true,
    },
    {
      title: "Total Count",
      dataIndex: "totalCount",
      key: "totalCount",
      sorter: {
        compare: (a: any, b: any) => a.totalCount.localeCompare(b.totalCount),
      },
      checked: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      checked: true,
    },
  ];
  const reportsData = PrefunddebitReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetprefundDebitReport());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);

  var data = {
    startDate: filterValue.fromDate ? filterValue.fromDate : "",
    endDate: filterValue.toDate ? filterValue.toDate : "",
    companyName: filterValue.companyName ? filterValue.companyName : "",
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
    let companyNameError = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.companyName
    );
    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        companyNameError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartDateError,
        endDateDescriptionError: EndDateError,
        companyNameDescriptionError: companyNameError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      companyNameDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setButton(false);

      setTable(true);
      var record = {
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        companyName: filterValue.companyName,
      };
      fetchprefundDebitReport(record);
      // setFilterValue({
      //   fromDate: filterValue.fromDate,
      //   toDate: filterValue.toDate,
      //   companyName: "ALL",
      // });
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
    resetDatas();
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchprefundDebitDownloadReport(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchprefundDebitDownloadReport(filterValue, fileExcel);
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
          RightContent={"Prefund Debit Report"}
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
                  error.companyNameDescriptionError && (
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
                    className="EcddReport-input ECDDReport-select-box form-control border-0 cursor"
                    value={filterValue.companyName}
                    style={{ height: "38px" }}
                  >
                    <Option value={"ALL"}>ALL</Option>
                    {company &&
                      company.length > 0 &&
                      company.map((value: any) => {
                        return (
                          <Option
                            className="ECDDReport-select-box"
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default PrefundDebitReport;
