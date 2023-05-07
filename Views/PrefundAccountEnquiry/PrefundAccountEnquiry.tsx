import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getPayrollAccountEnquiry } from "../../redux/action/payrollAccountEnquiry";
import { customValidator } from "../../Constants/Validation";
import { Button, Col, Form, Input, Row } from "reactstrap";
import "./PrefundAccountEnquiry.scss";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import NoDataCard from "../../Components/NoDataCard/NoDataCard";
import { restCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import { AiOutlineEye } from "react-icons/ai";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomTableFieldSelector from "../../Components/CustomComponents/CustomTableFieldSelector/CustomTableFieldSelector";
import { FaReply } from "react-icons/fa";
import { prefundAccountInfo } from "../../models/PreFundModels";

const PrefundAccountEnquiry = (props: any) => {
  let pageSize = 7;
  const dispatch = useDispatch();

  const companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.payrollAccountEnquiryReducer.getPayrollAccountEnquiryResponse
  );

  const resetCompanyInfo = useCallback(async () => {
    try {
      dispatch(restCompanyData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setisLoading(false);
  }, [companyGetData]);

  const [isPrefundScreenVisible, setIsPrefundScreenVisible] = useState(false);
  const [companyViewId, setCompanyViewId] = useState("");
  const [companyAccountId, setcompanyAccountId] = useState("");
  const [nocardData, setNoCardData] = useState("No Data Found");
  const [filterArea, setFilterArea] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [isLoading, setisLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [isFilterShows, setisFilterShows] = useState(false);

  const editRow = (e: any) => {
    props.history.push({
      pathname: "/dashboard/prefund-Account-enquiry/Edit-Prefund-Enquiry",
      state: e,
    });
  };

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

  const [prefundAccountQuery, setprefundAccountQuery]: any = useState({
    fieldName1: "",
    condition1: "=",
    value1: "",
    fieldName2: "",
    condition2: "=",
    value2: "",
    condition3: "OR",
  });
  const [fielderror, setfielderror] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(7);
  const [toPrint, setPrint] = useState(false);
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };

  const componentRef = useRef<any>();
  const columHandler = (selectedColumns: any, orginalList: any) => {
    setcolumns(selectedColumns);
    setorginalColumns(orginalList);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleChangeForPagination = (value: number) => {
    setCurrentPage(value);
    setMinIndex((value - 1) * pageSize);
    setMaxIndex(value * pageSize);
  };

  const [errorMessage, seterrorMessage] = useState({
    fieldTypesError: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprefundAccountQuery({
      ...prefundAccountQuery,
      [e.target.name]: e.target.value,
    });
    setNoCardData("");
  };

  const enquiryValidate_handler = () => {
    let field1Error = customValidator(
      "required",
      "*Any one field and value is required it ",
      prefundAccountQuery.fieldName1
    );
    let field2Error = customValidator(
      "required",
      "*Field",
      prefundAccountQuery.fieldName2
    );
    let value1Error = customValidator(
      "required",
      "*Value ",
      prefundAccountQuery.value1
    );
    let value2Error = customValidator(
      "required",
      "*Value",
      prefundAccountQuery.value2
    );

    if (
      !(field1Error === "null" && value1Error === "null") &&
      !(field2Error === "null" && value2Error === "null")
    ) {
      seterrorMessage({
        ...errorMessage,
        fieldTypesError: "*Any one field and value is required",
      });
      setfielderror(true);
      return false;
    } else {
      setfielderror(false);
    }

    return true;
  };

  const handle_EnquiryCancel = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setprefundAccountQuery({
      fieldName1: "",
      condition1: "=",
      value1: "",
      fieldName2: "",
      condition2: "=",
      value2: "",
      condition3: "OR",
    });
  };
  const payrollEnquiry_submithandler = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setNoCardData("No match found.");
    if (enquiryValidate_handler()) {
      dispatch(getPayrollAccountEnquiry(prefundAccountQuery));
      setFilterArea(!filterArea);
      setprefundAccountQuery({
        fieldName1: "",
        condition1: "=",
        value1: "",
        fieldName2: "",
        condition2: "=",
        value2: "",
        condition3: "OR",
      });
      setisLoading(true);
    }
  };

  const prefundHeader = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Contact Person",
      dataIndex: "authorizerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerName.localeCompare(b.authorizerName),
      },
    },
    {
      title: "Contact Mobile No",
      dataIndex: "authorizerMobileNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerMobileNo.localeCompare(b.authorizerMobileNo),
      },
    },
    {
      title: "Email Address",
      dataIndex: "companyEmail",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyEmail.localeCompare(b.companyEmail),
      },
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
      },
      render: (status: any, record: { key: React.Key }) => {
        return (
          <label
            className={`d-flex justify-content-center ${
              status === "A" ? "text-success" : "text-danger"
            }`}
          >
            {status === "A" ? "Active" : "InActive"}
          </label>
        );
      },
    },
    {
      title: "Manage",
      align: "center",
      dataIndex: "Manage",
      render: (_: any, record: { key: React.Key }) => {
        return (
          <div onClick={() => editRow(record)} className="cursor">
            <AiOutlineEye />
          </div>
        );
      },
    },
  ];

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      companyGetData.data = companyGetData.data.filter(
        (e: any | prefundAccountInfo) => {
          return (
            e.companyName
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.authorizerName
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.authorizerMobileNo
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.companyEmail
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.statusCode.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      companyGetData.data = companyGetData.data.filter(
        (e: any | prefundAccountInfo) => {
          if (
            e[searchCategory]
              .toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }
  return (
    <div className="container-width">
      <div className="prefund-Account-header">
        <div className="p-4">
          <CommonHeaderSummary
            RightContent={"Payroll Prefund Account Enquiry"}
            SummaryFileName={"Prefund Account Enquiry"}
            SummaryColumn={columns.length > 0 ? columns : prefundHeader}
            TableData={companyGetData?.data}
            Print={handlePrint}
            filterArea={toggleFiler}
            filter={filterArea}
            searchArea={toggleSearch}
            search={searchArea}
          />
          {filterArea && (
            <div className="user-filter-section p-3">
              <Form onSubmit={payrollEnquiry_submithandler}>
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
                    <Col sm={2} className="Prefund-Account-row">
                      <Input
                        type="select"
                        name="fieldName1"
                        id="fieldName1"
                        onChange={handleChange}
                        className="prefund-Account-input"
                        value={prefundAccountQuery.fieldName1}
                      >
                        <option value="">---select---</option>
                        <option value="companyName">companyName</option>
                        <option value="statusCode">statusCode</option>
                      </Input>
                    </Col>
                    <Col sm={1} className="Prefund-Account-row">
                      <Input
                        type="select"
                        name="condition1"
                        id="condition1"
                        onChange={handleChange}
                        className="prefund-Account-input"
                        value={prefundAccountQuery.condition1}
                      >
                        <option key="-1" value="=">
                          =
                        </option>
                        <option value="Starts with">Starts with</option>
                      </Input>
                    </Col>
                    <Col sm={2} className="Prefund-Account-row">
                      <CustomInput
                        className="prefund-Account-input"
                        name="value1"
                        id="value1"
                        onChange={handleChange}
                        value={prefundAccountQuery.value1}
                      />
                    </Col>
                    <Col sm={2} className="Prefund-Account-row">
                      <Input
                        type="select"
                        name="condition3"
                        id="condition3"
                        onChange={handleChange}
                        className="prefund-Account-input"
                        value={prefundAccountQuery.condition3}
                      >
                        <option value="OR">OR</option>
                        <option value="AND">AND</option>
                      </Input>
                    </Col>
                    <Col sm={2} className="Prefund-Account-row">
                      <Input
                        type="select"
                        name="fieldName2"
                        id="fieldName2"
                        onChange={handleChange}
                        className="prefund-Account-input"
                        value={prefundAccountQuery.fieldName2}
                      >
                        <option value="">---select---</option>
                        <option value="companyName">companyName</option>
                        <option value="statusCode">statusCode</option>
                      </Input>
                    </Col>
                    <Col sm={1} className="Prefund-Account-row">
                      <Input
                        type="select"
                        name="condition2"
                        id="condition2"
                        onChange={handleChange}
                        className="prefund-Account-input"
                        value={prefundAccountQuery.condition2}
                      >
                        <option key="-1" value="=">
                          =
                        </option>
                        <option value="Starts with">Starts with</option>
                      </Input>
                    </Col>
                    <Col sm={2} className="Prefund-Account-row">
                      <CustomInput
                        className="prefund-Account-input"
                        name="value2"
                        id="value2"
                        onChange={handleChange}
                        value={prefundAccountQuery.value2}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="Form-group">
                  <Row>
                    <Col>
                      {fielderror ? (
                        <div style={{ color: "red" }}>
                          {errorMessage.fieldTypesError}
                        </div>
                      ) : null}
                    </Col>
                    <Col className="enquiry-buttons me-0">
                      <div className="d-flex justify-content-end">
                        <CustomButton
                          className="Submit-btn"
                          component={"payrollEnquiry"}
                          color={"secondary"}
                        >
                          Fetch
                        </CustomButton>
                        <div className="ps-3">
                          <CustomButton
                            color="secondary"
                            component={"payrollEnquiry"}
                            onClick={handle_EnquiryCancel}
                          >
                            Reset
                          </CustomButton>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          )}

          <div className="mt-2">
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
                to confirm and Print !
              </span>
            )}
          </div>
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

                <option value="companyName" className="cursor">
                  Company Name
                </option>
                <option value="authorizerName" className="cursor">
                  Contact Person
                </option>
                <option value="authorizerMobileNo" className="cursor">
                  Contact Mobile No
                </option>
                <option value="companyEmail" className="cursor">
                  Email Address
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
                className="ms-1 user-search-input"
                onChange={(ev) => handleSearch(ev)}
                placeholder="Type your search keyword"
              />
              <div className="ms-1">
                <Button color="danger">Search</Button>
              </div>
              <div>
                <Button className="text-white  border-0 ms-1">
                  <FaReply />
                </Button>
              </div>
            </div>
          )}
          {isLoading ? (
            <CustomLoader isLoading={isLoading} size={50} />
          ) : (
            <>
              {companyGetData.data?.length > 0 ? (
                <div>
                  <div ref={componentRef}>
                    <CustomTableFieldSelector
                      headers={
                        orginalColumns.length > 0
                          ? orginalColumns
                          : prefundHeader
                      }
                      DND={true}
                      select={false}
                      submit={columHandler}
                    />
                    <CustomHeader
                      TableData={columns.length > 0 ? columns : prefundHeader}
                      CustomTableHeader={companyGetData.data}
                      DisableMange={true}
                      viewUser={editRow}
                    />
                  </div>
                </div>
              ) : (
                <NoDataCard isEnquiryScreen={true}>
                  {companyGetData.data?.length === 0
                    ? nocardData
                    : "choose any filter"}
                </NoDataCard>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrefundAccountEnquiry;
