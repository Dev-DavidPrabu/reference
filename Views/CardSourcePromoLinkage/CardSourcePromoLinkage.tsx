import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomCurrentPageCardType from "../../Components/CustomCurrentPageCardType/CustomCurrentPageCardType";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { getAllCardType } from "../../redux/action/CardTypeAction";
import Select from "react-select";
import {
  getAllCardTypePromoCode,
  getCardSourcePromoList,
  resetCardTypePromoCode,
} from "../../redux/action/CardSourcePromoLinkageAction";
import { customValidator } from "../../Constants/Validation";
import customSelectStyles from "../../Components/CustomSelectStyle/CustomSelectStyles";

function CardSourcePromoLinkage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [isPromoCodeDisabled, setIsPromoCodeDisabled] = useState(true);
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  let selectInputRef: any = null;
  const [cardTypeSourcePromoData, setCardTypeSourcePromoData] = useState({
    cardTypeCode: "",
    promoCode: "",
  });

  const [cardTypeSourcePromoDataErr, setCardTypeSourcePromoDataErr] = useState({
    cardTypeCodeErr: "",
    promoCodeErr: "",
  });

  const Header = [
    {
      title: "Source Code",
      dataIndex: "sourceCode",
      key: "sourceCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.sourceCode?.toString().localeCompare(b.sourceCode?.toString()),
      },
    },
    {
      title: "Source Name",
      dataIndex: "sourceName",
      key: "sourceName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.sourceName?.toString().localeCompare(b.sourceName?.toString()),
      },
    },
  ];

  const cardTypeData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.CardTypeReducer.getCardTypeList
  );

  const cardTypePromoData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.CardSourcePromoLinkageReducer.getCardPromoList
  );

  const cardSourcePromoData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.CardSourcePromoLinkageReducer.getCardSourcePromoList
  );

  const cardTypeList: any = cardTypeData?.data?.map((option: any) => {
    return {
      label: option.cardTypeCode + " - " + option.cardName,
      value: option.cardTypeCode,
    };
  });

  const cardTypePromoList: any = cardTypePromoData?.data?.map((option: any) => {
    return {
      label: option.promoCode + " - " + option.promoName,
      value: option.promoCode,
    };
  });

  let cardSourcePromoList = cardSourcePromoData?.data;

  const fetchcardTypedata = useCallback(async () => {
    try {
      dispatch(getAllCardType());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchcardTypedata();
  }, [fetchcardTypedata]);

  useEffect(() => {
    if (cardTypePromoData) {
      if (cardTypePromoData?.data) {
        setIsPromoCodeDisabled(false);
      }
    }
  }, [cardTypePromoData]);

  useEffect(() => {
    if (cardSourcePromoData) {
      if (cardSourcePromoData.data) {
        setIsLoading(false);
      }
    }
  }, [cardSourcePromoData]);

  const handlePrint = (data: any) => {
    setSearchArea(false);
    setPrint(!toPrint);
    setcolumns(data);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };

  const cardTypeChangehandler = (selectOption: any) => {
    dispatch(resetCardTypePromoCode());
    selectInputRef.clearValue();
    setCardTypeSourcePromoData({
      ...cardTypeSourcePromoData,
      cardTypeCode: selectOption?.value,
      promoCode: "",
    });
    dispatch(getAllCardTypePromoCode(selectOption?.value));
    setIsPromoCodeDisabled(true);
  };

  const promoCodeChangehandler = (selectOption: any) => {
    setCardTypeSourcePromoData({
      ...cardTypeSourcePromoData,
      promoCode: selectOption?.value,
    });
  };

  const validate = () => {
    let cardTypeCode = customValidator(
      "agentGroupMandatoryFields",
      "Card Type",
      cardTypeSourcePromoData?.cardTypeCode
    );

    let promoCode = customValidator(
      "agentGroupMandatoryFields",
      "Promo Code",
      cardTypeSourcePromoData?.promoCode
    );

    if (!(cardTypeCode === "null" && promoCode === "null")) {
      setCardTypeSourcePromoDataErr({
        cardTypeCodeErr: cardTypeCode,
        promoCodeErr: promoCode,
      });
      return false;
    } else {
      setCardTypeSourcePromoDataErr({
        cardTypeCodeErr: "",
        promoCodeErr: "",
      });
      return true;
    }
  };

  const cardSourceCode_handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      dispatch(getCardSourcePromoList(cardTypeSourcePromoData));
    }
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      cardSourcePromoList = cardSourcePromoList.filter((e: any) => {
        return (
          e.sourceCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.sourceName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      cardSourcePromoList = cardSourcePromoList.filter((e: any) => {
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
  const changeCurrentPage = (e: any) => {
    if (e === "cardType") {
      history.push({
        pathname: "/dashboard/Setup-And-Configuration/Card-Type",
      });
    } else if (e === "sourceCode") {
      history.push({
        pathname: "/dashboard/Setup-And-Configuration/Source-Code",
      });
    } else if (e === "promoCode") {
      history.push({
        pathname: "/dashboard/Setup-And-Configuration/Promo-Code",
      });
    } else if (e === "linkage") {
      history.push({
        pathname:
          "/dashboard/Setup-And-Configuration/Card-Promo-Source-Linkage",
      });
    }
  };
  return (
    <div className="CardSourcePromoLinkage pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Linkage"}
          SummaryFileName={"Linkage"}
          SummaryColumn={Header}
          TableData={cardSourcePromoList}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={false}
          List={false}
          Refresh={false}
        />
        <CustomCurrentPageCardType
          page={"linkage"}
          onClick={changeCurrentPage}
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

            <option value="sourceCode" className="cursor">
              Source Code
            </option>
            <option value="sourceName" className="cursor">
              Source Name
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

      <div className="d-flex justify-content-between align-items-center mb-4 p-3">
        <div className="col d-flex">
          <div className="col-4 p-3">
            <div className="col">
              <label>Card Type</label>
            </div>
            <div className="col">
              <Select
                options={cardTypeList}
                styles={customSelectStyles}
                onChange={(selectOptions: any) =>
                  cardTypeChangehandler(selectOptions)
                }
              />
              {cardTypeSourcePromoDataErr?.cardTypeCodeErr &&
                cardTypeSourcePromoDataErr?.cardTypeCodeErr !== "null" && (
                  <Label className="text-red">
                    {cardTypeSourcePromoDataErr?.cardTypeCodeErr}
                  </Label>
                )}
            </div>
          </div>
          <div className="col-4 p-3">
            <div className="col">
              <label>Promo Code</label>
            </div>
            <div className="col">
              <Select
                options={cardTypePromoList}
                styles={customSelectStyles}
                ref={(ref) => (selectInputRef = ref)}
                isDisabled={isPromoCodeDisabled}
                onChange={(selectOptions: any) =>
                  promoCodeChangehandler(selectOptions)
                }
              />
              {cardTypeSourcePromoDataErr?.promoCodeErr &&
                cardTypeSourcePromoDataErr?.promoCodeErr !== "null" && (
                  <Label className="text-red">
                    {cardTypeSourcePromoDataErr?.promoCodeErr}
                  </Label>
                )}
            </div>
          </div>
          <div className="col-2 p-3">
            <div className="col mt-4"></div>
            <div className="col">
              <Button
                color="danger"
                className="kyc-FilterSubmitButton me-2"
                onClick={cardSourceCode_handleSubmit}
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
            CustomTableHeader={cardSourcePromoList}
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

export default CardSourcePromoLinkage;
