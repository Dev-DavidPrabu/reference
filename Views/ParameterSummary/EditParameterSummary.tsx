import "./EditParameterSummary.scss";
import { useCallback, useEffect, useState } from "react";
import { updateParameterData } from "../../redux/action/ParameterSummaryAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import { useHistory } from "react-router";
import { Switch } from "antd";
import CustomInput from "../../Components/UI/CustomInput";
import { Input } from "reactstrap";

const EditParameterSummary = (props: any) => {
  const [valueView, setValueView] = useState(props?.selectedInfo?.conditions);
  const history = useHistory();
  const dispatch = useDispatch();
  const [summaryEditDetails, setsummaryEditDetails] = useState({
    parameterId: "",
    parameterName: "",
    module: "",
    parameterUsage: "",
    enabled: "",
    operand: "",
    conditions: "",
    value1: "",
    value2: "",
    id: "",
    notification: "",
  });
  let condition = ["=", ">", "<", ">=", "<=", "!=", "BETWEEN", "IN"];
  const [updatedDetails, setUpdatedDetails] = useState({
    parameterName: "",
    module: "",
    parameterUsage: "",
    enabled: "",
    operand: "",
    conditions: "",
    value1: "",
    value2: "",
    notification: "",
  });

  useEffect(() => {
    setsummaryEditDetails(props?.selectedInfo);
  }, [props?.selectedInfo]);
  const parameterUpdateData = useSelector(
    (state: RootStateOrAny) =>
      state.ParameterSummaryReducer.updateParameterResponse
  );

  useEffect(() => {
    if (parameterUpdateData) {
      if (parameterUpdateData?.data) {
        history.push({
          pathname: "/dashboard/parameter-summary",
          state: true,
        });
      }
    }
  }, [parameterUpdateData]);

  const cancelEvent = () => {
    props.cancel();
  };
  const handleChange = async (e: any) => {
    if (e.target.name === "conditions") {
      setValueView(e.target.value);
    }
    setsummaryEditDetails({
      ...summaryEditDetails,
      [e.target.name]: e.target.value,
    });
  };

  const updateParameterDetails = useCallback(
    async (newParameterInfo: any, id: string) => {
      try {
        dispatch(updateParameterData(newParameterInfo, id));
      } catch (err) {}
    },
    [dispatch]
  );

  const onSubmit = () => {
    updatedDetails.parameterName = summaryEditDetails.parameterName;
    updatedDetails.module = summaryEditDetails.module;
    updatedDetails.parameterUsage = summaryEditDetails.parameterUsage;
    updatedDetails.enabled = summaryEditDetails.enabled;
    updatedDetails.operand = summaryEditDetails.operand;
    updatedDetails.conditions = summaryEditDetails.conditions;
    updatedDetails.value1 = summaryEditDetails.value1;
    updatedDetails.notification = summaryEditDetails.notification;
    updateParameterDetails(updatedDetails, summaryEditDetails.parameterId);
  };

  return (
    <div className="p-4">
      <div className="p-3 d-flex justify-content-between align-items-center mb-4">
        <div className="col-10 d-flex">
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">Parameter ID</label>
            </div>
            <div className="col me-2">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={summaryEditDetails.parameterId}
                style={{
                  background: "#CFCFCF",
                  width: "91%",
                  minWidth: "150px",
                  borderRadius: "0px",
                  height: "35px",
                }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">Parameter Name</label>
            </div>
            <div className="col me-2">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={summaryEditDetails.parameterName}
                style={{
                  background: "#CFCFCF",
                  width: "91%",
                  minWidth: "150px",
                  borderRadius: "0px",
                  height: "35px",
                }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">Module</label>
            </div>
            <div className="col me-2">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={summaryEditDetails.module}
                style={{
                  background: "#CFCFCF",
                  width: "91%",
                  minWidth: "150px",
                  borderRadius: "0px",
                  height: "35px",
                }}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 d-flex justify-content-between align-items-center mb-4">
        <div className="col-10 d-flex">
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">Trigger ID</label>
            </div>
            <div className="col me-2">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value="User Action"
                style={{
                  background: "#CFCFCF",
                  width: "91%",
                  minWidth: "150px",
                  borderRadius: "0px",
                  height: "35px",
                }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">
                Usage<span className="edit-sum-label-color">*</span>
              </label>
            </div>
            <div className="col me-2">
              <CustomInput
                type="text"
                className="no-border remit_feesAndCharges customerEdit-inputBox"
                value={summaryEditDetails.parameterUsage}
                onChange={handleChange}
                name="parameterUsage"
              />
            </div>
          </div>
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">
                Enabled<span className="edit-sum-label-color">*</span>
              </label>
            </div>
            <div className="col me-2">
              <Switch
                className="toggle-switch"
                checkedChildren="Yes"
                unCheckedChildren="NO"
                checked={summaryEditDetails?.enabled === "Y" ? true : false}
                onChange={() =>
                  setsummaryEditDetails({
                    ...summaryEditDetails,
                    enabled: summaryEditDetails?.enabled === "Y" ? "N" : "Y",
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 d-flex justify-content-between align-items-center mb-4">
        <div className="col-10 d-flex">
          <div className="col-4 me-2">
            <div className="col">
              <label className="KYCViewCustomer-label">Operand</label>
            </div>
            <div className="col me-2">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={summaryEditDetails.operand}
                style={{
                  background: "#CFCFCF",
                  width: "91%",
                  minWidth: "150px",
                  borderRadius: "0px",
                  height: "35px",
                }}
                readOnly={true}
              />
            </div>
          </div>

          {valueView !== "BETWEEN" ? (
            <>
              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Conditions<span className="edit-sum-label-color">*</span>
                  </label>
                </div>
                <div className="col me-2">
                  <Input
                    type="select"
                    className="no-border score-dropdown remit_feesAndCharges"
                    value={summaryEditDetails.conditions}
                    name="conditions"
                    onChange={handleChange}
                    style={{
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                  >
                    {condition.map((items: any) => (
                      <option value={items}>{items}</option>
                    ))}
                  </Input>
                </div>
              </div>
              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Value<span className="edit-sum-label-color">*</span>
                  </label>
                </div>
                <div className="col me-2">
                  <CustomInput
                    type="text"
                    className="no-border remit_feesAndCharges customerEdit-inputBox"
                    value={summaryEditDetails.value1}
                    name="value1"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Conditions<span className="edit-sum-label-color">*</span>
                  </label>
                </div>
                <div className="col me-2">
                  <Input
                    type="select"
                    className="no-border score-dropdown remit_feesAndCharges"
                    value={summaryEditDetails.conditions}
                    name="conditions"
                    onChange={handleChange}
                    style={{
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                  >
                    {condition.map((items: any) => (
                      <option value={items}>{items}</option>
                    ))}
                  </Input>
                </div>
              </div>
              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Value 1<span className="edit-sum-label-color">*</span>
                  </label>
                </div>
                <div className="col me-2">
                  <CustomInput
                    type="text"
                    className="no-border remit_feesAndCharges customerEdit-inputBox"
                    value={summaryEditDetails.value1}
                    name="value1"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Value 2<span className="edit-sum-label-color">*</span>
                  </label>
                </div>
                <div className="col me-2">
                  <CustomInput
                    type="text"
                    className="no-border remit_feesAndCharges customerEdit-inputBox"
                    value={summaryEditDetails.value2}
                    name="value2"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="px-3">
        <SubmitCancelButton
          button={"Submit"}
          secondButton={"Cancel"}
          onSubmit={() => onSubmit()}
          onCancel={() => cancelEvent()}
        />
      </div>
    </div>
  );
};
export default EditParameterSummary;
