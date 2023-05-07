import { CARD_BLOCK_DOWNLOAD_EXCEL, CARD_BLOCK_DOWNLOAD_PDF, GET_CARDBLOCK_REPORTS, RESET_CARD_BLOCK_REPORTS, RESET_CARD_BLOCK_REPORTS_EXCEL, RESET_CARD_BLOCK_REPORTS_PDF } from "../action/CardBlockReportsAction";



  const initialState = {
    getcardBlockReportsResponse:[],
    getcardBlockReportPdfResponse:undefined,
    getcardBlockReportExcelResponse:undefined,
}

  
  const CardBlockReportsReducer = (state = initialState, action: { type: string; data: any }) => {
    switch (action.type) {
      case GET_CARDBLOCK_REPORTS:
        return { ...state, getcardBlockReportsResponse: action.data };
        case CARD_BLOCK_DOWNLOAD_PDF:
            return { ...state, getcardBlockReportPdfResponse: action.data };
            case CARD_BLOCK_DOWNLOAD_EXCEL :
              return{...state,getcardBlockReportExcelResponse:action.data};
            case RESET_CARD_BLOCK_REPORTS:
        return { ...state, getcardBlockReportsResponse: []};
        case RESET_CARD_BLOCK_REPORTS_PDF:
            return { ...state,getcardBlockReportPdfResponse:undefined};
            case RESET_CARD_BLOCK_REPORTS_EXCEL:
              return{...state,getcardBlockReportExcelResponse:undefined}
      default:
        return state;
    }
  };
  export default CardBlockReportsReducer;