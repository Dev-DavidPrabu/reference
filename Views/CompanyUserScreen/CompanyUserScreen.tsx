import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
} from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { FiSearch, FiFilter } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { userRights } from "../../models/UserRightsModal";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import "./CompanyUserScreen.scss";

const CompanyUserScreen = (props: any) => {
  const dispatch = useDispatch();
  const [isPrint, setPrint] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [companyId, setCompanyId] = useState({
    id: "",
    companyAccountId: "",
    companyName: "",
    companyRegistrationNo: "",
    entityId: "",
    address1: "",
    address2: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
    companyEmail: "",
    countryCodeNo: "",
    companyPhoneNo: "",
    authorizerName: "",
    authorizerMobileNo: "",
    statusCode: "",
    remarks: "",
  });
  const [isSearchShows, setIsSearchShows] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [isFilterShows, setisFilterShows] = useState(false);
  const Header = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "CompanyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Contact Person",
      dataIndex: "authorizerName",
      key: "authorizerName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Contact Person Mobile",
      dataIndex: "authorizerMobileNo",
      key: "authorizerMobileNo",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Company Email",
      dataIndex: "companyEmail",
      key: "companyEmail",
      sorter: {
        compare: (a: any, b: any) =>
          a.companyEmail.localeCompare(b.companyEmail),
      },
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "Status",
      sorter: {
        compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
      },
      render: (status: any, record: any) => {
        return (
          <label
            className={` ${
              status === "P"
                ? "text-success cursor-pointer"
                : "text-danger cursor-pointer"
            }`}
            onClick={() => moveToUserList(record)}
          >
            {status === "P" ? "Active" : "InActive"}
          </label>
        );
      },
    },
  ];
  const moveToUserList = (companyInfo: any) => {
    props.history.push({
      pathname:
        "/dashboard/Company-UserScreen/Company-User/Edit-Company-User-List",
    });
  };
  const componentRef = useRef<any>();

  let overAllCompanies = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getallUserResponce
  );

  const fetchAllCompany = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("userScreen"));
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchAllCompany();
  }, [fetchAllCompany]);

  const BackButtonClickEvent = () => {
    setShowUserList(!showUserList);
  };

  const activeClickEventHandler = (e: any) => {
    setShowUserList(!showUserList);
    setCompanyId(e);
  };

  const handlePrint = () => {
    setPrint(!isPrint);
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const addCompanyUser = () => {
    props.history.push({
      pathname:
        "/dashboard/Company-UserScreen/Company-User/Add-Company-User-List",
    });
  };

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="primary_heading">Company List</div>
        {Object.keys(userData).length > 0 &&
          userData?.userInfo?.userType === "STAFF" && (
            <div className="d-flex">
              <div
                aria-disabled="true"
                className={
                  overAllCompanies && overAllCompanies.length > 0
                    ? "common-icons me-1 cursor"
                    : "common-icons-disabled me-1 cursor"
                }
                onClick={() =>
                  ExcelGeneration(
                    overAllCompanies,
                    [""],
                    "Topup Portal Company Maintenance."
                  )
                }
              >
                <AiFillFileExcel></AiFillFileExcel>
              </div>
              <div
                className={
                  overAllCompanies && overAllCompanies.length > 0
                    ? "common-icons me-1 cursor"
                    : "common-icons-disabled me-1 cursor"
                }
                onClick={() =>
                  PdfGeneration(
                    overAllCompanies,
                    "Topup Portal Company Maintenance."
                  )
                }
              >
                <AiFillFilePdf></AiFillFilePdf>
              </div>
              <div className={"common-icons me-1 cursor"} onClick={handlePrint}>
                <AiOutlinePrinter></AiOutlinePrinter>
              </div>
              <div className="common-icons me-3 cursor">
                <FiSearch></FiSearch>
              </div>
              <div className="common-icons me-3 cursor">
                <FiFilter></FiFilter>
              </div>
              <div>
                <Button
                  className="add-btn cursor"
                  color="danger"
                  onClick={addCompanyUser}
                >
                  + Add
                </Button>
              </div>
            </div>
          )}
      </div>
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
              UID
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
            <Button color="danger">Search</Button>
          </div>
          <div>
            <Button className="text-white  border-0 ms-1">
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      {isFilterShows && (
        <div className="mt-3 search-component d-flex cursor">
          <div className="d-flex fillter-wrapper cursor">
            <div className="fillter-select cursor">
              <Input type="select"></Input>
            </div>
            <div className="fillter-date cursor">
              <Input type="select"></Input>
            </div>
            <div className="fillter-time cursor">
              <Input type="date"></Input>
            </div>
            <div className="d-flex fillter-icon cursor">
              <div className="fillter-icon-fillter cursor">
                <FiFilter></FiFilter>
              </div>
              <div className="fillter-icon-arrow cursor">
                <TiArrowBackOutline style={{ margin: "auto 5px" }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {isPrint && (
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

      {Object.keys(userData).length > 0 &&
      userData?.userInfo?.userType === "STAFF" ? (
        <div ref={componentRef}>
          <div className="mt-3">
            <CustomHeader
              TableData={Header}
              CustomTableHeader={overAllCompanies}
              DisableMange={true}
            />
          </div>
        </div>
      ) : (
        <div className="message">
          <div>UnAuthorized User</div>
        </div>
      )}
    </div>
  );
};

export default CompanyUserScreen;
