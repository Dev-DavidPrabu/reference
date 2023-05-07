export interface UserData {
  userId(
    userId: any
  ): (
    dispatch: import("redux").Dispatch<import("redux").AnyAction>
  ) => Promise<void>;
  id: string;
  entityId: string;
  fullName: string;
  mobileNumber: string;
  status: string;
  userType: string;
  loginId: string;
  countryCode: string;
}
export interface UserSearchData {
  userName: string;
  status: string;
  mobileNumber: string;
  fullName: string;
  emailId: string;
}
export interface userDeatailsInfo {
  "id":string,
  "entityId": string,
  "countryCode":string,
  "userName": string,
  "status": string,
  "emailId": string,
  "loginId": string,
  "mobileNumber": string,
  "userType": string
}
