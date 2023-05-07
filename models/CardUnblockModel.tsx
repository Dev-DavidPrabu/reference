export interface CardUnblockModel {
    customerName:string,
    primaryMobileNumber:string,
    panLastFourdigits:string,
    cardExpiryDate:string,
    reasonStatus:string,
    requestChannel:string,
    createdBy:string,
    approverId:string,
    accountingErrorMsg: string
}
export interface Item {
    customerId: React.Key;
    key: string;
    id: string;
    description: string;
    module: string;
    parameter: string;
    flag: string;
    code: string;
  }