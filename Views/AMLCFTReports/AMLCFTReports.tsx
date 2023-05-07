import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileSaver from "file-saver";
import { Select } from "antd";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import {
  getAMLCFTReport,
  getAMLCFTReportDownlaod,
  ResetAMLCFTReport,
  ResetAMLCFTDownloadPdf,
} from "../../redux/action/AMLCFTReportsAction";
import "./AMLCFTReports.scss";
import CustomLoader from "../../Components/Loader/CustomLoader";

const AMLCFTReports = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);

  const [table, setTable] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);

  let dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    StartDate: "",
    EndDate: "",
    IDType: "ALL",
  });
  const [error, setError] = useState({
    StartDateDescriptionError: "",
    EndDateDescriptionError: "",
    IDTypeDescriptionError: "",
  });

  const IdtypeData = [
    { id: 1, type: "All" },
    { id: 2, type: "MYKas" },
    { id: 3, type: "MYKad" },
    { id: 4, type: "Kartu Tanda Penduduk (KTP) Indonesia" },
    { id: 5, type: "Foreign IC" },
    { id: 6, type: "Surat Penempatan Ketua Menteri" },
    { id: 7, type: "Passport" },
    { id: 8, type: "Visa" },
    { id: 9, type: "UNHCR Card" },
    { id: 10, type: "Border Pass" },
    { id: 11, type: "Overseas Worker Identification Card" },
    { id: 12, type: "IMM13" },
  ];

  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    FromDate: filterValue.StartDate,
    ToDate: filterValue.EndDate,
    IDType: filterValue.IDType,
  };
  const AMLCFTReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.AMLCFTReportsReducer?.getAmlcftReportResponse
  );
  const fetchAMLCFTReport = useCallback(
    (value: any) => {
      try {
        dispatch(getAMLCFTReport(value));
      } catch (err) {}
    },
    [dispatch]
  );
  const AMLCFTReportPdfRes = useSelector(
    (state: RootStateOrAny) =>
      state.AMLCFTReportsReducer?.getAmlcftReportDownloadResponse
  );
  const fetchAMLCFTReportPdf = useCallback(
    (value: any, fileType: string) => {
      try {
        dispatch(getAMLCFTReportDownlaod(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetAmlcftReportData = useCallback(async () => {
    try {
      dispatch(ResetAMLCFTReport());
    } catch (err) {}
  }, [dispatch]);
  const resetAmlcftPdf = useCallback(async () => {
    try {
      dispatch(ResetAMLCFTDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetAmlcftPdf();
  }, [resetAmlcftPdf]);
  useEffect(() => {
    resetAmlcftReportData();
    setTable(false);
  }, [resetAmlcftReportData]);

  let reportsData = AMLCFTReportResponse?.data;

  let filePdf = "pdf";
  let fileExcel = "Excel";
  const exportToData = (apiData: any, type: string) => {
    if (apiData.length !== 0 && AMLCFTReportPdfRes?.length !== 0) {
      let file = new Blob([apiData?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `AMLCFTReports.${type}`);
    }
    resetAmlcftPdf();
  };

  useEffect(() => {
    if (AMLCFTReportResponse?.data) {
      setIsLoading(false);
    }
  }, [AMLCFTReportResponse]);
  let DownloadType = AMLCFTReportResponse?.headers?.["content-type"];
  useEffect(() => {
    if (AMLCFTReportPdfRes?.length !== 0 && AMLCFTReportPdfRes !== undefined) {
      if (DownloadType === "application/pdf") {
        exportToData(AMLCFTReportPdfRes, ".pdf");
      }
      if (DownloadType === "application/vnd.ms-excel") {
        exportToData(AMLCFTReportPdfRes, ".xlsx");
      }
      setIsLoading(false);
    }
  }, [AMLCFTReportPdfRes]);

  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchAMLCFTReportPdf(data, filePdf);

      setIsLoading(true);
    }
  };
  const downloadExcel = () => {
    if (reportsData !== undefined) {
      fetchAMLCFTReportPdf(data, fileExcel);

      setIsLoading(true);
    }
  };

  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);
    setFilterValue({ ...filterValue, ["IDType"]: obj.type });
  };

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);

    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "%2b60",
      StartDate: "",
      EndDate: "",
      IDType: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "",
      StartDate: "",
      EndDate: "",
      IDType: "",
    });
    resetAmlcftReportData();
  };
  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.StartDate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.EndDate
    );
    let IDTypeError = customValidator(
      "idTypeCode",
      "idType",
      filterValue.IDType
    );

    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        IDTypeError === "null"
      )
    ) {
      setError({
        StartDateDescriptionError: StartDateError,
        EndDateDescriptionError: EndDateError,
        IDTypeDescriptionError: IDTypeError,
      });
      return false;
    }
    setError({
      StartDateDescriptionError: "",
      EndDateDescriptionError: "",
      IDTypeDescriptionError: "",
    });
    return true;
  };

  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.StartDate ? filterValue.StartDate : "",
    endDate: filterValue.EndDate ? filterValue.EndDate : "",
    IDType: filterValue.IDType ? filterValue.IDType : "",
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      setIsLoading(true);
      fetchAMLCFTReport(data);
    }
  };
  const header = [
    {
      title: "Total Transaction",
      dataIndex: "totalTransactions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalTransactions?.localeCompare(b.totalTransactions),
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.totalAmount - b.totalAmount,
      },
    },
    {
      title: "Id Type",
      dataIndex: "idType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType?.localeCompare(b.idType),
      },
    },
    {
      title: "Id No",
      dataIndex: "idNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNo?.localeCompare(b.idNo),
      },
    },
    {
      title: "Id Issue Country",
      dataIndex: "idIssueCountry",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idIssueCountry?.localeCompare(b.idIssueCountry),
      },
    },
    {
      title: "Id Issue Date",
      dataIndex: "idIssueDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idIssueDate?.localeCompare(b.idIssueDate),
      },
    },
    {
      title: "Id Expiry Date",
      dataIndex: "idExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idExpiryDate?.localeCompare(b.idExpiryDate),
      },
    },
    {
      title: "Sender Name",
      dataIndex: "sender",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.sender?.localeCompare(b.sender),
      },
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationality?.localeCompare(b.nationality),
      },
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.occupation?.localeCompare(b.occupation),
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
      title: "Job Title",
      dataIndex: "jobTitle",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.jobTitle?.localeCompare(b.jobTitle),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileNo?.localeCompare(b.mobileNo),
      },
    },
    {
      title: "Vip Customer",
      dataIndex: "vipCustomer",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.vipCustomer?.localeCompare(b.vipCustomer),
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
          RightContent={"AMLCFT Reports"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite AMLCFTReports mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.StartDateDescriptionError &&
                  error.EndDateDescriptionError &&
                  error.IDTypeDescriptionError && (
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
                    value={filterValue.StartDate}
                    name="StartDate"
                    onChange={handleChange}
                    className="AMLCFTReports-input"
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
                    min={filterValue.StartDate}
                    max={dates}
                    className="AMLCFTReports-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">ID Type</Label>
                  <span className="container-body-label-color">*</span>

                  <Select
                    showSearch
                    placeholder="Select"
                    onChange={handleChangeCode}
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="AmlcftSelectReports-input AMLCFTReports-select-box form-control border-0 cursor"
                    value={filterValue.IDType}
                    style={{ height: "38px" }}
                  >
                    {IdtypeData &&
                      IdtypeData.length > 0 &&
                      IdtypeData.map((item: any) => {
                        return (
                          <Option
                            className="AMLCFTReports-select-box"
                            value={JSON.stringify(item)}
                          >
                            {item.type}
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
export default AMLCFTReports;
