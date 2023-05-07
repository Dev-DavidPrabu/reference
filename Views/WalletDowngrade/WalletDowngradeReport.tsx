import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { resetWalletDowngradeReportExcelDownload, resetWalletDowngradeReportPdfDownload, WalletDowngradeReports, WalletDowngradeReportsDownload } from "../../redux/action/WalletDowngradeReportAction";
import './WalletDowngrade.scss';
const WalletDowngradeReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [Mindates, setMinDates] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterValue, setFilterValue] = useState({
    fromDate:"",
    toDate:"",
    inputCode: "%2b60",
    Downgradetimestamp: "",
    KycExpiryDate: "",
    docExpiryDate: "",
    customerName:"",
    idNumber:"",
    mobileNumber:"",
  });
  const [error, setError] = useState({
    StartDateDescriptionError: "",
    EndDateDescriptionError: "",
  });
   const dispatch = useDispatch();

  const WalletDowngradeReportData = useSelector(
    (state: RootStateOrAny) =>
      state.WalletDowngradeReportReducer?.getWalletDowngradeReport
  );
  const WalletDowngradeDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.WalletDowngradeReportReducer
        ?.getWalletDowngradeReportPdfResponse
  );
  const WalletDowngradeDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.WalletDowngradeReportReducer
        ?.getWalletDowngradeReportExcelResponse 
  );

  useEffect(() => {
    if (WalletDowngradeDownloadPdf?.data) {
      setIsLoading(false);
      if (WalletDowngradeDownloadPdf?.data?.reportURL) {
        window.location.href =
        WalletDowngradeDownloadPdf?.data?.reportURL;
      }
      dispatch(resetWalletDowngradeReportPdfDownload());
    } else if (WalletDowngradeDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetWalletDowngradeReportPdfDownload());
    }
  }, [WalletDowngradeDownloadPdf]);

  useEffect(() => {
    if (WalletDowngradeDownloadExcel?.data) {
      setIsLoading(false);
      if (WalletDowngradeDownloadExcel?.data?.reportURL) {
        window.location.href =
        WalletDowngradeDownloadExcel?.data?.reportURL;
      }
      dispatch(resetWalletDowngradeReportExcelDownload());
    } else if (WalletDowngradeDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetWalletDowngradeReportExcelDownload());
    }
  }, [WalletDowngradeDownloadExcel]);

  const fetchWalletDowngradeReport = useCallback(
    (value: any) => {
      try {
        dispatch(WalletDowngradeReports(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetWalletDowngradeReport = useCallback(() => {
    try {
      dispatch(resetWalletDowngradeReport());
    } catch (err) {}
  }, [dispatch]);

  const fetchWalletDowngradeReportDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(WalletDowngradeReportsDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (WalletDowngradeReportData?.data) {
      setIsLoading(false);
    }
  }, [WalletDowngradeReportData]);

  let filePdf = "pdf";
  let fileExcel = "Excel";

  var data = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    Downgradetimestamp: filterValue.Downgradetimestamp,
    KycExpiryDate: filterValue.KycExpiryDate,
    docExpiryDate: filterValue.docExpiryDate,
    customerName:filterValue.customerName,
    mobileNumber: filterValue.mobileNumber
    ? filterValue.inputCode + filterValue.mobileNumber
    : "",
    idNumber : filterValue.idNumber


  };

  const downloadPdf = () => {
    fetchWalletDowngradeReportDownload(data, filePdf);
  };

  const downloadExcel = () => {
    fetchWalletDowngradeReportDownload(data, fileExcel);
  };
  const reportsData = WalletDowngradeReportData?.data;
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      fromDate:"",
      toDate:"",
      Downgradetimestamp: "",
      KycExpiryDate: "",
      docExpiryDate: "",
      customerName:"",
      idNumber:"",
    mobileNumber:"",
    inputCode: "%2b60",

     });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      fromDate:"",
      toDate:"",
      Downgradetimestamp: "",
      KycExpiryDate: "",
      docExpiryDate: "",
      customerName:"",
      idNumber:"",
    mobileNumber:"",
    inputCode: "%2b60",

      });
  };
  const Validation = () => {
    let FromDate = customValidator(
      "startDate",
      "startDate",
      filterValue.fromDate
    );
    let ToDate = customValidator("startDate", "startDate", filterValue.fromDate);
    if (!(FromDate === "null" && ToDate === "null")) {
      setError({
        StartDateDescriptionError: FromDate,
        EndDateDescriptionError: ToDate,
      });
      return false;
    }
    setError({
      StartDateDescriptionError: "",
      EndDateDescriptionError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    //if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setIsLoading(true);
      setTable(true);
      var record = {
        mobileNumber: filterValue.mobileNumber
        ? filterValue.inputCode + filterValue.mobileNumber
        : "",
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    Downgradetimestamp: filterValue.Downgradetimestamp,
    KycExpiryDate: filterValue.KycExpiryDate,
    docExpiryDate: filterValue.docExpiryDate,
    customerName:filterValue.customerName,
    idNumber : filterValue.idNumber

      };
      fetchWalletDowngradeReport(record);
    //}
  };
  const header = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.customerName?.localeCompare(b.customerName),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "Wallet ID / URN",
      dataIndex: "urn",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.urn?.localeCompare(b.urn),
      },
    },
    {
      title: "Downgrade Reason",
      dataIndex: "downgradeReason",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.downgradeReason?.localeCompare(b.downgradeReason),
      },
    },
    {
      title: "Downgrade Timestamp",
      dataIndex: "downgradeTimestamp",
      checked: true,
      width:170,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 170,
          }
        }
      },
      sorter: {
        compare: (a: any, b: any) => a.downgradeTimestamp?.localeCompare(b.downgradeTimestamp),
      },
    },
    {
      title: "Id ExpiryDate",
      dataIndex: "idExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idExpiryDate?.localeCompare(b.idExpiryDate),
      },
    },
    {
      title: "idIssueDate",
      dataIndex: "idIssueDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idIssueDate?.localeCompare(b.idIssueDate),
      },
    },
    {
      title: "Id Number",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idNumber?.localeCompare(b.idNumber),
      },
    },
    {
      title: "Id Type",
      dataIndex: "idType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idType?.localeCompare(b.idType),
      },
    },
    {
      title: "initiatorName",
      dataIndex: "initiatorName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.initiatorName?.localeCompare(b.initiatorName),
      },
    },
    {
      title: "Kyc ExpiryDate",
      dataIndex: "kycExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.kycExpiryDate?.localeCompare(b.kycExpiryDate),
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
    {
      title: "New Wallet Size",
      dataIndex: "newWalletSize",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.newWalletSize?.localeCompare(b.newWalletSize),
      },
    },
    {
      title: "Previous Wallet Size",
      dataIndex: "previousWalletSize",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.previousWalletSize?.localeCompare(b.previousWalletSize),
      },
    },
    
  ];

  let value = {
    mobileNumber: filterValue.mobileNumber
    ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
    : "",
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    Downgradetimestamp: filterValue.Downgradetimestamp,
    KycExpiryDate: filterValue.KycExpiryDate,
    docExpiryDate: filterValue.docExpiryDate,
    customerName:filterValue.customerName,
    idNumber : filterValue.idNumber
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
          RightContent={"Wallet Downgrade Report"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
           downloadPdf={downloadPdf}
           downloadExcel={downloadExcel}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite PayrollCompanyCreationReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
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
                    value={filterValue.fromDate}
                    name="fromDate"
                    onChange={handleChange}
                    className="WalletDowngrade-input"
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
                    value={filterValue.toDate}
                    name="toDate"
                    onChange={handleChange}
                    className="WalletDowngrade-input"
                    min={filterValue.fromDate}
                    max={dates}
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Doc Expiry Date</Label>
                  <Input
                    type="date"
                    value={filterValue.docExpiryDate}
                    name="IdExpiryDate"
                    onChange={handleChange}
                    className="WalletDowngrade-input"
                    min={filterValue.fromDate}
                    max={dates}
                  ></Input>
                </FormGroup> 
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">KYC Expiry Date</Label>
                  <Input
                    type="date"
                    value={filterValue.KycExpiryDate}
                    name="KycExpiryDate"
                    onChange={handleChange}
                    min={filterValue.fromDate}
                    max={dates}
                    className="WalletDowngrade-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Downgrade timestamp</Label>
                  <Input
                    type="date"
                    value={filterValue.Downgradetimestamp}
                    name="Downgradetimestamp"
                    onChange={handleChange}
                    className="WalletDowngrade-input"
                    min={filterValue.fromDate}
                    max={dates}
                  >
                  </Input>
                </FormGroup>
              </div>
              <div className="input_field_container">
                <FormGroup>
                  <Label for="exampleEmail">Id Number</Label>
                  <Input
                    type="text"
                    value={filterValue.idNumber}
                    name="idNumber"
                    onChange={handleChange}
                    className="WalletDowngrade-input"
                  >
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
export default WalletDowngradeReport;
