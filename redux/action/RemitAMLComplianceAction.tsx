import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_REMIT_AML_COMPLIANCE_LIST = "GET_REMIT_AML_COMPLIANCE_LIST";

export const EDIT_REMIT_AML_COMPLIANCE = "EDIT_REMIT_AML_COMPLIANCE";
export const RESET_EDIT_REMIT_AML_COMPLIANCE =
  "RESET_EDIT_REMIT_AML_COMPLIANCE";

export const getRemitAMLComplianceList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getRemitAMLCompliance;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_REMIT_AML_COMPLIANCE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetUpdateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_EDIT_REMIT_AML_COMPLIANCE });
  };
};

export const updateRemitAMLCompliance = (updatedValues: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.updateRemitAMLCompliance +
      `${updatedValues?.id}`;
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
          type: EDIT_REMIT_AML_COMPLIANCE,
          data: updateComplianceResponse,
        });
      }
    } catch (error) {}
  };
};
