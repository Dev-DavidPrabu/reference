import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomHeader from "../../../Components/CustomTable/CustomTable";
import CommonHeaderSummary from "../../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { Button, Input } from "reactstrap";
import { Form } from "antd";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { FaReply } from "react-icons/fa";
import { getBatchDetailsData } from "../../../redux/action/PreOnboardingAction";
import { IoArrowUndoOutline } from "react-icons/io5";
import "./PreOnBoardingCustomer.scss";
import CustomLoader from "../../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../../Components/UI/ApiResponse/CustomResponseMessage";

const PreOnBoardingCustomer = (props: any) => {
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(false);

  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [companyDetails, setCompanyDetails] = useState({
    id: "",
    totalRecordCount: "",
    totalValidCount: "",
    totalFailureCount: "",
  });
  useEffect(() => {
    if (
      props?.location?.state !== undefined &&
      props?.location?.value === true
    ) {
      setCompanyDetails(props.location.state.value);
      setCompanyName(props.location.state.companyName);
    } else if (
      props?.location?.state !== undefined &&
      props?.location?.value === false
    ) {
      setCompanyDetails(props.location.e);
      setCompanyName(props?.location?.name);
    }
  }, [
    props?.location?.state,
    props.location.e,
    props?.location?.name,
    props?.location?.value,
  ]);

  const componentRef = useRef<any>();
  const [form] = Form.useForm();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const dispatch = useDispatch();

  let getBatchDetails = useSelector(
    (state: RootStateOrAny) =>
      state.PreOnboardingReducer.getBatchDetailsResponse
  );
  let batchDetails = getBatchDetails?.data;

  const fetchBatchDetails = useCallback(
    async (id: string) => {
      try {
        if (id) {
          dispatch(getBatchDetailsData(id));
        }
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (companyDetails?.id) {
      setIsLoading(true);
      fetchBatchDetails(companyDetails?.id);
    }
  }, [companyDetails?.id]);

  useEffect(() => {
    if (getBatchDetails) {
      if (getBatchDetails.data) {
        setIsLoading(false);
      } else if (getBatchDetails.error) {
        setIsLoading(false);
        setApiStatus(false);
        setApiMessage(getBatchDetails.message);
      }
    }
  }, [getBatchDetails]);

  const onBoardingHeader = [
    {
      title: "Full Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName.localeCompare(b.customerName),
      },
    },
    {
      title: "Email Id",
      dataIndex: "emailAddress",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.emailAddress.localeCompare(b.emailAddress),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber.localeCompare(b.mobileNumber),
      },
    },
    {
      title: "DOB",
      dataIndex: "birthDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.birthDate.localeCompare(b.birthDate),
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.gender.localeCompare(b.gender),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
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
    {
      title: "Reason",
      dataIndex: "errorMessage",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.errorMessage - b.errorMessage,
      },
      render: (reason: any) => {
        return <span>{`${reason ? reason : "-"}`}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "uploadDate",
      checked: false,
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "Company ID",
      dataIndex: "companyId",
      checked: false,
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "Nationality Code",
      dataIndex: "nationalityCode",
      checked: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationalityCode.localeCompare(b.nationalityCode),
      },
    },
    {
      title: "Residential Address",
      dataIndex: "residentAddress1",
      checked: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.residentAddress1.localeCompare(b.residentAddress1),
      },
    },
    {
      title: "Pref Lang",
      dataIndex: "displayLanguage",
      checked: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.displayLanguage.localeCompare(b.displayLanguage),
      },
    },
  ];

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);

    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const toggleFiler = () => {
    setfilterOption(!filterOption);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setPrint(false);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
  };
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setSearchArea(false);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
  };
  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/Add-Customer",
      state: true,
      e: companyDetails,
      name: companyName,
    });
  };
  const cancelEvent = () => {
    props.history.push({
      pathname: "/dashboard/PreOnBoarding",
      fromCustomerScreen: true,
    });
  };
  const closeMessage = () => {
    setApiMessage("");
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      batchDetails = batchDetails.filter((e: any) => {
        return (
          e.customerName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.birthDate.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.displayLanguage
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.gender.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.status.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      batchDetails = batchDetails.filter((e: any) => {
        if (
          e[searchCategory].toUpperCase().includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"PreOnBoarding Customer"}
        SummaryFileName={"PreOnBoardingCustomer"}
        List={true}
        Add={true}
        AddAction={handleAdd}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : onBoardingHeader
        }
        filterArea={toggleFiler}
        filter={false}
        filterEnabled={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        Refresh={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        TableData={batchDetails}
      />
      <CustomResponseMessage
        apiStatus={apiStatus}
        closeMessage={closeMessage}
        message={apiMessage}
      />
      <button className="onBoarding-back border-0 ms-1" onClick={cancelEvent}>
        <IoArrowUndoOutline />
        Back
      </button>

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
            <option value="customerName" className="cursor">
              Full Name
            </option>

            <option value="birthDate" className="cursor">
              DOB
            </option>

            <option value="displayLanguage" className="cursor">
              Pref Lang
            </option>
            <option value="gender" className="cursor">
              Gender
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
            placeholder="Type your search keyword"
            onChange={(ev) => handleSearch(ev)}
          />
          <div className="ms-1">
            <Button color="danger">Search</Button>
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

      {
        <div>
          <div className="col onBoarding-customer-header d-flex p-3 ">
            <div className="col-4 ">
              <span className="text-white ps-2">Company Name:</span>
              <label className="onBoarding-customer-header-label ms-3">
                {companyName}
              </label>
            </div>
            <div className="col-3">
              <span className="ps-2 text-white">Total Record:</span>
              <label className="onBoarding-customer-header-label ms-3">
                {companyDetails?.totalRecordCount}
              </label>
            </div>
            <div className="col-3">
              <span className="ps-2 text-white">Success count:</span>
              <label className="onBoarding-customer-header-label ms-3">
                {companyDetails?.totalValidCount}
              </label>
            </div>
            <div className="col-3">
              <span className="ps-2 text-white">Failure count:</span>
              <label className="onBoarding-customer-header-label ms-3">
                {companyDetails?.totalFailureCount}
              </label>
            </div>
          </div>
        </div>
      }

      <CustomLoader isLoading={loading} size={50} />
      <div className={`mt-3 ${loading ? "d-none" : ""}`} ref={componentRef}>
        <Form form={form} component={false}>
          {batchDetails ? (
            <CustomHeader
              TableData={columns.length > 0 ? columns : onBoardingHeader}
              CustomTableHeader={
                Array.isArray(batchDetails) ? batchDetails : [batchDetails]
              }
              DisableMange={toPrint ? true : false}
              DefaultColumn={true}
              toPrint={toPrint ? true : false}
            />
          ) : (
            <span className="d-flex justify-content-center onBoarding-nobatch">
              No Data Found
            </span>
          )}
        </Form>
      </div>
    </div>
  );
};

export default PreOnBoardingCustomer;
