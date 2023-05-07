export interface transactionProcessingInfo {
  transactionDate:string,
  transactionReference:string,
  transactionAmount:string,
  receiverFirstName:string,
  senderCurrencyCode:string,
  paymentMethodDescription:string,
  receiverCountryDescription:string,
  isOnBehalfSender:string,
  transactionStatusCode:string,
  remitanceSystemStatus:string,
  isRefund:string,
  ecdd:string,
  mirsNo:string,
  senderName:string,
  onBehalfSenderName:string
  }
  export interface Item {
    transactionId: React.Key;
    key: string;
    id: string;
    description: string;
    module: string;
    parameter: string;
    flag: string;
    code: string;
  }
  