import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import { Fields } from "../../models/ReferenceDataModel";
import axios from "axios";

export const GET_BANK_REFERENCE_DATA = "GET_COUNTRY_REFERENCE_DATA";
export const GET_VENDOR_REFERENCE_DATA = "GET_IDTYPE_REFERENCE_DATA";
export const GET_BANK_LIST = "GET_BANK_LIST";
export const GET_VENDOR_LIST = "GET_VENDOR_LIST";

export const getBankReferenceData = (referenceCategory: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.referenceDataList + referenceCategory;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_BANK_REFERENCE_DATA, data: response.data });
      }
    } catch (error) { }
  };
};
export const getVendorReferenceData = (referenceCategory: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.referenceDataList + referenceCategory;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_VENDOR_REFERENCE_DATA, data: response.data });
      }
    } catch (error) { }
  };
};

export const getBankList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getBankList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_BANK_LIST, data: response.data });
      }
    } catch (error) { }
  };
};

export const getVendorList = (bankName: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getVendorList + bankName;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_VENDOR_LIST, data: response.data });
      }
    } catch (error) { }
  };
};

export const createAddBank = (addBank: Fields) => {
  return async () => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.addBank;
      await axios.post(apiURL, addBank);

      window.location.reload();
    } catch (error) { }
  };
};

export const editBankStatus = (bankStatus: any) => {
  return async () => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateBankStatus;
      await axios.post(apiURL, bankStatus);

      window.location.reload();
    } catch (error) { }
  };
};

export const editVendorStatus = (vendorStatus: Fields) => {
  return async () => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateVendorStatus;
      await axios.post(apiURL, vendorStatus);

      window.location.reload();
    } catch (error) { }
  };
};
