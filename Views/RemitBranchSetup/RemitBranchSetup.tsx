import { Form, Select } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomCurrentPage from "../../Components/CustomCurrentPageComponent/CustomCurrentPage";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  getBankRecords,
  getBranchList,
  getCountryRecords,
  resetBranchRecordsData,
} from "../../redux/action/RemitBranchSetupAction";
import { BranchSetupRecordsInfo } from "../../models/RemitBranchSetupModel";
import { customValidator } from "../../Constants/Validation";
import "./RemitBranchSetup.scss";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";

const { Option } = Select;

const RemitBranchSetup = (props: any) => {
  const [form] = Form.useForm();
  const [columns, setcolumns] = useState([]);
  const componentRef = useRef<any>();
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [filteredCountry, setFilteredCountry] = useState(true);
  const [filteredBank, setFilteredBank] = useState(true);
  const [filteredBranch, setFilteredBranch] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [apiMessage, setApiMessage] = useState(props.location?.state || "");
  const [tableShow, setTableShow] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [countryInfo, setCountryInfo] = useState({
    code: "",
    country: "",
    bankName: "",
    branchCode: "",
    statusCode: "",
  });
  const [errors, setErrors] = useState({
    countryDescriptionError: "",
    bankDescriptionError: "",
    branchCodedError: "",
    statusCodeError: "",
  });
  const [bankInfo, setBankInfo] = useState({
    bankCode: "",
    bankName: "",
  });
  const countryRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.getCountryRegordsResponse
  );

  const bankRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.getBankRegordsResponse
  );
  const branchListRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.getBranchListRegordsResponse
  );
  let filterDatas = {
    countryCode,
    bankCode,
    branchCode,
    statusCode: countryInfo.statusCode,
  };
  const fetchCountryRecords = useCallback(async () => {
    try {
      dispatch(getCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  const fetchBankRecords = useCallback(
    async (code: any) => {
      try {
        dispatch(getBankRecords(code));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchBranchListRecords = useCallback(
    async (filterDatas: any) => {
      try {
        dispatch(
          getBranchList(
            filterDatas.countryCode,
            filterDatas.bankCode,
            filterDatas.branchCode,
            filterDatas.statusCode
          )
        );
        setIsLoading(false);
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(false);
  }, [branchListRecordsData?.data]);

  useEffect(() => {
    fetchCountryRecords();
    resetBranchRecords();
  }, []);

  useEffect(() => {
    if (branchListRecordsData) {
      if (branchListRecordsData.data) {
        fetchBranchListRecords(filterDatas);
      } else if (branchListRecordsData.error) {
        setError(
          branchListRecordsData != undefined && branchListRecordsData?.message
        );
        setApiMessage(true);
      }
    }
  }, [fetchBranchListRecords]);

  useEffect(() => {
    setIsLoading(false);
  }, [branchListRecordsData?.data[0]]);

  let branchData = branchListRecordsData?.data;

  useEffect(() => {
    if (bankRecordsData) {
      if (bankRecordsData.data) {
        setIsLoading(false);
        setApiMessage(false);
      } else if (bankRecordsData.error) {
        setError(bankRecordsData != undefined && bankRecordsData?.message);
        setApiMessage(true);
      }
    }
  }, [bankRecordsData]);

  const branchHeader = [
    {
      title: "UID",
      dataIndex: "id",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },

    {
      title: "Branch Code",
      dataIndex: "branchCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchCode.localeCompare(b.branchCode),
      },
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.branchName.localeCompare(b.branchName),
      },
    },
    {
      title: "Branch Address",
      dataIndex: "address",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.address.localeCompare(b.address),
      },
    },
    {
      title: "City",
      dataIndex: "city",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.city.localeCompare(b.city),
      },
    },
    {
      title: "Status Flag",
      dataIndex: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "ACTIVE" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
  ];

  const validate = () => {
    let checkCountryDescriptionError = customValidator(
      "mobileNum",
      "Mobile No",
      countryInfo.country
    );
    let checkBankDescriptionError = customValidator(
      "deviceId",
      "Device ID",
      countryInfo.bankName
    );
    let checkBranchCodedError = customValidator(
      "startDate",
      "Start Date",
      countryInfo.branchCode
    );
    let checkStatusCodeError = customValidator(
      "endDate",
      "Status",
      countryInfo.statusCode
    );

    if (
      !(
        checkCountryDescriptionError === "null" ||
        checkBankDescriptionError === "null"
      )
    ) {
      setErrors({
        countryDescriptionError: checkCountryDescriptionError,
        bankDescriptionError: checkBankDescriptionError,
        branchCodedError: checkBranchCodedError,
        statusCodeError: checkStatusCodeError,
      });
      return false;
    }
    setErrors({
      countryDescriptionError: "",
      bankDescriptionError: "",
      branchCodedError: "",
      statusCodeError: "",
    });
    return true;
  };

  const editBranch = (e: any) => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Edit-Branch-Setup",
      state: e,
      action: "edit",
    });
  };

  const handleSubmit = () => {
    if (validate()) {
      fetchBranchListRecords(filterDatas).then(() => {
        setTableShow(true);
        setfilterOption(false);
        setFilteredArea(true);
        setApiMessage(false);
        setIsLoading(true);
      });
    }
    if (branchCode.length > 0) {
      setFilteredBranch(true);
    } else {
      setFilteredBranch(false);
    }
  };
  const onReset = () => {
    setBranchCode("");
    setCountryInfo({
      ...countryInfo,
      code: "",
      country: "",
      bankName: "",
      branchCode: "",
      statusCode: "",
    });
    setBankInfo({
      ...bankInfo,
      bankName: "",
    });
  };
  const resetBranchRecords = useCallback(async () => {
    try {
      await dispatch(resetBranchRecordsData());
    } catch (err) {}
  }, [dispatch]);
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setIsLoading(false);
    setSearchArea(false);
    setTableShow(false);
    setApiMessage(false);
    setBranchCode("");
    setCountryCode("");
    setBankCode("");
    setBranchCode("");
    resetBranchRecords();
    fetchCountryRecords();
    setCountryInfo({
      ...countryInfo,
      code: "",
      country: "",
      bankName: "",
      branchCode: "",
    });
  };

  const handleChangeSearchCountry = (e: any) => {
    let obj = JSON.parse(e);
    setCountryCode(obj.code);
    setCountryInfo({
      ...countryInfo,
      ["country"]: obj.description,
    });
    fetchBankRecords(obj.code);
  };
  const handleChangeSearchBank = (e: any) => {
    let obj = JSON.parse(e);
    setBankCode(obj.bankCode);

    setCountryInfo({
      ...countryInfo,
      ["bankName"]: obj.bankName,
    });
  };
  const filterChange = (e: any) => {
    setCountryInfo({ ...countryInfo, [e.target.name]: e.target.value });
  };

  const closeSearch = () => {
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
    setTableShow(true);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  function onSearch(val: any) {}

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      branchData = branchData?.filter((e: any | BranchSetupRecordsInfo) => {
        return (
          e.id?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.branchCode?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.branchName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.address?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.city?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.statusCode?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      branchData = branchData?.filter((e: any | BranchSetupRecordsInfo) => {
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

  const navigateTo = (e: any) => {
    if (e === "payout") {
      props.history.push({
        pathname: "/dashboard/remit-setup/Payout-Country",
      });
    } else if (e === "bank") {
      props.history.push({
        pathname: "/dashboard/remit-setup/Bank-Setup",
      });
    } else if (e === "branch") {
      props.history.push({
        pathname: "/dashboard/remit-setup/Branch-Setup",
      });
    } else if (e === "agent") {
      props.history.push({
        pathname: "/dashboard/remit-setup/Paying-Group",
      });
    }
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Branch Setup"}
        SummaryFileName={"Branch Setup"}
        searchArea={toggleSearch}
        search={searchArea}
        filterRemit={true}
        filterArea={toggleFilter}
        filterEnabled={filterOption}
        Refresh={true}
        List={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : branchHeader
        }
        TableData={branchData}
      />

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={true}
          closeMessage={() => closeMessage()}
          message={props?.location?.message}
          isLoading={props?.location?.isLoading}
        />
      )}
      {filterOption && (
        <div className="colorWhite payout-filter-section mt-3 p-3">
          <p className="branchSetupTitle">
            Filter
            {errors.countryDescriptionError &&
              errors.bankDescriptionError &&
              errors?.countryDescriptionError !== "null" &&
              errors.bankDescriptionError !== "null" && (
                <span className="colorRedUser">
                  {" "}
                  * Indicated field value are mandatory
                </span>
              )}
          </p>
          <div className="container-fluid branchFilter">
            <div className="row ">
              <div className="col">
                <FormGroup>
                  <Label for="exampleSelect">
                    Country<span className="container-body-label-color">*</span>
                  </Label>
                  <Select
                    onChange={handleChangeSearchCountry}
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="remit-branchsetup-input form-control border-0 cursor"
                    value={countryInfo.country || undefined}
                    style={{ height: "38px" }}
                  >
                    {countryRecordsData &&
                      countryRecordsData.data?.map(
                        (option: any, index: any) => {
                          return (
                            <Option key={index} value={JSON.stringify(option)}>
                              {option.description}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                </FormGroup>
              </div>
              <div className="col">
                {" "}
                <FormGroup>
                  <Label for="exampleEmail">
                    Bank<span className="container-body-label-color">*</span>
                  </Label>
                  <Select
                    onChange={handleChangeSearchBank}
                    showSearch
                    onSearch={onSearch}
                    filterOption={(input: any, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="remit-branchsetup-input form-control border-0 cursor"
                    value={countryInfo.bankName || undefined}
                    style={{ height: "38px" }}
                  >
                    {bankRecordsData &&
                      bankRecordsData.data.map((option: any) => {
                        return (
                          <Option value={JSON.stringify(option)}>
                            {option.bankName}
                          </Option>
                        );
                      })}
                  </Select>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Branch Code</Label>
                  <Input
                    type="text"
                    name="branchCode"
                    className="formRadiusBank"
                    value={countryInfo.branchCode}
                    onChange={filterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Status</Label>
                  <Input
                    type="select"
                    name="statusCode"
                    className="formRadiusBank form-select"
                    value={countryInfo.statusCode}
                    onChange={filterChange}
                  >
                    <option value={"false"}>{"ACTIVE"}</option>
                    <option value={"true"}>{"INACTIVE"}</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-3 d-flex justify-content-end">
            <SubmitCancelButton
              button={"Submit"}
              secondButton={"Reset"}
              onSubmit={handleSubmit}
              onCancel={onReset}
            />
          </div>
        </div>
      )}

      {filteredArea && <FiltersSelected value={countryInfo} />}

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

            <option value="id" className="cursor">
              UID
            </option>
            <option value="branchCode" className="cursor">
              Branch Code
            </option>
            <option value="branchName" className="cursor">
              Branch Name
            </option>
            <option value="address" className="cursor">
              Branch Address
            </option>
            <option value="city" className="cursor">
              City
            </option>
            <option value="statusCode" className="cursor">
              Status Flag
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
      <CustomCurrentPage page={"branch"} onClick={navigateTo} />
      {tableShow && (
        <>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className="mt-3" ref={componentRef}>
              <Form form={form} component={false}>
                <CustomHeader
                  TableData={columns.length > 0 ? columns : branchHeader}
                  editToggle={true}
                  CustomTableHeader={
                    Array.isArray(branchData) ? branchData : [branchData]
                  }
                  toPrint={toPrint ? true : false}
                  editUser={editBranch}
                  DisableMange={toPrint ? true : false}
                />
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RemitBranchSetup;
