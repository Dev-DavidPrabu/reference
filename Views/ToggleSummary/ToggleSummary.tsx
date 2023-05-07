import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ToggleSummary.scss";
import { lastRoute } from "../../Components/Breadcrumbs/Breadcrumbs";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { useHistory } from "react-router";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import TableHandler from "../../Components/TableHandler/TableHandler";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  getToggleSummaryList,
  getAllToggleSummaryList,
  resetALLToggleSummary,
} from "../../redux/action/ToggleSummaryAction";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

function ToggleSummary(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");

  let moduleCode = "";
  const [moduleListDropDown, setModuleListDropDown] = useState([]);
  const toggleSummaryList: any = useSelector(
    (state: RootStateOrAny) => state.ToggleSummaryReducer.getToggleSummaryList
  );
  const allToggleSummaryList: any = useSelector(
    (state: RootStateOrAny) =>
      state.ToggleSummaryReducer.getAllToggleSummaryList
  );
  let moduleList = allToggleSummaryList?.data;

  const [columns, setcolumns] = useState([]);
  const date = new Date().toLocaleString();
  const [orginalColumns, setorginalColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);

  const fetchToggleSummaryList = useCallback(() => {
    try {
      dispatch(getAllToggleSummaryList());
    } catch (err) {}
  }, [dispatch]);

  const fetchRestToggleSummaryList = useCallback(() => {
    try {
      dispatch(resetALLToggleSummary());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchToggleSummaryList();
    fetchRestToggleSummaryList();
  }, [fetchToggleSummaryList]);

  const moduleSubmitHandler = (module: string) => {
    moduleCode = module;
    setIsLoading(true);
    try {
      dispatch(getToggleSummaryList(moduleCode));
    } catch (err) {}
  };

  useEffect(() => {
    setIsLoading(true);
    if (allToggleSummaryList) {
      if (allToggleSummaryList?.data) {
        setIsLoading(false);
        let modules: any = [];
        allToggleSummaryList?.data?.filter((list: any) => {
          if (!modules.includes(list.module)) {
            modules.push(list.module);
          }
        });
        setModuleListDropDown(modules);
      }
    }
  }, [allToggleSummaryList]);
  useEffect(() => {
    if (toggleSummaryList) {
      if (toggleSummaryList?.data) {
        setIsLoading(false);
      }
    }
  }, [toggleSummaryList]);
  const Header = [
    {
      title: "Id",
      dataIndex: "toggleId",
      checked: true,
      key: "toggleId",
      sorter: {
        compare: (a: any, b: any) => a.toggleId.localeCompare(b.toggleId),
      },
    },
    {
      title: "Name",
      dataIndex: "toggleName",
      key: "toggleName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.toggleName.localeCompare(b.toggleName),
      },
    },

    {
      title: "Module",
      dataIndex: "module",
      checked: true,
      key: "module",
      sorter: {
        compare: (a: any, b: any) => a.module.localeCompare(b.module),
      },
    },

    {
      title: "Toggle Usage",
      dataIndex: "toggleUsage",
      checked: true,
      key: "toggleUsage",
      sorter: {
        compare: (a: any, b: any) => a.toggleUsage.localeCompare(b.toggleUsage),
      },
    },
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      checked: true,
      render: (text: any) => String(text),
      sorter: {
        compare: (a: any, b: any) => a.enabled - b.enabled,
      },
    },
    {
      title: "Toggle Message",
      dataIndex: "statusMessage",
      checked: true,
      key: "statusMessage",
      sorter: {
        compare: (a: any, b: any) =>
          a.statusMessage.localeCompare(b.statusMessage),
      },
    },
  ];

  function onClick(pagination: any, filters: any, sorter: any, extra: any) {}
  const editUser = (e: any) =>
    history.push({
      pathname: "/dashboard/Toggle-Summary/Toggle-Summary-Edit",
      state: {
        value: e,
      },
    });

  if (toggleSummaryList?.data) {
    moduleList = toggleSummaryList?.data;
  }
  if (allToggleSummaryList?.data) {
    moduleList = allToggleSummaryList?.data;
  }

  const closeMessage = () => {
    setApiMessage("");
  };
  const [toPrint, setPrint] = useState(false);
  const handlePrint = (data: any) => {
    setPrint(!toPrint);
    setcolumns(data);
    setSearchArea(false);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
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
    setSearchCategory("");
    setSearchArea(false);
  };
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      moduleList = moduleList.filter((e: any | ToggleSummaryInfo) => {
        return (
          e.toggleId.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.toggleName.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.module.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.toggleUsage.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.statusMessage.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      moduleList = moduleList.filter((e: any | ToggleSummaryInfo) => {
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
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Toggle Summary"}
        SummaryFileName={"Toggle Summary"}
        SummaryColumn={orginalColumns?.length > 0 ? orginalColumns : Header}
        TableData={moduleList}
        Print={handlePrint}
        searchArea={toggleSearch}
        search={searchArea}
        List={true}
        ListData={handleList}
        refresh={toggleRefresh}
        Refresh={true}
      />
      <TableHandler
        CommonModules={"Modules"}
        moduleData={moduleListDropDown}
        View={moduleSubmitHandler}
        isToggle={true}
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

            <option value="toggleId" className="cursor">
              Id
            </option>
            <option value="toggleName" className="cursor">
              Name
            </option>
            <option value="module" className="cursor">
              Module
            </option>
            <option value="toggleUsage" className="cursor">
              Toggle Usage
            </option>
            <option value="statusMessage" className="cursor">
              Toggle Message
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
            <Button color="danger" className="btn--sizer">Search</Button>
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
      <CustomResponseMessage
        apiStatus={apiStatus}
        closeMessage={closeMessage}
        message={apiMessage}
      />
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="px-3" ref={componentRef}>
          {columns.length > 0 && toPrint && (
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
                {lastRoute}
              </h3>
            </>
          )}
          <CustomTable
            editUser={editUser}
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={moduleList}
            Delete={false}
            DisableMange={toPrint ? true : false}
            onChange={onClick}
            toPrint={toPrint ? true : false}
            editToggle={true}
          />
          {columns.length > 0 && toPrint && (
            <p style={{ color: "red", marginTop: "5px" }}>Date : {date}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ToggleSummary;
