import { Switch } from "antd";
import { TiArrowBackOutline } from "react-icons/ti";
import { Col, Input, Label } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";
import { useHistory } from "react-router";
import "./RemitOnbehalfSetup.scss";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import { useState } from "react";

const RemitOnBehalfSetup = () => {
  const history = useHistory();
  const [formValue, setFormValue] = useState({
    onBehalfTxn: true,
    popupMsg: true,
    behalfRelationShip: true,
    createdDate: "",
    updatedDate: "",
    createdBy: "",
    lastUpdatedBy: "",
  });
  const handleCancel = () => {
    history.push({
      pathname: "/dashboard/remit-setup/Edit-On-Behalf-Details",
    });
  };
  const handleEnabled = (e: any) => {
    setFormValue({
      ...formValue,
      ["onBehalfTxn"]: e,
    });
  };
  const handleEnabledPopUP = (e: any) => {
    setFormValue({
      ...formValue,
      ["popupMsg"]: e,
    });
  };
  const handleEnabledRelation = (e: any) => {
    setFormValue({
      ...formValue,
      ["behalfRelationShip"]: e,
    });
  };
  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-4">
      <>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="d-flex col justify-content-between title">
            On Behalf Setup
          </div>
          <CustomButton
            className="backbtneditBehalfSetup"
            onClick={handleCancel}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
        <div className="edit-behalf-wrapper">
          <div className="edit-behalf-form">
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                On Behalf Transaction
              </Label>
              <Col sm={2}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabled(e)}
                  checked={formValue.onBehalfTxn}
                />
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                Popup Message - Different Nationality/Country
              </Label>
              <Col sm={2}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledPopUP(e)}
                  checked={formValue.popupMsg}
                />
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                On Behalf Relationship
              </Label>
              <Col sm={2}>
                <Switch
                  checkedChildren="YES"
                  unCheckedChildren="NO"
                  onChange={(e) => handleEnabledRelation(e)}
                  checked={formValue.behalfRelationShip}
                />
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                Date Created
              </Label>
              <Col sm={3}>
                <Input
                  style={{ height: "36px" }}
                  type="date"
                  className="branchInput-height"
                  name="createdDate"
                  value={formValue.createdDate}
                  onChange={handleChange}
                />
              </Col>
            </div>
            <div>
              <h5 className="header-text"></h5>
            </div>
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                Date Updated
              </Label>
              <Col sm={3}>
                <Input
                  type="date"
                  className=""
                  name="updatedDate"
                  value={formValue.updatedDate}
                  onChange={handleChange}
                />
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                Created By
              </Label>
              <Col sm={3}>
                <Input
                  type="text"
                  name="createdBy"
                  value={formValue.createdBy}
                  onChange={handleChange}
                ></Input>
              </Col>
            </div>
            <div className="row mb-3">
              <Label className="behalfSetupLabel" for="exampleText" sm={4}>
                Last Updated By
              </Label>
              <Col sm={3}>
                <Input
                  type="text"
                  name="lastUpdatedBy"
                  value={formValue.lastUpdatedBy}
                  onChange={handleChange}
                ></Input>
              </Col>
            </div>
          </div>
          <div className="row mb-3">
            <Label
              className="behalfSetupLabel"
              for="exampleText"
              sm={4}
            ></Label>
            <Col sm={3} className="alignLeft">
              <SubmitCancelButton
                button={"Submit"}
                secondButton={"Cancel"}
                onCancel={handleCancel}
              />
            </Col>
          </div>
        </div>
      </>
    </div>
  );
};
export default RemitOnBehalfSetup;
