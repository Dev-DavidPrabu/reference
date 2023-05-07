import axios from 'axios';
import { Dispatch } from 'redux';
import { ApiEndPoints, Constants } from '../../Constants/Constants';
import { Fields } from '../../models/ReferenceDataModel';

export const GET_LANGUAGE_PARAMETER = 'GET_LANGUAGE_PARAMETER';
export const ADD_LANGUAGE_PARAMETER = 'ADD_LANGUAGE_PARAMETER';
export const GET_LANGUAGE_PARAMETER_VIEW = 'GET_LANGUAGE_PARAMETER_VIEW';
export const EDIT_LANUAGE_PARAMETER = 'EDIT_LANUAGE_PARAMETER';
export const RESET_EDIT_CREATE_SUCCESS = 'RESET_EDIT_CREATE_SUCCESS';
export const GET_LANGUAGE = 'GET_LANGUAGE';
export const TRANSLATE_LANUAGE_PARAMETER = 'TRANSLATE_LANUAGE_PARAMETER';

export const LANGUAGE_PARAMETER_REQUEST = 'LANGUAGE_PARAMETER_REQUEST';
export const LANGUAGE_PARAMETER_RESPONSE = 'LANGUAGE_PARAMETER_RESPONSE';
export const LANGUAGE_PARAMETER_ERROR = 'LANGUAGE_PARAMETER_ERROR';

export const SELECTED_LANGUAGE_INFO_REQUEST = 'SELECTED_LANGUAGE_INFO_REQUEST';
export const SELECTED_LANGUAGE_INFO_RESPONSE = 'SELECTED_LANGUAGE_INFO_RESPONSE';
export const SELECTED_LANGUAGE_INFO_ERROR = 'SELECTED_LANGUAGE_INFO_ERROR';
export const RESET_SELECTED_LANGUAGE_INFO = 'RESET_SELECTED_LANGUAGE_INFO';

export const PREFERRED_LANGUAGE_REQUEST = 'PREFERRED_LANGUAGE_REQUEST';
export const PREFERRED_LANGUAGE_RESPONSE = 'PREFERRED_LANGUAGE_RESPONSE';
export const PREFERRED_LANGUAGE_ERROR = 'PREFERRED_LANGUAGE_ERROR';

export const TRANSLATE_LANGUAGE_REQUEST = 'TRANSLATE_LANGUAGE_REQUEST';
export const TRANSLATE_LANGUAGE_RESPONSE = 'TRANSLATE_LANGUAGE_RESPONSE';
export const TRANSLATE_LANGUAGE_ERROR = 'TRANSLATE_LANGUAGE_ERROR';
export const RESET_TRANSLATE_LANGUAGE_RESPONSE="RESET_TRANSLATE_LANGUAGE_ERROR"
export const UPDATE_EXSITING_LANGUAGE_PARAMETRES_REQUEST =
  'UPDATE_EXSITING_LANGUAGE_PARAMETRES_REQUEST';
export const UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE =
  'UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE';
export const UPDATE_EXSITING_LANGUAGE_PARAMETRES_ERROR =
  'UPDATE_EXSITING_LANGUAGE_PARAMETRES_ERROR';
export const RESET_UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE="RESET_UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE"
export const ADD_NEW_LANGUAGE_PARAMETER_REQUEST = 'ADD_NEW_LANGUAGE_PARAMETER_REQUEST';
export const ADD_NEW_LANGUAGE_PARAMETER_RESPONSE = 'ADD_NEW_LANGUAGE_PARAMETER_RESPONSE';
export const ADD_NEW_LANGUAGE_PARAMETER_ERROR = 'ADD_NEW_LANGUAGE_PARAMETER_ERROR';

export const getLanguageParameter = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterGet;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_LANGUAGE_PARAMETER, data: response.data });
      }
    } catch (error) {}
  };
};

export const CreateLanguageParameter = (data: Fields) => {

  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterAdd;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: ADD_LANGUAGE_PARAMETER, data: response });
      }
    } catch (error) {}
  };
};

