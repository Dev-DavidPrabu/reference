import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { FaReply } from "react-icons/fa";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import "./RemitTransactionLimit.scss";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import { getLimitTransactionList } from "../../redux/action/RemitTransactionLimitAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { transactionLimitInfo } from "../../models/RemitTransactionLimitModel";

const RemitTransactionLimit = (props: any) => {
  const dispatch = useDispatch();
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [form] = Form.useForm();
  const [orginalColumns, setorginalColumns] = useState([]);
  const componentRef = useRef<any>();
  const [searchCategory, setSearchCategory] = useState("");
  const [tableShow, setTableShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUserData, setsearchUserData] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filterError, setFilterError] = useState(true);
  const [filterValue, setFilterValue] = useState({
    type: "",
    localorForeigner: "",
    idType1: "",
    idType2: "",
    limitCode: "",
    limitCodePhoto: "",
  });
  const transferLimitDatas = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionLimitReducer?.getTransferLimitResponse
  );

  let limitDatas = transferLimitDatas?.data;
  const fetchTransferLimitResponse = useCallback(async () => {
    try {
      dispatch(getLimitTransactionList());
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {
    fetchTransferLimitResponse();
  }, []);

  useEffect(() => {
    if (limitDatas) {
      setIsLoading(false);
    }
  }, [limitDatas]);
  useEffect(() => {
    if (!limitDatas) {
      setIsLoading(true);
    }
  }, [limitDatas]);
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setSearchArea(false);
  };
  const closeSearch = () => {
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };
  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Add-Transaction-Status-Limit",
      state: {
        data: {},
        isEdit: false,
      },
    });
  };
  const editLimitStatus = (e: any) => {};
  const deleteLimitStatus = () => {
    setShowModal(!showModal);
  };
  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setSearchArea(false);
    setorginalColumns([]);
    setPrint(false);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const agentGroupHeader = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.type.localeCompare(b.type),
      },
    },
    {
      title: "Local or Foreigner",
      dataIndex: "localorForeigner",
      key: "localorForeigner",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.localorForeigner.localeCompare(b.localorForeigner),
      },
    },
    {
      title: "ID Type 1",
      dataIndex: "idType1",
      key: "idType1",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType1.localeCompare(b.idType1),
      },
    },
    {
      title: "ID Type 2",
      dataIndex: "idType2",
      key: "idType2",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType2.localeCompare(b.idType2),
      },
    },
    {
      title: "Remittance Limit Code Original Doc",
      dataIndex: "remitLimitCodeDoc",
      key: "remitLimitCodeDoc",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.remitLimitCodeDoc.localeCompare(b.remitLimitCodeDoc),
      },
    },
    {
      title: "Remittance Limit Code Photocopy Doc",
      dataIndex: "limitCode",
      key: "limitCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.limitCode.localeCompare(b.limitCode),
      },
    },
    {
      title: "Transaction limit per transaction",
      dataIndex: "limitPerTransaction",
      key: "limitPerTransaction",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.limitPerTransaction - b.limitPerTransaction,
      },
    },
    {
      title: "No. of Transactions per day",
      dataIndex: "noOfTransactionsPerDay",
      key: "noOfTransactionsPerDay",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.noOfTransactionsPerDay - b.noOfTransactionsPerDay,
      },
    },
    {
      title: "Transaction limit per day",
      dataIndex: "limitPerDay",
      key: "limitPerDay",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.limitPerDay - b.limitPerDay,
      },
    },
    {
      title: "No. of transactions for 30 days",
      dataIndex: "noOfTransactionsForThirtyDays",
      key: "noOfTransactionsForThirtyDays",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.noOfTransactionsForThirtyDays - b.noOfTransactionsForThirtyDays,
      },
    },
  ];
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      limitDatas = limitDatas?.filter((e: any | transactionLimitInfo) => {
        return (
          e?.limitCode?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e?.limitPerTransaction
            ?.toString()
            .includes(searchUserData.toUpperCase()) ||
          e?.noOfTransactionsPerDay
            ?.toString()
            .includes(searchUserData.toUpperCase()) ||
          e?.limitPerDay?.toString().includes(searchUserData.toUpperCase()) ||
          e?.noOfTransactionsForThirtyDays
            ?.toString()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      limitDatas = limitDatas?.filter((e: any | transactionLimitInfo) => {
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
  const handleClick = () => {
    setFilterError(true);
    if (
      filterValue.idType1 ||
      filterValue.idType2 ||
      filterValue.limitCode ||
      filterValue.limitCodePhoto ||
      filterValue.localorForeigner ||
      filterValue.type
    ) {
      setfilterOption(false);
      setFilteredArea(true);
      setTableShow(true);
    } else {
      setFilterError(false);
    }
  };
  const resetFilter = () => {
    setFilterValue({
      type: "",
      localorForeigner: "",
      idType1: "",
      idType2: "",
      limitCode: "",
      limitCodePhoto: "",
    });
    setFilterError(!filterError);
  };
  const handleFilterChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Remittance Transaction Limit"}
        SummaryFileName={"Remittance Transaction Limit"}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        filter={true}
        searchArea={toggleSearch}
        search={searchArea}
        Add={true}
        AddAction={handleAdd}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : agentGroupHeader
        }
        Print={handlePrint}
        TableData={limitDatas}
      />
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

            <option value="limitCode" className="cursor">
              Remittance Limit Code Photocopy Doc
            </option>
            <option value="limitPerTransaction" className="cursor">
              Transaction limit per transaction
            </option>
            <option value="noOfTransactionsPerDay" className="cursor">
              No. of Transactions per day
            </option>
            <option value="limitPerDay" className="cursor">
              Transaction limit per day
            </option>
            <option value="noOfTransactionsForThirtyDays" className="cursor">
              No. of transactions for 30 days
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
      {filterOption && (
        <div className="colorWhite transLimitFilterSection mt-3 p-3">
          <div className="d-flex justify-content-between">
            <p className="transLimitFilter">Filter</p>

            <span
              className={`remit-processing-mandatory ${
                filterError && "d-none"
              }`}
            >
              {" "}
              ** Any one field value is mandatory
            </span>
          </div>
          <div className="container-fluid">
            <div className="row ">
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="transLimiLabel">
                    Type
                  </Label>
                  <Input
                    type="text"
                    name="type"
                    className="formRadiusBank"
                    value={filterValue.type}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="transLimiLabel">
                    Local or Foreigner
                  </Label>
                  <Input
                    type="text"
                    name="localorForeigner"
                    className="formRadiusBank"
                    value={filterValue.localorForeigner}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="transLimiLabel">
                    ID Type 1
                  </Label>
                  <Input
                    type="text"
                    name="idType1"
                    className="formRadiusBank"
                    value={filterValue.idType1}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="transLimiLabel">
                    ID Type 2
                  </Label>
                  <Input
                    type="text"
                    name="idType2"
                    className="formRadiusBank"
                    value={filterValue.idType2}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="transLimiLabel">
                    Limit Code
                  </Label>
                  <Input
                    type="text"
                    name="limitCode"
                    className="formRadiusBank"
                    value={filterValue.limitCode}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup>
                  <Label for="exampleEmail" className="transLimiLabel">
                    CodePhotocopy
                  </Label>
                  <Input
                    type="text"
                    name="limitCodePhoto"
                    className="formRadiusBank"
                    value={filterValue.limitCodePhoto}
                    onChange={handleFilterChange}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col d-flex justify-content-end buttonDiv">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Reset"}
                  onSubmit={handleClick}
                  onCancel={resetFilter}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {filteredArea && <FiltersSelected value={filterValue} />}
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
            {tableShow && (
              <CustomHeader
                TableData={columns.length > 0 ? columns : agentGroupHeader}
                CustomTableHeader={limitDatas}
                Edit={true}
                editUser={editLimitStatus}
                Delete={true}
                deleteUser={deleteLimitStatus}
                DeleteOnStatus={true}
                toPrint={toPrint ? true : false}
                DisableMange={toPrint ? true : false}
              />
            )}
          </Form>
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
      ></DeleteConfirmaionPopUp>
    </div>
  );
};

export default RemitTransactionLimit;
