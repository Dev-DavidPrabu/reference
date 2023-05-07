export interface Item {
    key: string;
    id:string
    complianceType: string,
    amlListCategory: string,
    nameMatchPercentage: string,
    overallMatchPercentage: string,
  }
  export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType:  'dropdown' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
  }
  export interface AMLInfo {
    "complianceType": string,
    "amlListCategory": string,
    "nameMatchPercentage": string,
    "overallMatchPercentage": string,
  }
