import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Input, Label } from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import {
  clearCreateInfo,
  createCompanyUser,
} from "../../redux/action/CompanyUserScreenAction";
import { getUserData } from "../../redux/action/UserCreateAction";
import { getAllUserGroupData } from "../../redux/action/UserGroupAction";
import {
  clearFullNameInfoRight,
  getUserRightsFullName,
} from "../../redux/action/UserRightsAction";
import CustomLoader from "../Loader/CustomLoader";
import CustomResponseMessage from "../UI/ApiResponse/CustomResponseMessage";
import "./ViewCompanyUserAdd.scss";

const ViewCompanyUserAdd = (props: any) => {
  const [userType] = useState(props.userType === "add" ? false : true);
  const [apiMessage, setApiMessage] = useState(false);
  const [lockedMessage, setLockedMessage] = useState("");
  const [lockedStatus, setLockedStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    loginIdError: "",
    companyNameError: "",
    userfullNameError: "",
    userTypeError: "",
    statusError: "",
  });
  const [addUserInfo, setAddUserInfo] = useState({
    id: "",
    userId: "",
    userName: "",
    loginId: "",
    status: "",
    userType: "",
    mobileNumber: "",
  });
  const [userInfo, setUserInfo] = useState({
    id: "",
    companyName: "",
    companyAccountId: "",
    companyRegistrationNo: "",
  });

  const dispatch = useDispatch();
  const FullNameData = useSelector(
    (state: RootStateOrAny) => state.UserRightsReducer?.getUserRightsFullName
  );
  const UserCompanyCreate = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyUserScreenReducer.getCompanyUserResponse
  );

  const getFullNameByloginId = useCallback(
    async (id: string) => {
      try {
        dispatch(getUserRightsFullName(id));
      } catch (err) {}
    },
    [dispatch]
  );

  const clearCreateData = useCallback(async () => {
    try {
      dispatch(clearCreateInfo());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (UserCompanyCreate) {
      if (UserCompanyCreate.data) {
        setAddUserInfo({
          id: "",
          userId: "",
          userName: "",
          loginId: "",
          status: "",
          userType: "",
          mobileNumber: "",
        });
        setError("");
      } else if (UserCompanyCreate.error) {
        setApiMessage(true);
        setError(UserCompanyCreate.error);
        createCompanyUser("");
        clearCreateData();
      }
    }
  }, [UserCompanyCreate, props]);

  useEffect(() => {
    if (UserCompanyCreate?.data) {
      setApiMessage(true);
      setLockedStatus(true);
      setIsLoading(false);
      setLockedMessage("Company User Added Successfully");
    } else if (UserCompanyCreate?.error) {
      setIsLoading(false);
      setApiMessage(true);
      setLockedStatus(false);
      setLockedMessage(UserCompanyCreate?.message);
      createCompanyUser("");
      clearCreateData();
    }
  }, [UserCompanyCreate]);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setUserInfo(props.location.state);
    }
  }, [props.location?.state]);
  const clearFullName = useCallback(async () => {
    try {
      dispatch(clearFullNameInfoRight());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (FullNameData) {
      if (FullNameData.data) {
        setAddUserInfo(FullNameData.data);
        if (FullNameData.data.userType === "STAFF") {
          setError("* Only Company User type can be linked");
        } else {
          setError("");
        }
        clearFullName();
      } else if (FullNameData.error) {
        setApiMessage(true);
        setError(FullNameData.message);
      }
    }
  }, [FullNameData]);

  const handleChange = (e: any) => {
    setAddUserInfo({
      ...addUserInfo,
      [e.target.name]: e.target.value,
    });
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let loginIdError = customValidator(
      "email",
      "Login ID",
      addUserInfo.loginId
    );
    let checkStaffError = customValidator(
      "UserType",
      "User Type",
      addUserInfo.userType
    );
    let checkCompanyNameError = customValidator(
      "companyName",
      "Company Name",
      userInfo.companyName
    );
    let checkUserNameError = customValidator(
      "userName",
      "User Full Name",
      addUserInfo.userName
    );
    let checkStatusError = customValidator(
      "status",
      "Status",
      addUserInfo.status
    );

    if (
      !(
        loginIdError === "null" &&
        checkStaffError === "null" &&
        checkCompanyNameError === "null" &&
        checkUserNameError === "null" &&
        checkStatusError === "null"
      )
    ) {
      setErrors({
        loginIdError: loginIdError,
        userTypeError: checkStaffError,
        companyNameError: checkCompanyNameError,
        userfullNameError: checkUserNameError,
        statusError: checkStatusError,
      });
      setError("* Only Company User type can be linked");
      return true;
    }
  };

  const submitHandler = () => {
    if (!validate()) {
      setIsLoading(true);
      var body = JSON.stringify({
        userId: addUserInfo.id,
        companyName: userInfo.companyName,
        companyId: userInfo.id,
        userName: addUserInfo.userName,
        loginId: addUserInfo.loginId,
        userType: addUserInfo.userType,
        companyRegistrationNo: userInfo.companyRegistrationNo,
        userMobileNumber: addUserInfo.mobileNumber,
        companyAccountId: userInfo.companyAccountId,
      });
      dispatch(createCompanyUser(body));
    }
  };

  const cancelEvent = () => {
    props.history.push({
      pathname:
        "/dashboard/Company-UserScreen/Company-User/View-Company-User-List",
    });
    setAddUserInfo({
      id: "",
      userId: "",
      userName: "",
      loginId: "",
      status: "",
      userType: "",
      mobileNumber: "",
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  const validateEmail = () => {
    let loginIdError = customValidator(
      "companyEmail",
      "Login ID",
      addUserInfo.loginId
    );
    if (loginIdError !== "null") {
      setErrors({
        loginIdError: loginIdError,
        companyNameError: "",
        userfullNameError: "",
        statusError: "",
        userTypeError: "",
      });
      return false;
    } else {
      setErrors({
        loginIdError: "",
        companyNameError: "",
        userfullNameError: "",
        statusError: "",
        userTypeError: "",
      });
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
    setError("");
    if (validateEmail()) {
      getFullNameByloginId(addUserInfo.loginId);
    }
  };

  return (
    <div className="d-flex">
      <div className="d-flex flex-column container-company ">
        <h1 className="fw-bold container-company-header ">
          {" "}
          {userType ? "Add Company User" : "Edit Company User"}
        </h1>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={lockedStatus}
            closeMessage={closeMessage}
            message={lockedMessage}
          />
        )}
        <CustomLoader isLoading={isLoading} size={50} />
        <div className="d-flex container-company-body mt-2">
          <div className="d-flex flex-column w-100 fw-bold p-4 gap-3">
            <div className="d-flex mt-2 align-items-end">
              <label className="container-company-body-label form-label-font-size">
                Login Id
              </label>
              <input
                className={`form-control ${
                  userType
                    ? "container-company-body-input-login"
                    : "container-company-body-input"
                }  form-label-font-size `}
                value={addUserInfo.loginId}
                name="loginId"
                onChange={handleChange}
              ></input>
              {userType && (
                <button
                  type="button"
                  className="btn btn-sm container-company-get-button border-0 form-label-font-size ms-1 getbtn"
                  onClick={getUserDetails}
                >
                  Get User details
                </button>
              )}
            </div>
            {errors.loginIdError && errors?.loginIdError !== "null" && (
              <Label className="d-flex justify-content-center text-red">
                {errors.loginIdError}
              </Label>
            )}
            <div className="d-flex mt-2 align-items-end">
              <label className="container-company-body-label form-label-font-size">
                User Full Name{" "}
              </label>
              <input
                className="form-control container-company-body-input form-label-font-size"
                value={addUserInfo.userName}
                name="userName"
                onChange={handleChange}
                readOnly={true}
              ></input>
            </div>
            {errors.userfullNameError &&
              errors?.userfullNameError !== "null" && (
                <Label className="text-red">{errors.userfullNameError}</Label>
              )}
            <div className="d-flex mt-2 align-items-end">
              <label className="container-company-body-label form-label-font-size">
                Company Name{" "}
              </label>
              <input
                className="form-control container-company-body-input form-label-font-size"
                value={userInfo.companyName}
                name="companyName"
                readOnly={true}
                onChange={handleChange}
              ></input>
            </div>
            {errors.companyNameError && errors?.companyNameError !== "null" && (
              <Label className="text-red">{errors.companyNameError}</Label>
            )}
            <div className="d-flex mt-2 align-items-end">
              <label className="container-company-body-label form-label-font-size">
                User Type{" "}
              </label>
              <Input
                className="form-select container-company-body-input form-label-font-size"
                value={addUserInfo.userType}
                type="select"
                name="UserType"
                disabled={true}
                onChange={handleChange}
              >
                <option selected></option>
                <option>STAFF</option>
                <option>COMPANY_USER</option>
                <option>BRANCH</option>
              </Input>
            </div>
            {error && (
              <Label className="d-flex justify-content-center text-red">
                {error}
              </Label>
            )}
            <div className="d-flex mt-2 align-items-end">
              <label className="container-company-body-label form-label-font-size">
                Status
              </label>
              <Input
                className=" form-select container-company-body-input form-label-font-size"
                value={addUserInfo.status}
                type="select"
                name="status"
                disabled={userType}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Input>
              
            </div>
            {errors.statusError && errors?.statusError !== "null" && (
              <Label className="d-flex justify-content-center text-red">
                {errors.statusError}
              </Label>
            )}
            {/* <div className="d-flex justify-content-center mt-3">
              <button
                type="button"
                className="btn btn-sm save-buttonCompany border-0 form-label-font-size"
                onClick={() => {
                  submitHandler();
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-sm cancel-buttonCompany  border-0 form-label-font-size"
                onClick={() => {
                  cancelEvent();
                }}
              >
                Cancel
              </button>
              <div>
                <span></span>
              </div>
            </div> */}
            <div className="d-flex mt-3">
              <div className="btn-alignment">
              </div>
              <div className="d-flex">
              <button
                type="button"
                className="btn btn-sm save-button border-0 form-label-font-size w-100"
                onClick={() => {
                  submitHandler();
                }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-sm cancel-button ms-3 p-1 border-0 form-label-font-size w-100"
                onClick={() => {
                  cancelEvent();
                }}
              >
                Cancel
              </button>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCompanyUserAdd;
