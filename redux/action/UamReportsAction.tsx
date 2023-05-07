import { Constants, ApiEndPoints } from "../../Constants/Constants";
import { Dispatch } from "redux";
import axios from "axios";


export const GET_UAM_REPORTS = "GET_UAM_REPORTS"
export const GET_UAM_DOWNLOAD_REPORTS_PDF = "GET_UAM_DOWNLOAD_REPORTS_PDF"
export const GET_UAM_DOWNLOAD_REPORTS_EXCEL = "GET_UAM_DOWNLOAD_REPORTS_EXCEL"
export const RESET_UAM_REPORTS="RESET_UAM_REPORTS"
export const RESET_UAM_DOWNLOAD_REPORTS_PDF ="RESET_UAM_DOWNLOAD_REPORTS_PDF"
export const RESET_UAM_DOWNLOAD_REPORTS_EXCEL ="RESET_UAM_DOWNLOAD_REPORTS_EXCEL"



export const getUamReports = (filterValue: any) => {

    return async (dispatch: Dispatch) => {
        let mobileno = filterValue.mobileNumber ? `&mobileNumber=${filterValue.mobileNumber}` : `${""}`;
        let startDate = filterValue.fromDate ? `&fromDate=${filterValue.fromDate}` : `${""}`;
        let endDate = filterValue.toDate ? `&toDate=${filterValue.toDate}` : `${""}`;
        let userType = filterValue.userType ? `&userType=${filterValue.userType}` : `${""}`;
        let status = filterValue?.Status
        const apiURL = Constants.BaseURL + ApiEndPoints.UamUserReports + `?status=${status}` + mobileno + startDate + endDate + userType
        try {
            const UamReportsData = await axios.get(apiURL).then((response) => {
                if (response) {

                    return response
                }
                else {
                    return false
                }
            })
            if (UamReportsData) {
              
                dispatch({ type: GET_UAM_REPORTS, data: UamReportsData.data })
            }
        }
        catch (err) {
        }
    }
}

export const getUamDownloadReports = (filterValue: any, fileType: any) => {
    return async (dispatch: Dispatch) => {
        let mobileno = filterValue.mobileNumber ? `&mobileNumber=${filterValue.inputCode+filterValue.mobileNumber}` : `${""}`;
        let startDate = filterValue.fromDate ? `&fromDate=${filterValue.fromDate}` : `${""}`;
        let endDate = filterValue.todate ? `&toDate=${filterValue.todate}` : `${""}`;
        let userType = filterValue.userType ? `&userType=${filterValue.userType}` : `${""}`;
        let status = filterValue?.Status

        const apiURL = Constants.BaseURL + ApiEndPoints.UamDownlaodReports + `?status=${status}&fileType=${fileType}` + mobileno + startDate + endDate + userType
        try {
            const UamDownloadsReport = await axios.get(apiURL).then((response) => {
                if (response) {
                   
                    return response
                }
                else {
                    return false
                }
            })
            if (UamDownloadsReport) {
                if(fileType === "pdf"){
                    dispatch({ type: GET_UAM_DOWNLOAD_REPORTS_PDF, data: UamDownloadsReport.data })
            }
            else{
                dispatch({ type: GET_UAM_DOWNLOAD_REPORTS_EXCEL, data: UamDownloadsReport.data })

            }
        }
     } catch (error) {
        }
    }
}

export const resetUamReports = () => {
    return async (dispatch: Dispatch) => {
      dispatch({ type: RESET_UAM_REPORTS });
    }
  }


  export const resetUamDownlaodPdf = () => {
    return async (dispatch: Dispatch) => {
      dispatch({ type: RESET_UAM_DOWNLOAD_REPORTS_PDF });
    }
  }
  export const resetUamDownlaodExcel = () => {
    return async (dispatch: Dispatch) => {
      dispatch({ type: RESET_UAM_DOWNLOAD_REPORTS_EXCEL });
    }
  }
