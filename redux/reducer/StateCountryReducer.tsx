import {
  GET_ALL_POSTAL_CODE,
  GET_ALL_COUNTRY_DATA,
} from "../action/StateCountryAction";

const initialState = {
  getAllPostalCodeResponse: [],
  getAllCountryDataResponse: [],
};

const StateCountryReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_ALL_POSTAL_CODE:
      return { ...state, getAllPostalCodeResponse: action.data };
    case GET_ALL_COUNTRY_DATA:
      return { ...state, getAllCountryDataResponse: action.data };

    default:
      return state;
  }
};
export default StateCountryReducer;
