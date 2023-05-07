import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import FileSaver from "file-saver";
import { Col, FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { Select } from "antd";

import {
  getTransactionScreenReportDownload,
  resetTransactionScreenDownloadExcel,
  resetTransactionScreenDownloadPdf,
  resetTransactionScreenReports,
  TransactionScreenReport,
} from "../../redux/action/TransactionScreenReportAction";

function TransactionRepots() {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [countryCodeData, setCountryCode] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [Mindates, setMinDates] = useState("");
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let TransactionType = ["TOPUP", "REFUND"];
  const userType = userData?.userInfo?.userType;
  const { Option } = Select;
  let dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "%2b60",
    startDate: "",
    EndDate: "",
    ScreeningType: "ALL",
    MatchType: "ALL",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    endDateDescriptionError: "",
    matchTypeDescriptionError: "",
    screeningTypeDescriptionError: "",
  });

  const TxnScreenReportResponse = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionScreenReportReducer?.getTransactionScreenResponse
  );
  const fetchTxnScreenReport = useCallback(
    (value: any) => {
      try {
        dispatch(TransactionScreenReport(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (TxnScreenReportResponse?.data) {
      setIsLoading(false);
    }
  }, [TxnScreenReportResponse]);

  const reportsData = TxnScreenReportResponse?.data;

  const TransactionScreenDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionScreenReportReducer
        ?.getTransactionScreenDownloadPdfResponse
  );
  const TransactionScreenDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.TransactionScreenReportReducer
        ?.getTransactionScreenDownloadExcelResponse
  );

  useEffect(() => {
    if (TransactionScreenDownloadPdf?.data) {
      setIsLoading(false);
      if (TransactionScreenDownloadPdf?.data?.reportURL) {
        window.location.href = TransactionScreenDownloadPdf?.data?.reportURL;
      }
      dispatch(resetTransactionScreenDownloadPdf());
    } else if (TransactionScreenDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetTransactionScreenDownloadPdf());
    }
  }, [TransactionScreenDownloadPdf]);

  useEffect(() => {
    if (TransactionScreenDownloadExcel?.data) {
      setIsLoading(false);
      if (TransactionScreenDownloadExcel?.data?.reportURL) {
        window.location.href = TransactionScreenDownloadExcel?.data?.reportURL;
      }
      dispatch(resetTransactionScreenDownloadExcel());
    } else if (TransactionScreenDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetTransactionScreenDownloadExcel());
    }
  }, [TransactionScreenDownloadExcel]);

  const fetchTransactionScreenReportDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(getTransactionScreenReportDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetTransactionScreen = useCallback(() => {
    try {
      dispatch(resetTransactionScreenReports());
    } catch (err) {}
  }, [dispatch]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  const downloadPdf = () => {
    fetchTransactionScreenReportDownload(data, filePdf);
  };

  const downloadExcel = () => {
    fetchTransactionScreenReportDownload(data, fileExcel);
  };

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      startDate: "",
      EndDate: "",
      mobileNumber: "",
      inputCode: "",
      ScreeningType: "",
      MatchType: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      startDate: "",
      EndDate: "",
      mobileNumber: "",
      inputCode: "%2b60",
      ScreeningType: "",
      MatchType: "",
    });
    resetTransactionScreen();
  };

  const Validation = () => {
    let StartDateError = customValidator(
      "startDate",
      "startDate",
      filterValue.startDate
    );
    let EndDateError = customValidator(
      "endDate",
      "EndDate",
      filterValue.EndDate
    );

    let ScreeningType = customValidator(
      "ScreeningType",
      "ScreeningType",
      filterValue.ScreeningType
    );

    let MatchType = customValidator(
      "MatchType",
      "MatchType",
      filterValue.MatchType
    );

    if (
      !(
        StartDateError === "null" &&
        EndDateError === "null" &&
        ScreeningType === "null" &&
        MatchType === "null"
      )
    ) {
      setError({
        startDateDescriptionError: StartDateError,
        endDateDescriptionError: EndDateError,
        matchTypeDescriptionError: MatchType,
        screeningTypeDescriptionError: ScreeningType,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      endDateDescriptionError: "",
      matchTypeDescriptionError: "",
      screeningTypeDescriptionError: "",
    });
    return true;
  };

  const header = [
    {
      title: "Transaction date",
      dataIndex: "transactionDate",
      checked: true,
      width: "500px",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefNo?.localeCompare(b.transactionRefNo),
      },
    },
    {
      title: "Sender name",
      dataIndex: "senderName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderName?.localeCompare(b.senderName),
      },
    },

    {
      title: "Sender ID number",
      dataIndex: "senderIdNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.senderIdNumber?.localeCompare(b.senderIdNumber),
      },
    },

    {
      title: "Sender Mobile No.",
      dataIndex: "senderMobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.senderMobileNumber?.localeCompare(b.senderMobileNumber),
      },
    },
    {
      title: "Sender Nationality",
      dataIndex: "senderNationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.senderNationality?.localeCompare(b.senderNationality),
      },
    },
    {
      title: "Sender Date of Birth",
      dataIndex: "senderDateOfBirth",
      checked: true,
      width: 150,
      onCell: () => {
        return {
          style: {
            whiteSpace: "nowrap",
            maxWidth: 150,
          },
        };
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.senderDateOfBirth?.localeCompare(b.senderDateOfBirth),
      },
    },
    {
      title: "Beneficial Owner Name",
      dataIndex: "beneficialOwnerName",
      checked: true,
      sorter: (a: any, b: any) =>
        a.beneficialOwnerName.localeCompare(b.beneficialOwnerName),
    },

    {
      title: "Beneficial Owner ID number",
      dataIndex: "beneficialOwnerIdNumber",
      checked: true,
      sorter: (a: any, b: any) =>
        a.beneficialOwnerIdNumber.localeCompare(b.beneficialOwnerIdNumber),
    },
    {
      title: "Beneficial Owner Mobile No.",
      dataIndex: "beneficialOwnerMobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.beneficialOwnerMobileNumber?.localeCompare(
            b.beneficialOwnerMobileNumber
          ),
      },
    },

    {
      title: "Beneficial Owner Nationality",
      dataIndex: "beneficialOwnerNationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.beneficialOwnerNationality?.localeCompare(
            b.beneficialOwnerNationality
          ),
      },
    },
    {
      title: "Beneficial Owner Date of Birth",
      dataIndex: "beneficialOwnerDateOfBirth",
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 150,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.beneficialOwnerDateOfBirth?.localeCompare(
            b.beneficialOwnerDateOfBirth
          ),
      },
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverName?.localeCompare(b.receiverName),
      },
    },
    {
      title: "Receiver Nationality",
      dataIndex: "receiverNationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverNationality?.localeCompare(b.receiverNationality),
      },
    },
    {
      title: "Receiver Phone No.",
      dataIndex: "receiverPhoneNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverPhoneNumber?.localeCompare(b.receiverPhoneNumber),
      },
    },
    {
      title: "Receiver Amount",
      dataIndex: "receiverAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.receiverAmount - b.receiverAmount,
      },
    },
    {
      title: "MSSL (Yes / No)",
      dataIndex: "mssl",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mssl - b.mssl,
      },
      render: (text: any) => String(text),
    },
    {
      title: "seniorManagerApprover",
      dataIndex: "seniorManagerApprover",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.seniorManagerApprover?.localeCompare(b.seniorManagerApprover),
      },
    },
    {
      title: "PEPS (Yes / No) ",
      dataIndex: "peps",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.peps - b.peps,
      },
      render: (text: any) => String(text),
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate?.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Amount (Fcy) ",
      dataIndex: "amount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.amount?.localeCompare(b.amount),
      },
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.transactionAmount - b.transactionAmount,
      },
    },
    {
      title: "Transaction Status",
      dataIndex: "transactionStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatus?.localeCompare(b.transactionStatus),
      },
    },
  ];
  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate,
    EndDate: filterValue.EndDate,
    ScreeningType: filterValue.ScreeningType,
    MatchType: filterValue.MatchType,
  };
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
        startDate: filterValue.startDate,
        EndDate: filterValue.EndDate,
        ScreeningType: filterValue.ScreeningType,
        MatchType: filterValue.MatchType,
      };
      fetchTxnScreenReport(record);
    }
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate,
    EndDate: filterValue.EndDate,
    ScreeningType: filterValue.ScreeningType,
    MatchType: filterValue.MatchType,
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
          RightContent={"Transaction Screening Report"}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite ECDDReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.startDateDescriptionError &&
                  error.endDateDescriptionError && (
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
                    value={filterValue.startDate}
                    name="startDate"
                    onChange={handleChange}
                    className="ECDDReport-input"
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
                    className="ECDDReport-input"
                    min={filterValue.startDate}
                    max={dates}
                  ></Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Screening Type</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    value={filterValue.ScreeningType}
                    name="ScreeningType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option selected hidden className="cursor">Select</option>
                    <option value="ALL">ALL</option>
                    <option value="PEPS">PEPS</option>
                    <option value="Sanction">Sanction</option>
                    <option value="MSSL">MSSL</option>
                  </Input>
                </FormGroup>
              </div>

              <div className="input_field_container">
                <FormGroup>
                  <Label for="transactionType">Match Type</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    value={filterValue.MatchType}
                    name="MatchType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option selected hidden className="cursor">Select</option>
                    <option value="ALL">ALL</option>
                    <option value="Confirm march">Confirm march</option>
                    <option value="Normal match">Normal match</option>
                  </Input>
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
}

export default TransactionRepots;
