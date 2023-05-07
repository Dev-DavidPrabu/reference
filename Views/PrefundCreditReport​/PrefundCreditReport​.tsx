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
  getPrefundCreditReport,
  PrefundCreditDownloadReport,
  resetExcelRecords,
  resetPDFRecords,
  resetprefundCreditReport,
} from "../../redux/action/PrefundCreditReportAction";

const PrefundCreditReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
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
  const PrefundCreditReport = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundCreditReportReducer?.getPrefundCreditReportresponse
  );
  const fetchPrefundCreditReport = useCallback(
    (value: any) => {
      dispatch(getPrefundCreditReport(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (PrefundCreditReport?.data) {
      setIsLoading(false);
    }
  }, [PrefundCreditReport]);

  const PrefundCreditDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundCreditReportReducer?.getPrefundCreditReportPdfResponse
  );
  const PrefundCreditDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundCreditReportReducer?.getPrefundCreditReportExcelResponse
  );
  const fetchprefundCreditDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(PrefundCreditDownloadReport(data, type));
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
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
      checked: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "reg",
      sorter: {
        compare: (a: any, b: any) => a.description.localeCompare(b.description),
      },
      checked: true,
    },
    {
      title: "Total Credit",
      dataIndex: "totalCredit",
      key: "totalCredit",
      sorter: {
        compare: (a: any, b: any) => a.totalCredit.localeCompare(b.totalCredit),
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
  const reportsData = PrefundCreditReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetprefundCreditReport());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);

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
      setButton(false);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        companyName: filterValue.companyName,
      };
      fetchPrefundCreditReport(record);
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
  useEffect(() => {
    if (PrefundCreditDownloadPdf?.data) {
      setIsLoading(false);
      if (PrefundCreditDownloadPdf?.data?.reportURL) {
        window.location.href = PrefundCreditDownloadPdf?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (PrefundCreditDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetPDFRecords());
    }
  }, [PrefundCreditDownloadPdf]);

  useEffect(() => {
    if (PrefundCreditDownloadExcel?.data) {
      setIsLoading(false);
      if (PrefundCreditDownloadExcel?.data?.reportURL) {
        window.location.href = PrefundCreditDownloadExcel?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (PrefundCreditDownloadExcel?.error) {
      setIsLoading(false);

      dispatch(resetExcelRecords());
    }
  }, [PrefundCreditDownloadExcel]);

  const downloadPdf = () => {
    fetchprefundCreditDownloadReport(filterValue, filePdf);
  };

  const downloadExcel = () => {
    fetchprefundCreditDownloadReport(filterValue, fileExcel);
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
          RightContent={"Prefund Credit Report"}
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
                    <span className="colorRed">*Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="filter_all_container">
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

export default PrefundCreditReport;
