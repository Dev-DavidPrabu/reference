export interface NotificationModel {
  notificationId: string;
  description: string;
  moduleDepedency: number;
  parameters: string;
  id: string;
  enabled: string;
}
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'dropdown' | 'text';
  record: NotificationModel;
  index: number;
  children: React.ReactNode;
}
