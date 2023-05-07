import React, { useRef, useState } from "react";
import "./Account.scss";
import { lastRoute } from "../../Components/Breadcrumbs/Breadcrumbs";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import { useReactToPrint } from "react-to-print";
import { Header } from "antd/lib/layout/layout";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";
import { Form, Row, Col, Input } from "reactstrap";

function Account() {
  const [filterArea, setFilterArea] = useState(true);

  const toggleFiler = () => {
    setFilterArea(!filterArea);
    setPrint(false);
  };

  const [accountFilterQuery, setAccountFilterQuery] = useState({
    accountNumber: "",
    accountMasterId: "",
    currencyCode: "",
    productCode: "",
    accountStatus: "",
    accountName: "",
  });

  const Header = [
    {
      title: "A/C No",
      dataIndex: "accNo",
      key: "accNo",
      sorter: {
        compare: (a: any, b: any) => a.accNo.localeCompare(b.accNo),
      },
    },

    {
      title: "A/C Name",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "Currency Code",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "A/C Balance",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "A/C Master",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "Product Code",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "Last Cust Txn Date",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "Last Sys Txn Date",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "A/C Opening",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "A/C Closing",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
    {
      title: "Status",
      dataIndex: "accName",
      key: "accName",
      sorter: {
        compare: (a: any, b: any) => a.accName.localeCompare(b.accName),
      },
    },
  ];

  const accountList = [
    {
      accNo: "",
      accName: "",
    },
  ];

  const [toPrint, setPrint] = useState(false);
  const handlePrint = (e: any) => {
    setPrint(!toPrint);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="Account">
      <CommonHeaderSummary
        RightContent={lastRoute}
        SummaryFileName={lastRoute}
        SummaryColumn={[
          "ID",
          "Name",
          "Module",
          "Usage",
          "Enabled",
          "Status Message",
        ]}
        TableData={accountList}
        Print={handlePrint}
        filterArea={toggleFiler}
        filter={filterArea}
      />
      {filterArea && (
        <div className="p-3">
          <div className="user-filter-section" style={{ height: "100%" }}>
            <Form>
              <div className="Form-group">
                <div
                  className="p-3"
                  style={{
                    fontSize: "18px",
                    color: "#FFFFFF",
                    fontWeight: "500",
                  }}
                >
                  Filter
                </div>
                <div className="col d-flex px-2">
                  <div className="col-2 px-2">
                    <label
                      style={{ color: "white", marginBottom: "10px" }}
                      className="edit-sum-label"
                    >
                      Account NO
                    </label>
                    <CustomInput
                      className="prefund-Account-input remove-border-radius"
                      name="value2"
                      id="value2"
                    />
                  </div>
                  <div className="col-2 px-2">
                    <label
                      style={{ color: "white", marginBottom: "10px" }}
                      className="edit-sum-label"
                    >
                      Account Name
                    </label>
                    <CustomInput
                      className="prefund-Account-input remove-border-radius"
                      name="value2"
                      id="value2"
                    />
                  </div>
                  <div className="col-2 px-2">
                    <label
                      style={{ color: "white", marginBottom: "10px" }}
                      className="edit-sum-label"
                    >
                      Currency Code
                    </label>
                    <CustomInput
                      className="prefund-Account-input remove-border-radius"
                      name="value2"
                      id="value2"
                    />
                  </div>
                  <div className="col-2 px-2">
                    <label
                      style={{ color: "white", marginBottom: "10px" }}
                      className="edit-sum-label"
                    >
                      Product Code
                    </label>
                    <CustomInput
                      className="prefund-Account-input remove-border-radius"
                      name="value2"
                      id="value2"
                    />
                  </div>
                  <div className="col-2 px-2">
                    <label
                      style={{ color: "white", marginBottom: "10px" }}
                      className="edit-sum-label"
                    >
                      Account Master UID
                    </label>
                    <CustomInput
                      className="prefund-Account-input remove-border-radius"
                      name="value2"
                      id="value2"
                    />
                  </div>
                  <div className="col-2 px-2">
                    <label
                      style={{ color: "white", marginBottom: "10px" }}
                      className="edit-sum-label"
                    >
                      Account Status
                    </label>
                    <CustomInput
                      className="prefund-Account-input remove-border-radius"
                      name="value2"
                      id="value2"
                    />
                  </div>
                </div>
                <div className="col d-flex p-3">
                  <div className="col-10"></div>
                  <div className="col-2 gap-1">
                    <CustomButton
                      className="Submit-btn remove-border-radius mx-3"
                      component={"payrollEnquiry"}
                      color={"secondary"}
                    >
                      Fetch
                    </CustomButton>
                    <CustomButton
                      color="secondary"
                      className={"remove-border-radius"}
                      component={"payrollEnquiry"}
                    >
                      Reset
                    </CustomButton>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
      <div className="mt-3" ref={componentRef}>
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
            to confirm and Print !
          </span>
        )}
      </div>
      <div className="px-3">
        <CustomTable
          TableData={Header}
          CustomTableHeader={accountList}
          delete={false}
          manage={false}
        />
      </div>
    </div>
  );
}

export default Account;
