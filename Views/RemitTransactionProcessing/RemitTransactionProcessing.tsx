import { Form, Select } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { EditableCellProps } from "../../models/RemitAgentTag";
import "./RemitTransactionProcessing.scss";
import {
  Item,
  transactionProcessingInfo,
} from "../../models/RemitTransactionProcessingModel";
import {
  approveStatus,
  getPaymentMethodList,
  getTransferListData,
  processTransaction,
  getStatusTableDatas,
  getStatusList,
  resetGetStatusTableDatas,
} from "../../redux/action/RemitTransactionProcessingAction";
import { Utils } from "../../Constants/Constants";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import moment from "moment";
import { getCountryRecords } from "../../redux/action/RemitBranchSetupAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
const { Option } = Select;

const RemitTransactionProcessing = (props: any) => {
  const [form] = Form.useForm();
  const [columns, setcolumns] = useState([]);
  const componentRef = useRef<any>();
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [tableShow, setTableShow] = useState(false);
  const [editTable, setEdittable] = useState(false);
  const [cardStatus, setCardStatus] = useState("");
  const [isDashBoardVisible, setIsDashBoardVisible] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const dispatch = useDispatch();
  const [filterError, setFilterError] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [behalfFlag, setbehalfFlag] = useState();
  const [filterFunction, setFilterFunction] = useState({
    startDate: "",
    endDate: "",
    transactionStatusList: [],
    remitStatusList: [],
    receiverCountryList: [],
    paymentMethodList: [],
  });
  const [transactionStatusId, setTransactionStatusId] = useState([]);
  const [minEndDate, setMinEndDate] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(true);
  const [enableApprove, setEnableApprove] = useState(true);

  const statusCountData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getStatusCountResponse
  );
  const statusTableDatasValues = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getCountTableDataResponse
  );

  // const timeFilterCalc = (date: string) => {
  //   const then = new Date(date);
  //   const now = new Date();
  //   const msBetweenDates = Math.abs(then.getTime() - now.getTime());
  //   const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
  //   if (hoursBetweenDates < 24) {
  //   } else {
  //   }
  //   return hoursBetweenDates < 24 ? true : false
  // }
  // let timeFilter = statusTableDatasValues?.data?.filter((val: any, index: any) => {
  //   return timeFilterCalc(val?.transactionDate)&& val
  // })

  let transferDataStatus = statusTableDatasValues?.data?.map(
    (data: any, index: any) => {
      return {
        ...data,
        key: index,
        isOnBehalfSender: data.isOnBehalfSender ? "YES" : "NO",
      };
    }
  );

  transferDataStatus?.sort((a: any, b: any) => {
    return b.transactionDate?.localeCompare(a.transactionDate);
  });

  useEffect(() => {
    if (statusCountData?.data) {
      setIsLoading(false);
    } else if (statusCountData?.data.error) {
      setIsLoading(true);
    }
  }, [statusCountData?.data]);

  let statusCountValues = statusCountData?.data;
  const transferTxnData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getTransferDataRecordsResponse
  );
  const approveTransaction = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getApproveStatusResponse
  );
  const ProcessTransactionRecords = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getProcessStatusResponse
  );
  const ProcessTransactionReject = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getProcessStatusReject
  );
  const getPaymentMethodDatas = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getPaymentMethodResponse
  );
  const countryRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.getCountryRegordsResponse
  );

  useEffect(() => {
    if (!transferDataStatus) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [transferDataStatus]);

  const fetchTransferByIDResponse = useCallback(
    async (data: any) => {
      try {
        dispatch(getTransferListData(data));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchApproveStatusId = useCallback(
    async (transactionIds: any) => {
      try {
        dispatch(approveStatus(transactionIds));
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
  const fetchPaymentMethod = useCallback(
    async (countryCode: any) => {
      try {
        dispatch(getPaymentMethodList(countryCode));
      } catch (err) {}
    },
    [dispatch]
  );

  let valueArr = statusCountValues?.map((status: any) => {
    return Number(status.count);
  });
  const value = valueArr?.reduce((first: any, second: any) => {
    return first + second;
  });

  function capitalizeFirstLetter(string: any) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  useEffect(() => {
    if (ProcessTransactionReject) {
      if (ProcessTransactionReject?.data) {
        setIsLoading(false);
        setApiStatus(true);
        setApiMessage("Transaction Rejected Succesfully");
        fetchTransferByIDResponse(filterFunction);
      } else if (ProcessTransactionReject?.error) {
        setIsLoading(false);
        setApiStatus(false);
        setApiMessage(ProcessTransactionReject?.message);
      }
    }
  }, [ProcessTransactionReject, fetchTransferByIDResponse, filterFunction]);


  useEffect(() => {
    if (ProcessTransactionRecords) {
      if (ProcessTransactionRecords?.data) {
        setIsLoading(false);
        fetchTransferByIDResponse(filterFunction);
      } else if (ProcessTransactionRecords?.error) {
        setIsLoading(false);
        setApiStatus(false);
      }
      if (ProcessTransactionRecords?.data?.transactionErrorDetails) {
        setApiMessage(ProcessTransactionRecords?.data?.transactionErrorDetails);
      }
    }
  }, [ProcessTransactionRecords, fetchTransferByIDResponse, filterFunction]);

  const fetchCountryRecords = useCallback(async () => {
    try {
      dispatch(getCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchCountryRecords();
  }, [toPrint, searchArea, fetchCountryRecords]);

  useEffect(() => {
    let isAllFailed: any;

    if (approveTransaction) {
      if (approveTransaction.data && filterFunction?.startDate) {
        setIsLoading(false);
        fetchTransferByIDResponse(filterFunction);
      } else if (approveTransaction.error) {
        setIsLoading(false);
        setApiStatus(false);
        setApiMessage(approveTransaction?.message);
      } else {
        let statusArray = approveTransaction?.data.map((txn: any) => {
          return txn.status;
        });

        isAllFailed = statusArray.every((txn: any) => txn === "FAILED");
        if (isAllFailed) {
          setApiStatus(false);
          setApproveLoading(false);
          setApiMessage("Selected Transactions Are Not Approved");
        }
      }
    }
  }, [approveTransaction, fetchTransferByIDResponse, filterFunction]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, [apiMessage, transactionStatus]);
  useEffect(() => {
    if (transferTxnData) {
      setIsLoading(false);
    }
  }, [transferTxnData]);
  const fetchRemitCountResponse = useCallback(async () => {
    try {
      dispatch(getStatusList());
    } catch (err) {}
  }, [dispatch]);

  const fetchRemitTableDataResponse = useCallback(
    async (status: any) => {
      try {
        dispatch(getStatusTableDatas(status));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchRemitCountResponse();
    setTableShow(false);
    if (props.location?.state) {
      setTransactionStatus(false);
    }
  }, [fetchRemitCountResponse, props.location?.state]);

  useEffect(() => {
    setIsDashBoardVisible(props.location?.isDashBoardVisible);
    if (
      props.location?.isDashBoardVisible &&
      props.location?.state?.filterFunction?.startDate
    ) {
      setIsLoading(true);
      fetchTransferByIDResponse(props.location?.state?.filterFunction).then(
        () => {
          setTableShow(true);
          setIsLoading(false);
          setfilterOption(false);
          setFilteredArea(false);
        }
      );
    } else if (
      props.location?.isDashBoardVisible &&
      props.location?.state?.cardStatus
    ) {
      fetchRemitTableDataResponse(props.location?.state?.cardStatus).then(
        () => {
          setTableShow(true);
          setfilterOption(false);
          setFilteredArea(false);
        }
      );
    } else {
      setTransactionStatus(true);
    }
  }, [
    fetchRemitTableDataResponse,
    fetchTransferByIDResponse,
    props.location?.state?.cardStatus,
    props.location?.state?.filterFunction,
    props.location?.isDashBoardVisible,
  ]);
  const handleCardSelected = (status: any) => {
    fetchResetRemitTableDataResponse();
    setCardStatus(status);
    setIsLoading(true);
    setIsDashBoardVisible(true);
    fetchRemitTableDataResponse(status).then(() => {
      setTransactionStatus(false);
      setTableShow(true);
    });
  };

  const OnClickTransaction = (data: any) => {
    const id = data?.transactionReference;
    const remitStatus = data?.remitStatusCode;
    const txnStatus = data?.transactionStatusCode;
    const transactionId = [data?.transactionId];
    const transactionReference = data?.transactionReference;
    props.history.push({
      pathname: "/dashboard/remit-setup/Remittance-Transaction-Enquiry",
      state: {
        id,
        filterFunction,
        cardStatus,
        remitStatus,
        txnStatus,
        transactionId,
        transactionReference,
      },
    });
  };
  const transactionProcessHeader = [
    {
      title: "Txn date & Time",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Txn Ref.No",
      dataIndex: "transactionReference",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReference.localeCompare(b.transactionReference),
      },
      render: (refValue: any, record: any) => {
        return (
          <div className={`cursor `} onClick={() => OnClickTransaction(record)}>
            <span className="remit-processing-color">{refValue}</span>
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "transactionAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.transactionAmount - b.transactionAmount,
      },
    },
    {
      title: "Txn Status",
      dataIndex: "transactionStatusCode",
      checked: true,
      render(dataIndex: any) {
        return {
          props: {
            style: {
              color:
                dataIndex !== "PENDING" && dataIndex !== "CANCELLED"
                  ? "#39C570"
                  : "red",
            },
          },
          children: <div>{dataIndex}</div>,
        };
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatusCode.localeCompare(b.transactionStatusCode),
      },
    },
    {
      title: "Remittance Sys Status",
      dataIndex: "remitStatusCode",
      checked: true,
      render(dataIndex: any, record: any) {
        let labelMessage = "";
        if (
          record?.remitStatusCode === "CANCELLED" &&
          record?.transactionStatusCode === "CANCELLED"
        ) {
          labelMessage = "Refunded";
        } else if (
          record?.remitStatusCode === "CANCELLED" &&
          record?.transactionStatusCode === "PROCESSING"
        ) {
          labelMessage = "To be Refunded";
        } else if (
          record?.remitStatusCode === "SYSTEM_ERROR" &&
          record?.transactionStatusCode === "SUBMITTED"
        ) {
          labelMessage = "Remittance System Error";
        }
        return {
          children: (
            <div
              style={
                record?.remitStatusCode === "CANCELLED" &&
                record?.transactionStatusCode === "CANCELLED"
                  ? { color: "#39C570" }
                  : record?.remitStatusCode === "CANCELLED" &&
                    record?.transactionStatusCode === "PROCESSING"
                  ? { color: "#F87700" }
                  : record?.remitStatusCode === "INITIATED" &&
                    record?.transactionStatusCode === "SUBMITTED"
                  ? { color: "#39C570" }
                  : record?.remitStatusCode === "IN_PROCESS"
                  ? { color: "#F87700" }
                  : record?.remitStatusCode === "ON_HOLD"
                  ? { color: "#F87700" }
                  : record?.remitStatusCode === "SYSTEM_ERROR" &&
                    record?.transactionStatusCode === "SUBMITTED"
                  ? { color: "#E30613" }
                  : { color: "#39C570" }
              }
            >
              {labelMessage ? labelMessage : capitalizeFirstLetter(dataIndex)}
            </div>
          ),
        };
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.remitStatusCode.localeCompare(b.remitStatusCode),
      },
    },

    {
      title: "Refund flag (Y/N)",
      dataIndex: "isRefunded",
      checked: true,
      render(value: any) {
        return {
          props: {
            style: { color: value ? "#39C570" : "red" },
          },
          children: <div>{value ? "Y" : "N"}</div>,
        };
      },
      sorter: {
        compare: (a: any, b: any) => a.isRefunded.localeCompare(b.isRefunded),
      },
    },
    {
      title: "ECDD",
      dataIndex: "ecddFlag",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.ecddFlag - b.ecddFlag,
      },
      render(ecddValue: any) {
        return {
          props: {
            className: `${ecddValue === "Y" ? "text-success" : "text-danger"}`,
          },
          children: <div>{ecddValue}</div>,
        };
      },
    },
    {
      title: "Status ECDD",
      dataIndex: "ecddStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.ecddStatus - b.ecddStatus,
      },
      render: (ecddStatus: any) => {
        return (
          <label
            style={
              ecddStatus === "No Approval Required"
                ? { color: "#E30613" }
                : { color: "#39C570" }
            }
          >
            {ecddStatus}
          </label>
        );
      },
    },
    {
      title: "Sender Country",
      dataIndex: "nationalityCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCodeDescription.localeCompare(
            b.nationalityCodeDescription
          ),
      },
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMethodDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentMethodDescription.localeCompare(b.paymentMethodDescription),
      },
    },
    {
      title: "MIRS No",
      dataIndex: "hostReferenceNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.hostReferenceNo.localeCompare(b.hostReferenceNo),
      },
    },
    {
      title: "Receiver Country",
      dataIndex: "receiverCountryDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverCountryDescription.localeCompare(
            b.receiverCountryDescription
          ),
      },
    },
    {
      title: "On behalf Flag - Y/N",
      dataIndex: "isOnBehalfSender",
      checked: true,
      editable: true,

      render(onBehalfValue: any) {
        return editTable
          ? {
              children: (
                <select
                  name="display_address"
                  className="border-0 p-2"
                  onChange={(e: any) => setbehalfFlag(e)}
                  defaultValue={onBehalfValue === "YES" ? "Y" : "N"}
                >
                  <option value={"Y"}>Y</option>
                  <option value={"N"}>N</option>
                </select>
              ),
            }
          : {
              props: {
                className: `${
                  onBehalfValue === "YES" ? "text-success" : "text-danger"
                }`,
              },
              children: <div>{onBehalfValue === "YES" ? "Y" : "N"}</div>,
            };
      },

      sorter: {
        compare: (a: any, b: any) =>
          a.isOnBehalfSender.localeCompare(b.isOnBehalfSender),
      },
    },
    {
      title: "Sender Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName.localeCompare(b.customerName),
      },
    },

    {
      title: "Receiver Name",
      dataIndex: "receiverFirstName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverFirstName.localeCompare(b.receiverFirstName),
      },
    },

    {
      title: "On Behalf Sender name",
      dataIndex: "onBehalfSenderFullName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.onBehalfSenderFullName.localeCompare(b.onBehalfSenderFullName),
      },
    },
    {
      title: "Manage",
      dataIndex: "manage",
      checked: true,
      editable: false,
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editTable ? (
          <div className="d-flex">
            <CustomButton
              color="danger"
              // onClick={() => onUpdate(record)}
              className="btn2 btn--sizer"
            >
              Update
            </CustomButton>
            <CustomButton
              color="secondary"
              className="btn2 btn--sizer"
              component={"payrollEnquiry"}
              onClick={() => setEdittable(false)}
            >
              Cancel
            </CustomButton>
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div className={"ms-2 manage-button"}>
              <FaRegEdit onClick={() => setEdittable(true)} />
            </div>
          </div>
        );
      },
    },
  ];

  const cancel = () => {
    setEditingKey("");
  };

  const isEditing = (record: Item) => record?.transactionId === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ enabled: "", ...record });
    setEditingKey(record.id);
  };

  const mergedColumns = transactionProcessHeader.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "isOnBehalfSender" ? "dropdown" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleSubmit = () => {
    setFilterError(true);
    if (filterFunction.startDate && filterFunction.endDate) {
      fetchResetRemitTableDataResponse();
      fetchTransferByIDResponse(filterFunction).then(() => {
        setTableShow(true);
        setfilterOption(false);
        setFilteredArea(true);
        setTransactionStatus(false);
      });
    } else {
      setFilterError(false);
    }
  };

  const onReset = () => {
    setFilterFunction({
      startDate: "",
      endDate: "",
      transactionStatusList: [],
      remitStatusList: [],
      receiverCountryList: [],
      paymentMethodList: [],
    });
    setMinEndDate("");
    setFilterError(true);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
  };

  const closeSearch = () => {
    setsearchUserData("");
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
    setTableShow(true);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const clickBack = () => {
    setFilterFunction({
      startDate: "",
      endDate: "",
      transactionStatusList: [],
      remitStatusList: [],
      receiverCountryList: [],
      paymentMethodList: [],
    });
    setfilterOption(false);
    closeMessage();
    setTableShow(false);
    setIsDashBoardVisible(false);
    setTransactionStatus(true);
    setFilteredArea(false);
    setSearchArea(false);
    props.location.isDashBoardVisible = false;
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const handleChange = (e: any) => {
    if (
      e.target.name === "receiverCountryList" ||
      e.target.name === "paymentMethodList"
    ) {
      setFilterFunction({
        ...filterFunction,
        [e.target.name]: [e.target.value],
      });
    } else {
      setFilterFunction({ ...filterFunction, [e.target.name]: e.target.value });
    }

    if (e.target.name === "startDate") {
      setMinEndDate(e.target.value);
    } else if (e.target.name === "receiverCountryList") {
      fetchPaymentMethod(e.target.value);
    }
  };
  let newTransferdatas = transferTxnData?.data?.map((data: any, index: any) => {
    return {
      ...data,
      key: index,
      isOnBehalfSender: data.isOnBehalfSender ? "YES" : "NO",
    };
  });

  useEffect(() => {
    const isECDDisY = (current: any) => current.ecddFlag === "Y";

    if (newTransferdatas) {
      setEnableApprove(!newTransferdatas.every(isECDDisY));
    } else if (transferDataStatus) {
      setEnableApprove(!transferDataStatus.every(isECDDisY));
    }
  }, [transferDataStatus, newTransferdatas]);
  useEffect(() => {
    if (newTransferdatas) {
      setIsLoading(false);
    }
  }, [newTransferdatas]);

  useEffect(() => {
    if (!newTransferdatas) {
      setIsLoading(true);
    }
  }, [newTransferdatas]);
  const closeMessage = () => {
    setApiMessage("");
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      newTransferdatas = newTransferdatas?.filter(
        (e: any | transactionProcessingInfo) => {
          return (
            e.transactionDate
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionReference
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionAmount
              ?.toString()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionStatusCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.remitanceSystemStatus
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.isRefund?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.ecdd?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.senderCurrencyCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.paymentMethodDescription
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.mirsNo?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.receiverCountryDescription
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.isOnBehalfSender
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.senderName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.receiverFirstName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.onBehalfSenderName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      newTransferdatas = newTransferdatas?.filter(
        (e: any | transactionProcessingInfo) => {
          if (
            e[searchCategory]
              ?.toString()
              .toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      transferDataStatus = transferDataStatus?.filter(
        (e: any | transactionProcessingInfo) => {
          return (
            e.transactionDate
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionReference
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionAmount
              ?.toString()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionStatusCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.remitanceSystemStatus
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.isRefund?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.ecdd?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.senderCurrencyCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.paymentMethodDescription
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.mirsNo?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.receiverCountryDescription
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.isOnBehalfSender
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.senderName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.receiverFirstName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.onBehalfSenderName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      transferDataStatus = transferDataStatus?.filter(
        (e: any | transactionProcessingInfo) => {
          if (
            e[searchCategory]
              ?.toString()
              .toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }

  const rowSelection = {
    onChange: (_selectedRowsKeys: any, selectedRows: any) => {
      setTransactionStatusId(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      transactionId: record?.transactionId,
      disabled: record?.ecddFlag === "Y",
    }),
  };

  const handleChangeSelect = (e: any) => {
    setFilterFunction({ ...filterFunction, remitStatusList: e });
  };
  const handleChangetxnStatus = (e: any) => {
    setFilterFunction({ ...filterFunction, transactionStatusList: e });
  };

  function checkValid(status: any) {
    return status.transactionStatusCode === "FAILED";
  }

  const inValidTransaction = (type: string) => {
    setApiStatus(false);
    setApiMessage(
      `You have selected a wrong status.  Please recheck and submit`
    );
  };

  const fetchResetRemitTableDataResponse = useCallback(async () => {
    try {
      dispatch(resetGetStatusTableDatas());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchResetRemitTableDataResponse();
  }, [fetchResetRemitTableDataResponse]);

  const submitHandlers = (submitValue: any) => {
    closeMessage();
    if (submitValue === "Approve" && transactionStatusId.length > 1) {
      const ids = transactionStatusId.map(function (item: any) {
        if (item["transactionStatusCode"] === "FAILED") {
          return false;
        }
        return item["transactionId"];
      });
      if (ids) {
        setApproveLoading(true);
        fetchApproveStatusId(ids);
      }
    } else {
      if (transactionStatusId.length > 0 && transactionStatusId.length < 2) {
        if (!transactionStatusId.some(checkValid)) {
          let remitStatus = "";
          let transactionStatus = "";
          const ids = transactionStatusId.map(function (item: any) {
            if (item["transactionStatusCode"] === "FAILED") {
              return false;
            }
            remitStatus = item["remitStatusCode"];
            transactionStatus = item["transactionStatusCode"];
            return item["transactionId"];
          });

          if (ids) {
            let validProcess = false;
            switch (submitValue) {
              case "Retry":
                if (
                  remitStatus === "SYSTEM_ERROR" &&
                  transactionStatus === "SUBMITTED"
                ) {
                  validProcess = true;
                } else {
                  inValidTransaction(submitValue);
                }
                break;
              case "Refund":
                if (
                  (remitStatus === "CANCELLED" &&
                    transactionStatus === "PROCESSING") ||
                  (remitStatus === "SYSTEM_ERROR" &&
                    transactionStatus === "SUBMITTED") ||
                  (remitStatus === "Initiated" &&
                    transactionStatus === "SUBMITTED") ||
                  (remitStatus === "ON_HOLD" &&
                    transactionStatus === "PROCESSING") ||
                  (remitStatus === "CANCELLED" &&
                    transactionStatus === "CANCELLED")
                ) {
                  validProcess = true;
                  break;
                }
                if (remitStatus === "INITIATED" || remitStatus === "ON_HOLD") {
                  validProcess = true;
                } else {
                  inValidTransaction(submitValue);
                }
                break;
              case "Approve":
                if (
                  remitStatus === "INITIATED" &&
                  transactionStatus === "SUBMITTED"
                ) {
                  validProcess = true;
                } else {
                  inValidTransaction(submitValue);
                }
                break;
              case "Reject":
                if (
                  (remitStatus === "INITIATED" &&
                    transactionStatus === "SUBMITTED") ||
                  (remitStatus === "SYSTEM_ERROR" &&
                    transactionStatus === "SUBMITTED") ||
                  (remitStatus === "ON_HOLD" &&
                    transactionStatus === "PROCESSING") ||
                  (remitStatus === "CANCELLED" &&
                    transactionStatus === "PROCESSING") ||
                  (remitStatus === "CANCELLED" &&
                    transactionStatus === "CANCELLED")
                ) {
                  validProcess = true;
                } else {
                  inValidTransaction(submitValue);
                }
                break;
              default:
                break;
            }

            if (validProcess) {
              setIsLoading(true);
              sentProcessStatus(ids[0], submitValue);
              setTransactionStatusId([]);
            }
          }
        } else {
          setApiStatus(false);
          setApiMessage("Select Valid transaction");
        }
      } else {
        setApiStatus(false);
        setApiMessage("Select one transaction");
      }
    }
  };

  const cardTextRender = (data: any) => {
    const txt = data?.remitStatusCode.replace(/[^a-zA-Z ]/g, " ");

    if (txt === "INITIATED") {
      return "Initiated";
    } else if (txt === "CANCELLED") {
      return "Cancelled";
    } else if (txt === "PAID") {
      return "Paid";
    } else if (txt === "ON HOLD") {
      return "On Hold";
    } else if (txt === "IN PROCESS") {
      return "In Process";
    } else if (txt === "SYSTEM ERROR") {
      return "Remittance System Error";
    } else {
      return "CW Failure";
    }
    return data?.remitStatusCode.replace(/[^a-zA-Z ]/g, " ");
  };
  return (
    <div className="p-4">
      {!isDashBoardVisible && (
        <div>
          <div
            className="primary_heading"
            style={{
              marginBottom: "20px",
            }}
          >
            Remittance Transaction Processing – Status &<br /> Approval
          </div>
        </div>
      )}

      {isDashBoardVisible && (
        <CommonHeaderSummary
          RightContent={"Remittance Transaction Processing – Status & Approval"}
          SummaryFileName={
            "Remittance Transaction Processing – Status & Approval"
          }
          searchArea={toggleSearch}
          search={searchArea}
          filterRemit={true}
          filterArea={toggleFilter}
          filterEnabled={filterOption}
          Refresh={true}
          List={true}
          refresh={toggleRefresh}
          Print={handlePrint}
          ListData={handleList}
          SummaryColumn={
            orginalColumns.length > 0 ? orginalColumns : mergedColumns
          }
          TableData={
            filterFunction.startDate ? newTransferdatas : transferDataStatus
          }
        />
      )}

      {tableShow && (
        <div className="d-flex justify-content-end align-items-center pb-3">
          <CustomButton className="backBtnDevice" onClick={clickBack}>
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
      )}

      {filterOption && (
        <div className="colorWhite RemitTransProcessfilter mt-3 p-3">
          <div className="d-flex justify-content-between">
            <p className="remitTransFilter">Filter</p>
            <span
              className={`remit-processing-mandatory ${
                filterError && "d-none"
              }`}
            >
              {" "}
              ** All field value is mandatory
            </span>
          </div>
          <div className="container-fluid branchFilter">
            <div className="row">
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Start Date
                    <span className="remit-processing-mandatory">*</span>
                  </Label>
                  <Input
                    type="date"
                    name="startDate"
                    className="remit-processing-formRadius "
                    value={filterFunction.startDate}
                    onChange={handleChange}
                    max={moment().format("YYYY-MM-DD")}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    End Date
                    <span className="remit-processing-mandatory">*</span>
                  </Label>
                  <Input
                    type="date"
                    name="endDate"
                    className="remit-processing-formRadius "
                    value={filterFunction.endDate}
                    onChange={handleChange}
                    min={minEndDate}
                    max={moment().format("YYYY-MM-DD")}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Transaction Status
                  </Label>
                  <Select
                    mode="multiple"
                    id="transactionStatus"
                    className="remit-processing-formRadius form-select border-0 cursor"
                    value={filterFunction.transactionStatusList}
                    style={{ height: "38px" }}
                    onChange={handleChangetxnStatus}
                  >
                    {Utils.txnStatus.map((statusFilter: any, index: any) => {
                      return (
                        <Option key={index} value={statusFilter}>
                          {statusFilter}
                        </Option>
                      );
                    })}
                  </Select>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Remit Status
                  </Label>
                  <Select
                    mode="multiple"
                    id="remitStatusList"
                    className="remit-processing-formRadius form-select"
                    value={filterFunction.remitStatusList}
                    style={{ height: "38px" }}
                    onChange={handleChangeSelect}
                  >
                    {Utils.remitStatus.map((statusFilter: any, index: any) => {
                      return (
                        <Option key={index} value={statusFilter}>
                          {statusFilter}
                        </Option>
                      );
                    })}
                  </Select>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Receiver Country
                  </Label>
                  <Input
                    type="select"
                    name="receiverCountryList"
                    className="remit-processing-formRadius form-select"
                    value={filterFunction.receiverCountryList}
                    onChange={handleChange}
                  >
                    <option key="-1" value="select">
                      Select Country
                    </option>
                    {countryRecordsData &&
                      countryRecordsData?.data?.map(
                        (option: any, index: any) => {
                          return (
                            <option key={index} value={option.code}>
                              {option.description}
                            </option>
                          );
                        }
                      )}
                  </Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Payment Method
                  </Label>
                  <Input
                    type="select"
                    name="paymentMethodList"
                    className="remit-processing-formRadius form-select"
                    value={filterFunction.paymentMethodList}
                    onChange={handleChange}
                  >
                    <option key="-1" value="select">
                      Select Payment
                    </option>
                    {getPaymentMethodDatas &&
                      getPaymentMethodDatas?.data?.map(
                        (statusFilter: any, index: any) => {
                          return (
                            <option
                              key={index}
                              value={statusFilter.paymentMethodCode}
                            >
                              {statusFilter.description}
                            </option>
                          );
                        }
                      )}
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 me-3">
            <SubmitCancelButton
              button="Submit"
              secondButton="Reset"
              onSubmit={handleSubmit}
              onCancel={onReset}
            />
          </div>
        </div>
      )}

      {filteredArea && <FiltersSelected value={filterFunction} />}
      {transactionStatus && (
        <>
          {isLoading ? null : (
            <div className={`col remit-txn-total-view `}>
              <div className="col-3 ms-1 d-flex align-items-center">
                <span className="remit-txn-total ">
                  <pre>Total Transaction : {value}</pre>
                </span>
              </div>
            </div>
          )}
          <div className="row flex-wrap">
            {statusCountValues?.map((data: any) => (
              <div className="col-sm-4">
                <Card
                  className="card-top-margin remit-txn-cardRadius"
                  onClick={() => handleCardSelected(data?.remitStatusCode)}
                  style={{ cursor: "pointer" }}
                >
                  <CardHeader className="headingCard">
                    {cardTextRender(data)}
                  </CardHeader>
                  <CardBody className="card-display">
                    <CardText className="span-font text-center contentBody">
                      {data?.count}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
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

            <option value="transactionDate" className="cursor">
              Txn date & Time
            </option>
            <option value="transactionReference" className="cursor">
              Txn Ref.No
            </option>
            <option value="receiverFirstName" className="cursor">
              Receiver Name
            </option>
            <option value="transactionAmount" className="cursor">
              Amount
            </option>
            <option value="senderCurrencyCode" className="cursor">
              Sender Country
            </option>
            <option value="paymentMethodDescription" className="cursor">
              Payment Mode
            </option>
            <option value="receiverCountryDescription" className="cursor">
              Receiver Country
            </option>
            <option value="isOnBehalfSender" className="cursor">
              On Behalf Flag
            </option>
            <option value="transactionStatusCode" className="cursor">
              Txn Status
            </option>
            <option value="remitanceSystemStatus" className="cursor">
              Remittance System Status
            </option>
            <option value="isRefund" className="cursor">
              Refund flag (Y/N)
            </option>
            <option value="ecdd" className="cursor">
              ECDD
            </option>
            <option value="mirsNo" className="cursor">
              MIRS No
            </option>
            <option value="senderName" className="cursor">
              Sender Name
            </option>
            <option value="onBehalfSenderName" className="cursor">
              On Behalf Sender name
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            placeholder="Type your search keyword"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger btn--sizer">Search</Button>
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
              background: "none",
              border: "none",
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
              background: "none",
              border: "none",
            }}
          >
            Cancel
          </button>
        </span>
      )}
      <CustomResponseMessage
        apiStatus={apiStatus}
        closeMessage={closeMessage}
        message={apiMessage}
        errorFix={true}
      />

      <CustomLoader isLoading={isLoading} size={50} />
      <CustomLoader isLoading={approveLoading} size={50} />
      {isLoading ? null : (
        <>
          <div className="mt-3" ref={componentRef}>
            <Form form={form} component={false}>
              {tableShow && (
                <CustomHeader
                  TableData={columns.length > 0 ? columns : mergedColumns}
                  rowSelection={rowSelection}
                  columns={mergedColumns}
                  dataSources={newTransferdatas}
                  handlesubmit={submitHandlers}
                  approval={toPrint ? false : true}
                  approve={true}
                  disableCustomRowSelection={enableApprove}
                  DefaultColumn={true}
                  DisableMange={true}
                  CustomTableHeader={
                    filterFunction.startDate
                      ? newTransferdatas
                      : transferDataStatus
                  }
                  toPrint={columns.length > 0 ? true : false}
                />
              )}
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default RemitTransactionProcessing;
