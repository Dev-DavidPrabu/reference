import React, { useState } from "react";
import { useHistory } from "react-router";
import CustomButton from "../UI/CustomButton";
import { Input, Label, Form, FormGroup, Col } from "reactstrap";
import "../FestiveSummary/FestiveSummary.scss";
import AddFestiveNext from "./AddFestiveNext";

const AddFestive = (_props: { value: string }) => {
  const history = useHistory();
  const [moveToNextStep, setMoveToNextStep] = useState(false);

  const handle_CategoryNext = (_e: React.MouseEvent<HTMLElement>) => {
    setMoveToNextStep(!moveToNextStep);
  };
  const handle_CategoryCancel = (_e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  return (
    <div>
      <div className="Step">
        <div className={moveToNextStep ? "arrow-1Next " : "arrow-1"}>
          Step-1
        </div>
        <div className="line"></div>
        <div className="arrow-2">Step-2</div>
      </div>
      {!moveToNextStep ? (
        <div className="container">
          <Form className="setting2">
            <FormGroup row>
              <Label for="text" sm={4}>
                Festive Packet Season Number
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
              <Label for="Select" sm={4}>
                Festive Packet Season
              </Label>
              <Col sm={8}>
                <Input type="select" name="select" id="Select">
                  <option>Valentine</option>
                  <option>Deepavali</option>
                  <option>Hari Raya</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={4}>
                Description
              </Label>
              <Col sm={8}>
                <Input type="textarea" name="text" id="Text" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="date" sm={4}>
                Date
              </Label>
              <Col sm={4}>
                <Input type="date" name="date" id="date" />
              </Col>
              <Col sm={4}>
                <Input type="date" name="date" id="date" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="time" sm={4}>
                Time
              </Label>
              <Col sm={4}>
                <Input type="time" name="time" id="time" />
              </Col>
              <Col sm={4}>
                <Input type="time" name="time" id="time" />
              </Col>
            </FormGroup>
            <div className="setting3">
              <CustomButton
                color="danger"
                className="btn2"
                onClick={handle_CategoryNext}
              >
                Next
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
      ) : (
        <AddFestiveNext></AddFestiveNext>
      )}
    </div>
  );
};

export default AddFestive;
