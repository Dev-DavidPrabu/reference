import {
  ERROR_CUSTMER_LOCKINFO,
  POST_CUSTOMER_LOCKINFO,
} from "../action/staffDeviceLockAction";

const initialState = {
  staffDeviceLocklist: [],
  errorDevideLocklist: "",
};

const staffDeviceLockReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case POST_CUSTOMER_LOCKINFO:
      return {
        ...state,
        staffDeviceLocklist: action.data,
        errorDevideLocklist: "",
      };
    case ERROR_CUSTMER_LOCKINFO:
      return {
        ...state,
        errorDevideLocklist: action.data,
        staffDeviceLocklist: [],
      };
    default:
      return state;
  }
};
export default staffDeviceLockReducer;
