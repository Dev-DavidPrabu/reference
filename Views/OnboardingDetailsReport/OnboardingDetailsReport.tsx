import { Select } from 'antd';
import FileSaver from 'file-saver';
import { useCallback, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Input, FormGroup, Label } from 'reactstrap';
import CommonHeaderSummaryReports from '../../Components/CustomReportsHeader/CustomReportsHeader';
import CustomHeader from '../../Components/CustomTable/CustomTable';
import FiltersSelected from '../../Components/FiltersSelected/FiltersSelected';
import CustomLoader from '../../Components/Loader/CustomLoader';
import { customValidator } from '../../Constants/Validation';
import { getBranchDashboardRecords } from '../../redux/action/BranchDashboardAction';
import { getAllCardType } from '../../redux/action/CardTypeAction';
import { getIdtypeData } from '../../redux/action/IdTypeSummaryAction';
import {
  DownloadOnboardDetailReport,
  OnboardingDetailReports,
  resetOnboardingDetailsDownloadExcel,
  resetOnboardingDetailsDownloadPdf,
  resetOnboardingDetailsReports,
} from '../../redux/action/OnboardingDetailReportAction';
import { getNationalityDetails } from '../../redux/action/PreOnboardingAction';
import { getAllWalletData } from '../../redux/action/walletSetupAction';
import './OnboardingDetailsReport.scss';

const OnBoardingDetailsReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [nationalityCodeData, setNationalityCode] = useState('');
  const [Mindates, setMinDates] = useState('');
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    startDate: '',
    endDate: '',
    brand: 'ALL',
    cardType: 'ALL',
    nationality: 'ALL',
    branchName: 'ALL',
    idType: 'ALL',
    sourceCode: '',
  });
  const dispatch = useDispatch();
  const { Option } = Select;
  const [error, setError] = useState({
    StartDateError: '',
    EndDateError: '',
  });
  const OnboardingDetailReport = useSelector(
    (state: RootStateOrAny) =>
      state.OnboardingDetailReducer?.getOnboardDetailResponseReport
  );
  const reportsData = OnboardingDetailReport?.data;
  const OnboardingDetailDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.OnboardingDetailReducer?.getOnboardingReportsPdfDownloadResponse
  );
  const OnboardingDetailDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.OnboardingDetailReducer?.getOnboardingReportsExcelDownloadResponse
  );

  useEffect(() => {
    if (OnboardingDetailDownloadPdf?.data) {
      setIsLoading(false);
      if (OnboardingDetailDownloadPdf?.data?.reportURL) {
        window.location.href = OnboardingDetailDownloadPdf?.data?.reportURL;
      }
      dispatch(resetOnboardingDetailsDownloadPdf());
    } else if (OnboardingDetailDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetOnboardingDetailsDownloadPdf());
    }
  }, [OnboardingDetailDownloadPdf]);

  useEffect(() => {
    if (OnboardingDetailDownloadExcel?.data) {
      setIsLoading(false);
      if (OnboardingDetailDownloadExcel?.data?.reportURL) {
        window.location.href = OnboardingDetailDownloadExcel?.data?.reportURL;
      }
      dispatch(resetOnboardingDetailsDownloadExcel());
    } else if (OnboardingDetailDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetOnboardingDetailsDownloadExcel());
    }
  }, [OnboardingDetailDownloadExcel]);

  const fetchOnboardingReport = useCallback(
    (value: any) => {
      dispatch(OnboardingDetailReports(value));
    },
    [dispatch]
  );
  const resetOnboardingDetails = useCallback(() => {
    try {
      dispatch(resetOnboardingDetailsReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (OnboardingDetailReport?.data) {
      setIsLoading(false);
    }
  }, [OnboardingDetailReport]);
  let filePdf = 'pdf';
  let fileExcel = 'Excel';

  const getNationalityDatas = useSelector(
    (state: RootStateOrAny) => state.PreOnboardingReducer.getNationalityDataRes
  );

  let NationalityList = getNationalityDatas?.data?.map((value: any) => {
    return { ...value };
  });
  NationalityList?.unshift({ id: 0, description: 'ALL', code: 'ALL' });
  const fetchOnboardingDetailsDownload = useCallback(
    (value: any, fileType: any) => {
      try {
        dispatch(DownloadOnboardDetailReport(value, fileType));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchNationality = useCallback(() => {
    try {
      dispatch(getNationalityDetails());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchNationality();
  }, [fetchNationality]);

  const fetchAllWallet = useCallback(async () => {
    try {
      dispatch(getAllWalletData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllWallet();
  }, []);

  const fetchBranchDashboardRecords = useCallback(async () => {
    try {
      dispatch(getBranchDashboardRecords());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchBranchDashboardRecords();
  }, [fetchBranchDashboardRecords]);
  const fetchIdtypeSummaryRes = useCallback(async () => {
    try {
      dispatch(getIdtypeData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchIdtypeSummaryRes();
  }, [fetchIdtypeSummaryRes]);
  const branchDashboardRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.BranchDashboardReducer?.getBranchDashboardRegordsResponse
  );
  let BranchNameList = branchDashboardRecordsData?.data?.map((value: any) => {
    return { ...value };
  });
  BranchNameList?.unshift({ id: 0, branchName: 'ALL' });
  const idtypeSummaryListData = useSelector(
    (state: RootStateOrAny) =>
      state.idtypeSummaryReducer?.getAllIdtypeSummaryResponse
  );
  let IdTypeList = idtypeSummaryListData?.data?.map((value: any) => {
    return { ...value };
  });
  IdTypeList?.unshift({ id: 0, idtypeCode: 'ALL' });
  const cardTypeData: any = useSelector(
    (state: RootStateOrAny) => state.CardTypeReducer.getCardTypeList
  );
  let cardTypeDataList = cardTypeData?.data?.map((value: any) => {
    return { ...value };
  });
  cardTypeDataList?.unshift({ id: 0, cardTypeCode: 'ALL' });
  const fetchcardTypedata = useCallback(async () => {
    try {
      dispatch(getAllCardType());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchcardTypedata();
  }, [fetchcardTypedata]);

  useEffect(() => {
    if (reportsData) {
      setIsLoading(false);
    }
  }, [reportsData]);
  const header = [
    {
      title: 'Date & Time',
      dataIndex: 'date',
      width: 180,
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 160,
          },
        };
      },
      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
    },
    {
      title: 'Branch Name',
      dataIndex: 'branchName',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchName - b.branchName,
      },
    },
    {
      title: 'Branch Code',
      dataIndex: 'branchCode',
      width: 100,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchCode - b.branchCode,
      },
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
      },
    },
    {
      title: 'URN',
      dataIndex: 'urn',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urn - b.urn,
      },
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobileNumber',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
    },
    {
      title: 'ID No',
      dataIndex: 'identificationNumber',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.identificationNumber.localeCompare(b.identificationNumber),
      },
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      width: 150,
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 160,
          },
        };
      },
      sorter: {
        compare: (a: any, b: any) => a.dob.localeCompare(b.dob),
      },
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      width: 250,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.emailAddress.localeCompare(b.emailAddress),
      },
    },
    {
      title: 'Initial Reload Amount',
      dataIndex: 'initialReloadAmount',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.initialReloadAmount - b.initialReloadAmount,
      },
    },
    {
      title: 'Collection Mode',
      dataIndex: 'collectionMode',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.collectionMode - b.collectionMode,
      },
    },
    {
      title: 'Commission code',
      dataIndex: 'commissionCode',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.commissionCode - b.commissionCode,
      },
    },
    {
      title: 'Fee Waiver',
      dataIndex: 'feeWaiver',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.feeWaiver - b.feeWaiver,
      },
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.brand - b.brand,
      },
    },
    {
      title: 'Card Type',
      dataIndex: 'cardType',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardType - b.cardType,
      },
    },
    {
      title: 'Login User ID',
      dataIndex: 'loginUserId',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.loginUserId - b.loginUserId,
      },
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.nationality - b.nationality,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status - b.status,
      },
    },
    {
      title: 'Source Code',
      dataIndex: 'sourceCode',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.sourceCode - b.sourceCode,
      },
    },
    {
      title: 'Source Code Description',
      dataIndex: 'sourceCodeDescription',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.sourceCodeDescription - b.sourceCodeDescription,
      },
    },
    {
      title: 'Promo Code',
      dataIndex: 'promoCode',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.promoCode - b.promoCode,
      },
    },
    {
      title: 'E-Remit',
      dataIndex: 'eremit',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.eremit - b.eremit,
      },
    },
    {
      title: 'E-Forex',
      dataIndex: 'eforex',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.eforex - b.eforex,
      },
    },
    {
      title: 'Partial Match',
      dataIndex: 'partialMatch',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.partialMatch - b.partialMatch,
      },
    },
    {
      title: 'Referal Code',
      dataIndex: 'referralCode',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.referralCode - b.referralCode,
      },
    },
    {
      title: 'Referral Reward Status',
      dataIndex: 'referralRewardStatus',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.referralRewardStatus.localeCompare(b.referralRewardStatus),
      },
    },
    {
      title: 'Referee Reward Status',
      dataIndex: 'refereeRewardStatus',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.refereeRewardStatus.localeCompare(b.refereeRewardStatus),
      },
    },
    {
      title: 'Platform​',
      dataIndex: 'platform',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.platform.localeCompare(b.platform),
      },
    },
    {
      title: 'Id type',
      dataIndex: 'idType',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType.localeCompare(b.idType),
      },
    },
    {
      title: 'ID type-others',
      dataIndex: 'idtypeOthers',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idtypeOthers.localeCompare(b.idtypeOthers),
      },
    },
    {
      title: 'Expiry date',
      dataIndex: 'expiryDate',
      width: 150,
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 160,
          },
        };
      },
      sorter: {
        compare: (a: any, b: any) => a.expiryDate.localeCompare(b.expiryDate),
      },
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.occupation.localeCompare(b.occupation),
      },
    },
    {
      title: 'Company name',
      dataIndex: 'companyName',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: 'Nature of business​',
      dataIndex: 'natureOfBusiness',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.natureOfBusiness.localeCompare(b.natureOfBusiness),
      },
    },
    {
      title: 'Residential address',
      dataIndex: 'residentialAddress',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.residentialAddress.localeCompare(b.residentialAddress),
      },
    },
    {
      title: 'Mailing address',
      dataIndex: 'mailingAddresss',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mailingAddresss.localeCompare(b.mailingAddresss),
      },
    },
    {
      title: 'Affin(ETB/NTB)',
      dataIndex: 'affin',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType.localeCompare(b.idType),
      },
    },
    {
      title: 'Sign up Affin',
      dataIndex: 'signUpAffin',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.signUpAffin.localeCompare(b.signUpAffin),
      },
    },
    {
      title: 'Last updated by',
      dataIndex: 'lastUpdatedBy',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.lastUpdatedBy.localeCompare(b.lastUpdatedBy),
      },
    },
    {
      title: 'Last updated date',
      dataIndex: 'lastUpdatedDate',
      width: 150,
      checked: true,
      onCell: () => {
        return {
          style: {
            whiteSpace: 'nowrap',
            maxWidth: 160,
          },
        };
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.lastUpdatedDate.localeCompare(b.lastUpdatedDate),
      },
    },
    {
      title: 'MMP card status',
      dataIndex: 'mmpCardStatus',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mmpCardStatus.localeCompare(b.mmpCardStatus),
      },
    },
    {
      title: 'Approved by (ekyc)',
      dataIndex: 'approvedByEkyc',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvedByEkyc.localeCompare(b.approvedByEkyc),
      },
    },
    {
      title: 'Approved Date(ekyc)',
      dataIndex: 'approvedDateEkyc',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvedDateEkyc.localeCompare(b.approvedDateEkyc),
      },
    },
    {
      title: 'MM remit enabled',
      dataIndex: 'mmRemitEnabled',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mmRemitEnabled.localeCompare(b.mmRemitEnabled),
      },
    },
    {
      title: 'Ops remarks',
      dataIndex: 'opsRemarks',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.opsRemarks.localeCompare(b.opsRemarks),
      },
    },
    {
      title: 'Source',
      dataIndex: 'source',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.source.localeCompare(b.source),
      },
    },
    {
      title: 'Group name',
      dataIndex: 'groupName',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.groupName.localeCompare(b.groupName),
      },
    },
    {
      title: 'CW card status',
      dataIndex: 'cwCardStatus',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cwCardStatus.localeCompare(b.cwCardStatus),
      },
    },
    {
      title: 'MMP profile status',
      dataIndex: 'mmpProfileStatus',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mmpProfileStatus.localeCompare(b.mmpProfileStatus),
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.remarks.localeCompare(b.remarks),
      },
    },
  ];

  const Validation = () => {
    let StartDateError = customValidator(
      'startDate',
      'startDate',
      filterValue.startDate
    );
    let EndDateError = customValidator(
      'endDate',
      'EndDate',
      filterValue.endDate
    );

    if (!(StartDateError === 'null' && EndDateError === 'null')) {
      setError({
        StartDateError: StartDateError,
        EndDateError: EndDateError,
      });
      return false;
    }
    setError({
      StartDateError: '',
      EndDateError: '',
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
        startDate: filterValue.startDate,
        endDate: filterValue.endDate,
        brand: filterValue.brand,
        cardType: filterValue.cardType,
        nationality: nationalityCodeData,
        branchName: filterValue.branchName,
        idType: filterValue.idType,
        sourceCode: filterValue.sourceCode,
      };
      fetchOnboardingReport(record);
    }
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
      brand: '',
      cardType: '',
      startDate: '',
      endDate: '',
      nationality: '',
      branchName: '',
      idType: '',
      sourceCode: '',
    });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      brand: '',
      cardType: '',
      startDate: '',
      endDate: '',
      nationality: '',
      branchName: '',
      idType: '',
      sourceCode: '',
    });
    resetOnboardingDetails();
  };
  var data = {
    startDate: filterValue.startDate,
    endDate: filterValue.endDate,
    brand: filterValue.brand,
    cardType: filterValue.cardType,
    nationality: nationalityCodeData,
    branchName: filterValue.branchName,
    idType: filterValue.idType,
    sourceCode: filterValue.sourceCode,
  };
  const downloadPdf = () => {
    setIsLoading(true);
    fetchOnboardingDetailsDownload(filterValue, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchOnboardingDetailsDownload(filterValue, fileExcel);
  };
  let value = {
    FromDate: filterValue.startDate,
    ToDate: filterValue.endDate,
    brand: filterValue.brand,
    cardType: filterValue.cardType,
    Nationality: nationalityCodeData,
    branchName: filterValue.branchName,
    IdType: filterValue.idType,
    sourceCode: filterValue.sourceCode,
  };
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);
    setFilterValue({ ...filterValue, branchName: obj.branchName });
  };
  const handleChangeNational = (e: any) => {
    let obj = JSON.parse(e);
    setNationalityCode(obj.code);
    setFilterValue({ ...filterValue, nationality: obj.description });
  };
  const handleChangeType = (e: any) => {
    let obj = JSON.parse(e);
    setFilterValue({ ...filterValue, idType: obj.idtypeCode });
  };
  const handleChangeCard = (e: any) => {
    let obj = JSON.parse(e);
    setFilterValue({ ...filterValue, cardType: obj.cardTypeCode });
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
          RightContent={'Onboarding Detail Report'}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          downloadExcel={downloadExcel}
          TableData={reportsData}
        />
        {filterOption && (
          <div className='colorWhite OnboardDetail mt-3 p-3'>
            <p className='branchSetupTitle'>
              Filter
              <p className='colorRed'>
                {error.StartDateError && error.EndDateError && (
                  <span className='colorRed'>
                    *Indicators Fields are mandatory
                  </span>
                )}
              </p>
            </p>
            <div className='filterInputAlign'>
              <div className='d-flex row align-items-end'>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>From Date</Label>
                    <span className='container-body-label-color'>*</span>
                    <Input
                      type='date'
                      value={filterValue.startDate}
                      name='startDate'
                      onChange={handleChange}
                      min={Mindates}
                      max={dates}
                      className='OnboardDetail-input'
                    ></Input>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>To Date</Label>
                    <span className='container-body-label-color'>*</span>
                    <Input
                      type='date'
                      value={filterValue.endDate}
                      name='endDate'
                      onChange={handleChange}
                      min={filterValue.startDate}
                      max={dates}
                      className='OnboardDetail-input'
                    ></Input>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>Brand</Label>
                    <Input
                      type='select'
                      value={filterValue.brand}
                      name='brand'
                      onChange={handleChange}
                      className='form-select'
                    >
                      <option value='ALL'>ALL</option>
                      <option>MTAMY</option>
                      <option>MMPD</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>Card Type</Label>

                    <Select
                      placeholder='Select'
                      onChange={handleChangeCard}
                      filterOption={(input: any, value: any) =>
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      id='fieldName1'
                      className='EcddReport-input ECDDReport-select-box form-control border-0 cursor'
                      value={filterValue.cardType}
                      style={{ height: '38px' }}
                    >
                      {cardTypeDataList &&
                        cardTypeDataList.length > 0 &&
                        cardTypeDataList.map((data: any) => {
                          return (
                            <Option
                              className='ECDDReport-select-box'
                              value={JSON.stringify(data)}
                            >
                              {data.cardTypeCode}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormGroup>
                </div>
              </div>
              <div className='d-flex mt-2 row '>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>Nationality</Label>
                    <Select
                      showSearch
                      placeholder='Select'
                      onChange={handleChangeNational}
                      filterOption={(input: any, value: any) =>
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      id='fieldName1'
                      className='EcddReport-input ECDDReport-select-box form-control border-0 cursor'
                      value={filterValue.nationality}
                      style={{ height: '38px' }}
                    >
                      {NationalityList &&
                        NationalityList.length > 0 &&
                        NationalityList.map((data: any) => {
                          return (
                            <Option
                              className='ECDDReport-select-box'
                              value={JSON.stringify(data)}
                            >
                              {data.description}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormGroup>
                </div>

                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>Branch Name</Label>
                    <Select
                      showSearch
                      placeholder='Select'
                      onChange={handleChangeCode}
                      filterOption={(input: any, value: any) =>
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      id='fieldName1'
                      className='form-control border-0 cursor'
                      value={filterValue.branchName}
                      style={{ height: '38px' }}
                    >
                      {BranchNameList &&
                        BranchNameList.length > 0 &&
                        BranchNameList.map((value: any) => {
                          return (
                            <Option
                              className='ECDDReport-select-box'
                              value={JSON.stringify(value)}
                            >
                              {value.branchName}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>ID Type</Label>
                    <Select
                      showSearch
                      placeholder='Select'
                      onChange={handleChangeType}
                      filterOption={(input: any, value: any) =>
                        value.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      id='fieldName1'
                      className='form-control border-0 cursor'
                      value={filterValue.idType}
                      style={{ height: '38px' }}
                    >
                      {IdTypeList &&
                        IdTypeList.length > 0 &&
                        IdTypeList.map((value: any) => {
                          return (
                            <Option
                              className='ECDDReport-select-box'
                              value={JSON.stringify(value)}
                            >
                              {value.idtypeCode}
                            </Option>
                          );
                        })}
                    </Select>
                  </FormGroup>
                </div>
                <div className='col'>
                  <FormGroup>
                    <Label for='exampleEmail'>Source Code</Label>
                    <Input
                      type='text'
                      value={filterValue.sourceCode}
                      name='sourceCode'
                      onChange={handleChange}
                      className='OnboardDetail-input'
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div className='d-flex mt-2 row '>
                <div className='d-flex col justify-content-end mt-3'>
                  <button
                    className='generateBtn  border-0 me-4'
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
          <div className='mt-3'>
            {table && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : header}
                CustomTableHeader={reportsData}
                customColumnWidth={true}
                DisableMange={true}
                checkLength={reportsData.length}
                EnableScrollMax={true}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default OnBoardingDetailsReport;
