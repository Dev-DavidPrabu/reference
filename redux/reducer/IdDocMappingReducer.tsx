import {
    GET_ID_DOC_MAPPING_LIST,
    CREATE_ID_DOC_MAPPING,
    RESET_CREATE_ID_DOC_MAPPING,
    EDIT_ID_DOC_MAPPING,
    RESET_EDIT_ID_DOC_MAPPING,
  } from "../action/IdDocMappingAction";

  
  const initialState = {
    getAllIdDocMappingList: [],
    getIdDocMappingError:[],
    getIdDocMappingEditError:[],
  };
  
  const IdDocMappingReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_ID_DOC_MAPPING_LIST:
        return { ...state, getAllIdDocMappingList: action.data };
      case CREATE_ID_DOC_MAPPING:
          return { ...state, getIdDocMappingError: action.data };
      case RESET_CREATE_ID_DOC_MAPPING:
          return {...state, getIdDocMappingError:[]};
      case EDIT_ID_DOC_MAPPING:
         return { ...state, getIdDocMappingEditError: action.data };
      case RESET_EDIT_ID_DOC_MAPPING:
        return { ...state, getIdDocMappingEditError: [] };
      default:
        return state;
    }
  };
  export default IdDocMappingReducer;