import FileSaver from 'file-saver';
import { useEffect, useState, useCallback } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Input, FormGroup, Label } from 'reactstrap';
import CommonHeaderSummaryReports from '../../Components/CustomReportsHeader/CustomReportsHeader';
import CustomHeader from '../../Components/CustomTable/CustomTable';
import FiltersSelected from '../../Components/FiltersSelected/FiltersSelected';
import CustomLoader from '../../Components/Loader/CustomLoader';
import { customValidator } from '../../Constants/Validation';
import {
  MaintenanceListReports,
  MaintenanceListReportsDownload,
  resetMaintenanceListReport,
  resetMaintenanceListDownloadPdf,
  resetMaintenanceListDownloadExcel,
} from '../../redux/action/MaintenanceListReportAction';
import './MaintenanceListReport.scss';

const MaintenanceListReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [Mindates, setMinDates] = useState('');
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: '',
    fromDate: '',
    toDate: '',
    urn: '',
    idNumber: '',
    inputCode: '%2b60',
  });
  const [error, setError] = useState({
    StartDateDescriptionError: '',
    EndDateDescriptionError: '',
    MobileNoDescriptionError: '',
  });
  const dispatch = useDispatch();
  const MaintenanceReport = useSelector(
    (state: RootStateOrAny) =>
      state.MaintenanceListReportReducer?.getMaintenanceListResponseReport
  );
  const MaintenanceReportDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.MaintenanceListReportReducer?.getMaintenanceListPdfDownload
  );
  const MaintenanceReportDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.MaintenanceListReportReducer?.getMaintenanceListExcelDownload
  );
  const fetchMaintenanceReport = useCallback(
    (value: any) => {
      dispatch(MaintenanceListReports(value));
    },
    [dispatch]
  );

  const fetchMaintenanceTransactionDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(MaintenanceListReportsDownload(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetMonthlyTransactionPdf = useCallback(() => {
    try {
      dispatch(resetMaintenanceListDownloadPdf());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (MaintenanceReportDownloadPdf?.data) {
      setIsLoading(false);
      if (MaintenanceReportDownloadPdf?.data?.reportURL) {
        window.location.href = MaintenanceReportDownloadPdf?.data?.reportURL;
      }
      dispatch(resetMaintenanceListDownloadPdf());
    } else if (MaintenanceReportDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetMaintenanceListDownloadPdf());
    }
  }, [MaintenanceReportDownloadPdf]);
  useEffect(() => {
    if (MaintenanceReportDownloadExcel?.data) {
      setIsLoading(false);
      if (MaintenanceReportDownloadExcel?.data?.reportURL) {
        window.location.href = MaintenanceReportDownloadExcel?.data?.reportURL;
      }
      dispatch(resetMaintenanceListDownloadExcel());
    } else if (MaintenanceReportDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetMaintenanceListDownloadExcel());
    }
  }, [MaintenanceReportDownloadExcel]);

  useEffect(() => {
    if (MaintenanceReport?.data) {
      setIsLoading(false);
    }
  }, [MaintenanceReport]);

  useEffect(() => {
    resetMaintenanceListDownloadExcel();
  }, [resetMaintenanceListDownloadExcel]);

  useEffect(() => {
    resetMaintenanceListDownloadPdf();
  }, [resetMaintenanceListDownloadPdf]);

  useEffect(() => {
    resetMaintenanceListDownloadPdf();
    setTable(false);
  }, [resetMaintenanceListDownloadPdf]);

  // const resetMonthlyTransactionPdf = useCallback(() => {
  //   try {
  //     dispatch(resetMonthlyTransactionDownloadPdf());
  //   } catch (err) {}
  // }, [dispatch]);

  const downloadPdf = () => {
    fetchMaintenanceTransactionDownload(data, filePdf);
  };

  const downloadExcel = () => {
    fetchMaintenanceTransactionDownload(data, fileExcel);
  };
  let filePdf = 'pdf';
  let fileExcel = 'Excel';

  const header = [
    {
      title: 'Date & Time',
      dataIndex: 'date',
      width: 150,
      key: 'date',
      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
      checked: true,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      width: 100,
      key: 'time',
      sorter: {
        compare: (a: any, b: any) => a.time.localeCompare(b.time),
      },
      checked: true,
    },
    {
      title: 'URN',
      dataIndex: 'urn',
      width: 200,
      key: 'urn',
      sorter: {
        compare: (a: any, b: any) => a.urn.localeCompare(b.urn),
      },
      checked: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
      checked: true,
    },
    {
      title: 'Amended Name',
      dataIndex: 'amendedName',
      width: 200,
      key: 'amendedName',
      sorter: {
        compare: (a: any, b: any) => a.amendedName.localeCompare(b.amendedName),
      },
      checked: true,
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNumber',
      width: 150,
      key: 'mobileNumber',
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
      checked: true,
    },
    {
      title: 'Amended Mobile No',
      dataIndex: 'amendedMobileNumber',
      width: 150,
      key: 'amendedMobileNumber',
      sorter: {
        compare: (a: any, b: any) =>
          a.amendedMobileNumber.localeCompare(b.amendedMobileNumber),
      },
      checked: true,
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      width: 150,
      key: 'nationality',
      sorter: {
        compare: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
      },
      checked: true,
    },
    {
      title: 'Amended Nationality',
      dataIndex: 'amendedNationality',
      width: 150,
      key: 'amendedNationality',
      sorter: {
        compare: (a: any, b: any) =>
          a.amendedNationality.localeCompare(b.amendedNationality),
      },
      checked: true,
    },
    {
      title: 'ID Type',
      dataIndex: 'identificationType',
      width: 150,
      key: 'identificationType',
      sorter: {
        compare: (a: any, b: any) =>
          a.identificationType.localeCompare(b.identificationType),
      },
      checked: true,
    },
    {
      title: 'Amended ID Type',
      dataIndex: 'amendedIdentificationType',
      width: 150,
      key: 'amendedIdentificationType',
      sorter: {
        compare: (a: any, b: any) =>
          a.amendedIdentificationType.localeCompare(
            b.amendedIdentificationType
          ),
      },
      checked: true,
    },
    {
      title: 'ID No',
      dataIndex: 'identificationNumber',
      width: 150,
      key: 'identificationNumber',
      sorter: {
        compare: (a: any, b: any) =>
          a.identificationNumber.localeCompare(b.identificationNumber),
      },
      checked: true,
    },
    {
      title: 'Amended ID No',
      dataIndex: 'amendedIdentificationNumber',
      width: 150,
      key: 'amendedIdentificationNumber',
      sorter: {
        compare: (a: any, b: any) =>
          a.amendedIdentificationNumber.localeCompare(
            b.amendedIdentificationNumber
          ),
      },
      checked: true,
    },
    {
      title: 'Country of Issue',
      dataIndex: 'countryOfIssue',
      width: 150,
      key: 'countryOfIssue',
      sorter: {
        compare: (a: any, b: any) =>
          a.countryOfIssue.localeCompare(b.countryOfIssue),
      },
      checked: true,
    },
    {
      title: 'Amended Country',
      dataIndex: 'amendedCountryOfIssue',
      width: 150,
      key: 'amendedCountryOfIssue',
      sorter: {
        compare: (a: any, b: any) =>
          a.amendedCountryOfIssue.localeCompare(b.amendedCountryOfIssue),
      },
      checked: true,
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      width: 150,
      key: 'issueDate',
      sorter: {
        compare: (a: any, b: any) => a.issueDate.localeCompare(b.issueDate),
      },
      checked: true,
    },
    {
      title: 'Amended Issue Date',
      dataIndex: 'ammendedIssueDate',
      width: 150,
      key: 'ammendedIssueDate',
      sorter: {
        compare: (a: any, b: any) =>
          a.ammendedIssueDate.localeCompare(b.ammendedIssueDate),
      },
      checked: true,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      width: 150,
      key: 'expiryDate',
      sorter: {
        compare: (a: any, b: any) => a.expiryDate.localeCompare(b.expiryDate),
      },
      checked: true,
    },
    {
      title: 'Amended Expiry Date',
      dataIndex: 'ammendedExpiryDate',
      width: 150,
      key: 'ammendedExpiryDate',
      sorter: {
        compare: (a: any, b: any) =>
          a.ammendedExpiryDate.localeCompare(b.ammendedExpiryDate),
      },
      checked: true,
    },
    {
      title: 'DOB',
      dataIndex: 'dateOfBirth',
      width: 150,
      key: 'dateOfBirth',
      sorter: {
        compare: (a: any, b: any) => a.dateOfBirth.localeCompare(b.dateOfBirth),
      },
      checked: true,
    },
    {
      title: 'Amended DOB',
      dataIndex: 'amendedDateOfBirth',
      width: 150,
      key: 'amendedDateOfBirth',
      sorter: {
        compare: (a: any, b: any) =>
          a.amendedDateOfBirth.localeCompare(b.amendedDateOfBirth),
      },
      checked: true,
    },
    {
      title: 'MM Name',
      dataIndex: 'mothersMaidenName',
      width: 150,
      key: 'mothersMaidenName',
      sorter: {
        compare: (a: any, b: any) =>
          a.mothersMaidenName.localeCompare(b.mothersMaidenName),
      },
      checked: true,
    },
    {
      title: 'Amended MM Name',
      dataIndex: 'amemdedMothersMaidenName',
      width: 150,
      key: 'amemdedMothersMaidenName',
      sorter: {
        compare: (a: any, b: any) =>
          a.amemdedMothersMaidenName.localeCompare(b.amemdedMothersMaidenName),
      },
      checked: true,
    },
    {
      title: 'BO User Login ID',
      dataIndex: 'boUserLoginId',
      width: 250,
      key: 'boUserLoginId',
      sorter: {
        compare: (a: any, b: any) =>
          a.boUserLoginId.localeCompare(b.boUserLoginId),
      },
      checked: true,
    },
    {
      title: 'Wallet Size',
      dataIndex: 'walletSize',
      width: 150,
      key: 'walletSize',
      sorter: {
        compare: (a: any, b: any) => a.walletSize.localeCompare(b.walletSize),
      },
      checked: true,
    },
    {
      title: 'Amended Wallet Size',
      dataIndex: 'ammemdedWalletSize',
      width: 150,
      key: 'ammemdedWalletSize',
      sorter: {
        compare: (a: any, b: any) =>
          a.ammemdedWalletSize.localeCompare(b.ammemdedWalletSize),
      },
      checked: true,
    },
  ];
  const reportsData = MaintenanceReport?.data;

  const resetData = useCallback(async () => {
    try {
      dispatch(resetMaintenanceListReport());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const Validation = () => {
    let startDate = customValidator(
      'startDate',
      'startDate',
      filterValue.fromDate
    );
    let endDate = customValidator('endDate', 'endDate', filterValue.toDate);
    let mobileNo = customValidator(
      'mobileno',
      'mobileno',
      filterValue.mobileNumber
    );
    if (!(startDate === 'null' && endDate === 'null' && mobileNo === 'null')) {
      setError({
        StartDateDescriptionError: startDate,
        EndDateDescriptionError: endDate,
        MobileNoDescriptionError: mobileNo,
      });
      return false;
    }
    setError({
      StartDateDescriptionError: '',
      EndDateDescriptionError: '',
      MobileNoDescriptionError: '',
    });
    return true;
  };
  const handleSubmit = () => {
    // if (Validation()) {
    setFilteredArea(true);
    setfilterOption(true);
    setIsLoading(true);
    setTable(true);
    var record = {
      fromDate: filterValue.fromDate,
      toDate: filterValue.toDate,
      mobileNumber: filterValue.mobileNumber
        ? filterValue.inputCode + filterValue.mobileNumber
        : '',
      urn: filterValue.urn,
      idNumber: filterValue.idNumber,
    };
    fetchMaintenanceReport(record);
    // }
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
      mobileNumber: '',
      fromDate: '',
      toDate: '',
      urn: '',
      idNumber: '',
      inputCode: '%2b60',
    });
    resetData();
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: '',
      fromDate: '',
      toDate: '',
      urn: '',
      idNumber: '',
      inputCode: '%2b60',
    });
    resetData();
  };

  var data = {
    fromDate: filterValue.fromDate,
    toDate: filterValue.toDate,
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : '',
    urn: filterValue.urn,
    idNumber: filterValue.idNumber,
  };

  let value = {
    mobileNumber: filterValue.mobileNumber
      ? '+' + filterValue.inputCode.slice(3, 5) + ' ' + filterValue.mobileNumber
      : '',
    StartDate: filterValue.fromDate,
    EndDate: filterValue.toDate,
    Urn: filterValue.urn,
    IdNumber: filterValue.idNumber,
  };
  const formatDate = (LastDate: any) => {
    let month = '' + (LastDate.getMonth() + 1);
    let day = '' + LastDate.getDate();
    let year = LastDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  var LastDate = new Date();
  const dates = formatDate(LastDate);
  return (
    <div className='p-4'>
      <>
        <CommonHeaderSummaryReports
          RightContent={'Maintenance List Report'}
          filterEnabled={filterOption}
          options={false}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className='colorWhite MaintenanceListReport mt-3 p-3'>
            <p className='branchSetupTitle'>
              Filter
              {/* <p className="colorRed">
                {error.StartDateDescriptionError &&
                  error.EndDateDescriptionError &&
                  error.MobileNoDescriptionError && (
                    <span className="colorRed">*Fields are mandatory</span>
                  )}
              </p> */}
            </p>
            <div className='container-fluid filterInputAlign'>
              <div className='d-flex row align-items-end'>
                <div className='col'>
                  <label className='p-1 MaintenanceListReport-label'>
                    Mobile No
                  </label>
                  {/* <span className="container-body-label-color">*</span> */}

                  <div className='col-8 row'>
                    <Input
                      className='border-1 MaintenanceListReport-inputcode form-select'
                      type='select'
                      name='inputCode'
                      onChange={handleChange}
                      value={filterValue.inputCode}
                    >
                      <option value='%2b60'>+60</option>
                      <option value='%2b65'>+65</option>
                      <option value='%2b91'>+91</option>
                    </Input>
                    <Input
                      className='MaintenanceListReport-input'
                      type='number'
                      value={filterValue.mobileNumber}
                      name='mobileNumber'
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>From Date</Label>
                    {/* <span className="container-body-label-color">*</span> */}

                    <Input
                      type='date'
                      value={filterValue.fromDate}
                      name='fromDate'
                      onChange={handleChange}
                      min={Mindates}
                      max={dates}
                      className='MaintenanceListReport-input'
                    ></Input>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>To Date</Label>
                    {/* <span className="container-body-label-color">*</span> */}

                    <Input
                      type='date'
                      value={filterValue.toDate}
                      name='toDate'
                      onChange={handleChange}
                      min={filterValue.fromDate}
                      max={dates}
                      className='MaintenanceListReport-input'
                    ></Input>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>URN</Label>
                    <Input
                      type='text'
                      value={filterValue.urn}
                      name='urn'
                      onChange={handleChange}
                      className='MaintenanceListReport-input'
                    >
                      <option></option>
                    </Input>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>ID Number</Label>
                    <Input
                      type='text'
                      value={filterValue.idNumber}
                      name='idNumber'
                      onChange={handleChange}
                      className='MaintenanceListReport-input'
                    >
                      <option></option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
              <div className='mt-2 generate-btn-div'>
                <button className='generateBtn border-0' onClick={handleSubmit}>
                  Load Data
                </button>
              </div>
            </div>
          </div>
        )}
        {filteredArea && <FiltersSelected value={value} />}
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <div className='mt-3'>
            {table && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : header}
                CustomTableHeader={reportsData}
                DisableMange={true}
                customColumnWidth={true}
                checkLength={reportsData.length}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default MaintenanceListReport;
