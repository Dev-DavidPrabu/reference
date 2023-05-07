export interface BlockCardInfo {
  walletId: string;
  customerName: string;
  primaryMobileNumber: string;
  panLastFourdigits: string;
  cardExpiryDate: string;
  reasonCode:string;
  reasonStatus:string;
  requestChannel: string;
  createdBy: string;
  approver_id: string;
  customerId:string;
  accountingErrorMsg:string;
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
