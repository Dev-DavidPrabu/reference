export interface userRights {
  UserType: string;
    id: string;
    status: string
userGroupName: string
userId: string
userName: string
loginId:string
userRightId?:string
comment?:string
}
export interface branchList{
  agentGroupCode:string;
  branchName:string;
  branchAddress:string;
  latitude:string
  openingTime:string;
  branchCode:string;
  branchMobileNumber:string;
  longitude:string;
  closingTime:string;
  mid:string;
  isMMOutlet:Boolean;
}
export interface addUserData {
    userTypeUser: string;
    showAddUser: boolean
    userType: string
    submitHandler: (value:string)=>void 
    userDetail: userRights
     
}


export interface searchOption{
    status: string
    userGroupName: string
    userId: string
    userName: string
}
export interface userRightsInfo {
    "id":string,
    "entityId": string,
    "countryCode":string,
    "userGroupName":string,
    "userName": string,
    "status": string,
    "emailId": string,
    "loginId": string,
    "mobileNumber": string,
    "userType": string
  }