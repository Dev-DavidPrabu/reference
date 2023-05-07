import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "../RemitBankSetup/RemitBankSetup.scss";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomCurrentPage from "../../Components/CustomCurrentPageComponent/CustomCurrentPage";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { EditableCellProps, Item } from "../../models/RemitAgentTag";
import { Form, Select } from "antd";
import CustomButton from "../../Components/UI/CustomButton";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getBankSetupRecords,
  getViewBankSetupRecords,
  resetBankRecords,
  updateBankSetupRecordsNew,
} from "../../redux/action/BankSetupAction";
import { getBankSetupCountryRecords } from "../../redux/action/BankSetupCountryAction";
import { BankSetupRecordsInfo } from "../../models/RemitBankSetupModel";
import { useReactToPrint } from "react-to-print";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import { Utils } from "../../Constants/Constants";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";

const RemitBankSetup = (props: any) => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [iconClosed, setIconClosed] = useState(true);
  const [filteredCountry, setFilteredCountry] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState(false);
  const componentRef = useRef<any>();
  const [showtable, setshowtable] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const { Option } = Select;
  const [countryInfo, setCountryInfo] = useState({
    code: "",
    country: "",
    agentCode: "",
    statusCode: "false",
  });
  const [countryName, setCountryName] = useState("");

  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [searchArea, setSearchArea] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [tableShow, setTableShow] = useState(false);
  const [showModalList, setShowModalList] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [errors, setErrors] = useState({
    countryDescriptionError: "",
    agentCodeDescriptionError: "",
    statusCodeError: "",
  });
  const [bankSetupStatus, updateBankSetupStatus] = useState({
    id: "",
    code: "",
    bankCode: "",
    bankName: "",
    countrycode: "",
    statusCode: "",
  });
  const bankSetuprecords = useSelector(
    (state: RootStateOrAny) => state.BankSetupReducer?.getBankSetupResponse
  );
  const bankSetupCountryrecords = useSelector(
    (state: RootStateOrAny) =>
      state.BankSetupCountryReducer?.getBankSetupCountryResponse
  );
  const updateBankSetupRecords = useSelector(
    (state: RootStateOrAny) => state.BankSetupReducer?.updateBankSetupResponse
  );

  const viewBankSetuprecords = useSelector(
    (state: RootStateOrAny) => state.BankSetupReducer?.getViewBankSetupResponse
  );

  const fetchBankSetupRecords = useCallback(
    async (countryCode: any, statusCode: any) => {
      try {
        dispatch(getBankSetupRecords(countryCode, statusCode));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchViewBankSetupRecords = useCallback(
    async (countryCode: any, bankCode: any) => {
      try {
        dispatch(getViewBankSetupRecords(countryCode, bankCode));
      } catch (err) {}
    },
    [dispatch]
  );

  const fetchBankSetupCountryRecords = useCallback(async () => {
    try {
      dispatch(getBankSetupCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [bankSetuprecords?.data]);

  useEffect(() => {
    fetchBankSetupRecords(countryName, countryInfo.statusCode);
    if (bankSetuprecords) {
    } else if (bankSetuprecords?.error) {
    }
  }, []);

  useEffect(() => {
    if (viewBankSetuprecords) {
      if (viewBankSetuprecords?.data) {
        fetchViewBankSetupRecords(countryName, bankSetupStatus.bankCode);
      } else if (viewBankSetuprecords.error) {
      }
    }
  }, [fetchViewBankSetupRecords]);
  useEffect(() => {
    if (updateBankSetupRecords) {
      if (updateBankSetupRecords.data) {
        setApiMessage(true);
        setError("Updated Successfully");
        fetchBankSetupRecords(countryName, countryInfo.statusCode);
        resetGetData();
      } else if (updateBankSetupRecords.error) {
        setApiMessage(true);
        setError(updateBankSetupRecords.message);
      }
    }
  }, [updateBankSetupRecords]);

  useEffect(() => {
    fetchBankSetupCountryRecords();
    updateBankSetupRecordsNew("");
  }, [fetchBankSetupCountryRecords]);
  let datas = bankSetuprecords?.data;
  useEffect(() => {
    if (bankSetuprecords?.data?.length === 0) {
      setIsLoading(false);
    }
  }, [bankSetuprecords?.data]);

  const isEditing = (record: Item) => record?.id === editingKey;

  const bankHeader = [
    {
      title: "UID",
      dataIndex: "id",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "PP Agent Code",
      dataIndex: "payoutAgentCode",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.payoutAgentCode.localeCompare(b.payoutAgentCode),
      },
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.bankName.localeCompare(b.bankName),
      },
    },
    {
      title: "Status Flag",
      dataIndex: "statusCode",
      checked: true,
      editable: true,
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
    {
      title: "Manage",
      dataIndex: "manage",
      checked: true,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            <CustomButton
              color="danger"
              onClick={() => onUpdate(record)}
              className="btn2 nextBtnUpdate"
            >
              Update
            </CustomButton>
            <CustomButton
              color="secondary"
              className="btn2 backBtnUpdate"
              onClick={cancel}
            >
              Cancel
            </CustomButton>
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div className={"ms-2 manage-button"} onClick={() => edit(record)}>
              <FaRegEdit />
            </div>
          </div>
        );
      },
    },
  ];

  const onUpdate = (record: any) => {
    setEditingKey("");
    var body = JSON.stringify({
      id: record.id,
      countryCode: record.countryCode,
      bankCode: record.bankCode,
      bankName: record.bankName,
      statusCode: bankSetupStatus.statusCode,
    });
    dispatch(updateBankSetupRecordsNew(body));
    setIsLoading(true);
  };

  const handleView = (e: any) => {
    fetchViewBankSetupRecords(countryName, e.bankCode).then(() => {
      props.history.push({
        pathname: "/dashboard/remit-setup/View-Bank-Setup",
        state: e,
        action: "view",
      });
    });
    setfilterOption(false);
  };
  const edit = (record: Item | any) => {
    form.setFieldsValue({ statusCode: "", ...record });
    updateBankSetupStatus({
      ...bankSetupStatus,
      statusCode: record?.statusCode,
    });
    setEditingKey(record.id);
  };

  const resetGetData = useCallback(async () => {
    try {
      await dispatch(resetBankRecords());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    if (!apiMessage) {
      setApiMessage(false);
    }
  }, []);
  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
    setTableShow(false);

    setCountryInfo({
      ...countryInfo,
      ["country"]: "",
    });
    resetGetData();
  };
  const mergedColumns = bankHeader.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "statusCode" ? "dropdown" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const option = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "dropdown" ? (
        <Select
          options={option}
          onChange={(value: string) => {
            updateBankSetupStatus({ ...bankSetupStatus, statusCode: value });
          }}
        />
      ) : (
        <Input />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const validate = () => {
    let checkCountryDescriptionError = customValidator(
      "countryCode",
      "Country Code",
      countryInfo.country
    );
    let checkAgentCodeDescriptionError = customValidator(
      "agentCode",
      "Parent Payout Agent code",
      countryInfo.agentCode
    );
    let checkStatusCodeError = customValidator(
      "statusCode",
      "Status Code",
      countryInfo.statusCode
    );

    if (
      !(
        checkCountryDescriptionError === "null" &&
        checkStatusCodeError === "null"
      )
    ) {
      setErrors({
        countryDescriptionError: checkCountryDescriptionError,
        agentCodeDescriptionError: checkAgentCodeDescriptionError,
        statusCodeError: checkStatusCodeError,
      });
      return false;
    }
    setErrors({
      countryDescriptionError: "",
      agentCodeDescriptionError: "",
      statusCodeError: "",
    });
    return true;
  };

  const handleSubmit = (e: any) => {
    if (validate()) {
      fetchBankSetupRecords(countryName, countryInfo.statusCode)
        .then(() => {
          setfilterOption(false);
          setFilteredArea(true);
          setshowtable(true);
          setIsLoading(true);
          setTableShow(true);
        })
        .catch(() => {
          setIsLoading(true);
        });
      if (countryInfo.agentCode && countryInfo.statusCode) {
        setFilteredCountry(true);
        setFilteredStatus(true);
      } else if (
        countryInfo.agentCode.length > 0 &&
        countryInfo.statusCode === ""
      ) {
        setFilteredCountry(true);
        setFilteredStatus(false);
      } else if (
        countryInfo.statusCode.length > 0 &&
        countryInfo.agentCode === ""
      ) {
        setFilteredCountry(false);
        setFilteredStatus(true);
      } else {
        setFilteredCountry(false);
        setFilteredStatus(false);
      }
    }
  };
  const onReset = () => {
    setCountryInfo({
      code: "",
      country: "",
      agentCode: "",
      statusCode: "",
    });
  };

  const cancel = () => {
    setEditingKey("");
  };
  const handleChangeCode = (e: any) => {
    let obj = JSON.parse(e);
    setCountryName(obj.code);
    setCountryInfo({
      ...countryInfo,
      ["country"]: obj.description,
    });
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
    setShowModalList(!showModalList);
  };
  const handleAgent = (e: any) => {
    setCountryInfo({ ...countryInfo, [e.target.name]: e.target.value });
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

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      datas = datas?.filter((e: any | BankSetupRecordsInfo) => {
        return (
          e.id?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.payoutAgentCode
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.bankName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.statusCode?.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      datas = datas?.filter((e: any | BankSetupRecordsInfo) => {
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

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Bank Setup"}
        SummaryFileName={"Bank Setup"}
        Refresh={true}
        filterArea={toggleFiler}
        filterEnabled={filterOption}
        filterRemit={true}
        List={true}
        searchArea={toggleSearch}
        search={searchArea}
        ListData={handleList}
        refresh={toggleRefresh}
        Print={handlePrint}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : mergedColumns
        }
        TableData={datas}
      />

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={true}
          message={error}
          closeMessage={closeMessage}
        />
      )}

      {filterOption && (
        <div className="colorWhite payout-filter-section mt-3 p-3">
          <p className="branchSetupTitle">
            Filter
            {errors.countryDescriptionError &&
              errors.statusCodeError &&
              (errors?.countryDescriptionError !== "null" ||
                errors.statusCodeError !== "null") && (
                <span className="colorRedUser">
                  {" "}
                  * Indicated field value are mandatory
                </span>
              )}
          </p>

          <div className="container-fluid bankSetup">
            <div className="row ">
              <div className="col-4">
                {" "}
                <FormGroup>
                  <Label for="exampleEmail">
                    Country<span className="container-body-label-color">*</span>
                  </Label>
                  <Select
                    onChange={handleChangeCode}
                    showSearch
                    filterOption={(input: any, value: any) =>
                      value.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    id="fieldName1"
                    className="prefund-Account-input form-control border-0 cursor"
                    value={countryInfo.country || undefined}
                    style={{ height: "38px" }}
                  >
                    {bankSetupCountryrecords &&
                      bankSetupCountryrecords.data.length > 0 &&
                      bankSetupCountryrecords.data.map(
                        (value: any, index: any) => {
                          return (
                            <Option key={index} value={JSON.stringify(value)}>
                              {value.description}
                            </Option>
                          );
                        }
                      )}
                  </Select>
                </FormGroup>
              </div>
              <div className="col-4">
                {" "}
                <FormGroup onSubmit={handleSubmit}>
                  <Label for="exampleEmail">Parent Payout Agent code</Label>
                  <Input
                    type="text"
                    name="agentCode"
                    className="formRadiusBank"
                    value={countryInfo.agentCode}
                    onChange={handleAgent}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col-4">
                <FormGroup>
                  <Label for="exampleEmail">
                    Status<span className="container-body-label-color">*</span>
                  </Label>
                  <Input
                    type="select"
                    name="statusCode"
                    className="formRadiusBank form-control form-select"
                    value={countryInfo.statusCode}
                    onChange={handleAgent}
                  >
                    {Utils.statusList?.map((status: any, index: any) => {
                      return (
                        <option
                          key={index}
                          value={status === "ACTIVE" ? "false" : "true"}
                        >
                          {status}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end mt-2 me-4">
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
            <option value="payoutAgentCode" className="cursor">
              PP Agent Code
            </option>
            <option value="bankName" className="cursor">
              Bank Name
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
      <CustomCurrentPage page={"bank"} onClick={navigateTo} />
      {tableShow && (
        <>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className="mt-3" ref={componentRef}>
              <Form form={form} component={false}>
                <CustomHeader
                  TableData={columns.length > 0 ? columns : mergedColumns}
                  CustomTableHeader={Array.isArray(datas) ? datas : [datas]}
                  componentCell={EditableCell}
                  toPrint={toPrint ? true : false}
                  Edit={true}
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

export default RemitBankSetup;
