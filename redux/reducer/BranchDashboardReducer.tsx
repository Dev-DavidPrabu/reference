import {
  DELETE_BRANCH_DATA,
  GET_BRANCH_DASHBOARD_FILTER,
    GET_BRANCH_DASHBOARD_REGORDS_DATA,
    POST_NEW_BRANCH,
    RESET_CREATED_BRANCH,
    UPDATE_BRANCH_DATA,
    RESET_DELETE_BRANCH_DATA,
    RESET_UPDATE_BRANCH_DATA,
    RESET_BRANCH_DASHBOARD_FILTER
  } from "../action/BranchDashboardAction";
  
  const initialState = {
  postNewBranchDataResponse: [],
  updateBranchDataResponse :[],
  getAllCompanyDataResponse: [],
  };
  
  const BranchDashboardReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case GET_BRANCH_DASHBOARD_REGORDS_DATA:
        return { ...state, getBranchDashboardRegordsResponse: action.data };
        case GET_BRANCH_DASHBOARD_FILTER:
        return { ...state, getBranchDashboardFilterResponse: action.data };
        case  POST_NEW_BRANCH:
          return {
            ...state,
            postNewBranchDataResponse: action.data,
          };
      case UPDATE_BRANCH_DATA:
      return {
        ...state,
        updateBranchDataResponse: action.data,
        getAllCompanyDataResponse: [],
      };
      case RESET_UPDATE_BRANCH_DATA:
      return {
        ...state,
        updateBranchDataResponse: [],
        getAllCompanyDataResponse: [],
      };
      case DELETE_BRANCH_DATA:
        return {
          ...state,
          deleteBranchDataResponse: action.data,
          getAllCompanyDataResponse: [],
        };
        case RESET_DELETE_BRANCH_DATA:
          return {
            ...state,
            deleteBranchDataResponse: [],
            getAllCompanyDataResponse: [],
          };
          case RESET_CREATED_BRANCH:
            return {
              ...state,
              postNewBranchDataResponse: [],
            };
            case RESET_BRANCH_DASHBOARD_FILTER:
              return {
                ...state,
                getBranchDashboardFilterResponse: [],
              };
      default:
        return state;
    }
  };
  export default BranchDashboardReducer;
  