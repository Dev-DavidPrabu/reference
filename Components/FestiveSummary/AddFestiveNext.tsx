import React from "react";
import { useHistory } from "react-router";
import { Input, Label, Form, FormGroup, Col, FormText } from "reactstrap";
import CustomButton from "../UI/CustomButton";

const AddFestiveNext = () => {
  const history = useHistory();
  const handle_CategoryCancel = () => {
    history.goBack();
  };

  return (
    <div className="container">
      <Form className="setting2">
        <FormGroup row>
          <Label for="text" sm={4}>
            Success Message *
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              name="Success Message"
              id="successmessage"
              placeholder="Success Message"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="file" sm={4}>
            Success Image *
          </Label>
          <Col sm={8}>
            <Input type="file" name="file" id="file" />
            <FormText>(Image format jpg,gif,png)</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="text" sm={4}>
            Fail Message *
          </Label>
          <Col sm={8}>
            <Input
              type="text"
              name="Fail Message"
              id="failmessage"
              placeholder="Fail Message"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="file" sm={4}>
            Fail Image *
          </Label>
          <Col sm={8}>
            <Input type="file" name="file" id="file" />
            <FormText>(Image format jpg,gif,png)</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="file" sm={4}>
            Summary Header *
          </Label>
          <Col sm={8}>
            <Input type="file" name="file" id="file" />
            <FormText>(Image format jpg,gif,png)</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="file" sm={4}>
            Banner *
          </Label>
          <Col sm={8}>
            <Input type="file" name="file" id="file" />
            <FormText>(Image format jpg,gif,png)</FormText>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={4}>
            Active/Deactive *
          </Label>
          <Col sm={{ size: 8 }}>
            <FormGroup check>
              <Label check sm={4}>
                <Input type="checkbox" id="checkbox2" /> Active
              </Label>
              <Label check sm={4}>
                <Input type="checkbox" id="checkbox2" /> Deactive
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <div className="setting3">
          <CustomButton color="danger" className="btn2">
            Save and Continue
          </CustomButton>
          <CustomButton
            color="secondary"
            className="btn2"
            component={"payrollEnquiry"}
            onClick={handle_CategoryCancel}
          >
            Cancel
          </CustomButton>
        </div>
      </Form>
    </div>
  );
};

export default AddFestiveNext;
