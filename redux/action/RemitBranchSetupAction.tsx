import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_COUNTRY_REGORDS_DATA = "GET_COUNTRY_REGORDS_DATA";
export const GET_BANK_REGORDS_DATA = "GET_BANK_REGORDS_DATA";
export const GET_BRANCH_LIST_REGORDS_DATA = "GET_BRANCH_LIST_REGORDS_DATA";
export const RESET_BANK_SETUP = "RESET_BANK_SETUP";
export const UPDATE_BRANCH_DETAILS = "UPDATE_BRANCH_DETAILS";
export const RESET_UPDATE_BRANCH_DETAILS = "RESET_UPDATE_BRANCH_DETAILS";

export const getCountryRecords = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.countryListResponse;
    try {
      const countryRegordsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (countryRegordsResponse) {
        dispatch({
          type: GET_COUNTRY_REGORDS_DATA,
          data: countryRegordsResponse,
        });
      }
    } catch (error) {}
  };
};

export const getBankRecords = (countryCode: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getBankSetupRecord + `/${countryCode}`;
    try {
      const bankRegordsResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (bankRegordsResponse) {
        dispatch({ type: GET_BANK_REGORDS_DATA, data: bankRegordsResponse });
      }
    } catch (error) {}
  };
};

export const getBranchList = (
  countryCode: any,
  bankCode: any,
  branchCode: any,
  showInactive: any
) => {
  return async (dispatch: Dispatch) => {
    let status = false;
    if (showInactive === "true") {
      status = true;
    }
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getBranchListResponse +
      `?countryCode=${countryCode}&bankCode=${bankCode}&branchCode=${branchCode}&showInactive=${status}`;
    try {
      const branchListRegordsResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (branchListRegordsResponse) {
        dispatch({
          type: GET_BRANCH_LIST_REGORDS_DATA,
          data: branchListRegordsResponse,
        });
      }
    } catch (error) {}
  };
};

export const updateBranchDetails = (updateDetails: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.updateRemitBranch;
    try {
      const branchResponse = await axios
        .post(apiURL, updateDetails)
        .then((response) => {
          if (response) {
            return response.data;
          } else {
            return false;
          }
        });
      if (branchResponse) {
        dispatch({ type: UPDATE_BRANCH_DETAILS, data: branchResponse });
      }
    } catch (error) {}
  };
};
export const resetUpdateBranchRecords = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_BRANCH_DETAILS });
  };
};

export const resetBranchRecordsData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_BANK_SETUP });
  };
};
