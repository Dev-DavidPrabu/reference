import { GET_ALL_PAYROLLTRANSACTIONENQUIRY } from "../action/payrollTransactionEnquiry";



const initialState = {
    getPayrollTransactionEnquiryResponse: [],
   
}


const  payrollTransactionEnquiryReducer = (state = initialState, action: { type: string; data: any; }) => {
    switch (action.type) {
        case GET_ALL_PAYROLLTRANSACTIONENQUIRY:
            return { ...state, getPayrollTransactionEnquiryResponse: action.data };
        default:
            return state;
    }
}
export default payrollTransactionEnquiryReducer;