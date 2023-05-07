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
  getKYCDownloadPdfResponse,
  getKYCupdateApproveResponse,
  resetKycUpdateDowmloadPdf,
  resetKycUpdateReports,
} from "../../redux/action/KYCupdateAction";
import "./KYCUpdateApproved.scss";

const KYCUpdateApproved = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [report, setReport] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    panNumber: "",
    idDocType: "",
    requestChannel: "",
  });
  const [error, setError] = useState({
    mobileNumberDescriptionError: "",
    startDateDescriptionError: "",
    enddateDescriptionError: "",
    panNumberDescriptionError: "",
    requestReasonDescriptionError: "",
    requestChannelDescriptionError: "",
  });

  const dispatch = useDispatch();

  const approvalKYCReport = useSelector(
    (state: RootStateOrAny) => state.KYCupdateReducer?.getKYCResponseReport
  );

  const reportsData = approvalKYCReport?.data;

  const fetchApprovalKYCResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getKYCupdateApproveResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (reportsData) {
      setIsLoading(false);
      setTable(true);
    }
  }, [reportsData]);

  const approvalKYCDownloadReport = useSelector(
    (state: RootStateOrAny) => state.KYCupdateReducer?.downloadKYCPdfResponse
  );

  const fetchApprovalKYCDownloadResponse = useCallback(
    (pdf: any, data: any) => {
      try {
        dispatch(getKYCDownloadPdfResponse(pdf, data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (approvalKYCDownloadReport) {
      if (approvalKYCDownloadReport?.data) {
        setIsLoading(false);
      }
    }
  }, [approvalKYCDownloadReport]);

  const resetData = useCallback(async () => {
    try {
      dispatch(resetKycUpdateReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const handleChange = (e: any) => {
    setReport(true);
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
      enddate: "",
      mobileNumber: "",
      inputCode: "",
      panNumber: "",
      idDocType: "",
      requestChannel: "",
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      panNumber: "",
      idDocType: "",
      requestChannel: "",
    });
    resetData();
  };

  const Validation = () => {
    let mobileNumberError = customValidator(
      "idExpiring",
      "Any",
      filterValue.mobileNumber
    );
    let startDate = customValidator("idExpiring", "Any", filterValue.startDate);
    let enddate = customValidator("idExpiring", "Any", filterValue.enddate);
    let panNumber = customValidator("idExpiring", "Any", filterValue.panNumber);
    let requestReason = customValidator(
      "idExpiring",
      "Any",
      filterValue.idDocType
    );
    let requestChannel = customValidator(
      "idExpiring",
      "Any",
      filterValue.requestChannel
    );
    if (
      !(
        mobileNumberError === "null" ||
        startDate === "null" ||
        enddate === "null" ||
        panNumber === "null" ||
        requestReason === "null" ||
        requestChannel === "null"
      )
    ) {
      setError({
        mobileNumberDescriptionError: mobileNumberError,
        startDateDescriptionError: startDate,
        enddateDescriptionError: enddate,
        panNumberDescriptionError: panNumber,
        requestReasonDescriptionError: requestReason,
        requestChannelDescriptionError: requestChannel,
      });
      return false;
    }
    setError({
      mobileNumberDescriptionError: "",
      startDateDescriptionError: "",
      enddateDescriptionError: "",
      panNumberDescriptionError: "",
      requestReasonDescriptionError: "",
      requestChannelDescriptionError: "",
    });
    return true;
  };
  const header = [
    {
      title: "Wallet id",
      dataIndex: "walletId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletId?.localeCompare(b.walletId),
      },
    },
    {
      title: "Customer name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.localeCompare(b.customerName),
      },
    },
    {
      title: "Mobile number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Card  L4D",
      dataIndex: "cardLastFourDigit",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardLastFourDigit?.localeCompare(b.cardLastFourDigit),
      },
    },
    {
      title: "Request reason code",
      dataIndex: "requestReasonCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestReasonCode?.localeCompare(b.requestReasonCode),
      },
    },
    {
      title: "Customer remarks",
      dataIndex: "customerRemarks",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerRemarks?.localeCompare(b.customerRemarks),
      },
    },
    {
      title: "Request channel",
      dataIndex: "requestChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestChannel?.localeCompare(b.requestChannel),
      },
    },
    {
      title: "Input operator Name",
      dataIndex: "inputOperatorName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.inputOperatorName?.localeCompare(b.inputOperatorName),
      },
    },
    {
      title: "Input time",
      dataIndex: "inputTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.inputTime?.localeCompare(b.inputTime),
      },
    },
    {
      title: "Approver Name",
      dataIndex: "approverName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approverName?.localeCompare(b.approverName),
      },
    },
    {
      title: "Approver remarks",
      dataIndex: "approverRemarks",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approverRemarks?.localeCompare(b.approverRemarks),
      },
    },
    {
      title: "Approval time",
      dataIndex: "approvalTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvalTime?.localeCompare(b.approvalTime),
      },
    },
    {
      title: "Accounting auth  ref no",
      dataIndex: "accountingAuthRefNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingAuthRefNo?.localeCompare(b.accountingAuthRefNo),
      },
    },
    {
      title: "Accounting update times",
      dataIndex: "accountingUpdateTimes",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingUpdateTimes?.localeCompare(b.accountingUpdateTimes),
      },
    },
    {
      title: "Accounting response code",
      dataIndex: "accountingResponseCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingResponseCode?.localeCompare(b.accountingResponseCode),
      },
    },
    {
      title: "Accounting error message",
      dataIndex: "accountingErrorMessage",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingErrorMessage?.localeCompare(b.accountingErrorMessage),
      },
    },
  ];

  var data = {
    status: "APPROVED",
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
    panNumber: filterValue.panNumber ? filterValue.panNumber : "",
    idDocType: filterValue.idDocType ? filterValue.idDocType : "",
    requestChannel: filterValue.requestChannel
      ? filterValue.requestChannel
      : "",
  };
  const handleSubmit = () => {
    setIsLoading(true);
    fetchApprovalKYCResponse(data);
    setFilteredArea(true);
    setfilterOption(true);
    setReport(false);
  };
  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetKycUpdateDowmloadPdf());
    } catch (err) {}
  }, [dispatch]);

  const exportToData = (apiData: any, type: string) => {
    if (apiData.length !== 0 && approvalKYCDownloadReport?.length !== 0) {
      let file = new Blob([apiData?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `KycUpdateApproved.${type}`);
    }
    resetDownloadDataPdf();
  };
  let DownloadType = approvalKYCDownloadReport?.headers?.["content-type"];

  let status = "APPROVED";
  let filePdf = "pdf";
  let fileExcel = "Excel";

  useEffect(() => {
    if (
      approvalKYCDownloadReport?.length !== 0 &&
      approvalKYCDownloadReport !== undefined
    ) {
      if (DownloadType === "application/pdf") {
        exportToData(approvalKYCDownloadReport, ".pdf");
      }
      if (DownloadType === "application/vnd.ms-excel") {
        exportToData(approvalKYCDownloadReport, ".xlsx");
      }
      setIsLoading(false);
    }
  }, [approvalKYCDownloadReport]);

  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchApprovalKYCDownloadResponse(filePdf, data);
      setPdf(true);
      setIsLoading(true);
    }
  };
  const downloadExcel = () => {
    if (reportsData !== undefined) {
      fetchApprovalKYCDownloadResponse(fileExcel, data);
      setPdf(false);
      setIsLoading(true);
    }
  };

  let value = {
    "Mobile Number": filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    "From Date": filterValue.startDate
      ? filterValue.startDate.slice(8, 10) +
        "/" +
        filterValue.startDate.slice(5, 7) +
        "/" +
        filterValue.startDate.slice(0, 4)
      : "",
    "To Date": filterValue.enddate
      ? filterValue.enddate.slice(8, 10) +
        "/" +
        filterValue.enddate.slice(5, 7) +
        "/" +
        filterValue.enddate.slice(0, 4)
      : "",
    PanNumber: filterValue.panNumber,
    IdDocType: filterValue.idDocType,
    RequestChannel: filterValue.requestChannel,
  };

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Document Update Report- Approved"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite KYCUpdateApproved mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.mobileNumberDescriptionError ||
                  error.startDateDescriptionError ||
                  error.enddateDescriptionError ||
                  error.panNumberDescriptionError ||
                  error.requestReasonDescriptionError ||
                  (error.requestChannelDescriptionError && (
                    <span className="colorRed">
                      * Any one Field should be mandatory
                    </span>
                  ))}
              </p>
            </p>
            <div className="container-fluid filterInputAlign">
              <div className="d-flex col row">
                <div className="col-3">
                  <label className="kycUpdateApproved-label">
                    Mobile Number
                  </label>
                  <div className="col-8 row">
                    <Input
                      className="border-1 KYCUpdateApproved-inputcode form-select"
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
                      className="KYCUpdateApproved-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-3">
                  <FormGroup>
                    <Label for="exampleEmail">From Date</Label>
                    <Input
                      type="date"
                      value={filterValue.startDate}
                      name="startDate"
                      onChange={handleChange}
                      className="KYCUpdateApproved-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="exampleEmail">To Date</Label>
                    <Input
                      type="date"
                      value={filterValue.enddate}
                      name="enddate"
                      onChange={handleChange}
                      className="KYCUpdateApproved-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Pan Number</Label>
                    <Input
                      type="number"
                      className="KYCUpdateApproved-input"
                      onChange={handleChange}
                      name="panNumber"
                      value={filterValue.panNumber}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-3 ps-0">
                  <FormGroup>
                    <Label for="number">ID Doc Type</Label>
                    <Input
                      type="text"
                      className="KYCUpdateApproved-input"
                      onChange={handleChange}
                      name="idDocType"
                      value={filterValue.idDocType}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Request Channel</Label>
                    <Input
                      type="select"
                      className="form-select"
                      onChange={handleChange}
                      name="requestChannel"
                      value={filterValue.requestChannel}
                    >
                      <option value="">Select Channel</option>
                      <option value="ALL">ALL</option>
                      <option value="MET">MET</option>
                      <option value="MMP">MMP</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="mt-4 generate-btn-div col-6 d-flex justify-content-end">
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
      </>
    </div>
  );
};
export default KYCUpdateApproved;
