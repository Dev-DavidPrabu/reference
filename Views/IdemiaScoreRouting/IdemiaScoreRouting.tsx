import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { lastRoute } from "../../Components/Breadcrumbs/Breadcrumbs";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { getIdemiaScoreRoutingList } from "../../redux/action/IdemiaScoreRoutingActions";

function IdemiaScoreRouting() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const date = new Date().toLocaleString();
  const Header = [
    {
      title: "Scenario",
      dataIndex: "scenario",
      key: "scenario",
      sorter: {
        compare: (a: any, b: any) => a.scenario.localeCompare(b.scenario),
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: {
        compare: (a: any, b: any) => a.score.localeCompare(b.score),
      },
    },
    {
      title: "Channel",
      dataIndex: "channel",
      key: "channel",
      sorter: {
        compare: (a: any, b: any) => a.channel.localeCompare(b.channel),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: {
        compare: (a: any, b: any) => a.status.localeCompare(b.status),
      },
    },
  ];

  const idemiaScoreRoutingList: any = useSelector(
    (state: RootStateOrAny) =>
      state.IdemiaScoreRoutingReducer.getIdemiaScoreRoutingList
  );
  const idemmiaList = idemiaScoreRoutingList?.data;
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const fetchIdemiaList = useCallback(() => {
    try {
      dispatch(getIdemiaScoreRoutingList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchIdemiaList();
  }, [fetchIdemiaList]);

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/IDEMIA-Score-Routing/Idemia-Score-Routing-Edit",
      state: {
        value: e,
      },
    });
  };

  const handlePrint = (data: any) => {
    setPrint(!toPrint);
    setcolumns(data);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  return (
    <div className="idemiaScoreRouting">
      <div className="toggleSummary">
        <CommonHeaderSummary
          RightContent={lastRoute}
          SummaryFileName={lastRoute}
          SummaryColumn={Header}
          TableData={idemmiaList}
          Print={handlePrint}
          filterLeft={true}
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
          {columns.length > 0 && (
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
            CustomTableHeader={idemmiaList}
            delete={false}
            DisableMange={columns.length > 0 ? true : false}
            toPrint={columns.length > 0 ? true : false}
            editToggle={true}
          />
          {columns.length > 0 && (
            <p style={{ color: "red", marginTop: "5px" }}>Date : {date}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default IdemiaScoreRouting;
