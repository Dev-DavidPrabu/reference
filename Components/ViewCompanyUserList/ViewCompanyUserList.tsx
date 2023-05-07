import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import { Form } from "antd";
import CustomHeader from "../CustomTable/CustomTable";
import { getViewCompanyUser } from "../../redux/action/ViewCompanyUserListAction";
import { IoArrowUndoOutline } from "react-icons/io5";
import "./ViewCompanyUserList.scss";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { ViewcompanyUserListInfo } from "../../models/ViewCompanyUserListModele";

const ViewCompanyUserList = (props: any) => {
  const [form] = Form.useForm();
  const [filterOption, setfilterOption] = useState(false);

  const [searchArea, setSearchArea] = useState(false);

  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");

  const [userInfo, setUserInfo] = useState({
    id: "",
    companyName: "",
    companyAccountId: "",
    companyRegistrationNo: "",
  });

  useEffect(() => {
    if (props.location.state !== undefined) {
      setUserInfo(props.location.state);
    }
  }, [props.location.state]);
  let getViewCompanyList = useSelector(
    (state: RootStateOrAny) =>
      state.ViewCompanyUserListReducer.getViewompanyUserResponse
  );

  const fetchViewCompany = useCallback(
    async (id: any) => {
      try {
        dispatch(getViewCompanyUser(id));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (userInfo.id) {
      fetchViewCompany(userInfo.id);
    }
  }, [userInfo.id]);

  let companyList = getViewCompanyList?.data;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    companyList = companyList?.map((e: any) => {
      e.recordStatus = e.recordStatus == "D" ? "INACTIVE" : "ACTIVE";
    });
  }, [companyList]);

  const companyUserListHeader = [
    {
      title: "Login id",
      dataIndex: "loginId",
      key: "loginId",
      sorter: {
        compare: (a: any, b: any) => a.loginId.localeCompare(b.loginId),
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Phone Number",
      dataIndex: "userMobileNumber",
      key: "userMobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.userMobileNumber.localeCompare(b.userMobileNumber),
      },
    },
    {
      title: "Company Register No",
      dataIndex: "companyRegistrationNo",
      key: "companyRegistrationNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.companyRegistrationNo.localeCompare(b.companyRegistrationNo),
      },
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      sorter: {
        compare: (a: any, b: any) => a.companyName.localeCompare(b.companyName),
      },
    },
    {
      title: "Status",
      dataIndex: "recordStatus",
      key: "recordStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.recordStatus.localeCompare(b.recordStatus),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
        return (
          <label
            className={` ${value === "ACTIVE" ? "textSuccess" : "textDanger"}`}
          >
            {value}
          </label>
        );
      },
    },
  ];
  const toggleFilter = () => {
    setfilterOption(!filterOption);

    setSearchArea(false);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setcolumns([]);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const handleAdd = () => {
    props.history.push({
      pathname:
        "/dashboard/Company-UserScreen/Company-User/View-Company-User-List/View-Company-User-Add",
      state: userInfo,
    });
  };
  const cancelEvent = () => {
    props.history.push({
      pathname: "/dashboard/Company-UserScreen/Company-User",
    });
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      companyList = companyList.filter((e: any | ViewcompanyUserListInfo) => {
        return (
          e.loginId.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.userName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.userMobileNumber
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.companyRegistrationNo
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.companyName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.recordStatus.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      companyList = companyList.filter((e: any | ViewcompanyUserListInfo) => {
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

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Users"}
        SummaryFileName={"Users"}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        filter={false}
        searchArea={toggleSearch}
        search={searchArea}
        FieldList={handleList}
        Add={true}
        AddAction={handleAdd}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : companyUserListHeader
        }
        Print={handlePrint}
        TableData={Array.isArray(companyList) ? companyList : [companyList]}
      />
      <button className="ViewCompanyback border-0" onClick={cancelEvent}>
        <IoArrowUndoOutline />
        Back
      </button>
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

            <option value="loginId" className="cursor">
              Login id
            </option>
            <option value="userName" className="cursor">
              User Name
            </option>
            <option value="userMobileNumber" className="cursor">
              Phone Number
            </option>
            <option value="companyRegistrationNo" className="cursor">
              Company Register No
            </option>
            <option value="companyName" className="cursor">
              Company Name
            </option>
            <option value="recordStatus" className="cursor">
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
            <Button className="searchBtnAccount">Search</Button>
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

      <div className="mt-5" ref={componentRef}>
        <Form form={form} component={false}>
          <CustomHeader
            TableData={columns.length > 0 ? columns : companyUserListHeader}
            CustomTableHeader={
              Array.isArray(companyList) ? companyList : [companyList]
            }
            toPrint={columns.length > 0 ? true : false}
            DisableMange={true}
          />
        </Form>
      </div>
    </div>
  );
};

export default ViewCompanyUserList;
