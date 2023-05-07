import axios from "axios";
import { Dispatch } from "redux"
import { ApiEndPoints, Constants } from "../../Constants/Constants";
export const GET_ALL_CHANNELS = "GET_ALL_CHANNELS";
export const GET_ALL_LANGUAGE = "GET_ALL_LANGUAGE";
export const UPDATE_CHANNELS = "UPDATE_CHANNELS";
export const CLEAR_UPDATE_CHANNELS = "CLEAR_UPDATE_CHANNELS";

export const getAllChannels=()=>{
    return async (dispatch: Dispatch)=>{
        const apiUrl = Constants.BaseURL + ApiEndPoints.notificationChannelList;
        const channelResponse = await axios.get(apiUrl).then((response)=>{
            if(response){
            return response.data;
            }
        })
        const data = await channelResponse;
        dispatch({ type: GET_ALL_CHANNELS, data: data });
    }
}
export const getAllLanguage=()=>{
    return async (dispatch: Dispatch)=>{
        const apiUrl = Constants.BaseURL + ApiEndPoints.notificationChannellanguage;
        const channelResponse = await axios.get(apiUrl).then((response)=>{
            if(response){
            return response.data;
            }
        })
        const data = await channelResponse;
        dispatch({ type: GET_ALL_LANGUAGE, data: data });
    }
}
export const updateChannels=(updateBody:any)=>{
    return async (dispatch: Dispatch)=>{
        const apiUrl = Constants.BaseURL + ApiEndPoints.notificationChannelUpdate + updateBody.id;
        const channelResponse = await axios.put(apiUrl,updateBody).then((response)=>{
            if(response){
            return response.data;
            }
        })
        const data = await channelResponse;
        dispatch({ type: UPDATE_CHANNELS, data: data });
    }
}
export const resetUpdateChannel = () => {
    return async (dispatch: Dispatch) => {
      dispatch({ type: CLEAR_UPDATE_CHANNELS });
    };
  };