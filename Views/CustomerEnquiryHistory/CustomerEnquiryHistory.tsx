import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { getCustomerHistoryList } from "../../redux/action/CustomerEnquiryAction";

function CustomerEnquiryHistory() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const Header = [
    {
      title: "Date & Time",
      dataIndex: "accountUpdatedTime",
      key: "accountUpdatedTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountUpdatedTime
            ?.toString()
            .localeCompare(b.accountUpdatedTime?.toString()),
      },
      render: (accountUpdatedTime: any) => {
        let value = accountUpdatedTime?.replace("T"," ");
        return (
          <label>
            {value}
          </label>
        );
      },
    },
    {
      title: "Mobile No",
      dataIndex: "primaryMobileNumber",
      key: "primaryMobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.primaryMobileNumber
            ?.toString()
            .localeCompare(b.primaryMobileNumber?.toString()),
      },
    },
    {
      title: "BO User",
      dataIndex: "makerName",
      key: "makerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.makerName?.toString().localeCompare(b.makerName?.toString()),
      },
    },
    {
      title: "Edited Field",
      checked: true,
      render: (e: any) => {
        const allowed = [
          "personalProfile",
          "bankProfile",
          "opsRemarksAndSource",
          "name",
          "customerMobileNumber",
          "customerWallet",
          "documentDetails",
          "employerProfile",
          "riskProfile",
          "cardProfile",
        ];

        const filtered = Object.fromEntries(
          Object.entries(e).filter(
            ([key, val]) => allowed.includes(key) && val === true
          )
        );
        let editedFields = Object.keys(filtered).join(", ");

        return <label>{editedFields}</label>;
      },
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.remarks?.toString().localeCompare(b.remarks?.toString()),
      },
    },
  ];

  const CustomerEnquiryHistory: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getCustomerHistoryData
  );

  let customerHistoryData = CustomerEnquiryHistory?.data;

  const fetchCustomerData = useCallback(async () => {
    try {
      dispatch(getCustomerHistoryList(location?.state?.value?.customerId));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchCustomerData().then(() => {
      if (!CustomerEnquiryHistory?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchCustomerData]);

  useEffect(() => {
    if (CustomerEnquiryHistory) {
      if (CustomerEnquiryHistory?.data) {
        setIsLoading(false);
      }
    }
  }, [CustomerEnquiryHistory]);

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

  const cancelPrint = () => {
    setPrint(!toPrint);
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

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };

  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };

  const handle_Back = () => {
    history.goBack();
  };

  const handle_WalletHistory_onClick = () => {
    history.push({
      pathname: "/dashboard/KYC-Customer-Enquiry/Customer-Wallet-History",
      state: {
        value: location?.state?.value,
      },
    });
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      customerHistoryData = customerHistoryData.filter((e: any) => {
        return (
          e.accountUpdatedTime
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.primaryMobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.makerName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.remarks
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      customerHistoryData = customerHistoryData.filter((e: any) => {
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
    <div className="CustomerEnquiryHistory">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Customer Profile History"}
          SummaryFileName={"Customer Profile History"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={customerHistoryData}
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
          Back={true}
          BackAction={handle_Back}
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

            <option value="accountUpdatedTime" className="cursor">
              {"Date & time"}
            </option>
            <option value="primaryMobileNumber" className="cursor">
              Mobile NO
            </option>
            <option value="makerName" className="cursor">
              Bo User
            </option>
            <option value="remarks" className="cursor">
              Remarks
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

      <div className="d-flex justify-content-between align-items-center m-3 ">
        <div className="col-7 p-3" style={{ background: "#f3f3f3" }}>
          <div className="col d-flex">
            <div className="col-2 p-2 ">
              <label className="edit-sum-label">Name</label>
            </div>
            <div
              className="col-4 p-1"
              style={{ marginLeft: "-30px", marginRight: "20px" }}
            >
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state?.value?.customerName}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
            <div className="col-2 p-2">
              <label className="edit-sum-label">Mobile No</label>
            </div>
            <div className="col-4 p-1">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state?.value?.mobileNumber}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="d-flex">
          <button
            className={"editbuttonOn me-2"}
            onClick={handle_WalletHistory_onClick}
          >
            Wallet History
          </button>
        </div>
      </div>
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
        <div className="px-3 mb-5" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={customerHistoryData}
            DisableMange={true}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default CustomerEnquiryHistory;
