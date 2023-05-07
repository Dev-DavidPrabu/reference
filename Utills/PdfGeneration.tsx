import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const PdfGeneration = (dataArray: any, fileName: string) => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setTextColor('red');
  pdf.text([`Merchant Trade Asia ${fileName}`], 200, 10, {
    baseline: 'middle',
  });
  dataArray = dataArray?.map((row: any) => {
    delete row.manage;
    if (row.customerWalletDto) {
      delete row.customerWalletDto;
    }
    return row;
  });
  let keyName = 'Nationality';
  dataArray = dataArray.map((row: any) => {
    Object.keys(row).forEach((item) => {
      if (item === 'nationalityCodeDescription') {
        delete Object.assign(row, { [keyName]: row[item] })[item];
      }
    });
    return row;
  });
  const head = [Object.keys(dataArray[0] || '')];

  const updatedHead = head[0]?.map((data: any) => {
    let modify = data.toString().charAt().toUpperCase() + data.slice(1);
    return modify.replace(/([A-Z])/g, ' $1').trim();
  });

  let emparray: string[][] = [];
  let oldCheck;
  dataArray?.forEach((element: any) => {
    var values = Object.keys(element).map(function (key) {
      return element[key];
    });

    oldCheck = values.filter((val) => typeof val === 'string' && val);
    emparray.push(values);
  });

  var data = emparray;
  for (var i = 0; i < updatedHead[0].length; i++) {
    if (updatedHead[0][i].includes(',')) {
      var value = updatedHead[0][i].split(',');
      updatedHead[0][i] = value[1];
    }
  }
  function hasWhiteSpace(s: any) {
    return /\s/g.test(s);
  }

  function titleCase(str: any) {
    if (hasWhiteSpace(str)) {
      var splitStr = str?.toLowerCase()?.split(' ');
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
          splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    } else {
      let modifystr = str?.toString().toLowerCase();
      let updatedstr = modifystr?.charAt(0).toUpperCase() + modifystr?.slice(1);
      return updatedstr;
    }
  }

  let newarr = data.map((res) => res.map((uparr) => titleCase(uparr)));

  autoTable(pdf, {
    head: [updatedHead],
    body: newarr,
    margin: { right: 5, left: 5 },
    tableWidth: 585,
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' },
      7: { cellWidth: 'auto' },
      8: { cellWidth: 'auto' },
      9: { cellWidth: 'auto' },
      10: { cellWidth: 'auto' },
      11: { cellWidth: 'auto' },
    },
    didDrawPage: function (data) {
      var date = new Date().toLocaleString();
      pdf.setFontSize(10);
      var pageSize = pdf.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      pdf.text(date, data.settings.margin.left, pageHeight - 10);
    },
  });

  pdf.save(fileName);
};
