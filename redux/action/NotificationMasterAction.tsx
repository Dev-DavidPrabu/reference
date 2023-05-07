import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_ALL_MASTER_DATA = "GET_ALL_MASTER_DATA";
export const EDIT_MASTER_DATA = "EDIT_MASTER_DATA ";
export const CLEAR_EDIT_MASTER_DATA = "CLEAR_EDIT_MASTER_DATA ";
export const CLEAR_ALL_MASTER_DATA = "CLEAR_ALL_MASTER_DATA";

export const getAllMasterData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.notificationMasterList;
  try{
    const masterResponse = await axios.get(apiURL).then((response) => {
      if(response){
      return response.data;
      }else{
        return false
      }
    })
    if(masterResponse){
    dispatch({ type: GET_ALL_MASTER_DATA, data: masterResponse });
    }
  }catch(error){
  }
}
};

export const resetMasterGetInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_ALL_MASTER_DATA });
  };
};
export const resetMasterInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_EDIT_MASTER_DATA });
  };
};

export const updateMasterSetup = (apiBody: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =Constants.BaseURL+ApiEndPoints.notificationMasterList;
  try{
    const updateMasterResponse = await axios.put(apiURL,apiBody).then((response) => {
      if(response){
      return response.data;
      }else{
        return false
      }
    })
    if(updateMasterResponse){
    dispatch({ type: EDIT_MASTER_DATA, data: updateMasterResponse });
    }
  }catch(error){
  }
}
};
