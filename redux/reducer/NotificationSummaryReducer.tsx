import {  GET_NOTIFICATION_MODULE, GET_NOTIFICATION_SUMMARY, UPDATE_NOTIFICATION_SUMMARY } from "../action/NotificationSummaryAction";

const initialState = {
    getNotificationResponse: [],
    updateNotificationRespons: [],
    getNotificationModuleResponse:[]
}


const NotificationSummaryReducer = (state = initialState, action: { type: string; data: any }) =>{
    switch (action.type) {
        case GET_NOTIFICATION_SUMMARY:
          return { ...state, getNotificationResponse: action.data };
          case GET_NOTIFICATION_MODULE:
            return { ...state, getNotificationModuleResponse: action.data };
            case UPDATE_NOTIFICATION_SUMMARY:
              return { ...state, updateNotificationResponse: action.data };
       
          default:
            return state;
        }
  
}

export default NotificationSummaryReducer