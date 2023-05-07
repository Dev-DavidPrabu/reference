import { useCallback, useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import "./TransactionSummaryReport.scss";
import { customValidator } from "../../Constants/Validation";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  resetTransactionSummaryReport,
  TransactionSummaryDownloadReport,
  TransactionSummaryReports,
  resetPDFRecords,
  resetExcelRecords,
} from "../../redux/action/TransactionSummaryReportAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { getBankSetupCountryRecords } from "../../redux/action/BankSetupCountryAction";
import { Select } from "antd";
const TransactionSummaryReport = (props: any) => {
  const [columns, setColumns] = useState([]);
  const [table, setTable] = useState(false);
  const [filterOption, setfilterOption] = useState(true);
  const [Mindates, setMinDates] = useState("");
  const [countryNames, setCountryNames] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    startdate: "",
    enddate: "",
    payment: "ALL",
    country: countryNames,
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    PaymentMethodError: "",
  });
  const { Option } = Select;
  const dispatch = useDispatch();
  const TxnSummaryReport = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionSummaryReportReducer?.getTransactionSummaryReport
  );

  const fetchTxnSummaryReport = useCallback(
    (value: any) => {
      dispatch(TransactionSummaryReports(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (TxnSummaryReport?.data) setIsLoading(false);
  }, [TxnSummaryReport]);
  const CountryCode = useSelector(
    (state: RootStateOrAny) =>
      state.BankSetupCountryReducer?.getBankSetupCountryResponse
  );
  const fetchCountry = useCallback(async () => {
    try {
      dispatch(getBankSetupCountryRecords());
    } catch (error) { }
  }, [dispatch]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);
  const CountryDes = CountryCode?.data;
  const TxnSummaryReportDownload = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionSummaryReportReducer
        ?.getTransactionSummaryDownloadPdfReport
  );

  const TxnSummaryReportDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionSummaryReportReducer
        .getTransactionSummaryDownloadReportExcel
  );

  useEffect(() => {
    if (TxnSummaryReportDownload?.data) {
      setIsLoading(false);
      if (TxnSummaryReportDownload?.data?.reportURL) {
        window.location.href = TxnSummaryReportDownload?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (TxnSummaryReportDownload?.error) {
      setIsLoading(false);
      dispatch(resetPDFRecords());
    }
  }, [TxnSummaryReportDownload]);

  useEffect(() => {
    if (TxnSummaryReportDownloadExcel?.data) {
      setIsLoading(false);
      if (TxnSummaryReportDownloadExcel?.data?.reportURL) {
        window.location.href = TxnSummaryReportDownloadExcel?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (TxnSummaryReportDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetExcelRecords());
    }
  }, [TxnSummaryReportDownloadExcel]);

  const handleChangeCode = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, country: "ALL" });
    } else {
      let obj = JSON.parse(e);

      setCountryNames(obj.code);
      setFilterValue({ ...filterValue, country: obj.description });
    }
  };
  const fetchTxnSummaryDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(TransactionSummaryDownloadReport(data, pdf));
      } catch (err) { }
    },
    [dispatch]
  );

  const transactionData = TxnSummaryReport?.data?.transactionSummaryResponse;

  const header = [
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.toDate?.localeCompare(b.toDate),
      },
    },

    {
      title: "Amount",
      dataIndex: "amount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.country?.localeCompare(b.country),
      },
    },
    {
      title: "No Of Transactions",
      dataIndex: "noOfTransactions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType?.localeCompare(b.transactionType),
      },
      render: (text: any, record: any, index: any) => {
        return (
          <>
            {record.noOfTransactions === null ? "-" : record.noOfTransactions}
          </>
        );
      },
    },
    {
      title: "Payout Amount",
      dataIndex: "payoutAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.noOfTransactions?.localeCompare(b.noOfTransactions),
      },
    },
    {
      title: "Sender Amount",
      dataIndex: "senderAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.payingCountry?.localeCompare(b.payingCountry),
      },
    },





    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentMode?.localeCompare(b.paymentMode),
      },
    },

  ];


  const toggleRefresh = () => {
    setTable(false);
    setFilteredArea(false);
    setCountryNames("");
    setFilterValue({
      startdate: "",
      enddate: "",

      payment: "ALL",
      country: "ALL",
    });
    resetDatas();
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };

  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetTransactionSummaryReport());
    } catch (err) { }
  }, [dispatch]);

  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);

  var data = {
    startDate: filterValue.startdate ? filterValue.startdate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",

    PaymentMethod: filterValue.payment ? filterValue.payment : "",
    Country: filterValue.country ? filterValue.country : "",
  };
  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.startdate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.enddate
    );
    let paymentError = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.payment
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
        endDateDescriptionError: EndDateError,
        PaymentMethodError: paymentError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      PaymentMethodError: "",
    });
    return true;
  };

  const handleSubmit = () => {
    if (Validation()) {
      setTable(true);
      setFilteredArea(true);
      setIsLoading(true);
      var record = {
        startDate: filterValue.startdate,
        endDate: filterValue.enddate,
        PaymentMethod: filterValue.payment,
        Country: filterValue.country,
      };

      fetchTxnSummaryReport(record);
      setFilterValue({
        startdate: filterValue.startdate,
        enddate: filterValue.enddate,
        payment: filterValue.payment,
        country: filterValue.country,
      });
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

  let value = {
    "From Date": filterValue.startdate
      ? filterValue.startdate.slice(8, 10) +
      "/" +
      filterValue.startdate.slice(5, 7) +
      "/" +
      filterValue.startdate.slice(0, 4)
      : "",
    "To Date": filterValue.enddate
      ? filterValue.enddate.slice(8, 10) +
      "/" +
      filterValue.enddate.slice(5, 7) +
      "/" +
      filterValue.enddate.slice(0, 4)
      : "",

    "Payment Method": filterValue.payment,
    Country: filterValue.country,
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startdate: "",
      enddate: "",
      payment: "",
      country: "",
    });
    resetDatas();
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
  const totals = TxnSummaryReport?.data;
  let constructData = {
    totalAmount: totals?.totalAmount,
    totalNoOfTransactions: totals?.totalNoOfTransactions,
    totalPayoutAmount: totals?.totalPayoutAmount,
    totalSenderAmount: totals?.totalSenderAmount,
    totalServiceCharge: totals?.totalServiceCharge
  };
  return (
    <div className="p-4">
      <CommonHeaderSummaryReports
        RightContent={"Transaction Summary Report"}
        filterEnabled={filterOption}
        options={false}
        toggleRefresh={toggleRefresh}
        downloadPdf={downloadPdf}
        downloadExcel={downloadExcel}
        toggleFilter={toggleFilter}
        TableData={transactionData}
      />
      {filterOption && (
        <div className="colorWhite TransactionSummary mt-3 p-3">
          <p className="branchSetupTitle">
            Filter
            <p className="colorRed">
              {error.startDateDescriptionError &&
                error.endDateDescriptionError &&
                error.PaymentMethodError && (
                  <span className="colorRed">
                    Marked * fields are mandatory
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
                  value={filterValue.startdate}
                  name="startdate"
                  onChange={handleChange}
                  min={Mindates}
                  max={dates}
                  className="TransactionSummary-input"
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
                  min={filterValue.startdate}
                  max={dates}
                  className="TransactionSummary-input"
                ></Input>
              </FormGroup>
            </div>

            <div className="input_field_container">
              <FormGroup>
                <Label for="exampleEmail">Payment Method</Label>
                <span className="container-body-label-color">*</span>
                <Input
                  name="payment"
                  className="form-select"
                  type="select"
                  value={filterValue.payment}
                  onChange={handleChange}
                >
                  <option value="ALL">ALL</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="Cash Pickup">Cash Pick up</option>
                  <option value="Union Pay">Union Pay</option>
                  <option value="Alipay">Alipay</option>
                  <option value="bKash">bKash</option>
                  <option value="eWallet">eWallet</option>
                </Input>
              </FormGroup>
            </div>
            <div className="input_field_container">
              <FormGroup>
                <Label for="exampleEmail">Country</Label>
                <Select
                  defaultValue="ALL"
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
                  className="prefund-Account-input form-select border-0 cursor"
                  value={filterValue.country}
                  style={{ height: "38px" }}
                >
                  <Option value="ALL">ALL</Option>
                  {CountryCode &&
                    CountryCode.data.length > 0 &&
                    CountryCode.data.map((value: any) => {
                      return (
                        <Option value={JSON.stringify(value)}>
                          {value.description}
                        </Option>
                      );
                    })}
                </Select>
              </FormGroup>
            </div>

            <button
              className="Transaction-generateBtn border-0 LOD_btn_margin"
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
        <div className="mt-4">
          {table && (
            <CustomHeader
              TableData={columns.length > 0 ? columns : header}
              CustomTableHeader={transactionData}
              DisableMange={true}
              scroll={true}
              checkLength={transactionData.length}
              showTable={true}
              TotalAmount={constructData}
            />
          )}
        </div>

      )}
    </div>
  );
};
export default TransactionSummaryReport;
