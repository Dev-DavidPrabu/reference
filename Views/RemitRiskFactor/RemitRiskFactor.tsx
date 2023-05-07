import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  getRiskFactorList,
  resetEditMessage,
} from "../../redux/action/RemitRiskFactorAction";

function RemitRiskFactor() {
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
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Header = [
    {
      title: "Risk Category",
      dataIndex: "riskCategory",
      key: "riskCategory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.riskCategory?.toString().localeCompare(b.riskCategory?.toString()),
      },
    },
    {
      title: "Risk Factors",
      dataIndex: "riskFactor",
      key: "riskFactor",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.riskFactor?.toString().localeCompare(b.riskFactor?.toString()),
      },
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.details?.toString().localeCompare(b.details?.toString()),
      },
    },
    {
      title: "Transaction Score",
      dataIndex: "transactionScore",
      key: "transactionScore",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionScore
            ?.toString()
            .localeCompare(b.transactionScore?.toString()),
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
      render: (statusCode: any) => {
        return (
          <label
            className={` ${
              statusCode === "ACTIVE"
                ? "status-validated"
                : statusCode === "INACTIVE" && "status-error"
            }`}
          >
            {statusCode}
          </label>
        );
      },
    },
  ];

  const riskFactorData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.RemitRiskFactorReducer.getAllRiskFactorList
  );

  const riskFactorUpdate: any = useSelector(
    (state: RootStateOrAny) => state.RemitRiskFactorReducer.getRiskFactorError
  );

  let riskFactorDataList = riskFactorData?.data;

  const fetchRiskFactordata = useCallback(async () => {
    try {
      dispatch(getRiskFactorList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchRiskFactordata().then(() => {
      if (!riskFactorData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchRiskFactordata]);

  useEffect(() => {
    if (riskFactorData) {
      if (riskFactorData.data) {
        setIsLoading(false);
      }
    }
  }, [riskFactorData]);

  useEffect(() => {
    if (riskFactorUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
      }, 3000);
    }
  }, [riskFactorUpdate]);

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/remit-setup/Risk-Factor/Edit-Risk-Factor",
      state: {
        value: e,
      },
    });
  };

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

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      riskFactorDataList = riskFactorDataList.filter((e: any) => {
        return (
          e.riskCategory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.riskFactor
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.details
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.transactionScore
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
      riskFactorDataList = riskFactorDataList.filter((e: any) => {
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
    <div className="RemitRiskFactor pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Risk Factor"}
          SummaryFileName={"Risk Factor"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={riskFactorDataList}
          Print={handlePrint}
          addButton={false}
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

            <option value="riskCategory" className="cursor">
              Risk Category
            </option>
            <option value="riskFactor" className="cursor">
              Risk Factor
            </option>
            <option value="details" className="cursor">
              Details
            </option>
            <option value="transactionScore" className="cursor">
              Transaction Score
            </option>
            <option value="statusCode" className="cursor">
              status
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

      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Risk Factor Score Updated Successfully"}
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
            editUser={editUser}
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={riskFactorDataList}
            Delete={false}
            Edit={true}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default RemitRiskFactor;
