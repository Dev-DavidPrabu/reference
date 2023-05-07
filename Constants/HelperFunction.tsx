import React from 'react';

export const filterTableData = (header: any, data: any) => {
  let newArray: any = [];
  data?.filter((item: any) => {
    let obj: any = {};
    header.map((col: any) => {
      if (col.dataIndex === 'Authorisation') {
        let finalLevels = '';
        if (item['approvalLevel1']) {
          finalLevels = finalLevels + 'L1';
        }
        if (item['approvalLevel2']) {
          finalLevels = finalLevels + (finalLevels.length > 0 ? ', L2' : 'L2');
        }
        if (item['approvalLevel3']) {
          finalLevels = finalLevels + (finalLevels.length > 0 ? ', L3' : 'L3');
        }
        obj[col.dataIndex] = finalLevels;
      } else if (col.dataIndex === 'Operations') {
        let finalOperations = '';
        if (item['add']) {
          finalOperations = finalOperations + 'add';
        }
        if (item['edit']) {
          finalOperations =
            finalOperations + (finalOperations.length > 0 ? ', edit' : 'edit');
        }
        if (item['delete']) {
          finalOperations =
            finalOperations +
            (finalOperations.length > 0 ? ', delete' : 'delete');
        }
        obj[col.dataIndex] = finalOperations;
      } else {
        if (Array.isArray(col.dataIndex)) {
          obj[col.dataIndex[1]] = item[col.dataIndex[0]][col.dataIndex[1]];
        } else {
          obj[col.dataIndex] = String(item[col.dataIndex]);
        }
      }
    });
    newArray.push(obj);
  });
  return newArray;
};
