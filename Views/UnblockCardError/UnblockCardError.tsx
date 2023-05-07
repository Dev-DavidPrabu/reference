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
import "./UnblockCardError.scss";

const UnblockCardError = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [report, setReport] = useState(false);
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
  });
  const [error, setError] = useState({
    statusDescriptionError: "",
  });
  const dispatch = useDispatch();

  const errorReport = useSelector(
    (state: RootStateOrAny) =>
      state.UnblockCardApprovedReducer?.getUnblockResponseReport
  );
  const reportsData = errorReport?.data;

  const fetchErrorResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getUnblockApproveResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (errorReport) {
      if (errorReport?.data) {
        setIsLoading(false);
        setTable(true);
      }
    }
  }, [errorReport]);

  const UnBlockCardErrorDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.UnblockCardApprovedReducer?.downloadPdfResponse
  );
  const UnBlockCardErrorDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.UnblockCardApprovedReducer?.downloadExcelResponse
  );

  const fetchUnBlockCardErrorDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(getDownloadPdfResponse(data, type));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (UnBlockCardErrorDownloadPdf?.data) {
      setIsLoading(false);
      if (UnBlockCardErrorDownloadPdf?.data?.reportURL) {
        window.location.href = UnBlockCardErrorDownloadPdf?.data?.reportURL;
      }
      dispatch(resetCardUnBlockDoenloadPdf());
    } else if (UnBlockCardErrorDownloadPdf?.error) {
      setIsLoading(false);

      dispatch(resetCardUnBlockDoenloadPdf());
    }
  }, [UnBlockCardErrorDownloadPdf]);

  useEffect(() => {
    if (UnBlockCardErrorDownloadExcel?.data) {
      setIsLoading(false);
      if (UnBlockCardErrorDownloadExcel?.data?.reportURL) {
        window.location.href = UnBlockCardErrorDownloadExcel?.data?.reportURL;
      }
      dispatch(resetCardUnBlockDoenloadExcel());
    } else if (UnBlockCardErrorDownloadExcel?.error) {
      setIsLoading(false);

      dispatch(resetCardUnBlockDoenloadExcel());
    }
  }, [UnBlockCardErrorDownloadExcel]);

  const handleChange = (e: any) => {
    setReport(true);
    setFilteredArea(false);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCardUnBlockReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      status: "",
      mobileNumber: "",
      inputOperatorName: "",
      approverName: "",
      cardlastfourdigit: "",
      requestChannel: "",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      cardurn: "",
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      status: "",
      mobileNumber: "",
      inputOperatorName: "",
      approverName: "",
      cardlastfourdigit: "",
      requestChannel: "",
      startDate: "",
      enddate: "",
      inputCode: "%2b60",
      cardurn: "",
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
      dataIndex: "inputOperatorName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.inputOperatorName?.localeCompare(b.inputOperatorName),
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
  };
  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      setFilteredArea(true);
      setfilterOption(true);
      fetchErrorResponse(data);
      setReport(false);
      setTable(true);
    }
  };

  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetCardUnBlockDoenloadPdf());
    } catch (err) {}
  }, [dispatch]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    setIsLoading(true);

    fetchUnBlockCardErrorDownloadReport(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchUnBlockCardErrorDownloadReport(filterValue, fileExcel);
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
  };
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"SRF UnBlock Card - Error"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite UnblockCardError mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.statusDescriptionError && (
                  <span className="colorRed">* Fields are mandatory</span>
                )}
              </p>
            </p>
            <div className="container-fluid filterInputAlign">
              <div className="d-flex row">
                <div className="col-3">
                  <label className="UnBlockCardError-label">
                    Mobile Number
                  </label>
                  <div className="col-8 row">
                    <Input
                      className="border-1 UnblockCardError-inputcode form-select"
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
                      className="UnblockCardError-input"
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
                      className="UnblockCardError-input"
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
                      className="UnblockCardError-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Card Urn</Label>
                    <Input
                      type="number"
                      className="UnblockCardError-input"
                      onChange={handleChange}
                      name="cardurn"
                      value={filterValue.cardurn}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div className="row mt-2">
                <div className="ps-0 col-3">
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
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Approver Name</Label>
                    <Input
                      type="text"
                      className="UnblockCardApproved-input"
                      onChange={handleChange}
                      name="approverName"
                      value={filterValue.approverName}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="number" className="requestChannel-width">
                      Request Channel
                    </Label>
                    <Input
                      type="select"
                      className="UnblockCardError-select-box form-select"
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
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Status</Label>
                    <span className="container-body-label-color">*</span>

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
              </div>
              <div className="mt-2 row">
                <div className="col-3 ps-0">
                  <FormGroup>
                    <Label for="number">Card Last FourDigit</Label>
                    <Input
                      type="text"
                      className="BlockCardPending-input"
                      onChange={handleChange}
                      name="cardlastfourdigit"
                      value={filterValue.cardlastfourdigit}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="mt-4 d-flex justify-content-end col-9">
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
export default UnblockCardError;
