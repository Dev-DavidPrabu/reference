import Excel from "exceljs";
import { saveAs } from "file-saver";
import { filterTableData } from "../Constants/HelperFunction";

const workbook = new Excel.Workbook();
const workBookName = "MyWorkBook";
const workSheetName = "Worksheet-1";

export const ExcelGeneration = async (
  dataArray: any,
  columns: any,
  fileName: string
) => {
  function hasWhiteSpace(s: any) {
    return /\s/g.test(s);
  }

  function titleCase(str: any) {
    if (hasWhiteSpace(str)) {
      var splitStr = str.toLowerCase().split(" ");
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(" ");
    } else {
      if (str !== undefined) {
        let modifystr = str?.toString().toLowerCase();
        let updatedstr = modifystr?.charAt(0).toUpperCase() + modifystr?.slice(1);
        return updatedstr;
      }
    }
  }
  try {
    let newdata = filterTableData(columns, dataArray);
    let data = newdata.map((res: any) => {
      Object.keys(res).forEach((item) => {
        if(typeof(res[item])!=='string'){
          delete res[item]
        }

        return (res[item] = titleCase(res[item]));
      });
      return res;
    });
    let keyName="Nationality"

    data = data.map((row: any) => {

      //this Method is for remove the undefined and rename to nationality
      Object.keys(row).forEach((item) => {

        if(row[item]==undefined){
          delete row[item];
        }
        if(item==="nationalityCodeDescription"){
         delete Object.assign(row, {[keyName]: row[item] })[item];
     }
      });
      delete row.manage;

      return row
    });


    const file_Name = fileName || workBookName;
    const worksheet = workbook.addWorksheet(workSheetName);

    worksheet.columns = columns;
    worksheet.getRow(1).font = { bold: true };
    worksheet.columns.forEach((column) => {

      column.alignment = { horizontal: "center" };
    });
    worksheet.getRow(1).font = { name: "Arial", size: 15, bold: true };

    data?.forEach((element: any) => {
      let cellDataarray:
        | Partial<Excel.Column>[]
        | { header: any; key: any; width: number }[] = [];
      Object.keys(element).forEach((e: any) => {
        function capitalizeFirstLetter(string: any) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        var newString = e.replace(/([A-Z])/g, " $1").trim();
        let cellData = {
          header: capitalizeFirstLetter(newString),
          key: e,
          width: 25,
        };
        cellDataarray.push(cellData);
      });

      worksheet.headerFooter.differentFirst = true;
      worksheet.headerFooter.firstHeader =
        "&B&U&13&KFF0000Merchant Trade Asia \n&10" + fileName;
      worksheet.headerFooter.firstFooter = "&B&10&KFF0000Date &D &T";
      worksheet.headerFooter.evenHeader = "&B&U&13&KFF0000Merchant Trade Asia";
      worksheet.headerFooter.evenFooter = "&B&10&KFF0000Date &D &T";
      worksheet.headerFooter.oddFooter = "&B&10&KFF0000Date &D &T";
      worksheet.headerFooter.oddHeader = "&B&U&13&KFF0000Merchant Trade Asia";
      worksheet.columns = cellDataarray;
      worksheet.addRow(element);
    });
    const buf = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buf]), `${file_Name}.xlsx`);
  } finally {
    workbook.removeWorksheet(workSheetName);
  }
};
