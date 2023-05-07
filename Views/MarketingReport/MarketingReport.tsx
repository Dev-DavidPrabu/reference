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
import { getAllCardType } from "../../redux/action/CardTypeAction";
import { getAllGroupName } from "../../redux/action/GroupRightsAction";
import {
  getMarketingReport,
  resetPDFRecords,
  resetExcelRecords,
  resetMarketingReports,
  MarketingReportDownloadReport,
} from "../../redux/action/MarketingReportAction";

function MarketingReport() {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [table, setTable] = useState(false);
  const [cardType, setCardType] = useState("");
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    GroupName: "ALL",
  });
  const [error, setError] = useState({
    fromDateDescriptionError: "",
    toDateDescriptionError: "",
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const MarketingReport = useSelector(
    (state: RootStateOrAny) =>
      state.MarketingReportReducer.getMarketingReportresponse
  );

  const MarketingPDFReportDownload = useSelector(
    (state: RootStateOrAny) =>
      state.MarketingReportReducer?.getMarketingReportDownloadReportPdfResponse
  );

  const MarketingExcelReportDownload = useSelector(
    (state: RootStateOrAny) =>
      state.MarketingReportReducer
        ?.getMarketingReportDownloadReportExcelResponse
  );

  useEffect(() => {
    if (MarketingPDFReportDownload?.data) {
      setIsLoading(false);
      if (MarketingPDFReportDownload?.data?.reportURL) {
        window.location.href = MarketingPDFReportDownload?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (MarketingPDFReportDownload?.error) {
      setIsLoading(false);
      dispatch(resetPDFRecords());
    }
  }, [MarketingPDFReportDownload]);

  useEffect(() => {
    if (MarketingExcelReportDownload?.data) {
      setIsLoading(false);
      if (MarketingExcelReportDownload?.data?.reportURL) {
        window.location.href = MarketingExcelReportDownload?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (MarketingExcelReportDownload?.error) {
      setIsLoading(false);
      dispatch(resetExcelRecords());
    }
  }, [MarketingExcelReportDownload]);

  const fetchMarketingReport = useCallback(
    (value: any) => {
      dispatch(getMarketingReport(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (MarketingReport?.data) {
      setIsLoading(false);
    }
  }, [MarketingReport]);

  const fetchMarketingDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(MarketingReportDownloadReport(data, type));
      } catch (err) {}
    },
    [dispatch]
  );
  const getGroupName = useSelector(
    (state: RootStateOrAny) => state.GroupRightsReducer.getAllGroupNames
  );
  const fetchgroupName = useCallback(async () => {
    try {
      dispatch(getAllGroupName());
    } catch (error) {}
  }, [dispatch]);
  useEffect(() => {
    fetchgroupName();
  }, [fetchgroupName]);
  const getCardType = useSelector(
    (state: RootStateOrAny) => state.CardTypeReducer?.getCardTypeList
  );

  const fetchCardType = useCallback(async () => {
    try {
      dispatch(getAllCardType());
    } catch (error) {}
  }, [dispatch]);
  useEffect(() => {
    fetchCardType();
  }, [fetchCardType]);

  const header = [
    {
      title: "Date",
      dataIndex: "dateRange",
      key: "dateRange",
      sorter: {
        compare: (a: any, b: any) => a.dateRange.localeCompare(b.dateRange),
      },
      checked: true,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName.localeCompare(b.customerName),
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
      title: "URN",
      dataIndex: "urn",
      key: "urn",
      sorter: {
        compare: (a: any, b: any) => a.urn.localeCompare(b.urn),
      },
      checked: true,
    },
    {
      title: "Source Code",
      dataIndex: "sourceCode",
      key: "sourceCode",
      sorter: {
        compare: (a: any, b: any) => a.sourceCode.localeCompare(b.sourceCode),
      },
      checked: true,
    },
    {
      title: "Card Type",
      dataIndex: "cardType",
      key: "cardType",
      sorter: {
        compare: (a: any, b: any) => a.cardType.localeCompare(b.cardType),
      },
      checked: true,
    },
    {
      title: "Login user",
      dataIndex: "loginUser",
      key: "loginUser",
      sorter: {
        compare: (a: any, b: any) => a.loginUser.localeCompare(b.loginUser),
      },
      checked: true,
    },
    {
      title: "Group name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: {
        compare: (a: any, b: any) => a.groupName.localeCompare(b.groupName),
      },
      checked: true,
    },
  ];

  const reportsData = MarketingReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetMarketingReports());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);
  var data = {
    fromDate: filterValue.fromDate ? filterValue.fromDate : "",
    toDate: filterValue.toDate ? filterValue.toDate : "",
    groupName: filterValue.GroupName ? filterValue.GroupName : "",
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
        GroupName: filterValue.GroupName,
      };

      fetchMarketingReport(record);
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
      GroupName: "ALL",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      fromDate: "",
      toDate: "",
      GroupName: "ALL",
    });
    resetDatas();
  };
  let filePdf = "pdf";
  let fileExcel = "Excel";
  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchMarketingDownloadReport(data, filePdf);
    }
  };
  const downloadExcel = () => {
    if (reportsData !== undefined) {
      fetchMarketingDownloadReport(data, fileExcel);
    }
  };
  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    GroupName: filterValue.GroupName,
  };
  const handleChangeGroupName = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, GroupName: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, GroupName: obj.userGroupName });
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
          RightContent={"Marketing Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite SalesReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.fromDateDescriptionError &&
                  error.toDateDescriptionError && (
                    <span className="colorRed">* Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filterInputAlign">
              <div className="d-flex col row align-items-end">
                <div className="col-3">
                  <FormGroup>
                    <Label className="salesreport-Label">From Date</Label>
                    <span className="container-body-label-color">*</span>
                    <Input
                      type="date"
                      value={filterValue.fromDate}
                      name="fromDate"
                      onChange={handleChange}
                      min={Mindates}
                      max={dates}
                      className="salesreport-Input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
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
                      className="SalesReport-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="exampleEmail">Group Name</Label>

                    <Select
                      showSearch
                      placeholder="Select"
                      onChange={handleChangeGroupName}
                      filterOption={(input: any, value: any) =>
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      id="fieldName1"
                      className="EcddReport-input ECDDReport-select-box form-control border-0 cursor"
                      value={filterValue.GroupName}
                      style={{ height: "38px" }}
                    >
                      <Option value="ALL">ALL</Option>
                      {getGroupName?.data &&
                        getGroupName?.data.length > 0 &&
                        getGroupName?.data.map((data: any) => {
                          return (
                            <Option
                              className="ECDDReport-select-box"
                              value={JSON.stringify(data)}
                            >
                              {data.userGroupName}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormGroup>
                </div>
                <div className="col-3">
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
}

export default MarketingReport;
