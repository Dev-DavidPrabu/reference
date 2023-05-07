import {
  ADD_LANGUAGE_PARAMETER,
  EDIT_LANUAGE_PARAMETER,
  GET_LANGUAGE,
  GET_LANGUAGE_PARAMETER,
  GET_LANGUAGE_PARAMETER_VIEW,
  RESET_EDIT_CREATE_SUCCESS,
  TRANSLATE_LANUAGE_PARAMETER,
  LANGUAGE_PARAMETER_REQUEST,
  LANGUAGE_PARAMETER_RESPONSE,
  LANGUAGE_PARAMETER_ERROR,
  SELECTED_LANGUAGE_INFO_REQUEST,
  SELECTED_LANGUAGE_INFO_RESPONSE,
  SELECTED_LANGUAGE_INFO_ERROR,
  PREFERRED_LANGUAGE_REQUEST,
  PREFERRED_LANGUAGE_RESPONSE,
  PREFERRED_LANGUAGE_ERROR,
  RESET_SELECTED_LANGUAGE_INFO,
  UPDATE_EXSITING_LANGUAGE_PARAMETRES_REQUEST,
  UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE,
  UPDATE_EXSITING_LANGUAGE_PARAMETRES_ERROR,
  TRANSLATE_LANGUAGE_REQUEST,
  TRANSLATE_LANGUAGE_RESPONSE,
  TRANSLATE_LANGUAGE_ERROR,
  RESET_TRANSLATE_LANGUAGE_RESPONSE,
  RESET_UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE,
  ADD_NEW_LANGUAGE_PARAMETER_RESPONSE,
  ADD_NEW_LANGUAGE_PARAMETER_ERROR,
} from "../action/LanguageParameterAction";

const initialState = {
  getLanguageParameter: [],
  getLanguageParameterAdd: [],
  getLanguageParameterview: [],
  getLanguageParameterEdit: [],
  getLanguage: [],
  transalteLanguage: [],
  isLoading: false,
  selectedLanguageInfo: [],
  afterUpdatingtheLanguageParameter: [],
  toAddANewLanguageParameters: [],
};
const LanguageParameterReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_LANGUAGE_PARAMETER:
      return { ...state, getLanguageParameter: action.data };
    case ADD_LANGUAGE_PARAMETER:
      return { ...state, getLanguageParameterAdd: action.data };
    case GET_LANGUAGE_PARAMETER_VIEW:
      return { ...state, getLanguageParameterview: action.data };
    case EDIT_LANUAGE_PARAMETER:
      return { ...state, getLanguageParameterEdit: action.data };
    case RESET_EDIT_CREATE_SUCCESS:
      return { ...state, getLanguageParameterEdit: [] };
    case GET_LANGUAGE:
      return { ...state, getLanguage: action.data };
    case TRANSLATE_LANUAGE_PARAMETER:
      return { ...state, transalteLanguage: action.data };
    case LANGUAGE_PARAMETER_REQUEST:
      return { ...state, isLoading: true };
    case LANGUAGE_PARAMETER_RESPONSE:
      return { ...state, isLoading: false, listOfLanguage: action.data };
    case LANGUAGE_PARAMETER_ERROR:
      return { ...state, isLoading: false };
    case SELECTED_LANGUAGE_INFO_REQUEST:
      return { ...state, isLoading: true };
    case SELECTED_LANGUAGE_INFO_RESPONSE:
      return { ...state, isLoading: false, selectedLanguageInfo: action.data };
    case SELECTED_LANGUAGE_INFO_ERROR:
      return { ...state, isLoading: false };
    case PREFERRED_LANGUAGE_REQUEST:
      return { ...state, isLoading: true };
    case PREFERRED_LANGUAGE_RESPONSE:
      let preferredlanguageOption = action.data?.data;
      let optionArray: { label: any; value: any }[] = [];
      preferredlanguageOption.map((values: any) => {
        let optionJson = {
          label: values.description,
          value: values.code,
        };
        optionArray.push(optionJson);
      });
      return {
        ...state,
        isLoading: false,
        listofpreferredLanguage: preferredlanguageOption,
      };
    case PREFERRED_LANGUAGE_ERROR:
      return { ...state, isLoading: false };
    case RESET_SELECTED_LANGUAGE_INFO:
      return { ...state, selectedLanguageInfo: [] };
    case UPDATE_EXSITING_LANGUAGE_PARAMETRES_REQUEST:
      return { ...state, isLoading: true };
    case UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE:
      return { ...state, isLoading: false, updatedLanguageInfo: action.data };
    case UPDATE_EXSITING_LANGUAGE_PARAMETRES_ERROR:
      return { ...state, isLoading: false };
    case TRANSLATE_LANGUAGE_REQUEST:
      return { ...state, isLoading: true };
    case TRANSLATE_LANGUAGE_RESPONSE:
      return {
        ...state,
        isLoading: false,
        afterUpdatingtheLanguageParameter: action.data,
      };
    case TRANSLATE_LANGUAGE_ERROR:
      return { ...state, isLoading: false };
    case RESET_TRANSLATE_LANGUAGE_RESPONSE:
      return { ...state, afterUpdatingtheLanguageParameter: [] };

    case RESET_UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE:
      return { ...state, updatedLanguageInfo: [] };
    case ADD_NEW_LANGUAGE_PARAMETER_RESPONSE:
      return { ...state, toAddANewLanguageParameters: action.data };
    default:
      return state;
  }
};
export default LanguageParameterReducer;
