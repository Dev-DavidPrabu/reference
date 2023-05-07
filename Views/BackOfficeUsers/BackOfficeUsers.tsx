import { Form } from "antd";
import { useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { BackOfficeUsersInfo } from "../../models/BackOfficeUsersModel";
import "./BackOfficeUsers.scss";

const BackOfficeUsers = (props: any) => {
  const [columns, setcolumns] = useState([]);
  const [filterOption, setfilterOption] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");

  const [showTableModal, setTableModal] = useState(false);

  const componentRef = useRef<any>();
  const [form] = Form.useForm();

  let backOfficeUsersData = [
    {
      userId: "albert@test.com",
      fullName: "Albert Jhanson",
      role: "Back Office Admin",
      phoneNumber: "0192227232",
      status: "Active",
    },
    {
      userId: "berlin@test.com",
      fullName: "Berlin Macron",
      role: "Topup Approver V3",
      phoneNumber: "0192227237",
      status: "Active",
    },
    {
      userId: "carol@test.com",
      fullName: "Carol Simon",
      role: "Payroll Onboarding Maker",
      phoneNumber: "0192227236",
      status: "Deleted",
    },
    {
      userId: "jianran@test.com",
      fullName: "Jian Ran",
      role: "Payroll Test Role",
      phoneNumber: "0192227235",
      status: "Active",
    },
    {
      userId: "emily@test.com",
      fullName: "Emily Ian",
      role: "E-Terminal Maker",
      phoneNumber: "0192227234",
      status: "Deleted",
    },
  ];

  const backOfficeHeader = [
    {
      title: "User Id",
      dataIndex: "userId",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.userId.localeCompare(b.userId),
      },
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) => a.role.localeCompare(b.role),
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      editable: true,
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "Active" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
  ];

  const toggleFiler = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
  };
  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/user-Management/Back-Office-Users/Add",
      state: "",
      action: "add",
    });
  };

  const editBackOffice = (e: any) => {
    props.history.push({
      pathname: "/dashboard/user-Management/Back-Office-Users/Edit",
      state: e,
      action: "edit",
    });
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      backOfficeUsersData = backOfficeUsersData.filter(
        (e: any | BackOfficeUsersInfo) => {
          return (
            e.userId.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.fullName.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.phoneNumber
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.role.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.status.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      backOfficeUsersData = backOfficeUsersData.filter(
        (e: any | BackOfficeUsersInfo) => {
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

    setTableModal(!showTableModal);
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Back Office Users"}
        Add={true}
        AddAction={handleAdd}
        filterArea={toggleFiler}
        filter={filterOption}
        searchArea={toggleSearch}
        search={searchArea}
        List={handleList}
        SummaryColumn={columns.length > 0 ? columns : backOfficeHeader}
      />

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

            <option value="userId" className="cursor">
              User Id
            </option>
            <option value="fullName" className="cursor">
              Full Name
            </option>
            <option value="role" className="cursor">
              Role
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
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger">Search</Button>
          </div>
          <div>
            <Button className="text-white  border-0 ms-1">
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      <div className="mt-3" ref={componentRef}>
        <Form form={form} component={false}>
          <CustomHeader
            TableData={columns.length > 0 ? columns : backOfficeHeader}
            editToggle={true}
            Delete={true}
            CustomTableHeader={backOfficeUsersData}
            editUser={editBackOffice}
          />
        </Form>
      </div>
    </div>
  );
};

export default BackOfficeUsers;
