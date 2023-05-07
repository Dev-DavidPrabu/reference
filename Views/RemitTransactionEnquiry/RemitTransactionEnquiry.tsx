import { useCallback, useEffect, useRef, useState } from "react";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import { useHistory } from "react-router";
import { TiArrowBackOutline } from "react-icons/ti";
import "./RemitTransactionEnquiry.scss";
import { Form, Input } from "antd";
import { BsEye } from "react-icons/bs";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { EditableCellProps } from "../../models/NotificationMasterModel";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  approveStatusRemark,
  getBackDocument,
  getFrontDocument,
  getTransferRecordsByID,
  getComplainceInfo,
  updateMatchType,
  getAuditConfirmMatchInfo,
  processTransaction,
  UpdateCwFailedEdit,
  resetStatusResponse,
} from "../../redux/action/RemitTransactionProcessingAction";
import { Modal, ModalBody } from "reactstrap";
import { Select } from "antd";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { ApiEndPoints } from "../../Constants/Constants";
import CustomButton from "../../Components/UI/CustomButton";
import { BiCollapse } from "react-icons/bi";

const { Option } = Select;

function RemitTransactionEnquiry(props: any) {
  const history = useHistory();
  let thistory: any = history?.location?.state;
  const [transactionId, setTransactionId] = useState("");
  const [MoveElement, setMoveElement] = useState(false);
  const dispatch = useDispatch();
  const [setSelectedFile] = useState(Object);
  const [cardStatus, setCardStatus] = useState("");
  const [expanAll, setExpandAll] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedRowId, setSelectedRowId] = useState("");
  const [isNotError, setIsNotError] = useState(true);
  const [confirm, setConfirm] = useState({
    senderConfirm: false,
    onBehalfSenderConfirm: false,
    senderSanctionConfirm: false,
    onBehalfSanctionConfirm: false,
  });
  const [normalMatch, setNormalMatch] = useState({
    senderNormal: false,
    onBehalfSenderNormal: false,
    senderSanctionNormal: false,
    onBehalfSanctionNormal: false,
  });
  const [disableConfirm, setDisableConfirm] = useState({
    senderConfirm: false,
    onBehalfSenderConfirm: false,
    senderSanctionConfirm: false,
    onBehalfSanctionConfirm: false,
  });
  const [disableNormal, setDisableNormal] = useState({
    senderNormal: false,
    onBehalfSenderNormal: false,
    senderSanctionNormal: false,
    onBehalfSanctionNormal: false,
  });
  const [filterFunction, setFilterFunction] = useState({
    startDate: "",
    endDate: "",
    transactionStatusList: [],
    remitStatusList: [],
    receiverCountryList: [],
    paymentMethodList: [],
  });
  const [approveAction, setApproveAction] = useState(false);
  const [isAnyRowSelected, setIsAnyRowSelected] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [retryStatus, setRetryStatus] = useState(false);
  const [retryMsg, setRetryMessage] = useState("");
  const [pepsStatus, setPepsStatus] = useState(false);
  const [pepsMessage, setPepsMessage] = useState("");
  const [onBehalfPepsMessage, setOnbehalfPepsMessage] = useState("");
  const [onBehalfSanctionMessage, setOnbehalfSanctionMessage] = useState("");
  const [sanctionMessage, setSanctionMessage] = useState("");
  const [onBehalfPepsStatus, setOnBehalfPepsStatus] = useState(false);
  const [onBehalfSanctionStatus, setOnBehalfSanctionStatus] = useState(false);

  const [SanctionStatus, setSanctionStatus] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMatch, setIsloadingMatch] = useState(false);
  const [viewApprove, setViewApprove] = useState(true);
  const [approveOptions, setApproveOptions] = useState<Array<string>>([]);
  const [onBehalfSenderId, setOnBehalfSenderId] = useState("");
  const [senderId, setSenderId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [Cwremarks, setcwRemarks] = useState("");
  const [senderUpdateData, setSenderUpdateData] = useState([]);
  const [onBehalfSenderUpdateData, setOnBehalfSenderUpdateData] = useState([]);
  const [img, setImg] = useState<any>();
  const [imgBack, setImgBack] = useState<any>();
  const [onBehalfSenderConfirmMatch, setOnBehalfSenderConfirmMatch] =
    useState(false);
  const [senderConfirmMatch, setSenderConfirmMatch] = useState(false);
  const [
    onBehalfSenderSanctionConfirmMatch,
    setOnBehalfSenderSanctionConfirmMatch,
  ] = useState(false);
  const [senderSanctionConfirmMatch, setSenderSanctionConfirmMatch] =
    useState(false);
  const [infoValue, setInfoValue] = useState({
    senderPepsList: [],
    senderSanctionList: [],
    onbehalfSenderPepsList: [],
    onbehalfSenderSanctionList: [],
  });
  const [pepsValue, setPepsValue] = useState([]);
  const [sanctionValue, setSanctionValue] = useState([]);
  const [pepsOnBehalfValue, setPepsOnBehalfValue] = useState([]);
  const [sanctionOnBehalfValue, setSanctionOnBehalfValue] = useState([]);
  const [transactionRef, setTransactionRef] = useState("");
  const auditConfirmMatchInfo = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getAuditConfirmMatchInfo
  );
  const CwFailedCustomerTransaction = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getCustomerCwFailed
  );

  const TransactionDetailData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getTransferRecordsByIdResponse
  );
  const complainceSenderInfoResponse = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getComplainceSenderInfo
  );

  let transactionInfo = complainceSenderInfoResponse?.data;
  useEffect(() => {
    if (complainceSenderInfoResponse?.data) {
      setInfoValue(complainceSenderInfoResponse?.data);
    }
  }, [complainceSenderInfoResponse]);

  useEffect(() => {
    if (infoValue) {
      if (infoValue.senderPepsList && infoValue.senderPepsList.length > 0) {
        setPepsValue(infoValue.senderPepsList);
        let value = {
          confirmMatch: false,
          normalMatch: false,
        };
        value = infoValue.senderPepsList[0];
        if (value?.confirmMatch) {
          setConfirm({ ...confirm, senderConfirm: true });
          setDisableNormal({ ...disableNormal, senderNormal: true });
        } else if (value?.normalMatch) {
          setNormalMatch({ ...normalMatch, senderNormal: true });
          setDisableConfirm({ ...disableConfirm, senderConfirm: true });
        }
      } else {
        setPepsValue([]);
      }
      if (
        infoValue.senderSanctionList &&
        infoValue.senderSanctionList.length > 0
      ) {
        setSanctionValue(infoValue.senderSanctionList);
        let value = {
          confirmMatch: false,
          normalMatch: false,
        };
        value = infoValue.senderSanctionList[0];
        if (value?.confirmMatch) {
          setConfirm({ ...confirm, senderSanctionConfirm: true });
          setDisableNormal({ ...disableNormal, senderSanctionNormal: true });
        } else if (value?.normalMatch) {
          setNormalMatch({ ...normalMatch, senderSanctionNormal: true });
          setDisableConfirm({ ...disableConfirm, senderSanctionConfirm: true });
        }
      } else {
        setSanctionValue([]);
      }
      if (
        infoValue.onbehalfSenderPepsList &&
        infoValue.onbehalfSenderPepsList.length > 0
      ) {
        setPepsOnBehalfValue(infoValue.onbehalfSenderPepsList);
        let value = {
          confirmMatch: false,
          normalMatch: false,
        };
        value = infoValue.onbehalfSenderPepsList[0];
        if (value?.confirmMatch) {
          setConfirm({ ...confirm, onBehalfSenderConfirm: true });
          setDisableNormal({ ...disableNormal, onBehalfSenderNormal: true });
        } else if (value?.normalMatch) {
          setNormalMatch({ ...normalMatch, onBehalfSenderNormal: true });
          setDisableConfirm({ ...disableConfirm, onBehalfSenderConfirm: true });
        }
      } else {
        setPepsOnBehalfValue([]);
      }
      if (
        infoValue.onbehalfSenderSanctionList &&
        infoValue.onbehalfSenderSanctionList.length > 0
      ) {
        setSanctionOnBehalfValue(infoValue.onbehalfSenderSanctionList);
        let value = {
          confirmMatch: false,
          normalMatch: false,
        };
        value = infoValue.onbehalfSenderSanctionList[0];
        if (value?.confirmMatch) {
          setConfirm({ ...confirm, onBehalfSanctionConfirm: true });
          setDisableNormal({ ...disableNormal, onBehalfSanctionNormal: true });
        } else if (value?.normalMatch) {
          setNormalMatch({ ...normalMatch, onBehalfSanctionNormal: true });
          setDisableConfirm({
            ...disableConfirm,
            onBehalfSanctionConfirm: true,
          });
        }
      } else {
        setSanctionOnBehalfValue([]);
      }
    }
  }, [infoValue]);

  const frontImageInfo = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getFrontDocResponse
  );

  const backImageInfo = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getBackDocResponse
  );

  useEffect(() => {
    if (frontImageInfo?.data) {
      setImg(ApiEndPoints.onbehalfDocUrl + frontImageInfo?.data.contentCode);
    }
  }, [frontImageInfo]);

  useEffect(() => {
    if (backImageInfo?.data) {
      setImgBack(ApiEndPoints.onbehalfDocUrl + backImageInfo?.data.contentCode);
    }
  }, [backImageInfo]);

  const approveTransaction = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getApproveRemarkResponse
  );

  const TransactionChecker = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getProcessStatusResponse
  );

  const rejectTransaction = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getRejectRemarkResponse
  );

  const fetchTransferDetails = useCallback(
    async (id: any) => {
      try {
        dispatch(getTransferRecordsByID(id));
      } catch (err) {}
    },
    [dispatch]
  );
  const fetchFrontDoc = useCallback(
    async (id: any) => {
      try {
        dispatch(getFrontDocument(id));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchAuditConfirmMatch = useCallback(
    async (tid: any) => {
      try {
        dispatch(getAuditConfirmMatchInfo(tid));
      } catch (error) {}
    },
    [dispatch]
  );

  const fetchComplainceSenderInfoResponse = useCallback(
    async (value) => {
      try {
        dispatch(getComplainceInfo(value));
      } catch (error) {}
    },
    [dispatch]
  );

  const fetchBackDoc = useCallback(
    async (id: any) => {
      try {
        dispatch(getBackDocument(id));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchApproveStatusId = useCallback(
    async (transactionIds: any, remark: any, status: any) => {
      try {
        dispatch(approveStatusRemark(transactionIds, remark, status));
      } catch (err) {}
    },
    [dispatch]
  );

  const sentProcessStatus = useCallback(
    (transactionIds: any, processValue: string) => {
      try {
        dispatch(processTransaction(transactionIds, processValue));
      } catch (err) {}
    },
    [dispatch]
  );

  const submithandler = (statusValue: any) => {
    if (statusValue === "Approve" || statusValue === "Reject") {
      setIsLoading(true);
      fetchApproveStatusId(thistory?.transactionId[0], remarks, statusValue);
    } else {
      let process = "";
      if (statusValue === "Refund & Reject") {
        process = "Refund";
      } else {
        process = statusValue;
      }
      sentProcessStatus(thistory?.transactionId[0], process);
    }
  };

  const CwFailedSubmit = () => {
    let dataConstruct = {
      transactionId: thistory?.transactionId[0],
      remarks: Cwremarks,
    };
    dispatch(UpdateCwFailedEdit(dataConstruct));
  };
  let senderDetails = TransactionDetailData?.data?.senderDetails;
  let receicerInfo = TransactionDetailData?.data?.receiverInfo;
  let remittanceInfo = TransactionDetailData?.data?.remittanceInfo;
  let payOutGroupInfo = TransactionDetailData?.data?.payOutGroupInfo;
  let historyInfo = TransactionDetailData?.data?.transferHistoryInfo;
  let transferInfo = TransactionDetailData?.data?.transferInfo;
  let onBehalfSenderInfo = TransactionDetailData?.data?.onBehalfSenderInfo;
  let receiverId = receicerInfo?.receiverId;
  let newOnBehalfSenderInfo = {
    address: onBehalfSenderInfo?.address,
    contactNumber: onBehalfSenderInfo?.contactNumber,
    dateOfBirth: onBehalfSenderInfo?.dateOfBirth,
    employerName: onBehalfSenderInfo?.employerName,
    fullName: onBehalfSenderInfo?.fullName,
    id: onBehalfSenderInfo?.id,
    idTypeCode: onBehalfSenderInfo?.idTypeCode,
    idValue: onBehalfSenderInfo?.idValue,
    nationalityCode: onBehalfSenderInfo?.nationalityCode,
    occupationCode: onBehalfSenderInfo?.occupationCode || "Customer",
    remarks: onBehalfSenderInfo?.remarks,
    status: "Active",
    tid: transactionId,
    transactionId: thistory?.transactionId[0],
  };
  const checkLength = () => {
    if (senderDetails?.residentAddress1.length > 60) {
      setMoveElement(true);
    } else {
      setMoveElement(false);
    }
  };

  const resetResponse = useCallback(() => {
    dispatch(resetStatusResponse());
  }, [dispatch]);

  useEffect(() => {
    if (TransactionDetailData) {
      checkLength();
    }
  });

  const closeMessage = () => {
    setApiMessage("");
  };
  const closePepsMessage = () => {
    setPepsMessage("");
  };
  const RejectMessage = () => {
    setRetryStatus(false);
  };
  const closeOnbehalfPepsMessage = () => {
    setOnbehalfPepsMessage("");
  };
  const closeSanctionMessage = () => {
    setSanctionMessage("");
  };
  const closeOnbehalfSanctionMessage = () => {
    setOnbehalfSanctionMessage("");
  };

  useEffect(() => {
    if (props.location?.state?.id) {
      setTransactionId(props.location?.state?.id);
      //setTransactionRef(props.location?.state.transactionReference)
    } else {
      setTransactionId(props.location?.state?.tid);
      fetchTransferDetails(props.location?.state?.tid);
    }
  }, [
    props.location?.state,
    props.location?.state?.page,
    fetchTransferDetails,
  ]);

  useEffect(() => {
    if (TransactionChecker?.data) {
      setRetryStatus(true);
      if (TransactionChecker?.data?.hostErrorDetails === undefined) {
        setRetryMessage(TransactionChecker?.data?.transactionErrorDetails);
        setIsNotError(false);
      } else {
        setRetryMessage(TransactionChecker?.data?.hostErrorDetails);
        setIsNotError(false);
      }
    }
  }, [TransactionChecker, dispatch]);

  useEffect(() => {
    if (TransactionChecker?.message) {
      setRetryStatus(true);
      setRetryMessage(TransactionChecker?.message);
      setIsNotError(false);
      setTimeout(function () {
        setRetryStatus(false);
        dispatch(resetStatusResponse());
      }, 5500);
    }
  }, [TransactionChecker, dispatch]);

  useEffect(() => {
    if (approveTransaction?.data) {
      setApiMessage("Transaction Approved Successfully");
      setApiStatus(true);
      setIsLoading(false);
      setViewApprove(false);
    } else if (approveTransaction?.error) {
      setApiMessage(approveTransaction?.message);
      setApiStatus(false);
      setIsLoading(false);
      setViewApprove(false);
    }
  }, [approveTransaction]);

  useEffect(() => {
    if (rejectTransaction?.data) {
      setApiMessage("Transaction Rejected Successfully");
      setApiStatus(true);
      setIsLoading(false);
      setViewApprove(false);
    } else if (rejectTransaction?.error) {
      setApiMessage(rejectTransaction?.message);
      setApiStatus(false);
      setIsLoading(false);
      setViewApprove(true);
    }
  }, [rejectTransaction]);
  useEffect(() => {
    if (CwFailedCustomerTransaction?.data) {
      setApiMessage("Customer Cw Failed Successfully");
      setApiStatus(true);
    }
  }, [CwFailedCustomerTransaction]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage]);

  let old_fetchComplainceSenderInfoResponse: any;
  let old_onBehalfSenderInfo_id: any;
  let old_receiverId: any;
  let old_senderDetails_customerId: any;
  let old_thistory_transactionId: any;

  useEffect(() => {
    let body = {
      txnId: thistory?.transactionId[0],
      senderDetail: senderDetails?.customerId,
      onBehalfDetail: onBehalfSenderInfo?.id,
      receiverId: receiverId,
    };
    if (body.txnId && body.senderDetail && body.receiverId) {
      fetchComplainceSenderInfoResponse(body);
    }
  }, [
    fetchComplainceSenderInfoResponse,
    onBehalfSenderInfo?.id,
    receiverId,
    senderDetails?.customerId,
    thistory?.transactionId,
  ]);

  const fetchUpdateMatchType = useCallback(
    async (id: any, body: any, type: any) => {
      dispatch(updateMatchType(id, body, type));
    },
    [dispatch]
  );

  useEffect(() => {
    if (thistory?.cardStatus) {
      setCardStatus(thistory?.cardStatus);
    }
    if (thistory?.filterFunction) {
      setFilterFunction((prev) => {
        return { ...prev, ...thistory?.filterFunction };
      });
    }
  }, [thistory?.cardStatus, thistory?.filterFunction]);

  useEffect(() => {
    if (transactionId) {
      fetchTransferDetails(transactionId);
    }
    // if(transactionRef){
    //   fetchTransferDetails(transactionRef);
    // }
  }, [transactionId, fetchTransferDetails]);

  useEffect(() => {
    if (props?.location?.state.isDashBoardVisible === true) {
      props.location.state.isDashBoardVisible = false;
    }
  }, [props.location.state]);

  useEffect(() => {
    if (thistory?.remitStatus && thistory?.txnStatus) {
      let approve;
      if (
        thistory?.remitStatus === ("IN_PROCESS" || "ON_HOLD" || "CANCELLED")
      ) {
        if (
          thistory?.txnStatus === "PROCESSING" &&
          thistory?.remitStatus === "CANCELLED"
        ) {
          approve = false;
          setApproveOptions(["Refund & Reject"]);
        } else {
          approve = true;
        }
      } else if (thistory?.remitStatus === "SYSTEM_ERROR") {
        setApproveOptions(["Refund & Reject", "Retry"]);
        approve = false;
      } else if (
        thistory?.remitStatus === "INITIATED" &&
        thistory?.txnStatus === "SUBMITTED"
      ) {
        setApproveOptions(["Approve", "Reject"]);
        approve = false;
      } else {
        approve = true;
      }
      setApproveAction(approve);
    }
  }, [thistory?.remitStatus, thistory?.txnStatus]);

  const componentRef = useRef<any>();

  const handleEdit = () => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Edit-On-Behalf-Details",
      state: newOnBehalfSenderInfo,
    });
  };
  const handleExpand = () => {
    setExpandAll(!expanAll);
  };

  const handlenormalcheck = (e: any) => {
    setNormalMatch({
      ...normalMatch,
      [e.target.name]: e.target.checked,
    });

    fetchUpdateMatchType(selectedRowId, thistory?.transactionId[0], "normal");
    setApiMessage("");
  };

  const handleconfirmcheck = (e: any, type: any) => {
    if (!isAnyRowSelected && e.target.checked) {
      if (type === "peps") {
        setPepsStatus(false);
        setPepsMessage("Select Atleast One Record to Confirm Match");
      } else if (type === "behalfPeps") {
        setOnBehalfPepsStatus(false);
        setOnbehalfPepsMessage("Select Atleast One Record to Confirm Match");
      } else if (type === "sanction") {
        setSanctionStatus(false);
        setSanctionMessage("Select Atleast One Record to Confirm Match");
      } else {
        setOnBehalfSanctionStatus(false);
        setOnbehalfSanctionMessage(
          "Select Atleast One Record to Confirm Match"
        );
      }
    } else {
      if (e.target.checked) {
        setConfirm({
          ...confirm,
          [e.target.name]: e.target.checked,
        });
        setApiMessage("");

        fetchUpdateMatchType(selectedRowId, "", "confirm");
      }
    }
  };
  useEffect(() => {
    setOnBehalfSenderUpdateData([]);
    setSenderUpdateData([]);
    setOnBehalfSenderConfirmMatch(false);
    setSenderConfirmMatch(false);
    setSenderSanctionConfirmMatch(false);
  }, []);

  const statuschangehandler = (e: any) => {
    setStatus(e);
  };
  const customcwHandler = (e: any) => {};
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      if (selectedRows.length === 1 && selectedRows[0].onBehalfSenderId) {
        setSelectedRowId(selectedRows[0].id);
        setOnBehalfSenderId(selectedRows[0].onBehalfSenderId);
        setSenderId("");
      }

      if (selectedRows.length === 1 && selectedRows[0].senderId) {
        setSelectedRowId(selectedRows[0].id);
        setSenderId(selectedRows[0].senderId);
        setOnBehalfSenderId("");
      }
      if (selectedRows.length !== 0) {
        setIsAnyRowSelected(true);
      } else {
        setIsAnyRowSelected(false);
      }
    },
    hideSelectAll: true,
  };
  const tableHeader = [
    {
      title: "Sender Name",
      dataIndex: "sdnName",
      sorter: {
        compare: (a: any, b: any) => a.sdnName.localeCompare(b.sdnName),
      },
    },

    {
      title: "Resident of",
      dataIndex: "countryOrCountryOfRegistration",
      sorter: {
        compare: (a: any, b: any) =>
          a.countryOrCountryOfRegistration.localeCompare(
            b.countryOrCountryOfRegistration
          ),
      },
    },

    {
      title: "ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "Nationality",
      dataIndex: "countryOrCountryOfRegistration",
      sorter: {
        compare: (a: any, b: any) =>
          a.countryOrCountryOfRegistration.localeCompare(
            b.countryOrCountryOfRegistration
          ),
      },
    },
    {
      title: "DOB/YOB",
      dataIndex: "dateOfBirthOrIncorporation",
      sorter: {
        compare: (a: any, b: any) =>
          a.dateOfBirthOrIncorporation.localeCompare(
            b.dateOfBirthOrIncorporation
          ),
      },
    },
    {
      title: "PEPS Type",
      dataIndex: "amlCategory",
      sorter: {
        compare: (a: any, b: any) => a.amlCategory.localeCompare(b.amlCategory),
      },
    },
    {
      title: "Name Match %",
      dataIndex: "nameMatchPercent",
      sorter: {
        compare: (a: any, b: any) =>
          a.nameMatchPercent.localeCompare(b.nameMatchPercent),
      },
    },
    {
      title: "Overall Match %",
      dataIndex: "overallMatchPercent",
      sorter: {
        compare: (a: any, b: any) =>
          a.overallMatchPercent.localeCompare(b.overallMatchPercent),
      },
    },
    {
      title: "Country Of Registration",
      dataIndex: "countryOrCountryOfRegistration",
      sorter: {
        compare: (a: any, b: any) =>
          a.countryOrCountryOfRegistration.localeCompare(
            b.countryOrCountryOfRegistration
          ),
      },
    },
    {
      title: "SDN Name",
      dataIndex: "sdnName",
      sorter: {
        compare: (a: any, b: any) => a.sdnName.localeCompare(b.sdnName),
      },
    },
    {
      title: "SDN ID",
      dataIndex: "sdnId",
      sorter: {
        compare: (a: any, b: any) => a.sdnId.localeCompare(b.sdnId),
      },
    },
    {
      title: "Input Account No",
      dataIndex: "name",
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
    },
    {
      title: "Image URL",
      dataIndex: "name",
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
    },
  ];
  const historyHeader = [
    {
      title: "Trasnaction Status",
      dataIndex: "transactionStatusCode",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatusCode.localeCompare(b.transactionStatusCode),
      },
    },
    {
      title: "Created By",
      dataIndex: "updatedName",
      sorter: {
        compare: (a: any, b: any) => a.updatedName.localeCompare(b.updatedName),
      },
    },
    {
      title: "Date and Time",
      dataIndex: "updatedDate",
      sorter: {
        compare: (a: any, b: any) => a.updatedDate.localeCompare(b.updatedDate),
      },
    },
  ];

  const historyStateHeader = [
    {
      title: "Last Transaction date (DD/MM/YYYY) (HH:MM:SS) AM /PM",
      dataIndex: "updatedDate",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatusCode.localeCompare(b.transactionStatusCode),
      },
    },
    {
      title: "User ID",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.updatedName.localeCompare(b.updatedName),
      },
    },
  ];

  if (historyInfo === undefined) {
    historyInfo = {};
  }

  const tasks = Object.values(historyInfo);

  const onClickBack = () => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Remittance-Transaction-Processing",
      state: {
        filterFunction,
        cardStatus,
      },
      isDashBoardVisible:
        props.location?.state?.isDashBoardVisible === false ? false : true,
    });
    resetResponse();
  };

  const handleClickFront = () => {
    fetchFrontDoc(onBehalfSenderInfo?.id);
  };

  const [modal, setModal] = useState(false);
  const [modalBack, setModalBack] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleBack = () => setModalBack(!modalBack);
  const handleFromClick = () => {
    handleClickFront();
    toggle();
  };
  const handleBackImg = () => {
    fetchBackDoc(onBehalfSenderInfo?.id);
  };
  const handleBackClick = () => {
    handleBackImg();
    toggleBack();
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "dropdown" ? (
        <select
          name="display_address"
          className="border-0 p-2"
          // onChange={(e) => handleStatus(e)}
        >
          <option value={"false"}>InActive</option>
          <option value={"true"}>Active</option>
        </select>
      ) : dataIndex === "category" ? (
        <select
          name="display_address"
          className="border-0 p-2"
          // onChange={(e) => setCategory(e.target.value)}
        >
          <option value={"T"}>Topup</option>
          <option value={"SP"}>Spend-Money</option>
          <option value={"I"}>Important</option>
          <option value={"O"}>Others</option>
        </select>
      ) : (
        <Input />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  return (
    <div className="KYCViewCustomerProfile">
      <div className="p-3 d-flex justify-content-between">
        <h1 className="Enquiry-heading">
          Remittance Transaction Enquiry Details
        </h1>
        {/* <div className="backBtnDevice" onClick={onClickBack}>
          <TiArrowBackOutline
            style={{ margin: "auto 5px", marginRight: "10px" }}
          />{" "}
          Back
        </div> */}
        <div className="d-flex justify-content-end align-items-center flex-grow-1 pb-3">
          <CustomButton className="backBtnDevice" onClick={onClickBack}>
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
        {onBehalfSenderInfo && Object.keys(onBehalfSenderInfo).length !== 0 && (
          <div className={`d-flex ms-2 ${onBehalfSenderInfo ? "" : "d-none"}`}>
            <button className="editbuttonExpand" onClick={handleEdit}>
              Edit On Behalf details
            </button>
          </div>
        )}
      </div>

      <CommonEditSummary style={{ maxHeight: "fit-content" }} print={true}>
        <div className="px-3" ref={componentRef}>
          <div className="p-3">
            <div className="d-flex ms-2 justify-content-end">
              {!expanAll ? (
                <button className="editbuttonOn" onClick={handleExpand}>
                  {expanAll ? "Collapse All" : "Expand All"}
                </button>
              ) : (
                <div
                  className="d-flex justify-content-center cursor align-items-center enquiry-collapse"
                  onClick={handleExpand}
                >
                  <BiCollapse
                    style={{ margin: "auto 5px", marginRight: "5px" }}
                  />{" "}
                  Collapse All
                </div>
              )}
            </div>

            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="0"
              header="Sender Information"
            >
              <div className="account_container">
                <div>
                  <div>
                    <label className="inputLabelDetails">Name</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={senderDetails?.customerName}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">Address</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      style={{
                        width: `${
                          senderDetails?.residentAddress1.length * 8
                        }px`,
                      }}
                      value={senderDetails?.residentAddress1}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">ID Type</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={senderDetails?.idTypeCode}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">ID No</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={senderDetails?.idValue}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label className="inputLabelDetails">Source of Fund</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={transferInfo?.sourceOfFund}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">
                      Purpose of Remittance
                    </label>
                  </div>
                  <div className="col ">
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={transferInfo?.paymentPurposeCode}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">Relationship</label>
                  </div>
                  <div className="col ">
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={transferInfo?.relationshipCode}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">Nationality</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize"
                      type="text"
                      readOnly={true}
                      value={senderDetails?.nationalityCode || "-"}
                    />
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="1"
              header="Receiver Information"
            >
              <div className="account_container">
                <div>
                  <div>
                    <label className="inputLabelDetails">Name</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                      type="text"
                      value={receicerInfo?.receiverFirstName}
                      readOnly={true}
                    />
                  </div>
                </div>
                {receicerInfo?.receiverAddressStreet && (
                  <div>
                    <div>
                      <label className="inputLabelDetails">Address</label>
                    </div>
                    <div>
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={receicerInfo?.receiverAddressStreet}
                        readOnly={true}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div>
                    <label className="inputLabelDetails">Payout Country</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                      type="text"
                      value={receicerInfo?.receiverCountryCode}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">Payout Mode</label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                      type="text"
                      value={payOutGroupInfo?.paymentMethod}
                      readOnly={true}
                      style={{
                        width: `${payOutGroupInfo?.paymentMethod * 8}px`,
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="inputLabelDetails">
                      Payout Agent Name
                    </label>
                  </div>
                  <div>
                    <input
                      className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                      type="text"
                      value={payOutGroupInfo?.payAgentName}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="2"
              header="On Behalf Sender Information"
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Name</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={
                          onBehalfSenderInfo?.fullName
                            ? onBehalfSenderInfo?.fullName
                            : senderDetails?.customerName
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Address</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={
                          onBehalfSenderInfo?.address
                            ? onBehalfSenderInfo?.address
                            : senderDetails?.residentAddress1
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Contact No</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={onBehalfSenderInfo?.contactNumber}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Nationality</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={
                          onBehalfSenderInfo?.nationalityCode
                            ? onBehalfSenderInfo?.nationalityCode
                            : senderDetails?.nationalityCode
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">ID Type</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={
                          onBehalfSenderInfo?.idTypeCode
                            ? onBehalfSenderInfo?.idTypeCode
                            : senderDetails?.idTypeCode
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">ID No</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={
                          onBehalfSenderInfo?.idValue
                            ? onBehalfSenderInfo?.idValue
                            : senderDetails?.idValue
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Occupation</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={onBehalfSenderInfo?.occupationCode || "Customer"}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="eyeicontext">Image Upload</p>
              <div className="d-flex eyeiconDiv">
                <div className="frontEye cursor">
                  <button
                    onClick={handleFromClick}
                    className="frontEye border-0"
                  >
                    <BsEye></BsEye>
                    <span className="ms-1">Front</span>
                  </button>
                </div>
                <div className="frontEye  eyeiconleft">
                  <button
                    onClick={handleBackClick}
                    className="frontEye border-0"
                  >
                    <BsEye></BsEye>
                    <span className="ms-1">Back</span>
                  </button>
                </div>
              </div>
            </CustomAccordion>
            <div className="modalPopUp">
              <Modal
                isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 500 }}
              >
                <ModalBody className="modalBodyPopUp">
                  <div className="modalpopRemit-wrapper">
                    <div className="modalpopRemit-title">
                      <h5 className="modalPopupHead">Front Image</h5>
                      <div>
                        <img
                          src={img}
                          alt=""
                          style={{ height: "200px", width: "350px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <div className="modalPopupbtnDiv">
                  <button className="modalPopupBtn" onClick={toggle}>
                    Ok
                  </button>
                </div>
              </Modal>
            </div>

            <div className="modalPopUp">
              <Modal
                isOpen={modalBack}
                toggle={toggleBack}
                modalTransition={{ timeout: 500 }}
              >
                <ModalBody className="modalBodyPopUp">
                  <div className="modalpopRemit-wrapper">
                    <div className="modalpopRemit-title">
                      <h5 className="modalPopupHead">Back Image</h5>
                      <div>
                        <img
                          src={imgBack}
                          alt=""
                          style={{ height: "200px", width: "350px" }}
                        />
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <div className="modalPopupbtnDiv">
                  <button className="modalPopupBtn" onClick={toggleBack}>
                    Ok
                  </button>
                </div>
              </Modal>
            </div>

            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="3"
              header="Remittance Details"
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Transaction Ref. No
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.transactionReference}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">MIRS No.</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={remittanceInfo?.hostReferenceNo}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Date of Transaction
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.transactionDate}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Transaction Amount
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.transactionAmount.toFixed(2)}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Payout amount</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={(
                          remittanceInfo?.senderAmount * remittanceInfo?.rates
                        ).toFixed(2)}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Sending currency
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.senderCurrencyCode}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Receiving currency
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.receiverCurrencyCode}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Exchange Rate</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.rates}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Service Charge
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.feeAmount}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Sender Amount</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={(
                          remittanceInfo?.transactionAmount -
                          remittanceInfo?.feeAmount
                        ).toFixed(2)}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Promo Code</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.promoCode}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Promo Value</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        value={remittanceInfo?.promoValue}
                        readOnly={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="7"
              header="Transaction History"
            >
              <CustomHeader
                TableData={historyStateHeader}
                CustomTableHeader={tasks}
                DisableMange={true}
              />
            </CustomAccordion>

            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="4"
              header="Payout Details"
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Payment Mode</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        value={payOutGroupInfo?.paymentMethod}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Payout Agent</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={payOutGroupInfo?.payAgentName}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Payout Sub-Agent
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={payOutGroupInfo?.payAgentCode}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="7"
              header="Transaction Status History"
            >
              <CustomHeader
                TableData={historyHeader}
                CustomTableHeader={tasks}
                DisableMange={true}
              />
            </CustomAccordion>
            {thistory?.txnStatus === "FAILED" && (
              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="3"
                header="Customer Infomation - CW Failed"
              >
                <div>
                  <div className="account_container">
                    <div>
                      <div>
                        <label className="inputLabelDetails">Name</label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={senderDetails?.customerName}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">Address</label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          style={{
                            width: `${
                              senderDetails?.residentAddress1.length * 8
                            }px`,
                          }}
                          value={senderDetails?.residentAddress1}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">ID Type</label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={senderDetails?.idTypeCode}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">ID No</label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={senderDetails?.idValue}
                        />
                      </div>
                    </div>

                    <div>
                      <div>
                        <label className="inputLabelDetails">
                          Source of Fund
                        </label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={transferInfo?.sourceOfFund}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">
                          Purpose of Remittance
                        </label>
                      </div>
                      <div className="col ">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={transferInfo?.paymentPurposeCode}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">
                          Relationship
                        </label>
                      </div>
                      <div className="col ">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={transferInfo?.relationshipCode}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">Nationality</label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={senderDetails?.nationalityCode || "-"}
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <label className="inputLabelDetails">
                          Transaction Ref No
                        </label>
                      </div>
                      <div>
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                          type="text"
                          value={remittanceInfo?.promoValue}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div
                    className={`d-flex justify-content-start align-items-center px-3 matchTypeBlock mt-3 }`}
                  >
                    <Select
                      defaultValue="Select"
                      style={{ width: "150px" }}
                      className="mb-2 ms-3"
                      onChange={customcwHandler}
                      size="large"
                    >
                      <Option value={thistory?.txnStatus}>{"Submitted"}</Option>
                    </Select>

                    <div className="col-3 ms-2 p-1 row">
                      <Input
                        className="border-1 form-control"
                        type="text"
                        placeholder="Remark"
                        value={Cwremarks}
                        onChange={(e) => setcwRemarks(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => CwFailedSubmit()}
                      className="ecdd-btn"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </CustomAccordion>
            )}
            <CustomAccordion
              ExpandAll={expanAll}
              eventKey="5"
              header="Compliance Checks and Approvals"
            >
              <>
                <CustomLoader isLoading={isLoadingMatch} size={50} />

                {pepsValue.length > 0 && (
                  <div className="pepsBlock  py-2">
                    <p>Sender PEPS Check</p>
                    <CustomResponseMessage
                      apiStatus={pepsStatus}
                      closeMessage={closePepsMessage}
                      message={pepsMessage}
                      errorFix={true}
                    />
                    <CustomHeader
                      TableData={tableHeader}
                      CustomTableHeader={
                        !normalMatch?.senderNormal && pepsValue
                      }
                      rowSelection={rowSelection}
                      scrollY={true}
                      DisableMange={true}
                    />
                    <div className="d-flex justify-content-start align-items-center px-3 matchTypeBlock mt-2">
                      <h6>Match Type</h6>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="senderNormal"
                            disabled={disableNormal.senderNormal}
                            checked={normalMatch.senderNormal}
                            onChange={handlenormalcheck}
                          />
                          <span>Normal</span>
                        </label>
                      </div>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="senderConfirm"
                            checked={confirm.senderConfirm}
                            onChange={(e) => handleconfirmcheck(e, "peps")}
                            disabled={disableConfirm.senderConfirm}
                          />

                          <span>Confirm</span>
                        </label>
                      </div>
                      {senderDetails.sourceOfWealthForSender !== "" && (
                        <>
                          <label className="ms-1 source-wealth-label">
                            Source of Wealth:
                          </label>
                          <input
                            type="text"
                            className="border-0 source-wealth ms-2 form-control"
                            placeholder="Source of Wealth"
                            disabled={true}
                            value={senderDetails.sourceOfWealthForSender}
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
                {pepsOnBehalfValue.length > 0 && (
                  <div className="pepsBlock  py-2">
                    <p>On Behalf Sender PEPS Check</p>
                    <CustomResponseMessage
                      apiStatus={onBehalfPepsStatus}
                      closeMessage={closeOnbehalfPepsMessage}
                      message={onBehalfPepsMessage}
                      errorFix={true}
                    />
                    <CustomHeader
                      TableData={tableHeader}
                      CustomTableHeader={
                        !normalMatch.onBehalfSenderNormal && pepsOnBehalfValue
                      }
                      scrollY={true}
                      rowSelection={rowSelection}
                      DisableMange={true}
                    />
                    <div className="d-flex justify-content-start align-items-center px-3 matchTypeBlock mt-2">
                      <h6>Match Type</h6>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="onBehalfSenderNormal"
                            disabled={disableNormal.onBehalfSenderNormal}
                            checked={normalMatch.onBehalfSenderNormal}
                            onChange={handlenormalcheck}
                          />
                          <span>Normal</span>
                        </label>
                      </div>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="onBehalfSenderConfirm"
                            checked={confirm.onBehalfSenderConfirm}
                            onChange={(e) =>
                              handleconfirmcheck(e, "behalfPeps")
                            }
                            disabled={disableConfirm.onBehalfSenderConfirm}
                          />
                          <span>Confirm</span>
                        </label>
                      </div>
                      {onBehalfSenderInfo?.sourceOfWealthForOnBehalfSender !==
                        "" && (
                        <>
                          <label className="ms-1 source-wealth-label">
                            Source of Wealth:
                          </label>
                          <input
                            type="text"
                            className="border-0 source-wealth ms-2 form-control"
                            placeholder="Source of Wealth"
                            disabled={true}
                            value={
                              onBehalfSenderInfo?.sourceOfWealthForOnBehalfSender
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
                {sanctionValue.length > 0 && (
                  <div className="pepsBlock  py-2">
                    <p>Sender in Sanction List</p>
                    <CustomResponseMessage
                      apiStatus={SanctionStatus}
                      closeMessage={closeSanctionMessage}
                      message={sanctionMessage}
                      errorFix={true}
                    />
                    <CustomHeader
                      TableData={tableHeader}
                      CustomTableHeader={
                        !normalMatch?.senderSanctionNormal && sanctionValue
                      }
                      rowSelection={rowSelection}
                      scrollY={true}
                      EnableScroll={!normalMatch?.senderSanctionNormal && true}
                      DisableMange={true}
                    />
                    <div className="d-flex justify-content-start align-items-center px-3 matchTypeBlock mt-2">
                      <h6>Match Type</h6>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="senderSanctionNormal"
                            checked={normalMatch.senderSanctionNormal}
                            disabled={disableNormal.senderSanctionNormal}
                            onChange={handlenormalcheck}
                          />
                          <span>Normal</span>
                        </label>
                      </div>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="senderSanctionConfirm"
                            checked={confirm.senderSanctionConfirm}
                            onChange={(e) => handleconfirmcheck(e, "sanction")}
                            disabled={disableConfirm.senderSanctionConfirm}
                          />
                          <span>Confirm</span>
                        </label>
                      </div>
                      {senderSanctionConfirmMatch && (
                        <>
                          <Select
                            defaultValue="Match Criteria"
                            style={{ width: "250px" }}
                            className="mb-2 ms-3"
                            size="large"
                          >
                            <Option value="nameNationalityYOB">
                              Name,Nationality & Year of Birth
                            </Option>
                            <Option value="nameNationality">
                              Name and Nationality
                            </Option>
                            <Option value="nameYOB">
                              Name and Year of Birth
                            </Option>
                            <Option value="name">Name Only</Option>
                          </Select>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {sanctionOnBehalfValue.length > 0 && (
                  <div className="pepsBlock  py-2">
                    <p>OnBehalf Sender in Sanction List</p>
                    <CustomResponseMessage
                      apiStatus={onBehalfSanctionStatus}
                      closeMessage={closeOnbehalfSanctionMessage}
                      message={onBehalfSanctionMessage}
                      errorFix={true}
                    />
                    <CustomHeader
                      TableData={tableHeader}
                      CustomTableHeader={
                        !normalMatch?.onBehalfSanctionNormal &&
                        sanctionOnBehalfValue
                      }
                      rowSelection={rowSelection}
                      scrollY={true}
                      DisableMange={true}
                    />
                    <div className="d-flex justify-content-start align-items-center px-3 matchTypeBlock mt-2">
                      <h6>Match Type</h6>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="onBehalfSanctionNormal"
                            checked={normalMatch.onBehalfSanctionNormal}
                            disabled={disableNormal.onBehalfSanctionNormal}
                            onChange={handlenormalcheck}
                          />
                          <span>Normal</span>
                        </label>
                      </div>
                      <div className="ms-3 d-flex justify-content-center align-items-center customcheckbox">
                        <label className="customcheckbox">
                          <input
                            type="checkbox"
                            name="onBehalfSanctionConfirm"
                            checked={confirm.onBehalfSanctionConfirm}
                            onChange={(e) =>
                              handleconfirmcheck(e, "behalfSanction")
                            }
                            disabled={disableConfirm.onBehalfSanctionConfirm}
                          />
                          <span>Confirm</span>
                        </label>
                      </div>
                      {onBehalfSenderSanctionConfirmMatch && (
                        <>
                          <Select
                            defaultValue="Match Criteria"
                            style={{ width: "250px" }}
                            className="mb-2 ms-3"
                            size="large"
                          >
                            <Option value="nameNationalityYOB">
                              Name,Nationality & Year of Birth
                            </Option>
                            <Option value="nameNationality">
                              Name and Nationality
                            </Option>
                            <Option value="nameYOB">
                              Name and Year of Birth
                            </Option>
                            <Option value="name">Name Only</Option>
                          </Select>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {retryStatus && (
                  <CustomResponseMessage
                    closeMessage={RejectMessage}
                    message={retryMsg}
                    apiStatus={isNotError}
                    errorFix={isNotError}
                  />
                )}
                <div className="ecddblock mt-3">
                  <p>ECDD Indicators</p>
                  <div className="indicators--grid">
                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          pepsValue?.length !== 0
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Sender in PEPS"
                      />
                      <section
                        className={`customcheck ${
                          pepsValue.length > 0
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {pepsValue.length > 0 ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                    {((pepsOnBehalfValue && pepsOnBehalfValue.length > 0) ||
                      onBehalfSenderInfo?.id) && (
                      <section className="customtext--wrapper">
                        <input
                          type="text"
                          className={`customtext ${
                            pepsOnBehalfValue.length > 0
                              ? "customtextred"
                              : "customtextgreen"
                          }`}
                          value="On Behalf Sender in PEPS List"
                        />
                        <section
                          className={`customcheck ${
                            pepsOnBehalfValue.length > 0
                              ? "customcheckred"
                              : "customcheckgreen"
                          }`}
                        >
                          {pepsOnBehalfValue.length > 0 ? (
                            <span className="customtick">&#9888;</span>
                          ) : (
                            <span className="customtick">&#10003;</span>
                          )}
                        </section>
                      </section>
                    )}
                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          sanctionValue.length > 0
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Sender in Sanction List"
                      />
                      <section
                        className={`customcheck ${
                          sanctionValue.length > 0
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {sanctionValue.length > 0 ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                    {((sanctionOnBehalfValue &&
                      sanctionOnBehalfValue.length > 0) ||
                      onBehalfSenderInfo?.id) && (
                      <section className="customtext--wrapper">
                        <input
                          type="text"
                          className={`customtext ${
                            sanctionOnBehalfValue.length > 0
                              ? "customtextred"
                              : "customtextgreen"
                          }`}
                          value="On behalf Sender in Sanction List"
                        />
                        <section
                          className={`customcheck ${
                            sanctionOnBehalfValue.length > 0
                              ? "customcheckred"
                              : "customcheckgreen"
                          }`}
                        >
                          {sanctionOnBehalfValue.length > 0 ? (
                            <span className="customtick">&#9888;</span>
                          ) : (
                            <span className="customtick">&#10003;</span>
                          )}
                        </section>
                      </section>
                    )}

                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.hrcIndicatorSender === "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Sender from HRC"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.hrcIndicatorSender === "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.hrcIndicatorSender === "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>

                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.hrcIndicatorOnbehalfSender === "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="On Behalf Sender from HRC"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.hrcIndicatorOnbehalfSender === "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.hrcIndicatorOnbehalfSender === "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.hrcIndicatorReceiver === "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Receiver from HRC"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.hrcIndicatorReceiver === "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.hrcIndicatorReceiver === "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.txnStatisticsIndicatorSender === "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Sender Transaction Statistics"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.txnStatisticsIndicatorSender === "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.txnStatisticsIndicatorSender ===
                        "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.txnStatisticsIndicatorOnbehalfSender ===
                          "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="OnBehalfSender Transaction Statistics"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.txnStatisticsIndicatorOnbehalfSender ===
                          "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.txnStatisticsIndicatorOnbehalfSender ===
                        "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>

                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.rbaIndicatorSender === "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Risk based Assessment - Sender"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.rbaIndicatorSender === "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.rbaIndicatorSender === "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                    <section className="customtext--wrapper">
                      <input
                        type="text"
                        className={`customtext ${
                          remittanceInfo?.rbaIndicatorOnbehalfSender === "Y"
                            ? "customtextred"
                            : "customtextgreen"
                        }`}
                        value="Risk based Assessment - OnBehalfSender"
                      />
                      <section
                        className={`customcheck ${
                          remittanceInfo?.rbaIndicatorOnbehalfSender === "Y"
                            ? "customcheckred"
                            : "customcheckgreen"
                        }`}
                      >
                        {remittanceInfo?.rbaIndicatorOnbehalfSender === "Y" ? (
                          <span className="customtick">&#9888;</span>
                        ) : (
                          <span className="customtick">&#10003;</span>
                        )}
                      </section>
                    </section>
                  </div>
                  {viewApprove && (
                    <div
                      className={`d-flex justify-content-start align-items-center px-3 matchTypeBlock mt-3 ${
                        approveAction ? "d-none" : ""
                      }`}
                    >
                      {viewApprove && (
                        <div className="col-3 p-1 row">
                          <Input
                            className="border-1 form-control"
                            type="text"
                            placeholder="Remark"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                          />
                        </div>
                      )}

                      {viewApprove && (
                        <Select
                          defaultValue="Select"
                          style={{ width: "250px" }}
                          className="mb-2 ms-3"
                          onChange={statuschangehandler}
                          size="large"
                        >
                          {approveOptions.map((approveValue: any) => {
                            return (
                              <Option value={approveValue}>
                                {approveValue}
                              </Option>
                            );
                          })}
                        </Select>
                      )}
                      <button
                        onClick={() => submithandler(status)}
                        className="ecdd-btn"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </>
            </CustomAccordion>

            <CustomResponseMessage
              apiStatus={apiStatus}
              closeMessage={closeMessage}
              message={apiMessage}
              errorFix={true}
            />
            <CustomLoader isLoading={isLoading} size={50} />
          </div>
        </div>
      </CommonEditSummary>
    </div>
  );
}

export default RemitTransactionEnquiry;
