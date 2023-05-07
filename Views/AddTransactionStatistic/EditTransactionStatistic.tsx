import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Input, Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { getRiskScale } from "../../redux/action/AmlRiskScaleAction";
import {
  resetEditMessage,
  updateTransactionStatistics,
} from "../../redux/action/AmlTransactionStatisticsAction";

function EditTransactionStatistic() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location: any = useLocation();
  const [apiMessage, setApiMessage] = useState(false);
  const [TransactionStatisticData, setTransactionStatisticData] = useState({
    id: location?.state?.value?.id,
    riskCategory: location?.state?.value?.riskCategory,
    riskFactor: location?.state?.value?.riskFactor,
    upperLimit: location?.state?.value?.upperLimit,
    score: location?.state?.value?.score,
  });

  const [TransactionStatisticErr, setTransactionStatisticErr] = useState({
    upperLimitErr: false,
    scoreErr: false,
  });

  const TransactionStatisticUpdateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlTransactionStatisticReducer.getTransactionStatisticsError
  );

  const amlRiskScaleData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.AmlRiskScaleReducer.getAllRiskScaleList
  );

  let riskScaleList = amlRiskScaleData?.data;

  const fetchRiskScaledata = useCallback(async () => {
    try {
      dispatch(getRiskScale());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchRiskScaledata();
  }, [fetchRiskScaledata]);

  useEffect(() => {
    if (TransactionStatisticUpdateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditMessage());
      }, 4000);
    }
  }, [TransactionStatisticUpdateError]);

  const validate = () => {
    if (
      !(
        !isNaN(TransactionStatisticData.upperLimit) &&
        !isNaN(TransactionStatisticData.score)
      )
    ) {
      setTransactionStatisticErr({
        upperLimitErr: isNaN(TransactionStatisticData.upperLimit)
          ? true
          : false,
        scoreErr: isNaN(TransactionStatisticData.score) ? true : false,
      });
      return false;
    } else {
      setTransactionStatisticErr({
        upperLimitErr: false,
        scoreErr: false,
      });
      return true;
    }
  };

  const handle_TransactionStatisticonChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionStatisticData({
      ...TransactionStatisticData,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const TransactionStatistic_onSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateTransactionStatistics(TransactionStatisticData));
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
    <div className="EditTransactionStatistic">
      <CommonEditSummary
        name={"Edit Transaction Statistics"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={TransactionStatisticUpdateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <form onSubmit={TransactionStatistic_onSubmit}>
            <div className="p-5">
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">Risk Category</label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="border-0 referenceData-readOnly"
                    readOnly={true}
                    value={TransactionStatisticData?.riskCategory}
                  />
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">Risk Factors</label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="text"
                    className="border-0 referenceData-readOnly"
                    readOnly={true}
                    value={TransactionStatisticData?.riskFactor}
                  />
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Upper Limit<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <CustomInput
                    type="number"
                    className="no-border btn--sizer"
                    name="upperLimit"
                    value={TransactionStatisticData?.upperLimit}
                    onChange={handle_TransactionStatisticonChange}
                  />
                  {TransactionStatisticErr?.upperLimitErr && (
                    <Label className="text-red">
                      Upper Limit Can't be empty.
                    </Label>
                  )}
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Score<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-1" style={{ marginLeft: "-20px" }}>
                  <Input
                    type="select"
                    className="no-border score-dropdown btn--sizer"
                    name="score"
                    onChange={handle_TransactionStatisticonChange}
                  >
                    <option selected hidden className="cursor">
                      {TransactionStatisticData?.score}
                    </option>
                    {riskScaleList?.map((e: any) => {
                      return <option key={e.id}>{e.riskScale}</option>;
                    })}
                  </Input>
                  {TransactionStatisticErr?.scoreErr && (
                    <Label className="text-red">Score Can't be empty.</Label>
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

export default EditTransactionStatistic;
