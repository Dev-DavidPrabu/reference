export interface MetaData {
  data: DataArray[];
}

export interface DataArray {
  categoryCode: string;
  metadata: Fields;
}
export interface SelectOptionCategory {
  value: string;
  label: string;
}
export interface Fields {
  [key: string]: string | number | any;
}
export interface CustomValues {
  [key: string]: string;
}

export interface ReferenceDataModel {
  data: ReferenceData[];
}
export interface ReferenceData {
  code: string;
  description: string;
  [key: string]: string;
}
