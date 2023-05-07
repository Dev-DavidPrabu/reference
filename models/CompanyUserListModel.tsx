export interface CompanyUserListModel {
    BackButtonClickEvent(): void;
    companyId: CompanyData;
  }
  
  export interface CompanyData {
    id: string;
    companyAccountId: string;
    companyName: string;
    companyRegistrationNo: string;
    entityId: string;
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    companyEmail: string;
    countryCodeNo: string;
    companyPhoneNo: string;
    authorizerName: string;
    authorizerMobileNo: string;
    statusCode: string;
    remarks: string;
  }


export interface userInformation {
  userId: string;
  companyId: string;
  companyAccountId: string;
  companyRegistrationNo: string;
  companyName: string;
  mtaFlag: string;

}


export interface AddNewUserModelProps{
  deleteUserHandleClickEvent(userId: string): void;
  addNewUserHander: (e: any) => void
  cancelHandler():void;
  companyInformation:CompanyData;
  userInfo:userInformation;
  companyUserMethod:string;

}



