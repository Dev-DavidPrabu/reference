import {
  GET_ALL_WALLET_DATA,
  POST_NEW_WALLET_DATA,
  DELETE_WALLET_DATA,
  UPDATE_WALLET_DATA,
  GET_ALL_WALLET_TYPE,
  DELETE_WALLET_TYPE,
} from "../action/walletSetupAction";

const initialState = {
  getAllWalletDataResponse: [],
  getAllWalletDataType: [],
  postNewWalletDataResponse: [],
  deleteWalletResponse: [],
  updateWalletResponse: [],
};

const walletSetUpReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_ALL_WALLET_DATA:
      return { ...state, getAllWalletDataResponse: action.data };
    case GET_ALL_WALLET_TYPE:
      return { ...state, getAllWalletDataType: action.data };
    case POST_NEW_WALLET_DATA:
      return { ...state, postNewWalletDataResponse: action.data };
    case DELETE_WALLET_DATA:
      return { ...state, deleteWalletResponse: action.data };
    case DELETE_WALLET_TYPE:
      return { ...state, deleteWalletResponse: action.data };
    case UPDATE_WALLET_DATA:
      return { ...state, updateWalletResponse: action.data };
    default:
      return state;
  }
};
export default walletSetUpReducer;
