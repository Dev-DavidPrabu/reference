import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import { Button, Input } from "reactstrap";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Form } from "antd";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { MdRefresh } from "react-icons/md";
import { FiFilter, FiSearch } from "react-icons/fi";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
  AiOutlineProfile,
} from "react-icons/ai";

import {
  approvePayrollPrefund,
  getPayrollPrefund,
  getPayrollPrefundCompanyList,
  getPayrollPrefundStaff,
} from "../../redux/action/PayrollPrefundAction";
import { getUserAccess } from "../../redux/action/TopUpAddActions";

import { filterTableData } from "../../Constants/HelperFunction";

import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";

const PayrollPrefund = (props: any) => {
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userInfo?.userType;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const locationStatus: any = useLocation();
  const componentRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [apiMessage, setApiMessage] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalColumns, setOriginalColumns] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setSearchUserData] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [companyList, setCompanyList] = useState([]);

  const [reasonError] = useState(false);
  const [message] = useState(false);
  const [, setShowError] = useState(false);

  const userAccessList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getUserAccessList
  );

  let makerAdd = userAccessList?.data?.[0]?.add;
  let levelOne = userAccessList?.data?.[0]?.approvalLevelOne;
  let levelTwo = userAccessList?.data?.[0]?.approvalLevelTwo;
  let levelThree = userAccessList?.data?.[0]?.approvalLevelThree;

  const getPayrollPrefundCompanyUser = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollPrefundReducer?.getPayrollPrefundCompany
  );

  const getPayrollPrefundStaffUser = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollPrefundReducer?.getPayrollPrefundStaff
  );

  const fetchPayrollPrefundCompanyUser = useCallback(async () => {
    try {
      dispatch(getPayrollPrefund(0, 10));
    } catch (err) {}
  }, [dispatch]);

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("PAYROLL_PREFUND_COMPANY_USER"));
    } catch (err) {}
  }, [dispatch]);

  const fetchPayrollPrefundData = useCallback(
    async (id, status: string, remarks: string, level: string) => {
      try {
        dispatch(approvePayrollPrefund(id, status, remarks, "1"));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (locationStatus.state === "Amount Transferred Successfully") {
      setApiMessage("Prefund add request created successfully");
    } else {
      setApiMessage(locationStatus.state);
    }
  }, [locationStatus.state]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  useEffect(() => {
    if (getPayrollPrefundCompanyUser) {
      if (getPayrollPrefundCompanyUser?.data) {
        setIsLoading(false);
      }
    }
  }, [getPayrollPrefundCompanyUser]);

  useEffect(() => {
    if (getPayrollPrefundStaffUser) {
      if (getPayrollPrefundStaffUser?.data) {
        setIsLoading(false);
      }
    }
  }, [getPayrollPrefundStaffUser]);

  useEffect(() => {
    if (userType === "COMPANY_USER") {
      setShowError(false);
      fetchPayrollPrefundCompanyUser();
    } else {
      setShowError(true);
    }
  }, [fetchPayrollPrefundCompanyUser, userType]);

  let companyUserPrefundPayroll =
    getPayrollPrefundCompanyUser?.data?.content !== undefined
      ? getPayrollPrefundCompanyUser?.data?.content.map((e: any) => {
          e.key = e.id;
          e.designatedBankName = e.bankName;
          return e;
        })
      : [];

  const refiningData = (data: any) => {
    let initiatedArr: any[] = [];
    let createdArr: any[] = [];
    let verifiedArr: any[] = [];
    let approvedArr: any[] = [];
    data.map((values: any) => {
      if (values.transactionStatus === "INITIATED") {
        initiatedArr.push(values);
      } else if (values.transactionStatus === "CREATED") {
        createdArr.push(values);
      } else if (values.transactionStatus === "VERIFIED") {
        verifiedArr.push(values);
      } else {
        approvedArr.push(values);
      }
    });

    let finalArray = [
      ...initiatedArr,
      ...createdArr,
      ...verifiedArr,
      ...approvedArr,
    ];

    return [...finalArray];
  };

  const checkboxListCancel = () => {
    setShowList(!showList);
  };
  const checkboxListSubmit = (filteredItems: any, originalList: any) => {
    setShowList(!showList);
    setColumns(filteredItems);
    setOriginalColumns(originalList);
    setTableModal(!showTableModal);
  };
  const toggleRefresh = () => {
    setToggleSearch(false);
    setToggleFilter(false);
    setColumns([]);
  };
  const checkboxSubmit = (filteredItems: any, originalList: any) => {
    setShowPopUp(!showPopUp);
    ExcelGeneration(companyUserPrefundPayroll, filteredItems, "PayrollPrefund");
  };
  const checkboxPdfSubmit = (filteredItems: any, originalList: any) => {
    setShowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, companyUserPrefundPayroll);

    PdfGeneration(data, "PayrollPrefund");
  };
  const checkboxPdfCancel = () => {
    setShowPdfModal(!showPdfModal);
  };
  const checkboxPrintCancel = () => {
    setShowPrintModal(!showPrintModal);
  };
  const checkboxPrintSubmit = (filteredItems: any, originalList: any) => {
    setShowPrintModal(!showPrintModal);
    handlePrint(filteredItems, originalList);
  };
  const handlePrint = (filteredItems: any, originalList: any) => {
    setColumns(filteredItems);
    setOriginalColumns(originalList);
    setToggleSearch(false);
    setPrint(true);
  };

  const toggle_search = (e: any) => {
    e.preventDefault();
    setToggleSearch(!toggleSearch);
    setToggleFilter(false);
  };

  const toggle_filter = (e: any) => {
    e.preventDefault();
    let LEVEL: string | undefined;

    if (levelTwo) {
      LEVEL = "Two";
    } else if (levelThree) {
      LEVEL = "Three";
    }

    const getCompanyList = (res: any) => {
      setCompanyList(res);
    };
    getPayrollPrefundCompanyList(LEVEL || "", getCompanyList);
    setToggleFilter(!toggleFilter);
    setToggleSearch(false);
  };

  const checkboxCancel = () => {
    setShowPopUp(!showPopUp);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return (
          e.transactionDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.companyName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.currentBalance
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.expectedBalance
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.transactionType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.transactionStatus
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.transactionStageCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else if (searchCategory === "createdDate") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return e.transactionDate
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase());
      });
    } else if (searchCategory === "trnxAmount") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return e.transactionAmount
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase());
      });
    } else if (searchCategory === "companyName") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return e.companyName
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase());
      });
    } else if (searchCategory === "trnxType") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return e.transactionType
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase());
      });
    } else if (searchCategory === "trnxStatus") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return e.transactionStatus
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase());
      });
    } else if (searchCategory === "trnxStatusCode") {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
        return e.transactionStageCode
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase());
      });
    } else {
      companyUserPrefundPayroll = companyUserPrefundPayroll.filter((e: any) => {
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

  const Header = [
    {
      title: "Maker Txn Date",
      dataIndex: "initiatorDate",
      key: "initiatorDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.initiatorDate.localeCompare(b.initiatorDate),
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Txn Ref",
      dataIndex: "transactionReference",
      key: "transactionReference",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReference.localeCompare(b.transactionReference),
      },
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionAmount.localeCompare(b.transactionAmount),
      },
    },
    {
      title: "Designated Bank Name",
      dataIndex: "designatedBankName",
      key: "designatedBankName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.designatedBankName.localeCompare(b.designatedBankName),
      },
    },

    {
      title: "Txn Type",
      dataIndex: "transactionType",
      key: "transactionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType.localeCompare(b.transactionType),
      },
    },
    {
      title: "Txn Status",
      dataIndex: "transactionStatus",
      key: "transactionStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatus.localeCompare(b.transactionStatus),
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
      title: "Txn Status Code",
      dataIndex: "transactionStageCode",
      key: "transactionStageCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStageCode.localeCompare(b.transactionStageCode),
      },
    },
    {
      title: "Maker Comments",
      dataIndex: "initiatorComments",
      key: "initiatorComments",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.initiatorComments.localeCompare(b.initiatorComments),
      },
    },
  ];
  const viewUser = (e: any) => {
    props.history.push({
      pathname: "/dashboard/view-PayrollPrefund",
      state: e.id,
    });
  };

  const searchFilter = () => {
    try {
      dispatch(getPayrollPrefundStaff(0, 10, filterId ?? ""));
    } catch (err) {}

    const closeMessage = () => {
      setApiMessage("");
    };
  };

  let makerDetail = userData?.userInfo?.id;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedId(selectedRows);
      setApiMessage("");
      let ownMaker = selectedRows.filter((request: any) => {
        if (request.createdBy === makerDetail) {
          return true;
        }
        return false;
      });
      if (ownMaker.length > 0) {
        // setApiStatus(false);
        // setApproveError(true);
        // setDisableSubmit(true);
        setApiMessage("Maker can't approve his own request.");
      } else {
        setApiMessage("");
        // setDisableSubmit(false);
      }
    },

    getCheckboxProps: (record: any) => ({
      disabled:
        (levelOne && record?.transactionStatus === "REJECTED") ||
        (levelOne && record?.transactionStatus === "VERIFIED") ||
        (levelOne && record?.transactionStatus === "APPROVED") ||
        (levelOne && record?.transactionStatus === "CREATED"),
      requestStatus: record?.transactionStatus,
    }),
    type: "radio",
  };

  let approveId = selectedId?.map((e: any) => {
    return e.id;
  });

  let STATUS: string, userLevel: string;
  const submitHandlers = (value: any, remarks: string) => {
    levelOne && (userLevel = "1");
    levelTwo && (userLevel = "2");
    levelThree && (userLevel = "3");
    if (selectedId.length > 0) {
      if (value === "Reject") {
        STATUS = "REJECT";
        // fetchTerminalRejectData(values, approveId);
      } else {
        STATUS = "APPROVE";
      }
      fetchPayrollPrefundData(approveId[0], STATUS, remarks, userLevel ?? 1);
      fetchPayrollPrefundCompanyUser();
    } else {
      // setApiErrorMsg("Please Select Any One Row");
      // setApproveError(true);
      // setApiStatus(false);
      // setApiMessage(true);
    }
  };

  const handleClose = () => {
    setApiMessage("");
    props.history.replace({
      pathname: "/dashboard/PayrollPrefund",
      state: "",
    });
  };

  return (
    <>
      {/* {showError === false ? ( */}
      {true ? (
        <>
          <div
            className="p-3 mb-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1 className="primary_heading ">
              {userData?.userInfo?.userType === "COMPANY_USER"
                ? "Payroll Prefund"
                : "Payroll Prefund Approval"}
            </h1>
            <div className="salaryUpload-btn">
              <div className="d-flex">
                <div
                  id="List"
                  aria-disabled="true"
                  className={
                    companyUserPrefundPayroll &&
                    companyUserPrefundPayroll?.length > 0
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
                    companyUserPrefundPayroll &&
                    companyUserPrefundPayroll?.length > 0
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
                    companyUserPrefundPayroll &&
                    companyUserPrefundPayroll?.length > 0
                      ? "common-icons me-1 cursor"
                      : "common-icon-disabled cursor me-1"
                  }
                  onClick={() => setShowPdfModal(true)}
                >
                  <AiFillFilePdf></AiFillFilePdf>
                  <CustomTooltip target="PDF">PDF</CustomTooltip>
                </div>
                <div
                  id="Excel"
                  className={
                    companyUserPrefundPayroll &&
                    companyUserPrefundPayroll?.length > 0
                      ? "common-icons me-1 cursor"
                      : "common-icon-disabled cursor me-1"
                  }
                  onClick={() => {
                    setShowPopUp(true);
                  }}
                >
                  <AiFillFileExcel></AiFillFileExcel>
                  <CustomTooltip target="Excel">Excel</CustomTooltip>
                </div>
                <div
                  id="Print"
                  className={
                    companyUserPrefundPayroll &&
                    companyUserPrefundPayroll?.length > 0
                      ? "common-icons me-1 cursor"
                      : "common-icon-disabled cursor me-1"
                  }
                  onClick={() => setShowPrintModal(true)}
                >
                  <AiOutlinePrinter></AiOutlinePrinter>
                  <CustomTooltip target="Print">Print</CustomTooltip>
                </div>

                {!userAccessList.data?.[0].add ||
                  (!userAccessList.data?.[0]?.approvalLevelOne && (
                    <div
                      id="Filter"
                      className={
                        companyUserPrefundPayroll &&
                        companyUserPrefundPayroll?.length > 0
                          ? `common-icons me-1 cursor ${
                              toggleFilter && "bottom-arrow"
                            }`
                          : "common-icon-disabled cursor me-1"
                      }
                      onClick={toggle_filter}
                    >
                      <FiFilter></FiFilter>
                      <CustomTooltip target="Filter">Filter</CustomTooltip>
                    </div>
                  ))}

                <div
                  id="Search"
                  className={
                    companyUserPrefundPayroll &&
                    companyUserPrefundPayroll?.length > 0
                      ? `common-icons me-1 cursor ${
                          toggleSearch && "bottom-arrow"
                        }`
                      : "common-icon-disabled cursor me-1"
                  }
                  onClick={toggle_search}
                >
                  <FiSearch></FiSearch>
                  <CustomTooltip target="Search">Search</CustomTooltip>
                </div>

                <div>
                  {userData?.userInfo?.userType === "COMPANY_USER" && makerAdd && (
                    <Button
                      className="add-btn cursor"
                      color="danger"
                      onClick={() =>
                        props.history.push({
                          pathname: "/dashboard/account-transaction",
                        })
                      }
                    >
                      {" "}
                      + Add{" "}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {toggleFilter && (
            <>
              <div
                className="d-flex user-search mt-3 p-3 cursor"
                style={{
                  width: "auto",
                  marginLeft: "20px",
                  marginRight: "15px",
                }}
              >
                <select
                  className="form-select user-search-drop ms-2 cursor"
                  onChange={(e: any) => {
                    const index = e.target.selectedIndex;
                    const el = e.target.childNodes[index];
                    const option = el.getAttribute("id");
                    setFilterId(option);
                  }}
                  defaultValue={"Select Field"}
                >
                  <option selected hidden className="cursor">
                    Select Company Name
                  </option>
                  {companyList?.map((list: any) => {
                    return (
                      <>
                        <option id={list?.companyId} className="cursor">
                          {list?.companyName}
                        </option>
                      </>
                    );
                  })}
                </select>

                <div className="ms-1">
                  <Button
                    color="danger kyc-FilterSearchButton btn--sizer"
                    onClick={searchFilter}
                  >
                    Submit
                  </Button>
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

          {toggleSearch && (
            <>
              <div
                className="d-flex user-search mt-3 p-3  cursor"
                style={{
                  width: "auto",
                  marginLeft: "20px",
                  marginRight: "15px",
                }}
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
                    Transaction Date
                  </option>
                  <option value="trnxAmount" className="cursor">
                    Transaction Amount
                  </option>
                  <option value="companyName" className="cursor">
                    Company Name
                  </option>
                  <option value="trnxType" className="cursor">
                    Transaction Type
                  </option>
                  <option value="trnxStatus" className="cursor">
                    Transaction Status
                  </option>
                  <option value="trnxStatusCode" className="cursor">
                    Transaction Status Code
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
                    setSearchUserData(ev.currentTarget.value)
                  }
                />
                <div className="ms-1">
                  <Button color="danger kyc-FilterSearchButton btn--sizer">
                    Search
                  </Button>
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

          <div className="mt-3">
            <CustomLoader isLoading={isLoading} size={50} />
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={handleClose}
              message={apiMessage}
            />
            {isLoading ? null : (
              <div className="mt-3" ref={componentRef}>
                <Form form={form} component={false}>
                  <CustomHeader
                    TableData={columns.length > 0 ? columns : Header}
                    rowSelection={levelOne ? rowSelection : !rowSelection}
                    disableCustomRowSelection={
                      selectedId.length === 0 ? false : true
                    }
                    dataSources={refiningData(companyUserPrefundPayroll)}
                    columns={Header}
                    handlesubmit={submitHandlers}
                    reasonError={reasonError}
                    viewUser={viewUser}
                    view={true}
                    approval={levelOne && true}
                    hideSelectAll={true}
                    reason={true}
                    CustomTableHeader={refiningData(companyUserPrefundPayroll)}
                    toPrint={toPrint ? true : false}
                    DisableMange={false}
                  />
                </Form>
              </div>
            )}

            <CustomDNDPopup
              onSubmit={checkboxListSubmit}
              onCancel={checkboxListCancel}
              items={originalColumns.length > 0 ? originalColumns : Header}
              isOpen={showList}
              buttonText={"Submit"}
            />
            <CustomDNDPopup
              onSubmit={checkboxSubmit}
              onCancel={checkboxCancel}
              items={originalColumns.length > 0 ? originalColumns : Header}
              isOpen={showPopUp}
              buttonText={"Export Excel"}
            />
            <CustomDNDPopup
              onSubmit={checkboxPdfSubmit}
              onCancel={checkboxPdfCancel}
              items={originalColumns.length > 0 ? originalColumns : Header}
              isOpen={showPdfModal}
              buttonText={"Export PDF"}
            />
            <CustomDNDPopup
              onSubmit={checkboxPrintSubmit}
              onCancel={checkboxPrintCancel}
              items={originalColumns.length > 0 ? originalColumns : Header}
              isOpen={showPrintModal}
              buttonText={"Preview it and print"}
            />
          </div>
        </>
      ) : (
        <CustomResponseMessage
          status={message}
          message={"You are unauthorized to view this screen"}
          closeMessage={handleClose}
        />
      )}
    </>
  );
};

export default PayrollPrefund;
