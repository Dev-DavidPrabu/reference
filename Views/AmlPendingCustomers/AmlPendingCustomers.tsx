import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AmlPendingCustomers.scss";
import { useHistory } from "react-router";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import {
  getAmlPendingCustomersList,
  resetAppproveRejectStatus,
} from "../../redux/action/AmlPendingCustomersAction";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { BsEye } from "react-icons/bs";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import { Button, Input } from "reactstrap";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function AmlPendingCustomers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [apiMessage, setApiMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Header = [
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.toString().localeCompare(b.customerName?.toString()),
      },
    },
    {
      title: "ID Type",
      dataIndex: "idTypeCode",
      key: "idTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idTypeCode?.toString().localeCompare(b.idTypeCode?.toString()),
      },
    },
    {
      title: "ID Number",
      dataIndex: "idValue",
      key: "idValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idValue?.toString().localeCompare(b.idValue?.toString()),
      },
    },
    {
      title: "Nationality",
      dataIndex: "nationalityCode",
      key: "nationalityCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCode
            ?.toString()
            .localeCompare(b.nationalityCode?.toString()),
      },
    },
    {
      title: "Date Of Birth",
      dataIndex: "birthDate",
      key: "birthDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.birthDate?.toString().localeCompare(b.birthDate?.toString()),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.toString().localeCompare(b.mobileNumber?.toString()),
      },
    },
    {
      title: "MSSL",
      dataIndex: "msslMatch",
      key: "msslMatch",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.msslMatch?.toString().localeCompare(b.msslMatch?.toString()),
      },
      render: (msslMatch: any) => msslMatch?.toString(),
    },
    {
      title: "Sanction",
      dataIndex: "sanctionMatch",
      key: "sanctionMatch",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.sanctionMatch
            ?.toString()
            .localeCompare(b.sanctionMatch?.toString()),
      },
      render: (sanctionMatch: any) => sanctionMatch?.toString(),
    },
    {
      title: "PEPS",
      dataIndex: "pepsMatch",
      key: "pepsMatch",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.pepsMatch?.toString().localeCompare(b.pepsMatch?.toString()),
      },
      render: (pepsMatch: any) => pepsMatch?.toString(),
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.statusCode?.toString().localeCompare(b.statusCode?.toString()),
      },
      render: (StatusCode: any) => {
        return (
          <label
            className={` ${
              StatusCode === "SUCCESS" ||
              StatusCode === "VERIFIED" ||
              StatusCode === "APPROVED"
                ? "status-validated"
                : StatusCode === "REJECTED"
                ? "status-error"
                : StatusCode === "PENDING" && "status-warning"
            }`}
          >
            {StatusCode}
          </label>
        );
      },
    },
    {
      title: "Manage",
      dataIndex: "manage",
      key: "manage",
      render: (_: any, record: { key: React.Key } | any) => (
        <div>
          <div className="d-flex  cursor justify-content-center">
            <div
              className={`ms-2 manage-button cursor disable-background`}
              onClick={() => editUser(record)}
            >
              {record?.statusCode === "PENDING" ? <FaRegEdit /> : <BsEye />}
            </div>
          </div>
        </div>
      ),
    },
  ];

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/Pending-AML-Customers/AML-Customer-Info",
      state: {
        value: e,
      },
    });
  };

  const amlCustomerListData: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlPendingCustomersReducer.getAmlPendingCustomersList?.data
  );

  const amlApproveReject: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlPendingCustomersReducer.approveRejectMessage
  );

  let amlCustomerList = amlCustomerListData?.content?.filter(
    (list: any) =>
      list?.statusCode != "INCOMPLETE" &&
      (list?.msslMatch || list?.sanctionMatch || list?.pepsMatch)
  );

  const fetchAmlCustomerList = useCallback(async () => {
    try {
      dispatch(getAmlPendingCustomersList("PENDING"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAmlCustomerList().then(() => {
      if (!amlCustomerListData?.content) {
        setIsLoading(true);
      }
    });
  }, [fetchAmlCustomerList]);

  useEffect(() => {
    if (amlCustomerListData) {
      if (amlCustomerListData?.content) {
        setIsLoading(false);
      }
    }
  }, [amlCustomerListData]);

  useEffect(() => {
    if (amlApproveReject?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetAppproveRejectStatus());
      }, 3000);
    }
  }, [amlApproveReject]);

  const handle_AmlListStatus_onChange = (e: any) => {
    dispatch(getAmlPendingCustomersList(e.target.value));
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setSearchArea(false);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(true);
  };

  const handleManageColumn = (data: any) => {
    setcolumns(data);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const toggleRefresh = () => {
    setSearchArea(false);
    setcolumns([]);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    let manage = {
      title: "Manage",
      dataIndex: "manage",
      key: "manage",
      render: (_: any, record: { key: React.Key } | any) => (
        <div>
          <div className="d-flex  cursor justify-content-center">
            <div
              className={`ms-2 manage-button cursor disable-background`}
              onClick={() => editUser(record)}
            >
              {record?.statusCode === "PENDING" ? <FaRegEdit /> : <BsEye />}
            </div>
          </div>
        </div>
      ),
    };
    filteredItems.push(manage);
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      amlCustomerList = amlCustomerList.filter((e: any | ToggleSummaryInfo) => {
        return (
          e.customerName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idTypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idValue
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.nationalityCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e?.birthDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e?.mobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e?.msslMatch
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e?.sanctionMatch
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e?.pepsMatch
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      amlCustomerList = amlCustomerList.filter((e: any | ToggleSummaryInfo) => {
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
    <div className="AmlPendingCustomers">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Pending AML Customers"}
          SummaryFileName={"Pending AML Customers"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={amlCustomerList}
          Print={handlePrint}
          addButton={false}
          filterLeft={false}
          searchArea={toggleSearch}
          search={searchArea}
          manageColumn={true}
          manageColumnData={handleManageColumn}
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
            <option hidden selected className="cursor">
              Select Field
            </option>

            <option value="customerName" className="cursor">
              Name
            </option>
            <option value="idTypeCode" className="cursor">
              ID Type
            </option>
            <option value="idValue" className="cursor">
              Id Number
            </option>
            <option value="nationalityCode" className="cursor">
              Nationality
            </option>
            <option value="birthDate" className="cursor">
              Date Of Birth
            </option>
            <option value="mobileNumber" className="cursor">
              Mobile Number
            </option>
            <option value="msslMatch" className="cursor">
              MSSL
            </option>
            <option value="sanctionMatch" className="cursor">
              Sanctions
            </option>
            <option value="pepsMatch" className="cursor">
              PEPS
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
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger kyc-FilterSearchButton btn--sizer">Search</Button>
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
      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={
              "Customer successfully " + amlApproveReject?.data?.statusCode
            }
          />
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
        <>
          <form>
            <div className="reference-view p-3 mt-0">
              <div className="options-view">
                <p style={{ marginTop: "6px" }}>Status</p>
              </div>
              <div className="options-view">
                <Input
                  type="select"
                  className="no-border score-dropdown remit_feesAndCharges btn--sizer"
                  name="statusCode"
                  style={{
                    width: "91%",
                    minWidth: "150px",
                    borderRadius: "0px",
                    height: "35px",
                  }}
                  onChange={handle_AmlListStatus_onChange}
                >
                  <option selected className="cursor">
                    PENDING
                  </option>
                  <option className="cursor">VERIFIED</option>
                  <option className="cursor">REJECTED</option>
                </Input>
              </div>
            </div>
          </form>

          <div className="px-3 mb-5" ref={componentRef}>
            <CustomTable
              TableData={columns.length > 0 ? columns : Header}
              CustomTableHeader={amlCustomerList}
              DisableMange={true}
              toPrint={toPrint ? true : false}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default AmlPendingCustomers;
