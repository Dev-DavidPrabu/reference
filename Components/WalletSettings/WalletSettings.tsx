import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Card,
  Container,
  Col,
  CardBody,
} from "reactstrap";
import {
  wallletSetupModalPopupProps,
  walletTypeObjects,
} from "../../models/WalletSetupModel";
import "./WalletSettings.scss";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import { customValidator } from "../../Constants/Validation";

const WalletSettings: React.FC<wallletSetupModalPopupProps> = (
  props: wallletSetupModalPopupProps
) => {
  const [enitity] = useState("MTA MY");
  const [walletType, setWalletType] = useState(
    props?.walletSetupDataToModal?.walletTypeCode || ""
  );
  const [walletDescription, setWalletDescription] = useState(
    props?.walletSetupDataToModal?.name || ""
  );
  const [defaultType, setDefaultType] = useState(
    props?.walletSetupDataToModal?.isDefault || false
  );
  const [validationError, setValidationError] = useState("");
  const [defaultWalletconfirmation, setDefaultWalletconfirmation] =
    useState(false);

  const [errors, setErrors] = useState({
    walleTypeError: "",
    walletDescriptionError: "",
  });
  const inputMethodHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletType(e.target.value);
  };

  const validate = () => {
    let _walletTypeError = customValidator(
      "wallettype",
      "Wallet Type",
      walletType
    );
    let _walletDescriptionError = customValidator(
      "walletdescription",
      "Wallet Description",
      walletDescription
    );
    if (!(_walletTypeError === "null" && _walletDescriptionError === "null")) {
      setErrors({
        walleTypeError: _walletTypeError,
        walletDescriptionError: _walletDescriptionError,
      });
      return false;
    }
    setErrors({ walleTypeError: "", walletDescriptionError: "" });
    return true;
  };

  const checkSelectNameAlreadyTakenOrNot = () => {
    let isValid = true;
    let alreadyhavewalletTypeCode = props.overAllData.some(
      (e: walletTypeObjects) =>
        e.walletTypeCode.toLowerCase() ===
        finalDataToSend.walletTypeCode.toLowerCase()
    );

    if (alreadyhavewalletTypeCode) {
      isValid = false;
      setValidationError(
        "Already the same wallet code taken,please try with new one"
      );
    }
    return isValid;
  };

  const checkDefaultIsAlreadyAvilableOrNot = () => {
    let isValid = true;
    let alreadyhaveDefault = props.overAllData.some(
      (e: walletTypeObjects) => e.isDefault === true
    );
    if (alreadyhaveDefault && finalDataToSend.isDefault) {
      isValid = false;
      setValidationError("Already you have default wallet");
    }
    return isValid;
  };

  let finalDataToSend = {
    countryCode: "MY",
    walletTypeCode: walletType,
    name: walletDescription,
    isDefault: defaultType,
    entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
  };

  const checkDefaultWalletchangesInEditMethod = () => {
    let isValid = true;
    let alreadyhaveDefault = props.overAllData.some(
      (e: walletTypeObjects) => e.isDefault === true
    );
    if (props.walletSetupDataToModal.isDefault) {
      if (!finalDataToSend.isDefault) {
        setDefaultWalletconfirmation(!defaultWalletconfirmation);
        isValid = false;
      }
    } else if (alreadyhaveDefault && finalDataToSend.isDefault) {
      isValid = false;
      setValidationError("Already you have default wallet");
    }
    return isValid;
  };
  const deleteWalletConfirmationHandler = (confirmation: string) => {
    if (confirmation === "Yes") {
      let eventId = props.walletSetupDataToModal?.id;
      let updateDataToSend = {
        countryCode: "MY",
        walletTypeCode: walletType,
        name: walletDescription,
        isDefault: defaultType,
        entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
        id: eventId,
      };
      props.finalSubmitHandler(props.toggleElement, updateDataToSend, eventId);
    } else {
      setDefaultWalletconfirmation(!defaultWalletconfirmation);
      setDefaultType(!defaultType);
    }
  };

  const addSubmitHandler = () => {
    if (validate()) {
      if (checkSelectNameAlreadyTakenOrNot()) {
        if (checkDefaultIsAlreadyAvilableOrNot()) {
          let eventId = props.walletSetupDataToModal?.id;
          props.finalSubmitHandler(
            props.toggleElement,
            finalDataToSend,
            eventId
          );
          return;
        }
      }
    }
  };

  const buttonElementForAddMethod = () => {
    return (
      <>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="primary"
          onClick={addSubmitHandler}
        >
          Submit
        </CustomButton>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
        >
          Cancel
        </CustomButton>
      </>
    );
  };
  const editSubmitHandler = () => {
    if (validate()) {
      if (checkDefaultWalletchangesInEditMethod()) {
        let eventId = props.walletSetupDataToModal?.id;
        let updateDataToSend = {
          countryCode: "MY",
          walletTypeCode: walletType,
          name: walletDescription,
          isDefault: defaultType,
          entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
          id: eventId,
        };
        props.finalSubmitHandler(
          props.toggleElement,
          updateDataToSend,
          eventId
        );
        return;
      }
    }
  };
  const buttonElementForEditMethod = () => {
    return (
      <>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="primary"
          onClick={editSubmitHandler}
        >
          Update
        </CustomButton>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
        >
          Cancel
        </CustomButton>
      </>
    );
  };
  const deleteSubmitHandler = () => {
    let eventId = props.walletSetupDataToModal?.id;
    props.finalSubmitHandler(props.toggleElement, finalDataToSend, eventId);
  };
  const buttonElementForDeleteMethod = () => {
    return (
      <>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="danger"
          onClick={deleteSubmitHandler}
        >
          Delete
        </CustomButton>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
        >
          Cancel
        </CustomButton>
      </>
    );
  };

  const buttonElementForViewMethod = () => {
    return (
      <>
        <CustomButton
          className="btn-width-edit mr-rt-10px"
          color="secondary"
          onClick={props.cancelMethod}
        >
          Cancel
        </CustomButton>
      </>
    );
  };
  return (
    <Container>
      <h1 style={{ marginTop: "3rem" }}>{props.previewTitle}</h1>
      <div>
        <Card>
          <CardBody className="card-margin">
            <Form>
              <FormGroup row className="Form-group">
                <Label for="exampleEmail" className="label-font" sm={3}>
                  Entity
                </Label>
                <Col sm={9}>
                  <CustomInput
                    type="text"
                    name="Enitity"
                    id="Enitity"
                    placeholder="Enitity"
                    defaultValue={enitity}
                    readOnly={true}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="exampleEmail" className="label-font" sm={3}>
                  WalletType*
                </Label>
                <Col sm={9}>
                  <CustomInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      inputMethodHandler(e)
                    }
                    type="text"
                    name="WalletType"
                    id="WalletType"
                    placeholder="Enter Wallet Type"
                    defaultValue={walletType}
                    readOnly={
                      props.toggleElement === "viewMethod"
                        ? true
                        : props.toggleElement === "deleteMethod"
                        ? true
                        : props.toggleElement === "editMethod"
                        ? true
                        : false
                    }
                  />
                  {errors.walleTypeError &&
                    errors?.walleTypeError !== "null" && (
                      <Label className="text-red">
                        {errors.walleTypeError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="exampleEmail" className="label-font" sm={3}>
                  WalletType Description *
                </Label>
                <Col sm={9}>
                  <CustomInput
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setWalletDescription(e.target.value)
                    }
                    type="textarea"
                    name="text"
                    id="Wallet Description"
                    defaultValue={walletDescription}
                    readOnly={
                      props.toggleElement === "viewMethod"
                        ? true
                        : props.toggleElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  {errors?.walletDescriptionError &&
                    errors?.walletDescriptionError !== "null" && (
                      <Label className="text-red">
                        {errors?.walletDescriptionError}
                      </Label>
                    )}
                </Col>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <CustomInput
                    onClick={() => {
                      setDefaultType(!defaultType);
                    }}
                    type="checkbox"
                    checked={defaultType}
                    disabled={
                      props.toggleElement === "viewMethod"
                        ? true
                        : props.toggleElement === "deleteMethod"
                        ? true
                        : false
                    }
                  />
                  Default Wallet
                </Label>
              </FormGroup>
            </Form>
            {validationError && (
              <h5 style={{ color: "red" }}>{validationError}</h5>
            )}
            <div className="wallet-btn-confirm">
              {!defaultWalletconfirmation &&
                (props.toggleElement === "addMethod"
                  ? buttonElementForAddMethod()
                  : props.toggleElement === "editMethod"
                  ? buttonElementForEditMethod()
                  : props.toggleElement === "deleteMethod"
                  ? buttonElementForDeleteMethod()
                  : buttonElementForViewMethod())}
            </div>
            {defaultWalletconfirmation && (
              <div className="delete-card">
                <Card>
                  <CardBody>
                    <h6>Are You Sure Want to Remove Default Wallet?</h6>
                    <div className="btn-div">
                      <CustomButton
                        color="success"
                        className="mr-rt-10px btn-width"
                        onClick={() => deleteWalletConfirmationHandler("Yes")}
                      >
                        Yes
                      </CustomButton>
                      <CustomButton
                        color="danger"
                        className="btn-width"
                        onClick={() => deleteWalletConfirmationHandler("No")}
                      >
                        No
                      </CustomButton>
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};
export default WalletSettings;
