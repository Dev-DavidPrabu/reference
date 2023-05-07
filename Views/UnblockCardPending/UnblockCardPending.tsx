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
  getDownloadPdfResponse,
  getUnblockApproveResponse,
  resetCardUnBlockDoenloadExcel,
  resetCardUnBlockDoenloadPdf,
  resetCardUnBlockReports,
} from "../../redux/action/UnblockCardApprovedAction";
import "./UnblockCardPending.scss";

const UnblockCardPending = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [button, setButton] = useState(true);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [pdf, setPdf] = useState(false);
  const [report, setReport] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState({
    status: "ALL",
    mobileNumber: "",
    inputOperatorName: "",
    approverName: "",
    cardlastfourdigit: "",
    requestChannel: "ALL",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    cardurn: "",
    sourceCode:"",
    Idnumber:"",
  });
  const [error, setError] = useState({
    statusDescriptionError: "",
  });
  const dispatch = useDispatch();

  const pendingReport = useSelector(
    (state: RootStateOrAny) =>
      state.UnblockCardApprovedReducer?.getUnblockResponseReport
  );

  const reportsData = pendingReport?.data;

  const fetchPendingResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getUnblockApproveResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCardUnBlockReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  useEffect(() => {
    if (pendingReport) {
      if (pendingReport?.data) {
        setIsLoading(false);
      }
    }
  }, [pendingReport]);

  const UnBlockCardPendingDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.UnblockCardApprovedReducer?.downloadPdfResponse
  );
  const UnBlockCardPendingDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.UnblockCardApprovedReducer?.downloadExcelResponse
  );

  const fetchUnBlockCardPendingDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(getDownloadPdfResponse(data, type));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (UnBlockCardPendingDownloadPdf?.data) {
      setIsLoading(false);
      if (UnBlockCardPendingDownloadPdf?.data?.reportURL) {
        window.location.href = UnBlockCardPendingDownloadPdf?.data?.reportURL;
      }
      dispatch(resetCardUnBlockDoenloadPdf());
    } else if (UnBlockCardPendingDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetCardUnBlockDoenloadPdf());
    }
  }, [UnBlockCardPendingDownloadPdf]);

  useEffect(() => {
    if (UnBlockCardPendingDownloadExcel?.data) {
      setIsLoading(false);
      if (UnBlockCardPendingDownloadExcel?.data?.reportURL) {
        window.location.href = UnBlockCardPendingDownloadExcel?.data?.reportURL;
      }
      dispatch(resetCardUnBlockDoenloadExcel());
    } else if (UnBlockCardPendingDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetCardUnBlockDoenloadExcel());
    }
  }, [UnBlockCardPendingDownloadExcel]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    setIsLoading(true);
    fetchUnBlockCardPendingDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchUnBlockCardPendingDownloadReport(data, fileExcel);
  };
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
      status: "ALL",
      mobileNumber: "",
      inputOperatorName: "",
      approverName: "",
      cardlastfourdigit: "",
      requestChannel: "ALL",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      cardurn: "",
      sourceCode:"",
      Idnumber:"",
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setButton(true);
    setTable(false);
    setFilterValue({
      status: "ALL",
      mobileNumber: "",
      inputOperatorName: "",
      approverName: "",
      cardlastfourdigit: "",
      requestChannel: "ALL",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      cardurn: "",
      sourceCode:"",
      Idnumber:"",
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
      title: "SRF Status",
      dataIndex: "srfStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.srfStatus?.localeCompare(b.srfStatus),
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
      title: "ID Doc Number",
      dataIndex: "idDocNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idDocNumber?.localeCompare(b.idDocNumber),
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
      title: "Request channel",
      dataIndex: "requestChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestChannel?.localeCompare(b.requestChannel),
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
      title: "Source Code",
      dataIndex: "sourceCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.sourceCode?.localeCompare(b.sourceCode),
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
  ];
  var data = {
    status: filterValue.status ? filterValue.status : "",
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
    cardUrn: filterValue.cardurn ? filterValue.cardurn : "",
    inputOperatorName: filterValue.inputOperatorName
      ? filterValue.inputOperatorName
      : "",
    approverName: filterValue.approverName ? filterValue.approverName : "",
    requestChannel: filterValue.requestChannel
      ? filterValue.requestChannel
      : "",
      sourceCode : filterValue.sourceCode ? filterValue.sourceCode : "",
      idNumber : filterValue.Idnumber ? filterValue.Idnumber : "",
  };

  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
      fetchPendingResponse(data);
      setReport(false);
      setTable(true);
      setButton(false);
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
    CardUrn: filterValue.cardurn,
    "Maker Name": filterValue.inputOperatorName,
    "Approver Name": filterValue.approverName,
    "Request Channel": filterValue.requestChannel,
    status: filterValue.status,
    cardlastfourdigit: filterValue.cardlastfourdigit,
    sourceCode : filterValue.sourceCode,
    idNumber : filterValue.Idnumber,
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
          RightContent={"SRF UnBlock Card"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite UnblockCardPending mt-3 p-3">
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
                    min={Mindates}
                    max={dates}
                    onChange={handleChange}
                    className="UnblockCardPending-input"
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
                    className="UnblockCardPending-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Card Urn</Label>
                  <Input
                    type="number"
                    className="UnblockCardPending-input"
                    onChange={handleChange}
                    name="cardurn"
                    value={filterValue.cardurn}
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Maker Name</Label>
                  <Input
                    type="text"
                    className="UnblockCardApproved-input"
                    onChange={handleChange}
                    name="inputOperatorName"
                    value={filterValue.inputOperatorName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Approver Name</Label>
                  <Input
                    type="text"
                    className="BlockCardPending-input"
                    onChange={handleChange}
                    name="approverName"
                    value={filterValue.approverName}
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Request Channel</Label>
                  <Input
                    type="select"
                    className="BlockCardPending-select-box form-select"
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
                    className="form-select BlockCardPending-select-box"
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
              <div className="status_select_container">
                <FormGroup>
                  <Label for="number">Card Last Four Digit</Label>
                  <Input
                    type="text"
                    className="BlockCardPending-input"
                    onChange={handleChange}
                    name="cardlastfourdigit"
                    value={filterValue.cardlastfourdigit}
                  ></Input>
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
export default UnblockCardPending;
