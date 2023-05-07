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
  createRiskRatingData,
  resetCreateMessage,
} from "../../redux/action/RemitRiskRatingAction";

function AddRemitRiskRating() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [riskRatingData, setRiskRatingData] = useState({
    riskRating: "",
    lowRiskScale: 0,
    highRiskScale: 0,
  });

  const [riskRatingErr, setRiskRatingErr] = useState({
    riskRatingErr: "",
    lowRiskScaleErr: false,
    highRiskScaleErr: false,
  });

  const riskRatingCreateError: any = useSelector(
    (state: RootStateOrAny) => state.RemitRiskRatingReducer.getRiskRatingError
  );

  useEffect(() => {
    if (riskRatingCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 4000);
    }
  }, [riskRatingCreateError]);

  const validate = () => {
    let riskRating = customValidator(
      "agentGroupMandatoryFields",
      "Risk Rating",
      riskRatingData?.riskRating
    );

    if (
      !(
        riskRating === "null" &&
        !isNaN(riskRatingData.lowRiskScale) &&
        !isNaN(riskRatingData.highRiskScale)
      )
    ) {
      setRiskRatingErr({
        riskRatingErr: riskRating,
        lowRiskScaleErr: isNaN(riskRatingData.lowRiskScale) ? true : false,
        highRiskScaleErr: isNaN(riskRatingData.highRiskScale) ? true : false,
      });
      return false;
    } else {
      setRiskRatingErr({
        riskRatingErr: "",
        lowRiskScaleErr: false,
        highRiskScaleErr: false,
      });
      return true;
    }
  };

  const handle_RiskRatingonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRiskRatingData({
      ...riskRatingData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handle_onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskRatingData({ ...riskRatingData, riskRating: e.target.value });
  };

  const TransactionStatistic_onSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (validate()) {
      dispatch(createRiskRatingData(riskRatingData));
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
    <div className="AddRemitRiskRating">
      <CommonEditSummary
        name={"Add Risk Rating"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={riskRatingCreateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <form onSubmit={TransactionStatistic_onSubmit}>
            <div className="p-5">
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Risk Rating<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="no-border"
                    name="description"
                    onChange={handle_onChange}
                  />
                  {riskRatingErr?.riskRatingErr &&
                    riskRatingErr?.riskRatingErr !== "null" && (
                      <Label className="text-red">
                        {riskRatingErr?.riskRatingErr}
                      </Label>
                    )}
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Low Risk Scale<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="number"
                    className="no-border"
                    name="lowRiskScale"
                    value={riskRatingData?.lowRiskScale?.toString()}
                    onChange={handle_RiskRatingonChange}
                  />
                  {riskRatingErr?.lowRiskScaleErr && (
                    <Label className="text-red">
                      Low Risk Scale Can't be empty.
                    </Label>
                  )}
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    High Risk Scale<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="number"
                    className="no-border"
                    name="highRiskScale"
                    value={riskRatingData?.highRiskScale?.toString()}
                    onChange={handle_RiskRatingonChange}
                  />
                  {riskRatingErr?.highRiskScaleErr && (
                    <Label className="text-red">
                      High Risk Scale Can't be empty.
                    </Label>
                  )}
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

export default AddRemitRiskRating;
