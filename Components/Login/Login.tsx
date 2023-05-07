import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  authenticationOfUser,
  resetUserInitialLogin,
} from "../../redux/action/UserAuthenticationAction";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Login.scss";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import logofinal from "../../assets/logo-final.png";

import LoginModalPopUp from "../LoginModalPopUp/LoginModalPopUp";
import {
  clearChangePasswordData,
  clearForgotPasswordData,
  createForcedChangePasswordAccess,
  createForgetPasswordAccess,
} from "../../redux/action/ForgotPasswordAction";
import CustomLoader from "../Loader/CustomLoader";
import { toast } from "react-toastify";
import { customValidator } from "../../Constants/Validation";

const Login = (props: any) => {
  const [userInfo, setuserInfo] = useState({
    loginId: "",
    password: "",
    appCode: "BO",
  });

  const [error, setError] = useState(props.location?.state || "");
  const [apiError, setApiError] = useState("");

  const [showModel, setShowModel] = useState(false);
  const [modelPopUp, setmodelPopUp] = useState(false);
  const [errors, setErrors] = useState({
    loginIdError: "",
    passwordError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [userAcessConfirmation, setUserAcessConfirmation] = useState(false);

  const dispatch = useDispatch();

  const LoginUserInfo = useSelector(
    (state: RootStateOrAny) =>
      state.authenticationReducer.authenticaticatedUserInfo
  );
  const loggedInUserData = useSelector(
    (state: RootStateOrAny) => state.authenticationReducer.loggedInUserInfo
  );
  const UserAccessData = useSelector(
    (state: RootStateOrAny) => state.authenticationReducer.userAccessInfo
  );
  useEffect(() => {
    if (props.location?.state) {
      setError(props.location?.state);
    }
  }, [props]);

  const changePasswordData = useSelector(
    (state: RootStateOrAny) =>
      state.ForgetPasswordAccessReducer.changePasswordResponse
  );

  let mailSentResponse = useSelector(
    (state: RootStateOrAny) =>
      state.ForgetPasswordAccessReducer?.createForgotPasswordResponse
  );

  useEffect(() => {
    if (mailSentResponse?.data) {
      setLoad(false);
      toast.success(
        "Your Request has been accepted Please check your email and follow the instruction",
        {
          theme: "colored",
        }
      );
      resetForgotPasswordData();
    } else if (mailSentResponse?.error) {
      setLoad(false);
      setError(mailSentResponse?.message);
    }
  }, [mailSentResponse]);

  useEffect(() => {
    if (props.location?.state) {
      setError(props.location?.state);
    }
  }, [props]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const clearPasswordData = useCallback(async () => {
    try {
      dispatch(clearChangePasswordData());
    } catch (err) {}
  }, [dispatch]);
  const resetForgotPasswordData = useCallback(async () => {
    try {
      dispatch(clearForgotPasswordData());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (changePasswordData) {
      if (changePasswordData?.data) {
        clearPasswordData();
        toast.success("Your new password updated successfully");
        setmodelPopUp(false);
        setuserInfo({ ...userInfo, ["password"]: "" });
        props.history.push("/dashboard");
        dispatch({ type: "RESET_LOGIN_INFO" });
      } else if (changePasswordData?.error) {
        setApiError(changePasswordData.message);
      }
    }
  }, [changePasswordData, clearPasswordData, props.history, userInfo]);

  useEffect(() => {
    if (LoginUserInfo.initialLogin) {
      setIsLoading(false);
      resetUserInitData();
      setmodelPopUp(LoginUserInfo.initialLogin);
    } else if (LoginUserInfo?.idToken) {
      if (LoginUserInfo && loggedInUserData && UserAccessData) {
        if (LoginUserInfo?.idToken) {
          if (loggedInUserData.mobileNumber) {
            if (UserAccessData?.length > 0) {
              let userData: any = {
                userInfo: loggedInUserData,
                idToken: LoginUserInfo?.idToken,
                refreshToken: LoginUserInfo?.refreshToken,
                sessionId: LoginUserInfo?.sessionId,
                loginTime: loggedInUserData?.previousLoginDateAndTime,
              };
              let userDataInfo = JSON.stringify(userData);
              localStorage.setItem("userInfo", userDataInfo);

              localStorage.setItem(
                "userAcessList",
                JSON.stringify(UserAccessData)
              );
              setIsLoading(false);
              props.history.push("/dashboard");
            } else {
              setUserAcessConfirmation(true);
              setIsLoading(false);
            }
          }
        }
      }
    } else {
      if (LoginUserInfo?.error === "PASSWORD_EXPIRED") {
        setmodelPopUp(true);
      } else {
        setError(LoginUserInfo.message);
      }

      setIsLoading(false);
    }
  }, [loggedInUserData, LoginUserInfo, UserAccessData]);

  const ValidatingAuthentication = useCallback(
    async (userData: any) => {
      try {
        dispatch(authenticationOfUser(userData));
      } catch (err) {}
    },
    [dispatch]
  );
  const ValidatingForgotPassword = useCallback(
    async (userData: any) => {
      try {
        dispatch(createForgetPasswordAccess(userData));
      } catch (err) {}
    },
    [dispatch]
  );

  const resetUserInitData = useCallback(async () => {
    try {
      dispatch(resetUserInitialLogin());
    } catch (err) {}
  }, [dispatch]);

  const handleLoginForm = (e: any) => {
    e.preventDefault();
    setError("");
    if (validate()) {
      setIsLoading(true);
      ValidatingAuthentication(userInfo);
    }
  };
  const handleForgotPassword = () => {
    setError("");
    setShowModel(true);
  };

  const validateUserMailId = () => {
    let userMailIdError = customValidator(
      "forgotPasswordResetEmailId",
      "Email id",
      userInfo.loginId
    );
    if (userMailIdError === "null") {
      setError("");
      return true;
    } else {
      setError(userMailIdError);
      return false;
    }
  };

  const validate = () => {
    let loginIdError = customValidator("required", "loginId", userInfo.loginId);
    let passowrdError = customValidator(
      "required",
      "Password",
      userInfo.password
    );
    if (!(loginIdError === "null" && passowrdError === "null")) {
      setError("Please complete all required fields");
      setErrors({
        loginIdError: loginIdError,
        passwordError: passowrdError,
      });
      return false;
    } else {
      setError("");
      setErrors({
        loginIdError: "",
        passwordError: "",
      });
      return true;
    }
  };
  const handleForm = (e: any) => {
    e.preventDefault();
    setLoad(true);
    if (validateUserMailId()) {
      ValidatingForgotPassword(userInfo.loginId);
    }
  };
  const forceChangePassword = useCallback(
    async (passwordInfo: any) => {
      try {
        dispatch(createForcedChangePasswordAccess(passwordInfo));
      } catch (err) {}
    },
    [dispatch]
  );

  const onSubmit = (e: any) => {
    if (e) {
      let a: any = {};
      a.loginId = userInfo.loginId;
      a.currentPassword = e.currentPassword;
      a.newPassword = e.newPassword;
      forceChangePassword(a);
      setmodelPopUp(false);
    }
  };
  const onCancel = () => {
    setmodelPopUp(false);
  };

  const handleSignIn = () => {
    setShowModel(false);
    setError("");
  };
  const userAcessListConfirmation = () => {
    return (
      <Modal isOpen={userAcessConfirmation} size="lg">
        <ModalBody
          style={{
            display: "flex",
            padding: "2rem",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          You are not assigned any User Rights. Please Contact Administrator
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setUserAcessConfirmation(false)}>Okay</Button>
        </ModalFooter>
      </Modal>
    );
  };

  return (
    <>
      <div className="row" style={{ minHeight: "450px" }}>
        <div className="col-6 loginbg d-flex justify-content-center align-items-center">
          <img src={logofinal} alt=""></img>
        </div>

        {!showModel ? (
          <form onSubmit={handleLoginForm} className="col-6 auth-inner">
            <div className="form-group">
              <div className="form-group ">
                <span className="login-header">Signin Your Account</span>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <UserOutlined />
                  </InputGroupAddon>
                  <Input
                    placeholder="Enter Your ID"
                    type="text"
                    name="loginId"
                    className="login-usermail form-control"
                    onChange={handleChange}
                    value={userInfo.loginId}
                  />
                </InputGroup>
                {errors.loginIdError && errors?.loginIdError !== "null" && (
                  <span className="text-red">{errors.loginIdError}</span>
                )}
              </div>
              <br />
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <LockOutlined />
                </InputGroupAddon>
                <Input
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  className="login-usermail form-control"
                  onChange={handleChange}
                  value={userInfo.password}
                />
              </InputGroup>

              <div className="form-group">
                {errors.passwordError && errors?.passwordError !== "null" && (
                  <span className="text-red">{errors.passwordError}</span>
                )}
              </div>
              <br />
              <div className="d-flex flex-row-reverse">
                <div className="form-group d-flex justify-content-end  align-items-center buttonwt">
                  <button
                    onClick={handleLoginForm}
                    className="mt-3 button btn loginbg btn-lg w-5 btn-ht login-button"
                    color="primary"
                  >
                    Login
                  </button>
                </div>
                <div className="form-group d-flex  align-items-center buttonwt forgot-btn">
                  <button
                    onClick={handleForgotPassword}
                    className="mt-3 button btn loginclr btn-ht border-0 forgot-text"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
              {error && (
                <span className="d-flex mt-2 col-11 align-items-center justify-content-center login-error">
                  *{error}
                </span>
              )}
            </div>
          </form>
        ) : (
          <form className="col-6 auth-inner">
            <div className="form-group">
              <div className="form-group">
                <h1 className="login-header">Forgot Password?</h1>
                <span>Recover Your Password</span>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <MailOutlined />
                  </InputGroupAddon>
                  <Input
                    placeholder="User E-mail"
                    type="text"
                    name="loginId"
                    className="login-usermail form-control"
                    onChange={handleChange}
                    value={userInfo.loginId}
                  />
                </InputGroup>
              </div>
              <div className="d-flex">
                <div className="d-flex justify-content-start  align-items-center buttonwt">
                  <button
                    onClick={(e) => handleForm(e)}
                    className="mt-3 forgot-submit border-0"
                    color="primary"
                  >
                    Submit
                  </button>
                </div>
                <div className="d-flex justify-content-end  align-items-center buttonwt">
                  <p
                    onClick={handleSignIn}
                    className="forgot-password text-right border-0 loginclr form-group login-button cursor-pointer"
                  >
                    Sign In
                  </p>
                </div>
              </div>
              <CustomLoader isLoading={load} size={50} />
              {error && (
                <span className="d-flex mt-2 col-11 align-items-center justify-content-center login-error">
                  *{error}
                </span>
              )}
            </div>
          </form>
        )}
      </div>
      <LoginModalPopUp
        visible={modelPopUp}
        onSubmit={(e: any) => onSubmit(e)}
        LoginModalPopUp
        onCancel={onCancel}
        apiError={apiError}
      />
      {userAcessListConfirmation()}
      <CustomLoader isLoading={isLoading} size={50} />
    </>
  );
};

export default Login;
