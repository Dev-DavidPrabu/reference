import { useState } from "react";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomMerchantSummary from "../../Components/CustomMerchantSummary/CustomMerchantSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";

const MerchantSummaryHQ = (props: any) => {
  const [columns, setcolumns] = useState([]);
  const [filteredArea, setFilteredArea] = useState(false);
  const [filterOption, setfilterOption] = useState(false);
  const [filterError, setFilterError] = useState("");

  const Header = [
    {
      title: "Merchant Code",
      dataIndex: "merchantCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Merchant Name",
      dataIndex: "merchantName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Activation Date",
      dataIndex: "ActivationDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Approval Date",
      dataIndex: "ApprovalDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Merchant Address",
      dataIndex: "MerchantAddress",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
    {
      title: "Merchant Phone No",
      dataIndex: "MerchantphoneNo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.userName.localeCompare(b.userName),
      },
    },
  ];
  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/MerchantSummaryHQ/Add",
    });
  };
  const handleView = (e: any) => {
    props.history.push({
      pathname: "/dashboard/MerchantSummaryHQ/view",
      state: e,
    });
  };
  const handleEdit = (e: any) => {
    props.history.push({
      pathname: "/dashboard/MerchantSummaryHQ/Edit",
      state: e,
      action: "edit",
    });
  };
  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setFilteredArea(false);
    //resetFilter();
    //setSearchArea(false);
  };
  const applyFilter = () => {
    //setIsLoading(true);
    //let body = { MerchantCode: MerchantCode, ActivationCode: ActivationCode, ApproveDate: ApproveDate, status:status };
    setfilterOption(false);
    setFilteredArea(true);
    setFilterError("");
  };
  // const handleSubmit = () => {
  //   if (MerchantCode) {
  //     applyFilter();
  //   } else if (ActivationCode) {
  //     if (ApproveDate) {
  //       applyFilter();
  //     } else {
  //       applyFilter();          }
  //   } else {
  //     applyFilter();        }
  // };

  const changeToUser = (e: any) => {
    if (e === "Merchant-summary-HQ") {
      props.history.push({
        pathname: "/dashboard/MerchantSummaryHQ/MerchantSummaryHQ",
      });
    } else if (e === "Merchant-branch") {
      props.history.push({
        pathname: "/dashboard/MerchantBranch",
      });
    } else if (e === "locked") {
      props.history.push({
        pathname: "/dashboard/User-Account-Unlock/Locked-Device-History",
      });
    } else if (e === "customer-mobile-device") {
      props.history.push({
        pathname: "/dashboard/User-Account-Unlock/unlock",
      });
    }
  };
  let MerchantData = [
    {
      merchantCode: "MC0001",
      merchantName: "Albert",
      ActivationDate: "21-08-2022",
      ApprovalDate: "22-08-2022",
      MerchantAddress: "Singapore",
      MerchantphoneNo: "+619876543210",
    },
  ];
  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Merchant Summary HQ"}
        SummaryFileName={"Merchant Summary HQ"}
        List={true}
        addButton={false}
        Add={true}
        AddAction={handleAdd}
        //   downloadPdf={}
        //   downloadExcel={}
        //ListData={handleList}
        //   SummaryColumn={
        //     orginalColumns.length > 0 ? orginalColumns : lockedCustomerHeader
        //   }
        filterArea={toggleFilter}
        filter={true}
        filterEnabled={filterOption}
        //searchArea={toggleSearch}
        //search={searchArea}
        Refresh={true}
        //refresh={toggleRefresh}
        //Print={handlePrint}
        //TableData={Array.isArray(lockedData) ? lockedData : [lockedData]}
      />
      <CustomMerchantSummary
        page={"Merchant-summary-HQ"}
        onClick={changeToUser}
      />
      <CustomHeader
        TableData={columns.length > 0 ? columns : Header}
        CustomTableHeader={MerchantData}
        viewUser={handleView}
        editUser={handleEdit}
        view={true}
        Edit={true}
        DisableMange={columns.length > 0 ? true : false}
        //toPrint={toPrint ? true : false}
      />
    </div>
  );
};
export default MerchantSummaryHQ;
