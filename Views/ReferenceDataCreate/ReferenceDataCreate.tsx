import React, { useEffect, useState } from "react";
import {
  createReferenceData,
  resetCreateMessage,
} from "../../redux/action/ReferenceDataAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
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

function Create(props: { value: string; MetaData: DataArray[] }) {
  const location: any = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [imagePreviewInfo, setImagePreviewInfo] = useState(undefined);
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  let metaData_Values: Fields = {};
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

  location.state.MetaData.forEach((key: DataArray) => {
    if (key.categoryCode === location.state.value) {
      metaData_Values = key.metadata;
    }
  });
  let sizeArray: any = [];
  let defaultToggleArray: any = {};
  Object.values(metaData_Values).forEach((key: any, id: any) => {
    sizeArray.push(parseInt(key.size));
    if (key.dataType === "toggle") {
      defaultToggleArray["field" + (id + 1)] = true;
    }
  });
  const option = [
    { value: "Enabled", label: "Enabled" },
    { value: "Disabled", label: "Disabled" },
  ];
  const [enable, setEnable]: any = useState(defaultToggleArray);
  const [createCategory, setcategory]: any = useState({
    categoryCode: location.state.value,
    category: location.state.value,
    code: "",
    description: "",
    content: "",
    field1: metaData_Values.field1?.fieldLabel,
    field2: metaData_Values.field2?.fieldLabel,
    field3: metaData_Values.field3?.fieldLabel,
    field4: metaData_Values.field4?.fieldLabel,
    field5: metaData_Values.field5?.fieldLabel,
    field6: metaData_Values.field6?.fieldLabel,
    field7: metaData_Values.field7?.fieldLabel,
    field8: metaData_Values.field8?.fieldLabel,
    field9: metaData_Values.field9?.fieldLabel,
    field10: metaData_Values.field10?.fieldLabel,
    value1:
      metaData_Values.field1?.defaultValue === true
        ? "Yes"
        : metaData_Values.field1?.defaultValue,
    value2:
      metaData_Values.field2?.defaultValue === true
        ? "Yes"
        : metaData_Values.field2?.defaultValue,
    value3:
      metaData_Values.field3?.defaultValue === true
        ? "Yes"
        : metaData_Values.field3?.defaultValue,
    value4:
      metaData_Values.field4?.defaultValue === true
        ? "Yes"
        : metaData_Values.field4?.defaultValue,
    value5:
      metaData_Values.field5?.defaultValue === true
        ? "Yes"
        : metaData_Values.field5?.defaultValue,
    value6:
      metaData_Values.field6?.defaultValue === true
        ? "Yes"
        : metaData_Values.field6?.defaultValue,
    value7: metaData_Values.field7?.defaultValue,
    value8: metaData_Values.field8?.defaultValue,
    value9: metaData_Values.field9?.defaultValue,
    value10: metaData_Values.field10?.defaultValue,
    sequenceNumber: "1",
  });

  const metadataLength = Object.keys(metaData_Values).length;
  let customError: any = [];
  const [customErrorarr, setCustomErrorarr]: any = useState([]);
  const [isCategoryCode, setCategoryCodes] = useState(false);
  const [isDescription, setDescription] = useState(false);
  let isvalid = true;
  const Regexm = /^$|^[A-Za-z0-9-/. ]+$/;
  const Regex = /^[A-Za-z0-9-/. ]+$/;
  const RegexD = /^[A-Za-z0-9-/.()*, ]+$/;
  const handle_Validate = () => {
    for (var i = 0; i < metadataLength; i++) {
      var key = "value" + (i + 1);
      if (
        metaData_Values["field" + (i + 1)].dataType != "toggle" &&
        metaData_Values["field" + (i + 1)].dataType != "dropdown"
      ) {
        if (metaData_Values["field" + (i + 1)].mandatory) {
          if (
            createCategory[key]?.length > sizeArray[i] ||
            !Regex.test(createCategory[key].toLowerCase())
          ) {
            customError[i] = true;
            isvalid = false;
          } else {
            customError[i] = false;
          }
        } else {
          if (
            createCategory[key]?.length > sizeArray[i] ||
            !Regexm.test(createCategory[key].toLowerCase())
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
      createCategory.code.length > 20 ||
      !Regex.test(createCategory.code.toLowerCase())
    ) {
      setCategoryCodes(true);
      isvalid = false;
    } else {
      setCategoryCodes(false);
    }

    if (
      createCategory.description.length > 150 ||
      !RegexD.test(createCategory.description.toLowerCase())
    ) {
      setDescription(true);
      isvalid = false;
    } else {
      setDescription(false);
    }
    return isvalid;
  };

  const handle_CategoryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setcategory({ ...createCategory, code: e.target.value });
  const handle_DescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setcategory({ ...createCategory, description: e.target.value });
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

      setcategory({
        ...createCategory,
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
      dispatch(createReferenceData(createCategory));
    }
  };


  return (
    <>
      <div className="px-3 my-4">
        <h1 className="fw-bold container-header">Create New Code</h1>
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
      <div className="Create">
        <div className="Create-container">
          <form onSubmit={handle_CategorySubmit}>
            <div className="setting2">
              <div className="setting6">
                <label className="createReference-label">Category</label>
                <CustomInput
                  type="text"
                  className="border-0 referenceData-readOnly"
                  value={location.state.value}
                  readOnly={true}
                />
              </div>
              {isCategoryCode ? (
                <>
                  <div className="setting6">
                    <label className="createReference-label">
                      Code<span className="span-col">*</span>
                    </label>
                    <CustomInput
                      type="text"
                      className="validation-error"
                      onChange={handle_CategoryCodeChange}
                    />
                  </div>
                  <div>
                    <span className="span-col1">
                      Code should not contain special characters. And cannot be
                      empty *
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="setting6">
                    <label className="createReference-label">
                      Code<span className="span-col">*</span>
                    </label>
                    <CustomInput
                      type="text"
                      onChange={handle_CategoryCodeChange}
                    />
                  </div>
                </>
              )}
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
                      onChange={handle_DescriptionChange}
                    />
                  </div>
                </>
              )}
              <div className="setting6">
                <label className="createReference-label">Image Upload</label>
                <CustomInput type="text" value={createCategory.content} />
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
                      setImagePreviewInfo(createCategory?.content);
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
                  {Object.values(metaData_Values).length > 0 && (
                    <label
                      className="customValue-label"
                      style={{ fontSize: "16px" }}
                    >
                      Custom Values
                    </label>
                  )}

                  {Object.values(metaData_Values).map(
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
                              <>
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
                                    setcategory({
                                      ...createCategory,
                                      [key?.value]:
                                        !enable[
                                          "field" + (idx + 1) ? "Yes" : "No"
                                        ],
                                      ["field" + (idx + 1)]: key.fieldLabel,
                                    });
                                  }}
                                />
                              </>
                            ) : key.dataType === "dropdown" ? (
                              <Select
                                defaultValue={key.defaultValue}
                                options={option}
                                style={{ width: "50%", height: "35px" }}
                                onChange={(value: string) => {
                                  setcategory({
                                    ...createCategory,
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
                                placeholder={
                                  "Size should not exceed " +
                                  key.size +
                                  " characters"
                                }
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  idx = idx + 1;
                                  setcategory({
                                    ...createCategory,
                                    [key?.value]: e.target.value,
                                    ["field" + idx]: key.fieldLabel,
                                  });
                                }}
                              />
                            )
                          ) : key.dataType === "toggle" ? (
                            <>
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
                                  setcategory({
                                    ...createCategory,
                                    [key?.value]:
                                      !enable[
                                        "field" + (idx + 1) ? "Yes" : "No"
                                      ],
                                    ["field" + (idx + 1)]: key.fieldLabel,
                                  });
                                }}
                              />
                            </>
                          ) : key.dataType === "dropdown" ? (
                            <Select
                              defaultValue={key.defaultValue}
                              options={option}
                              style={{ width: "50%", height: "35px" }}
                              onChange={(value: string) => {
                                setcategory({
                                  ...createCategory,
                                  [key?.value]: value,
                                  ["field" + (idx + 1)]: key.fieldLabel,
                                });
                              }}
                            />
                          ) : (
                            <CustomInput
                              type="text"
                              name="Matname"
                              defaultValue={key.defaultValue}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                idx = idx + 1;
                                setcategory({
                                  ...createCategory,
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
                  {Object.values(metaData_Values).length > 0 && (
                    <label
                      className="customValue-label"
                      style={{ fontSize: "16px" }}
                    >
                      Custom Values
                    </label>
                  )}

                  {Object.values(metaData_Values).map(
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
                            <>
                              <Switch
                                className="toggle-switch"
                                checkedChildren="Yes"
                                unCheckedChildren="NO"
                                defaultChecked={enable["field" + (id + 1)]}
                                onChange={() => {
                                  setEnable({
                                    ...enable,
                                    ["field" + (id + 1)]:
                                      !enable["field" + (id + 1)],
                                  });
                                  setcategory({
                                    ...createCategory,
                                    [key?.value]: !enable["field" + (id + 1)]
                                      ? "Yes"
                                      : "No",
                                    ["field" + (id + 1)]: key.fieldLabel,
                                  });
                                }}
                              />
                            </>
                          ) : key.dataType === "dropdown" ? (
                            <Select
                              defaultValue={key.defaultValue}
                              options={option}
                              style={{ width: "50%", height: "35px" }}
                              onChange={(value: string) => {
                                setcategory({
                                  ...createCategory,
                                  [key?.value]: value,
                                  ["field" + (id + 1)]: key.fieldLabel,
                                });
                              }}
                            />
                          ) : (
                            <CustomInput
                              type="text"
                              name="Matname"
                              defaultValue={key.defaultValue}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                id = id + 1;
                                setcategory({
                                  ...createCategory,
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

export default Create;
