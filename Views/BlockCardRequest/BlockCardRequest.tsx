import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, FormGroup, Input, Label } from "reactstrap";
import AddBlockCardRequest from "../../Components/AddBlockCardRequest/AddBlockCardRequest";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { BlockCardInfo } from "../../models/BlockCardRequestModel";
import {
  addBlockCardRequest,
  approveBlockStatus,
  getBlockCardRecords,
  resetCustomerDetail,
  resetToggle,
  ResponseMessage,
} from "../../redux/action/BlockCardRequestAction";
import { getUserAccess } from "../../redux/action/CardUnBlockAction";
import "./BlockCardRequest.scss";
import { useLocation } from "react-router-dom";

const BlockCardRequest = (props: any) => {
  const [filterOption, setfilterOption] = useState(false);
  const location: any = useLocation();
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [addBlockCard, SetAddBlockCard] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [isFiltered, setIsfiltered] = useState(false);
  const [cardDetail, setCardDetail] = useState("");
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [table, setTable] = useState(true);
  const [transactionStatusId, setTransactionStatusId] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [filterDetail, setFilterDetail] = useState({
    primaryMobileNumber: "",
    reasonStatus: "",
  });

  const blockCardListData = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.getBlockCardRequestResponse
  );
  const ApiResponseMessage = useSelector(
    (state: RootStateOrAny) => state.BlockCardRequestReducer?.getResponseMessage
  );
  const fetchResponseMessage = useCallback(
    async (data) => {
      try {
        dispatch(ResponseMessage(data));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchBlockCardRequest = useCallback(async () => {
    try {
      dispatch(getBlockCardRecords());
    } catch (err) {}
  }, [dispatch]);

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;
  useEffect(() => {
    if (blockCardListData?.data) {
      setIsLoading(false);
    }
  }, [blockCardListData]);
  useEffect(() => {
    if (!blockCardListData?.data) {
      setIsLoading(true);
    }
  }, [blockCardListData]);
  useEffect(() => {
    fetchBlockCardRequest();
  }, [fetchBlockCardRequest]);

  const rejectBlockCardRequest = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.rejectBlockCardResponse
  );

  useEffect(() => {
    if (rejectBlockCardRequest) {
      if (rejectBlockCardRequest?.data) {
        setIsLoading(false);
      } else if (rejectBlockCardRequest?.error) {
        setIsLoading(false);
        setApiStatus(false);
        setApiMessage(rejectBlockCardRequest?.message);
      }
    }
  }, [rejectBlockCardRequest]);

  const approveBlockCardRequest = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.approveBlockCardResponse
  );

  const fetchApproveBlockCard = useCallback(
    (id: any) => {
      try {
        dispatch(approveBlockStatus(id));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (ApiResponseMessage?.data) {
      setIsLoading(false);
      if (ApiResponseMessage?.data[0]?.reasonStatus === "REJECTED") {
        setApiMessage(ApiResponseMessage?.data?.responseMessage);
        setApiStatus(true);
      } else {
        setApiMessage(ApiResponseMessage?.data?.responseMessage);
        setApiStatus(true);
      }
      fetchBlockCardRequest();
    } else if (ApiResponseMessage?.error) {
      setIsLoading(false);
      setApiStatus(false);
      setApproveError(true);
      setApiMessage(ApiResponseMessage?.message);
      fetchBlockCardRequest();
    }
  }, [ApiResponseMessage]);

  const addBlockCardRequestDetail = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.addBlockCardResponse
  );

  const fetchAddBlockCardRequest = useCallback(
    (body: any) => {
      try {
        dispatch(addBlockCardRequest(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (addBlockCardRequestDetail) {
      if (addBlockCardRequestDetail?.data) {
        if (addBlockCardRequestDetail?.data?.reasonStatus === "CREATED") {
          setApiMessage("Card Block Request Created Successfully");
          setApiStatus(true);
        }
        if (addBlockCardRequestDetail?.data?.reasonStatus === "APPROVED") {
          setApiMessage(ApiResponseMessage?.data?.responseMessage);
          setApiStatus(true);
        }
        setIsLoading(false);
        setTable(true);
        setIsLoadingData(false);
        SetAddBlockCard("");
        fetchBlockCardRequest();
      } else if (addBlockCardRequestDetail?.error) {
        setIsLoading(false);
        setApproveError(true);
        setErrorMessage(addBlockCardRequestDetail?.message);
        setIsLoadingData(false);
      }
    }
  }, [addBlockCardRequestDetail]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
      setErrorMessage("");
    }
  }, [apiMessage]);

  const updateBlockCardReq = useSelector(
    (state: RootStateOrAny) =>
      state.BlockCardRequestReducer?.updateBlockCardResponse
  );

  useEffect(() => {
    if (updateBlockCardReq) {
      if (updateBlockCardReq?.data) {
        setIsLoading(false);
      } else if (updateBlockCardReq?.error) {
        setIsLoading(false);
        setApiStatus(false);
        setApiMessage(updateBlockCardReq?.message);
      }
    }
  }, [updateBlockCardReq]);
  const OnClickTransaction = (data: any) => {
    const mobileNumber = data?.primaryMobileNumber;
    props.history.push({
      pathname: "/dashboard/SRF/View-Block-Customer",
      state: {
        value: {
          id: mobileNumber,
          cardOperation: true,
        },
      },
    });
  };

  let blockCardHeader = [
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
          a.primaryMobileNumber.localeCompare(b.primaryMobileNumber),
      },
    },
    {
      title: "Pan Number",
      dataIndex: "panLastFourdigits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.panLastFourdigits.localeCompare(b.panLastFourdigits),
      },
    },
    {
      title: "Card Expiry Date",
      dataIndex: "cardExpiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardExpiryDate.localeCompare(b.cardExpiryDate),
      },
    },
    {
      title: "Request Reason Code",
      dataIndex: "reasonCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.reasonCode.localeCompare(b.reasonCode),
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
              value === "APPROVED"
                ? "text-success"
                : "ERROR"
                ? "text-danger"
                : "CREATED"
                ? "text-warning"
                : "text-danger"
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
          a.accountingErrorMsg?.localeCompare(b.accountingErrorMsg),
      },
      render: (errorMsg: any) => {
        return <>{errorMsg ? `${errorMsg}` : "-"}</>;
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
        compare: (a: any, b: any) => a.checkerName.localeCompare(b.checkerName),
      },
      render: (id: any) => {
        return <>{id ? `${id}` : "-"}</>;
      },
    },
  ];

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setfilterOption(false);
    setcolumns([]);
    setSearchArea(false);
    setPrint(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
    setSearchArea(false);
  };
  const data = blockCardListData?.data?.filter((e: any) => {
    return e.reasonStatus === "CREATED";
  });
  const nonCreate = blockCardListData?.data?.filter((e: any) => {
    return e.reasonStatus !== "CREATED";
  });
  const result = data?.concat(nonCreate);
  let newBlockCardDatas = result?.map((details: any, index: any) => {
    const mapReasonCode = (code: any) => {
      switch (code) {
        case "FR":
          return "Fraud";
        case "LC":
          return "Lost card";
        case "OT":
          return "Others";
        case "SC":
          return "Stolen card";
        case "TB":
          return "Temporary block";
        default:
          return;
      }
    };
    return {
      ...details,
      key: index,
      reasonCode: mapReasonCode(details.reasonCode),
      cardExpiryDate:
        details.cardExpiryDate.slice(0, 2) +
        "/" +
        details.cardExpiryDate.slice(2),
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

  let approveId = transactionStatusId?.map((e: any) => {
    return e.id;
  });

  const blockCardUserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );

  console.log("blockCardUserAccess", blockCardUserAccess);

  let makerRes = blockCardUserAccess?.data;
  let blockMakerAdd = false;
  let blockChecker = false;

  makerRes?.forEach((res: any) => {
    if (res.approvalLevelOne === true) {
      blockChecker = true;
    } else if (res.add === true) {
      blockMakerAdd = true;
    }
  });

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("SRF_CARD_BLOCK"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  const submitHandlers = (value: any, reason: any) => {
    closeMessage();

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
          fetchResponseMessage(body);
        } else {
          var data = JSON.stringify({
            id: approveId,
            reasonStatus: "APPROVE",
            approverRemarks: reason,
          });
          // fetchApproveBlockCard(data);
          fetchResponseMessage(data);
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
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setSearchArea(false);
    setPrint(!toPrint);
  };

  const viewUser = (e: any) => {
    props.history.push({
      pathname: "/dashboard/SRF/View-Block-Card-Request",
      state: e,
    });
  };

  const editUser = (e: any) => {
    setCardDetail(e);
    SetAddBlockCard("edit");
  };

  const handleAdd = () => {
    SetAddBlockCard("add");
    setApiMessage("");
    setIsLoadingData(false);
    fetchRestCustomerBlockCardDetails();
    fetchResetToggleDetails();
  };

  const handleSubmit = () => {
    setfilterOption(false);
    setFilteredArea(true);
    setTable(true);
  };

  const handleSearchReset = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };

  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    setIsfiltered(true);
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      newBlockCardDatas = newBlockCardDatas.filter((e: any | BlockCardInfo) => {
        return (
          e.customerName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.primaryMobileNumber
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.cardExpiryDate
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.reasonStatus
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.accountingErrorMsg
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.requestChannel
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.createdBy?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.approverId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.reasonCode?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      newBlockCardDatas = newBlockCardDatas.filter((e: any | BlockCardInfo) => {
        if (
          e[searchCategory]
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const fetchRestCustomerBlockCardDetails = useCallback(() => {
    try {
      dispatch(resetCustomerDetail());
    } catch (err) {}
  }, [dispatch]);
  const fetchResetToggleDetails = useCallback(() => {
    try {
      dispatch(resetToggle());
    } catch (err) {}
  }, [dispatch]);

  const onCancel = () => {
    SetAddBlockCard("");
    setErrorMessage("");
    fetchBlockCardRequest();
    fetchRestCustomerBlockCardDetails();
  };

  const handleChange = (e: any) => {
    setFilterDetail({ ...filterDetail, [e.target.name]: e.target.value });
  };

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };

  const handleBlockConfirmation = (e: any) => {
    setIsLoadingData(true);
    if (addBlockCard === "add") {
      fetchAddBlockCardRequest(e);
      setCardDetail("");
    }
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.apiMessage !== undefined &&
      location.state.apiMessage === "Request rejected successfully"
    ) {
      setApiStatus(true);
      setApiMessage(location.state.apiMessage);
    }
  }, [location]);


  return (
    <div className="p-4">
      {!addBlockCard && (
        <>
          <CommonHeaderSummary
            RightContent={"Block Card Request"}
            SummaryFileName={"Block Card Request"}
            searchArea={toggleSearch}
            search={searchArea}
            Refresh={true}
            List={true}
            Add={blockMakerAdd}
            AddAction={handleAdd}
            refresh={toggleRefresh}
            Print={handlePrint}
            ListData={handleList}
            SummaryColumn={
              orginalColumns.length > 0 ? orginalColumns : blockCardHeader
            }
            TableData={
              Array.isArray(newBlockCardDatas)
                ? newBlockCardDatas
                : [newBlockCardDatas]
            }
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
            <div className="colorWhite block-card-section mt-3 p-3">
              <p className="blockTitle">Filter</p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail">
                        Mobile No{" "}
                        <span className="container-body-label-color">*</span>
                      </Label>
                      <Input
                        type="number"
                        name="primaryMobileNumber"
                        className="formRadiusBlock"
                        placeholder="Enter Mobile Number"
                        value={filterDetail.primaryMobileNumber}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail">Request Status </Label>
                      <Input
                        type="select"
                        name="reasonStatus"
                        className="formRadiusBlock form-select"
                        value={filterDetail.reasonStatus}
                        onChange={handleChange}
                      >
                        <option></option>
                        <option value="ATM Retains">ATM Retains</option>
                        <option value="Counterfiet">Counterfiet</option>
                        <option value="Fraud">Fraud</option>
                        <option value="Lost Card">Lost Card</option>
                        <option value="Others">Others</option>
                        <option value="Stolen Card">Stolen Card</option>
                        <option value="Temporary Block">Temporary Block</option>
                        <option value="Travelling">Travelling</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="container-fluid buttonPositionBlock col">
                    <SubmitCancelButton
                      button={"Submit"}
                      secondButton={"Reset"}
                      onSubmit={handleSubmit}
                      onCancel={props.onCancel}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {filteredArea && <FiltersSelected value={filterDetail} />}
          {searchArea && (
            <div className="d-flex user-search mt-3 p-3 cursor">
              <select
                className=" form-select user-search-drop cursor"
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
                  Pan Number
                </option>
                <option value="accountingErrorMsg" className="cursor">
                  Host Error Message
                </option>
                <option value="reasonCode" className="cursor">
                  Request Reason Code
                </option>
                <option value="reasonStatus" className="cursor">
                  Request Status
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
                <Button color="danger" className="btn btn-danger btn--sizer">
                  Search
                </Button>
              </div>
              <div>
                <Button
                  className="text-white  border-0 ms-1"
                  onClick={handleSearchReset}
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
              {" "}
              <div className="mt-3" ref={componentRef}>
                <Form form={form} component={false}>
                  {table && (
                    <CustomHeader
                      TableData={columns.length > 0 ? columns : blockCardHeader}
                      rowSelection={blockChecker ? rowSelection : !rowSelection}
                      dataSources={newBlockCardDatas}
                      columns={blockCardHeader}
                      handlesubmit={submitHandlers}
                      reasonError={reasonError}
                      viewUser={viewUser}
                      view={true}
                      isFiltered={isFiltered}
                      editUser={editUser}
                      disableCustomRowSelection={!disableSubmit}
                      approval={
                        toPrint || transactionStatusId.length !== 0
                          ? !blockChecker
                            ? false
                            : true
                          : false
                      }
                      reason={true}
                      DisableMange={
                        columns.length > 0 && toPrint ? true : false
                      }
                      CustomTableHeader={
                        Array.isArray(newBlockCardDatas)
                          ? newBlockCardDatas
                          : [newBlockCardDatas]
                      }
                      toPrint={columns.length > 0 && toPrint ? true : false}
                    />
                  )}
                </Form>
              </div>
            </>
          )}
        </>
      )}
      {addBlockCard && (
        <AddBlockCardRequest
          showAddBlockCard={addBlockCard}
          cardDetail={cardDetail}
          submitHandler={handleBlockConfirmation}
          onCancel={onCancel}
          message={errorMessage}
          isLoadingData={isLoadingData}
        />
      )}
    </div>
  );
};

export default BlockCardRequest;
