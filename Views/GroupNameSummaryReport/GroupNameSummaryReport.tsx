import { Select } from "antd";
import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Input, FormGroup, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import {
  GroupNameSummaryReports,
  resetGroupNameSummaryDownloadPdf,
  resetGroupNameSummaryReports,
  DownloadGroupNameSummaryReport,
  resetGroupNameSummaryDownloadExcel,
} from "../../redux/action/GroupNameSummaryReportAction";
import { getAllGroupName } from "../../redux/action/GroupRightsAction";
import "./GroupNameSummaryReport.scss";

const GroupNameSummaryReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    fromDate: "",
    toDate: "",
    groupName: "ALL",
  });
  const { Option } = Select;

  const [error, setError] = useState({
    fromDateDescriptionError: "",
    toDateDescriptionError: "",
    groupNameDescriptionError: "",
  });
  const dispatch = useDispatch();
  let filePdf = "pdf";
  let fileExcel = "Excel";
  const GroupNameSummaryReport = useSelector(
    (state: RootStateOrAny) =>
      state.GroupNameSummaryReducer?.getGroupNameSummaryResponseReport
  );
  const fetchGroupNameReport = useCallback(
    (value: any) => {
      dispatch(GroupNameSummaryReports(value));
    },
    [dispatch]
  );
  useEffect(() => {
    if (GroupNameSummaryReport?.data) {
      setIsLoading(false);
    }
  }, [GroupNameSummaryReport]);


  const GroupNameSummaryPdfDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.GroupNameSummaryReducer?.getGroupNameSummaryPdfDownloadResponse
  );
  const GroupNameSummaryExcelDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.GroupNameSummaryReducer?.getGroupNameSummaryExcelDownloadResponse
  );
  useEffect(() => {
    if (GroupNameSummaryPdfDownloadReport?.data) {
      setIsLoading(false);
      if (GroupNameSummaryPdfDownloadReport?.data?.reportURL) {
        window.location.href = GroupNameSummaryPdfDownloadReport?.data?.reportURL;
      }
      dispatch(resetGroupNameSummaryDownloadPdf());
    } else if (GroupNameSummaryPdfDownloadReport?.error) {
      setIsLoading(false);
      dispatch(resetGroupNameSummaryDownloadPdf());
    }
  }, [GroupNameSummaryPdfDownloadReport]);

  useEffect(() => {
    if (GroupNameSummaryExcelDownloadReport?.data) {
      setIsLoading(false);
      if (GroupNameSummaryExcelDownloadReport?.data?.reportURL) {
        window.location.href = GroupNameSummaryExcelDownloadReport?.data?.reportURL;
      }
      dispatch(resetGroupNameSummaryDownloadExcel());
    } else if (GroupNameSummaryExcelDownloadReport?.error) {
      setIsLoading(false);
      dispatch(resetGroupNameSummaryDownloadExcel());
    }
  }, [GroupNameSummaryExcelDownloadReport]);

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
  const resetGroupNameSummary = useCallback(() => {
    try {
      dispatch(resetGroupNameSummaryReports());
    } catch (err) {}
  }, [dispatch]);

  const fetchGroupNameSummaryDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(DownloadGroupNameSummaryReport(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const header = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
      checked: true,
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      sorter: {
        compare: (a: any, b: any) => a.groupName.localeCompare(b.groupName),
      },
      checked: true,
    },
    {
      title: "No Of Registration",
      dataIndex: "numberOfRegistration",
      key: "numberOfRegistration",
      sorter: {
        compare: (a: any, b: any) =>
          a.numberOfRegistration.localeCompare(b.numberOfRegistration),
      },
      checked: true,
    },
  ];
  const reportsData = GroupNameSummaryReport?.data;
  const resetDatas = useCallback(async () => {
    try {
      dispatch(resetGroupNameSummaryReports());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetDatas();
    setTable(false);
  }, [resetDatas]);
  var data = {
    fromDate: filterValue.fromDate ? filterValue.fromDate : "",
    toDate: filterValue.toDate ? filterValue.toDate : "",
    groupName: filterValue.groupName ? filterValue.groupName : "",
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
    let GroupnameError = customValidator(
      "groupName",
      "groupName",
      filterValue.groupName
    );
    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        GroupnameError === "null"
      )
    ) {
      setError({
        fromDateDescriptionError: StartDateError,
        toDateDescriptionError: EndDateError,
        groupNameDescriptionError: GroupnameError,
      });
      return false;
    }
    setError({
      fromDateDescriptionError: "",
      toDateDescriptionError: "",
      groupNameDescriptionError: "",
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
        groupName: filterValue.groupName,
      };
      fetchGroupNameReport(record);
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
      groupName: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      fromDate: "",
      toDate: "",
      groupName: "",
    });
    resetGroupNameSummary();
  };

  const downloadPdf = () => {
    setIsLoading(true);
    fetchGroupNameSummaryDownload(data, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchGroupNameSummaryDownload(data, fileExcel);
  };
  let value = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    groupName: filterValue.groupName,
  };
  const handleChangeGroupName = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, groupName: "ALL" });
    } else {
      let obj = JSON.parse(e);

      setFilterValue({ ...filterValue, groupName: obj.userGroupName });
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
          RightContent={"Group Name Summary Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite GroupNameSummaryReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.fromDateDescriptionError &&
                  error.toDateDescriptionError &&
                  error.groupNameDescriptionError && (
                    <span className="colorRed">* Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="filterInputAlign">
              <div className="d-flex row">
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail">From Date</Label>
                    <span className="container-body-label-color">*</span>

                    <Input
                      type="date"
                      value={filterValue.fromDate}
                      name="fromDate"
                      onChange={handleChange}
                      min={Mindates}
                      max={dates}
                      className="GroupNameSummaryReport-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
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
                      className="GroupNameSummaryReport-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail">Group Name</Label>
                    <span className="container-body-label-color">*</span>

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
                      value={filterValue.groupName}
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

                <div className="mt-4 col d-flex">
                  <button
                    className="generateBtn float-right border-0"
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

export default GroupNameSummaryReport;
