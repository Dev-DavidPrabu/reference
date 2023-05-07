import React, { useCallback, useState } from "react";
import { Input, InputGroup, InputGroupAddon } from "reactstrap";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logofinal from "../../assets/logo-final.png";
import { createForgetPasswordAccess } from "../../redux/action/ForgotPasswordAction";
import { useDispatch } from "react-redux";
function ResetPassword() {
  const dispatch = useDispatch();
  const ValidatingForgotPassword = useCallback(
    async (userData: any) => {
      try {
        dispatch(createForgetPasswordAccess(userData));
      } catch (err) {}
    },
    [dispatch]
  );
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
  });

  const handleForm = (e: any) => {
    e.preventDefault();
    ValidatingForgotPassword(password);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="row">
        <div className="col-6 loginbg d-flex justify-content-center align-items-center">
          <img src={logofinal} alt=""></img>
        </div>
        <form onSubmit={handleForm} className="col-6 auth-inner">
          <h1>Reset Password</h1>
          <div className="form-group">
            <div className="form-group">
              <h6>Enter Your Password For Your Account</h6>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <UserOutlined />
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  value={password.password}
                />
              </InputGroup>
            </div>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <LockOutlined />
              </InputGroupAddon>
              <Input
                placeholder="Conform Password"
                type="password"
                name="newPassword"
                className="form-control"
                onChange={handleChange}
                value={password.newPassword}
              />
            </InputGroup>

            <div className="form-group"></div>
            <br />

            <div className="d-flex justify-content-between  align-items-center buttonwt">
              <button
                onSubmit={handleForm}
                className="mt-3 button btn loginbg btn-lg w-5 btn-ht"
                color="primary"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
