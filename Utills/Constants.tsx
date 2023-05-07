export class Constants {
  static idTypeRoutingColumns = [
    'Country',
    'Description',
    'Id Type',
    'Routing Channel',
    'Status',
    'Action',
  ];
  static idTypeRoutingFields = [
    { label: 'Country', value: 'countryCode' },
    { label: 'Description', value: 'countryDescription' },
    { label: 'Id Type', value: 'idType' },
    { label: 'Routing Channel', value: 'routingChannel' },
    { label: 'Status', value: 'status' },
  ];
  static salaryPaymentColumns = [
    { label: 'Batch Date', title: 'Batch Date', value: 'Batch_Date' },
    { label: 'Batch Ref.No', title: 'Batch Ref.No', value: 'Batch_Ref' },
    {
      label: 'Batch Transaction Reference',
      title: 'Batch Transaction Reference',
      value: 'Batch_Transaction_Reference',
    },
    { label: 'No of Entries', title: 'No of Entries', value: 'No_Of_Entries' },
    { label: 'Total Credit Amount', title: 'Total Credit Amount', value: 'Total_Credit_Amount' },
    { label: 'Batch Status', title: 'Batch Status', value: 'Batch_Status' },
  ];
  static salaryUploadColumns = [
    { label: 'Row In File', value: 'Row In File' },
    { label: 'Employee ID', value: 'Batch Ref.No' },
    { label: 'Mobile No', value: 'Batch Transaction Reference' },
    { label: 'Employee Name', value: 'No of Entries' },
    { label: 'Amount to credit', value: 'Total Credit Amount' },
    { label: 'Transaction Status', value: 'Batch Status' },
    { label: 'Error', value: 'Batch Status' },
  ];
  static salarayValue = [
    {
      Batch_Date: '12-05-2021',
      Batch_Ref: '1205',
      Batch_Transaction_Reference: 'Payroll for month of May 2021',
      No_Of_Entries: '250',
      Total_Credit_Amount: 'MYR 283,880',
      Batch_Status: 'Created',
    },
  ];
}
