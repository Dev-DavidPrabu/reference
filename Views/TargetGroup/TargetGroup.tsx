import React, { useCallback, useEffect, useRef, useState } from "react";
import "./TargetGroup.scss";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  deleteTargetGroup,
  getTargetGroupList,
  resetTargetGroupByCustomersCreateMessage,
  resetTargetGroupByCustomersEditMessage,
} from "../../redux/action/TargetGroupAction";
import { AiOutlineDelete } from "react-icons/ai";

function TargetGroup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);

  const Header = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.groupName?.toString().localeCompare(b.groupName?.toString()),
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.createdDate?.toString().localeCompare(b.createdDate?.toString()),
      },
      render: (createdDate: any) => {
        let value = createdDate?.replace("T"," ");
        return (
          <label>
            {value}
          </label>
        );
      },
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.createdBy?.toString().localeCompare(b.createdBy?.toString()),
      },
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.updatedBy?.toString().localeCompare(b.updatedBy?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.statusCode?.toString().localeCompare(b.statusCode?.toString()),
      },
      render: (status: any) => {
        let value = status.toString().toUpperCase();
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
      key: "manage",
      checked: true,
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">
              <div
                className={`ms-2 manage-button cursor disable-background`}
                onClick={() => handleEdit(record)}
              >
                <FaRegEdit />
              </div>
              {record?.statusCode === "INACTIVE" && (
                <div
                  className={`ms-2 manage-button cursor disable-background`}
                  onClick={() => handleDelete(record)}
                >
                  <AiOutlineDelete />
                </div>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const targetGroupData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.TargetGroupReducer.getAllTargetGroupList
  );
  const targetGroupCustomersCreate: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getTargetGroupByCustomersError
  );

  const targetGroupUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getTargetGroupByCustomersEditError
  );

  let targetGroupList = targetGroupData?.data;

  const fetchTargetGroupdata = useCallback(async () => {
    try {
      dispatch(getTargetGroupList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchTargetGroupdata().then(() => {
      if (!targetGroupData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchTargetGroupdata]);

  useEffect(() => {
    if (targetGroupData) {
      if (targetGroupData.data) {
        setIsLoading(false);
      }
    }
  }, [targetGroupData]);

  useEffect(() => {
    if (targetGroupCustomersCreate?.status === 200) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetTargetGroupByCustomersCreateMessage());
      }, 3000);
    }
  }, [targetGroupCustomersCreate]);

  useEffect(() => {
    if (targetGroupUpdate?.status === 200) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetTargetGroupByCustomersEditMessage());
      }, 3000);
    }
  }, [targetGroupUpdate]);

  const handleEdit = (e: any) => {
    if (e?.targetGroupByCustomer) {
      history.push({
        pathname:
          "/dashboard/marketing/Target-Group-Setup/Edit-Target-Group-By-Customers",
        state: {
          value: e,
        },
      });
    }
  };

  const handle_TargetGroupAdd = () => {
    history.push({
      pathname:
        "/dashboard/marketing/Target-Group-Setup/Add-Target-Group-By-Customers",
    });
  };

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteTargetGroup(recordId));
      } catch (err) {}
    },
    [dispatch]
  );

  const handlePrint = (data: any) => {
    setSearchArea(false);
    setPrint(!toPrint);
    setcolumns(data);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const toggleRefresh = () => {
    setSearchArea(false);
    setcolumns([]);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    let manage = {
      title: "Manage",
      dataIndex: "manage",
      key: "manage",
      checked: true,
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">
              <div
                className={`ms-2 manage-button cursor disable-background`}
                onClick={() => handleEdit(record)}
              >
                <FaRegEdit />
              </div>
              {record?.statusCode === "INACTIVE" && (
                <div
                  className={`ms-2 manage-button cursor disable-background`}
                  onClick={() => handleDelete(record)}
                >
                  <AiOutlineDelete />
                </div>
              )}
            </div>
          </div>
        );
      },
    };
    filteredItems.push(manage);
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };
  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      targetGroupList = targetGroupList.filter((e: any) => {
        return (
          e.groupName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.createdDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.createdBy
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.updatedBy
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      targetGroupList = targetGroupList.filter((e: any) => {
        if (
          e[searchCategory]
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }
  return (
    <div className="TargetGroup pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Target Group"}
          SummaryFileName={"Target Group"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={targetGroupList}
          Print={handlePrint}
          addButton={true}
          addOnClick={handle_TargetGroupAdd}
          addText={"Add"}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={false}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
        />
      </div>
      {searchArea && (
        <div
          className="d-flex user-search mt-3 p-3 cursor"
          style={{ marginLeft: "20px", marginRight: "15px", width: "auto" }}
        >
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected hidden className="cursor">
              Select Field
            </option>

            <option value="groupName" className="cursor">
              Group Name
            </option>
            <option value="createdDate" className="cursor">
              Created Date
            </option>
            <option value="createdBy" className="cursor">
              Created By
            </option>
            <option value="updatedBy" className="cursor">
              Updated By
            </option>
            <option value="statusCode" className="cursor">
              Status Code
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            placeholder="Type your search keyword"
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
      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Target Group Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Target Group Updated Successfully"}
          />
        </div>
      )}
      <CustomLoader isLoading={isLoading} size={50} />
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
      {isLoading ? null : (
        <div className="px-3" ref={componentRef}>
          <CustomTable
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={targetGroupList}
            DisablePagination={false}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default TargetGroup;
