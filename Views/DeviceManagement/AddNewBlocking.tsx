import e from "express";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { customValidator } from "../../Constants/Validation";
import { updateCustomerLock } from "../../redux/action/staffDeviceLockAction";
import "./AddNewBlocking.scss";
const AddNewBlocking = (props: any) => {
  const [blocking, setBlocking] = useState({
    deviceId: "",
    mobileNumber: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState(false);
  const [errors, setErrors] = useState({
    userMobileNumberError: "",
    UserReasonError: "",
    UserDeviceIdError: "",
  });
  const [mobileCode, setMobileCode] = useState("+60");
  const [lockedStatus, setLockedStatus] = useState(false);
  const [lockedMessage, setLockedMessage] = useState("");
  const validate = () => {
    let res = true;
    if (blocking.mobileNumber === "" && blocking.deviceId === "") {
      errors.UserDeviceIdError = "*Kindly enter Mobile Number or Device Id";
      setErrors({
        ...errors,
      });
      res = false;
    } else {
      let checkmobileError = customValidator(
        "mobileno",
        "Mobile number",
        blocking.mobileNumber
      );
      if (checkmobileError !== "null") {
        if (blocking.deviceId === "") {
          res = false;
          errors.userMobileNumberError = checkmobileError;
        }
      } else if (blocking.deviceId === "") {
        errors.userMobileNumberError = "";
      }
      errors.UserReasonError = "";
      errors.UserDeviceIdError = "";
      setErrors({
        ...errors,
      });
    }
    let checkReasonError = customValidator(
      "reasonStatus",
      "Reason",
      blocking.reason
    );

    if (checkReasonError !== "null") {
      setErrors({
        ...errors,
        UserReasonError: checkReasonError,
      });

      setError("* Please Complete All the Required Field");
      res = false;
    } else setError("");
    return res;
  };
  const [customerError, setcustomerError] = useState(false);
  const dispatch = useDispatch();
  let CustomerDeviceLock = useSelector(
    (state: RootStateOrAny) => state.staffDeviceLockReducer?.staffDeviceLocklist
  );
  const LoginErrorInfo = useSelector(
    (state: RootStateOrAny) => state.staffDeviceLockReducer.errorDevideLocklist
  );
  useEffect(() => {
    if (CustomerDeviceLock?.data) {
      setApiMessage(true);
      setLockedStatus(true);
      setLockedMessage("Locked Successfully");
    } else if (CustomerDeviceLock?.error) {
      setApiMessage(true);
      setLockedStatus(false);
      setLockedMessage(CustomerDeviceLock?.message);
    }
  }, [CustomerDeviceLock]);
  useEffect(() => {
    if (CustomerDeviceLock) {
      if (blocking.deviceId === "" && blocking.mobileNumber === "") {
        setLockedMessage("");
        setApiMessage(false);
        setLockedStatus(false);
      }
    }
  }, []);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlocking({ ...blocking, [e.target.name]: e.target.value });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const onSubmit = () => {
    if (validate()) {
      setApiMessage(true);
      let body: any = {};
      body.mobileNumber =
        blocking.mobileNumber && `${mobileCode}${blocking.mobileNumber}`;
      body.deviceId = blocking.deviceId;
      body.reason = blocking.reason;
      dispatch(updateCustomerLock(body));
      setBlocking({ mobileNumber: "", reason: "", deviceId: "" });
    }
  };
  const onCancel = () => {
    setBlocking({ mobileNumber: "", reason: "", deviceId: "" });
    setErrors({
      userMobileNumberError: "",
      UserReasonError: "",
      UserDeviceIdError: "",
    });
  };
  useEffect(() => {
    if (Object.keys(LoginErrorInfo).length !== 0) {
      setcustomerError(!customerError);
    }
  }, [LoginErrorInfo]);

  return (
    <div className="p-4 ">
      <div className="d-flex flex-row  justify-content-between lock-blocking-title ">
        <div className="primary_heading ">
          {props.title
            ? "Lock Account / Device "
            : "Add New Record for Blocking"}
        </div>
        <div className="col-4">
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={lockedStatus}
              closeMessage={closeMessage}
              message={lockedMessage}
            />
          )}
        </div>
      </div>
      <div className="lock-blocking-back mt-3">
        <div className="p-4 d-flex flex-column gap-2">
          <div className="col d-flex">
            <div className="col-3 p-2">
              <label className="lock-blocking-field">Device ID</label>
            </div>
            <div className="col-8 p-2 ">
              <input
                className="form-control lock-blocking-input"
                type="text"
                name="deviceId"
                value={blocking.deviceId}
                onChange={handleChange}
                readOnly={false}
              />
            </div>
          </div>

          <div className="col d-flex">
            <div className="col-3 p-2">
              <label className="lock-blocking-field">Mobile Number</label>
            </div>
            <div className="col-2 p-2">
              <Input
                type="select"
                className="form-control lock-blocking-input"
                value={mobileCode}
                onChange={(e) => setMobileCode(e.target.value)}
              >
                <option>+91</option>
                <option>+60</option>
              </Input>
            </div>
            <div className="col-6 p-2 ">
              <input
                className="form-control lock-blocking-input"
                type="select"
                name="mobileNumber"
                value={blocking.mobileNumber}
                onChange={handleChange}
              />
              {errors.userMobileNumberError &&
                errors?.userMobileNumberError !== "null" && (
                  <Label className="error-text-red form-label-font-size">
                    {errors.userMobileNumberError}
                  </Label>
                )}
            </div>
          </div>
          <div className="col d-flex">
            <div className="col-3 p-2">
              <label className="lock-blocking-field">
                Reason
                <span className="edit-sum-label-color"> *</span>
              </label>
            </div>
            <Col className="col-8 p-2 ">
              <Input
                className="form-control lock-blocking-input"
                type="text"
                name="reason"
                onChange={handleChange}
                value={blocking.reason}
              ></Input>
              {errors.UserReasonError && errors?.UserReasonError !== "null" && (
                <Label className="error-text-red form-label-font-size">
                  {errors.UserReasonError}
                </Label>
              )}
            </Col>
          </div>
          <div className="col d-flex p-2">
            <div className="col-5 p-1 ms-6">
              <button
                className="notification-setup-save border-0 text-white ft-btn"
                onClick={onSubmit}
              >
                {"Submit"}
              </button>
              <button
                className="notification-setup-cancel border-0 ms-3 ft-cnl"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
            {errors.UserDeviceIdError && (
              <Label className="error-text-red form-label-font-size">
                {errors.UserDeviceIdError}
              </Label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewBlocking;
