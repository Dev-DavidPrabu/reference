import { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomCurrentPage from "../../Components/CustomCurrentPageComponent/CustomCurrentPage";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { RemitCountrySetupInfo } from "../../models/RemitCountrySetupModel";
import "./RemitCountrySetup.scss";
import {
  getPayoutCountryRecords,
  resetGetPayoutCountryData,
  resetUpdatePayoutCountryData,
} from "../../redux/action/RemitPayoutCountryAction";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Form, Select } from "antd";
import { useReactToPrint } from "react-to-print";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { getCountryRecords } from "../../redux/action/RemitBranchSetupAction";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { useHistory } from "react-router";

const RemitCountrySetup = (props: any) => {
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [filteredArea, setFilteredArea] = useState(false);
  const [countryInfo, setCountryInfo] = useState({ code: "", country: "" });
  const [countryCode, setCountryCode] = useState("");
  const [addPayoutCountry, SetAddPayoutCountry] = useState("");

  const { Option } = Select;

  const [table, setTable] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [toPrint, setPrint] = useState(false);
  let history = useHistory();
  const [errors, setErrors] = useState({
    countryDescriptionError: "",
  });

  let payoutCountryRecords = useSelector(
    (state: RootStateOrAny) =>
      state.RemitPayoutCountryReducer?.getPayoutCountryRecordsResponse
  );
  const countryRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.getCountryRegordsResponse
  );
  const fetchCountryRecords = useCallback(async () => {
    try {
      dispatch(getCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchCountryRecords();
  }, []);

  const fetchPayoutCountryRecords = useCallback(
    async (countryCode: any) => {
      try {
        dispatch(getPayoutCountryRecords(countryCode));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    getPayoutCountryRecords("");
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [payoutCountryRecords?.data[0]]);

  useEffect(() => {
    if (payoutCountryRecords) {
      if (payoutCountryRecords?.data) {
        getPayoutCountryRecords(countryInfo.country);
      }
    }
  }, [payoutCountryRecords]);

  const resetUpdatedData = useCallback(async () => {
    try {
      dispatch(resetUpdatePayoutCountryData());
    } catch (err) {}
  }, [dispatch]);

  const resetGetData = useCallback(async () => {
    try {
      dispatch(resetGetPayoutCountryData());
    } catch (err) {}
  }, [dispatch]);

  let locatonData = props.location?.state;
  useEffect(() => {
    if (locatonData) {
      fetchPayoutCountryRecords(locatonData.countryCode);
      setApiMessage("Payout Country Updated Successfully");
      setTable(true);
      setTimeout(function () {
        resetUpdatedData();
        setIsLoading(false);
        setApiMessage("");
      }, 4000);
    }
  }, [locatonData]);

  const payoutHeader = [
    {
      title: "Setup ID",
      dataIndex: "id",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "Country Code",
      dataIndex: "countryCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.countryCode.localeCompare(b.countryCode),
      },
    },
    {
      title: "Payout Mode",
      dataIndex: "description",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.description.localeCompare(b.description),
      },
    },
    {
      title: "Customer Prompt",
      dataIndex: "notes",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.notes.localeCompare(b.notes),
      },
    },
    {
      title: "Status Code",
      dataIndex: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode.localeCompare(b.statusCode),
      },
    },
    {
      title: "Max Transaction Limit",
      dataIndex: "maxTransactionValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.maxTransactionValue - b.maxTransactionValue,
      },
    },
    {
      title: "Min Transaction Limit",
      dataIndex: "minTransactionValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.maxTransactionValue - b.minTransactionValue,
      },
    },
  ];

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setCountryInfo({
      ...countryInfo,
      ["country"]: "",
    });
    resetGetData();
  };

  const validate = () => {
    let checkCountryDescriptionError = customValidator(
      "countryCode",
      "Country Code",
      countryInfo.country
    );

    if (checkCountryDescriptionError !== "null") {
      setErrors({
        countryDescriptionError: checkCountryDescriptionError,
      });
      return false;
    }
    setErrors({
      countryDescriptionError: "",
    });
    return true;
  };

  const editPayout = (e: any) => {
    history.push({
      pathname: "/dashboard/remit-setup/Edit-Payout-Country",
      state: {
        value: e,
        country: countryInfo,
      },
    });
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };
  const closeSearch = () => {
    setSearchArea(false);
  };

  let payoutCountryData = payoutCountryRecords?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      payoutCountryData = payoutCountryData?.filter(
        (e: any | RemitCountrySetupInfo) => {
          return (
            e.id?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
            e.maxTransactionValue
              ?.toString()
              .toUpperCase()
              .includes(searchUserData?.toUpperCase()) ||
            e.countryCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.notes?.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      payoutCountryData = payoutCountryData?.filter(
        (e: any | RemitCountrySetupInfo) => {
          if (
            e[searchCategory]
              .toString()
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }

  const handleSubmit = () => {
    if (validate()) {
      fetchPayoutCountryRecords(countryCode).then(() => {
        setfilterOption(false);
        setFilteredArea(true);
        setTable(true);
        setIsLoading(true);
      });
    }
  };
  const handleReset = () => {
    setCountryInfo({
      ...countryInfo,
      ["country"]: "",
    });
  };
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);

    setCountryCode(obj.code);
    setCountryInfo({
      ...countryInfo,
      ["country"]: obj.description,
    });
  };

  const navigateTo = (e: any) => {
    if (e === "payout") {
      history.push({
        pathname: "/dashboard/remit-setup/Payout-Country",
      });
    } else if (e === "bank") {
      history.push({
        pathname: "/dashboard/remit-setup/Bank-Setup",
      });
    } else if (e === "branch") {
      history.push({
        pathname: "/dashboard/remit-setup/Branch-Setup",
      });
    } else if (e === "agent") {
      history.push({
        pathname: "/dashboard/remit-setup/Paying-Group",
      });
    }
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  useEffect(() => {
    if (payoutCountryRecords?.data.length === 0) {
      setIsLoading(false);
    }
  }, [payoutCountryRecords?.data]);
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns([]);
  };
  return (
    <div className="p-4">
      {!addPayoutCountry && (
        <>
          <CommonHeaderSummary
            RightContent={"Payout Country"}
            SummaryFileName={"Payout Country"}
            Add={false}
            filterArea={toggleFilter}
            filterEnabled={filterOption}
            filterRemit={true}
            searchArea={toggleSearch}
            search={searchArea}
            Refresh={true}
            Print={handlePrint}
            refresh={toggleRefresh}
            List={true}
            ListData={handleList}
            SummaryColumn={
              orginalColumns.length > 0 ? orginalColumns : payoutHeader
            }
            TableData={payoutCountryData}
          />

          {apiMessage && (
            <CustomResponseMessage
              apiStatus={true}
              closeMessage={() => closeMessage()}
              message={apiMessage}
            />
          )}

          {filterOption && (
            <div className="colorWhite payout-filter-section mt-3 p-3 ">
              <p className="branchSetupTitle ">
                Filter
                {errors.countryDescriptionError &&
                  errors?.countryDescriptionError !== "null" && (
                    <span className="colorRedUser">
                      {" "}
                      * Country field should be mandatory
                    </span>
                  )}
              </p>
              <div className="d-flex col">
                <div className="d-flex col">
                  <div className="col-2 justify-content-start align-items-center d-flex">
                    <Label for="exampleEmail">
                      Country{" "}
                      <span className="container-body-label-color">*</span>
                    </Label>
                  </div>
                  <div className="col-10">
                    <FormGroup>
                      <Select
                        onChange={handleChangeCode}
                        showSearch
                        filterOption={(input: any, option: any) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        id="fieldName1"
                        className="prefund-Account-input form-control border-0 cursor"
                        value={countryInfo.country || undefined}
                        style={{ height: "38px" }}
                      >
                        {countryRecordsData &&
                          countryRecordsData.data?.length > 0 &&
                          countryRecordsData.data.map(
                            (option: any, index: any) => {
                              return (
                                <Option
                                  key={index}
                                  value={JSON.stringify(option)}
                                >
                                  {option.description}
                                </Option>
                              );
                            }
                          )}
                      </Select>
                    </FormGroup>
                  </div>
                </div>
                <div className="col align-items-center d-flex ms-3">
                  <SubmitCancelButton
                    button={"Submit"}
                    secondButton={"Reset"}
                    onSubmit={handleSubmit}
                    onCancel={handleReset}
                  />
                </div>
              </div>
            </div>
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

                <option value="id" className="cursor">
                  Id
                </option>
                <option value="countryCode" className="cursor">
                  Country Code
                </option>
                <option value="notes" className="cursor">
                  customer prompt
                </option>
                <option value="maxTransactionValue" className="cursor">
                  MaxTransactionValue
                </option>
                <option value="any" className="cursor">
                  Any
                </option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
              />
              <div className="ms-1">
                <Button color="danger" className="btn--sizer">
                  Search
                </Button>
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
          {filteredArea && <FiltersSelected value={countryInfo} />}
          <>
            <CustomCurrentPage page={"payout"} onClick={navigateTo} />
            <CustomLoader isLoading={isLoading} size={50} />
            {isLoading ? null : (
              <div className="mt-3" ref={componentRef}>
                <Form form={form} component={false}>
                  {table && (
                    <CustomHeader
                      TableData={columns.length > 0 ? columns : payoutHeader}
                      editToggle={true}
                      Delete={false}
                      CustomTableHeader={payoutCountryData}
                      editUser={editPayout}
                      toPrint={toPrint ? true : false}
                      DisableMange={toPrint ? true : false}
                    />
                  )}
                </Form>
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default RemitCountrySetup;
