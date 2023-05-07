import React, { useCallback, useEffect, useRef, useState } from "react";
import "./BankPaymentGatewayMapping.scss";
import { useHistory } from "react-router";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import {
  editBankStatus,
  getBankList,
} from "../../redux/action/BankMenuActions";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { Input, Form, Select } from "antd";
import CustomButton from "../../Components/UI/CustomButton";
import { BsEye } from "react-icons/bs";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import { Button } from "reactstrap";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";

interface Item {
  key: string;
  bankName: string;
  bankStatus: string;
  bankCode: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "dropdown" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

function BankPaymentGatewayMapping() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [altercolumns, setAltercolumns] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [bankStatus, updateBankStatus]: any = useState({
    bankCode: "",
    bankName: "",
    bankStatus: "",
  });
  const option = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];
  const columns = [
    {
      title: "Bank",
      dataIndex: "bankName",
      key: "bankName",
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.bankName.localeCompare(b.bankName),
      },
    },

    {
      title: "Status",
      dataIndex: "bankStatus",
      key: "bankStatus",
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.bankStatus.localeCompare(b.bankStatus),
      },
      render: (bankStatus: any) => {
        let value = bankStatus.toString().toUpperCase();
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
      title: "Manage",
      dataIndex: "manage",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="d-flex">
            <CustomButton
              color="danger Reference-DefaultButton customerEdit-btn"
              onClick={(e) => bankStatus_Onsubmit(e,record)}
              className="btn2"
            >
              Save
            </CustomButton>
            <CustomButton
              color="secondary referenceData-cancelButton customerEdit-btn"
              className="btn2"
              component={"payrollEnquiry"}
              onClick={cancel}
            >
              Cancel
            </CustomButton>
            {/* <button
                className="container-save border-0 text-white"
              >
                Save
              </button>
              <button
              type="button"
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={cancel}
              >
                Cancel
              </button> */}
          </div>
        ) : (
          <div className="d-flex  cursor">
            <div
              className="manage-button disable-background"
              onClick={() => handleView(record)}
            >
              <BsEye />
            </div>
            <div
              className={"ms-2 manage-button disable-background"}
              onClick={() => edit(record)}
            >
              <FaRegEdit />
            </div>
          </div>
        );
      },
    },
  ];

  const listOfBanks: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.BankMenuReducer.getAllBankListResponse
  );
  let bankList: any = listOfBanks?.data;
  bankList = listOfBanks?.data?.map((value: any, id: number) => ({
    key: id.toString(),
    bankCode: value.bankCode,
    bankName: value.bankName,
    bankStatus: value.bankStatus,
  }));
  const date = new Date().toLocaleString();
  let data = bankList;
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchBankList = useCallback(async () => {
    try {
      dispatch(getBankList());
    } catch (err) {}
  }, [dispatch]);
  
  // const fetchBankList = useCallback(() => {
  //   try {
  //     dispatch(getBankList());
  //   } catch (err) {}
  // }, [dispatch]);

  useEffect(() => {
    fetchBankList().then(() => {
      if (!listOfBanks?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchBankList]);

  useEffect(() => {
    if (listOfBanks) {
      if (listOfBanks?.data) {
        setIsLoading(false);
      }
    }
  }, [listOfBanks]);

  // useEffect(() => {
  //   fetchBankList();
  // }, [fetchBankList]);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "bankStatus" ? "dropdown" : "text",
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
    const inputNode =
      inputType === "dropdown" ? (
        <Select
          options={option}
          onChange={(value: string) => {
            updateBankStatus({ ...bankStatus, bankStatus: value });
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

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ bankName: "", bankStatus: "", ...record });
    updateBankStatus({
      ...bankStatus,
      bankName: record?.bankName,
      bankStatus: record?.bankStatus,
      bankCode: record?.bankCode,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const bankStatus_Onsubmit = (e:any,record: Item) => {
    e.preventDefault()
    setIsLoading(true);
    dispatch(editBankStatus(bankStatus));
  };

  const handleView = (e: any) => {
    history.push({
      pathname: "/dashboard/bank-Vendor-Mapping/View-Bank",
      state: {
        addedBanks: bankList,
        value: e,
      },
    });
  };

  const handle_bankAdd = () => {
    history.push({
      pathname: "/dashboard/bank-Vendor-Mapping/Add-Bank",
      state: {
        addedBanks: bankList,
        value: {
          vendorAdd: false,
        },
      },
    });
  };

  const handlePrint = (e: any) => {
    setPrint(!toPrint);
    setAltercolumns(e);
  };

  const cancelPrint = () => {
    setPrint(!toPrint);
    setAltercolumns([]);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      data = data.filter((e: any | ToggleSummaryInfo) => {
        return (
          e.bankName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.bankStatus.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      data = data.filter((e: any | ToggleSummaryInfo) => {
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

  return (
    <div className="bankMangement">
      <div className="toggleSummary">
        <div className="px-3 mt-2">
          <CommonHeaderSummary
            RightContent={"FPX Bank Setup"}
            SummaryFileName={"FPX Bank Setup"}
            SummaryColumn={columns}
            TableData={bankList}
            Print={handlePrint}
            filterLeft={false}
            searchArea={toggleSearch}
            search={searchArea}
            Add={true}
            AddAction={handle_bankAdd}
          />
        </div>
        {searchArea && (
          <div
            className="d-flex user-search mt-3 p-3 "
            style={{ marginLeft: "20px", marginRight: "15px", width: "auto" }}
          >
            <select
              className=" form-select user-search-drop ms-2 "
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={"Select Field"}
            >
              <option selected hidden className="cursor">
                Select Field
              </option>

              <option value="bankName" className="cursor">
                bank Name
              </option>
              <option value="bankStatus" className="cursor">
                bank Status
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
              <Button color="danger kyc-FilterSearchButton btn--sizer">Search</Button>
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

        <div className="mt-3">
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
        </div>
        <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
        <div className="px-3" ref={componentRef}>
          <Form form={form} component={false}>
            {altercolumns.length > 0 && (
              <>
                <h3
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  Merchant Trade Asia
                </h3>
                <h3
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {"FPX Bank Setup"}
                </h3>
              </>
            )}
            <CustomTable
              componentCell={EditableCell}
              TableData={altercolumns.length > 0 ? altercolumns : mergedColumns}
              CustomTableHeader={data}
              view={true}
              edit={true}
              editUser={edit}
              viewUser={handleView}
              toPrint={altercolumns.length > 0 ? true : false}
              DisableMange={altercolumns.length > 0 ? true : false}
            />
            {altercolumns.length > 0 && (
              <p style={{ color: "red", marginTop: "5px" }}>Date : {date}</p>
            )}
          </Form>
        </div>
          )}
      </div>
    </div>
  );
}

export default BankPaymentGatewayMapping;
