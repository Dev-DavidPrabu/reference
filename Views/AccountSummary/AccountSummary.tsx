import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { Form } from "antd";
import { FaReply } from "react-icons/fa";
import { useHistory } from "react-router";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useReactToPrint } from "react-to-print";
import "./AccountSummary.scss";
import { getAllAccountSummary } from "../../redux/action/AccountSummaryAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

const AccountSummary = (props: any) => {
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [searchOption, setSearchOption] = useState(false);

  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);

  const [searchField, setSearchField] = useState(false);
  const [filterOption, setfilterOption] = useState(false);

  const [filterArea, setFilterArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [filterValue, setFilterValue] = useState({
    AcNumber: "",
    AcCurrency: "",
    AcType: "",
    AcName: "",
    AcUid: "",
    Status: "",
  });

  useEffect(() => {
    if (props.location.state) {
      if (props.location.state === "add") {
        setApiMessage("Account Added Sucessfully");
        setApiStatus(true);
      } else if (props.location.state === "update") {
        setApiMessage("Account Updated Sucessfully");
        setApiStatus(true);
      }
    }
  }, [props.location.state]);

  const accountHeader = [
    {
      title: "A/C ID",
      dataIndex: "id",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.id?.localeCompare(b.id),
      },
    },
    {
      title: "A/C No",
      dataIndex: "accountNumber",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountNumber?.localeCompare(b.accountNumber),
      },
    },
    {
      title: "Currency Code",
      dataIndex: "currencyCode",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.currencyCode?.localeCompare(b.currencyCode),
      },
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.productCode?.localeCompare(b.productCode),
      },
    },
    {
      title: "A/C Name",
      dataIndex: "accountName",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountName?.localeCompare(b.accountName),
      },
    },
    {
      title: "A/C UID",
      dataIndex: "accountMasterId",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountMasterId?.localeCompare(b.accountMasterId),
      },
    },
    {
      title: "A/C Balance",
      dataIndex: "balance",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.balance?.localeCompare(b.balance),
      },
    },
    {
      title: "A/C Opening Date",
      dataIndex: "accountOpeningDate",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountOpeningDate?.localeCompare(b.accountOpeningDate),
      },
    },
    {
      title: "A/c Closing Date",
      dataIndex: "AcClosingDate",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.AcClosingDate?.localeCompare(b.AcClosingDate),
      },
    },
    {
      title: "Status",
      dataIndex: "accountStatus",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountStatus?.localeCompare(b.accountStatus),
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
  ];

  const accountSummaryData = useSelector(
    (state: RootStateOrAny) =>
      state.AccountSummaryReducer?.getAllAccountSummaryResponse
  );

  let AccountData = accountSummaryData?.data;
  useEffect(() => {
    if (accountSummaryData?.data) {
      setIsLoading(false);
    }
  }, [accountSummaryData]);

  const fetchAllAccountSummary = useCallback(async () => {
    try {
      dispatch(getAllAccountSummary());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchAllAccountSummary();
  }, [fetchAllAccountSummary]);
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
    }
  };
  const resetSearch = () => {
    setSearchField(!searchField);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
  };
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const toggleSearch = () => {
    setSearchField(!searchField);
    setFilterArea(false);
  };
  const toggleFilter = () => {
    setSearchField(false);
    setFilterArea(!filterArea);
  };

  const handleAccountAdd = () => {
    history.push({
      pathname: "/dashboard/Account-vendor/Add-Account",
    });
  };
  const viewUser = (e: any) => {
    history.push({
      pathname: "/dashboard/View-vendor/View-Account",
      state: e,
    });
  };
  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/Edit-vendor/Edit-Account",
      state: e,
    });
  };
  const handleSubmit = () => {
    var record = {
      AccountName: filterValue.AcName,
      Currency: filterValue.AcCurrency,
      AccountNo: filterValue.AcNumber,
      AccountUID: filterValue.AcUid,
      AccountType: filterValue.AcType,
      Status: filterValue.Status,
    };
  };
  const handleReset = () => {
    setFilterValue({
      AcNumber: "",
      AcCurrency: "",
      AcType: "",
      AcName: "",
      AcUid: "",
      Status: "",
    });
  };
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      

      setApiMessage("");
      let ownMaker = selectedRows.filter((request: any) => {
        if (request.createdBy === makerDetail) {
          return true;
        }
        return false;
      });
      if (ownMaker.length > 0) {
        setApiStatus(false);

        setApiMessage("Maker can't approve his own request.");
      } else {
        setApiMessage("");
      }
    },
    getCheckboxProps: (record: any) => ({
      reasonStatus: record?.reasonStatus,
    }),
  };

  let blockMakerAdd = false;
  let blockChecker = true;
  const closeMessage = () => {
    setApiMessage("");
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Account Summary"}
        SummaryFileName={"Account Summary"}
        List={true}
        ListData={handleList}
        TableData={AccountData}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : accountHeader
        }
        Refresh={true}
        search={searchOption}
        filterArea={toggleFilter}
        filterEnabled={filterOption}
        filterRemit={true}
        filterLeft={true}
        searchArea={toggleSearch}
        refresh={toggleRefresh}
        Print={handlePrint}
        Add={true}
        AddAction={handleAccountAdd}
      />
      {searchField && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className="  form-select user-search-drop cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected>Select Field</option>
            <option value="complianceType">A/C ID</option>
            <option value="amlListCategory">A/C No</option>
            <option value="nameMatchPercentage">Currency Code</option>
            <option value="overallMatchPercentage">Product Code</option>
            <option value="overallMatchPercentage">A/C Name</option>
            <option value="overallMatchPercentage">A/C UID</option>
            <option value="overallMatchPercentage">A/C Balance</option>
            <option value="overallMatchPercentage">A/C Opening Date</option>
            <option value="overallMatchPercentage">A/C Closing Date</option>
            <option value="overallMatchPercentage">Status</option>
            <option value="any">Any</option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            placeholder="Type your search keyword"
            onChange={(ev) => handleSearch(ev)}
          />
          <div className="ms-1">
            <Button color="danger" className="btn--sizer">Search</Button>
          </div>
          <div>
            <Button
              className="text-white  border-0 ms-1"
              onClick={() => resetSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      {filterArea && (
        <div className="colorWhite AccountSummary mt-3 p-3">
          <p className="AccountbranchSetupTitle">Filter</p>
          <div className="container-fluid filterInputAlign">
            <div className="d-flex col row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">A/C Number</Label>

                  <Input
                    type="text"
                    value={filterValue.AcNumber}
                    name="AcNumber"
                    onChange={handleChange}
                    className="AccountSummary-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">A/C Currency </Label>

                  <Input
                    type="select"
                    value={filterValue.AcCurrency}
                    name="AcCurrency"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option>select</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">A/C Type</Label>

                  <Input
                    type="select"
                    value={filterValue.AcType}
                    name="AcType"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option>select</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">A/C Name</Label>

                  <Input
                    type="text"
                    value={filterValue.AcName}
                    name="AcName"
                    onChange={handleChange}
                    className="AccountSummary-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">A/C UID</Label>

                  <Input
                    type="text"
                    value={filterValue.AcUid}
                    name="AcUid"
                    onChange={handleChange}
                    className="AccountSummary-input"
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="number">Status</Label>

                  <Input
                    type="select"
                    value={filterValue.Status}
                    name="Status"
                    onChange={handleChange}
                    className="form-select AccountSummary-select-box"
                  >
                    <option>Select</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
            <div className="col mt-4 generate-btn-div dflex justify-content-end col">
              <button
                className="AccountSubmitCancelButton-cancel border-0 ms-3"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
            <div className="col mt-4 generate-btn-div dflex justify-content-end col">
              <button
                className="AccountSubmitCancelButton-save border-0 text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
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
          {" "}
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
      <div>
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={apiStatus}
            closeMessage={() => closeMessage()}
            message={apiMessage}
            errorFix={true}
          />
        )}
      </div>

      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            <CustomHeader
              TableData={columns.length > 0 ? columns : accountHeader}
              CustomTableHeader={AccountData}
              rowSelection={blockChecker ? rowSelection : !rowSelection}
              toPrint={columns.length > 0 && toPrint ? true : false}
              DisableMange={columns.length > 0 && toPrint ? true : false}
              Edit={true}
              approval={true}
              viewUser={viewUser}
              disableCustomRowSelection={true}
              view={true}
              editUser={editUser}
              hideSelectAll={true}
              cancelBtn={true}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default AccountSummary;
