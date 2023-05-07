import { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import TableHandler from "../../Components/TableHandler/TableHandler";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ParameterSummaryInfo } from "../../models/ParameterSummaryModel";
import {
  clearUpdateData,
  getParameterData,
  getParameterModuleData,
} from "../../redux/action/ParameterSummaryAction";
import "./ParameterSummary.scss";

const ParameterSummary = (props: any) => {
  const [toPrint, setPrint] = useState(false);
  const [notification, setnotification] = useState([]);
  const [filteredNotification, setfilteredNotification] = useState([]);
  const [showfilteredNotification, setShowfilteredNotification] =
    useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [orginalColumns, setorginalColumns] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState(false);

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
    setSearchArea(false);
  };

  const componentRef = useRef<any>();

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const dispatch = useDispatch();

  const onSubmit = (selectedData: any) => {
    let data = parameterDataList;
    if (data && data.length > 0) {
      let filterData = data?.filter(
        (notification: any) => notification?.module === selectedData
      );
      setShowfilteredNotification(true);
      if (selectedData === "All") {
        setfilteredNotification(parameterDataList);
      } else {
        setfilteredNotification(filterData);
      }
    }
  };

  const editParameter = (e: any) => {
    props.history.push({
      pathname: "/dashboard/edit-summary-parameter",
      state: { data: e, previousPath: "Parameters" },
    });
  };
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };
  let moduleList = ["onboarding", "payroll"];
  let ParameterData = useSelector(
    (state: RootStateOrAny) =>
      state.ParameterSummaryReducer?.getParameterResponse
  );
  useEffect(() => {
    setnotification(ParameterData?.data);
  }, [ParameterData]);

  let ParameterModuleData = useSelector(
    (state: RootStateOrAny) =>
      state.ParameterSummaryReducer?.getParameterModuleResponse
  );

  const parameterUpdateData = useSelector(
    (state: RootStateOrAny) =>
      state.ParameterSummaryReducer.updateParameterResponse
  );

  let parameterDataList = ParameterData?.data;

  useEffect(() => {
    if (ParameterData) {
      if (ParameterData?.data) {
        setIsLoading(false);
      }
    }
  }, [ParameterData]);
  useEffect(() => {
    if (ParameterData) {
      if (!ParameterData?.data) {
        setIsLoading(true);
      }
    }
  }, [ParameterData]);

  useEffect(() => {
    if (parameterUpdateData) {
      if (parameterUpdateData?.data) {
        setApiMessage(true);
        setTimeout(function () {
          setApiMessage(false);
          dispatch(clearUpdateData());
        }, 4000);
      }
    }
  }, [parameterUpdateData]);

  const fetchAllParameter = useCallback(async () => {
    try {
      dispatch(getParameterData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchAllParameter().then(() => {
      if (!ParameterData?.data) {
      }
    });
    fetchParameterModule();
  }, [fetchAllParameter]);

  const fetchParameterModule = useCallback(async () => {
    try {
      dispatch(getParameterModuleData(""));
    } catch (err) {}
  }, [dispatch]);

  const ParameterHeader = [
    {
      title: "Id",
      dataIndex: "parameterId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.parameterId.localeCompare(b.parameterId),
      },
      render: (id: any) => {
        return id;
      },
    },
    {
      title: "Name",
      dataIndex: "parameterName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.parameterName.localeCompare(b.parameterName),
      },
      render: (name: any) => {
        return name.substring(0, 10) + "...";
      },
    },
    {
      title: "Module",
      dataIndex: "module",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.module.localeCompare(b.module),
      },
    },
    {
      title: "Usage",
      dataIndex: "parameterUsage",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.parameterUsage.localeCompare(b.parameterUsage),
      },
      render: (name: any) => {
        return (
          <span className={`parameter-summary-usage `}>
            {name.substring(0, 20) + "..."}
          </span>
        );
      },
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.enabled.localeCompare(b.enabled),
      },
      render: (text: any) => {
        return (
          <label
            className={`d-flex justify-content-center ${
              text === "Y" ? "text-success" : "text-danger"
            }`}
          >
            {text === "Y" ? "YES" : "NO"}
          </label>
        );
      },
    },
    {
      title: "Operand",
      dataIndex: "operand",
      align: "center",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.operand.localeCompare(b.operand),
      },
    },
    {
      title: "Condition",
      align: "center",
      dataIndex: "conditions",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.conditions.localeCompare(b.conditions),
      },
    },
    {
      title: "Value",
      dataIndex: "value1",
      align: "center",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.value1.localeCompare(b.value1),
      },
    },
    {
      title: "N.ID",
      dataIndex: "notificationId",
      checked: true,
      align: "center",
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationId?.localeCompare(b.notificationId),
      },
    },
  ];

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setPrint(false);
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
  const closeSearch = () => {
    setSearchArea(false);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      parameterDataList = parameterDataList?.filter(
        (e: any | ParameterSummaryInfo) => {
          return (
            e.parameterId
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase()) ||
            e.parameterName
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase()) ||
            e.module?.toUpperCase().includes(searchUserData.toUpperCase()) ||
            e.parameterUsage
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase()) ||
            e.operand?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
            e.conditions
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase()) ||
            e.value1?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
            e.notificationId
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase())
          );
        }
      );
    } else {
      parameterDataList = parameterDataList?.filter(
        (e: any | ParameterSummaryInfo) => {
          if (
            e[searchCategory]
              ?.toUpperCase()
              .includes(searchUserData?.toUpperCase())
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
        RightContent={"Parameter Summary"}
        SummaryFileName={"Parameter Summary"}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : ParameterHeader
        }
        TableData={parameterDataList}
        Print={handlePrint}
        searchArea={toggleSearch}
        search={searchArea}
        List={true}
        ListData={handleList}
        refresh={toggleRefresh}
        Refresh={true}
      />

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

            <option value="parameterId" className="cursor">
              Id
            </option>
            <option value="parameterName" className="cursor">
              Name
            </option>
            <option value="module" className="cursor">
              Module
            </option>
            <option value="parameterUsage" className="cursor">
              Usage
            </option>
            <option value="operand" className="cursor">
              Operand
            </option>
            <option value="conditions" className="cursor">
              Condition
            </option>
            <option value="value1" className="cursor">
              Value
            </option>
            <option value="notificationId" className="cursor">
              N.ID
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
            <Button color="danger" className="btn--sizer">
              Search
            </Button>
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
        CommonModules={"Module"}
        View={onSubmit}
        moduleData={parameterDataList}
      />
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
            to confirm and Print !
          </span>
        )}
        {apiMessage && (
          <div className="px-3">
            <CustomResponseMessage
              apiStatus={apiMessage}
              closeMessage={closeMessage}
              message={"Updated Successfully"}
            />
          </div>
        )}
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <div className="px-3" ref={componentRef}>
            <CustomHeader
              TableData={columns?.length > 0 ? columns : ParameterHeader}
              CustomTableHeader={
                showfilteredNotification
                  ? filteredNotification
                  : parameterDataList
              }
              editUser={editParameter}
              Edit={true}
              toPrint={toPrint ? true : false}
              DisableMange={toPrint ? true : false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParameterSummary;
