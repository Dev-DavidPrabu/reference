import { POST_FILE_DATA } from "../action/PreLoginCarouselAction";


const initialState = {
    postCarouselFileData: [],
  };

  const PreLoginCarouselReducer = (
    state = initialState,
    action: { type: string; data: any }
  ) => {
    switch (action.type) {
      case POST_FILE_DATA:
        return { ...state, postCarouselFileData: action.data };
      default:
        return state;
    }
  };
  export default PreLoginCarouselReducer;