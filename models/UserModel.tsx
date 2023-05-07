
export interface userModel{
countryCode: string
emailId: string
entityId: string
id: string
loginId: string
mobileNumber: string
status: string
userName: string
userType: string
comment?:string
}

export interface addUser {
    showAddUser: boolean
    userType: string
    submitHandler: (value:boolean)=>void 
    userDetail: userModel
     
}