import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import "./PreLoginCarousel.scss";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { uploadFileWithData } from "../../redux/action/PreLoginCarouselAction";
import { PreLoginRegisterUpload } from "../../models/PreLoginCarouselModel";
import axios from "axios";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";

const PreLoginCarousel: React.FC<any> = (props: any) => {
  const [walletTypeCode, setWalletTypeCode] = useState(
    props.walletTypeCode || ""
  );
  const [walletTypeDescription, setWalletTypeDescription] = useState(
    props.showWalletDescription || ""
  );
  const [preLoginCarouselItemNo, setPreLoginCarouselItemNo] = useState(
    props.preLoginTableData.id || ""
  );
  const [displySeqNo, setDisplySeqNo] = useState(
    props.preLoginTableData.sequence || ""
  );
  const [image, setImage] = useState(Object);
  const [imageUpload, setImageUpload] = useState(Object);
  const [title, setTitle] = useState(props.preLoginTableData.title || "");
  const [body, setBody] = useState(props.preLoginTableData.description || "");

  const [titleError, setTitleError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [imageError, setImageError] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setApiError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.isButtonEvents !== "deleteMethod") {
      setDisplySeqNo(props.maxSeqNo + 1);
    }
  }, []);

  const deletePopUpHandler = (method: string) => {
    if (method === "yes") {
      setDeleteConfirmation(!deleteConfirmation);
      props.finalSubmitHandler(props.isButtonEvents);
    } else {
      setDeleteConfirmation(!deleteConfirmation);
    }
  };

  const carouselHandler = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();

    if (
      props.isButtonEvents === "editMethod" ||
      props.isButtonEvents === "addMethod"
    ) {
      if (validateForm()) {
        setLoading(true);
        setApiError("");
        var formData = new FormData();
        formData.append("file", imageUpload);
        formData.append("category", "ALL");
        formData.append("description", body);
        var apiUrl =
          "http://ec2-3-130-236-100.us-east-2.compute.amazonaws.com:9098/content/v1/content/upload";

        const response = fetch(apiUrl, {
          method: "POST",
          body: formData,
        }).then(async (response) => {
          var value = await response.json();
          if (value.data) {
            registerUpload(value.data);
          } else {
            setLoading(false);
            setApiError(value.error);
          }
        });

        return;
      }
    } else {
      deletePopUpHandler(props.isButtonEvents);
    }
  };

  const registerUpload = async (e: PreLoginRegisterUpload) => {
    var raw = JSON.stringify({
      entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
      walletTypeCode: walletTypeCode,
      walletTypeDescription: walletTypeDescription,
      category: "ALL",
      contentCode: e.contentCode,
      sequence: displySeqNo,
      fileName: e.fileName,
      title: title,
      description: e.description,
    });

    const apiUrl =
      "http://ec2-3-130-236-100.us-east-2.compute.amazonaws.com:9099/marketing/v1/carousel/upload";
    const response = await axios
      .post(apiUrl, raw, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLoading(false);
        setApiError("");
        props.finalSubmitHandler(props.isButtonEvents);
        return response.data;
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplySeqNo(e.target.value);
  };

  const validateForm = () => {
    let formIsValid = true;

    if (body.length <= 0) {
      formIsValid = false;
      setBodyError("*Enter Body");
    } else {
      if (body && body.length >= 100) {
        formIsValid = false;
        setBodyError("*Maximun allowed 100 characters");
      } else {
        setBodyError("");
      }
    }
    if (title.length <= 0) {
      formIsValid = false;
      setTitleError("*Enter Title");
    } else {
      if (title && title.length >= 50) {
        formIsValid = false;
        setTitleError("*Maximun allowed 50 characters");
      } else {
        setTitleError("");
      }
    }

    let imageFile = image;
    if (imageFile.length > 0) {
      if (
        imageFile[0].type !== "image/png" &&
        imageFile[0].type !== "image/jpeg"
      ) {
        formIsValid = false;
        setImageError("*image format does not support");
      }
    } else {
      formIsValid = false;
      setImageError("*image is required ");
    }
    return formIsValid;
  };

  const onChangeForImage = (e: any) => {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    setImage(filesArr);
    setImageUpload(e.target.files[0]);
  };

  const walletDescriptionHandler = (ev: any) => {
    setWalletTypeDescription(ev.currentTarget.value);
  };

  return (
    <Container>
      <h1 style={{ marginTop: "3rem" }}>{props.modalTittle}</h1>
      <div>
        <Card>
          <CardBody className="card-margin">
            <Form>
              <FormGroup row className="Form-group">
                <Label for="exampleEmail" className="label-font" sm={3}>
                  walletType Code
                </Label>
                <Col sm={9}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Wallet Type Code"
                    id="Wallet Type Code"
                    readOnly={true}
                    defaultValue={walletTypeCode}
                    onChange={(ev) => setWalletTypeCode(ev.currentTarget.value)}
                    placeholder="Wallet Type Code"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="exampleSelect" className="label-font" sm={3}>
                  walletType Description
                </Label>
                <Col sm={9}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Wallet Type Description"
                    id="Wallet Type Description"
                    readOnly={
                      props.isButtonEvents === "viewMethod"
                        ? true
                        : props.isButtonEvents === "deleteMethod"
                        ? true
                        : false
                    }
                    defaultValue={walletTypeDescription}
                    onChange={(_ev) => walletDescriptionHandler}
                    placeholder="Wallet Type Description"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="WalletDescription" className="label-font" sm={3}>
                  preLogin Carousel ItemNo
                </Label>
                <Col sm={9}>
                  <CustomInput
                    type="text"
                    className="input-size"
                    name="Pre-Login Carousel Item No"
                    id="Pre-Login Carousel Item No"
                    readOnly={true}
                    defaultValue={preLoginCarouselItemNo}
                    onChange={(ev) =>
                      setPreLoginCarouselItemNo(ev.currentTarget.value)
                    }
                    placeholder="Pre-Login Carousel Item No"
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="Form-group">
                <Label for="WalletDescription" className="label-font" sm={3}>
                  Disply Seqno
                </Label>

                <Col sm={9}>
                  <Input
                    type="select"
                    disabled={true}
                    onChange={handleChange}
                    name="select"
                    id="exampleSelect"
                    value={displySeqNo}
                  >
                    {displySeqNo ? (
                      <option>{displySeqNo}</option>
                    ) : (
                      <option key="-1" value="">
                        Select Seqno
                      </option>
                    )}
                  </Input>
                </Col>
              </FormGroup>
            </Form>
            <FormGroup row className="Form-group">
              <Label for="WalletDescription" className="label-font" sm={3}>
                Image
              </Label>
              <Col sm={9}>
                {props.isButtonEvents === "addMethod" ? (
                  <CustomInput
                    type="file"
                    id="img"
                    name="img"
                    onChange={onChangeForImage}
                  />
                ) : props.isButtonEvents === "editMethod" ? (
                  <div>
                    <CustomInput
                      type="file"
                      id="img"
                      name="img"
                      onChange={onChangeForImage}
                    />
                  </div>
                ) : (
                  <span>test_image.png</span>
                )}
                {imageError && <h6 style={{ color: "red" }}>{imageError}</h6>}
              </Col>
            </FormGroup>
            <FormGroup row className="Form-group">
              <Label for="WalletDescription" className="label-font" sm={3}>
                Title
              </Label>
              <Col sm={9}>
                <CustomInput
                  value={title}
                  type="textarea"
                  className="input-size"
                  name="Title"
                  id="Title"
                  onChange={(ev) => setTitle(ev.currentTarget.value)}
                  placeholder="Title"
                  readOnly={
                    props.isButtonEvents === "viewMethod"
                      ? true
                      : props.isButtonEvents === "deleteMethod"
                      ? true
                      : false
                  }
                />
                {titleError && <h6 style={{ color: "red" }}>{titleError}</h6>}
                {title.length}
                {"/50"}
              </Col>
            </FormGroup>
            <FormGroup row className="Form-group">
              <Label for="WalletDescription" className="label-font" sm={3}>
                Body
              </Label>
              <Col sm={9}>
                <CustomInput
                  defaultValue={body}
                  type="textarea"
                  name="Body"
                  id="Body"
                  onChange={(ev) => setBody(ev.currentTarget.value)}
                  placeholder="Body"
                  readOnly={
                    props.isButtonEvents === "viewMethod"
                      ? true
                      : props.isButtonEvents === "deleteMethod"
                      ? true
                      : false
                  }
                />
                {bodyError && <h6 style={{ color: "red" }}>{bodyError}</h6>}
                {body.length}
                {"/100"}
              </Col>
            </FormGroup>
            <br />
          </CardBody>
          {loading && <span>Uploading...</span>}
          {errorMessage && <h6 style={{ color: "red" }}>{errorMessage}</h6>}
          {props.isButtonEvents === "viewMethod" ? (
            <span>
              <CustomButton
                className="secondary"
                color="secondary"
                onClick={() => {
                  setImageError("");
                  setBodyError("");
                  setTitleError("");
                  props.cancelMethod();
                }}
              >
                Cancel
              </CustomButton>
            </span>
          ) : props.isButtonEvents === "deleteMethod" ? (
            <span>
              <CustomButton
                className="primary"
                color="primary"
                onClick={(e) => carouselHandler(e)}
              >
                Delete
              </CustomButton>
              <CustomButton
                className="secondary"
                color="secondary"
                onClick={() => {
                  setImageError("");
                  setBodyError("");
                  setTitleError("");
                  props.cancelMethod();
                }}
              >
                Cancel
              </CustomButton>
            </span>
          ) : (
            <span>
              <CustomButton
                color="primary"
                className="primary"
                onClick={(e) => carouselHandler(e)}
              >
                Submit
              </CustomButton>
              <CustomButton
                className="secondary"
                color="secondary"
                onClick={() => {
                  setImageError("");
                  setBodyError("");
                  setTitleError("");
                  setApiError("");
                  props.cancelMethod();
                }}
              >
                Cancel
              </CustomButton>
            </span>
          )}
        </Card>
        {
          <DeleteConfirmation
            deleteConfirmation={deleteConfirmation}
            deletePopUpHandler={deletePopUpHandler}
          ></DeleteConfirmation>
        }
      </div>
    </Container>
  );
};

export default PreLoginCarousel;
