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
import {
  AMLTransactionSummaryDownloadReport,
  getAmlTxnSummaryReport,
  resetTxnSummaryReport,
  resetTxnSummaryReportExcelDownload,
  resetTxnSummaryReportPdfDownload,
} from "../../redux/action/AMLTxnSummaryReportAction";
import { getBankSetupCountryRecords } from "../../redux/action/BankSetupCountryAction";
import "./AMLTxnSummaryReport.scss";

const AMLTransactionSummaryReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [countryNames, setCountryNames] = useState("");

  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);

  const [filterValue, setFilterValue] = useState({
    startDate: "",
    endDate: "",
    country: "",
    PaymentMode: "",
    approver: "",
    mobileNumber: "",
    inputCode: "%2b60",
  });
  const { Option } = Select;
  const [error, setError] = useState({
    StartDateDescriptionError: "",
    EndDateDescriptionError: "",
  });
  const dispatch = useDispatch();

  const AmlTXNSummaryReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.AMLTxnSummaryReportReducer?.getAMLTxnSummaryReport
  );

  const fetchAmlTXNSummaryReport = useCallback(
    (value: any) => {
      dispatch(getAmlTxnSummaryReport(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (AmlTXNSummaryReportResponse) {
      setIsLoading(false);
    }
  }, [AmlTXNSummaryReportResponse]);

  const TransactionSummaryReportsPdfDownload = useSelector(
    (state: RootStateOrAny) =>
      state.AMLTxnSummaryReportReducer?.getAMLTxnSummaryDownloadPdfResponseReport
  );
  const TransactionSummaryReportsExcelDownload = useSelector(
    (state: RootStateOrAny) =>
      state.AMLTxnSummaryReportReducer?.getAMLTxnSummaryDownloadExcelResponseReport
  );
  useEffect(() => {
    if (TransactionSummaryReportsPdfDownload?.data) {
      setIsLoading(false);
      if (TransactionSummaryReportsPdfDownload?.data?.reportURL) {
        window.location.href = TransactionSummaryReportsPdfDownload?.data?.reportURL;
      }
      dispatch(resetTxnSummaryReportPdfDownload());
    } else if (TransactionSummaryReportsPdfDownload?.error) {
      setIsLoading(false);
      dispatch(resetTxnSummaryReportPdfDownload());
    }
  }, [TransactionSummaryReportsPdfDownload]);

  useEffect(() => {
    if (TransactionSummaryReportsExcelDownload?.data) {
      setIsLoading(false);
      if (TransactionSummaryReportsExcelDownload?.data?.reportURL) {
        window.location.href = TransactionSummaryReportsExcelDownload?.data?.reportURL;
      }
      dispatch(resetTxnSummaryReportExcelDownload());
    } else if (TransactionSummaryReportsExcelDownload?.error) {
      setIsLoading(false);
      dispatch(resetTxnSummaryReportExcelDownload());
    }
  }, [TransactionSummaryReportsExcelDownload]);

  const CountryCode = useSelector(
    (state: RootStateOrAny) =>
      state.BankSetupCountryReducer?.getBankSetupCountryResponse
  );
  const fetchCountry = useCallback(async () => {
    try {
      dispatch(getBankSetupCountryRecords());
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  const fetchTxnSummaryDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(AMLTransactionSummaryDownloadReport(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );
  const CountryDes = CountryCode?.data;
  const reportsData = AmlTXNSummaryReportResponse;

  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.endDate,
    Country: countryNames,
    PaymentMode: filterValue.PaymentMode,
    Approver: filterValue.approver,
  };

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);

    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      endDate: "",
      country: "",
      PaymentMode: "",
      approver: "",
      mobileNumber: "",
      inputCode: "",
    });
    resetDatas();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setCountryNames("");
    setFilterValue({
      startDate: "",
      endDate: "",
      country: "",
      PaymentMode: "",
      approver: "",
      mobileNumber: "",
      inputCode: "",
    });
    resetDatas();
  };
  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let EndDateError = customValidator(
      "endDate",
      "endDate",
      filterValue.endDate
    );

    if (!(StartDateError === "null" && EndDateError === "null")) {
      setError({
        StartDateDescriptionError: StartDateError,
        EndDateDescriptionError: EndDateError,
      });
      return false;
    }
    setError({
      StartDateDescriptionError: "",
      EndDateDescriptionError: "",
    });
    return true;
  };

  const header = [
    {
      title: "Transaction Ref.No",
      dataIndex: "transactionRefNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNo?.localeCompare(b.transactionRefNo),
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate?.localeCompare(b.transactionDate),
      },
    },

    {
      title: "Approver",
      dataIndex: "approver",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approver?.localeCompare(b.approver),
      },
    },
    {
      title: "Sender Name",
      dataIndex: "senderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderName?.localeCompare(b.senderName),
      },
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverName?.localeCompare(b.receiverName),
      },
    },
    {
      title: "ID Type",
      dataIndex: "idType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType?.localeCompare(b.idType),
      },
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNumber?.localeCompare(b.idNumber),
      },
    },
    {
      title: "ID Issue Country",
      dataIndex: "idIssueCountry",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idIssueCountry?.localeCompare(b.idIssueCountry),
      },
    },

    {
      title: "ID Issue Date",
      dataIndex: "idIssueDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idIssueDate?.localeCompare(b.idIssueDate),
      },
    },
    {
      title: "ID Expiry Date",
      dataIndex: "idExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idExpiryDate?.localeCompare(b.idExpiryDate),
      },
    },
    {
      title: "Sender Amount",
      dataIndex: "senderAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderAmount - b.senderAmount,
      },
    },
    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.serviceCharge - b.serviceCharge,
      },
    },
    {
      title: "Payable Amount",
      dataIndex: "payableAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.payableAmount - b.payableAmount,
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status?.localeCompare(b.status),
      },
    },
    {
      title: "Transaction Location",
      dataIndex: "transactionLocation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionLocation?.localeCompare(b.transactionLocation),
      },
    },
  ];

  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetTxnSummaryReport());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.endDate ? filterValue.endDate : "",
    country: countryNames ? countryNames : "",
    PaymentMode: filterValue.PaymentMode ? filterValue.PaymentMode : "",
    Approver: filterValue.approver ? filterValue.approver : "",
  };
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);

    setCountryNames(obj.code);
    setFilterValue({ ...filterValue, ["country"]: obj.description });
  };

  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.endDate,
        country: countryNames,
        PaymentMode: filterValue.PaymentMode,
        Approver: filterValue.approver,
      };

      fetchAmlTXNSummaryReport(record);
    }
  };

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    fetchTxnSummaryDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    fetchTxnSummaryDownloadReport(data, fileExcel);
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
          RightContent={"Transaction Summary Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite AMLTxnSummaryReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.StartDateDescriptionError &&
                  error.EndDateDescriptionError && (
                    <span className="colorRed">*Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 inputcode btn--sizer form-select"
                      type="select"
                      name="inputCode"
                      onChange={handleChange}
                      value={filterValue.inputCode}
                    >
                      <option value="%2b60">+60</option>
                      <option value="%2b65">+65</option>
                      <option value="%2b91">+91</option>
                    </Input>
                    <Input
                      className="UnblockCardPending-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">From Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.startDate}
                    name="startDate"
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className="AMLTxnSummaryReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.endDate}
                    name="endDate"
                    onChange={handleChange}
                    min={filterValue.startDate}
                    max={dates}
                    className="AMLTxnSummaryReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Country</Label>

                  <Select
                    onChange={handleChangeCode}
                    showSearch
                    filterOption={(input: any, value: any) => {
                      return (
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    id="fieldName1"
                    className="prefund-Account-input AMLTxnSummaryReport-select-box form-control border-0 cursor"
                    value={filterValue.country}
                    style={{ height: "38px" }}
                  >
                    {CountryCode &&
                      CountryCode.data.length > 0 &&
                      CountryCode.data.map((value: any) => {
                        return (
                          <Option
                            className="AMLTxnSummaryReport-select-box"
                            value={JSON.stringify(value)}
                          >
                            {value.description}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Payment Mode</Label>

                  <Input
                    type="select"
                    value={filterValue.PaymentMode}
                    name="PaymentMode"
                    onChange={handleChange}
                    className="form-select AMLTxnSummaryReport-select-box"
                  >
                    <option value="">Select</option>
                    <option value="Bank Account">Bank Account</option>
                    <option value="Cash Pickup">Cash Pickup</option>
                    <option value="Alipay">Alipay</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Approver</Label>

                  <Input
                    type="text"
                    value={filterValue.approver}
                    name="approver"
                    onChange={handleChange}
                    className="AMLTxnSummaryReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <button
                className="generateBtn border-0 LOD_btn_margin"
                onClick={handleSubmit}
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
export default AMLTransactionSummaryReport;
