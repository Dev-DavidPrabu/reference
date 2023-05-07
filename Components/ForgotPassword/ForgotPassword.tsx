import React, { useCallback, useEffect, useState } from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logofinal from "../../assets/logo-final.png";
import { useLocation, useHistory } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  changeNewPasswordData,
  validateResetPassword,
} from "../../redux/action/ForgotPasswordAction";
import "./ForgotPassword.scss";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../Loader/CustomLoader";

function ForgotPassword() {
  let path = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();
  let loginId = "";
  let accessToken = "";
  if (path.search) {
    const searchParams = new URLSearchParams(path.search);
    var email = searchParams.get("emailAddress") || "";
    loginId = atob(email);
    accessToken = searchParams.get("token") || "";
  }

  const [error, setError] = useState("");
  const [load, setLoad] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleLoginForm = () => {
    setLoad(true);
    if (validate()) {
      let body = {
        loginId: loginId,
        newPassword: password,
        resetLinkToken: accessToken,
      };
      dispatch(changeNewPasswordData(body));
    }
  };
  const validateResetPasswordToken = useCallback(
    async (maildId: any, token: any) => {
      dispatch(validateResetPassword(maildId, token));
    },
    [dispatch]
  );

  const validTokenMail = useSelector(
    (state: RootStateOrAny) =>
      state.ForgetPasswordAccessReducer?.validateResetPasswordResponse
  );
  const resetPasswordResponse = useSelector(
    (state: RootStateOrAny) =>
      state.ForgetPasswordAccessReducer?.changeNewPasswordDataResponse
  );

  useEffect(() => {
    if (resetPasswordResponse?.status === 200) {
      setLoad(false);
      history.push("/dashboard");
    }
  }, [resetPasswordResponse]);

  useEffect(() => {
    setLoad(true);
    if (validTokenMail?.error) {
      setLoad(false);
      setError("UnAuthorized");
    } else if (validTokenMail?.data) {
      setLoad(false);
      setError("");
    }
  }, [validTokenMail]);
  useEffect(() => {
    validateResetPasswordToken(loginId, accessToken);
  }, [validateResetPasswordToken, loginId, accessToken]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    let passowrdError = customValidator("newpassword", "Password", password);

    if (password !== confirmPassword) {
      setPasswordError("Confirm Password Mismatch");
      return false;
    } else if (passowrdError !== "null") {
      setPasswordError(passowrdError);
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  return (
    <>
      <div className="row" style={{ minHeight: "450px" }}>
        <div className="col-6 loginbg d-flex justify-content-center align-items-center">
          <img src={logofinal} alt=""></img>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="col-6 auth-inner">
          {!load ? (
            <div className="form-group">
              {error !== "UnAuthorized" ? (
                <section>
                  <div className="form-group">
                    <h1 className="">Reset Password</h1>
                    <span>Enter the Password for your account</span>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <UserOutlined />
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="Password"
                        value={password}
                        className="form-control"
                        onChange={handlePasswordChange}
                      />
                    </InputGroup>
                  </div>
                  <br />
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <LockOutlined />
                    </InputGroupAddon>
                    <Input
                      placeholder="ConfirmPassword"
                      type="password"
                      name="ConfirmPassword"
                      className="form-control"
                      onChange={handleConfirmPasswordChange}
                    />
                  </InputGroup>
                  {passwordError && <p className="errormsg">{passwordError}</p>}
                  <div className="form-group"></div>
                  <br />

                  <div className="d-flex justify-content-between  align-items-center">
                    <button
                      onClick={handleLoginForm}
                      className="mt-3 button btn loginbg btn-lg w-10"
                      color="primary"
                    >
                      Change Password
                    </button>
                  </div>
                </section>
              ) : (
                <p className="tokenerrormsg">{error}</p>
              )}
            </div>
          ) : (
            <CustomLoader isLoading={load} size={50} />
          )}
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
