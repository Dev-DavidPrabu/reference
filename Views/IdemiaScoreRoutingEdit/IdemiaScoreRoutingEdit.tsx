import React, { useState } from "react";
import "./IdemiaScoreRoutingEdit.scss";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import { lastRoute } from "../../Components/Breadcrumbs/Breadcrumbs";
import { Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import CustomButton from "../../Components/UI/CustomButton";
import { idemiaScoreRoutingUpdate } from "../../redux/action/IdemiaScoreRoutingActions";

function IdemiaScoreRoutingEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [iscoreError, setScoreError] = useState(false);
  const [updateIdemiaScore, setIdemiaScore] = useState({
    scenario: location?.state.value.scenario,
    score: location?.state.value.score,
    channel: location?.state.value.channel,
    status: location?.state.value.status,
  });

  let score = location.state.value.score.split(/(\d+|\w+)/);
  let scoreArray = score.filter((e: any) => e != "and" && e != " ");
  let finalScore = "";
  let [scoreConcatArray, setScoreConcatArray] = useState([
    scoreArray[0],
    scoreArray[1],
    " and ",
    scoreArray[2],
    scoreArray[3],
  ]);
  let dynamicChannel = [];
  let isValid = true;
  if (location?.state.value.scenario === "OCR Mismatch") {
    dynamicChannel = ["BO Verification", "Verified"];
  } else if (location?.state.value.scenario === "Selfie Score") {
    dynamicChannel = ["Selfie Good", "ID Recapture"];
  } else {
    dynamicChannel = [
      "Verified",
      "BO Verification",
      "KYC at Branch",
      "ID Recapture",
    ];
  }

  const Regex = /^\d+$/;
  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    scoreConcatArray[parseInt(e.target.id)] = e.target.value;
    setScoreConcatArray(scoreConcatArray);
  };
  const onChange_handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdemiaScore({ ...updateIdemiaScore, [e.target.name]: e.target.value });
  };

  function handle_Validate() {
    if (scoreConcatArray[1].length < 1 || !Regex.test(scoreConcatArray[1])) {
      isValid = false;
      setScoreError(true);
    } else if (
      scoreConcatArray[3]?.length < 1 &&
      scoreConcatArray[4]?.length > 0
    ) {
      isValid = false;
      setScoreError(true)
    } else if (
      scoreConcatArray[3]?.length >= 1 &&
      (scoreConcatArray[4]?.length < 1 || !Regex.test(scoreConcatArray[4]))
    ) {
      setScoreError(true);
      isValid = false;
    } else {
      setScoreError(false);
    }
    if (scoreConcatArray[3]?.length < 1 || scoreConcatArray[4]?.length < 1) {
      finalScore = scoreConcatArray[0] + scoreConcatArray[1];
    } else {
      finalScore = scoreConcatArray.join("");
    }
    return isValid;
  }

  const handle_IdemiaScoreSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handle_Validate()) {
      updateIdemiaScore.score = finalScore;
      dispatch(idemiaScoreRoutingUpdate(updateIdemiaScore));
      history.goBack();
    }
  };
  const handle_Cancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };

  return (
    <div className="idemiaScoreRoutingEdit">
      <CommonEditSummary heading={lastRoute}>
        <div className="p-4">
          <form onSubmit={handle_IdemiaScoreSubmit}>
            <div className="col d-flex">
              <div className="col-6 d-flex">
                <div className="col-4 p-3">
                  <label className="edit-sum-label">
                    Scenario<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-8 p-3 ">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={updateIdemiaScore?.scenario}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>

            <div className="col d-flex">
              {location?.state.value.scenario != "OCR Mismatch" ? (
                <>
                  {" "}
                  <div className="col-6 d-flex">
                    <div className="col-4 p-3">
                      <label className="edit-sum-label">
                        Score<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col-3 p-3 ">
                      <Input
                        type="select"
                        name="score0"
                        data-testid="score0"
                        id="0"
                        className="idemiaEditInput"
                        onChange={handleScoreChange}
                      >
                        <option hidden key={0}>
                          {scoreArray[0]}
                        </option>
                        <option>&lt;=</option>
                        <option>&lt;</option>
                        <option>&gt;</option>
                        <option>&gt;=</option>
                      </Input>
                    </div>
                    <div className="col-3 p-3 ">
                      <Input
                        type="text"
                        name="score1"
                        data-testid="score1"
                        id="1"
                        defaultValue={scoreArray[1]}
                        onChange={handleScoreChange}
                      />
                    </div>
                    <div className="col-3 p-3 ">
                      <Input
                        type="select"
                        name="score2"
                        data-testid="score2"
                        id="3"
                        className="idemiaEditInput"
                        onChange={handleScoreChange}
                      >
                        <option hidden key={0}>
                          {scoreArray[2]}
                        </option>
                        <option>&lt;=</option>
                        <option>&lt;</option>
                        <option>&gt;</option>
                        <option>&gt;=</option>
                      </Input>
                    </div>
                    <div className="col-3 p-3 ">
                      <Input
                        type="text"
                        name="score3"
                        data-testid="score3"
                        id="4"
                        defaultValue={scoreArray[3]}
                        onChange={handleScoreChange}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-6 d-flex">
                  <div className="col-4 p-3">
                    <label className="edit-sum-label">
                      Score<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col-8 p-3 ">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={updateIdemiaScore?.score}
                      readOnly={true}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="col d-flex">
              <div className="col-6 d-flex">
                <div className="col-4 p-3">
                  <label className="edit-sum-label">
                    Channel<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-8 p-3 ">
                  <Input
                    type="select"
                    name="channel"
                    data-testid="channel"
                    id="channel"
                    className="idemiaEditInput"
                    onChange={onChange_handler}
                  >
                    <option hidden key={0}>
                      {updateIdemiaScore?.channel}
                    </option>
                    {dynamicChannel.map((channel: any) => {
                      return <option>{channel}</option>;
                    })}
                  </Input>
                </div>
              </div>
            </div>
            <div className="col d-flex">
              <div className="col-6 d-flex">
                <div className="col-4 p-3">
                  <label className="edit-sum-label">
                    Status<span className="span-col">*</span>
                  </label>
                </div>
                <div className="col-8 p-3 ">
                  <Input
                    type="select"
                    name="status"
                    data-testid="status"
                    id="status"
                    className="idemiaEditInput"
                    onChange={onChange_handler}
                  >
                    <option hidden key={0}>
                      {updateIdemiaScore?.status}
                    </option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Input>
                </div>
              </div>
            </div>
            {iscoreError && (
              <div style={{ marginLeft: "200px" }}>
                <span className="span-col1">
                  Input Error. Cannot contain Special Charaters or Alphabets *
                </span>
              </div>
            )}
            <div className="col d-flex mt-3">
              <div className="col-6 d-flex">
                <div className="col-4 p-3"></div>
                <div className="col-8 p-3 ">
                  <CustomButton color="danger" className="btn2">
                    Save
                  </CustomButton>
                  <CustomButton
                    color="secondary"
                    className="btn2"
                    component={"payrollEnquiry"}
                    onClick={handle_Cancel}
                  >
                    Cancel
                  </CustomButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </CommonEditSummary>
    </div>
  );
}

export default IdemiaScoreRoutingEdit;
