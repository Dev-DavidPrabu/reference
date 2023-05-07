import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { Select } from "antd";
import { getAllCompanyData } from "../../redux/action/CompanyMaintenanceAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { FaReply } from "react-icons/fa";
import { CompanyMaintenanceInfo } from "../../models/CompanyMaintenanceModel";
import moment from "moment";
import CustomButton from "../../Components/UI/CustomButton";
import "./PreOnBoarding.scss";
import {
  getAllBatchData,
  resetBatchData,
} from "../../redux/action/PreOnboardingAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
const { Option } = Select;

const PreOnBoarding = (props: any) => {
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(true);
  const [filterError, setFilterError] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [batchMessage, setBatchMessage] = useState("");
  const [batchStatus, setBatchStatus] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [value, setValue] = useState("");
  const [details, setDetails] = useState({
    companyId: "",
    startDate: "",
    endDate: "",
  });
  const [data, setData] = useState({
    companyId: "",
    startDate: "",
    endDate: "",
  });
  const [condition, setCondition] = useState(true);

  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");

  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData.userInfo?.userType;

  const [companyName, setCompanyName] = useState(
    (userType === "COMPANY_USER" &&
      userData.userInfo.companyUserResponse[0]?.companyName) ||
      ""
  );
  const [preOnboardingDetail, setPreOnboardingDetail] = useState({
    companyId:
      (userType === "COMPANY_USER" &&
        userData.userInfo.companyUserResponse[0]?.companyId) ||
      "",
    startDate: "",
    endDate: "",
  });
  const [minEndDate, setMinEndDate] = useState("");
  const [filterDetail, setFilterDetail] = useState({
    companyId: "",
    startDate: "",
    endDate: "",
  });

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const dispatch = useDispatch();

  let companyGetData = useSelector(
    (state: RootStateOrAny) =>
      state.CompanyMaintenanceReducer.getAllCompanyDataResponse
  );

  let batchDataResponse = useSelector(
    (state: RootStateOrAny) =>
      state.PreOnboardingReducer.getAllBatchDataResponse
  );

  let batchData = batchDataResponse?.data;

  useEffect(() => {
    if (batchDataResponse) {
      if (batchDataResponse?.data) {
        setFilteredArea(true);
        setIsLoading(false);
        setShowTable(true);
      } else if (batchDataResponse?.error) {
        setIsLoading(false);
        setFilteredArea(false);
        setfilterOption(true);
        setApiMessage(true);
        setColorError(true);
        setBatchStatus(false);
        setBatchMessage(batchDataResponse?.message);
      }
    }
  }, [batchDataResponse]);

  const fetchAllData = useCallback(async () => {
    try {
      dispatch(getAllCompanyData("comapanyMainatnce"));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (props.location.state !== undefined) {
      setValue(props.location.state);
    }
  }, [props.location.state]);

  useEffect(() => {
    if (props.location.value !== undefined) {
      setDetails(props.location.value);
    }
  }, [props.location.value]);

  useEffect(() => {
    if (details.companyId !== "") {
      setCondition(true);
    }
  }, [details.companyId]);

  useEffect(() => {
    if (data.companyId !== "") {
      setCondition(false);
      fetchBatchData(details);
      setFilterDetail(data);
      if (batchData !== undefined) {
        setfilterOption(false);
      }
      setfilterOption(false);
    }
  }, [data.companyId]);

  useEffect(() => {
    if (props.location.data !== undefined) {
      setData(props.location.data);
    }
  }, [props.location.data]);

  useEffect(() => {
    setApiMessage(false);
    setFilteredArea(false);
    if (!props.location?.fromCustomerScreen) {
      resetBatchOnback();
    }
    fetchAllData();
  }, [fetchAllData]);

  const fetchBatchData = useCallback(
    async (batch: any) => {
      try {
        dispatch(getAllBatchData(batch));
      } catch (err) {}
    },
    [dispatch, batchDataResponse]
  );

  const resetBatchOnback = useCallback(async () => {
    try {
      dispatch(resetBatchData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (value === "1" && condition === true) {
      setfilterOption(true);
    } else if (value === "1" && condition === false) {
      setIsLoading(true);
      fetchBatchData(details);
      setfilterOption(false);
      setFilterDetail(data);
    }
  }, [value]);

  const onBoardingHeader = [
    {
      title: "Batch Id",
      dataIndex: "id",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "Batch Date",
      dataIndex: "uploadDateTime",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.uploadDateTime.localeCompare(b.uploadDateTime),
      },
    },
    {
      title: "Total Record",
      dataIndex: "totalRecordCount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalRecordCount.localeCompare(b.totalRecordCount),
      },
    },
    {
      title: "Success Count",
      dataIndex: "totalValidCount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalValidCount.localeCompare(b.totalValidCount),
      },
    },
    {
      title: "Failure Count",
      dataIndex: "totalFailureCount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalFailureCount.localeCompare(b.totalFailureCount),
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

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
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

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/Add-Customer",
      state: false,
      value: preOnboardingDetail,
      data: filterDetail,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setApiMessage(false);
    if (companyName) {
      setfilterOption(false);
      fetchBatchData(preOnboardingDetail);
      setIsLoading(true);
    } else {
      setFilterError(false);
    }
  };
  const onReset = () => {
    setShowTable(false);
    setPreOnboardingDetail({
      ...preOnboardingDetail,
      companyId: "",
      startDate: "",
      endDate: "",
    });
    setMinEndDate("");
    setCompanyName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreOnboardingDetail({
      ...preOnboardingDetail,
      [e.target.name]: e.target.value,
    });
    setFilterDetail({
      ...filterDetail,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "startDate") {
      setMinEndDate(e.target.value);
    }
  };

  const handleChangeSearch = (e: any) => {
    let obj = JSON.parse(e);
    setCompanyName(obj.companyName);
    setFilterDetail({
      ...filterDetail,
      ["companyId"]: obj.companyName,
    });
    if (userType === "COMPANY_USER") {
      setPreOnboardingDetail({
        ...preOnboardingDetail,
        ["companyId"]: obj.companyId,
      });
    } else {
      setPreOnboardingDetail({ ...preOnboardingDetail, ["companyId"]: obj.id });
    }
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      batchData = batchData?.filter((e: any) => {
        return (
          e.id.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.uploadDateTime
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.totalRecordCount
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.totalValidCount
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.totalFailureCount
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.status.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      batchData = batchData.filter((e: any | CompanyMaintenanceInfo) => {
        if (
          e[searchCategory]
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const onClickView = (value: any) => {
    props.history.push({
      pathname: "/dashboard/PreOnBoarding-Customer",
      state: {
        value,
        companyName,
      },
      value: true,
    });
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"PreOnBoarding"}
        SummaryFileName={"PreOnBoarding"}
        List={true}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : onBoardingHeader
        }
        filterArea={toggleFiler}
        Add={true}
        AddAction={handleAdd}
        filterRemit={true}
        filterEnabled={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        Refresh={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        TableData={batchData}
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
          <button
            onClick={Print}
            style={{
              color: "blue",
              textDecoration: "underline",
              border: 0,
              background: "white",
            }}
          >
            here
          </button>{" "}
          to confirm and Print !. Or{" "}
          <button
            onClick={cancelPrint}
            style={{
              color: "blue",
              textDecoration: "underline",
              border: 0,
              background: "white",
            }}
          >
            Cancel
          </button>
        </span>
      )}
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={batchStatus}
          closeMessage={closeMessage}
          message={batchMessage}
          errorFix={colorError}
        />
      )}
      {filteredArea && <FiltersSelected value={filterDetail} />}
      {filterOption && (
        <div className="preOnboarding-filter mt-3 p-3 pb-4">
          <Form>
            <div className="Form-group">
              <div
                style={{
                  fontSize: "18px",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                Filter
                <span className={`colorRedLock ${filterError && "d-none"}`}>
                  {" "}
                  ** Marked Field value should be Mandatory
                </span>
              </div>
              <Row>
                <Col sm={3} className="Prefund-Account-row d-flex flex-column">
                  <Label for="exampleSelect" style={{ color: "#FFFFFF" }}>
                    Company Name
                    <span className="container-body-label-color">*</span>
                  </Label>
                  <Select
                    onChange={handleChangeSearch}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="preOnboarding-company form-select border-0 cursor"
                    value={companyName}
                    style={{ height: "38px" }}
                  >
                    {userType === "STAFF"
                      ? companyGetData?.map((option: any, index: any) => {
                          return (
                            <Option key={index} value={JSON.stringify(option)}>
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
                    Batch Start Date
                  </Label>
                  <Input
                    type="date"
                    name="startDate"
                    className="preOnboarding-no-border cursor"
                    value={preOnboardingDetail.startDate}
                    onChange={handleChange}
                    max={moment().format("YYYY-MM-DD")}
                  ></Input>
                </Col>

                <Col sm={3}>
                  <Label for="exampleEmail" style={{ color: "#FFFFFF" }}>
                    Batch End Date
                  </Label>
                  <Input
                    type="date"
                    name="endDate"
                    className="preOnboarding-no-border cursor"
                    onChange={handleChange}
                    min={minEndDate}
                    max={moment().format("YYYY-MM-DD")}
                    value={preOnboardingDetail.endDate}
                  ></Input>
                </Col>
                <Col
                  className="enquiry-buttons"
                  sm={2}
                  style={{ marginTop: "22px" }}
                >
                  <div className="d-flex">
                    <CustomButton
                      className="preOnboarding-submit"
                      component={"payrollEnquiry"}
                      color={"danger"}
                      onClick={handleSubmit}
                    >
                      Submit
                    </CustomButton>
                    <div className="ps-3">
                      <CustomButton
                      className="preOnboarding-submit"
                        color="secondary"
                        component={"payrollEnquiry"}
                        onClick={onReset}
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

            <option value="id" className="cursor">
              Batch Id
            </option>
            <option value="uploadDateTime" className="cursor">
              Batch Date
            </option>
            <option value="totalRecordCount" className="cursor">
              Total Record
            </option>
            <option value="totalValidCount" className="cursor">
              Success Count
            </option>
            <option value="totalFailureCount" className="cursor">
              Failure Count
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
      {showTable && batchData && (
        <div className="mt-3" ref={componentRef}>
          <CustomHeader
            TableData={columns.length > 0 ? columns : onBoardingHeader}
            CustomTableHeader={
              Array.isArray(batchData) ? batchData : [batchData]
            }
            DisableMange={toPrint ? true : false}
            DefaultColumn={false}
            view={true}
            viewUser={onClickView}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export default PreOnBoarding;
