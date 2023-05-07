import axios from "axios";
import { Dispatch } from "redux";
import { ApiEndPoints, Constants } from "../../Constants/Constants";

export const GET_WALLETDOWNGRADE_REPORT = "GET_WALLETDOWNGRADE_REPORT";
export const GET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD = "GET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD";
export const GET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD = "GET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD";
export const RESET_WALLETDOWNGRADE_REPORT ="RESET_WALLETDOWNGRADE_REPORT";
export const RESET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD = "RESET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD";
export const RESET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD ="RESET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD";

export const WalletDowngradeReports = (filterValue: any) => {
    return async (dispatch: Dispatch) => {
      let apiURL =
        Constants.BaseURL + ApiEndPoints.WalletDowngradeReport + "?";
        let fromDate = filterValue.fromDate ? `fromDate=${filterValue.fromDate}`:`${""}`;
        let toDate = filterValue.toDate ? `toDate=${filterValue.toDate}`:`${""}`;
        let downgradeTimestamp = filterValue.downgradeTimestamp ? `downgradeTimestamp=${filterValue.downgradeTimestamp}`:`${""}`;
        let kycExpiryDate = filterValue.kycExpiryDate ? `kycExpiryDate=${filterValue.kycExpiryDate}` : `${""}`;
        let docExpiryDate = filterValue.docExpiryDate ? `docExpiryDate=${filterValue.docExpiryDate}` : `${""}`;
        let customerName = filterValue.customerName ? `customerName=${filterValue.customerName}` : `${""}`;
        let mobileNumber = filterValue.mobileNumber ? `mobileNumber=${filterValue.mobileNumber}` : `${""}`;
        let idNumber = filterValue.idNumber ? `idNumber=${filterValue.idNumber}` : `${""}`;

        const params = {
            fromDate,
            toDate,
            downgradeTimestamp,
            kycExpiryDate,
            docExpiryDate,
            customerName,
            mobileNumber,
            idNumber

        };
        const constructUrl = (params: any) => {
            let paramsKeys = Object.values(params);
      
            for (let paramKey of paramsKeys) {
              apiURL = `${apiURL}${paramKey !== "" ? "&" : ""}${paramKey}`;
            }
      
            return apiURL;
          };
          try {
            const getWalletDowngradeReports = await axios
              .get(constructUrl(params))
              .then((response) => {
                if (response) {
                  return response;
                } else {
                  return false;
                }
              });
            if (getWalletDowngradeReports) {
              dispatch({
                type: GET_WALLETDOWNGRADE_REPORT,
                data: getWalletDowngradeReports?.data,
              });
            }
          } catch (error) {}
        };
      };

      export const WalletDowngradeReportsDownload = (
        filterValue: any,
        fileType: any
      ) => {
        return async (dispatch: Dispatch) => {
            let fromDate = filterValue.fromDate ? `&fromDate=${filterValue.fromDate}`:`${""}`;
            let toDate = filterValue.toDate ? `&toDate=${filterValue.toDate}`:`${""}`;
            let downgradeTimestamp = filterValue.downgradeTimestamp ? `&downgradeTimestamp=${filterValue.downgradeTimestamp}`:`${""}`;
            let kycExpiryDate = filterValue.kycExpiryDate ? `&kycExpiryDate=${filterValue.kycExpiryDate}` : `${""}`;
            let docExpiryDate = filterValue.docExpiryDate ? `&docExpiryDate=${filterValue.docExpiryDate}` : `${""}`;
            let customerName = filterValue.customerName ? `&customerName=${filterValue.customerName}` : `${""}`;
            let mobileNumber = filterValue.mobileNumber ? `&mobileNumber=${filterValue.mobileNumber}` : `${""}`;
            let idNumber = filterValue.idNumber ? `&idNumber=${filterValue.idNumber}` : `${""}`;
    
            const apiURL =
            Constants.BaseURL +
            ApiEndPoints.WalletDowngradeReportDownload +
            `?fileType=${fileType}` +
            fromDate+
            toDate+
            downgradeTimestamp+
            kycExpiryDate+
            docExpiryDate+
            customerName+
            mobileNumber+
            idNumber
            try {
                const WalletDowngradeReportDownloadRes = await axios
                  .get(apiURL)
                  .then((response) => {
                    if (response) {
                      return response;
                    } else {
                      return false;
                    }
                  });
                if (WalletDowngradeReportDownloadRes) {
                  if (fileType === "pdf") {
                    dispatch({
                      type: GET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD,
                      data: WalletDowngradeReportDownloadRes?.data,
                    });
                  } else {
                    dispatch({
                      type: GET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD,
                      data: WalletDowngradeReportDownloadRes?.data,
                    });
                  }
                }
              } catch (error) {}
            };
          };
          export const resetWalletDowngradeReport = () => {
            return async (dispatch: Dispatch) => {
              dispatch({ type: RESET_WALLETDOWNGRADE_REPORT });
            };
          };
          
          export const resetWalletDowngradeReportPdfDownload = () => {
            return async (dispatch: Dispatch) => {
              dispatch({ type: RESET_WALLETDOWNGRADE_REPORT_PDF_DOWNLOAD });
            };
          };
          
          export const resetWalletDowngradeReportExcelDownload = () => {
            return async (dispatch: Dispatch) => {
              dispatch({ type: RESET_WALLETDOWNGRADE_REPORT_EXCEL_DOWNLOAD });
            };
          };