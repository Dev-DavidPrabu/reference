import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomButton from "../../Components/UI/CustomButton";
import "./MobileTopUpSummary.scss";
import {
  getDashboardDataByStatus,
  getFilterData,
  getFpxRefundCreditResponse,
  getFpxReprocessResponse,
  getJompayRefundCreditResponse,
  getJompayReprocessResponse,
  resetDashboardDataByStatus,
  resetfilterDatas,
} from "../../redux/action/MobileTopUpAction";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

const MobileTopupSummaryTable = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showModalList, setShowModalList] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [form] = Form.useForm();
  const [approve, setApprove] = useState<any>([]);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filter, setFilter] = useState(true);
  const [response, setResponse] = React.useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [mobValue, setMobValue] = useState({
    customerName: "",
    errorDescription: "",
    id: "",
    originatorId: "",
    originatorType: "",
    statusCode: "",
    topupAmount: "",
    topupCurrency: "",
    topupType: "",
    transactionId: "",
    mobileNumber: "",
    originatingTime: "",
  });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({
    originatorTypeError: "",
    statusCodeError: "",
  });

  const dashBoardData = useSelector(
    (state: RootStateOrAny) => state.MobileTopUpReducer?.getDataByStatusResponse
  );

  const approveReprocess = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getApproveReprocessResponse
  );
  const approveRefund = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getApproveRefundResponse
  );
  const approveCredit = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getApproveCreditResponse
  );

  const fpxReprocessData = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getFpxResponseByReprocess
  );
  const fpxRefundCreditData = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getFpxResponseByRefundCredit
  );
  const jompayReprocessData = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getJompayResponseByReprocess
  );
  const jompayRefundCreditData = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getJompayRefundCreditByReprocess
  );

  const fetchFpxReprocessDataResponse = useCallback(
    async (value: any) => {
      try {
        dispatch(getFpxReprocessResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchFpxRefundCreditDataResponse = useCallback(
    async (value: any) => {
      try {
        dispatch(getFpxRefundCreditResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchJompayReprocessDataResponse = useCallback(
    async (value: any) => {
      try {
        dispatch(getJompayReprocessResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchJompayRefundCreditDataResponse = useCallback(
    async (value: any) => {
      try {
        dispatch(getJompayRefundCreditResponse(value));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (fpxReprocessData?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      if (dashBoardData?.data.length > 1) {
        fetchDashBoardDataResponse(props.location?.state?.statusCode);
      } else {
        props.history.push({
          pathname: "/dashboard/Mobile-TopUp-Summary-DashBoard",
        });
      }
      setApiMessage("MobileTopUp summary Reprocessed Successfully");
      setApiStatus(true);
    } else if (fpxReprocessData?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(fpxReprocessData?.message);
      setApproveError(true);
    }
  }, [fpxReprocessData]);

  useEffect(() => {
    if (fpxRefundCreditData?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      if (dashBoardData?.data.length > 1) {
        fetchDashBoardDataResponse(props.location?.state?.statusCode);
      } else {
        props.history.push({
          pathname: "/dashboard/Mobile-TopUp-Summary-DashBoard",
        });
      }
      if (response === 2) {
        setApiMessage("MobileTopUp summary Refunded Successfully");
      } else if (response === 3) {
        setApiMessage("MobileTopUp summary Credited Successfully");
      }
      setApiStatus(true);
    } else if (fpxRefundCreditData?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(fpxRefundCreditData?.message);
      setApproveError(true);
    }
  }, [fpxRefundCreditData]);

  useEffect(() => {
    if (jompayReprocessData?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      if (dashBoardData?.data.length > 1) {
        fetchDashBoardDataResponse(props.location?.state?.statusCode);
      } else {
        props.history.push({
          pathname: "/dashboard/Mobile-TopUp-Summary-DashBoard",
        });
      }
      setApiMessage("MobileTopUp summary Reprocessed Successfully");
      setApiStatus(true);
    } else if (jompayReprocessData?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(jompayReprocessData?.message);
      setApproveError(true);
    }
  }, [jompayReprocessData]);

  useEffect(() => {
    if (jompayRefundCreditData?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      if (dashBoardData?.data.length > 1) {
        fetchDashBoardDataResponse(props.location?.state?.statusCode);
      } else {
        props.history.push({
          pathname: "/dashboard/Mobile-TopUp-Summary-DashBoard",
        });
      }
      if (response === 2) {
        setApiMessage("MobileTopUp summary Refunded Successfully");
      } else if (response === 3) {
        setApiMessage("MobileTopUp summary Credited Successfully");
      }
      setApiStatus(true);
    } else if (jompayRefundCreditData?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(jompayRefundCreditData?.message);
      setApproveError(true);
    }
  }, [jompayRefundCreditData]);

  useEffect(() => {
    if (approveReprocess?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiMessage("MobileTopUp summary Reprocessed Successfully");
      setApiStatus(true);
    } else if (approveReprocess?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(approveReprocess?.message);
      setApproveError(true);
    }
  }, [approveReprocess]);

  useEffect(() => {
    if (approveRefund?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiMessage("MobileTopUp summary Refunded Successfully");
      setApiStatus(true);
    } else if (approveRefund?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(approveRefund?.message);
      setApproveError(true);
    }
  }, [approveRefund]);

  useEffect(() => {
    if (approveCredit?.data) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiMessage("MobileTopUp summary Credited Successfully");
      setApiStatus(true);
    } else if (approveCredit?.error) {
      setIsLoading(false);
      setIsLoadingData(false);
      setApiStatus(false);
      setApiMessage(approveCredit?.message);
      setApproveError(true);
    }
  }, [approveCredit]);

  useEffect(() => {
    if (!apiMessage) {
      setApiMessage("");
    }
  }, []);
  const fetchDashBoardDataResponse = useCallback(
    async (value: any) => {
      try {
        dispatch(getDashboardDataByStatus(value, 0, 7));
      } catch (err) {}
    },
    [dispatch]
  );

  const RecordsPerPage = (noOfRecords: number) => {
    if (filteredData?.data) {
      setIsLoading(true);
      let body = {
        mobileNumber: mobValue.mobileNumber,
        topupType: mobValue.topupType,
        originatorType: mobValue.originatorType,
        originatorId: mobValue.originatorId,
        topupAmount: mobValue.topupAmount,
        originatingTime: mobValue.originatingTime,
        statusCode: mobValue.statusCode,
      };
      fetchFilteredDataResponse(body, 0, noOfRecords);
      setFilter(false);
    } else {
      dispatch(
        getDashboardDataByStatus(
          props.location?.state?.statusCode,
          0,
          noOfRecords
        )
      );
    }
  };

  const prevBatch = (pageNumber: number, noOfRecords: number) => {
    if (filteredData?.data) {
      setIsLoading(true);
      let body = {
        mobileNumber: mobValue.mobileNumber,
        topupType: mobValue.topupType,
        originatorType: mobValue.originatorType,
        originatorId: mobValue.originatorId,
        topupAmount: mobValue.topupAmount,
        originatingTime: mobValue.originatingTime,
        statusCode: mobValue.statusCode,
      };
      fetchFilteredDataResponse(body, pageNumber - 1, noOfRecords);
      setFilter(false);
    } else {
      dispatch(
        getDashboardDataByStatus(
          props.location?.state?.statusCode,
          pageNumber - 1,
          noOfRecords
        )
      );
    }
  };

  const nextBatch = (pageNumber: number, noOfRecords: number) => {
    if (filteredData?.data) {
      setIsLoading(true);
      let body = {
        mobileNumber: mobValue.mobileNumber,
        topupType: mobValue.topupType,
        originatorType: mobValue.originatorType,
        originatorId: mobValue.originatorId,
        topupAmount: mobValue.topupAmount,
        originatingTime: mobValue.originatingTime,
        statusCode: mobValue.statusCode,
      };
      fetchFilteredDataResponse(body, pageNumber - 1, noOfRecords);
      setFilter(false);
    } else {
      dispatch(
        getDashboardDataByStatus(
          props.location?.state?.statusCode,
          pageNumber - 1,
          noOfRecords
        )
      );
    }
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  const fetchResetDashBoardDataResponse = useCallback(async () => {
    try {
      dispatch(resetDashboardDataByStatus());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (dashBoardData?.data) {
      validateRowSelection();
      setIsLoadingData(false);
    } else {
      setIsLoadingData(true);
    }
  }, [dashBoardData]);

  useEffect(() => {
    if (props.location?.state !== undefined) {
      fetchDashBoardDataResponse(props.location?.state?.statusCode);
      setIsLoadingData(true);
      setValue(props.location?.state?.statusCode);
    }
  }, [fetchDashBoardDataResponse, props.location?.state]);

  let dataCard = dashBoardData?.data?.map((data: any, index: any) => {
    return { ...data, key: index };
  });

  const filteredData = useSelector(
    (state: RootStateOrAny) => state.MobileTopUpReducer?.getFilteredDateresponse
  );

  const fetchFilteredDataResponse = useCallback(
    async (body: any, page: any, pageSize: any) => {
      try {
        dispatch(getFilterData(body, page, pageSize));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (filteredData && filteredData?.data) {
      setIsLoading(false);
    } else if (!filteredData?.data) {
      setIsLoading(false);
    }
  }, [filteredData]);
  useEffect(() => {
    dispatch(resetfilterDatas());
  }, []);

  function hasDecimal(num: any) {
    return !!(num % 1);
  }
  const Header = [
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.toString().localeCompare(b.mobileNumber?.toString()),
      },
      render: (id: any) => {
        return <>{id ? `${id}` : "-"}</>;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.toString().localeCompare(b.customerName?.toString()),
      },
      render: (id: any) => {
        return <>{id ? `${id}` : "-"}</>;
      },
    },
    {
      title: "Top-up Type",
      dataIndex: "topupType",
      key: "topupType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.topupType?.toString().localeCompare(b.topupType?.toString()),
      },
    },
    {
      title: "Originator Type",
      dataIndex: "originatorType",
      key: "originatorType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.originatorType
            ?.toString()
            .localeCompare(b.originatorType?.toString()),
      },
    },
    {
      title: "Top-up Currency",
      dataIndex: "topupCurrency",
      key: "topupCurrency",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.topupCurrency
            ?.toString()
            .localeCompare(b.topupCurrency?.toString()),
      },
    },
    {
      title: "Top-up Amount",
      dataIndex: "topupAmount",
      key: "topupAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.topupAmount?.toString().localeCompare(b.topupAmount?.toString()),
      },
      render: (id: any) => {
        return <>{hasDecimal(id) ? `${id}` : `${id}.00`}</>;
      },
    },
    {
      title: "Remitter ID",
      dataIndex: "originatorId",
      key: "originatorId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.originatorId?.toString().localeCompare(b.originatorId?.toString()),
      },
    },
    {
      title: "Originating Timestamp",
      dataIndex: "originatingTime",
      key: "originatingTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.originatingTime
            ?.toString()
            .localeCompare(b.originatingTime?.toString()),
      },
      render: (id: any) => {
        return <>{id ? `${id}` : "-"}</>;
      },
    },

    {
      title: "Status Code",
      dataIndex: "statusCode",
      key: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.statusCode?.toString().localeCompare(b.statusCode?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            style={{ wordWrap: "break-word", wordBreak: "break-word" }}
            className={` ${
              statusCode === "VALIDATED" ||
              statusCode === "POSTED" ||
              statusCode === "SUCCESS"
                ? "status-validated"
                : statusCode === "ERROR" || statusCode === "FAILURE"
                ? "status-error"
                : (statusCode === "MANUAL_REFUND" ||
                    statusCode === "NO_MATCH" ||
                    statusCode === "MANUAL_CREDIT") &&
                  "status-warning"
            }`}
          >
            {statusCode}
          </label>
        );
      },
    },
  ];
  let originatorTypeSelected = approve?.map((e: any) => {
    return e.originatorType;
  });

  const validateRowSelection = () => {
    if (
      value === "SUCCESS" ||
      value === "MANUAL_REFUND" ||
      value === "MANUAL_CREDIT"
    ) {
      setIsDisabled(true);
    }
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      
      setApprove(selectedRows);
    },
    hideSelectAll: true,
    type: "radio",
    getCheckboxProps: (record: any) => ({
      id: record?.id,
      disabled: isDisabled || record?.originatorType === "IPAY88",
    }),
  };

  const viewUser = (e: any) => {
    history.push({
      pathname: "/dashboard/Mobile-TopUp-Summary/Mobile-TopUp-View",
      state: e,
    });
  };

  const validate = () => {
    let checkOriginatorTypeError = customValidator(
      "originatorType",
      "Originator Type",
      mobValue.originatorType
    );
    let checkStatusCodeError = customValidator(
      "statusCode",
      "Status Code",
      mobValue.statusCode
    );

    if (
      !(checkOriginatorTypeError === "null" && checkStatusCodeError === "null")
    ) {
      setErrors({
        originatorTypeError: checkOriginatorTypeError,
        statusCodeError: checkStatusCodeError,
      });
      return false;
    }
    setErrors({
      originatorTypeError: "",
      statusCodeError: "",
    });
    return true;
  };

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setSearchArea(false);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(true);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  const cancelPrint = () => {
    setPrint(false);
    setcolumns([]);
  };

  const toggleRefresh = () => {
    setSearchArea(false);
    setcolumns([]);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const closeSearch = () => {
    setSearchArea(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      dataCard = dataCard?.filter((e: any) => {
        return (
          e.customerName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.originatorType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.originatingTime
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.mobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.originatorId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.topupAmount
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.topupCurrency
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.topupType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      dataCard = dataCard?.filter((e: any) => {
        if (
          e[searchCategory]
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }
  const handle_FilterSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      let body = {
        mobileNumber: mobValue.mobileNumber,
        topupType: mobValue.topupType,
        originatorType: mobValue.originatorType,
        originatorId: mobValue.originatorId,
        topupAmount: mobValue.topupAmount,
        originatingTime: mobValue.originatingTime,
        statusCode: mobValue.statusCode,
      };
      fetchFilteredDataResponse(body, 0, 7);
      setFilter(false);
    }
  };

  const handleResetFilter = () => {
    setMobValue({
      customerName: "",
      errorDescription: "",
      id: "",
      originatorId: "",
      originatorType: "",
      statusCode: "",
      topupAmount: "",
      topupCurrency: "",
      topupType: "",
      transactionId: "",
      mobileNumber: "",
      originatingTime: "",
    });
  };
  let approveId = approve?.map((e: any) => {
    return e.transactionId;
  });

  const submitHandlers = (
    reason: any,
    reprocess: any,
    refund: any,
    credit: any
  ) => {
    if (approveId[0] === undefined || reprocess === 0) {
      setApiMessage("Please select anyone");
      setApproveError(true);
    } else {
      setIsLoading(true);
      if (
        reprocess === 1 &&
        approveId[0] &&
        originatorTypeSelected[0] === "FPX"
      ) {
        let reprocessData = JSON.stringify({
          transactionId: approveId[0],
          remarks: reason,
        });
        fetchFpxReprocessDataResponse(reprocessData);
      } else if (
        reprocess === 2 &&
        approveId[0] &&
        originatorTypeSelected[0] === "FPX"
      ) {
        let reprocessData = JSON.stringify({
          status: "MANUAL_REFUND",
          transactionId: approveId[0],
          remarks: reason,
        });
        fetchFpxRefundCreditDataResponse(reprocessData);
        setResponse(reprocess);
      } else if (
        reprocess === 3 &&
        approveId[0] &&
        originatorTypeSelected[0] === "FPX"
      ) {
        let reprocessData = JSON.stringify({
          status: "MANUAL_CREDIT",
          transactionId: approveId[0],
          remarks: reason,
        });
        fetchFpxRefundCreditDataResponse(reprocessData);
        setResponse(reprocess);
      } else if (
        reprocess === 1 &&
        approveId[0] &&
        originatorTypeSelected[0] === "JOMPAY"
      ) {
        let reprocessData = JSON.stringify({
          transactionId: approveId[0],
          remarks: reason,
        });
        fetchJompayReprocessDataResponse(reprocessData);
      } else if (
        reprocess === 3 &&
        approveId[0] &&
        originatorTypeSelected[0] === "JOMPAY"
      ) {
        let reprocessData = JSON.stringify({
          status: "MANUAL_CREDIT",
          transactionId: approveId[0],
          remarks: reason,
        });
        fetchJompayRefundCreditDataResponse(reprocessData);
        setResponse(reprocess);
      } else if (
        reprocess === 2 &&
        approveId[0] &&
        originatorTypeSelected[0] === "JOMPAY"
      ) {
        let reprocessData = JSON.stringify({
          status: "MANUAL_REFUND",
          transactionId: approveId[0],
          remarks: reason,
        });
        fetchJompayRefundCreditDataResponse(reprocessData);
        setResponse(reprocess);
      }
    }
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
  };

  const clickBack = () => {
    props.history.push({
      pathname: "/dashboard/Mobile-TopUp-Summary-DashBoard",
    });
    fetchResetDashBoardDataResponse();
  };

  const handle_FilteronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobValue({ ...mobValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="MobileTopUpSummary">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Mobile TopUp Summary"}
          SummaryFileName={"Mobile TopUp Summary"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={dataCard}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={true}
          filterEnabled={filterOption}
          filterArea={toggleFilter}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
        />
      </div>
      {searchArea && (
        <div
          className="d-flex user-search mt-2 mb-3 p-3 cursor"
          style={{ marginLeft: "20px", marginRight: "15px", width: "auto" }}
        >
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected hidden className="cursor">
              Select Field
            </option>

            <option value="customerName" className="cursor">
              Customer Name
            </option>
            <option value="mobileNumber" className="cursor">
              Mobile NO
            </option>
            <option value="originatorType" className="cursor">
              Orginator Type
            </option>
            <option value="originatingTime" className="cursor">
              originating TimeStamp
            </option>
            <option value="originatorId" className="cursor">
              Remitter ID
            </option>
            <option value="topupAmount" className="cursor">
              Topup Amount
            </option>
            <option value="topupCurrency" className="cursor">
              Topup Currency
            </option>
            <option value="topupType" className="cursor">
              Topup Type
            </option>
            <option value="statusCode" className="cursor">
              Status
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            placeholder="Type your search keyword"
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger kyc-FilterSearchButton">Search</Button>
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

      <CustomLoader isLoading={isLoading} size={50} />
      <div className="mt-3">
        {toPrint && (
          <span
            className="span-col1"
            style={{
              textAlign: "center",
              display: "block",
              marginBottom: "10px",
            }}
          >
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
      </div>
      {isLoading ? null : (
        <div className="px-3">
          {filterOption && (
            <div className="colorWhite filter_background mt-3 p-3">
              <p className="branchSetupTitle">Filter</p>
              <div className="container-fluid textboxsTerminal">
                {errors.originatorTypeError &&
                  errors.statusCodeError &&
                  (errors?.originatorTypeError !== "null" ||
                    errors.statusCodeError !== "null") && (
                    <span className="colorRedUser fieldMandatory">
                      {" "}
                      * Indicated field value are mandatory
                    </span>
                  )}
                <div className="row ">
                  <div className="col ps-0">
                    <FormGroup>
                      <Label for="exampleSelect" className="font-text">
                        Mobile No
                      </Label>
                      <Input
                        type="text"
                        name="mobileNumber"
                        className="place_font form-control"
                        placeholder="Enter Mobile Number"
                        value={mobValue?.mobileNumber}
                        onChange={handle_FilteronChange}
                      ></Input>{" "}
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleSelect" className="font-text">
                        Top-up Type
                      </Label>
                      <Input
                        type="text"
                        name="topupType"
                        className="form-control place_font"
                        value={mobValue?.topupType}
                        onChange={handle_FilteronChange}
                      ></Input>{" "}
                    </FormGroup>
                  </div>
                  <div className="col">
                    {" "}
                    <FormGroup>
                      <Label for="exampleEmail" className="font-text">
                        Originator Type{" "}
                        <span className="container-body-label-color">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="originatorType"
                        className="form-control place_font"
                        value={mobValue?.originatorType}
                        onChange={handle_FilteronChange}
                      ></Input>{" "}
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="font-text">
                        Remitter ID
                      </Label>
                      <Input
                        type="text"
                        name="originatorId"
                        className="form-control place_font"
                        placeholder="Enter MID"
                        value={mobValue?.originatorId}
                        onChange={handle_FilteronChange}
                      ></Input>
                    </FormGroup>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col ps-0">
                    <FormGroup>
                      <Label for="exampleEmail" className="font-text">
                        Top-Up Amount
                      </Label>
                      <Input
                        type="text"
                        name="topupAmount"
                        className="form-control place_font"
                        placeholder="Enter Top-up Amount"
                        value={mobValue?.topupAmount}
                        onChange={handle_FilteronChange}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="font-text">
                        Originating Timestamp
                      </Label>
                      <Input
                        type="date"
                        name="originatingTime"
                        className="form-control place_font"
                        placeholder="Enter MID"
                        value={mobValue?.originatingTime}
                        onChange={handle_FilteronChange}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="font-text">
                        Status Code{" "}
                        <span className="container-body-label-color">*</span>
                      </Label>
                      <Input
                        type="select"
                        name="statusCode"
                        className="form-control form-select place_font"
                        value={mobValue?.statusCode}
                        onChange={handle_FilteronChange}
                      >
                        <option hidden>select</option>
                        <option>SUCCESS</option>
                        <option>FAILURE</option>
                        <option>NO_MATCH</option>
                        <option>MANUAL_REFUND</option>
                        <option>MANUAL_CREDIT</option>
                      </Input>
                    </FormGroup>
                  </div>

                  <div className=" col d-flex align-items-end">
                    <SubmitCancelButton
                      button={"Submit"}
                      secondButton={"Reset"}
                      onSubmit={handle_FilterSubmit}
                      onCancel={handleResetFilter}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row btnPositionMob mb-2 pt-2">
            <CustomButton className="backbtnMobile" onClick={clickBack}>
              <TiArrowBackOutline style={{ margin: "auto 5px" }} />
              Back
            </CustomButton>
          </div>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={apiStatus}
              closeMessage={() => closeMessage()}
              message={apiMessage}
              errorFix={approveError}
            />
          )}
          <CustomLoader isLoading={isLoadingData} size={50} />
          {isLoadingData ? null : (
            <div className="mt-3 pt-2" ref={componentRef}>
              <Form form={form} component={false}>
                <CustomHeader
                  TableData={columns.length > 0 ? columns : Header}
                  rowSelection={
                    (props.location?.state?.statusCode === "FAILURE" ||
                      props.location?.state?.statusCode === "DELAYED" ||
                      props.location?.state?.statusCode === "NO_MATCH") &&
                    rowSelection
                  }
                  dataSources={dataCard}
                  columns={Header}
                  handlesubmit={submitHandlers}
                  viewUser={viewUser}
                  RecordsPerPage={RecordsPerPage}
                  prevBatch={prevBatch}
                  nextBatch={nextBatch}
                  serverPagination={true}
                  view={true}
                  totalRecords={
                    filter === false
                      ? filteredData?.data?.length
                      : props.location?.state?.totalCount
                  }
                  approval={toPrint ? false : true}
                  remarkOnly={
                    props.location?.state?.statusCode === "FAILURE" ||
                    props.location?.state?.statusCode === "DELAYED" ||
                    props.location?.state?.statusCode === "NO_MATCH"
                      ? true
                      : false
                  }
                  topupStatus={props.location?.state?.statusCode}
                  CustomTableHeader={
                    filter === false ? filteredData?.data : dataCard
                  }
                  toPrint={columns.length > 0 ? true : false}
                  DisableMange={columns.length > 0 && toPrint ? true : false}
                />
              </Form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileTopupSummaryTable;
