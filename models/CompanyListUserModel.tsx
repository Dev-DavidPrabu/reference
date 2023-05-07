export interface CompanyListInfo {
  UserType: string;
  id: string;
  status: string;
  userGroupName: string;
  userId: string;
  userName: string;
  loginId: string;
  userRightId?: string;
  comment?: string;
}

export interface UserCompanyInformation {
  userId: string;
  companyId: string;
  companyAccountId: string;
  companyRegistrationNo: string;
  companyName: string;
  mtaFlag: string;
}
