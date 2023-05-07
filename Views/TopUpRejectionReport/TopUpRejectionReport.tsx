import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  getRejectionReport,
  getTransactionList,
} from "../../redux/action/TopUpAddActions";

function TopUpRejectionReport() {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showModalList, setShowModalList] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const payrollId = location?.state?.value?.id;

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
            className={` ${
              transactionStatusCode === "VALIDATED" ||
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
            <div className="col">{record.errorDetails}</div>
          </div>
        );
      },
    },
  ];

  const salaryTransactionList: any = useSelector(
    (state: RootStateOrAny) => state.TopUpAddReducer.getAllRejectionReport
  );

  let transactionList = salaryTransactionList?.data?.content;

  // to fetch inital Batch..
  const fetchInitialBatch = useCallback(async () => {
    try {
      dispatch(
        getRejectionReport(payrollId, 1, location?.state?.value?.totalRecords)
      );
    } catch (err) {}
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

  const cancel_handlePopUp = () => {
    window.history.back();
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
    <div className="TopUpRejectionReport">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Topup Rejection Report"}
          SummaryFileName={location?.state?.value?.batchReferenceNumber}
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
          className="d-flex user-search mt-2  p-3 cursor"
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
      {toPrint && (
        <div className="mt-3">
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
        </div>
      )}

      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="p-3 mb-5" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={transactionList}
            delete={false}
            DisableMange={true}
            editToggle={false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default TopUpRejectionReport;
