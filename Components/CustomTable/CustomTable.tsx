import { ConfigProvider, Empty, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { BsEye } from 'react-icons/bs';
import CustomPagination from '../Pagination/CustomPagination';
import CustomRowSelection from '../RowSelection/CustomRowSelection';
import './CustomTable.scss';
import { IoMdLock } from 'react-icons/io';
import { HiDocumentText } from 'react-icons/hi';
import { ImUserCheck } from 'react-icons/im';
import {
  MdMobileOff,
  MdOutlineDevicesOther,
  MdOutlineLockOpen,
  MdRestore,
} from 'react-icons/md';
import { Label } from 'reactstrap';
function CustomHeader(props: any) {
  const [updatedHeader, setupdatedHeader] = useState([]);
  const [chunckLength, setChunkLength] = useState(props.LengthofCount || 7);
  const [recordsPerBatch, setrecordsPerBatch] = useState(
    props.LengthofCount || 7
  );
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [defaultBatch, setDefaultBatch] = useState(1);
  const [isPaginated, setIsPaginated] = useState(true);
  const [prevNextStatus, setPrevNextStatus] = useState(false);
  const { Text } = Typography;
  const handleDelete = (user: any) => {
    props.deleteUser(user);
  };
  const handleView = (user: any) => {
    props.viewUser(user);
  };
  const handleEdit = (user: any) => {
    props.editUser(user);
  };
  const handleDocument = (user: any) => {
    props.documentUser(user);
  };

  const handleUnlock = (record: any) => {
    props.unLockConfirm(record);
  };
  const handleDeviceUnlock = (record: any) => {
    props.unLockDevice(record);
  };

  function chunks(arr: any, chunkSize: any) {
    chunkSize = parseInt(chunkSize);
    const res = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  function batch(arr: any, chunkSize: number) {
    const res = arr / chunkSize;
    return res;
  }

  useEffect(() => {
    setDefaultIndex(0);
  }, [props.isFiltered]);

  useEffect(() => {
    if (props.DisablePagination) {
      setIsPaginated(false);
    }
  }, []);
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Data Found' />
    </div>
  );

  useEffect(() => {
    let updatedHeaders = props.TableData;

    const DeleteDataHeader = {
      title: 'Manage',
      dataIndex: 'manage',
      render: (_: any, record: any) => (
        <div className='d-flex'>
          <div className='d-flex  cursor justify-content-center'>
            {props.view && (
              <div
                className={
                  record?.status === 'INPROGRESS'
                    ? 'customtable-manage-view manageButtonView'
                    : 'disable-background ms-2 manageButtonView'
                }
                onClick={() => handleView(record)}
              >
                <BsEye className=' ' />
              </div>
            )}
            {props.user && (
              <div className='usercheck' onClick={() => handleView(record)}>
                <ImUserCheck />
              </div>
            )}
            {props.Edit && (
              <div
                className={`ms-2 manage-button disable-background cursor`}
                onClick={() => handleEdit(record)}
              >
                {props.viewIcon ? <AiOutlineEye /> : <FaRegEdit />}
              </div>
            )}
            {props.editToggle && (
              <div
                className={`ms-2 manage-button cursor disable-background`}
                onClick={() => handleEdit(record)}
              >
                <FaRegEdit />
              </div>
            )}
            {props.Delete && (
              <div
                className={`ms-2 manage-button cursor disable-background ${
                  props.DeleteOnStatus && record.status === 'INACTIVE'
                    ? 'd-none'
                    : ''
                }`}
                onClick={() => handleDelete(record)}
              >
                <AiOutlineDelete />
              </div>
            )}
            {props.Document && (
              <div
                className={`ms-2 manage-button cursor disable-background`}
                onClick={() => handleDocument(record)}
              >
                <HiDocumentText />
              </div>
            )}
            {props.lock && (
              <div
                className={`ms-2 manageButton cursor`}
                onClick={() => handleUnlock(record)}
              >
                <div className='d-flex justify-content-center mt-1'>
                  <IoMdLock />
                </div>
              </div>
            )}
            {props.unLock && (
              <div
                className={`ms-1 manageButton cursor`}
                onClick={() => handleUnlock(record)}
              >
                <div className='d-flex justify-content-center mt-1'>
                  <MdOutlineLockOpen />
                </div>
              </div>
            )}
            {props.mobile && (
              <div
                className={`ms-2 manageButton cursor`}
                onClick={() => handleUnlock(record)}
              >
                <div className='d-flex justify-content-center mt-1'>
                  <MdMobileOff />
                </div>
              </div>
            )}
            {props.device && (
              <div
                className={`ms-1 deviceButton cursor`}
                onClick={() => handleDeviceUnlock(record)}
              >
                <div className='d-flex justify-content-center mt-1'>
                  <MdOutlineDevicesOther />
                </div>
              </div>
            )}

            {props.refresh && (
              <div className={`ms-1 manageButtonUnlock cursor`}>
                <MdRestore />
              </div>
            )}
          </div>
        </div>
      ),
    };
    const Manage = updatedHeaders?.filter(
      (object: any) => object.dataIndex == 'manage'
    );
    if (props?.DisableMange) {
      if (props?.DefaultColumn) {
        updatedHeaders = updatedHeaders.filter((header: any) => header.checked);
      }
      setupdatedHeader(updatedHeaders);
    } else {
      if (props?.DefaultColumn) {
        updatedHeaders = updatedHeaders.filter((header: any) => header.checked);
        setupdatedHeader(updatedHeaders);
      } else if (props?.DefaultColumnWidth) {
        updatedHeaders = updatedHeaders.filter((header: any) => header.checked);
        updatedHeaders = updatedHeaders.concat(DeleteDataHeader);
        setupdatedHeader(updatedHeaders);
      } else if (Manage?.length == 0) {
        updatedHeaders.push(DeleteDataHeader);
        setupdatedHeader(updatedHeaders);
      } else {
        if (Manage?.length == 0) {
          updatedHeaders.push(DeleteDataHeader);
          setupdatedHeader(updatedHeaders);
        } else {
          setupdatedHeader(updatedHeaders);
        }
      }
    }
  }, [props.TableData]);
  const DisplayItem = (choosenLength: number) => {
    setChunkLength(choosenLength);
    setDefaultIndex(0);
  };

  const RecordsToBeFetched = (choosenLength: number) => {
    setrecordsPerBatch(choosenLength);
    props.RecordsPerPage(choosenLength);
  };

  let finalData = chunks(props?.CustomTableHeader || [], chunckLength);
  let finalBatch = Math.ceil(batch(props?.totalRecords || [], recordsPerBatch));
  const prevFunc = () => {
    defaultIndex === 0 ? setDefaultIndex(0) : setDefaultIndex(defaultIndex - 1);
  };
  const nextFunc = () => {
    if (finalData.length === defaultIndex + 1) {
      setDefaultIndex(defaultIndex);
    } else {
      setDefaultIndex(defaultIndex + 1);
    }
  };
  const prevBatch = () => {
    if (defaultBatch == 1) {
      props.prevBatch(defaultBatch, recordsPerBatch);
    } else {
      setDefaultBatch(defaultBatch - 1);
      props.prevBatch(defaultBatch - 1, recordsPerBatch);
    }
  };
  const nextBatch = () => {
    if (finalBatch < defaultBatch + 1) {
      props.nextBatch(defaultBatch, recordsPerBatch);
    } else {
      setDefaultBatch(defaultBatch + 1);
      props.nextBatch(defaultBatch + 1, recordsPerBatch);
    }
  };
  const selectedPage = (page: any) => {
    if (page) {
      setDefaultIndex(page - 1);
    }
  };
  const [tableWidth, setTableWidth] = useState(0);
  const ColumnWidth = (columns: any) => {
    const widthColumnCount = columns!?.filter(
      ({ width }: any) => !width
    ).length;
    return columns!?.map((column: any) => {
      if (column.width) {
        return column;
      }
      return {
        ...column,
        width: Math.floor(tableWidth / widthColumnCount),
      };
    });
  };

  useEffect(() => {
    if (props?.CustomTableHeader && recordsPerBatch) {
      if (props?.CustomTableHeader?.length < recordsPerBatch) {
        setPrevNextStatus(true);
      }
    }
  }, [finalData, recordsPerBatch]);

  return (
    <div className='dummy '>
      <ConfigProvider
        renderEmpty={props.checkLength === 0 ? customizeRenderEmpty : undefined}
      >
        <Table
          className={`Customheader ${
            props.EnableScroll
              ? props.EnableScrollMax
                ? 'ant-table-no-scroll-max'
                : 'ant-table-no-scroll table'
              : props.customColumnWidth
              ? 'ant-table-content customCol'
              : 'ant-table-content table'
          } amlTable`}
          dataSource={finalData[defaultIndex]}
          columns={ColumnWidth(updatedHeader)}
          onChange={props.onChange}
          rowSelection={props.rowSelection}
          pagination={false}
          scroll={{ x: true }}
          components={{
            body: {
              cell: props && props.componentCell,
            },
          }}
          summary={() => {
            return (
              <>
                {props.showTable && (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {props.TotalAmount?.totalAmount}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      {props.TotalAmount?.totalNoOfTransactions}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      {props.TotalAmount?.totalPayoutAmount}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      {props.TotalAmount?.totalSenderAmount}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      {props.TotalAmount?.totalServiceCharge}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
                {props.PrefundTable && (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>

                    <Table.Summary.Cell index={1}>
                      {props.TotalAmount?.total}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
                {props.TransactionHistoryReport && (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>

                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {props.TotalAmount?.total}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              </>
            );
          }}
        />
      </ConfigProvider>
      {props.approval && (
        <CustomRowSelection
          handleSubmit={props.handlesubmit}
          reasonError={props.reasonError}
          mobError={props.mobError}
          approve={props.approve}
          productApprove={props.productApprove}
          reason={props.reason}
          disableCustomRowSelection={props.disableCustomRowSelection}
          remarkOnly={props.remarkOnly}
          topupStatus={props.topupStatus}
          cancelBtn={props.cancelBtn}
          handleAccountSubmit={props.handleAccountSubmit}
          handleAccountCancel={props.handleAccountCancel}
        />
      )}

      {!props.toPrint && isPaginated && (
        <>
          <CustomPagination
            DataLength={props.CustomTableHeader?.length}
            PageNumber={finalData.length}
            noOfBatches={finalBatch}
            noOfRows={props?.noOfRows}
            DisplayItem={DisplayItem}
            RecordsToBeFetched={RecordsToBeFetched}
            selectedPage={selectedPage}
            prevNextStatus={prevNextStatus}
            prevFunc={() => {
              if (
                finalData[defaultIndex] &&
                finalData[defaultIndex].length > 0
              ) {
                prevFunc();
              }
            }}
            nextFunc={() => {
              if (
                finalData[defaultIndex] &&
                finalData[defaultIndex].length > 0
              ) {
                nextFunc();
              }
            }}
            prevBatch={prevBatch}
            nextBatch={nextBatch}
            defaultIndex={defaultIndex}
            defaultBatch={defaultBatch}
            serverPagination={props.serverPagination}
            totalRecords={props.totalRecords}
            SearchFilterGo={props.SearchFilterGo}
          ></CustomPagination>
        </>
      )}
    </div>
  );
}

export default CustomHeader;
