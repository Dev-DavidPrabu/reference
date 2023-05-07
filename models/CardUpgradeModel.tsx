export interface CardUpGradeModel {
    customerName:string,
    primaryMobileNumber:string,
    panLastFourdigits:string,
    cardExpiryDate:string,
    reasonStatus:string,
    requestChannel:string,
    makerName:string,
    approverId:string,
    existingWalletName: string,
    requestedWalletName: string,
    upgradeWalletName: string,
    eligibleWalletName:string,
    key: string;
    id: string;
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