export interface PayrollTransactionEnquiryModel{
    transactionStartDate:string,
    transactionEndDate:string,
    fieldName1:string,
    value1:string,
    condition1:string,
    fieldName2:string,
    value2:string,
    condition2:string,
    condition3:string,
    userId:string
}

export interface PayrollAccountEnquiryModel{
    fieldName1: string,
    condition1: string,
    value1:string,
    fieldName2: string,
    condition2: string,
    value2: string,
    condition3: string,
}

export interface PayrollAccountViewprops{
    id: string, 
    accountId: string,
    showAccountEnquiry():void
}