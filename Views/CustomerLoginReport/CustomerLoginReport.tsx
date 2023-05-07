import { useCallback, useEffect, useState } from "react";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import FileSaver from "file-saver";
import {
  customerLoginReport,
  CustomerLoginReportDownload,
  resetCustomerDownlaodExcel,
  resetCustomerDownlaodPdf,
  resetCustomerReport,
} from "../../redux/action/CustomerLoginReportAction";
import "./CustomerLoginReport.scss";

const CustomerLoginReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [button, setButton] = useState(true);

  const [orginalColumns, setorginalColumns] = useState([]);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
  });
  const [report, setReport] = useState(false);

  const dispatch = useDispatch();
  const customerLoginAllReport = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerLoginReportReducer?.getCustomerResponsereport
  );

  const CustomerLoginDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerLoginReportReducer?.downloadPdfResponse
  );
  const CustomerLoginDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerLoginReportReducer?.downloadExcelResponse
  );

  useEffect(() => {
    if (CustomerLoginDownloadPdf?.data) {
      setIsLoading(false);
      if (CustomerLoginDownloadPdf?.data?.reportUrl) {
        window.location.href = CustomerLoginDownloadPdf?.data?.reportUrl;
      }
      dispatch(resetCustomerDownlaodPdf());
    } else if (CustomerLoginDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetCustomerDownlaodPdf());
    }
  }, [CustomerLoginDownloadPdf]);

  useEffect(() => {
    if (CustomerLoginDownloadExcel?.data) {
      setIsLoading(false);
      if (CustomerLoginDownloadExcel?.data?.reportUrl) {
        window.location.href = CustomerLoginDownloadExcel?.data?.reportUrl;
      }
      dispatch(resetCustomerDownlaodExcel());
    } else if (CustomerLoginDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetCustomerDownlaodExcel());
    }
  }, [CustomerLoginDownloadExcel]);

  const fetchcustomerLoginReport = useCallback(
    (value: any) => {
      dispatch(customerLoginReport(value));
    },
    [dispatch]
  );
  const fetchCustomerDownloadReports = useCallback(
    (value: any, fileType: any) => {
      dispatch(CustomerLoginReportDownload(value, fileType));
    },
    [dispatch]
  );

  useEffect(() => {
    if (customerLoginAllReport?.data) {
      setIsLoading(false);
    }
  }, [customerLoginAllReport]);

  const reportsData = customerLoginAllReport?.data;

  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.enddate,
  };
  let filePdf = "pdf";
  let fileExcel = "Excel";
  const resetData = useCallback(async () => {
    try {
      dispatch(resetCustomerReport());
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
    fetchCustomerDownloadReports(data, filePdf);
  };

  const downloadExcel = () => {
    fetchCustomerDownloadReports(data, fileExcel);
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    setButton(true);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setButton(true);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
    resetData();
  };

  const Validation = () => {
    let endDate = customValidator(
      "startDate",
      "StartDate",
      filterValue.enddate
    );
    let startDate = customValidator(
      "startDate",
      "StartDate",
      filterValue.startDate
    );

    if (!(startDate === "null" && endDate === "null")) {
      setError({
        startDateDescriptionError: startDate,
        endDateDescriptionError: endDate,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
    });
    return true;
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
      title: "Name",
      dataIndex: "name",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.name?.localeCompare(b.name),
      },
    },
    {
      title: "Login Date",
      dataIndex: "loginDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.loginDate?.localeCompare(b.loginDate),
      },
    },

    {
      title: "Login Time",
      dataIndex: "loginTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.loginTime?.localeCompare(b.loginTime),
      },
    },
    {
      title: "Device ID",
      dataIndex: "deviceId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceId?.localeCompare(b.deviceId),
      },
    },
    {
      title: "Device Name",
      dataIndex: "deviceName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceName?.localeCompare(b.deviceName),
      },
    },
    {
      title: "Device OS",
      dataIndex: "deviceOs",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.deviceOs?.localeCompare(b.deviceOs),
      },
    },
    {
      title: "App Version",
      dataIndex: "appVersion",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.appVersion?.localeCompare(b.appVersion),
      },
    },
  ];

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setButton(false);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.enddate,
      };

      fetchcustomerLoginReport(record);
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

  var future = new Date(filterValue.startDate);

  var LastDate = new Date(future.setDate(future.getDate() + 90));
  const dates = formatDate(LastDate);

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Customer Login Report"}
          filterEnabled={filterOption}
          options={false}
          TableData={reportsData}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
        />
        {filterOption && (
          <div className="colorWhite CustomerLoginReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.endDateDescriptionError && (
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
                    min={Mindates}
                    name="startDate"
                    onChange={handleChange}
                    className="CustomerLoginReport-input"
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
                    className="CustomerLoginReport-input"
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
export default CustomerLoginReport;
