import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import "./TopUpCommonReport.scss";
import {
  resetTopupCommonReport,
  resetTopupCommonReportExcelDownload,
  resetTopupCommonReportPdfDownload,
  TopUpCommonReports,
  TopUpCommonReportsDownload,
} from "../../redux/action/TopUpCommonReportAction";
import { Select } from "antd";
const TopUpCommonReport = () => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [walletCode, setWalletCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { Option } = Select;

  const [filterValue, setFilterValue] = useState({
    inputCode: "%2b60",
    mobileNumber: "",
    WalletIDURN: "",
    Topuptype: "",
    OriginatorType: "",
    WalletType: "",
    RemitterID: "",
    OriginatingPersonname: "",
    StatusCode: "",
    Approverid: "",
  });

  console.log(filterValue, "filterValue");

  const TopupCommonReport = useSelector(
    (state: RootStateOrAny) =>
      state.TopUpCommonReportReducer?.getTopupCommonResponseReport
  );
  const TopupCommonReportDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.TopUpCommonReportReducer?.getTopupCommonDownloadPdfResponseReport
  );
  const TopupCommonDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.TopUpCommonReportReducer?.getTopupCommonDownloadExcelResponseReport
  );

  const fetchTopupcommonReport = useCallback(
    (value: any) => {
      try {
        dispatch(TopUpCommonReports(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetTopupCommonReports = useCallback(() => {
    try {
      dispatch(resetTopupCommonReport());
    } catch (err) {}
  }, [dispatch]);

  const fetchTopupCommonReportDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(TopUpCommonReportsDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (TopupCommonReport?.data) {
      setIsLoading(false);
    }
  }, [TopupCommonReport]);

  useEffect(() => {
    if (TopupCommonReportDownloadPdf?.data) {
      setIsLoading(false);
      if (TopupCommonReportDownloadPdf?.data?.reportURL) {
        window.location.href = TopupCommonReportDownloadPdf?.data?.reportURL;
      }
      dispatch(resetTopupCommonReportPdfDownload());
    } else if (TopupCommonReportDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetTopupCommonReportPdfDownload());
    }
  }, [TopupCommonReportDownloadPdf]);

  useEffect(() => {
    if (TopupCommonDownloadExcel?.data) {
      setIsLoading(false);
      if (TopupCommonDownloadExcel?.data?.reportURL) {
        window.location.href = TopupCommonDownloadExcel?.data?.reportURL;
      }
      dispatch(resetTopupCommonReportExcelDownload());
    } else if (TopupCommonDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetTopupCommonReportExcelDownload());
    }
  }, [TopupCommonDownloadExcel]);

  const header = [
    {
      title: "Accounting Error Code",
      dataIndex: "accountingErrorCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingErrorCode?.localeCompare(b.accountingErrorCode),
      },
    },
    {
      title: "Accounting Error Details",
      dataIndex: "accountingErrorDetails",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingErrorDetails - b.accountingErrorDetails,
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.amount - b.amount,
      },
    },
    {
      title: "Approval Timestamp",
      dataIndex: "approvalTimestamp",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvalTimestamp?.localeCompare(b.approvalTimestamp),
      },
    },
    {
      title: "Approver Id",
      dataIndex: "approverId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approverId - b.approverId,
      },
    },
    {
      title: "Approver Remarks",
      dataIndex: "approverRemarks",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approverRemarks - b.approverRemarks,
      },
    },
    {
      title: "Beneficiary Name",
      dataIndex: "beneficiaryName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.beneficiaryName?.localeCompare(b.beneficiaryName),
      },
    },
    {
      title: "curency",
      dataIndex: "curency",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.curency?.localeCompare(b.curency),
      },
    },
    {
      title: "Customer Geolocation",
      dataIndex: "customerGeolocation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerGeolocation?.localeCompare(b.customerGeolocation),
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
      title: "Merchant Geolocation",
      dataIndex: "merchantGeolocation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantGeolocation?.localeCompare(b.merchantGeolocation),
      },
    },
    {
      title: "MMP Transaction Id",
      dataIndex: "mmpTransactionId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mmpTransactionId?.localeCompare(b.mmpTransactionId),
      },
    },
    {
      title: "MobileNumber",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Originating Person Name",
      dataIndex: "originatingPersonName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.originatingPersonName?.localeCompare(b.originatingPersonName),
      },
    },
    {
      title: "Originationg Timestamp",
      dataIndex: "originationgTimestamp",
      checked: true,
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
          a.originationgTimestamp?.localeCompare(b.originationgTimestamp),
      },
    },
    {
      title: "Originator Type",
      dataIndex: "originatorType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.originatorType?.localeCompare(b.originatorType),
      },
    },
    {
      title: "Remitter Error Code",
      dataIndex: "remitterErrorCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.remitterErrorCode?.localeCompare(b.remitterErrorCode),
      },
    },
    {
      title: "Remitter Id",
      dataIndex: "remitterId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.remitterId?.localeCompare(b.remitterId),
      },
    },
    {
      title: "Remitter Reference Number",
      dataIndex: "remitterReferenceNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.remitterReferenceNumber?.localeCompare(b.remitterReferenceNumber),
      },
    },
    {
      title: "Response Timestamp",
      dataIndex: "responseTimestamp",
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: "nowrap",
            maxWidth: 175,
          },
        };
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.responseTimestamp?.localeCompare(b.responseTimestamp),
      },
    },
    {
      title: "Status Code",
      dataIndex: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode?.localeCompare(b.statusCode),
      },
    },
    {
      title: "Topup Type",
      dataIndex: "topupType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.topupType?.localeCompare(b.topupType),
      },
    },
    {
      title: "urn",
      dataIndex: "urn",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urn?.localeCompare(b.urn),
      },
    },
    {
      title: "walletType",
      dataIndex: "walletType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletType?.localeCompare(b.walletType),
      },
    },
  ];

  let filePdf = "pdf";
  let fileExcel = "Excel";

  let data = {
    mobileNumber: filterValue.mobileNumber,
    WalletIDURN: filterValue.WalletIDURN,
    Topuptype: filterValue.Topuptype,
    OriginatorType: filterValue.OriginatorType,
    WalletType: walletCode,
    RemitterID: filterValue.RemitterID,
    OriginatingPersonname: filterValue.OriginatingPersonname,
    StatusCode: filterValue.StatusCode,
    Approverid: filterValue.Approverid,
  };

  const downloadPdf = () => {
    fetchTopupCommonReportDownload(data, filePdf);
  };

  const downloadExcel = () => {
    fetchTopupCommonReportDownload(data, fileExcel);
  };
  const reportsData = TopupCommonReport?.data;
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      inputCode: "%2b60",
      mobileNumber: "",
      WalletIDURN: "",
      Topuptype: "",
      OriginatorType: "",
      WalletType: "",
      RemitterID: "",
      OriginatingPersonname: "",
      StatusCode: "",
      Approverid: "",
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      inputCode: "%2b60",
      mobileNumber: "",
      WalletIDURN: "",
      Topuptype: "",
      OriginatorType: "",
      WalletType: "",
      RemitterID: "",
      OriginatingPersonname: "",
      StatusCode: "",
      Approverid: "",
    });
    setWalletCode("");
    resetTopupCommonReports();
  };
  const handleSubmit = () => {
    setFilteredArea(true);
    setfilterOption(true);
    setIsLoading(true);
    setTable(true);
    let record = {
      mobileNumber: filterValue.mobileNumber
        ? filterValue.inputCode + filterValue.mobileNumber
        : "",
      WalletIDURN: filterValue.WalletIDURN,
      Topuptype: filterValue.Topuptype,
      OriginatorType: filterValue.OriginatorType,
      WalletType: walletCode,
      RemitterID: filterValue.RemitterID,
      OriginatingPersonname: filterValue.OriginatingPersonname,
      StatusCode: filterValue.StatusCode,
      Approverid: filterValue.Approverid,
    };
    fetchTopupcommonReport(record);
  };
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);

    setWalletCode(obj.walletCode);
    setFilterValue({ ...filterValue, WalletType: obj.walletType });
  };
  const walletTypeCode = [
    {
      walletType: "3k Wallet",
      walletCode: "MTAMY3K",
    },
    { walletType: "10K Wallet", walletCode: "MTAMY10K" },
    { walletType: "20k Wallet", walletCode: "MTAMY20K" },
  ];

  let value = {
    "Mobile Number": filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
    Approverid: filterValue.Approverid,
    OriginatingPersonname: filterValue.OriginatingPersonname,
    OriginatorType: filterValue.OriginatorType,
    RemitterID: filterValue.RemitterID,
    StatusCode: filterValue.StatusCode,
    Topuptype: filterValue.Topuptype,
    WalletIDURN: filterValue.WalletIDURN,
    WalletType: filterValue.WalletType,
  };

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"TopUp Common Report"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite TopUpCommonReport mt-3 p-3">
            <p className="branchSetupTitle">Filter</p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 inputcode form-select"
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
                      className="TopUpCommonReport-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail"> Wallet ID/URN</Label>
                  <Input
                    type="text"
                    value={filterValue.WalletIDURN}
                    name="WalletIDURN"
                    onChange={handleChange}
                    className="TopUpCommonReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Top-up type</Label>
                  <Input
                    type="select"
                    value={filterValue.Topuptype}
                    name="Topuptype"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option selected hidden>
                      select
                    </option>
                    <option value="BANK">BANK</option>
                    <option value="DEBIT CARD">DEBIT CARD</option>
                    <option value="BILL PORTAL">BILL PORTAL</option>
                    <option value="WALLET TRF">WALLET TRF</option>
                    <option value="CASH-IN">CASH-IN</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Originator Type</Label>
                  <Input
                    type="select"
                    value={filterValue.OriginatorType}
                    name="OriginatorType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option selected hidden>
                      select
                    </option>
                    <option value="JOMPAY">JOMPAY</option>
                    <option value="CUSTOMER / MERCHANT">
                      CUSTOMER / MERCHANT
                    </option>
                    <option value="MERCHANT">MERCHANT</option>
                    <option value="IPAY88">IPAY88</option>
                    <option value="FPX">FPX</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Wallet Type</Label>
                  <Select
                    onChange={handleChangeCode}
                    showSearch
                    filterOption={(input: any, value: any) => {
                      return (
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                    id="fieldName1"
                    className="prefund-Account-input form-control border-0 cursor"
                    value={filterValue.WalletType}
                    style={{ height: "38px" }}
                  >
                    {walletTypeCode &&
                      walletTypeCode?.map((value: any) => {
                        return (
                          <Option value={JSON.stringify(value)}>
                            {value.walletType}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail"> Remitter ID</Label>
                  <Input
                    type="text"
                    value={filterValue.RemitterID}
                    name="RemitterID"
                    onChange={handleChange}
                    className="TopUpCommonReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Originating Person name</Label>
                  <Input
                    type="text"
                    value={filterValue.OriginatingPersonname}
                    name="OriginatingPersonname"
                    onChange={handleChange}
                    className="TopUpCommonReport-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Status Code</Label>
                  <Input
                    type="select"
                    value={filterValue.StatusCode}
                    name="StatusCode"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option selected hidden>
                      select
                    </option>
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="NO MATCH">NO MATCH</option>
                    <option value="DELAYED">DELAYED</option>
                    <option value="FAILURE">FAILURE</option>
                    <option value="MANUAL REFUND">MANUAL REFUND</option>
                    <option value="MANUAL CREDIT">MANUAL CREDIT</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Approver Id</Label>
                  <Input
                    type="text"
                    value={filterValue.Approverid}
                    name="Approverid"
                    onChange={handleChange}
                    className="TopUpCommonReport-input"
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
                scroll={true}
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};
export default TopUpCommonReport;
