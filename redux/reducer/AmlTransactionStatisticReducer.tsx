import {
    GET_TRANSACTION_STATISTICS_LIST,
    CREATE_TRANSACTION_STATISTICS,
    RESET_CREATE_TRANSACTION_STATISTICS,
    EDIT_TRANSACTION_STATISTICS,
    RESET_EDIT_TRANSACTION_STATISTICS,
    GET_RISK_FACTOR_CATEGORY_LIST
  } from "../action/AmlTransactionStatisticsAction";

  
  const initialState = {
    getAllTransactionStatisticsList: [],
    getTransactionStatisticsError:[],
    getTransactionStatisticsEditError:[],
    getRiskFactorCategory:[]
  };
  
  const AmlTransactionStatisticReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_TRANSACTION_STATISTICS_LIST:
        return { ...state, getAllTransactionStatisticsList: action.data };
      case CREATE_TRANSACTION_STATISTICS:
          return { ...state, getTransactionStatisticsError: action.data };
      case RESET_CREATE_TRANSACTION_STATISTICS:
          return {...state, getTransactionStatisticsError:[]};
      case EDIT_TRANSACTION_STATISTICS:
         return { ...state, getTransactionStatisticsEditError: action.data };
      case RESET_EDIT_TRANSACTION_STATISTICS:
        return { ...state, getTransactionStatisticsEditError: [] };
      case GET_RISK_FACTOR_CATEGORY_LIST:
        return { ...state, getRiskFactorCategory: action.data };
      default:
        return state;
    }
  };
  export default AmlTransactionStatisticReducer;