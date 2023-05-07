import axios from "axios";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const LIST_OF_FESTIVEL = "LIST_OF_FESTIVEL";
export const ADD_NEW_FESTIVAL_SEASON = "ADD_NEW_FESTIVAL_SEASON";
export const DELETE_SELECTED_SEASON = "DELETE_SELECTED_SEASON";
export const RESET_CREATED_SEASON_INFO = "RESET_CREATED_SEASON_INFO";

export const listOfFestivelItem = (seasonCode: any,startDate: any,endDate: any) => {
  return async (dispatch: Dispatch) => {
    const createResponse = await axios
      .get(Constants.BaseURL+ApiEndPoints.festivePackageList+`?seasonCode=${seasonCode}&startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {
        return response?.data;
      });
    dispatch({ type: LIST_OF_FESTIVEL, data: createResponse });
  };
};

export const removeDeleteParticularSeason = (seasonId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL+ApiEndPoints.festivePackageDelete+`/${seasonId}`;
    const deleteResponse = await axios.post(apiURL).then((response) => {
      return response.data;
    });
    if (deleteResponse.data) {
      dispatch({ type: DELETE_SELECTED_SEASON, data: deleteResponse });
    }
  };
};

export const addNewFestivalSeason = (apiBody: any) => {
  return async (dispatch: Dispatch) => {

    const createResponse = await axios.post( Constants.BaseURL+ApiEndPoints.festivePackageSave,apiBody).then((response: any) => {
      return response.data;
    });
    if (createResponse.data) {
      dispatch({ type: ADD_NEW_FESTIVAL_SEASON, data: createResponse });
    } else if (createResponse.data.error) {
      toast.error("error");
    }
  };
};

export const resetCreateSeasonInfo = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATED_SEASON_INFO });
  };
};
