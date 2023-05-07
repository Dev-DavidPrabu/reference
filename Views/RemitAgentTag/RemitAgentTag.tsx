import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "../RemitAgentTag/RemitAgentTag.scss";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomCurrentPage from "../../Components/CustomCurrentPageComponent/CustomCurrentPage";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { EditableCellProps, Item } from "../../models/RemitAgentTag";
import { Form, Select } from "antd";
import CustomButton from "../../Components/UI/CustomButton";
import { AgentSetupRecordsInfo } from "../../models/RemitAgentTagModel";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getCountryRecords } from "../../redux/action/RemitBranchSetupAction";
import {
  getPayGroupRecords,
  resetGetPayingGroupData,
  updatePayingGroupSetupRecordsNew,
} from "../../redux/action/RemitAgentTagAction";
import { useReactToPrint } from "react-to-print";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";

const RemitAgentTag = (props: any) => {
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState(true);
  const [filteredAgent, setFilteredAgent] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [agentValue, setAgentValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState(false);

  const [showTableModal, setTableModal] = useState(false);
  const dispatch = useDispatch();
  const { Option } = Select;
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [searchArea, setSearchArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payingGroupCode, setPayingGroupCode] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [mode, setMode] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [countryInfo, setCountryInfo] = useState({
    code: "",
    country: "",
    payingGroupCode: "",
    paymentMode: "",
    agentCode: "",
  });
  const [errors, setErrors] = useState({
    countryDescriptionError: "",
    paymentModeDescriptionError: "",
  });
  const [agentTagStatus, updateAgentTagStatus] = useState({
    id: "",
    groupname: "",
    countrycode: "",
    agentcode: "",
    agentname: "",
    paymentmode: "",
    statusCode: "",
  });

  const countryRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitBranchSetupReducer?.getCountryRegordsResponse
  );
  const payGroupRecordsData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitAgentTagReducer?.getPayGroupRegordsResponse
  );

  const updatePayGroupRecords = useSelector(
    (state: RootStateOrAny) =>
      state.RemitAgentTagReducer?.updatePayGroupRecordsResponse
  );

  const fetchCountryRecords = useCallback(async () => {
    try {
      dispatch(getCountryRecords());
    } catch (err) {}
  }, [dispatch]);

  const getPayGroupRecordsData = useCallback(
    async (data: any) => {
      try {
        dispatch(getPayGroupRecords(data));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    setIsLoading(false);
  }, [payGroupRecordsData?.data]);

  useEffect(() => {
    if (updatePayGroupRecords) {
      if (updatePayGroupRecords.data) {
        var body = JSON.stringify({
          countryCode: countryName,
          paymentMethod: countryInfo.paymentMode,
        });
        getPayGroupRecordsData(body);
        setIsLoading(false);
        setApiMessage(true);
        setError("Updated Successfully");
      } else if (updatePayGroupRecords.error) {
        setApiMessage(true);
        setError(updatePayGroupRecords.message);
      }
    }
  }, [updatePayGroupRecords]);

  useEffect(() => {
    fetchCountryRecords();
    updatePayingGroupSetupRecordsNew("");
    dispatch(getPayGroupRecords(""));
  }, []);

  let payGroupData = payGroupRecordsData?.data;
  let paymentMethodType = payGroupData?.map((item: any, i: any) => {
    if (item.paymentMethod === "1") {
      return { ...item, paymentMethod: "Bank Account" };
    } else {
      return { ...item, paymentMethod: "Cash" };
    }
  });
  const isEditing = (record: Item) => record?.id === editingKey;

  const agentHeader = [
    {
      title: "Paying Group Code",
      dataIndex: "groupCode",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.groupCode.localeCompare(b.groupCode),
      },
    },
    {
      title: "Group Name",
      dataIndex: "groupName",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.groupName.localeCompare(b.groupName),
      },
    },
    {
      title: "Country Code",
      dataIndex: "countryCode",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.countryCode.localeCompare(b.countryCode),
      },
    },
    {
      title: "Agent Code",
      dataIndex: "payAgentCode",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.payAgentCode.localeCompare(b.payAgentCode),
      },
    },
    {
      title: "Agent Name",
      dataIndex: "payAgentName",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.payAgentName.localeCompare(b.payAgentName),
      },
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMethod",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentMethod.localeCompare(b.paymentMethod),
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
              className="btn2 nextBtnAgent"
            >
              Update
            </CustomButton>
            <CustomButton
              color="secondary"
              className="btn2 backBtnAgent"
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
    var body = JSON.stringify({
      payingGroupId: record.id,
      statusCode: agentTagStatus.statusCode,
    });
    dispatch(updatePayingGroupSetupRecordsNew(body));
    setIsLoading(true);
    setEditingKey("");
  };

  const handleView = (e: any) => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Edit-Paying-Group",
      state: e,
      action: "view",
    });
  };
  const edit = (record: Item | any) => {
    form.setFieldsValue({ statusCode: "", ...record });
    updateAgentTagStatus({ ...agentTagStatus, statusCode: record?.statusCode });
    setEditingKey(record.id);
  };
  const resetGetData = useCallback(async () => {
    try {
      await dispatch(resetGetPayingGroupData());
    } catch (err) {}
  }, [dispatch]);

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
    setTableShow(false);

    setCountryInfo({
      ...countryInfo,
      ["country"]: "",
    });
    setAgentCode("");
    resetGetData();
    updateAgentTagStatus({
      id: "",
      groupname: "",
      countrycode: "",
      agentcode: "",
      agentname: "",
      paymentmode: "",
      statusCode: "",
    });
  };

  const mergedColumns = agentHeader.map((col) => {
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
            updateAgentTagStatus({ ...agentTagStatus, statusCode: value });
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
      "countryCode",
      countryInfo.country
    );
    let PaymentModeError = customValidator(
      "paymentMode",
      "paymentMode",
      countryInfo.paymentMode
    );

    if (
      !(checkCountryDescriptionError === "null" || PaymentModeError === "null")
    ) {
      setErrors({
        countryDescriptionError: checkCountryDescriptionError,
        paymentModeDescriptionError: PaymentModeError,
      });
      return false;
    }
    setErrors({
      countryDescriptionError: "",
      paymentModeDescriptionError: "",
    });
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      var body = JSON.stringify({
        countryCode: countryName,
        paymentMethod: countryInfo.paymentMode === "Bank Account" ? "1" : "2",
      });
      setIsLoading(true);
      dispatch(getPayGroupRecords(body));
      setfilterOption(true);
      setTableShow(true);
      setFilteredArea(true);
    }
    if (payingGroupCode && agentCode) {
      setFilteredCountry(true);
      setFilteredAgent(true);
    } else if (payingGroupCode.length > 0 && agentCode === "") {
      setFilteredCountry(true);
      setFilteredAgent(false);
    } else if (agentCode.length > 0 && payingGroupCode === "") {
      setFilteredCountry(false);
      setFilteredAgent(true);
    } else {
      setFilteredCountry(false);
      setFilteredAgent(false);
    }
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleChangeSearchCountry = (e: any) => {
    let obj = JSON.parse(e);
    setCountryName(obj.code);
    setCountryInfo({
      ...countryInfo,
      ["country"]: obj.description,
    });
  };
  const handleFilterChange = (e: any) => {
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
      paymentMethodType = paymentMethodType?.filter(
        (e: any | AgentSetupRecordsInfo) => {
          return (
            e.groupCode?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.groupName?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.countryCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.payAgentCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.payAgentName
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.paymentMethod
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.statusCode?.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      paymentMethodType = paymentMethodType?.filter(
        (e: any | AgentSetupRecordsInfo) => {
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

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
    setTableShow(true);
  };

  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const closeSearch = () => {
    setSearchArea(false);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };

  const onReset = () => {
    setAgentCode("");

    setPayingGroupCode("");
    setCountryInfo({
      ...countryInfo,
      code: "",
      country: "",
      payingGroupCode: "",
      paymentMode: "",
      agentCode: "",
    });
  };
  let value = {
    code: countryInfo.code,
    country: countryInfo.country,
    payingGroupCode: countryInfo.payingGroupCode,
    paymentMode: countryInfo.paymentMode,
    agentCode: countryInfo.agentCode,
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Paying Group"}
        SummaryFileName={"Paying Group"}
        Refresh={true}
        List={true}
        filterRemit={true}
        filterArea={toggleFilter}
        filterEnabled={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        ListData={handleList}
        refresh={toggleRefresh}
        Print={handlePrint}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : mergedColumns
        }
        TableData={paymentMethodType}
      />

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={true}
          message={error}
          closeMessage={closeMessage}
        />
      )}

      {filterOption && (
        <div className="colorWhite agent-filter-section mt-3 p-3">
          <p className="branchSetupTitle">
            Filter
            {errors.countryDescriptionError &&
              errors.paymentModeDescriptionError && (
                <span className="colorRedUser">
                  {" "}
                  * Indicated field value is mandatory
                </span>
              )}
          </p>

          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Country</Label>
                  <span className="container-body-label-color">*</span>
                  <Select
                    onChange={handleChangeSearchCountry}
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
                <FormGroup>
                  <Label for="exampleEmail">Paying group code</Label>
                  <Input
                    type="text"
                    name="payingGroupCode"
                    className="formRadiusBank"
                    value={countryInfo.payingGroupCode}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>

              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Payment mode</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    name="paymentMode"
                    className="formRadiusBank form-select"
                    value={countryInfo.paymentMode}
                    onChange={handleFilterChange}
                  >
                    <option value="Bank Account">Bank Account</option>
                    <option value="Cash">Cash</option>
                  </Input>
                </FormGroup>
              </div>

              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail">Agent code</Label>
                  <Input
                    type="text"
                    name="agentCode"
                    className="formRadiusBank"
                    value={countryInfo.agentCode}
                    onChange={handleFilterChange}
                  ></Input>
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
      {filteredArea && <FiltersSelected value={value} />}
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
            <option value="groupCode" className="cursor">
              Paying Group Code
            </option>
            <option value="groupName" className="cursor">
              Group Name
            </option>
            <option value="countryCode" className="cursor">
              Country Code
            </option>
            <option value="payAgentCode" className="cursor">
              Agent Code
            </option>
            <option value="payAgentName" className="cursor">
              Agent Name
            </option>
            <option value="paymentMethod" className="cursor">
              Payment Mode
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
      <CustomCurrentPage page={"agent"} onClick={navigateTo} />
      {tableShow && (
        <>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className="mt-3" ref={componentRef}>
              <Form form={form} component={false}>
                <CustomHeader
                  TableData={columns.length > 0 ? columns : mergedColumns}
                  componentCell={EditableCell}
                  CustomTableHeader={
                    Array.isArray(paymentMethodType)
                      ? paymentMethodType
                      : [paymentMethodType]
                  }
                  toPrint={toPrint ? true : false}
                  DisableMange={toPrint ? true : false}
                  edit={true}
                />
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RemitAgentTag;
