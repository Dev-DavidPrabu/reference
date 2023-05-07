import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import "./KYCPendingCustomer.scss";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import {
  getKYCCustomerDetails,
  getKYCPendingCustomerList,
  resetCustomerDetails,
} from "../../redux/action/KYCPendingCustomerAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function KYCPendingCustomer() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);
  const date = new Date().toLocaleString();

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
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationality?.toString().localeCompare(b.nationality?.toString()),
      },
    },
    {
      title: "Id Number",
      dataIndex: "idNumber",
      key: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idNumber?.toString().localeCompare(b.idNumber?.toString()),
      },
    },
    {
      title: "Date Of Onboarding",
      dataIndex: "dateOfOnboarding",
      key: "dateOfOnboarding",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.dateOfOnboarding
            ?.toString()
            .localeCompare(b.dateOfOnboarding?.toString()),
      },
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
                : StatusCode === "REJECTED" || StatusCode === "INCOMPLETE"
                ? "status-error"
                : StatusCode === "PENDING" && "status-warning"
            }`}
          >
            {StatusCode}
          </label>
        );
      },
    },
  ];

  const KYCPendingCustomerList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCPendingCustomerReducer.getKYCPendingCustomerResponse
  );

  const KYCCustomerDetailsList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCPendingCustomerReducer.getCustomerDetails
  );

  const fetchKYCPendingCustomerData = useCallback(async () => {
    try {
      dispatch(getKYCPendingCustomerList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchKYCPendingCustomerData().then(() => {
      if (!KYCPendingCustomerList?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchKYCPendingCustomerData]);

  useEffect(() => {
    if (KYCPendingCustomerList) {
      if (KYCPendingCustomerList?.data) {
        setIsLoading(false);
        dispatch(resetCustomerDetails());
      }
    }
  }, [KYCPendingCustomerList, resetCustomerDetails]);

  useEffect(() => {
    if (KYCCustomerDetailsList?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCustomerDetails());
      }, 5000);
    } else if (KYCCustomerDetailsList?.data) {
      setfilterOption(false);
      if (mobileNo.length <= 3) {
        history.push({
          pathname: "/dashboard/KYC-Customer",
        });
      } else {
        history.push({
          pathname: "/dashboard/KYC-Customer/View-Customer-Profile",
          state: {
            value: {
              id: mobileNo,
            },
          },
        });
      }
    }
  }, [KYCCustomerDetailsList]);

  let KYCPendingCustomerData = KYCPendingCustomerList?.data;

  const handleView = (e: any) => {
    history.push({
      pathname: "/dashboard/KYC-Customer/View-Customer-Profile",
      state: {
        value: e,
      },
    });
  };

  const handleDocument = (e: any) => {
    history.push({
      pathname: "/dashboard/KYC-Customer/Document-Details",
      state: {
        value: e,
      },
    });
  };

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setSearchArea(false);
    setfilterOption(false);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(true);
  };

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const toggleRefresh = () => {
    setfilterOption(false);
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
    setfilterOption(false);
  };

  const handleChangeMobileNo = (e: any) => {
    if (isNaN(e.target.value)) {
      return;
    }
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setMobileNum(onlyNums);
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
  };

  const handleSubmit = () => {
    if (mobileNum.length >= 5) {
      setMobileNumErr(false);
      dispatch(getKYCCustomerDetails(mobileNo));
    } else {
      setMobileNumErr(true);
    }
  };

  const handleReset = () => {
    setMobileNumErr(false);
    setMobileNum("");
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
      KYCPendingCustomerData = KYCPendingCustomerData.filter((e: any) => {
        return (
          e.customerName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.mobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.nationality
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.dateOfOnboarding
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      KYCPendingCustomerData = KYCPendingCustomerData.filter((e: any) => {
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
  let mobileNo = "+" + countryCode.slice(1) + mobileNum;
  return (
    <div className="KYCPendingCustomer">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Pending Onboarding"}
          SummaryFileName={"Pending Onboarding"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={KYCPendingCustomerData}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={true}
          filterEnabled={filterOption}
          filterArea={toggleFilter}
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
            <option selected hidden className="cursor">
              Select Field
            </option>

            <option value="customerName" className="cursor">
              Name
            </option>
            <option value="mobileNumber" className="cursor">
              Mobile NO
            </option>
            <option value="nationality" className="cursor">
              Nationality
            </option>
            <option value="idNumber" className="cursor">
              ID Number
            </option>
            <option value="dateOfOnboarding" className="cursor">
              Date Of Onboarding
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
            placeholder="Type your search keyword"
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
      {filterOption && (
        <div
          className="kyc-filterTab kyc-filterHeading mt-2 mb-2 px-4 p-3"
          style={{
            marginLeft: "20px",
            marginRight: "15px",
            width: "auto",
            minHeight: "auto",
          }}
        >
          Filter
          <div className="kyc-warningText d-flex">
            {" "}
            ** Mobile Number is mandatory
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-7 d-flex">
              <div className="col-2 me-1">
                <div className="col">
                  <label className="Kyc-Filterlabel">Country Code</label>
                </div>
                <div className="col-9 me-1">
                  <Input
                    name="countryCode"
                    type="select"
                    className="Kyc-FilterINputBox form-input"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option>+60</option>
                    <option>+65</option>
                    <option>+91</option>
                  </Input>
                </div>
              </div>
              <div className="col-10 me-2">
                <div className="col">
                  <label className="Kyc-Filterlabel">Mobile Number</label>
                </div>
                <div className="row">
                  <div className="col-5 me-2">
                    <Input
                      name="mobileNo"
                      type="text"
                      value={mobileNum}
                      className={
                        mobileNumErr
                          ? "validation-error kyc-noBorder"
                          : "Kyc-FilterINputBox form-input"
                      }
                      placeholder="Enter mobile number"
                      onChange={handleChangeMobileNo}
                      maxLength={15}
                      minLength={5}
                    ></Input>
                  </div>
                  <div className="col  me-2">
                    <Button
                      color="danger"
                      className="kyc-FilterSubmitButton me-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                    <Button
                      className="kyc-FilterResetButton me-2"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={false}
            closeMessage={closeMessage}
            message={KYCCustomerDetailsList?.message}
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
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="px-3 mb-5" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={KYCPendingCustomerData}
            Delete={false}
            Edit={false}
            Document={true}
            view={true}
            viewUser={handleView}
            documentUser={handleDocument}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default KYCPendingCustomer;
