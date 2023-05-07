import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { customValidator } from "../../Constants/Validation";
import {
  updateRiskScale,
  resetEditMessage,
} from "../../redux/action/AmlRiskScaleAction";
import "./AddAmlRiskScale.scss";

function EditAmlRiskScale() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [riskScaleData, setRiskScaleData] = useState({
    id: location?.state?.value?.id,
    riskScale: location?.state?.value?.riskScale,
    description: location?.state?.value?.description,
    highRisk: location?.state?.value?.highRisk,
  });

  const [riskScaleErr, setRiskScaleErr] = useState({
    riskScaleErr: false,
    descriptionErr: "",
  });

  const riskScaleUpdateError: any = useSelector(
    (state: RootStateOrAny) => state.AmlRiskScaleReducer.getRiskEditError
  );

  useEffect(() => {
    if (riskScaleUpdateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditMessage());
      }, 4000);
    }
  }, [riskScaleUpdateError]);

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
      dispatch(updateRiskScale(riskScaleData));
    }
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const handle_Cancel = () => {
    history.goBack();
    dispatch(resetEditMessage());
  };

  return (
    <div className="AddAmlRiskScale">
      <CommonEditSummary
        name={"Edit Risk Score"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={riskScaleUpdateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <form onSubmit={riskScale_onSubmit}>
            <div className="p-5">
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Risk Score<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="number"
                    className="no-border btn--sizer"
                    name="riskScale"
                    value={riskScaleData?.riskScale}
                    onChange={handle_RiskScaleonChange}
                  />
                  {riskScaleErr?.riskScaleErr && (
                    <Label className="text-red">
                      Risk Score Can't be empty.
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
                    className="no-border btn--sizer"
                    name="description"
                    value={riskScaleData?.description}
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

              <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                <div className="col-2"></div>
                <div className="col-4" style={{ marginLeft: "-27px" }}>
                  {/* <CustomButton
                    color="danger Reference-DefaultButton"
                    className="btn2"
                  >
                    Save
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
                Save
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

export default EditAmlRiskScale;
