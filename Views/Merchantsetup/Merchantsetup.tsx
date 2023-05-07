import React, { useState, useRef, useCallback, useEffect } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { useReactToPrint } from "react-to-print";
import MerchantUAM from "../../Components/MerchantUAM/MerchantUAM";
import { useHistory } from "react-router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import CustomTable from "../../Components/CustomTable/CustomTable";
import {
  getMerchantSummaryList,
  resetMerchantCreateMessage,
  resetMerchantUpdateMessage,
} from "../../redux/action/MerchantSetupAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function Merchantsetup(props: any) {
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

  let merchantHeader = [
    {
      title: "Merchant Code",
      dataIndex: "merchantCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantCode?.toString().localeCompare(b.merchantCode?.toString()),
      },
    },
    {
      title: "Merchant Name",
      dataIndex: "merchantName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantName?.toString().localeCompare(b.merchantName?.toString()),
      },
    },
    {
      title: "Merchant Activation Date",
      dataIndex: "merchantActivationDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantActivationDate
            ?.toString()
            .localeCompare(b.merchantActivationDate?.toString()),
      },
    },
    {
      title: "Merchant Approval Date",
      dataIndex: "merchantApprovalDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantApprovalDate
            ?.toString()
            .localeCompare(b.merchantApprovalDate?.toString()),
      },
    },
    {
      title: "Merchant Address",
      dataIndex: "merchantAddress",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantAddress
            ?.toString()
            .localeCompare(b.merchantAddress?.toString()),
      },
    },
    {
      title: "Merchant Phone Number",
      dataIndex: "merchantPhoneNumber",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantPhoneNumber
            ?.toString()
            .localeCompare(b.merchantPhoneNumber?.toString()),
      },
    },
    {
      title: "Latitude",
      dataIndex: "merchantLatitude",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantLatitude
            ?.toString()
            .localeCompare(b.merchantLatitude.toString()),
      },
    },
    {
      title: "Longitude",
      dataIndex: "merchantLongitude",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantLongitude
            ?.toString()
            .localeCompare(b.merchantLongitude?.toString()),
      },
    },
    {
      title: "Start Time",
      dataIndex: "operationStartHour",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.operationStartHour
            ?.toString()
            .localeCompare(b.operationStartHour?.toString()),
      },
    },
    {
      title: "End Time",
      dataIndex: "operationEndHour",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.operationEndHour
            ?.toString()
            .localeCompare(b.operationEndHour?.toString()),
      },
    },
    {
      title: "Number of Branch",
      dataIndex: "noOfBranch",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.noOfBranch?.toString().localeCompare(b.noOfBranch?.toString()),
      },
    },

    {
      title: "Merchant Status",
      dataIndex: "merchantStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantStatus
            ?.toString()
            .localeCompare(b.merchantStatus?.toString()),
      },
    },
    {
      title: "Merchant Category",
      dataIndex: "merchantCategory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.merchantCategory
            ?.toString()
            .localeCompare(b.merchantCategory?.toString()),
      },
    },
  ];

  const merchantSummaryData: any = useSelector(
    (state: RootStateOrAny) => state.MerchantSetupReducer.getAllMerchantList
  );

  const merchantCreateError: any = useSelector(
    (state: RootStateOrAny) => state.MerchantSetupReducer.getMerchantCreateError
  );

  const merchantUpdateError: any = useSelector(
    (state: RootStateOrAny) => state.MerchantSetupReducer.getMerchantUpdateError
  );

  let merchantSummaryList = merchantSummaryData?.data;

  const fetchMerchantList = useCallback(async () => {
    try {
      dispatch(getMerchantSummaryList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchMerchantList().then(() => {
      if (!merchantSummaryData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchMerchantList]);

  useEffect(() => {
    if (merchantSummaryData?.data) {
      setIsLoading(false);
    }
  }, [merchantSummaryData]);


  useEffect(() => {
    if (merchantCreateError?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantCreateMessage());
      }, 3000);
    }
  }, [merchantCreateError]);

  useEffect(() => {
    if (merchantUpdateError?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetMerchantUpdateMessage());
      }, 3000);
    }
  }, [merchantCreateError]);

  const handleEdit = (e: any) => {
    history.push({
      pathname: "/dashboard/Merchant-Setup/Edit-Merchant-setup",
      state: {
        value: e,
      },
    });
  };

  const handleView = (e: any) => {
    history.push({
      pathname: "/dashboard/Merchant-Setup/View-Merchant-setup",
      state: {
        value: e,
      },
    });
  };

  const addMerchant = () => {
    history.push({
      pathname: "/dashboard/Merchant-Setup/Add-Merchant-setup",
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
        pathname: "/dashboard/Merchant-Setup",
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
      merchantSummaryList = merchantSummaryList.filter((e: any) => {
        return (
          e.merchantCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantActivationDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantApprovalDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantAddress
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantPhoneNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantLatitude
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantLongitude
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.operationStartHour
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.operationEndHour
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.noOfBranch
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantStatus
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.merchantCategory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      merchantSummaryList = merchantSummaryList.filter((e: any) => {
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
    <div className="p-4">
      <>
        <CommonHeaderSummary
          RightContent={"Merchant Summary"}
          SummaryFileName={"Merchant Summary"}
          SummaryColumn={
            orginalColumns.length > 0 ? orginalColumns : merchantHeader
          }
          TableData={merchantSummaryList}
          Print={handlePrint}
          addButton={true}
          addOnClick={addMerchant}
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

            <option value="merchantCode" className="cursor">
              Merchant Code
            </option>
            <option value="merchantName" className="cursor">
              Merchant Name
            </option>
            <option value="merchantActivationDate" className="cursor">
              Merchant Activation Date
            </option>
            <option value="merchantApprovalDate" className="cursor">
              Merchant Approval Date
            </option>
            <option value="merchantAddress" className="cursor">
              Merchant Address
            </option>
            <option value="merchantPhoneNumber" className="cursor">
              Merchant Phone Number
            </option>
            <option value="merchantLatitude" className="cursor">
              Merchant Latitude
            </option>
            <option value="merchantLongitude" className="cursor">
              Merchant Longitude
            </option>
            <option value="operationStartHour" className="cursor">
              Start Time
            </option>
            <option value="operationEndHour" className="cursor">
              End Time
            </option>
            <option value="noOfBranch" className="cursor">
              Number of Branch
            </option>
            <option value="merchantStatus" className="cursor">
              Merchant Status
            </option>
            <option value="merchantCategory" className="cursor">
              Merchant Category
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
        <div className="">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Merchant Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Merchant Updated Successfully"}
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
        <MerchantUAM page={"merchant"} onClick={navigateTo} />
      </div>
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : merchantHeader}
            CustomTableHeader={merchantSummaryList}
            DisablePagination={false}
            view={true}
            Edit={true}
            viewUser={handleView}
            editUser={handleEdit}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default Merchantsetup;
