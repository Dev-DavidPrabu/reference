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
import { getAllCardSourceCode } from "../../redux/action/CardSourceCodeAction";

function CardSourceCode() {
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

  const cardSourceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.CardSourceCodeReducer.getCardSourceCodeList
  );

  let cardSourceDataList = cardSourceData?.data;

  const fetchcardSourceData = useCallback(async () => {
    try {
      dispatch(getAllCardSourceCode());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchcardSourceData().then(() => {
      if (!cardSourceData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchcardSourceData]);

  useEffect(() => {
    if (cardSourceData) {
      if (cardSourceData.data) {
        setIsLoading(false);
      }
    }
  }, [cardSourceData]);

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
      cardSourceDataList = cardSourceDataList.filter((e: any) => {
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
      cardSourceDataList = cardSourceDataList.filter((e: any) => {
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
    <div className="CardSourceCode pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Source Code"}
          SummaryFileName={"Source Code"}
          SummaryColumn={Header}
          TableData={cardSourceDataList}
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
          page={"sourceCode"}
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
            CustomTableHeader={cardSourceDataList}
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

export default CardSourceCode;
