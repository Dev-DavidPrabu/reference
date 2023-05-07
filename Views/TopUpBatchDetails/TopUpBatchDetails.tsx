import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TopUpBatchDetails.scss";
import CustomButton from "../../Components/UI/CustomButton";
import { useHistory, useLocation } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomTable from "../../Components/CustomTable/CustomTable";
import {
  deleteTransactionRecord,
  getTransactionList,
  salaryApprovalSubmit,
  getSalaryBatchList,
  resetApprovalMessage,
  getPrefunfBalanceOftheCompany,
  resetCheckerMessage,
  salaryCheckerSubmit,
  requestOtpChecker,
  resendOtpChecker,
  resetTransactionList,
} from "../../redux/action/TopUpAddActions";
import { AiOutlineDelete } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import moment from "moment";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomPopUpComponent from "../../Components/CustomPopUpComponent/CustomPopUpComponent";
import { Button, Input } from "reactstrap";
import { Checkbox } from "antd";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import { FaReply } from "react-icons/fa";
import OtpInput from "react-otp-input";

function TopUpBatchDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [apiErrMessage, setApiErrMessage] = useState(false);
  const [apiCheckerErrMessage, setApiCheckerErrMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [approvalSubmitError, setApprovalSubmitError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedLinkRecordInfo, setSelectedLinkRecordInfo] = useState(Object);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCheckerAlertModal, setShowCheckerAlertModal] = useState(false);
  const [isWarningPopUp, setWarningPopUp] = useState(false);
  const [otpPopUp, setOtpPopup] = useState(false);
  const [warningOptions, setWarningOptions]: any = useState([]);
  const [deleteAll, setDeleteAll] = useState(false);
  const [linkAll, setLinkAll] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [otpValue, setOtpValue] = useState("");
  const paginationValues = {
    batchId: location?.state?.value?.id,
  };

  let AccountID = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const balanceAccountID = AccountID?.userInfo?.companyUserResponse?.filter(
    (id: any) => id.companyId === location?.state?.value?.companyId
  );
  const userAccessList = location?.state?.userAccessList?.data;

  const salaryBatchList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getSalaryBatchList
  );

  const salaryApprovalMessage: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.salaryApprovalSubmitMessage
  );

  const salaryCheckerMessage: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.salaryCheckerSubmitMessage
  );

  const prefundAccountBalance: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.prefundAccountBalance
  );

  const salaryOtpResponse: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getSalaryOtpResponse
  );

  const salaryOtpResendResponse: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getSalaryResendOtpResponse
  );

  useEffect(() => {
    if (salaryApprovalMessage?.message) {
      setApiErrMessage(true);
      setTimeout(function () {
        setApiErrMessage(false);
        dispatch(resetApprovalMessage());
      }, 5000);
    } else if (
      salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList
        ?.length > 0
    ) {
      setWarningPopUp(true);
      for (
        let i: any = 0;
        i <
        salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList
          ?.length;
        i++
      ) {
        if (
          salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList?.[
            i
          ]?.errorCode
            ?.toString()
            ?.toUpperCase()
            ?.includes("ACCOUNT_NOT_LINKED")
        ) {
          setWarningOptions([
            { label: "Link All", value: "link" },
            { label: "Delete All", value: "delete" },
          ]);
          break;
        } else {
          setWarningOptions([{ label: "Delete All", value: "delete" }]);
        }
      }
    } else if (
      salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList
        ?.length === 0
    ) {
      setWarningPopUp(false);
      window.history.back();
    }
  }, [salaryApprovalMessage]);

  useEffect(() => {
    if (salaryCheckerMessage?.message) {
      setApiCheckerErrMessage(true);
      setTimeout(function () {
        setApiCheckerErrMessage(false);
        dispatch(resetCheckerMessage());
      }, 5000);
    }
  }, [salaryCheckerMessage]);

  const salaryBatchDetail = salaryBatchList?.data;

  const fetchsalaryBatchList = useCallback(async () => {
    try {
      dispatch(getSalaryBatchList(location?.state?.value?.id));
    } catch (err) { }
  }, [dispatch]);

  useEffect(() => {
    fetchsalaryBatchList();
    dispatch(
      getPrefunfBalanceOftheCompany(balanceAccountID?.[0]?.companyAccountId)
    );
  }, [fetchsalaryBatchList, getPrefunfBalanceOftheCompany]);

  let [aprrovalSubmitData, setApprovalSubmitData]: any = useState({
    payrollUploadId: location?.state?.value?.id,
    comments: "",
    companyId: location?.state?.value?.companyId,
    dateToCredit: "",
    description: "",
    prefundBalance: prefundAccountBalance?.balance,
  });

  let [checkerSubmitData, setCheckerSubmitData]: any = useState({
    payrollUploadId: location?.state?.value?.id,
    comments: "",
    companyId: location?.state?.value?.companyId,
    action: "",
    authorizationId: "",
    otp: "",
  });

  const otpRequest = {
    type: "SMS",
    userId: AccountID?.userInfo?.id,
    mobileNumber: AccountID?.userInfo?.mobileNumber,
  };

  const [resendOtpRequest, setResendOtpRequest] = useState({
    authorizationId: "",
  });

  const Header = [
    {
      title: "Row In File",
      dataIndex: "rowNumber",
      key: "rowNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.rowNumber?.toString().localeCompare(b.rowNumber?.toString()),
      },
    },
    {
      title: "Staff ID",
      dataIndex: "employeeStaffId",
      key: "employeeStaffId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.employeeStaffId
            ?.toString()
            .localeCompare(b.employeeStaffId?.toString()),
      },
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.employeeName?.toString().localeCompare(b.employeeName?.toString()),
      },
    },
    {
      title: "Employee ID Value",
      dataIndex: "employeeIdValue",
      key: "employeeIdValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.employeeIdValue
            ?.toString()
            .localeCompare(b.employeeIdValue?.toString()),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "employeeMobileNumber",
      key: "employeeMobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.employeeMobileNumber
            ?.toString()
            .localeCompare(b.employeeMobileNumber?.toString()),
      },
    },
    {
      title: "Pan NO",
      dataIndex: "employeePAN",
      key: "employeePAN",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.employeePAN?.toString().localeCompare(b.employeePAN?.toString()),
      },
    },
    {
      title: "Amount to credit",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentAmount
            ?.toString()
            .localeCompare(b.paymentAmount?.toString()),
      },
    },
    {
      title: "Payment Description",
      dataIndex: "paymentDescription",
      key: "paymentDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentDescription
            ?.toString()
            .localeCompare(b.paymentDescription?.toString()),
      },
    },
    {
      title: "Transaction Status",
      dataIndex: "transactionStatusCode",
      key: "transactionStatusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatusCode
            ?.toString()
            .localeCompare(b.transactionStatusCode?.toString()),
      },
      render: (transactionStatusCode: any) => {
        return (
          <label
            className={` ${transactionStatusCode === "VALIDATED" ||
                transactionStatusCode === "POSTED" ||
                transactionStatusCode === "SUCCESS"
                ? "status-validated"
                : transactionStatusCode === "ERROR" ||
                  transactionStatusCode === "FAILED"
                  ? "status-error"
                  : transactionStatusCode === "WARNING" && "status-warning"
              }`}
          >
            {transactionStatusCode}
          </label>
        );
      },
    },
    {
      title: "Deleted",
      dataIndex: "isDeleted",
      key: "isDeleted",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isDeleted?.toString().localeCompare(b.isDeleted?.toString()),
      },
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">{record.isDeleted ? "Yes" : "No"}</div>
          </div>
        );
      },
    },
    {
      title: "Error Description",
      dataIndex: "errorDetails",
      key: "errorDetails",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.batchStatusCode
            ?.toString()
            .localeCompare(b.batchStatusCode?.toString()),
      },
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div className="col d-flex">
            <div className="col-10">{record.errorDetails}</div>
            {AccountID?.userInfo?.companyUser &&
              !userAccessList?.[0]?.approvalLevelOne &&
              location?.state?.value?.batchStatusCode === "CREATED" && (
                <div className="col-2 p-1">
                  {record?.transactionStatusCode === "WARNING" &&
                    !record.isDeleted && (
                      <>
                        {" "}
                        <div
                          className="manage-button p-0 cursor disable-background "
                          onClick={() => handleDelete(record)}
                        >
                          <AiOutlineDelete />
                        </div>
                        {record?.errorCode === "ACCOUNT_NOT_LINKED" &&
                          record?.actionFlag != "EMPLOYEE_LINK" && (
                            <div
                              className="pt-2 manage-button p-0 cursor disable-background"
                              onClick={() => handleLink(record)}
                            >
                              {" "}
                              <FiLink />
                            </div>
                          )}
                      </>
                    )}
                </div>
              )}
          </div>
        );
      },
    },
  ];

  const salaryTransactionList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getAllTransactionList
  );

  let transactionList = salaryTransactionList?.data?.content;

  const fetchInitialBatch = useCallback(async () => {
    try {
      dispatch(getTransactionList(paginationValues, 1, 7));
    } catch (err) { }
  }, [dispatch]);

  useEffect(() => {
    fetchInitialBatch().then(() => {
      if (!salaryTransactionList?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchInitialBatch]);

  useEffect(() => {
    if (salaryTransactionList) {
      if (salaryTransactionList.data) {
        setIsLoading(false);
      }
    }
  }, [salaryTransactionList]);

  useEffect(() => {
    if (salaryOtpResponse) {
      if (salaryOtpResponse.data) {
        setCheckerSubmitData({
          ...checkerSubmitData,
          authorizationId: salaryOtpResponse?.data?.authorizationId,
        });
        setResendOtpRequest({
          ...resendOtpRequest,
          authorizationId: salaryOtpResponse?.data?.authorizationId,
        });
      }
    }
  }, [salaryOtpResponse]);

  const RecordsPerPage = (noOfRecords: number) => {
    dispatch(getTransactionList(paginationValues, 1, noOfRecords));
  };

  const prevBatch = (pageNummber: number, noOfRecords: number) => {
    dispatch(getTransactionList(paginationValues, pageNummber, noOfRecords));
  };

  const nextBatch = (pageNummber: number, noOfRecords: number) => {
    dispatch(getTransactionList(paginationValues, pageNummber, noOfRecords));
  };

  const cancel_handlePopUp = () => {
    dispatch(resetTransactionList());
    history.push({
      pathname: "/dashboard/Topup-Add",
    });
  };

  const approvalSubmit_onChange = (
    e: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    setApprovalSubmitData({
      ...aprrovalSubmitData,
      prefundBalance: prefundAccountBalance?.balance,
      [e.target.name]: e.target.value,
    });
  };

  const checkerSubmit_onChange = (
    e: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    setCheckerSubmitData({
      ...checkerSubmitData,
      [e.target.name]: e.target.value,
    });
  };

  const validateApprovalSubmit = () => {
    if (
      aprrovalSubmitData?.dateToCredit.length === 0 ||
      aprrovalSubmitData?.description.length === 0
    ) {
      setApprovalSubmitError(true);
      return false;
    } else {
      setApprovalSubmitError(false);
    }
    return true;
  };

  const checkBox_onChange = (e: any) => {
    if (e.includes("link") && e.includes("delete")) {
      setLinkAll(true);
      setDeleteAll(true);
    } else if (e.includes("link")) {
      setLinkAll(true);
      setDeleteAll(false);
    } else if (e.includes("delete")) {
      setLinkAll(false);
      setDeleteAll(true);
    } else {
      setLinkAll(false);
      setDeleteAll(false);
    }
  };

  const otp_OnChange = (e: any) => {
    setOtpValue(e);
  };

  const approval_submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateApprovalSubmit()) {
      if (
        salaryBatchDetail?.totalExpectedAmount > prefundAccountBalance?.balance
      ) {
        setShowAlertModal(true);
      } else {
        dispatch(salaryApprovalSubmit(aprrovalSubmitData));
      }
    }
  };

  const warning_onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    aprrovalSubmitData.salaryUploadMakerActionRequest = {
      deleteAll: deleteAll,
      linkAll: linkAll,
    };
    dispatch(salaryApprovalSubmit(aprrovalSubmitData));
  };

  const handleWarningPopUp = () => {
    setLinkAll(false);
    setDeleteAll(false);
    setWarningPopUp(false);
    dispatch(resetApprovalMessage());
  };

  const alertConfirm_onClick = () => {
    setShowAlertModal(false);
    dispatch(salaryApprovalSubmit(aprrovalSubmitData));
  };

  const alertCheckerConfirm_onClick = () => {
    setShowCheckerAlertModal(false);
    setOtpPopup(true);
    dispatch(requestOtpChecker(otpRequest));
  };

  const checker_submitHandler = (e: any) => {
    checkerSubmitData.action = e.target.name;
    if (
      salaryBatchDetail?.totalExpectedAmount > prefundAccountBalance?.balance &&
      e.target.name != "REJECTED"
    ) {
      setShowCheckerAlertModal(true);
    } else {
      setOtpPopup(true);
      dispatch(requestOtpChecker(otpRequest));
    }
  };

  const otpChecker_submitHandler = (e: any) => {
    e.preventDefault();
    checkerSubmitData.otp = otpValue;
    dispatch(salaryCheckerSubmit(checkerSubmitData));
    setOtpPopup(false);
  };

  const resendOtp_onClickHandler = () => {
    dispatch(resendOtpChecker(resendOtpRequest));
  };

  const closeDeleteConfimation = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteTransactionRecord(recordId, "DELETE"));
      } catch (err) { }
    },
    [dispatch]
  );

  const closeLinkConfimation = () => {
    setShowLinkModal(!showLinkModal);
  };
  const handleLink = (recordInfo: any) => {
    setShowLinkModal(!showLinkModal);
    setSelectedLinkRecordInfo(recordInfo);
  };
  const linkTheSelectedRecord = (recordInfo: any) => {
    linkSelectedRecord(recordInfo?.id).then(() => {
      setShowLinkModal(!showLinkModal);
    });
  };
  const linkSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteTransactionRecord(recordId, "EMPLOYEE_LINK"));
      } catch (err) { }
    },
    [dispatch]
  );

  const onClick_rejectionReport = () => {
    history.push({
      pathname: "/dashboard/Topup-Add/Topup-RejectionReport",
      state: {
        value: {
          id: location?.state?.value?.id,
          totalRecords: location?.state?.value?.totalRecords,
          batchReferenceNumber: salaryBatchDetail?.referenceNumber,
        },
      },
    });
  };

  const closeErrMessage = () => {
    setApiErrMessage(false);
  };

  const closeCheckerErrMessage = () => {
    setApiCheckerErrMessage(false);
  };

  const closeAlertConfimation = () => {
    setShowAlertModal(false);
  };

  const closeCheckerAlertConfimation = () => {
    setShowCheckerAlertModal(false);
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
    window.location.reload();
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      transactionList = transactionList?.filter((e: any) => {
        return (
          e.rowNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.paymentDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.employeePAN
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.employeeIdValue
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.employeeMobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.employeeName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.paymentAmount
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.transactionStatusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      transactionList = transactionList?.filter((e: any) => {
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

  return (
    <div className="SalaryUpload">
      <div className="p-3">
        <CommonHeaderSummary
          RightContent={"Topup Add"}
          SummaryFileName={
            salaryBatchDetail?.cardsFileName
              ? salaryBatchDetail?.cardsFileName
              : salaryBatchDetail?.referenceNumber
          }
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={transactionList}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={false}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
          BackAction={cancel_handlePopUp}
          Back={true}
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

            <option value="rowNumber" className="cursor">
              Row In File
            </option>
            <option value="paymentDescription" className="cursor">
              Payment Description
            </option>
            <option value="employeePAN" className="cursor">
              Pan NO
            </option>
            <option value="employeeIdValue" className="cursor">
              Employee ID Value
            </option>
            <option value="employeeMobileNumber" className="cursor">
              Mobile No
            </option>
            <option value="employeeName" className="cursor">
              Employee Name
            </option>
            <option value="paymentAmount" className="cursor">
              Amount to credit
            </option>
            <option value="transactionStatusCode" className="cursor">
              Transaction Status
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
      <form onSubmit={approval_submitHandler}>
        <div className="aprrovalSubmit-form m-3">
          {location?.state?.value?.batchStatusCode === "CREATED" && (
            <div className="kyc-warningText m-2 me-4">
              {" "}
              ** Please input mandatory fields.
            </div>
          )}
          <div className="pt-5 justify-content-between align-items-center p-4 ">
            <div className="col d-flex">
              <div className="col-3">
                <div className="col">
                  <label className="approvalSubmit-label">Batch date</label>
                </div>
                <div className="col-10">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={location?.state?.value?.createdDate}
                    style={{
                      background: "#CFCFCF",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-3" style={{ marginLeft: "-30px" }}>
                <div className="col">
                  <label className="approvalSubmit-label">Batch UID</label>
                </div>
                <div className="col">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={location?.state?.value?.batchId}
                    style={{
                      background: "#CFCFCF",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="col">
                  <label className="approvalSubmit-label">
                    No Of Entries Expected / Actuals
                  </label>
                </div>
                <div className="col d-flex me-2">
                  <div className="col-4">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={salaryBatchDetail?.totalExpectedRecords}
                      style={{
                        background: "#CFCFCF",
                        borderRadius: "0px",
                        height: "35px",
                        width: "100%",
                      }}
                      readOnly={true}
                    />
                  </div>

                  <div className="col-0 mx-2">
                    <span
                      style={{
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "100",
                      }}
                    >
                      {" "}
                      /{" "}
                    </span>
                  </div>

                  <div className="col-4">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={location?.state?.value?.totalRecords}
                      style={{
                        background: "#CFCFCF",
                        borderRadius: "0px",
                        height: "35px",
                        width: "100%",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="col-10">
                  <label className="approvalSubmit-label">
                    Total Amount Expected / Actuals
                  </label>
                </div>
                <div className="col d-flex ">
                  <div className="col-6">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={salaryBatchDetail?.totalExpectedAmount}
                      style={{
                        background: "#CFCFCF",
                        borderRadius: "0px",
                        height: "35px",
                        width: "100%",
                      }}
                      readOnly={true}
                    />
                  </div>

                  <div className="col-0 mx-2">
                    <span
                      style={{
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "100",
                      }}
                    >
                      {" "}
                      /{" "}
                    </span>
                  </div>

                  <div className="col-6">
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={location?.state?.value?.totalAmount}
                      style={{
                        background: "#CFCFCF",
                        borderRadius: "0px",
                        height: "35px",
                        width: "100%",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="col d-flex">
              <div className="col-3">
                <div className="col">
                  <label className="approvalSubmit-label">
                    Date to Credit{" "}
                    {location?.state?.value?.batchStatusCode === "CREATED" && (
                      <span className="span-col" style={{ marginLeft: "5px" }}>
                        *
                      </span>
                    )}
                  </label>
                </div>
                <div className="col-10">
                  {location?.state?.value?.batchStatusCode === "CREATED" ? (
                    <input
                      className={
                        approvalSubmitError
                          ? "ApprovalValidation-error edit-sum-input form-control"
                          : "border-0 edit-sum-input form-control"
                      }
                      type="date"
                      name={"dateToCredit"}
                      onChange={approvalSubmit_onChange}
                      min={moment().format("YYYY-MM-DD")}
                      style={{
                        borderRadius: "0px",
                        height: "35px",
                      }}
                    />
                  ) : (
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      value={location?.state?.value?.dateToCredit}
                      style={{
                        background: "#CFCFCF",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  )}
                </div>
              </div>

              <div className="col-3" style={{ marginLeft: "-30px" }}>
                <div className="col">
                  <label className="approvalSubmit-label">
                    Prefund Account Balance{" "}
                  </label>
                </div>
                <div className="col">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={prefundAccountBalance?.balance}
                    style={{
                      background: "#CFCFCF",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-3">
                <div className="col">
                  <label className="approvalSubmit-label">Batch Status </label>
                </div>
                <div className="col-11">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={location?.state?.value?.batchStatusCode}
                    style={{
                      background: "#CFCFCF",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-2">
                <div className="col">
                  <label className="approvalSubmit-label">Total Error</label>
                </div>
                <div className="col-7">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={salaryBatchDetail?.totalError}
                    style={{
                      background: "#CFCFCF",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2" style={{ marginLeft: "-30px" }}>
                <div className="col">
                  <label className="approvalSubmit-label">
                    Total Error Amount
                  </label>
                </div>
                <div className="col">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={salaryBatchDetail?.totalErrorAmount}
                    style={{
                      background: "#CFCFCF",

                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center p-4 ">
            <div className="col d-flex">
              <div className="col-6">
                <div className="col">
                  <label className="approvalSubmit-label">Company Name </label>
                </div>
                <div className="col me-5">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    name={"description"}
                    value={location?.state?.value?.companyName}
                    style={{
                      width: "92%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                      background: "#CFCFCF",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-6" style={{ marginLeft: "-30px" }}>
                <div className="col">
                  <label className="approvalSubmit-label">
                    Batch Transaction Reference{" "}
                    {location?.state?.value?.batchStatusCode === "CREATED" && (
                      <span className="span-col" style={{ marginLeft: "5px" }}>
                        *
                      </span>
                    )}
                  </label>
                </div>
                <div className="col ">
                  {location?.state?.value?.batchStatusCode === "CREATED" ? (
                    <input
                      className={
                        approvalSubmitError
                          ? "ApprovalValidation-error edit-sum-input form-control"
                          : "border-0 edit-sum-input form-control"
                      }
                      type="text"
                      name={"description"}
                      onChange={approvalSubmit_onChange}
                      style={{
                        width: "105%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                    />
                  ) : (
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      name={"description"}
                      value={location?.state?.value?.description}
                      style={{
                        width: "105%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                        background: "#CFCFCF",
                      }}
                      readOnly={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center p-4 ">
            <div className="col d-flex">
              <div className="col-6">
                <div className="col">
                  <label className="approvalSubmit-label">
                    Maker Comments{" "}
                    {location?.state?.value?.batchStatusCode === "CREATED" && (
                      <span className="span-col" style={{ marginLeft: "5px" }}>
                        *
                      </span>
                    )}
                  </label>
                </div>
                <div className="col me-5">
                  {location?.state?.value?.batchStatusCode === "CREATED" ? (
                    <input
                      className={
                        approvalSubmitError
                          ? "ApprovalValidation-error edit-sum-input form-control"
                          : "border-0 edit-sum-input form-control"
                      }
                      type="text"
                      name={"comments"}
                      onChange={approvalSubmit_onChange}
                      style={{
                        width: "92%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                    />
                  ) : (
                    <input
                      className="border-0 edit-sum-input form-control"
                      type="text"
                      name={"comments"}
                      value={location?.state?.value?.makerComments}
                      style={{
                        width: "92%",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                        background: "#CFCFCF",
                      }}
                      readOnly={true}
                    />
                  )}
                </div>
              </div>
              {location?.state?.value?.batchStatusCode != "CREATED" && (
                <div className="col-6" style={{ marginLeft: "-30px" }}>
                  <div className="col">
                    <label className="approvalSubmit-label">
                      Checker Comments{" "}
                      {location?.state?.value?.batchStatusCode ===
                        "PENDING_APPROVAL" &&
                        userAccessList?.[0]?.approvalLevelOne && (
                          <span
                            className="span-col"
                            style={{ marginLeft: "5px" }}
                          >
                            *
                          </span>
                        )}
                    </label>
                  </div>
                  <div className="col">
                    {location?.state?.value?.batchStatusCode ===
                      "PENDING_APPROVAL" &&
                      userAccessList?.[0]?.approvalLevelOne ? (
                      <input
                        className={
                          approvalSubmitError
                            ? "ApprovalValidation-error edit-sum-input form-control"
                            : "border-0 edit-sum-input form-control"
                        }
                        type="text"
                        name={"comments"}
                        onChange={checkerSubmit_onChange}
                        style={{
                          width: "105%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                      />
                    ) : (
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        name={"comments"}
                        value={location?.state?.value?.checkerComments}
                        style={{
                          width: "105%",
                          minWidth: "150px",
                          borderRadius: "0px",
                          height: "35px",
                          background: "#CFCFCF",
                        }}
                        readOnly={true}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {AccountID?.userInfo?.companyUser &&
            !userAccessList?.[0]?.approvalLevelOne &&
            location?.state?.value?.batchStatusCode === "CREATED" && (
              <div className="ps-4 pb-3 mt-0">
                <CustomButton
                  color="danger kyc-FilterSearchButton"
                  className="btn2"
                >
                  Submit
                </CustomButton>
                <CustomButton
                  color="secondary"
                  className="btn2"
                  component={"payrollEnquiry"}
                  onClick={cancel_handlePopUp}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  color="success"
                  onClick={onClick_rejectionReport}
                  className="btn2"
                >
                  Rejection Report
                </CustomButton>
              </div>
            )}
          {AccountID?.userInfo?.companyUser &&
            userAccessList?.[0]?.approvalLevelOne &&
            location?.state?.value?.batchStatusCode === "PENDING_APPROVAL" && (
              <div className="ps-4 pb-3 mt-0">
                <CustomButton
                  color="success"
                  name="APPROVED"
                  onClick={checker_submitHandler}
                  className="btn2"
                >
                  Approve
                </CustomButton>
                <CustomButton
                  color="danger"
                  name="REJECTED"
                  onClick={checker_submitHandler}
                  className="btn2"
                >
                  Reject
                </CustomButton>
                <CustomButton
                  color="secondary"
                  className="btn2"
                  component={"payrollEnquiry"}
                  onClick={cancel_handlePopUp}
                >
                  Cancel
                </CustomButton>
              </div>
            )}
        </div>
      </form>

      {apiErrMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeErrMessage}
            message={salaryApprovalMessage?.message}
          />
        </div>
      )}

      {apiCheckerErrMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeCheckerErrMessage}
            message={
              salaryCheckerMessage?.message + " " + salaryCheckerMessage?.error
            }
          />
        </div>
      )}

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
            <a
              onClick={Print}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </a>{" "}
            to confirm and Print !. Or{" "}
            <a
              onClick={cancelPrint}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Cancel
            </a>
          </span>
        )}
      </div>

      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div
          className="p-3 mb-5"
          ref={componentRef}
          style={{ marginTop: "10px" }}
        >
          <CustomTable
            RecordsPerPage={RecordsPerPage}
            prevBatch={prevBatch}
            nextBatch={nextBatch}
            TableData={columns.length > 0 ? columns : Header}
            totalRecords={location?.state?.value?.totalRecords}
            CustomTableHeader={transactionList}
            DisableMange={true}
            toPrint={toPrint ? true : false}
            serverPagination={true}
          />
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimation}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
      <DeleteConfirmaionPopUp
        showModal={showLinkModal}
        closeDeleteConfirmation={closeLinkConfimation}
        selectedFestivalInfo={selectedLinkRecordInfo}
        deleteTheSelectedRecord={linkTheSelectedRecord}
        approvalReject={"Are you sure you want to Link this account?"}
      ></DeleteConfirmaionPopUp>
      <DeleteConfirmaionPopUp
        showModal={showAlertModal}
        closeDeleteConfirmation={closeAlertConfimation}
        deleteTheSelectedRecord={alertConfirm_onClick}
        approvalReject={
          "Prefund Account Balance is less than the Expected Amount. Are you sure you want to Proceed?"
        }
      ></DeleteConfirmaionPopUp>
      <DeleteConfirmaionPopUp
        showModal={showCheckerAlertModal}
        closeDeleteConfirmation={closeCheckerAlertConfimation}
        deleteTheSelectedRecord={alertCheckerConfirm_onClick}
        approvalReject={
          "Prefund Account Balance is less than the Expected Amount. Are you sure you want to Proceed?"
        }
      ></DeleteConfirmaionPopUp>
      {isWarningPopUp && (
        <CustomPopUpComponent heading={"Warning List"}>
          <form onSubmit={warning_onSubmit}>
            <div className="box-content">
              {salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList?.map(
                (e: any) => (
                  <>
                    <div className="row d-flex mb-2 ">
                      <div className="col-3 ">
                        <label style={{ marginRight: "0px" }}>Error Code</label>
                      </div>
                      <div className="col-7 p-0" style={{ marginLeft: "5px" }}>
                        <Input
                          type="text"
                          className="border-0 referenceData-readOnly"
                          value={e?.errorCode}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="row d-flex mb-2 ">
                      <div className="col-3 ">
                        <label style={{ marginRight: "0px" }}>
                          Row Numbers
                        </label>
                      </div>
                      <div className="col-7 p-0" style={{ marginLeft: "5px" }}>
                        <Input
                          type="textarea"
                          className="border-0 referenceData-readOnly"
                          value={e?.rowNumber}
                          readOnly={true}
                        />
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
            <div style={{ padding: "0 40px 10px 165px" }}>
              <Checkbox.Group
                options={warningOptions}
                onChange={checkBox_onChange}
              />
            </div>
            <div style={{ padding: "0 40px 30px 165px" }}>
              <CustomButton
                color="danger kyc-FilterSearchButton"
                className="btn2"
              >
                Submit
              </CustomButton>
              <CustomButton
                color="secondary"
                className="btn2"
                component={"payrollEnquiry"}
                onClick={handleWarningPopUp}
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </CustomPopUpComponent>
      )}
      {otpPopUp && (
        <CustomPopUpComponent heading={"OTP Verification"}>
          <form onSubmit={otpChecker_submitHandler}>
            <div className="box-content">
              <div className="topup_otp">
                <div className="topup_otpHeading">
                  We have sent the Verification code to this registered Number
                  <h5 className="topup_otpNumber">
                    {AccountID?.userInfo?.mobileNumber}
                  </h5>
                </div>
              </div>

              <>
                <div className="row d-flex mb-2 mt-2">
                  <div
                    className="col-3 mt-auto mb-auto"
                    style={{ marginLeft: "30px", alignItems: "center" }}
                  >
                    <h6>OTP Code</h6>
                  </div>
                  <div className="col-7 p-0" style={{ marginLeft: "-30px" }}>
                    <OtpInput
                      value={otpValue}
                      onChange={otp_OnChange}
                      inputStyle={"topup_otpInputBox"}
                      numInputs={6}
                      isInputNum={true}
                    />
                  </div>
                </div>
              </>
            </div>
            <div style={{ padding: "0 40px 20px 165px" }}>
              <CustomButton
                color="danger kyc-FilterSearchButton"
                className="btn2"
                disabled={otpValue?.length === 6 ? false : true}
              >
                Continue
              </CustomButton>
              <CustomButton
                color="secondary"
                className="btn2"
                component={"payrollEnquiry"}
                onClick={() => setOtpPopup(false)}
              >
                Cancel
              </CustomButton>
            </div>
            <div>
              <div className="topup_otpFooter">
                Didn't get OTP?{" "}
                <span
                  className="topup_otpResend cursor"
                  onClick={resendOtp_onClickHandler}
                >
                  RESEND
                </span>
              </div>
            </div>
          </form>
        </CustomPopUpComponent>
      )}
    </div>
  );
}

export default TopUpBatchDetails;
