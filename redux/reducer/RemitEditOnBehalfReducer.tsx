import { GET_BACKIMG, GET_FRONTIMG, UPDATE_ONBEHALF_DETAILS } from "../action/RemitEditOnBehalfAction";

  const initialState = {
    fileUploadResponse: [],
  };
  const RemitEditOnBehalfReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {

    switch (action.type) {
     
      case UPDATE_ONBEHALF_DETAILS:
        return { ...state, updateOnBehalfDetailsResponse: action.data}
      
      case GET_FRONTIMG:
        return { ...state, getOnBehalfFrontImageResponse: action.data }
      case GET_BACKIMG:
        return { ...state, getOnBehalfBackImageResponse: action.data}
      default:
        return { ...state };
    }
  };
  
export default RemitEditOnBehalfReducer; 

  