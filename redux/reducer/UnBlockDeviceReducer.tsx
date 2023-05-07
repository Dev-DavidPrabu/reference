import { GET_UNBLOCKDEVICE_SUMMARY } from "../action/UnLockDeviceAction";

const initialState = {
  getUnBlockdeviceResponse: [],
};

const UnBlockDeviceReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_UNBLOCKDEVICE_SUMMARY:
      return { ...state, getUnBlockdeviceResponse: action.data };

    default:
      return state;
  }
};

export default UnBlockDeviceReducer;
