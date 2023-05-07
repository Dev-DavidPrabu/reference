import { useCallback, useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  ApprovalTaskData,
  getApprovalTaskData,
  rejectApprovalTaskData,
} from "../../redux/action/ApprovalAction";
import "../Home/Home.scss";
function Home(props: any) {
  const dispatch = useDispatch();

  let ApprovalData = useSelector(
    (state: RootStateOrAny) =>
      state.ApprovalTaskReducer?.getApprovalTaskResponse
  );

  useEffect(() => {
    dispatch(getApprovalTaskData());
  }, []);

  let RejectData = useSelector(
    (state: RootStateOrAny) =>
      state.ApprovalTaskReducer?.rejectApprovalTaskDataResponse
  );

  let ApprovalTask = useSelector(
    (state: RootStateOrAny) =>
      state.ApprovalTaskReducer?.postApprovalTaskResponse
  );
  useEffect(() => {
    if (ApprovalTask) {
      dispatch(getApprovalTaskData());
    }
  }, [ApprovalTask]);

  const [String, setString] = useState(false);
  const [showMore, setShowMore] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [reject, setReject] = useState(Object);
  const [rejectApproval, setrejectApproval] = useState(Object);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState(Object);
  const [rejectManager, setrejectManager] = useState("");
  const ApprovalTaskManager = (record: any, value: boolean) => {
    setApiMessage(true);

    let taskManager = {
      functionCode: record.functionCode,
      remarks: record.makerComment,
      requestDetails: record.requestDetails ? record.requestDetails : "",
      approvalTaskId: record.id,
    };
    dispatch(ApprovalTaskData(taskManager));
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  const rejectTasks = useCallback(
    async (userData: any) => {
      try {
        dispatch(rejectApprovalTaskData(userData));
      } catch (err) {}
    },
    [dispatch]
  );

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };

  const RejectTaskManger = (reject: any) => {
    setShowModal(!showModal);
    let rejectdata = {
      functionCode: reject.functionCode,
      remarks: rejectManager,
      requestDetails: reject.requestDetails ? reject.requestDetails : "",
      approvalTaskId: reject.id,
    };

    rejectTasks(rejectdata).then(() => {
      dispatch(getApprovalTaskData());
    });
  };

  const homeHead = [
    {
      title: "Date Time",
      dataIndex: "date",
      key: "1",

      width: "20%",

      sorter: {
        compare: (a: any, b: any) => a.date.localeCompare(b.date),
      },
      render: (String: any, data: any) => {
        return (
          <span>
            {data.createdBy}
            {data.createdDate}
          </span>
        );
      },
    },
    {
      title: "Function",
      dataIndex: "name",
      key: "2",
      width: "20%",
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
      render: (String: any, data: any) => {
        var Name = data.functionCode;
        return <span>{Name}</span>;
      },
    },

    {
      title: "Maker",
      dataIndex: "makerName",
      key: "4",
      sorter: {
        compare: (a: any, b: any) => a.makerName.localeCompare(b.makerName),
      },
    },
    {
      title: "Reference1",
      dataIndex: "enabled",
      key: "5",
      sorter: {
        compare: (a: any, b: any) => a.enabled.localeCompare(b.enabled),
      },
    },
    {
      title: "Reference2",
      dataIndex: "popUpMessage",
      key: "6",

      sorter: {
        compare: (a: any, b: any) =>
          a.popUpMessage.localeCompare(b.popUpMessage),
      },
    },
    {
      title: "Comments",
      dataIndex: "module",
      key: "3",
      sorter: {
        compare: (a: any, b: any) => a.module.localeCompare(b.module),
      },
      render: (String: any, data: any) => {
        var Task = data.makerComment;

        return (
          <span className={`Home-usage `}>
            {showMore !== data.id ? (
              <span
                className="text-primary text-decoration-underline"
                onClick={() => setShowMore(data.id)}
              >
                more
              </span>
            ) : (
              <div onClick={() => setShowMore(data.id)}>{Task}</div>
            )}
          </span>
        );
      },
    },

    {
      title: "Status",
      dataIndex: "approvalStatusCode",
      key: "7",
      sorter: {
        compare: (a: any, b: any) =>
          a.approvalStatusCode.localeCompare(b.approvalStatusCode),
      },
    },
    {
      title: "Action",
      dataIndex: "manage",
      render: (data: any, record: any) => (
        <div className="d-flex cursor justify-content-center">
          <div onClick={() => ApprovalTaskManager(record, data)}>
            <AiOutlineCheckCircle />
          </div>
          <div
            className={`ms-2 cursor $`}
            onClick={() => {
              setReject(record);
              setShowModal(!showModal);
            }}
          >
            <GiCancel />
          </div>
          <div
            className={`ms-2 cursor $`}
            onClick={() =>
              props.history.push({
                pathname: "/dashboard/payroll-enquiry",
                state: {
                  id: record.id,
                  functionCode: record.functionCode,
                  remarks: record.makerComment,
                  requestDetails: record.requestDetails,
                  approvalTaskId: record.approvalTaskId,
                },
              })
            }
          >
            <GrView />
          </div>
        </div>
      ),
    },
  ];
  const homeData = [
    {
      id: "22.08.2021,2.45.am",
      notificationName: "tester1",
      notificationUsage: "Usergroup",
      enabled: "User details",
      popUpMessage: "User",
      module: "User:test, Time:2.45.pm Payroll",
      smsMessage: "testing",
      status: "Active",
      index: 1,
    },
    {
      id: "22.08.2021,2.45.pm",
      notificationName: "checking",
      notificationUsage: "Userindex",
      enabled: "User details",
      popUpMessage: "User",
      module: "User:test, Time:2.45.pm,Company Maintanence",
      smsMessage: "testing",
      status: "Active",
      index: 2,
    },
    {
      id: "22.08.2021,2.45.am",
      notificationName: "Tester2",
      notificationUsage: "User",
      enabled: "User details",
      popUpMessage: "User",
      module: "User:test, Time:2.45.am, onBoarding",
      smsMessage: "testing",
      status: "Active",
      index: 3,
    },
    {
      id: "22.08.2021,2.45.pm",
      notificationName: "Tester3",
      notificationUsage: "User",
      enabled: "User details",
      popUpMessage: "User",
      module: "User:test, Time:2.45.pm Reference Data",
      smsMessage: "testing",
      status: "Active",
      index: 4,
    },
  ];

  return (
    <div className="home">
      {apiMessage && (
        <CustomResponseMessage
          message={"Task has been Approved Successfully"}
          apiStatus={true}
          closeMessage={closeMessage}
        />
      )}{" "}
      <CustomHeader
        TableData={homeHead}
        CustomTableHeader={ApprovalData && ApprovalData.data}
        DisableMange={true}
      />
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={reject}
        deleteTheSelectedRecord={RejectTaskManger}
        approvalReject={`Are you Sure You want to Reject this Task  Comments : `}
        rejectApprovalTask={true}
        setrejectManager={(e: string) => setrejectManager(e)}
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default Home;
