import { Switch } from "antd";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import BackButton from "../../Components/CustomBackButton/BackButton";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  resetUpdateBranchRecords,
  updateBranchDetails,
} from "../../redux/action/RemitBranchSetupAction";
import "./RemitBranchForm.scss";

const RemitBranchForm = (props: any) => {
  const dispatch = useDispatch();
  const [branchDetails, setBranchDetails] = useState({
    id: "",
    address: "",
    bankCode: "",
    branchCode: "",
    branchName: "",
    city: "",
    countryCode: "",
    district: "",
    state: "",
    statusCode: "",
  });
  const [apiMessage, setApiMessage] = useState(false);
  const [branchMessage, setBranchMessage] = useState("");
  const [branchStatus, setBranchStatus] = useState(false);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setBranchDetails(props.location.state);
    }
  }, [props.location.state]);

  const updateBranchData = useCallback(async (data: any) => {
    try {
      dispatch(updateBranchDetails(data));
    } catch (err) {}
  }, []);

  const resetUpdateData = useCallback(async () => {
    try {
      dispatch(resetUpdateBranchRecords());
    } catch (err) {}
  }, []);

  const updatedBranchDetails = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.updatedBranchDataResponse
  );

  useEffect(() => {
    if (updatedBranchDetails) {
      if (updatedBranchDetails.data) {
        backClicked();
        resetUpdateData();
        props.history.push({
          pathname: "/dashboard/remit-setup/Branch-Setup",
          state: true,
          message: "Branch Edited Sucessfully",
        });
      } else if (updatedBranchDetails.error) {
        setApiMessage(true);
        setBranchStatus(false);
        setBranchMessage(updatedBranchDetails?.message);
      }
    }
  });
  const backClicked = () => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Branch-Setup",
      state: "updated",
    });
  };

  const submitEvent = () => {
    updateBranchData(branchDetails);
  };

  const handleEnabled = (e: any) => {
    let status = "";
    if (e) {
      status = "ACTIVE";
    } else {
      status = "INACTIVE";
    }
    setBranchDetails({
      ...branchDetails,
      ["statusCode"]: status,
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  return (
    <div className="p-3">
      <div className="d-flex col">
        <h3 className="col-6 remit-branch-title">View Branch Setup</h3>
        <div className="col-3">
          <BackButton OnClick={backClicked} />
        </div>
      </div>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={branchStatus}
          closeMessage={closeMessage}
          message={branchMessage}
        />
      )}

      <div className="remit-branch-background">
        <div className="p-3">
          <Col className=" d-flex">
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Country Code</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control form-select border-0 w-100"
                    readOnly={true}
                    value={branchDetails.countryCode}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Bank Code</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control form-select border-0 w-100"
                    readOnly={true}
                    value={branchDetails.bankCode}
                  />
                </Col>
              </Row>
            </Col>
          </Col>

          <Col className="d-flex mt-3">
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Branch Code</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control border-0 w-100"
                    readOnly={true}
                    value={branchDetails.branchCode}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Branch Name</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control border-0 w-100"
                    readOnly={true}
                    value={branchDetails.branchName}
                  />
                </Col>
              </Row>
            </Col>
          </Col>

          <Col className="d-flex mt-3">
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Branch Address</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-address form-control border-0 w-100"
                    value={branchDetails.branchName}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Branch City</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control border-0 w-100"
                    value={branchDetails.city}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
          </Col>

          <Col className="d-flex mt-3">
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">District</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control border-0 w-100"
                    value={branchDetails.district}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">State</span>
                </Col>
                <Col sm={7}>
                  <input
                    type="select"
                    className="remit-branch-input form-control border-0 w-100"
                    value={branchDetails.state}
                    readOnly={true}
                  />
                </Col>
              </Row>
            </Col>
          </Col>

          <Col className="d-flex mt-3">
            <Col sm={6}>
              <Row>
                <Col sm={4}>
                  <span className="remit-branch-label">Active Flag</span>
                </Col>
                <Col sm={7}>
                  <Switch
                    className="remit-branch-flag"
                    checkedChildren="Yes"
                    unCheckedChildren="NO"
                    checked={
                      branchDetails.statusCode === "ACTIVE" ? true : false
                    }
                    onChange={(e) => handleEnabled(e)}
                  />
                </Col>
              </Row>
            </Col>
          </Col>

          <Col className="d-flex mt-3">
            <Col sm={6}>
              <Row>
                <Col sm={4}></Col>
                <Col sm={7}>
                  <SubmitCancelButton
                    button={"Update"}
                    secondButton={"Cancel"}
                    onSubmit={submitEvent}
                    onCancel={backClicked}
                  />
                </Col>
              </Row>
            </Col>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default RemitBranchForm;
