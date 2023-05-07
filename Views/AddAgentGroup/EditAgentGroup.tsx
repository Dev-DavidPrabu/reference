import React, { useEffect, useState } from "react";
import "./AddAgentGroup.scss";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomInput from "../../Components/UI/CustomInput";
import CustomButton from "../../Components/UI/CustomButton";
import { Input, Label } from "reactstrap";
import { useHistory, useLocation } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  resetEditMessage,
  updateAgentGroup,
} from "../../redux/action/AgentGroupAction";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function EditAgentGroup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [countryCode, setCountryCode] = useState(
    location?.state?.value?.mobileNumber.substring(0, 3)
  );
  const [mobileNum, setMobileNum] = useState(
    location?.state?.value?.mobileNumber.substring(3)
  );
  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  const [editAgentGroup, setEditAgentGroup] = useState({
    agentGroupName: location?.state?.value?.agentGroupName,
    agentGroupCode: location?.state?.value?.agentGroupCode,
    regNumber: location?.state?.value?.regNumber,
    mobileNumber: location?.state?.value?.mobileNumber,
    emailAddress: location?.state?.value?.emailAddress,
    regDate: location?.state?.value?.regDate,
    faxNo: location?.state?.value?.faxNo,
    gstNo: location?.state?.value?.gstNo,
  });

  const [editAgentGroupErrMessage, setEditAgentGroupErrMessage] = useState({
    agentGroupNameErrMessage: "",
    mobileNumberErrMessage: "",
    emailAddressErrMessage: "",
    faxNoErrMessage: "",
  });

  const agentGroupEditError: any = useSelector(
    (state: RootStateOrAny) => state.AgentGroupReducer.getAgentGroupEditError
  );

  useEffect(() => {
    if (agentGroupEditError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditMessage());
      }, 4000);
    }
  }, [agentGroupEditError]);

  useEffect(() => {
    if (mobileNo.length != 0) {
      setEditAgentGroup({ ...editAgentGroup, mobileNumber: mobileNo });
    }
  }, [mobileNo]);

  const validate = () => {
    let agentGroupName = customValidator(
      "agentGroupMandatoryFields",
      "Agent Group Name",
      editAgentGroup?.agentGroupName
    );
    let mobileNumber = customValidator(
      "mobileNumberAgetGroup",
      "Mobile Number",
      editAgentGroup?.mobileNumber
    );
    let emailAddress = customValidator(
      "emailAddressAgentGroup",
      "Email Address",
      editAgentGroup?.emailAddress
    );
    let faxNo = customValidator(
      "agentGroupMandatoryFields",
      "Fax No",
      editAgentGroup?.faxNo
    );

    if (
      !(
        agentGroupName === "null" &&
        mobileNumber === "null" &&
        emailAddress === "null" &&
        faxNo === "null"
      )
    ) {
      setEditAgentGroupErrMessage({
        agentGroupNameErrMessage: agentGroupName,
        mobileNumberErrMessage: mobileNumber,
        emailAddressErrMessage: emailAddress,
        faxNoErrMessage: faxNo,
      });
      return false;
    } else {
      setEditAgentGroupErrMessage({
        agentGroupNameErrMessage: "",
        mobileNumberErrMessage: "",
        emailAddressErrMessage: "",
        faxNoErrMessage: "",
      });
      return true;
    }
  };

  const handle_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditAgentGroup({ ...editAgentGroup, [e.target.name]: e.target.value });
  };

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
    setEditAgentGroup({ ...editAgentGroup, mobileNumber: mobileNo });
  };

  const closeMessage = () => {
    setApiMessage(false);
  };
  const handle_Cancel = () => {
    history.goBack();
    dispatch(resetEditMessage());
  };

  const agentGroupSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateAgentGroup(editAgentGroup));
    }
  };

  return (
    <div className="EditAgentGroup">
      <CommonEditSummary
        name={"Edit Agent Group"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={agentGroupEditError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          {location?.state?.value?.status == "ACTIVE" && (
            <div
              className="kyc-warningText m-2 me-5"
              style={{ fontSize: "14px" }}
            >
              {" "}
              ** Indicates mandatory fields.
            </div>
          )}
          <form onSubmit={agentGroupSubmit_handler}>
            <div className="p-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Agent Group Code<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="no-border def_fontsize referenceData-readOnly"
                    readOnly={true}
                    name="agentGroupCode"
                    value={editAgentGroup?.agentGroupCode}
                  />
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    Agent Group Name<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4">
                  <CustomInput
                    type="text"
                    className={
                      location?.state?.value?.status == "INACTIVE"
                        ? "no-border def_fontsize referenceData-readOnly"
                        : "no-border def_fontsize"
                    }
                    readOnly={
                      location?.state?.value?.status == "INACTIVE"
                        ? true
                        : false
                    }
                    name="agentGroupName"
                    value={editAgentGroup?.agentGroupName}
                    onChange={handle_onChange}
                  />
                  {editAgentGroupErrMessage?.agentGroupNameErrMessage &&
                    editAgentGroupErrMessage?.agentGroupNameErrMessage !==
                      "null" && (
                      <Label className="text-red">
                        {editAgentGroupErrMessage?.agentGroupNameErrMessage}
                      </Label>
                    )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Registration No<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="no-border def_fontsize referenceData-readOnly"
                    readOnly={true}
                    name="regNumber"
                    value={editAgentGroup?.regNumber}
                  />
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    Registration Date<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4">
                  <Input
                    type="text"
                    className="no-border def_fontsize referenceData-readOnly"
                    readOnly={true}
                    name="regDate"
                    value={editAgentGroup?.regDate}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Phone No<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4 d-flex" style={{ marginLeft: "-20px" }}>
                  <div className="col-2" style={{ marginRight: "30px" }}>
                    <Input
                      name="countryCode"
                      type="select"
                      className={
                        location?.state?.value?.status == "INACTIVE"
                          ? "no-border def_fontsize referenceData-readOnly"
                          : "no-border def_fontsize"
                      }
                      readOnly={
                        location?.state?.value?.status == "INACTIVE"
                          ? true
                          : false
                      }
                      value={countryCode}
                      style={{ minWidth: "100%" }}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option hidden>
                        {location?.state?.value?.mobileNumber.substring(0, 3)}
                      </option>
                      <option>+60</option>
                      <option>+65</option>
                      <option>+91</option>
                    </Input>
                  </div>
                  <div className="col-9">
                    <Input
                      name="mobileNo"
                      type="text"
                      value={mobileNum}
                      className={
                        location?.state?.value?.status == "INACTIVE"
                          ? "no-border def_fontsize referenceData-readOnly"
                          : "no-border def_fontsize"
                      }
                      readOnly={
                        location?.state?.value?.status == "INACTIVE"
                          ? true
                          : false
                      }
                      minLength={5}
                      maxLength={15}
                      onChange={handleChangeMobileNo}
                    ></Input>
                    {editAgentGroupErrMessage?.mobileNumberErrMessage &&
                      editAgentGroupErrMessage?.mobileNumberErrMessage !==
                        "null" && (
                        <Label className="text-red">
                          {editAgentGroupErrMessage?.mobileNumberErrMessage}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    Fax No<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4">
                  <CustomInput
                    type="text"
                    className={
                      location?.state?.value?.status == "INACTIVE"
                        ? "no-border def_fontsize referenceData-readOnly"
                        : "no-border def_fontsize"
                    }
                    readOnly={
                      location?.state?.value?.status == "INACTIVE"
                        ? true
                        : false
                    }
                    name="faxNo"
                    value={editAgentGroup?.faxNo}
                    onChange={handle_onChange}
                  />
                  {editAgentGroupErrMessage?.faxNoErrMessage &&
                    editAgentGroupErrMessage?.faxNoErrMessage !== "null" && (
                      <Label className="text-red">
                        {editAgentGroupErrMessage?.faxNoErrMessage}
                      </Label>
                    )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Email Address<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="email"
                    className={
                      location?.state?.value?.status == "INACTIVE"
                        ? "no-border def_fontsize referenceData-readOnly"
                        : "no-border def_fontsize"
                    }
                    readOnly={
                      location?.state?.value?.status == "INACTIVE"
                        ? true
                        : false
                    }
                    name="emailAddress"
                    value={editAgentGroup?.emailAddress}
                    onChange={handle_onChange}
                  />
                  {editAgentGroupErrMessage?.emailAddressErrMessage &&
                    editAgentGroupErrMessage?.emailAddressErrMessage !==
                      "null" && (
                      <Label className="text-red">
                        {editAgentGroupErrMessage?.emailAddressErrMessage}
                      </Label>
                    )}
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    GST No<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4">
                  <CustomInput
                    type="text"
                    className="no-border def_fontsize referenceData-readOnly"
                    readOnly={true}
                    name="gstNo"
                    value={editAgentGroup?.gstNo}
                  />
                </div>
              </div>
              {location?.state?.value?.status == "ACTIVE" && (
                <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                  <div className="col-2"></div>
                  <div className="col-4" style={{ marginLeft: "-20px" }}>
                    {/* <CustomButton
                      color="danger Reference-DefaultButton"
                      className="btn2"
                    >
                      Submit
                    </CustomButton>
                    <CustomButton
                      color="secondary referenceData-cancelButton"
                      className="btn2"
                      component={"payrollEnquiry"}
                      onClick={handle_Cancel}
                    >
                      Cancel
                    </CustomButton> */}
                  <button
                className="container-save border-0 text-white"
              >
                Submit
              </button>
              <button
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={handle_Cancel}
              >
                Cancel
              </button>
                  </div>
                  <div className="col-2 ps-4"></div>
                  <div className="col-4"></div>
                </div>
              )}
            </div>
          </form>
        </div>
      </CommonEditSummary>
    </div>
  );
}

export default EditAgentGroup;
