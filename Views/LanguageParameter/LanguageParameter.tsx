import { useEffect, useState, useRef } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { getListOfLanguageInfo } from "../../redux/action/LanguageParameterAction";
import "./LanguageParameter.scss";
import { useLocation, useHistory } from "react-router-dom";
import { Select } from "antd";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { useReactToPrint } from "react-to-print";
const LanguageParameter = (props: any) => {
  const locationstate: any = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showSearchVisibility, setShowSearchVisibility] = useState(false);
  const [searchOption, setSearchOption] = useState("");
  const [apiMessage, setApiMessage] = useState(props.location?.state || "");
  const [columns, setcolumns] = useState([]);
  const componentRef = useRef<any>();
  const [orginalColumns, setorginalColumns] = useState([]);
  const [lockedStatus, setLockedStatus] = useState(true);
  const [lockedMessage, setLockedMessage] = useState("");
  const [searchString, setSearchString] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [searchLangData, setSearchLangData] = useState<string>("");
  const [isFiltered, setIsFiltered] = useState(false);

  const searchBarVisibility = () => {
    setShowSearchVisibility((prev) => !prev);
  };
  const gettingListOfLanguage = useSelector(
    (state: RootStateOrAny) =>
      state.LanguageParameterReducer?.listOfLanguage?.data
  );
  const activityIndicator = useSelector(
    (state: RootStateOrAny) => state.LanguageParameterReducer?.isLoading
  );

  useEffect(() => {
    if (locationstate.state === "successfully Language Added") {
      setApiMessage(locationstate.state);
      setLockedStatus(true);
    }
  }, [locationstate]);
  useEffect(() => {
    dispatch(getListOfLanguageInfo());

    setApiMessage(props.location.state);
    setTimeout(() => {
      setLockedStatus(false);
      setApiMessage("");
    }, 3000);
  }, [dispatch, props.location.state]);

  useEffect(() => {
    history.replace({
      state: "",
    });
  }, []);
  useEffect(() => {
    dispatch(getListOfLanguageInfo());
  }, [dispatch]);
  const { Option } = Select;
  const handleSearchChange = (ev: React.FormEvent<HTMLInputElement>) => {
    setIsFiltered(true);
    searchCategory && setSearchString(ev.currentTarget.value);
  };
  const Header = [
    {
      title: "Module",
      dataIndex: "pageName",
      key: "pageName",
      sorter: {
        compare: (a: any, b: any) => a.pageName.localeCompare(b.pageName),
      },
    },
    {
      title: "Word",
      dataIndex: "seasonDescription",
      key: "season",
      sorter: {
        compare: (a: any, b: any) =>
          a.seasonDescription.localeCompare(b.seasonDescription),
      },
      render: function (text: any, record: any, index: any) {
        let englishstingValues = "";
        record.languageContent.filter((englishContent: any) => {
          if (englishContent.languageCode === "en") {
            englishstingValues = englishContent.content;
            return englishContent;
          }
        });
        return englishstingValues;
      },
    },
    {
      title: "Translate to Bahasa Malaysia",
      dataIndex: "startDate",
      key: "StartDate",
      sorter: {
        compare: (a: any, b: any) => a.startDate.localeCompare(b.startDate),
      },
      render: function (text: any, record: any, index: any) {
        let BahasaMalaysiastingValues = "";
        record.languageContent.filter((englishContent: any) => {
          if (englishContent.languageCode === "ms") {
            BahasaMalaysiastingValues = englishContent.content;
            return englishContent;
          }
        });
        return BahasaMalaysiastingValues;
      },
    },
    {
      title: "Translate to Indonesian",
      dataIndex: "endDate",
      key: "EndDate",
      render: function (text: any, record: any, index: any) {
        let IndonesianstingValues = "";
        record.languageContent.filter((englishContent: any) => {
          if (englishContent.languageCode === "id") {
            IndonesianstingValues = englishContent.content;
            return englishContent;
          }
        });
        return IndonesianstingValues;
      },
    },
    {
      title: "Translate to Mandarin",
      dataIndex: "startTime",
      key: "StartTime",
      sorter: {
        compare: (a: any, b: any) => a.startTime.localeCompare(b.startTime),
      },
      render: function (text: any, record: any, index: any) {
        let MandarinstingValues = "";
        record.languageContent.filter((mandarinContent: any) => {
          if (mandarinContent.languageCode === "zh") {
            MandarinstingValues = mandarinContent.content;
            return mandarinContent;
          }
        });
        return MandarinstingValues;
      },
    },
  ];

  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const closeMessage = () => {
    setApiMessage("");
    setLockedStatus(false);
  };

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const getSelectedValues = (selectedValues: any) => {
    if (selectedValues) {
      props.history.push({
        pathname: "/dashboard/Language-Parameter-view",
        state: selectedValues,
      });
    }
  };
  const navigateToEditPage = (selectedValues: any) => {
    if (selectedValues) {
      props.history.push({
        pathname: "/dashboard/Language-Parameter-edit",
        state: selectedValues,
        action: "edit",
      });
    }
  };
  const navigateToAddPage = () => {
    props.history.push({
      pathname: "/dashboard/Language-Parameter-add",
      action: "add",
      state: {},
    });
  };
  let langData = gettingListOfLanguage && gettingListOfLanguage;
  if (searchString.length > 0) {
    switch (searchCategory) {
      case "module":
        langData = langData?.filter(
          (e: any) =>
            e?.pageName.toUpperCase().includes(searchString.toUpperCase()) && e
        );
        break;
      case "word":
        langData = langData?.filter(
          (e: any) =>
            e?.key
              ?.replace(/[_-]/g, " ")
              .toUpperCase()
              .includes(searchString.toUpperCase()) && e
        );
        break;
      case "any":
        langData = langData?.filter((e: any) => {
          if (e?.pageName.toUpperCase().includes(searchString.toUpperCase())) {
            return e;
          } else if (
            e?.key
              ?.replace(/[_-]/g, " ")
              .toUpperCase()
              .includes(searchString.toUpperCase())
          ) {
            return e;
          }
        });
        break;
      default:
        break;
    }
  }
  const closeSearch = () => {
    setShowSearchVisibility(!showSearchVisibility);
  };
  return (
    <div className="p-3">
      <section>
        <CommonHeaderSummary
          AddAction={navigateToAddPage}
          RightContent={"Language Parameter"}
          Add={true}
          Showsearch={true}
          showExcel={true}
          dataExpiring={true}
          searchArea={searchBarVisibility}
          TableData={[{}]}
        ></CommonHeaderSummary>
      </section>
      <section>
        {showSearchVisibility && (
          <div className="language-parameter-search">
            <div className="d-flex user-search mt-3 p-3 cursor">
              <select
                className=" form-select user-search-drop ms-2 cursor"
                onChange={(e) => setSearchCategory(e.target.value)}
                defaultValue={"Select Field"}
              >
                <option selected hidden>
                  Select Field
                </option>
                <option value="module" className="cursor">
                  Module
                </option>
                <option value="word" className="cursor">
                  Word
                </option>
                <option value="any" className="cursor">
                  Any
                </option>
              </select>
              <Input
                type="text"
                className="ms-1 user-search-input"
                placeholder="Type your search keyword"
                onChange={handleSearchChange}
              />
              <div className="ms-1">
                <Button color="danger btn--sizer">Search</Button>
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
          </div>
        )}
      </section>
      {apiMessage && !activityIndicator && (
        <CustomResponseMessage
          apiStatus={lockedStatus}
          closeMessage={closeMessage}
          message={apiMessage}
          //errorFix={filterRecordsError}
        />
      )}
      {!activityIndicator && (
        <section>
          <div className="mt-5">
            <CustomHeader
              Edit={true}
              view={true}
              viewUser={getSelectedValues}
              editUser={navigateToEditPage}
              TableData={Header}
              CustomTableHeader={langData}
            />
          </div>
        </section>
      )}
      <CustomLoader isLoading={activityIndicator} size={50} />
    </div>
  );
};
export default LanguageParameter;
