import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import {
  getWalletDownloadPdfResponse,
  getWalletupdateApproveResponse,
  resetCardUpgradeDownloadPdf,
  resetCardUpgradeReports,
} from "../../redux/action/WalletUpgradeAction";
import "./WalletRejected.scss";

const WalletRejected = () => {
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
    approvedWalletProduct: "",
    eligibleWalletProduct: "",
    existingWalletProductName: "",
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

  const rejectedWalletReport = useSelector(
    (state: RootStateOrAny) =>
      state.WalletUpgradeReducer?.getWalletResponseReport
  );

  let reportsData = rejectedWalletReport?.data;

  const fetchRejectedWalletResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getWalletupdateApproveResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (rejectedWalletReport) {
      if (rejectedWalletReport?.data) {
        setTable(true);
        setIsLoading(false);
      }
    }
  }, [rejectedWalletReport]);

  const rejectedWalletDownloadReport = useSelector(
    (state: RootStateOrAny) =>
      state.WalletUpgradeReducer?.downloadWalletPdfResponse
  );

  const fetchRejectedWalletDownloadResponse = useCallback(
    (status: any, filePdf: any, data: any) => {
      try {
        dispatch(getWalletDownloadPdfResponse(status, filePdf, data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (rejectedWalletDownloadReport) {
      if (rejectedWalletDownloadReport?.data) {
        setTable(true);
        setIsLoading(false);
      }
    }
  }, [rejectedWalletDownloadReport]);

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
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      panNumber: "",
      idDocType: "",
      requestChannel: "",
      approvedWalletProduct: "",
      eligibleWalletProduct: "",
      existingWalletProductName: "",
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      panNumber: "",
      idDocType: "",
      requestChannel: "",
      approvedWalletProduct: "",
      eligibleWalletProduct: "",
      existingWalletProductName: "",
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
      title: "Maker Name",
      dataIndex: "makerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.makerName?.localeCompare(b.makerName),
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
    {
      title: "IdDoc Expiry Date",
      dataIndex: "idDocExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocExpiryDate?.localeCompare(b.idDocExpiryDate),
      },
    },
    {
      title: "IdDoc Issue Date",
      dataIndex: "idDocIssueDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocIssueDate?.localeCompare(b.idDocIssueDate),
      },
    },
    {
      title: "IdDoc Number",
      dataIndex: "idDocNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocNumber?.localeCompare(b.idDocNumber),
      },
    },
    {
      title: "IdDoc Type",
      dataIndex: "idDocType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idDocType?.localeCompare(b.idDocType),
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
      title: "Eligible Wallet Product",
      dataIndex: "eligibleWalletProduct",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.eligibleWalletProduct?.localeCompare(b.eligibleWalletProduct),
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
  ];
  var data = {
    status: "REJECTED",
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
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setFilteredArea(true);
    setfilterOption(true);
    fetchRejectedWalletResponse(data);
    setReport(false);
  };

  let status = "REJECTED";
  let filePdf = "pdf";
  let fileExcel = "Excel";

  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetCardUpgradeDownloadPdf());
    } catch (err) {}
  }, [dispatch]);

  const exportToPdf = (apiData: any) => {
    if (apiData.length !== 0 && rejectedWalletDownloadReport?.length !== 0) {
      let file = new Blob([apiData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      if (pdf === true) {
        FileSaver.saveAs(file, "WalletRejectedReports.pdf");
      } else {
        FileSaver.saveAs(file, "WalletRejectedReports.xlsx");
      }
      resetDownloadDataPdf();
    }
  };
  const exportToData = (apiData: any, type: string) => {
    if (apiData.length !== 0 && rejectedWalletDownloadReport?.length !== 0) {
      let file = new Blob([apiData?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `WalletRejectedReports.${type}`);
    }
    resetDownloadDataPdf();
  };
  let DownloadType = rejectedWalletDownloadReport?.headers?.["content-type"];

  useEffect(() => {
    if (
      rejectedWalletDownloadReport?.length !== 0 &&
      rejectedWalletDownloadReport !== undefined
    ) {
      if (DownloadType === "application/pdf") {
        exportToData(rejectedWalletDownloadReport, ".pdf");
      }
      if (DownloadType === "application/vnd.ms-excel") {
        exportToData(rejectedWalletDownloadReport, ".xlsx");
      }
      setIsLoading(false);
    }
  }, [rejectedWalletDownloadReport]);

  const downloadPdf = () => {
    if (reportsData !== undefined) {
      fetchRejectedWalletDownloadResponse(status, filePdf, data);
      setPdf(true);
      setIsLoading(true);
    }
  };
  const downloadExcel = () => {
    if (reportsData !== undefined) {
      fetchRejectedWalletDownloadResponse(status, fileExcel, data);
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
    "Pan Number": filterValue.panNumber,
    idDocType: filterValue.idDocType ? filterValue.idDocType : "",
    "Request Channel": filterValue.requestChannel,
    "Approved WalletProduct": filterValue.approvedWalletProduct,
    "Eligible WalletProduct": filterValue.eligibleWalletProduct,
    "Existing WalletProductName": filterValue.existingWalletProductName,
  };
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Wallet Upgrade Report- Rejected"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite WalletUpdateRejected mt-3 p-3">
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
              <div className="d-flex row">
                <div className="col">
                  <label className="walletRejected-label">Mobile Number</label>
                  <div className="col-8 row">
                    <Input
                      className="border-1 WalletUpdateRejected-inputcode form-select"
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
                      className="WalletUpdateRejected-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail">From Date</Label>
                    <Input
                      type="date"
                      value={filterValue.startDate}
                      name="startDate"
                      onChange={handleChange}
                      className="WalletUpdateRejected-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail">To Date</Label>
                    <Input
                      type="date"
                      value={filterValue.enddate}
                      name="enddate"
                      onChange={handleChange}
                      className="WalletUpdateRejected-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="number">Pan Number</Label>
                    <Input
                      type="number"
                      className="WalletUpdateRejected-input"
                      onChange={handleChange}
                      name="panNumber"
                      value={filterValue.panNumber}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="number">ID Doc Type</Label>
                    <Input
                      type="text"
                      className="WalletUpdateApproved-input"
                      onChange={handleChange}
                      name="idDocType"
                      value={filterValue.idDocType}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div className="d-flex row mt-2">
                <div className="col ps-0">
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
                      <option value="MET">MET</option>
                      <option value="MMP">MMP</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col ms-2">
                  <FormGroup>
                    <Label for="number" className="WalletMiniLabelwallet">
                      Approved WalletProduct
                    </Label>
                    <Input
                      type="text"
                      className="WalletUpdateApproved-input"
                      onChange={handleChange}
                      name="approvedWalletProduct"
                      value={filterValue.approvedWalletProduct}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="number">Eligible WalletProduct</Label>
                    <Input
                      type="text"
                      className="WalletUpdateApproved-input"
                      onChange={handleChange}
                      name="eligibleWalletProduct"
                      value={filterValue.eligibleWalletProduct}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="number" className="WalletMiniLabelwallet">
                      Existing WalletProductName
                    </Label>
                    <Input
                      type="text"
                      className="WalletUpdateApproved-input"
                      onChange={handleChange}
                      name="existingWalletProductName"
                      value={filterValue.existingWalletProductName}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="d-flex justify-content-end col mt-4 generate-btn-div">
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
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default WalletRejected;
