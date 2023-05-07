import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Form } from "antd";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import { userRights } from "../../models/UserRightsModal";
import { CompanyUserListInfo } from "../../models/CompanyUserScreenListModel";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import "./CompanyUserScreen.scss";
import CustomLoader from "../../Components/Loader/CustomLoader";

const CompanyUserScreenList = (props: any) => {
  const [form] = Form.useForm();
  const [filterOption, setfilterOption] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef<any>();
  const dispatch = useDispatch();

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

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
    fetchAllCompany().then(() => {
      if (overAllCompanies) {
        setIsLoading(true);
      }
    });
  }, [fetchAllCompany]);

  useEffect(() => {
    if (overAllCompanies) {
      if (overAllCompanies) {
        setIsLoading(false);
      }
    }
  }, [overAllCompanies]);

  useEffect(() => {
    overAllCompanies = overAllCompanies?.map((e: any) => {
      e.statusCode = e.statusCode == "D" ? "INACTIVE" : "ACTIVE";
    });
  }, [overAllCompanies]);

  const handleView = (e: any) => {
    props.history.push({
      pathname:
        "/dashboard/Company-UserScreen/Company-User/View-Company-User-List",
      state: e,
    });
  };

  const companyListHeader = [
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
      title: "Contact Person",
      dataIndex: "authorizerName",
      key: "authorizerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerName.localeCompare(b.authorizerName),
      },
    },
    {
      title: "Contact Person Mobile",
      dataIndex: "authorizerMobileNo",
      key: "authorizerMobileNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorizerMobileNo.localeCompare(b.authorizerMobileNo),
      },
    },
    {
      title: "Company Email",
      dataIndex: "companyEmail",
      key: "companyEmail",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyEmail.localeCompare(b.companyEmail),
      },
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
      },
      render: (status: any) => {
        let value = status.toString().toUpperCase();
        return (
          <label
            className={` ${value === "ACTIVE" ? "textSuccess" : "textDanger"}`}
          >
            {value}
          </label>
        );
      },
    },
  ];

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setcolumns([]);
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      overAllCompanies = overAllCompanies.filter(
        (e: any | CompanyUserListInfo) => {
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
      overAllCompanies = overAllCompanies.filter(
        (e: any | CompanyUserListInfo) => {
          if (
            e[searchCategory]
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }
  const closeSearch = () => {
    setSearchArea(false);
  };

  return (
    <div className="p-3">
      {Object.keys(userData).length > 0 &&
      userData?.userInfo?.userType === "STAFF" ? (
        <CommonHeaderSummary
          RightContent={"Link Company User"}
          SummaryFileName={"Link Company User"}
          filterEnabled={filterOption}
          filterArea={toggleFilter}
          filter={false}
          searchArea={toggleSearch}
          search={searchArea}
          FieldList={handleList}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
          SummaryColumn={
            orginalColumns.length > 0 ? orginalColumns : companyListHeader
          }
          Print={handlePrint}
          TableData={
            Array.isArray(overAllCompanies)
              ? overAllCompanies
              : [overAllCompanies]
          }
        />
      ) : (
        <>
          <div className="add-company-title">Company User List</div>
          <CustomResponseMessage
            status={false}
            message={"You are unauthorized to perform this action"}
          />
        </>
      )}

      {searchArea && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop cursor"
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
              Contact Person Mobile
            </option>
            <option value="companyEmail" className="cursor">
              Company Email
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
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button className="btn btn-danger btn--sizer">Search</Button>
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
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          {Object.keys(userData).length > 0 &&
            userData?.userInfo?.userType === "STAFF" && (
              <Form form={form} component={false}>
                <CustomHeader
                  TableData={columns.length > 0 ? columns : companyListHeader}
                  view={true}
                  viewUser={handleView}
                  CustomTableHeader={
                    Array.isArray(overAllCompanies)
                      ? overAllCompanies
                      : [overAllCompanies]
                  }
                  toPrint={toPrint ? true : false}
                />
              </Form>
            )}
        </div>
      )}
    </div>
  );
};

export default CompanyUserScreenList;
