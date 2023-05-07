import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_AML_COMPLIANCE_DATA = "GET_AML_COMPLIANCE_DATA";
export const EDIT_AML_COMPLIANCE_DATA = "EDIT_AML_COMPLIANCE_DATA";
export const RESET_EDIT_COMPLIANCE_DATA = "RESET_EDIT_COMPLIANCE_DATA";

export const getAllAMLcomplianceData = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getAMLcompliance;
    try {
      const createComplianceResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (createComplianceResponse) {
        dispatch({
          type: GET_AML_COMPLIANCE_DATA,
          data: createComplianceResponse,
        });
      }
    } catch (error) {}
  };
};

export const updateAMLcomplianceData = (updatedValues: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.UpdateAMLcompliance +
      `${updatedValues.id}`;
    try {
      const updateComplianceResponse = await axios
        .post(apiURL, updatedValues)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (updateComplianceResponse) {
        dispatch({
          type: EDIT_AML_COMPLIANCE_DATA,
          data: updateComplianceResponse,
        });
      }
    } catch (error) {}
  };
};

export const resetUpdateComplianceData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_COMPLIANCE_DATA });
  };
};
