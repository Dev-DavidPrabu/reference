import { TiArrowBackOutline } from "react-icons/ti";
import { Col, Input, Label } from "reactstrap";
import CustomButton from "../UI/CustomButton";
import "./AddETerminalScreen.scss";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

const AddETerminalScreen = (props: any) => {
  const [terminalDetail, setTerminalDetail] = useState({
    branchGrpName: "",
    branchName: "",
    mid: "",
    status: "",
    tid: "",
    branchCode: "",
    deviceId: "",
    deviceName: "",
    agentGroup: "",
    latitude: "",
    longitude: "",
    deviceModel: "",
  });

  useEffect(() => {
    if (props.location.state !== undefined) {
      setTerminalDetail(props.location.state);
    }
  }, [props.location.state]);

  const handleBack = () => {
    props.history.push({
      pathname: "/dashboard/Branch-Management/Terminal-Dashboard",
    });
  };

  const handleChange = (e: any) => {
    setTerminalDetail({
      ...terminalDetail,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4">
      <div className="add-terminal-title pb-3"></div>
      <>
        <div className="edit"></div>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="d-flex col justify-content-between title">
            {props.location.title === "Edit Terminal"
              ? "Edit E-Terminal"
              : "Add E-Terminal"}
          </div>
          <CustomButton onClick={handleBack} className="backBtnDevice">
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
        <div className="add-terminal-wrapper">
          <div className="add-terminal-maintenance-form">
            <div>
              <p className="mandatory-fields">
                <span className="container-body-label-color">*</span>indicates
                mandatory fields
              </p>
            </div>
            {props.location.title !== "Edit Terminal" && (
              <>
                <div className="row mb-3">
                  <Label
                    className="add-terminal-label-font-weight label-text"
                    for="exampleText"
                    sm={2}
                  >
                    Device ID
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      className="form-select"
                      name="deviceId"
                      value={terminalDetail.deviceId}
                      onChange={handleChange}
                    />
                  </Col>

                  <Label
                    className="add-terminal-label-font-weight label-text"
                    for="exampleText"
                    sm={2}
                  >
                    Device Name
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="deviceName"
                      value={terminalDetail.deviceName}
                      className="form-control"
                      disabled={true}
                      onChange={handleChange}
                    />
                  </Col>
                </div>
                <div className="row mb-3">
                  <Label
                    className="add-terminal-label-font-weight label-text"
                    for="exampleText"
                    sm={2}
                  >
                    Device Model{" "}
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="deviceModel"
                      onChange={handleChange}
                      value={terminalDetail.deviceModel}
                      className="form-control"
                      disabled={true}
                    />
                  </Col>

                  <Label
                    className="add-terminal-label-font-weight label-text"
                    for="exampleText"
                    sm={2}
                  >
                    Branch Code
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Col sm={4}>
                    <Input
                      type="text"
                      name="branchCode"
                      onChange={handleChange}
                      value={terminalDetail.branchCode}
                      className="form-select"
                    />
                  </Col>
                </div>
              </>
            )}
            {props.location.title === "Edit Terminal" && (
              <div className="row mb-3">
                <Label
                  className="add-terminal-label-font-weight label-text"
                  for="exampleText"
                  sm={2}
                >
                  Device ID
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={3}>
                  <Input
                    type="text"
                    className="form-control referenceData-readOnly"
                    name="deviceId"
                    readOnly={true}
                    onChange={handleChange}
                    value={terminalDetail.deviceId}
                  />
                </Col>
                <Col sm={1} className="d-flex align-items-center ">
                  <div className="d-flex justify-content-center align-items-center searchIconTerminal">
                    <FiSearch />
                  </div>
                </Col>
              </div>
            )}

            <div className="row mb-3">
              <Label
                className="add-terminal-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Agent Group
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  value={terminalDetail.agentGroup}
                  disabled={true}
                  onChange={handleChange}
                  name="agentGroup"
                />
              </Col>
              <Label
                className="add-terminal-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Branch Name
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="branchName"
                  disabled={true}
                  value={terminalDetail.branchName}
                />
              </Col>
            </div>
            <div className="row mb-3">
              <Label
                className="add-terminal-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                MID
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  disabled={true}
                  value={terminalDetail?.mid}
                  onChange={handleChange}
                  className="form-control"
                  name="mid"
                ></Input>
              </Col>
            </div>
            <div className="row mb-3">
              <Label
                className="add-terminal-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Latitude
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  value={terminalDetail.latitude}
                  onChange={handleChange}
                  className="form-control"
                  name="latitude"
                ></Input>
              </Col>
              <Label
                className="add-terminal-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Longitude
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  value={terminalDetail.longitude}
                  onChange={handleChange}
                  className="form-control"
                  name="longitude"
                ></Input>
              </Col>
            </div>
          </div>
          <div className="d-flex  align-items-center pb-5 Cnt-btn">
            <div className="col-sm-2 button-sub-can" />
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
              onClick={handleBack}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </>
    </div>
  );
};
export default AddETerminalScreen;
