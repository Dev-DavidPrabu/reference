import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { customValidator } from "../../Constants/Validation";
import { Input, FormGroup, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  getMsslTrackerList,
  getMsslTrackerReportDownlaod,
  ResetMsslTrackerReport,
  ResetMsslTrackerReportPdf,
} from "../../redux/action/MsslTrackerListReportAction";
import FileSaver from "file-saver";
import "./MSSLTrackerListReport.scss";

const MSSLTrackerListReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [pdf, setPdf] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
  });
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    endDate: "",
    inputCode: "%2b60",
  });
  const dispatch = useDispatch();

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const MsslTrackerListResponse = useSelector(
    (state: RootStateOrAny) =>
      state.MsslTrackerListReportReducer?.getMsslReportResponse
  );
  const fetchMsslTrackerReport = useCallback(
    (value: any) => {
      try {
        dispatch(getMsslTrackerList(value));
      } catch (err) {}
    },
    [dispatch]
  );

  let reportsData = MsslTrackerListResponse?.data;
  const MsslTrackerListDownloadResponse = useSelector(
    (state: RootStateOrAny) =>
      state.MsslTrackerListReportReducer?.getMsslReportDownloadResponse
  );

  const fetchMsslTrackerListDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(getMsslTrackerReportDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetMsslTrackerReportData = useCallback(async () => {
    try {
      dispatch(ResetMsslTrackerReport());
    } catch (err) {}
  }, [dispatch]);
  const resetMsslTrackerPdf = useCallback(async () => {
    try {
      dispatch(ResetMsslTrackerReportPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetMsslTrackerReportData();
    setTable(false);
  }, [resetMsslTrackerReportData]);
  useEffect(() => {
    resetMsslTrackerPdf();
  }, [resetMsslTrackerPdf]);

  useEffect(() => {
    if (MsslTrackerListResponse?.data) {
      setIsLoading(false);
    }
  }, [MsslTrackerListResponse]);

  const exportToData = (apiData: any, type: string) => {
    if (apiData.length !== 0 && MsslTrackerListDownloadResponse?.length !== 0) {
      let file = new Blob([apiData?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `MsslTrackerList.${type}`);
    }
    resetMsslTrackerPdf();
  };
  let DownloadType = MsslTrackerListDownloadResponse?.headers?.["content-type"];
  useEffect(() => {
    if (
      MsslTrackerListDownloadResponse?.length !== 0 &&
      MsslTrackerListDownloadResponse !== undefined
    ) {
      if (DownloadType === "application/pdf") {
        exportToData(MsslTrackerListDownloadResponse, ".pdf");
      }
      if (DownloadType === "application/vnd.ms-excel") {
        exportToData(MsslTrackerListDownloadResponse, ".xlsx");
      }
      setIsLoading(false);
    }
  }, [MsslTrackerListDownloadResponse]);

  const header = [
    {
      title: "CID",
      dataIndex: "customerId",
      key: "cid",
      sorter: {
        compare: (a: any, b: any) => a.cid.localeCompare(b.cid),
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
      key: "Nation",
      sorter: {
        compare: (a: any, b: any) => a.Nation.localeCompare(b.Nation),
      },
      checked: true,
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNo",
      sorter: {
        compare: (a: any, b: any) => a.mobileNo.localeCompare(b.mobileNo),
      },
      checked: true,
    },
    {
      title: "Identification No",
      dataIndex: "identificationNumber",
      key: "idno",
      sorter: {
        compare: (a: any, b: any) => a.idno.localeCompare(b.idno),
      },
      checked: true,
    },
    {
      title: "DOB",
      dataIndex: "dateOfBirth",
      key: "dob",
      sorter: {
        compare: (a: any, b: any) => a.dob.localeCompare(b.dob),
      },
      checked: true,
    },
    {
      title: "OnBoarding Customer",
      dataIndex: "onboardingCustomer",
      key: "Onbordcus",
      sorter: {
        compare: (a: any, b: any) => a.Onbordcus.localeCompare(b.Onbordcus),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
        return (
          <label
            className={` ${value === "YES" ? "text-success" : "text-danger"}`}
          >
            {value}
          </label>
        );
      },
      checked: true,
    },

    {
      title: "Match Type",
      dataIndex: "matchType",
      key: "cid",
      sorter: {
        compare: (a: any, b: any) => a.cid.localeCompare(b.cid),
      },
      checked: true,
    },
  ];

  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
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

  var data = {
    startDate: filterValue.startDate,
    endDate: filterValue.endDate,
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
  };

  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      fetchMsslTrackerReport(data);
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
      mobileNumber: "",
      startDate: "",
      endDate: "",
      inputCode: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      startDate: "",
      endDate: "",
      inputCode: "%2b60",
    });
    resetMsslTrackerReportData();
  };
  const downloadPdf = () => {
    if (reportsData !== undefined) {
      setIsLoading(true);
      fetchMsslTrackerListDownload(data, filePdf);
    }
  };

  const downloadExcel = () => {
    if (reportsData !== undefined) {
      setIsLoading(true);
      fetchMsslTrackerListDownload(data, fileExcel);
    }
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.endDate,
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
          RightContent={"MSSL Tracker List Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite MSSLTrackerListReport mt-3 p-3">
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
            <div className="container-fluid filterInputAlign">
              <div className="d-flex row align-items-end">
                <div className="col">
                  <label className=" p-1 MSSLTrackerListReport-label">
                    Mobile No
                  </label>
                  <div className="col-8 row">
                    <Input
                      className=" form-select border-1 MSSLTrackerListReport-inputcode "
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
                      className="MSSLTrackerListReport-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col">
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
                      className="MSSLTrackerListReport-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
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
                      className="MSSLTrackerListReport-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="mt-4 col-3 ">
                  <button
                    className="generateBtn border-0"
                    onClick={handleSubmit}
                  >
                    Load Data
                  </button>
                </div>
              </div>
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

export default MSSLTrackerListReport;