export const getViewLanguage = (key: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterView + `?keyValue=${key}`;
    try {
      const getViewLanguageScreenRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getViewLanguageScreenRes) {
        dispatch({ type: GET_LANGUAGE_PARAMETER_VIEW, data: getViewLanguageScreenRes });
      }
    } catch (error) {}
  };
};

export const EditLanguageParameter = (data: Fields) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterEdit;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: EDIT_LANUAGE_PARAMETER, data: response });
      }
    } catch (error) {}
  };
};
export const TranslateLanguageParameter = (data: Fields) => {

  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.TranslateLanguage;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: TRANSLATE_LANUAGE_PARAMETER, data: response });
      }
    } catch (error) {}
  };
};
export const resetEditCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_CREATE_SUCCESS });
  };
};
export const getLanguage = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.Language;
    try {
      const getLanguageRes = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (getLanguageRes) {
        dispatch({ type: GET_LANGUAGE, data: getLanguageRes });
      }
    } catch (error) {}
  };
};

export const getListOfLanguageInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LANGUAGE_PARAMETER_REQUEST });
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterGet;
      const { data } = await axios.get(apiURL).then((response) => {
        return response;
      });
      dispatch({ type: LANGUAGE_PARAMETER_RESPONSE, data: data });
    } catch (error) {
      dispatch({ type: LANGUAGE_PARAMETER_ERROR });
    }
  };
};

export const getSelectedLanguageInfo = (key: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SELECTED_LANGUAGE_INFO_REQUEST });
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterView + `?keyValue=${key}`;
      const { data } = await axios.get(apiURL).then((response) => {
        return response;
      });
      dispatch({ type: SELECTED_LANGUAGE_INFO_RESPONSE, data: data });
    } catch (error) {
      dispatch({ type: SELECTED_LANGUAGE_INFO_ERROR });
    }
  };
};

export const getTheListOFPreferredlanguage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: PREFERRED_LANGUAGE_REQUEST });
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.Language;
      const { data } = await axios.get(apiURL).then((response) => {
        return response;
      });
      dispatch({ type: PREFERRED_LANGUAGE_RESPONSE, data: data });
    } catch (error) {
      dispatch({ type: PREFERRED_LANGUAGE_ERROR });
    }
  };
};

export const translationTheRequestedString = (body: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: TRANSLATE_LANGUAGE_REQUEST });
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.TranslateLanguage;
      const { data } = await axios.post(apiURL, body).then((response) => {
        return response;
      });
      dispatch({ type: TRANSLATE_LANGUAGE_RESPONSE, data: data });
    } catch (error) {
      dispatch({ type: TRANSLATE_LANGUAGE_ERROR });
    }
  };
};

export const resetLanguageInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_SELECTED_LANGUAGE_INFO });
  };
};

export const updatingtheExsitingLanguageParameters = (UpdateData: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_EXSITING_LANGUAGE_PARAMETRES_REQUEST });
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.LanguageParameterEdit;
      const { data } = await axios.post(apiURL, UpdateData).then((response) => {
        return response;
      });
      dispatch({ type: UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE, data: data });
    } catch (error) {
      dispatch({ type: UPDATE_EXSITING_LANGUAGE_PARAMETRES_ERROR });
    }
  };
};

export const toAddANewLanguageParameters = (UpdateData: any) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ADD_NEW_LANGUAGE_PARAMETER_REQUEST });
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.addLanguageParameters;
      const { data } = await axios.post(apiURL, UpdateData).then((response) => {
        return response;
      });
      dispatch({ type: ADD_NEW_LANGUAGE_PARAMETER_RESPONSE, data: data });
    } catch (error) {
      dispatch({ type: ADD_NEW_LANGUAGE_PARAMETER_ERROR });
    }
  };
};


export const resetLanguage=()=>{
  return async (dispatch: Dispatch) => {
    dispatch({ type:  RESET_TRANSLATE_LANGUAGE_RESPONSE });
  };
}
export const resetEditLanguageResponse=()=>{
  return async (dispatch: Dispatch) => {
    dispatch({ type:  RESET_UPDATE_EXSITING_LANGUAGE_PARAMETRES_RESPONSE });
  };
}

