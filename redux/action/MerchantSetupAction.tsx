import { Constants, ValyouEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";

export const GET_MERCHANT_SUMMARY_LIST = "GET_MERCHANT_SUMMARY_LIST";
export const GET_MERCHANT_BRANCH_SUMMARY_LIST = "GET_MERCHANT_BRANCH_SUMMARY_LIST";
export const GET_MERCHANT_TELLER_SUMMARY_LIST = "GET_MERCHANT_TELLER_SUMMARY_LIST";
export const CREATE_MERCHANT_SETUP = "CREATE_MERCHANT_SETUP";
export const RESET_CREATE_MERCHANT_SETUP = "RESET_CREATE_MERCHANT_SETUP";
export const UPDATE_MERCHANT_SETUP = "UPDATE_MERCHANT_SETUP";
export const RESET_UPDATE_MERCHANT_SETUP = "RESET_UPDATE_MERCHANT_SETUP";
export const CREATE_MERCHANT_BRANCH_SETUP = "CREATE_MERCHANT_BRANCH_SETUP";
export const RESET_CREATE_MERCHANT_BRANCH_SETUP = "RESET_CREATE_MERCHANT_BRANCH_SETUP";
export const UPDATE_MERCHANT_BRANCH_SETUP = "UPDATE_MERCHANT_BRANCH_SETUP";
export const RESET_UPDATE_MERCHANT_BRANCH_SETUP = "RESET_UPDATE_MERCHANT_BRANCH_SETUP";
export const CREATE_MERCHANT_TELLER_SETUP = "CREATE_MERCHANT_TELLER_SETUP";
export const RESET_CREATE_MERCHANT_TELLER_SETUP = "RESET_CREATE_MERCHANT_TELLER_SETUP";
export const UPDATE_MERCHANT_TELLER_SETUP = "UPDATE_MERCHANT_TELLER_SETUP";
export const RESET_UPDATE_MERCHANT_TELLER_SETUP = "RESET_UPDATE_MERCHANT_TELLER_SETUP";

export const getMerchantSummaryList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.ValyouURL + ValyouEndPoints.merchantSummaryList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_MERCHANT_SUMMARY_LIST, data: response.data });
      }
    } catch (error) { }
  };
};

export const getMerchantBranchSummaryList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.ValyouURL + ValyouEndPoints.merchantBranchSummaryList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_MERCHANT_BRANCH_SUMMARY_LIST, data: response.data });
      }
    } catch (error) { }
  };
};

export const getMerchantTellerSummaryList = () => {
  return async (dispatch: Dispatch) => {
    const apiURL = Constants.ValyouURL + ValyouEndPoints.merchantTellerSummaryList;
    try {
      const response = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: GET_MERCHANT_TELLER_SUMMARY_LIST, data: response.data });
      }
    } catch (error) { }
  };
};

export const resetMerchantCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_MERCHANT_SETUP });
  };
};

export const createMerchantData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.ValyouURL + ValyouEndPoints.createMerchant;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_MERCHANT_SETUP, data: response });
        if (response.data) {
          window.history.back()
        }
      }
    } catch (error) {
    }
  };
};

export const resetMerchantUpdateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_MERCHANT_SETUP });
  };
};

export const updateMerchantData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.ValyouURL + ValyouEndPoints.updateMerchant;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_MERCHANT_SETUP, data: response });
        if (response.data) {
          window.history.back()
        }
      }
    } catch (error) {
    }
  };
};

export const resetMerchantBranchCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_MERCHANT_BRANCH_SETUP });
  };
};

export const createMerchantBranchData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.ValyouURL + ValyouEndPoints.createMerchantBranch;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_MERCHANT_BRANCH_SETUP, data: response });
        if (response.data) {
          window.history.back()
        }
      }
    } catch (error) {
    }
  };
};

export const resetMerchantBranchUpdateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_MERCHANT_BRANCH_SETUP });
  };
};

export const updateMerchantBranchData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.ValyouURL + ValyouEndPoints.updateMerchantBranch;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_MERCHANT_BRANCH_SETUP, data: response });
        if (response.data) {
          window.history.back()
        }
      }
    } catch (error) {
    }
  };
};

export const resetMerchantTellerCreateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CREATE_MERCHANT_TELLER_SETUP });
  };
};

export const createMerchantTellerData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.ValyouURL + ValyouEndPoints.createMerchantTeller;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: CREATE_MERCHANT_TELLER_SETUP, data: response });
        if (response.data) {
          window.history.back()
        }
      }
    } catch (error) {
    }
  };
};

export const resetMerchantTellerUpdateMessage = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_UPDATE_MERCHANT_TELLER_SETUP });
  };
};

export const updateMerchantTellerData = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const apiURL = Constants.ValyouURL + ValyouEndPoints.updateMerchantTeller;
      const response = await axios.post(apiURL, data).then((response) => {
        if (response) {
          return response.data;
        } else {
          return false;
        }
      });
      if (response) {
        dispatch({ type: UPDATE_MERCHANT_TELLER_SETUP, data: response });
        if (response.data) {
          window.history.back()
        }
      }
    } catch (error) {
    }
  };
};
