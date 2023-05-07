import { GET_ALL_META_DATA } from "../action/metadataAction";

const initialState = {
  getAllMetaDataResponse: [],
};

const metadataReducer = (state = initialState, action: { type: string; data: any }) => {
  switch (action.type) {
    case GET_ALL_META_DATA:
      return { ...state, getAllMetaDataResponse: action.data };
    default:
      return state;
  }
};
export default metadataReducer;
