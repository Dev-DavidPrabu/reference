import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FileSaver from "file-saver";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import {
  getMonthlyTransactionReport,
  resetMonthlyTransactionDownloadPdf,
  resetMonthlyTransactionReports,
  getMonthlyTransactionReportDownload,
  resetMonthlyTransactionDownloadExcel,
} from "../../redux/action/MonthlyTransactionReportAction";
import "./MonthlyTransaction.scss";
import { DatePicker, DatePickerProps } from "antd";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { useSelector, RootStateOrAny } from "react-redux";

const MonthlyTransactionReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    MonthYear: "",
    PaymentMethod: "ALL",
  });

  const dispatch = useDispatch();

  const MonthlyTransactionReportData = useSelector(
    (state: RootStateOrAny) =>
      state.MonthlyTransactionReportReducer?.getMonthlyTransactionResponse
  );
  const MonthlyTransactionDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.MonthlyTransactionReportReducer
        ?.getMonthlyTransactionDownloadPdfResponse
  );
  const MonthlyTransactionDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.MonthlyTransactionReportReducer
        ?.getMonthlyTransactionDownloadExcelResponse
  );

  useEffect(() => {
    if (MonthlyTransactionDownloadPdf?.data) {
      setIsLoading(false);
      if (MonthlyTransactionDownloadPdf?.data?.reportURL) {
        window.location.href = MonthlyTransactionDownloadPdf?.data?.reportURL;
      }
      dispatch(resetMonthlyTransactionDownloadPdf());
    } else if (MonthlyTransactionDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetMonthlyTransactionDownloadPdf());
    }
  }, [MonthlyTransactionDownloadPdf]);
  useEffect(() => {
    if (MonthlyTransactionDownloadExcel?.data) {
      setIsLoading(false);
      if (MonthlyTransactionDownloadExcel?.data?.reportURL) {
        window.location.href = MonthlyTransactionDownloadExcel?.data?.reportURL;
      }
      dispatch(resetMonthlyTransactionDownloadExcel());
    } else if (MonthlyTransactionDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetMonthlyTransactionDownloadExcel());
    }
  }, [MonthlyTransactionDownloadExcel]);
  const fetchMonthlyTransactionReport = useCallback(
    (value: any) => {
      try {
        dispatch(getMonthlyTransactionReport(value));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetMonthlyTransaction = useCallback(() => {
    try {
      dispatch(resetMonthlyTransactionReports());
    } catch (err) {}
  }, [dispatch]);

  const fetchMonthlyTransactionDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(getMonthlyTransactionReportDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetMonthlyTransactionPdf = useCallback(() => {
    try {
      dispatch(resetMonthlyTransactionDownloadPdf());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (MonthlyTransactionReportData?.data) {
      setIsLoading(false);
    }
  }, [MonthlyTransactionReportData]);

  let filePdf = "pdf";
  let fileExcel = "Excel";
  useEffect(() => {
    resetMonthlyTransactionPdf();
  }, [resetMonthlyTransactionPdf]);
  useEffect(() => {
    resetMonthlyTransactionPdf();
    setTable(false);
  }, [resetMonthlyTransactionPdf]);

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    MonthYear: filterValue.MonthYear.split("-").reverse().join("/"),
    PaymentMethod: filterValue.PaymentMethod,
  };
  const downloadPdf = () => {
    fetchMonthlyTransactionDownload(data, filePdf);
  };

  const downloadExcel = () => {
    fetchMonthlyTransactionDownload(data, fileExcel);
  };

  const reportsData = MonthlyTransactionReportData?.data;

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const handleChangeMonth: DatePickerProps["onChange"] = (date, dateString) => {
    setFilterValue({ ...filterValue, ["MonthYear"]: dateString });
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      MonthYear: "",
      PaymentMethod: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      MonthYear: "",
      PaymentMethod: "ALL",
    });
    resetMonthlyTransaction();
  };
  const getFullDate = (date: string): string => {
    const dateAndTime = date.split("T");

    return dateAndTime[0].split("-").reverse().join("-");
  };
  const header = [
    {
      title: "Sender Name",
      dataIndex: "senderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderName?.localeCompare(b.senderName),
      },
    },
    {
      title: "MIRS No",
      dataIndex: "mirsNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mirsNumber?.localeCompare(b.mirsNumber),
      },
    },
    {
      title: "Payment Purpose",
      dataIndex: "paymentPurpose",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentPurpose?.localeCompare(b.paymentPurpose),
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      checked: true,
      render: (date: string) => getFullDate(date),
      sorter: {
        compare: (a: any, b: any) =>
          a.createdDate?.localeCompare(b.createdDate),
      },
    },
    {
      title: "Country Name",
      dataIndex: "countryName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.countryName?.localeCompare(b.countryName),
      },
    },
    {
      title: "Transaction Ref.No",
      dataIndex: "transactionReferenceNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReferenceNumber?.localeCompare(
            b.transactionReferenceNumber
          ),
      },
    },
    {
      title: "Cardholder Name",
      dataIndex: "cardHolderSenderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardHolderSenderName?.localeCompare(b.cardHolderSenderName),
      },
    },
    {
      title: "URN No",
      dataIndex: "cardUrn",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardUrn?.localeCompare(b.cardUrn),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
  ];

  const handleSubmit = () => {
    setFilteredArea(true);
    setfilterOption(true);
    setIsLoading(true);
    setTable(true);
    var record = {
      mobileNumber: filterValue.mobileNumber
        ? filterValue.inputCode + filterValue.mobileNumber
        : "",
      MonthYear: filterValue.MonthYear.split("-").reverse().join("/"),
      PaymentMethod: filterValue.PaymentMethod,
    };

    fetchMonthlyTransactionReport(record);
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    MonthYear: filterValue.MonthYear.split("-").reverse().join("/"),
    PaymentMethod: filterValue.PaymentMethod,
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
          RightContent={"Monthly Transcation Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite MonthlyTransaction mt-3 p-3">
            <p className="branchSetupTitle">Filter</p>
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
                  <Label for="exampleEmail">Month/Year</Label>
                  <DatePicker
                    name="MonthYear"
                    placeholder="MM/YYYY"
                    className="DailyTranscationReport-input"
                    picker="month"
                    disabled={false}
                    onChange={handleChangeMonth}
                  />
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Payment Method</Label>
                  <Input
                    type="select"
                    value={filterValue.PaymentMethod}
                    name="PaymentMethod"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="ALL">ALL</option>
                    <option value="Bank Account"> Bank Account</option>
                    <option value="Cash Pickup"> Cash Pickup</option>
                    <option value="Alipay"> Alipay</option>
                    <option value="Union Pay">Union Pay</option>
                    <option value="bKash">bKash</option>
                    <option value="eWallet">eWallet</option>
                  </Input>
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
                checkLength={reportsData.length}
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
export default MonthlyTransactionReport;
