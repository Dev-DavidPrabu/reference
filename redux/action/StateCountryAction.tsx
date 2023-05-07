import { ApiEndPoints, Constants } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";
export const GET_ALL_POSTAL_CODE = "GET_ALL_POSTAL_CODE";
export const GET_ALL_COUNTRY_DATA = "GET_ALL_COUNTRY_DATA";

export const getAllPostalCode = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL+ ApiEndPoints.listOfPostalCode;
    try{
      const responseData = await axios.get(apiURL).then((response) => {
        if(response){
        return response.data;
        }else{
          return false
        }
      })
      if(responseData){
      dispatch({ type: GET_ALL_POSTAL_CODE, data: responseData.data });
      }
    }catch(error){
      
    }
  };
};

export const getAllCountryData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.listOfCountry;
      try{
        const responseData = await axios.get(apiURL).then((response) => {
          if(response){
          return response.data;
          }else{
            return false
          }
        })
        if(responseData){
        dispatch({ type: GET_ALL_COUNTRY_DATA, data: responseData.data });
        }
      }catch(error){
        
      }
  };
};
