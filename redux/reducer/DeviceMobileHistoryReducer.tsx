import {
  GET_MOBILE_HISTORY_REGORDS_DATA,
  GET_DEVICE_HISTORY_REGORDS_DATA,
} from "../action/DeviceMobileHistoryAction";

const initialState = {};

const DeviceMobileHistoryReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_MOBILE_HISTORY_REGORDS_DATA:
      return { ...state, getMobileHistoryRegordsResponse: action.data };
    case GET_DEVICE_HISTORY_REGORDS_DATA:
      return { ...state, getDeviceHistoryRegordsResponse: action.data };
    default:
      return state;
  }
};
export default DeviceMobileHistoryReducer;
