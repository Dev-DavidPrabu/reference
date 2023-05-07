import React, { useCallback, useEffect, useState } from "react";
import { Input, Label, Col, Button } from "reactstrap";
import "../FestiveSummary/FestiveSummary.scss";
import "../FestivePackageForm/FestivePackageForm.scss";
import { Dots } from "react-activity";
import ContentUpload from "../../Utills/ContentUpload";
import {
  addNewFestivalSeason,
  resetCreateSeasonInfo,
} from "../../redux/action/FestivePackageActions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { customValidator } from "../../Constants/Validation";
import { MdPreview } from "react-icons/md";
import ImagePreview from "../ImagePreview/ImagePreview";

const FestivePackageForm = (props: any) => {
  const addedFestiveInfo = useSelector(
    (state: RootStateOrAny) => state.FestivePackageReducer.createSeasonResponse
  );
  const dispatch = useDispatch();
  const [moveToNextStep, setMoveToNextStep] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [festiveDetials, setFestiveDetials] = useState({
    entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
    seasonNumber: "",
    seasonCode: "",
    seasonDescription: "",
    packageDescription: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    successMessage: "",
    successContentId: undefined,
    failMessage: "",
    failContentId: undefined,
    summaryContentId: undefined,
    bannerContentId: undefined,
    minAmount: "10",
    maxAmount: "100",
    failureMessage: "",
    id: "",
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    seasonNumberError: "",
    seasonCodeError: "",
    seasonDescriptionError: "",
    startDateError: "",
    successContentIdError: "",
    sucessMessageError: "",
  });

  useEffect(() => {
    if (props.location.state !== undefined) {
      setFestiveDetials(props.location.state);
    }
  }, [props.location.state]);

  const [isImagePreviewEnable, setIsisImagePreviewEnable] =
    React.useState(false);
  const [imagePreviewInfo, setImagePreviewInfo] = React.useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const addNewFestivalSeasonInfo = useCallback(
    async (festivalInformation: any) => {
      try {
        if (props.location.state !== undefined) {
          dispatch(addNewFestivalSeason(festivalInformation));
        } else {
          delete festivalInformation["id"];
          dispatch(addNewFestivalSeason(festivalInformation));
        }
      } catch (err) {}
    },
    [dispatch]
  );
  const eraseCratedSeasonInfo = useCallback(async () => {
    try {
      dispatch(resetCreateSeasonInfo());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (addedFestiveInfo !== undefined) {
      if (addedFestiveInfo.data) {
        eraseCratedSeasonInfo().then(() => {
          props.history.push("/dashboard/Festive-Packet-Summary");
        });
        setError("");
      } else {
        setError(addedFestiveInfo.message);
      }
    }
  }, [addedFestiveInfo]);

  const onSubmitCreateNewFestivePackage = () => {
    if (validate()) {
      if (props.location.state === undefined) {
        addNewFestivalSeasonInfo(festiveDetials);
      } else {
        let newObject = festiveDetials;
        newObject = Object.assign(festiveDetials, {
          id: props.location.state.id,
        });
        addNewFestivalSeasonInfo(newObject);
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "successContentId") {
      setIsLoading(true);
      let test = await ContentUpload(e.target.files).then((response: any) => {
        setIsLoading(false);
        return response;
      });
      setFestiveDetials({
        ...festiveDetials,
        successContentId: test?.data?.data?.contentCode,
      });
    } else if (e.target.name === "failContentId") {
      setIsLoading(true);
      let test = await ContentUpload(e.target.files).then((response: any) => {
        setIsLoading(false);
        return response;
      });
      setFestiveDetials({
        ...festiveDetials,
        failContentId: test.data.data.contentCode,
      });
    } else if (e.target.name === "summaryContentId") {
      setIsLoading(true);
      let test = await ContentUpload(e.target.files).then((response: any) => {
        setIsLoading(false);
        return response;
      });
      setFestiveDetials({
        ...festiveDetials,
        summaryContentId: test.data.data.contentCode,
      });
    } else if (e.target.name === "bannerContentId") {
      setIsLoading(true);
      let test = await ContentUpload(e.target.files).then((response: any) => {
        setIsLoading(false);
        return response;
      });
      setFestiveDetials({
        ...festiveDetials,
        bannerContentId: test.data.data.contentCode,
      });
    } else {
      setFestiveDetials({ ...festiveDetials, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    let checksuccessContentIdError = customValidator(
      "required",
      "Success Image",
      festiveDetials.seasonNumber
    );
    let checkSeasonNumberError = customValidator(
      "seasonNumber",
      "Festive Packet Season Number",
      festiveDetials.seasonNumber
    );
    let checkSeasonCodeError = customValidator(
      "seasonCode",
      "Festive Packet Season",
      festiveDetials.seasonCode
    );
    let checkSeasonDescriptionError = customValidator(
      "seasonDescription",
      "Description",
      festiveDetials.seasonDescription
    );
    let checkStartDateError = customValidator(
      "startDate",
      "Date",
      festiveDetials.startDate
    );
    let checksuccessMessageError = customValidator(
      "required",
      "Success Message",
      festiveDetials.successMessage
    );

    if (
      !(
        checkSeasonNumberError === "null" &&
        checkSeasonCodeError === "null" &&
        checkSeasonDescriptionError === "null" &&
        checksuccessContentIdError === "null" &&
        checksuccessMessageError === "null"
      )
    ) {
      setErrors({
        seasonNumberError: checkSeasonNumberError,
        seasonCodeError: checkSeasonCodeError,
        seasonDescriptionError: checkSeasonDescriptionError,
        startDateError: checkStartDateError,
        successContentIdError: checksuccessContentIdError,
        sucessMessageError: checksuccessMessageError,
      });
      setError("* Please Complete All the Required Field");
      return false;
    }
    setErrors({
      seasonNumberError: "",
      seasonCodeError: "",
      seasonDescriptionError: "",
      startDateError: "",
      successContentIdError: "",
      sucessMessageError: "",
    });
    setError("");
    return true;
  };

  const ImagePreviewDeatails = (imageInfo: string) => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
    if (imageInfo === "success") {
      let contentInfo = festiveDetials.successContentId;
      setImagePreviewInfo(contentInfo);
    } else if (imageInfo === "fail") {
      let contentInfo = festiveDetials.failContentId;
      setImagePreviewInfo(contentInfo);
    } else if (imageInfo === "banner") {
      let contentInfo = festiveDetials.bannerContentId;
      setImagePreviewInfo(contentInfo);
    } else if (imageInfo === "summary") {
      let contentInfo = festiveDetials.summaryContentId;
      setImagePreviewInfo(contentInfo);
    }
  };
  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };
  return (
    <div className="p-4">
      <div className="add-festive-title">
        {props.location.state === undefined
          ? "Add Festive Package"
          : "Edit Festive Package"}
      </div>
      <div className="festive-package-step d-flex align-items-center justify-content-evenly">
        <div
          className={
            moveToNextStep ? "festive-package-one" : "festive-package-four"
          }
        >
          Step 1
        </div>
        <div className="line"></div>
        <div
          className={
            !moveToNextStep ? "festive-package-two" : "festive-package-three"
          }
        >
          Step 2
        </div>
      </div>
      <div className="add-festive-wrapper">
        <div className="add-festive-package-form">
          {moveToNextStep ? (
            <>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Festive Packet Season Number{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="seasonNumber"
                    onChange={handleChange}
                    value={festiveDetials.seasonNumber}
                  />
                  {errors.seasonNumberError &&
                    errors?.seasonNumberError !== "null" && (
                      <Label className="error-text-red">
                        {errors.seasonNumberError}
                      </Label>
                    )}
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Festive Packet Season{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="seasonCode"
                    onChange={handleChange}
                    value={festiveDetials.seasonCode}
                  />
                  {errors.seasonCodeError &&
                    errors?.seasonCodeError !== "null" && (
                      <Label className="error-text-red">
                        {errors.seasonCodeError}
                      </Label>
                    )}
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Description{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={8}>
                  <Input
                    type="textarea"
                    name="seasonDescription"
                    onChange={handleChange}
                    value={festiveDetials.seasonDescription}
                  />
                  {errors.seasonDescriptionError &&
                    errors?.seasonDescriptionError !== "null" && (
                      <Label className="error-text-red">
                        {errors.seasonDescriptionError}
                      </Label>
                    )}
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Date <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={4}>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    value={festiveDetials.startDate}
                    min={new Date().toISOString().slice(0, 10)}
                  />
                  {errors.startDateError &&
                    errors?.startDateError !== "null" && (
                      <Label className="error-text-red">
                        {errors.startDateError}
                      </Label>
                    )}
                </Col>
                <Col sm={4}>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    value={festiveDetials.endDate}
                    min={festiveDetials.startDate}
                  />
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Time
                </Label>
                <Col sm={4}>
                  <Input
                    type="time"
                    name="startTime"
                    onChange={handleChange}
                    value={festiveDetials.startTime}
                    step="1"
                  />
                </Col>
                <Col sm={4}>
                  <Input
                    type="time"
                    name="endTime"
                    onChange={handleChange}
                    value={festiveDetials.endTime}
                    step="1"
                  />
                </Col>
              </div>

              <div className="mt-4 d-flex align-items-center justify-content-center">
                <Button
                  className="next-btn"
                  onClick={() => setMoveToNextStep(!moveToNextStep)}
                >
                  Next
                </Button>
                <Button
                  className="back-btn"
                  onClick={() =>
                    props.history.push("/dashboard/Festive-Packet-Summary")
                  }
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Success Message{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="successMessage"
                    onChange={handleChange}
                    value={festiveDetials.successMessage}
                  />
                  {errors.sucessMessageError &&
                    errors?.sucessMessageError !== "null" && (
                      <Label className="error-text-red">
                        {errors.sucessMessageError}
                      </Label>
                    )}
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Success Image
                  <span className="container-body-label-color">*</span>
                </Label>
                <Col sm={8}>
                  <div className="input-group mb-3">
                    <Input
                      disabled={true}
                      type="text"
                      class="form-control"
                      style={{ background: "white" }}
                      value={festiveDetials.successContentId}
                    />
                    <div className="input-group-append">
                      <Label>
                        <span className="input-group-text" id="basic-addon2">
                          Upload
                        </span>
                        <Input
                          style={{ display: "none" }}
                          type="file"
                          className=""
                          name="successContentId"
                          onChange={handleChange}
                        ></Input>
                      </Label>
                    </div>
                    <div
                      className="d-flex align-items-center ms-1"
                      onClick={() => ImagePreviewDeatails("success")}
                    >
                      <MdPreview />
                    </div>
                  </div>
                  {errors.successContentIdError &&
                    errors?.successContentIdError !== "null" && (
                      <Label className="error-text-red">
                        {errors.successContentIdError}
                      </Label>
                    )}
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Fail Message{" "}
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="failMessage"
                    onChange={handleChange}
                    value={festiveDetials.failMessage}
                  />
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Fail Image{" "}
                </Label>
                <Col sm={8}>
                  <div className="input-group mb-3">
                    <Input
                      disabled={true}
                      type="text"
                      class="form-control"
                      style={{ background: "white" }}
                      value={festiveDetials.failContentId}
                    />
                    <div className="input-group-append">
                      <Label>
                        <span className="input-group-text" id="basic-addon2">
                          Upload
                        </span>
                        <Input
                          style={{ display: "none" }}
                          type="file"
                          className=""
                          name="failContentId"
                          onChange={handleChange}
                        ></Input>
                      </Label>
                    </div>
                    <div
                      className="d-flex align-items-center ms-1"
                      onClick={() => ImagePreviewDeatails("fail")}
                    >
                      <MdPreview />
                    </div>
                  </div>
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Summary Header
                </Label>
                <Col sm={8}>
                  <div className="input-group mb-3">
                    <Input
                      disabled={true}
                      type="text"
                      class="form-control"
                      style={{ background: "white" }}
                      value={festiveDetials.summaryContentId}
                    />
                    <div className="input-group-append">
                      <Label>
                        <span className="input-group-text" id="basic-addon2">
                          Upload
                        </span>
                        <Input
                          style={{ display: "none" }}
                          type="file"
                          className=""
                          name="summaryContentId"
                          onChange={handleChange}
                        ></Input>
                      </Label>
                    </div>
                    <div
                      className="d-flex align-items-center ms-1"
                      onClick={() => ImagePreviewDeatails("summary")}
                    >
                      <MdPreview />
                    </div>
                  </div>
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Banner
                </Label>
                <Col sm={8}>
                  <div className="input-group mb-3">
                    <Input
                      disabled={true}
                      type="text"
                      class="form-control"
                      style={{ background: "white" }}
                      value={festiveDetials.bannerContentId}
                    />
                    <div className="input-group-append">
                      <Label>
                        <span className="input-group-text" id="basic-addon2">
                          Upload
                        </span>
                        <Input
                          style={{ display: "none" }}
                          type="file"
                          className=""
                          name="bannerContentId"
                          onChange={handleChange}
                        ></Input>
                      </Label>
                    </div>
                    <div
                      className="d-flex align-items-center ms-1"
                      onClick={() => ImagePreviewDeatails("banner")}
                    >
                      <MdPreview />
                    </div>
                  </div>
                </Col>
              </div>
              <div className="row mb-3">
                <Label
                  className="add-festive-label-font-weight"
                  for="exampleText"
                  sm={4}
                >
                  Activate/Deactivate{" "}
                </Label>
                <Col sm={2}>
                  <Label>
                    <Input
                      onClick={() => setIsActive(!isActive)}
                      className="festive-package-check-box"
                      type="checkbox"
                      id="checkbox2"
                      checked={isActive}
                    />
                    Activate
                  </Label>
                </Col>
                <Col sm={2}>
                  <Label>
                    <Input
                      onClick={() => setIsActive(!isActive)}
                      className="festive-package-check-box"
                      type="checkbox"
                      id="checkbox2"
                      checked={!isActive}
                    />
                    DeActivate
                  </Label>
                </Col>
                {error && (
                  <span style={{ color: "red", fontSize: "16px" }}>
                    {error}
                  </span>
                )}
              </div>
              <div className="mt-4 d-flex align-items-center justify-content-center">
                <Button
                  style={{ width: "35%" }}
                  className="next-btn"
                  onClick={onSubmitCreateNewFestivePackage}
                >
                  Save and Continue
                </Button>
                <Button
                  className="back-btn"
                  onClick={() => setMoveToNextStep(!moveToNextStep)}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </div>
        <div>
          <Dots color="red" size={30} speed={1} animating={isLoading} />
        </div>
      </div>
      <ImagePreview
        showModal={isImagePreviewEnable}
        imageInfo={imagePreviewInfo}
        closeModal={exitImagePreview}
      ></ImagePreview>
    </div>
  );
};

export default FestivePackageForm;
