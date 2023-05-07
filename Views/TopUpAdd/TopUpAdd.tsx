import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TopUpAdd.scss";
import { Link } from "react-router-dom";
import CustomButton from "../../Components/UI/CustomButton";
import { GoPlus } from "react-icons/go";
import CustomPopUpComponent from "../../Components/CustomPopUpComponent/CustomPopUpComponent";
import * as XLSX from "xlsx";
import {
  deletebatch,
  getSalaryUploadBatchList,
  resetApprovalMessage,
  resetDeleteBatch,
  resetUploadMessage,
  salaryFileUpload,
  getUserAccess,
  resetCheckerMessage,
  getSalaryFileNameValidations,
} from "../../redux/action/TopUpAddActions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomInput from "../../Components/UI/CustomInput";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import moment from "moment";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlineDelete,
  AiOutlinePrinter,
  AiOutlineProfile,
} from "react-icons/ai";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import Select from "react-select";
import { SelectOptionCategory } from "../../models/ReferenceDataModel";
import { Button, Input } from "reactstrap";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import { FiSearch } from "react-icons/fi";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { filterTableData } from "../../Constants/HelperFunction";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import { useReactToPrint } from "react-to-print";
import { FaReply } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function TopUpAdd() {
  const dispatch = useDispatch();
  const [isPopUp, setPopUp] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [fileNameError, setFileNameError] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiErrMessage, setApiErrMessage] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState(false);
  const [ApprovalRejectMessage, setApprovalRejectMessage] = useState(false);
  const [deleteBatchMessage, setdeleteBatchMessage] = useState(false);
  const [deleteBatchErrMessage, setdeleteBatchErrMessage] = useState(false);
  const [acknowledgement, setacknowledgement] = useState(false);
  const [disableAcknowledge, setdisableAcknowledge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [deleteComments, setDeleteComments] = useState("");
  const [apiCheckerMessage, setApiCheckerMessage] = useState(false);
  const [companyNameId, setCompanyNameId] = useState("");
  const [nextFileName, setNextFileName] = useState("");
  const [fileType, setFileType]: any = useState({});
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPdfModal, setshowPdfModal] = useState(false);
  const [showPrintModal, setshowPrintModal] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showList, setShowList] = useState(false);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const componentRef = useRef<any>();
  const [fileUploadData, setFileUploadData]: any = useState({
    fileupload: [],
    fileType: "",
    description: "",
  });

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const companyID = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const companyList = companyID?.userInfo?.companyUserResponse?.map(
    (id: any) => id?.companyId
  );

  const Companyoptions: any = companyID?.userInfo?.companyUserResponse?.map(
    (option: any) => {
      return { label: option.companyName, value: option.companyId };
    }
  );

  const salaryPaymentList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getAllSalaryList
  );

  const userAccessList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getUserAccessList
  );

  const salaryValidationList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getSalaryValidations
  );

  const salaryUploadApiMessage: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.salaryUploadMessage
  );

  const salaryApprovalMessage: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.salaryApprovalSubmitMessage
  );

  const salaryCheckerMessage: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.salaryCheckerSubmitMessage
  );

  const deleteBatch: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.deleteBatch
  );

  let salaryList = salaryPaymentList?.data;

  salaryList = salaryList?.filter(
    (list: any) => list?.batchStatusCode !== "DELETED"
  );

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("SAL_PAY"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  const fetchsalaryList = useCallback(async () => {
    try {
      dispatch(getSalaryUploadBatchList(companyList));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchsalaryList().then(() => {
      if (!salaryPaymentList?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchsalaryList]);

  useEffect(() => {
    if (salaryPaymentList) {
      if (salaryPaymentList.data) {
        setIsLoading(false);
      }
    }
  }, [salaryPaymentList]);

  useEffect(() => {
    if (salaryValidationList) {
      if (salaryValidationList?.data) {
        setNextFileName(salaryValidationList?.data?.fileName);
        setFileType(salaryValidationList?.data?.fileTypeAndHsahingValue);
      }
    }
  }, [salaryValidationList]);

  const fetchFileNameValidationList = useCallback(async () => {
    try {
      if (Companyoptions?.length === 1) {
        dispatch(getSalaryFileNameValidations(Companyoptions?.[0]?.value));
      }
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchFileNameValidationList().then(() => {
      if (salaryValidationList?.data) {
        setNextFileName(salaryValidationList?.data?.fileName);
        setFileType(salaryValidationList?.data?.fileTypeAndHsahingValue);
      }
    });
  }, [nextFileName]);

  useEffect(() => {
    if (salaryUploadApiMessage?.data) {
      setApiMessage(true);
      setApiErrMessage(false);
      setPopUp(false);
      setdisableAcknowledge(false);
      setCompanyNameId("");
      setFileUploadData({
        fileupload: [],
        fileType: "",
        description: "",
      });
      setNextFileName("");
      setFileType({});
      setTimeout(function () {
        setApiMessage(false);
        window.location.reload();
        dispatch(resetUploadMessage());
      }, 4000);
    } else if (salaryUploadApiMessage?.message) {
      setPopUp(false);
      setApiMessage(false);
      setApiErrMessage(true);
      setdisableAcknowledge(false);
      setCompanyNameId("");
      setFileUploadData({
        fileupload: [],
        fileType: "",
        description: "",
      });
      setNextFileName("");
      setFileType({});
      setTimeout(function () {
        setApiErrMessage(false);
        window.location.reload();
        dispatch(resetUploadMessage());
      }, 4000);
    } else if (
      salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList
        ?.length === 0 &&
      salaryApprovalMessage?.data &&
      salaryApprovalMessage?.data?.batchError === null
    ) {
      setApprovalMessage(true);

      setTimeout(function () {
        setApprovalMessage(false);
        dispatch(resetApprovalMessage());
      }, 5000);
    } else if (
      salaryApprovalMessage?.data?.salaryUploadMakerWarningResponseList
        ?.length === 0 &&
      salaryApprovalMessage?.data &&
      salaryApprovalMessage?.data?.batchError !== null
    ) {
      setApprovalRejectMessage(true);

      setTimeout(function () {
        setApprovalRejectMessage(false);
        dispatch(resetApprovalMessage());
      }, 5000);
    }
  }, [salaryUploadApiMessage]);

  useEffect(() => {
    if (deleteBatch?.data) {
      setdeleteBatchMessage(true);
      setdeleteBatchErrMessage(false);
      setTimeout(function () {
        setdeleteBatchMessage(false);
        dispatch(resetDeleteBatch());
        window.location.reload();
      }, 4000);
    } else if (deleteBatch?.message) {
      setdeleteBatchErrMessage(true);
      setdeleteBatchMessage(false);
      setTimeout(function () {
        setdeleteBatchErrMessage(false);
        dispatch(resetDeleteBatch());
      }, 5000);
    }
  }, [deleteBatch]);

  useEffect(() => {
    if (salaryCheckerMessage?.data) {
      setApiCheckerMessage(true);
      setTimeout(function () {
        setApiCheckerMessage(false);
        dispatch(resetCheckerMessage());
      }, 5000);
    }
  }, [salaryCheckerMessage]);

  const deletingTheSelectedRecord = useCallback(
    async (recordId: string, deleteComment: string) => {
      try {
        dispatch(deletebatch(recordId, deleteComment));
      } catch (err) {}
    },
    [dispatch]
  );

  const Header = [
    {
      title: "Batch Date",
      dataIndex: "createdDate",
      key: "createdDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.createdDate?.toString().localeCompare(b.createdDate?.toString()),
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyName?.toString().localeCompare(b.companyName?.toString()),
      },
    },
    {
      title: "Batch Ref.No",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.referenceNumber
            ?.toString()
            .localeCompare(b.referenceNumber?.toString()),
      },
    },
    {
      title: "Batch Transaction Reference",
      dataIndex: "description",
      key: "description",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.description?.toString().localeCompare(b.description?.toString()),
      },
    },
    {
      title: "Date to Credit",
      dataIndex: "dateToCredit",
      key: "dateToCredit",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.dateToCredit?.toString().localeCompare(b.dateToCredit?.toString()),
      },
    },
    {
      title: "No of Entries",
      dataIndex: "totalRecords",
      key: "totalRecords",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalRecords?.toString().localeCompare(b.totalRecords?.toString()),
      },
    },
    {
      title: "Total Credit Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalAmount?.toString().localeCompare(b.totalAmount?.toString()),
      },
    },
    {
      title: "Batch Status",
      dataIndex: "batchStatusCode",
      key: "batchStatusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.batchStatusCode
            ?.toString()
            .localeCompare(b.batchStatusCode?.toString()),
      },
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">
              <div className="col-11">
                {record?.batchStatusCode !== "VALIDATING" &&
                record?.batchStatusCode !== "DELETED" ? (
                  <Link
                    to={{
                      pathname: "/dashboard/Topup-Add/Topup-BatchDetails",
                      state: { value: record, userAccessList: userAccessList },
                    }}
                  >
                    {record?.batchStatusCode}
                  </Link>
                ) : (
                  record?.batchStatusCode
                )}
              </div>
              {companyID?.userInfo?.companyUser &&
                !userAccessList?.data?.[0]?.approvalLevelOne &&
                (record?.batchStatusCode === "VALIDATING" ||
                  record?.batchStatusCode === "CREATED") && (
                  <div
                    className="manage-button p-0 cursor disable-background col-1"
                    onClick={() => handleDelete(record)}
                  >
                    <AiOutlineDelete />
                  </div>
                )}
            </div>
          </div>
        );
      },
    },
  ];

  if (
    companyID?.userInfo?.companyUser &&
    userAccessList?.data?.[0]?.approvalLevelOne
  ) {
    salaryList = salaryList?.reduce((acc: any, element: any) => {
      if (element.batchStatusCode === "PENDING_APPROVAL") {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);
  }

  let pendingCount = 0;

  for (let i: any = 0; i < salaryList?.length; i++) {
    if (salaryList?.[i]?.batchStatusCode === "PENDING_APPROVAL") {
      pendingCount++;
    }
  }

  const handlePopUp = () => {
    setacknowledgement(false);
    setPopUp(!isPopUp);
    setFileUploadError(false);
    setFileNameError(false);
    setCompanyNameId("");
    setFileUploadData({
      fileupload: [],
      fileType: "",
      description: "",
    });
    setNextFileName("");
    setFileType({});
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeErrMessage = () => {
    setApiErrMessage(false);
  };

  const closeApprovalMessage = () => {
    setApprovalMessage(false);
  };

  const closeApprovalRejectMessage = () => {
    setApprovalRejectMessage(false);
  };

  const closeBatchMessage = () => {
    setdeleteBatchMessage(false);
  };

  const closeBatchErrMessage = () => {
    setdeleteBatchErrMessage(false);
  };

  const closeCheckerMessage = () => {
    setApiCheckerMessage(false);
  };

  let lastDot,
    ext = "",
    fileName = "";
  const validateFileUpload = () => {
    lastDot = fileUploadData.fileupload?.name?.lastIndexOf(".");
    ext = fileUploadData.fileupload?.name?.substring(lastDot + 1);
    fileName = fileUploadData.fileupload?.name?.substring(0, lastDot);
    const date = new Date();
    const formattedDate = moment(date).format("YYYYMMDD");

    if (
      fileUploadData.fileupload.length === 0 ||
      fileUploadData.fileType.length === 0
    ) {
      setFileUploadError(true);
      return false;
    } else if (ext !== fileUploadData.fileType) {
      setFileUploadError(true);
      setFileNameError(false);
      return false;
    } else if (
      fileName.substring(0, 3) !== "PAY" ||
      fileName.substring(3, 11) !== formattedDate ||
      !/^\d+$/.test(fileName.substring(11)) ||
      fileName.substring(11).length !== 2
    ) {
      setFileNameError(true);
      setFileUploadError(false);
      return false;
    } else if (Companyoptions?.length !== 1 && companyNameId?.length === 0) {
      setFileUploadError(true);
      setFileNameError(false);
      return false;
    } else {
      setFileUploadError(false);
      setFileNameError(false);
    }
    return true;
  };

  const filetype_onChange = (e: any) => {
    setFileUploadData({ ...fileUploadData, [e.target.name]: e.target.value });
  };

  const handleUpload = (e: any) => {
    e.preventDefault();

    var files = e.target.files,
      f = files[0];
    setFileUploadData({ ...fileUploadData, fileupload: f });
    var reader = new FileReader();
    reader.onload = function (ev: any) {
      var data = ev.target.result;
      let readedData = XLSX.read(data, { type: "binary" });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      const dataParse: any = XLSX.utils.sheet_to_json(ws, { header: 1 });
    };
    reader.readAsBinaryString(f);
  };

  const deleteCommentsOnChange = (value: any) => {
    setDeleteComments(value);
  };

  const closeDeleteConfimation = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id, deleteComments).then(() => {
      setShowModal(!showModal);
    });
  };

  const categoryOnChangehandler = (
    selectOptions: SelectOptionCategory | any
  ) => {
    setCompanyNameId(selectOptions.value);
    dispatch(getSalaryFileNameValidations(selectOptions.value));
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    if (validateFileUpload()) {
      setacknowledgement(false);
      setdisableAcknowledge(true);
      if (Companyoptions?.length === 1) {
        dispatch(salaryFileUpload(fileUploadData, Companyoptions?.[0]?.value));
      } else {
        dispatch(salaryFileUpload(fileUploadData, companyNameId));
      }
    }
  };

  const checkboxCancel = () => {
    setshowPopUp(!showPopUp);
  };
  const checkboxPdfCancel = () => {
    setshowPdfModal(!showPdfModal);
  };
  const checkboxPrintCancel = () => {
    setshowPrintModal(!showPrintModal);
  };
  const checkboxListCancel = () => {
    setShowList(!showList);
  };

  const cancelPrint = () => {
    setPrint(false);
    setcolumns([]);
  };

  const checkboxListSubmit = (filteredItems: any, orginalList: any) => {
    setShowList(!showList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setToggleSearch(false);
    setcolumns([]);
  };

  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowPopUp(!showPopUp);
    ExcelGeneration(salaryList, filteredItems, "Topup");
  };

  const checkboxPdfSubmit = (filteredItems: any, orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, salaryList);
    PdfGeneration(data, "Topup");
  };
  const checkboxPrintSubmit = (filteredItems: any, orginalList: any) => {
    setshowPrintModal(!showPrintModal);
    handlePrint(filteredItems, orginalList);
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setToggleSearch(false);
    setPrint(true);
  };

  const toggle_search = (e: any) => {
    e.preventDefault();
    setToggleSearch(!toggleSearch);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      salaryList = salaryList.filter((e: any) => {
        return (
          e.createdDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.companyName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.referenceNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.description
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.dateToCredit
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.totalRecords
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.totalAmount
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.batchStatusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      salaryList = salaryList.filter((e: any) => {
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
    <>
      <div
        className="p-3 mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1 className="primary_heading ">
          {companyID?.userInfo?.companyUser &&
          !userAccessList?.data?.[0]?.approvalLevelOne
            ? "Topup Add"
            : "Topup Approval"}
        </h1>
        <div className="salaryUpload-btn">
          <div className="d-flex">
            <div
              id="List"
              aria-disabled="true"
              className={
                salaryList && salaryList?.length > 0
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={() => {
                setShowList(true);
              }}
            >
              <AiOutlineProfile></AiOutlineProfile>
              <CustomTooltip target="List">List</CustomTooltip>
            </div>
            <div
              id="Refresh"
              aria-disabled="true"
              className={
                salaryList && salaryList?.length > 0
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={toggleRefresh}
            >
              <MdRefresh></MdRefresh>
              <CustomTooltip target="Refresh">Refresh</CustomTooltip>
            </div>
            <div
              id="PDF"
              className={
                salaryList && salaryList?.length > 0
                  ? "common-icons me-1 cursor"
                  : "common-icon-disabled cursor me-1"
              }
              onClick={() => setshowPdfModal(true)}
            >
              <AiFillFilePdf></AiFillFilePdf>
              <CustomTooltip target="PDF">PDF</CustomTooltip>
            </div>
            <div
              id="Excel"
              className={
                salaryList && salaryList?.length > 0
                  ? "common-icons me-1 cursor"
                  : "common-icon-disabled cursor me-1"
              }
              onClick={() => {
                setshowPopUp(true);
              }}
            >
              <AiFillFileExcel></AiFillFileExcel>
              <CustomTooltip target="Excel">Excel</CustomTooltip>
            </div>
            <div
              id="Print"
              className={
                salaryList && salaryList?.length > 0
                  ? "common-icons me-1 cursor"
                  : "common-icon-disabled cursor me-1"
              }
              onClick={() => setshowPrintModal(true)}
            >
              <AiOutlinePrinter></AiOutlinePrinter>
              <CustomTooltip target="Print">Print</CustomTooltip>
            </div>
            <div
              id="Search"
              className={
                salaryList && salaryList?.length > 0
                  ? `common-icons me-1 cursor ${toggleSearch && "bottom-arrow"}`
                  : "common-icon-disabled cursor me-1"
              }
              onClick={toggle_search}
            >
              <FiSearch></FiSearch>
              <CustomTooltip target="Search">Search</CustomTooltip>
            </div>
            {companyID?.userInfo?.companyUser &&
              userAccessList?.data?.[0]?.approvalLevelOne && (
                <div
                  className="col"
                  style={{
                    backgroundColor: "#36393a",
                    padding: "11px 5px 5px 5px",
                  }}
                >
                  <span className="payroll-account-label-color">
                    <span className="ps-2">Total Pending Approvals : </span>
                    <label className="payroll-account-label-color mx-2">
                      {pendingCount}
                    </label>
                  </span>
                </div>
              )}
            {companyID?.userInfo?.companyUser &&
              !userAccessList?.data?.[0]?.approvalLevelOne && (
                <CustomButton
                  testid="createCode"
                  onClick={handlePopUp}
                  component={"payrollEnquiry"}
                  color="danger salaryUpload-button kyc-FilterSearchButton"
                  className="btn2"
                >
                  <GoPlus /> Upload
                </CustomButton>
              )}
          </div>
        </div>
      </div>
      <div className="SalaryPayment">
        {isPopUp && (
          <CustomPopUpComponent heading={"Select Payroll File"}>
            <form onSubmit={handleFileUpload}>
              <div className="box-content">
                <div className="row d-flex mb-2 ">
                  <div className="col-3 ">
                    <label style={{ marginRight: "0px" }}>
                      Company<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col-7 p-0" style={{ marginLeft: "5px" }}>
                    {Companyoptions?.length === 1 ? (
                      <Input
                        type="text"
                        className="border-0 referenceData-readOnly"
                        value={Companyoptions?.[0]?.label}
                        readOnly={true}
                      />
                    ) : (
                      <Select
                        options={Companyoptions}
                        className=""
                        styles={customSelectStyles}
                        onChange={(selectOptions: any) =>
                          categoryOnChangehandler(selectOptions)
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="row d-flex mb-2 ">
                  <div className="col-3 ">
                    <label style={{ marginRight: "0px" }}>File Name</label>
                  </div>
                  <div className="col-7 p-0" style={{ marginLeft: "5px" }}>
                    <Input
                      type="text"
                      className="border-0 referenceData-readOnly"
                      value={nextFileName}
                      readOnly={true}
                    />
                  </div>
                </div>
                {Object.keys(fileType)?.length > 0 && (
                  <>
                    <label style={{ marginRight: "35px" }}>
                      File Format <span className="span-col">*</span>
                    </label>
                    {Object.keys(fileType)?.length > 0 &&
                      Object.keys(fileType)
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes("xlsx") && (
                        <>
                          <CustomInput
                            type="radio"
                            onChange={filetype_onChange}
                            value="xlsx"
                            name="fileType"
                            className="box-input"
                          />
                          <label style={{ marginRight: "20px" }}>
                            Excel{fileType?.xlsx && "(Hash)"}
                          </label>
                        </>
                      )}
                    {Object.keys(fileType)?.length > 0 &&
                      Object.keys(fileType)
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes("csv") && (
                        <>
                          <CustomInput
                            type="radio"
                            onChange={filetype_onChange}
                            value="csv"
                            name="fileType"
                            className="box-input"
                          />
                          <label style={{ marginRight: "20px" }}>
                            CSV{fileType?.csv && "(HASH)"}
                          </label>
                        </>
                      )}
                    {Object.keys(fileType)?.length > 0 &&
                      Object.keys(fileType)
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes("txt") && (
                        <>
                          <CustomInput
                            type="radio"
                            onChange={filetype_onChange}
                            value="txt"
                            name="fileType"
                            className="box-input"
                          />
                          <label style={{ marginRight: "20px" }}>
                            Txt{fileType?.txt && "(HASH)"}
                          </label>
                        </>
                      )}
                    <div style={{ marginTop: "20px" }}>
                      <label style={{ marginRight: "35px" }}>
                        File Upload <span className="span-col">*</span>
                      </label>
                      <CustomInput type="file" onChange={handleUpload} />
                    </div>
                  </>
                )}
                <div className="row d-flex">
                  <div className="col-3"></div>
                  <div className="col-8 p-0 ps-1 mt-3">
                    <CustomInput
                      type="checkbox"
                      disabled={disableAcknowledge}
                      onChange={() => setacknowledgement(!acknowledgement)}
                    />{" "}
                    We acknowledge MMT to authorize and process the payment on
                    our behalf.
                  </div>
                </div>
                {fileUploadError && (
                  <div className="row d-flex">
                    <div className="col-3"></div>
                    <div className="col-8 p-0 mt-1">
                      <span className="span-col1">
                        Please select valid File. And input mandatory Fields*
                      </span>
                    </div>
                  </div>
                )}

                {fileNameError && (
                  <div className="row d-flex">
                    <div className="col-3"></div>
                    <div className="col-8 p-0 mt-1">
                      <span className="span-col1">
                        Please check file name Format : PAYYYYYMMDDNN *
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: "0 40px 30px 165px" }}>
                <CustomButton
                  color="danger kyc-FilterSearchButton"
                  className="btn2"
                  disabled={!acknowledgement}
                >
                  Submit
                </CustomButton>
                <CustomButton
                  color="secondary"
                  className="btn2"
                  component={"payrollEnquiry"}
                  onClick={handlePopUp}
                >
                  Cancel
                </CustomButton>
              </div>
            </form>
          </CustomPopUpComponent>
        )}

        {toggleSearch && (
          <>
            <div
              className="d-flex user-search mt-3 p-3  cursor"
              style={{ width: "auto", marginLeft: "20px", marginRight: "15px" }}
            >
              <select
                className=" form-select user-search-drop ms-2 cursor"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={"Select Field"}
              >
                <option selected hidden className="cursor">
                  Select Field
                </option>
                <option value="createdDate" className="cursor">
                  Batch Date
                </option>
                <option value="companyName" className="cursor">
                  Company Name
                </option>
                <option value="referenceNumber" className="cursor">
                  Batch Ref.No
                </option>
                <option value="description" className="cursor">
                  Batch Transaction Reference
                </option>
                <option value="dateToCredit" className="cursor">
                  Date to Credit
                </option>
                <option value="totalRecords" className="cursor">
                  No of Entries
                </option>
                <option value="totalAmount" className="cursor">
                  Total Credit Amount
                </option>
                <option value="batchStatusCode" className="cursor">
                  Batch Status
                </option>
                <option value="any" className="cursor">
                  Any
                </option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                placeholder="Type your search keyword"
                onChange={(ev: any) =>
                  setsearchUserData(ev.currentTarget.value)
                }
              />
              <div className="ms-1">
                <Button color="danger kyc-FilterSearchButton btn--sizer">Search</Button>
              </div>
              <div>
                <Button
                  className="text-white  border-0 ms-1"
                  onClick={() => window.location.reload()}
                >
                  <FaReply />
                </Button>
              </div>
            </div>
          </>
        )}

        {apiMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeMessage}
              message={"Salary File Uploaded Successfully"}
            />
          </div>
        )}
        {approvalMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeApprovalMessage}
              message={"Successfully submitted for Approval"}
            />
          </div>
        )}

        {apiCheckerMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeCheckerMessage}
              message={
                "Batch successfully " +
                salaryCheckerMessage?.data?.batchStatusCode
              }
            />
          </div>
        )}

        {ApprovalRejectMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeApprovalRejectMessage}
              message={
                salaryApprovalMessage?.data?.batchErrorDetails +
                " " +
                salaryApprovalMessage?.data?.batchStatusCode
              }
            />
          </div>
        )}

        {apiErrMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeErrMessage}
              message={" " + salaryUploadApiMessage?.message}
            />
          </div>
        )}

        {deleteBatchMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeBatchMessage}
              message={"Batch deleted Successfully"}
            />
          </div>
        )}

        {deleteBatchErrMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={closeBatchErrMessage}
              message={" " + deleteBatch?.message}
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
          <div className="p-3 mb-5" ref={componentRef}>
            <CustomTable
              TableData={columns.length > 0 ? columns : Header}
              CustomTableHeader={salaryList}
              delete={false}
              DisableMange={true}
              editToggle={false}
              toPrint={toPrint ? true : false}
            />
          </div>
        )}
        <CustomDNDPopup
          onSubmit={checkboxListSubmit}
          onCancel={checkboxListCancel}
          items={orginalColumns.length > 0 ? orginalColumns : Header}
          isOpen={showList}
          buttonText={"Submit"}
        />
        <CustomDNDPopup
          onSubmit={checkboxSubmit}
          onCancel={checkboxCancel}
          items={orginalColumns.length > 0 ? orginalColumns : Header}
          isOpen={showPopUp}
          buttonText={"Export Excel"}
        />
        <CustomDNDPopup
          onSubmit={checkboxPdfSubmit}
          onCancel={checkboxPdfCancel}
          items={orginalColumns.length > 0 ? orginalColumns : Header}
          isOpen={showPdfModal}
          buttonText={"Export PDF"}
        />
        <CustomDNDPopup
          onSubmit={checkboxPrintSubmit}
          onCancel={checkboxPrintCancel}
          items={orginalColumns.length > 0 ? orginalColumns : Header}
          isOpen={showPrintModal}
          buttonText={"Preview it and print"}
        />
        <DeleteConfirmaionPopUp
          showModal={showModal}
          closeDeleteConfirmation={closeDeleteConfimation}
          selectedFestivalInfo={selectedRecordInfo}
          deleteTheSelectedRecord={deleteTheSelectedRecord}
          rejectApprovalTask={true}
          setrejectManager={deleteCommentsOnChange}
        ></DeleteConfirmaionPopUp>
      </div>
    </>
  );
}

export default TopUpAdd;
