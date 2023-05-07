import React, { useState, useRef, useEffect, useCallback } from "react";
import { Form } from "antd";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
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
  getMerchantBranchSummaryList,
  resetMerchantBranchCreateMessage,
  resetMerchantBranchUpdateMessage,
} from "../../redux/action/MerchantSetupAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function MerchantBranchSummary() {
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

  let merchantBranchHeader = [
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
      title: "Activation Date",
      dataIndex: "activationDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.activationDate
            ?.toString()
            .localeCompare(b.activationDate?.toString()),
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
      title: "Address",
      dataIndex: "address",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.address?.toString().localeCompare(b.address?.toString()),
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
      title: "Latitude",
      dataIndex: "latitude",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.latitude?.toString().localeCompare(b.latitude?.toString()),
      },
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.longitude?.toString().localeCompare(b.longitude?.toString()),
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
      title: "Contact Person",
      dataIndex: "contactPerson",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.contactPerson
            ?.toString()
            .localeCompare(b.contactPerson?.toString()),
      },
    },

    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.contactNumber
            ?.toString()
            .localeCompare(b.contactNumber?.toString()),
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

  const merchantBranchSummaryData: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getAllMerchantBranchList
  );

  const merchantBranchCreateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getMerchantBranchCreateError
  );

  const merchantBranchUpdateError: any = useSelector(
    (state: RootStateOrAny) =>
      state.MerchantSetupReducer.getMerchantBranchUpdateError
  );

  let merchantBranchSummaryList = merchantBranchSummaryData?.data;

  const fetchMerchantBranchList = useCallback(async () => {
    try {
      dispatch(getMerchantBranchSummaryList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchMerchantBranchList().then(() => {
      if (!merchantBranchSummaryData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchMerchantBranchList]);

  useEffect(() => {
    if (merchantBranchSummaryData?.data) {
      setIsLoading(false);
    }
  }, [merchantBranchSummaryData]);


  useEffect(() => {
    if (merchantBranchCreateError?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetMerchantBranchCreateMessage());
      }, 3000);
    }
  }, [merchantBranchCreateError]);

  useEffect(() => {
    if (merchantBranchUpdateError?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetMerchantBranchUpdateMessage());
      }, 3000);
    }
  }, [merchantBranchCreateError]);

  const handleEdit = (e: any) => {
    history.push({
      pathname: "/dashboard/Merchant-Branch-Summary/Edit-Merchant-Branch",
      state: {
        value: e,
      },
    });
  };

  const addMerchantBranch = () => {
    history.push({
      pathname: "/dashboard/Merchant-Branch-Summary/Add-Merchant-Branch",
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
      merchantBranchSummaryList = merchantBranchSummaryList.filter((e: any) => {
        return (
          e.merchantCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.subMerchantCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.activationDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.approvalDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.address
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.phoneNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.latitude
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.longitude
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
          e.contactPerson
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.contactNumber
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
      merchantBranchSummaryList = merchantBranchSummaryList.filter((e: any) => {
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
          RightContent={"Merchant Branch Summary"}
          SummaryFileName={"Merchant Branch Summary"}
          SummaryColumn={
            orginalColumns.length > 0 ? orginalColumns : merchantBranchHeader
          }
          TableData={merchantBranchSummaryList}
          Print={handlePrint}
          addButton={true}
          addOnClick={addMerchantBranch}
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
            <option value="subMerchantCode" className="cursor">
              Sub Merchant Code
            </option>
            <option value="activationDate" className="cursor">
              Activation Date
            </option>
            <option value="approvalDate" className="cursor">
              Approval Date
            </option>
            <option value="address" className="cursor">
              Address
            </option>
            <option value="phoneNumber" className="cursor">
              Phone No
            </option>
            <option value="latitude" className="cursor">
              Latitude
            </option>
            <option value="longitude" className="cursor">
              Longitude
            </option>
            <option value="operationStartHour" className="cursor">
              Start Time
            </option>
            <option value="operationEndHour" className="cursor">
              End Time
            </option>
            <option value="contactPerson" className="cursor">
              Contact Person
            </option>
            <option value="contactNumber" className="cursor">
              Contact Number
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
        <div className="">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Merchant Branch Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Merchant Branch Updated Successfully"}
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
        <MerchantUAM page={"merchantBranch"} onClick={navigateTo} />
      </div>
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : merchantBranchHeader}
            CustomTableHeader={merchantBranchSummaryList}
            DisablePagination={false}
            Edit={true}
            editUser={handleEdit}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default MerchantBranchSummary;
