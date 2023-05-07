import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  approveDebitCredit,
  approveDebitCreditReset,
  getDebitCreditCompanyList,
  getManualDebitCreditList,
} from "../../redux/action/ManualDebitCreditAction";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { getUserAccess } from "../../redux/action/CardUnBlockAction";
import { useLocation } from "react-router-dom";
interface summaryData {
  transactionDate?: string | number | Date | undefined;
}
interface accessDataType {
  add?: Boolean | null;
  view?: Boolean | null;
  approvalLevelOne?: Boolean | null;
  approvalLevelTwo?: Boolean | null;
  approvalLevelThree?: Boolean | null;
}

const ManualDebitCreditSummary = () => {
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const componentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [columns, setColumns] = useState([]);
  const [orginalColumns, setOrginalColumns] = useState([]);
  const [toPrint, setToPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>();
  const [companyList, setCompanyList] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [apiStatus, setApiStatus] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState("");
  const [apimessage, setApimessage] = useState("");
  const [apiMessages, setApiMessages] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [level, setlevel] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [isSearchShows, setIsSearchShows] = useState(false);
  const state = useSelector(
    (state: any) => state.ManualDebitCreditReducer.getDebitCreditApprove
  );
  let debitCreditSummaryData = useSelector(
    (state: RootStateOrAny) =>
      state.ManualDebitCreditReducer?.getManualDebitCreditList?.data?.content
  );

  const UserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );

  const fetchDebitCreditSummary = useCallback(async () => {
    try {
      dispatch(getManualDebitCreditList());
    } catch (err) {}
  }, [dispatch]);

  const fetchUserAccessList = useCallback(async () => {
    try {
      dispatch(getUserAccess("MANUAL_DEBIT_CREDIT"));
    } catch (err) {}
  }, [dispatch]);

  const fetchDebitCreditApproveData = useCallback(
    async (id: string, status: string, remarks: string, level: string) => {
      try {
        dispatch(approveDebitCredit(id, status, remarks, level, history));
      } catch (err) {}
    },
    [dispatch, history]
  );

  useEffect(() => {
    if (state.error !== undefined) {
      setApiMessages(state.error);
    }
  }, [state]);

  useEffect(() => {
    setApiMessages("");
    setApimessage("");
    if (location.state === "Transaction completed successfully!") {
      setApimessage("debit/credit request is created");
    } else {
      if (location.state) {
        if (location?.transactionType === "DEBIT") {
          setApimessage("Debit Request Is Created Successfully");
        }
        if (location?.transactionType === "REFUND") {
          setApimessage("Refund Request Is Created Successfully");
        } else {
          setApimessage(location.state);
        }
      }
    }
  }, [location]);

  useEffect(() => {
    if (!debitCreditSummaryData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [debitCreditSummaryData]);

  useEffect(() => {
    fetchDebitCreditSummary();
  }, [fetchDebitCreditSummary, state]);

  useEffect(() => {
    fetchUserAccessList();
  }, [fetchUserAccessList]);

  const Print = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (location.state === "Manual Debit / Credit Summary Successfully") {
      setApimessage(location.state);
    }
  }, [location]);

  debitCreditSummaryData =
    debitCreditSummaryData &&
    debitCreditSummaryData.map((data: Required<summaryData>, index: number) => {
      let date = new Date(data?.transactionDate);
      let transactionDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
      return {
        ...data,
        key: index,
        transactionDate: `${transactionDate}`,
      };
    });

  let makerAdd = false,
    makerView = false,
    checkerLevelOne = false,
    checkerLevelTwo = false,
    checkerLevelThree = false;

  let accessData = UserAccess?.data;

  accessData?.forEach((res: Required<accessDataType>) => {
    res?.add === true && (makerAdd = true);
    res?.view === true && (makerView = true);
    res?.approvalLevelOne === true && (checkerLevelOne = true);
    res?.approvalLevelTwo === true && (checkerLevelTwo = true);
    res?.approvalLevelThree === true && (checkerLevelThree = true);
  });

  const handleView = (e: React.ChangeEvent<HTMLInputElement>): void => {
    history.push({
      pathname: "/dashboard/manual-debit-credit/View-debit-credit",
      state: e,
    });
  };

  // const terminalApprove = useSelector(
  //   (state: RootStateOrAny) =>
  //     state.TerminalDashboardReducer?.getTerminalApprove
  // );
  // const deactivateTerminal = useSelector(
  //   (state: RootStateOrAny) =>
  //     state.TerminalDashboardReducer?.deactivateTerminalResponse
  // );

  const handleList = (filteredItems: any, orginalList: any) => {
    setColumns(filteredItems);
    setOrginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  // const handlePrint = (filteredItems: any, orginalList: any) => {
  //   setColumns(filteredItems);
  //   setOrginalColumns(orginalList);
  //   setToPrint(true);
  // };

  // const closeUpdateMessage = () => {
  //   setApiUpdateMessage(false);
  // };

  const cancelPrint = () => {
    setToPrint(!toPrint);
    setColumns([]);
  };
  const closeMessage = () => {
    setApiMessage(false);
  };

  const toggleRefresh = () => {
    setColumns([]);
    setOrginalColumns([]);
    setToPrint(false);
  };

  const addDebitCredit = () => {
    history.push({
      pathname: "/dashboard/manual-debit-credit/Add-debit-credit",
    });
  };

  const toggleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setfilterOption(!filterOption);
    const getCompanyList = (res: SetStateAction<never[]>): void => {
      setCompanyList(res);
    };

    getDebitCreditCompanyList(getCompanyList);
    fetchDebitCreditSummary();
  };
  const searchFilter = () => {
    try {
      dispatch(getManualDebitCreditList(companyId));
    } catch (err) {}
  };

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any): void => {
      setSelectedId(selectedRows);
      setApiMessage(false);

      if (makerDetail === selectedRows[0]?.makerId) {
        setApiStatus(false);
        setApproveError(true);
        setApiMessage(true);
        setApiErrorMsg("Maker can't approve his own request.");
      } else {
        setApiMessage(false);
      }
    },
    hideSelectAll: true,
    type: "radio",

    getCheckboxProps: (record: any) => ({
      disabled:
        record?.transactionStatus === "REJECTED" ||
        record?.transactionStatus === "APPROVED",
      requestStatus: record?.transactionStatus,
    }),
  };

  let approveId = selectedId && selectedId[0];

  useEffect(() => {
    if (checkerLevelOne) {
      setlevel("1");
    } else if (checkerLevelTwo) {
      setlevel("2");
    } else {
      setlevel("3");
    }
  }, [checkerLevelOne, checkerLevelTwo, checkerLevelThree]);

  let STATUS: string, LEVEL: string;
  const submitHandlers = (value: string, remarks: string) => {
    checkerLevelOne && (LEVEL = "1");
    checkerLevelTwo && (LEVEL = "2");
    checkerLevelThree && (LEVEL = "3");
    if (selectedId.length > 0) {
      if (value === "Reject") {
        STATUS = "REJECT";
      } else {
        STATUS = "APPROVE";
      }
      fetchDebitCreditApproveData(approveId["id"], STATUS, remarks, level);
    } else {
      setApiErrorMsg("Please Select Any One Row");
      setApproveError(true);
      setApiStatus(false);
    }
  };

  let debitCreditSummaryHeader = [
    {
      title: "Txn Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (
          a: { transactionDate?: string },
          b: Required<{ transactionDate?: string | undefined }>
        ) =>
          a.transactionDate
            ?.toString()
            .localeCompare(b.transactionDate?.toString()),
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      checked: true,
      sorter: {
        compare: (
          a: { companyName?: string },
          b: Required<{ companyName?: string | undefined }>
        ) => a.companyName?.toString().localeCompare(b.companyName?.toString()),
      },
    },
    // {
    //   title: "Current Balance",
    //   dataIndex: "currentBalance",
    //   checked: true,
    //   sorter: {
    //     compare: (
    //       a: { currentBalance?: string },
    //       b: Required<{ currentBalance?: string | undefined }>
    //     ) =>
    //       a.currentBalance
    //         ?.toString()
    //         .localeCompare(b.currentBalance?.toString()),
    //   },
    // },
    // {
    //   title: "Expected Balance",
    //   dataIndex: "expectedBalance",
    //   checked: true,
    //   sorter: {
    //     compare: (
    //       a: { expectedBalance?: string },
    //       b: Required<{ expectedBalance?: string | undefined }>
    //     ) =>
    //       a.expectedBalance
    //         ?.toString()
    //         .localeCompare(b.expectedBalance?.toString()),
    //   },
    // },
    {
      title: "Txn Type",
      dataIndex: "transactionType",
      checked: true,
      sorter: {
        compare: (
          a: { transactionType?: string },
          b: Required<{ transactionType?: string | undefined }>
        ) =>
          a.transactionType
            ?.toString()
            .localeCompare(b.transactionType?.toString()),
      },
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      checked: true,
      sorter: {
        compare: (
          a: { transactionDate?: string },
          b: Required<{ transactionDate?: string | undefined }>
        ) =>
          a.transactionDate
            ?.toString()
            .localeCompare(b.transactionDate?.toString()),
      },
    },
    {
      title: "Txn Status",
      dataIndex: "transactionStatus",
      checked: true,
      editable: false,
      // sorter: (a: any, b: any) =>
      //   a.transactionStatus.toString() === "PENDING_APPROVAL" -b.transactionStatus?.toString() ==="",
      sorter: {
        compare: (
          a: { transactionStatus?: string },
          b: Required<{ transactionStatus?: string | undefined }>
        ) =>
          a.transactionStatus
            ?.toString()
            .localeCompare(b.transactionStatus?.toString()),
      },
      render: (status: any) => {
        let value = status.toString().toUpperCase();

        return (
          <label
            className={` ${
              value === "REJECTED"
                ? "text-danger"
                : value === "PENDING_APPROVAL"
                ? "text-danger"
                : "text-success"
            }`}
          >
            {value}
          </label>
        );
      },
    },
  ];

  const handleClose = () => {
    setApiMessages("");
    dispatch(approveDebitCreditReset());
  };

  const toggleSearch = () => {
    setIsSearchShows(!isSearchShows);
    setfilterOption(false);
    setFilteredArea(false);
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
  if (searchUserData && searchCategory !== "Select Field") {
    debitCreditSummaryData = debitCreditSummaryData?.filter((e: any) => {
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
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummary
          RightContent={"Manual Debit / Refund Summary"}
          SummaryFileName={"Manual Debit / Refund Summary"}
          SummaryColumn={
            orginalColumns.length > 0
              ? orginalColumns
              : debitCreditSummaryHeader
          }
          TableData={
            Array.isArray(debitCreditSummaryData)
              ? debitCreditSummaryData
              : [debitCreditSummaryData]
          }
          Add={makerAdd}
          AddAction={addDebitCredit}
          // Print={handlePrint}
          addButton={false}
          filterLeft={false}
          filter={true}
          filterEnabled={filterOption}
          filterArea={toggleFilter}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
          searchArea={toggleSearch}
          search={isSearchShows}
        />

        <CustomResponseMessage
          apiStatus={true}
          closeMessage={() => {
            history.replace({
              pathname: "/dashboard/manual-debit-credit/debit-credit-summary",
              state: "",
            });
            setApimessage("");
          }}
          message={apimessage}
        />

        <CustomResponseMessage
          apiStatus={false}
          closeMessage={handleClose}
          message={apiMessages}
        />

        {apiErrorMsg && (
          <CustomResponseMessage
            apiStatus={apiStatus}
            closeMessage={() => closeMessage()}
            message={apiErrorMsg}
            errorFix={approveError}
          />
        )}
      </>
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
            <option value="transactionDate" className="cursor">
              Txn Date
            </option>
            <option value="transactionAmount" className="cursor">
              Transaction Amount
            </option>
            <option value="companyName" className="cursor">
              Company Name
            </option>
            <option value="transactionType" className="cursor">
              Txn Type
            </option>
            <option value="transactionStatus" className="cursor">
              Txn Status
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            onChange={(ev) => handleSearch(ev)}
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
      {filterOption && (
        <>
          <div
            className="d-flex user-search mt-3 p-3 cursor"
            style={{
              width: "auto",
            }}
          >
            <h3 className="mt-2 text-white">Filter</h3>

            <select
              className="form-select user-search-drop ms-2 cursor"
              onChange={(e) => {
                const index = e.target.selectedIndex;
                const el = e.target.childNodes[index] as Element;
                const option = el.getAttribute("id");
                setCompanyId(option);
              }}
              defaultValue={"Select Field"}
            >
              <option selected hidden className="cursor">
                Select Company Name
              </option>
              {companyList.map(
                (list: { id?: string | undefined; companyName?: string }) => {
                  return (
                    <>
                      <option id={list?.id} className="cursor">
                        {list?.companyName}
                      </option>
                    </>
                  );
                }
              )}
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
              href=""
              onClick={Print}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </a>{" "}
            to confirm and Print !. Or{" "}
            <a
              href=""
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
        <div className="" ref={componentRef}>
          <CustomHeader
            rowSelection={checkerLevelOne && rowSelection}
            disableCustomRowSelection={selectedId.length === 0 ? false : true}
            TableData={columns.length > 0 ? columns : debitCreditSummaryHeader}
            columns={debitCreditSummaryHeader}
            viewUser={handleView}
            deleteUser={""}
            approval={checkerLevelOne ? true : false}
            reason={true}
            noOfRows={true}
            view={true}
            Edit={false}
            Delete={false}
            DefaultColumnWidth={true}
            CustomTableHeader={
              Array.isArray(debitCreditSummaryData)
                ? debitCreditSummaryData
                : [debitCreditSummaryData]
            }
            toPrint={toPrint ? true : false}
            DisableMange={toPrint ? true : false}
            handlesubmit={submitHandlers}
          />
        </div>
      )}
    </div>
  );
};

export default ManualDebitCreditSummary;
