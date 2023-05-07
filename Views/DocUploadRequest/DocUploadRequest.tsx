import { Form, Modal } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Button, FormGroup, Input, Label } from "reactstrap";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import { FaReply } from "react-icons/fa";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { useReactToPrint } from "react-to-print";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./DocUploadRequest.scss";
import {
  docUploadreqApprove,
  getDocUploadRequest,
} from "../../redux/action/DocUploadRequestAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { getUserAccess } from "../../redux/action/CardUnBlockAction";
import { useLocation } from "react-router-dom";

const DocUploadRequest = (props: any) => {
  const history = useHistory();
  const [filterOption, setfilterOption] = useState(false);
  const parms: any = useLocation();
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [tableShow, setTableShow] = useState(true);
  const [isSearchShows, setIsSearchShows] = useState(false);
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState("");
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(props.location?.state || "");
  const [lockedStatus, setLockedStatus] = useState(true);
  const [reasonError, setReasonError] = useState(false);
  const [mobError, setMobError] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [transactionStatusId, setTransactionStatusId] = useState<any>([]);
  const [filterValue, setFilterValue] = useState({
    mobileNo: "",
    cardl4d: "",
    reasonCode: "",
    requestStatus: "",
    requestChannel: "",
    inputOperator: "",
    approverId: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [docStatus, setDocStatus] = useState("");

  const REQ_CHANNEL = "MOB";
  const docUploadRequestRes = useSelector(
    (state: RootStateOrAny) =>
      state.DocUploadRequestReducer?.getDocUploadRequestResData
  );
  const data = docUploadRequestRes?.data?.filter((e: any) => {
    return e.requestStatus === "CREATED";
  });
  const nonCreate = docUploadRequestRes?.data?.filter((e: any) => {
    return e.requestStatus !== "CREATED";
  });
  const result = data?.concat(nonCreate);

  useEffect(() => {
    if (docUploadRequestRes?.data) {
      setIsLoading(false);
    }
  }, [docUploadRequestRes]);
  useEffect(() => {
    if (!docUploadRequestRes?.data) {
      setIsLoading(true);
    }
  }, [docUploadRequestRes]);
  const fetchDocUploadList = useCallback(async () => {
    try {
      dispatch(getDocUploadRequest());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchDocUploadList();
  }, [fetchDocUploadList]);

  const blockCardUserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("DOCUMENT_UPLOAD"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  const docUploadRequestApproveRes = useSelector(
    (state: RootStateOrAny) => state.DocUploadRequestReducer?.getApproveRes
  );
  let rejected = false;
  docUploadRequestApproveRes?.data?.forEach((res: any) => {
    if (res.requestStatus === "REJECTED") {
      rejected = true;
    }
  });

  let approvedRes = false;
  docUploadRequestApproveRes?.data?.forEach((res: any) => {
    if (res.requestStatus === "APPROVED") {
      approvedRes = true;
    }
  });

  let approveErr = false;
  docUploadRequestApproveRes?.data?.forEach((res: any) => {
    if (res.requestStatus === "ERROR") {
      approveErr = true;
    }
  });

  useEffect(() => {
    if (docUploadRequestApproveRes) {
      if (docUploadRequestApproveRes?.data) {
        setIsLoading(false);
        if (rejected) {
          setApiMessage("DocUploadRequest Rejected Successfully");
          setLockedStatus(true);
        }
        if (approvedRes) {
          setApiMessage("DocUploadRequest Approved Successfully");
          setLockedStatus(true);
        }
        if (approveErr) {
          setApiMessage("DocUploadRequest Approved Has Been Error");
          setLockedStatus(true);
        }
        fetchDocUploadList();
      } else if (docUploadRequestApproveRes?.error) {
        setIsLoading(false);
        setLockedStatus(false);
        setApproveError(true);
        if (docUploadRequestApproveRes?.status === 500) {
          setApiMessage(docUploadRequestApproveRes?.error);
        } else {
          setApiMessage(docUploadRequestApproveRes?.message);
        }
        fetchDocUploadList();
      }
    }
  }, [docUploadRequestApproveRes]);

  const OnClickTransaction = (data: any) => {
    const mobileNumber = data?.mobileNumber;
    props.history.push({
      pathname: "/dashboard/SRF/Doc-Upload-Customer-View",
      state: {
        value: {
          id: mobileNumber,
          cardOperation: true,
        },
      },
    });
  };

  const textFormat = (data: any) => {
    if (data === "HOMEADDRESS") {
      return "HOME ADDRESS";
    } else if (data === "HOMEADDRESS,MAILINGADDRESS") {
      return "HOME ADDRESS,MAILING ADDRESS";
    } else {
      return data;
    }
  };

  let cardHeader = [
    {
      title: "Wallet ID",
      dataIndex: "walletId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletId.localeCompare(b.walletId),
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName.localeCompare(b.customerName),
      },
      render: (refValue: any, record: any) => {
        return (
          <div className={`cursor `} onClick={() => OnClickTransaction(record)}>
            <span className="block-card-section-color">{refValue}</span>
          </div>
        );
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileNumber - b.mobileNumber,
      },
    },
    {
      title: "PAN",
      dataIndex: "cardL4D",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardL4D - b.cardL4D,
      },
    },
    {
      title: "Card Expiry Date",
      dataIndex: "cardExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardExpiryDate - b.cardExpiryDate,
      },
    },
    {
      title: "Request Code",
      dataIndex: "changeRequest",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.changeRequest.localeCompare(b.changeRequest),
      },
      render: (errorMsg: any) => {
        return <>{errorMsg ? textFormat(errorMsg) : "-"}</>;
      },
    },
    {
      title: "Request Status",
      dataIndex: "requestStatus",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestStatus.localeCompare(b.requestStatus),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
        return (
          <label
            className={` ${
              value === "APPROVED" ? "text-success" : "text-danger"
            }`}
          >
            {value}
          </label>
        );
      },
    },
    {
      title: "Error Message",
      dataIndex: "accountingErrorMessage",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingErrorMessage.localeCompare(b.accountingErrorMessage),
      },
      render: (errorMsg: any) => {
        return (
          <div className="d-flex justify-content-center">
            {errorMsg ? `${errorMsg}` : "-"}
          </div>
        );
      },
    },
    {
      title: "Request Channel",
      dataIndex: "requestChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestChannel.localeCompare(b.requestChannel),
      },
    },
    {
      title: "Maker Name",
      dataIndex: "makerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.makerName.localeCompare(b.makerName),
      },
    },
    {
      title: "Approver Name",
      dataIndex: "approverName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approverName - b.approverName,
      },
      render: (errorMsg: any) => {
        return (
          <div className="d-flex justify-content-center">
            {errorMsg ? `${errorMsg}` : "-"}
          </div>
        );
      },
    },
  ];

  const toggleSearch = () => {
    setIsSearchShows(!isSearchShows);
    setfilterOption(false);
    setFilteredArea(false);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setIsSearchShows(false);
    setFilteredArea(false);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setPrint(false);
    setorginalColumns([]);
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Doc-Upload-Request-Add",
    });
  };

  let newCardDatas = result?.map((data: any, index: any) => {
    return {
      ...data,
      key: index,
      cardExpiryDate:
        data.cardExpiryDate?.slice(0, 2) + "/" + data.cardExpiryDate?.slice(2),
      changeRequest: data.changeRequest?.replace(/ /g, ""),
    };
  });

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;

  const rowSelection = {
    // onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
    //   setTransactionStatusId(selectedRows);
    //   setApiMessage("");
    //   let mobSelectedRows = selectedRows.filter((request: any, index: any) => {
    //     if (request.requestChannel === REQ_CHANNEL) {
    //       setIsModalOpen(true);
    //       Object.assign(request, { isDocOriginal: docStatus });
    //     }
    //     return false;
    //   });
    //   if (makerDetail === selectedRows[0]?.operatorId) {
    //     setLockedStatus(false);
    //     setApproveError(true);
    //     setApiMessage("Maker can't approve his own request.");
    //   } else {
    //     setApiMessage("");
    //   }
    // },
    // getCheckboxProps: (record: any) => (
    //   console.log(record, "recordddddddddddddddddddd"),
    //   {
    //     disabled: record?.requestStatus !== "CREATED",
    //     requestStatus: record?.requestStatus,
    //   }
    // ),
  };

  const modalUpdateHandler = (e: any) => {
    Object.assign(transactionStatusId[0], { isDocOriginal: docStatus });
    setMobError(false);

    setIsModalOpen(false);
  };

  const viewUser = (e: any) => {
    props.history.push({
      pathname: "/dashboard/SRF/Doc-Upload-Request-View",
      state: {
        data: e,
        view: true,
      },
    });
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      newCardDatas = newCardDatas?.filter((e: any) => {
        return (
          e.customerName
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.walletId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.mobileNumber
            ?.toString()
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardExpiryDate
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardL4D?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.reasonCode?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.approverName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.changeRequest
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.requestStatus
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.makerName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.requestChannel
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      newCardDatas = newCardDatas?.filter((e: any) => {
        if (
          e[searchCategory]
            ?.toString()
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }
  const closeMessage = () => {
    setApiMessage("");
    history.replace({
      pathname: "/dashboard/SRF/Doc-Upload-Request",
      state: "",
    });
  };
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);

  const handleClick = () => {
    setfilterOption(false);
    setFilteredArea(true);
    setTableShow(true);
  };
  const resetFilter = () => {
    setFilterValue({
      mobileNo: "",
      cardl4d: "",
      reasonCode: "",
      requestStatus: "",
      requestChannel: "",
      inputOperator: "",
      approverId: "",
    });
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    setfilterOption(false);
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const closeSearch = () => {
    setIsSearchShows(!isSearchShows);
  };
  const handleFilterChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const fetchApproveDocUploadReq = useCallback(
    (id: any) => {
      try {
        dispatch(docUploadreqApprove(id));
      } catch (err) {}
    },
    [dispatch]
  );

  let approveId = transactionStatusId?.map((e: any) => {
    return e.id;
  });

  let docStatusApproveId = transactionStatusId?.map((e: any) => {
    if (e.isDocOriginal) {
      return { id: e.id, originalDocument: e.isDocOriginal };
    } else {
      return { id: e.id };
    }
  });
  const submitHandlers = (value: any, reason: any) => {
    const isMob = transactionStatusId.every(
      (element: any) => element.requestChannel === REQ_CHANNEL
    );

    const mobStatus = transactionStatusId.every(
      (value: any) => value.isDocOriginal === "true"
    );

    if (mobStatus && isMob) {
      setMobError(false);
    }

    if (!mobStatus && isMob) {
      setMobError(true);
    } else if (transactionStatusId.length > 0) {
      if (reason !== "") {
        setIsLoading(true);
        setReasonError(false);

        if (value === "Reject") {
          var body = JSON.stringify({
            approvalStatus: "REJECT",
            approverRemarks: reason,
            srfKycUpdateCheckers: docStatusApproveId,
          });
          fetchApproveDocUploadReq(body);
        } else {
          var approveData = JSON.stringify({
            approvalStatus: "APPROVE",
            approverRemarks: reason,
            srfKycUpdateCheckers: docStatusApproveId,
          });
          fetchApproveDocUploadReq(approveData);
        }
        setTransactionStatusId([]);
      } else {
        setReasonError(true);
      }
    } else {
      setApiMessage("Please select any one list");
      setApproveError(true);
      setLockedStatus(false);
    }
  };

  let locatonData = props.location?.state;
  useEffect(() => {
    if (locatonData === true) {
      setApiMessage(props?.location?.message);
      fetchDocUploadList();
      setLockedStatus(true);
    } else {
      setApiMessage("");
    }
  }, []);

  useEffect(() => {
    if (parms && parms.state) {
      setApiMessage(parms.state);
    }
  }, [parms]);

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummary
          RightContent={"Doc Upload Request"}
          SummaryFileName={"Doc Upload Request"}
          searchArea={toggleSearch}
          search={isSearchShows}
          filterRemit={false}
          filterArea={toggleFilter}
          filterEnabled={filterOption}
          Refresh={true}
          List={true}
          Add={true}
          AddAction={handleAdd}
          refresh={toggleRefresh}
          Print={handlePrint}
          ListData={handleList}
          SummaryColumn={
            orginalColumns.length > 0 ? orginalColumns : cardHeader
          }
          TableData={newCardDatas}
        />

        {filterOption && (
          <div className="docUploadFilterSection mt-3 p-3">
            <div className="d-flex justify-content-between">
              <p className="docUploadFilter">Filter</p>
            </div>
            <div className="container-fluid doc-filterTop">
              <div className="row ">
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Mobile No
                    </Label>
                    <Input
                      type="text"
                      name="mobileNo"
                      className="formRadiusBank"
                      placeholder="Enter MobileNo"
                      value={filterValue.mobileNo}
                      onChange={handleFilterChange}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Card L4D
                    </Label>
                    <Input
                      type="text"
                      name="cardl4d"
                      className="formRadiusBank"
                      placeholder="Enter Card L4D"
                      value={filterValue.cardl4d}
                      onChange={handleFilterChange}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Reason Code
                    </Label>
                    <Input
                      type="select"
                      name="reasonCode"
                      className="formRadiusBank form-select"
                      value={filterValue.reasonCode}
                      onChange={handleFilterChange}
                    >
                      <option>Select Reason</option>
                      <option>None</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Request Status
                    </Label>
                    <Input
                      type="select"
                      name="requestStatus"
                      className="formRadiusBank form-select"
                      value={filterValue.requestStatus}
                      onChange={handleFilterChange}
                    >
                      <option>select status</option>
                      <option>Error</option>
                      <option>Approved</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Request Channel
                    </Label>
                    <Input
                      type="select"
                      name="requestChannel"
                      className="formRadiusBank form-select"
                      value={filterValue.requestChannel}
                      onChange={handleFilterChange}
                    >
                      <option>select Channel</option>
                      <option>Bo</option>
                      <option>UAm</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Input Operator ID
                    </Label>
                    <Input
                      type="text"
                      name="inputOperator"
                      className="formRadiusBank"
                      placeholder="Enter Input Operator ID"
                      value={filterValue.inputOperator}
                      onChange={handleFilterChange}
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Label for="exampleEmail" className="docUploadLabel">
                      Approver ID
                    </Label>
                    <Input
                      type="text"
                      name="approverId"
                      className="formRadiusBank"
                      placeholder="Enter Approver ID"
                      value={filterValue.approverId}
                      onChange={handleFilterChange}
                    ></Input>
                  </FormGroup>
                </div>
              </div>
              <div className="col d-flex justify-content-end docUploadbuttonDiv">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Reset"}
                  onSubmit={handleClick}
                  onCancel={resetFilter}
                />
              </div>
            </div>
          </div>
        )}

        {filteredArea && <FiltersSelected value={filterValue} />}
        {isSearchShows && (
          <div className="d-flex user-search mt-3 p-3 cursor">
            <select
              className=" form-select user-search-drop ms-2 cursor"
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={"Select Field"}
            >
              <option selected className="cursor">
                Select Field
              </option>
              <option value="walletId" className="cursor">
                Wallet Id
              </option>
              <option value="customerName" className="cursor">
                selectedRows[0]?.operatorId Customer Name
              </option>
              <option value="mobileNumber" className="cursor">
                Mobile No
              </option>
              <option value="cardL4D" className="cursor">
                PAN
              </option>
              <option value="cardExpiryDate" className="cursor">
                Card Expiry Date
              </option>
              <option value="requestStatus" className="cursor">
                Request Status
              </option>
              <option value="changeRequest" className="cursor">
                Request Code
              </option>
              <option value="requestChannel" className="cursor">
                Request Channel
              </option>
              <option value="makerName" className="cursor">
                Maker Name
              </option>
              <option value="approverName" className="cursor">
                Approver Name
              </option>
              <option value="any" className="cursor">
                Any
              </option>
            </select>
            <Input
              type="text"
              className="ms-1 user-search-input"
              onChange={(ev) => handleSearch(ev)}
            />
            <div className="ms-1">
              <Button color="danger" className="btn--sizer">
                Search
              </Button>
            </div>
            <div>
              <Button
                className="text-white  border-0 ms-1"
                onClick={() => closeSearch()}
              >
                <FaReply />
              </Button>
            </div>
          </div>
        )}
        {toPrint && (
          <span
            className="span-col1"
            style={{
              textAlign: "center",
              display: "block",
              marginBottom: "10px",
            }}
          >
            {" "}
            Preview content. Please click{" "}
            <button
              onClick={Print}
              className="bg-light border-0"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </button>{" "}
            to confirm and Print !. Or{" "}
            <button
              onClick={cancelPrint}
              className="bg-light border-0"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Cancel
            </button>
          </span>
        )}
        <CustomLoader isLoading={isLoading} size={50} />

        {apiMessage && apiMessage !== true ? (
          <CustomResponseMessage
            apiStatus={lockedStatus}
            closeMessage={() => closeMessage()}
            message={apiMessage}
            errorFix={approveError}
          />
        ) : null}

        {isLoading ? null : (
          <>
            {tableShow && (
              <div className="mt-3" ref={componentRef}>
                <Form form={form} component={false}>
                  <CustomHeader
                    TableData={columns.length > 0 ? columns : cardHeader}
                    rowSelection={rowSelection}
                    dataSources={newCardDatas}
                    columns={cardHeader}
                    handlesubmit={submitHandlers}
                    viewUser={viewUser}
                    reasonError={reasonError}
                    mobError={mobError}
                    view={true}
                    disableCustomRowSelection={true}
                    approval={toPrint ? false : true}
                    reason={true}
                    CustomTableHeader={newCardDatas}
                    toPrint={toPrint ? true : false}
                    DisableMange={toPrint ? true : false}
                  />
                </Form>
              </div>
            )}
          </>
        )}

        <>
          <Modal
            title={false}
            visible={isModalOpen}
            footer={false}
            closable={false}
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <p>Is original document available</p>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <Input
                    type="select"
                    name="isDocOriginal"
                    className="card-Upgrade-inputReason"
                    value={docStatus}
                    onChange={(e) => setDocStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Input>
                </div>
                <div className=" col-6 d-flex justify-content-end pt-2  ">
                  <Button
                    className="button modal_button border-0 mx-2  btn"
                    onClick={(e) => modalUpdateHandler(e)}
                  >
                    Update
                  </Button>
                  <Button
                    className="button btn "
                    color="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>{" "}
              </div>
            </div>
          </Modal>
        </>
      </>
    </div>
  );
};

export default DocUploadRequest;
