import { useCallback, useEffect, useRef, useState } from "react";
import { FaFilter, FaRegEdit, FaReply } from "react-icons/fa";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "./AMLcompliance.scss";
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
import {
  getAllAMLcomplianceData,
  resetUpdateComplianceData,
  updateAMLcomplianceData,
} from "../../redux/action/AMLcomplianceAction";
import { useReactToPrint } from "react-to-print";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";

const AMLcompliance = (props: any) => {
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

  const AMLcomplianceData = useSelector(
    (state: RootStateOrAny) =>
      state.AMLcomplianceReducer?.getAMLcomplianceResponse
  );

  let compliance = AMLcomplianceData?.data;
  const UpdateAMLcomplianceData = useSelector(
    (state: RootStateOrAny) =>
      state.AMLcomplianceReducer?.updateAMLcomplianceResponse
  );
  const fetchAllCompliance = useCallback(async () => {
    try {
      dispatch(getAllAMLcomplianceData());
    } catch (err) {}
  }, [dispatch]);

  const updateSelecteAMLData = useCallback(
    async (updatedValues: any) => {
      try {
        dispatch(updateAMLcomplianceData(updatedValues));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllCompliance();
  }, []);

  useEffect(() => {
    if (UpdateAMLcomplianceData) {
      if (UpdateAMLcomplianceData.data) {
        fetchAllCompliance().then(() => {
          setEditingKey("");
        });
        resetUpdateComplianceData();
        setApiStatus(true);
        setApiMessage("Updated Successfully");
        setTimeout(function () {
          dispatch(resetUpdateComplianceData());
          setApiStatus(false);
          setApiMessage("");
        }, 3500);
      } else if (UpdateAMLcomplianceData.error) {
        setApiStatus(false);
        setApiMessage(UpdateAMLcomplianceData.error);
        setEditingKey("");
        setIsLoading(false);
      }
    }
  }, [UpdateAMLcomplianceData]);

  useEffect(() => {
    if (AMLcomplianceData) {
      if (AMLcomplianceData.data) {
        setIsLoading(false);
      } else if (AMLcomplianceData.error) {
        setApiStatus(false);
        setApiMessage(AMLcomplianceData.error);
        setEditingKey("");
      }
    }
  }, [AMLcomplianceData]);

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
            {/* <CustomButton
           
              color="danger"
              onClick={() => onUpdate(record)}
              className="btn2 Btn--block"
            >
              Update
            </CustomButton>
            <CustomButton color="secondary" className="btn2 Btn--block" onClick={cancel}>
              Cancel
            </CustomButton> */}
            <button
              className="container-save border-0 text-white"
              onClick={() => onUpdate(record)}
            >
              Update
            </button>
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

  const onUpdate = async (record: Item) => {
    setIsLoading(true);
    const row = await form.validateFields();
    record.nameMatchPercentage = row.nameMatchPercentage;
    record.overallMatchPercentage = row.overallMatchPercentage;
    updateSelecteAMLData(record);
  };

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
      compliance = AMLcomplianceData.data.filter((e: any | AMLInfo) => {
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
      compliance = AMLcomplianceData?.data.filter((e: any | AMLInfo) => {
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
    setSearchField(false);
    setsearchUserData("");
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
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"AML Compliance Config"}
        SummaryFileName={"AML Compliance Config"}
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
            placeholder="Type your search keyword"
            onChange={(ev) => handleSearch(ev)}
          />
          <div className="ms-1">
            <Button color="danger" className="btn--sizer">
              Search
            </Button>
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
          <span className="colorRed"> ** any one field value is mandatory</span>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <FormGroup>
                  <Label for="exampleSelect">Select the Field</Label>
                  <Input
                    type="select"
                    name="complianceType"
                    className="formRadiusCompliance form-select"
                    placeholder="Compliance Type"
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
                    placeholder="Enter value"
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
                    placeholder="AML List Category"
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
                    placeholder="Enter value"
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
                    placeholder="bank"
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
                    placeholder="Enter value"
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
  );
};

export default AMLcompliance;
