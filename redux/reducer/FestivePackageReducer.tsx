import {
  LIST_OF_FESTIVEL,
  DELETE_SELECTED_SEASON,
  ADD_NEW_FESTIVAL_SEASON,
  RESET_CREATED_SEASON_INFO,
} from "../action/FestivePackageActions";

const initialState = {};
const FestivePackageReducer = (
  state = initialState, action: { type: string; data: any }
) => {
  switch (action.type) {
    case LIST_OF_FESTIVEL:
      return { ...state, listOfFestivels: action.data };
    case DELETE_SELECTED_SEASON:
      return { ...state, deleteSeasonResponse: action.data };
    case ADD_NEW_FESTIVAL_SEASON:
      return { ...state, createSeasonResponse: action.data };
    case RESET_CREATED_SEASON_INFO:
      return { ...state, createSeasonResponse: undefined };
    default:
      return state;
  }
};
export default FestivePackageReducer;
