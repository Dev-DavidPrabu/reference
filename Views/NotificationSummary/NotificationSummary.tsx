/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaRegEdit, FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import TableHandler from "../../Components/TableHandler/TableHandler";
import {
  getNotificationData,
  getNotificationModuleData,
} from "../../redux/action/NotificationSummaryAction";
import { Button, Input } from "reactstrap";
import { NotificationSummaryInfo } from "../../models/NotificationSummaryModel";
import CustomLoader from "../../Components/Loader/CustomLoader";

function NotificationSummary(props: any) {
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  let NotificationData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationSummaryReducer?.getNotificationResponse
  );

  let NotificationModuleData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationSummaryReducer?.getNotificationModuleResponse
  );
  const SummaryUser = useCallback(async () => {
    try {
      dispatch(getNotificationData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    SummaryUser().then(() => {
      if (!NotificationData?.data) {
        fetchNotificationModule();
      }
    });
  }, []);

  const fetchNotificationModule = useCallback(async () => {
    try {
      dispatch(getNotificationModuleData(""));
    } catch (err) {}
  }, [dispatch]);

  const [editId, setEditId] = useState("");
  const [notification, setnotification] = useState([]);
  const [filteredNotification, setfilteredNotification] = useState([]);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [orginalColumns, setorginalColumns] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showfilteredNotification, setShowfilteredNotification] =
    useState(false);
  useEffect(() => {
    setnotification(NotificationData.data);
  }, [NotificationData.data]);
  useEffect(() => {
    if (NotificationData) {
      if (NotificationData?.data) {
        setIsLoading(false);
      }
    }
  }, [NotificationData]);
  useEffect(() => {
    if (NotificationData) {
      if (!NotificationData?.data) {
        setIsLoading(true);
      }
    }
  }, [NotificationData]);
  const DataHeader = [
    {
      title: "Id",
      dataIndex: "notificationId",
      key: "1",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationId.localeCompare(b.notificationId),
      },
    },
    {
      title: "Name",
      dataIndex: "notificationName",
      key: "2",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationName.localeCompare(b.notificationName),
      },
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "3",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.module.localeCompare(b.module),
      },
    },
    {
      title: "Usage",
      dataIndex: "notificationUsage",
      key: "4",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationUsage.localeCompare(b.notificationUsage),
      },
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "5",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.enabled - b.enabled,
      },
      render: (text: any) => {
        return (
          <label
            className={`d-flex justify-content-center ${
              text ? "text-success" : "text-danger"
            }`}
          >
            {text ? "YES" : "NO"}
          </label>
        );
      },
    },
    {
      title: "Popup Message",
      dataIndex: "popUpMessage",
      key: "6",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.popUpMessage.localeCompare(b.popUpMessage),
      },
    },
    {
      title: "Send Message",
      dataIndex: "smsMessage",
      key: "7",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.smsMessage.localeCompare(b.smsMessage),
      },
    },
    {
      title: "Manage",
      dataIndex: "manage",
      render: (data: any, record: any) => (
        <div className="d-flex cursor justify-content-center">
          <div onClick={() => handleEdit(record)}>
            <FaRegEdit />
          </div>
        </div>
      ),
    },
  ];
  const [toPrint, setPrint] = useState(false);
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const handleSubmit = (selectedData: any) => {
    let data = notification;
    if (data && data.length > 0) {
      let filtedData = data.filter(
        (notification: any) => notification.module == selectedData
      );
      setShowfilteredNotification(true);
      setfilteredNotification(filtedData);
    }
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
    setPrint(false);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const handleEdit = (id: string) => {
    setEditId(id);
    props.history.push({
      pathname: "/dashboard/edit-summary-notification",
      state: { data: id, previousPath: "Notification" },
    });
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setPrint(false);
  };

  const closeSearch = () => {
    setSearchArea(!searchArea);
  };
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      NotificationData.data = NotificationData.data.filter(
        (e: any | NotificationSummaryInfo) => {
          return (
            e.notificationId
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.notificationName
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.module.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.notificationUsage
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.popUpMessage
              .toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.smsMessage.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      NotificationData.data = NotificationData.data.filter(
        (e: any | NotificationSummaryInfo) => {
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
  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Notification Summary"}
        SummaryFileName={"Notification Summary"}
        searchArea={toggleSearch}
        search={searchArea}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        SummaryColumn={orginalColumns.length > 0 ? orginalColumns : DataHeader}
        TableData={NotificationData.data}
      />

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
      {searchArea && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="notificationId" className="cursor">
              Id
            </option>
            <option value="notificationName" className="cursor">
              Name
            </option>
            <option value="module" className="cursor">
              Module
            </option>
            <option value="notificationUsage" className="cursor">
              Usage
            </option>
            <option value="popUpMessage" className="cursor">
              Popup Message
            </option>
            <option value="smsMessage" className="cursor">
              Send Message
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
            <Button
              className="text-white  border-0 ms-1"
              onClick={() => closeSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}
      <TableHandler
        CommonModules={"Modules"}
        View={handleSubmit}
        moduleData={NotificationModuleData.data}
      />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="px-3" ref={componentRef}>
          <CustomHeader
            TableData={columns?.length > 0 ? columns : DataHeader}
            CustomTableHeader={
              showfilteredNotification ? filteredNotification : notification
            }
            Edit={true}
            toPrint={toPrint ? true : false}
            DisableMange={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default NotificationSummary;
