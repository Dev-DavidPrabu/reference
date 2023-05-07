export interface companyUser {
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
  export interface addCompanyData {
      userTypeUser: string;
      showAddUser: boolean
      userType: string
      submitHandler: (value:string)=>void 
      companyUserDetail: companyUser
       
  }
  