import React, { useCallback, useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import CustomInput from "../UI/CustomInput";
import "./AddNewCompanyUser.scss";
import { MdDelete, MdSave, MdEdit } from "react-icons/md";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import {
  AddNewUserModelProps,
  userInformation,
} from "../../models/CompanyUserListModel";
import {
  addNewUserToCompany,
  clearCreateUserInformation,
} from "../../redux/action/PreFundAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomButton from "../UI/CustomButton";

const AddNewCompanyUser = (props: AddNewUserModelProps) => {
  let companyInformation = props.companyInformation;
  const dispatch = useDispatch();

  let basedOnUserInfo = props.userInfo || {};
  const [userInfos, setUserInfo] = useState({
    userId: basedOnUserInfo?.userId || "",
    mtaFlag:
      basedOnUserInfo && basedOnUserInfo?.mtaFlag === "N"
        ? "False"
        : "True" || "",
    companyId: companyInformation?.id || "",
    companyAccountId: companyInformation?.companyAccountId || "",
    companyName: companyInformation?.companyName || "",
    companyRegistrationNo: companyInformation?.companyRegistrationNo || "",
  });
  const [error, setError] = useState("");
  let newUserCreationResponse = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.addNewUserToCompanyResponse
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfos, [e.target.name]: e.target.value });
  };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  useEffect(() => {
    clearHistory();
    setError("");
  }, [props?.companyUserMethod]);

  useEffect(() => {
    if (newUserCreationResponse.data) {
      props.addNewUserHander(userInfos);
    } else {
      setError(newUserCreationResponse.message);
    }
  }, [newUserCreationResponse]);

  const DeleteClickAction = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };
  const handleDeleteUserConfirmation = (e: string) => {
    if (e === "yes") {
      props.deleteUserHandleClickEvent(userInfos.userId);
      setShowDeleteConfirmation(!showDeleteConfirmation);
    } else if (e === "no") {
      setShowDeleteConfirmation(!showDeleteConfirmation);
    }
  };

  const addNewUserToTheCompany = useCallback(
    async (userInfo: userInformation) => {
      try {
        userInfo.mtaFlag = userInfo.mtaFlag === "True" ? "Y" : "N";
        dispatch(addNewUserToCompany(userInfo));
      } catch (err) {}
    },
    [dispatch]
  );

  const clearHistory = useCallback(async () => {
    try {
      dispatch(clearCreateUserInformation());
    } catch (err) {}
  }, [dispatch]);

  const addNewUserClickEvent = () => {
    addNewUserToTheCompany(userInfos);
  };

  return (
    <div className="prefund-card" style={{ height: "80%", width: "100%" }}>
      <div className="prefund-header">
        <Row>
          <Col
            xs="6"
            sm="1"
            style={{ cursor: "pointer" }}
            onClick={props.cancelHandler}
          >
            <BiArrowBack></BiArrowBack>
          </Col>
          <Col
            xs="6"
            sm="8"
            style={{
              fontSize: "22px",
              textAlign: "center",
              marginTop: "5px",
              marginLeft: "5rem",
            }}
          >
            {props?.companyUserMethod === "addMethod"
              ? "ADD NEW COMPANY USER"
              : "COMPANY USER INFO"}
          </Col>
          <Col sm="3"></Col>
        </Row>
      </div>
      <div style={{ height: "7%" }} className="prefund-buttons">
        <div className="prefund-heading-button">Record Reference </div>
        <div className="prefund-heading-button">Mode</div>
        {Object.keys(basedOnUserInfo).length === 0 ? (
          <div className="prefund-heading-button-last">
            <MdSave className="edit-icon-size"></MdSave>
          </div>
        ) : (
          <div className="prefund-heading-button-last">
            <MdDelete
              className="edit-icon-size"
              onClick={DeleteClickAction}
            ></MdDelete>
            <MdEdit data-testid="save-btn" className="edit-icon-size"></MdEdit>
          </div>
        )}
      </div>
      <div style={{ height: "86%", marginTop: "3rem" }}>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 2 }}>
            <div style={{ height: "65%" }}>
              <FormGroup row className="Form-group">
                <Label for="userId" className="label-font" sm={3}>
                  User Id *
                </Label>
                <Col sm={6}>
                  <Input
                    data-testid="userId"
                    type="text"
                    className="input-size"
                    name="userId"
                    id="userId"
                    value={userInfos?.userId}
                    onChange={handleChange}
                    readOnly={
                      props?.companyUserMethod === "addMethod" ? false : true
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="companyId" className="label-font" sm={3}>
                  Company UID
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="companyId"
                    id="companyId"
                    readOnly={true}
                    value={userInfos?.companyId}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="companyName" className="label-font" sm={3}>
                  Company Name
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="companyName"
                    id="companyName"
                    readOnly={true}
                    value={userInfos?.companyName}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label
                  for="companyRegistrationNo"
                  className="label-font"
                  sm={3}
                >
                  Company Registration No
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="companyRegistrationNo"
                    id="companyRegistrationNo"
                    readOnly={true}
                    value={userInfos?.companyRegistrationNo}
                    onChange={handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="companyAccountId" className="label-font" sm={3}>
                  Company Account Id
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="companyAccountId"
                    id="companyAccountId"
                    readOnly={true}
                    value={userInfos?.companyAccountId}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={3}>
                  MTA Flag *
                </Label>
                <Col sm={6}>
                  <Input
                    type="select"
                    name="mtaFlag"
                    id="mtaFlag"
                    onChange={handleChange}
                    value={userInfos.mtaFlag}
                    readOnly={
                      props?.companyUserMethod === "addMethod" ? false : true
                    }
                  >
                    <option key="-1">Select Transaction Type</option>
                    <option>True</option>
                    <option>False</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Row className="mrgn-top-2rem">
                  <Col sm={{ size: "auto", offset: 2 }}>
                    {props?.companyUserMethod === "addMethod" ? (
                      <CustomButton
                        data-testid="save-btn"
                        className="btn-width-submit"
                        onClick={addNewUserClickEvent}
                      >
                        Save
                      </CustomButton>
                    ) : (
                      <CustomButton className="btn-width-submit">
                        Update
                      </CustomButton>
                    )}
                  </Col>
                  <Col sm={{ size: "auto", offset: 1 }}>
                    <CustomButton
                      onClick={props.cancelHandler}
                      className="btn-width-submit"
                    >
                      Cancel
                    </CustomButton>
                  </Col>
                </Row>
              </FormGroup>
            </div>
          </Col>
        </Row>
        {error && error.length > 0 && (
          <Label className="text-red" style={{ fontSize: "18px" }}>
            *{error}
          </Label>
        )}
      </div>
      <DeleteConfirmation
        deleteConfirmation={showDeleteConfirmation}
        deletePopUpHandler={handleDeleteUserConfirmation}
      ></DeleteConfirmation>
    </div>
  );
};

export default AddNewCompanyUser;
