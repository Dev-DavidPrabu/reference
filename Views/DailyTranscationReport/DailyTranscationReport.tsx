import { useCallback, useEffect, useState } from 'react';

import FileSaver from 'file-saver';

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { FormGroup, Input, Label } from 'reactstrap';
import CommonHeaderSummaryReports from '../../Components/CustomReportsHeader/CustomReportsHeader';
import CustomHeader from '../../Components/CustomTable/CustomTable';
import FiltersSelected from '../../Components/FiltersSelected/FiltersSelected';
import CustomLoader from '../../Components/Loader/CustomLoader';
import { customValidator } from '../../Constants/Validation';
import {
  getDailyTransactionDownload,
  getDailyTransactionReportAction,
  resetDailyTransactionDownloadExcel,
  resetDailyTransactionDownloadPdf,
  resetDailyTransactionReports,
} from '../../redux/action/DailyTransactionReportAction';
import './DailyTranscationReport.scss';

const DailyTransactionReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Mindates, setMinDates] = useState('');
  const [filterValue, setFilterValue] = useState({
    mobileNumber: '',
    Date: '',
    TransactionRefNo: '',
    inputCode: '%2b60',
    PaymentMethod: 'ALL',
  });
  const [error, setError] = useState({
    dateDescriptionError: '',
    PaymentMethodDescriptionError: '',
  });

  const dispatch = useDispatch();

  const DailyTransactionReport = useSelector(
    (state: RootStateOrAny) =>
      state.DailyTransactionReportReducer?.getDailyTransactionResponse
  );
  let reportsData = DailyTransactionReport?.data;

  const fetchDailyTransactionResponse = useCallback(
    (value: any) => {
      try {
        dispatch(getDailyTransactionReportAction(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetData = useCallback(async () => {
    try {
      dispatch(resetDailyTransactionReports());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  useEffect(() => {
    if (DailyTransactionReport?.data) {
      setIsLoading(false);
    }
  }, [DailyTransactionReport]);

  const DailyTxnDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.DailyTransactionReportReducer
        ?.getDailyTransactionDownloadPdfResponse
  );
  const DailyTxnDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.DailyTransactionReportReducer
        ?.getDailyTransactionDownloadExcelResponse
  );

  useEffect(() => {
    if (DailyTxnDownloadPdf?.data) {
      setIsLoading(false);
      if (DailyTxnDownloadPdf?.data?.reportURL) {
        window.location.href = DailyTxnDownloadPdf?.data?.reportURL;
      }
      dispatch(resetDailyTransactionDownloadPdf());
    } else if (DailyTxnDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetDailyTransactionDownloadPdf());
    }
  }, [DailyTxnDownloadPdf]);

  useEffect(() => {
    if (DailyTxnDownloadExcel?.data) {
      setIsLoading(false);
      if (DailyTxnDownloadExcel?.data?.reportURL) {
        window.location.href = DailyTxnDownloadExcel?.data?.reportURL;
      }
      dispatch(resetDailyTransactionDownloadExcel());
    } else if (DailyTxnDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetDailyTransactionDownloadExcel());
    }
  }, [DailyTxnDownloadExcel]);

  const fetchDailyTransactionDownload = useCallback(
    (value: any, fileType: any) => {
      dispatch(getDailyTransactionDownload(value, fileType));
    },
    [dispatch]
  );

  let filePdf = 'pdf';
  let fileExcel = 'Excel';
  const resetDownloadDataPdf = useCallback(async () => {
    try {
      dispatch(resetDailyTransactionDownloadPdf());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    resetDownloadDataPdf();
  }, [resetDownloadDataPdf]);

  const downloadPdf = () => {
    fetchDailyTransactionDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    fetchDailyTransactionDownload(filterValue, fileExcel);
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
      Date: '',
      TransactionRefNo: '',
      inputCode: '%2b60',

      PaymentMethod: '',
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: '',
      Date: '',
      TransactionRefNo: '',
      inputCode: '',
      PaymentMethod: 'ALL',
    });
    resetData();
  };
  const header = [
    {
      title: 'Txn Ref No',
      dataIndex: 'transactionReferenceNumber',
      checked: true,
      width: 200,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReferenceNumber?.localeCompare(
            b.transactionReferenceNumber
          ),
      },
    },
    {
      title: 'MIRS ID',
      dataIndex: 'mirsNumber',
      checked: true,
      width: 150,
      sorter: {
        compare: (a: any, b: any) => a.mirsNumber?.localeCompare(b.mirsNumber),
      },
    },
    {
      title: 'Date',
      dataIndex: 'transactionDate',
      checked: true,
      width: 200,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate?.localeCompare(b.transactionDate),
      },
    },
    {
      title: 'Sender Name',
      dataIndex: 'senderName',
      checked: true,
      width: 150,
      sorter: {
        compare: (a: any, b: any) => a.senderName?.localeCompare(b.senderName),
      },
    },
    {
      title: 'Receiver Country',
      dataIndex: 'receiverCountry',
      checked: true,
      width: 150,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverCountry?.localeCompare(b.receiverCountry),
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      checked: true,
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.currency?.localeCompare(b.currency),
      },
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      checked: true,
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.totalAmount - b.totalAmount,
      },
    },
    {
      title: 'Service Charge',
      dataIndex: 'serviceCharge',
      checked: true,
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.serviceCharge - b.serviceCharge,
      },
    },
    {
      title: 'Sender Amount',
      dataIndex: 'senderAmount',
      checked: true,
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.senderAmount - b.senderAmount,
      },
    },
    {
      title: 'Payout Amount',
      dataIndex: 'payoutAmount',
      checked: true,
      width: 100,
      sorter: {
        compare: (a: any, b: any) => a.payoutAmount - b.payoutAmount,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      checked: true,
      width: 150,
      sorter: {
        compare: (a: any, b: any) => a.status?.localeCompare(b.status),
      },
    },
    {
      title: 'Receiver Name',
      dataIndex: 'receiverName',
      checked: true,
      width: 150,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverName?.localeCompare(b.receiverName),
      },
    },
    {
      title: 'Card Holder/ Sender Name',
      dataIndex: 'cardHolderSenderName',
      checked: true,
      width: 150,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardHolderSenderName?.localeCompare(b.cardHolderSenderName),
      },
    },
    {
      title: 'URN',
      dataIndex: 'urnNumber',
      checked: true,
      width: 180,
      sorter: {
        compare: (a: any, b: any) => a.urnNumber?.localeCompare(b.urnNumber),
      },
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNumber',
      checked: true,
      width: 180,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
  ];
  const Validation = () => {
    let Date = customValidator('startDate', 'startDate', filterValue.Date);
    let Payment = customValidator(
      'paymentMode',
      'paymentMode',
      filterValue.PaymentMethod
    );
    if (!(Date === 'null' && Payment === 'null')) {
      setError({
        dateDescriptionError: Date,
        PaymentMethodDescriptionError: Payment,
      });
      return false;
    }
    setError({
      dateDescriptionError: '',
      PaymentMethodDescriptionError: '',
    });
    return true;
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
          : '',
        Date: filterValue.Date,
        TransactionRefNo: filterValue.TransactionRefNo,
        PaymentMethod: filterValue.PaymentMethod,
      };

      fetchDailyTransactionResponse(record);
    }
  };
  let value = {
    mobileNumber: filterValue.mobileNumber
      ? '+' + filterValue.inputCode.slice(3, 5) + ' ' + filterValue.mobileNumber
      : '',
    Date: filterValue.Date,
    TransactionRefNo: filterValue.TransactionRefNo,
    PaymentMethod: filterValue.PaymentMethod,
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
          RightContent={'Daily Transaction Report'}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          TableData={reportsData}
        />
        {filterOption && (
          <div className='colorWhite DailyTranscationReport mt-3 p-3'>
            <p className='branchSetupTitle'>
              Filter
              <p className='colorRed'>
                {error.dateDescriptionError &&
                  error.PaymentMethodDescriptionError && (
                    <span className='EndOfDayReport-colorRed'>
                      * Fields are mandatory
                    </span>
                  )}
              </p>
            </p>
            <div className='container-fluid filter_all_container'>
              <div className='mobile_container'>
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className='mobile_field_collection'>
                    <Input
                      className='border-1 btn--sizer inputcode form-select'
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
                      className='UnblockCardPending-input'
                      type='number'
                      value={filterValue.mobileNumber}
                      name='mobileNumber'
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </div>

              <div className='date_container'>
                <FormGroup>
                  <Label for='exampleEmail'>Date</Label>
                  <span className='container-body-label-color'>*</span>
                  <Input
                    type='date'
                    value={filterValue.Date}
                    name='Date'
                    onChange={handleChange}
                    min={Mindates}
                    max={dates}
                    className='DailyTranscationReport-input'
                  ></Input>
                </FormGroup>
              </div>
              <div className='date_container'>
                <FormGroup>
                  <Label for='exampleEmail'> Transaction Ref.No</Label>
                  <Input
                    type='text'
                    value={filterValue.TransactionRefNo}
                    name='TransactionRefNo'
                    onChange={handleChange}
                    className='DailyTranscationReport-input'
                  ></Input>
                </FormGroup>
              </div>
              <div className='input_field_container'>
                <FormGroup>
                  <Label for='number'>Payment Method</Label>
                  <span className='container-body-label-color'>*</span>
                  <Input
                    type='select'
                    className='form-select'
                    onChange={handleChange}
                    name='PaymentMethod'
                    value={filterValue.PaymentMethod}
                  >
                    <option value='ALL'>ALL</option>
                    <option value='Bank Account'>Bank Account</option>
                    <option value='Cash Pickup'>Cash Pickup</option>
                    <option value='Alipay'>Alipay</option>
                    <option value='Union Pay'>Union Pay</option>
                    <option value='bKash'>bKash</option>
                    <option value='eWallet'>eWallet</option>
                  </Input>
                </FormGroup>
              </div>

              <button
                className='generateBtn border-0 LOD_btn_margin'
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
          <div className='mt-3'>
            {table && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : header}
                CustomTableHeader={reportsData}
                customColumnWidth={true}
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
export default DailyTransactionReport;
