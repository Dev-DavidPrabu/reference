import { Select } from "antd";
import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import {
  getPayrollTxnByCompany,
  PayrollTxnByCompanyDownload,
  resetpayrollTxnByCompany,
  resetpayrollTxnByCompanyExcelDownload,
  resetpayrollTxnByCompanyPdfDownload,
} from "../../redux/action/PayrolltxnByCompanyAction";

const PayrollTxnByCompany = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);

  const [filterValue, setFilterValue] = useState({
    postingStartDate: "",
    postingEndDate: "",
    companyName: "ALL",
  });
  const [error, setError] = useState({
    postingStartDateDescriptionError: "",
    postingEndDateDescriptionError: "",
    companyNameDescriptionError: "",
  });
  const { Option } = Select;
  const dispatch = useDispatch();

  const GetPayrollTxnByCompany = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollTxnByCompanyReducer?.getPayrollTxnByCompanyresponse
  );
  const fetchPayrollTxnByCompany = useCallback(
    (value: any) => {
      dispatch(getPayrollTxnByCompany(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (GetPayrollTxnByCompany?.data) {
      setIsLoading(false);
    }
  }, [GetPayrollTxnByCompany]);

  const PayrollTxnByCompanyDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollTxnByCompanyReducer
        ?.getPayrollTxnByCompanyPdfDownloadReportResponse
  );
  const PayrollTxnByCompanyDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollTxnByCompanyReducer
        ?.getPayrollTxnByCompanyExcelDownloadReportResponse
  );

  useEffect(() => {
    if (PayrollTxnByCompanyDownloadPdf?.data) {
      setIsLoading(false);
      if (PayrollTxnByCompanyDownloadPdf?.data?.reportURL) {
        window.location.href = PayrollTxnByCompanyDownloadPdf?.data?.reportURL;
      }
      dispatch(resetpayrollTxnByCompanyPdfDownload());
    } else if (PayrollTxnByCompanyDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetpayrollTxnByCompanyPdfDownload());
    }
  }, [PayrollTxnByCompanyDownloadPdf]);

  useEffect(() => {
    if (PayrollTxnByCompanyDownloadExcel?.data) {
      setIsLoading(false);
      if (PayrollTxnByCompanyDownloadExcel?.data?.reportURL) {
        window.location.href =
          PayrollTxnByCompanyDownloadExcel?.data?.reportURL;
      }
      dispatch(resetpayrollTxnByCompanyExcelDownload());
    } else if (PayrollTxnByCompanyDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetpayrollTxnByCompanyExcelDownload());
    }
  }, [PayrollTxnByCompanyDownloadExcel]);

  const fetchpayrollTxnByCompanyDownload = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(PayrollTxnByCompanyDownload(data, pdf));
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

  const Validation = () => {
    let PostingStartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.postingStartDate
    );
    let PostingEndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.postingEndDate
    );
    let companyNameError = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.companyName
    );
    if (
      !(
        PostingStartDateError === "null" &&
        PostingEndDateError === "null" &&
        companyNameError === "null"
      )
    ) {
      setError({
        postingStartDateDescriptionError: PostingStartDateError,
        postingEndDateDescriptionError: PostingEndDateError,
        companyNameDescriptionError: companyNameError,
      });
      return false;
    }
    setError({
      postingStartDateDescriptionError: "",
      postingEndDateDescriptionError: "",
      companyNameDescriptionError: "",
    });
    return true;
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    setButton(true);
  };
  let value = {
    postingStartDate: filterValue.postingStartDate,
    postingEndDate: filterValue.postingEndDate,
    companyName: filterValue.companyName,
  };
  const header = [
    {
      title: "Account No",
      dataIndex: "accountNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.account - b.accountNo,
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.amount - b.amount,
      },
    },
    {
      title: "errorCode",
      dataIndex: "errorCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.errorCode.localeCompare(b.errorCode),
      },
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.fileName.localeCompare(b.fileName),
      },
    },
    {
      title: "tcCode",
      dataIndex: "tcCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.tcCode.localeCompare(b.tcCode),
      },
    },
    {
      title: "company Code",
      dataIndex: "companyCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyCode - b.companyCode,
      },
    },
    {
      title: "company Name",
      dataIndex: "companyName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Posting Date",
      dataIndex: "postingDate",
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 150,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) => a.postingDate.localeCompare(b.postingDate),
      },
    },
    {
      title: "Transaction Description",
      dataIndex: "transactionDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDescription.localeCompare(b.transactionDescription),
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Transaction Ref Number",
      dataIndex: "transactionRefNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNumber.localeCompare(b.transactionRefNumber),
      },
    },
    {
      title: "Transaction Status",
      dataIndex: "transactionStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatus.localeCompare(b.transactionStatus),
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType.localeCompare(b.transactionType),
      },
    },
  ];
  let filePdf = "pdf";
  let fileExcel = "Excel";

  const reportsData = GetPayrollTxnByCompany?.data;

  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetpayrollTxnByCompany());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);

  var data = {
    postingStartDate: filterValue.postingStartDate
      ? filterValue.postingStartDate
      : "",
    postingEndDate: filterValue.postingEndDate
      ? filterValue.postingEndDate
      : "",
    companyName: filterValue.companyName ? filterValue.companyName : "",
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setButton(true);
    setTable(false);
    setFilterValue({
      postingStartDate: "",
      postingEndDate: "",
      companyName: "ALL",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);

    setFilterValue({
      postingStartDate: "",
      postingEndDate: "",
      companyName: "ALL",
    });
    resetDatas();
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setButton(false);
      setTable(true);
      var record = {
        postingStartDate: filterValue.postingStartDate,
        postingEndDate: filterValue.postingEndDate,
        companyName: filterValue.companyName,
      };
      fetchPayrollTxnByCompany(record);
    }
  };

  const downloadPdf = () => {
    setIsLoading(true);
    fetchpayrollTxnByCompanyDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchpayrollTxnByCompanyDownload(filterValue, fileExcel);
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
          RightContent={"Payroll Transaction By Company"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite PrefundBalanceByCompany mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.postingStartDateDescriptionError &&
                  error.postingEndDateDescriptionError &&
                  error.companyNameDescriptionError && (
                    <span className="colorRed">
                      *Indicators Fields are mandatory
                    </span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Posting Start Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.postingStartDate}
                    name="postingStartDate"
                    min={Mindates}
                    max={dates}
                    onChange={handleChange}
                    className="PrefundBalanceByCompany-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Posting End Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.postingEndDate}
                    name="postingEndDate"
                    onChange={handleChange}
                    min={filterValue.postingStartDate}
                    max={dates}
                    className="PrefundBalanceByCompany-input"
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
                    className="PrefundBalanceByCompany-input ECDDReport-select-box form-control border-0 cursor"
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
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default PayrollTxnByCompany;
