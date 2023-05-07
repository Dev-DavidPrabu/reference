import { Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button, Input } from "reactstrap";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { getOTPList } from "../../redux/action/OTPTempListAction";

function OTPTempTable() {
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");

  const Header = [
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.mobileNumber?.toString().localeCompare(b.mobileNumber?.toString()),
      },
    },
    {
      title: "OTP",
      dataIndex: "otpValue",
      key: "otpValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.otpValue?.toString().localeCompare(b.otpValue?.toString()),
      },
    },

    {
      title: "OTP Status",
      dataIndex: "otpStatus",
      key: "otpStatus",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.otpStatus?.toString().localeCompare(b.otpStatus?.toString()),
      },
    },
    {
      title: "Request Date",
      dataIndex: "requestDate",
      key: "requestDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.requestDate?.toString().localeCompare(b.requestDate?.toString()),
      },
    },

    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.expiryDate?.toString().localeCompare(b.expiryDate?.toString()),
      },
    },
  ];
  const OTPData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.OTPTempListReducer.getOtp
  );
  let OTPDataList = OTPData?.data;
  const fetchRiskScaledata = useCallback(async () => {
    try {
      dispatch(getOTPList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchRiskScaledata();
  }, [fetchRiskScaledata]);

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };

  const toggleRefresh = () => {
    window.location.reload();
  };

  if (searchUserData && searchCategory) {
    OTPDataList = OTPDataList.filter((e: any) => {
      if (
        e[searchCategory]
          ?.toString()
          .toUpperCase()
          .includes(searchUserData.toUpperCase())
      ) {
        return e;
      }
    });
  }
  return (
    <div className="OTPTempTable">
      <div
        className="p-3 mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="primary_heading">OTP List</div>
        <div className="salaryUpload-btn">
          <div className="d-flex">
            <div
              id="Refresh"
              aria-disabled="true"
              className={
                OTPDataList && OTPDataList?.length > 0
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={toggleRefresh}
            >
              <MdRefresh></MdRefresh>
              <CustomTooltip target="Refresh">Refresh</CustomTooltip>
            </div>
            <div
              id="Search"
              className={
                OTPDataList && OTPDataList?.length > 0
                  ? `common-icons me-1 cursor ${searchArea && "bottom-arrow"}`
                  : "common-icon-disabled cursor me-1"
              }
              onClick={toggleSearch}
            >
              <FiSearch></FiSearch>
              <CustomTooltip target="Search">Search</CustomTooltip>
            </div>
          </div>
        </div>
      </div>

      {searchArea && (
        <div
          className="d-flex user-search mt-3 p-3 cursor"
          style={{ marginLeft: "20px", marginRight: "15px", width: "auto" }}
        >
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected hidden className="cursor">
              Select Field
            </option>

            <option value="mobileNumber" className="cursor">
              Mobile Number
            </option>
          </select>
          <Input
            type="text"
            placeholder="Type your search keyword"
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger kyc-FilterSearchButton">Search</Button>
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

      <div className="px-3 mt-3 mb-4">
        <Table
          className="Customheader ant-table-content amlTable table"
          dataSource={OTPDataList}
          columns={Header}
          pagination={false}
        />
      </div>
    </div>
  );
}

export default OTPTempTable;
