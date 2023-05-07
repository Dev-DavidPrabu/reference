export interface RemitCountrySetupInfo {
    
    "id": string,
    "countryCode":string,
    "description": string,
    "notes": string,
    "maxTransactionValue": string,
  }
  export interface countryDetailModal {
    userType: string;
    id: string,
    countryCode?: string,
    notes: string,
    paymentMethodCode: string,
    description: string,
    maxTransactionValue: string,
    statusCode:string
}
export interface addPayoutCountryData {
  showAddPayoutCountry: string
  userType: string
  submitHandler: (value: any) => void

}