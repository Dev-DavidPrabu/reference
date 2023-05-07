import React, { useCallback, useEffect, useRef, useState } from "react";
import "./AmlCustomerInfo.scss";

import { useHistory, useLocation } from "react-router";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CustomButton from "../../Components/UI/CustomButton";
import {
  getAmlCustomersInfo,
  approveRejectStatus,
  resetAppproveRejectStatus,
} from "../../redux/action/AmlPendingCustomersAction";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomInput from "../../Components/UI/CustomInput";
import { Switch } from "antd";
import { ErrorMessage } from "../../Constants/Constants";

function AmlCustomerInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrMessage, setApiErrMessage] = useState(false);
  const [confirmMatch, setConfirmMatch] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [apiMessage, setApiMessage] = useState("");

  const Header = [
    {
      title: "List Name",
      dataIndex: "listName",
      key: "listName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.listName?.toString().localeCompare(b.listName?.toString()),
      },
    },
    {
      title: "Name Match %",
      dataIndex: "nameMatchPercent",
      key: "nameMatchPercent",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nameMatchPercent
            ?.toString()
            .localeCompare(b.nameMatchPercent?.toString()),
      },
    },
    {
      title: "Overall Match %",
      dataIndex: "overallMatchPercent",
      key: "overallMatchPercent",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.overallMatchPercent
            ?.toString()
            .localeCompare(b.overallMatchPercent?.toString()),
      },
    },
    {
      title: "Country Name",
      dataIndex: "countryOrCountryOfRegistration",
      key: "countryOrCountryOfRegistration",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirthOrIncorporation",
      key: "dateOfBirthOrIncorporation",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.dateOfBirthOrIncorporation
            ?.toString()
            .localeCompare(b.dateOfBirthOrIncorporation?.toString()),
      },
    },
    {
      title: "ID Number",
      dataIndex: "nationalIdOrRegistrationNumber",
      key: "nationalIdOrRegistrationNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
    {
      title: "SDN ID",
      dataIndex: "sdnId",
      key: "sdnId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.sdnId?.toString().localeCompare(b.sdnId?.toString()),
      },
    },
    {
      title: "SDN Name",
      dataIndex: "sdnName",
      key: "sdnName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
    {
      title: "AML List Category",
      dataIndex: "amlCategory",
      key: "amlCategory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
  ];

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const amlCustomerInfoData: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlPendingCustomersReducer.getAmlCustomersInfo
  );

  const amlApproveReject: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlPendingCustomersReducer.approveRejectMessage
  );

  let amlCustomerInfo = amlCustomerInfoData?.data;

  const fetchAmlCustomerInfo = useCallback(async () => {
    try {
      dispatch(getAmlCustomersInfo(location?.state?.value?.id));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAmlCustomerInfo().then(() => {
      if (!amlCustomerInfoData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchAmlCustomerInfo]);

  useEffect(() => {
    if (amlCustomerInfoData) {
      if (amlCustomerInfoData?.data) {
        setIsLoading(false);
      }
    }
  }, [amlCustomerInfoData]);

  useEffect(() => {
    if (amlApproveReject?.message) {
      setApiErrMessage(true);
      setTimeout(function () {
        setApiErrMessage(false);
        dispatch(resetAppproveRejectStatus());
      }, 3000);
    }
  }, [amlApproveReject]);

  useEffect(() => {
    fetchAmlCustomerInfo();
  }, [fetchAmlCustomerInfo]);

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

  const match_onChange = (e: any) => {
    if (e.target.value === "confirmMatch") {
      setConfirmMatch(true);
    } else if (e.target.value === "normalMatch") {
      setConfirmMatch(false);
    }
  };

  const handle_Approve = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (confirmMatch) {
      if (Object.keys(selectedRecord).length !== 0) {
        dispatch(
          approveRejectStatus(
            location?.state?.value?.id,
            "VERIFIED",
            selectedRecord,
            confirmMatch
          )
        );
      } else {
        setApiMessage(ErrorMessage.SELECT_ONE_MATCH);
      }
    } else {
      dispatch(
        approveRejectStatus(
          location?.state?.value?.id,
          "VERIFIED",
          selectedRecord,
          confirmMatch
        )
      );
    }
  };
  const handle_Reject = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (confirmMatch) {
      if (selectedRecord) {
        dispatch(
          approveRejectStatus(
            location?.state?.value?.id,
            "REJECTED",
            selectedRecord,
            confirmMatch
          )
        );
      } else {
        setApiMessage(ErrorMessage.SELECT_ONE_MATCH);
      }
    } else {
      dispatch(
        approveRejectStatus(
          location?.state?.value?.id,
          "REJECTED",
          selectedRecord,
          confirmMatch
        )
      );
    }
  };
  const handle_Cancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
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

  const closeMessage = () => {
    setApiErrMessage(false);
    setApiMessage("");
  };

  let customerDatas = amlCustomerInfo?.map((data: any, index: any) => {
    return {
      ...data,
      key: index,
    };
  });
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      
      if (selectedRows.length === 1) {
        delete selectedRows[0].key;
        setSelectedRecord(selectedRows[0]);
      }
    },
    hideSelectAll: true,
    type: "radio",
    getCheckboxProps: (record: any) => ({
      id: record?.id,
    }),
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      amlCustomerInfo = amlCustomerInfo.filter((e: any | ToggleSummaryInfo) => {
        return (
          e.listName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.nameMatchPercent
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.overallMatchPercent
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.countryOrCountryOfRegistration
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.dateOfBirthOrIncorporation
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.nationalIdOrRegistrationNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.sdnId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.sdnName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.amlCategory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      amlCustomerInfo = amlCustomerInfo.filter((e: any | ToggleSummaryInfo) => {
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
    <div className="AmlCustomerInfo">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"AML Customer Info"}
          SummaryFileName={"AML Customer Info"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={amlCustomerInfo}
          Print={handlePrint}
          addButton={false}
          filterLeft={false}
          searchArea={toggleSearch}
          search={searchArea}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
        />
      </div>
      {searchArea && (
        <div
          className="d-flex user-search mt-3 p-3 cursor"
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

            <option value="listName" className="cursor">
              List Name
            </option>
            <option value="nameMatchPercent" className="cursor">
              Name Match %
            </option>
            <option value="overallMatchPercent" className="cursor">
              Overall Match %
            </option>
            <option value="countryOrCountryOfRegistration" className="cursor">
              Country Name
            </option>
            <option value="dateOfBirthOrIncorporation" className="cursor">
              Date Of Birth
            </option>
            <option value="nationalIdOrRegistrationNumber" className="cursor">
              ID Number
            </option>
            <option value="sdnId" className="cursor">
              SDN ID
            </option>
            <option value="sdnName" className="cursor">
              SDN Name
            </option>
            <option value="amlCategory" className="cursor">
              AML List Category
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
              <label className="edit-sum-label">Status</label>
            </div>
            <div className="col-4 p-1">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state?.value?.statusCode}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col d-flex mt-2">
            <div className="col-2 p-2 ">
              <label className="edit-sum-label">DOB</label>
            </div>
            <div
              className="col-4 p-1"
              style={{ marginLeft: "-30px", marginRight: "20px" }}
            >
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state?.value?.birthDate}
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
          <div className="col d-flex mt-2">
            <div className="col-2 p-2 ">
              <label className="edit-sum-label">ID Type</label>
            </div>
            <div
              className="col-4 p-1"
              style={{ marginLeft: "-30px", marginRight: "20px" }}
            >
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state?.value?.idTypeCode}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
            <div className="col-2 p-2">
              <label className="edit-sum-label">ID Value</label>
            </div>
            <div className="col-4 p-1">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state?.value?.idValue}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
          </div>
          {location?.state?.value?.statusCode != "PENDING" && (
            <div className="col d-flex mt-2">
              <div className="col-2 p-2 ">
                <label className="edit-sum-label">Confirm Match</label>
              </div>
              <div
                className="col-4 p-1"
                style={{ marginLeft: "-30px", marginRight: "20px" }}
              >
                <Switch
                  disabled
                  className="toggle-switch KYC-CustomerToggle"
                  checkedChildren="Yes"
                  unCheckedChildren="NO"
                  checked={
                    location?.state?.value?.amlConfirmMatch ? true : false
                  }
                />
              </div>
              <div className="col-2 p-2">
                <label className="edit-sum-label">Normal Match</label>
              </div>
              <div className="col-4 p-1">
                <Switch
                  disabled
                  className="toggle-switch KYC-CustomerToggle"
                  checkedChildren="Yes"
                  unCheckedChildren="NO"
                  checked={
                    location?.state?.value?.amlNormalMatch ? true : false
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div className="d-flex">
          <CustomButton
            color="secondary"
            className="btn2"
            component={"payrollEnquiry"}
            onClick={handle_Cancel}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>
        </div>
      </div>

      {apiErrMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={amlApproveReject?.message}
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
      {location?.state?.value?.statusCode === "PENDING" && (
        <div className="col p-3">
          <CustomInput
            type="radio"
            onChange={match_onChange}
            value="confirmMatch"
            name="fileType"
            className="box-input"
          />
          <label style={{ marginRight: "10px" }}>Confirm Match</label>
          <CustomInput
            type="radio"
            onChange={match_onChange}
            value="normalMatch"
            name="fileType"
            className="box-input"
          />
          <label>Normal Match</label>
        </div>
      )}
      <CustomLoader isLoading={isLoading} size={50} />
      <div className="p-3">
        <CustomResponseMessage
          apiStatus={false}
          closeMessage={closeMessage}
          message={apiMessage}
          errorFix={true}
        />
      </div>
      {isLoading ? null : (
        <div className="px-3 mb-5" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={customerDatas}
            rowSelection={confirmMatch && rowSelection}
            DisableMange={true}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
      {location?.state?.value?.statusCode === "PENDING" && (
        <div className="d-flex">
          <div className="col  mb-3">
            <div className="col-8 p-3 ">
              <CustomButton
                color="success"
                onClick={handle_Approve}
                className="btn2"
              >
                Approve
              </CustomButton>
              <CustomButton
                color="danger"
                onClick={handle_Reject}
                className="btn2"
              >
                Reject
              </CustomButton>
              <CustomButton
                color="secondary"
                className="btn2"
                component={"payrollEnquiry"}
                onClick={handle_Cancel}
              >
                Cancel
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AmlCustomerInfo;
