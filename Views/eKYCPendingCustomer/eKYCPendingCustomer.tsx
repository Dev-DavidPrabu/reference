import React from "react";
import "./eKYCPendingCustomer.scss";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";

function eKYCPendingCustomer() {

  const Header = [
    {
      title: "Country",
      dataIndex: "countryCode",
      key: "CountryCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.countryCode?.toString().localeCompare(b.countryCode?.toString()),
      },
    },
    {
      title: "Description",
      dataIndex: "countryDescription",
      key: "CountryDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.countryDescription
            ?.toString()
            .localeCompare(b.countryDescription?.toString()),
      },
    },

    {
      title: "Id Type",
      dataIndex: "idType",
      key: "IdType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idType?.toString().localeCompare(b.idType?.toString()),
      },
    },

    {
      title: "Routing Channel",
      dataIndex: "routingChannel",
      key: "RoutingChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.routingChannel
            ?.toString()
            .localeCompare(b.routingChannel?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
  ];

  return (
    <div className="eKYCPendingCustomer">
      <CommonHeaderSummary
        RightContent={"eKYC Pending Customer"}
        SummaryFileName={"eKYC Pending Customer"}
        SummaryColumn={Header}
        addButton={false}
        filterLeft={true}
        filter={true}
      />
    </div>
  );
}

export default eKYCPendingCustomer;
