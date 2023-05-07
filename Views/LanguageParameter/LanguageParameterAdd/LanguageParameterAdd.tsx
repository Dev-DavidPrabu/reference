import { Button, FormGroup, Input, Label } from "reactstrap";
import "./LanguageParameterAdd.scss";
import { Select } from "antd";
import CustomHeader from "../../../Components/CustomTable/CustomTable";
import {
  getTheListOFPreferredlanguage,
  translationTheRequestedString,
  toAddANewLanguageParameters,
  resetLanguage,
} from "../../../redux/action/LanguageParameterAction";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomLoader from "../../../Components/Loader/CustomLoader";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "../../../Components/UI/CustomButton";
import { Form, InputNumber } from "antd";
import SubmitCancelButton from "../../../Components/SubmitCancelButton/SubmitCancelButton";
import { customValidator } from "../../../Constants/Validation";
import CustomResponseMessage from "../../../Components/UI/ApiResponse/CustomResponseMessage";

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const LanguageParameterAdd: React.FC = (props: any) => {
  const gettingSelectedKeyFromPreiousRoute =
    props.location && props.location.state && props.location.state.key;

  const dispatch = useDispatch();

  //selectors:
  const activityIndicator = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.isLoading
  );
  const GetPeferredlanguageList = useSelector(
    (state: RootStateOrAny) =>
      state.LanguageParameterReducer?.listofpreferredLanguage
  );
  const addedLanguageInformations = useSelector(
    (state: RootStateOrAny) =>
      state.LanguageParameterReducer?.afterUpdatingtheLanguageParameter?.data
  );

  //   afterUpdatingtheLanguageParameter
  const [apiMessage, setApiMessage] = useState("");

  const [form] = Form.useForm();

  const [data, setData] = useState<any>([]);
  const [editingKey, setEditingKey] = useState("");

  const [pageName, setPageName] = useState("");
  const [key, setKey] = useState("");
  const [word, setWord] = useState("");
  const [TranslateLanague, setTranslateLanguage] = useState("");
  const [validLanguage, setValidLang] = useState("");

  const [errors, setErrors] = useState({
    PageDescriptionError: "",
    ModuleDescriptionError: "",
    KeyCodedError: "",
    LanguageCodeError: "",
  });

  const isEditing = (record: any) => record.id === editingKey;
  const { Option } = Select;

  const edit = (record: any) => {
    form.setFieldsValue({ translationContentContent: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const state = useSelector(
    (state: any) => state.LanguageParameterReducer.toAddANewLanguageParameters
  );

  useEffect(() => {
    if (
      addedLanguageInformations !== undefined &&
      addedLanguageInformations.length > 0 &&
      addedLanguageInformations
    ) {
      addedLanguageInformations.map((data: any, index: any) => {
        data.id = index + 1;
        data.isDeleted = false;
      });
      setData(addedLanguageInformations);
    }
  }, [addedLanguageInformations]);
  useEffect(() => {
    dispatch(getTheListOFPreferredlanguage());
  }, []);

  useEffect(() => {
    if (addedLanguageInformations) {
      dispatch(resetLanguage());
    }
  }, [addedLanguageInformations]);

  useEffect(() => {
    if (state.error === "DUPLICATE_RECORD_FOUND") {
      setApiMessage(state.error);
    } else {
      props.history.push({
        pathname: "/dashboard/Setup-And-Configuration/Language-Parameter",
        state: "successfully Language Added",
      });
    }
  }, [state]);

  const save = async (key: any) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData: any = [...data];
      const index = newData.findIndex((item: { id: any }) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {}
  };

  const handleChange = (e: any) => {};

  const handleChangeForDropDown = (value: string[]) => {
    let languages: any = [...value];
    setTranslateLanguage(languages);
    if (languages.length > 0) {
      setValidLang("checked");
    } else {
      setValidLang("");
    }
  };
  const validate = () => {
    let checkPageDescriptionError = customValidator(
      "deviceId",
      "Device ID",
      pageName
    );
    let checkKeyDescriptionError = customValidator(
      "deviceId",
      "Device ID",
      key
    );
    let checkWordCodedError = customValidator("startDate", "Start Date", word);
    let checkLanguageCodeError = customValidator(
      "endDate",
      "Status",
      validLanguage
    );

    if (
      !(
        checkPageDescriptionError === "null" &&
        checkKeyDescriptionError === "null" &&
        checkWordCodedError === "null" &&
        checkLanguageCodeError === "null"
      )
    ) {
      setErrors({
        PageDescriptionError: checkPageDescriptionError,
        ModuleDescriptionError: checkKeyDescriptionError,
        KeyCodedError: checkWordCodedError,
        LanguageCodeError: checkLanguageCodeError,
      });
      return false;
    }
    setErrors({
      PageDescriptionError: "",
      ModuleDescriptionError: "",
      KeyCodedError: "",
      LanguageCodeError: "",
    });
    return true;
  };
  const submitForTranslatingtheString = () => {
    if (validate()) {
      let finalObject = {
        content: word,
        fromLanguageCode: "en",
        toLanguageCode: TranslateLanague,
      };
      dispatch(translationTheRequestedString(finalObject));
    }

    let finalObject = {
      content: word,
      fromLanguageCode: "en",
      toLanguageCode: TranslateLanague,
    };
    dispatch(translationTheRequestedString(finalObject));
  };
  const onClickBack = () => {
    props.history.push({
      pathname: "/dashboard/Setup-And-Configuration/Language-Parameter",
    });
  };

  const headerItem = () => {
    return (
      <div className="language-add-header d-flex flex-column">
        <div>
          {errors.PageDescriptionError &&
            errors.ModuleDescriptionError &&
            errors.KeyCodedError &&
            errors.LanguageCodeError &&
            errors?.ModuleDescriptionError !== "null" &&
            errors.PageDescriptionError !== "null" &&
            errors?.KeyCodedError !== "null" &&
            errors.LanguageCodeError !== "null" && (
              <span className="colorRedUser">
                {" "}
                * Indicated field value are mandatory
              </span>
            )}
        </div>
        <div className="container-fluid mt-4">
          <div className="row ">
            <div className="col">
              <FormGroup>
                <Label for="exampleEmail">Select Language</Label>
                <Input
                  name="fromLanguageCode"
                  className="formRadiusBank"
                  type="text"
                  id="Slanguage"
                  value={"English"}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <Label for="exampleEmail">
                  Module <span className="container-body-label-color">*</span>
                </Label>
                <Input
                  type="text"
                  name="Module"
                  id="Module"
                  className="formRadiusBank"
                  placeholder="with a placeholder"
                  onChange={(e) => setPageName(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <Label for="exampleEmail">
                  Key<span className="container-body-label-color">*</span>
                </Label>
                <Input
                  type="text"
                  name="Key"
                  id="Key"
                  className="formRadiusBank"
                  placeholder="with a placeholder"
                  onChange={(e) => setKey(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <Label for="exampleEmail">
                  Word<span className="container-body-label-color">*</span>
                </Label>
                <Input
                  type="text"
                  name="Word"
                  id="Module"
                  className="formRadiusBank"
                  placeholder="with a placeholder"
                  onChange={(e) => setWord(e.target.value)}
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup>
                <Label for="exampleEmail">
                  Translate Lanaguage
                  <span className="container-body-label-color">*</span>
                </Label>
                <Select
                  mode="multiple"
                  style={{ width: "100%", marginTop: "-6px" }}
                  placeholder="select one country"
                  className="formRadiusBank"
                  onChange={handleChangeForDropDown}
                  optionLabelProp="label"
                >
                  {GetPeferredlanguageList != undefined &&
                    GetPeferredlanguageList.length > 0 &&
                    GetPeferredlanguageList.map((e: any) => {
                      return (
                        <Option value={e.code} label={e.description}>
                          <div className="demo-option-label-item">
                            {e.description}
                          </div>
                        </Option>
                      );
                    })}
                </Select>
              </FormGroup>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              color="danger"
              className="kyc-FilterSubmitButton agent-filterBtn me-2"
              onClick={submitForTranslatingtheString}
            >
              Translate
            </Button>
            <Button
              className="kyc-FilterResetButton agent-filterBtn me-2"
              onClick={onClickBack}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  };
  const deleteRecord = (record: any) => {
    let newData = data.map((e: any) => {
      if (e.id === record.id) {
        e.isDeleted = true;
      }
      return e;
    });
    setData(newData);
  };

  const columns = [
    {
      title: "Translate Language",
      dataIndex: "languageDescription",
      width: "25%",
      editable: false,
    },
    {
      title: "Translate Word",
      dataIndex: "translatedContent",
      width: "25%",
      editable: true,
    },
    {
      title: "Manage",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            <CustomButton
              color="danger"
              onClick={() => save(record.id)}
              className="btn2 btn--sizer"
            >
              Update
            </CustomButton>
            <button
              type="button"
              className="container-cancel border-0 ms-3 form-label-font-size"
              onClick={cancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div className="manage-button" onClick={() => edit(record)}>
              <FaRegEdit />
            </div>
          </div>
        );
      },
    },
  ];

  const closeMessage = () => {
    setApiMessage("");
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const finalSubmit = () => {
    let finalArray: any = [];
    let finalDData = data;
    let deletedRequest: any = [];
    finalDData.map((reconstructingDataTotheApi: any) => {
      if (reconstructingDataTotheApi.isDeleted) {
        deletedRequest.push(reconstructingDataTotheApi.translationContentId);
      } else {
        if (reconstructingDataTotheApi.languageCode !== "en") {
          let object = {
            key: key,
            content: reconstructingDataTotheApi.translatedContent,
            languageCode: reconstructingDataTotheApi.languageCode,
          };
          finalArray.push(object);
        }
      }
    });
    let finalObjecttoTheApi = {
      languageCode: "en",
      languageDescription: "English",
      pageName: pageName,
      content: word,
      updateContentRequest: finalArray,
    };
    dispatch(toAddANewLanguageParameters(finalObjecttoTheApi));
  };
  return (
    <div className="p-3">
      <div className="langugae-parameters-add-view">
        <section>
          <span className="span-highlight-text">Add Language Parameters </span>
        </section>
        <section>
          <Button
            onClick={() => {
              props.history.push({
                pathname:
                  "/dashboard/Setup-And-Configuration/Language-Parameter",
              });
            }}
          >
            Back
          </Button>
        </section>
      </div>
      <section className="mt-5">{headerItem()}</section>

      <CustomResponseMessage
        apiStatus={false}
        closeMessage={closeMessage}
        message={apiMessage}
        //errorFix={filterRecordsError}
      />

      <section className="mt-5">
        <Form form={form} component={false}>
          <CustomHeader
            DisableMange={true}
            componentCell={EditableCell}
            CustomTableHeader={data.filter(
              (item: any) => item.isDeleted !== true
            )}
            TableData={mergedColumns}
            rowClassName="editable-row"
            LengthofCount={10}
          />
        </Form>
      </section>
      <div className="languge-parameter-btn-left">
        <SubmitCancelButton
          button={"Submit"}
          secondButton={"Cancel"}
          onSubmit={finalSubmit}
          onCancel={() => onClickBack()}
        />
      </div>
      <CustomLoader isLoading={activityIndicator} size={50} />
    </div>
  );
};

export default LanguageParameterAdd;
