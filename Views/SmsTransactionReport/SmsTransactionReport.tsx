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
  getSmsTransactionReport,
  resetSmsTxnReport,
  resetSmsTxnReportDownlaodExcel,
  resetSmsTxnReportDownlaodPdf,
  SmsTxnReportDownload,
} from "../../redux/action/SmsTransactionReportAction";
import "./SmsTransactionReport.scss";
const SmsTransactionReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [button, setButton] = useState(true);
  const [Mindates, setMinDates] = useState("");
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    enddateDescriptionError: "",
    mobileNumberDescriptionError:""
  });
  const dispatch = useDispatch();
  const GetSmsTxnReportReport = useSelector(
    (state: RootStateOrAny) =>
      state.SmsTxnReportReducer?.getSmsTxnResponsereport
  );
  const SmsTxnDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.SmsTxnReportReducer?.getSmsTxndownloadPdfResponse
  );
  const SmsTxnDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.SmsTxnReportReducer?.getSmsTxndownloadExcelResponse
  );
  useEffect(() => {
    if (SmsTxnDownloadPdf?.data) {
      setIsLoading(false);
      if (SmsTxnDownloadPdf?.data?.reportUrl) {
        window.location.href = SmsTxnDownloadPdf?.data?.reportUrl;
      }
      dispatch(resetSmsTxnReportDownlaodPdf());
    } else if (SmsTxnDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetSmsTxnReportDownlaodPdf());
    }
  }, [SmsTxnDownloadPdf]);

  useEffect(() => {
    if (SmsTxnDownloadExcel?.data) {
      setIsLoading(false);
      if (SmsTxnDownloadExcel?.data?.reportUrl) {
        window.location.href = SmsTxnDownloadExcel?.data?.reportUrl;
      }
      dispatch(resetSmsTxnReportDownlaodExcel());
    } else if (SmsTxnDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetSmsTxnReportDownlaodExcel());
    }
  }, [SmsTxnDownloadExcel]);

  const fetchSmsTxnDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(SmsTxnReportDownload(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchSmsTxnReport = useCallback(
    (value: any) => {
      dispatch(getSmsTransactionReport(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (GetSmsTxnReportReport?.data) {
      setIsLoading(false);
    }
  }, [GetSmsTxnReportReport]);
  const reportsData = GetSmsTxnReportReport?.data;

  let filePdf = "pdf";
  let fileExcel = "Excel";
  const resetData = useCallback(async () => {
    try {
      dispatch(resetSmsTxnReport());
    } catch (err) {}
  }, [dispatch]);

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
  };

  const downloadPdf = () => {
    fetchSmsTxnDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    fetchSmsTxnDownloadReport(data, fileExcel);
  };
  const Validation = () => {
    let startDate = customValidator(
      "startDate",
      "StartDate",
      filterValue.startDate
    );
    let enddate = customValidator("endDate", "EndDate", filterValue.enddate);
    let mobilenumber = customValidator(
      "mobileno",
      "mobileno",
      filterValue.mobileNumber
    );

    if (
      !(startDate === "null" && enddate === "null" && mobilenumber === "null")
    ) {
      setError({
        startDateDescriptionError: startDate,
        enddateDescriptionError: enddate,
        mobileNumberDescriptionError: mobilenumber
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      enddateDescriptionError: "",
      mobileNumberDescriptionError:""
    });
    return true;
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setButton(true);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
    resetData();
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    setButton(true);
  };
  const header = [
    {
      title: "Mobile number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.deliveryDate?.localeCompare(b.deliveryDate),
      },
    },
    {
      title: "SMS Gateway",
      dataIndex: "smsGateway",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.smsGateway?.localeCompare(b.smsGateway),
      },
    },

    {
      title: "status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status?.localeCompare(b.status),
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionId?.localeCompare(b.transactionId),
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName?.localeCompare(b.userName),
      },
    },
  ];

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setButton(true);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "",
    });
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.enddate,
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setButton(false);
      setIsLoading(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.enddate,
      };

      fetchSmsTxnReport(record);
      setFilterValue({
        mobileNumber: filterValue.mobileNumber,
        startDate: filterValue.startDate,
        enddate: filterValue.enddate,
        inputCode: "%2b60",
      });
    }
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
          RightContent={"SMS Transaction Report"}
          filterEnabled={filterOption}
          options={false}
          TableData={reportsData}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
        />
        {filterOption && (
          <div className="colorWhite SmsTxnReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.enddateDescriptionError &&
                  (
                    <span className="colorRed">*Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <span className="container-body-label-color">*</span>

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
                    min={Mindates}
                    max={dates}
                    onChange={handleChange}
                    className="SmsTxnReport-input"
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
                    className="SmsTxnReport-input"
                  ></Input>
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
export default SmsTransactionReport;
