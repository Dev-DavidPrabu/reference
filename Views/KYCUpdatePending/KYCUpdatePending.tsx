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
  resetExcelRecords,
  resetKycUpdateDowmloadPdf,
  resetKycUpdateReports,
} from "../../redux/action/KYCupdateAction";
import "./KYCUpdatePending.scss";

const KYCUpdatePending = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [button, setButton] = useState(true);
  const [Mindates, setMinDates] = useState("");
  const [report, setReport] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    panNumber: "",
    idDocType: "",
    requestChannel: "ALL",
    status: "ALL",
    sourceCode : "",
    Idnumber : ""
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

  const pendingKYCReport = useSelector(
    (state: RootStateOrAny) => state.KYCupdateReducer?.getKYCResponseReport
  );

  let reportsData = pendingKYCReport?.data;

  const fetchPendingKYCResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getKYCupdateApproveResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (pendingKYCReport) {
      if (pendingKYCReport?.data) {
        setIsLoading(false);
      }
    }
  }, [pendingKYCReport]);

  const KYCUpdateDownloadPdf = useSelector(
    (state: RootStateOrAny) => state.KYCupdateReducer?.getKYCReportPdfResponse
  );
  const KYCUpdateDownloadExcel = useSelector(
    (state: RootStateOrAny) => state.KYCupdateReducer?.getKYCReportExcelResponse
  );

  const fetchKYCUpdateDownloadReport = useCallback(
    async (data: any, type: any) => {
      
      try {
        dispatch(getKYCDownloadPdfResponse(data, type));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (KYCUpdateDownloadPdf?.data) {
      setIsLoading(false);
      if (KYCUpdateDownloadPdf?.data?.reportURL) {
        window.location.href = KYCUpdateDownloadPdf?.data?.reportURL;
      }
      dispatch(resetKycUpdateDowmloadPdf());
    } else if (KYCUpdateDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetKycUpdateDowmloadPdf());
    }
  }, [KYCUpdateDownloadPdf]);

  useEffect(() => {
    if (KYCUpdateDownloadExcel?.data) {
      setIsLoading(false);
      if (KYCUpdateDownloadExcel?.data?.reportURL) {
        window.location.href = KYCUpdateDownloadExcel?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (KYCUpdateDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetExcelRecords());
    }
  }, [KYCUpdateDownloadExcel]);

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
    setButton(true);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setButton(true);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      panNumber: "",
      idDocType: "",
      requestChannel: "ALL",
      status: "ALL",
      sourceCode : "",
      Idnumber : ""
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setButton(true);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "",
      panNumber: "",
      idDocType: "",
      requestChannel: "ALL",
      status: "ALL",
      sourceCode : "",
      Idnumber : ""
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
      title: "Accounting auth  ref no",
      dataIndex: "accountingAuthRefNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingAuthRefNo?.localeCompare(b.accountingAuthRefNo),
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
      title: "Accounting update times",
      dataIndex: "accountingUpdateTimes",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingUpdateTimes?.localeCompare(b.accountingUpdateTimes),
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
          a.approverName?.localeCompare(b.approverName),
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
      title: "Customer Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.localeCompare(b.customerName),
      },
    },
    {
      title: "ID Doc Expiry Date",
      dataIndex: "idDocExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocExpiryDate?.localeCompare(b.idDocExpiryDate),
      },
    },
    {
      title: "ID Doc Issue Date",
      dataIndex: "idDocIssueDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocIssueDate?.localeCompare(b.idDocIssueDate),
      },
    },
    {
      title: "ID Doc Number",
      dataIndex: "idDocNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocNumber?.localeCompare(b.idDocNumber),
      },
    },
    {
      title: "ID Doc Type",
      dataIndex: "idDocType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idDocType?.localeCompare(b.idDocType),
      },
    },
    {
      title: "Initiator Name",
      dataIndex: "initiatorName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.initiatorName?.localeCompare(b.initiatorName),
      },
    },
    {
      title: "Initiator Time",
      dataIndex: "initiationTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.initiationTime?.localeCompare(b.initiationTime),
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
      title: "Nationality",
      dataIndex: "nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationality?.localeCompare(b.nationality),
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
      title: "SRF Status",
      dataIndex: "srfStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.srfStatus?.localeCompare(b.srfStatus),
      },
    },
    {
      title: "Wallet id",
      dataIndex: "walletId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletId?.localeCompare(b.walletId),
      },
    },
    {
      title: "Wallet Size",
      dataIndex: "walletSize",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletSize?.localeCompare(b.walletSize),
      },
    },
    {
      title: "Urn",
      dataIndex: "urn",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urn?.localeCompare(b.urn),
      },
    },
    {
      title: "Card Type",
      dataIndex: "cardType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardType?.localeCompare(b.cardType),
      },
    },
    {
      title: "Source Code",
      dataIndex: "sourceCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.sourceCode?.localeCompare(b.sourceCode),
      },
    }
    
  ];
  var data = {
    status: filterValue.status ? filterValue.status : "",

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
      sourceCode : filterValue.sourceCode ? filterValue.sourceCode : "",
      idNumber : filterValue.Idnumber ? filterValue.Idnumber : "",
  };
  const handleSubmit = () => {
    setIsLoading(true);
    fetchPendingKYCResponse(data);
    setFilteredArea(true);
    setfilterOption(true);
    setTable(true);
    setReport(false);
    setButton(false);
  };
  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetKycUpdateDowmloadPdf());
    } catch (err) {}
  }, [dispatch]);

  let filePdf = "pdf";
  let fileExcel = "Excel";
  
  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchKYCUpdateDownloadReport(data, filePdf);
      setIsLoading(true);
    }
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchKYCUpdateDownloadReport(data, fileExcel);
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
    status: filterValue.status,
    sourceCode : filterValue.sourceCode,
    idNumber : filterValue.Idnumber
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
          RightContent={"Document Update Report"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite KYCUpdatePending mt-3 p-3">
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
                      className="KYCUpdatePending-input"
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
                  <Input
                    type="date"
                    value={filterValue.startDate}
                    name="startDate"
                    min={Mindates}
                    max={dates}
                    onChange={handleChange}
                    className="KYCUpdatePending-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <Input
                    type="date"
                    value={filterValue.enddate}
                    name="enddate"
                    onChange={handleChange}
                    min={filterValue.startDate}
                    max={dates}
                    className="KYCUpdatePending-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Pan Number</Label>
                  <Input
                    type="number"
                    className="KYCUpdatePending-input"
                    onChange={handleChange}
                    name="panNumber"
                    value={filterValue.panNumber}
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
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
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Request Channel</Label>
                  <Input
                    type="select"
                    className="form-select"
                    onChange={handleChange}
                    name="requestChannel"
                    value={filterValue.requestChannel}
                  >
                    <option value="ALL">ALL</option>
                    <option value="MET">MET</option>
                    <option value="MMP">MMP</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="status_select_container">
                <FormGroup>
                  <Label for="number">Status</Label>

                  <Input
                    type="select"
                    className="form-select"
                    onChange={handleChange}
                    name="status"
                    value={filterValue.status}
                  >
                    <option value="ALL">ALL</option>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="ERROR">ERROR</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Source Code</Label>
                  <Input
                    type="text"
                    className="KYCUpdateApproved-input"
                    onChange={handleChange}
                    name="sourceCode"
                    value={filterValue.sourceCode}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Id Number</Label>
                  <Input
                    type="text"
                    className="KYCUpdateApproved-input"
                    onChange={handleChange}
                    name="Idnumber"
                    value={filterValue.Idnumber}
                  ></Input>
                </FormGroup>
              </div>
              <button
                className={`${
                  button
                    ? "generateBtn border-0 LOD_btn_margin"
                    : "disableButton LOD_btn_margin"
                }`}
                onClick={handleSubmit}
                disabled={button ? false : true}
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
                checkLength={reportsData?.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default KYCUpdatePending;
