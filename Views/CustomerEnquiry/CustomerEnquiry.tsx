import React, { useCallback, useEffect, useRef, useState } from "react";
import "./CustomerEnquiry.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  getKYCCustomerEnquiryDetail,
  resetCustomerEnquiryDetails,
  getCustomerEnquiryList,
  resetEditMessage,
} from "../../redux/action/CustomerEnquiryAction";

function CustomerEnquiry() {
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
  const [isLoading, setIsLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState(false);
  const [updateApiMessage, setUpdateApiMessage] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [mobileNum, setMobileNum] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [mobileNumErr, setMobileNumErr] = useState(false);

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
      dataIndex: "nationalityCodeDescription",
      key: "nationalityCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCodeDescription
            ?.toString()
            .localeCompare(b.nationalityCodeDescription?.toString()),
      },
    },
    {
      title: "Id Number",
      dataIndex: "idValue",
      key: "idValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idValue?.toString().localeCompare(b.idValue?.toString()),
      },
    },
    {
      title: "Wallet Size",
      dataIndex: "customerWalletDto",
      key: "customerWalletDto",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerWalletDto?.accountTypeName
            ?.toString()
            .localeCompare(b.customerWalletDto?.accountTypeName?.toString()),
      },
      render: (walletSize: any, e: any) => {
        return <label>{walletSize?.accountTypeName}</label>;
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
      render: (statusCode: any) => {
        let value = statusCode.toString().toUpperCase();
        return (
          <label
            className={` ${value === "A" ? "text-success" : "text-danger"}`}
          >
            {value === "A" ? "ACTIVE" : "INACTIVE"}
          </label>
        );
      },
    },
  ];

  const CustomerEnquiryList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getCustomerResponse
  );

  const updateCustomerDetails: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.updateCustomerError
  );

  const KYCCustomerEnquiryDetailList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getCustomerDetails
  );

  let customerDataList = CustomerEnquiryList?.data?.customerDTOPage?.content;

  const fetchCustomerData = useCallback(async () => {
    try {
      dispatch(getCustomerEnquiryList(1, 7));
    } catch (err) {}
  }, [dispatch]);

  const RecordsPerPage = (noOfRecords: number) => {
    dispatch(getCustomerEnquiryList(1, noOfRecords));
  };

  const prevBatch = (pageNummber: number, noOfRecords: number) => {
    dispatch(getCustomerEnquiryList(pageNummber, noOfRecords));
  };

  const nextBatch = (pageNummber: number, noOfRecords: number) => {
    dispatch(getCustomerEnquiryList(pageNummber, noOfRecords));
  };

  useEffect(() => {
    fetchCustomerData().then(() => {
      if (!CustomerEnquiryList?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchCustomerData]);

  useEffect(() => {
    if (CustomerEnquiryList) {
      if (CustomerEnquiryList?.data) {
        setIsLoading(false);
        dispatch(resetCustomerEnquiryDetails());
      }
    }
  }, [CustomerEnquiryList, resetCustomerEnquiryDetails]);

  useEffect(() => {
    if (updateCustomerDetails?.data) {
      setUpdateApiMessage(true);
      setTimeout(function () {
        setUpdateApiMessage(false);
        dispatch(resetEditMessage());
      }, 4000);
    }
  }, [updateCustomerDetails]);

  useEffect(() => {
    if (KYCCustomerEnquiryDetailList?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCustomerEnquiryDetails());
      }, 5000);
    } else if (KYCCustomerEnquiryDetailList?.data) {
      setfilterOption(false);
      if (mobileNo.length <= 3) {
        history.push({
          pathname: "/dashboard/KYC-Customer-Enquiry",
        });
      } else {
        history.push({
          pathname: "/dashboard/KYC-Customer-Enquiry/View-Customer-Enquiry",
          state: {
            value: {
              id: mobileNo,
              customerId: KYCCustomerEnquiryDetailList?.data?.customerId,
            },
          },
        });
      }
    }
  }, [KYCCustomerEnquiryDetailList]);

  const handleView = (e: any) => {
    history.push({
      pathname: "/dashboard/KYC-Customer-Enquiry/View-Customer-Enquiry",
      state: {
        value: {
          id: e?.mobileNumber,
          customerId: e?.customerId,
        },
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
      dispatch(getKYCCustomerEnquiryDetail(mobileNo));
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

  const closeUpdateMessage = () => {
    setUpdateApiMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      customerDataList = customerDataList.filter((e: any) => {
        return (
          e.customerName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.mobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.nationalityCodeDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idValue
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.dateOfOnboarding
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.customerWalletDto?.accountTypeName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else if (searchCategory === "accountTypeName") {
      customerDataList = customerDataList.filter((e: any) => {
        if (
          e?.customerWalletDto?.accountTypeName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    } else {
      customerDataList = customerDataList.filter((e: any) => {
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
    <div className="CustomerEnquiry">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Customer Enquiry"}
          SummaryFileName={"Customer Enquiry"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={customerDataList}
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
            <option value="nationalityCodeDescription" className="cursor">
              Nationality
            </option>
            <option value="idValue" className="cursor">
              ID Number
            </option>
            <option value="accountTypeName" className="cursor">
              Wallet Size
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
            minHeight: "auto"
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
                    className="Kyc-FilterINputBox form-input btn--sizer"
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
            message={KYCCustomerEnquiryDetailList?.message}
          />
        </div>
      )}
      {updateApiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Customer Data Updated Successfully."}
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
            CustomTableHeader={customerDataList}
            Delete={false}
            Edit={false}
            Document={false}
            view={true}
            viewUser={handleView}
            RecordsPerPage={RecordsPerPage}
            prevBatch={prevBatch}
            nextBatch={nextBatch}
            serverPagination={true}
            totalRecords={CustomerEnquiryList?.data?.noOfRecords}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default CustomerEnquiry;
