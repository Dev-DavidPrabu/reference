import { TiArrowBackOutline } from "react-icons/ti";
import { Col, Input, Label } from "reactstrap";
import React, { useState, useCallback, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomButton from "../UI/CustomButton";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";
import { useHistory } from "react-router";
import { Switch } from "antd";
import "./AddIdtypeSummary.scss";
import {
  postIdtypeSummary,
  resetCreatedData,
  resetFilterData,
  resetUpdatedData,
  updateIdtypeSummary,
} from "../../redux/action/IdTypeSummaryAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";

const AddIdtypeSummary = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState({
    id: "",
    idtypeCode: "",
    idtypeCodeDescription: "",
    isIdtypeCountrySpecific: true,
    isBankFieldMandatory: true,
    noOfPicturesToCapture: "",
    isIssueDateMandatory: true,
    isExpiryDateMandatory: true,
    isDowngradeAllowed: true,
    isDuplicateAllowed: false,
    isOriginalAllowed: false,
    downgradeBasis: "",
    downgradeGracePeriod: "",
    isBlockGracePeriodAllwowed: true,
    blockGracePeriod: "",
    createdBy: "",
    createdDate: "",
    cardworksCodeMapping: "",
    remarks: "",
    updatedBy: "",
    updatedDate: "",
  });
  const [errors, setErrors] = useState({
    idtypeCodeError: "",
    idtypeCodeDescriptionError: "",
    noOfPicturesToCaptureError: "",
  });
  const [isDisable, setIsDisable] = useState(false);
  const [isDisableBlock, setIsDisableBlock] = useState(false);

  const postIdtypeSummaryData = useSelector(
    (state: RootStateOrAny) =>
      state.idtypeSummaryReducer?.postIdtypeSummaryResponse
  );

  const createIdtypeSummary = useCallback(
    async (body) => {
      try {
        dispatch(postIdtypeSummary(body));
      } catch (err) {}
    },
    [dispatch]
  );

  const updateIdtypeSummaryReq = useCallback(
    async (body) => {
      try {
        dispatch(updateIdtypeSummary(body));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetUpdatedDataIdtype = useCallback(async () => {
    try {
      dispatch(resetUpdatedData());
    } catch (err) {}
  }, [dispatch]);
  const resetPostData = useCallback(async () => {
    try {
      dispatch(resetFilterData());
    } catch (err) {}
  }, [dispatch]);
  const resetCreatedDataRes = useCallback(async () => {
    try {
      dispatch(resetCreatedData());
    } catch (err) {}
  }, [dispatch]);
  const updateIdtypeSummaryDataRes = useSelector(
    (state: RootStateOrAny) =>
      state.idtypeSummaryReducer?.updateIdtypeSummaryResponse
  );

  useEffect(() => {
    if (postIdtypeSummaryData) {
      if (postIdtypeSummaryData?.data) {
        resetPostData();
        resetCreatedDataRes();
        props.history?.push({
          pathname: "/dashboard/Idtype-Summary",
          state: true,
          message: "IdType Summary Created Sucessfully",
        });
      } else if (postIdtypeSummaryData?.error) {
        setApiMessage(true);
        setApiStatus(false);
        setIsLoading(false);
        setErrorMessage(postIdtypeSummaryData.message);
      }
    }
  }, [postIdtypeSummaryData]);

  useEffect(() => {
    if (updateIdtypeSummaryDataRes) {
      if (updateIdtypeSummaryDataRes?.data) {
        resetUpdatedDataIdtype();
        props.history?.push({
          pathname: "/dashboard/Idtype-Summary",
          state: true,
          message: "IdType Summary Updated Sucessfully",
        });
      } else if (updateIdtypeSummaryDataRes?.error) {
        setApiMessage(true);
        setIsLoading(false);
        setApiStatus(false);
        setErrorMessage(updateIdtypeSummaryDataRes.message);
      }
    }
  }, [updateIdtypeSummaryDataRes]);

  useEffect(() => {
    if (props?.location?.state?.data) {
      setValue(props?.location?.state?.data);
    }
  }, [props?.location?.state?.data]);
  const clickBack = () => {
    history.push({
      pathname: "/dashboard/Idtype-Summary",
    });
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage(false);
    }
  }, []);

  useEffect(() => {
    if (
      value.isDowngradeAllowed === true &&
      value.isBlockGracePeriodAllwowed === false
    ) {
      setIsDisableBlock(true);
    } else {
      setIsDisableBlock(false);
    }
  }, [value.isBlockGracePeriodAllwowed, value.isDowngradeAllowed]);

  useEffect(() => {
    if (value.isDowngradeAllowed === false) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [value.isDowngradeAllowed]);

  const handleCancel = () => {
    history.push({
      pathname: "/dashboard/Idtype-Summary",
    });
  };
  const validate = () => {
    let idtypeCodeErrors = customValidator(
      "agentGroupCode",
      "Idtype Code",
      value?.idtypeCode
    );
    let idtypeCodeDescriptionErrors = customValidator(
      "agentGroupCode",
      "Description",
      value.idtypeCodeDescription
    );
    let noOfPicturesToCaptureErrors = customValidator(
      "agentGroupCode",
      "No of Pictures",
      value.noOfPicturesToCapture
    );

    if (
      !(
        idtypeCodeErrors === "null" &&
        idtypeCodeDescriptionErrors === "null" &&
        noOfPicturesToCaptureErrors === "null"
      )
    ) {
      setErrors({
        idtypeCodeError: idtypeCodeErrors,
        idtypeCodeDescriptionError: idtypeCodeDescriptionErrors,
        noOfPicturesToCaptureError: noOfPicturesToCaptureErrors,
      });
      return false;
    }
    setErrors({
      idtypeCodeError: "",
      idtypeCodeDescriptionError: "",
      noOfPicturesToCaptureError: "",
    });
    return true;
  };
  const handleSubmit = () => {
    if (validate()) {
      setIsLoading(true);
      var body = JSON.stringify({
        idtypeCode: value.idtypeCode,
        idtypeCodeDescription: value.idtypeCodeDescription,
        isIdtypeCountrySpecific: value.isIdtypeCountrySpecific,
        isBankFieldMandatory: value.isBankFieldMandatory,
        isIssueDateMandatory: value.isIssueDateMandatory,
        isExpiryDateMandatory: value.isExpiryDateMandatory,
        noOfPicturesToCapture: value.noOfPicturesToCapture,
        isDuplicateAllowed: value.isDuplicateAllowed,
        isOriginalAllowed: value.isOriginalAllowed,
        isDowngradeAllowed: value.isDowngradeAllowed,
        downgradeBasis: value.downgradeBasis,
        downgradeGracePeriod: value.downgradeGracePeriod,
        isBlockGracePeriodAllwowed: value.isBlockGracePeriodAllwowed,
        blockGracePeriod: value.blockGracePeriod,
        remarks: value.remarks,
        status: "A",
      });
      createIdtypeSummary(body);
    }
  };
  const updateHandler = () => {
    if (validate()) {
      setIsLoading(true);
      var body = JSON.stringify({
        id: value.id,
        idtypeCodeDescription: value.idtypeCodeDescription,
        cardworksCodeMapping: value.cardworksCodeMapping,
        isIdtypeCountrySpecific: value.isIdtypeCountrySpecific,
        isIssueDateMandatory: value.isIssueDateMandatory,
        isExpiryDateMandatory: value.isExpiryDateMandatory,
        isDuplicateAllowed: value.isDuplicateAllowed,
        isOriginalAllowed: value.isOriginalAllowed,
        isBankFieldMandatory: value.isBankFieldMandatory,
        noOfPicturesToCapture: value.noOfPicturesToCapture,
        isDowngradeAllowed: value.isDowngradeAllowed,
        downgradeBasis: value.downgradeBasis,
        downgradeGracePeriod: value.downgradeGracePeriod,
        isBlockGracePeriodAllwowed: value.isBlockGracePeriodAllwowed,
        blockGracePeriod: value.blockGracePeriod,
        remarks: value.remarks,
        status: "A",
      });
      updateIdtypeSummaryReq(body);
    }
  };
  const handleEnabled = (e: any) => {
    setValue({
      ...value,
      isBankFieldMandatory: e,
    });
  };
  const handleEnabledBlockAlloewd = (e: any) => {
    setValue({
      ...value,
      isBlockGracePeriodAllwowed: e,
    });
  };
  const handleEnabledDowngrade = (e: any) => {
    setValue({
      ...value,
      isDowngradeAllowed: e,
    });
  };
  const handleEnabledExpairyDate = (e: any) => {
    setValue({
      ...value,
      isExpiryDateMandatory: e,
    });
  };
  const handleEnabledCountrySpecific = (e: any) => {
    setValue({
      ...value,
      isIdtypeCountrySpecific: e,
    });
  };
  const handleEnabledIsssueDate = (e: any) => {
    setValue({
      ...value,
      isIssueDateMandatory: e,
    });
  };
  const handleEnabledDuplicate = (e: any) => {
    setValue({
      ...value,
      isDuplicateAllowed: e,
    });
  };
  const handleEnabledOriginal = (e: any) => {
    setValue({
      ...value,
      isOriginalAllowed: e,
    });
  };
  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  return (
    <div className="p-4">
      <>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="d-flex col justify-content-between title">
            {props?.location?.state?.add && "Add Id Type"}
            {props?.location?.state?.view && "View Id Type"}
            {props?.location?.state?.edit && "Edit Id Type"}
          </div>
          <CustomButton className="backBtnDevice" onClick={clickBack}>
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
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
        <div className="add-idType-wrapper">
          <div className="add-idType-form">
            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                ID Type
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="idtypeCode"
                  className="addIdtype-drop"
                  value={value.idtypeCode}
                  onChange={handleChange}
                  readOnly={
                    props?.location?.state?.view
                      ? true
                      : props?.location?.state?.edit
                      ? true
                      : false
                  }
                />
                {errors.idtypeCodeError &&
                  errors?.idtypeCodeError !== "null" && (
                    <Label className="text-red">{errors.idtypeCodeError}</Label>
                  )}
              </Col>

              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Description
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="idtypeCodeDescription"
                  className="addIdtype-drop"
                  value={value.idtypeCodeDescription}
                  onChange={handleChange}
                  readOnly={props?.location?.state?.view ? true : false}
                ></Input>
                {errors.idtypeCodeDescriptionError &&
                  errors?.idtypeCodeDescriptionError !== "null" && (
                    <Label className="text-red">
                      {errors.idtypeCodeDescriptionError}
                    </Label>
                  )}
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Bank Mandatory
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabled(e)}
                  checked={value.isBankFieldMandatory}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Country Specific
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledCountrySpecific(e)}
                  checked={value.isIdtypeCountrySpecific}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Downgrade Allowed
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledDowngrade(e)}
                  checked={value.isDowngradeAllowed}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                No of Pictures
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="noOfPicturesToCapture"
                  className="form-select addIdtype-drop"
                  value={value.noOfPicturesToCapture}
                  onChange={handleChange}
                  readOnly={props?.location?.state?.view ? true : false}
                >
                  <option>Select No of Pictures</option>
                  <option>1</option>
                  <option>2</option>
                </Input>
                {errors.noOfPicturesToCaptureError &&
                  errors?.noOfPicturesToCaptureError !== "null" && (
                    <Label className="text-red">
                      {errors.noOfPicturesToCaptureError}
                    </Label>
                  )}
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Issue Date
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledIsssueDate(e)}
                  checked={value.isIssueDateMandatory}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>

              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Expiry Date
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledExpairyDate(e)}
                  checked={value.isExpiryDateMandatory}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Duplicate Allowed
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledDuplicate(e)}
                  checked={value.isDuplicateAllowed}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>

              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Original Allowed
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledOriginal(e)}
                  checked={value.isOriginalAllowed}
                  disabled={props?.location?.state?.view ? true : false}
                />
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Block Grace Period Allowed
              </Label>
              <Col sm={4}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledBlockAlloewd(e)}
                  checked={value.isBlockGracePeriodAllwowed}
                  disabled={
                    props?.location?.state?.view ? true : false || isDisable
                  }
                />
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Downgrade Grace Period
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="downgradeGracePeriod"
                  className="form-select  addIdtype-drop"
                  value={value.downgradeGracePeriod}
                  disabled={isDisable}
                  readOnly={props?.location?.state?.view ? true : false}
                  onChange={handleChange}
                >
                  {" "}
                  <option>Select Downgrade Grace Period in months</option>
                  <option>1</option> <option>2</option> <option>3</option>
                  <option>4</option> <option>5</option> <option>6</option>
                  <option>7</option> <option>8</option> <option>9</option>
                  <option>10</option> <option>11</option> <option>12</option>
                </Input>
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Downgrade Basis
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="downgradeBasis"
                  className="form-select addIdtype-drop"
                  value={value.downgradeBasis}
                  disabled={isDisable}
                  readOnly={props?.location?.state?.view ? true : false}
                  onChange={handleChange}
                >
                  <option>Select Downgrade Basis</option>
                  <option>ID Expiry Date</option>
                  <option>MMP Registration Date</option>
                </Input>
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Block Grace Period
              </Label>
              <Col sm={4}>
                <Input
                  type="select"
                  name="blockGracePeriod"
                  className="form-select addIdtype-drop"
                  value={value.blockGracePeriod}
                  disabled={isDisable || isDisableBlock}
                  readOnly={props?.location?.state?.view ? true : false}
                  onChange={handleChange}
                >
                  <option>Select block Grace Period in months</option>
                  <option>1</option> <option>2</option> <option>3</option>
                  <option>4</option> <option>5</option> <option>6</option>
                  <option>7</option> <option>8</option> <option>9</option>
                  <option>10</option> <option>11</option> <option>12</option>
                </Input>
              </Col>
            </div>

            <div className="row mb-3">
              {/* {props?.location?.state?.edit && (
                <Label
                  className="add-branch-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Cardworks Mapping
                </Label>
              )}
              {props?.location?.state?.edit && (
                <Col sm={4}>
                  <Input
                    type="select"
                    name="cardworksCodeMapping"
                    className="form-select  addIdtype-drop"
                    value={value.cardworksCodeMapping}
                    onChange={handleChange}
                    readOnly={props?.location?.state?.view ? true : false}
                  >
                    <option>Select Cardworks Mapping</option>
                    <option value="F">Police</option>
                    <option value="M">Military</option>
                    <option value="N">New IC</option>
                    <option value="P">Passport</option>
                    <option value="O">Others ID</option>
                  </Input>
                </Col>
              )} */}
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Remarks
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="remarks"
                  className="addIdtype-drop"
                  value={value.remarks}
                  onChange={handleChange}
                  readOnly={props?.location?.state?.view ? true : false}
                />
              </Col>
            </div>

            {props?.location?.state?.view && (
              <div className="row mb-3">
                <Label
                  className="add-branch-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Created By
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    name="createdBy"
                    className="addIdtype-drop"
                    value={value.createdBy}
                    onChange={handleChange}
                    readOnly={props?.location?.state?.view ? true : false}
                  ></Input>
                </Col>
                <Label
                  className="add-branch-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Created Date
                </Label>
                <Col sm={4}>
                  <Input
                    type="date"
                    name="createdDate"
                    className="addIdtype-drop"
                    value={value.createdDate}
                    onChange={handleChange}
                    readOnly={props?.location?.state?.view ? true : false}
                  />
                </Col>
              </div>
            )}

            {props?.location?.state?.view && (
              <div className="row mb-3">
                <Label
                  className="add-branch-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Updated By
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    name="updatedBy"
                    className="addIdtype-drop"
                    value={value.updatedBy}
                    onChange={handleChange}
                    readOnly={props?.location?.state?.view ? true : false}
                  ></Input>
                </Col>
                <Label
                  className="add-branch-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Updated Date
                </Label>
                <Col sm={4}>
                  <Input
                    type="date"
                    name="updatedDate"
                    className="addIdtype-drop"
                    value={value.updatedDate.slice(0, 10)}
                    onChange={handleChange}
                    readOnly={props?.location?.state?.view ? true : false}
                  />
                </Col>
              </div>
            )}
          </div>
          {!props?.location?.state?.view && (
            <div className="col d-flex">
              <div className="col-2 ms-4"></div>
              <div className="col-6 p-2">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Cancel"}
                  onSubmit={
                    props?.location?.state?.add ? handleSubmit : updateHandler
                  }
                  onCancel={() => handleCancel()}
                />
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};
export default AddIdtypeSummary;
