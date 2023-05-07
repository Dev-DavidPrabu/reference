import { Switch, TimePicker } from 'antd';
import { TiArrowBackOutline } from 'react-icons/ti';
import { Col, Input, Label } from 'reactstrap';
import CustomButton from '../UI/CustomButton';
import '../AddBranch/AddBranch.scss';
import { useCallback, useEffect, useState } from 'react';
import {
  postNewBranch,
  resetUpdatebranchData,
  restCreatedBranch,
  updateBranchData,
} from '../../redux/action/BranchDashboardAction';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import CustomResponseMessage from '../UI/ApiResponse/CustomResponseMessage';
import { customValidator } from '../../Constants/Validation';
import moment from 'moment';
import { getAgentGroup } from '../../redux/action/AgentGroupAction';
import SubmitCancelButton from '../SubmitCancelButton/SubmitCancelButton';
import CustomLoader from '../Loader/CustomLoader';

const AddBranch = (props: any) => {
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addBranch, setAddBranch] = useState({
    agentGroupCode: '',
    branchCode: '',
    branchName: '',
    branchMobileNumber: '',
    countryCodeNo: '+60',
    branchAddress: '',
    mid: '',
    latitude: '',
    longitude: '',
    openingTime: moment().format('HH:mm:ss'),
    closingTime: moment().format('HH:mm:ss'),
    isMMOutlet: false,
    status: 'ACTIVE',
  });
  const [openingTimeState, setOpeningTimeState] = useState(moment());
  const [openingTimeStates, setOpeningTimeStates] = useState(moment());
  const [isDisableEditable, setIsDisableEditable] = useState(false);
  const [errorDisable, setErrorDisable] = useState(false);
  const [errors, setErrors] = useState({
    agentGroupCodeError: '',
    branchNameError: '',
    branchAddressError: '',
    latitudeError: '',
    branchCodeError: '',
    branchMobileNumberError: '',
    longitudeError: '',
    // midError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const validate = () => {
    let agentGroupCodeErrors = customValidator(
      'agentGroupCode',
      'AgentGroup Code',
      addBranch?.agentGroupCode
    );
    let branchNameErrors = customValidator('branchName', 'Branch Name', addBranch?.branchName);
    let branchAddressErrors = customValidator(
      'branchAddress',
      'Branch Address',
      addBranch?.branchAddress
    );
    let latitudeErrors = customValidator('latitude', 'Latitude', addBranch?.latitude);
    let branchCodeErrors = customValidator('branchCode', 'Branch Code', addBranch?.branchCode);
    let branchMobileNumberErrors = customValidator(
      'branchMobileNumber',
      'Branch MobileNumber',
      addBranch?.branchMobileNumber
    );
    let longitudeErrors = customValidator('longitude', 'Longitude', addBranch?.longitude);

    // let midErrors = customValidator("mid", "Mid", addBranch?.mid);

    if (addBranch.countryCodeNo === '+60') {
      branchMobileNumberErrors = customValidator(
        'malaysiaMobileno',
        'Branch MobileNumber',
        addBranch?.branchMobileNumber
      );
    } else {
      branchMobileNumberErrors = customValidator(
        'branchMobileNumber',
        'Branch MobileNumber',
        addBranch?.branchMobileNumber
      );
    }

    if (
      !(
        (
          agentGroupCodeErrors === 'null' &&
          branchNameErrors === 'null' &&
          branchAddressErrors === 'null' &&
          latitudeErrors === 'null' &&
          branchCodeErrors === 'null' &&
          branchMobileNumberErrors === 'null'
        )
        // longitudeErrors === "null"
        // longitudeErrors === "null"
        // midErrors === "null"
      )
    ) {
      setErrors({
        agentGroupCodeError: agentGroupCodeErrors,
        branchNameError: branchNameErrors,
        branchAddressError: branchAddressErrors,
        latitudeError: latitudeErrors,
        branchCodeError: branchCodeErrors,
        branchMobileNumberError: branchMobileNumberErrors,
        longitudeError: longitudeErrors,

        // midError: midErrors,
      });
      return false;
    }
    setErrors({
      agentGroupCodeError: '',
      branchNameError: '',
      branchAddressError: '',
      latitudeError: '',
      branchCodeError: '',
      branchMobileNumberError: '',
      longitudeError: '',

      // midError: "" ,
    });
    return true;
  };
  let newBranch = useSelector(
    (state: RootStateOrAny) => state.BranchDashboardReducer?.postNewBranchDataResponse
  );
  let agentGroupList = useSelector(
    (state: RootStateOrAny) => state.AgentGroupReducer?.getAllAgentGroupListResponse
  );
  let AgentGroupDataList = agentGroupList?.data;
  let updateBranchDashboard = useSelector(
    (state: RootStateOrAny) => state.BranchDashboardReducer?.updateBranchDataResponse
  );

  AgentGroupDataList = AgentGroupDataList?.filter(
    (groupCode: any) => groupCode.status === 'ACTIVE'
  );
  const buttonHandler = (e: any) => {
    setAddBranch({
      ...addBranch,
      ['isMMOutlet']: e,
    });
  };
  const handleEnabled = (e: any) => {
    setAddBranch({
      ...addBranch,
      ['status']: e ? 'ACTIVE' : 'INACTIVE',
    });
  };

  const clickBack = () => {
    props.history.push({
      pathname: '/dashboard/Branch-Management/Branch-Dashboard',
    });
  };
  const handleChange = (e: any) => {
    setAddBranch({ ...addBranch, [e.target.name]: e.target.value });
  };
  const createNewBranches = useCallback(
    async (body) => {
      try {
        dispatch(postNewBranch(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetUpdatedData = useCallback(async () => {
    try {
      dispatch(resetUpdatebranchData());
    } catch (err) {}
  }, [dispatch]);

  const agentList = useCallback(async () => {
    try {
      dispatch(getAgentGroup());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (Object.keys(props.location.state.data)?.length === 0) {
      setIsDisableEditable(false);
    } else {
      setAddBranch(props.location.state.data);
      setIsDisableEditable(false);
    }
  }, [props.location.state.data]);

  const updateExsitingBranchData = useCallback(
    async (body) => {
      try {
        dispatch(updateBranchData(body));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    agentList();
  }, [agentList]);

  useEffect(() => {
    if (newBranch) {
      if (newBranch.data) {
        dispatch(restCreatedBranch());
        props.history?.push({
          pathname: '/dashboard/Branch-Management/Branch-Dashboard',
          state: true,
          message: 'Branch Created Sucessfully',
        });
      } else if (newBranch.error) {
        setIsLoading(false);
        setApiMessage(true);
        setApiStatus(false);
        setErrorMessage(newBranch.message);
      }
    }
  }, [newBranch]);
  useEffect(() => {
    if (updateBranchDashboard) {
      if (updateBranchDashboard.data) {
        resetUpdatedData();
        props.history.push({
          pathname: '/dashboard/Branch-Management/Branch-Dashboard',
          state: true,
          message: 'Branch Edited Sucessfully',
        });
      } else if (updateBranchDashboard.error) {
        setIsLoading(false);
        setApiMessage(true);
        setApiStatus(false);
        setErrorMessage(updateBranchDashboard.message);
      }
    }
  }, [updateBranchDashboard]);

  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      var body = JSON.stringify({
        branchMobileNumber: branchMobileNumber,
        agentGroupCode: addBranch.agentGroupCode,
        branchCode: addBranch.branchCode,
        branchName: addBranch.branchName,
        branchAddress: addBranch.branchAddress,
        mid: addBranch.mid,
        latitude: addBranch.latitude,
        longitude: addBranch.longitude,
        openingTime: addBranch.openingTime,
        closingTime: addBranch.closingTime,
        isMMOutlet: addBranch.isMMOutlet,
      });
      createNewBranches(body);
    }
  };
  const updateHanlder = () => {
    if (validate()) {
      setIsLoading(true);
      var body = JSON.stringify({
        agentGroupCode: addBranch.agentGroupCode,
        inputBranchCode: addBranch.branchCode,
        branchName: addBranch.branchName,
        branchMobileNumber: addBranch.branchMobileNumber,
        countryCodeNo: addBranch.countryCodeNo,
        branchAddress: addBranch.branchAddress,
        mid: addBranch.mid,
        latitude: addBranch.latitude,
        longitude: addBranch.longitude,
        openingTime: addBranch.openingTime,
        closingTime: addBranch.closingTime,
        isMMOutlet: addBranch.isMMOutlet,
        status: addBranch.status,
      });
      updateExsitingBranchData(body);
    }
  };

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const onChange = (timeString: any) => {
    setOpeningTimeState(timeString);
    let one = timeString.utcOffset('+05:30').format('HH:mm:ss');

    setAddBranch({
      ...addBranch,
      ['openingTime']: one,
    });
  };

  const onChangess = (timeString: any) => {
    setOpeningTimeStates(timeString);
    let one = timeString.utcOffset('+05:30').format('HH:mm:ss');
    setAddBranch({
      ...addBranch,
      ['closingTime']: one,
    });
  };

  let branchMobileNumber =
    addBranch.countryCodeNo === '+60'
      ? addBranch.countryCodeNo + addBranch.branchMobileNumber.slice(1)
      : addBranch.countryCodeNo + addBranch.branchMobileNumber;
  return (
    <div className="p-4">
      <>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="d-flex col justify-content-between title">
            {props.location.state.isTittle ? 'Edit Branch' : 'Add Branch'}
          </div>
          <CustomButton className="backBtnDevice" onClick={clickBack}>
            <TiArrowBackOutline style={{ margin: 'auto 5px' }} />
            Back
          </CustomButton>
        </div>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={apiStatus}
            message={errorMessage}
            closeMessage={closeMessage}
          />
        )}
        <CustomLoader isLoading={isLoading} size={50} />
        <div className="add-branch-wrapper">
          <div className="add-branch-form">
            <div>
              <p className="mandatory-fields">
                {errors.agentGroupCodeError &&
                  errors.branchNameError &&
                  errors.branchAddressError &&
                  errors.latitudeError &&
                  errors.branchCodeError &&
                  errors.branchMobileNumberError &&
                  errors.longitudeError &&
                  errors?.agentGroupCodeError !== 'null' &&
                  errors.branchNameError !== 'null' &&
                  errors.branchAddressError !== 'null' &&
                  errors.latitudeError !== 'null' &&
                  errors.branchCodeError !== 'null' &&
                  errors.branchMobileNumberError !== 'null' &&
                  errors.longitudeError !== 'null' && (
                    <span className="colorRedUser mandatory">* Indicates mandatory fields</span>
                  )}
              </p>
            </div>
            <div className="row mb-4">
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Agent Group NAME
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="agentGroupCode"
                  className="form-select addbranch-drop"
                  value={addBranch.agentGroupCode}
                  onChange={handleChange}
                  onFocus={(e: any) => {
                    setErrorDisable(false);
                  }}>
                  <option key="-1" value="">
                    Select agentGroupCode
                  </option>
                  {AgentGroupDataList &&
                    AgentGroupDataList.length > 0 &&
                    AgentGroupDataList.map((e: any) => {
                      return <option>{e.agentGroupCode}</option>;
                    })}
                </Input>
                {!errorDisable &&
                  addBranch.agentGroupCode.length <= 0 &&
                  errors.agentGroupCodeError &&
                  errors?.agentGroupCodeError !== 'null' && (
                    <Label className="text-red">{errors.agentGroupCodeError}</Label>
                  )}
              </Col>
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Branch Code
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="branchCode"
                  readOnly={isDisableEditable}
                  value={addBranch.branchCode}
                  onChange={handleChange}
                  onFocus={(e: any) => {
                    setErrorDisable(false);
                  }}
                />
                {!errorDisable &&
                  addBranch.branchCode.length <= 0 &&
                  errors.branchCodeError &&
                  errors?.branchCodeError !== 'null' && (
                    <Label className="text-red">{errors.branchCodeError}</Label>
                  )}
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Branch Name
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  style={{ height: '36px' }}
                  type="text"
                  className="branchInput-height"
                  name="branchName"
                  value={addBranch.branchName}
                  onChange={handleChange}
                  onFocus={(e: any) => {
                    setErrorDisable(false);
                  }}
                />
                {!errorDisable &&
                  addBranch.branchName.length <= 0 &&
                  errors.branchNameError &&
                  errors?.branchNameError !== 'null' && (
                    <Label className="text-red">{errors.branchNameError}</Label>
                  )}
              </Col>
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Branch Phone Number
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={1}>
                {!isDisableEditable && (
                  <Input
                    type="select"
                    className="btn--sizer"
                    name="countryCodeNo"
                    value={addBranch.countryCodeNo}
                    onChange={handleChange}>
                    <option>+60</option>
                    <option>+91</option>
                    <option>+65</option>
                  </Input>
                )}
                {isDisableEditable && (
                  <Input
                    type="select"
                    name="countryCodeNo"
                    className="btn--sizer"
                    value={addBranch.branchMobileNumber?.slice(0, 3)}
                    onChange={handleChange}>
                    <option>+60</option>
                    <option>+91</option>
                    <option>+65</option>
                  </Input>
                )}
              </Col>
              <Col sm={3}>
                {!isDisableEditable && (
                  <Input
                    type="text"
                    name="branchMobileNumber"
                    value={addBranch.branchMobileNumber}
                    onChange={handleChange}
                    onFocus={(e: any) => {
                      setErrorDisable(false);
                    }}
                  />
                )}
                {isDisableEditable && (
                  <Input
                    type="text"
                    name="branchMobileNumber"
                    value={addBranch.branchMobileNumber.slice(3)}
                    onChange={handleChange}
                  />
                )}
                {!errorDisable &&
                  addBranch.branchMobileNumber.length <= 0 &&
                  errors.branchMobileNumberError &&
                  errors?.branchMobileNumberError !== 'null' && (
                    <Label className="text-red">{errors.branchMobileNumberError}</Label>
                  )}
              </Col>
            </div>
            <div>
              <h5 className="header-text"></h5>
            </div>
            <div className="row mb-4">
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Branch Address
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  className="AddressInput-height"
                  name="branchAddress"
                  value={addBranch.branchAddress}
                  onChange={handleChange}
                  onFocus={(e: any) => {
                    setErrorDisable(false);
                  }}
                />
                {!errorDisable &&
                  addBranch.branchAddress.length <= 0 &&
                  errors.branchAddressError &&
                  errors?.branchAddressError !== 'null' && (
                    <Label className="text-red">{errors.branchAddressError}</Label>
                  )}
              </Col>
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                MID
                {/* <span className="container-body-label-color">*</span> */}
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="mid"
                  readOnly={isDisableEditable}
                  value={addBranch.mid}
                  onChange={handleChange}
                />
                {/* {errors.midError && errors?.midError !== "null" && (
                  <Label className="text-red">{errors.midError}</Label>
                )} */}
              </Col>
            </div>
            <div className="row mb-4">
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Latitude
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="number"
                  name="latitude"
                  value={addBranch.latitude}
                  onChange={handleChange}
                  className="btn--sizer"
                  onFocus={(e: any) => {
                    setErrorDisable(false);
                  }}></Input>
                {!errorDisable &&
                  addBranch.latitude.length <= 0 &&
                  errors.latitudeError &&
                  errors?.latitudeError !== 'null' && (
                    <Label className="text-red">{errors.latitudeError}</Label>
                  )}
              </Col>
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Longitude
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="number"
                  name="longitude"
                  className="btn--sizer"
                  value={addBranch.longitude}
                  onChange={handleChange}
                  onFocus={(e: any) => {
                    setErrorDisable(false);
                  }}></Input>
                {!errorDisable &&
                  addBranch.longitude.length <= 0 &&
                  errors.longitudeError &&
                  errors?.longitudeError !== 'null' && (
                    <Label className="text-red">{errors.longitudeError}</Label>
                  )}
              </Col>
            </div>
            <div className="row mb-4">
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Opening Time
              </Label>
              <Col sm={4}>
                <TimePicker
                  onChange={onChange}
                  value={openingTimeState}
                  disabled={isDisableEditable}
                  className="border-none"
                />
              </Col>
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Closing Time
              </Label>
              <Col sm={4}>
                <TimePicker
                  onChange={onChangess}
                  disabled={isDisableEditable}
                  value={openingTimeStates}
                  className="border-none"
                />
              </Col>
            </div>

            <div className="row mb-3">
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                Active Status
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabled(e)}
                  checked={addBranch.status === 'ACTIVE' ? true : false}
                />
              </Col>
              <Label className="add-branch-label-font-weight label-text" for="exampleText" sm={2}>
                MM Outlet
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="Yes"
                  unCheckedChildren="NO"
                  disabled={isDisableEditable}
                  onChange={buttonHandler}
                  checked={addBranch.isMMOutlet}
                />
              </Col>
            </div>
          </div>
          <div className="col d-flex">
            <div className="col-2 ms-4"></div>
            <div className="col-6 p-2">
              <SubmitCancelButton
                button={'Submit'}
                secondButton={'Cancel'}
                onSubmit={
                  Object.keys(props.location.state.data)?.length === 0
                    ? handleSubmit
                    : updateHanlder
                }
                onCancel={() => clickBack()}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default AddBranch;
