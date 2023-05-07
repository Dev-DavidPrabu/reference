import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomCurrentPageCardType from "../../Components/CustomCurrentPageCardType/CustomCurrentPageCardType";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { getAllCardType } from "../../redux/action/CardTypeAction";

function CardType() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);

  const Header = [
    {
      title: "Card Type Code",
      dataIndex: "cardTypeCode",
      key: "cardTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardTypeCode?.toString().localeCompare(b.cardTypeCode?.toString()),
      },
    },
    {
      title: "Card Name",
      dataIndex: "cardName",
      key: "cardName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardName?.toString().localeCompare(b.cardName?.toString()),
      },
    },
    {
      title: "Card Description",
      dataIndex: "cardDescription",
      key: "cardDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardDescription
            ?.toString()
            .localeCompare(b.cardDescription?.toString()),
      },
    },
    {
      title: "Is EKYC Enabled",
      dataIndex: "isEkycEnabled",
      key: "isEkycEnabled",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isEkycEnabled
            ?.toString()
            .localeCompare(b.isEkycEnabled?.toString()),
      },
      render: (isEkycEnabled: boolean) => {
        return (
          <label
            className={` ${
              isEkycEnabled === false
                ? "status-error"
                : isEkycEnabled === true && "status-validated"
            }`}
          >
            {isEkycEnabled ? "True" : "False"}
          </label>
        );
      },
    },
    {
      title: "Card Category",
      dataIndex: "cardCategory",
      key: "cardCategory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.cardCategory?.toString().localeCompare(b.cardCategory?.toString()),
      },
    },
  ];

  const cardTypeData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.CardTypeReducer.getCardTypeList
  );

  let cardTypeDataList = cardTypeData?.data;

  const fetchcardTypedata = useCallback(async () => {
    try {
      dispatch(getAllCardType());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchcardTypedata().then(() => {
      if (!cardTypeData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchcardTypedata]);

  useEffect(() => {
    if (cardTypeData) {
      if (cardTypeData.data) {
        setIsLoading(false);
      }
    }
  }, [cardTypeData]);

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

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      cardTypeDataList = cardTypeDataList.filter((e: any) => {
        return (
          e.cardTypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.cardCategory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      cardTypeDataList = cardTypeDataList.filter((e: any) => {
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
    <div className="CardType pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Card Type"}
          SummaryFileName={"Card Type"}
          SummaryColumn={Header}
          TableData={cardTypeDataList}
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
          page={"cardType"}
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

            <option value="cardTypeCode" className="cursor">
              Card Type Code
            </option>
            <option value="cardName" className="cursor">
              Card Name
            </option>
            <option value="cardDescription" className="cursor">
              Card Descritpion
            </option>
            <option value="cardCategory" className="cursor">
              Card Category
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
      <CustomLoader isLoading={isLoading} size={50} />
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
            CustomTableHeader={cardTypeDataList}
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

export default CardType;
