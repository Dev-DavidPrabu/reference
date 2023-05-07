import { GET_ALL_REFERENCE_DATA,POST_REFRENCE_DATA,RESET_CREATE_ERROR ,RESET_REFERENCE_DATA} from "../action/ReferenceDataAction";

const initialState = {
  getAllReferenceDataResponse: [],
  createReferenceData:[],
};

const referenceReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_ALL_REFERENCE_DATA:
      return { ...state, getAllReferenceDataResponse: action.data };
    case POST_REFRENCE_DATA:
      return { ...state,createReferenceData:action.data};
    case RESET_CREATE_ERROR:
      return {...state,createReferenceData:[]};
    case RESET_REFERENCE_DATA:
      return {...state, getAllReferenceDataResponse:[]}
    default:
      return state;
  }
};
export default referenceReducer;
