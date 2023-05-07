import { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import type { DatePickerProps } from "antd";
import CommonHeaderSummaryReports from "../../Components/CustomReportsHeader/CustomReportsHeader";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";
import { customValidator } from "../../Constants/Validation";
import "./CustomerRiskSummaryReport.scss";
import { DatePicker } from "antd";

const CustomerRiskSummaryReport = () => {
  const [filterOption, setfilterOption] = useState(true);
  const [filteredArea, setFilteredArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [table, setTable] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [filterValue, setFilterValue] = useState({
    mobileNumber: "",
    inputCode: "",
    year: "",
    month: "",
  });
  const [error, setError] = useState({
    YearDescriptionError: "",
    MonthDescriptionError: "",
  });
  const reportsData = [
    {
      SNo: "1",
      customerName: "Albert",
      idNo: "12345",
      idType: "MyKad",
      mobileNo: "+918976898678",
      total: "110000.00",
      cdd: "",
      edd: "",
      type: "",
    },
  ];
  let value = {
    mobileNumber: filterValue.inputCode + filterValue.mobileNumber,
    year: filterValue.year,
    month: filterValue.month,
  };

  const handleChange = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "",
      year: "",
      month: "",
    });
  };
  const handleChangeYear: DatePickerProps["onChange"] = (date, dateString) => {
    setFilterValue({ ...filterValue, ["year"]: dateString });
  };
  const toggleRefresh = () => {
    setFilteredArea(false);
    setcolumns([]);
    setTable(false);
    setFilterValue({
      mobileNumber: "",
      inputCode: "",
      year: "",
      month: "",
    });
  };
  const Validation = () => {
    let YearError = customValidator("userId", "Year", filterValue.year);
    let MonthError = customValidator("userId", "Month", filterValue.month);

    if (!(YearError === "null" && MonthError === "null")) {
      setError({
        YearDescriptionError: YearError,
        MonthDescriptionError: MonthError,
      });
      return false;
    }
    setError({
      YearDescriptionError: "",
      MonthDescriptionError: "",
    });
    return true;
  };

  const header = [
    {
      title: "S.No",
      dataIndex: "SNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.SNo?.localeCompare(b.SNo),
      },
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.customerName?.localeCompare(b.customerName),
      },
    },

    {
      title: "ID No",
      dataIndex: "idNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idNo?.localeCompare(b.idNo),
      },
    },
    {
      title: "ID Type",
      dataIndex: "idType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idType?.localeCompare(b.idType),
      },
    },
    {
      title: "Mobile No",
      dataIndex: "mobileNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.mobileNo?.localeCompare(b.mobileNo),
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.total?.localeCompare(b.total),
      },
    },
    {
      title: "CDD",
      dataIndex: "cdd",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.cdd?.localeCompare(b.cdd),
      },
    },
    {
      title: "EDD",
      dataIndex: "edd",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.edd?.localeCompare(b.edd),
      },
    },

    {
      title: "Type",
      dataIndex: "type",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.type?.localeCompare(b.type),
      },
    },
  ];
  const handleSubmit = () => {
    if (Validation()) {
      setFilteredArea(true);
      setfilterOption(true);
      setTable(true);
      setFilterValue({
        mobileNumber: "",
        inputCode: "",
        year: "",
        month: "",
      });
    }
  };
  return (
    <div className="p-4">
      <>
        <CommonHeaderSummaryReports
          RightContent={"Customer Risk Summary Report"}
          filterEnabled={filterOption}
          options={false}
          toggleRefresh={toggleRefresh}
          toggleFilter={toggleFilter}
          TableData={reportsData}
        />
        {filterOption && (
          <div className="colorWhite CustomerRiskSummaryReport mt-3 p-3">
            <p className="branchSetupTitle">
              Filter
              <p className="colorRed">
                {error.YearDescriptionError && error.MonthDescriptionError && (
                  <span className="colorRed">*Fields are mandatory</span>
                )}
              </p>
            </p>
            <div className="container-fluid filter_all_container">
              <div className="mobile_container">
                <FormGroup>
                  <Label>Mobile Number</Label>
                  <div className="mobile_field_collection">
                    <Input
                      className="border-1 btn--sizer inputcode form-select"
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
                  <Label for="exampleEmail">Year</Label>
                  <span className="container-body-label-color">*</span>
                  <DatePicker
                    placeholder="Select"
                    disabled={false}
                    className="form-select CustomerRiskSummaryReport-select-box"
                    name="year"
                    onChange={handleChangeYear}
                    picker="year"
                  />
                </FormGroup>
              </div>
              <div className="date_container">
                <FormGroup>
                  <Label for="exampleEmail">Month</Label>
                  <span className="container-body-label-color">*</span>
                  <Input
                    type="select"
                    value={filterValue.month}
                    name="month"
                    onChange={handleChange}
                    className="form-select CustomerRiskSummaryReport-select-box"
                  >
                    <option selected hidden>
                      Select
                    </option>
                    <option value="JAN">JAN</option>
                    <option value="Mar">FEB</option>
                    <option value="MAR">MAR</option>
                    <option value="APR">APR</option>
                    <option value="MAY">MAY</option>
                    <option value="JUN">JUN</option>
                    <option value="JUL">JUL</option>
                    <option value="AUG">AUG</option>
                    <option value="SEP">SEP</option>
                    <option value="OCT">OCT</option>
                    <option value="NOV">NOV</option>
                    <option value="DEC">DEC</option>
                  </Input>
                </FormGroup>
              </div>
              <button
                className="generateBtn border-0 LOD_btn_margin"
                onClick={handleSubmit}
              >
                Load Data
              </button>
            </div>
          </div>
        )}
        {filteredArea && <FiltersSelected value={value} />}
        <div className="mt-3">
          {table && (
            <CustomHeader
              TableData={columns.length > 0 ? columns : header}
              CustomTableHeader={reportsData}
              DisableMange={true}
              checkLength={reportsData.length}
            />
          )}
        </div>
      </>
    </div>
  );
};
export default CustomerRiskSummaryReport;
