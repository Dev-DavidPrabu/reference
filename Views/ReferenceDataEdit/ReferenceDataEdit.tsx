import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  createReferenceData,
  resetCreateMessage,
} from "../../redux/action/ReferenceDataAction";
import { DataArray, Fields } from "../../models/ReferenceDataModel";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { useLocation, useHistory } from "react-router";
import ContentUpload from "../../Utills/ContentUpload";
import { Input, Label } from "reactstrap";
import { MdPreview } from "react-icons/md";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";
import { Switch, Select } from "antd";
import { Dots } from "react-activity";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function Edit(props: { value: Fields; MetaData: DataArray[] }) {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [editCategoryData, setCategoryData]: any = useState({
    id: location.state.value.id,
    categoryCode: location.state.value.categoryCode,
    code: location.state.value?.code,
    description: location.state.value?.description,
    content: location.state.value?.content,
    field1: location.state.value.field1,
    field2: location.state.value.field2,
    field3: location.state.value.field3,
    field4: location.state.value.field4,
    field5: location.state.value.field5,
    field6: location.state.value.field6,
    field7: location.state.value.field7,
    field8: location.state.value.field8,
    field9: location.state.value.field9,
    field10: location.state.value.field10,
    value1: location.state.value.value1 || "",
    value2: location.state.value.value2 || "",
    value3: location.state.value.value3 || "",
    value4: location.state.value.value4 || "",
    value5: location.state.value.value5 || "",
    value6: location.state.value.value6 || "",
    value7: location.state.value.value7 || "",
    value8: location.state.value.value8 || "",
    value9: location.state.value.value9 || "",
    value10: location.state.value.value10 || "",
    sequenceNumber: "1",
  });
  const [isDescription, setDescription] = useState(false);
  const [imagePreviewInfo, setImagePreviewInfo] = useState(
    location.state.value?.content
  );
  const [fileUploadError, setFileUploadError] = useState(false);
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);
  let isvalid = true;
  const createDataError: any = useSelector(
    (state: RootStateOrAny) => state.referenceReducer.createReferenceData?.data
  );
  useEffect(() => {
    if (createDataError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3500);
    }
  }, [createDataError]);
  let metadata_value: Fields = {};
  location.state.MetaData.forEach((key: DataArray) => {
    if (key.categoryCode === location.state.value.categoryCode) {
      metadata_value = key.metadata;
    }
  });
  let sizeArray: any = [];
  let defaultToggleArray: any = {};
  Object.values(metadata_value).forEach((key: any, id: any) => {
    sizeArray.push(parseInt(key.size));
    if (key.dataType === "toggle") {
      defaultToggleArray["field" + (id + 1)] =
        location.state.value["value" + (id + 1)] === "Yes" ? true : false;
    }
  });
  const option = [
    { value: "Enabled", label: "Enabled" },
    { value: "Disabled", label: "Disabled" },
  ];
  const [enable, setEnable] = useState(defaultToggleArray);
  const metadataLength = Object.keys(metadata_value).length;
  let customError: any = [];
  const [customErrorarr, setCustomErrorarr]: any = useState([]);
  const Regex = /^[A-Za-z0-9-/. ]+$/;
  const Regexm = /^$|^[A-Za-z0-9-/. ]+$/;
  const RegexD = /^[A-Za-z0-9-/.()*, ]+$/;
  const handle_Validate = () => {
    for (var i = 0; i < metadataLength; i++) {
      var key = "value" + (i + 1);
      if (
        metadata_value["field" + (i + 1)].dataType != "toggle" &&
        metadata_value["field" + (i + 1)].dataType != "dropdown"
      ) {
        if (metadata_value["field" + (i + 1)].mandatory) {
          if (
            editCategoryData[key]?.length > sizeArray[i] ||
            !Regex.test(editCategoryData[key].toLowerCase())
          ) {
            customError[i] = true;
            isvalid = false;
          } else {
            customError[i] = false;
          }
        } else {
          if (
            editCategoryData[key]?.length > sizeArray[i] ||
            !Regexm.test(editCategoryData[key].toLowerCase())
          ) {
            customError[i] = true;
            isvalid = false;
          } else {
            customError[i] = false;
          }
        }
      }
    }

    if (
      editCategoryData.description.length > 150 ||
      !RegexD.test(editCategoryData.description.toLowerCase())
    ) {
      setDescription(true);
      isvalid = false;
    } else {
      setDescription(false);
    }

    return isvalid;
  };
  const handle_DescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCategoryData({ ...editCategoryData, description: e.target.value });

  let lastDot,
    ext = "";
  const fileUploadValidation = (e: any) => {
    var files = e.target.files,
      fileExt = files[0];
    lastDot = fileExt?.name?.lastIndexOf(".");
    ext = fileExt?.name?.substring(lastDot + 1);
    if (
      ext === "jpg" ||
      ext === "jpeg" ||
      ext === "png" ||
      ext === "svg" ||
      ext === "tiff" ||
      ext === "tif" ||
      ext === "bmp" ||
      ext === "gif"
    ) {
      setFileUploadError(false);
      setIsLoading(true);
      return true;
    } else {
      setFileUploadError(true);
      return false;
    }
  };

  const handle_FileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (fileUploadValidation(e)) {
      let test = await ContentUpload(e.target.files).then((response: any) => {
        setIsLoading(false);
        return response;
      });

      setCategoryData({
        ...editCategoryData,
        content: test?.data?.data?.contentCode,
      });
    }
  };

  const handle_CategoryCancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  const closeFileMessage = () => {
    setFileUploadError(false);
  };
  const handle_CategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCustomErrorarr(customError);
    if (handle_Validate()) {
      dispatch(createReferenceData(editCategoryData));
    }
  };

  return (
    <>
      <div className="px-3 my-4">
        <h1 className="fw-bold container-header">Edit Code</h1>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={false}
            message={createDataError?.message}
            closeMessage={closeMessage}
          />
        )}
        {fileUploadError && (
          <CustomResponseMessage
            apiStatus={false}
            message={
              "*GIF, JPEG, PNG, SVG, BMP, TIFF only these file types are allowed"
            }
            closeMessage={closeFileMessage}
          />
        )}
      </div>
      <div className="Edit">
        <div className="Edit-container">
          <form onSubmit={handle_CategorySubmit}>
            <div className="setting2">
              <div className="setting6">
                <label className="createReference-label">Category</label>
                <CustomInput
                  type="text"
                  className="border-0 referenceData-readOnly"
                  value={location.state.value.categoryCode}
                  readOnly={true}
                />
              </div>
              <div className="setting6">
                <label className="createReference-label">Code</label>
                <CustomInput
                  type="text"
                  className="border-0 referenceData-readOnly"
                  value={location.state.value.code}
                  readOnly={true}
                />
              </div>
              {isDescription ? (
                <>
                  <div className="setting6">
                    <label className="createReference-label">
                      Description<span className="span-col">*</span>
                    </label>
                    <CustomInput
                      type="textarea"
                      className={"Reference_textarea validation-error"}
                      name="comment"
                      defaultValue={location.state.value.description}
                      onChange={handle_DescriptionChange}
                    />
                  </div>

                  <div>
                    <span className="span-col1">
                      Description should not contain special characters. And
                      cannot be empty *
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="setting6">
                    <label className="createReference-label">
                      Description<span className="span-col">*</span>
                    </label>
                    <CustomInput
                      type="textarea"
                      className={"Reference_textarea"}
                      name="comment"
                      defaultValue={location.state.value.description}
                      onChange={handle_DescriptionChange}
                    />
                  </div>
                </>
              )}
              <div className="setting6">
                <label className="createReference-label">Image Upload</label>
                <CustomInput type="text" value={editCategoryData?.content} />
                <Label>
                  <span
                    className="input-group-text ReferenceData-uploadLabel"
                    id="basic-addon2"
                  >
                    Upload
                  </span>
                  <Input
                    type="file"
                    style={{ display: "none" }}
                    className={"Reference_textarea validation-error"}
                    name="imageUpload"
                    onChange={handle_FileUpload}
                  />
                </Label>
                <Label>
                  <div
                    className="d-flex align-items-center ms-1"
                    style={{ margin: "10px 5px 5px 5px" }}
                    onClick={() => {
                      setIsisImagePreviewEnable(!isImagePreviewEnable);
                      setImagePreviewInfo(editCategoryData?.content);
                    }}
                  >
                    <MdPreview />
                  </div>
                </Label>
                <Label>
                  <div>
                    <Dots
                      color="red"
                      size={19}
                      speed={1}
                      animating={isLoading}
                    />
                  </div>
                </Label>
              </div>
              {customErrorarr.includes(true) ? (
                <div className="setting1010">
                  {Object.values(metadata_value).length > 0 && (
                    <label
                      className="customValue-label"
                      style={{ fontSize: "16px" }}
                    >
                      Custom Values
                    </label>
                  )}

                  {Object.values(metadata_value).map(
                    (key: Array<string> | any, idx: number) => {
                      return (
                        <div className="custom_values" key={key.id}>
                          <label>
                            {key.fieldLabel}
                            {key.mandatory && (
                              <span className="span-col">*</span>
                            )}
                          </label>
                          {customErrorarr[idx] ? (
                            key.dataType === "toggle" ? (
                              <Switch
                                checkedChildren="Yes"
                                unCheckedChildren="NO"
                                defaultChecked={enable["field" + (idx + 1)]}
                                onChange={() => {
                                  setEnable({
                                    ...enable,
                                    ["field" + (idx + 1)]:
                                      !enable["field" + (idx + 1)],
                                  });
                                  setCategoryData({
                                    ...editCategoryData,
                                    [key?.value]: !enable["field" + (idx + 1)]
                                      ? "Yes"
                                      : "No",
                                    ["field" + (idx + 1)]: key.fieldLabel,
                                  });
                                }}
                              />
                            ) : key.dataType == "dropdown" ? (
                              <Select
                                defaultValue={
                                  editCategoryData["value" + (idx + 1)]
                                }
                                options={option}
                                style={{ width: "50%" }}
                                onChange={(value: string) => {
                                  setCategoryData({
                                    ...editCategoryData,
                                    [key?.value]: value,
                                    ["field" + (idx + 1)]: key.fieldLabel,
                                  });
                                }}
                              />
                            ) : (
                              <CustomInput
                                type="text"
                                name="Custominput"
                                className={"validation-error"}
                                value={editCategoryData["value" + (idx + 1)]}
                                placeholder={
                                  "Size should not exceed " +
                                  key.size +
                                  " characters"
                                }
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  idx = idx + 1;
                                  setCategoryData({
                                    ...editCategoryData,
                                    [key?.value]: e.target.value,
                                    ["field" + idx]: key.fieldLabel,
                                  });
                                }}
                              />
                            )
                          ) : key.dataType === "toggle" ? (
                            <Switch
                              checkedChildren="Yes"
                              unCheckedChildren="NO"
                              defaultChecked={enable["field" + (idx + 1)]}
                              onChange={() => {
                                setEnable({
                                  ...enable,
                                  ["field" + (idx + 1)]:
                                    !enable["field" + (idx + 1)],
                                });
                                setCategoryData({
                                  ...editCategoryData,
                                  [key?.value]: !enable["field" + (idx + 1)]
                                    ? "Yes"
                                    : "No",
                                  ["field" + (idx + 1)]: key.fieldLabel,
                                });
                              }}
                            />
                          ) : key.dataType === "dropdown" ? (
                            <Select
                              defaultValue={
                                editCategoryData["value" + (idx + 1)]
                              }
                              options={option}
                              style={{ width: "50%" }}
                              onChange={(value: string) => {
                                setCategoryData({
                                  ...editCategoryData,
                                  [key?.value]: value,
                                  ["field" + (idx + 1)]: key.fieldLabel,
                                });
                              }}
                            />
                          ) : (
                            <CustomInput
                              type="text"
                              name="Matname"
                              value={editCategoryData["value" + (idx + 1)]}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                idx = idx + 1;
                                setCategoryData({
                                  ...editCategoryData,
                                  [key?.value]: e.target.value,
                                  ["field" + idx]: key.fieldLabel,
                                });
                              }}
                            />
                          )}
                        </div>
                      );
                    }
                  )}
                  <div>
                    <span className="span-col1">
                      This Field should not contain special characters. And
                      mandatory field cannot be empty *
                    </span>
                  </div>
                </div>
              ) : (
                <div className="setting1010">
                  {Object.values(metadata_value).length > 0 && (
                    <label
                      className="customValue-label"
                      style={{ fontSize: "16px" }}
                    >
                      Custom Values
                    </label>
                  )}

                  {Object.values(metadata_value).map(
                    (key: Array<string> | any, id: number) => {
                      return (
                        <div className="custom_values" key={key.id}>
                          <label>
                            {key.fieldLabel}
                            {key.mandatory && (
                              <span className="span-col">*</span>
                            )}
                          </label>
                          {key.dataType === "toggle" ? (
                            <Switch
                              checkedChildren="Yes"
                              unCheckedChildren="NO"
                              defaultChecked={enable["field" + (id + 1)]}
                              onChange={() => {
                                setEnable({
                                  ...enable,
                                  ["field" + (id + 1)]:
                                    !enable["field" + (id + 1)],
                                });
                                setCategoryData({
                                  ...editCategoryData,
                                  [key?.value]: !enable["field" + (id + 1)]
                                    ? "Yes"
                                    : "No",
                                  ["field" + (id + 1)]: key.fieldLabel,
                                });
                              }}
                            />
                          ) : key.dataType === "dropdown" ? (
                            <Select
                              defaultValue={
                                editCategoryData["value" + (id + 1)]
                              }
                              options={option}
                              style={{ width: "50%" }}
                              onChange={(value: string) => {
                                setCategoryData({
                                  ...editCategoryData,
                                  [key?.value]: value,
                                  ["field" + (id + 1)]: key.fieldLabel,
                                });
                              }}
                            />
                          ) : (
                            <CustomInput
                              type="text"
                              name="Matname"
                              value={editCategoryData["value" + (id + 1)]}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                id = id + 1;
                                setCategoryData({
                                  ...editCategoryData,
                                  [key?.value]: e.target.value,
                                  ["field" + id]: key.fieldLabel,
                                });
                              }}
                            />
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
              <div className="setting3">
                <CustomButton
                  color="danger Reference-DefaultButton"
                  className="btn2"
                >
                  Save
                </CustomButton>
                <CustomButton
                  color="secondary referenceData-cancelButton"
                  className="btn2"
                  component={"payrollEnquiry"}
                  onClick={handle_CategoryCancel}
                >
                  Cancel
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
        <ImagePreview
          showModal={isImagePreviewEnable}
          imageInfo={imagePreviewInfo}
          closeModal={exitImagePreview}
        ></ImagePreview>
      </div>
    </>
  );
}

export default Edit;
