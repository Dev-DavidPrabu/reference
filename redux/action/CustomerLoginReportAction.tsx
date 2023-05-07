import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const CUSTOMER_LOGIN_REPORT = "CUSTOMER_LOGIN_REPORT";
export const CUSTOMER_LOGIN_REPORT_DOWNLOAD_PDF =
  "CUSTOMER_LOGIN_REPORT_DOWNLOAD_PDF";
export const CUSTOMER_LOGIN_REPORT_DOWNLOAD_EXCEL =
  "CUSTOMER_LOGIN_REPORT_DOWNLOAD_EXCEL";
export const RESET_CUSTOMER_LOGIN_REPORT = "RESET_CUSTOMER_LOGIN_REPORT";
export const RESET_CUSTOMER_REPORT_DOWNLOAD_PDF =
  "RESET_CUSTOMER_REPORT_DOWNLOAD_PDF";
export const RESET_CUSTOMER_REPORT_DOWNLOAD_EXCEL =
  "RESET_CUSTOMER_REPORT_DOWNLOAD_EXCEL";

export const customerLoginReport = (filterValue: any) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `?fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.customerLoginReports +
      startDate +
      endDate +
      mobileNo;
    try {
      const getCustomerLoginResponse = await axios
        .get(apiURL)
        .then((response) => {
          if (response) {
            return response;
          } else {
            return false;
          }
        });
      if (getCustomerLoginResponse) {
        dispatch({
          type: CUSTOMER_LOGIN_REPORT,
          data: getCustomerLoginResponse.data,
        });
      }
    } catch (error) {}
  };
};

export const CustomerLoginReportDownload = (
  filterValue: any,
  fileType: any
) => {
  return async (dispatch: Dispatch) => {
    let mobileNo = filterValue.mobileNumber
      ? `&mobileNumber=${filterValue.mobileNumber}`
      : `${""}`;
    let startDate = filterValue.startDate
      ? `&fromDate=${filterValue.startDate}`
      : `${""}`;
    let endDate = filterValue.endDate
      ? `&toDate=${filterValue.endDate}`
      : `${""}`;

    const apiURL =
      Constants.BaseURL +
      ApiEndPoints.customerLoginDownloadReport +
      `?fileType=${fileType}` +
      mobileNo +
      startDate +
      endDate;
    try {
      const getDownloadResponse = await axios.get(apiURL).then((response) => {
        if (response) {
          return response;
        } else {
          return false;
        }
      });
      if (getDownloadResponse) {
        if (fileType === "pdf") {
          dispatch({
            type: CUSTOMER_LOGIN_REPORT_DOWNLOAD_PDF,
            data: getDownloadResponse?.data,
          });
        } else {
          dispatch({
            type: CUSTOMER_LOGIN_REPORT_DOWNLOAD_EXCEL,
            data: getDownloadResponse?.data,
          });
        }
      }
    } catch (error) {}
  };
};
export const resetCustomerReport = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_LOGIN_REPORT });
  };
};
export const resetCustomerDownlaodPdf = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_REPORT_DOWNLOAD_PDF });
  };
};

export const resetCustomerDownlaodExcel = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_CUSTOMER_REPORT_DOWNLOAD_EXCEL });
  };
};
