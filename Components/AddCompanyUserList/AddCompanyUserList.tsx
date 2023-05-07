import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input } from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import { userRights } from "../../models/UserRightsModal";
import { createCompanyUser } from "../../redux/action/CompanyUserScreenAction";
import { getUserData } from "../../redux/action/UserCreateAction";
import { getAllUserGroupData } from "../../redux/action/UserGroupAction";
import {
  clearFullNameInfoRight,
  clearUpdateInfoRights,
  getUserRightsFullName,
  updateUserRight,
} from "../../redux/action/UserRightsAction";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./AddCompanyUserList.scss";

const AddCompanyUserList = (props: any) => {
  const [id] = useState("");
  const [userId, setUserid] = useState("");
  const [groupName, setGroupName] = useState("");
  const [userName, setUserName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [status, setStatus] = useState("Active");

  const [UserType, SetUserType] = useState("Staff");

  const [userType] = useState(props.userType === "add" ? false : true);
  const [apiMessage, setApiMessage] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const comment = "";
  const UserCompanyCreate = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyUserScreenReducer.getCompanyUserResponse
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

  const clearCreateData = useCallback(
    async (_userData: any) => {
      try {
        dispatch(createCompanyUser("userData"));
      } catch (err) {}
    },
    [dispatch]
  );
  const clearUpdateData = useCallback(async () => {
    try {
      dispatch(clearUpdateInfoRights());
    } catch (err) {}
  }, [dispatch]);

  const getFullNameByloginId = useCallback(
    async (_id: string) => {
      try {
        dispatch(getUserRightsFullName(id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    createCompanyUser("");
    clearUpdateData();
  }, [clearCreateData, clearUpdateData]);

  useEffect(() => {
    if (UserCompanyCreate) {
      if (UserCompanyCreate.data) {
        createCompanyUser("");
        props.submitHandler("add");
        setError("");
      } else if (UserCompanyCreate.error) {
        setApiMessage(true);
        setError(UserCompanyCreate.error);
      }
    }
  }, [UserCompanyCreate, props]);

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
        setUserName(FullNameData.data.userName);
        setUserid(FullNameData.data.id);
        setError("");
        clearFullNameInfoRight();
      } else if (FullNameData.error) {
        setApiMessage(true);
        setError(FullNameData.message);
      }
    }
  }, [FullNameData]);
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
      return false;
    }

    return true;
  };

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
        dispatch(createCompanyUser(body));
      }
    } else {
      if (validate()) {
        var updateBody = JSON.stringify({
          userId: id,
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

  const cancelEvent = () => {
    props.history.push({
      pathname: "/dashboard/Company-UserScreen/Company-User",
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  const validateEmail = () => {
    let loginIdError = customValidator("companyEmail", "Login ID", loginId);
    if (loginIdError !== "null") {
      return false;
    } else {
      return true;
    }
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
        <h1 className="fw-bold container-group-header btn--sizer">
          {" "}
          {userType ? "Add Company User" : "Edit Company User"}
        </h1>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={error}
          />
        )}
        <div className="d-flex container-group-body mt-2">
          <div className="d-flex flex-column w-100 fw-bold p-4">
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
            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                Company Name{" "}
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
            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                User Type{" "}
              </label>
              <Input
                className="form-select container-group-body-input form-label-font-size"
                value={UserType}
                type="select"
                disabled={userType ? false : true}
                onChange={(e) => SetUserType(e.target.value)}
              >
                <option selected>Staff</option>
                <option>COMPANY_USER</option>
                <option>Branch</option>
              </Input>
            </div>
            <div className="d-flex mt-2 align-items-end">
              <label className="container-group-body-label form-label-font-size">
                Status{" "}
                <span className="container-group-body-label-color">*</span>
              </label>
              <Input
                className=" form-select container-group-body-input form-label-font-size"
                value={status}
                type="select"
                disabled={userType}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option selected>Active</option>
                <option>Inactive</option>
              </Input>
            </div>
            <div className="d-flex">
            </div>
            <div className="d-flex justify-content-center mt-3 me-5">
              <button
                type="button"
                className="btn btn-sm save-button border-0 form-label-font-size"
                onClick={() => {
                  submitHandler();
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-sm  cancel-button ms-3 p-1 border-0 form-label-font-size"
                onClick={() => {
                  cancelEvent();
                }}
              >
                Cancel
              </button>
              <div>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyUserList;
