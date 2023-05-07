import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
  AiOutlineProfile,
} from "react-icons/ai";
import { FiFilter, FiSearch } from "react-icons/fi";
import { Button, Input } from "reactstrap";
import "../CompanyMaintenanceScreen/CompanyMaintenanceScreen.scss";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { TiArrowBackOutline } from "react-icons/ti";
import { useReactToPrint } from "react-to-print";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  deletePayrollCompanyData,
  getAllCompanyData,
  restDeleteCompanyData,
} from "../../redux/action/CompanyMaintenanceAction";
import { filterTableData } from "../../Constants/HelperFunction";
import { FaReply } from "react-icons/fa";
import { CompanyMaintenanceInfo } from "../../models/CompanyMaintenanceModel";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import "../User/UserDetails.scss";
import { MdRefresh } from "react-icons/md";

import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import { Link } from "react-router-dom";
import CustomLoader from "../../Components/Loader/CustomLoader";
import DeleteConfirmationPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

const CompanyMaintenanceScreen = (props: any) => {
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
  const [showTableModal, setTableModal] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [showPrintModal, setshowPrintModal] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [deletePopup, setDeletePopup] = useState(false);
  const [apiMessage, setApiMessage] = useState(props.location?.state || "");
  const [isFiltered, setIsfiltered] = useState(false);

  const [filterArea, setFilterArea] = useState(false);

  const columHandler = (selectedColumns: any, orginalList: any) => {
    setcolumns(selectedColumns);

    setTableModal(!showTableModal);
    setorginalColumns(orginalList);
  };
  const chancelCheckbox = () => {
    setTableModal(!showTableModal);
  };
  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
      setIsLoading(true);
    } catch (err) {}
  }, [dispatch]);

  let locatonData = props.location?.state;
  useEffect(() => {
    if (locatonData === true) {
      setApiMessage(true);
    } else {
      setApiMessage(false);
    }
  }, []);
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowModal(!showModal);
    ExcelGeneration(companyGetData, filteredItems, "Company Maintenance");
  };
  const checkboxCancel = () => {
    setshowModal(!showModal);
  };
  const checkboxPdfSubmit = (filteredItems: any, orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, companyGetData);
    PdfGeneration(data, "user");
  };
  const checkboxPdfCancel = () => {
    setshowPdfModal(!showPdfModal);
  };
  const checkboxPrintCancel = () => {
    setshowPrintModal(!showPrintModal);
    setPrint(false);
  };
  const checkboxPrintSubmit = (filteredItems: any, orginalList: any) => {
    setshowPrintModal(!showPrintModal);
    setPrint(true);
    setFilterArea(false);
    setSearchField(false);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);

    let data = filterTableData(filteredItems, companyGetData);
  };

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  let DeleteCompanyData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.deletePayrollCompanyResponse
  );

  useEffect(() => {
    if (DeleteCompanyData) {
      if (DeleteCompanyData?.data) {
        fetchAllData();
        restDeleteCompanyData();
        setDeletePopup(false);
      } else if (DeleteCompanyData.error) {
      }
    }
  }, [DeleteCompanyData]);

  useEffect(() => {
    companyGetData = companyGetData?.map((e: any) => {
      if (e.statusCode === "P") {
        e.statusCode = "PENDING";
      } else if (e.statusCode === "A") {
        e.statusCode = "ACTIVE";
      } else if (e.statusCode === "D") {
        e.statusCode = "INACTIVE";
      }
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
    setIsfiltered(true);
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const checkboxTableCancel = () => {
    setcolumns([]);
  };

  const closeSearch = () => {
    setIsSearchShows(!isSearchShows);
  };
  const deleteCompanyMaintenace = (choosenCompanyInfo: any) => {
    setDeletePopup(!deletePopup);
    setCompanyInfo(choosenCompanyInfo);
  };
  const deleteCompanyEventHandler = (choosenCompanyInfo: any) => {
    setDeletePopup(!deletePopup);
    deleteSelectedCompany(choosenCompanyInfo.id);
    fetchAllData();
  };
  const closeDeleteConfimation = () => {
    setDeletePopup(!deletePopup);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const editCompanyMaintenace = (e: any) => {
    props.history.push({
      pathname:
        "/dashboard/Payroll-Company-Management/company-maintenance/Edit-Company-Maintenance",
      state: {
        data: e,
        isEditable: false,
        isView: true,
        isEdit: true,
        isTittle: true,
      },
    });
  };
  const handlePrint = () => {};
  const componentRef = useRef<any>();

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const Header = [
    {
      title: "Reg No",
      dataIndex: "companyRegistrationNo",
      key: "uid",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyRegistrationNo.localeCompare(b.companyRegistrationNo),
      },
      render: (status: any, record: any) => {
        return (
          <Link
            to={{
              pathname:
                "/dashboard/Payroll-Company-Management/company-maintenance/Edit-Company-Maintenance",

              state: {
                data: record,
                isEditable: true,
                isView: false,
                isDelete: false,
                isTittle: true,
              },
            }}
          >
            {status}
          </Link>
        );
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
      title: "Company Code",
      dataIndex: "companyCode",
      key: "CompanyCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.companyCode.localeCompare(b.companyCode),
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
  let _data = companyGetData?.data;


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
            e.companyCode
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
    fetchAllData();
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

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="primary_heading">Company Maintenance</div>
        {Object.keys(userData).length > 0 &&
          userData?.userInfo?.userType === "STAFF" && (
            <div className="d-flex">
              <div
                id="TableData"
                className={
                  companyGetData && companyGetData.length > 0
                    ? "common-icon me-1 cursor"
                    : "common-icon-disabled me-1"
                }
                onClick={() => setTableModal(true)}
              >
                <AiOutlineProfile style={{ marginRight: "3px" }} />
              </div>
              <div
                id="refreesh"
                className={
                  companyGetData && companyGetData.length > 0
                    ? "common-icon me-1 cursor"
                    : "common-icon-disabled me-1"
                }
                onClick={() => checkboxTableCancel()}
              >
                <MdRefresh style={{ marginRight: "3px" }} />
              </div>
              <div
                id="exportExcel"
                data-testid="excel"
                className={
                  companyGetData && companyGetData.length > 0
                    ? "common-icon me-1 cursor"
                    : "common-icon-disabled me-1"
                }
                onClick={() => setshowModal(true)}
              >
                <AiFillFileExcel style={{ marginRight: "3px" }} />
                <CustomTooltip target="exportExcel">
                  Export As Excel
                </CustomTooltip>
              </div>
              <div
                id="exportPdf"
                data-testid="export"
                className={
                  companyGetData && companyGetData.length > 0
                    ? "common-icon me-1 cursor"
                    : "common-icon-disabled me-1"
                }
                onClick={() => setshowPdfModal(true)}
              >
                <AiFillFilePdf style={{ marginRight: "3px" }} />
                <CustomTooltip target="exportPdf">Export As PDF</CustomTooltip>
              </div>
              <div
                id="print"
                data-testid="print"
                className={
                  companyGetData && companyGetData.length > 0
                    ? "common-icon me-1 cursor"
                    : "common-icon-disabled me-1"
                }
                onClick={() => setshowPrintModal(true)}
              >
                <AiOutlinePrinter style={{ marginRight: "3px" }} />
                <CustomTooltip target="print">Print</CustomTooltip>
              </div>
              <div
                className="common-icons me-1 cursor"
                onClick={() => toggleSearch()}
              >
                <FiSearch></FiSearch>
              </div>

              <div>
                <Button
                  className="add-btn cursor btn--sizer"
                  color="danger"
                  onClick={() =>
                    props.history.push({
                      pathname:
                        "/dashboard/Payroll-Company-Management/company-maintenance/Add-Company-Maintenance",
                      state: {
                        data: {},
                        isEditable: false,
                        isView: true,
                        isTittle: true,
                      },
                    })
                  }
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
              Reg No
            </option>
            <option value="companyName" className="cursor">
              Company Name
            </option>
            <option value="companyCode" className="cursor">
              Company Code
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
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={true}
          closeMessage={() => closeMessage()}
          message={props?.location?.message}
        />
      )}
      {Object.keys(userData).length > 0 &&
        userData?.userInfo?.userType === "STAFF" && (
          <CustomLoader isLoading={isLoading} size={50} />
        )}
      <CustomDNDPopup
        onSubmit={columHandler}
        onCancel={chancelCheckbox}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showTableModal}
      />
      <CustomDNDPopup
        onSubmit={checkboxSubmit}
        onCancel={checkboxCancel}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showModal}
        buttonText={"Export Excel"}
      />

      <CustomDNDPopup
        onSubmit={columHandler}
        onCancel={chancelCheckbox}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showTableModal}
      />
      <CustomDNDPopup
        onSubmit={checkboxPdfSubmit}
        onCancel={checkboxPdfCancel}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showPdfModal}
        buttonText={"Export PDF"}
      />
      <CustomDNDPopup
        onSubmit={checkboxPrintSubmit}
        onCancel={checkboxPrintCancel}
        items={orginalColumns.length > 0 ? orginalColumns : Header}
        isOpen={showPrintModal}
        buttonText={"Preview it and print"}
      />

      {Object.keys(userData).length > 0 &&
      userData?.userInfo?.userType === "STAFF" ? (
        <>
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
                  Edit={true}
                  isFiltered={isFiltered}
                  Delete={true}
                  toPrint={columns.length > 0 && toPrint ? true : false}
                  DisableMange={columns.length > 0 && toPrint ? true : false}
                />
              </div>
            </div>
          )}
          <DeleteConfirmationPopUp
            showModal={deletePopup}
            closeDeleteConfirmation={closeDeleteConfimation}
            selectedFestivalInfo={companyInfo}
            deleteTheSelectedRecord={deleteCompanyEventHandler}
          ></DeleteConfirmationPopUp>
        </>
      ) : (
        <CustomResponseMessage
          status={false}
          message={"You are unauthorized to perform this action"}
        />
      )}
    </div>
  );
};
export default CompanyMaintenanceScreen;
