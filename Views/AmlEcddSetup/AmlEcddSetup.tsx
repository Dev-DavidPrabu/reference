import { Switch } from "antd";
import "./AmlEcddSetup.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Input } from "reactstrap";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  createEcddSetupData,
  getEcddList,
  resetCreateMessage,
} from "../../redux/action/AmlEcddSetupAction";

function AmlEcddSetup() {
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [apiErrMessage, setApiErrMessage] = useState(false);
  const [ecddSetupData, setEcddSetupData] = useState({
    id: "",
    hri: false,
    hrc: false,
    peps: false,
    negativeList: false,
  });

  const ecddSetupListData: any = useSelector(
    (state: RootStateOrAny) => state.AmlEcddSetupReducer.getAllEcddList
  );

  const createEcddResponse: any = useSelector(
    (state: RootStateOrAny) => state.AmlEcddSetupReducer.getEcddCreateError
  );
  const fetchEcddList = useCallback(async () => {
    try {
      dispatch(getEcddList());
    } catch (err) { }
  }, [dispatch]);

  useEffect(() => {
    fetchEcddList();
  }, [fetchEcddList]);

  useEffect(() => {
    if (ecddSetupListData?.data) {
      setEcddSetupData({
        id: ecddList?.id,
        hri: ecddList?.hri,
        hrc: ecddList?.hrc,
        peps: ecddList?.peps,
        negativeList: ecddList?.negativeList,
      });
    }
  }, [ecddSetupListData]);

  useEffect(() => {
    if (createEcddResponse?.data) {
      setApiMessage(true);
      setApiErrMessage(false);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
        window.location.reload();
      }, 3000);
    } else if (createEcddResponse?.message) {
      setApiErrMessage(true);
      setApiMessage(false);
      setTimeout(function () {
        setApiErrMessage(false);
        dispatch(resetCreateMessage());
        window.location.reload();
      }, 3000);
    }
  }, [createEcddResponse]);

  const ecddList = ecddSetupListData?.data?.[0];

  const ecddSetup_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createEcddSetupData(ecddSetupData));
  };

  const handle_Cancel = () => {
    window.location.reload();
  };

  return (
    <div className="AmlEcddSetup">
      <CommonEditSummary
        name={"ECDD Setup"}
        style={{ maxHeight: "fit-content" }}
        backButton={false}
        formData={true}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={true}
            message={"Updated Successfully"}
            closeMessage={() => setApiMessage(false)}
          />
        )}
        {apiErrMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={createEcddResponse?.message}
            closeMessage={() => setApiErrMessage(false)}
          />
        )}
        <div className="pt-4">
          <form onSubmit={ecddSetup_onSubmit}>
            <div className="p-5">
              <div className="d-flex col justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">
                    HRI <br />
                    (High Risk Individual)
                  </label>
                </div>
                <div className="col-3">
                  <Switch
                    className="toggle-switch"
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    checked={ecddSetupData?.hri}
                    onChange={() =>
                      setEcddSetupData({
                        ...ecddSetupData,
                        hri: !ecddSetupData?.hri,
                      })
                    }
                  />
                </div>
                <div className="col-3">
                  <label className="KYCViewCustomer-label">
                    HRC
                    <br />
                    (High Risk Country)
                  </label>
                </div>
                <div className="col-3">
                  <Switch
                    className="toggle-switch"
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    checked={ecddSetupData?.hrc}
                    style={{ marginLeft: "-50px" }}
                    onChange={() =>
                      setEcddSetupData({
                        ...ecddSetupData,
                        hrc: !ecddSetupData?.hrc,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex col justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">PEPS</label>
                </div>
                <div className="col-3">
                  <Switch
                    className="toggle-switch"
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    checked={ecddSetupData?.peps}
                    onChange={() =>
                      setEcddSetupData({
                        ...ecddSetupData,
                        peps: !ecddSetupData?.peps,
                      })
                    }
                  />
                </div>
                <div className="col-3 ms-2">
                  <label className="KYCViewCustomer-label">Negative List</label>
                </div>
                <div className="col-3">
                  <Switch
                    className="toggle-switch"
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    style={{ marginLeft: "-50px" }}
                    checked={ecddSetupData?.negativeList}
                    onChange={() =>
                      setEcddSetupData({
                        ...ecddSetupData,
                        negativeList: !ecddSetupData?.negativeList,
                      })
                    }
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">Date Created</label>
                </div>{" "}
                <div className="col-3">
                  <Input
                    type="text"
                    className="no-border def_fontsize_ecdd referenceData-readOnly"
                    readOnly={true}
                    name="regDate"
                    value={ecddList?.createdDate}
                  />
                </div>
                <div className="col-3">
                  <label className="KYCViewCustomer-label">Date Updated</label>
                </div>
                <div className="col-3">
                  <Input
                    type="text"
                    className="no-border def_fontsize_ecdd referenceData-readOnly eccd-input"
                    readOnly={true}
                    style={{ marginLeft: "-50px" }}
                    name="regDate"
                    value={ecddList?.updatedDate}
                  />
                </div>
              </div>
              <div className="d-flex col justify-content-between align-items-center mb-4">
                <div className="col-2">
                  <label className="KYCViewCustomer-label">Created By</label>
                </div>
                <div className="col-3">
                  <Input
                    type="text"
                    className="no-border def_fontsize_ecdd referenceData-readOnly"
                    readOnly={true}
                    name="regDate"
                    value={ecddList?.createdBy}
                  />
                </div>
                <div className="col-3">
                  <label className="KYCViewCustomer-label">
                    Last Updated By
                  </label>
                </div>
                <div className="col-3">
                  <Input
                    type="text"
                    className="no-border def_fontsize_ecdd referenceData-readOnly eccd-input"
                    readOnly={true}
                    style={{ marginLeft: "-50px" }}
                    name="gstNo"
                    value={ecddList?.updatedBy}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4 mb-4 ms-3">
                <div className="col-2"></div>
                <div className="col-4" style={{ marginLeft: "22px" }}>
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
            </div>
          </form>
        </div>
      </CommonEditSummary>
    </div>
  );
}

export default AmlEcddSetup;
