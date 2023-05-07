import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Input, FormGroup, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  DownloadOnboardSummaryReport,
  OnboardingSummaryReports,
  resetOnboardingSummaryDownloadExcel,
  resetOnboardingSummaryDownloadPdf,
  resetOnboardingSummaryReports,
} from "../../redux/action/OnboardingSummaryReportAction";
import "./OnboardingSummaryReport.scss";
import { getAllCardType } from "../../redux/action/CardTypeAction";
import { Select } from "antd";

const OnBoardingSummaryReport = () => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    startDate: "",
    endDate: "",
    brand: "ALL",
    cardType: "ALL",
  });
  const { Option } = Select;

  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    cardDescriptionError: "",
    brandDescriptionError: "",
  });

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const OnboardingSummaryReport = useSelector(
    (state: RootStateOrAny) =>
      state.OnboardingSummaryReducer?.getOnboardSummaryResponseReport
  );
  const OnboardingSummaryReportDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.OnboardingSummaryReducer?.getOnboardingSummaryDownloadPdfResponse
  );
  const OnboardingSummaryReportDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.OnboardingSummaryReducer?.getOnboardingSummaryDownloadExcelResponse
  );

  useEffect(() => {
    if (OnboardingSummaryReportDownloadPdf?.data) {
      setIsLoading(false);
      if (OnboardingSummaryReportDownloadPdf?.data?.reportURL) {
        window.location.href =
          OnboardingSummaryReportDownloadPdf?.data?.reportURL;
      }
      dispatch(resetOnboardingSummaryDownloadPdf());
    } else if (OnboardingSummaryReportDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetOnboardingSummaryDownloadPdf());
    }
  }, [OnboardingSummaryReportDownloadPdf]);

  useEffect(() => {
    if (OnboardingSummaryReportDownloadExcel?.data) {
      setIsLoading(false);
      if (OnboardingSummaryReportDownloadExcel?.data?.reportURL) {
        window.location.href =
          OnboardingSummaryReportDownloadExcel?.data?.reportURL;
      }
      dispatch(resetOnboardingSummaryDownloadExcel());
    } else if (OnboardingSummaryReportDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetOnboardingSummaryDownloadExcel());
    }
  }, [OnboardingSummaryReportDownloadExcel]);

  const fetchonboardingSummaryReportDownload = useCallback(
    async (value: any, fileType: string) => {
      try {
        dispatch(DownloadOnboardSummaryReport(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const header = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderName?.localeCompare(b.senderName),
      },
    },
    {
      title: "Teller Name",
      dataIndex: "tellerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.name?.localeCompare(b.name),
      },
    },
    {
      title: "Tablet Id",
      dataIndex: "tabletId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.id?.localeCompare(b.id),
      },
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branch?.localeCompare(b.branch),
      },
    },
    {
      title: "Card Type",
      dataIndex: "cardType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.type?.localeCompare(b.type),
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.date?.localeCompare(b.date),
      },
    },
    {
      title: "Approved Count",
      dataIndex: "approvedCount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approve?.localeCompare(b.approve),
      },
    },
    {
      title: "Declined Count",
      dataIndex: "rejectedCount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.decline?.localeCompare(b.decline),
      },
    },
  ];
  const reportsData = OnboardingSummaryReport?.data;
  const fetchcardTypedata = useCallback(async () => {
    try {
      dispatch(getAllCardType());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchcardTypedata();
  }, [fetchcardTypedata]);

  const cardTypeData: any = useSelector(
    (state: RootStateOrAny) => state.CardTypeReducer.getCardTypeList
  );

  let cardTypeDataList = cardTypeData?.data;

  const fetchOnboardingReport = useCallback(
    (value: any) => {
      dispatch(OnboardingSummaryReports(value));
    },
    [dispatch]
  );
  const resetOnboardingSummary = useCallback(() => {
    try {
      dispatch(resetOnboardingSummaryReports());
    } catch (err) {}
  }, [dispatch]);
  const resetOnboardingSummaryPdf = useCallback(() => {
    try {
      dispatch(resetOnboardingSummaryDownloadPdf());
    } catch (err) {}
  }, [dispatch]);

  const fetchOnboardingDetailsDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(DownloadOnboardSummaryReport(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    resetOnboardingSummary();
    setTable(false);
  }, [resetOnboardingSummary]);

  useEffect(() => {
    resetOnboardingSummaryPdf();
  }, [resetOnboardingSummaryPdf]);
  useEffect(() => {
    if (OnboardingSummaryReport?.data) {
      setIsLoading(false);
    }
  }, [OnboardingSummaryReport]);
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
    let CardError = customValidator(
      "endDate",
      "CardError",
      filterValue.cardType
    );
    let BrandError = customValidator(
      "endDate",
      "BrandError",
      filterValue.brand
    );

    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        CardError === "null" &&
        BrandError === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartDateError,
        endDateDescriptionError: EndDateError,
        cardDescriptionError: CardError,
        brandDescriptionError: BrandError,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      cardDescriptionError: "",
      brandDescriptionError: "",
    });
    return true;
  };

  var data = {
    fromDate: filterValue.startDate,
    toDate: filterValue.endDate,
    brand: filterValue.brand,
    cardType: filterValue.cardType,
  };

  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);

      fetchOnboardingReport(data);
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
      brand: "",
      cardType: "",
      startDate: "",
      endDate: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      brand: "",
      cardType: "",
      startDate: "",
      endDate: "",
    });
    resetOnboardingSummary();
  };
  const handleChangeType = (e: any) => {
    if (e === "ALL") {
      setFilterValue({ ...filterValue, ["cardType"]: "ALL" });
    }else{
    let obj = JSON.parse(e);
    setFilterValue({ ...filterValue, ["cardType"]: obj.cardTypeCode });
  };
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchOnboardingDetailsDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchOnboardingDetailsDownload(filterValue, fileExcel);
  };

  let value = {
    brand: filterValue.brand,
    cardType: filterValue.cardType,
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
          RightContent={"Onboarding Summary Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite OnboardSummary mt-3 p-3">
            <p className="OnboardSummary-filterTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.endDateDescriptionError &&
                  error.brandDescriptionError &&
                  error.cardDescriptionError && (
                    <span className="colorRed">
                      *Indicators Fields should be mandatory
                    </span>
                  )}
              </p>
            </p>
            <div className="container-fluid">
              <div className="d-flex row align-items-end gap-3">
                <div className="col-2  p-0 ">
                  <FormGroup>
                    <Label for="exampleEmail">From Date</Label>
                    <span className="container-body-label-color">*</span>
                    <Input
                      type="date"
                      value={filterValue.startDate}
                      min={Mindates}
                      max={dates}
                      name="startDate"
                      onChange={handleChange}
                      className="OnboardSummary-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-2 p-0 ">
                  <FormGroup>
                    <Label for="exampleEmail">To Date</Label>
                    <span className="container-body-label-color">*</span>
                    <Input
                      type="date"
                      value={filterValue.endDate}
                      name="endDate"
                      min={filterValue.startDate}
                      max={dates}
                      onChange={handleChange}
                      className="OnboardSummary-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-2 p-0">
                  <FormGroup>
                  <Label for="number">Brand</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    className="form-select"
                    onChange={handleChange}
                    name="brand"
                    value={filterValue.brand}
                  >
                      <option value="ALL">ALL</option>
                      <option value="MTAMY">MTAMY</option>
                      <option value="MMPD">MMPD</option>
                  </Input>
                  </FormGroup>
                </div>
                <div className="col-2 p-0">
                  <FormGroup>
                    <Label for="exampleEmail">Card Type</Label>
                    <span className="container-body-label-color">*</span>
                    <Select
                      defaultValue="ALL"
                      showSearch
                      value={filterValue.cardType}
                      onChange={handleChangeType}
                      filterOption={(input: any, value: any) =>
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      id="fieldName1"
                      className="EcddReport-input ECDDReport-select-box form-control border-0 cursor"
                      style={{ height: "38px" }}
                    >
                                          <Option value="ALL">ALL</Option>
                      {cardTypeDataList &&
                        cardTypeDataList?.map((value:any) => {
                          return (
                            <Option value={JSON.stringify(value)}>
                              {value.cardTypeCode}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormGroup>
                </div>

                <div className=" col-4 mt-4 d-flex">
                  <button
                    className="generateBtn  border-0 "
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

export default OnBoardingSummaryReport;
