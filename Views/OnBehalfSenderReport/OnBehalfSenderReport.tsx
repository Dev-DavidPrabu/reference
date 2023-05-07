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
  OnBehalfSenderReportDownload,
  OnBehalfSenderReports,
  resetOnbehalfSenderReport,
  resetOnbehalfSenderReportExcelDownload,
  resetOnbehalfSenderReportPdfDownload,
} from "../../redux/action/OnBehalfSenderReportAction";
import "./OnBehalfSenderReport.scss";
const OnBehalfSenderReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [searchArea, setSearchArea] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [table, setTable] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "",
    startDate: "",
    EndDate: "",
    PaymentMethod: "ALL",
    IDNo: "",
    TransactionStatus: "ALL",
  });
  const { Option } = Select;

  const [error, setError] = useState({
    StartDateDescriptionError: "",
    EndDateDescriptionError: "",
    PaymentMethodDescriptionError: "", 
  });
  const dispatch = useDispatch();
  const OnBehalfSenderReport = useSelector(
    (state: RootStateOrAny) =>
      state.OnBehalfSenderReportReducer?.getOnbehalfsenderResponseReport
  );

  const fetchOnbehalfSenderReport = useCallback(
    (value: any) => {
      dispatch(OnBehalfSenderReports(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (OnBehalfSenderReport?.data) {
      setIsLoading(false);
    }
  }, [OnBehalfSenderReport]);

  const OnbehalfSenderDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.OnBehalfSenderReportReducer?.getOnbehalfDownloadResponsePdfReport
  );
  const OnbehalfSenderDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.OnBehalfSenderReportReducer?.getOnbehalfDownloadResponseExcelReport
  );

  useEffect(() => {
    if (OnbehalfSenderDownloadPdf?.data) {
      setIsLoading(false);
      if (OnbehalfSenderDownloadPdf?.data?.reportURL) {
        window.location.href = OnbehalfSenderDownloadPdf?.data?.reportURL;
      }
      dispatch(resetOnbehalfSenderReportPdfDownload());
    } else if (OnbehalfSenderDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetOnbehalfSenderReportPdfDownload());
    }
  }, [OnbehalfSenderDownloadPdf]);

  useEffect(() => {
    if (OnbehalfSenderDownloadExcel?.data) {
      setIsLoading(false);
      if (OnbehalfSenderDownloadExcel?.data?.reportURL) {
        window.location.href = OnbehalfSenderDownloadExcel?.data?.reportURL;
      }
      dispatch(resetOnbehalfSenderReportExcelDownload());
    } else if (OnbehalfSenderDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetOnbehalfSenderReportExcelDownload());
    }
  }, [OnbehalfSenderDownloadExcel]);

  const fetchOnbehalfDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(OnBehalfSenderReportDownload(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );

  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.EndDate,

    PaymentMethod: filterValue.PaymentMethod,
    IDNo: filterValue.IDNo,
    TransactionStatus: filterValue.TransactionStatus,
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      startDate: "",
      EndDate: "",

      PaymentMethod: "ALL",
      IDNo: "",
      TransactionStatus: "",
    });
    resetData();
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      startDate: "",
      EndDate: "",

      PaymentMethod: "ALL",
      IDNo: "",
      TransactionStatus: "",
    });
    resetData();
  };

  const header = [
    {
      title: "From Date",
      dataIndex: "fromDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.fromDate?.localeCompare(b.fromDate),
      },
    },
    {
      title: "To Date",
      dataIndex: "toDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.toDate?.localeCompare(b.toDate),
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType?.localeCompare(b.transactionType),
      },
    },
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
      title: "ID Number",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNumber?.localeCompare(b.idNumber),
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
      title: "Transaction Status",
      dataIndex: "transactionStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatus?.localeCompare(b.transactionStatus),
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      checked: true,
      width:160,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 180,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate?.localeCompare(b.transactionDate),
      },
    },
    {
      title: "On Behalf Sender Name",
      dataIndex: "onBehalfSenderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.onBehalfSenderName?.localeCompare(b.onBehalfSenderName),
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
      title: "On Behalf Sender Id",
      dataIndex: "onBehalfSenderId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.onBehalfSenderId?.localeCompare(b.onBehalfSenderId),
      },
    },
    {
      title: "DOB",
      dataIndex: "dateOfBirth",
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 160,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.dateOfBirth?.localeCompare(b.dateOfBirth),
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.contactNumber?.localeCompare(b.contactNumber),
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.address?.localeCompare(b.address),
      },
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.occupation?.localeCompare(b.occupation),
      },
    },
    {
      title: "Employer Name",
      dataIndex: "employeerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.employeerName?.localeCompare(b.employeerName),
      },
    },
    {
      title: "Deposit Amount",
      dataIndex: "depositAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.depositAmount - b.depositAmount,
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
  ];

  const reportsData = OnBehalfSenderReport?.data;

  const resetData = useCallback(async () => {
    try {
      dispatch(resetOnbehalfSenderReport());
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
    endDate: filterValue.EndDate ? filterValue.EndDate : "",

    PaymentMethod: filterValue.PaymentMethod ? filterValue.PaymentMethod : "",
    IdNumber: filterValue.IDNo ? filterValue.IDNo : "",
    TransactionStatus: filterValue.TransactionStatus
      ? filterValue.TransactionStatus
      : "",
  };
  const Validation = () => {
    let startDate = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let endDate = customValidator("endDate", "endDate", filterValue.EndDate);
    let payment = customValidator(
      "paymentMode",
      "paymentMode",
      filterValue.PaymentMethod
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
      setFilteredArea(true);
      setIsLoading(true);
      setfilterOption(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.EndDate,

        PaymentMethod: filterValue.PaymentMethod,
        IdNumber: filterValue.IDNo,
        TransactionStatus: filterValue.TransactionStatus,
      };
      fetchOnbehalfSenderReport(record);
    }
  };

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    fetchOnbehalfDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    fetchOnbehalfDownloadReport(data, fileExcel);
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
          RightContent={"On Behalf Sender Report"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
        />
        {filterOption && (
          <div className="colorWhite OnBehalfSenderReport mt-3 p-3">
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
                    min={Mindates}
                    max={dates}
                    className="OnBehalfSenderReport-input"
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
                    className="OnBehalfSenderReport-input"
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
                    <option value="Bank Account"> Bank Account</option>
                    <option value="Cash Pickup"> Cash Pickup</option>
                    <option value="Alipay"> Alipay</option>
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
                    className="OnBehalfSenderReport-input"
                    onChange={handleChange}
                    name="IDNo"
                    value={filterValue.IDNo}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Transaction Status</Label>
                  <Input
                    type="select"
                    value={filterValue.TransactionStatus}
                    name="TransactionStatus"
                    onChange={handleChange}
                    className="form-select"
                  >
                     <option value="ALL">ALL</option>

                    <option value={"Initiated"}>Initiated</option>
                    <option value={" Remittance System Error"}>
                      {" "}
                      Remittance System Error
                    </option>
                    <option value={"On Hold"}>On Hold</option>
                    <option value={"In Process"}>In Process</option>
                    <option value={"Cancelled"}>Cancelled</option>
                    <option value={"Paid"}>Paid</option>
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
                TableData={columns.length > 0 ? columns : header}
                CustomTableHeader={reportsData}
                DisableMange={true}
                checkLength={reportsData.length}
                scroll={true}
                DefaultColumnWidth={true}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default OnBehalfSenderReport;
