import { FUNCTIONALCODE_DATA_ADD, FUNCTIONALCODE_DATA_EDIT, GET_FUNCTIONALCODE_DATA, RESET_CREATE_SUCCESS, RESET_EDIT_CREATE_SUCCESS } from "../action/BoFunctionalcodeAction";

const initialState = {
  getBoFunctioanalcodeResponse: [],
  getFunctionalCodeAddResponse: [],
  getFunctionalCodeEditResponse: [],
  getIdtypeCreateError: [],
};

const BoFunctionalcodeReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_FUNCTIONALCODE_DATA:
      return { ...state, getBoFunctioanalcodeResponse: action.data };
    case FUNCTIONALCODE_DATA_ADD:
      return { ...state, getFunctionalCodeAddResponse: action.data }
    case RESET_CREATE_SUCCESS:
      return { ...state, getFunctionalCodeAddResponse: [] }
    case FUNCTIONALCODE_DATA_EDIT:
      return { ...state, getFunctionalCodeEditResponse: action.data }
    case RESET_EDIT_CREATE_SUCCESS:
      return { ...state, getFunctionalCodeEditResponse: [] }
    default:
      return state;
  }
};

export default BoFunctionalcodeReducer;
