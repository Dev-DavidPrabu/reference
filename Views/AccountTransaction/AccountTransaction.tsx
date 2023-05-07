import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input } from "reactstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { PrefundModelsObject } from "../../models/PreFundModels";
import {
  getAllPrefundData,
  postNewTransaction,
} from "../../redux/action/PreFundAction";
import "./AccountTransaction.scss";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
} from "react-icons/ai";
import { FiFilter, FiSearch } from "react-icons/fi";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { useReactToPrint } from "react-to-print";
import { filterTableData } from "../../Constants/HelperFunction";
import CustomTableFieldSelector from "../../Components/CustomComponents/CustomTableFieldSelector/CustomTableFieldSelector";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import { FaReply } from "react-icons/fa";

const AccountTransaction = (props: any) => {
  const [isPrint, setPrint] = useState(false);
  const [isFilterShows, setisFilterShows] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSearchShows, setIsSearchShows] = useState(false);

  const [orginalColumns, setorginalColumns] = useState([]);
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPdfModal, setshowPdfModal] = useState(false);
  const [showPrintModal, setshowPrintModal] = useState(false);

  const [isPrefundScreenVisible, setIsPrefundScreenVisible] = useState(false);

  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState("");

  const preFundData = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.getAllPreFundDataResponse
  );

  const createdTransactionInfo = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.addNewTranscationResponse
  );
  const toggleSearch = () => {
    setIsSearchShows(!isSearchShows);
    setisFilterShows(false);
    setPrint(false);
  };
  const toggleFiler = () => {
    setisFilterShows(!isFilterShows);
    setIsSearchShows(false);
    setPrint(false);
  };
  const handlePrint = (e: any) => {
    setPrint(!isPrint);
  };
  const columHandler = (selectedColumns: any, orginalList: any) => {
    setorginalColumns(orginalList);
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
  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowPopUp(!showPopUp);
    ExcelGeneration(preFundData, filteredItems, "Group Right");
  };
  const checkboxPdfSubmit = (filteredItems: any, orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, preFundData);
    PdfGeneration(data, "Account Transaction");
  };
  const checkboxPrintSubmit = (filteredItems: any, orginalList: any) => {
    setshowPrintModal(!showPrintModal);

    setorginalColumns(orginalList);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef = useRef<any>();
  const PayrollPrefund = [
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType.localeCompare(b.transactionType),
      },
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionAmount.localeCompare(b.transactionAmount),
      },
    },
    {
      title: "Transaction Refernence",
      dataIndex: "transactionRefernence",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionRefernence.localeCompare(b.transactionRefernence),
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
    },
  ];

  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllPrefundData());
    } catch (err) {}
  }, [dispatch]);

  const PostNewTransaction = useCallback(
    async (transactionData: PrefundModelsObject) => {
      try {
        dispatch(postNewTransaction(transactionData));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (createdTransactionInfo) {
      if (createdTransactionInfo.data) {
        setIsPrefundScreenVisible(!isPrefundScreenVisible);
      } else if (createdTransactionInfo.error) {
      }
    }
  }, [createdTransactionInfo, isPrefundScreenVisible]);

  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
    }
  };
  const closeSearch = () => {};

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="primary_heading">
          Payroll Prefund Account Transaction{" "}
        </div>
        <div className="d-flex">
          <div
            aria-disabled="true"
            className={
              preFundData && preFundData.length > 0
                ? "common-icons me-1 cursor"
                : "common-icons-disabled me-1 cursor"
            }
            onClick={() =>
              ExcelGeneration(
                preFundData,
                [""],
                "Payroll Prefund Account Transaction."
              )
            }
          >
            <AiFillFileExcel></AiFillFileExcel>
          </div>
          <div
            className={
              preFundData && preFundData.length > 0
                ? "common-icons me-1 cursor"
                : "common-icons-disabled me-1 cursor"
            }
            onClick={() =>
              PdfGeneration(preFundData, "Payroll Prefund Account Transaction.")
            }
          >
            <AiFillFilePdf></AiFillFilePdf>
          </div>
          <div className={"common-icons me-1 cursor"} onClick={handlePrint}>
            <AiOutlinePrinter></AiOutlinePrinter>
          </div>
          <div
            className="common-icons me-3 cursor"
            onClick={() => toggleSearch()}
          >
            <FiSearch></FiSearch>
          </div>
          <div
            className="common-icons me-3 cursor"
            onClick={() => toggleFiler()}
          >
            <FiFilter></FiFilter>
          </div>
          <div>
            <Button
              className="add-btn cursor"
              color="danger"
              onClick={() =>
                props.history.push({
                  pathname:
                    "/dashboard/account-transaction/Add-account-transaction",
                })
              }
            >
              {" "}
              + Add{" "}
            </Button>
          </div>
        </div>
      </div>
      {isSearchShows && (
        <div className="mt-3 search-component d-flex cursor">
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="" className="cursor">
              Transaction Date
            </option>
            <option value="" className="cursor">
              Transaction Type
            </option>
            <option value="" className="cursor">
              Transaction Amount
            </option>
            <option value="" className="cursor">
              Transaction Reference
            </option>
            <option value="" className="cursor">
              Status
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            placeholder="Type your search keyword"
            onChange={(ev) => handleSearch(ev)}
          />
          <div className="ms-1">
            <Button color="danger">Search</Button>
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
      {isFilterShows && (
        <div className="mt-3 search-component d-flex cursor">
          <div className="d-flex fillter-wrapper cursor">
            <div className="fillter-select cursor">
              <Input type="select"></Input>
            </div>
            <div className="fillter-date cursor">
              <Input type="select"></Input>
            </div>
            <div className="fillter-time cursor">
              <Input type="date"></Input>
            </div>
            <div className="d-flex fillter-icon cursor">
              <div className="fillter-icon-fillter cursor">
                <FiFilter></FiFilter>
              </div>
              <div className="fillter-icon-arrow cursor">
                <TiArrowBackOutline></TiArrowBackOutline>
              </div>
            </div>
          </div>
        </div>
      )}
      {isPrint && (
        <span
          className="span-col1"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "10px",
          }}
        >
          Preview content. Please click{" "}
          <a style={{ color: "blue", textDecoration: "underline" }}>here</a> to
          confirm and Print !
        </span>
      )}
      <CustomLoader isLoading={isLoading} size={50} />
      <div ref={componentRef}>
        <div className="mt-3">
          {true ? (
            <div>
              <CustomTableFieldSelector
                headers={
                  orginalColumns.length > 0 ? orginalColumns : PayrollPrefund
                }
                DND={true}
                select={false}
                submit={columHandler}
              />
              <CustomHeader
                TableData={PayrollPrefund}
                CustomTableHeader={preFundData}
              />
              <CustomDNDPopup
                onSubmit={checkboxSubmit}
                onCancel={checkboxCancel}
                items={
                  orginalColumns.length > 0 ? orginalColumns : PayrollPrefund
                }
                isOpen={showPopUp}
                buttonText={"Export Excel"}
              />
              <CustomDNDPopup
                onSubmit={checkboxPdfSubmit}
                onCancel={checkboxPdfCancel}
                items={
                  orginalColumns.length > 0 ? orginalColumns : PayrollPrefund
                }
                isOpen={showPdfModal}
                buttonText={"Export PDF"}
              />
              <CustomDNDPopup
                onSubmit={checkboxPrintSubmit}
                onCancel={checkboxPrintCancel}
                items={
                  orginalColumns.length > 0 ? orginalColumns : PayrollPrefund
                }
                isOpen={showPrintModal}
                buttonText={"Preview it and print"}
              />
            </div>
          ) : (
            <div className="d-flex justify-content-center text-bold">
              No Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountTransaction;
