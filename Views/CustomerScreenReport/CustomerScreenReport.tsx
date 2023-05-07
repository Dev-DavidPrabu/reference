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
  CustomerScreeningDownloadReport,
  getCustomerScreeningReport,
  resetCustomerScreeingReportExcelDownload,
  resetCustomerScreeingReportPdfDownload,
  resetCustomerScreeningReport,
} from "../../redux/action/CustomerScreeningReportAction";
import "./CustomerScreeningReport.scss";

const CustomerscreenReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [table, setTable] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    ScreeningType: "ALL",
    mobileNumber: "",
    inputCode: "%2b60",
  });
  const [error, setError] = useState({
    fromDateDescriptionError: "",
    toDateDescriptionError: "",
  });
  const dispatch = useDispatch();
  const customerScreeningReport = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerScreeningReportReducer?.getCustomerScreeningReportresponse
  );
  const fetchCustomerScreenReport = useCallback(
    (value: any) => {
      dispatch(getCustomerScreeningReport(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (customerScreeningReport?.data) {
      setIsLoading(false);
    }
  }, [customerScreeningReport]);
  
  const CustomerScreeningReportPdfDownload = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerScreeningReportReducer
        ?.getCustomerScreeingDownloadPdfReportResponse
  );
  const CustomerScreeningReportExcelDownload = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerScreeningReportReducer
        ?.getCustomerScreeingDownloadExcelReportResponse
  );
  useEffect(() => {
    if (CustomerScreeningReportPdfDownload?.data) {
      setIsLoading(false);
      if (CustomerScreeningReportPdfDownload?.data?.reportURL) {
        window.location.href = CustomerScreeningReportPdfDownload?.data?.reportURL;
      }
      dispatch(resetCustomerScreeingReportPdfDownload());
    } else if (CustomerScreeningReportPdfDownload?.error) {
      setIsLoading(false);
      dispatch(resetCustomerScreeingReportPdfDownload());
    }
  }, [CustomerScreeningReportPdfDownload]);

  useEffect(() => {
    if (CustomerScreeningReportExcelDownload?.data) {
      setIsLoading(false);
      if (CustomerScreeningReportExcelDownload?.data?.reportURL) {
        window.location.href = CustomerScreeningReportExcelDownload?.data?.reportURL;
      }
      dispatch(resetCustomerScreeingReportExcelDownload());
    } else if (CustomerScreeningReportExcelDownload?.error) {
      setIsLoading(false);
      dispatch(resetCustomerScreeingReportExcelDownload());
    }
  }, [CustomerScreeningReportExcelDownload]);

  const fetchCustomerScreenDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(CustomerScreeningDownloadReport(data, pdf));
      } catch (err) {}
    },
    [dispatch]
  );
  let filePdf = "pdf";
  let fileExcel = "Excel";
  const header = [
    {
      title: "Account No",
      dataIndex: "accountNumber",
      key: "accountNumber",
      sorter: {
        compare: (a: any, b: any) => a.accountNumber - b.accountNumber,
      },
      checked: true,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 150,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) => a.dob.localeCompare(b.dob),
      },
      checked: true,
    },
    {
      title: "Id Number",
      dataIndex: "idNumber",
      key: "idNumber",
      sorter: {
        compare: (a: any, b: any) => a.idNumber.localeCompare(b.idNumber),
      },
      checked: true,
    },
    {
      title: "Id Type",
      dataIndex: "idType",
      key: "idType",
      sorter: {
        compare: (a: any, b: any) => a.idType.localeCompare(b.idType),
      },
      checked: true,
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
      checked: true,
    },
    {
      title: "Mssl",
      dataIndex: "mssl",
      key: "mssl",
      render: (text: any) => String(text),
      sorter: {
        compare: (a: any, b: any) => a.mssl - b.mssl,
      },
      checked: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
      checked: true,
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
      sorter: {
        compare: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
      },
      checked: true,
    },
    {
      title: "Onboarding Date",
      dataIndex: "onboardingDate",
      key: "onboardingDate",
      sorter: {
        compare: (a: any, b: any) =>
          a.onboardingDate.localeCompare(b.onboardingDate),
      },
      checked: true,
    },
    {
      title: "peps",
      dataIndex: "peps",
      key: "peps",
      render: (text: any) => String(text),
      sorter: (a: any, b: any) => a.peps - b.peps,
      checked: true,
    },
    {
      title: "Sanction List", 
      dataIndex: "sanctionList",
      key: "sanctionList",
      render: (text: any) => String(text),
      sorter: {
        compare: (a: any, b: any) => a.sanctionList - b.sanctionList,
      },
      checked: true,
    },
    {
      title: "Senior Management Approval",
      dataIndex: "seniorManagementApproval",
      key: "seniorManagementApproval",
      sorter: {
        compare: (a: any, b: any) =>
          a.seniorManagementApproval - b.seniorManagementApproval,
      },
      checked: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      checked: true,
    },
  ];

  const reportsData = customerScreeningReport?.data;

  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetCustomerScreeningReport());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);

  var data = {
    fromDate: filterValue.fromDate ? filterValue.fromDate : "",
    toDate: filterValue.toDate ? filterValue.toDate : "",
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    screeningType: filterValue.ScreeningType ? filterValue.ScreeningType : "",
  };
  
  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.fromDate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.toDate
    );

    if (!(StartDateError === "null" && EndDateError === "null")) {
      setError({
        fromDateDescriptionError: StartDateError,
        toDateDescriptionError: EndDateError,
      });
      return false;
    }
    setError({
      fromDateDescriptionError: "",
      toDateDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        ScreeningType: filterValue.ScreeningType,
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
      };
      fetchCustomerScreenReport(record);
      setFilterValue({
        fromDate: filterValue.fromDate,
        toDate: filterValue.toDate,
        ScreeningType: filterValue.ScreeningType,
        mobileNumber: filterValue.mobileNumber,
        inputCode: "%2b60",
      });
    }
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      fromDate: "",
      toDate: "",
      ScreeningType: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      fromDate: "",
      toDate: "",
      ScreeningType: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
    resetDatas();
  };
  const downloadPdf = () => {
    fetchCustomerScreenDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    fetchCustomerScreenDownloadReport(data, fileExcel);
  };

  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    ScreeningType: filterValue.ScreeningType,
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
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
          RightContent={"Customer Screening Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite customerScreenReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.fromDateDescriptionError &&
                  error.toDateDescriptionError && (
                    <span className="colorRed">* Fields are mandatory</span>
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
                    value={filterValue.fromDate}
                    min={Mindates}
                    max={dates}
                    name="fromDate"
                    onChange={handleChange}
                    className="customerScreenReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.toDate}
                    name="toDate"
                    onChange={handleChange}
                    min={filterValue.fromDate}
                    max={dates}
                    className="customerScreenReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Screening Type</Label>
                  <Input
                    type="select"
                    value={filterValue.ScreeningType}
                    name="ScreeningType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="ALL">
                      ALL
                    </option>
                    <option value="PEPS">PEPS</option>
                    <option value="Sanction">Sanction</option>
                    <option value="MSSL">MSSL</option>
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default CustomerscreenReport;
