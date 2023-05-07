import { useCallback, useEffect, useRef, useState } from "react";
import { FaFilter, FaReply } from "react-icons/fa";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import { useReactToPrint } from "react-to-print";
import { customValidator } from "../../Constants/Validation";
import CustomLoader from "../../Components/Loader/CustomLoader";
import "./IdExpiringReports.scss";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import {
  getIdExpiringReports,
  IdexpiringDownloadReports,
  resetIdExpiringReports,
  resetIdExpiringReportsDownloadExcel,
  resetIdExpiringReportsDownloadPdf,
} from "../../redux/action/IdExpiringReportsAction";
import FileSaver from "file-saver";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";

const IdExpiringReports = (props: any) => {
  const dispatch = useDispatch();
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [filterOption, setfilterOption] = useState(true);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [Mindates, setMinDates] = useState("");
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [filterValue, setFilterValue] = useState({
    startDate: "",
    enddate: "",
    mobileNumber: "",
    inputCode: "%2b60",
  });
  const [errors, setErrors] = useState({
    StartDescriptionError: "",
    endDateDescriptionError: "",
  });
  const [pdfVal, setPdfVal] = useState(false);
  const [minEndDate, setMinEndDate] = useState("");

  const idExpiringList: any = useSelector(
    (state: RootStateOrAny) =>
      state.IdExpiringReportsReducer.getIdExpiringResponse
  );
  const idExpiringDownloadPdf = useSelector(
    (state: RootStateOrAny) =>
      state.IdExpiringReportsReducer?.getIdExpiringPdfDownloadRes
  );

  const idExpiringDownloadExcel = useSelector(
    (state: RootStateOrAny) =>
      state.IdExpiringReportsReducer?.getIdExpiringExcelDownloadRes
  );
  const fetchIdexpiringDownloadReport = useCallback(
    async (data: any, type: any) => {
      try {
        dispatch(IdexpiringDownloadReports(data, type));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (idExpiringDownloadPdf?.data) {
      setIsLoading(false);
      if (idExpiringDownloadPdf?.data?.reportURL) {
        window.location.href = idExpiringDownloadPdf?.data?.reportURL;
      }
      dispatch(resetIdExpiringReportsDownloadPdf());
    } else if (idExpiringDownloadPdf?.error) {
      setIsLoading(false);
      dispatch(resetIdExpiringReportsDownloadPdf());
    }
  }, [idExpiringDownloadPdf]);

  useEffect(() => {
    if (idExpiringDownloadExcel?.data) {
      setIsLoading(false);
      if (idExpiringDownloadExcel?.data?.reportURL) {
        window.location.href = idExpiringDownloadExcel?.data?.reportURL;
      }
      dispatch(resetIdExpiringReportsDownloadExcel());
    } else if (idExpiringDownloadExcel?.error) {
      setIsLoading(false);
      dispatch(resetIdExpiringReportsDownloadExcel());
    }
  }, [idExpiringDownloadExcel]);

  const fetchIdExpiring = useCallback(
    async (filterValue: any) => {
      try {
        dispatch(getIdExpiringReports(filterValue));
      } catch (err) {}
    },
    [dispatch]
  );

  useEffect(() => {
    if (idExpiringList) {
      if (idExpiringList?.data) {
        setTable(true);
        setIsLoading(false);
      } else if (idExpiringList?.error) {
      }
    }
  }, [idExpiringList]);

  let reportsData = idExpiringList?.data;
  const resetData = useCallback(async () => {
    try {
      dispatch(resetIdExpiringReports());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    resetData();
    setTable(false);
  }, [resetData]);

  const header = [
    {
      title: "Name",
      dataIndex: "name",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.name?.localeCompare(b.name),
      },
    },
    {
      title: "URN",
      dataIndex: "urn",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.urn?.localeCompare(b.urn),
      },
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nationality?.localeCompare(b.nationality),
      },
    },
    {
      title: "ID Number",
      dataIndex: "idNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNumber?.localeCompare(b.idNumber),
      },
    },
    {
      title: "ID Type",
      dataIndex: "idType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNumber?.localeCompare(b.idNumber),
      },
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.issueDate?.localeCompare(b.issueDate),
      },
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.expiryDate?.localeCompare(b.expiryDate),
      },
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.localeCompare(b.mobileNumber),
      },
    },
  ];

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setMinEndDate("");
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b60",
    });
    resetData();
  };

  const validate = () => {
    let startDateError = customValidator(
      "idExpiring",
      "Any",
      filterValue.startDate
    );
    let endDateError = customValidator(
      "idExpiring",
      "Any",
      filterValue.enddate
    );

    if (!(startDateError === "null" && endDateError === "null")) {
      setErrors({
        StartDescriptionError: startDateError,
        endDateDescriptionError: endDateError,
      });
      return false;
    }
    setErrors({
      StartDescriptionError: "",
      endDateDescriptionError: "",
    });
    return true;
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
    setFilteredArea(false);
  };
  const closeSearch = () => {
    setSearchArea(false);
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      reportsData = reportsData?.filter((e: any) => {
        return (
          e.name
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.urn
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.nationality
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.idNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.idType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.issueDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.expiryDate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.mobileNumber
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      reportsData = reportsData?.filter((e: any) => {
        if (
          e[searchCategory]
            ?.toString()
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const handleSubmit = () => {
    if (validate()) {
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      setIsLoading(true);
      let datas = {
        startDate: filterValue.startDate,
        enddate: filterValue.enddate,
        mobileNumber: filterValue.mobileNumber
          ? filterValue.inputCode + filterValue.mobileNumber
          : "",
      };
      fetchIdExpiring(datas);
    }
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    if (e.target.name === "startDate") {
      setMinEndDate(e.target.value);
    }
  };
  let filePdf = "pdf";
  let fileExcel = "Excel";
  var data = {
    mobileNumber: filterValue.mobileNumber
      ? filterValue.inputCode + filterValue.mobileNumber
      : "",
    startDate: filterValue.startDate,
    endDate: filterValue.enddate,
  };

  const downloadPdf = () => {
    setIsLoading(true);
    fetchIdexpiringDownloadReport(data, filePdf);
  };

  const downloadExcel = () => {
    setIsLoading(true);
    fetchIdexpiringDownloadReport(data, fileExcel);
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setPrint(false);
    setTable(false);
    resetData();
    setFilterValue({
      startDate: "",
      enddate: "",
      mobileNumber: "",
      inputCode: "%2b",
    });
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
    setPrint(false);
    setcolumns([]);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns([]);
  };
  let value = {
    "start Date": filterValue.startDate
      ? filterValue.startDate.slice(8, 10) +
        "/" +
        filterValue.startDate.slice(5, 7) +
        "/" +
        filterValue.startDate.slice(0, 4)
      : "",
    "End Date": filterValue.enddate
      ? filterValue.enddate.slice(8, 10) +
        "/" +
        filterValue.enddate.slice(5, 7) +
        "/" +
        filterValue.enddate.slice(0, 4)
      : "",
    "mobile Number": filterValue.mobileNumber
      ? "+" + filterValue.inputCode.slice(3, 5) + " " + filterValue.mobileNumber
      : "",
  };
  const formatDate = (LastDate: any) => {
    let month = "" + (LastDate.getMonth() + 1);
    let day = "" + LastDate.getDate();
    let year = LastDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  var LastDate = new Date();
  const dates = formatDate(LastDate);

  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"ID Expiring Reports"}
          TableData={reportsData}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          downloadPdf={downloadPdf}
          downloadExcel={downloadExcel}
          toggleFilter={toggleFilter}
        />

        {filterOption && (
          <div className="colorWhite idExpiringreports-filter-section mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {errors.StartDescriptionError &&
                  errors.endDateDescriptionError &&
                  !(
                    errors.StartDescriptionError === "null" &&
                    errors.endDateDescriptionError === "null"
                  ) && (
                    <span className="colorRed"> * Fields are mandatory</span>
                  )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 inputcode form-select"
                      type="select"
                      name="inputCode"
                      onChange={handleChange}
                      value={filterValue.inputCode}
                    >
                      <option value="%2b60">+60</option>
                      <option value="%2b65">+65</option>
                      <option value="%2b91">+91</option>
                    </Input>
                    <Input
                      className="UnblockCardPending-input"
                      type="number"
                      value={filterValue.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </div>

              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">From Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.startDate}
                    name="startDate"
                    onChange={handleChange}
                    className="idExpiringreports-filter-section-input"
                    min={Mindates}
                    max={dates}
                  ></Input>
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">To Date</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="date"
                    value={filterValue.enddate}
                    name="enddate"
                    onChange={handleChange}
                    className="idExpiringreports-filter-section-input"
                    min={filterValue.startDate}
                    max={dates}
                  ></Input>
                </FormGroup>
              </div>

              <button
                onClick={handleSubmit}
                className="generateBtn border-0 LOD_btn_margin"
              >
                {" "}
                Load Data
              </button>
            </div>
          </div>
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

              <option value="name" className="cursor">
                Name
              </option>
              <option value="urn" className="cursor">
                URN
              </option>
              <option value="nationality" className="cursor">
                Nationality
              </option>
              <option value="idNumber" className="cursor">
                IdNumber
              </option>

              <option value="idType" className="cursor">
                IdType
              </option>
              <option value="issueDate" className="cursor">
                IssueDate
              </option>
              <option value="expiryDate" className="cursor">
                ExpiryDate
              </option>
              <option value="mobileNumber" className="cursor">
                MobileNumber
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
              <button
                className="border-0 bg-light"
                onClick={Print}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                here
              </button>{" "}
              to confirm and Print !. Or{" "}
              <button
                className="border-0 bg-light"
                onClick={cancelPrint}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Cancel
              </button>
            </span>
          )}
        </div>
        {filteredArea && <FiltersSelected value={value} />}
        <>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className="mt-3" ref={componentRef}>
              <Form form={form} component={false}>
                {table && (
                  <CustomHeader
                    TableData={columns.length > 0 ? columns : header}
                    editToggle={true}
                    Delete={false}
                    checkLength={reportsData.length}
                    CustomTableHeader={reportsData}
                    toPrint={toPrint ? true : false}
                    DisableMange={true}
                  />
                )}
              </Form>
            </div>
          )}
        </>
      </>
    </div>
  );
};

export default IdExpiringReports;
