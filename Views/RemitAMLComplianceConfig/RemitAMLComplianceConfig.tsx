import { useCallback, useEffect, useRef, useState } from "react";
import { FaFilter, FaRegEdit, FaReply } from "react-icons/fa";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Form } from "antd";
import CustomButton from "../../Components/UI/CustomButton";
import {
  AMLInfo,
  EditableCellProps,
  Item,
} from "../../models/AMLcomplianceModel";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  getRemitAMLComplianceList,
  resetUpdateMessage,
  updateRemitAMLCompliance,
} from "../../redux/action/RemitAMLComplianceAction";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";

function RemitAMLComplianceConfig() {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchField, setSearchField] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filterArea, setFilterArea] = useState(false);
  const [searchOption, setSearchOption] = useState(false);
  const [searchUserData, setsearchUserData] = useState("");
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const RemitAMLcomplianceData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitAMLComplianceReducer?.getAllRemitAMLComplianceList
  );

  let compliance = RemitAMLcomplianceData?.data;
  const UpdateRemitAMLcomplianceData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitAMLComplianceReducer?.getRemitAMLComplianceError
  );
  const fetchAllRemitCompliance = useCallback(async () => {
    try {
      dispatch(getRemitAMLComplianceList());
    } catch (err) {}
  }, [dispatch]);

  const updateSelecteAMLData = useCallback(
    async (updatedValues: any) => {
      try {
        dispatch(updateRemitAMLCompliance(updatedValues));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllRemitCompliance();
  }, []);

  useEffect(() => {
    if (UpdateRemitAMLcomplianceData) {
      if (UpdateRemitAMLcomplianceData.data) {
        fetchAllRemitCompliance().then(() => {
          setEditingKey("");
        });
        resetUpdateMessage();
        setApiMessage("Updated Successfully");
        setApiStatus(true);
        setTimeout(function () {
          dispatch(resetUpdateMessage())
          setApiStatus(false);
          setApiMessage("");
        }, 3500);
      } else if (UpdateRemitAMLcomplianceData.error) {
        setApiStatus(false);
        setApiMessage(UpdateRemitAMLcomplianceData.error);
        setEditingKey("");
        setIsLoading(false);
      }
    }
  }, [UpdateRemitAMLcomplianceData]);

  useEffect(() => {
    if (RemitAMLcomplianceData) {
      if (RemitAMLcomplianceData.data) {
        setIsLoading(false);
      } else if (RemitAMLcomplianceData.error) {
        setApiStatus(false);
        setApiMessage(RemitAMLcomplianceData.error);
        setEditingKey("");
      }
    }
  }, [RemitAMLcomplianceData]);

 
  const isEditing = (record: Item) => record.id === editingKey;
  const complianceHeader = [
    {
      title: "Compliance Type",
      dataIndex: "complianceType",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.complianceType.localeCompare(b.complianceType),
      },
    },
    {
      title: "AML List Category",
      dataIndex: "amlListCategory",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.amlListCategory.localeCompare(b.amlListCategory),
      },
    },
    {
      title: "Name Match %",
      dataIndex: "nameMatchPercentage",
      checked: true,
      editable: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nameMatchPercentage.localeCompare(b.nameMatchPercentage),
      },
    },
    {
      title: "Overall Match %",
      dataIndex: "overallMatchPercentage",
      checked: true,
      editable: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.overallMatchPercentage.localeCompare(b.overallMatchPercentage),
      },
    },
    {
      title: "Manage",
      dataIndex: "manage",
      checked: true,
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            {/* <SubmitCancelButton
              button={"Update"}
              secondButton={"Cancel"}
              onSubmit={() => onUpdate(record)}
              onCancel={cancel}
            /> */}
            {/* <button
                type="button"
                className="container-save border-0 text-white"
                onClick={onUpdate}

              >
                Update
              </button> */}
            <CustomButton
              color="danger"
              onClick={() => onUpdate(record)}
              className="btn2 btn--sizer"
            >
              Update
            </CustomButton>
              <button
              type="button"
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={cancel}
              >
                Cancel
              </button>
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div className="manage-button" onClick={() => edit(record)}>
              <FaRegEdit />
            </div>
          </div>
        );
      },
    },
  ];

 

  const edit = (record: any) => {
    form.setFieldsValue({
      complianceType: "",
      amlListCategory: "",
      nameMatchPercentage: "",
      overallMatchPercentage: "",
      id: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const mergedColumns = complianceHeader?.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "nameMatch" ? "dropdown" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

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
    const inputMode = <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0, width: "40%" }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputMode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const onUpdate = async (record:any) => {
    setIsLoading(true);
    const row = await form.validateFields();
    record.nameMatchPercentage = row.nameMatchPercentage;
    record.overallMatchPercentage = row.overallMatchPercentage;
    updateSelecteAMLData(record);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const resetSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const toggleSearch = () => {
    setSearchField(!searchField);
    setFilterArea(false);
  };
  const toggleFiler = () => {
    setSearchField(false);
    setFilterArea(!filterArea);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      compliance = RemitAMLcomplianceData?.data?.filter((e: any | AMLInfo) => {
        return (
          e.complianceType
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.amlListCategory
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.nameMatchPercentage
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.overallMatchPercentage
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      compliance = RemitAMLcomplianceData?.data?.filter((e: any | AMLInfo) => {
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
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const closeMessage = () => {
    setApiMessage("");
  };

  return (
    <div className="RemitAMLComplianceConfig">
      <div className="p-4">
        <CommonHeaderSummary
          RightContent={"Remit AML Compliance Config"}
          SummaryFileName={"Remit AML Compliance Config"}
          List={true}
          ListData={handleList}
          SummaryColumn={
            orginalColumns.length > 0 ? orginalColumns : complianceHeader
          }
          Refresh={true}
          refresh={toggleRefresh}
          filterArea={toggleFiler}
          filter={filterOption}
          search={searchOption}
          searchArea={toggleSearch}
          TableData={compliance}
          Print={handlePrint}
        />
        <CustomResponseMessage
          apiStatus={apiStatus}
          closeMessage={closeMessage}
          message={apiMessage}
        />
        {searchField && (
          <div className="d-flex compliance-search mt-3 p-3">
            <select
              className=" form-select compliance-search-drop ms-2"
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={"Select Field"}
            >
              <option selected>Select Field</option>
              <option value="complianceType">Compliance Type</option>
              <option value="amlListCategory">AML List Category</option>
              <option value="nameMatchPercentage">Name Match %</option>
              <option value="overallMatchPercentage">Oveall Match %</option>
              <option value="any">Any</option>
            </select>
            <Input
              type="text"
              className="ms-1 user-search-input"
              onChange={(ev) => handleSearch(ev)}
            />
            <div className="ms-1">
              <Button color="danger btn--sizer">Search</Button>
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
          <div className="colorWhite compliance-filter-section mt-3 p-3">
            Filter
            <span className="colorRed">
              {" "}
              ** any one field value is mandatory
            </span>
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <FormGroup>
                    <Label for="exampleSelect">Select the Field</Label>
                    <Input
                      type="select"
                      name="complianceType"
                      className="formRadiusCompliance form-select"
                    >
                      <option>Compliance Type</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col filterBtnCompliance dropdown">
                  <FormGroup>
                    <Button className="dropbtn">
                      <FaFilter />
                    </Button>
                    <div className="dropdown-content">
                      <h6 className="texttt">
                        Equal to <br />
                        Contains
                      </h6>
                    </div>
                  </FormGroup>
                </div>
                <div className="col">
                  {" "}
                  <FormGroup className="inputFieldCompliance">
                    <Label for="exampleValue">Enter Value</Label>
                    <Input
                      type="text"
                      name="value"
                      className="formRadiusCompliance"
                    />
                  </FormGroup>
                </div>
                <div className="col">
                  {" "}
                  <FormGroup>
                    <Label for="exampleEmail">Select Field</Label>
                    <Input
                      type="select"
                      name="amlListCategory"
                      className="formRadiusCompliance form-select"
                    >
                      <option>AML List Category</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col filterBtnCompliance dropdown">
                  <FormGroup>
                    <Button className="dropbtn">
                      <FaFilter />
                    </Button>
                    <div className="dropdown-content">
                      <h6 className="texttt">
                        Equal to <br />
                        Contains
                      </h6>
                    </div>
                  </FormGroup>
                </div>
                <div className="col">
                  {" "}
                  <FormGroup className="inputFieldCompliance">
                    <Label for="exampleEmail">Enter Value</Label>
                    <Input
                      type="text"
                      name="value"
                      className="formRadiusCompliance"
                    />
                  </FormGroup>
                </div>
                <div className="col">
                  {" "}
                  <FormGroup>
                    <Label for="exampleEmail">Select the Field</Label>
                    <Input
                      type="select"
                      name="bank"
                      className="formRadiusCompliance form-select"
                    >
                      <option>Name Match %</option>
                      <option>Oveall Match %</option>
                    </Input>
                  </FormGroup>
                </div>
                <div className="col filterBtnCompliance dropdown">
                  <FormGroup>
                    <Button className="dropbtn">
                      <FaFilter />
                    </Button>
                    <div className="dropdown-content">
                      <h6 className="texttt">
                        Equal to <br />
                        contains
                      </h6>
                    </div>
                  </FormGroup>
                </div>
                <div className="col">
                  {" "}
                  <FormGroup className="inputFieldCompliance">
                    <Label for="exampleEmail">Enter Value</Label>
                    <Input
                      type="text"
                      name="value"
                      className="formRadiusCompliance"
                    />
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-4">
              <Button className="backBtnAgent">Reset</Button>
              <Button className="nextBtnAgent">Submit</Button>
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
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <div className="mt-3" ref={componentRef}>
            <Form form={form} component={false}>
              <CustomHeader
                TableData={columns.length > 0 ? columns : mergedColumns}
                componentCell={EditableCell}
                CustomTableHeader={compliance}
                toPrint={columns.length > 0 && toPrint ? true : false}
                DisableMange={columns.length > 0 && toPrint ? true : false}
                Edit={true}
                editUser={edit}
              />
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

export default RemitAMLComplianceConfig;
