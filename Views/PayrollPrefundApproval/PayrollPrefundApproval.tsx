import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import { Button, Input } from "reactstrap";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Form } from "antd";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  approvePayrollPrefundApproval,
  getPayrollPrefundApproval,
  getPayrollPrefundCompanyList,
  getPayrollPrefundApprovalStaff,
} from "../../redux/action/PayrollPrefundApprovalAction";
import { getUserAccess } from "../../redux/action/TopUpAddActions";
import { filterTableData } from "../../Constants/HelperFunction";

import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
  AiOutlineProfile,
} from "react-icons/ai";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import { MdRefresh } from "react-icons/md";
import { FiFilter, FiSearch } from "react-icons/fi";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import CustomLoader from "../../Components/Loader/CustomLoader";

const PayrollPrefundApproval = (props: any) => {
  const [apiMessage, setApiMessage] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showList, setShowList] = useState(false);
  const [message, setMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [showPdfModal, setshowPdfModal] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPrintModal, setshowPrintModal] = useState(false);
  const [reasonError, setReasonError] = useState(false);

  const [toggleFilter, setToggleFilter] = useState(false);

  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [selectedId, setSelectedId] = useState([]);
  const loaction: any = useLocation();
  const componentRef = useRef<any>();
  const [level, setlevel] = useState("");
  useEffect(() => {
    if (loaction.state === "Amount Transfered Successfully") {
      setApiMessage(loaction.state);
    } else {
      setApiMessage(loaction.state);
    }
  }, [loaction.state]);

  const [filterId, setFilterId] = useState("");
  const [companyList, setCompanyList] = useState([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const userAccessList: any = useSelector(
    (state: RootStateOrAny) => state?.TopUpAddReducer?.getUserAccessList
  );

  const getPayrollPrefundCompanyUser = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollPrefundReducer?.getPayrollPrefundCompany
  );

  const getPayrollPrefundStaffUser = useSelector(
    (state: RootStateOrAny) =>
      state.PayrollPrefundReducer?.getPayrollPrefundStaff
  );

  const userType = userData?.userInfo?.userType;

  // const fetchPayrollPrefundCompanyUser = useCallback(async () => {
  //   try {
  //     dispatch(getPayrollPrefundApproval(0, 10));
  //   } catch (err) {}
  // }, [dispatch]);

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("PAYROLL_PREFUND_STAFF_L2_L3_CHECKER"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  const fetchPayrollPrefundCompanyStaff = useCallback(async () => {
    try {
      dispatch(getPayrollPrefundApprovalStaff(0, 10));
    } catch (err) {}
  }, [dispatch]);

  // const fetchPayrollPrefundData = useCallback(
  //   async (id, status: string, remarks: string, level: string) => {
  //     try {
  //       dispatch(approvePayrollPrefundApproval(id, status, remarks, 1));
  //     } catch (err) {}
  //   },
  //   [dispatch]
  // );

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

  let makerAdd = userAccessList?.data?.[0]?.add;
  let levelOne = userAccessList?.data?.[0]?.approvalLevelOne;
  let levelTwo = userAccessList?.data?.[0]?.approvalLevelTwo;
  let levelThree = userAccessList?.data?.[0]?.approvalLevelThree;

  useEffect(() => {
    if (userType === "STAFF") {
      setShowError(false);
      console.log(userType);
      fetchPayrollPrefundCompanyStaff();
    } else {
      setShowError(true);
    }
  }, [userType, fetchPayrollPrefundCompanyStaff]);

  let staffUserPrefundPayroll = getPayrollPrefundStaffUser?.data?.content.map(
    (e: any) => {
      e.key = e.id;
      e.designatedBankName = e.bankName;
      return e;
    }
  );

  console.log("staffUserPrefundPayroll", staffUserPrefundPayroll);

  const checkboxListCancel = () => {
    setShowList(!showList);
  };
  const checkboxListSubmit = (filteredItems: any, orginalList: any) => {
    setShowList(!showList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const toggleRefresh = () => {
    setToggleSearch(false);
    setToggleFilter(false);
    setcolumns([]);
  };
  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowPopUp(!showPopUp);
    ExcelGeneration(staffUserPrefundPayroll, filteredItems, "PayrollPrefund");
  };
  const checkboxPdfSubmit = (filteredItems: any, orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, staffUserPrefundPayroll);
    PdfGeneration(data, "PayrollPrefund");
  };
  const checkboxPdfCancel = () => {
    setshowPdfModal(!showPdfModal);
  };
  const checkboxPrintCancel = () => {
    setshowPrintModal(!showPrintModal);
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
    setshowPopUp(!showPopUp);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      staffUserPrefundPayroll = getPayrollPrefundStaffUser.filter((e: any) => {
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
    } else {
      staffUserPrefundPayroll = staffUserPrefundPayroll.filter((e: any) => {
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
        let value = status.toString().toUpperCase();

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
      dispatch(getPayrollPrefundApprovalStaff(0, 10, filterId ?? ""));
    } catch (err) {}

    const closeMessage = () => {
      setApiMessage("");
    };
  };

  let makerDetail = userData?.userInfo?.id;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      let idArr: any = [];
      selectedRows.map((res: any) => idArr.push(res.id));

      setSelectedId(idArr);
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
        (levelTwo && record?.transactionStatus === "REJECTED") ||
        (levelTwo && record?.transactionStatus === "VERIFIED") ||
        (levelThree && record?.transactionStatus === "REJECTED") ||
        (levelThree && record?.transactionStatus === "APPROVED"),
      requestStatus: record?.transactionStatus,
    }),
    type: "radio",
  };

  let approveId = selectedId?.map((e: any) => {
    return e.id;
  });

  useEffect(() => {
    if (levelOne === true) {
      setlevel("1");
    } else if (levelTwo === true) {
      setlevel("2");
    } else {
      setlevel("3");
    }
  }, [levelOne, levelTwo, levelThree, userType]);

  const submitHandlers = (value: any, reason: any) => {
    console.log(value.toUpperCase());

    dispatch(
      approvePayrollPrefundApproval(
        selectedId[0],
        value.toUpperCase(),
        reason,
        level,
        props.history
      )
    );
  };

  const handleClose = () => {
    setApiMessage("");
    props.history.replace({
      pathname: "/dashboard/PayrollPrefundApproval",
      state: "",
    });
  };

  const refiningData = (data: any) => {
    let intiatedArr: any[] = [];
    let createdArr: any[] = [];
    let verifiedArr: any[] = [];
    let approvedArr: any[] = [];
    data.map((values: any) => {
      if (values.transactionStatus === "INITIATED") {
        intiatedArr.push(values);
      } else if (values.transactionStatus === "CREATED") {
        createdArr.push(values);
      } else if (values.transactionStatus === "VERIFIED") {
        verifiedArr.push(values);
      } else {
        approvedArr.push(values);
      }
    });
    let finalArry = [
      ...intiatedArr,
      ...createdArr,
      ...verifiedArr,
      ...approvedArr,
    ];
    console.log("finalArry", finalArry);
    return [...finalArry];
  };

  const filterTheDataBasedOnAccess = () => {
    let permissionList = userAccessList?.data?.[0];
    if (permissionList && staffUserPrefundPayroll) {
      if (permissionList.approvalLevelThree) {
        let finalValues = staffUserPrefundPayroll?.filter(
          (filteringThevalues: any) => {
            if (
              filteringThevalues.transactionStatus !== "CREATED" ||
              filteringThevalues.transactionStatus !== "INITIATED"
            ) {
              return filteringThevalues;
            }
          }
        );
        return refiningData(finalValues);
      } else if (permissionList.approvalLevelTwo) {
        let finalValues = staffUserPrefundPayroll?.filter(
          (filteringThevalues: any) => {
            if (filteringThevalues.transactionStatus !== "APPROVED") {
              return filteringThevalues;
            }
          }
        );
        return refiningData(finalValues);
      } else {
        let finalValues = staffUserPrefundPayroll?.filter(
          (filteringThevalues: any) => {
            if (
              filteringThevalues.transactionStatus === "CREATED" ||
              filteringThevalues.transactionStatus === "INITIATED"
            ) {
              return filteringThevalues;
            }
          }
        );
        return refiningData(finalValues);
      }
    } else {
      return [];
    }
  };

  return (
    <>
      {showError === false ? (
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
                    staffUserPrefundPayroll &&
                    staffUserPrefundPayroll?.length > 0
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
                    staffUserPrefundPayroll &&
                    staffUserPrefundPayroll?.length > 0
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
                    staffUserPrefundPayroll &&
                    staffUserPrefundPayroll?.length > 0
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
                    staffUserPrefundPayroll &&
                    staffUserPrefundPayroll?.length > 0
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
                    staffUserPrefundPayroll &&
                    staffUserPrefundPayroll?.length > 0
                      ? "common-icons me-1 cursor"
                      : "common-icon-disabled cursor me-1"
                  }
                  onClick={() => setshowPrintModal(true)}
                >
                  <AiOutlinePrinter></AiOutlinePrinter>
                  <CustomTooltip target="Print">Print</CustomTooltip>
                </div>

                {!userAccessList.data?.[0].add ||
                  (!userAccessList.data?.[0]?.approvalLevelOne && (
                    <div
                      id="Filter"
                      className={
                        staffUserPrefundPayroll &&
                        staffUserPrefundPayroll?.length > 0
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
                    staffUserPrefundPayroll &&
                    staffUserPrefundPayroll?.length > 0
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
                  {companyList.map((list: any) => {
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
                  <option value="companyName" className="cursor">
                    Company Name
                  </option>
                  <option value="referenceNumber" className="cursor">
                    Current Balance
                  </option>
                  <option value="description" className="cursor">
                    Excepted Balance
                  </option>
                  <option value="dateToCredit" className="cursor">
                    Transaction Type
                  </option>
                  <option value="totalRecords" className="cursor">
                    Transaction Status
                  </option>
                  <option value="totalAmount" className="cursor">
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
                    setsearchUserData(ev.currentTarget.value)
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
                    disableCustomRowSelection={
                      selectedId.length === 0 ? false : true
                    }
                    rowSelection={rowSelection}
                    dataSources={filterTheDataBasedOnAccess()}
                    columns={Header}
                    handlesubmit={submitHandlers}
                    reasonError={reasonError}
                    viewUser={viewUser}
                    view={true}
                    approval={levelTwo || levelThree ? true : false}
                    hideSelectAll={true}
                    reason={true}
                    CustomTableHeader={filterTheDataBasedOnAccess()}
                    toPrint={toPrint ? true : false}
                  />
                </Form>
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
          </div>
        </>
      ) : (
        <CustomResponseMessage
          status={message}
          message={"You are unauthorized to view this screen"}
        />
      )}
    </>
  );
};

export default PayrollPrefundApproval;
