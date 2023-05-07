import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileSaver from "file-saver";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { Select } from "antd";
import { getBankSetupCountryRecords } from "../../redux/action/BankSetupCountryAction";
import {
  getEcddReport,
  getEcddAmlReportDownlaod,
  ResetEcddReport,
  ResetEcddDownloadPdf,
  ResetEcddDownloadExcel,
} from "../../redux/action/ECDDReportAction";
import "./ECDDReport.scss";

const ECDDReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [countryCodeData, setCountryCode] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const { Option } = Select;
  const [Mindates, setMinDates] = useState("");
  let dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    startDate: "",
    EndDate: "",
    Country: countryCodeData,
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
  });
  const fetchCountryCode = useCallback(async () => {
    try {
      dispatch(getBankSetupCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  const CountryCodeReport: any = useSelector(
    (state: RootStateOrAny) =>
      state.BankSetupCountryReducer?.getBankSetupCountryResponse
  );

  let countryCode = CountryCodeReport?.data?.map((value: any) => {
    return { ...value };
  });
  countryCode?.unshift({ id: 0, description: "All", code: "All" });
  useEffect(() => {
    fetchCountryCode();
  }, [fetchCountryCode]);

  const EcddAmlReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.ECDDAmlReportReducer?.getEcddAmlReportResponse
  );
  const reportsData = EcddAmlReportResponse?.data;
  const fetchEcddAmlReport = useCallback(
    (value: any) => {
      try {
        dispatch(getEcddReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const EcddReportPdfDownloadResponse = useSelector(
    (state: RootStateOrAny) =>
      state.ECDDAmlReportReducer?.getEcddAmlReportPdfDownloadResponse
  );
  const EcddReportExcelDownloadResponse = useSelector(
    (state: RootStateOrAny) =>
      state.ECDDAmlReportReducer?.getEcddAmlReportExcelDownloadResponse
  );

  useEffect(() => {
    if (EcddReportPdfDownloadResponse?.data) {
      setIsLoading(false);
      if (EcddReportPdfDownloadResponse?.data?.reportURL) {
        window.location.href = EcddReportPdfDownloadResponse?.data?.reportURL;
      }
      dispatch(ResetEcddDownloadPdf());
    } else if (EcddReportPdfDownloadResponse?.error) {
      setIsLoading(false);
      dispatch(ResetEcddDownloadPdf());
    }
  }, [EcddReportPdfDownloadResponse]);

  useEffect(() => {
    if (EcddReportExcelDownloadResponse?.data) {
      setIsLoading(false);
      if (EcddReportExcelDownloadResponse?.data?.reportURL) {
        window.location.href = EcddReportExcelDownloadResponse?.data?.reportURL;
      }
      dispatch(ResetEcddDownloadExcel());
    } else if (EcddReportExcelDownloadResponse?.error) {
      setIsLoading(false);
      dispatch(ResetEcddDownloadExcel());
    }
  }, [EcddReportExcelDownloadResponse]);

  const fetchEcddReportDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(getEcddAmlReportDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetEcddReportData = useCallback(async () => {
    try {
      dispatch(ResetEcddReport());
    } catch (err) {}
  }, [dispatch]);
  const resetEcddPdf = useCallback(async () => {
    try {
      dispatch(ResetEcddDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetEcddReportData();
    setTable(false);
  }, [resetEcddReportData]);
  useEffect(() => {
    resetEcddPdf();
  }, [resetEcddPdf]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  useEffect(() => {
    if (EcddAmlReportResponse?.data) {
      setIsLoading(false);
    }
  }, [EcddAmlReportResponse]);
 
  

  const downloadPdf = () => {
    setIsLoading(true);
    fetchEcddReportDownload(data, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchEcddReportDownload(data, fileExcel);
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
      inputCode: "%2b60",
      startDate: "",
      EndDate: "",
      Country: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      startDate: "",
      EndDate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      Country: "",
    });
    resetEcddReportData();
  };
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);
    setCountryCode(obj.code);
    setFilterValue({ ...filterValue, ["Country"]: obj.description });
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
      title: "Txn Ref No",
      dataIndex: "transactionRefNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNo?.localeCompare(b.transactionRefNo),
      },
    },
    {
      title: "Txn Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate?.localeCompare(b.transactionDate),
      },
    },

    {
      title: "Sender Name",
      dataIndex: "senderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderName?.localeCompare(b.senderName),
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
      title: "Mobile No",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverName?.localeCompare(b.receiverName),
      },
    },
    {
      title: "Sender Amount(RM)",
      dataIndex: "senderAmount",
      checked: true,
      sorter: (a: any, b: any) => a.senderAmount - b.senderAmount,
    },

    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      checked: true,
      sorter: (a: any, b: any) => a.serviceCharge - b.serviceCharge,
    },
    {
      title: "GST",
      dataIndex: "gst",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.gst?.localeCompare(b.gst),
      },
    },

    {
      title: "Salary",
      dataIndex: "salary",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.salary?.localeCompare(b.salary),
      },
    },
    {
      title: "Relationship",
      dataIndex: "relationship",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.relationship?.localeCompare(b.relationship),
      },
    },
    {
      title: "Source Of Income",
      dataIndex: "sourceOfIncome",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.sourceOfIncome?.localeCompare(b.sourceOfIncome),
      },
    },
    {
      title: "Sender Match Found in Sanctions List",
      dataIndex: "senderMatchedInSanctions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.senderMatchedInSanctions?.localeCompare(b.senderMatchedInSanctions),
      },
    },
    {
      title: "Sender in PEPS",
      dataIndex: "senderMatchedInPeps",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.senderMatchedInPeps?.localeCompare(b.senderMatchedInPeps),
      },
    },
    {
      title: "Sender in HRC",
      dataIndex: "senderMatchedInHrc",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.senderMatchedInHrc?.localeCompare(b.senderMatchedInHrc),
      },
    },
  ];
  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate,
    endDate: filterValue.EndDate,
    country: countryCodeData,
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        endDate: filterValue.EndDate,
        country: countryCodeData,
      };
      fetchEcddAmlReport(record);
    }
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.startDate,
    ToDate: filterValue.EndDate,
    Country: countryCodeData,
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
          RightContent={"ECDD Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite ECDDReport mt-3 p-3">
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
                    className="ECDDReport-input"
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
                    value={filterValue.EndDate}
                    name="EndDate"
                    onChange={handleChange}
                    className="ECDDReport-input"
                    min={filterValue.startDate}
                    max={dates}
                  ></Input>
                </FormGroup>
              </div>

              <div className="col-3">
                <FormGroup>
                  <Label for="exampleEmail">Country</Label>
                  <Select
                                  defaultValue="ALL"

                    showSearch
                    placeholder="Select"
                    onChange={handleChangeCode}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="EcddReport-input ECDDReport-select-box form-control border-0 cursor"
                    value={filterValue.Country}
                    style={{ height: "38px" }}
                  >
                    {countryCode &&
                      countryCode.length > 0 &&
                      countryCode.map((value: any) => {
                        return (
                          <Option
                            className="ECDDReport-select-box"
                            value={JSON.stringify(value)}
                          >
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default ECDDReport;
