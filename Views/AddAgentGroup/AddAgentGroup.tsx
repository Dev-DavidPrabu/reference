import React, { useEffect, useState } from "react";
import "./AddAgentGroup.scss";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomInput from "../../Components/UI/CustomInput";
import CustomButton from "../../Components/UI/CustomButton";
import { Input, Label } from "reactstrap";
import { useHistory } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  createAgentGroup,
  resetCreateMessage,
} from "../../redux/action/AgentGroupAction";
import { customValidator } from "../../Constants/Validation";
import moment from "moment";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function AddAgentGroup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNum, setMobileNum] = useState("");
  let mobileNo = "+" + countryCode.slice(1) + mobileNum;

  const [addAgentGroup, setAddAgentGroup] = useState({
    agentGroupName: "",
    agentGroupCode: "",
    regNumber: "",
    mobileNumber: "",
    emailAddress: "",
    regDate: "",
    faxNo: "",
    gstNo: "",
  });

  const [addAgentGroupErrMessage, setAddAgentGroupErrMessage] = useState({
    agentGroupNameErrMessage: "",
    agentGroupCodeErrMessage: "",
    regNumberErrMessage: "",
    mobileNumberErrMessage: "",
    regDateErrMessage: "",
    // emailAddressErrMessage: "",
    // faxNoErrMessage: "",
    // gstNoErrMessage: "",
  });

  const agentGroupCreateError: any = useSelector(
    (state: RootStateOrAny) => state.AgentGroupReducer.getAgentGroupCreateError
  );

  useEffect(() => {
    if (agentGroupCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 4000);
    }
  }, [agentGroupCreateError]);

  useEffect(() => {
    if (mobileNo.length !== 0) {
      setAddAgentGroup({ ...addAgentGroup, mobileNumber: mobileNo });
    }
  }, [mobileNo]);

  const validate = () => {
    let agentGroupName = customValidator(
      "agentGroupMandatoryFields",
      "Agent Group Name",
      addAgentGroup?.agentGroupName
    );
    let agentGroupCode = customValidator(
      "agentGroupMandatoryFields",
      "Agent Group Code",
      addAgentGroup?.agentGroupCode
    );
    let regNumber = customValidator(
      "agentGroupMandatoryFields",
      "Registration Number",
      addAgentGroup?.regNumber
    );
    let mobileNumber = customValidator(
      "mobileNumberAgetGroup",
      "Mobile Number",
      addAgentGroup?.mobileNumber
    );

    let regDate = customValidator(
      "agentGroupMandatoryFields",
      "Registration Date",
      addAgentGroup?.regDate
    );

    if (
      !(
        agentGroupName === "null" &&
        agentGroupCode === "null" &&
        regNumber === "null" &&
        mobileNumber === "null" &&
        regDate === "null"
      )
    ) {
      setAddAgentGroupErrMessage({
        agentGroupNameErrMessage: agentGroupName,
        agentGroupCodeErrMessage: agentGroupCode,
        regNumberErrMessage: regNumber,
        mobileNumberErrMessage: mobileNumber,
        regDateErrMessage: regDate,
      });
      return false;
    } else {
      setAddAgentGroupErrMessage({
        agentGroupNameErrMessage: "",
        agentGroupCodeErrMessage: "",
        regNumberErrMessage: "",
        mobileNumberErrMessage: "",
        regDateErrMessage: "",
      });
      return true;
    }
  };

  const handle_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddAgentGroup({ ...addAgentGroup, [e.target.name]: e.target.value });
  };

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
    setAddAgentGroup({ ...addAgentGroup, mobileNumber: mobileNo });
  };

  const closeMessage = () => {
    setApiMessage(false);
  };
  const handle_Cancel = () => {
    history.goBack();
    dispatch(resetCreateMessage());
  };

  const agentGroupSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createAgentGroup(addAgentGroup));
    }
  };

  return (
    <div className="AddAgentGroup">
      <CommonEditSummary
        name={"Add Agent Group"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={agentGroupCreateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <div
            className="kyc-warningText m-2 me-5"
            style={{ fontSize: "14px" }}
          >
            {" "}
            ** Indicates mandatory fields.
          </div>
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
                    className="no-border"
                    name="agentGroupCode"
                    onChange={handle_onChange}
                  />
                  {addAgentGroupErrMessage?.agentGroupCodeErrMessage &&
                    addAgentGroupErrMessage?.agentGroupCodeErrMessage !==
                      "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.agentGroupCodeErrMessage}
                      </Label>
                    )}
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    Agent Group Name<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4">
                  <CustomInput
                    type="text"
                    className="no-border"
                    name="agentGroupName"
                    onChange={handle_onChange}
                  />
                  {addAgentGroupErrMessage?.agentGroupNameErrMessage &&
                    addAgentGroupErrMessage?.agentGroupNameErrMessage !==
                      "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.agentGroupNameErrMessage}
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
                    className="no-border"
                    name="regNumber"
                    onChange={handle_onChange}
                  />
                  {addAgentGroupErrMessage?.regNumberErrMessage &&
                    addAgentGroupErrMessage?.regNumberErrMessage !== "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.regNumberErrMessage}
                      </Label>
                    )}
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    Registration Date<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4">
                  <input
                    type="date"
                    className="no-border"
                    name="regDate"
                    max={moment().format("YYYY-MM-DD")}
                    onChange={handle_onChange}
                  />
                  {addAgentGroupErrMessage?.regDateErrMessage &&
                    addAgentGroupErrMessage?.regDateErrMessage !== "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.regDateErrMessage}
                      </Label>
                    )}
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
                      className="no-border btn--sizer"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
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
                      className="no-border"
                      maxLength={15}
                      minLength={5}
                      onChange={handleChangeMobileNo}
                    ></Input>
                    {addAgentGroupErrMessage?.mobileNumberErrMessage &&
                      addAgentGroupErrMessage?.mobileNumberErrMessage !==
                        "null" && (
                        <Label className="text-red">
                          {addAgentGroupErrMessage?.mobileNumberErrMessage}
                        </Label>
                      )}
                  </div>
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    Fax No
                    {/* <span className="span-col">*</span> */}
                  </label>
                </div>
                <div className="col-4">
                  <CustomInput
                    type="text"
                    className="no-border"
                    name="faxNo"
                    onChange={handle_onChange}
                  />
                  {/* {addAgentGroupErrMessage?.faxNoErrMessage &&
                    addAgentGroupErrMessage?.faxNoErrMessage !== "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.faxNoErrMessage}
                      </Label>
                    )} */}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Email Address
                    {/* <span className="span-col">*</span> */}
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="email"
                    className="no-border"
                    name="emailAddress"
                    onChange={handle_onChange}
                  />
                  {/* {addAgentGroupErrMessage?.emailAddressErrMessage &&
                    addAgentGroupErrMessage?.emailAddressErrMessage !==
                      "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.emailAddressErrMessage}
                      </Label>
                    )} */}
                </div>
                <div className="col-2 ps-4">
                  <label className="KYCViewCustomer-label">
                    GST No
                    {/* <span className="span-col">*</span> */}
                  </label>
                </div>
                <div className="col-4">
                  <CustomInput
                    type="text"
                    className="no-border"
                    name="gstNo"
                    onChange={handle_onChange}
                  />
                  {/* {addAgentGroupErrMessage?.gstNoErrMessage &&
                    addAgentGroupErrMessage?.gstNoErrMessage !== "null" && (
                      <Label className="text-red">
                        {addAgentGroupErrMessage?.gstNoErrMessage}
                      </Label>
                    )} */}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                <div className="col-2"></div>
                {/* <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomButton
                    color="danger Reference-DefaultButton"
                    className="btn2"
                  >
                    Submit
                  </CustomButton>
                  <CustomButton
                    color="secondary referenceData-cancelButton"
                    className=""
                    component={"payrollEnquiry"}
                    onClick={handle_Cancel}
                  >
                    Cancel
                  </CustomButton>
                </div> */}
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <button className="container-save border-0 text-white">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="container-cancel border-0 ms-3 form-label-font-size"
                    onClick={handle_Cancel}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-2 ps-4"></div>
                <div className="col-4"></div>
              </div>
            </div>
          </form>
        </div>
      </CommonEditSummary>
    </div>
  );
}

export default AddAgentGroup;
