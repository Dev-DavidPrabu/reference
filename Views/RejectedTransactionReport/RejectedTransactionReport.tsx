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
  getRejectedTransactionDownload,
  getRejectedTransactionReport,
  resetRejectedTransactionPdf,
  resetRejectedTransaction,
  resetPDFRecords,
  resetExcelRecords,
} from "../../redux/action/RejectedTransactionReportAction";
import "./RejectedTransactionReport.scss";

const RejectedTransactionReport = () => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [columns, setcolumns] = useState([]);
  const [pdf, setPdf] = useState(false);
  const [filterValue, setFilterValue] = useState({
    startDate: "",
    endDate: "",
    transactionRefNo: "",
    mobileNumber: "",
    inputCode: "%2b60",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    enddateDescriptionError: "",
  });

  const RejectedTransaction = useSelector(
    (state: RootStateOrAny) =>
      state.RejectedTransactionReportReducer?.getRejectedTransactionResponse
  );
  const RejectedTransactionPdfRes = useSelector(
    (state: RootStateOrAny) =>
      state.RejectedTransactionReportReducer?.getRejectedTransactionPdfResponse
  );

  const getRejectedTransactionEXCELResponse = useSelector(
    (state: RootStateOrAny) =>
      state.RejectedTransactionReportReducer
        ?.getRejectedTransactionEXCELResponse
  );
  const fetchRejectedTransactionReport = useCallback(
    async (value: any) => {
      try {
        dispatch(getRejectedTransactionReport(value));
      } catch (err: any) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (getRejectedTransactionEXCELResponse?.data) {
      setIsLoading(false);
      if (getRejectedTransactionEXCELResponse?.data?.reportURL) {
        window.location.href =
          getRejectedTransactionEXCELResponse?.data?.reportURL;
      }
      resetExcelRecords();
    } else if (getRejectedTransactionEXCELResponse?.error) {
      setIsLoading(false);
      dispatch(resetExcelRecords());
    }
  }, [getRejectedTransactionEXCELResponse]);

  useEffect(() => {
    if (RejectedTransactionPdfRes?.data) {
      setIsLoading(false);
      if (RejectedTransactionPdfRes?.data?.reportURL) {
        window.location.href = RejectedTransactionPdfRes?.data?.reportURL;
      }
      resetPDFRecords();
    } else if (RejectedTransactionPdfRes?.error) {
      setIsLoading(false);
      dispatch(resetPDFRecords());
    }
  }, [RejectedTransactionPdfRes]);
  const fetchRejectedTransactionPdf = useCallback(
    async (value: any, fileType: any) => {
      try {
        dispatch(getRejectedTransactionDownload(value, fileType));
      } catch (err: any) {}
    },
    [dispatch]
  );

  const resetData = useCallback(async () => {
    try {
      dispatch(resetRejectedTransaction());
    } catch (err) {}
  }, [dispatch]);
  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetRejectedTransactionPdf());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (RejectedTransaction?.data) {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  useEffect(() => {
    resetDownloadDataPdf();
  }, [resetDownloadDataPdf]);
  let filePdf = "pdf";
  let fileExcel = "Excel";

  const exportToData = (apiData: any, type: string) => {
    if (apiData.length !== 0 && RejectedTransactionPdfRes?.length !== 0) {
      let file = new Blob([apiData?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `RejectedTransactionReport.${type}`);
    }
    resetDownloadDataPdf();
  };
  let DownloadType = RejectedTransactionPdfRes?.headers?.["content-type"];

  useEffect(() => {
    if (
      RejectedTransactionPdfRes?.length !== 0 &&
      RejectedTransactionPdfRes !== undefined
    ) {
      if (DownloadType === "application/pdf") {
        exportToData(RejectedTransactionPdfRes, ".pdf");
      }
      if (DownloadType === "application/vnd.ms-excel") {
        exportToData(RejectedTransactionPdfRes, ".xlsx");
      }
      setIsLoading(false);
    }
  }, [RejectedTransactionPdfRes]);
  let reportsData = RejectedTransaction?.data;

  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchRejectedTransactionPdf(filterValue, filePdf);

      setIsLoading(true);
    }
  };

  const downloadExcel = () => {
    if (reportsData !== undefined) {
      fetchRejectedTransactionPdf(filterValue, fileExcel);

      setIsLoading(true);
    }
  };

  const handleChange = (e: any) => {
    setFilteredArea(false);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      endDate: "",
      transactionRefNo: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      startDate: "",
      endDate: "",
      transactionRefNo: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
    resetData();
  };
  const Validation = () => {
    let startDate = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let enddate = customValidator("endDate", "endDate", filterValue.endDate);

    if (!(startDate === "null" && enddate === "null")) {
      setError({
        startDateDescriptionError: startDate,
        enddateDescriptionError: enddate,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      enddateDescriptionError: "",
    });
    return true;
  };
  const header = [
    {
      title: "Transaction Ref No",
      dataIndex: "transactionReferenceNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNo.localeCompare(b.transactionRefNo),
      },
    },
    {
      title: "Date",
      dataIndex: "dateOfReject",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.countryDescription.localeCompare(b.countryDescription),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileNo.localeCompare(b.mobileNo),
      },
    },
    {
      title: "Currency",
      dataIndex: "currency",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.currency.localeCompare(b.currency),
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.amount.localeCompare(b.amount),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
    },
  ];

  var data = {
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.endDate ? filterValue.endDate : "",
    transactionRefNo: filterValue.transactionRefNo
      ? filterValue.transactionRefNo
      : "",
  };
  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);

      var record = {
        startdDate: filterValue.startDate,
        endDate: filterValue.endDate,
        transactionRefNo: filterValue.transactionRefNo,
        mobileNumber: filterValue.mobileNumber,
        inputCode: filterValue.inputCode,
      };
      fetchRejectedTransactionReport(record);
    }
  };
  let value = {
    "From Date": filterValue.startDate
      ? filterValue.startDate.slice(8, 10) +
        "/" +
        filterValue.startDate.slice(5, 7) +
        "/" +
        filterValue.startDate.slice(0, 4)
      : "",
    "To Date": filterValue.endDate
      ? filterValue.endDate.slice(8, 10) +
        "/" +
        filterValue.endDate.slice(5, 7) +
        "/" +
        filterValue.endDate.slice(0, 4)
      : "",
    "Transaction Ref No": filterValue.transactionRefNo,
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
          RightContent={"Rejected Transaction Report"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite rejectedTransaction mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.enddateDescriptionError && (
                    <span className="EndOfDayReport-colorRed">
                      * Fields are mandatory
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
                      className="border-1 btn--sizer inputcode form-select"
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
                    min={Mindates}
                    max={dates}
                    className="rejectedTransaction-input"
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
                    className="rejectedTransaction-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Transaction Ref No</Label>
                  <Input
                    type="text"
                    className="rejectedTransaction-input"
                    onChange={handleChange}
                    name="transactionRefNo"
                    value={filterValue.transactionRefNo}
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
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default RejectedTransactionReport;
