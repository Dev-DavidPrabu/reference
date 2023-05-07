import { Select } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { Label, Col, Input, FormGroup } from 'reactstrap';
import CustomCurrentPage from '../../../Components/CustomCurrentPageComponent/CustomCurrentPage';
import CustomButton from '../../../Components/UI/CustomButton';
import { getAllPostalCode } from '../../../redux/action/StateCountryAction';
import 'antd/dist/antd.css';
import './AddOnboardingCustomer.scss';
import { getIdtypeReferenceData } from '../../../redux/action/idTypeRoutingActions';
import { getAllCompanyData } from '../../../redux/action/CompanyMaintenanceAction';
import { Constants, ApiEndPoints } from '../../../Constants/Constants';
import {
  createNewCustomer,
  getCountryData,
  getLanguageDetails,
  getNationalityDetails,
  getRaceDetails,
  resetnewCustomerData,
} from '../../../redux/action/PreOnboardingAction';
import axios from 'axios';
import CustomResponseMessage from '../../../Components/UI/ApiResponse/CustomResponseMessage';
import CustomLoader from '../../../Components/Loader/CustomLoader';
import { customValidator } from '../../../Constants/Validation';
import moment from 'moment';
import validate from 'validate.js';
const { Option } = Select;

const AddOnboardingCustomer = (props: any) => {
  let userData = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const userType = userData?.userInfo?.userType;
  const [addressChecked, setAddressChecked] = useState(false);
  const dispatch = useDispatch();
  const [idTypeData, setIdTypeData] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    entityId: userData?.userInfo?.entityId,
    entityCode: 'MTAMY',
    companyId: '',
    companyName: '',
    title: '',
    titleDescription: '',
    customerName: '',
    preferredName: '',
    gender: '',
    birthDate: '',
    mobileNumber: '',
    emailAddress: '',
    nationalityCode: '',
    nationalityCodeDescription: '',
    preferredLanguage: '',
    preferredLanguageDescription: '',
    race: '',
    raceDescription: '',
    maritalStatus: '',
    mothersMaidenName: '',
    idTypeCode: '',
    idTypeCodeDescription: 'Select Id Type',
    idValue: '',
    cardworksIdtypeMapping: '',
    prStatus: '',
    visaNumber: '',
    countryOfIssue: '',
    newIdDate: '',
    newIdExpiryDate: '',
    immigrationVisaExpiryDate: '',
    residentAddress1: '',
    residentAddress2: '',
    residentPostcode: '',
    isSameAddress: addressChecked === false ? true : false,
    mailAddress1: '',
    mailAddress2: '',
    mailPostcode: '',
    isExpiryDateMandatory: '',
    isIssueDateMandatory: '',
    residentCountryDescription: '',
    residentCityDescription: '',
    residentStateDescription: '',
    residentStateCode: '',
    residentCountryCode: '',
    residentCityCode: '',
    mailCountryDescription: '',
    mailCityDescription: '',
    mailStateDescription: '',
    mailStateCode: '',
    mailCountryCode: '',
    mailCityCode: '',
  });
  const [resAddress, setResAddress] = useState({ state: '', city: '' });
  const [mailAddress, setMailAddress] = useState({ state: '', city: '' });
  const [countryCode, setCountryCode] = useState('+60');
  const [mobileNumber, setMobileNumber] = useState('');
  const [idTypeCode, setIdTypeCode] = useState('');
  const [errors, setErrors] = useState({
    entityIdError: '',
    entityCodeError: '',
    companyIdError: '',
    companyNameError: '',
    titleDescriptionError: '',
    customerNameError: '',
    preferredNameError: '',
    genderError: '',
    birthDateError: '',
    emailAddressError: '',
    nationalityCodeError: '',
    prefLangDescriptionError: '',
    raceDescriptionError: '',
    maritalStatusError: '',
    idTypeCodeDescriptionError: '',
    idValueError: '',
    prStatusError: '',
    visaNumberError: '',
    countryOfIssueError: '',
    newIdDateError: '',
    newIdExpiryDateError: '',
    immigrationVisaExpDateError: '',
    mothersMaidenNameError: '',
    residentAddress1Error: '',
    residentAddress2Error: '',
    residentPostcodeError: '',
    isSameAddressError: false,
    mailAddress1Error: '',
    mailAddress2Error: '',
    mailPostcodeError: '',
    mobileNumberError: '',
    residentCountryDescription: '',
    residentCityDescription: '',
    residentStateDescription: '',
    residentStateCode: '',
    residentCountryCode: '',
    residentCityCode: '',
  });
  const [apiMessage, setApiMessage] = useState('');
  const [colorError, setColorError] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState();
  const [details, setDetails] = useState({
    companyId: '',
    startDate: '',
    endDate: '',
  });
  const [filter, setFilter] = useState({
    companyId: '',
    startDate: '',
    endDate: '',
  });
  const [companyDetails, setCompanyDetails] = useState({
    id: '',
    totalRecordCount: '',
    totalValidCount: '',
    totalFailureCount: '',
  });
  const [company, setCompany] = useState('');
  const [idTypeFieldValidation, setIdTypeFieldValidation] = useState({
    fieldValidation: '',
    fieldValidationDescription: '',
  });
  const [idTypeFieldValidationError, setIdTypeFieldValidationError] =
    useState(false);

  const getAllpostalCode = useSelector(
    (residentStateDescription: RootStateOrAny) =>
      residentStateDescription.StateCountryReducer.getAllPostalCodeResponse
  );

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  let newCustomerAdd = useSelector(
    (state: RootStateOrAny) => state.PreOnboardingReducer.addNewCustomerResponse
  );
  useEffect(() => {
    if (props.location.state !== undefined) {
      setState(props.location.state);
    }
  }, [props.location.state]);
  useEffect(() => {
    if (props.location.value !== undefined) {
      setDetails(props.location.value);
    }
  }, [props.location.value]);
  useEffect(() => {
    if (props.location.data !== undefined) {
      setFilter(props.location.data);
    }
  }, [props.location.data]);
  useEffect(() => {
    if (props.location.e !== undefined) {
      setCompanyDetails(props.location.e);
    }
  }, [props.location.e]);
  useEffect(() => {
    if (props.location.name !== undefined) {
      setCompany(props.location.name);
    }
  }, [props.location.name]);
  function isOver18(dateOfBirth: any) {
    const date18YrsAgo = new Date();
    date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);

    return dateOfBirth <= date18YrsAgo;
  }

  useEffect(() => {
    if (customerDetails?.birthDate) {
      if (!isOver18(new Date(customerDetails?.birthDate))) {
        setErrors({
          ...errors,
          birthDateError: 'Age should be 18 or 18 above',
        });
      } else {
        setErrors({ ...errors, birthDateError: '' });
      }
    }
  }, [customerDetails?.birthDate]);

  useEffect(() => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getnationalitylistdata;
    axios
      .get(`${apiURL}${customerDetails?.nationalityCode}`)
      .then((res) => setIdTypeData(res.data.data));
    setCustomerDetails({
      ...customerDetails,
      idTypeCodeDescription: '',
      idTypeCode: '',
      idValue: '',
      cardworksIdtypeMapping: '',
      isExpiryDateMandatory: '',
      isIssueDateMandatory: '',
      prStatus: '',
      visaNumber: '',
      countryOfIssue: '',
      newIdDate: '',
      newIdExpiryDate: '',
      immigrationVisaExpiryDate: '',
    });
    setIdTypeCode('');
    setIdTypeFieldValidation({
      fieldValidation: '',
      fieldValidationDescription: '',
    });
  }, [customerDetails?.nationalityCode]);

  const fetchAllCompany = useCallback(async () => {
    try {
      dispatch(getAllCompanyData('comapanyMainatnce'));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllCompany();
  }, [fetchAllCompany]);

  const fetchAllPostalCode = useCallback(async () => {
    try {
      dispatch(getAllPostalCode());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllPostalCode();
  }, [fetchAllPostalCode]);

  const fetchIdtypeReferencedata = useCallback(() => {
    try {
      dispatch(getIdtypeReferenceData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchIdtypeReferencedata();
  }, [fetchIdtypeReferencedata]);

  const addNewCustomer = useCallback(
    (data) => {
      try {
        dispatch(createNewCustomer(data));
      } catch (err) {}
    },
    [dispatch]
  );
  const getNationalityDatas = useSelector(
    (state: RootStateOrAny) => state.PreOnboardingReducer.getNationalityDataRes
  );
  const fetchNationality = useCallback(() => {
    try {
      dispatch(getNationalityDetails());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchNationality();
  }, [fetchNationality]);

  const getLanguageDatas = useSelector(
    (state: RootStateOrAny) => state.PreOnboardingReducer.getLanguageDataRes
  );
  const fetchLanguage = useCallback(() => {
    try {
      dispatch(getLanguageDetails());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchLanguage();
  }, [fetchLanguage]);

  const getRaceDatas = useSelector(
    (state: RootStateOrAny) => state.PreOnboardingReducer.getRaceDataRes
  );
  const fetchRace = useCallback(() => {
    try {
      dispatch(getRaceDetails());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchRace();
  }, [fetchRace]);

  const getCountryDatas = useSelector(
    (state: RootStateOrAny) => state.PreOnboardingReducer.getCountryDataRes
  );
  const fetchCountry = useCallback(() => {
    try {
      dispatch(getCountryData('country'));
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  const clearAddNewCustomer = useCallback(() => {
    try {
      dispatch(resetnewCustomerData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (newCustomerAdd) {
      if (newCustomerAdd.data) {
        if (newCustomerAdd?.data?.error) {
          setIsLoading(false);
          setApiStatus(false);
          if (newCustomerAdd?.data?.error === 'TECHNICAL_EXCEPTION') {
            setApiMessage(newCustomerAdd?.data?.error);
            setColorError(true);
          } else {
            setApiMessage(newCustomerAdd?.data?.message);
            setColorError(true);
          }

          clearAddNewCustomer();
        } else {
          setIsLoading(false);
          setApiStatus(true);
          onCancel();
          setApiMessage('Customer Added Sucessfully');
          clearAddNewCustomer();
        }
      }
    }
  }, [newCustomerAdd]);
  const onCancel = () => {
    setCustomerDetails({
      entityId: userData?.userInfo?.entityId,
      entityCode: 'MTAMY',
      companyId: '',
      companyName: '',
      titleDescription: '',
      customerName: '',
      preferredName: '',
      gender: '',
      birthDate: '',
      emailAddress: '',
      nationalityCodeDescription: '',
      preferredLanguageDescription: '',
      raceDescription: '',
      maritalStatus: '',
      idTypeCodeDescription: '',
      idValue: '',
      prStatus: '',
      visaNumber: '',
      countryOfIssue: '',
      newIdDate: '',
      newIdExpiryDate: '',
      immigrationVisaExpiryDate: '',
      mothersMaidenName: '',
      residentAddress1: '',
      residentAddress2: '',
      residentPostcode: '',
      isSameAddress: false,
      mailAddress1: '',
      mailAddress2: '',
      mailPostcode: '',
      mobileNumber: '',
      title: '',
      nationalityCode: '',
      preferredLanguage: '',
      race: '',
      idTypeCode: '',
      cardworksIdtypeMapping: '',
      isExpiryDateMandatory: '',
      isIssueDateMandatory: '',
      residentCountryDescription: '',
      residentCityDescription: '',
      residentStateDescription: '',
      residentStateCode: '',
      residentCountryCode: '',
      residentCityCode: '',
      mailCountryDescription: '',
      mailCityDescription: '',
      mailStateDescription: '',
      mailStateCode: '',
      mailCountryCode: '',
      mailCityCode: '',
    });
    setMobileNumber('');
    setIdTypeCode('');
    setMailAddress({ state: '', city: '' });
    setResAddress({ state: '', city: '' });
    setAddressChecked(false);
  };

  const submitHandler = () => {
    let data = customerDetails;
    data.mobileNumber = `${countryCode}${mobileNumber}`;
    data.idTypeCodeDescription = idTypeCode;

    if (validateData() && customTypeValidator()) {
      setIsLoading(true);
      addNewCustomer(data);
    }
  };
  const handleMobNum = (e: any) => {
    setMobileNumber(e.target.value);
  };
  const validateData = () => {
    let isCompanyNameError = customValidator(
      'notEmptyValue',
      'Company Name',
      customerDetails?.companyName
    );
    let istitleDescriptionError = customValidator(
      'notEmptyValue',
      'Title',
      customerDetails?.titleDescription
    );
    let iscustomerNameError = customValidator(
      'notEmptyValue',
      'Name',
      customerDetails?.customerName
    );
    let isgenderError = customValidator(
      'notEmptyValue',
      'Gender',
      customerDetails?.gender
    );
    let isbirthDateError = customValidator(
      'notEmptyValue',
      'Birth Date',
      customerDetails?.birthDate
    );
    let isEmailAddressError = customValidator(
      'emailAddressPreOnboarding',
      'Email Id',
      customerDetails?.emailAddress
    );
    let isNationalityCodeError = customValidator(
      'notEmptyValue',
      'Nationality',
      customerDetails?.nationalityCodeDescription
    );

    let isPrefLanError = customValidator(
      'notEmptyValue',
      'Pref Language',
      customerDetails?.preferredLanguageDescription
    );

    let isRaceDescriptionError = customValidator(
      'notEmptyValue',
      'Race',
      customerDetails?.raceDescription
    );
    let isMaritalStatusError = customValidator(
      'notEmptyValue',
      'Marital status',
      customerDetails?.maritalStatus
    );
    let isIdTypeCodeDescriptionError = customValidator(
      'notEmptyValue',
      'Id Type',
      idTypeCode
    );
    let isIdValueError = customValidator(
      'notEmptyValue',
      'ID Number',
      customerDetails?.idValue
    );
    let isPrStausError = customValidator(
      'notEmptyValue',
      'Pr Status',
      customerDetails.idTypeCode === 'Passport'
        ? customerDetails?.prStatus
        : 'null'
    );
    let isResidentAddress1Error = customValidator(
      'notEmptyValue',
      'Address 1',
      customerDetails?.residentAddress1
    );
    let isResidentPostcodeError = customValidator(
      'notEmptyValue',
      'Resident Postal Code',
      customerDetails?.residentPostcode
    );
    let isMailAddressError = customValidator(
      'notEmptyValue',
      'Address 1',
      customerDetails?.mailAddress1
    );
    let isMailPostalCodeError = customValidator(
      'notEmptyValue',
      'Mailing Postal Code',
      customerDetails?.mailPostcode
    );
    let isMobileNumberError = customValidator(
      'notEmptyValue',
      'Mobile Number',
      mobileNumber
    );
    let isVisaNumberError = customValidator(
      'visaNumber',
      'Visa Number',
      customerDetails.idTypeCode === 'Passport' &&
        customerDetails.prStatus === 'Y'
        ? customerDetails?.visaNumber
        : 'null'
    );
    let isCountryOfIssueError = customValidator(
      'notEmptyValue',
      'Country Of Issue',
      customerDetails.idTypeCode === 'Passport'
        ? customerDetails?.countryOfIssue
        : 'null'
    );
    let isVisaDateError = customValidator(
      'notEmptyValue',
      'Visa Date',
      customerDetails.idTypeCode === 'Passport' &&
        customerDetails.prStatus === 'Y'
        ? customerDetails?.immigrationVisaExpiryDate
        : 'null'
    );
    let isNewIdDateError = customValidator(
      'notEmptyValue',
      'ID Doc Issue Date',
      customerDetails.isIssueDateMandatory ? customerDetails?.newIdDate : 'null'
    );
    let isNewIdExpiryDateError = customValidator(
      'notEmptyValue',
      'ID Doc Expiry Date',
      customerDetails.isExpiryDateMandatory
        ? customerDetails?.newIdExpiryDate
        : 'null'
    );

    if (
      !(
        isCompanyNameError === 'null' &&
        istitleDescriptionError === 'null' &&
        iscustomerNameError === 'null' &&
        isgenderError === 'null' &&
        isbirthDateError === 'null' &&
        isEmailAddressError === 'null' &&
        isNationalityCodeError === 'null' &&
        isPrefLanError === 'null' &&
        isRaceDescriptionError === 'null' &&
        isMaritalStatusError === 'null' &&
        isIdTypeCodeDescriptionError === 'null' &&
        isPrStausError === 'null' &&
        isIdValueError === 'null' &&
        isResidentAddress1Error === 'null' &&
        isResidentPostcodeError === 'null' &&
        isMailAddressError === 'null' &&
        isMailPostalCodeError === 'null' &&
        isMobileNumberError === 'null' &&
        isVisaDateError === 'null' &&
        isVisaNumberError === 'null' &&
        isCountryOfIssueError === 'null' &&
        isNewIdExpiryDateError === 'null' &&
        isNewIdDateError === 'null'
      )
    ) {
      setErrors({
        entityIdError: '',
        entityCodeError: '',
        companyIdError: '',
        companyNameError: isCompanyNameError,
        titleDescriptionError: istitleDescriptionError,
        customerNameError: iscustomerNameError,
        preferredNameError: '',
        genderError: isgenderError,
        birthDateError: isbirthDateError,
        emailAddressError: isEmailAddressError,
        nationalityCodeError: isNationalityCodeError,
        prefLangDescriptionError: isPrefLanError,
        raceDescriptionError: isRaceDescriptionError,
        maritalStatusError: isMaritalStatusError,
        idTypeCodeDescriptionError: isIdTypeCodeDescriptionError,
        idValueError: isIdValueError,
        prStatusError: isPrStausError,
        visaNumberError: isVisaNumberError,
        countryOfIssueError: isCountryOfIssueError,
        newIdDateError: isNewIdDateError,
        newIdExpiryDateError: isNewIdExpiryDateError,
        immigrationVisaExpDateError: isVisaDateError,
        mothersMaidenNameError: '',
        residentAddress1Error: isResidentAddress1Error,
        residentAddress2Error: '',
        residentPostcodeError: isResidentPostcodeError,
        isSameAddressError: false,
        mailAddress1Error: isMailAddressError,
        mailAddress2Error: '',
        mailPostcodeError: isMailPostalCodeError,
        mobileNumberError: isMobileNumberError,
        residentCountryDescription: '',
        residentCityDescription: '',
        residentStateDescription: '',
        residentStateCode: '',
        residentCountryCode: '',
        residentCityCode: '',
      });
      return false;
    } else {
      setErrors({
        entityIdError: '',
        entityCodeError: '',
        companyIdError: '',
        companyNameError: '',
        titleDescriptionError: '',
        customerNameError: '',
        preferredNameError: '',
        genderError: '',
        birthDateError: '',
        emailAddressError: '',
        nationalityCodeError: '',
        prefLangDescriptionError: '',
        raceDescriptionError: '',
        maritalStatusError: '',
        idTypeCodeDescriptionError: '',
        idValueError: '',
        prStatusError: '',
        visaNumberError: '',
        countryOfIssueError: '',
        newIdDateError: '',
        newIdExpiryDateError: '',
        immigrationVisaExpDateError: '',
        mothersMaidenNameError: '',
        residentAddress1Error: '',
        residentAddress2Error: '',
        residentPostcodeError: '',
        isSameAddressError: false,
        mailAddress1Error: '',
        mailAddress2Error: '',
        mailPostcodeError: '',
        mobileNumberError: '',
        residentCountryDescription: '',
        residentCityDescription: '',
        residentStateDescription: '',
        residentStateCode: '',
        residentCountryCode: '',
        residentCityCode: '',
      });
      return true;
    }
  };

  const customTypeValidator = () => {
    let object: any = {};
    let dynamicRegex = '';
    if (idTypeFieldValidation?.fieldValidation === '^[A-Z0-9]') {
      dynamicRegex = `${idTypeFieldValidation?.fieldValidation}+$`;
    } else {
      dynamicRegex = idTypeFieldValidation?.fieldValidation;
    }
    let constraints_new: any = {
      value: {
        presence: {
          allowEmpty: false,
          message: "^  can't be empty",
        },
        format: {
          pattern: dynamicRegex,
          message: '^error',
        },
      },
    };
    let constraint = constraints_new['value'];
    object['value'] = customerDetails?.idValue;
    const result = validate(object, { value: constraint });
    if (result) {
      setIdTypeFieldValidationError(true);
      return false;
    } else {
      setIdTypeFieldValidationError(false);
      return true;
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name === 'residentPostcode') {
      let selectedStateCityInfo = getAllpostalCode?.filter(
        (filterValue: any) => {
          if (filterValue.code === e.target.value) {
            return e;
          }
        }
      );

      setCustomerDetails({
        ...customerDetails,
        residentPostcode: selectedStateCityInfo[0].code,
        residentCountryDescription: selectedStateCityInfo[0].details.country,
        residentCityDescription: selectedStateCityInfo[0].details.city,
        residentStateDescription: selectedStateCityInfo[0].details.state,
        residentStateCode: selectedStateCityInfo[0].details.state,
        residentCountryCode: selectedStateCityInfo[0].details.countrycode,
        residentCityCode: selectedStateCityInfo[0].details.city,
      });
      setResAddress({
        ...resAddress,
        state: selectedStateCityInfo[0].details.state,
        city: selectedStateCityInfo[0].details.city,
      });
    } else if (e.target.name === 'mailPostalCode') {
      let selectedStateCityInfo = getAllpostalCode?.filter(
        (filterValue: any) => {
          if (filterValue.code === e.target.value) {
            return e;
          }
        }
      );

      setCustomerDetails({
        ...customerDetails,
        mailPostcode: selectedStateCityInfo[0].code,
        mailCountryDescription: selectedStateCityInfo[0].details.country,
        mailCityDescription: selectedStateCityInfo[0].details.city,
        mailStateDescription: selectedStateCityInfo[0].details.state,
        mailStateCode: selectedStateCityInfo[0].details.state,
        mailCountryCode: selectedStateCityInfo[0].details.countrycode,
        mailCityCode: selectedStateCityInfo[0].details.city,
      });
      setMailAddress({
        state: selectedStateCityInfo[0].details.state,
        city: selectedStateCityInfo[0].details.city,
      });
    } else if (e.target.name === 'nationalityCodeDescription') {
      let selectedStateCityInfo = getNationalityDatas?.data?.filter(
        (filterValue: any) => {
          if (filterValue.description === e.target.value) {
            return e;
          }
        }
      );

      setCustomerDetails({
        ...customerDetails,
        nationalityCodeDescription: selectedStateCityInfo[0].description,
        nationalityCode: selectedStateCityInfo[0].code,
      });
    } else if (e.target.name === 'preferredLanguageDescription') {
      let selectedStateCityInfo = getLanguageDatas?.data?.filter(
        (filterValue: any) => {
          if (filterValue.description === e.target.value) {
            return e;
          }
        }
      );
      setCustomerDetails({
        ...customerDetails,
        preferredLanguageDescription: selectedStateCityInfo[0].description,
        preferredLanguage: selectedStateCityInfo[0].code,
      });
    } else if (e.target.name === 'raceDescription') {
      let selectedStateCityInfo = getRaceDatas?.data?.filter(
        (filterValue: any) => {
          if (filterValue.description === e.target.value) {
            return e;
          }
        }
      );
      setCustomerDetails({
        ...customerDetails,
        raceDescription: selectedStateCityInfo[0].description,
        race: selectedStateCityInfo[0].code,
      });
    } else {
      setCustomerDetails({
        ...customerDetails,
        [e.target.name]: e.target.value,
      });
    }
  };
  useEffect(() => {
    if (customerDetails.titleDescription === 'MR') {
      setCustomerDetails((prev: any) => {
        return { ...prev, title: '0001' };
      });
    } else if (customerDetails.titleDescription === 'MRS') {
      setCustomerDetails((prev: any) => {
        return { ...prev, title: '0002' };
      });
    } else if (customerDetails.titleDescription === 'MISS') {
      setCustomerDetails((prev: any) => {
        return { ...prev, title: '0003' };
      });
    } else if (customerDetails.titleDescription === 'OTHERS') {
      setCustomerDetails((prev: any) => {
        return { ...prev, title: '0004' };
      });
    }
  }, [customerDetails.titleDescription]);

  const closeMessage = () => {
    setApiMessage('');
  };
  const handleChangeSearch = (e: any) => {
    let obj = JSON.parse(e);
    if (userType === 'COMPANY_USER') {
      setCustomerDetails({
        ...customerDetails,
        companyName: obj.companyName,
        companyId: obj.companyId,
      });
    } else {
      setCustomerDetails({
        ...customerDetails,
        companyName: obj.companyName,
        companyId: obj.id,
      });
    }
  };

  const handleChangeIdType = (e: any) => {
    let obj = JSON.parse(e);

    setCustomerDetails({
      ...customerDetails,
      idTypeCodeDescription: obj.idtypeCodeDescription,
      idTypeCode: obj.idtypeCode,
      idValue: '',
      cardworksIdtypeMapping: obj.cardworksCodeMapping,
      isExpiryDateMandatory: obj.isExpiryDateMandatory,
      isIssueDateMandatory: obj.isIssueDateMandatory,
      prStatus: '',
      visaNumber: '',
      countryOfIssue: '',
      newIdDate: '',
      newIdExpiryDate: '',
      immigrationVisaExpiryDate: '',
    });
    setIdTypeCode(obj.idtypeCodeDescription);
    setIdTypeFieldValidation({
      fieldValidation: obj.fieldValidation,
      fieldValidationDescription: obj.fieldValidationDescription,
    });
  };

  const handleChangeCode = (e: any) => {
    setCountryCode(e);
  };

  const handleAddressCheckBoc = () => {
    setAddressChecked(!addressChecked);

    if (!addressChecked) {
      setCustomerDetails({
        ...customerDetails,
        mailAddress1: customerDetails.residentAddress1,
        mailAddress2: customerDetails.residentAddress2,
        mailPostcode: customerDetails.residentPostcode,
        mailStateCode: customerDetails.residentStateCode,
        mailStateDescription: customerDetails.residentStateDescription,
        mailCityDescription: customerDetails.residentCityDescription,
        mailCountryCode: customerDetails.residentCountryCode,
        mailCountryDescription: customerDetails.residentCountryDescription,
        mailCityCode: customerDetails.residentCityCode,
        isSameAddress: true,
      });
      setMailAddress({
        city: resAddress.city,
        state: resAddress.state,
      });
    } else {
      setCustomerDetails({
        ...customerDetails,
        mailAddress1: '',
        mailAddress2: '',
        mailPostcode: '',
        isSameAddress: false,
      });
      setMailAddress({
        city: '',
        state: '',
      });
    }
  };

  const navigateTo = (e: any) => {
    if (e === 'customer') {
      props.history.push({
        pathname: '/dashboard/Add-Customer',
        state: state,
      });
    } else if (e === 'bulk') {
      props.history.push({
        pathname: '/dashboard/Bulk-Upload-Customer',
        state: state,
      });
    }
  };

  const onBack = () => {
    if (state === false) {
      props.history.push({
        pathname: '/dashboard/PreOnBoarding',
        state: '1',
        value: details,
        data: filter,
      });
    } else if (state === true) {
      props.history.push({
        pathname: '/dashboard/PreOnBoarding-Customer',
        state: '2',
        e: companyDetails,
        value: false,
        name: company,
      });
    }
  };

  return (
    <>
      <CustomCurrentPage
        page={'customer'}
        addCustomer={true}
        onClick={(e: any) => navigateTo(e)}
        Back={true}
        Custom={true}
        onBack={onBack}
      />
      <CustomLoader isLoading={isLoading} size={50} />
      <div className={`p-4 ${isLoading && 'd-none'}`}>
        <div className='p-4 d-flex flex-column add-customer-background justify-content-center'>
          <CustomResponseMessage
            apiStatus={apiStatus}
            closeMessage={closeMessage}
            message={apiMessage}
            errorFix={colorError}
          />
          <div>
            <h1 className='add-customer-title mt-2'>Company Details:</h1>
          </div>
          <div className='col-3 mb-3'>
            <Label className='add-customer-label' for='exampleText' sm={9}>
              Company Name
              <span className='add-customer-mandatory'> *</span>
            </Label>
            <Col sm={11}>
              <Select
                onChange={handleChangeSearch}
                showSearch
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                className='add-customer-label form-control border-0 cursor'
                value={customerDetails?.companyName || undefined}
                style={{ height: '38px' }}
                disabled={false}
                placeholder={'Select Company'}
              >
                {userType === 'COMPANY_USER'
                  ? userData.userInfo.companyUserResponse?.map(
                      (option: any, index: any) => {
                        return (
                          <Option key={index} value={JSON.stringify(option)}>
                            {option.companyName}
                          </Option>
                        );
                      }
                    )
                  : companyGetData?.map((option: any, index: any) => {
                      return (
                        <Option key={index} value={JSON.stringify(option)}>
                          {option.companyName}
                        </Option>
                      );
                    })}
              </Select>
              {errors.companyNameError &&
                errors?.companyNameError !== 'null' && (
                  <Label className='add-customer-error'>
                    {errors.companyNameError}
                  </Label>
                )}
            </Col>
          </div>

          <div>
            <h1 className='add-customer-title'>Customer Details:</h1>
          </div>
          <div className='d-flex col '>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={9}>
                Title
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  className='form-select add-customer-label'
                  type='select'
                  name='titleDescription'
                  value={customerDetails.titleDescription}
                  onChange={handleChange}
                >
                  <option>Select Title</option>
                  <option value='MR'>Mr</option>
                  <option value='MRS'>Mrs</option>
                  <option value='MISS'>Miss</option>
                  <option value='OTHERS'>Others</option>
                </Input>
                {errors.titleDescriptionError &&
                  errors?.titleDescriptionError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.titleDescriptionError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className='col-3 mb-3'>
              <div className='col'>
                <Label className='add-customer-label' for='exampleText' sm={12}>
                  Full Name(as per ID)
                  <span className='add-customer-mandatory'> *</span>
                </Label>
              </div>

              <Col sm={11}>
                <Input
                  type='text'
                  name='customerName'
                  className='add-customer-label'
                  onChange={handleChange}
                  value={customerDetails.customerName}
                />
                {errors.customerNameError &&
                  errors?.customerNameError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.customerNameError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className='col-3 mb-3'>
              <div className='col'>
                <Label className='add-customer-label' for='exampleText' sm={9}>
                  Preferred Name
                </Label>
              </div>
              <Col sm={11}>
                <Input
                  type='text'
                  name='preferredName'
                  className='add-customer-label'
                  onChange={handleChange}
                  value={customerDetails.preferredName}
                />
                {errors.preferredNameError &&
                  errors?.preferredNameError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.preferredNameError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={4}>
                Gender
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  className='form-select add-customer-label'
                  type='select'
                  name='gender'
                  onChange={handleChange}
                  value={customerDetails.gender}
                >
                  <option key='-1' value=''>
                    Select Gender
                  </option>
                  <option value='M'>Male</option>;
                  <option value='F'>Female</option>;
                </Input>
                {errors.genderError && errors?.genderError !== 'null' && (
                  <Label className='add-customer-error'>
                    {errors.genderError}
                  </Label>
                )}
              </Col>
            </div>
          </div>

          <div className='d-flex col'>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={4}>
                DOB
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  type='date'
                  name='birthDate'
                  className='add-customer-label'
                  onChange={handleChange}
                  value={customerDetails.birthDate}
                  max={moment().format('YYYY-MM-DD')}
                />
                {errors.birthDateError && errors?.birthDateError !== 'null' && (
                  <Label className='add-customer-error'>
                    {errors.birthDateError}
                  </Label>
                )}
              </Col>
            </div>

            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={5}>
                Nationality
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  type='select'
                  name='nationalityCodeDescription'
                  className='add-customer-label form-select'
                  onChange={handleChange}
                  value={customerDetails.nationalityCodeDescription}
                >
                  <option key='-1' value=''>
                    Select Nationality
                  </option>
                  {getNationalityDatas?.data &&
                    getNationalityDatas?.data?.map(
                      (option: any, index: any) => {
                        return (
                          <option key={index} value={option.description}>
                            {option.description}
                          </option>
                        );
                      }
                    )}
                </Input>
                {errors.nationalityCodeError &&
                  errors?.nationalityCodeError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.nationalityCodeError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={9}>
                Preferred Language
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  type='select'
                  name='preferredLanguageDescription'
                  className='add-customer-label  form-select'
                  onChange={handleChange}
                  value={customerDetails.preferredLanguageDescription}
                >
                  <option key='-1' value=''>
                    Select Language
                  </option>
                  {getLanguageDatas?.data &&
                    getLanguageDatas?.data?.map((option: any, index: any) => {
                      return (
                        <option key={index} value={option.description}>
                          {option.description}
                        </option>
                      );
                    })}
                </Input>
                {errors.prefLangDescriptionError &&
                  errors?.prefLangDescriptionError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.prefLangDescriptionError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={4}>
                Race
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  type='select'
                  name='raceDescription'
                  className='add-customer-label form-select'
                  onChange={handleChange}
                  value={customerDetails.raceDescription}
                >
                  <option key='-1' value=''>
                    Select Race
                  </option>
                  {getRaceDatas?.data &&
                    getRaceDatas?.data?.map((option: any, index: any) => {
                      return (
                        <option key={index} value={option.description}>
                          {option.description}
                        </option>
                      );
                    })}
                </Input>
                {errors.raceDescriptionError &&
                  errors?.raceDescriptionError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.raceDescriptionError}
                    </Label>
                  )}
              </Col>
            </div>
          </div>

          <div className='d-flex col '>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={9}>
                Marital Status
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  type='select'
                  name='maritalStatus'
                  className='form-select add-customer-placeholder'
                  onChange={handleChange}
                  value={customerDetails.maritalStatus}
                >
                  <option key='-1' value=''>
                    Select Marital Status
                  </option>
                  <option value='S'>Single</option>;
                  <option value='M'>Married</option>;
                  <option value='D'>Divorced</option>;
                </Input>
                {errors.maritalStatusError &&
                  errors?.maritalStatusError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.maritalStatusError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={4}>
                ID Type
                <span className='add-customer-mandatory'>*</span>
              </Label>
              <Col sm={11}>
                <Select
                  onChange={handleChangeIdType}
                  showSearch
                  filterOption={(input: any, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  id='fieldName1'
                  className='form-select add-customer-placeholder border-0'
                  value={customerDetails?.idTypeCodeDescription}
                  placeholder={'Select ID Type'}
                  disabled={customerDetails?.nationalityCode ? false : true}
                >
                  {idTypeData &&
                    idTypeData.map((option: any, index: any) => {
                      return (
                        <Option key={index} value={JSON.stringify(option)}>
                          {option.idtypeCodeDescription}
                        </Option>
                      );
                    })}
                </Select>
                {errors.idTypeCodeDescriptionError &&
                  errors?.idTypeCodeDescriptionError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.idTypeCodeDescriptionError}
                    </Label>
                  )}
              </Col>
            </div>

            <div className='col-3 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={6}>
                ID Number
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={11}>
                <Input
                  type='text'
                  name='idValue'
                  className='add-customer-label'
                  onChange={handleChange}
                  value={customerDetails.idValue}
                />
                {errors.idValueError && errors?.idValueError !== 'null' && (
                  <Label className='add-customer-error'>
                    {errors.idValueError}
                  </Label>
                )}
                {idTypeFieldValidationError && (
                  <Label className='add-customer-error'>
                    {idTypeFieldValidation?.fieldValidationDescription +
                      ' only.'}
                    ;
                  </Label>
                )}
              </Col>
            </div>

            <div className='col-3 mb-3'>
              <Label className='add-customer-label ' for='exampleText' sm={11}>
                Mother's Maiden Name
              </Label>
              <Col sm={11}>
                <Input
                  type='text'
                  name='mothersMaidenName'
                  className='add-customer-label'
                  onChange={handleChange}
                  value={customerDetails.mothersMaidenName}
                />
                {errors.mothersMaidenNameError &&
                  errors?.mothersMaidenNameError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.mothersMaidenNameError}
                    </Label>
                  )}
              </Col>
            </div>
          </div>
          <div className='d-flex col'>
            {customerDetails.isIssueDateMandatory ? (
              <div className='col-3 mb-3'>
                <Label className='add-customer-label' for='exampleText' sm={12}>
                  ID Doc Issue Date
                  <span className='add-customer-mandatory'> *</span>
                </Label>
                <Col sm={11}>
                  <Input
                    type='date'
                    name='newIdDate'
                    className='doc-uploadRequest-inputCode'
                    onChange={handleChange}
                    value={customerDetails.newIdDate}
                  ></Input>
                  {errors.newIdDateError &&
                    errors?.newIdDateError !== 'null' && (
                      <Label className='add-customer-error'>
                        {errors.newIdDateError}
                      </Label>
                    )}
                </Col>
              </div>
            ) : null}

            {customerDetails.isExpiryDateMandatory ? (
              <div className='col-3 mb-3'>
                <Label className='add-customer-label' for='exampleText' sm={12}>
                  ID Doc Expiry Date
                  <span className='add-customer-mandatory'> *</span>
                </Label>
                <Col sm={11}>
                  <Input
                    type='date'
                    name='newIdExpiryDate'
                    className='doc-uploadRequest-inputCode'
                    onChange={handleChange}
                    value={customerDetails.newIdExpiryDate}
                  ></Input>
                  {errors.newIdExpiryDateError &&
                    errors?.newIdExpiryDateError !== 'null' && (
                      <Label className='add-customer-error'>
                        {errors.newIdExpiryDateError}
                      </Label>
                    )}
                </Col>
              </div>
            ) : null}
            {customerDetails.idTypeCode === 'Passport' ? (
              <div className='col-3 mb-3'>
                <Label className='add-customer-label' for='exampleText' sm={12}>
                  Country of Issue
                  <span className='add-customer-mandatory'> *</span>
                </Label>
                <Col sm={11}>
                  <Input
                    type='select'
                    name='countryOfIssue'
                    className='add-customer-label form-select'
                    onChange={handleChange}
                    value={customerDetails.countryOfIssue}
                  >
                    <option key='-1' value=''>
                      Select Country of Issue
                    </option>
                    {getCountryDatas?.data &&
                      getCountryDatas?.data?.map((option: any, index: any) => {
                        return (
                          <option key={index} value={option.description}>
                            {option.description}
                          </option>
                        );
                      })}
                  </Input>
                  {errors.countryOfIssueError &&
                    errors?.countryOfIssueError !== 'null' && (
                      <Label className='add-customer-error'>
                        {errors.countryOfIssueError}
                      </Label>
                    )}
                </Col>
              </div>
            ) : null}
          </div>

          <div className='d-flex col'>
            {customerDetails.idTypeCode === 'Passport' ? (
              <div className='col-3 mb-3'>
                <Label className='add-customer-label' for='exampleText' sm={4}>
                  PR Status
                  <span className='add-customer-mandatory'> *</span>
                </Label>
                <Col sm={11}>
                  <Input
                    type='select'
                    name='prStatus'
                    className='form-select add-customer-label'
                    onChange={handleChange}
                    value={customerDetails.prStatus}
                  >
                    <option key='-1' value=''>
                      Select PR Status
                    </option>
                    <option value='Y'>YES</option>
                    <option value='N'>NO</option>
                  </Input>
                  {errors.prStatusError && errors?.prStatusError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.prStatusError}
                    </Label>
                  )}
                </Col>
              </div>
            ) : null}
            {customerDetails.idTypeCode === 'Passport' ? (
              <>
                <div className='col-3 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={9}
                  >
                    Visa Number
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      name='visaNumber'
                      className='add-customer-label'
                      onChange={handleChange}
                      value={customerDetails.visaNumber}
                    />
                    {errors.visaNumberError &&
                      customerDetails.prStatus === 'Y' &&
                      errors?.visaNumberError !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.visaNumberError}
                        </Label>
                      )}
                  </Col>
                </div>
                <div className='col-3 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={9}
                  >
                    Visa Expiry Date
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='date'
                      name='immigrationVisaExpiryDate'
                      className='add-customer-label'
                      onChange={handleChange}
                      value={customerDetails.immigrationVisaExpiryDate}
                      min={moment().format('YYYY-MM-DD')}
                    />
                    {errors.immigrationVisaExpDateError &&
                      customerDetails.prStatus === 'Y' &&
                      errors?.immigrationVisaExpDateError !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.immigrationVisaExpDateError}
                        </Label>
                      )}
                  </Col>
                </div>
              </>
            ) : null}
          </div>

          <div>
            <h1 className='add-customer-title mt-2'>Contact Details:</h1>
          </div>

          <div className='d-flex col'>
            <div className='col-5 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={7}>
                Mobile Number
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <div className='d-flex'>
                <Col sm={3} className='mobileCode'>
                  <Select defaultValue='+60' onChange={handleChangeCode}>
                    <Option value='+60'>+60</Option>
                    <Option value='+91'>+91</Option>
                  </Select>
                </Col>
                <Col sm={8}>
                  <Input
                    type='number'
                    name='mobileNumber'
                    className='add-customer-label'
                    onChange={handleMobNum}
                    value={mobileNumber}
                  />
                  {errors.mobileNumberError &&
                    errors?.mobileNumberError !== 'null' && (
                      <Label className='add-customer-error'>
                        {errors.mobileNumberError}
                      </Label>
                    )}
                </Col>
              </div>
            </div>
            <div className='col-6 mb-3'>
              <Label className='add-customer-label' for='exampleText' sm={4}>
                Email-Id
                <span className='add-customer-mandatory'> *</span>
              </Label>
              <Col sm={5}>
                <Input
                  type='email'
                  name='emailAddress'
                  className='add-customer-label'
                  onChange={handleChange}
                  value={customerDetails.emailAddress}
                />
                {errors.emailAddressError &&
                  errors?.emailAddressError !== 'null' && (
                    <Label className='add-customer-error'>
                      {errors.emailAddressError}
                    </Label>
                  )}
              </Col>
            </div>
          </div>

          <div className='d-flex col'>
            <div className='col-6'>
              <h1 className='add-customer-title mt-2'>Resident Address</h1>
              <div className='d-flex col'>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    Address 1<span className='add-customer-mandatory'> *</span>
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      className='add-customer-label'
                      name='residentAddress1'
                      onChange={handleChange}
                      value={customerDetails.residentAddress1}
                    />
                    {errors.residentAddress1Error &&
                      errors?.residentAddress1Error !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.residentAddress1Error}
                        </Label>
                      )}
                  </Col>
                </div>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    Address 2
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      className='add-customer-label'
                      name='residentAddress2'
                      onChange={handleChange}
                      value={customerDetails.residentAddress2}
                    />
                    {errors.residentAddress2Error &&
                      errors?.residentAddress2Error !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.residentAddress2Error}
                        </Label>
                      )}
                  </Col>
                </div>
              </div>
              <div className='d-flex col'>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={6}
                  >
                    Postal Code
                    <span className='add-customer-mandatory'> *</span>
                  </Label>
                  <Col sm={11}>
                    <Input
                      className='form-select add-customer-label'
                      type='select'
                      name='residentPostcode'
                      onChange={handleChange}
                      value={customerDetails.residentPostcode}
                    >
                      <option key='-1' value=''>
                        Select Postal Code
                      </option>
                      {getAllpostalCode &&
                        getAllpostalCode.map((e: any, index: number) => {
                          return <option>{e.code}</option>;
                        })}
                    </Input>
                    {errors.residentPostcodeError &&
                      errors?.residentPostcodeError !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.residentPostcodeError}
                        </Label>
                      )}
                  </Col>
                </div>
              </div>
              <div className='d-flex col'>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    City
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      className='add-customer-label'
                      name='residentState'
                      disabled={true}
                      value={resAddress.city}
                    />
                  </Col>
                </div>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    State
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      className='add-customer-label'
                      name='residentCity'
                      disabled={true}
                      value={resAddress.state}
                    />
                  </Col>
                </div>
              </div>
            </div>

            <div className='col-6'>
              <h1 className='add-customer-title mt-2'>Mailing Address</h1>
              <div className='d-flex col '>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label '
                    for='exampleText'
                    sm={5}
                  >
                    Address 1<span className='add-customer-mandatory'> *</span>
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      name='mailAddress1'
                      className='add-customer-label'
                      onChange={handleChange}
                      value={customerDetails.mailAddress1}
                    />
                    {errors.mailAddress1Error &&
                      errors?.mailAddress1Error !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.mailAddress1Error}
                        </Label>
                      )}
                  </Col>
                </div>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    Address 2
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      name='mailAddress2'
                      className='add-customer-label'
                      onChange={handleChange}
                      value={customerDetails.mailAddress2}
                    />
                    {errors.mailAddress2Error &&
                      errors?.mailAddress2Error !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.mailAddress2Error}
                        </Label>
                      )}
                  </Col>
                </div>
              </div>

              <div className='d-flex col'>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={6}
                  >
                    Postal Code
                    <span className='add-customer-mandatory'> *</span>
                  </Label>
                  <Col sm={11}>
                    <Input
                      className='form-select add-customer-label'
                      type='select'
                      name='mailPostalCode'
                      onChange={handleChange}
                      value={customerDetails.mailPostcode}
                    >
                      <option key='-1' value=''>
                        Select Postal Code
                      </option>
                      {getAllpostalCode &&
                        getAllpostalCode.map((e: any, index: number) => {
                          return <option>{e.code}</option>;
                        })}
                    </Input>
                    {errors.mailPostcodeError &&
                      errors?.mailPostcodeError !== 'null' && (
                        <Label className='add-customer-error'>
                          {errors.mailPostcodeError}
                        </Label>
                      )}
                  </Col>
                </div>
              </div>
              <div className='d-flex col'>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    City
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      className='add-customer-label'
                      name='mailCity'
                      disabled={true}
                      value={mailAddress.city}
                    />
                  </Col>
                </div>
                <div className='col-6 mb-3'>
                  <Label
                    className='add-customer-label'
                    for='exampleText'
                    sm={5}
                  >
                    State
                  </Label>
                  <Col sm={11}>
                    <Input
                      type='text'
                      className='add-customer-label'
                      name='mailState'
                      disabled={true}
                      value={mailAddress.state}
                    />
                  </Col>
                </div>
              </div>
            </div>
          </div>

          <Col sm={7} className='d-flex align-items-center'>
            <input
              type='checkbox'
              className='add-customer-checkbox'
              checked={addressChecked}
              onChange={handleAddressCheckBoc}
            ></input>
            <span className='ms-2 mt-2'>
              The Resident address is same as mailing address
            </span>
          </Col>

          <div className='col mt-4'>
            <CustomButton
              color='danger'
              className='add-customer-save redbtn border-0'
              onClick={() => submitHandler()}
            >
              Submit
            </CustomButton>
            <CustomButton
              color='scondary'
              className='add-customer-cancel ms-3 border-0'
              onClick={() => onCancel()}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOnboardingCustomer;
