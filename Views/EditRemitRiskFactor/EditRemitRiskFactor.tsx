import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Input, Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import {
  resetEditMessage,
  updateRiskFactor,
} from "../../redux/action/RemitRiskFactorAction";

function EditRemitRiskFactor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [riskFactorData, setRiskFactorData] = useState({
    id: location?.state?.value?.id,
    riskCategory: location?.state?.value?.riskCategory,
    riskFactor: location?.state?.value?.riskFactor,
    details: location?.state?.value?.details,
    transactionScore: location?.state?.value?.transactionScore,
    statusCode: location?.state?.value?.statusCode,
  });

  const [riskFactorErr, setRiskFactorErr] = useState({
    transactionScoreErr: false,
    statusCodeErr: false,
  });

  const riskFactorUpdateError: any = useSelector(
    (state: RootStateOrAny) => state.RemitRiskFactorReducer.getRiskFactorError
  );

  useEffect(() => {
    if (riskFactorUpdateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditMessage());
      }, 4000);
    }
  }, [riskFactorUpdateError]);

  const validate = () => {
    if (isNaN(riskFactorData.transactionScore)) {
      setRiskFactorErr({
        transactionScoreErr: true,
        statusCodeErr: false,
      });
      return false;
    } else if (riskFactorData?.statusCode?.length === 0) {
      setRiskFactorErr({
        transactionScoreErr: false,
        statusCodeErr: true,
      });
    } else {
      setRiskFactorErr({
        transactionScoreErr: false,
        statusCodeErr: false,
      });
      return true;
    }
  };

  const handle_riskFactoronChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRiskFactorData({
      ...riskFactorData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handle_riskFactorStatusonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRiskFactorData({ ...riskFactorData, [e.target.name]: e.target.value });
  };

  const riskFactor_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateRiskFactor(riskFactorData));
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
    <div className="EditRemitRiskFactor">
      <CommonEditSummary
        name={"Edit Risk Factor"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={riskFactorUpdateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <form onSubmit={riskFactor_onSubmit}>
            <div className="p-5">
              <div className="d-flex  align-items-center mb-4">
                <div className="col-3">
                  <label className="KYCViewCustomer-label">Risk Category</label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="border-0 referenceData-readOnly"
                    readOnly={true}
                    value={riskFactorData?.riskCategory}
                  />
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-3">
                  <label className="KYCViewCustomer-label">Risk Factors</label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="border-0 referenceData-readOnly"
                    readOnly={true}
                    value={riskFactorData?.riskFactor}
                  />
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-3">
                  <label className="KYCViewCustomer-label">Details</label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="border-0 referenceData-readOnly"
                    readOnly={true}
                    value={riskFactorData?.details}
                  />
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-3">
                  <label className="KYCViewCustomer-label">
                    Transaction Score<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="number"
                    className="no-border btn--sizer"
                    name="transactionScore"
                    value={riskFactorData?.transactionScore}
                    onChange={handle_riskFactoronChange}
                  />
                  {riskFactorErr?.transactionScoreErr && (
                    <Label className="text-red">
                      Transaction Score Can't be empty.
                    </Label>
                  )}
                </div>
              </div>

              <div className="d-flex  align-items-center mb-4">
                <div className="col-3">
                  <label className="KYCViewCustomer-label">
                    Status<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <Input
                    type="select"
                    className="no-border score-dropdown btn--sizer"
                    name="statusCode"
                    onChange={handle_riskFactorStatusonChange}
                  >
                    <option selected hidden className="cursor">
                      {riskFactorData?.statusCode}
                    </option>
                    <option>ACTIVE</option>
                    <option>INACTIVE</option>
                  </Input>
                  {riskFactorErr?.statusCodeErr && (
                    <Label className="text-red">Status Can't be empty.</Label>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                <div className="col-3"></div>
                <div className="col-4" style={{ marginLeft: "-27px" }}>
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

export default EditRemitRiskFactor;
