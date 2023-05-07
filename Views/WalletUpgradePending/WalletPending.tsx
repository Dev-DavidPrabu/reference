import FileSaver from "file-saver";
import { truncateSync } from "fs";
import { useCallback, useEffect, useState } from "react";
import { AiFillFileExcel, AiFillFilePdf } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import {
  getWalletDownloadPdfResponse,
  getWalletupdateApproveResponse,
  resetCardUpgradeDownloadPdf,
  resetCardUpgradeReports,
  resetPDFRecords,
  resetExcelRecords,
} from "../../redux/action/WalletUpgradeAction";
import "./WalletPending.scss";

const WalletPending = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [button, setButton] = useState(true);
  const [Mindates, setMinDates] = useState("");

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
    requestChannel: "ALL",
    approvedWalletProduct: "",
    eligibleWalletProduct: "",
    status: "ALL",
    existingWalletProductName: "",
    idNumber:"",
    sourceCode:""
  });

  const [error, setError] = useState({
    statusDescriptionError: "",
  });

  const dispatch = useDispatch();

  const pendingWalletReport = useSelector(
    (state: RootStateOrAny) =>
      state.WalletUpgradeReducer?.getWalletResponseReport
  );

  let reportsData = pendingWalletReport?.data;

  const fetchPendingWalletResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getWalletupdateApproveResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (pendingWalletReport) {
      if (pendingWalletReport?.data) {
        setTable(true);
        setIsLoading(false);
      }
    }
  }, [pendingWalletReport]);

  const pendingWalletDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.WalletUpgradeReducer?.downloadWalletPdfResponse
  );

  const pendingWalletExcelDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.WalletUpgradeReducer.downloadWalletExcelResponse
  );

  

  useEffect(() => {
    if (pendingWalletExcelDownloadReport?.data) {
      setIsLoading(false);
      if (pendingWalletExcelDownloadReport?.data?.reportURL) {
        window.location.href =
          pendingWalletExcelDownloadReport?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (pendingWalletExcelDownloadReport?.error) {
      setIsLoading(false);
      dispatch(resetExcelRecords());
    }
  }, [pendingWalletExcelDownloadReport]);

  useEffect(() => {
    if (pendingWalletDownloadReport?.data) {
      setIsLoading(false);
      if (pendingWalletDownloadReport?.data?.reportURL) {
        window.location.href = pendingWalletDownloadReport?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (pendingWalletDownloadReport?.error) {
      setIsLoading(false);
      dispatch(resetPDFRecords());
    }
  }, [pendingWalletDownloadReport]);

  const fetchPendingWalletDownloadResponse = useCallback(
    (status: any, filePdf: any, data: any) => {
      try {
        dispatch(getWalletDownloadPdfResponse(status, filePdf, data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (pendingWalletDownloadReport) {
      if (pendingWalletDownloadReport?.data) {
        setTable(true);
      }
    }
  }, [pendingWalletDownloadReport]);

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    setButton(true);
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
      approvedWalletProduct: "",
      eligibleWalletProduct: "",
      existingWalletProductName: "",
      status: "ALL",
      idNumber:"",
      sourceCode:""
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setButton(true);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      panNumber: "",
      idDocType: "",
      requestChannel: "ALL",
      approvedWalletProduct: "",
      eligibleWalletProduct: "",
      existingWalletProductName: "",
      status: "ALL",
      idNumber:"",
      sourceCode:""
    });
    resetData();
  };
  const Validation = () => {
    let status = customValidator("status", "status", filterValue.status);
    if (!(status === "null")) {
      setError({
        statusDescriptionError: status,
      });
      return false;
    }
    setError({
      statusDescriptionError: "",
    });
    return true;
  };

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCardUpgradeReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);
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
      title: "Approved Wallet Product",
      dataIndex: "approvedWalletProduct",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvedWalletProduct?.localeCompare(b.approvedWalletProduct),
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
      title: "Card  L4D",
      dataIndex: "cardLastFourDigit",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardLastFourDigit?.localeCompare(b.cardLastFourDigit),
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
      title: "Eligible Wallet Product",
      dataIndex: "eligibleWalletProduct",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.eligibleWalletProduct?.localeCompare(b.eligibleWalletProduct),
      },
    },
    {
      title: "Existing Wallet Product Name",
      dataIndex: "existingWalletProductName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.existingWalletProductName?.localeCompare(
            b.existingWalletProductName
          ),
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
      title: "Request channel",
      dataIndex: "requestChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestChannel?.localeCompare(b.requestChannel),
      },
    },
    {
      title: "Source Code",
      dataIndex: "sourceCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.sourceCode?.localeCompare(b.sourceCode),
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
      title: "Nationality",
      dataIndex: "nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.nationality?.localeCompare(b.nationality),
      },
    },
  ];
  var data = {
    status: filterValue.status,
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
    approvedWalletProduct: filterValue.approvedWalletProduct
      ? filterValue.approvedWalletProduct
      : "",
    eligibleWalletProduct: filterValue.eligibleWalletProduct
      ? filterValue.eligibleWalletProduct
      : "",
    existingWalletProductName: filterValue.existingWalletProductName
      ? filterValue.existingWalletProductName
      : "",
      idNumber:filterValue.idNumber?filterValue?.idNumber:"",
      sourceCode:filterValue.sourceCode?filterValue.sourceCode:""
  };

  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
     
      fetchPendingWalletResponse(data);
      setReport(false);
      setButton(false);
    }
  };

  let status = filterValue.status;
  let filePdf = "pdf";
  let fileExcel = "Excel";

  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetCardUpgradeDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  
  const exportToData = (apiData: any, type: string) => {
    if (apiData.length !== 0 && pendingWalletDownloadReport?.length !== 0) {
      let file = new Blob([apiData?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `WalletPendingReports.${type}`);
    }
    resetDownloadDataPdf();
  };
  let DownloadType = pendingWalletDownloadReport?.headers?.["content-type"];

  useEffect(() => {
    if (
      pendingWalletDownloadReport?.length !== 0 &&
      pendingWalletDownloadReport !== undefined
    ) {
      if (DownloadType === "application/pdf") {
        exportToData(pendingWalletDownloadReport, ".pdf");
      }
      if (DownloadType === "application/vnd.ms-excel") {
        exportToData(pendingWalletDownloadReport, ".xlsx");
      }
      setIsLoading(false);
    }
  }, [pendingWalletDownloadReport]);

  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchPendingWalletDownloadResponse(status, filePdf, data);
      setIsLoading(true);
    }
  };
  const downloadExcel = () => {
    if (reportsData !== undefined) {
      fetchPendingWalletDownloadResponse(status, fileExcel, data);
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
    "Pan Number": filterValue.panNumber,
    idDocType: filterValue.idDocType ? filterValue.idDocType : "",
    "Request Channel": filterValue.requestChannel,
    "Approved WalletProduct": filterValue.approvedWalletProduct,
    "Eligible WalletProduct": filterValue.eligibleWalletProduct,
    "Existing WalletProductName": filterValue.existingWalletProductName,
    Status: filterValue.status,
    idNumber:filterValue.idNumber,
    sourceCode:filterValue.sourceCode
    
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
          RightContent={"Wallet Upgrade Report"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite WalletUpdatePending mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.statusDescriptionError && (
                  <span className="colorRed">* Fields are mandatory</span>
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
                  <Input
                    type="date"
                    value={filterValue.startDate}
                    name="startDate"
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className="WalletUpdatePending-input"
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
                    className="WalletUpdatePending-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Pan Number</Label>
                  <Input
                    type="number"
                    className="WalletUpdatePending-input"
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
                    className="WalletUpdatePending-input"
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

              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Approved WalletProduct</Label>
                  <Input
                    type="text"
                    className="WalletUpdatePending-input"
                    onChange={handleChange}
                    name="approvedWalletProduct"
                    value={filterValue.approvedWalletProduct}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Eligible WalletProduct</Label>
                  <Input
                    type="text"
                    className="WalletUpdatePending-input"
                    onChange={handleChange}
                    name="eligibleWalletProduct"
                    value={filterValue.eligibleWalletProduct}
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="existingWalletProductName">
                    Existing WalletProductName
                  </Label>
                  <Input
                    type="text"
                    className="WalletUpdatePending-input"
                    onChange={handleChange}
                    name="existingWalletProductName"
                    value={filterValue.existingWalletProductName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="status_select_container">
                <FormGroup>
                  <Label for="number">Status</Label>
                  <Input
                    type="select"
                    className="form-select BlockCardPending-select-box"
                    onChange={handleChange}
                    name="status"
                    value={filterValue.status}
                  >
                    <option value="ALL">ALL</option>
                    <option value="CREATED">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="ERROR">ERROR</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="existingWalletProductName">
                   Source Code
                  </Label>
                  <Input
                    type="text"
                    className="WalletUpdatePending-input"
                    onChange={handleChange}
                    name="sourceCode"
                    value={filterValue.sourceCode}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="existingWalletProductName">
                   Id Number
                  </Label>
                  <Input
                    type="text"
                    className="WalletUpdatePending-input"
                    onChange={handleChange}
                    name="idNumber"
                    value={filterValue.idNumber}
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
                EnableScroll={true}
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default WalletPending;
