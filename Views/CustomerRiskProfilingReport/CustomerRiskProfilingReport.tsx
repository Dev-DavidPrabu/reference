import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import FileSaver from "file-saver";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  getCustomerRiskProfiling,
  getCustomerRiskDownload,
  ResetCustomerRiskProfiling,
  ResetCustomerRiskProfilingPdfDownload,
  ResetCustomerRiskProfilingExcelDownload,
} from "../../redux/action/CustomerRiskProfilingReportAction";
import "./CustomerRiskProfiling.scss";
const CustomerRiskProfilingReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const dispatch = useDispatch();
  const [Mindates, setMinDates] = useState("");
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
  });

  const CustomerRiskResponse = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerRiskProfilingReducer?.getCustomerRiskProfilingResponse
  );
  const reportsData = CustomerRiskResponse?.data;
  const fetchCustomerRiskProfiling = useCallback(
    (value: any) => {
      try {
        dispatch(getCustomerRiskProfiling(value));
      } catch (err) {}
    },
    [dispatch]
  );
  const ResetCustomer = useCallback(() => {
    try {
      dispatch(ResetCustomerRiskProfiling());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    ResetCustomer();
    setTable(false);
  }, [ResetCustomer]);
  const CustomerRiskProfilingDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerRiskProfilingReducer?.getCustomerRiskProfilingPdfDownloadRes
  );
  const CustomerRiskProfilingDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.CustomerRiskProfilingReducer
        ?.getCustomerRiskProfilingExcelDownloadRes
  );
  useEffect(() => {
    if (CustomerRiskProfilingDownloadPdf?.data) {
      setIsLoading(false);
      if (CustomerRiskProfilingDownloadPdf?.data?.reportURL) {
        window.location.href =
          CustomerRiskProfilingDownloadPdf?.data?.reportURL;
      }
      dispatch(ResetCustomerRiskProfilingPdfDownload());
    } else if (CustomerRiskProfilingDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(ResetCustomerRiskProfilingPdfDownload());
    }
  }, [CustomerRiskProfilingDownloadPdf]);
  useEffect(() => {
    if (CustomerRiskProfilingDownloadExcel?.data) {
      setIsLoading(false);
      if (CustomerRiskProfilingDownloadExcel?.data?.reportURL) {
        window.location.href =
          CustomerRiskProfilingDownloadExcel?.data?.reportURL;
      }
      dispatch(ResetCustomerRiskProfilingExcelDownload());
    } else if (CustomerRiskProfilingDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(ResetCustomerRiskProfilingExcelDownload());
    }
  }, [CustomerRiskProfilingDownloadExcel]);
  const fetchCustomerRiskDownloadPdf = useCallback(
    (value: any, fileType: string) => {
      try {
        dispatch(getCustomerRiskDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (CustomerRiskResponse?.data) {
      setIsLoading(false);
    }
  }, [CustomerRiskResponse]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.endDate,
  };
  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.endDate ? filterValue.endDate : "",
  };

  const downloadPdf = () => {
    fetchCustomerRiskDownloadPdf(data, filePdf);
  };

  const downloadExcel = () => {
    fetchCustomerRiskDownloadPdf(data, fileExcel);
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      fetchCustomerRiskProfiling(data);
      setFilterValue({
        mobileNumber: filterValue.mobileNumber,
        inputCode: filterValue.inputCode,
        startDate: filterValue.startDate,
        endDate: filterValue.endDate,
      });
    }
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
      endDate: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "",
      startDate: "",
      endDate: "",
    });
    ResetCustomer();
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
        startDateDescriptionError: StartDateError,
        endDateDescriptionError: EndDateError,
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
      title: "Date and Time",
      dataIndex: "Date/Time",
      checked: true,
      key: "Date/Time",
    },
    {
      title: "MM Ref No.",
      dataIndex: "MM_Ref_No",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.MM_Ref_No?.localeCompare(b.MM_Ref_No),
      },
    },
    {
      title: "MIRS ID",
      dataIndex: "MIRS_id",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.MIRS_id?.localeCompare(b.MIRS_id),
      },
    },
    {
      title: "Sender Name",
      dataIndex: "Sender_name",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Sender_name?.localeCompare(b.Sender_name),
      },
    },
    {
      title: "ID No.",
      dataIndex: "ID_number",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.ID_number?.localeCompare(b.ID_number),
      },
    },
    {
      title: "New/Existing Customer",
      dataIndex: "New/Existing_customer",
      checked: true,
    },
    {
      title: "Mobile No.",
      dataIndex: "Mobile_No",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.Mobile_No?.localeCompare(b.Mobile_No),
      },
    },
    {
      title: "Occupation",
      dataIndex: "Occupation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.Occupation?.localeCompare(b.Occupation),
      },
    },
    {
      title: "PEPS",
      dataIndex: "PEPs",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.PEPs?.localeCompare(b.PEPs),
      },
    },
    {
      title: "Nationality",
      dataIndex: "Nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Nationality?.localeCompare(b.Nationality),
      },
    },
    {
      title: "Last 30 days Txn No.",
      dataIndex: "last30DaysTxnNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.last30DaysTxnNo?.localeCompare(b.last30DaysTxnNo),
      },
    },
    {
      title: "Last 30 days Txn Amount",
      dataIndex: "Last30daysTxnAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Last30daysTxnAmount?.localeCompare(b.Last30daysTxnAmount),
      },
    },
    {
      title: "Relationship",
      dataIndex: "Relationship",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Relationship?.localeCompare(b.Relationship),
      },
    },
    {
      title: "Payout Country",
      dataIndex: "Payout_country",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Payout_country?.localeCompare(b.Payout_country),
      },
    },
    {
      title: "Payout Channel",
      dataIndex: "Payout_channel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Payout_channel?.localeCompare(b.Payout_channel),
      },
    },
    {
      title: "Onboarding Type",
      dataIndex: "Onboarding_type",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Onboarding_type?.localeCompare(b.Onboarding_type),
      },
    },
    {
      title: "Total Score",
      dataIndex: "Total_score",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.Total_score?.localeCompare(b.Total_score),
      },
    },
    {
      title: "Risk Type",
      dataIndex: "Risk_type",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.Risk_type?.localeCompare(b.Risk_type),
      },
    },
  ];
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
          RightContent={"Customer Risk Profiling Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite CustomerRiskProfiling mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.endDateDescriptionError && (
                    <span className="colorRed">
                      *Indicators Fields should be mandatory
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
                    className="CustomerRiskProfiling-input"
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
                    value={filterValue.endDate}
                    name="endDate"
                    onChange={handleChange}
                    min={filterValue.startDate}
                    max={dates}
                    className="CustomerRiskProfiling-input"
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
                EnableScroll={true}
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default CustomerRiskProfilingReport;
