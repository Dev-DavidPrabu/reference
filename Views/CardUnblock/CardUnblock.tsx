import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Button, FormGroup, Input, Label } from "reactstrap";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import AddCardUnblock from "../../Components/AddCardUnblock/AddCardUnblock";
import "./CardUnblock.scss";
import { FaReply } from "react-icons/fa";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { useReactToPrint } from "react-to-print";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  addUnBlockCardRequest,
  approveUnBlockStatus,
  getUnBlockCardRecords,
  getUserAccess,
  UnblockResponseMessage,
  resetResponseMsg,
} from "../../redux/action/CardUnBlockAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { CardUnblockModel } from "../../models/CardUnblockModel";

const CardUnblock = (props: any) => {
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [tableShow, setTableShow] = useState(true);
  const [addCardUnblock, setAddCardUnblock] = useState("");
  const [isSearchShows, setIsSearchShows] = useState(false);
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState("");
  const location: any = useLocation();
  const [filterError, setFilterError] = useState(true);
  const [filterValue, setFilterValue] = useState({
    mobileNo: "",
    cardl4d: "",
    requestChannel: "",
    inputOperator: "",
    approverId: "",
    requestStatus: "",
  });
  const dispatch = useDispatch();
  const [transactionStatusId, setTransactionStatusId] = useState<any>([]);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [addApiError, setAddApiError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const history = useHistory();
  const unBlockCardListData = useSelector(
    (state: RootStateOrAny) =>
      state.CardUnBlockReducer?.getUnBlockCardRequestResponse
  );
  const unBlockCardUserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );
  const ApiUnblockResponseMessage = useSelector(
    (state: RootStateOrAny) =>
      state.CardUnBlockReducer?.getUnblockResponseMessage
  );
  const fetchUnblockResponseMessage = useCallback(
    async (data) => {
      try {
        dispatch(UnblockResponseMessage(data));
      } catch (err) {}
    },
    [dispatch]
  );

  let makerRes = unBlockCardUserAccess?.data;

  let blockMakerAdd = false;
  let blockChecker = false;

  makerRes?.forEach((res: any) => {
    if (res.approvalLevelOne === true) {
      blockChecker = true;
    } else if (res.add === true) {
      blockMakerAdd = true;
    }
  });
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;

  let unblockList = unBlockCardListData?.data;

  const data = unBlockCardListData?.data?.filter((e: any) => {
    return e.reasonStatus === "CREATED";
  });
  const nonCreate = unBlockCardListData?.data?.filter((e: any) => {
    return e.reasonStatus !== "CREATED";
  });
  const result = data?.concat(nonCreate);

  const fetchUnBlockCardRequest = useCallback(async () => {
    try {
      dispatch(getUnBlockCardRecords());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchUnBlockCardRequest();
  }, [fetchUnBlockCardRequest]);
  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("SRF_CARD_UNBLOCK"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  useEffect(() => {
    if (unblockList) {
      setIsLoading(false);
    }
  }, [unblockList]);
  useEffect(() => {
    if (!unblockList) {
      setIsLoading(true);
    }
  }, [unblockList]);

  useEffect(() => {
    if (ApiUnblockResponseMessage) {
      if (ApiUnblockResponseMessage?.data) {
        setApiStatus(true);
        setApiMessage(ApiUnblockResponseMessage?.data?.responseMessage);
        setTimeout(function () {
          setApiStatus(false);
          setApiMessage("");
          dispatch(resetResponseMsg());
        }, 3500);
        setIsLoading(false);
        if (ApiUnblockResponseMessage?.data[0]?.reasonStatus === "REJECTED") {
          setApiMessage(ApiUnblockResponseMessage?.data?.responseMessage);
          setApiStatus(true);
        }
        if (ApiUnblockResponseMessage?.data[0]?.reasonStatus === "APPROVED") {
          setApiMessage(ApiUnblockResponseMessage?.data?.responseMessage);
          setApiStatus(true);
        }
        if (ApiUnblockResponseMessage?.data[0]?.reasonStatus === "ERROR") {
          setApiMessage(ApiUnblockResponseMessage?.data?.responseMessage);
          setApiStatus(true);
        }
        fetchUnBlockCardRequest();
      } else if (ApiUnblockResponseMessage?.error) {
        setIsLoading(false);
        setApiStatus(false);
        setApproveError(true);
        setApiMessage(ApiUnblockResponseMessage?.message);
        fetchUnBlockCardRequest();
      }
    }
  }, [ApiUnblockResponseMessage]);

  const addUnBlockCardRequestDetail = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.addUnBlockCardResponse
  );
  const fetchAddUnBlockCardRequest = useCallback(
    (body: any) => () => {
      try {
        dispatch(addUnBlockCardRequest(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (addUnBlockCardRequestDetail) {
      if (addUnBlockCardRequestDetail?.data) {
        if (addUnBlockCardRequestDetail?.data?.reasonStatus === "CREATED") {
          setApiMessage("Card UnBlock Request Created Successfully");
          setApiStatus(true);
        }
        if (addUnBlockCardRequestDetail?.data?.reasonStatus === "APPROVED") {
          setApiMessage(ApiUnblockResponseMessage?.data?.responseMessage);
          setApiStatus(true);
        }
        if (addUnBlockCardRequestDetail?.data?.reasonStatus === "ERROR") {
          setApiMessage(ApiUnblockResponseMessage?.data?.responseMessage);
          setApiStatus(true);
        }
        setIsLoading(false);
        setIsLoadingData(false);
        setTableShow(true);
        setAddCardUnblock("");
        fetchUnBlockCardRequest();
      } else if (addUnBlockCardRequestDetail?.error) {
        setIsLoading(false);
        setIsLoadingData(false);
        setApiStatus(false);
        setAddApiError(addUnBlockCardRequestDetail?.message);
        setApproveError(true);
      }
    }
  }, [addUnBlockCardRequestDetail]);

  const OnClickTransaction = (data: any) => {
    const mobileNumber = data?.primaryMobileNumber;
    props.history.push({
      pathname: "/dashboard/SRF/View-UnBlock-Customer",
      state: {
        value: {
          id: mobileNumber,
          cardOperation: true,
        },
      },
    });
  };

  let cardHeader = [
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
      dataIndex: "primaryMobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.primaryMobileNumber - b.primaryMobileNumber,
      },
    },
    {
      title: "PAN",
      dataIndex: "panLastFourdigits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.panLastFourdigits - b.panLastFourdigits,
      },
    },
    {
      title: "Card Expiry Date",
      dataIndex: "cardExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardExpirydate - b.cardExpiryDate,
      },
    },
    {
      title: "Request Status",
      dataIndex: "reasonStatus",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.reasonStatus.localeCompare(b.reasonStatus),
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
      title: "Host Error Message",
      dataIndex: "accountingErrorMsg",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountingErrorMsg.localeCompare(b.accountingErrorMsg),
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
      title: "Input Operator Name",
      dataIndex: "makerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.makerName.localeCompare(b.makerName),
      },
    },
    {
      title: "Approver Name",
      dataIndex: "checkerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.checkerName?.localeCompare(b.checkerName),
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
    setAddCardUnblock("add");
    setIsLoadingData(false);
  };

  const onCancel = () => {
    setAddCardUnblock("");
    fetchUnBlockCardRequest();
  };

  let newCardDatas = result?.map((data: any, index: any) => {
    return {
      ...data,
      key: index,
      cardExpiryDate:
        data.cardExpiryDate.slice(0, 2) + "/" + data.cardExpiryDate.slice(2),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setTransactionStatusId(selectedRows);
      setApiMessage("");
      let ownMaker = selectedRows.filter((request: any) => {
        if (request.createdBy === makerDetail) {
          return true;
        }
        return false;
      });
      if (ownMaker.length > 0) {
        setApiStatus(false);
        setApproveError(true);
        setDisableSubmit(true);
        setApiMessage("Maker can't approve his own request.");
      } else {
        setApiMessage("");
        setDisableSubmit(false);
      }
    },
    getCheckboxProps: (record: any) => ({
      disabled: record?.reasonStatus !== "CREATED",
      reasonStatus: record?.reasonStatus,
    }),
  };

  const viewUser = (e: any) => {
    props.history.push({
      pathname: "/dashboard/SRF/Card-Unblock-View-Details",
      state: e,
    });
  };

  let approveId = transactionStatusId?.map((e: any) => {
    return e.id;
  });

  const submitHandlers = (value: any, reason: any) => {
    if (transactionStatusId.length > 0) {
      if (reason !== "") {
        setIsLoading(true);
        setReasonError(false);

        if (value === "Reject") {
          var body = JSON.stringify({
            id: approveId,
            reasonStatus: "REJECT",
            approverRemarks: reason,
          });
          fetchUnblockResponseMessage(body);
        } else {
          var body = JSON.stringify({
            id: approveId,
            reasonStatus: "APPROVE",
            approverRemarks: reason,
          });
          // fetchApproveUnBlockCard(body);
          fetchUnblockResponseMessage(body);
        }
        setTransactionStatusId([]);
      } else {
        setReasonError(true);
      }
    } else {
      setApiMessage("Please select any one list");
      setApproveError(true);
      setApiStatus(false);
    }
  };

  const submitHandler = (value: any) => {
    setIsLoadingData(true);
    var body = {
      customerId: value.customerId,
      cardUrn: value.cardUrn,
      customerName: value.customerName,
      primaryMobileNumber: value.primaryMobileNumber,
      panLastFourdigits: value.panLastFourdigits,
      cardExpiryDate: value.cardExpiryDate,
      reasonCode: "LC",
      blockExpiryDate: "",
      idTypeCode: value.idTypeCode,
      idValue: value.idValue,
      frontDocumentContent: value.frontDocumentContent,
      backDocumentContent: value.backDocumentContent,
      photoContent: value.photoContent,
      otpReferenceNo: "2022032317311479921N",
      otp: "",
    };
    dispatch(fetchAddUnBlockCardRequest(body));
  };

  const closeMessage = () => {
    setApiMessage("");
    setApiStatus(false);
    // history.replace({
    //   pathname: "/dashboard/SRF/Block-Card-Request",
    //   state: {},
    // });
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      newCardDatas = newCardDatas?.filter((e: any | CardUnblockModel) => {
        return (
          e.customerName
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.primaryMobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.panLastFourdigits
            ?.toString()
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardExpiryDate
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.createdBy?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.accountingErrorMsg
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.approverId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.reasonStatus
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.requestChannel
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      newCardDatas = newCardDatas?.filter((e: any | CardUnblockModel) => {
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

  const handleClick = () => {
    setFilterError(true);
    if (
      filterValue.approverId ||
      filterValue.cardl4d ||
      filterValue.inputOperator ||
      filterValue.mobileNo ||
      filterValue.requestChannel ||
      filterValue.requestStatus
    ) {
      setfilterOption(false);
      setFilteredArea(true);
      setTableShow(true);
    } else {
      setFilterError(false);
    }
  };
  const resetFilter = () => {
    setFilterValue({
      mobileNo: "",
      cardl4d: "",
      requestChannel: "",
      inputOperator: "",
      approverId: "",
      requestStatus: "",
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
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage]);

  useEffect(() => {
    if (
      location?.state?.getUnblockResponseMessage !== undefined &&
      location?.state?.getUnblockResponseMessage ===
        "Request rejected successfully"
    ) {
      setApiStatus(true);
      setApiMessage(location.state.getUnblockResponseMessage);
    } else {
      if (location?.state?.getUnblockResponseMessage !== undefined) {
        setApiStatus(true);
        setApiMessage(location.state.getUnblockResponseMessage);
      }
    }
  });

  return (
    <div className="p-4">
      {!addCardUnblock && (
        <>
          <CommonHeaderSummary
            RightContent={"Unblock Card Request"}
            SummaryFileName={"Unblock Card Request"}
            searchArea={toggleSearch}
            search={isSearchShows}
            filter={false}
            filterArea={toggleFilter}
            filterEnabled={filterOption}
            Refresh={true}
            List={true}
            Add={blockMakerAdd}
            AddAction={handleAdd}
            refresh={toggleRefresh}
            Print={handlePrint}
            ListData={handleList}
            SummaryColumn={
              orginalColumns.length > 0 ? orginalColumns : cardHeader
            }
            TableData={newCardDatas}
          />

          {apiMessage && (
            <CustomResponseMessage
              apiStatus={apiStatus}
              closeMessage={() => closeMessage()}
              message={apiMessage}
              errorFix={approveError}
            />
          )}
          {filterOption && (
            <div className="cardUnblockFilterSection mt-3 p-3">
              <div className="d-flex justify-content-between">
                <p className="cardUnblockFilter">Filter</p>
                <span
                  className={`remit-processing-mandatory ${
                    filterError && "d-none"
                  }`}
                >
                  {" "}
                  * any one field value is mandatory
                </span>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardUnblockLabel">
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
                      <Label for="exampleEmail" className="cardUnblockLabel">
                        Pan Number
                      </Label>
                      <Input
                        type="text"
                        name="cardl4d"
                        className="formRadiusBank"
                        placeholder="Enter Pan Number"
                        value={filterValue.cardl4d}
                        onChange={handleFilterChange}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardUnblockLabel">
                        Request Status
                      </Label>
                      <Input
                        type="select"
                        name="requestStatus"
                        className="formRadiusBank form-select"
                        value={filterValue.requestStatus}
                        onChange={handleFilterChange}
                      >
                        <option></option>
                        <option>Error</option>
                        <option>Approved</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardUnblockLabel">
                        Request Channel
                      </Label>
                      <Input
                        type="select"
                        name="requestChannel"
                        className="formRadiusBank form-select"
                        value={filterValue.requestChannel}
                        onChange={handleFilterChange}
                      >
                        <option></option>
                        <option>MMP</option>
                        <option>MET</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardUnblockLabel">
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
                      <Label for="exampleEmail" className="cardUnblockLabel">
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
                  <div className="col d-flex justify-content-end cardUnblockbuttonDiv">
                    <SubmitCancelButton
                      button={"Submit"}
                      secondButton={"Reset"}
                      onSubmit={handleClick}
                      onCancel={resetFilter}
                    />
                  </div>
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
                <option value="customerName" className="cursor">
                  Customer Name
                </option>
                <option value="primaryMobileNumber" className="cursor">
                  Mobile No
                </option>
                <option value="panLastFourdigits" className="cursor">
                  PAN
                </option>
                <option value="cardExpiryDate" className="cursor">
                  Card Expiry Date
                </option>
                <option value="reasonStatus" className="cursor">
                  Request Status
                </option>
                <option value="accountingErrorMsg" className="cursor">
                  Host Error Message
                </option>
                <option value="requestChannel" className="cursor">
                  Request Channel
                </option>
                <option value="createdBy" className="cursor">
                  Maker Name
                </option>
                <option value="approverId" className="cursor">
                  Checker Name
                </option>
                <option value="any" className="cursor">
                  Any
                </option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                onChange={(ev) => handleSearch(ev)}
                placeholder="Type your search keyword"
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
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  border: 0,
                  background: "white",
                }}
              >
                here
              </button>{" "}
              to confirm and Print !. Or{" "}
              <button
                onClick={cancelPrint}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  border: 0,
                  background: "white",
                }}
              >
                Cancel
              </button>
            </span>
          )}
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <>
              {tableShow && (
                <div className="mt-3" ref={componentRef}>
                  <Form form={form} component={false}>
                    <CustomHeader
                      TableData={columns.length > 0 ? columns : cardHeader}
                      rowSelection={blockChecker ? rowSelection : !rowSelection}
                      dataSources={newCardDatas}
                      columns={cardHeader}
                      handlesubmit={submitHandlers}
                      reasonError={reasonError}
                      viewUser={viewUser}
                      view={true}
                      disableCustomRowSelection={!disableSubmit}
                      approval={
                        toPrint || transactionStatusId.length !== 0
                          ? !blockChecker
                            ? false
                            : true
                          : false
                      }
                      hideSelectAll={true}
                      reason={true}
                      CustomTableHeader={newCardDatas}
                      toPrint={columns.length > 0 && toPrint ? true : false}
                      DisableMange={
                        columns.length > 0 && toPrint ? true : false
                      }
                    />
                  </Form>
                </div>
              )}
            </>
          )}
        </>
      )}
      {addCardUnblock && (
        <AddCardUnblock
          showAddUnBlockCard={addCardUnblock}
          submitHandler={submitHandler}
          onCancel={onCancel}
          message={addApiError}
          isLoadingData={isLoadingData}
        />
      )}
    </div>
  );
};

export default CardUnblock;
