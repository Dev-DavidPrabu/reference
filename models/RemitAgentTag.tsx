export interface Item {
    key: string;
    id: string;
    description: string;
    module: string;
    parameter: string;
    flag: string;
    code: string;
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