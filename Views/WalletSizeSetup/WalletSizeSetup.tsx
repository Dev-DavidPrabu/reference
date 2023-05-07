import { Form } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { WalletSizeSetupModel } from "../../models/WalletSizeSetupModel";
import { getWalletSizeSetupData } from "../../redux/action/WalletSizeSetupAction";
import "./WalletSizeSetup.scss";

const WalletSizeSetup = (props: any) => {
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
  const history = useHistory();

  let walletSizeSetupRecords = useSelector(
    (state: RootStateOrAny) =>
      state.WalletSizeSetupReducer?.getWalletSizeSetupResponse
  );

  const fetchWalletSizeSetupRecords = useCallback(async () => {
    try {
      dispatch(getWalletSizeSetupData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchWalletSizeSetupRecords();
  }, [fetchWalletSizeSetupRecords]);

  useEffect(() => {
    if (walletSizeSetupRecords?.data) {
      setIsLoading(false);
      setTableShow(true);
    } else if (!walletSizeSetupRecords?.data) {
      setIsLoading(true);
      setTableShow(false);
    }
  }, [walletSizeSetupRecords]);

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
      title: "Wallet Description",
      dataIndex: "accountName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.accountName.localeCompare(b.accountName),
      },
    },
    {
      title: "Wallet Feature Code",
      dataIndex: "walletFeatureCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletFeatureCode.localeCompare(b.walletFeatureCode),
      },
    },
    {
      title: "Onboarding Channel",
      dataIndex: "onBoardingChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.onBoardingChannel.localeCompare(b.onBoardingChannel),
      },
    },
    {
      title: "Onboarding Logo Content ID",
      dataIndex: "onBoarding_ContentCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.onBoarding_ContentCode.localeCompare(b.onBoarding_ContentCode),
      },
    },
    {
      title: "Terms URL",
      dataIndex: "termsConditionsURL",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.termsConditionsURL.localeCompare(b.termsConditionsURL),
      },
      render: (refValue: any, record: any) => {
        return (
          <div className={`cursor `} onClick={() => OnClickTermURL(record)}>
            <span className="wallet-size-color">{refValue}</span>
          </div>
        );
      },
    },
    {
      title: "Privacy URL",
      dataIndex: "privacyPolicyURL",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.privacyPolicyURL.localeCompare(b.privacyPolicyURL),
      },
      render: (refValue: any, record: any) => {
        return (
          <div className={`cursor `} onClick={() => OnClickPrivacyURL(record)}>
            <span className="wallet-size-colorLine">{refValue}</span>
          </div>
        );
      },
    },
    {
      title: "Agreement",
      dataIndex: "agreement",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.agreement.localeCompare(b.agreement),
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

  const OnClickPrivacyURL = (record: any) => {};

  const OnClickTermURL = (record: any) => {};

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
      pathname: "/dashboard/Wallet-Size-Setup/Edit-Wallet-Size",
      state: e,
    });
  };

  const closeSearch = () => {
    setSearchArea(false);
  };

  let walletdata = walletSizeSetupRecords?.data?.map(
    (data: any, index: any) => {
      return { ...data, key: index, agreement: data.agreement ? "Y" : "N" };
    }
  );

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      walletdata = walletdata.filter((e: any | WalletSizeSetupModel) => {
        return (
          e.accountTypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.accountName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.walletFeatureCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.onBoardingChannel
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.onBoarding_ContentCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.termsConditionsURL
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.privacyPolicyURL
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.agreement
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      walletdata = walletdata.filter((e: any | WalletSizeSetupModel) => {
        if (
          e[searchCategory]
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        ) {
          return e;
        }
      });
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
        RightContent={"Wallet Size Setup"}
        SummaryFileName={"Wallet Size Setup"}
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
        TableData={walletdata}
      />

      {searchArea && (
        <div className="d-flex notification-master-search mt-3 p-3">
          <select
            className="form-select user-search-drop cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected className="cursor">
              Select Field
            </option>

            <option value="accountTypeCode" className="cursor">
              Wallet Size
            </option>
            <option value="accountName" className="cursor">
              Wallet Description
            </option>
            <option value="walletFeatureCode" className="cursor">
              Wallet FeatureCode
            </option>
            <option value="onBoardingChannel" className="cursor">
              Onboarding Channel
            </option>
            <option value="onBoarding_ContentCode" className="cursor">
              Onboarding Logo Content ID
            </option>
            <option value="termsConditionsURL" className="cursor">
              Terms URL
            </option>
            <option value="privacyPolicyURL" className="cursor">
              Privacy URL
            </option>
            <option value="agreement" className="cursor">
              Agreement
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
          <div className="ms-3">
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
                  CustomTableHeader={walletdata}
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

export default WalletSizeSetup;
