import { useCallback, useEffect, useRef, useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import CommonHeaderSummary from '../../Components/CommonHeaderSummary/CommonHeaderSummary';
import CustomHeader from '../../Components/CustomTable/CustomTable';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { customValidator } from '../../Constants/Validation';
import CustomLoader from '../../Components/Loader/CustomLoader';
import SubmitCancelButton from '../../Components/SubmitCancelButton/SubmitCancelButton';
import FiltersSelected from '../../Components/FiltersSelected/FiltersSelected';
import './KycBlockAfterGrace.scss';
import moment from 'moment';
import {
  getKYCBlockAfterGraceRecords,
  resetKYCBlockAfterGraceRecords,
} from '../../redux/action/KycBlockAfterGraceAction';

const KycBlockAfterGrace = () => {
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchUserData, setsearchUserData] = useState<string>('');
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [minEndDate, setMinEndDate] = useState('');
  const [filterValue, setFilterValue] = useState({
    startDate: '',
    enddate: '',
  });
  const [errors, setErrors] = useState({
    countryDescriptionError: '',
    endDateDescriptionError: '',
  });

  const KYCAfterGraceList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KycBlockAfterGraceReducer.getKYCBlockAfterGraceResponse
  );

  const fetchKYCAfterGrace = useCallback(
    async (filterValue: any) => {
      try {
        dispatch(getKYCBlockAfterGraceRecords(filterValue));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (KYCAfterGraceList) {
      if (KYCAfterGraceList?.data) {
        setTable(true);
        setIsLoading(false);
      } else if (KYCAfterGraceList?.error) {
      }
    }
  }, [KYCAfterGraceList]);
  const resetKYCAfterGrace = useCallback(async () => {
    try {
      dispatch(resetKYCBlockAfterGraceRecords());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetKYCAfterGrace();
    setTable(false);
  }, [resetKYCAfterGrace]);

  let KYCAfterdata = KYCAfterGraceList?.data;

  const header = [
    {
      title: 'IdType Code',
      dataIndex: 'idtypeCode',
      width: 100,
      checked: false,
      sorter: {
        compare: (a: any, b: any) =>
          a?.idtypeCode?.toString()?.localeCompare(b?.idtypeCode?.toString()),
      },
    },
    {
      title: 'Customer Profile Created Date',
      dataIndex: 'customerProfileCreatedDate',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.customerProfileCreatedDate
            ?.toString()
            .localeCompare(b?.customerProfileCreatedDate?.toString()),
      },
    },
    {
      title: 'Mobile Number',
      dataIndex: 'primaryMobileNumber',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.primaryMobileNumber
            ?.toString()
            .localeCompare(b?.primaryMobileNumber?.toString()),
      },
    },
    {
      title: 'ID Number',
      dataIndex: 'idValue',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.idValue?.toString()?.localeCompare(b?.idValue?.toString()),
      },
    },
    {
      title: 'IdExpiry Date',
      dataIndex: 'idExpiryDate',
      width: 150,
      checked: false,
      sorter: {
        compare: (a: any, b: any) =>
          a?.idExpiryDate
            ?.toString()
            ?.localeCompare(b?.idExpiryDate?.toString()),
      },
    },
    {
      title: 'Old account type',
      dataIndex: 'oldAccountTypeName',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.oldAccountTypeName
            ?.toString()
            ?.localeCompare(b?.oldAccountTypeName?.toString()),
      },
    },
    {
      title: 'New Account Type',
      dataIndex: 'newAccountTypeName',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.newAccountTypeName
            ?.toString()
            ?.localeCompare(b?.newAccountTypeName?.toString()),
      },
    },
    {
      title: 'Kyc Expiry Date',
      dataIndex: 'kycExpiryDate',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.kycExpiryDate
            ?.toString()
            ?.localeCompare(b?.kycExpiryDate?.toString()),
      },
    },
    {
      title: 'Grace Period Expiry Date',
      dataIndex: 'graceExpiryDate',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>{
          return a?.graceExpiryDate
          ?.toString()
          ?.localeCompare(b?.graceExpiryDate?.toString())
        }
          
      },
    },
    {
      title: 'Block Date',
      dataIndex: 'blockDate',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.blockDate?.toString()?.localeCompare(b?.blockDate?.toString()),
      },
    },
    {
      title: 'Status Code',
      dataIndex: 'statusCode',
      width: 150,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.statusCode?.toString()?.localeCompare(b?.statusCode?.toString()),
      },
    },
    {
      title: 'Response Code',
      dataIndex: 'responseCode',
      width: 200,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.responseCode
            ?.toString()
            ?.localeCompare(b?.responseCode?.toString()),
      },
    },
    {
      title: 'Response Description',
      dataIndex: 'responseDescription',
      width: 200,
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a?.responseDescription
            ?.toString()
            ?.localeCompare(b.responseDescription?.toString()),
      },
    },
  ];

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setMinEndDate('');
    setFilterValue({
      startDate: '',
      enddate: '',
    });
    resetKYCAfterGrace();
  };

  const validate = () => {
    let startDateError = customValidator(
      'countryCode',
      'Startdate',
      filterValue.startDate
    );
    let endDateError = customValidator(
      'countryCode',
      'enddate',
      filterValue.enddate
    );
    if (startDateError !== 'null' && endDateError !== 'null') {
      setErrors({
        countryDescriptionError: startDateError,
        endDateDescriptionError: endDateError,
      });
      return false;
    }
    setErrors({
      countryDescriptionError: '',
      endDateDescriptionError: '',
    });
    return true;
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };
  const closeSearch = () => {
    setSearchArea(false);
  };

  if (searchUserData && searchCategory !== 'Select Field') {
    if (searchCategory === 'any') {
      KYCAfterdata = KYCAfterdata?.filter((e: any) => {
        return (
          e.idtypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.customerProfileCreatedDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.primaryMobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.idValue
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.idExpiryDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.oldAccountTypeName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.newAccountTypeName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.graceExpiryDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.kycExpiryDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.blockDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.responseCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.responseDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      KYCAfterdata = KYCAfterdata?.filter((e: any) => {
        if (
          e[searchCategory]
            ?.toString()
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const handleSubmit = () => {
    if (validate()) {
      setFilteredArea(true);
      setTable(true);
      setfilterOption(false);
      setIsLoading(true);
      fetchKYCAfterGrace(filterValue);
    }
  };
  const handleReset = () => {
    setMinEndDate('');
    setFilterValue({
      startDate: '',
      enddate: '',
    });
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    if (e.target.name === 'startDate') {
      setMinEndDate(e.target.value);
    }
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setPrint(false);
    setorginalColumns([]);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(false);
    setcolumns([]);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };

  return (
    <div className='p-4'>
      <>
        <CommonHeaderSummary
          RightContent={'KYC Block After Grace Period'}
          SummaryFileName={'KYC Block After Grace Period'}
          filterArea={toggleFilter}
          filterEnabled={filterOption}
          filterRemit={true}
          searchArea={toggleSearch}
          search={searchArea}
          Refresh={true}
          Print={handlePrint}
          refresh={toggleRefresh}
          List={true}
          ListData={handleList}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : header}
          TableData={KYCAfterdata}
        />

        {filterOption && (
          <div className='colorWhite expairyWallet-filter-section mt-3 p-3'>
            <p className='branchSetupTitle'>
              Filter
              {errors.countryDescriptionError &&
                errors.endDateDescriptionError &&
                errors?.countryDescriptionError !== 'null' &&
                errors.endDateDescriptionError !== 'null' && (
                  <span className='colorRedUser'>
                    {' '}
                    * any one field should be mandatory
                  </span>
                )}
            </p>
            <div className='container-fluid filter_all_container'>
              <div className='date_container'>
                <FormGroup>
                  <Label for='exampleEmail'>
                    StartDate
                    <span className='container-body-label-color'>*</span>
                  </Label>
                  <Input
                    type='date'
                    value={filterValue.startDate}
                    name='startDate'
                    onChange={handleChange}
                    max={moment().format('YYYY-MM-DD')}
                  ></Input>
                </FormGroup>
              </div>
              <div className='date_container'>
                <FormGroup>
                  <Label for='exampleEmail'>
                    EndDate
                    <span className='container-body-label-color'>*</span>
                  </Label>
                  <Input
                    type='date'
                    value={filterValue.enddate}
                    name='enddate'
                    onChange={handleChange}
                    min={minEndDate}
                    max={moment().format('YYYY-MM-DD')}
                  ></Input>
                </FormGroup>
              </div>
              <div className='submit_cancel_btn_container'>
                <SubmitCancelButton
                  button={'Submit'}
                  secondButton={'Reset'}
                  onSubmit={handleSubmit}
                  onCancel={handleReset}
                />
              </div>
            </div>
          </div>
        )}
        {searchArea && (
          <div className='d-flex user-search mt-3 p-3 cursor'>
            <select
              className=' form-select user-search-drop cursor'
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={'Select Field'}
            >
              <option selected className='cursor'>
                Select Field
              </option>

              <option value='idtypeCode' className='cursor'>
                IdTypeCode
              </option>
              <option value='customerProfileCreatedDate' className='cursor'>
                Customer Profile Created Date
              </option>
              <option value='primaryMobileNumber' className='cursor'>
                Mobile Number
              </option>
              <option value='idValue' className='cursor'>
                ID Number
              </option>
              <option value='idExpiryDate' className='cursor'>
                Id Expiry Date
              </option>
              <option value='oldAccountTypeName' className='cursor'>
                Old Account Type
              </option>

              <option value='newAccountTypeName' className='cursor'>
                New Account Type
              </option>
              <option value='graceExpiryDate' className='cursor'>
                Grace Period Expiry Date
              </option>
              <option value='kycExpiryDate' className='cursor'>
                Kyc Expiry Date
              </option>
              <option value='blockDate' className='cursor'>
                Block Date
              </option>

              <option value='statusCode' className='cursor'>
                Status Code
              </option>
              <option value='responseCode' className='cursor'>
                Response Code
              </option>
              <option value='responseDescription' className='cursor'>
                Response Description
              </option>
              <option value='any' className='cursor'>
                Any
              </option>
            </select>
            <Input
              type='text'
              className='ms-1 user-search-input'
              placeholder='Type your search keyword'
              onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
            />
            <div className='ms-1'>
              <Button color='danger' className='btn btn-danger btn--sizer'>
                Search
              </Button>
            </div>
            <div>
              <Button
                className='text-white border-0 ms-1'
                onClick={() => closeSearch()}
              >
                <FaReply />
              </Button>
            </div>
          </div>
        )}
        <div className='mt-3'>
          {toPrint && (
            <span
              className='span-col1'
              style={{
                textAlign: 'center',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Preview content. Please click{' '}
              <button
                className='border-0 bg-light'
                onClick={Print}
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                here
              </button>{' '}
              to confirm and Print !. Or{' '}
              <button
                className='border-0 bg-light'
                onClick={cancelPrint}
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                Cancel
              </button>
            </span>
          )}
        </div>
        {filteredArea && <FiltersSelected value={filterValue} />}
        <>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className='mt-3' ref={componentRef}>
              <Form form={form} component={false}>
                {table && (
                  <CustomHeader
                    TableData={columns.length > 0 ? columns : header}
                    editToggle={true}
                    Delete={false}
                    CustomTableHeader={KYCAfterdata}
                    toPrint={toPrint ? true : false}
                    DisableMange={true}
                    columns={header}
                    customColumnWidth={true}
                    DefaultColumnWidth={true}
                  />
                )}
              </Form>
            </div>
          )}
        </>
      </>
    </div>
  );
};

export default KycBlockAfterGrace;
