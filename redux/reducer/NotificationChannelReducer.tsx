import { GET_ALL_CHANNELS
,UPDATE_CHANNELS, CLEAR_UPDATE_CHANNELS,GET_ALL_LANGUAGE } from '../action/NotificationChannelAction';

const initialState = {
    getAllChannelResponse: [],
    updateChannelResponse: [],
    getAllLanguageResponse: []
};

const NotificationChannelReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
        case GET_ALL_CHANNELS:
            return { ...state, getAllChannelResponse: action.data };
        case UPDATE_CHANNELS:
            return { ...state, updateChannelResponse: action.data };
        case CLEAR_UPDATE_CHANNELS:
            return { ...state, updateChannelResponse: []};
        case GET_ALL_LANGUAGE:
            return { ...state, getAllLanguageResponse: action.data};
        default:
            return state;
    }
};
export default NotificationChannelReducer;
