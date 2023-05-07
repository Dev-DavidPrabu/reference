import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import "./AddUser.scss";
import {
  createUser,
  clearCreateInfo,
  updateUser,
  clearUpdateInfo,
  getUserBranchList,
} from "../../redux/action/UserCreateAction";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { getAllUserGroupData } from "../../redux/action/UserGroupAction";
const AddUser = (props: any) => {
  const [btndisable, setBtndisable] = useState(false);
  const UserCreateStatus = useSelector(
    (state: any) => state.UserCreateReducer.createApiStatus
  );
  const [userId] = useState((props.userDetail && props.userDetail.id) || "");
  const [userName, SetuserName] = useState(
    (props.userDetail && props.userDetail.userName) || ""
  );
  const [emailId, setEmailId] = useState(
    (props.userDetail && props.userDetail.emailId) || ""
  );
  const [UserType, SetUserType] = useState(
    (props.userDetail && props.userDetail.userType) || "STAFF"
  );
  const [branchCode, setBranchCode] = useState(
    props.userDetail.branchCode || ""
  );
  const [mobileNumber, setMobileNumber] = useState(
    (props.userDetail && props.userDetail.mobileNumber) || ""
  );
  const [status, setStatus] = useState(
    (props.userDetail && props.userDetail.status) || "Active"
  );
  const [userGroupName, setUserGroupName] = useState("");
  const [comment, setComment] = useState(
    (props.userDetail && props.userDetail.comment) || ""
  );
  const [error, setError] = useState("");
  const [once, setOnce] = useState(true);
  const [apiMessage, setApiMessage] = useState(false);
  const [errors, setErrors] = useState({
    fullNameError: "",
    emailIdError: "",
    mobileNumberError: "",
    groupNameError: "",

    countryCodeError: "",
    branchCodeError: "",
  });
  const [userType] = useState(props.userType === "addUser" ? true : false);
  const dispatch = useDispatch();
  const [btnstatus, setBtnState] = useState(false);
  const submitHandler = () => {
    setError("");
    if (userType) {
      if (validate()) {
        var body = JSON.stringify({
          entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
          password: "Pass@12",
          countryCode: "IN",
          status: status,
          emailId: emailId,
          userName: userName,
          mobileNumber:
            mobileCode === "+60" && mobileNumber.indexOf(0) === 0
              ? mobileCode + mobileNumber.slice(1)
              : mobileCode + mobileNumber,
          loginId: emailId,
          userType: UserType,
          message: comment,
          userGroupName: userGroupName,
          branchCode: branchCode,
        });
        setBtndisable(true);

        dispatch(createUser(body));
      }
    } else {
      if (validate()) {
        let typeBody = {};
        if (UserType === "BRANCH_USER") {
          typeBody = {
            userId: userId,
            userName: userName,
            status: status,
            mobileNumber: `${mobileCode}${mobileNumber}`,
            emailId: emailId,
            userType: UserType,
            branchCode: branchCode,
          };
        } else {
          typeBody = {
            userId: userId,
            userName: userName,
            status: status,
            mobileNumber: `${mobileCode}${mobileNumber}`,
            emailId: emailId,
            userType: UserType,
          };
        }
        var updateBody = JSON.stringify(typeBody);
        dispatch(updateUser(updateBody));
      }
    }
  };
  const cancelEvent = () => {
    props.submitHandler("cancel");
  };
  const UserCreateData = useSelector(
    (state: RootStateOrAny) => state.UserCreateReducer.postUserDataResponse
  );
  const UserUpdateData = useSelector(
    (state: RootStateOrAny) => state.UserCreateReducer.updateUserDataResponse
  );
  const UserGroupsData = useSelector(
    (state: RootStateOrAny) =>
      state.UserGroupCreateReducer?.getUserGroupDataResponse
  );
  const getUserBranchResponse = useSelector(
    (state: RootStateOrAny) =>
      state.UserCreateReducer?.getUserBranchResponseList
  );
  useEffect(() => {
    clearCreateData();
    clearUpdateData();
    if (once) {
      setMobileNumber(mobileNumber.slice(3));
      setOnce(false);
    }
  }, []);
  const [mobileCode, setMobileCode] = useState(
    (props.userDetail && props.userDetail.mobileNumber.slice(0, 3)) || "+60"
  );
  const clearCreateData = useCallback(async () => {
    try {
      dispatch(clearCreateInfo());
    } catch (err) {}
  }, [dispatch]);
  const clearUpdateData = useCallback(async () => {
    try {
      dispatch(clearUpdateInfo());
    } catch (err) {}
  }, [dispatch]);
  const fetchBranchUserList = useCallback(async () => {
    try {
      dispatch(getUserBranchList());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchBranchUserList();
  }, []);
  useEffect(() => {
    if (Object.keys(UserUpdateData).length > 0) {
      if (UserUpdateData.data) {
        props.submitHandler("update");
        clearUpdateData();
        setError("");
      } else if (UserUpdateData.error) {
        setApiMessage(true);
        setError(UserUpdateData.message);
      }
    }
  }, [UserUpdateData]);
  useEffect(() => {
    if (Object.keys(UserCreateData).length > 0) {
      if (UserCreateData.data) {
        clearCreateData();
        props.submitHandler("add");
        setError("");
      } else if (UserCreateData.error) {
        setApiMessage(true);
        setError(UserCreateData.message);
      }
    }
  }, [UserCreateData]);
  const fetchAllUser = useCallback(async () => {
    try {
      dispatch(getAllUserGroupData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);
  const validate = () => {
    let checkUserNameError = customValidator("fullname", "Full Name", userName);
    let checkEmailIdError = customValidator("emailid", "Email", emailId);
    let checkMobileNumberError = customValidator(
      "mobileno",
      "Mobile Number",
      mobileNumber
    );
    let checkBranchCodeError = customValidator(
      "status",
      "BranchCode",
      branchCode
    );
    let checkGroupError = "";
    let countryCheckCodeError = customValidator(
      "required",
      "Country code",
      mobileCode
    );
    if (mobileCode === "+60") {
      checkMobileNumberError = customValidator(
        "malaysiaMobileno",
        "Mobile Number",
        mobileNumber
      );
    } else {
      checkMobileNumberError = customValidator(
        "mobileno",
        "Mobile Number",
        mobileNumber
      );
    }
    if (userType) {
      checkGroupError = customValidator(
        "groupName",
        "Group Name",
        userGroupName
      );
    } else {
      checkGroupError = "null";
    }
    if (props.userType === "addUser" && UserType === "BRANCH_USER") {
      checkBranchCodeError = customValidator(
        "groupName",
        "BranchCode",
        branchCode
      );
    } else {
      checkBranchCodeError = "null";
    }
    if (
      !(
        checkUserNameError === "null" &&
        checkEmailIdError === "null" &&
        checkMobileNumberError === "null" &&
        checkBranchCodeError === "null" &&
        countryCheckCodeError === "null"
      )
    ) {
      setErrors({
        fullNameError: checkUserNameError,
        emailIdError: checkEmailIdError,
        mobileNumberError: checkMobileNumberError,
        groupNameError: checkGroupError,
        branchCodeError: checkBranchCodeError,

        countryCodeError: countryCheckCodeError,
      });
      return false;
    } else {
      setErrors({
        fullNameError: "",
        emailIdError: "",
        mobileNumberError: "",
        groupNameError: "",
        branchCodeError: "",

        countryCodeError: "",
      });
      return true;
    }
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  useEffect(() => {
    if (UserCreateStatus == "pending") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  });
  return (
    <div className="d-flex">
      <div className="d-flex flex-column container-user-background">
        <div className="secondary_label_txt" data-testid="header-title">
          {userType ? "Add User" : "Edit User"}
        </div>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={error}
          />
        )}
        <div className="card card-backgound">
          <Form>
            <FormGroup row>
              <Label className="form-label-font-size" for="User Type" sm={3}>
                User Type
              </Label>
              <Col sm={7}>
                <Input
                  className="form-label-font-size form-select"
                  type="select"
                  name="userType"
                  id="userType"
                  value={UserType}
                  onChange={(e) => SetUserType(e.target.value)}
                >
                  <option value="STAFF">Staff</option>
                  {userType && (
                    <option value="COMPANY_USER">Company User</option>
                  )}
                  <option value="BRANCH_USER">Branch User</option>
                </Input>
                <br />
              </Col>
            </FormGroup>
            {UserType === "BRANCH_USER" && (
              <FormGroup row>
                <Label className="form-label-font-size" for="User Type" sm={3}>
                  Branch Name
                </Label>
                <Col sm={7}>
                  <Input
                    className="form-label-font-size form-select"
                    type="select"
                    name="branchCode"
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                  >
                    <option>Select Branch</option>
                    {getUserBranchResponse?.data.map((e: any) => {
                      return (
                        <option
                          value={e.branchCode}
                        >{`${e.branchName} - ${e.branchCode}`}</option>
                      );
                    })}
                  </Input>
                  {errors?.branchCodeError !== "null" &&
                    errors.branchCodeError && (
                      <Label className="text-danger">
                        {" "}
                        {errors.branchCodeError}
                      </Label>
                    )}
                  <br />
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label className="form-label-font-size" for=" User Type" sm={3}>
                Full Name
              </Label>
              <Col sm={7}>
                <Input
                  className="form-label-font-size"
                  readOnly={false}
                  type="text"
                  value={userName}
                  onChange={(ev) => SetuserName(ev.currentTarget.value)}
                />
                {errors?.fullNameError !== "null" && errors.fullNameError && (
                  <Label className="text-danger"> {errors.fullNameError}</Label>
                )}
                <br />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label className="form-label-font-size" for=" User Type" sm={3}>
                Email ID
              </Label>
              <Col sm={7}>
                <Input
                  className="form-label-font-size"
                  readOnly={false}
                  type="text"
                  value={emailId}
                  onChange={(ev) => setEmailId(ev.currentTarget.value)}
                />
                {errors?.emailIdError !== "null" && errors.emailIdError && (
                  <Label className="text-danger"> {errors.emailIdError}</Label>
                )}
                <br />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label className="form-label-font-size" for=" User Type" sm={3}>
                Mobile No
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={2}>
                <Input
                  type="select"
                  value={mobileCode}
                  id="exampleSelect"
                  className="btn--sizer"
                  onChange={(e) => setMobileCode(e.target.value)}
                  disabled={!userType}
                >
                  <option>+60</option>
                  <option>+91</option>
                </Input>

                {errors?.countryCodeError !== "null" &&
                  errors.countryCodeError && (
                    <Label className="text-danger">
                      {" "}
                      {errors.countryCodeError}
                    </Label>
                  )}
                <br />
              </Col>
              <Col sm={5}>
                <Input
                  className="form-label-font-size"
                  type="text"
                  value={mobileNumber}
                  onChange={(ev) => setMobileNumber(ev.currentTarget.value)}
                ></Input>
                {errors?.mobileNumberError !== "null" &&
                  errors.mobileNumberError && (
                    <Label className="text-danger">
                      {" "}
                      {errors.mobileNumberError}
                    </Label>
                  )}
                <br />
              </Col>
            </FormGroup>
            {props.userType === "addUser" && (
              <FormGroup row>
                <Label className="form-label-font-size" for=" User Type" sm={3}>
                  Group Name
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={7}>
                  <Input
                    type="select"
                    value={userGroupName}
                    className="form-label-font-size"
                    onChange={(e) => setUserGroupName(e.target.value)}
                  >
                    <option></option>
                    {UserGroupsData?.data.map((e: any, _index: number) => {
                      return <option>{e.userGroupName}</option>;
                    })}
                  </Input>
                  {errors?.groupNameError !== "null" &&
                    errors.groupNameError && (
                      <Label className="text-danger">
                        {" "}
                        {errors.groupNameError}
                      </Label>
                    )}
                  <br />
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label className="form-label-font-size" for=" User Type" sm={3}>
                Status
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={7}>
                <Input
                  className="form-label-font-size form-select lastStatusSize"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  type="select"
                  disabled={userType}
                >
                  <option selected>Active</option>
                  <option>Inactive</option>
                </Input>
              </Col>
              <br />
            </FormGroup>
            <br />
          </Form>
          <div className="d-flex align-item-center justify-content-center">
            <Label sm={0}></Label>
            <Col sm={6} className="ms-3">
              {/* <Button
                className="form-label-font-size me-3"
                color="danger"
                onClick={() => {
                  submitHandler();
                }}
              >
                Submit
              </Button>
              <Button
                className="form-label-font-size"
                color="secondary"
                onClick={() => {
                  cancelEvent();
                }}
              >
                Cancel
              </Button> */}
              <button
                // className="container-save border-0 text-white"

                className={
                  btnstatus
                    ? "border-0 text-white submit-disabled"
                    : "container-save border-0 text-white"
                }
                onClick={() => {
                  submitHandler();
                }}
                disabled={btnstatus}
              >
                Submit
              </button>
              <button
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={() => {
                  cancelEvent();
                }}
              >
                Cancel
              </button>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
