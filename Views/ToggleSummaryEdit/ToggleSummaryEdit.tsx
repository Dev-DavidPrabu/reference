import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Input } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";
import EditToggle from "../../Components/EditSummary/EditToggle/EditToggle";
import { updateToggleSummary } from "../../redux/action/ToggleSummaryAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import "./ToggleSummaryEdit.scss";

function ToggleSummaryEdit(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const checkBoxDefaultValue: boolean = location?.state.value.enabled;

  const [editToggleError, setEditToggleError] = useState(false);
  const [enable, setEnable] = useState(checkBoxDefaultValue);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [goBack, setGoBack] = useState("");
  const [editToggle, setEditToggle] = useState({
    id: location?.state.value.id,
    toggleId: location?.state.value.toggleId,
    toggleName: location?.state.value.toggleName,
    module: location?.state.value.module,
    toggleUsage: location?.state.value.toggleUsage,
    enabled: location?.state.value.enabled,
    statusMessage: location?.state.value.statusMessage,
  });

  const handleValidate = () => {
    if (
      editToggle.toggleUsage?.length > 200 ||
      editToggle.statusMessage?.length > 200
    ) {
      setEditToggleError(true);
      return false;
    } else {
      setEditToggleError(false);
      return true;
    }
  };
  const onChange_handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditToggle({ ...editToggle, [e.target.name]: e.target.value });
  };
  const onChange_switch = () => {
    setEnable(!enable);
    setEditToggle({ ...editToggle, enabled: !enable });
  };

  const updatedToggleSummary = useSelector(
    (state: RootStateOrAny) =>
      state.ToggleSummaryReducer?.getToggleSummaryUpdate
  );

  const updateToggle = useCallback(
    async (transactionData: any) => {
      try {
        dispatch(updateToggleSummary(transactionData));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (updatedToggleSummary) {
      setIsLoading(false);
      setGoBack("Updated");
      if (goBack === "Updated") {
        history.push({
          pathname: "/dashboard/Toggle-Summary",
        });
      }
    } else if (updatedToggleSummary?.error) {
      setErrorMessage(updatedToggleSummary?.error);
      setGoBack("");
    }
  }, [updatedToggleSummary]);

  const handleEditToggle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      setIsLoading(true);
      updateToggle(editToggle);
    }
  };

  const handle_Cancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  return (
    <>
      <CustomLoader isLoading={isLoading} size={50} />
      <CommonEditSummary name={props.name}>
        <form onSubmit={handleEditToggle_submit}>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={apiStatus}
              message={errorMessage}
              closeMessage={closeMessage}
            />
          )}
          <div className="setting2">
            <>
              <div className="setting6">
                <label className="createReference-label">
                  Toggle ID<span className="span-col">*</span>
                </label>
                <Input
                  type="text"
                  className="idtype-input"
                  style={{ width: "40%" }}
                  value={location?.state.value.toggleId}
                  readOnly={true}
                />
              </div>
            </>
            <>
              <div className="setting6">
                <label className="createReference-label">
                  Toggle Name<span className="span-col">*</span>
                </label>
                <Input
                  type="text"
                  className="idtype-input"
                  style={{ width: "40%" }}
                  readOnly={true}
                  value={location?.state.value.toggleName}
                />
              </div>
            </>

            <>
              <div className="setting6">
                <label className="createReference-label">
                  Module<span className="span-col">*</span>
                </label>
                <Input
                  type="text"
                  className="idtype-input"
                  style={{ width: "40%" }}
                  readOnly={true}
                  value={location?.state.value.module}
                />
              </div>
            </>

            <>
              <div className="setting6">
                <label className="createReference-label">
                  Toggle Usage<span className="span-col">*</span>
                </label>
                <Input
                  type="textarea"
                  name="toggleUsage"
                  data-testid="toggleUsage"
                  id="toggleUsage"
                  className="idtype-input"
                  defaultValue={location?.state.value.toggleUsage}
                  onChange={onChange_handler}
                ></Input>
              </div>
            </>
            <>
              <div className="setting6">
                <label className="createReference-label ms-1">
                  Enabled<span className="span-col">*</span>
                </label>
                <div style={{ marginLeft: "25px", color: "#C4C4C4" }}>
                  <EditToggle isOn={enable} handleToggle={onChange_switch} />
                </div>
              </div>
            </>
            <>
              <div className="setting6">
                <label className="createReference-label">
                  Status Message<span className="span-col">*</span>
                </label>
                <Input
                  type="textarea"
                  name="statusMessage"
                  data-testid="statusMessage"
                  id="statusMessage"
                  defaultValue={location?.state.value.statusMessage}
                  className="idtype-input"
                  onChange={onChange_handler}
                ></Input>
              </div>
            </>
            {editToggleError ? (
              <div
                style={{ color: "red", marginTop: "5px", textAlign: "center" }}
              >
                *Please fill Required Fields. And no Special Characters allowed
              </div>
            ) : null}

            <div className="btnSave">
              {/* <CustomButton color="danger" className="btn2 btn--block">
                Save
              </CustomButton>
              <CustomButton
                className="btn2 btn--block "
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
          </div>
        </form>
      </CommonEditSummary>
    </>
  );
}

export default ToggleSummaryEdit;
