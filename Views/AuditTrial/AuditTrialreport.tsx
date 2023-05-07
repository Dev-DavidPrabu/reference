import { useCallback, useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import "./AuditTrialreport.scss";
import {
  AuditDownloadReports,
  getAuditFunction,
  getAllAuditModule,
  resetAllRecords,
  resetPDFRecords,
  resetExcelRecords,
} from "../../redux/action/AuditTrailReportAction";
import { Select } from "antd";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { customValidator } from "../../Constants/Validation";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
const { Option } = Select;

const AuditTrialReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [Mindates, setMinDates] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [filterValue, setFilterValue] = useState({
    function: "",
    action: "",
    module: "",
    fromDate: "",
    toDate: "",
  });
  const [dateRangeError, setDateRangeError] = useState("");
  const auditTrailModule = useSelector(
    (state: RootStateOrAny) =>
      state.AuditTrailReportReducer?.getAllAuditModuleResponse
  );
  const auditTrailFunction = useSelector(
    (state: RootStateOrAny) =>
      state.AuditTrailReportReducer?.getAllAuditTrialFunctionResponse
  );
  const auditTrailExcelData = useSelector(
    (state: RootStateOrAny) =>
      state.AuditTrailReportReducer?.getAuditTrialExcelResponse
  );
  const auditTrailPdfData = useSelector(
    (state: RootStateOrAny) =>
      state.AuditTrailReportReducer?.getAuditTrialPdfResponse
  );
  const downloadReport = useCallback(
    async (type: any, data: any) => {
      try {
        dispatch(AuditDownloadReports(type, data));
      } catch (err) {}
    },
    [dispatch]
  );
  const fetchAllFunction = useCallback(
    async (id: any) => {
      try {
        dispatch(getAuditFunction(id));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetAllFilterData = useCallback(async () => {
    try {
      dispatch(resetAllRecords());
    } catch (err) {}
  }, [dispatch]);
  const fetchAllModule = useCallback(async () => {
    try {
      dispatch(getAllAuditModule());
    } catch (err) {}
  }, [dispatch]);
  //to load a initial data
  useEffect(() => {
    setIsLoading(true);
    fetchAllModule();
  }, [fetchAllFunction, fetchAllModule]);

  useEffect(() => {
    if (auditTrailModule !== undefined) {
      setIsLoading(false);
    } else if (auditTrailPdfData?.error) {
      setIsLoading(false);
      setApiMessage(auditTrailPdfData?.message);
      setApiStatus(false);
    }
  }, [auditTrailModule]);
  useEffect(() => {
    if (auditTrailPdfData?.data) {
      setIsLoading(false);
      if (auditTrailPdfData?.data?.reportURL) {
        window.location.href = auditTrailPdfData?.data?.reportURL;
      }
      dispatch(resetPDFRecords());
    } else if (auditTrailPdfData?.error) {
      setIsLoading(false);
      setApiMessage(auditTrailPdfData?.message);
      setApiStatus(false);
      dispatch(resetPDFRecords());
    }
  }, [auditTrailPdfData]);
  useEffect(() => {
    if (auditTrailExcelData?.data) {
      setIsLoading(false);
      if (auditTrailExcelData?.data?.reportURL) {
        window.location.href = auditTrailExcelData?.data?.reportURL;
      }
      dispatch(resetExcelRecords());
    } else if (auditTrailExcelData?.error) {
      setIsLoading(false);
      setApiMessage(auditTrailExcelData?.message);
      setApiStatus(false);
      dispatch(resetExcelRecords());
    }
  }, [auditTrailExcelData]);
  const dateRangeValidation = () => {
    let date1 = new Date(filterValue.fromDate);
    let date2 = new Date(filterValue.toDate);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (Difference_In_Days > 30) {
      setDateRangeError("Date range should be less than 30 day");
      return false;
    }
    setDateRangeError("");
    return true;
  };

  const handleSubmit = (type: any) => {
    if (dateRangeValidation()) {
      if (validate()) {
        setfilterOption(true);
        setIsLoading(true);
        let record = {
          function: filterValue.function,
          action: filterValue.action,
          module: filterValue.module,
          fromDate: filterValue.fromDate,
          toDate: filterValue.toDate,
        };
        if (type === "pdf") {
          downloadReport("pdf", record);
        } else {
          downloadReport("excel", record);
        }
      }
    }
  };
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
    if (e.target.name === "module") {
      fetchAllFunction(e.target.value);
    }
  };
  const handleChangeModule = (e: any) => {
    let obj = JSON.parse(e);
    setFilterValue({ ...filterValue, module: obj.name });
    fetchAllFunction(obj.id);
  };
  const validate = () => {
    let checkFromDateError = customValidator(
      "deviceid",
      "Date",
      filterValue.fromDate
    );
    let checkToDateError = customValidator(
      "deviceid",
      "Date",
      filterValue.toDate
    );
    let checkmoduleError = customValidator(
      "deviceid",
      "Module",
      filterValue.module
    );
    if (
      !(
        checkFromDateError === "null" &&
        checkToDateError === "null" &&
        checkmoduleError === "null"
      )
    ) {
      setDateRangeError("*field value are mandatory");
      return false;
    }
    setDateRangeError("");
    return true;
  };
  const closeMessage = () => {
    setApiMessage("");
  };
  const formatDate = (LastDate: any) => {
    let month = "" + (LastDate.getMonth() + 1);
    let day = "" + LastDate.getDate();
    let year = LastDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  var future = new Date(filterValue.fromDate);

  var LastDate = new Date(future.setDate(future.getDate() + 30));
  const dates = formatDate(LastDate);
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Audit Trail Report"}
          options={false}
          Audit={true}
        />
        <CustomLoader isLoading={isLoading} size={50} />
        <div>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={apiStatus}
              closeMessage={() => closeMessage()}
              message={apiMessage}
              errorFix={true}
            />
          )}
        </div>
        {filterOption && (
          <div className="colorWhite AuditTrial mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              {dateRangeError && (
                <span className="colorRedUser">{dateRangeError}</span>
              )}
            </p>
            <div className="filterInputAlign">
              <div className="d-flex col justify-content-between">
                <div className="col-2">
                  <FormGroup>
                    <Label for="exampleEmail">From Date</Label>
                    <span className="AuditTrial-color">*</span>
                    <Input
                      type="date"
                      value={filterValue.fromDate}
                      name="fromDate"
                      onChange={handleChange}
                      min={Mindates}
                      max={dates}
                      className="AuditTrial-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-2 ms-1">
                  <FormGroup>
                    <Label for="exampleEmail">To Date</Label>
                    <span className="AuditTrial-color">*</span>
                    <Input
                      type="date"
                      value={filterValue.toDate}
                      name="toDate"
                      onChange={handleChange}
                      min={filterValue.fromDate}
                      max={dates}
                      className="AuditTrial-input"
                    ></Input>
                  </FormGroup>
                </div>
                <div className="col-2 ms-1">
                  <FormGroup>
                    <Label for="exampleEmail">Module</Label>
                    <span className="AuditTrial-color">*</span>
                    <Select
                      value={filterValue.module}
                      onChange={handleChangeModule}
                      className="form-select AuditTrial-drop"
                    >
                      {auditTrailModule?.data?.map(
                        (optionValue: any, index: any) => {
                          return (
                            <Option
                              key={index}
                              value={JSON.stringify(optionValue)}
                            >
                              {optionValue.name}
                            </Option>
                          );
                        }
                      )}
                    </Select>
                  </FormGroup>
                </div>
                <div className="col-2 ms-1">
                  <FormGroup>
                    <Label for="exampleEmail">Function</Label>
                    <Input
                      type="select"
                      value={filterValue.function}
                      name="function"
                      onChange={handleChange}
                      className="form-select AuditTrial-drop"
                    >
                      <option></option>
                      {auditTrailFunction?.data?.map((option: any) => {
                        return (
                          <option value={option.name}>{option.name}</option>
                        );
                      })}
                    </Input>
                  </FormGroup>
                </div>
                <div className="col-2 ms-1">
                  <FormGroup>
                    <Label for="exampleEmail">Action</Label>
                    <Input
                      type="select"
                      value={filterValue.action}
                      name="action"
                      onChange={handleChange}
                      className="form-select AuditTrial-drop"
                    >
                      <option disabled hidden></option>
                      <option>UPDATE</option>
                      <option>DELETE</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>

              <div className="d-flex col">
                <div className="col-6"></div>
                <div className="d-flex justify-content-end ms-4 col-6">
                  <div className="mt-4 col-3">
                    <button
                      className="AuditTrial-load border-0"
                      onClick={() => handleSubmit("pdf")}
                    >
                      DownloadPdf
                    </button>
                  </div>
                  <div className="mt-4 col-3 ">
                    <button
                      className="AuditTrial-load border-0"
                      onClick={() => handleSubmit("excel")}
                    >
                      DownloadExcel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default AuditTrialReport;
