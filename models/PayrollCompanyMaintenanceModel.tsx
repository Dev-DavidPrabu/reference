export interface PayrollCompanyMaintenanceObject {
  companyName: string;
  companyRegistrationNo: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  companyEmail: string;
  companyCode: string,
  companyPhoneNo: string;
  authorizerName: string;
  authorizerMobileNo: number;
  statusCode: string;
  remarks: string;
  id: string;
  functionCode:string;
}

export interface payrollCompanyMaintenanceProps {
  cancelMethod(): void;
  onClickEvents: string;
  optionalIcons: string;
  companyDataView: number | any;
  showCompanyMaintenance(): void;
  postalCode: Array<Object>;
  countryData: Array<Object>;
  location:any;
  history:any;
}

export interface detailsObject {
  CITY: string;
  STATE: string;
}

export interface postalCodeObject {
  categoryCode: string;
  code: string;
  description: string;
  details: detailsObject;
}
