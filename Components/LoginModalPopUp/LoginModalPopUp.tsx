import { Input, Modal } from "antd";

import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";
import { customValidator } from "../../Constants/Validation";
import "./LoginModelPopUp.scss";
function LoginModalPopUp(props: any) {
  const [error, setError] = useState(props.apiError || "");
  const [errors, setErrors] = useState({
    currentPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: ""
  });
  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  useEffect(()=>{
    if(props.apiError){
      setError(props.apiError)
    }
  },[props.apiError])


  const handlePopuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChange({ ...passwordChange, [e.target.name]: e.target.value });
  };

  const validatePassword=()=>{
      let currentPasswordErrors = customValidator(
        "required",
        "Current Password",
        passwordChange.currentPassword
      );
      let newPasswordErrors = customValidator(
        "newpassword",
        "New Password",
        passwordChange.newPassword
      );
      let confirmPasswordErrors = customValidator(
        "newpassword",
        "Confirm Password",
        passwordChange.confirmPassword
      );  
      if (!(currentPasswordErrors === "null" && newPasswordErrors === "null" && confirmPasswordErrors === "null")) {
        setError("");
        setErrors({
          currentPasswordError: currentPasswordErrors,
          newPasswordError: newPasswordErrors,
          confirmPasswordError: confirmPasswordErrors,
        });
        return false;
      } else {
        setErrors({
          currentPasswordError: "",
          newPasswordError: "",
          confirmPasswordError: "",
        });
        return true;
      }
  }

  const handleSubmit=()=>{
    if(validatePassword()){
      if(passwordChange.newPassword === passwordChange.confirmPassword){
        setError("");
        props.onSubmit(passwordChange)
      }else{
        setError("Confirm password not matching");
      }
    }
  }

  const onCancel=()=>{
    setError("");
    setPasswordChange({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
    props.onCancel()
  }
  return (
    <div>
      <Modal
        title="Change Password"
        visible={props.visible}
        onOk={props.onSubmit()}
        footer={false}
        closable={false}
      >
        <div style={{ padding: "4px" }}>
          <Input
            placeholder="Current Password"
            type="password"
            name="currentPassword"
            className="form-control"
            onChange={(e) => handlePopuChange(e)}
            value={passwordChange.currentPassword}
          />
          {errors.currentPasswordError && errors?.currentPasswordError !== "null" && (<Label className="loginModelPopup-error-text">{errors.currentPasswordError}</Label>)}
        </div>
        <div style={{ padding: "4px" }}>
          <Input
            placeholder=" New Password"
            type="password"
            name="newPassword"
            className="form-control"
            onChange={(e) => handlePopuChange(e)}
            value={passwordChange.newPassword}
          />
          {errors.newPasswordError && errors?.newPasswordError !== "null" && (<Label className="loginModelPopup-error-text">{errors.newPasswordError}</Label>)}
        </div>
        <div style={{ padding: "4px" }}>
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            className="form-control"
            onChange={(e) => handlePopuChange(e)}
            value={passwordChange.confirmPassword}
          />
          {errors.confirmPasswordError && errors?.confirmPasswordError !== "null" &&(<Label className="loginModelPopup-error-text">{errors.confirmPasswordError}</Label>)}
          {error && (<Label className="loginModelPopup-error-text">{error}</Label>)}
        </div>
        <div className="cancel-evnt">
          <button
            onClick={handleSubmit}
            className="mt-3 button btn loginbg btn-lg w-10"
            color="primary"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="mt-3 button btn loginbg btn-lg w-10"
            color="primary"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModalPopUp;
