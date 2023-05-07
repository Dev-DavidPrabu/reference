import { GET_LIMIT_TRANSACTION_LIST, UPDATE_LIMIT_TRANSACTION_LIST } from "../action/RemitTransactionLimitAction";

const initialState = {
    getTransferLimitResponse:[],
    updateTransferLimitResponse:[]
};

const RemitTransactionLimitReducer = (state = initialState, action: { type: string; data: any }
) => {
    switch (action.type) {

        case GET_LIMIT_TRANSACTION_LIST:
            return { ...state, getTransferLimitResponse: action.data };
        case UPDATE_LIMIT_TRANSACTION_LIST:
            return { ...state,updateTransferLimitResponse: action.data}    
        default:
            return state;
    }
};
export default RemitTransactionLimitReducer;