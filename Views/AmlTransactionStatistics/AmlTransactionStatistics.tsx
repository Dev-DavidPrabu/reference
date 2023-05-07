import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
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
  deleteTransactionStatistics,
  getTransactionStatisticsList,
  resetCreateMessage,
  resetEditMessage,
} from "../../redux/action/AmlTransactionStatisticsAction";
import "./AmlTransactionStatistics.scss";

function AmlTransactionStatistics() {
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
  const date = new Date().toLocaleString();

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
      title: "Upper Limit",
      dataIndex: "upperLimit",
      key: "upperLimit",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.upperLimit?.toString().localeCompare(b.upperLimit?.toString()),
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.score?.toString().localeCompare(b.score?.toString()),
      },
    },
  ];

  const transactionStatisticsData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.AmlTransactionStatisticReducer.getAllTransactionStatisticsList
  );
  const TransactionStatisticCreate: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlTransactionStatisticReducer.getTransactionStatisticsError
  );

  const TransactionStatisticUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.AmlTransactionStatisticReducer.getTransactionStatisticsEditError
  );

  let transactionStatisticsList = transactionStatisticsData?.data;

  const fetchTransactionStatisticdata = useCallback(async () => {
    try {
      dispatch(getTransactionStatisticsList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchTransactionStatisticdata().then(() => {
      if (!transactionStatisticsData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchTransactionStatisticdata]);

  useEffect(() => {
    if (transactionStatisticsData) {
      if (transactionStatisticsData.data) {
        setIsLoading(false);
      }
    }
  }, [transactionStatisticsData]);

  useEffect(() => {
    if (TransactionStatisticCreate?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3000);
    }
  }, [TransactionStatisticCreate]);

  useEffect(() => {
    if (TransactionStatisticUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
      }, 3000);
    }
  }, [TransactionStatisticUpdate]);

  const editUser = (e: any) => {
    history.push({
      pathname:
        "/dashboard/remit-setup/Transaction-Statistics/Edit-Transaction-Statistics",
      state: {
        value: e,
      },
    });
  };

  const handle_TransactionStatisticAdd = () => {
    history.push({
      pathname:
        "/dashboard/remit-setup/Transaction-Statistics/Add-Transaction-Statistics",
      state: {},
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
        dispatch(deleteTransactionStatistics(recordId));
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
      transactionStatisticsList = transactionStatisticsList.filter((e: any) => {
        return (
          e.riskCategory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.riskFactor
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.upperLimit
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.score
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      transactionStatisticsList = transactionStatisticsList.filter((e: any) => {
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
    <div className="AmlTransactionStatistics pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Transaction Statistics"}
          SummaryFileName={"Transaction Statistics"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={transactionStatisticsList}
          Print={handlePrint}
          addButton={true}
          addOnClick={handle_TransactionStatisticAdd}
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

            <option value="riskCategory" className="cursor">
              Risk Category
            </option>
            <option value="riskFactor" className="cursor">
              Risk Factor
            </option>
            <option value="upperLimit" className="cursor">
              Upper Limit
            </option>
            <option value="score" className="cursor">
              score
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
            message={"Transaction Statistics Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Transaction Statistics Updated Successfully"}
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
            deleteUser={handleDelete}
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={transactionStatisticsList}
            Delete={true}
            Edit={true}
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

export default AmlTransactionStatistics;
