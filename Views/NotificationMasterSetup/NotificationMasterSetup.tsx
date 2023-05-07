import { Form, Input } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { Button} from "reactstrap";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomButton from "../../Components/UI/CustomButton";
import {
  EditableCellProps,
  NotificationModel,
} from "../../models/NotificationMasterModel";
import {
  getAllMasterData,
  resetMasterInfo,
  updateMasterSetup,
} from "../../redux/action/NotificationMasterAction";
import "./NotificationMasterSetup.scss";

const NotificationMasterSetup = (props: any) => {
  const dispatch = useDispatch();
  const [editingKey, setEditingKey] = useState("");
  const [filterOption, setfilterOption] = useState(false);
  const [status, setStatus] = useState(true);
  const [category, setCategory] = useState("");
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [searchField, setSearchField] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let filterInput = [
    {
      header: "Notification ID",
      type: "text",
    },
    {
      header: "Descrioption",
      type: "text",
    },
    {
      header: "Module",
      type: "select",
    },
    {
      header: "Parameter",
      type: "select",
    },
    {
      header: "Category",
      type: "select",
    },
    {
      header: "Action Flag",
      type: "text",
    },
  ];
  const isEditing = (record: NotificationModel) => record.id === editingKey;
  const notificationHeader = [
    {
      title: "Notification ID",
      dataIndex: "notificationId",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationId.localeCompare(b.notificationId),
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.description.localeCompare(b.description),
      },
    },
    {
      title: "Module",
      dataIndex: "moduleDepedency",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.moduleDepedency.localeCompare(b.moduleDepedency),
      },
    },
    {
      title: "Parameter",
      dataIndex: "parameters",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.parameters.localeCompare(b.parameters),
      },
      enabled: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      checked: true,
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.category - b.category,
      },
      enabled: true,
      render: (category: any) => (
        <div>
          {category === "T"
            ? "Topup"
            : category === "SP"
            ? "Spend-Money"
            : category === "I"
            ? "Important"
            : "Others"}
        </div>
      ),
    },
    {
      title: "Active Flag",
      dataIndex: "enabled",
      checked: true,
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.enabled - b.enabled,
      },
      render: (flag: any) => (
        <div className={`${flag ? "text-success" : "text-danger"}`}>
          {flag ? "ACTIVE" : "INACTIVE"}
        </div>
      ),
    },
    {
      title: "Manage",
      dataIndex: "manage",
      checked: true,
      editable: false,
      render: (_: any, record: NotificationModel) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            <CustomButton
              color="danger"
              onClick={() => onUpdate(record)}
              className="btn2 btn--sizer"
            >
              Update
            </CustomButton>
            <CustomButton
              color="secondary"
              className="btn2 btn--sizer"
              component={"payrollEnquiry"}
              onClick={cancel}
            >
              Cancel
            </CustomButton>
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div className="manage-button" onClick={() => handleView(record)}>
              <BsEye />
            </div>
            <div className={"ms-2 manage-button"} onClick={() => edit(record)}>
              <FaRegEdit />
            </div>
          </div>
        );
      },
    },
  ];
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const NotificationMasterData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationMasterReducer?.getMasterResponse
  );
  const updateMasterData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationMasterReducer?.updateMasterResponse
  );
  useEffect(() => {
    if (NotificationMasterData) {
      if (NotificationMasterData.data) {
        setIsLoading(false);
        cancel();
      }
    }
  }, [NotificationMasterData]);
  useEffect(() => {
    if (updateMasterData) {
      if (updateMasterData.data) {
        fetchMasterData();
        resetMasterInfo();
        setApiStatus(true);
        setApiMessage("Master Setup Updated Successfully");
        cancel();
      } else if (updateMasterData.error) {
        setApiMessage(updateMasterData.message);
        setApiStatus(false);
        setIsLoading(false);
        cancel();
      }
    }
  }, [updateMasterData]);
  const fetchMasterData = useCallback(async () => {
    try {
      dispatch(getAllMasterData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchMasterData();
  }, [fetchMasterData]);

  let headerChange = columns?.length > 0 ? columns : notificationHeader;

  const mergedColumns = headerChange.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: NotificationModel) => ({
        record,
        inputType:
          col.dataIndex === "enabled"
            ? "dropdown"
            : col.dataIndex === "category"
            ? "dropdown2"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleStatus = (e: any) => {
    setStatus(e.target.value === "true");
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const onUpdate = (record: NotificationModel) => {
    setIsLoading(true);
    var updateBody = JSON.stringify({
      notificationId: record.notificationId,
      description: record.description,
      moduleDepedency: record.moduleDepedency,
      parameters: record.parameters,
      enabled: status,
      id: record.id,
      category: category,
    });
    try {
      dispatch(updateMasterSetup(updateBody));
    } catch (err) {}
  };
  const cancel = () => {
    setEditingKey("");
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

  const handleView = (e: any) => {
    props.history.push({
      pathname: "/dashboard/notification-master-view",
      state: e,
    });
  };
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
        <select
          name="display_address"
          className="border-0 p-2"
          onChange={(e) => handleStatus(e)}
        >
          <option value={"false"}>InActive</option>
          <option value={"true"}>Active</option>
        </select>
      ) : dataIndex === "category" ? (
        <select
          name="display_address"
          className="border-0 p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value={"T"}>Topup</option>
          <option value={"SP"}>Spend-Money</option>
          <option value={"I"}>Important</option>
          <option value={"O"}>Others</option>
        </select>
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
  const [form] = Form.useForm();
  const edit = (record: Partial<NotificationModel> | any) => {
    form.setFieldsValue({ enabled: "", ...record });
    setEditingKey(record.id);
  };
  const editNotification = (e: any) => {
    edit(e);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchField(false);
  };
  const resetSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const toggleOption = () => {
    setSearchField(!searchField);
    setfilterOption(false);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const onCancel = () => {};
  const closeMessage = () => {
    setApiMessage("");
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
  };

  let masterData = NotificationMasterData?.data;

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      masterData = masterData.filter((e: any | NotificationModel) => {
        return (
          e.notificationId
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.description
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.moduleDepedency
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.parameters?.toUpperCase().includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      masterData = masterData.filter((e: any | NotificationModel) => {
        if (
          e[searchCategory].toUpperCase().includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }
  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Notification Master Setup"}
        SummaryFileName={"Notification Master Setup"}
        SummaryColumn={
          orginalColumns?.length > 0 ? orginalColumns : notificationHeader
        }
        TableData={masterData}
        Print={handlePrint}
        filterArea={toggleFilter}
        filter={filterOption}
        List={true}
        ListData={handleList}
        searchArea={toggleOption}
        search={searchField}
        Refresh={true}
        refresh={toggleRefresh}
      />
      {searchField && (
        <div className="d-flex notification-master-search mt-3 p-3">
          <select
            className=" form-select user-search-drop  ms-2"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected>Select Field</option>
            <option value="notificationId">Notification Id</option>
            <option value="description">Description</option>
            <option value="moduleDepedency">Module</option>
            <option value="parameters">Parameter</option>
            <option value="any">Any</option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input "
            onChange={(ev) => handleSearch(ev)}
          />
         <div className="ms-3 mt-1">
            <Button color="danger" className="btn--sizer">Search</Button>
          </div>
          <div className="ms-3 mt-1">
            <Button
              className="text-white  border-0 m"
              onClick={() => resetSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      {filterOption && (
        <div className="notification-master-filter mt-3 p-3">
          <div className="d-flex text-white justify-content-between">
            <div className="notification-master-title">Filter</div>
            <div className="notification-master-message">
              ** any one field value is mandatory
            </div>
          </div>
          <div className="d-flex mt-3">
            {filterInput.map((e) => {
              return (
                <div className="notification-master-input-field">
                  <div className="text-white d-inline-block">{e.header}</div>
                  {e.type == "text" ? (
                    <input className="notification-master-input border-0" />
                  ) : (
                    <select className="form-select notification-master-input">
                      {" "}
                      <option></option>
                    </select>
                  )}
                </div>
              );
            })}
          </div>
          <div className="d-flex mt-3 justify-content-end">
            <button className="notification-master-save border-0 text-white">
              Submit
            </button>
            <button
              className="notification-master-cancel border-0 ms-3"
              onClick={onCancel}
            >
              Reset
            </button>
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
      <CustomResponseMessage
        apiStatus={apiStatus}
        closeMessage={closeMessage}
        message={apiMessage}
      />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            <CustomHeader
              componentCell={EditableCell}
              TableData={columns.length > 0 ? columns : mergedColumns}
              CustomTableHeader={masterData}
              editUser={editNotification}
              viewUser={handleView}
              view={true}
              edit={true}
              Edit={true}
              Delete={false}
              toPrint={toPrint ? true : false}
              DisableMange={toPrint ? true : false}
            />
          </Form>
        </div>
      )}
    </div>
  );
};

export default NotificationMasterSetup;
