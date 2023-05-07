import React, { useState } from "react";
import { createReferenceData } from "../../redux/action/ReferenceDataAction";
import { useDispatch } from "react-redux";
import { DataArray, Fields } from "../../models/ReferenceDataModel";
import CustomButton from "../UI/CustomButton";
import CustomInput from "../UI/CustomInput";
import { useLocation, useHistory } from "react-router";

function Create(_props: { value: string; MetaData: DataArray[] }) {
  const location: any = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  let metaData_Values: Fields = {};
  location.state.MetaData.forEach((key: DataArray) => {
    if (key.categoryCode === location.state.value) {
      metaData_Values = key.metadata;
    }
  });

  const [createCategory, setcategory] = useState({
    categoryCode: location.state.value,
    category: location.state.value,
    code: "",
    description: "",
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    sequenceNumber: "1",
  });
  const [isCategoryCode, setCategoryCodes] = useState(false);
  const [isDescription, setDescription] = useState(false);
  const [isCustom_value, setCustom_value] = useState(false);
  let isvalid = true;
  const Regex = /^[A-Za-z0-9 ]+$/;
  const handle_Validate = () => {
    switch (Object.keys(metaData_Values).length) {
      case 5:
        if (
          createCategory.value1?.length > 20 ||
          createCategory.value2?.length > 20 ||
          createCategory.value3?.length > 20 ||
          createCategory.value4?.length > 20 ||
          createCategory.value5?.length > 20 ||
          !Regex.test(createCategory.value1.toLowerCase()) ||
          !Regex.test(createCategory.value2.toLowerCase()) ||
          !Regex.test(createCategory.value3.toLowerCase()) ||
          !Regex.test(createCategory.value4.toLowerCase()) ||
          !Regex.test(createCategory.value5.toLowerCase())
        ) {
          setCustom_value(true);
          isvalid = false;
        } else {
          setCustom_value(false);
        }
        break;
      case 4:
        if (
          createCategory.value1?.length > 20 ||
          createCategory.value2?.length > 20 ||
          createCategory.value3?.length > 20 ||
          createCategory.value4?.length > 20 ||
          !Regex.test(createCategory.value1.toLowerCase()) ||
          !Regex.test(createCategory.value2.toLowerCase()) ||
          !Regex.test(createCategory.value3.toLowerCase()) ||
          !Regex.test(createCategory.value4.toLowerCase())
        ) {
          setCustom_value(true);
          isvalid = false;
        } else {
          setCustom_value(false);
        }
        break;
      case 3:
        if (
          createCategory.value1?.length > 20 ||
          createCategory.value2?.length > 20 ||
          createCategory.value3?.length > 20 ||
          !Regex.test(createCategory.value1.toLowerCase()) ||
          !Regex.test(createCategory.value2.toLowerCase()) ||
          !Regex.test(createCategory.value3.toLowerCase())
        ) {
          setCustom_value(true);
          isvalid = false;
        } else {
          setCustom_value(false);
        }
        break;
      case 2:
        if (
          createCategory.value1?.length > 20 ||
          createCategory.value2?.length > 20 ||
          !Regex.test(createCategory.value1.toLowerCase()) ||
          !Regex.test(createCategory.value2.toLowerCase())
        ) {
          setCustom_value(true);
          isvalid = false;
        } else {
          setCustom_value(false);
        }
        break;
      case 1:
        if (
          createCategory.value1?.length > 20 ||
          !Regex.test(createCategory.value1.toLowerCase())
        ) {
          setCustom_value(true);
          isvalid = false;
        } else {
          setCustom_value(false);
        }
        break;

      default:
        break;
    }

    if (
      createCategory.code.length > 10 ||
      !Regex.test(createCategory.code.toLowerCase())
    ) {
      setCategoryCodes(true);
      isvalid = false;
    } else {
      setCategoryCodes(false);
    }

    if (
      createCategory.description.length > 20 ||
      !Regex.test(createCategory.description.toLowerCase())
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
  const handle_CategoryCancel = (_e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  const handle_CategorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handle_Validate()) {
      dispatch(createReferenceData(createCategory));
      history.goBack();
    }
  };

  return (
    <>
      <div className="Create">
        <div className="Create-container">
          <form onSubmit={handle_CategorySubmit}>
            <div className="setting2">
              <div className="setting6">
                <label className="createReference-label">
                  Category<span className="span-col">*</span>
                </label>
                <CustomInput type="text" value={location.state.value} />
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
              {isCustom_value ? (
                <div className="setting1010">
                  {Object.values(metaData_Values).length > 0 && (
                    <label className="customValue-label">Custom Values</label>
                  )}

                  {Object.values(metaData_Values).map(
                    (key: Array<string> | any, idx: number) => {
                      return (
                        <div className="custom_values" key={key.id}>
                          <label>{key.name}</label>
                          <CustomInput
                            type="text"
                            name="Matname"
                            className="validation-error"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              idx = idx + 1;
                              setcategory({
                                ...createCategory,
                                [key?.value]: e.target.value,
                                ["field" + idx]: key.name,
                              });
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                  <div>
                    <span className="span-col1">
                      This Field should not contain special characters. And
                      cannot be empty *
                    </span>
                  </div>
                </div>
              ) : (
                <div className="setting1010">
                  {Object.values(metaData_Values).length > 0 && (
                    <label className="customValue-label">Custom Values</label>
                  )}

                  {Object.values(metaData_Values).map(
                    (key: Array<string> | any, idx: number) => {
                      return (
                        <div className="custom_values" key={key.id}>
                          <label>{key.name}</label>
                          <CustomInput
                            type="text"
                            name="Matname"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              idx = idx + 1;
                              setcategory({
                                ...createCategory,
                                [key?.value]: e.target.value,
                                ["field" + idx]: key.name,
                              });
                            }}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              )}
              <div className="setting3">
                <CustomButton color="danger" className="btn2">
                  Save
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
