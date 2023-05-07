import { TiArrowBackOutline } from "react-icons/ti";
import { Col, Input, Label, ModalHeader } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";
import { useHistory } from "react-router";
import { BsEye, BsUpload } from "react-icons/bs";
import "./RemitEditOnBehalf.scss";
import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  updateOnBehalfDetails,
  getOnBehalfBackImage,
  getOnBehalfFrontImage,
} from "../../redux/action/RemitEditOnBehalfAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { Modal, ModalBody } from "reactstrap";
import { ApiEndPoints } from "../../Constants/Constants";
import { AiOutlineClose } from "react-icons/ai";

const RemitEditOnBehalf = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    fullNameError: "",
    idTypeCodeError: "",
    idValueError: "",
    nationalityCodeError: "",
    addressError: "",
    contactNumberError: "",
    dateOfBirthError: "",
    occupationCodeError: "",
    remarksError: "",
    statusError: "",
  });
  const [onBehalfDetails, setOnBehalfDetails] = useState({
    fullName: "",
    idTypeCode: "",
    idValue: "",
    nationalityCode: "",
    address: "",
    contactNumber: "",
    dateOfBirth: "",
    occupationCode: "",
    employerName: "",
    remarks: "",
    status: "",
  });

  const [frontFileSelected, setFrontFileSelected] = useState<File>();
  const [backFileSelected, setBackFileSelected] = useState<File>();
  const [apiStatus, setApiStatus] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [imgBack, setImgBack] = useState<any>();
  const [upload, setUpload] = useState(true);
  const [uploadBack, setUploadBack] = useState(true);
  const [frontVal, setFrontVal] = useState(false);
  const [backVal, setBackVal] = useState(false);
  const [errors, setErrors] = useState({
    fileError: "",
  });
  const [errorBack, setErrorBack] = useState({ fileError: "" });

  const historyData: any = history?.location?.state;
  const data: any = new FormData();

  const onBehalfEditData: any = useSelector(
    (state: RootStateOrAny) =>
      state?.RemitEditOnBehalfReducer?.updateOnBehalfDetailsResponse
  );

  const onBehalfFrontImageData: any = useSelector(
    (state: RootStateOrAny) =>
      state?.RemitEditOnBehalfReducer?.getOnBehalfFrontImageResponse
  );

  const onBehalfBackImageData: any = useSelector(
    (state: RootStateOrAny) =>
      state?.RemitEditOnBehalfReducer?.getOnBehalfBackImageResponse
  );

  useEffect(() => {
    if (onBehalfFrontImageData?.data) {
      setImg(
        ApiEndPoints.onbehalfDocUrl + onBehalfFrontImageData?.data?.contentCode
      );
    }
  }, [onBehalfFrontImageData]);

  useEffect(() => {
    if (onBehalfBackImageData?.data) {
      setImgBack(
        ApiEndPoints.onbehalfDocUrl + onBehalfBackImageData?.data?.contentCode
      );
    }
  }, [onBehalfBackImageData]);

  const closeMessage = () => {
    setApiMessage("");
  };

  const handlechange = (e: any) => {
    setOnBehalfDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const frontfileSelect = (e: any) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setFrontFileSelected(fileList[0]);
  };

  const backfileSelect = (e: any) => {
    const fileList = e.target.files;

    if (!fileList) return;

    setBackFileSelected(fileList[0]);
  };

  const handleFrontBackImg = useCallback(async () => {
    let frontBlob = new Blob([onBehalfFrontImageData], { type: "image/png" });
    let backBlob = new Blob([onBehalfBackImageData], { type: "image/png" });

    let frontImage = new File([frontBlob], "frontimage.png", {
      type: frontBlob.type,
    });
    let backImage = new File([backBlob], "backimage.png", {
      type: backBlob.type,
    });

    setFrontFileSelected(frontImage);
    setBackFileSelected(backImage);
  }, []);

  useEffect(() => {
    handleFrontBackImg();
  }, [onBehalfFrontImageData, onBehalfBackImageData, handleFrontBackImg]);

  useEffect(() => {
    closeMessage();
    if (historyData) {
      setOnBehalfDetails((prev) => {
        return {
          ...prev,
          ...historyData,
        };
      });
    }
  }, [historyData]);

  useEffect(() => {
    if (onBehalfEditData?.error) {
      setApiMessage("Please try again later");
      setApiStatus(false);
      setIsLoading(false);
      setIsError(false);
    } else {
      setApiMessage("Value Edited Successfully");
      setApiStatus(true);
      setIsLoading(false);
      setIsError(false);
    }
  }, [onBehalfEditData]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [setApiMessage, apiMessage]);

  useEffect(() => {
    dispatch(getOnBehalfBackImage(historyData?.id));
    dispatch(getOnBehalfFrontImage(historyData?.id));
  }, [historyData?.id, dispatch]);

  const clickBack = () => {
    history.push({
      pathname: "/dashboard/remit-setup/Remittance-Transaction-Enquiry",
      state: {
        tid: historyData.tid,
        isDashBoardVisible: false,
        transactionId: [historyData.transactionId],
      },
    });
  };

  const validate = () => {
    let fullNameErrors = customValidator(
      "fullNameBehalf",
      "Full Name",
      onBehalfDetails?.fullName
    );
    let idTypeCodeErrors = customValidator(
      "idTypeCode",
      "Id Typecode",
      onBehalfDetails?.idTypeCode
    );
    let idValueErrors = customValidator(
      "idValue",
      "Id Value",
      onBehalfDetails?.idValue
    );
    let nationalityCodeErrors = customValidator(
      "nationalityCode",
      "Nationality Code",
      onBehalfDetails?.nationalityCode
    );
    let addressErrors = customValidator(
      "address",
      "Address",
      onBehalfDetails?.address
    );
    let contactNumberErrors = customValidator(
      "contactNumber",
      "Contact Number",
      onBehalfDetails?.contactNumber
    );
    let dateOfBirthErrors = customValidator(
      "dateOfBirth",
      "Date Of Birth",
      onBehalfDetails?.dateOfBirth
    );
    let occupationCodeErrors = customValidator(
      "occupationCode",
      "Occupation Code",
      onBehalfDetails?.occupationCode
    );
    let remarksErrors = customValidator(
      "remarks",
      "Remarks",
      onBehalfDetails?.remarks
    );
    let statusErrors = customValidator(
      "status",
      "Status",
      onBehalfDetails?.status
    );

    if (
      !(
        fullNameErrors === "null" &&
        idTypeCodeErrors === "null" &&
        idValueErrors === "null" &&
        nationalityCodeErrors === "null" &&
        addressErrors === "null" &&
        contactNumberErrors === "null" &&
        dateOfBirthErrors === "null" &&
        occupationCodeErrors === "null" &&
        remarksErrors === "null" &&
        statusErrors === "null"
      )
    ) {
      setError({
        fullNameError: fullNameErrors,
        idTypeCodeError: idTypeCodeErrors,
        idValueError: idValueErrors,
        nationalityCodeError: nationalityCodeErrors,
        addressError: addressErrors,
        contactNumberError: contactNumberErrors,
        dateOfBirthError: dateOfBirthErrors,
        occupationCodeError: occupationCodeErrors,
        remarksError: remarksErrors,
        statusError: statusErrors,
      });
      return false;
    }
    setError({
      fullNameError: "",
      idTypeCodeError: "",
      idValueError: "",
      nationalityCodeError: "",
      addressError: "",
      contactNumberError: "",
      dateOfBirthError: "",
      occupationCodeError: "",
      remarksError: "",
      statusError: "",
    });
    return true;
  };

  const onReset = () => {
    history.push({
      pathname: "/dashboard/remit-setup/Remittance-Transaction-Enquiry",
      state: {
        tid: historyData.tid,
        isDashBoardVisible: false,
        transactionId: [historyData.transactionId],
      },
    });
  };

  const handleSubmit = () => {
    if (validate() && frontFileSelected) {
      setIsLoading(true);

      data.append("fullName", onBehalfDetails["fullName"]);
      data.append("idTypeCode", onBehalfDetails["idTypeCode"]);
      data.append("idValue", onBehalfDetails["idValue"]);
      data.append("nationalityCode", onBehalfDetails["nationalityCode"]);
      data.append("address", onBehalfDetails["address"]);
      data.append("contactNumber", onBehalfDetails["contactNumber"]);
      data.append("dateOfBirth", onBehalfDetails["dateOfBirth"]);
      data.append("occupationCode", onBehalfDetails["occupationCode"]);
      data.append("employerName", onBehalfDetails["employerName"]);
      data.append("remarks", onBehalfDetails["remarks"]);
      data.append("statusCode", onBehalfDetails["status"]);
      data.append("documentFront", frontFileSelected);
      data.append("documentBack", backFileSelected);

      dispatch(updateOnBehalfDetails(data, historyData?.id));
    } else {
      setIsError(true);
    }
  };

  const [modal, setModal] = useState(false);
  const [modalBack, setModalBack] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleBack = () => setModalBack(!modalBack);
  const [preview, setPreview] = useState<any>();
  const [img, setImg] = useState<any>();

  const handleFrontClick = () => {
    toggle();
    setErrors({
      fileError: "",
    });
  };

  const handleBackClick = () => {
    toggleBack();
  };

  const viewer = (img: any) => {
    var newVideoBlob = new Blob([img], { type: "image/jpeg" });
    let frontImage = new File([newVideoBlob], "frontimage.jpeg", {
      type: newVideoBlob.type,
    });
    setPreview(URL.createObjectURL(frontImage));
  };
  function fileFormatValidation(filename: string) {
    var type = filename?.split(".");

    if (type[type.length - 1] === "png") {
      setErrors({
        fileError: "",
      });
      return true;
    } else if (type[type.length - 1] === "jpeg") {
      setErrors({
        fileError: "",
      });
      return true;
    } else if (type[type.length - 1] === "jpg") {
      setErrors({
        fileError: "",
      });
      return true;
    } else if (type[type.length - 1] === "raw") {
      setErrors({
        fileError: "",
      });
      return true;
    } else {
      setErrors({
        fileError: "Image must in image format",
      });
      return false;
    }
  }

  const uploadFrontImage = (e: any) => {
    let fileName = e.target?.files[0]?.name;
    if (fileFormatValidation(fileName)) {
      const [file] = e.target.files;
      let frontBlob = new Blob([file], { type: "image" });
      setImg(URL.createObjectURL(frontBlob));
      setFrontFileSelected(file);
      setUpload(false);
      setFrontVal(false);
      setErrors({
        fileError: "",
      });
    } else {
      setErrors({
        fileError: "Image must in image format",
      });
    }
  };

  const uploadBackImage = (e: any) => {
    let fileName = e?.target?.files[0]?.name;
    if (fileFormatValidation(fileName)) {
      const [file] = e.target.files;
      let frontBlob = new Blob([file], { type: "image" });
      setImgBack(URL.createObjectURL(frontBlob));
      setBackFileSelected(file);
      setUploadBack(false);
      setBackVal(false);
      setErrorBack({
        fileError: "",
      });
    } else {
      setErrorBack({
        fileError: "Image must in image format",
      });
    }
  };

  const onCancel = () => {
    setUpload(true);
    setBackVal(false);
    setImg(
      ApiEndPoints.onbehalfDocUrl + onBehalfFrontImageData?.data?.contentCode
    );
    setErrors({
      fileError: "",
    });
  };
  const onSubmitFront = () => {
    setModal(!modal);
    setUpload(true);
    setFrontVal(true);
  };
  const onCloseFront = () => {
    if (frontVal === true) {
      setModal(!modal);
      setUpload(true);
    } else {
      setModal(!modal);
      setUpload(true);
      setImg(
        ApiEndPoints.onbehalfDocUrl + onBehalfFrontImageData?.data?.contentCode
      );
    }
  };

  const onCancelBack = () => {
    setUploadBack(true);
    setBackVal(false);
    setImgBack(
      ApiEndPoints.onbehalfDocUrl + onBehalfBackImageData?.data?.contentCode
    );
    setErrorBack({
      fileError: "",
    });
  };
  const onSubmitBack = () => {
    setModalBack(!modalBack);
    setUploadBack(true);
    setBackVal(true);
  };
  const onCloseBack = () => {
    if (backVal === true) {
      setModalBack(!modalBack);
      setUploadBack(true);
    } else {
      setModalBack(!modalBack);
      setUploadBack(true);
      setImgBack(
        ApiEndPoints.onbehalfDocUrl + onBehalfBackImageData?.data?.contentCode
      );
    }
  };
  return (
    <div className="p-4">
      <>
        <div className="d-flex justify-content-between align-items-center pb-3">
          <div className="d-flex col justify-content-between title">
            Edit On Behalf Details
          </div>
          {/* <CustomButton className="backbtneditBehalf" onClick={clickBack}>
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton> */}
          <CustomButton className="backBtnDevice" onClick={clickBack}>
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={apiStatus}
            message={apiMessage}
            closeMessage={closeMessage}
            errorFix={true}
          />
        )}
        <CustomLoader isLoading={isLoading} size={50} />
        <div className="edit-behalf-wrapper">
          <div className="edit-behalf-form">
            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Full Name
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="fullName"
                  className=""
                  value={onBehalfDetails.fullName}
                  onChange={handlechange}
                ></Input>
                {error.fullNameError && error?.fullNameError !== "null" && (
                  <Label className="text-red">{error.fullNameError}</Label>
                )}
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Contact No
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="contactNumber"
                  value={onBehalfDetails.contactNumber}
                  onChange={handlechange}
                />
                {error.contactNumberError &&
                  error?.contactNumberError !== "null" && (
                    <Label className="text-red">
                      {error.contactNumberError}
                    </Label>
                  )}
              </Col>
            </div>
            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Nationality
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  style={{ height: "36px" }}
                  type="text"
                  className="branchInput-height"
                  name="nationalityCode"
                  value={onBehalfDetails.nationalityCode}
                  onChange={handlechange}
                />
                {error.nationalityCodeError &&
                  error?.nationalityCodeError !== "null" && (
                    <Label className="text-red">
                      {error.nationalityCodeError}
                    </Label>
                  )}
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Date of Birth
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={onBehalfDetails.dateOfBirth}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={handlechange}
                />
                {error.dateOfBirthError &&
                  error?.dateOfBirthError !== "null" && (
                    <Label className="text-red">{error.dateOfBirthError}</Label>
                  )}
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                ID Type
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  className=""
                  name="idTypeCode"
                  value={onBehalfDetails.idTypeCode}
                  onChange={handlechange}
                />
                {error.idTypeCodeError && error?.idTypeCodeError !== "null" && (
                  <Label className="text-red">{error.idTypeCodeError}</Label>
                )}
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                ID No
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="idValue"
                  value={onBehalfDetails.idValue}
                  onChange={handlechange}
                />
                {error.idValueError && error?.idValueError !== "null" && (
                  <Label className="text-red">{error.idValueError}</Label>
                )}
              </Col>
            </div>
            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                occupationCode
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="occupationCode"
                  value={onBehalfDetails.occupationCode}
                  onChange={handlechange}
                ></Input>
                {error.occupationCodeError &&
                  error?.occupationCodeError !== "null" && (
                    <Label className="text-red">
                      {error.occupationCodeError}
                    </Label>
                  )}
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Employer Name
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="employerName"
                  value={onBehalfDetails.employerName}
                  onChange={handlechange}
                ></Input>
              </Col>
            </div>
            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Address
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="address"
                  value={onBehalfDetails.address}
                  onChange={handlechange}
                ></Input>
                {error.addressError && error?.addressError !== "null" && (
                  <Label className="text-red">{error.addressError}</Label>
                )}
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Remarks
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={4}>
                <Input
                  type="text"
                  name="remarks"
                  value={onBehalfDetails.remarks}
                  onChange={handlechange}
                ></Input>
                {error.remarksError && error?.remarksError !== "null" && (
                  <Label className="text-red">{error.remarksError}</Label>
                )}
              </Col>
            </div>

            <div className="row mb-3">
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Upload Front Image
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={1}>
                <div className="frontEye cursor">
                  <button
                    onClick={handleFrontClick}
                    className="frontEye border-0"
                  >
                    <BsEye></BsEye>
                    <span className="ms-1">Front</span>
                  </button>
                </div>
                <div className="modalPopUp">
                  <Modal
                    isOpen={modal}
                    toggle={toggle}
                    modalTransition={{ timeout: 500 }}
                  >
                    <ModalHeader
                      className="closeIconpopup border-0"
                      cssModule={{ close: "border-0" }}
                    >
                      <div>
                        <AiOutlineClose
                          className="cursor-pointer closeIconSize"
                          onClick={onCloseFront}
                        />
                      </div>
                    </ModalHeader>
                    <ModalBody className="modalBodyPopUpEdit">
                      <div className="modalpopRemitEdit-wrapper">
                        <div className="modalpopRemitEdit-title">
                          <h5 className="titleModal">Front Image</h5>
                          <div>
                            <img
                              src={img}
                              alt=""
                              style={{ height: "200px", width: "350px" }}
                            />
                          </div>
                        </div>
                        {errors.fileError && errors?.fileError !== "" && (
                          <Label className="text-red">{errors.fileError}</Label>
                        )}
                        <div className="row">
                          {upload === true ? (
                            <div className="bulk-customer-upload-icon text-bold text-white uploadBtn">
                              <Label>
                                <BsUpload
                                  type="file"
                                  className="cursor"
                                  style={{ fontSize: "24px" }}
                                ></BsUpload>
                                <Input
                                  style={{ display: "none" }}
                                  type="file"
                                  accept="image/*"
                                  className="cursor"
                                  onChange={uploadFrontImage}
                                ></Input>
                                <span className="ms-1 cursor">Upload</span>
                              </Label>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm save-button border-0 "
                              onClick={onSubmitFront}
                            >
                              Submit
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-sm cancel-button ms-3 border-0 cancel-btn"
                            onClick={onCancel}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </Col>
              <Col sm={1}>
                <div className="backEyeEdit cursor">
                  <button
                    onClick={handleBackClick}
                    className="backBtnClr border-0"
                  >
                    <BsEye></BsEye>
                    <span className="ms-1">Back</span>
                  </button>
                </div>
                <div className="modalPopUp">
                  <Modal
                    isOpen={modalBack}
                    toggle={toggleBack}
                    modalTransition={{ timeout: 500 }}
                  >
                    <ModalHeader
                      className="closeIconpopup border-0"
                      cssModule={{ close: "border-0" }}
                    >
                      <div>
                        <AiOutlineClose
                          className="cursor-pointer  closeIconSize"
                          onClick={onCloseBack}
                        />
                      </div>
                    </ModalHeader>
                    <ModalBody className="modalBodyPopUpEdit">
                      <div className="modalpopRemitEdit-wrapper">
                        <div className="modalpopRemitEdit-title">
                          <h5 className="titleModal">Back Image</h5>
                          <div>
                            <img
                              src={imgBack}
                              alt=""
                              style={{ height: "200px", width: "350px" }}
                            />
                          </div>
                        </div>
                        {errorBack.fileError && errorBack?.fileError !== "" && (
                          <Label className="text-red">
                            {errorBack.fileError}
                          </Label>
                        )}
                        <div className="row">
                          {uploadBack === true ? (
                            <>
                              <div className="bulk-customer-upload-icon text-bold text-white uploadBtn">
                                <Label>
                                  <BsUpload
                                    type="file"
                                    className="cursor"
                                    style={{ fontSize: "24px" }}
                                  ></BsUpload>
                                  <Input
                                    style={{ display: "none" }}
                                    type="file"
                                    accept="image/*"
                                    className="cursor"
                                    onChange={uploadBackImage}
                                  ></Input>
                                  <span className="ms-1 cursor">Upload</span>
                                </Label>
                              </div>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm save-button border-0 "
                              onClick={onSubmitBack}
                            >
                              Submit
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-sm cancel-button ms-3 border-0 cancel-btn"
                            onClick={onCancelBack}
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </div>
              </Col>
              <Col sm={2}>
                {!frontFileSelected && (
                  <p
                    style={{
                      color: "crimson",
                      display: `${isError ? "block" : "none"}`,
                    }}
                  >
                    Please Upload Images
                  </p>
                )}
              </Col>
              <Label
                className="add-branch-label-font-weight label-text"
                for="exampleText"
                sm={2}
              >
                Status
                <span className="container-body-label-color">*</span>
              </Label>
              <Col sm={2}>
                <Input
                  type="select"
                  name="status"
                  className="form-select"
                  value={onBehalfDetails.status}
                  onChange={handlechange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </Input>
                {error.statusError && error?.statusError !== "null" && (
                  <Label className="text-red">{error.statusError}</Label>
                )}
              </Col>
            </div>
          </div>
          <div className="d-flex  align-items-center pb-5 Cnt-btn">
            <div className="col-sm-2 button-sub-can" />
            <button
              type="button"
              className="btn btn-primary btn-sm save-button border-0 "
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-sm cancel-button ms-3 border-0 cancel-btn"
              onClick={onReset}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    </div>
  );
};
export default RemitEditOnBehalf;
