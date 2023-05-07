import {
  DELETE_APPOVAL_TASK,
  GET_APPROVALID_TASK,
  GET_APPROVAL_TASK,
  POST_APPROVAL_TASK,
} from "../action/ApprovalAction";

const initialState = {
  getApprovalTaskResponse: [],
  postApprovalTaskResponse: "",
  rejectApprovalTaskDataResponse: [],
};

const ApprovalTaskReducer = (
  state = initialState,
  action: { type: string; data: any }
) => {
  switch (action.type) {
    case GET_APPROVAL_TASK:
      return { ...state, getApprovalTaskResponse: action.data };

    case POST_APPROVAL_TASK:
      return { ...state, postApprovalTaskResponse: action.data };
    case GET_APPROVALID_TASK:
      return { ...state, getApprovalTaskIdDataResponse: action.data };
    case DELETE_APPOVAL_TASK:
      return { ...state, rejectApprovalTaskDataResponse: action.data };
    default:
      return state;
  }
};
export default ApprovalTaskReducer;
