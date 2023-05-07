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
  getSalesReport,
  resetSalesReport,
  resetSalesReportExcelDownload,
  resetSalesReportPdfDownload,
  SalesReportDownloadReport,
} from "../../redux/action/SalesReportAction";
import "./SalesReport.scss";

const Salesreport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [table, setTable] = useState(false);
  // const [cardType, setCardType] = useState("");
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [searchArea, setSearchArea] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    GroupName: "ALL",
    cardType: "ALL",
  });
  const [error, setError] = useState({
    fromDateDescriptionError: "",
    toDateDescriptionError: "",
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const SalesReport = useSelector(
    (state: RootStateOrAny) => state.SalesReportReducer?.getSalesReportresponse
  );
  const fetchSalesReport = useCallback(
    (value: any) => {
      dispatch(getSalesReport(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (SalesReport?.data) {
      setIsLoading(false);
    }
  }, [SalesReport]);

  const SalesReportPdfDownload = useSelector(
    (state: RootStateOrAny) =>
      state.SalesReportReducer?.getSalesReportPdfDownloadReportResponse
  );
  const SalesReportExcelDownload = useSelector(
    (state: RootStateOrAny) =>
      state.SalesReportReducer?.getSalesReportExcelDownloadReportResponse
  );
  useEffect(() => {
    if (SalesReportPdfDownload?.data) {
      setIsLoading(false);
      if (SalesReportPdfDownload?.data?.reportURL) {
        window.location.href = SalesReportPdfDownload?.data?.reportURL;
      }
      dispatch(resetSalesReportPdfDownload());
    } else if (SalesReportPdfDownload?.error) {
      setIsLoading(false);
      dispatch(resetSalesReportPdfDownload());
    }
  }, [SalesReportPdfDownload]);
  useEffect(() => {
    if (SalesReportExcelDownload?.data) {
      setIsLoading(false);
      if (SalesReportExcelDownload?.data?.reportURL) {
        window.location.href = SalesReportExcelDownload?.data?.reportURL;
      }
      dispatch(resetSalesReportExcelDownload());
    } else if (SalesReportExcelDownload?.error) {
      setIsLoading(false);
      dispatch(resetSalesReportExcelDownload());
    }
  }, [SalesReportExcelDownload]);

  const fetchSalesDownloadReport = useCallback(
    async (data: any, pdf: any) => {
      try {
        dispatch(SalesReportDownloadReport(data, pdf));
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
      title: "Agent Name",
      dataIndex: "agentName",
      key: "agentName",
      sorter: {
        compare: (a: any, b: any) => a.agentName.localeCompare(b.agentName),
      },
      checked: true,
    },
    {
      title: "branchCode",
      dataIndex: "branchCode",
      key: "branchCode",
      sorter: {
        compare: (a: any, b: any) => a.branchCode.localeCompare(b.branchCode),
      },
      checked: true,
    },
    {
      title: "branchName",
      dataIndex: "branchName",
      key: "branchName",
      sorter: {
        compare: (a: any, b: any) => a.branchName.localeCompare(b.branchName),
      },
      checked: true,
    },
    {
      title: "cardType",
      dataIndex: "cardType",
      key: "cardType",
      sorter: {
        compare: (a: any, b: any) => a.cardType.localeCompare(b.cardType),
      },
      checked: true,
    },
    {
      title: "dateRange",
      dataIndex: "dateRange",
      key: "dateRange",
      sorter: {
        compare: (a: any, b: any) => a.dateRange.localeCompare(b.dateRange),
      },
      checked: true,
    },
    {
      title: "groupName",
      dataIndex: "groupName",
      key: "groupName",
      sorter: {
        compare: (a: any, b: any) => a.groupName.localeCompare(b.groupName),
      },
      checked: true,
    },
    {
      title: "numberOfRegistration",
      dataIndex: "numberOfRegistration",
      key: "numberOfRegistration",
      sorter: {
        compare: (a: any, b: any) =>
          a.numberOfRegistration.localeCompare(b.numberOfRegistration),
      },
      checked: true,
    },
  ];
  const reportsData = SalesReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetSalesReport());
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
    cardType: filterValue.cardType ? filterValue.cardType : "",
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
        cardType: filterValue.cardType,
      };
      fetchSalesReport(record);
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
      cardType: "ALL",
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
      cardType: "ALL",
    });
    resetDatas();
  };
  let filePdf = "pdf";
  let fileExcel = "Excel";
  const downloadPdf = () => {
    fetchSalesDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    fetchSalesDownloadReport(data, fileExcel);
  };

  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    GroupName: filterValue.GroupName,
    cardType: filterValue.cardType,
  };
  const handleChangeGroupName = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, GroupName: "ALL" });
    } else {
      let obj = JSON.parse(e);
      setFilterValue({ ...filterValue, GroupName: obj.userGroupName });
    }
  };
  const handleChangeCardType = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, cardType: "ALL" });
    } else {
      let obj = JSON.parse(e);

      setFilterValue({ ...filterValue, cardType: obj.cardTypeCode });
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
          RightContent={"Sales Report"}
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
            <div className="container-fluid filter_all_container">
              <div className="date_container">
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
                    className="SalesReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
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
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Card Type</Label>
                  <Select
                    showSearch
                    placeholder="Select"
                    onChange={handleChangeCardType}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="EcddReport-input ECDDReport-select-box form-control border-0 cursor"
                    value={filterValue.cardType}
                    style={{ height: "38px" }}
                  >
                    <Option value="ALL">ALL</Option>
                    {getCardType?.data &&
                      getCardType?.data.length > 0 &&
                      getCardType?.data.map((data: any) => {
                        return (
                          <Option
                            className="ECDDReport-select-box"
                            value={JSON.stringify(data)}
                          >
                            {data?.cardTypeCode}
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
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default Salesreport;
