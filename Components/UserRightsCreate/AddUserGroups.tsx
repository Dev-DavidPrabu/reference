import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Label } from "reactstrap";
import "../../Components/UserCreate/AddUser.scss";
import { getUserData } from "../../redux/action/UserCreateAction";
import { customValidator } from "../../Constants/Validation";
import {
  clearCreateInfoRight,
  clearFullNameInfoRight,
  clearUpdateInfoRights,
  createUserRight,
  getUserRightsFullName,
  updateUserRight,
} from "../../redux/action/UserRightsAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import { userRights, addUserData } from "../../models/UserRightsModal";
import { getAllUserGroupData } from "../../redux/action/UserGroupAction";
import "./AddUserGroups.scss";
import SubmitCancelButton from "../SubmitCancelButton/SubmitCancelButton";
const AddUserGroups = (props: addUserData) => {
  const [id] = useState(props.userDetail.id || "");
  const [userId, setUserid] = useState(props.userDetail.userId || "");
  const [groupName, setGroupName] = useState(
    props.userDetail.userGroupName || ""
  );
  const [userName, setUserName] = useState(props.userDetail.userName || "");
  const [loginId, setLoginId] = useState(props.userDetail.loginId || "");
  const [status, setStatus] = useState(props.userDetail.status || "Active");
  const [comment, setComment] = useState(props.userDetail.comment || "");
  const [UserType, SetUserType] = useState(props.userDetail.UserType || "");
  const [error, setError] = useState("");

  const [apiMessage, setApiMessage] = useState(false);
  const [errors, setErrors] = useState({
    loginIdError: "",
    groupNameError: "",
    userfullNameError: "",
    statusError: "",
  });
  const [userType] = useState(
    props.userType === "addUserRights" ? true : false
  );

  const dispatch = useDispatch();
  const submitHandler = () => {
    setError("");
    if (userType) {
      if (validate()) {
        var body = JSON.stringify({
          userId: userId,
          userGroupName: groupName,
          userName: userName,
          status: status,
          userType: UserType,
        });
        dispatch(createUserRight(body));
      }
    } else {
      if (validate()) {
        var updateBody = JSON.stringify({
          userRightId: id,
          userGroupName: groupName,
          userName: userName,
          status: status,
          comment: comment,
          userType: UserType,
        });
        dispatch(updateUserRight(updateBody));
      }
    }
  };

  const UserCreateRight = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer.createUserRightResponse
  );

  const UserUpdateRight = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer.postUserRightsResponse
  );
  let userDetailsData = useSelector(
    (state: RootStateOrAny) => state.UserCreateReducer?.getUserDataResponse
  );
  const UserGroupsData = useSelector(
    (state: RootStateOrAny) =>
      state.UserGroupCreateReducer?.getUserGroupDataResponse
  );

  const FullNameData = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer?.getUserRightsFullName
  );
  const cancelEvent = () => {
    clearFullNameInfoRight();
    setUserName("");
    props.submitHandler("");
    setApiMessage(!apiMessage);
  };

  const clearCreateData = useCallback(async () => {
    try {
      dispatch(clearCreateInfoRight());
    } catch (err) {}
  }, [dispatch]);

  const clearFullName = useCallback(async () => {
    try {
      dispatch(clearFullNameInfoRight());
    } catch (err) {}
  }, [dispatch]);

  const clearUpdateData = useCallback(async () => {
    try {
      dispatch(clearUpdateInfoRights());
    } catch (err) {}
  }, [dispatch]);

  const getFullNameByloginId = useCallback(
    async (id: string) => {
      try {
        dispatch(getUserRightsFullName(id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    clearCreateData();
    clearUpdateData();
  }, [clearCreateData, clearUpdateData]);

  useEffect(() => {
    if (UserCreateRight) {
      if (UserCreateRight.data) {
        clearCreateData();
        props.submitHandler("add");
        setError("");
      } else if (UserCreateRight.error) {
        setApiMessage(true);
        setError(UserCreateRight.error);
      }
    }
  }, [UserCreateRight, props]);

  useEffect(() => {
    if (UserUpdateRight) {
      if (UserUpdateRight.data) {
        clearUpdateData();
        props.submitHandler("update");
        setError("");
      } else if (UserUpdateRight.error) {
        setApiMessage(true);
        setError(UserUpdateRight.message);
      }
    }
  }, [UserUpdateRight, props]);
  useEffect(() => {
    if (FullNameData) {
      if (FullNameData.data) {
        clearCreateInfoRight();
        setUserName(
          FullNameData.data.userName ? FullNameData.data.userName : ""
        );
        SetUserType(
          FullNameData.data.userType ? FullNameData.data.userType : ""
        );
        setUserid(FullNameData.data.id ? FullNameData.data.id : "");
        setError("");
        clearFullName();
      } else if (FullNameData.error) {
        setApiMessage(true);
        setError(FullNameData.message);
      }
    }
  }, [FullNameData]);

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const validateEmail = () => {
    let loginIdError = customValidator("companyEmail", "Login ID", loginId);
    if (loginIdError !== "null") {
      setErrors({
        loginIdError: loginIdError,
        groupNameError: "",
        userfullNameError: "",
        statusError: "",
      });
      return false;
    } else {
      setErrors({
        loginIdError: "",
        groupNameError: "",
        userfullNameError: "",
        statusError: "",
      });
      return true;
    }
  };

  const validate = () => {
    let loginIdError = customValidator("companyEmail", "Login ID", loginId);
    let checkGroupNameError = customValidator(
      "groupName",
      "Group Name",
      groupName
    );
    let checkUserNameError = customValidator("userName", "Full Name", userName);
    let checkStatusError = customValidator("status", "Status", status);

    if (
      !(
        loginIdError === "null" &&
        checkGroupNameError === "null" &&
        checkUserNameError === "null" &&
        checkStatusError === "null"
      )
    ) {
      setErrors({
        loginIdError: loginIdError,
        groupNameError: checkGroupNameError,
        userfullNameError: checkUserNameError,
        statusError: checkStatusError,
      });
      return false;
    }
    setErrors({
      loginIdError: "",
      groupNameError: "",
      userfullNameError: "",
      statusError: "",
    });
    return true;
  };
  const fetchAllUser = useCallback(async () => {
    try {
      dispatch(getUserData("userData"));
      dispatch(getAllUserGroupData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);
  const getUserDetails = () => {
    if (validateEmail()) {
      getFullNameByloginId(loginId);
    }
  };

  useEffect(() => {
    if (userId && userDetailsData.data && userDetailsData.data.length > 0) {
      const filterdata = userDetailsData.data?.filter(
        (e: userRights) => e.id === userId
      );
      setUserName(filterdata[0]?.userName ? filterdata[0].userName : "");
    }
  }, [userId, userDetailsData]);

  let userdata = UserGroupsData?.data.filter((e: any) => {
    return e.status === "Active";
  });

  return (
    <div className="d-flex">
      <div className="d-flex flex-column container-group ">
        <h1 className="fw-bold container-group-header ">
          {userType ? "Add User Rights" : "Edit User Rights"}
        </h1>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={error}
          />
        )}
        <div className="d-flex container-group-body  mt-2">
          <div className="d-flex flex-column w-100 fw-bold p-4 gap-2">
            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                Login Id
              </label>
              <input
                className={`form-control ${
                  userType
                    ? "container-group-body-input-login"
                    : "container-group-body-input"
                }  form-label-font-size `}
                value={loginId}
                readOnly={
                  props.userDetail.id === "" ||
                  props.userDetail.id === undefined
                    ? false
                    : true
                }
                onChange={(ev) => setLoginId(ev.currentTarget.value)}
              ></input>
              {userType && (
                <button
                  type="button"
                  className="btn btn-sm container-group-get-button border-0 form-label-font-size ms-1"
                  onClick={getUserDetails}
                >
                  Get User details
                </button>
              )}
            </div>
            <div className="justify-content-center d-flex">
              {errors.loginIdError && errors?.loginIdError !== "null" && (
                <Label className="error-text-red">{errors.loginIdError}</Label>
              )}
            </div>

            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                User Full Name{" "}
                <span className="container-group-body-label-color">*</span>
              </label>
              <input
                className="form-control container-group-body-input form-label-font-size"
                value={userName}
                onChange={(ev) => setUserName(ev.currentTarget.value)}
                readOnly={true}
              ></input>
            </div>
            <div className="justify-content-center d-flex">
              {errors.userfullNameError &&
                errors?.userfullNameError !== "null" && (
                  <Label className="error-text-red">
                    {errors.userfullNameError}
                  </Label>
                )}
            </div>

            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                Group Name{" "}
                <span className="container-group-body-label-color">*</span>
              </label>
              <select
                className="form-control container-group-body-input form-label-font-size"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              >
                <option selected></option>
                {UserGroupsData &&
                  UserGroupsData.data &&
                  UserGroupsData.data.length > 0 &&
                  userdata.map((e: userRights, _index: number) => {
                    return <option>{e.userGroupName}</option>;
                  })}
              </select>
            </div>
            <div className="justify-content-center d-flex">
              {errors.groupNameError && errors?.groupNameError !== "null" && (
                <Label className="error-text-red form-label-font-size">
                  {errors.groupNameError}
                </Label>
              )}
            </div>

            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                User Type{" "}
              </label>
              <Input
                className="container-group-body-input form-label-font-size"
                value={UserType}
                disabled={true}
                onChange={(e) => SetUserType(e.target.value)}
              ></Input>
            </div>
            <div className="d-flex mt-3 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                Status{" "}
                <span className="container-group-body-label-color">*</span>
              </label>
              <Input
                className="container-group-body-input form-label-font-size statusWidth"
                value={status}
                type="select"
                disabled={userType}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected>Active</option>
                <option>Inactive</option>
              </Input>
            </div>
            <div className="col mt-3 d-flex">
              <div className="col-3 ms-4"></div>
              <div className="col-6">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Cancel"}
                  onSubmit={submitHandler}
                  onCancel={cancelEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserGroups;
