import React, { useCallback, useEffect, useRef, useState } from "react";
import "./CompanyUserList.scss";
import { Button, Input } from "reactstrap";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getUserListBasedOnCompany,
  deleteSelectedCompanyUser,
} from "../../redux/action/PreFundAction";
import {
  CompanyListInfo,
  UserCompanyInformation,
} from "../../models/CompanyListUserModel";

import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
} from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { FiSearch, FiFilter } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { useReactToPrint } from "react-to-print";
import AddCompanyUserList from "../../Components/AddCompanyUserList/AddCompanyUserList";

const CompanyUserList = (props: any) => {
  let companyInformation = props.companyId;
  const companyUserList = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.companyUserList
  );

  let newUserCreationResponse = useSelector(
    (state: RootStateOrAny) => state.PreFundReducer.addNewUserToCompanyResponse
  );
  const [showAddNewUserForm, setShowAddNewUserForm] = useState(false);
  const [companyUserMethod, setcompanyUserMethod] = useState("");
  const [userInfo, setUserInfo] = useState({
    userId: "",
    companyId: "",
    companyAccountId: "",
    companyRegistrationNo: "",
    companyName: "",
    mtaFlag: "",
  });
  const dispatch = useDispatch();
  const [isSearchShows, setIsSearchShows] = useState(false);
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [userDetail, setUserDetail] = useState<CompanyListInfo>(Object);
  const [isFilterShows, setisFilterShows] = useState(false);
  const [isPrint, setPrint] = useState(false);
  const componentRef = useRef<any>();
  const Header = [
    {
      title: "UID",
      dataIndex: "companyRegistrationNo",
      key: "uid",
      sorter: {
        compare: (a: any, b: any) =>
          a.companyRegistrationNo.localeCompare(b.companyRegistrationNo),
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "CompanyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Person Name",
      dataIndex: "authorizerName",
      key: "PersonName",
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerName.localeCompare(b.authorizerName),
      },
    },
    {
      title: "Contact Number",
      dataIndex: "authorizerMobileNo",
      key: "ContactNumber",
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerMobileNo.localeCompare(b.authorizerMobileNo),
      },
    },
    {
      title: "Email ID",
      dataIndex: "companyEmail",
      key: "EmailID",
      sorter: {
        compare: (a: any, b: any) =>
          a.companyEmail.localeCompare(b.companyEmail),
      },
    },
    {
      title: "Status",
      dataIndex: "recordStatus",
      key: "Status",
      sorter: {
        compare: (a: any, b: any) =>
          a.recordStatus.localeCompare(b.recordStatus),
      },

      render: () => (
        <a
          style={{
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {companyUserList?.statusCode === "A" ? "" : "Active"}
        </a>
      ),
    },
  ];

  const fetchAllCompany = useCallback(async () => {
    try {
      dispatch(getUserListBasedOnCompany());
    } catch (err) {}
  }, [dispatch]);

  const deleteCompanyUser = useCallback(
    async (userId: string) => {
      try {
        dispatch(deleteSelectedCompanyUser(userId));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllCompany();
  }, [fetchAllCompany]);

  const AddNewUserClickEventHandler = () => {
    setShowAddNewUserForm(!showAddNewUserForm);
    setUserInfo({
      userId: "",
      companyId: "",
      companyAccountId: "",
      companyRegistrationNo: "",
      companyName: "",
      mtaFlag: "",
    });
    setcompanyUserMethod("addMethod");
  };

  const deleteUserHandleClickEvent = (userId: string) => {
    deleteCompanyUser(userId).then(() => {
      setShowAddNewUserForm(!showAddNewUserForm);
      fetchAllCompany();
    });
  };
  const addNewUserHander = () => {
    setShowAddNewUserForm(!showAddNewUserForm);
    fetchAllCompany();
  };
  const submitHandler = (value: string) => {
    setShowAddCompany(!showAddCompany);
    setUserDetail({
      id: "",
      status: "",
      userGroupName: "",
      userId: "",
      userName: "",
      loginId: "",
      UserType: "",
    });
    fetchAllCompany();
  };

  const toggleSearch = () => {};

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

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="primary_heading">Company User List</div>
        <div className="d-flex">
          <div
            aria-disabled="true"
            className={
              companyUserList && companyUserList.length > 0
                ? "common-icon me-1 cursor"
                : "common-icon-disabled me-1"
            }
            onClick={() =>
              ExcelGeneration(
                companyUserList,
                [""],
                "Topup Portal Company Maintenance."
              )
            }
          >
            <AiFillFileExcel></AiFillFileExcel>
          </div>
          <div
            className={
              companyUserList && companyUserList.length > 0
                ? "common-icon me-1 cursor"
                : "common-icon-disabled me-1"
            }
            onClick={() =>
              PdfGeneration(
                companyUserList,
                "Topup Portal Company Maintenance."
              )
            }
          >
            <AiFillFilePdf></AiFillFilePdf>
          </div>
          <div className={"common-icon me-1 cursor"} onClick={handlePrint}>
            <AiOutlinePrinter></AiOutlinePrinter>
          </div>
          <div className="common-icon me-3 cursor">
            <FiSearch></FiSearch>
          </div>
          <div className="common-icon me-3 cursor">
            <FiFilter></FiFilter>
          </div>
          <div>
            <Button
              className="add-btn cursor"
              type="button"
              color="danger"
              onClick={() =>
                props.history.push({
                  pathname:
                    "/dashboard/Company-UserScreen/Company-User/Add-Company-User-List",
                })
              }
            >
              + Add
            </Button>
          </div>
        </div>
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
      {showAddCompany && (
        <AddCompanyUserList
          showAddUser={showAddCompany}
          submitHandler={submitHandler}
          userDetail={userDetail}
        />
      )}

      <div ref={componentRef}>
        <div className="mt-3">
          <CustomHeader
            TableData={Header}
            CustomTableHeader={companyUserList.data}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyUserList;
