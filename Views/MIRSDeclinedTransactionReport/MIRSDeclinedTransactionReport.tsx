import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import { Select } from "antd";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { getBankSetupCountryRecords } from "../../redux/action/BankSetupCountryAction";
import {
  getMirsDeclinedTransaction,
  getMirsDeclinedTransactionPdf,
  resetMirsDeclinedTransaction,
  resetMirsDeclinedTransactionExcelDownload,
  resetMirsDeclinedTransactionPdfDownload,
} from "../../redux/action/MirsDeclinedTransactionAction";
import "./MIRSDeclinedTransactionReport.scss";

const MIRSDeclinedTransactionReport = () => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [countryNames, setCountryNames] = useState("ALL");
  const [report, setReport] = useState(false);
  const { Option } = Select;
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    paymentMode: "ALL",
    countryDescription: countryNames,
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    enddateDescriptionError: "",
    paymentMethodDescriptionError: "",
  });
  const handleChange = (e: any) => {
    setReport(true);
    setFilteredArea(false);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "",
      paymentMode: "",
      countryDescription: "",
    });
    resetData();
  };
  const handleChangeCode = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, ["countryDescription"]: "ALL" });
    }else{
    let obj = JSON.parse(e);
    setCountryNames(obj.code);
    setFilterValue({ ...filterValue, ["countryDescription"]: obj.description });
  };
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setCountryNames("");
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "",
      paymentMode: "ALL",
      countryDescription: "",
    });
    resetData();
  };

  const header = [
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentMode?.localeCompare(b.paymentMode),
      },
    },
    {
      title: "Txn Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate?.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Declined On",
      dataIndex: "declinedOn",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.declinedOn?.localeCompare(b.declinedOn),
      },
    },
    {
      title: "Txn Ref No",
      dataIndex: "transactionReferenceNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReferenceNo?.localeCompare(b.transactionReferenceNo),
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userId?.localeCompare(b.userId),
      },
    },
    {
      title: "Declined By",
      dataIndex: "declinedBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.declinedBy?.localeCompare(b.declinedBy),
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.country?.localeCompare(b.country),
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
      title: "Passport/IC No",
      dataIndex: "passport",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.passport?.localeCompare(b.passport),
      },
    },
    {
      title: "Declined Amount",
      dataIndex: "declinedAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.declinedAmount?.localeCompare(b.declinedAmount),
      },
    },
    {
      title: "Reason",
      dataIndex: "reason",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.reason?.localeCompare(b.reason),
      },
    },
    {
      title: "CardHolder Name",
      dataIndex: "cardholderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardholderName?.localeCompare(b.cardholderName),
      },
    },
    {
      title: "URN",
      dataIndex: "urnNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urnNo?.localeCompare(b.urnNo),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
  ];

  const fetchCountryCode = useCallback(async () => {
    try {
      dispatch(getBankSetupCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  const CountryCodeReport: any = useSelector(
    (state: RootStateOrAny) =>
      state.BankSetupCountryReducer?.getBankSetupCountryResponse
  );
  let countryCode = CountryCodeReport?.data;

  useEffect(() => {
    fetchCountryCode();
  }, [fetchCountryCode]);

  const resetData = useCallback(async () => {
    try {
      dispatch(resetMirsDeclinedTransaction());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const MirsDeclinedReport: any = useSelector(
    (state: RootStateOrAny) =>
      state.MirsDeclinedTransactionReducer.getMirsTransactionReportsResponse
  );
  const reportsData = MirsDeclinedReport?.data;

  useEffect(() => {
    if (MirsDeclinedReport) {
      if (MirsDeclinedReport?.data) {
        setIsLoading(false);
      }
    }
  }, [MirsDeclinedReport]);

  const fetchMirsDeclinedTransactionReport = useCallback(
    async (filterValue: any) => {
      try {
        dispatch(getMirsDeclinedTransaction(filterValue));
      } catch (err) {}
    },
    [dispatch]
  );

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
    paymentMode: filterValue.paymentMode ? filterValue.paymentMode : "",
    countryDescription: countryNames ? countryNames : "",
  };
  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.enddate
    );
    let paymentError = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.paymentMode
    );
    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        paymentError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartDateError,
        enddateDescriptionError: EndDateError,
        paymentMethodDescriptionError: paymentError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      enddateDescriptionError: "",
      paymentMethodDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      setReport(false);
      setCountryNames("ALL")
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.enddate,
        paymentMode: filterValue.paymentMode,
        country: countryNames,
      };
      fetchMirsDeclinedTransactionReport(record);
    }
  };

  const fetchMirsTransactionDownloadPdf = useCallback(
    async (data: any, fileType) => {
      try {
        dispatch(getMirsDeclinedTransactionPdf(data, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const MirsDeclinedTxnReportDownload = useSelector(
    (state: RootStateOrAny) =>
      state.MirsDeclinedTransactionReducer
        ?.getMirsTransactionDownloadPdfResponse
  );

  const MirsDeclinedTxnReportDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.MirsDeclinedTransactionReducer
        .getMirsTransactionDownloadExcelResponse
  );

  useEffect(() => {
    if (MirsDeclinedTxnReportDownload?.data) {
      setIsLoading(false);
      if (MirsDeclinedTxnReportDownload?.data?.reportURL) {
        window.location.href = MirsDeclinedTxnReportDownload?.data?.reportURL;
      }
      dispatch(resetMirsDeclinedTransactionPdfDownload());
    } else if (MirsDeclinedTxnReportDownload?.error) {
      setIsLoading(false);
      dispatch(resetMirsDeclinedTransactionPdfDownload());
    }
  }, [MirsDeclinedTxnReportDownload]);

  useEffect(() => {
    if (MirsDeclinedTxnReportDownloadExcel?.data) {
      setIsLoading(false);
      if (MirsDeclinedTxnReportDownloadExcel?.data?.reportURL) {
        window.location.href =
          MirsDeclinedTxnReportDownloadExcel?.data?.reportURL;
      }
      dispatch(resetMirsDeclinedTransactionExcelDownload());
    } else if (MirsDeclinedTxnReportDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetMirsDeclinedTransactionExcelDownload());
    }
  }, [MirsDeclinedTxnReportDownloadExcel]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    fetchMirsTransactionDownloadPdf(data, filePdf);
  };

  const downloadExcel = () => {
    fetchMirsTransactionDownloadPdf(data, fileExcel);
  };

  let value = {
    "Mobile Number": filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    "From Date": filterValue.startDate
      ? filterValue.startDate.slice(8, 10) +
        "/" +
        filterValue.startDate.slice(5, 7) +
        "/" +
        filterValue.startDate.slice(0, 4)
      : "",
    "To Date": filterValue.enddate
      ? filterValue.enddate.slice(8, 10) +
        "/" +
        filterValue.enddate.slice(5, 7) +
        "/" +
        filterValue.enddate.slice(0, 4)
      : "",
    "Payment Mode": filterValue.paymentMode,
    Country: countryNames,
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
          RightContent={"MIRS Declined Transaction Report"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite MIRSDeclined mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.enddateDescriptionError &&
                  error.paymentMethodDescriptionError && (
                    <span className="colorRed">
                      Marked * fields are mandatory
                    </span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 btn--sizer inputcode form-select"
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
                    className="MIRSDeclined-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.enddate}
                    name="enddate"
                    onChange={handleChange}
                    min={filterValue.startDate}
                    max={dates}
                    className="MIRSDeclined-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Payment Method</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    className="form-select"
                    onChange={handleChange}
                    name="paymentMode"
                    value={filterValue.paymentMode}
                  >
                    <option value="ALL">ALL</option>
                    <option value="Bank Account">Bank Account</option>
                    <option value="Cash Pickup">Cash Pickup</option>
                    <option value="Union Pay">Union Pay</option>
                    <option value="Alipay">Alipay</option>
                    <option value="bKash">bKash</option>
                    <option value="eWallet">eWallet</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Country</Label>
                  <Select
                  defaultValue="ALL"
                    showSearch
                    onChange={handleChangeCode}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="MIRSDeclinedReport-input form-control border-0 cursor"
                    value={filterValue.countryDescription}
                    style={{ height: "38px" }}
                  >
                    <Option value="ALL">ALL</Option>
                    {countryCode &&
                      countryCode.length > 0 &&
                      countryCode.map((value: any) => {
                        return (
                          <Option valuevalue>
                            {value.description}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>

              <button className="generateBtn border-0 105 LOD_btn_margin " onClick={handleSubmit}>
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
export default MIRSDeclinedTransactionReport;
