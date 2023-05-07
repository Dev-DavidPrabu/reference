import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ExchangeRate.scss";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import Select from "react-select";
import { resetCardTypePromoCode } from "../../redux/action/CardSourcePromoLinkageAction";
import { customValidator } from "../../Constants/Validation";
import { getRemitCountryReferenceData } from "../../redux/action/TargetGroupAction";
import { getPayoutCountryRecords } from "../../redux/action/RemitPayoutCountryAction";
import { MdOutlineMoreTime } from "react-icons/md";
import {
  getExchangeRateList,
  resetExchangeRateEditMessage,
  resetExchangeRateList,
  updateExchangeRate,
} from "../../redux/action/ExchangeRateAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function ExchangeRate() {
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [isPayoutModeDisabled, setIsPayoutModeDisabled] = useState(true);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let selectInputRef: any = null;
  const [exchangeRateRequestData, setExchangeRateRequestData] = useState({
    countryCode: "",
    payoutMode: "",
  });

  const [exchangeRateRequestDataErr, setExchangeRateRequestDataErr] = useState({
    countryCodeErr: "",
    payoutModeErr: "",
  });

  const Header = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      key: "groupName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.groupName?.toString().localeCompare(b.groupName?.toString()),
      },
    },
    {
      title: "Group Code",
      dataIndex: "groupCode",
      key: "groupCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.groupCode?.toString().localeCompare(b.groupCode?.toString()),
      },
    },
    {
      title: "Currency",
      dataIndex: "currencyCode",
      key: "currencyCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.currencyCode?.toString().localeCompare(b.currencyCode?.toString()),
      },
    },
    {
      title: "Rate",
      dataIndex: "fxRate",
      key: "fxRate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.fxRate?.toString().localeCompare(b.fxRate?.toString()),
      },
    },
    {
      title: "Manage",
      dataIndex: "sourceName",
      key: "sourceName",
      checked: true,
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">
              <div
                className={`ms-2  cursor exchangeRate-icon`}
                onClick={() => handle_Update_ExchangeRate(record)}
              >
                <MdOutlineMoreTime />
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const remitCountryList: any = useSelector(
    (state: RootStateOrAny) =>
      state.TargetGroupReducer.getRemitCountryReferenceData
  );

  const payoutCountryRecords = useSelector(
    (state: RootStateOrAny) =>
      state.RemitPayoutCountryReducer?.getPayoutCountryRecordsResponse
  );

  const exchangeRateData = useSelector(
    (state: RootStateOrAny) => state.ExchangeRateReducer?.getAllExchangeRateList
  );

  const exchangeRateUpdateMessage = useSelector(
    (state: RootStateOrAny) => state.ExchangeRateReducer?.getExchangeRateError
  );

  const fetchRemitCountryReferencedata = useCallback(() => {
    try {
      dispatch(getRemitCountryReferenceData("remit-country"));
    } catch (err) {}
  }, [dispatch, "remit-country"]);

  const countryCodeList: any = remitCountryList?.data?.map((option: any) => {
    return {
      label: option.description,
      value: option.code,
    };
  });

  const payoutModeList: any = payoutCountryRecords?.data?.map((option: any) => {
    return {
      label: option.description,
      value: option.paymentMethodCode,
    };
  });

  let exchangeRateList = exchangeRateData?.data;

  useEffect(() => {
    fetchRemitCountryReferencedata();
  }, [fetchRemitCountryReferencedata]);

  useEffect(() => {
    if (payoutCountryRecords) {
      if (payoutCountryRecords?.data) {
        setIsPayoutModeDisabled(false);
      }
    }
  }, [payoutCountryRecords]);

  useEffect(() => {
    if (exchangeRateData) {
      if (exchangeRateData?.data) {
        setIsLoading(false);
      }
    }
  }, [exchangeRateData]);

  useEffect(() => {
    if (exchangeRateUpdateMessage?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetExchangeRateEditMessage());
        window.location.reload();
      }, 5000);
    }
  }, [exchangeRateUpdateMessage]);

  const handlePrint = (data: any) => {
    setSearchArea(false);
    setPrint(!toPrint);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };

  const countryChangehandler = (selectOption: any) => {
    dispatch(resetCardTypePromoCode());
    selectInputRef.clearValue();
    setExchangeRateRequestData({
      ...exchangeRateRequestData,
      countryCode: selectOption?.value,
      payoutMode: "",
    });
    dispatch(getPayoutCountryRecords(selectOption?.value));
    dispatch(resetExchangeRateList());
    setIsPayoutModeDisabled(true);
  };

  const payoutModeChangehandler = (selectOption: any) => {
    setExchangeRateRequestData({
      ...exchangeRateRequestData,
      payoutMode: selectOption?.value,
    });
    dispatch(resetExchangeRateList());
  };

  const validate = () => {
    let countryCode = customValidator(
      "agentGroupMandatoryFields",
      "Country",
      exchangeRateRequestData?.countryCode
    );

    let payoutMode = customValidator(
      "agentGroupMandatoryFields",
      "Payment Method",
      exchangeRateRequestData?.payoutMode
    );

    if (!(countryCode === "null" && payoutMode === "null")) {
      setExchangeRateRequestDataErr({
        countryCodeErr: countryCode,
        payoutModeErr: payoutMode,
      });
      return false;
    } else {
      setExchangeRateRequestDataErr({
        countryCodeErr: "",
        payoutModeErr: "",
      });
      return true;
    }
  };

  const exchangeRate_handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        getExchangeRateList({
          countryCode: exchangeRateRequestData?.countryCode,
          paymentMethod: exchangeRateRequestData?.payoutMode,
        })
      );
    }
  };

  const handle_Update_ExchangeRate = (record: any) => {
    dispatch(
      updateExchangeRate({
        rateGroupCode: record?.groupCode,
        paymentMethod: exchangeRateRequestData?.payoutMode,
        currencyCode: record?.currencyCode,
        fxRate: record?.fxRate,
        selected:true
      })
    );
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      exchangeRateList = exchangeRateList.filter((e: any) => {
        return (
          e.groupName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.groupCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.currencyCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.fxRate
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      exchangeRateList = exchangeRateList.filter((e: any) => {
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
  }

  const closeMessage = () => {
    setApiMessage(false);
  };

  return (
    <div className="ExchangeRate">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Exchange Rate"}
          SummaryFileName={"Exchange Rate"}
          SummaryColumn={Header}
          TableData={exchangeRateList}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={false}
          List={false}
          Refresh={false}
        />
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
            <option value="groupName" className="cursor">
              Group Name
            </option>
            <option value="groupCode" className="cursor">
              Group Code
            </option>
            <option value="currencyCode" className="cursor">
              Currency
            </option>
            <option value="fxRate" className="cursor">
              Rate
            </option>
            <option value="any" className="cursor">
              Any
            </option>
          </select>
          <Input
            type="text"
            placeholder="Type your search keyword"
            className="ms-1 user-search-input"
            onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
          />
          <div className="ms-1">
            <Button color="danger kyc-FilterSearchButton btn--sizer">Search</Button>
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

      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Exchange Rate Updated Successfully."}
          />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <div className="col-10 d-flex">
          <div className="col-5 p-3">
            <div className="col">
              <label>Country</label>
            </div>
            <div className="col">
              <Select
                options={countryCodeList}
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  countryChangehandler(selectOptions)
                }
              />
              {exchangeRateRequestDataErr?.countryCodeErr &&
                exchangeRateRequestDataErr?.countryCodeErr !== "null" && (
                  <Label className="text-red">
                    {exchangeRateRequestDataErr?.countryCodeErr}
                  </Label>
                )}
            </div>
          </div>
          <div className="col-5 p-3">
            <div className="col">
              <label>Payment Method</label>
            </div>
            <div className="col">
              <Select
                options={payoutModeList}
                ref={(ref) => (selectInputRef = ref)}
                styles={customSelectStyles}
                //isDisabled={isPayoutModeDisabled}
                onChange={(selectOptions: any) =>
                  payoutModeChangehandler(selectOptions)
                }
              />
              {exchangeRateRequestDataErr?.payoutModeErr &&
                exchangeRateRequestDataErr?.payoutModeErr !== "null" && (
                  <Label className="text-red">
                    {exchangeRateRequestDataErr?.payoutModeErr}
                  </Label>
                )}
            </div>
          </div>
          <div className="col-2 p-3">
            <div className="col mt-4"></div>
            <div className="col">
              <Button
                color="danger"
                className="kyc-FilterSubmitButton me-2 btn--sizer"
                onClick={exchangeRate_handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

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
            <a
              onClick={Print}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </a>{" "}
            to confirm and Print !. Or{" "}
            <a
              onClick={cancelPrint}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Cancel
            </a>
          </span>
        )}
      </div>
      {isLoading ? null : (
        <div className="px-3" ref={componentRef}>
          <CustomTable
            TableData={Header}
            CustomTableHeader={exchangeRateList}
            Delete={false}
            Edit={false}
            DisableMange={true}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default ExchangeRate;
