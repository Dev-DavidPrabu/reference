import { Row, Col, FormGroup, Label, Input, CardBody } from "reactstrap";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";

function EmployeeMaintenance() {
  return (
    <div className="prefund-card" style={{ height: "auto", width: "auto" }}>
      <div className="prefund-header">
        <Row>
          <Col xs="6" sm="1" style={{ cursor: "pointer" }}></Col>
          <Col
            xs="6"
            sm="8"
            style={{
              fontSize: "22px",
              textAlign: "center",
              marginTop: "5px",
              marginLeft: "5rem",
            }}
          >
            Employee Maintenance
          </Col>
          <Col sm="3"></Col>
        </Row>
      </div>
      <div style={{ height: "10%" }} className="prefund-buttons">
        <div className="prefund-heading-button">Record Reference </div>
        <div className="prefund-heading-button">Mode</div>
        <div className="prefund-heading-button-last"></div>
      </div>
      <div style={{ height: "87%", marginTop: "2rem" }}>
        <Row>
          <Col sm="12" md={{ size: 10, offset: 2 }}>
            <div style={{ height: "65%" }}>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  Pre-Onboarding Ref.
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Pre-Onboarding Ref"
                    id="uid"
                    readOnly={true}
                  />
                </Col>
              </FormGroup>
              <h3 style={{ marginTop: "1rem" }}>Employee Details :</h3>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  UID
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="uid"
                    id="uid"
                    readOnly={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  Full Name
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Full Name"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="amount" className="label-font" sm={4}>
                  Identification Number
                </Label>
                <Col sm={2}>
                  <Input type="select" name="select">
                    <option key="-1" value="">
                      Type
                    </option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col sm={4}>
                  <Input
                    type="text"
                    className="input-size"
                    name="transactionAmount"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  Staff ID
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Staff ID"
                  />
                </Col>
              </FormGroup>

              <h3 style={{ marginTop: "1rem" }}>Contact Details :</h3>

              <FormGroup row className="Form-group">
                <Label for="amount" className="label-font" sm={4}>
                  Identification Number
                </Label>
                <Col sm={2}>
                  <Input type="select" name="select">
                    <option key="-1" value=""></option>
                  </Input>
                </Col>
                <Col sm={4}>
                  <Input
                    type="text"
                    className="input-size"
                    name="transactionAmount"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  Email Address
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Emailaddress"
                  />
                </Col>
              </FormGroup>
              <h3 style={{ marginTop: "1rem" }}>Linked Account:</h3>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  PAN(Last 4 digit)
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Emailaddress"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="uid" className="label-font" sm={4}>
                  Link Account UID
                </Label>
                <Col sm={6}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="uid"
                    id="uid"
                    readOnly={true}
                  />
                </Col>
              </FormGroup>

              <div
                style={{
                  height: "35%",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
              >
                <Row>
                  <Col sm="12" md={{ size: 10, offset: 2 }}>
                    <CardBody
                      style={{
                        height: "100%",
                        background: "grey",
                        width: "75%",
                        borderRadius: "19px",
                      }}
                    >
                      <div className="Form-group">
                        <Row>
                          <Col sm={12}>
                            <Input placeholder="Comments"></Input>
                          </Col>
                        </Row>
                      </div>
                      <div className="Form-group">
                        <Row>
                          <Col sm={7}>
                            <CustomInput
                              placeholder="approver action"
                              type="text"
                              className="input-size"
                              name="uid"
                              id="uid"
                              readOnly={true}
                            />
                          </Col>
                          {
                            <Col sm={2}>
                              <CustomButton>Submit</CustomButton>
                            </Col>
                          }
                          <Col sm={2}>
                            <CustomButton>Cancel</CustomButton>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default EmployeeMaintenance;
