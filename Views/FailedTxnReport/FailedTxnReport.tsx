import { Select } from "antd";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { getBankSetupCountryRecords } from "../../redux/action/BankSetupCountryAction";
import {
  FailedTransactionReports,
  FailedTransactionReportsDownload,
  resetFailedTransactionReport,
  resetFailedTransactionReportExcelDownload,
  resetFailedTransactionReportPdfDownload,
} from "../../redux/action/FailedTransactionReportAction";
import "./FailedTxnReport.scss";

const FailedTxnReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [countryNames, setCountryNames] = useState("ALL");
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [pdf, setPdf] = useState(false);
  const [report, setReport] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    country: countryNames,
    paymentMethod: "ALL",
    txnRefNo: "",
    idNo: "",
  });
  const [error, setError] = useState({
    StartDateDescriptionError: "",
    EndDateDescriptionError: "",
    PaymentMethodDescriptionError: "",
  });
  const { Option } = Select;
  const dispatch = useDispatch();
  const FailedTxnReport = useSelector(
    (state: RootStateOrAny) =>
      state.FailedTransactionReportReducer?.getFailedTxnResponseReport
  );

  const fetchFailedTxnReport = useCallback(
    (value: any) => {
      dispatch(FailedTransactionReports(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (FailedTxnReport?.data) {
      setIsLoading(false);
    }
  }, [FailedTxnReport]);

  const FailedTxnDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.FailedTransactionReportReducer
        ?.getFailedTxnDownloadPdfResponseReport
  );
  const FailedTxnDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.FailedTransactionReportReducer
        ?.getFailedTxnDownloadExcelResponseReport
  );

  useEffect(() => {
    if (FailedTxnDownloadPdf?.data) {
      setIsLoading(false);
      if (FailedTxnDownloadPdf?.data?.reportURL) {
        window.location.href = FailedTxnDownloadPdf?.data?.reportURL;
      }
      dispatch(resetFailedTransactionReportPdfDownload());
    } else if (FailedTxnDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetFailedTransactionReportPdfDownload());
    }
  }, [FailedTxnDownloadPdf]);

  useEffect(() => {
    if (FailedTxnDownloadExcel?.data) {
      setIsLoading(false);
      if (FailedTxnDownloadExcel?.data?.reportURL) {
        window.location.href = FailedTxnDownloadExcel?.data?.reportURL;
      }
      dispatch(resetFailedTransactionReportExcelDownload());
    } else if (FailedTxnDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetFailedTransactionReportExcelDownload());
    }
  }, [FailedTxnDownloadExcel]);

  const fetchFailedTxnDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(FailedTransactionReportsDownload(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );
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
  const CountryDes = CountryCode?.data;
  const reportsData = FailedTxnReport?.data;
  const handleChange = (e: any) => {

    setReport(true);
    setFilteredArea(false);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const handleChangeCode = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, country: "ALL" });
    }else{
    let obj = JSON.parse(e);

    setCountryNames(obj.code);
    setFilterValue({ ...filterValue, ["country"]: obj.description });
  };
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
      country: "",
      paymentMethod: "",
      txnRefNo: "",
      idNo: "",
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setCountryNames("");
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      country: "",
      paymentMethod: "ALL",
      txnRefNo: "",
      idNo: "",
    });
    resetData();
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
      title: "Nationality",
      dataIndex: "nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationality?.localeCompare(b.nationality),
      },
    },
    {
      title: "Txn Ref No",
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
      title: "MIRS ID",
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
      title: "Remarks",
      dataIndex: "remarks",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.remarks?.localeCompare(b.remarks),
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
    {
      title: "Created Date",
      dataIndex: "createdDate",
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
        compare: (a: any, b: any) =>
          a.createdDate?.localeCompare(b.createdDate),
      },
    },
    {
      title: "Payout Country",
      dataIndex: "payoutCountry",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.payoutCountry?.localeCompare(b.payoutCountry),
      },
    },
    {
      title: "Card Holder Name",
      dataIndex: "cardHolderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardHolderName?.localeCompare(b.cardHolderName),
      },
    },
    {
      title: "URN No",
      dataIndex: "urnNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urnNumber?.localeCompare(b.urnNumber),
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
  ];
  const resetData = useCallback(async () => {
    try {
      dispatch(resetFailedTransactionReport());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
    country: countryNames ? countryNames : "",
    paymentMethod: filterValue.paymentMethod ? filterValue.paymentMethod : "",
    txnRefNo: filterValue.txnRefNo ? filterValue.txnRefNo : "",
    idNo: filterValue.idNo ? filterValue.idNo : "",
  };
  const Validation = () => {
    let startDate = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let endDate = customValidator("endDate", "endDate", filterValue.enddate);
    let payment = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.paymentMethod
    );
    if (!(startDate === "null" && endDate === "null" && payment === "null")) {
      setError({
        StartDateDescriptionError: startDate,
        EndDateDescriptionError: endDate,
        PaymentMethodDescriptionError: payment,
      });
      return false;
    }
    setError({
      StartDateDescriptionError: "",
      EndDateDescriptionError: "",
      PaymentMethodDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (Validation()) {
      setTable(true);
      setFilteredArea(true);
      setIsLoading(true);
      setCountryNames("ALL")

      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.enddate,
        country: filterValue.country,
        paymentMethod: filterValue.paymentMethod,
        txnRefNo: filterValue.txnRefNo,
        idNo: filterValue.idNo,
      };
      fetchFailedTxnReport(record);
    }
  };
  let filePdf = "pdf";
  let fileExcel = "Excel";

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate,
    endDate: filterValue.enddate,
    country: filterValue.country,
    paymentMethod: filterValue.paymentMethod,
    txnRefNo: filterValue.txnRefNo,
    idNo: filterValue.idNo,
  };
  const downloadPdf = () => {
    fetchFailedTxnDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    fetchFailedTxnDownloadReport(data, fileExcel);
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
    Country: filterValue.country,
    "Payment Method": filterValue.paymentMethod,
    IdNo: filterValue.idNo,
    "Transcation Reference Number": filterValue.txnRefNo,
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
          RightContent={"Failed Transaction Report"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite FailedTxnReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.StartDateDescriptionError &&
                  error.EndDateDescriptionError &&
                  error.PaymentMethodDescriptionError && (
                    <span className="EndOfDayReport-colorRed">
                      * Fields are mandatory
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
                    className="FailedTxnReport-input"
                    min={Mindates}
                    max={dates}
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
                    className="FailedTxnReport-input"
                  ></Input>
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
                    className="prefund-Account-input form-control border-0 cursor"
                    value={filterValue.country}
                    style={{ height: "38px" }}
                  >
                   <Option value="ALL">ALL</Option>
                    {CountryCode &&
                      CountryCode.data?.length > 0 &&
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

              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Payment Method</Label>
                  <span className="container-body-label-color">*</span>

                  <Input
                    type="select"
                    className="FailedTxnReport-input form-select"
                    onChange={handleChange}
                    name="paymentMethod"
                    value={filterValue.paymentMethod}
                  >
                    <option value="ALL">ALL</option>
                    <option value="Bank Account">Bank Account</option>
                    <option value="Cash Pickup">Cash Pickup</option>
                    <option value="Alipay">Alipay</option>
                    <option value="Union Pay">Union Pay</option>
                    <option value="bKash">bKash</option>
                    <option value="eWallet">eWallet</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">ID No</Label>
                  <Input
                    type="text"
                    className="FailedTxnReport-input"
                    onChange={handleChange}
                    name="idNo"
                    value={filterValue.idNo}
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="number" className="Transaction-width">
                    Transaction Ref.No
                  </Label>
                  <Input
                    type="text"
                    className="FailedTxnReport-input"
                    onChange={handleChange}
                    name="txnRefNo"
                    value={filterValue.txnRefNo}
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
                scroll={true}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default FailedTxnReport;
