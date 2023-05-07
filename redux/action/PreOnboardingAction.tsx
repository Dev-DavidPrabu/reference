import { Dispatch } from "redux";
import { Constants, ApiEndPoints } from "../../Constants/Constants";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const POST_DATA = "POST_DATA";
export const GET_BATCH_DATA = "GET_BATCH_DATA";
export const BATCH_DETAIL_DATA = "BATCH_DETAIL_DATA";
export const RESET_BATCH_DATA = "RESET_BATCH_DATA";
export const ADD_CUSTOMER_DATA = "ADD_CUSTOMER_DATA";
export const RESET_ADD_CUSTOMER_DATA = "RESET_ADD_CUSTOMER_DATA";
export const GET_NATIONALITY_RES = "GET_NATIONALITY_RES";
export const GET_LANGUAGE_RES = "GET_LANGUAGE_RES";
export const GET_RACE_RES = "GET_RACE_RES";
export const GET_COUNTRY_RES = "GET_COUNTRY_RES"

export const uploadHandler = async (url: string, fileinfo: any) => {
  if (fileinfo) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    var requestOptions: any = {
      method: "PUT",
      headers: myHeaders,
      body: fileinfo,
      redirect: "follow",
    };
    let resultResponse = await fetch(url, requestOptions)
      .then((response) => {
        toast.success(`Uploaded ${response}`);
      })
      .catch((error: any) => {
        toast.error(`Error:${error}`);
      });
  }
};

export const getAllBatchData = (batch: any) => {
  return async (dispatch: Dispatch) => {
    let apiURL =
      Constants.BaseURL +
      ApiEndPoints.getPreOnboardingBatch +
      `${batch.companyId}`;
    if (batch.startDate && batch.endDate) {
      apiURL = apiURL.concat(
        `?fromDate=${batch.startDate}&toDate=${batch.endDate}`
      );
    } else if (batch.startDate) {
      apiURL = apiURL.concat(`?fromDate=${batch.startDate}`);
    }
    const batchResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (batchResponse)
      dispatch({ type: GET_BATCH_DATA, data: batchResponse || [] });
  };
};
export const resetBatchData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_BATCH_DATA });
  };
};

export const getBatchDetailsData = (companyId: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.getBatchDetails +
      companyId +
      `?page=1&pageSize=99`;
    const batchResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (batchResponse)
      dispatch({ type: BATCH_DETAIL_DATA, data: batchResponse || [] });
  };
};

export const createNewCustomer = (details: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.addPreonboardingCustomer;
      const detailResponse = await axios
        .post(apiURL, details)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (detailResponse) {
        dispatch({ type: ADD_CUSTOMER_DATA, data: detailResponse });
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        dispatch({ type: ADD_CUSTOMER_DATA, data: err?.response });
      }
    }
  };
};

export const resetnewCustomerData = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_ADD_CUSTOMER_DATA });
  };
};

export const getNationalityDetails = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getNationalityOnboarding;
    const batchResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (batchResponse)
      dispatch({ type: GET_NATIONALITY_RES, data: batchResponse });
  };
};

export const getLanguageDetails = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getLanguageOnboarding;
    const batchResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (batchResponse)
      dispatch({ type: GET_LANGUAGE_RES, data: batchResponse });
  };
};

export const getRaceDetails = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getRaceOnboarding;
    const batchResponse = await axios.get(apiURL).then((response) => {
      return response?.data;
    });
    if (batchResponse) dispatch({ type: GET_RACE_RES, data: batchResponse });
  };
};

export const getCountryData = (referenceCategory: string) => {
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
        dispatch({ type: GET_COUNTRY_RES, data: response.data });
      }
    } catch (error) {}
  };
};