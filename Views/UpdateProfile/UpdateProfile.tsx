import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import "./UpdateProfile.scss";
import { customValidator } from "../../Constants/Validation";
import CustomNavigateProfile from "../../Components/CustomNavigateProfile/CustomNavigateProfile";
import { useHistory } from "react-router";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ChangePassword } from "../../redux/action/ChangePasswordAction";
import CustomLoader from "../../Components/Loader/CustomLoader";

function UpdateProfile(props: any) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    confirmPassword: "",
    newPassword: "",
    OldPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [cardStatus, setCardStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const validate = () => {
    let passowrdError = customValidator(
      "originatorType",
      "Old Password",
      password.OldPassword
    );
    let newPassError = customValidator(
      "newpassword",
      "New Password",
      password.newPassword
    );

    if (passowrdError !== "null") {
      setPasswordError(passowrdError);
      return false;
    } else if (newPassError !== "null") {
      setPasswordError(newPassError);
      return false;
    } else if (password.newPassword !== password.confirmPassword) {
      setPasswordError("Confirm Password Mismatch");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const getChangePasswordres = useSelector(
    (state: RootStateOrAny) =>
      state.ChangePasswordReducer?.changeOldToNewPasswordRes
  );

  useEffect(() => {
    if (getChangePasswordres) {
      if (getChangePasswordres?.data) {
        setIsLoading(false);
        setApiMessage("Password Changed Successfully");
        setCardStatus(true);
        setCardStatus(true);
        setPassword({ confirmPassword: "", newPassword: "", OldPassword: "" });
      } else if (getChangePasswordres?.error) {
        setIsLoading(false);
        setCardStatus(false);
        setApiMessage(getChangePasswordres?.message);
      }
    }
  }, [getChangePasswordres]);

  const postNewPassword = useCallback(
    (body: any) => () => {
      try {
        dispatch(ChangePassword(body));
      } catch (err) {}
    },
    [dispatch]
  );

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let loginUserId = userData?.userInfo?.loginId;

  const handleForm = (e: any) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      var data = {
        loginId: loginUserId,
        currentPassword: password.OldPassword,
        newPassword: password.newPassword,
      };
      dispatch(postNewPassword(data));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const navigateTo = (e: any) => {
    if (e === "changePassword") {
      history.push("/dashboard/update-profile");
    } else if (e === "ProfileImgChange") {
      history.push("/dashboard/Profile-image-change");
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);

  return (
    <>
      <div className="ms-5"></div>

      <div className="d-flex ms-5 mt-5">
        <div className="d-flex flex-column container-user-background">
          <h1 className="secondary_label_txt" data-testid="header-title"></h1>
          <CustomLoader isLoading={isLoading} size={50} />

          <div className="primary_heading">Change Password</div>
          <CustomNavigateProfile page={"changePassword"} onClick={navigateTo} />

          <br />
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={cardStatus}
              closeMessage={() => closeMessage()}
              message={apiMessage}
            />
          )}
          <div className="card card-backgound">
            <h6>Enter Your Password For Your Account</h6>
            <br />
            <Form>
              <FormGroup row>
                <Label className="font" sm={3}>
                  Old Password
                </Label>
                <Col sm={7}>
                  <Input
                    type="password"
                    name="OldPassword"
                    className="form-control"
                    onChange={handleChange}
                    value={password.OldPassword}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label className="font" sm={3}>
                  New Password
                </Label>
                <Col sm={7}>
                  <Input
                    type="password"
                    name="newPassword"
                    className="form-control"
                    onChange={handleChange}
                    value={password.newPassword}
                  />
                </Col>
              </FormGroup>
              <br />
              <FormGroup row>
                <Label className="font" sm={3}>
                  Confirm Password
                </Label>
                <Col sm={7}>
                  <Input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    onChange={handleChange}
                    value={password.confirmPassword}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="font" sm={3}></Label>
                <Col sm={7}>
                  {passwordError && <p className="errormsg">{passwordError}</p>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label className="form-label-font-size" sm={3}></Label>
                <Col sm={7}>
                  <div className="d-flex justify-content-between  align-items-center buttonwt">
                    <button
                      onClick={handleForm}
                      className="mt-3 button btn loginbg w-5 btn-height"
                      color="primary"
                    >
                      Change Password
                    </button>
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
