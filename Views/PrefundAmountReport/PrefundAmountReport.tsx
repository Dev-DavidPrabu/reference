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
  getPrefundAmountReport,
  PrefundAmountDownloadReport,
  resetprefundAmountReport,
  resetprefundAmountReportExcelDownload,
  resetprefundAmountReportPdfDownload,
} from "../../redux/action/PrefundAmountReportAction";
import "./PrefundAmountReport.scss";

const PrefundAmountReport = () => {
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
    transactionStartDate: "",
    transactionEndDate: "",
    postingStartDate: "",
    postingEndDate: "",
    companyName: "ALL",
  });
  const [error, setError] = useState({
    transactionStartDateDescriptionError: "",
    transactionEndDateDescriptionError: "",
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const PrefundamountReport = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundAmountReportReducer?.getPrefundAmountReportresponse
  );
  const fetchprefundamountReport = useCallback(
    (value: any) => {
      dispatch(getPrefundAmountReport(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (PrefundamountReport?.data) {
      setIsLoading(false);
    }
  }, [PrefundamountReport]);

  const PrefundAmountDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundAmountReportReducer
        ?.getPrefundAmountDownloadReportPdfResponse
  );
  const PrefundAmountDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PrefundAmountReportReducer
        ?.getPrefundAmountDownloadReportExcelResponse
  );

  useEffect(() => {
    if (PrefundAmountDownloadPdf?.data) {
      setIsLoading(false);
      if (PrefundAmountDownloadPdf?.data?.reportURL) {
        window.location.href = PrefundAmountDownloadPdf?.data?.reportURL;
      }
      dispatch(resetprefundAmountReportPdfDownload());
    } else if (PrefundAmountDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetprefundAmountReportPdfDownload());
    }
  }, [PrefundAmountDownloadPdf]);

  useEffect(() => {
    if (PrefundAmountDownloadExcel?.data) {
      setIsLoading(false);
      if (PrefundAmountDownloadExcel?.data?.reportURL) {
        window.location.href = PrefundAmountDownloadExcel?.data?.reportURL;
      }
      dispatch(resetprefundAmountReportExcelDownload());
    } else if (PrefundAmountDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetprefundAmountReportExcelDownload());
    }
  }, [PrefundAmountDownloadExcel]);

  const fetchprefundamountDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(PrefundAmountDownloadReport(data, pdf));
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
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStartDate - b.transactionStartDate,
      },
      checked: true,
    },
    {
      title: "Posting Date",
      dataIndex: "postingDate",
      key: "postingDate",
      sorter: {
        compare: (a: any, b: any) => a.postingDate.localeCompare(b.postingDate),
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
      title: "Transaction Ref No",
      dataIndex: "transactionRefNumber",
      key: "transactionRefNumber",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNumber.localeCompare(b.transactionRefNumber),
      },
      checked: true,
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType.localeCompare(b.transactionType),
      },
      checked: true,
    },
    {
      title: "Transaction Status",
      dataIndex: "transactionStatus",
      key: "transactionStatus",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatus.localeCompare(b.transactionStatus),
      },
      checked: true,
    },
    {
      title: "Prefund Amount",
      dataIndex: "prefundAmount",
      key: "prefundAmount",
      sorter: {
        compare: (a: any, b: any) => a.prefundAmount - b.prefundAmount,
      },
      checked: true,
    },
  ];

  const reportsData = PrefundamountReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetprefundAmountReport());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);
  var data = {
    transactionStartDate: filterValue.transactionStartDate
      ? filterValue.transactionStartDate
      : "",
    transactionEndDate: filterValue.transactionEndDate
      ? filterValue.transactionEndDate
      : "",
    postingStartDate: filterValue.postingStartDate
      ? filterValue.postingStartDate
      : "",
    postingEndtDate: filterValue.postingEndDate
      ? filterValue.postingEndDate
      : "",
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
    let TxnStartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.transactionStartDate
    );
    let TxnEndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.transactionEndDate
    );
    let postingStartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.postingStartDate
    );
    let postingEndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.postingEndDate
    );
    let companyNameError = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.companyName
    );
    if (!(TxnStartDateError === "null" && TxnEndDateError === "null")) {
      setError({
        transactionStartDateDescriptionError: TxnStartDateError,
        transactionEndDateDescriptionError: TxnEndDateError,
      });
      return false;
    }
    setError({
      transactionStartDateDescriptionError: "",
      transactionEndDateDescriptionError: "",
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
        transactionStartDate: filterValue.transactionStartDate,
        transactionEndDate: filterValue.transactionEndDate,
        postingStartDate: filterValue.postingStartDate,
        postingEndDate: filterValue.postingEndDate,
        companyName: filterValue.companyName,
      };
      fetchprefundamountReport(record);
      // setFilterValue({
      //   transactionStartDate: filterValue.transactionStartDate,
      //   transactionEndDate: filterValue.transactionEndDate,
      //   postingStartDate: filterValue.postingStartDate,
      //   postingEndDate: filterValue.postingEndDate,
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
      transactionStartDate: "",
      transactionEndDate: "",
      postingStartDate: "",
      postingEndDate: "",
      companyName: "ALL",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setButton(true);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      transactionStartDate: "",
      transactionEndDate: "",
      postingStartDate: "",
      postingEndDate: "",
      companyName: "ALL",
    });
    resetDatas();
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchprefundamountDownloadReport(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchprefundamountDownloadReport(filterValue, fileExcel);
  };
  let value = {
    transactionStartDate: filterValue.transactionStartDate,
    transactionEndDate: filterValue.transactionEndDate,
    postingStartDate: filterValue.postingStartDate,
    postingEndtDate: filterValue.postingEndDate,
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
          RightContent={"Prefund Amount Report"}
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
                {error.transactionStartDateDescriptionError &&
                  error.transactionEndDateDescriptionError && (
                    <span className="colorRed">* Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Transaction Start Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.transactionStartDate}
                    name="transactionStartDate"
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className="PayrollCompanyCreationReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Transaction End Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.transactionEndDate}
                    name="transactionEndDate"
                    onChange={handleChange}
                    min={filterValue.transactionStartDate}
                    max={dates}
                    className="PayrollCompanyCreationReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Posting Start Date</Label>
                  <Input
                    type="date"
                    value={filterValue.postingStartDate}
                    name="postingStartDate"
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className="PayrollCompanyCreationReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Posting End Date</Label>
                  <Input
                    type="date"
                    value={filterValue.postingEndDate}
                    name="postingEndDate"
                    onChange={handleChange}
                    min={filterValue.postingStartDate}
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

export default PrefundAmountReport;
