import { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input, Button } from "reactstrap";
import { Form } from "antd";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { useReactToPrint } from "react-to-print";
import CustomLoader from "../../Components/Loader/CustomLoader";
import DeleteConfirmationPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import {
  deleteWalletFeatureData,
  getWalletFeatureSummary,
  resetDeletedWalletFeatureData,
} from "../../redux/action/WalletFeatureSummaryAction";

const WalletFeatureSummary = () => {
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchCategory, setSearchCategory] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [searchField, setSearchField] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [searchOption, setSearchOption] = useState(false);
  const [filterArea, setFilterArea] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [searchUserData, setsearchUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [deleteId, setDeletId] = useState<any>(Object);


  const walletHeader = [
    {
      title: "Wallet Feature Code",
      dataIndex: "walletFeatureCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletFeatureCode?.localeCompare(b.walletFeatureCode),
      },
    },
    {
      title: "Balance Min Limit",
      dataIndex: "balanceMinLimits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.balanceMinLimits?.localeCompare(b.balanceMinLimits),
      },
    },
    {
      title: "Balance Max Limit",
      dataIndex: "balanceMaxLimits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.balanceMaxLimits?.localeCompare(b.balanceMaxLimits),
      },
    },
    {
      title: "Topup Min Limit",
      dataIndex: "topupMinLimits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.topupMinLimits?.localeCompare(b.topupMinLimits),
      },
    },
    {
      title: "Topup Max Limit",
      dataIndex: "topupMaxLimits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.topupMaxLimits?.localeCompare(b.topupMaxLimits),
      },
    },
    {
      title: "Txn Min Limit",
      dataIndex: "txnMinLimits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.txnMinLimits?.localeCompare(b.txnMinLimits),
      },
    },
    {
      title: "Txn Max Limit",
      dataIndex: "txnMaxLimits",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.txnMaxLimits?.localeCompare(b.txnMaxLimits),
      },
    },
    {
      title: "Status Code",
      dataIndex: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.statusCode?.localeCompare(b.statusCode),
      },
      render: (status: any) => {
        let value = status.toString().toUpperCase();
        return (
          <label
            className={` ${value === "A" ? "text-success" : "text-danger"}`}
          >
            {value === "A" ? "ACTIVE" : "INACTIVE"}
          </label>
        );
      },
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.createdBy?.localeCompare(b.createdBy),
      },
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.createdDate?.localeCompare(b.createdDate),
      },
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.updatedBy?.localeCompare(b.updatedBy),
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updatedDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.updatedDate?.localeCompare(b.updatedDate),
      },
    },
  ];

  const walletFeatureData = useSelector(
    (state: RootStateOrAny) =>
      state.WalletFeatureSummaryReducer?.getAllWalletFeatureResponse
  );

  const deletedWalletFeatureDataRes = useSelector(
    (state: RootStateOrAny) =>
      state.WalletFeatureSummaryReducer?.deleteWalletFeatureResponse
  );

  let walletData = walletFeatureData?.data;

  const resetDeletedResponse = useCallback(async () => {
    try {
      dispatch(resetDeletedWalletFeatureData());
    } catch (err) { }
  }, [dispatch]);

  const fetchAllWalletFeature = useCallback(async () => {
    try {
      dispatch(getWalletFeatureSummary());
    } catch (err) { }
  }, [dispatch]);

  useEffect(() => {
    if (deletedWalletFeatureDataRes) {
      resetDeletedResponse();
      fetchAllWalletFeature();
    } else if (deletedWalletFeatureDataRes?.error) {
      setIsLoading(false);
      setApiMessage(deletedWalletFeatureDataRes?.message);
      setApiStatus(false);
    }
  }, [fetchAllWalletFeature]);

  useEffect(() => {
    if (walletFeatureData?.data) {
      setIsLoading(false);
    }
  }, [walletFeatureData]);



  useEffect(() => {
    setIsLoading(true);
    fetchAllWalletFeature();
  }, [fetchAllWalletFeature]);

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleSearch = () => {
    setSearchField(!searchField);
    setFilterArea(false);
  };
  const toggleFilter = () => {
    setSearchField(false);
    setFilterArea(!filterArea);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
  };
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const resetSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };
  const deletingTheSelectedRecord = useCallback(
    async (id: any) => {
      try {
        dispatch(deleteWalletFeatureData(id));
      } catch (err) { }
    },
    [dispatch]
  );
  const closeDeleteConfimation = () => {
    setShowModal(!showModal);
  };
  const confirmDeleteRecord = (id: any) => {
    deletingTheSelectedRecord(id).then(() => {
      fetchAllWalletFeature();
      setIsLoading(true);
      setShowModal(!showModal);
    });
  };

  const viewUser = (e: any) => {
    history.push({
      pathname: "/dashboard/wallet/editWalletFeature",
      state: { data: e, edit: false },
    });
  };
  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/wallet/editWalletFeature",
      state: { data: e, edit: true },
    });
  };
  const handleWalletAdd = () => {
    history.push({
      pathname: "/dashboard/wallet/addWalletFeature",
    });
  };
  const handleDelete = (e: any) => {
    setShowModal(true);
    setDeletId(e.id);
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Wallet Feature Summary"}
        SummaryFileName={"Wallet Feature Summary"}
        List={true}
        ListData={handleList}
        TableData={walletData}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : walletHeader
        }
        Refresh={true}
        search={searchOption}
        filterArea={toggleFilter}
        filterEnabled={filterOption}
        filterRemit={true}
        filterLeft={true}
        searchArea={toggleSearch}
        refresh={toggleRefresh}
        Print={handlePrint}
        Add={true}
        AddAction={handleWalletAdd}
      />
      {searchField && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className="  form-select user-search-drop cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected>Select Field</option>
            <option value="code">Wallet Feature Code</option>
            <option value="">Balance Min Limit</option>
            <option value="">Balance Max Limit</option>
            <option value="">Topup Min Limit</option>
            <option value="">Topup Max Limit</option>
            <option value="">Txn Min Limit</option>
            <option value="">Txn Max Limit</option>
            <option value="">Status Code</option>
            <option value="">Created By</option>
            <option value="">Created Date</option>
            <option value="">Updated By</option>
            <option value="">Updated Date</option>
            <option value="any">Any</option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            placeholder="Type your search keyword"
            onChange={(ev) => handleSearch(ev)}
          />
          <div className="ms-1">
            <Button color="danger" className="btn--sizer">Search</Button>
          </div>
          <div>
            <Button
              className="text-white  border-0 ms-1"
              onClick={() => resetSearch()}
            >
              <FaReply />
            </Button>
          </div>
        </div>
      )}

      {toPrint && (
        <span
          className="span-col1"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "10px",
          }}
        >
          {" "}
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

      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            <CustomHeader
              TableData={columns.length > 0 ? columns : walletHeader}
              CustomTableHeader={walletData}
              toPrint={columns.length > 0 && toPrint ? true : false}
              DisableMange={columns.length > 0 && toPrint ? true : false}
              Edit={true}
              viewUser={viewUser}
              disableCustomRowSelection={true}
              view={true}
              editUser={editUser}
              Delete={true}
              deleteUser={handleDelete}
            />
          </Form>
        </div>
      )}

      <DeleteConfirmationPopUp
        showModal={showModal}
        confirmheader={true}
        buttonYes={false}
        selectedFestivalInfo={deleteId}
        deleteTheSelectedRecord={confirmDeleteRecord}
        closeDeleteConfirmation={closeDeleteConfimation}
      ></DeleteConfirmationPopUp>
    </div>
  );
};

export default WalletFeatureSummary;
