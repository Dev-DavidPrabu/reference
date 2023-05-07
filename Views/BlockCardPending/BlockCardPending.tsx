import React, { useCallback, useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import "./BlockCardPending.scss";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  CardBlockDownloadReports,
  getCardBlockReports,
  resetCardBlockReports,
  resetExcelRecords,
  resetPDFRecords,
} from "../../redux/action/CardBlockReportsAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import { getAllReferenceData } from "../../redux/action/ReferenceDataAction";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";

const BlockCardPending = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [button, setButton] = useState(true);

  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [report, setReport] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    startDate: "",
    enddate: "",
    inputCode: "%2b60",
    cardUrn: "",
    requestReason: "ALL",
    requestChannel: "ALL",
    status: "ALL",
    cardlastfourdigit: "",
    sourceCode:"",
    Idnumber:"",
  });
  const [error, setError] = useState({
    statusDescriptionError: "",
  });

  const dispatch = useDispatch();
  let filePdf = "pdf";
  let fileExcel = "Excel";
  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate,
    endDate: filterValue.enddate,
    cardurn: filterValue.cardUrn,
    requestReason: filterValue.requestReason,
    requestChannel: filterValue.requestChannel,
    status: filterValue.status,
    cardlastfourdigit: filterValue.cardlastfourdigit,
    sourceCode:filterValue.sourceCode,
    idNumber:filterValue.Idnumber,
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
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
    "Card Urn": filterValue.cardUrn,
    RequestReason: filterValue.requestReason ? filterValue.requestReason : "",
    RequestChannel: filterValue.requestChannel,
    Status: filterValue.status,
    "Card Last Four Digit": filterValue.cardlastfourdigit,
    idNumber:filterValue.Idnumber,
    sourceCode:filterValue.sourceCode
  };

  let referenceName = "cardblockreason";

  const referenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.referenceReducer.getAllReferenceDataResponse
  );
  const cardBlockReportsPending: any = useSelector(
    (state: RootStateOrAny) =>
      state.CardBlockReportsReducer.getcardBlockReportsResponse
  );
  const BlockCardPendingDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.CardBlockReportsReducer?.getcardBlockReportPdfResponse
  );

  const BlockCardPendingDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.CardBlockReportsReducer?.getcardBlockReportExcelResponse
  );

  const fetchAllReferencedata = useCallback(async () => {
    try {
      dispatch(getAllReferenceData(referenceName));
    } catch (err) {}
  }, [dispatch]);

  const fetchIdExpiring = useCallback(
    async (filterValue: any) => {
      try {
        dispatch(getCardBlockReports(filterValue));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCardBlockReports());
    } catch (err) {}
  }, [dispatch]);

  const fetchBlockCardPendingDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(CardBlockDownloadReports(data, type));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (cardBlockReportsPending) {
      if (cardBlockReportsPending?.data) {
        setIsLoading(false);
      }
    }
  }, [cardBlockReportsPending]);

  useEffect(() => {
    fetchAllReferencedata();
  }, [fetchAllReferencedata]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  useEffect(() => {
    if (BlockCardPendingDownloadPdf?.data) {
      setIsLoading(false);
      if (BlockCardPendingDownloadPdf?.data?.reportURL) {
        window.location.href = BlockCardPendingDownloadPdf?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (BlockCardPendingDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetPDFRecords());
    }
  }, [BlockCardPendingDownloadPdf]);

  useEffect(() => {
    if (BlockCardPendingDownloadExcel?.data) {
      setIsLoading(false);
      if (BlockCardPendingDownloadExcel?.data?.reportURL) {
        window.location.href = BlockCardPendingDownloadExcel?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (BlockCardPendingDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetExcelRecords());
    }
  }, [BlockCardPendingDownloadExcel]);

  const reportsData = cardBlockReportsPending?.data;
  let newReferenceData = referenceData?.data;

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
      dataIndex: "status",
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
    // {

    //   title: "ID Doc Number",
    //   dataIndex: "idNumber",
    //   checked: true,
    //   sorter: {
    //     compare: (a: any, b: any) =>
    //       a.idDocNumber?.localeCompare(b.idDocNumber),
    //   },
    // },
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
    {
      title: "Id Number",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNumber?.localeCompare(b.idNumber),
      },
    },
  ];

  const handleChange = (e: any) => {
    setReport(true);
    setButton(true);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);

    setButton(true);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      cardUrn: "",
      requestReason: "ALL",
      requestChannel: "ALL",
      status: "ALL",
      cardlastfourdigit: "",
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
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setButton(true);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "",
      cardUrn: "",
      requestReason: "ALL",
      requestChannel: "ALL",
      status: "ALL",
      cardlastfourdigit: "",
      sourceCode:"",
      Idnumber:"",
    });
    resetData();
  };

  const downloadPdf = () => {
    setIsLoading(true);
    fetchBlockCardPendingDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchBlockCardPendingDownloadReport(data, fileExcel);
  };

  const handleSubmit = () => {
    if (Validation()) {
      setIsLoading(true);
      fetchIdExpiring(data);
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      setReport(false);
      setButton(false);
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
          RightContent={"SRF Block Card"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite BlockCardPending mt-3 p-3">
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
                      className="border-1 inputcode form-select btn--sizer"
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
                      className="BlockCardPending-input"
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
                    className="BlockCardPending-input"
                    min={Mindates}
                    max={dates}
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
                    className="BlockCardPending-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Card Urn</Label>
                  <Input
                    type="number"
                    className="BlockCardPending-input"
                    onChange={handleChange}
                    name="cardUrn"
                    value={filterValue.cardUrn}
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Request Reason</Label>
                  <Input
                    type="select"
                    className="form-select BlockCardPending-select-box"
                    onChange={handleChange}
                    name="requestReason"
                    value={filterValue.requestReason}
                  >
                    <option value="ALL">ALL</option>
                    {newReferenceData?.map((value) => {
                      return (
                        <React.Fragment key={value.id}>
                          <option value={value.code}>
                            {value.description.replace(/[^a-zA-Z ]/g, " ")}
                          </option>
                        </React.Fragment>
                      );
                    })}
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="number">Request Channel</Label>
                  <Input
                    type="select"
                    className="form-select BlockCardPending-select-box"
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
                checkLength={reportsData.length}
                DisableMange={true}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default BlockCardPending;
