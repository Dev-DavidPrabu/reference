import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { WalletSizeBrandMappingModel } from "../../models/WalletSizeBrandMappingModel";
import { getWalletSizeBrandMappingData } from "../../redux/action/WalletSizeBrandMappingAction";
import "./WalletSizeBrandMapping.scss";

const WalletSizeBrandMapping = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [tableShow, setTableShow] = useState(true);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const componentRef = useRef<any>();
  const [form] = Form.useForm();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [apiMessage, setApiMessage] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState("");
  const dispatch = useDispatch();

  let walletSizeBrandMappingRecords = useSelector(
    (state: RootStateOrAny) =>
      state.WalletSizeBrandMappingReducer?.getWalletSizeBrandMappingResponse
  );

  const fetchWalletSizeBrandMappingRecords = useCallback(async () => {
    try {
      dispatch(getWalletSizeBrandMappingData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchWalletSizeBrandMappingRecords();
  }, [fetchWalletSizeBrandMappingRecords]);

  useEffect(() => {
    if (walletSizeBrandMappingRecords) {
      if (walletSizeBrandMappingRecords?.data) {
        setIsLoading(false);
        setTableShow(true);
      } else if (!walletSizeBrandMappingRecords?.data) {
        setIsLoading(true);
        setTableShow(false);
      }
    }
  }, [walletSizeBrandMappingRecords]);

  let locationWalletData = props.location?.state;
  useEffect(() => {
    if (locationWalletData === true) {
      setApiMessage(true);
      setApiStatus(true);
      setApiErrorMsg(props?.location?.message);
      setIsLoading(true);
    } else {
      setApiMessage(false);
    }
  }, []);

  const walletSizeSetupHeader = [
    {
      title: "Wallet Size",
      dataIndex: "accountTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountTypeCode.localeCompare(b.accountTypeCode),
      },
    },
    {
      title: "Wallet Size Name",
      dataIndex: "accountTypeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.accountTypeDescription.localeCompare(b.accountTypeDescription),
      },
    },
    {
      title: "Wallet Brand",
      dataIndex: "walletTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletTypeCode.localeCompare(b.walletTypeCode),
      },
    },
    {
      title: "Wallet level",
      dataIndex: "walletLevel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.walletLevel.localeCompare(b.walletLevel),
      },
    },
    {
      title: "eKYC Enabled",
      dataIndex: "isEkycEnabled",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isEkycEnabled.localeCompare(b.isEkycEnabled),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "Y" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
    {
      title: "Card Works KYC Indicator",
      dataIndex: "cardWorksKycIndicator",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardWorksKycIndicator.localeCompare(b.cardWorksKycIndicator),
      },
    },
    {
      title: "Idle Month",
      dataIndex: "idleMonths",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.idleMonths - b.idleMonths,
      },
    },
    {
      title: "Approval Flag",
      dataIndex: "approvalFlag",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.approvalFlag.localeCompare(b.approvalFlag),
      },
      render(dataIndex: any) {
        return {
          props: {
            style: { color: dataIndex !== "Y" ? "red" : "#39C570" },
          },
          children: <div>{dataIndex}</div>,
        };
      },
    },
  ];

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };

  const toggleRefresh = () => {
    setcolumns([]);
  };

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const editWallet = (e: any) => {
    props.history.push({
      pathname: "/dashboard/Wallet-Size-Brand-Mapping/Edit",
      state: e,
    });
  };

  const closeSearch = () => {
    setSearchArea(false);
  };

  let walletMappingData = walletSizeBrandMappingRecords?.data?.map(
    (data: any, index: any) => {
      return {
        ...data,
        key: index,
        isEkycEnabled: data.isEkycEnabled ? "Y" : "N",
        approvalFlag: data.approvalFlag ? "Y" : "N",
      };
    }
  );

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      walletMappingData = walletMappingData?.filter(
        (e: any | WalletSizeBrandMappingModel) => {
          return (
            e.accountTypeCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.accountTypeDescription
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.walletTypeCode
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.walletLevel
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.isEkycEnabled
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.cardWorksKycIndicator
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.idleMonths
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase()) ||
            e.approvalFlag?.toUpperCase().includes(searchUserData.toUpperCase())
          );
        }
      );
    } else {
      walletMappingData = walletMappingData?.filter(
        (e: any | WalletSizeBrandMappingModel) => {
          if (
            e[searchCategory]
              ?.toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      );
    }
  }

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
    setorginalColumns([]);
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"Wallet Size Brand Mapping"}
        SummaryFileName={"Wallet Size Brand Mapping"}
        searchArea={toggleSearch}
        search={searchArea}
        filterRemit={false}
        Refresh={true}
        List={true}
        refresh={toggleRefresh}
        Print={handlePrint}
        ListData={handleList}
        SummaryColumn={
          orginalColumns.length > 0 ? orginalColumns : walletSizeSetupHeader
        }
        TableData={walletMappingData}
      />

      {searchArea && (
        <div className="d-flex notification-master-search mt-3 p-3 cursor">
          <select
            className=" form-select user-search-drop cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="accountTypeCode" className="cursor">
              Wallet Size
            </option>
            <option value="accountTypeDescription" className="cursor">
              Wallet Size Name
            </option>
            <option value="walletTypeCode" className="cursor">
              Wallet Brand
            </option>
            <option value="walletLevel" className="cursor">
              Wallet Level
            </option>
            <option value="isEkycEnabled" className="cursor">
              eKYC Enabled
            </option>
            <option value="cardWorksKycIndicator" className="cursor">
              Card Works KYC Indicator
            </option>
            <option value="idleMonths" className="cursor">
              Idle Month
            </option>
            <option value="approvalFlag" className="cursor">
              Approval Flag
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-3 mt-1">
            <Button color="danger" className="btn--sizer">
              Search
            </Button>
          </div>
          <div>
            <Button
              className="text-white  border-0 ms-3"
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
          <button
            onClick={Print}
            style={{
              color: "blue",
              textDecoration: "underline",
              border: 0,
              background: "white",
            }}
          >
            here
          </button>{" "}
          to confirm and Print !. Or{" "}
          <button
            onClick={cancelPrint}
            style={{
              color: "blue",
              textDecoration: "underline",
              border: 0,
              background: "white",
            }}
          >
            Cancel
          </button>
        </span>
      )}

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={apiStatus}
          closeMessage={() => closeMessage()}
          message={apiErrorMsg}
        />
      )}

      <CustomLoader isLoading={isLoading} size={50} />

      {isLoading ? null : (
        <>
          <div className="mt-3" ref={componentRef}>
            <Form form={form} component={false}>
              {tableShow && (
                <CustomHeader
                  TableData={
                    columns.length > 0 ? columns : walletSizeSetupHeader
                  }
                  Edit={true}
                  editUser={editWallet}
                  DisableMange={toPrint ? true : false}
                  CustomTableHeader={walletMappingData}
                  toPrint={columns.length > 0 ? true : false}
                />
              )}
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletSizeBrandMapping;
