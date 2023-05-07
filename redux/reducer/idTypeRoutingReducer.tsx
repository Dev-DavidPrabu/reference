import {
  GET_IDTYPE_REFERENCE_DATA,
  GET_COUNTRY_REFERENCE_DATA,
  GET_IDTYPE_DATA,
  CREATE_IDTYPE_ERROR,
  RESET_CREATE_ERROR
} from "../action/idTypeRoutingActions";

const initialState = {
  getAllIdTypeResponse: [],
  getAllCountryResponse: [],
  getAllIdTypeRoutingResponse: [],
  getIdtypeCreateError:[],
};

const idtypeReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_COUNTRY_REFERENCE_DATA:
      return { ...state, getAllCountryResponse: action.data };
    case GET_IDTYPE_REFERENCE_DATA:
      return { ...state, getAllIdTypeResponse: action.data };
    case GET_IDTYPE_DATA:
      return { ...state, getAllIdTypeRoutingResponse: action.data };
      case CREATE_IDTYPE_ERROR:
        return { ...state, getIdtypeCreateError: action.data };
      case RESET_CREATE_ERROR:
        return {...state, getIdtypeCreateError:[]}
    default:
      return state;
  }
};
export default idtypeReducer;
