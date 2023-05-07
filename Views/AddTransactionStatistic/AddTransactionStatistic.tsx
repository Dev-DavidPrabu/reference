import React, { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input, Label } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { customValidator } from "../../Constants/Validation";
import Select from "react-select";
import {
  createTransactionStatisticData,
  getRiskFactorCategoryList,
  resetCreateMessage,
} from "../../redux/action/AmlTransactionStatisticsAction";
import { getRiskScale } from "../../redux/action/AmlRiskScaleAction";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import "./AddTransactionStatistic.scss";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function AddTransactionStatistic() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiMessage, setApiMessage] = useState(false);
  const [isRiskFactorDisabled, setIsRiskFactorDisabled] = useState(true);
  let selectInputRef: any = null;
  const [riskCategory, setRiskCategory] = useState("");
  const [TransactionStatisticData, setTransactionStatisticData] = useState({
    riskCategory: "",
    riskFactor: "",
    upperLimit: 0,
    score: "",
  });

  const [TransactionStatisticErr, setTransactionStatisticErr] = useState({
    riskCategoryErr: "",
    riskFactorErr: "",
    upperLimitErr: false,
    scoreErr: false,
  });

  const TransactionStatisticCreateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlTransactionStatisticReducer.getTransactionStatisticsError
  );

  const riskFactorAndCategoryList: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlTransactionStatisticReducer.getRiskFactorCategory
  );

  const riskFactor_Category: any = riskFactorAndCategoryList?.data?.filter(
    (value: any, index: any, self: any) =>
      index ===
      self.findIndex((t: any) => t.riskCategory === value.riskCategory)
  );

  const riskCategoryList: any = riskFactor_Category?.map((option: any) => {
    return {
      label: option.riskCategory,
      value: option.riskCategory,
      name: "riskCategory",
    };
  });

  let riskFactor: any = [];

  if (riskCategory.length > 0) {
    riskFactor = riskFactorAndCategoryList?.data?.filter(
      (option: any, index: any, self: any) =>
        riskCategory === option.riskCategory &&
        index === self.findIndex((t: any) => t.riskFactor === option.riskFactor)
    );
  }

  const riskFactorList: any = riskFactor?.map((option: any) => {
    return {
      label: option.riskFactor,
      value: option.riskFactor,
      name: "riskFactor",
    };
  });

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
    if (riskFactorList?.length > 0) {
      setIsRiskFactorDisabled(false);
    }
  }, [riskFactorList]);

  useEffect(() => {
    fetchRiskScaledata();
  }, [fetchRiskScaledata]);

  const fetchriskFactorAndCategory = useCallback(() => {
    try {
      dispatch(getRiskFactorCategoryList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchriskFactorAndCategory();
  }, [fetchriskFactorAndCategory]);

  useEffect(() => {
    if (TransactionStatisticCreateError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 4000);
    }
  }, [TransactionStatisticCreateError]);

  const validate = () => {
    let riskCategory = customValidator(
      "agentGroupMandatoryFields",
      "Risk Category",
      TransactionStatisticData?.riskCategory
    );

    let riskFactor = customValidator(
      "agentGroupMandatoryFields",
      "Risk Factor",
      TransactionStatisticData?.riskFactor
    );

    if (
      !(
        riskCategory === "null" &&
        riskFactor === "null" &&
        !isNaN(TransactionStatisticData.upperLimit) &&
        !isNaN(parseInt(TransactionStatisticData.score))
      )
    ) {
      setTransactionStatisticErr({
        riskCategoryErr: riskCategory,
        riskFactorErr: riskFactor,
        upperLimitErr: isNaN(TransactionStatisticData.upperLimit)
          ? true
          : false,
        scoreErr: isNaN(parseInt(TransactionStatisticData.score))
          ? true
          : false,
      });
      return false;
    } else {
      setTransactionStatisticErr({
        riskCategoryErr: "",
        riskFactorErr: "",
        upperLimitErr: false,
        scoreErr: false,
      });
      return true;
    }
  };

  const riskOnChangehandler = (selectOption: any) => {
    selectInputRef.clearValue();
    setIsRiskFactorDisabled(false);
    setRiskCategory(selectOption?.value);
    setTransactionStatisticData({
      ...TransactionStatisticData,
      riskCategory: selectOption?.value,
      riskFactor: "",
    });
  };

  const riskFactorOnChangehandler = (selectOption: any) => {
    setTransactionStatisticData({
      ...TransactionStatisticData,
      riskFactor: selectOption?.value,
    });
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
      dispatch(createTransactionStatisticData(TransactionStatisticData));
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
    <div className="AddTransactionStatistic">
      <CommonEditSummary
        name={"Add Transaction Statistics"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handle_Cancel}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={TransactionStatisticCreateError?.message}
            closeMessage={closeMessage}
          />
        )}
        <div className="pt-4">
          <form onSubmit={TransactionStatistic_onSubmit}>
            <div className="p-5">
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Risk Category<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <Select
                    options={riskCategoryList}
                    styles={customSelectStyles}
                    onChange={(selectOptions: any) =>
                      riskOnChangehandler(selectOptions)
                    }
                  />
                  {TransactionStatisticErr?.riskCategoryErr &&
                    TransactionStatisticErr?.riskCategoryErr !== "null" && (
                      <Label className="text-red">
                        {TransactionStatisticErr?.riskCategoryErr}
                      </Label>
                    )}
                </div>
              </div>
              <div className="d-flex  align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    Risk Factors<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <Select
                    options={riskFactorList}
                    styles={customSelectStyles}
                    ref={(ref) => (selectInputRef = ref)}
                    isDisabled={isRiskFactorDisabled}
                    onChange={(selectOptions: any) =>
                      riskFactorOnChangehandler(selectOptions)
                    }
                  />
                  {TransactionStatisticErr?.riskFactorErr &&
                    TransactionStatisticErr?.riskFactorErr !== "null" && (
                      <Label className="text-red">
                        {TransactionStatisticErr?.riskFactorErr}
                      </Label>
                    )}
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
                    value={TransactionStatisticData?.upperLimit?.toString()}
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
                <div className="col-4" style={{ marginLeft: "-20px" }}>
                  <Input
                    type="select"
                    className="no-border score-dropdown btn--sizer"
                    name="score"
                    onChange={handle_TransactionStatisticonChange}
                  >
                    <option selected hidden className="cursor">
                      Select
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
export default AddTransactionStatistic;
