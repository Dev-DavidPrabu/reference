import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Button, FormGroup, Input, Label } from "reactstrap";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import { FaReply } from "react-icons/fa";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { useReactToPrint } from "react-to-print";
import "./CardUpgrade.scss";
import AddCardUpgrade from "../../Components/AddCardUpgrade/AddCardUpgrade";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  addUpgradeCardRequest,
  approveUpgradeStatus,
  getUpgradeCardRecords,
  rejectUpgradeStatus,
  resetCardUpgradeCustomerDetail,
  resetGetMobileNumberUpgrade,
  resetVerifyDetail,
} from "../../redux/action/CardUpgradeAction";
import { CardUpGradeModel } from "../../models/CardUpgradeModel";
import { getUserAccess } from "../../redux/action/CardUnBlockAction";

const CardUpgrade = (props: any) => {
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [tableShow, setTableShow] = useState(true);
  const [addCardUpgrade, setAddCardUpgrade] = useState("");
  const [isSearchShows, setIsSearchShows] = useState(false);
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState("");
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState("");
  const [transactionStatusId, setTransactionStatusId] = useState([]);
  const [cardStatus, setCardStatus] = useState(true);
  const [fixError, setFixError] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [addApiError, setAddApiError] = useState("");
  const [hiddenMaker, setHiddenMaker] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNo: "",
    cardl4d: "",
    requestReasonCode: "",
    requestStatus: "",
    requestChannel: "",
    inputOperator: "",
    checkerName: "",
  });
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;

  const upgradeCardListData = useSelector(
    (state: RootStateOrAny) =>
      state.CardUpgradeReducer?.getUpgradeCardRequestResponse
  );

  const fetchUpgradeCardRequest = useCallback(async () => {
    try {
      dispatch(getUpgradeCardRecords());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (upgradeCardListData?.data) {
      setIsLoading(false);
    } else if (!upgradeCardListData?.data) {
      setIsLoading(true);
    }
  }, [upgradeCardListData]);

  useEffect(() => {
    fetchUpgradeCardRequest();
    fetchRestCustomerCardUpgradeDetails();
  }, [fetchUpgradeCardRequest]);

  const blockCardUserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("CARD_UPGRADE"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

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

  const approveUpgradeCardRequest = useSelector(
    (state: RootStateOrAny) =>
      state.CardUpgradeReducer?.approveUpgradeCardResponse
  );

  const fetchApproveUpgradeCard = useCallback(
    (body: any) => {
      try {
        dispatch(approveUpgradeStatus(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (approveUpgradeCardRequest) {
      if (approveUpgradeCardRequest?.data) {
        setIsLoading(false);
        setCardStatus(true);
        setApiMessage("Approved successfully");
        fetchUpgradeCardRequest();
      } else if (approveUpgradeCardRequest?.error) {
        setIsLoading(false);
        setCardStatus(false);
        setFixError(true);
        setApiMessage(approveUpgradeCardRequest?.message);
      }
    }
  }, [approveUpgradeCardRequest]);

  const rejectUpgradeCardRequest = useSelector(
    (state: RootStateOrAny) =>
      state.CardUpgradeReducer?.rejectUpgradeCardResponse
  );

  const fetchRejectUpgradeCard = useCallback(
    (data: any) => {
      try {
        dispatch(rejectUpgradeStatus(data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (rejectUpgradeCardRequest) {
      if (rejectUpgradeCardRequest?.data) {
        setIsLoading(false);
        setCardStatus(true);
        setApiMessage("Request Rejected successfully");
        fetchUpgradeCardRequest();
      } else if (rejectUpgradeCardRequest?.error) {
        setIsLoading(false);
        setCardStatus(false);
        setFixError(true);
        setApiMessage(rejectUpgradeCardRequest?.message);
      }
    }
  }, [rejectUpgradeCardRequest]);

  useEffect(() => {
    makerRes?.forEach((res: any) => {
      if (
        res?.add === true ||
        res?.delete === true ||
        res?.edit === true ||
        res?.view === true
      ) {
        setHiddenMaker(true);
      } else {
        setHiddenMaker(false);
      }
    });
  }, [makerRes]);
  const addUpgradeCardRequestDetail = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer?.addUpgradeCardResponse
  );

  const fetchAddUpgradeCardRequest = useCallback(
    (body: any) => {
      try {
        dispatch(addUpgradeCardRequest(body));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (addUpgradeCardRequestDetail) {
      if (addUpgradeCardRequestDetail?.data) {
        if (addUpgradeCardRequestDetail?.data?.reasonStatus === "CREATED") {
          setApiMessage("Card Upgrade Request Created Successfully");
          setCardStatus(true);
        }
        if (addUpgradeCardRequestDetail?.data?.reasonStatus === "APPROVED") {
          setApiMessage("Approved Successfully");
          setCardStatus(true);
        }
        setIsLoading(false);
        setIsLoadingData(false);
        setTableShow(true);
        setAddCardUpgrade("");
        fetchUpgradeCardRequest();
      } else if (addUpgradeCardRequestDetail?.error) {
        setIsLoading(false);
        setCardStatus(false);
        setFixError(true);
        setIsLoadingData(false);
        setAddApiError(addUpgradeCardRequestDetail?.message);
      }
    }
  }, [addUpgradeCardRequestDetail]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage]);
  const [tableColumnEligable, setTableColumnEligable] = useState<Array<{}>>([]);

  const onClickEligble = (record: any, e: any) => {
    const value = parseInt(e.target.value);

    if (value === 1) {
      setTableColumnEligable((prev: any) => {
        return [
          ...prev,
          { id: record?.id, walletLevel: record?.eligibleWalletLevel },
        ];
      });
    } else if (value === 2) {
      setTableColumnEligable((prev: any) => {
        return [
          ...prev,
          { id: record?.id, walletLevel: record?.requestedWalletLevel },
        ];
      });
    }
  };

  let tableEligiablevalue: { id: any; walletLevel: any }[] = [];
  const unselectEligiable = (record: any) => {
    record.forEach(function (item: any, index: any) {
      let value = {
        id: record[index]?.id,
        walletLevel: record[index]?.eligibleWalletLevel,
      };
      tableEligiablevalue.push(value);
    });
  };

  const RemoveDuplicates = (array: any, key: any) => {
    return array.reduce((arr: any, item: any) => {
      const removed = arr.filter(
        (i: { [x: string]: any }) => i[key] !== item[key]
      );
      return [...removed, item];
    }, []);
  };

  const OnClickTransaction = (data: any) => {
    const mobileNumber = data?.primaryMobileNumber;
    props.history.push({
      pathname: "/dashboard/SRF/Card-Upgrade-View-Customer",
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
          a.primaryMobileNumber.localeCompare(b.primaryMobileNumber),
      },
    },
    {
      title: "PAN",
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
      title: "Request Channel",
      dataIndex: "requestChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestChannel?.localeCompare(b.requestChannel),
      },
    },
    {
      title: "Maker Name",
      dataIndex: "makerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.makerName?.localeCompare(b.makerName),
      },
    },
    {
      title: "Checker Name",
      dataIndex: "checkerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.checkerName?.localeCompare(b.checkerName),
      },
    },
    {
      title: "Id Doc Type",
      dataIndex: "srfIdTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.srfIdTypeCode?.localeCompare(b.srfIdTypeCode),
      },
    },
    {
      title: "Existing Wallet Size",
      dataIndex: "existingWalletName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.existingWalletName?.localeCompare(b.existingWalletName),
      },
    },

    {
      title: "Eligible Wallet Size",
      dataIndex: "eligibleWalletName",
      checked: true,
      hidden: hiddenMaker,
      sorter: {
        compare: (a: any, b: any) =>
          a.eligibleWalletName?.localeCompare(b.eligibleWalletName),
      },
      render: (status: any, record: any) => {
        return (
          <>
            <div className="d-flex align-items-center">
              {record.reasonStatus === "APPROVED" ||
              record.reasonStatus === "REJECTED" ||
              hiddenMaker === true ? (
                ""
              ) : (
                <input
                  type="radio"
                  name={record?.id}
                  value={"1"}
                  onChange={(e) => onClickEligble(record, e)}
                />
              )}
              {status}
            </div>
          </>
        );
      },
    },
    {
      title: "Requested Wallet Size",
      dataIndex: "requestedWalletName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestedWalletName?.localeCompare(b.requestedWalletName),
      },
      render: (data: any, record: any) => {
        return (
          <>
            <div className="d-flex align-items-center">
              {record.reasonStatus === "APPROVED" ||
              record.reasonStatus === "REJECTED" ||
              hiddenMaker === true ? (
                ""
              ) : (
                <>
                  {" "}
                  <input
                    type="radio"
                    name={record?.id}
                    value={"2"}
                    onChange={(e) => onClickEligble(record, e)}
                  />
                </>
              )}
              {data}
            </div>
          </>
        );
      },
    },
    {
      title: "Approved Wallet Size",
      dataIndex: "upgradeWalletName",
      checked: true,
      hidden: hiddenMaker,
      sorter: {
        compare: (a: any, b: any) =>
          a.upgradeWalletName?.localeCompare(b.upgradeWalletName),
      },
    },
  ].filter((item: any) => !item.hidden);

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
    setIsSearchShows(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
    setIsSearchShows(false);
  };

  const handleAdd = () => {
    setAddCardUpgrade("add");
    setIsLoadingData(false);
    fetchRestCustomerCardUpgradeDetails();
    fetchRestCustomerDetails();
  };

  const fetchRestCustomerCardUpgradeDetails = useCallback(() => {
    try {
      dispatch(resetGetMobileNumberUpgrade());
    } catch (err) {}
  }, [dispatch]);
  const fetchRestCustomerDetails = useCallback(() => {
    try {
      dispatch(resetCardUpgradeCustomerDetail());
    } catch (err) {}
  }, [dispatch]);

  const restData = useSelector(
    (state: RootStateOrAny) => state.CardUpgradeReducer?.getVerfiyDetailResponse
  );

  const fetchResetResponse = useCallback(() => {
    try {
      dispatch(resetVerifyDetail());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchResetResponse();
  }, [fetchResetResponse]);

  const onCancel = () => {
    setAddCardUpgrade("");
    fetchRestCustomerCardUpgradeDetails();
    fetchRestCustomerDetails();
    setApiMessage("");
  };

  let newCardDatas = upgradeCardListData?.data.map((data: any, index: any) => {
    return {
      ...data,
      key: index,
      cardExpiryDate:
        data.cardExpiryDate.slice(0, 2) + "/" + data.cardExpiryDate.slice(2),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      
      setTransactionStatusId(selectedRows);
      setApiMessage("");
      let ownMaker = selectedRows.filter((request: any) => {
        if (request.createdBy === makerDetail) {
          return true;
        }
        return false;
      });
      if (ownMaker.length > 0) {
        setCardStatus(false);
        setFixError(true);
        setDisableSubmit(true);
        setApiMessage("Maker can't approve his own request.");
      } else {
        setApiMessage("");
        setDisableSubmit(false);
      }
    },
    getCheckboxProps: (record: any) => ({
      walletId: record?.walletId,
      disabled: record?.reasonStatus !== "CREATED",
    }),
  };

  const viewUser = (e: any) => {
    props.history.push({
      pathname: "/dashboard/SRF/Card-Upgrade-View-Details",
      state: e,
    });
  };

  const submitHandler = (value: any) => {
    setIsLoadingData(true);
    var body = JSON.stringify({
      primaryMobileNumber: value.primaryMobileNumber,
      reqWalletResponse: value.reqWalletResponse,
      srfIdTypeCode: value.srfIdTypeCode,
      srfIdTypeCodeDescription: value.srfIdTypeCodeDescription,
      srfIdValue: value.srfIdValue,
      srfCardworksIdtypeMapping: value.srfCardworksIdtypeMapping,
      srfNewIdDate: value.srfNewIdDate,
      srfNewIdExpiryDate: value.srfNewIdExpiryDate,
      srfFrontDocumentContent: value.srfFrontDocumentContent,
      srfBackDocumentContent: value.srfBackDocumentContent,
      srfPhotoContent: value.srfPhotoContent,
      srfPrStatus: value.srfPrStatus,
      srfVisaValue: value.srfVisaValue,
      srfImmigrationVisaExpiryDate: value.srfImmigrationVisaExpiryDate,
      walletResponse: value.walletResponse,
      srfCustomerSignatureFile: value.srfCustomerSignatureFile,
      srfIsDocumentOriginal: value.srfIsDocumentOriginal,
    });
    fetchAddUpgradeCardRequest(body);
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  const handleClick = () => {
    setfilterOption(false);
    setFilteredArea(true);
    setTableShow(true);
  };
  const resetFilter = () => {
    setFilterValue({
      mobileNo: "",
      cardl4d: "",
      requestReasonCode: "",
      requestStatus: "",
      requestChannel: "",
      inputOperator: "",
      checkerName: "",
    });
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      newCardDatas = newCardDatas?.filter((e: any | CardUpGradeModel) => {
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
          e.makerName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.existingWalletName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.requestedWalletName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.upgradeWalletName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.checkerName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.reasonStatus
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.requestChannel
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.eligibleWalletName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      newCardDatas = newCardDatas?.filter((e: any | CardUpGradeModel) => {
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

  const submitHandlers = (status: any, reason: any) => {
    closeMessage();
    if (transactionStatusId.length > 0) {
      if (tableColumnEligable.length === 0) {
        if (status === "Reject") {
          unselectEligiable(transactionStatusId);
          var data = JSON.stringify({
            reasonStatus: "REJECT",
            approverRemarks: reason,
            srfUpgradeRequests: RemoveDuplicates(tableEligiablevalue, "id"),
          });
          fetchRejectUpgradeCard(data);
          setIsLoading(true);
          setTransactionStatusId([]);
        } else {
          setCardStatus(false);
          setFixError(true);
          setApiMessage(
            "Select one Eligible Product Name or Requested Product Name"
          );
        }
      } else if (status === "Approve") {
        var body = JSON.stringify({
          reasonStatus: "APPROVE",
          approverRemarks: reason,
          srfUpgradeRequests: RemoveDuplicates(tableColumnEligable, "id"),
        });
        fetchApproveUpgradeCard(body);
        setIsLoading(true);
        setTransactionStatusId([]);
      } else if (status === "Reject") {
        var data = JSON.stringify({
          reasonStatus: "REJECT",
          approverRemarks: reason,
          srfUpgradeRequests: RemoveDuplicates(tableColumnEligable, "id"),
        });
        fetchRejectUpgradeCard(data);
        setIsLoading(true);
        setTransactionStatusId([]);
      }
    } else if (transactionStatusId.length === 0) {
      setCardStatus(false);
      setFixError(true);
      setApiMessage("Select Atleast one transaction");
    } else if (blockMakerAdd === true) {
      setApiMessage("Maker can't perform this action.");
      setCardStatus(false);
    }
  };

  return (
    <div className="p-4">
      {!addCardUpgrade && (
        <>
          <CommonHeaderSummary
            RightContent={"Upgrade Wallet Size Request"}
            SummaryFileName={"Upgrade Wallet Size Request"}
            searchArea={toggleSearch}
            search={isSearchShows}
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
              apiStatus={cardStatus}
              closeMessage={() => closeMessage()}
              message={apiMessage}
              errorFix={fixError}
            />
          )}
          {filterOption && (
            <div className="cardUpgradeFilterSection mt-3 p-3">
              <div className="d-flex justify-content-between">
                <p className="cardUpgradeFilter">Filter</p>
              </div>
              <div className="container-fluid">
                <div className="row ">
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardUpgradeLabel">
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
                      <Label for="exampleEmail" className="cardUpgradeLabel">
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
                      <Label for="exampleEmail" className="cardUpgradeLabel">
                        Eligible Product Name
                      </Label>
                      <Input
                        type="select"
                        name="requestReasonCode"
                        className="formRadiusBank form-select"
                        value={filterValue.requestReasonCode}
                        onChange={handleFilterChange}
                      >
                        <option>Select Eligible Prod</option>
                        <option>Gold</option>
                        <option>Silver</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardUpgradeLabel">
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
                      <Label for="exampleEmail" className="cardUpgradeLabel">
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
                      <Label for="exampleEmail" className="cardUpgradeLabel">
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
                      <Label for="exampleEmail" className="cardUpgradeLabel">
                        Approver ID
                      </Label>
                      <Input
                        type="text"
                        name="checkerName"
                        className="formRadiusBank"
                        placeholder="Enter Approver ID"
                        value={filterValue.checkerName}
                        onChange={handleFilterChange}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col d-flex justify-content-end cardUpgradebuttonDiv">
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
                  Pan Number
                </option>
                <option value="cardExpiryDate" className="cursor">
                  Card Expiry Date
                </option>
                <option value="reasonStatus" className="cursor">
                  Request Status
                </option>
                <option value="requestChannel" className="cursor">
                  Request Channel
                </option>
                <option value="makerName" className="cursor">
                  Maker Name
                </option>
                <option value="checkerName" className="cursor">
                  Checker Name
                </option>
                <option value="existingWalletName" className="cursor">
                  Existing Product Name
                </option>
                <option value="eligibleWalletName" className="cursor">
                  Eligible Product Name
                </option>
                <option value="requestedWalletName" className="cursor">
                  Requested Product Name
                </option>
                <option value="upgradeWalletName" className="cursor">
                  Approved Product Name
                </option>
                <option value="idTypeCode" className="cursor">
                  Id Doc Type
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
                      viewUser={viewUser}
                      view={true}
                      approval={toPrint || !blockChecker ? false : true}
                      productApprove={false}
                      reason={true}
                      CustomTableHeader={newCardDatas}
                      disableCustomRowSelection={!disableSubmit}
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
      {addCardUpgrade && (
        <AddCardUpgrade
          showAddUnBlockCard={addCardUpgrade}
          submitHandler={submitHandler}
          onCancel={onCancel}
          isLoadingData={isLoadingData}
          message={addApiError}
        />
      )}
    </div>
  );
};

export default CardUpgrade;
