import { Form } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import moment from "moment";
import "./RemitTransactionStatus.scss";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import {
  getStatusList,
  getStatusTableDatas,
} from "../../redux/action/RemitTransactionProcessingAction";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";

const RemitTransactionStatus = (props: any) => {
  const [form] = Form.useForm();
  const [columns, setcolumns] = useState([]);
  const componentRef = useRef<any>();
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [tableShow, setTableShow] = useState(false);
  const [toPrint, setPrint] = useState(false);

  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const dispatch = useDispatch();
  const [filterError, setFilterError] = useState(true);
  const [filterFunction, setFilterFunction] = useState({
    startDate: "",
    endDate: "",
    transactionStatusList: [],
    remitStatusList: [],
    receiverCountryList: [],
    paymentMethodList: [],
  });
  const [transactionStatus, setTransactionStatus] = useState(true);
  const [minEndDate, setMinEndDate] = useState("");
  const transactionStatusHeader = [
    {
      title: "Txn Ref No",
      dataIndex: "transactionReference",
      checked: true,
      key: "uid",
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionReference.localeCompare(b.transactionReference),
      },
      render: (value: any, record: any) => {
        return (
          <div className={`cursor `} onClick={() => OnClickTransaction(record)}>
            <span className="remit-txn-color">{value}</span>
          </div>
        );
      },
    },
    {
      title: "Txn Date",
      dataIndex: "transactionDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionDate.localeCompare(b.transactionDate),
      },
    },
    {
      title: "Amount (MYR)",
      dataIndex: "transactionAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.transactionAmount - b.transactionAmount,
      },
    },
    {
      title: "Payable Amount",
      dataIndex: "senderAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.senderAmount - b.senderAmount,
      },
    },
    {
      title: "Payout Amount",
      dataIndex: "receiverAmount",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.receiverAmount - b.receiverAmount,
      },
    },
    {
      title: "Country",
      dataIndex: "receiverCountryCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverCountryCode.localeCompare(b.receiverCountryCode),
      },
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMethodCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.paymentMethodCode.localeCompare(b.paymentMethodCode),
      },
    },
    {
      title: "Status",
      dataIndex: "transactionStatusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionStatusCode.localeCompare(b.transactionStatusCode),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "Paid" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
    {
      title: "MIRS No",
      dataIndex: "mirsNo",
      checked: false,
      sorter: {
        compare: (a: any, b: any) => a.mirsNo - b.mirsNo,
      },
    },
    {
      title: "Receiver Country",
      dataIndex: "receiverCountryCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverCountryCode.localeCompare(b.receiverCountryCode),
      },
    },
    {
      title: "On behalf Flag - Y/N",
      dataIndex: "isOnBehalfSender",
      checked: false,
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "Y" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
      sorter: {
        compare: (a: any, b: any) =>
          a.isOnBehalfSender.localeCompare(b.isOnBehalfSender),
      },
    },
    {
      title: "Sender Name",
      dataIndex: "senderName",
      checked: false,
      sorter: {
        compare: (a: any, b: any) => a.senderName.localeCompare(b.senderName),
      },
    },
    {
      title: "Receiver Name",
      dataIndex: "receiverFirstName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.receiverName.localeCompare(b.receiverName),
      },
    },
  ];

  const statusCountData = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getStatusCountResponse
  );
  const statusTableDatasValues = useSelector(
    (state: RootStateOrAny) =>
      state.RemitTransactionProcessingReducer?.getCountTableDataResponse
  );

  let statusCountValues = statusCountData?.data;

  useEffect(() => {
    fetchRemitCountResponse();
  }, []);
  useEffect(() => {
    if (statusTableDatasValues?.data) {
      setIsLoading(false);
    }
  }, [statusTableDatasValues]);
  useEffect(() => {
    if (statusCountValues) {
      setIsLoading(false);
    }
  }, [statusCountValues]);
  useEffect(() => {
    if (!statusCountValues) {
      setIsLoading(true);
    }
  }, [statusCountValues]);
  const fetchRemitCountResponse = useCallback(async () => {
    try {
      dispatch(getStatusList());
    } catch (err) {}
  }, [dispatch]);
  const fetchRemitTableDataResponse = useCallback(
    async (status: any) => {
      try {
        dispatch(getStatusTableDatas(status));
      } catch (err) {}
    },
    [dispatch]
  );

  const OnClickTransaction = (data: any) => {
    const datum = data?.transactionReference;
    props.history.push({
      pathname: "/dashboard/remit-setup/Remittance-Transaction-Enquiry",
      state: {
        id: datum,
        page: "dashboard",
      },
    });
  };

  let transferDataStatus = statusTableDatasValues?.data?.map(
    (data: any, index: any) => {
      return { ...data, key: index };
    }
  );

  const closeSearch = () => {
    setSearchArea(false);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setIsLoading(false);
    setSearchArea(false);
    setTransactionStatus(false);
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };
  const submitHandlers = (value: any) => {};
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      
    },
    getCheckboxProps: (record: any) => ({
      transactionId: record?.transactionId,
    }),
  };
  const handleSubmit = () => {
    setfilterOption(false);
    setFilterError(true);
    setTransactionStatus(true);
    if (filterFunction.startDate && filterFunction.endDate) {
      setIsLoading(true);
    } else {
      setFilterError(false);
    }
  };
  const onReset = () => {
    setFilterFunction({
      startDate: "",
      endDate: "",
      transactionStatusList: [],
      remitStatusList: [],
      receiverCountryList: [],
      paymentMethodList: [],
    });
    setMinEndDate("");
    setFilterError(true);
  };
  const handleChange = (e: any) => {
    if (e.target.name === "startDate") {
      setMinEndDate(e.target.value);
    }
    setFilterFunction({ ...filterFunction, [e.target.name]: e.target.value });
  };
  const handleCardSelected = (status: any) => {
    setIsLoading(true);

    fetchRemitTableDataResponse(status);
    setTransactionStatus(!transactionStatus);

    setTableShow(!tableShow);
  };
  const [chunckLength, setChunkLength] = useState(3);

  function chunks(arr: any, chunkSize: any) {
    chunkSize = parseInt(chunkSize);
    const res = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const clickBack = () => {
    setTransactionStatus(!transactionStatus);

    setTableShow(!tableShow);
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Remittance Transaction Status"}
        SummaryFileName={"Remittance Transaction Status"}
        searchArea={toggleSearch}
        search={searchArea}
        filterRemit={true}
        filterArea={toggleFilter}
        filterEnabled={filterOption}
        Refresh={true}
        List={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : transactionStatusHeader
        }
        TableData={transferDataStatus}
      />

      {filterOption && (
        <div className="colorWhite remit-txn-filter mt-3 p-3">
          <div className="d-flex justify-content-between">
            <p className="remitTransFilter">Filter</p>
            <span
              className={`remit-processing-mandatory ${
                filterError && "d-none"
              }`}
            >
              {" "}
              ** All field value is mandatory
            </span>
          </div>
          <div className="container-fluid branchFilter">
            <div className="row">
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Start Date
                    <span className="remit-processing-mandatory">*</span>
                  </Label>
                  <Input
                    type="date"
                    name="startDate"
                    className="remit-processing-formRadius "
                    value={filterFunction.startDate}
                    onChange={handleChange}
                    max={moment().format("YYYY-MM-DD")}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    End Date
                    <span className="remit-processing-mandatory">*</span>
                  </Label>
                  <Input
                    type="date"
                    name="endDate"
                    className="remit-processing-formRadius "
                    value={filterFunction.endDate}
                    onChange={handleChange}
                    min={minEndDate}
                    max={moment().format("YYYY-MM-DD")}
                  ></Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Payout Country
                  </Label>
                  <Input
                    type="select"
                    name="receiverCountryList"
                    className="remit-processing-formRadius form-select"
                    value={filterFunction.receiverCountryList}
                    onChange={handleChange}
                  >
                    <option key="-1" value="select">
                      Select Country
                    </option>
                  </Input>
                </FormGroup>
              </div>
              <div className="col">
                <FormGroup className="">
                  <Label for="exampleEmail" className="secondary_label_txt">
                    Payment Mode
                  </Label>
                  <Input
                    type="select"
                    name="paymentMethodList"
                    className="remit-processing-formRadius form-select"
                    value={filterFunction.paymentMethodList}
                    onChange={handleChange}
                  >
                    <option key="-1" value="select">
                      Select Payment
                    </option>{" "}
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3 me-3">
            <SubmitCancelButton
              button="Submit"
              secondButton="Reset"
              onSubmit={handleSubmit}
              onCancel={onReset}
            />
          </div>
        </div>
      )}
      {transactionStatus && (
        <>
          {isLoading ? null : (
            <div className={`mb-1 mt-2 remit-txn-total-view `}>
              <div className="ms-3 mt-1 d-flex align-items-center">
                <span className="remit-txn-total">
                  {`Total Transaction : ${"235"} `}
                </span>
              </div>
            </div>
          )}

          <div className="row flex-wrap">
            {statusCountValues?.map((data: any) => (
              <div className="col-sm-4">
                <Card
                  className="card-top-margin remit-txn-cardRadius"
                  onClick={() => handleCardSelected(data?.remitStatusCode)}
                  style={{ cursor: "pointer" }}
                >
                  <CardHeader className="headingCard">
                    {data?.remitStatusCode}
                  </CardHeader>
                  <CardBody className="card-display">
                    <CardText className="span-font text-center contentBody">
                      {data?.count}
                    </CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
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

            <option value="transactionDateTime" className="cursor">
              transactionDateTime
            </option>
            <option value="transactionRefNo" className="cursor">
              transactionRefNo
            </option>
            <option value="Amount" className="cursor">
              Amount
            </option>
            <option value="transactionStatus" className="cursor">
              transactionStatus
            </option>
            <option value="remitanceSystemStatus" className="cursor">
              remitanceSystemStatus
            </option>
            <option value="refundFlag" className="cursor">
              refundFlag
            </option>
            <option value="ecdd" className="cursor">
              ecdd
            </option>
            <option value="senderCountry" className="cursor">
              senderCountry
            </option>
            <option value="paymentMode" className="cursor">
              paymentMode
            </option>
            <option value="mirsNo" className="cursor">
              mirsNo
            </option>
            <option value="receiverCountry" className="cursor">
              receiverCountry
            </option>
            <option value="onBehalfFlag" className="cursor">
              onBehalfFlag
            </option>
            <option value="senderName" className="cursor">
              senderName
            </option>
            <option value="receiverName" className="cursor">
              receiverName
            </option>
            <option value="onBehalfSenderName" className="cursor">
              onBehalfSenderName
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
        <div className={`${tableShow ? "" : "d-none"}`} ref={componentRef}>
          <div className="d-flex justify-content-end align-items-center pb-3">
            <CustomButton className="backBtnDevice" onClick={clickBack}>
              <TiArrowBackOutline style={{ margin: "auto 5px" }} />
              Back
            </CustomButton>
          </div>
          <Form form={form} component={false}>
            {tableShow && (
              <CustomHeader
                TableData={
                  columns.length > 0 ? columns : transactionStatusHeader
                }
                CustomTableHeader={transferDataStatus}
                toPrint={columns.length > 0 && toPrint ? true : false}
                DisableMange={true}
                approval={toPrint ? false : true}
                approve={true}
                handlesubmit={submitHandlers}
                rowSelection={rowSelection}
              />
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default RemitTransactionStatus;
