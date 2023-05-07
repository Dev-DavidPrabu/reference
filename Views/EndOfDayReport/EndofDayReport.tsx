import { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import "./EndofDayReport.scss";
import { customValidator } from "../../Constants/Validation";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
const EndofDayReport = () => {
  const [columns, setColumns] = useState([]);
  const [filteredArea, setFilteredArea] = useState(false);
  const [table, setTable] = useState(false);
  const [filterOption, setfilterOption] = useState(true);
  const [Mindates, setMinDates] = useState("");

  const [filterValue, setFilterValue] = useState({
    startdate: "",
    enddate: "",
    status: "",
  });
  const [error, setError] = useState({
    startDateDescriptionError: "",
    enddateDescriptionError: "",
  });
  const header = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.startDate?.localeCompare(b.startDate),
      },
    },
    {
      title: "End Date",
      dataIndex: "EndDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.EndDate?.localeCompare(b.EndDate),
      },
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.transactionType?.localeCompare(b.transactionType),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.status?.localeCompare(b.status),
      },
    },
  ];
  const transactionData = [
    {
      startDate: "2022-05-13",
      endDate: "2022-06-13",
      transactionType: "Bank account",
      status: "Active",
    },
    {
      startDate: "2022-07-13",
      endDate: "2022-08-13",
      transactionType: "Cash Pickup",
      status: "Active",
    },
  ];
  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const Validation = () => {
    let startDate = customValidator(
      "startDate",
      "startDate",
      filterValue.startdate
    );
    let enddate = customValidator("endDate", "endDate", filterValue.enddate);
    if (!(startDate === "null" && enddate === "null")) {
      setError({
        startDateDescriptionError: startDate,
        enddateDescriptionError: enddate,
      });
      return false;
    }
    setError({
      startDateDescriptionError: "",
      enddateDescriptionError: "",
    });
    return true;
  };

  const handleSubmit = () => {
    if (Validation()) {
      setfilterOption(true);
      setTable(true);
      setFilteredArea(true);
    }
  };
  const toggleRefresh = () => {
    setTable(false);
    setFilteredArea(false);
    setFilterValue({
      startdate: "",
      enddate: "",
      status: "",
    });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    setTable(false);
  };
  let value = {
    "From Date": filterValue.startdate
      ? filterValue.startdate.slice(8, 10) +
        "/" +
        filterValue.startdate.slice(5, 7) +
        "/" +
        filterValue.startdate.slice(0, 4)
      : "",
    "To Date": filterValue.enddate
      ? filterValue.enddate.slice(8, 10) +
        "/" +
        filterValue.enddate.slice(5, 7) +
        "/" +
        filterValue.enddate.slice(0, 4)
      : "",
    Status: filterValue.status,
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
      <CommonHeaderSummaryReports
        RightContent={"End of Day Report"}
        filterEnabled={filterOption}
        options={false}
        toggleRefresh={toggleRefresh}
        toggleFilter={toggleFilter}
        TableData={transactionData}
      />

      {filterOption && (
        <div className="colorWhite EndOfDayReport mt-3 p-3">
          <p className="branchSetupTitle">
            Filter
            <p className="EndOfDayReport-colorRed">
              {error.startDateDescriptionError &&
                error.enddateDescriptionError && (
                  <span className="EndOfDayReport-colorRed">
                    * Fields are mandatory
                  </span>
                )}
            </p>
          </p>
          <div className="container-fluid filter_all_container">
            <div className="date_container">
              <FormGroup>
                <Label for="exampleEmail">From Date</Label>
                <span className="container-body-label-color">*</span>
                <Input
                  type="date"
                  value={filterValue.startdate}
                  name="startdate"
                  onChange={handleChange}
                  className="EndOfDayReport-input"
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
                  min={filterValue.startdate}
                  max={dates}
                  className="EndOfDayReport-input"
                ></Input>
              </FormGroup>
            </div>
            <div className="status_select_container">
              <FormGroup>
                <Label for="exampleEmail">Status</Label>

                <Input
                  name="status"
                  className="form-select"
                  type="select"
                  value={filterValue.status}
                  onChange={handleChange}
                >
                  <option>select</option>
                </Input>
              </FormGroup>
            </div>

            <button
              className="EndOfDayReport-generateBtn border-0 LOD_btn_margin"
              onClick={handleSubmit}
            >
              Load Data
            </button>
          </div>
        </div>
      )}
      {filteredArea && <FiltersSelected value={value} />}
      <div className="mt-4">
        {table && (
          <>
            <CustomHeader
              TableData={columns.length > 0 ? columns : header}
              DisableMange={true}
              CustomTableHeader={transactionData}
              checkLength={transactionData.length}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default EndofDayReport;
