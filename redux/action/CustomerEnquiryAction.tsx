import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET__CUSTOMER_ENQUIRY_LIST = "GET__CUSTOMER_ENQUIRY_LIST";
export const GET_CUSTOMER_HISTORY_LIST = "GET_CUSTOMER_HISTORY_LIST";
export const GET_CUSTOMER_WALLET_HISTORY_LIST =
  "GET_CUSTOMER_WALLET_HISTORY_LIST";
export const GET_KYC_CUSTOMER_ENQUIRY_DETAILS =
  "GET_KYC_CUSTOMER_ENQUIRY_DETAILS";
export const RESET_KYC_CUSTOMER_ENQUIRY_DETAILS =
  "RESET_KYC_CUSTOMER_ENQUIRY_DETAILS";
export const GET_CUSTOMER_STATUS_DETAILS = "GET_CUSTOMER_STATUS_DETAILS";
export const RESET_CUSTOMER_STATUS_DETAILS = "RESET_CUSTOMER_STATUS_DETAILS";
export const UPDATE_CUSTOMER_PROFILE = "UPDATE_CUSTOMER_PROFILE";
export const RESET_UPDATE_CUSTOMER_PROFILE = "RESET_UPDATE_CUSTOMER_PROFILE";
export const GET_WALLET_LINK_LIST = "GET_WALLET_LINK_LIST";
export const GET_POSTAL_CODE_REFERENCE_DATA = "GET_POSTAL_CODE_REFERENCE_DATA";
export const GET_OCCUPATION_REFERENCE_DATA = "GET_OCCUPATION_REFERENCE_DATA";
export const GET_NATIONALITY_REFERENCE_DATA = "GET_NATIONALITY_REFERENCE_DATA";
export const GET_SOURCE_OF_FUND_REFERENCE_DATA =
  "GET_SOURCE_OF_FUND_REFERENCE_DATA";
export const GET_SOURCE_OF_WEALTH_REFERENCE_DATA =
  "GET_SOURCE_OF_WEALTH_REFERENCE_DATA";
export const GET_BANK_REFERENCE_DATA = "GET_BANK_REFERENCE_DATA";
export const GET_COUNTRY_REFERENCE_DATA = "GET_COUNTRY_REFERENCE_DATA";
export const GET_IDTYPE_DATA = "GET_IDTYPE_DATA";
export const GET_OPS_REMARKS_LIST = "GET_OPS_REMARKS_LIST";
export const GET_SOURCE_LIST = "GET_SOURCE_LIST";
export const GET_PURPOSE_OF_CARD_LIST = "GET_PURPOSE_OF_CARD_LIST";
export const GET_POSITION_HELD_LIST = "GET_POSITION_HELD_LIST";

export const getCustomerEnquiryList = (page: number, records: any) => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.BaseURL + ApiEndPoints.getCustomerEnquiryList;
    try {
      const response = await axios
        .get(apiURL, {
          params: {
            pageNumber: page,
            noOfRecords: records,
          },
        })
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (response) {
        dispatch({ type: GET__CUSTOMER_ENQUIRY_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const resetCustomerEnquiryDetails = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_KYC_CUSTOMER_ENQUIRY_DETAILS });
  };
};

export const getKYCCustomerEnquiryDetail = (customerID: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getKYCCustomerEnquiry + customerID;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({
          type: GET_KYC_CUSTOMER_ENQUIRY_DETAILS,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const resetCustomerStatusDetails = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_STATUS_DETAILS });
  };
};

export const getCustomerStatusDetail = (customerID: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getCustomerStatus + customerID;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({
          type: GET_CUSTOMER_STATUS_DETAILS,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const uploadCustomerDocuments = async (fileData: any) => {
  const apiURL = Constants.BaseURL + ApiEndPoints.docUpload;
  const docUploadResponse = await axios
    .post(apiURL, fileData)
    .then((response) => {
      return response?.data;
    })
    .catch((error: any) => {});
  if (docUploadResponse) {
    return docUploadResponse;
  }
};

export const getCustomerHistoryList = (customerID: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getCustomerHistory + customerID;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_CUSTOMER_HISTORY_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getCustomerWalletHistoryList = (customerID: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getCustomerWalletHistory + customerID;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({
          type: GET_CUSTOMER_WALLET_HISTORY_LIST,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const resetEditMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_CUSTOMER_PROFILE });
  };
};

export const updateCustomerProfile = (EditData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.BaseURL + ApiEndPoints.updateCustomerProfile;
      const response = await axios.post(apiURL, EditData).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_CUSTOMER_PROFILE, data: response });
        if (response.data) {
        }
      }
    } catch (error) {}
  };
};

export const getWalletLinkList = (walletTypeCode: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.WalletLinkList + walletTypeCode;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_WALLET_LINK_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getPostalCodeReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_POSTAL_CODE_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getOccupationReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_OCCUPATION_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getNationalityReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_NATIONALITY_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getSourceOfFundReferenceData = (referenceCategory: string) => {
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
        dispatch({
          type: GET_SOURCE_OF_FUND_REFERENCE_DATA,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

export const getSourceOfWealthReferenceData = (referenceCategory: string) => {
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
        dispatch({
          type: GET_SOURCE_OF_WEALTH_REFERENCE_DATA,
          data: response.data,
        });
      }
    } catch (error) {}
  };
};

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
    } catch (error) {}
  };
};

export const getIdTypeData = (nationality: string) => {
  return async (dispatch: Dispatch) => {
    const apiURL =
      Constants.BaseURL + ApiEndPoints.getIdtypeCodeList + nationality;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_IDTYPE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getCountryReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_COUNTRY_REFERENCE_DATA, data: response.data });
      }
    } catch (error) {}
  };
};

export const getOpsRemarksReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_OPS_REMARKS_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getSourceReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_SOURCE_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getPurposeOfCardReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_PURPOSE_OF_CARD_LIST, data: response.data });
      }
    } catch (error) {}
  };
};

export const getPositionHeldReferenceData = (referenceCategory: string) => {
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
        dispatch({ type: GET_POSITION_HELD_LIST, data: response.data });
      }
    } catch (error) {}
  };
};
