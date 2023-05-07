import { Select } from 'antd';

import { TiArrowBackOutline } from 'react-icons/ti';
import { useHistory } from 'react-router';
import { Input, Label } from 'reactstrap';

import CustomResponseMessage from '../../Components/UI/ApiResponse/CustomResponseMessage';

import SubmitCancelButton from '../../Components/SubmitCancelButton/SubmitCancelButton';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { customValidator } from '../../Constants/Validation';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import {
  createManualDebitCreditData,
  getCompanyData,
} from '../../redux/action/ManualDebitCreditAction';
import moment from 'moment';
import { Option } from 'antd/lib/mentions';
import { getAllCompanyData } from '../../redux/action/CompanyMaintenanceAction';
import { ApiEndPoints, Constants } from '../../Constants/Constants';
import axios from 'axios';

interface ErrMessage {
  companyNameErrMessage?: string;
}

function AddManualDebitCredit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [button, setButton] = useState(true);
  const [expectBal, setExpectBal] = useState<string | number | null>();
  const [currentBal, setCurrentBal] = useState<number | null>();
  const [debitCreditErrMessage, setDebitCreditErrMessage] =
    useState<ErrMessage>({});

  const [companyNameError, SetcompanyNameError] = useState('');
  const [transactionAmountError, SettransactionAmountError] = useState('');
  const [transactionStatisticErr, setTransactionStatisticErr] = useState('');
  const [transactionType, SettransactionType] = useState('');
  const [errorState, seterrorState] = useState('');

  const [addDebitCreditData, setAddDebitCreditData] = useState({
    transactionType: '',
    companyAccountId: '',
    companyId: '',
    companyName: '',
    transactionAmount: '',
    transactionReference: '',
    currentBalance: '',
    expectedBalance: '',
    makerComments: '',
  });

  const [filterValue, setFilterValue] = useState({
    fromDate: '',
    toDate: '',
    companyName: 'Select Company',
    companyCode: 'Select Company',
  });

  let CompanyListResponse = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer?.getAllCompanyDataResponse
  );
  let state = useSelector(
    (state: RootStateOrAny) =>
      state.ManualDebitCreditReducer.getManualDebitCreditCreateError
  );

  console.log(
    CompanyListResponse,
    'CompanyListResponseCompanyListResponseCompanyListResponseCompanyListResponse'
  );

  const fetchCompanyData = useCallback(
    (data: SetStateAction<never[]>) => {
      try {
        if (data !== undefined) {
          const apiURL = `${Constants.BaseURL}${ApiEndPoints.prefundCompanyGetCompanyBalance}${data}`;
          axios
            .get(apiURL)
            .then((response) => setCurrentBal(response.data.data.balance));
        }
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchAllCompanyList = useCallback(
    (data: string) => {
      try {
        dispatch(getAllCompanyData(data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    let companyData: string = 'comapanyMainatnce';
    fetchAllCompanyList(companyData);
  }, [fetchAllCompanyList]);

  useEffect(() => {
    let txnType = addDebitCreditData?.transactionType;
    let expectBalance = 0;
    if (txnType === 'DEBIT') {
      expectBalance =
        Number(addDebitCreditData?.currentBalance) -
        Number(addDebitCreditData?.transactionAmount);
    } else if (txnType === 'REFUND') {
      expectBalance =
        Number(addDebitCreditData?.currentBalance) +
        Number(addDebitCreditData?.transactionAmount);
    }
    setExpectBal(expectBalance);
  }, [addDebitCreditData?.transactionAmount]);

  const handle_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('////****test', e.target.name, e.target.value);
    setAddDebitCreditData({
      ...addDebitCreditData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransType = (e: any) => {
    let expectBalance: string | number = '';
    if (e.target.value === 'DEBIT') {
      expectBalance =
        Number(currentBal) - Number(addDebitCreditData?.transactionAmount);
    } else if (e.target.value === 'REFUND') {
      expectBalance =
        Number(currentBal) + Number(addDebitCreditData?.transactionAmount);
    }
    setAddDebitCreditData({
      ...addDebitCreditData,
      transactionType: e.target.value,
      currentBalance: String(currentBal),
      expectedBalance: String(expectBalance),
    });
    expectBalance &&
      addDebitCreditData?.transactionAmount &&
      setExpectBal(expectBalance);
  };

  const handle_Cancel = () => {
    history.goBack();
  };

  const addManualDebitCredit_onSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    SetcompanyNameError('');
    SettransactionAmountError('');
    setTransactionStatisticErr('');

    if (state.error && state.erro !== undefined) {
      seterrorState(state.error);
    }

    if (addDebitCreditData.companyName === '') {
      SetcompanyNameError('Company Name is Required!');
    } else if (addDebitCreditData.transactionAmount === '') {
      SettransactionAmountError('Transaction Amount is Required!');
    } else if (addDebitCreditData.transactionReference === '') {
      setTransactionStatisticErr('Transaction Reference is Required!');
    } else if (addDebitCreditData.transactionType === '') {
      SettransactionType('Transaction Type is Requiored!');
    } else {
      dispatch(createManualDebitCreditData(addDebitCreditData, history));
    }
  };

  return (
    <div className='p-4'>
      <div className='d-flex'>
        <h1 className='text-bold edit-summary-title'>
          Manual Credit / Debit - Add
        </h1>
        <div className={'d-flex commonEdit-BackButton'} onClick={handle_Cancel}>
          <TiArrowBackOutline style={{ margin: 'auto 5px' }} /> Back
        </div>
      </div>

      <CustomResponseMessage
        apiStatus={false}
        message={errorState}
        closeMessage={() => seterrorState('')}
      />

      <div
        className='target-group-body p-4'
        style={{ maxHeight: 'fit-content' }}
      >
        <div className='p-4'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <div className='col-12 d-flex'>
              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>Company Name</label>
                </div>
                <div className='col me-4'>
                  <Select
                    showSearch
                    placeholder='select'
                    onChange={(e) => {
                      let value = JSON.parse(e);

                      setFilterValue({
                        ...filterValue,
                        companyName: value.companyName,
                      });

                      fetchCompanyData(value.companyAccountId);

                      setAddDebitCreditData({
                        ...addDebitCreditData,
                        companyId: value.id,
                        companyName: value.companyName,
                        companyAccountId: value.companyAccountId,
                      });
                    }}
                    filterOption={(input: string, value: any) =>
                      value?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id='fieldName1'
                    className='PayrollCompanyCreationReport-input PayrollCompanyCreationReport-select-box form-control border-0 cursor'
                    value={filterValue.companyName}
                    style={{ height: '38px' }}
                  >
                    <Option value={''}>Select Company</Option>
                    {CompanyListResponse &&
                      CompanyListResponse.length > 0 &&
                      CompanyListResponse.map(
                        (value: { companyName?: string }) => {
                          return (
                            <Option
                              className='PayrollCompanyCreationReport-select-box'
                              value={JSON.stringify(value)}
                            >
                              {value.companyName}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                  {companyNameError !== '' ? (
                    <Label className='text-red' style={{ margin: '10px' }}>
                      {companyNameError}
                    </Label>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center mb-4'>
            <div className='col-12 d-flex'>
              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Transaction Date
                  </label>
                </div>
                <div className='col me-4'>
                  <Input
                    type='text'
                    className='no-border remit_feesAndCharges merchant-fontSize'
                    value={moment().format('DD-MM-YYYY')}
                    readOnly
                  />
                </div>
              </div>
              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Transaction Type
                  </label>
                </div>
                <div className='col me-4'>
                  <select
                    name='transactionType'
                    className='PayrollCompanyCreationReport-input PayrollCompanyCreationReport-select-box form-control border-0 cursor'
                    onChange={(e) => handleTransType(e)}
                  >
                    <option
                      className='PayrollCompanyCreationReport-select-box'
                      value=''
                      hidden
                      selected
                    >
                      Select Type
                    </option>
                    <option value='DEBIT'>Debit</option>
                    <option value='REFUND'>Refund</option>
                  </select>
                </div>
                {transactionType !== '' ? (
                  <Label className='text-red' style={{ margin: '10px' }}>
                    {transactionType}
                  </Label>
                ) : null}
              </div>

              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Transaction Amount
                  </label>
                </div>
                <div className='col me-2'>
                  <div className='col d-flex'>
                    <div className='col me-1'>
                      <Input
                        name=''
                        type='select'
                        className='Kyc-FilterINputBox form-input'
                      >
                        <option>MYR</option>
                        <option>INR</option>
                      </Input>
                    </div>
                    <div className='col'>
                      <div className='col'>
                        <Input
                          type='text'
                          className='no-border remit_feesAndCharges merchant-fontSize'
                          name='transactionAmount'
                          onChange={handle_onChange}
                        />
                      </div>
                    </div>
                  </div>
                  {transactionAmountError !== '' ? (
                    <Label className='text-red' style={{ margin: '10px' }}>
                      {transactionAmountError}
                    </Label>
                  ) : null}
                </div>
              </div>
              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Transaction Reference
                  </label>
                </div>
                <div className='col me-4'>
                  <Input
                    type='text'
                    className='no-border remit_feesAndCharges merchant-fontSize'
                    onChange={handle_onChange}
                    name='transactionReference'
                  />
                </div>
                {transactionStatisticErr !== '' ? (
                  <Label className='text-red' style={{ margin: '10px' }}>
                    {transactionStatisticErr}
                  </Label>
                ) : null}
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-between align-items-center mb-4'>
            <div className='col-12 d-flex'>
              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Current Balance
                  </label>
                </div>
                <div className='col me-4'>
                  <Input
                    type='text'
                    className='no-border remit_feesAndCharges'
                    value={currentBal ?? 0}
                    readOnly
                  />
                </div>
              </div>

              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Expected Balance
                  </label>
                </div>
                <div className='col me-4'>
                  <Input
                    type='text'
                    className='no-border remit_feesAndCharges'
                    name=''
                    value={expectBal ?? ''}
                    readOnly
                  />
                </div>
              </div>

              <div className='col-3 me-2'>
                <div className='col'>
                  <label className='KYCViewCustomer-label'>
                    Maker Comments
                  </label>
                </div>
                <div className='col me-4'>
                  <Input
                    type='text'
                    className='no-border remit_feesAndCharges'
                    onChange={handle_onChange}
                    name='makerComments'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-0'>
            <SubmitCancelButton
              button={'Submit'}
              secondButton={'Cancel'}
              onSubmit={addManualDebitCredit_onSubmit}
              onCancel={handle_Cancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddManualDebitCredit;
