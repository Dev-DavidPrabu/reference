import { Form } from "antd";
import React, { useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { Button, FormGroup, Input, Label } from "reactstrap";
import AddCardReplacement from "../../Components/AddCardReplacement/AddCardReplacement";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CustomLoader from "../../Components/Loader/CustomLoader";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import { CardReplacementInfo } from "../../models/CardReplacementModel";
import "./CardReplacement.scss";

const CardReplacement = (props: any) => {
  const [filterOption, setfilterOption] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [isFiltered, setIsfiltered] = useState(false);
  const [cardDetail, setCardDetail] = useState("");
  const [tableShow, setTableShow] = useState(false);
  const [walletId, setWalletId] = useState([]);
  const [searchUserData, setsearchUserData] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [addCardReplacement, setAddCardReplacement] = useState("");
  const [filterDetail, setFilterDetail] = useState({
    approverId: "",
    cardExpirydate: "",
    cardL4d: "",
    customerName: "",
    inputOperatorId: "",
    mobileNo: "",
    requestChannel: "",
    requestReasoncode: "",
    requeststatus: "",
    walletId: "",
    blcokExpirydate: "",
    replacementFee: "",
  });

  let cardHeader = [
    {
      title: "Wallet ID",
      dataIndex: "walletId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletId.localeCompare(b.walletId),
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName.localeCompare(b.customerName),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileNo.localeCompare(b.mobileNo),
      },
    },
    {
      title: "Card L4D",
      dataIndex: "cardL4d",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cardL4d.localeCompare(b.cardL4d),
      },
    },
    {
      title: "Card Expiry Date",
      dataIndex: "cardExpirydate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardExpirydate.localeCompare(b.cardExpirydate),
      },
    },
    {
      title: "Request Reason Code",
      dataIndex: "requestReasoncode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestReasoncode.localeCompare(b.requestReasoncode),
      },
    },
    {
      title: "Request Status",
      dataIndex: "requeststatus",
      checked: true,
      editable: false,
      sorter: {
        compare: (a: any, b: any) =>
          a.requeststatus.localeCompare(b.requeststatus),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: {
              color:
                dataIndex === "Approved"
                  ? "#39C570"
                  : dataIndex === "Error"
                  ? "red"
                  : "#F87700",
            },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
    {
      title: "Request Channel",
      dataIndex: "requestChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestChannel.localeCompare(b.requestChannel),
      },
    },
    {
      title: "Input Operator ID",
      dataIndex: "inputOperatorId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.inputOperatorId.localeCompare(b.inputOperatorId),
      },
    },
    {
      title: "Approver ID",
      dataIndex: "approverId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.approverId.localeCompare(b.approverId),
      },
    },
  ];

  let cardData = [
    {
      walletId: "W10001",
      customerName: "Aman Jain",
      mobileNo: "+65 6649200210",
      cardL4d: "122",
      cardExpirydate: "20/05/2025",
      requestReasoncode: "Stolen Card",
      requeststatus: "Error",
      requestChannel: "BO",
      inputOperatorId: "UID00101145",
      approverId: "AID 000477",
      paymentMethod: "Cash",
      finalAmount: "100.00",
    },
    {
      walletId: "W10002",
      customerName: "Jeevan",
      mobileNo: "+91 9878778877",
      cardL4d: "124",
      cardExpirydate: "23/02/2023",
      requestReasoncode: "Lost Card",
      requeststatus: "Approved",
      requestChannel: "ET",
      inputOperatorId: "UID00101123",
      approverId: "AID 000354",
      paymentMethod: "Transfer",
      finalAmount: "105.00",
    },
    {
      walletId: "W10003",
      customerName: "Sai Sanjay",
      mobileNo: "+65 663343424",
      cardL4d: "123",
      cardExpirydate: "12/01/2025",
      requestReasoncode: "ATM Retains",
      requeststatus: "Created",
      requestChannel: "Mobile",
      inputOperatorId: "UID00101100",
      approverId: "AID 000265",
      paymentMethod: "Cash",
      finalAmount: "110.00",
    },
  ];

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const handleAdd = () => {
    setAddCardReplacement("add");
  };

  const onCancel = () => {
    setAddCardReplacement("");
  };

  let newCardDatas = cardData.map((data: any, index: any) => {
    return { ...data, key: index };
  });

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      
      setWalletId(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      walletId: record?.walletId,
    }),
  };

  const viewUser = (e: any) => {
    props.history.push({
      pathname: "/dashboard/SRF/View-Card-Replacement",
      state: e,
    });
  };

  const submitHandlers = () => {
    if (walletId.length > 0) {
      setIsLoading(true);
      const ids = walletId.map(function (item: any) {
        return item["walletId"];
      });
    } else {
    }
  };

  const handleClick = () => {
    setfilterOption(false);
    setFilteredArea(true);
    setTableShow(true);
  };

  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    setIsfiltered(true);
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };

  const handleSearchReset = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      newCardDatas = newCardDatas.filter((e: any | CardReplacementInfo) => {
        return (
          e.walletId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.customerName
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.mobileNo?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.cardId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.cardExpirydate
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.requeststatus
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.requestChannel
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.inputOperatorId
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.approverId?.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.requestReasoncode
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      newCardDatas = newCardDatas.filter((e: any | CardReplacementInfo) => {
        if (
          e[searchCategory].toUpperCase().includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };

  const handleChange = (e: any) => {
    setFilterDetail({ ...filterDetail, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      {!addCardReplacement && (
        <>
          <CommonHeaderSummary
            RightContent={"SRF - Card Replacement"}
            SummaryFileName={"SRF - Card Replacement"}
            searchArea={toggleSearch}
            search={searchArea}
            filterRemit={true}
            filterArea={toggleFilter}
            filterEnabled={filterOption}
            Refresh={true}
            List={true}
            Add={true}
            AddAction={handleAdd}
            refresh={toggleRefresh}
            Print={handlePrint}
            ListData={handleList}
            SummaryColumn={
              orginalColumns.length > 0 ? orginalColumns : cardHeader
            }
            TableData={newCardDatas}
          />

          {filterOption && (
            <div className="cardReplaceFilterSection mt-3 p-3">
              <div className="d-flex justify-content-between">
                <p className="cardReplaceFilter">Filter</p>
              </div>
              <div className="container-fluid">
                <div className="row ">
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabel">
                        Mobile No
                      </Label>
                      <Input
                        type="text"
                        name="mobileNo"
                        className="filterClass"
                        placeholder="Enter MobileNo"
                        onChange={handleChange}
                        value={filterDetail.mobileNo}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabel">
                        Card L4D
                      </Label>
                      <Input
                        type="text"
                        name="cardL4d"
                        className="filterClass"
                        placeholder="Enter Card L4D"
                        onChange={handleChange}
                        value={filterDetail.cardL4d}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabelNew">
                        Request Reason Code
                      </Label>
                      <Input
                        type="select"
                        name="requestReasoncode"
                        className="filterClass form-select"
                        onChange={handleChange}
                        value={filterDetail.requestReasoncode}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabel">
                        Request Status
                      </Label>
                      <Input
                        type="select"
                        name="requeststatus"
                        className="filterClass form-select"
                        onChange={handleChange}
                        value={filterDetail.requeststatus}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabel">
                        Request Channel
                      </Label>
                      <Input
                        type="select"
                        name="requestChannel"
                        className="filterClass form-select"
                        onChange={handleChange}
                        value={filterDetail.requestChannel}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabel">
                        Input Operator ID
                      </Label>
                      <Input
                        type="text"
                        name="inputOperatorId"
                        className="filterClass"
                        placeholder="Enter Input Operator ID"
                        onChange={handleChange}
                        value={filterDetail.inputOperatorId}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="exampleEmail" className="cardReplaceLabel">
                        Approver ID
                      </Label>
                      <Input
                        type="text"
                        name="approverId"
                        className="filterClass"
                        placeholder="Enter Approver ID"
                        onChange={handleChange}
                        value={filterDetail.approverId}
                      ></Input>
                    </FormGroup>
                  </div>
                  <div className="col d-flex justify-content-end buttonDiv">
                    <SubmitCancelButton
                      button={"Submit"}
                      secondButton={"Reset"}
                      onSubmit={handleClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {filteredArea && <FiltersSelected value={filterDetail} />}

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

                <option value="walletId" className="cursor">
                  Wallet ID
                </option>
                <option value="customerName" className="cursor">
                  Customer Name
                </option>
                <option value="mobileNo" className="cursor">
                  Mobile No
                </option>
                <option value="cardL4d" className="cursor">
                  Card L4D
                </option>
                <option value="cardExpirydate" className="cursor">
                  Card Expiry Date
                </option>
                <option value="requestReasonCode" className="cursor">
                  Request Reason Code
                </option>
                <option value="requestStatus" className="cursor">
                  Request Status
                </option>
                <option value="requestChannel" className="cursor">
                  Request Channel
                </option>
                <option value="inputOperatorId" className="cursor">
                  Input Operator ID
                </option>
                <option value="approverId" className="cursor">
                  Approver ID
                </option>
                <option value="any" className="cursor">
                  Any
                </option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                onChange={(ev) => handleSearch(ev)}
                placeholder="Type your search keyword"
              />
              <div className="ms-1">
                <Button className="searchBtnAccount">Search</Button>
              </div>
              <div>
                <Button
                  className="text-white  border-0 ms-1"
                  onClick={handleSearchReset}
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
            <>
              <div className="mt-3" ref={componentRef}>
                <Form form={form} component={false}>
                  <CustomHeader
                    TableData={columns.length > 0 ? columns : cardHeader}
                    rowSelection={rowSelection}
                    dataSources={newCardDatas}
                    columns={cardHeader}
                    handlesubmit={submitHandlers}
                    viewUser={viewUser}
                    view={true}
                    isFiltered={isFiltered}
                    disableCustomRowSelection={true}
                    approval={toPrint ? false : true}
                    reason={true}
                    DisableMange={columns.length > 0 && toPrint ? true : false}
                    CustomTableHeader={
                      Array.isArray(newCardDatas)
                        ? newCardDatas
                        : [newCardDatas]
                    }
                    toPrint={columns.length > 0 ? true : false}
                  />
                </Form>
              </div>
            </>
          )}
        </>
      )}
      {addCardReplacement && (
        <AddCardReplacement
          showAddBlockCard={addCardReplacement}
          cardDetail={cardDetail}
          onCancel={onCancel}
        />
      )}
    </div>
  );
};

export default CardReplacement;
