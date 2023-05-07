import React from "react";
import FileSaver from "file-saver";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";

import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  CardBlockDownloadReports,
  getCardBlockReports,
  resetCardBlockReports,
  resetExcelRecords,
  resetPDFRecords,
} from "../../redux/action/CardBlockReportsAction";
import { getAllReferenceData } from "../../redux/action/ReferenceDataAction";
import "./BlockCardError.scss";

const BlockCardError = () => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(true);

  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  });
  const [error, setError] = useState({
    statusDescriptionError: "",
  });

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCardBlockReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const cardBlockReportsError: any = useSelector(
    (state: RootStateOrAny) =>
      state.CardBlockReportsReducer.getcardBlockReportsResponse
  );

  const referenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.referenceReducer.getAllReferenceDataResponse
  );
  let referenceName = "cardblockreason";
  const fetchAllReferencedata = useCallback(async () => {
    try {
      dispatch(getAllReferenceData(referenceName));
    } catch (err) {}
  }, [dispatch]);
  let newReferenceData = referenceData?.data;
  useEffect(() => {
    fetchAllReferencedata();
  }, [fetchAllReferencedata]);

  const reportsData = cardBlockReportsError?.data;

  useEffect(() => {
    if (cardBlockReportsError) {
      if (cardBlockReportsError?.data) {
        setIsLoading(false);
      }
    }
  }, [cardBlockReportsError]);

  var data = {
    status: filterValue.status ? filterValue.status : "",
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate ? filterValue.startDate : "",
    endDate: filterValue.enddate ? filterValue.enddate : "",
    cardurn: filterValue.cardUrn ? filterValue.cardUrn : "",
    requestReason: filterValue.requestReason ? filterValue.requestReason : "",
    requestChannel: filterValue.requestChannel
      ? filterValue.requestChannel
      : "",
    cardlastfourdigit: filterValue.cardlastfourdigit
      ? filterValue.cardlastfourdigit
      : "",
  };

  const fetchIdExpiring = useCallback(
    async (filterValue: any) => {
      try {
        dispatch(getCardBlockReports(filterValue));
      } catch (err) {}
    },
    [dispatch]
  );

  const postIdExpiringDownloadPdf = useCallback(
    async (pdf: any, data: any) => {
      try {
        dispatch(CardBlockDownloadReports(pdf, data));
      } catch (err) {}
    },
    [dispatch]
  );

  const BlockCardErrorDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.CardBlockReportsReducer?.getcardBlockReportPdfResponse
  );
  const BlockCardErrorDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.CardBlockReportsReducer?.getcardBlockReportExcelResponse
  );
  const fetchBlockCardErrorDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(CardBlockDownloadReports(data, type));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (BlockCardErrorDownloadPdf?.data) {
      setIsLoading(false);
      if (BlockCardErrorDownloadPdf?.data?.reportURL) {
        window.location.href = BlockCardErrorDownloadPdf?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (BlockCardErrorDownloadPdf?.error) {
      setIsLoading(false);

      dispatch(resetPDFRecords());
    }
  }, [BlockCardErrorDownloadPdf]);

  useEffect(() => {
    if (BlockCardErrorDownloadExcel?.data) {
      setIsLoading(false);
      if (BlockCardErrorDownloadExcel?.data?.reportURL) {
        window.location.href = BlockCardErrorDownloadExcel?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (BlockCardErrorDownloadExcel?.error) {
      setIsLoading(false);

      dispatch(resetExcelRecords());
    }
  }, [BlockCardErrorDownloadExcel]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    fetchBlockCardErrorDownloadReport(filterValue, filePdf);
  };

  const downloadExcel = () => {
    fetchBlockCardErrorDownloadReport(filterValue, fileExcel);
  };

  const handleChange = (e: any) => {
    setReport(true);
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);

    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "",
      cardUrn: "",
      requestReason: "",
      requestChannel: "",
      status: "",
      cardlastfourdigit: "",
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
      inputCode: "",
      cardUrn: "",
      requestReason: "",
      requestChannel: "",
      status: "",
      cardlastfourdigit: "",
    });
    resetData();
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
  const handleSubmit = () => {
    setIsLoading(true);
    fetchIdExpiring(data);
    setFilteredArea(true);
    setfilterOption(true);
    setTable(true);
    setReport(false);
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
    "Card Urn": filterValue.cardUrn,
    RequestReason: filterValue.requestReason ? filterValue.requestReason : "",
    RequestChannel: filterValue.requestChannel,
    Status: filterValue.status,
    "Card Last Four Digit": filterValue.cardlastfourdigit,
  };

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"SRF Block Card - Error"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={report}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite BlockCardError mt-3 p-3">
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
                  <label className="BlockCardError-label">Mobile Number</label>
                  <div className="col-8 row">
                    <Input
                      className="border-1 BlockCardError-inputcode form-select"
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
                      className="BlockCardError-input"
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
                      className="BlockCardError-input"
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
                      className="BlockCardError-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Card Urn</Label>
                    <Input
                      type="number"
                      className="BlockCardError-input"
                      onChange={handleChange}
                      name="cardUrn"
                      value={filterValue.cardUrn}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div className="row mt-2">
                <div className="ps-0 col-3">
                  <FormGroup>
                    <Label for="number">Request Reason</Label>
                    <Input
                      type="select"
                      className="form-select BlockCardError-select-box"
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
                <div className="col-3">
                  <FormGroup>
                    <Label for="number">Request Channel</Label>
                    <Input
                      type="select"
                      className="BlockCardError-select-box form-select"
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
                <div className="col-3">
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
              </div>
              <div className="row mt-2">
                <div className="generate-btn-div">
                  <div className="d-flex justify-content-end align-items-center mt-4">
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
export default BlockCardError;
