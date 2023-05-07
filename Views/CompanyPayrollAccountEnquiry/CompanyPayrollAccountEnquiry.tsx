import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "../CompanyMaintenanceScreen/CompanyMaintenanceScreen.scss";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { useReactToPrint } from "react-to-print";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  deletePayrollCompanyData,
  getAllCompanyData,
} from "../../redux/action/CompanyMaintenanceAction";
import { filterTableData } from "../../Constants/HelperFunction";
import { FaReply } from "react-icons/fa";
import { CompanyMaintenanceInfo } from "../../models/CompanyMaintenanceModel";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import "../User/UserDetails.scss";

import CustomLoader from "../../Components/Loader/CustomLoader";
import { getCurrentBalanceOftheCompany } from "../../redux/action/PreFundAction";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import "./CompanyPayrollAccountEnquiry.scss";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

const CompanyPayrollAccountEnquiry = (props: any) => {
  const [toPrint, setPrint] = useState(false);
  const [isFilterShows, setisFilterShows] = useState(false);
  const [isSearchShows, setIsSearchShows] = useState(false);
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModal, setshowModal] = useState(false);
  const [showPdfModal, setshowPdfModal] = useState(false);
  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);

  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowModal(!showModal);
    ExcelGeneration(companyGetData, filteredItems, "CompanyAccountEnquiry");
  };
  const checkboxCancel = () => {
    setshowModal(!showModal);
  };
  const checkboxPdfSubmit = (filteredItems: any, orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, companyGetData);
    PdfGeneration(data, "CompanyAccountEnquiry");
  };
  const checkboxPdfCancel = () => {
    setshowPdfModal(!showPdfModal);
  };
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData.userInfo.userType;
  useEffect(() => {
    if (userType === "COMPANY_USER") {
      props.history.push({
        pathname: "/dashboard/Payroll-Account/Edit-Payroll",
        state: {
          data: "CompanyUser",
          isEditable: true,
          isView: false,
          isDelete: false,
          isTittle: false,
        },
      });
    }
  }, []);

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  useEffect(() => {
    companyGetData = companyGetData?.map((e: any) => {
      e.statusCode = e.statusCode == "P" ? "PENDING" : "ACTIVE";
    });
  }, [companyGetData]);

  const deleteSelectedCompany = useCallback(
    async (registrationNo: string) => {
      try {
        dispatch(deletePayrollCompanyData(registrationNo));
      } catch (err) {}
    },
    [dispatch]
  );
  const toggleSearch = () => {
    setIsSearchShows(!isSearchShows);
    setisFilterShows(false);
    setPrint(false);
  };
  const toggleFiler = () => {
    setisFilterShows(!isFilterShows);
    setIsSearchShows(false);
    setPrint(false);
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const checkboxTableCancel = () => {
    setcolumns([]);
    setPrint(false);
    setorginalColumns([]);
  };

  const closeSearch = () => {
    setIsSearchShows(!isSearchShows);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const deleteCompanyMaintenace = (choosenCompanyInfo: any) => {
    deleteSelectedCompany(choosenCompanyInfo.companyRegistrationNo);
  };
  const editCompanyMaintenace = (e: any) => {
    props.history.push({
      pathname:
        "/dashboard/Payroll-Company-Management/company-maintenance/Edit-Company-Maintenance",
      state: { data: e, isEditable: false, isView: true, isEdit: true },
    });
  };
  const viewCompanyMaintenace = (e: any) => {
    props.history.push({
      pathname: "/dashboard/Payroll-Account/Edit-Payroll",
      state: {
        data: e,
        isEditable: true,
        isView: false,
        isDelete: false,
        isTittle: false,
      },
    });
  };
  const componentRef = useRef<any>();

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const Header = [
    {
      title: "Staff Account",
      dataIndex: "companyRegistrationNo",
      key: "uid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyRegistrationNo.localeCompare(b.companyRegistrationNo),
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "CompanyName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Person Name",
      dataIndex: "authorizerName",
      key: "PersonName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerName.localeCompare(b.authorizerName),
      },
    },
    {
      title: "Contact Number",
      dataIndex: "authorizerMobileNo",
      key: "ContactNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerMobileNo.localeCompare(b.authorizerMobileNo),
      },
    },
    {
      title: "Email ID",
      dataIndex: "companyEmail",
      key: "EmailID",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyEmail.localeCompare(b.companyEmail),
      },
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "Status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
      },
      render: (status: any) => {
        let value = status.toString().toUpperCase();
        return (
          <label
            className={` ${
              value === "ACTIVE" ? "text-success" : "text-danger"
            }`}
          >
            {value}
          </label>
        );
      },
    },
  ];
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      companyGetData = companyGetData.filter(
        (e: any | CompanyMaintenanceInfo) => {
          return (
            e.companyRegistrationNo
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
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
      companyGetData = companyGetData.filter(
        (e: any | CompanyMaintenanceInfo) => {
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

  useEffect(() => {
    getCurrentBalance();
    fetchAllData().then(() => {
      setIsLoading(true);
    });
  }, [fetchAllData]);
  useEffect(() => {
    if (companyGetData) {
      if (companyGetData.length > 0) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [companyGetData]);
  const getCurrentBalance = useCallback(async () => {
    try {
      dispatch(getCurrentBalanceOftheCompany(userData.userInfo?.id));
    } catch (err) {}
  }, [dispatch]);

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Company Account Enquiry"}
        SummaryFileName={"Company Account Enquiry"}
        filterEnabled={isFilterShows}
        filterArea={toggleFiler}
        filter={true}
        searchArea={toggleSearch}
        search={isSearchShows}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={checkboxTableCancel}
        SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
        Print={handlePrint}
        TableData={companyGetData}
      />

      {isSearchShows && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="companyRegistrationNo" className="cursor">
              Staff Account
            </option>
            <option value="companyName" className="cursor">
              Company Name
            </option>
            <option value="authorizerName" className="cursor">
              Person Name
            </option>
            <option value="authorizerMobileNo" className="cursor">
              Contact Number
            </option>
            <option value="companyEmail" className="cursor">
              Email ID
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
      {isFilterShows && (
        <div className="colorWhite companyAccount mt-3 p-3">
          <p className="branchSetupTitle">Filter</p>
          <div className="container-fluid branchFilter">
            <div className="row ">
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Company Name</Label>
                  <Input
                    type="text"
                    name="companyName"
                    className="formRadiusBank"
                    placeholder="Enter Company Name"
                  ></Input>
                </FormGroup>
              </div>

              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Person Name</Label>
                  <Input
                    type="text"
                    name="personName"
                    className="formRadiusBank"
                    placeholder="Enter Person Name"
                  ></Input>
                </FormGroup>
              </div>

              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Status</Label>
                  <Input
                    type="select"
                    name="branchCode"
                    className="formRadiusBank form-select btn-size"
                    placeholder="Enter Status"
                  >
                    <option value="" disabled hidden>
                      Select Status
                    </option>
                    <option value={"false"}>{"ACTIVE"}</option>
                    <option value={"true"}>{"INACTIVE"}</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          {/* <div className="container-fluid buttonboxTerminal">
            <Button
              className="backBtnBank btn--sizer"
              style={{ marginTop: "5px", marginRight: "0px" }}
            >
              Reset
            </Button>
            <Button
              className="nextBtnDashboard btn-danger btn--sizer"
              style={{ marginTop: "5px" }}
            >
              Submit
            </Button>
          </div> */}
           <div className="col d-flex justify-content-end mt-2 me-4">
            <SubmitCancelButton
              button={"Submit"}
              secondButton={"Reset"}
              // onSubmit={handleSubmit}
              // onCancel={onReset}
            />
          </div>
            
        </div>
      )}
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
      <CustomLoader isLoading={isLoading} size={50} />
      <CustomDNDPopup
        onSubmit={checkboxSubmit}
        onCancel={checkboxCancel}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showModal}
        buttonText={"Export Excel"}
      />
      <CustomDNDPopup
        onSubmit={checkboxPdfSubmit}
        onCancel={checkboxPdfCancel}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showPdfModal}
        buttonText={"Export PDF"}
      />
      {isLoading ? (
        <></>
      ) : (
        <div ref={componentRef}>
          <div className="mt-3">
            <CustomHeader
              deleteUser={deleteCompanyMaintenace}
              editUser={editCompanyMaintenace}
              TableData={columns.length > 0 ? columns : Header}
              CustomTableHeader={companyGetData}
              Edit={false}
              viewUser={viewCompanyMaintenace}
              Delete={false}
              view={true}
              toPrint={toPrint ? true : false}
              DisableMange={toPrint ? true : false}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default CompanyPayrollAccountEnquiry;
