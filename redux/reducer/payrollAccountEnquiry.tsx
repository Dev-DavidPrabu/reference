import { GET_ALL_PAYROLLACCOUNTENQUIRY } from "../action/payrollAccountEnquiry";



const initialState = {
    getPayrollAccountEnquiryResponse: [],
   
}


const  payrollAccountEnquiryReducer = (state = initialState, action: { type: string; data: any; }) => {
    switch (action.type) {
        case GET_ALL_PAYROLLACCOUNTENQUIRY:
            return { ...state, getPayrollAccountEnquiryResponse: action.data };
        default:
            return state;
    }
}
export default payrollAccountEnquiryReducer;