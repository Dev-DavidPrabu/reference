import { Form } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
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
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import "./RemitTransactionStatusDashboard.scss";

const RemitTransactionStatusDashboard = (props: any) => {
  const [form] = Form.useForm();
  const [columns, setcolumns] = useState([]);
  const componentRef = useRef<any>();
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [filterError, setFilterError] = useState(true);
  const [filterFunction, setFilterFunction] = useState({
    startDate: "",
    endDate: "",
    transactionStatusList: [],
    remitStatusList: [],
    receiverCountryList: [],
    paymentMethodList: [],
  });
  const [minEndDate, setMinEndDate] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(true);

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setIsLoading(false);
    setSearchArea(false);
    setTransactionStatus(false);
  };

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
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    const timer = setTimeout(() => {
      Print();
    }, 1000);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
  };
  const handleChange = (e: any) => {
    if (e.target.name === "startDate") {
      setMinEndDate(e.target.value);
    }
    setFilterFunction({ ...filterFunction, [e.target.name]: e.target.value });
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
  const handleCardSelected = (e: any) => {
    props.history.push({
      pathname: "/dashboard/remit-setup/Remittance-Transaction-Status",
    });
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Remittance Transaction Status Dashboard"}
        SummaryFileName={"Remittance Transaction Status Dashboard"}
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
          <div className={`mb-1 mt-2 remit-txn-total-view `}>
            <div className="ms-3 mt-1 d-flex align-items-center">
              <span className="remit-txn-total">
                {`Total Transaction : ${"235"} `}
              </span>
            </div>
          </div>
          <div className="row ">
            <div className="col">
              <Card
                className="card-top-margin remit-txn-cardRadius"
                onClick={handleCardSelected}
                style={{ cursor: "pointer" }}
              >
                <CardHeader className="headingCard">Initiated</CardHeader>
                <CardBody className="card-display">
                  <CardText className="span-font text-center contentBody">
                    100
                  </CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col">
              <Card className="card-top-margin remit-txn-cardRadius">
                <CardHeader className="headingCard">
                  Remittance System Error
                </CardHeader>
                <CardBody className="card-display">
                  <CardText className="span-font text-center contentBody">
                    30
                  </CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col">
              <Card className="card-top-margin remit-txn-cardRadius">
                <CardHeader className="headingCard">In Progress</CardHeader>
                <CardBody className="card-display">
                  <CardText className="span-font text-center contentBody">
                    25
                  </CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col">
              <Card className="card-top-margin remit-txn-cardRadius">
                <CardHeader className="headingCard">On Hold</CardHeader>
                <CardBody className="card-display">
                  <CardText className="span-font text-center contentBody">
                    60
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </div>
          <div className="row ">
            <div className="col-3">
              <Card className="card-top-margin remit-txn-cardRadius">
                <CardHeader className="headingCard">Cancelled</CardHeader>
                <CardBody className="card-display">
                  <CardText className="span-font text-center contentBody">
                    10
                  </CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-3">
              <Card className="card-top-margin remit-txn-cardRadius">
                <CardHeader className="headingCard">Paid</CardHeader>
                <CardBody className="card-display">
                  <CardText className="span-font text-center contentBody">
                    10
                  </CardText>
                </CardBody>
              </Card>
            </div>
          </div>
        </>
      )}
      {searchArea && (
        <div className="d-flex user-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop cursor"
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
          <Input type="text" className="ms-1 user-search-input" />
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
    </div>
  );
};

export default RemitTransactionStatusDashboard;
