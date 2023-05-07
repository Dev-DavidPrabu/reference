import React, { useCallback, useEffect, useState } from "react";
import "./NotificationChannelEdit.scss";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { customValidator } from "../../Constants/Validation";
import { Label } from "reactstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
import { Switch } from "antd";
import {
  getAllLanguage,
  resetUpdateChannel,
  updateChannels,
} from "../../redux/action/NotificationChannelAction";
import htmlToDraft from "html-to-draftjs";
import CustomEditor from "../../Components/CustomComponents/CustomEditor/CustomEditor";
import { AiFillDelete } from "react-icons/ai";
import CustomLoader from "../../Components/Loader/CustomLoader";

function NotificationChannelEdit(props: any) {
  const dispatch = useDispatch();

  const MAX_LENGTH = 150;
  const [channelValueDTO, setChannelValueDTO] = useState({
    description: "",
    notificationId: "",
    parameters: "",
  });
  const [channelLanguage, setChannelLanguage] = useState({
    languageCode: "",
    languageName: "",
    content: "",
    id: "",
  });
  const [newChannelLanguage, setNewChannelLanguage] = useState({
    languageCode: "",
    languageName: "",
    content: "",
    id: "",
  });
  const [channelValue, setChannelValue] = useState({
    id: "",
    channelCode: "",
    enabled: true,
    content: "",
    notificationMasterDTO: channelValueDTO,
    notificationChannelIl8nDTO: [channelLanguage],
  });

  const [langChannelValue, setLangChannelValue] = useState({
    id: "",
    channelCode: "",
    enabled: true,
    content: "",
    notificationMasterDTO: channelValueDTO,
    notificationChannelIl8nDTO: [channelLanguage],
  });

  const [errors, setErrors] = useState({
    channelError: "",
    idError: "",
    descriptionError: "",
    languageCodeError: "",
    updateApiError: "",
  });
  let languageArray = channelValue.notificationChannelIl8nDTO || [];

  let location = props.location?.state;
  useEffect(() => {
    allLanguageData();
    if (location !== undefined) {
      setChannelValue(props.location.state);
    }
  }, [location]);
  const [editorstate, setEditorState] = useState(
    EditorState.createEmpty() || ""
  );
  const [langEditorstate, setLangEditorState] = useState(
    EditorState.createEmpty() || ""
  );

  const [editorMultistate, setEditorMultiState] = useState(
    EditorState.createEmpty() || ""
  );
  const [langEditorStore, setLangEditoreStore] = useState(
    EditorState.createEmpty() || ""
  );
  const [isAdding, setIsAdding] = useState(false);
  const [langVisible, setLangVisible] = useState(false);
  const [langKey, setlangKey] = useState(null);
  const [multilingual, setMultilingual] = useState(false);
  const [editorError, setEditorError] = useState(false);
  const [newEditorError, setNewEditorError] = useState("");
  const currentContentLength = editorstate
    .getCurrentContent()
    .getPlainText("").length;

  const contentLimit = () => {
    if (currentContentLength > MAX_LENGTH - 1) {
      return false;
    } else {
      return true;
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location !== undefined) {
      const html = props.location?.state?.content;
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorStates = EditorState.createWithContent(contentState);
        if (contentLimit()) {
          setEditorState(editorStates);
        } else {
          setEditorError(!editorError);
        }
      }
    }
  }, []);

  const valueToEditor = (value: any) => {
    const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }
  };

  const NotificationUpdateData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationChannelReducer?.updateChannelResponse
  );

  const allLanguage = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationChannelReducer?.getAllLanguageResponse
  );
  const updateChannelData = useCallback(
    async (body) => {
      try {
        dispatch(updateChannels(body));
      } catch (err) {}
    },
    [dispatch]
  );
  const allLanguageData = useCallback(async () => {
    try {
      dispatch(getAllLanguage());
    } catch (err) {}
  }, [dispatch]);

  const handleEnabled = (e: any) => {
    setChannelValue({
      ...channelValue,
      ["enabled"]: e,
    });
  };
  const handleEditorChange = (e: any) => {
    setChannelValue({
      ...channelValue,
      ["content"]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
    if (contentLimit()) {
      setEditorState(e);
      setEditorError(false);
    } else {
      setEditorState(e);
      setEditorError(true);
    }
  };

  const handleLangEditorChangeHandler = (e: any) => {
    setLangChannelValue({
      ...langChannelValue,
      ["content"]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  const editInDropdown = (
    identifier: string,
    type: string,
    contentType: any
  ) => {
    let newContent = "";
    if (contentType) {
      newContent = langEditorStore.getCurrentContent().getPlainText();
    } else {
      newContent = editorstate.getCurrentContent().getPlainText();
    }

    if (!newContent.includes(identifier)) {
      newContent = newContent + `$${identifier}$`;
    } else {
      newContent = newContent.replace(`$${identifier}$`, "");
    }
    const contentBlock = htmlToDraft(newContent);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorStates = EditorState.createWithContent(contentState);
      if (newContent.length < MAX_LENGTH) {
        if (contentType) {
          newChannelLanguage.content = draftToHtml(
            convertToRaw(editorStates.getCurrentContent())
          );
          setLangEditoreStore(editorStates);
        } else {
          setEditorState(editorStates);
        }
      } else {
        setEditorError(!editorError);
      }
    }
  };

  const editInDropdownNew = (
    identifier: string,
    type: string,
    contentType: any,
    cursorPosition: any
  ) => {
    let newContent = "";
    if (contentType) {
      newContent = langEditorStore.getCurrentContent().getPlainText();
    } else {
      newContent = editorstate.getCurrentContent().getPlainText();
    }

    if (!newContent.includes(identifier)) {
      newContent =
        newContent.slice(0, cursorPosition) +
        `$${identifier}$` +
        newContent.slice(cursorPosition);
    } else {
      newContent = newContent.replace(`$${identifier}$`, "");
    }

    const contentBlock = htmlToDraft(newContent);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorStates = EditorState.createWithContent(contentState);
      if (newContent.length < MAX_LENGTH) {
        if (contentType) {
          newChannelLanguage.content = draftToHtml(
            convertToRaw(editorStates.getCurrentContent())
          );
          setLangEditoreStore(editorStates);
        } else {
          setChannelValue({
            ...channelValue,
            ["content"]: draftToHtml(
              convertToRaw(editorStates.getCurrentContent())
            ),
          });

          setEditorState(editorStates);
        }
      } else {
        setEditorError(!editorError);
      }
    }
  };
  const handleNewEditorChange = (e: any) => {
    setLangEditoreStore(e);
    newChannelLanguage.content = draftToHtml(
      convertToRaw(e.getCurrentContent())
    );
    const contentLength = langEditorStore
      .getCurrentContent()
      .getPlainText("").length;
    if (contentLength > MAX_LENGTH - 1) {
      setNewEditorError("*Only 150 Character");
    } else {
      setNewEditorError("");
    }
  };

  const handleNewLangEditorChange = (
    e: any,
    index: any,
    convertedValue: any
  ) => {
    setLangEditorState(e);
    langChannelValue.content = draftToHtml(convertToRaw(e.getCurrentContent()));

    channelValue.notificationChannelIl8nDTO[index].content = draftToHtml(
      convertToRaw(e.getCurrentContent())
    );
    languageArray[index].content = draftToHtml(
      convertToRaw(e.getCurrentContent())
    );

    setEditorMultiState(e);
  };

  const newLanguage = (e: any) => {
    const listSelectedLanguage = allLanguage.data.filter((allLang: any) => {
      if (allLang.description === e.target.value) {
        return allLang;
      }
    });
    setNewChannelLanguage({
      ...newChannelLanguage,
      [e.target.name]: listSelectedLanguage[0].code,
      ["languageName"]: listSelectedLanguage[0].description,
    });
  };
  const handleFieldChange = (e: any) => {
    setChannelValue({ ...channelValue, [e.target.name]: [e.target.value] });
  };
  const handleLangEditorChange = (
    content: any,
    index: any,
    convertedValue: any
  ) => {
    setLangVisible(true);
    setLangEditorState(convertedValue);
    setlangKey(index);
    channelValue.notificationChannelIl8nDTO[index].content = draftToHtml(
      convertToRaw(content.getCurrentContent())
    );
    languageArray[index].content = draftToHtml(
      convertToRaw(content.getCurrentContent())
    );
    setEditorMultiState(content);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = { ...channelValue };
    value.notificationMasterDTO.description = e.target.value;
    setChannelValue(value);
  };
  const onClickBack = () => {
    props.history?.push({ pathname: "/dashboard/notification-channel" });
  };
  var parameter = channelValue.notificationMasterDTO.parameters.split(",");
  const parameterValidation = (value: string) => {
    return parameter.filter((item: any) => {
      return value.includes(item);
    });
  };

  const ValidateFields = () => {
    let checkLangCodeError = customValidator(
      "notificaitonNewLanguage",
      "Language Code",
      newChannelLanguage.languageCode
    );
    if (checkLangCodeError === "null") {
      return true;
    } else {
      setErrors({
        ...errors,
        languageCodeError: checkLangCodeError,
      });
      return false;
    }
  };
  const onClickUpdate = (e: any) => {
    if (isAdding) {
      if (
        newChannelLanguage.languageCode !== "" &&
        newChannelLanguage.languageName !== "" &&
        newChannelLanguage.content !== ""
      ) {
        if (parameterValidation(newChannelLanguage.content).length > 0) {
          setNewEditorError("");
          channelValue.notificationChannelIl8nDTO.push(newChannelLanguage);
          setIsLoading(true);
          updateChannelData(channelValue);
        } else {
          setNewEditorError("*Add atleast one parameter");
        }
      } else {
        setNewEditorError("*Enter all fields");
      }
    } else {
      setIsLoading(true);
      updateChannelData(channelValue);
    }
  };
  const deleteMultiLanguage = (e: any) => {
    const indexOfObject = channelValue.notificationChannelIl8nDTO.findIndex(
      (object) => {
        return object.id === e.id;
      }
    );
    channelValue.notificationChannelIl8nDTO.splice(indexOfObject, 1);
    languageArray.splice(indexOfObject, 1);
    setEditorMultiState(e);
  };
  const deleteLanguage = () => {
    setIsAdding(false);
  };
  useEffect(() => {
    if (NotificationUpdateData) {
      if (NotificationUpdateData.data) {
        clearUpdateChannel();
        setIsLoading(false);
        props.history?.push({
          pathname: "/dashboard/notification-channel",
          state: true,
          message: "Channel Setup Updated Successfully",
        });
      } else if (NotificationUpdateData?.error) {
        setErrors({
          ...errors,
          updateApiError: NotificationUpdateData.error,
        });
      }
    }
  }, [NotificationUpdateData]);
  const clearUpdateChannel = useCallback(async () => {
    try {
      dispatch(resetUpdateChannel());
    } catch (err) {}
  }, [dispatch]);

  const addLanguageContent = () => {
    if (languageArray.length > 0) {
      if (multilingual) {
        setIsAdding(true);
      } else {
        setIsAdding(false);
      }
      setMultilingual(true);
    } else {
      setMultilingual(false);
      setIsAdding(true);
    }
  };

  let languageList = allLanguage?.data;

  return (
    <>
      <div className="d-flex justify-content-between p-3">
        <span className="font-tittle">Notification Channel Setup </span>
        <CustomButton
          className="channel-edit-back text-bold text-dark"
          onClick={onClickBack}
        >
          <TiArrowBackOutline style={{ margin: "auto 5px" }} />
          Back
        </CustomButton>
      </div>
      <CustomLoader isLoading={isLoading} size={50} />

      <div className="p-4 bg-clr">
        <div className="col d-flex mb-3">
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">
                Notication ID
                <span className="editor-color">*</span>
              </label>
            </div>
            <div className="col-6 p-2 ">
              <select
                disabled={true}
                className="form-select btn--sizer"
                value={channelValue.notificationMasterDTO.notificationId}
              >
                {channelValue.notificationMasterDTO.notificationId && (
                  <option>
                    {channelValue.notificationMasterDTO.notificationId}
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">
                Channel
                <span className="editor-color">*</span>
              </label>
            </div>
            <div className="col-8 p-2 ">
              <select
                className="form-select btn--sizer"
                disabled={true}
                name="channelCode"
                value={channelValue.channelCode}
                onChange={handleFieldChange}
              >
                <option>{channelValue.channelCode}</option>;
              </select>
            </div>
          </div>
        </div>
        <div className="col d-flex mb-3">
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">
                Description
                <span className="editor-color">*</span>
              </label>
            </div>
            <div className="col-7 p-2">
              <input
                className="border-0 channel-edit-input form-control"
                value={channelValue.notificationMasterDTO.description}
                type="text"
                name="description"
                onChange={handleChange}
                readOnly={true}
              />
              <div className="justify-content-center d-flex">
                {errors.descriptionError &&
                  errors?.descriptionError !== "null" && (
                    <Label className="error-text-red">
                      {errors.descriptionError}
                    </Label>
                  )}
              </div>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="col-4 p-2">
              <label className="edit-sum-label">
                Active Flag
                <span className="editor-color">*</span>
              </label>
            </div>
            <div className="col-8 p-2">
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="NO"
                checked={channelValue.enabled}
                onChange={(e) => handleEnabled(e)}
              />
            </div>
          </div>
        </div>
        <div className="col d-flex">
          <div className="col-12 d-flex p-2">
            <div className="col-2 p-2">
              <label className="edit-sum-label">Content</label>
            </div>
            <div className="col-10 editor-background">
              <CustomEditor
                editorState={editorstate}
                addLanguage={false}
                contentValue={(
                  identifier: any,
                  type: any,
                  contentType: any,
                  cursorPosition: any = editorstate
                    .getSelection()
                    .getFocusOffset()
                ) =>
                  editInDropdownNew(
                    identifier,
                    type,
                    contentType,
                    cursorPosition
                  )
                }
                addParameter={true}
                handleLangEditorChange={handleEditorChange}
                parameters={channelValue.notificationMasterDTO.parameters}
                content={editorstate.getCurrentContent().getPlainText()}
              />
              {editorError && (
                <Label className="text-red">*Only 150 Character</Label>
              )}
            </div>
          </div>
        </div>
        {multilingual && (
          <>
            {languageArray &&
              languageArray.map((e: any, index: number) => {
                var convertedValue = valueToEditor(e.content);

                return (
                  <>
                    {index !== langKey && (
                      <>
                        <div className="col d-flex">
                          <div className="col-2 p-2">
                            <label className="edit-sum-label">
                              Language code
                            </label>
                          </div>
                          <div className="col-10 p-2 d-flex">
                            <div className="col-7 d-flex">
                              <div className="col-3">
                                {" "}
                                <select
                                  className="form-select"
                                  value={e.languageCode}
                                  disabled={
                                    e.languageCode === "" ? false : true
                                  }
                                >
                                  {e.languageCode && (
                                    <option>{e.languageCode}</option>
                                  )}
                                </select>
                              </div>
                              <div className="col-7">
                                <input
                                  className="border-0 form-control ms-1"
                                  value={e.languageName}
                                  type="option"
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            {errors.languageCodeError && (
                              <Label className="text-red">
                                {errors.languageCodeError}
                              </Label>
                            )}
                            <div className="col-5 justify-content-end d-flex">
                              <button
                                className="channel-edit-button text-white ms-1 border-0"
                                value="delete"
                                onClick={() => deleteMultiLanguage(e)}
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="row d-flex p-2">
                          <div className="d-flex">
                            <div className="col-2 p-2">
                              <label className="edit-sum-label">Content</label>
                            </div>
                            <div className="col-10 editor-background">
                              <CustomEditor
                                editorState={convertedValue}
                                addParameter={false}
                                handleLangEditorChange={(e: any) =>
                                  handleLangEditorChange(
                                    e,
                                    index,
                                    convertedValue
                                  )
                                }
                                parameters={
                                  channelValue.notificationMasterDTO.parameters
                                }
                                content={convertedValue
                                  ?.getCurrentContent()
                                  .getPlainText()}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {langVisible && index === langKey && (
                      <>
                        <div className="col d-flex">
                          <div className="col-2 p-2">
                            <label className="edit-sum-label">
                              Language -code
                            </label>
                          </div>
                          <div className="col-10 p-2 d-flex">
                            <div className="col-7 d-flex">
                              <div className="col-3">
                                {" "}
                                <select
                                  className="form-select"
                                  value={e.languageCode}
                                  disabled={
                                    e.languageCode === "" ? false : true
                                  }
                                >
                                  {e.languageCode && (
                                    <option>{e.languageCode}</option>
                                  )}
                                </select>
                              </div>
                              <div className="col-7">
                                <input
                                  className="border-0 form-control ms-1"
                                  value={e.languageName}
                                  type="option"
                                  readOnly={true}
                                />
                              </div>
                            </div>
                            {errors.languageCodeError && (
                              <Label className="text-red">
                                {errors.languageCodeError}
                              </Label>
                            )}
                            <div className="col-5 justify-content-end d-flex">
                              <button
                                className="channel-edit-button text-white ms-1 border-0"
                                value="delete"
                                onClick={() => deleteMultiLanguage(e)}
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row d-flex p-2">
                          <div className="d-flex">
                            <div className="col-2 p-2">
                              <label className="edit-sum-label">Content</label>
                            </div>
                            <div className="col-10 editor-background">
                              <CustomEditor
                                editorState={langEditorstate}
                                addLanguage={false}
                                contentValue={(
                                  identifier: any,
                                  type: any,
                                  contentType: any,
                                  cursorPosition: any = editorstate
                                    .getSelection()
                                    .getFocusOffset()
                                ) =>
                                  editInDropdownNew(
                                    identifier,
                                    type,
                                    contentType,
                                    cursorPosition
                                  )
                                }
                                addParameter={true}
                                handleLangEditorChange={(e: any) =>
                                  handleNewLangEditorChange(
                                    e,
                                    index,
                                    convertedValue
                                  )
                                }
                                parameters={
                                  langChannelValue.notificationMasterDTO
                                    .parameters
                                }
                                content={langEditorstate
                                  .getCurrentContent()
                                  .getPlainText()}
                              />
                              {editorError && (
                                <Label className="text-red">
                                  *Only 150 Character
                                </Label>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
          </>
        )}

        {isAdding && (
          <>
            <div className="col d-flex">
              <div className="col-2 p-2">
                <label className="edit-sum-label">Language code</label>
              </div>
              <div className="col-10 p-2 d-flex">
                <div className="col-7 d-flex">
                  <div className="col-3">
                    {" "}
                    <select
                      className="form-select"
                      name="languageCode"
                      onChange={newLanguage}
                    >
                      <option selected></option>
                      {languageList &&
                        languageList.map((e: any, index: number) => {
                          return (
                            <option value={e.description}>{e.code}</option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-7">
                    <input
                      className="border-0 form-control ms-1"
                      name="languageName"
                      value={newChannelLanguage.languageName}
                      type="option"
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-5 justify-content-end d-flex">
                  <button
                    className="channel-edit-button text-white ms-1 border-0"
                    value={"new"}
                    onClick={deleteLanguage}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </div>
            <div className="row d-flex p-2">
              <div className="d-flex">
                <div className="col-2 p-2">
                  <label className="edit-sum-label">Content</label>
                </div>
                <div className="col-10 editor-background">
                  <CustomEditor
                    editorState={langEditorStore}
                    addLanguage={true}
                    contentValue={(
                      identifier: any,
                      type: any,
                      contentType: any,
                      cursorPosition: any = editorstate
                        .getSelection()
                        .getFocusOffset()
                    ) =>
                      editInDropdownNew(
                        identifier,
                        type,
                        contentType,
                        cursorPosition
                      )
                    }
                    addParameter={true}
                    handleLangEditorChange={handleNewEditorChange}
                    parameters={channelValue.notificationMasterDTO.parameters}
                    content={langEditorStore.getCurrentContent().getPlainText()}
                  />
                  {newEditorError && (
                    <Label className="text-red">{newEditorError}</Label>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        <div className={`d-flex justify-content-end p-3`}>
          <CustomButton
            onClick={() => addLanguageContent()}
            className="editor-multi border-0"
          >
            + Multilingual
          </CustomButton>
        </div>
        <div>
          {errors.updateApiError && (
            <Label className="error-text-red">{errors.updateApiError}</Label>
          )}
        </div>
        {
          <div className="col d-flex mt-3">
            <div className="col-6 d-flex">
              <div className="col-4 p-3"></div>
              <div className="col-8 p-3 ">
                <button
                  type="button"
                  data-testid="submit-button"
                  className="btn  btn-sm edit-sum-save-button border-0"
                  onClick={onClickUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  data-testid="cancel-button"
                  className="btn btn-sm edit-sum-cancel-button ms-3 p-1 border-0"
                  onClick={onClickBack}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}
export default NotificationChannelEdit;
