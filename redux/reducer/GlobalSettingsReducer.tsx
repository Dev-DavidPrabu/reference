import {EDIT_GLOBAL_SETTINGS_RES, GET_GLOBAL_SETTINGS} from "../action/GlobalSettingsAction"
  
  const initialState = {};
  
  const globalSettingsReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_GLOBAL_SETTINGS:
        return { ...state, globalSettingsResponse: action.data };
        case EDIT_GLOBAL_SETTINGS_RES:
          return { ...state, editGlobalSettingsResponse: action.data };
      default:
        return state;
    }
  };
  export default globalSettingsReducer;