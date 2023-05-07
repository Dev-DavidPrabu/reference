import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Col, Form, Input, Row, Button, Label } from "reactstrap";

import "./PrefundTransactionEnquiry.scss";
import CustomButton from "../../Components/UI/CustomButton";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { FaReply } from "react-icons/fa";
import { prefundTransactionInfo } from "../../models/PreFundModels";
import {
  getAllCompanyData,
  getCompanyDatabyId,
  resetTranscationData,
} from "../../redux/action/CompanyMaintenanceAction";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Select } from "antd";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

const { Option } = Select;

const PrefundTransactionEnquiry = () => {
  const dispatch = useDispatch();
  const [filterArea, setFilterArea] = useState(true);
  const [showtable, setshowtable] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [toPrint, setPrint] = useState(false);
  const [minEndDate, setMinEndDate] = useState("");
  const [orginalColumns, setorginalColumns] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState("");

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData.userInfo?.userType;
  const [companyName, setCompanyName] = useState(
    (userType === "COMPANY_USER" &&
      userData.userInfo.companyUserResponse[0]?.companyName) ||
      "Select Company"
  );

  const [preFundFilterData, setprefundFilterData] = useState({
    companyId:
      (userType === "COMPANY_USER" &&
        userData.userInfo.companyUserResponse[0]?.companyId) ||
      "",
    startDate: "",
    endDate: "",
  });

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );
  let CompanyTransactionData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getCompanyTransaction
  );
  //To get hold of payroll enquiry list from Reducer
  const PayrollEnquiryList = useSelector(
    (state: RootStateOrAny) =>
      state.payrollTransactionEnquiryReducer
        .getPayrollTransactionEnquiryResponse
  );

  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);
  const fetchCompanyDataById = useCallback(
    (value: any) => {
      try {
        dispatch(getCompanyDatabyId(value));
      } catch (err) {}
    },
    [dispatch]
  );
  // const fetchResetCompanyDataById = useCallback(() => {
  //   try {
  //     dispatch(resetTranscationData());
  //   } catch (err) {}
  // }, [dispatch]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (companyGetData) {
      if (userType === "STAFF") {
        setprefundFilterData({
          ...preFundFilterData,
          ["companyId"]: companyGetData[0]?.id,
        });
      }
    }
  }, [companyGetData]);
  useEffect(() => {
    if (CompanyTransactionData) {
      setIsLoading(false);
    } else if (CompanyTransactionData === undefined) {
      setIsLoading(false);
      setApproveError(true);
      setApiStatus(false);
      setApiMessage(true);
      setApiErrorMsg(CompanyTransactionData?.message);
    }
  }, [CompanyTransactionData]);

  const toggleFiler = () => {
    setFilterArea(!filterArea);
    setSearchArea(false);
    setPrint(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setFilterArea(false);
    setPrint(false);
  };

  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const closeSearch = () => {
    setSearchArea(false);
  };

  // const columHandler = (selectedColumns: any, orginalList: any) => {
  //   setcolumns(selectedColumns);
  //   setorginalColumns(orginalList);
  // };
  const Header = [
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "uid",
      checked: true,
      sortOrder: "descend",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      key: "transactionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType.localeCompare(b.transactionType),
      },
    },
    {
      title: "Transaction Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionAmount
            .toString()
            .localeCompare(b.transactionAmount.toString()),
      },
    },
    {
      title: "Transaction Reference",
      dataIndex: "transactionReference",
      key: "transactionReference",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReference.localeCompare(b.transactionReference),
      },
    },
    {
      title: "Status",
      dataIndex: "transactionStatus",
      key: "Status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.recordStatus.localeCompare(b.recordStatus),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
        return (
          <label
            className={` ${
              value === "APPROVED" ? "text-success" : "text-danger"
            }`}
          >
            {value}
          </label>
        );
      },
    },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprefundFilterData({
      ...preFundFilterData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "startDate") {
      setMinEndDate(e.target.value);
    }
  };
  const handleChangeSearch = (e: any) => {
    let obj = JSON.parse(e);
    setCompanyName(obj.companyName);
    if (userType === "STAFF") {
      setprefundFilterData({
        ...preFundFilterData,
        ["companyId"]: obj.id,
      });
    } else if (userType === "COMPANY_USER") {
      setprefundFilterData({
        ...preFundFilterData,
        ["companyId"]: obj.companyId,
      });
    }
  };
  const handlecalloffEnquiryCancel = (e: React.MouseEvent<HTMLElement>) => {
    setprefundFilterData({
      ...preFundFilterData,
      startDate: "",
      endDate: "",
      companyId: "",
    });
    setCompanyName("");
  };
  const componentRef = useRef<any>();
  const payrollEnquirycallsubmithandler = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    fetchCompanyDataById(preFundFilterData);
    setIsLoading(true);
    setshowtable(true);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      CompanyTransactionData = CompanyTransactionData?.filter(
        (e: any | prefundTransactionInfo) => {
          return (
            e.transactionDate
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionType
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionAmount
              .toString()
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.transactionReference
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.recordStatus.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      CompanyTransactionData = CompanyTransactionData?.filter(
        (e: any | prefundTransactionInfo) => {
          if (
            e[searchCategory]
              .toString()
              .toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleRefresh = () => {
    setcolumns([]);
  };
  function onSearch(val: any) {}
  const closeMessage = () => {
    setApiMessage(false);
  };

  return (
    <div className="p-4">
      <div className="prefund-Account-header">
        <>
          <div>
            <CommonHeaderSummary
              RightContent={"Prefund Transaction enquiry"}
              SummaryFileName={"Transaction enquiry"}
              SummaryColumn={
                orginalColumns.length > 0 ? orginalColumns : Header
              }
              List={true}
              ListData={handleList}
              Refresh={true}
              refresh={toggleRefresh}
              filterArea={toggleFiler}
              filter={true}
              filterEnabled={filterArea}
              searchArea={toggleSearch}
              search={searchArea}
              Print={handlePrint}
              TableData={CompanyTransactionData}
            />
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
            {filterArea && (
              <div
                className="Transaction-filter-section mt-3 p-3 pb-1"
                style={{ height: "8rem" }}
              >
                <Form onSubmit={payrollEnquirycallsubmithandler}>
                  <div className="Form-group">
                    <div
                      style={{
                        fontSize: "18px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                    >
                      Filter
                    </div>
                    <Row>
                      <Col
                        sm={3}
                        className="Prefund-Account-row d-flex flex-column"
                      >
                        <Label for="exampleSelect" style={{ color: "#FFFFFF" }}>
                          Company Name
                        </Label>
                        <Select
                          onChange={handleChangeSearch}
                          showSearch
                          onSearch={onSearch}
                          filterOption={(input: any, option: any) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          id="fieldName1"
                          className="prefund-Account-input form-control border-0 cursor"
                          value={companyName}
                          style={{ height: "38px" }}
                        >
                          {userType === "STAFF"
                            ? companyGetData?.map((option: any, index: any) => {
                                return (
                                  <Option
                                    key={index}
                                    value={JSON.stringify(option)}
                                  >
                                    {option.companyName}
                                  </Option>
                                );
                              })
                            : userData.userInfo.companyUserResponse?.map(
                                (option: any) => {
                                  return (
                                    <Option value={JSON.stringify(option)}>
                                      {option.companyName}
                                    </Option>
                                  );
                                }
                              )}
                        </Select>
                      </Col>
                      <Col sm={3}>
                        <Label for="exampleEmail" style={{ color: "#FFFFFF" }}>
                          Start Date
                        </Label>
                        <Input
                          type="date"
                          name="startDate"
                          className="formRadiusDate cursor"
                          value={preFundFilterData.startDate}
                          onChange={handleChange}
                          max={moment().format("YYYY-MM-DD")}
                        ></Input>
                      </Col>

                      <Col sm={3}>
                        <Label for="exampleEmail" style={{ color: "#FFFFFF" }}>
                          End Date
                        </Label>
                        <Input
                          type="date"
                          name="endDate"
                          className="formRadiusDate cursor"
                          onChange={handleChange}
                          min={minEndDate}
                          max={moment().format("YYYY-MM-DD")}
                          value={preFundFilterData.endDate}
                        ></Input>
                      </Col>
                      <Col
                        className="enquiry-buttons"
                        sm={2}
                        style={{ marginTop: "22px" }}
                      >
                        <div className="d-flex mt-1">
                          <CustomButton
                            className="Submit-btn"
                            component={"payrollEnquiry"}
                            color={"danger"}
                          >
                            Submit
                          </CustomButton>
                          <div className="ps-3">
                            <CustomButton
                              className="Submit-btn"
                              color="secondary"
                              component={"payrollEnquiry"}
                              onClick={handlecalloffEnquiryCancel}
                            >
                              Reset
                            </CustomButton>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>{" "}
              </div>
            )}

            {searchArea && (
              <div className="d-flex user-search mt-3 p-3 cursor">
                <select
                  className=" form-select user-search-drop ms-2 cursor"
                  onChange={(e) => setSearchCategory(e.target.value)}
                  defaultValue={"Select Field"}
                >
                  <option selected className="cursor">
                    Select Field
                  </option>

                  <option value="transactionDate" className="cursor">
                    Transaction Date
                  </option>
                  <option value="transactionType" className="cursor">
                    Transaction Type
                  </option>
                  <option value="transactionAmount" className="cursor">
                    Transaction Amount
                  </option>
                  <option value="transactionReference" className="cursor">
                    Transaction Reference
                  </option>
                  <option value="recordStatus" className="cursor">
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
                  <Button color="danger btn--sizer">Search</Button>
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
            <CustomLoader isLoading={isLoading} size={50} />
            {apiMessage && (
              <CustomResponseMessage
                apiStatus={apiStatus}
                closeMessage={() => closeMessage()}
                message={apiErrorMsg}
                errorFix={approveError}
              />
            )}
            {showtable && (
              <div className="mt-3" ref={componentRef}>
                {isLoading ? null : (
                  <>
                    <CustomHeader
                      TableData={columns.length > 0 ? columns : Header}
                      CustomTableHeader={CompanyTransactionData}
                      DisableMange={true}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default PrefundTransactionEnquiry;
