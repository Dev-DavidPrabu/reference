export interface CardReplacementInfo {
    walletId: string;
    customerName: string;
    mobileNo: string;
    cardId: string;
    cardExpirydate: string;
    requestReasoncode:string;
    requeststatus:string;
    requestChannel: string;
    inputOperatorId: string;
    approverId: string;
  }
  export interface Item {
      walletId: React.Key;
    key: string;
    id: string;
    description: string;
    module: string;
    parameter: string;
    flag: string;
    code: string;
  }