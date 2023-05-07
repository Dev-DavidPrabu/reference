export interface UserGroup {
  countryCode: string
emailId: string
entityId: string
id: string
loginId: string
mobileNumber: string
status:string
userName: string
userType: string
}
export interface addGroup {
  showAddUser: boolean
  userType: string
  submitHandler: (value:boolean)=>void 
  userDetail: UserGroup
   
}
export interface userGroupInfo {
  "id":string,
  "entityId": string,
  "countryCode":string,
  "userGroupName": string,
  "status": string,
  "emailId": string,
  "loginId": string,
  "mobileNumber": string,
  "userType": string
}
