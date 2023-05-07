import { ADD_DOC_UPLOAD_REQUEST, DOC_UPLOAD_RESQUEST_APPROVE, GET_DOC_UPLOAD_REQUEST_DATA, GET_IDTYPE_RESPONSE, GET_VIEW_DOCUPLOAD_REQ, RESET_CREATED_DATA_DOC } from "../action/DocUploadRequestAction";

  
  const initialState = {postDocUploadRequestRes:[]};
  
  const DocUploadRequestReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case ADD_DOC_UPLOAD_REQUEST:
        return { ...state, postDocUploadRequestRes: action.data };
        case DOC_UPLOAD_RESQUEST_APPROVE:
        return { ...state, getApproveRes: action.data };
        case RESET_CREATED_DATA_DOC:
        return { ...state, postDocUploadRequestRes:[]};
        case GET_DOC_UPLOAD_REQUEST_DATA:
          return { ...state, getDocUploadRequestResData: action.data };  
          case GET_VIEW_DOCUPLOAD_REQ:
            return { ...state, getDocUploadRequestView: action.data };
            case GET_IDTYPE_RESPONSE:
              return { ...state, getIdtypeDocRes: action.data };            
      default:
        return state;
    }
  };
  export default DocUploadRequestReducer;