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
  getRefundTxnReport,
  RefundTransactionDownloadReport,
  resetRefundTxnExcelReportDownload,
  resetRefundTxnPdfReportDownload,
  resetRefundTxnReport,
} from "../../redux/action/RefundTxnReportAction";
import "./RefundTransaction.scss";

const RefundTransactionReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [countryNames, setCountryNames] = useState("ALL");
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [table, setTable] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    startDate: "",
    EndDate: "",
    PaymentMethod: "ALL",
    Country: countryNames,
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    PaymentMethodError: "",
  });
  const { Option } = Select;
  const dispatch = useDispatch();
  const RefundTransactionReport = useSelector(
    (state: RootStateOrAny) =>
      state.RefundTxnReportReducer?.getRefundTxnResponseReport
  );
  const RefundTransactionPdfDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.RefundTxnReportReducer?.getRefundTxnPdfDownloadResponseReport
  );
  const RefundTransactionExcelDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.RefundTxnReportReducer?.getRefundTxnExcelDownloadResponseReport
  );
  useEffect(() => {
    if (RefundTransactionPdfDownloadReport?.data) {
      setIsLoading(false);
      if (RefundTransactionPdfDownloadReport?.data?.reportURL) {
        window.location.href = RefundTransactionPdfDownloadReport?.data?.reportURL;
      }
      dispatch(resetRefundTxnPdfReportDownload());
    } else if (RefundTransactionPdfDownloadReport?.error) {
      setIsLoading(false);
      dispatch(resetRefundTxnPdfReportDownload());
    }
  }, [RefundTransactionPdfDownloadReport]);

  useEffect(() => {
    if (RefundTransactionExcelDownloadReport?.data) {
      setIsLoading(false);
      if (RefundTransactionExcelDownloadReport?.data?.reportURL) {
        window.location.href = RefundTransactionExcelDownloadReport?.data?.reportURL;
      }
      dispatch(resetRefundTxnExcelReportDownload());
    } else if (RefundTransactionExcelDownloadReport?.error) {
      setIsLoading(false);
      dispatch(resetRefundTxnExcelReportDownload());
    }
  }, [RefundTransactionExcelDownloadReport]);

 

  const fetchRefundTransactionReport = useCallback(
    (value: any) => {
      dispatch(getRefundTxnReport(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (RefundTransactionReport?.data) {
      setIsLoading(false);
    }
  }, [RefundTransactionReport]);


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

  const fetchRefundTxnDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(RefundTransactionDownloadReport(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );
  const CountryDes = CountryCode?.data;

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      EndDate: "",
      mobileNumber: "",
      inputCode: "",

      PaymentMethod: "",
      Country: "",
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
      EndDate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      PaymentMethod: "ALL",
      Country: "",
    });
    resetDatas();
  };

  let reportsData = RefundTransactionReport?.data
  let value = {
    "Mobile Number": filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    "Start Date": filterValue.startDate
      ? filterValue.startDate.slice(8, 10) +
        "/" +
        filterValue.startDate.slice(5, 7) +
        "/" +
        filterValue.startDate.slice(0, 4)
      : "",
    "End Date": filterValue.EndDate
      ? filterValue.EndDate.slice(8, 10) +
        "/" +
        filterValue.EndDate.slice(5, 7) +
        "/" +
        filterValue.EndDate.slice(0, 4)
      : "",
    Country: filterValue.Country,
    "Payment Method": filterValue.PaymentMethod,
  };
  const header = [
    {
      title: "Refund Date",
      dataIndex: "refundDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.refundDate.localeCompare(b.refundDate),
      },
    },
    {
      title: "Txn Ref No",
      dataIndex: "transactionReferenceNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReferenceNumber.localeCompare(
            b.transactionReferenceNumber
          ),
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
      title: "Refund By",
      dataIndex: "refundBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.refundBy?.localeCompare(b.refundBy),
      },
    },
    {
      title: "Sender",
      dataIndex: "sender",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.sender.localeCompare(b.sender),
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
      title: "ID No",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNumber?.localeCompare(b.idNumber),
      },
    },
    {
      title: "ID Issue Country",
      dataIndex: "idIsuueCountry",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idIsuueCountry?.localeCompare(b.idIsuueCountry),
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
      title: "Receiver Name",
      dataIndex: "receiverName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverName.localeCompare(b.receiverName),
      },
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentMethod?.localeCompare(b.paymentMethod),
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.country.localeCompare(b.country),
      },
    },
    {
      title: "TotalAmount",
      dataIndex: "totalAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.totalAmount - b.totalAmount,
      },
    },
    {
      title: "Refund Amount",
      dataIndex: "refundAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.refundAmount?.localeCompare(b.refundAmount),
      },
    },
    {
      title: "Reason For Refund",
      dataIndex: "reasonForRefund",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.reasonForRefund?.localeCompare(b.reasonForRefund),
      },
    },
    {
      title: "Cardholder Name",
      dataIndex: "cardHolderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardHolderName.localeCompare(b.cardHolderName),
      },
    },
    {
      title: "URN Number",
      dataIndex: "urnNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urnNumber.localeCompare(b.urnNumber),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
    },
  ];

  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetRefundTxnReport());
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
    endDate: filterValue.EndDate ? filterValue.EndDate : "",
    country: countryNames ? countryNames : "",
    paymentMethod: filterValue.PaymentMethod ? filterValue.PaymentMethod : "",
  };
  const handleChangeCode = (e: any) => {
       if (e === "ALL") {
      setFilterValue({ ...filterValue, ["Country"]: "ALL" });
    }else{
    let obj = JSON.parse(e);

    setCountryNames(obj.code);
    setFilterValue({ ...filterValue, ["Country"]: obj.description });
  };
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
      filterValue.EndDate
    );
    let paymentError = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.PaymentMethod
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
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      setCountryNames("ALL")

      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.EndDate,
        country: countryNames,
        paymentMethod: filterValue.PaymentMethod,
      };
      fetchRefundTransactionReport(record);
    }
  };

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    setIsLoading(true);
    fetchRefundTxnDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchRefundTxnDownloadReport(data, fileExcel);
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
          RightContent={"Refund Transaction Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite RefundTransaction mt-3 p-3">
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
                    className="RefundTransaction-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.EndDate}
                    name="EndDate"
                    onChange={handleChange}
                    min={filterValue.startDate}
                    max={dates}
                    className="RefundTransaction-input"
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Payment Method</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    value={filterValue.PaymentMethod}
                    name="PaymentMethod"
                    onChange={handleChange}
                    className="form-select"
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
                    className="prefund-Account-input form-control border-0 cursor"
                    value={filterValue.Country}
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
export default RefundTransactionReport;
