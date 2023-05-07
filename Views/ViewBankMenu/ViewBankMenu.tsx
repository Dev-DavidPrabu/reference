import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ViewBankMenu.scss";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";

import { useHistory, useLocation } from "react-router";
import { Button } from "reactstrap";
import { GoPlus } from "react-icons/go";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
import { Input, Form, Select } from "antd";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  getVendorList,
  editVendorStatus,
} from "../../redux/action/BankMenuActions";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";

interface Item {
  key: string;
  vendorName: string;
  vendorStatus: string;
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

function ViewBankMenu() {
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [altercolumns, setAltercolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [vendorStatus, updateVendorStatus]: any = useState({
    bankCode: location?.state.value.bankCode,
    bankName: location?.state.value.bankName,
    vendorName: "",
    vendorStatus: "",
  });
  const option = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const columns = [
    {
      title: "Vendor",
      dataIndex: "vendorName",
      key: "vendorName",
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.vendorName.localeCompare(b.vendorName),
      },
    },

    {
      title: "Status",
      dataIndex: "vendorStatus",
      key: "vendorStatus",
      editable: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.vendorStatus.localeCompare(b.vendorStatus),
      },
      render: (vendorStatus: any) => {
        return (
          <label
            className={` ${
              vendorStatus === "Active" ? "text-success" : "text-danger"
            }`}
          >
            {vendorStatus}
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
          <span>
            <CustomButton
              color="danger Reference-DefaultButton customerEdit-btn"
              onClick={(e) => vendorStatus_Onsubmit(e,record)}
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
          </span>
        ) : (
          <div className="d-flex  cursor ">
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

  const listOfVendors: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.BankMenuReducer.getAllVendorListResponse
  );
  let vendorList: any = listOfVendors?.data;
  vendorList = listOfVendors?.data?.map((value: any, id) => ({
    key: id.toString(),
    vendorName: value.vendorName,
    vendorStatus: value.vendorStatus,
  }));

  let data = vendorList;

  const date = new Date().toLocaleString();
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  // const fetchVendorList = useCallback(() => {
  //   try {
  //     dispatch(getVendorList(location?.state?.value.bankName));
  //   } catch (err) {}
  // }, [dispatch]);

  const fetchVendorList = useCallback(async () => {
    try {
      dispatch(getVendorList(location?.state?.value.bankName));
    } catch (err) {}
  }, [dispatch]);

  // useEffect(() => {
  //   fetchVendorList();
  // }, [fetchVendorList]);
  useEffect(() => {
    if (listOfVendors) {
      if (listOfVendors?.data) {
        setIsLoading(false);
      }
    }
  }, [listOfVendors]);

  useEffect(() => {
    fetchVendorList().then(() => {
      if (!listOfVendors?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchVendorList]);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "vendorStatus" ? "dropdown" : "text",
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
            updateVendorStatus({ ...vendorStatus, vendorStatus: value });
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
    form.setFieldsValue({ vendorName: "", vendorStatus: "", ...record });
    updateVendorStatus({
      ...vendorStatus,
      vendorName: record?.vendorName,
      vendorStatus: record?.vendorStatus,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const vendorStatus_Onsubmit = (e:any,record: Item) => {
    e.preventDefault();
    dispatch(editVendorStatus(vendorStatus));
  };

  const handle_bankAdd = () => {
    history.push({
      pathname: "/dashboard/bank-Vendor-Mapping/Add-Bank",
      state: {
        addedBanks: location?.state.addedBanks,
        value: {
          vendorAdd: false,
        },
      },
    });
  };

  const handle_vendorAdd = () => {
    history.push({
      pathname: "/dashboard/bank-Vendor-Mapping/Add-Bank",
      state: {
        addedBanks: location?.state.addedBanks,
        addedVendors: vendorList,
        value: {
          vendorAdd: true,
          bankName: location?.state.value.bankName,
          bankStatus: location?.state.value.bankStatus,
          bankCode: location?.state.value.bankCode,
        },
      },
    });
  };

  const handlePrint = (e: any) => {
    setPrint(!toPrint);
    setAltercolumns(e);
  };

  const handle_Cancel = () => {
    history.goBack();
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
          e.vendorName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.vendorStatus.toUpperCase().includes(searchUserData.toUpperCase())
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
    <div className="ViewBankmenu">
      <div className="px-3">
        <CommonHeaderSummary
          RightContent={"View Bank Menu"}
          SummaryFileName={"View Bank Menu"}
          SummaryColumn={columns}
          TableData={vendorList}
          Print={handlePrint}
          Add={true}
          AddAction={handle_bankAdd}
          filterLeft={false}
          searchArea={toggleSearch}
          search={searchArea}
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

            <option value="vendorName" className="cursor">
              Vendor Name
            </option>
            <option value="vendorStatus" className="cursor">
              Vendor Status
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
            <Button color="danger kyc-FilterSearchButton">Search</Button>
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
      <div className="d-flex justify-content-between align-items-center m-3 ">
        <div className="col-7 p-3" style={{ background: "#f3f3f3" }}>
          <div className="col d-flex">
            <div className="col-1.5 p-2 ">
              <label className="edit-sum-label">Bank Name</label>
            </div>
            <div className="col-4.5 p-1">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state.value.bankName}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
            <div className="col-1.5 p-2">
              <label className="edit-sum-label">Status</label>
            </div>
            <div className="col-4.5 p-1">
              <input
                className="border-0 edit-sum-input form-control"
                type="text"
                value={location?.state.value.bankStatus}
                style={{
                  background: "#CFCFCF",
                  width: "100%",
                  borderRadius: "0px",
                }}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="d-flex">
          <CustomButton
            color="secondary referenceData-cancelButton customerEdit-btn"
            className="btn2"
            component={"payrollEnquiry"}
            onClick={handle_Cancel}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
            Back
          </CustomButton>

          <CustomButton
            color="danger Reference-DefaultButton customerEdit-btn"
            className="btn2"
            id="addUser"
            data-testid="add"
            onClick={handle_vendorAdd}
          >
            <GoPlus />
            Add Vendor
          </CustomButton>
        </div>
      </div>
      <div className="mt-3" ref={componentRef}>
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
                {"View Bank Menu"}
              </h3>
            </>
          )}
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <>
            <CustomTable
            componentCell={EditableCell}
            CustomTableHeader={data}
            TableData={altercolumns.length > 0 ? altercolumns : mergedColumns}
            edit={true}
            editUser={edit}
            toPrint={toPrint ? true : false}
            DisableMange={toPrint ? true : false}
          />
          {altercolumns.length > 0 && (
            <p style={{ color: "red", marginTop: "5px" }}>Date : {date}</p>
            )}
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default ViewBankMenu;
