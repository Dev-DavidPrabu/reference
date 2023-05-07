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
  getPayrollDetailReport,
  PayrollDetailDownloadReport,
  resetpayrollDetailReport,
  resetpayrollDetailReportExcelDownload,
  resetpayrollDetailReportPdfDownload,
} from "../../redux/action/PayrollDetailReportAction";

const PayrollDetailReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [button, setButton] = useState(true);

  const [pdf, setPdf] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    transactionStartDate: "",
    transactionEndDate: "",
    creditingStartDate: "",
    creditingEndDate: "",
    companyName: "ALL",
    postingStartDate: "",
    postingEndDate: "",
  });
  const [error, setError] = useState({
    transactionStartDateDescriptionError: "",
    transactionEndDateDescriptionError: "",
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const PayrollDetailReport = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollDetailReportReducer?.getPayrollDetailReportresponse
  );

  const fetchpayrollDetailReport = useCallback(
    (value: any) => {
      dispatch(getPayrollDetailReport(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (PayrollDetailReport?.data) {
      setIsLoading(false);
    }
  }, [PayrollDetailReport]);

  const PayrollDetailDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollDetailReportReducer
        ?.getPayrollDetailPdfDownloadReportResponse
  );
  const PayrollDetailDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollDetailReportReducer
        ?.getPayrollDetailExcelDownloadReportResponse
  );

  useEffect(() => {
    if (PayrollDetailDownloadPdf?.data) {
      setIsLoading(false);
      if (PayrollDetailDownloadPdf?.data?.reportURL) {
        window.location.href = PayrollDetailDownloadPdf?.data?.reportURL;
      }
      dispatch(resetpayrollDetailReportPdfDownload());
    } else if (PayrollDetailDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetpayrollDetailReportPdfDownload());
    }
  }, [PayrollDetailDownloadPdf]);

  useEffect(() => {
    if (PayrollDetailDownloadExcel?.data) {
      setIsLoading(false);
      if (PayrollDetailDownloadExcel?.data?.reportURL) {
        window.location.href = PayrollDetailDownloadExcel?.data?.reportURL;
      }
      dispatch(resetpayrollDetailReportExcelDownload());
    } else if (PayrollDetailDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetpayrollDetailReportExcelDownload());
    }
  }, [PayrollDetailDownloadExcel]);

  const fetchpayrollDetailDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(PayrollDetailDownloadReport(data, pdf));
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
      title: "Crediting Date",
      dataIndex: "creditingDate",
      key: "creditingDate",
      width:155,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 150,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.creditingDate.localeCompare(b.creditingDate),
      },
      checked: true,
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      width:155,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 150,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate.localeCompare(b.transactionDate),
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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName.localeCompare(b.customerName),
      },
      checked: true,
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
      key: "idNumber",
      sorter: {
        compare: (a: any, b: any) => a.idNumber.localeCompare(b.idNumber),
      },
      checked: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: {
        compare: (a: any, b: any) => a.phoneNumber.localeCompare(b.phoneNumber),
      },
      checked: true,
    },
    {
      title: "Last 4 Digit Card Number",
      dataIndex: "last4DigitCardNumber",
      key: "last4DigitCardNumber",
      sorter: {
        compare: (a: any, b: any) =>
          a.last4DigitCardNumber - b.last4DigitCardNumber,
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
      title: "Transaction Ref No",
      dataIndex: "transactionRefNo",
      key: "transactionRefNo",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNo.localeCompare(b.transactionRefNo),
      },
      checked: true,
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      sorter: {
        compare: (a: any, b: any) => a.paymentId - b.paymentId,
      },
      checked: true,
    },
    {
      title: "Account No",
      dataIndex: "accountNo",
      key: "accountNo",
      sorter: {
        compare: (a: any, b: any) => a.accountNo.localeCompare(b.accountNo),
      },
      checked: true,
    },
    {
      title: "TC Code",
      dataIndex: "tcCode",
      key: "tcCode",
      sorter: {
        compare: (a: any, b: any) => a.tcCode - b.tcCode,
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
      title: "Transaction Description",
      dataIndex: "transactionDescription",
      key: "transactionDescription",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDescription.localeCompare(b.transactionDescription),
      },
      checked: true,
    },
    {
      title: "Unique Id",
      dataIndex: "uniqueId",
      key: "uniqueId",
      sorter: {
        compare: (a: any, b: any) => a.uniqueId - b.uniqueId,
      },
      checked: true,
    },
  ];

  const reportsData = PayrollDetailReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetpayrollDetailReport());
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
        creditingStartDate: filterValue.creditingStartDate,
        creditingEndDate: filterValue.creditingEndDate,
        companyName: filterValue.companyName,
        postingStartDate: filterValue.postingStartDate,
        postingEndDate: filterValue.postingEndDate,
      };
      fetchpayrollDetailReport(record);
      setFilterValue({
        transactionStartDate: filterValue.transactionStartDate,
        transactionEndDate: filterValue.transactionEndDate,
        creditingStartDate: filterValue.creditingStartDate,
        creditingEndDate: filterValue.creditingEndDate,
        companyName: filterValue.companyName,
        postingStartDate: filterValue.postingStartDate,
        postingEndDate: filterValue.postingEndDate, 
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
      transactionStartDate: "",
      transactionEndDate: "",
      creditingStartDate: "",
      creditingEndDate: "",
      companyName: "ALL",
      postingStartDate: "",
      postingEndDate: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);

    setFilterValue({
      transactionStartDate: "",
      transactionEndDate: "",
      creditingStartDate: "",
      creditingEndDate: "",
      companyName: "ALL",
      postingStartDate: "",
      postingEndDate: "",
    });
    resetDatas();
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchpayrollDetailDownloadReport(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchpayrollDetailDownloadReport(filterValue, fileExcel);
  };
  let value = {
    transactionStartDate: filterValue.transactionStartDate,
    transactionEndDate: filterValue.transactionEndDate,
    creditingStartDate: filterValue.creditingStartDate,
    creditingEndDate: filterValue.creditingEndDate,
    companyName: filterValue.companyName,
    postingStartDate: filterValue.postingStartDate,
    postingEndDate: filterValue.postingEndDate,
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
          RightContent={"Payroll Transaction Detail Report​"}
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
                  <Label for="exampleEmail">Crediting Start Date</Label>
                  <Input
                    type="date"
                    value={filterValue.creditingStartDate}
                    name="creditingStartDate"
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className="PayrollCompanyCreationReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Crediting End Date</Label>
                  <Input
                    type="date"
                    value={filterValue.creditingEndDate}
                    name="creditingEndDate"
                    onChange={handleChange}
                    min={filterValue.creditingStartDate}
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
                  >
                    <option></option>
                  </Input>
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
                  >
                    <option></option>
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
                checkLength={reportsData.length}
                scroll={true}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default PayrollDetailReport;
