import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { customValidator } from "../../Constants/Validation";
import {
  createRiskScaleData,
  resetCreateMessage,
} from "../../redux/action/AmlRiskScaleAction";
import "./AddAmlRiskScale.scss";

function AddAmlRiskScale() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [riskScaleData, setRiskScaleData] = useState({
    riskScale: 0,
    description: "",
    highRisk: false,
  });

  const [riskScaleErr, setRiskScaleErr] = useState({
    riskScaleErr: false,
    descriptionErr: "",
  });

  const riskScaleCreateError: any = useSelector(
    (state: RootStateOrAny) => state.AmlRiskScaleReducer.getRiskCreateError
  );

  useEffect(() => {
    if (riskScaleCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 4000);
    }
  }, [riskScaleCreateError]);

  const validate = () => {
    let description = customValidator(
      "agentGroupMandatoryFields",
      "Description",
      riskScaleData?.description
    );

    if (!(description === "null" && !isNaN(riskScaleData.riskScale))) {
      setRiskScaleErr({
        riskScaleErr: isNaN(riskScaleData.riskScale) ? true : false,
        descriptionErr: description,
      });
      return false;
    } else {
      setRiskScaleErr({
        riskScaleErr: false,
        descriptionErr: "",
      });
      return true;
    }
  };

  const handle_RiskScaleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskScaleData({ ...riskScaleData, riskScale: parseInt(e.target.value) });
  };

  const handle_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskScaleData({ ...riskScaleData, description: e.target.value });
  };

  const riskScale_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createRiskScaleData(riskScaleData));
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const handle_Cancel = () => {
    history.goBack();
    dispatch(resetCreateMessage());
  };

  return (
    <div className="AddAmlRiskScale">
      <CommonEditSummary
        name={"Add Risk Scale"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={riskScaleCreateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <form onSubmit={riskScale_onSubmit}>
            <div className="p-5">
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Risk Scale<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="number"
                    className="no-border"
                    name="riskScale"
                    value={riskScaleData.riskScale.toString()}
                    onChange={handle_RiskScaleonChange}
                  />
                  {riskScaleErr?.riskScaleErr && (
                    <Label className="text-red">
                      Risk Scale Can't be empty.
                    </Label>
                  )}
                </div>
              </div>

              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Description<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="no-border"
                    name="description"
                    onChange={handle_onChange}
                  />
                  {riskScaleErr?.descriptionErr &&
                    riskScaleErr?.descriptionErr !== "null" && (
                      <Label className="text-red">
                        {riskScaleErr?.descriptionErr}
                      </Label>
                    )}
                </div>
              </div>

              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">High Risk</label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <Switch
                    className="toggle-switch"
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    checked={riskScaleData.highRisk}
                    onChange={() =>
                      setRiskScaleData({
                        ...riskScaleData,
                        highRisk: !riskScaleData.highRisk,
                      })
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                <div className="col-2"></div>
                <div className="col-4" style={{ marginLeft: "-27px" }}>
                  <CustomButton
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
                  </CustomButton>
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

export default AddAmlRiskScale;
