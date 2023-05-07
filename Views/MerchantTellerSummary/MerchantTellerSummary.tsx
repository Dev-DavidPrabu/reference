import React, { useState, useRef, useCallback, useEffect } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { useReactToPrint } from "react-to-print";
import MerchantUAM from "../../Components/MerchantUAM/MerchantUAM";
import { useHistory } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { FaReply } from "react-icons/fa";
import { Button, Input } from "reactstrap";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  getMerchantTellerSummaryList,
  resetMerchantTellerCreateMessage,
  resetMerchantTellerUpdateMessage,
} from "../../redux/action/MerchantSetupAction";

function MerchantTellerSummary() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let merchantTellerHeader = [
    {
      title: "Sub Merchant Code",
      dataIndex: "subMerchantCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.subMerchantCode
            ?.toString()
            .localeCompare(b.subMerchantCode?.toString()),
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.name?.toString().localeCompare(b.name?.toString()),
      },
    },
    {
      title: "ID Type",
      dataIndex: "idType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idType?.toString().localeCompare(b.idType?.toString()),
      },
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idNumber?.toString().localeCompare(b.idNumber?.toString()),
      },
    },
    {
      title: "Position",
      dataIndex: "position",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.position?.toString().localeCompare(b.position?.toString()),
      },
    },
    {
      title: "Phone No",
      dataIndex: "phoneNumber",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.phoneNumber?.toString().localeCompare(b.phoneNumber?.toString()),
      },
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.emailAddress?.toString().localeCompare(b.emailAddress?.toString()),
      },
    },
    {
      title: "Approval Date",
      dataIndex: "approvalDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvalDate?.toString().localeCompare(b.approvalDate?.toString()),
      },
    },
    {
      title: "User Type",
      dataIndex: "userType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.userType?.toString().localeCompare(b.userType?.toString()),
      },
    },
    {
      title: "Debit Txn Limit",
      dataIndex: "debitTransactionLimit",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.debitTransactionLimit
            ?.toString()
            .localeCompare(b.debitTransactionLimit?.toString()),
      },
    },

    {
      title: "Credit Txn Limit",
      dataIndex: "creditTransactionLimit",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.creditTransactionLimit
            ?.toString()
            .localeCompare(b.creditTransactionLimit?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
  ];

  const merchantTellerSummaryData: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getAllMerchantTellerList
  );

  const merchantTellerCreateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getMerchantTellerCreateError
  );

  const merchantTellerUpdateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getMerchantTellerUpdateError
  );

  let merchantTellerSummaryList = merchantTellerSummaryData?.data;

  const fetchMerchantTellerList = useCallback(async () => {
    try {
      dispatch(getMerchantTellerSummaryList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchMerchantTellerList().then(() => {
      if (!merchantTellerSummaryData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchMerchantTellerList]);

  useEffect(() => {
    if (merchantTellerSummaryData?.data) {
      setIsLoading(false);
    }
  }, [merchantTellerSummaryData]);


  useEffect(() => {
    if (merchantTellerCreateError?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantTellerCreateMessage());
      }, 3000);
    }
  }, [merchantTellerCreateError]);

  useEffect(() => {
    if (merchantTellerUpdateError?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetMerchantTellerUpdateMessage());
      }, 3000);
    }
  }, [merchantTellerUpdateError]);

  const handleEdit = (e: any) => {
    history.push({
      pathname: "/dashboard/Merchant-Teller-Summary/Edit-Merchant-Teller",
      state: {
        value: e,
      },
    });
  };

  const addMerchantTeller = () => {
    history.push({
      pathname: "/dashboard/Merchant-Teller-Summary/Add-Merchant-Teller",
    });
  };

  const handlePrint = (data: any) => {
    setSearchArea(false);
    setPrint(!toPrint);
    setcolumns(data);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
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
  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  const navigateTo = (e: any) => {
    if (e === "merchant") {
      history.push({
        pathname: "/dashboard/Merchant-setup",
      });
    } else if (e === "merchantBranch") {
      history.push({
        pathname: "/dashboard/Merchant-Branch-Summary",
      });
    } else if (e === "merchantTeller") {
      history.push({
        pathname: "/dashboard/Merchant-Teller-Summary",
      });
    }
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      merchantTellerSummaryList = merchantTellerSummaryList.filter((e: any) => {
        return (
          e.subMerchantCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.name
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.position
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.phoneNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.emailAddress
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.approvalDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.userType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.debitTransactionLimit
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.creditTransactionLimit
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.status
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      merchantTellerSummaryList = merchantTellerSummaryList.filter((e: any) => {
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
    <div className="MerchantTellerSummary">
      <div className="p-4">
        <>
          <CommonHeaderSummary
            RightContent={"Merchant Teller Summary"}
            SummaryFileName={"Merchant Teller Summary"}
            SummaryColumn={
              orginalColumns.length > 0 ? orginalColumns : merchantTellerHeader
            }
            TableData={merchantTellerSummaryList}
            Print={handlePrint}
            addButton={true}
            addOnClick={addMerchantTeller}
            addText={"Add"}
            searchArea={toggleSearch}
            search={searchArea}
            filterLeft={false}
            filter={false}
            List={true}
            ListData={handleList}
            Refresh={true}
            refresh={toggleRefresh}
          />
        </>
        {searchArea && (
          <div
            className="d-flex user-search mt-3 p-3 cursor"
            style={{ width: "auto" }}
          >
            <select
              className=" form-select user-search-drop ms-2 cursor"
              style={{ height: "35px", borderRadius: "0%" }}
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={"Select Field"}
            >
              <option selected hidden className="cursor">
                Select Field
              </option>

              <option value="subMerchantCode" className="cursor">
                Sub Merchant Code
              </option>
              <option value="name" className="cursor">
                Name
              </option>
              <option value="idType" className="cursor">
                ID Type
              </option>
              <option value="idNumber" className="cursor">
                ID Number
              </option>
              <option value="position" className="cursor">
                Position
              </option>
              <option value="phoneNumber" className="cursor">
                Phone Number
              </option>
              <option value="emailAddress" className="cursor">
                Email Address
              </option>
              <option value="approvalDate" className="cursor">
                Approval Date
              </option>
              <option value="userType" className="cursor">
                User Type
              </option>
              <option value="debitTransactionLimit" className="cursor">
                Debit Transaction Limit
              </option>
              <option value="creditTransactionLimit" className="cursor">
                Credit Transaction Limit
              </option>
              <option value="status" className="cursor">
                Status
              </option>
              <option value="any" className="cursor">
                Any
              </option>
            </select>
            <Input
              type="text"
              style={{ height: "35px", borderRadius: "0%" }}
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
        {apiMessage && (
          <div>
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeMessage}
              message={"Merchant Teller Created Successfully"}
            />
          </div>
        )}
        {apiUpdateMessage && (
          <div>
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={closeUpdateMessage}
              message={"Merchant Teller Updated Successfully"}
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
        <div className="col-7">
          <MerchantUAM page={"merchantTeller"} onClick={navigateTo} />
        </div>
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <div className="" ref={componentRef}>
            <CustomTable
              TableData={columns.length > 0 ? columns : merchantTellerHeader}
              CustomTableHeader={merchantTellerSummaryList}
              DisablePagination={false}
              Edit={true}
              editUser={handleEdit}
              DisableMange={toPrint ? true : false}
              toPrint={toPrint ? true : false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MerchantTellerSummary;
