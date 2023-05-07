import { Switch } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  getHighRiskCountryList,
  resetEditMessage,
  updateHighRiskCountry,
} from "../../redux/action/RemitHighRiskCountryAction";

function RemitHighRiskCountry() {
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [IsActive, setIsActive] = useState(false);

  const Header = [
    {
      title: "Name Of Country",
      dataIndex: "nameOfCountry",
      key: "nameOfCountry",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.nameOfCountry
            ?.toString()
            .localeCompare(b.nameOfCountry?.toString()),
      },
    },
    {
      title: "Status",
      render: (_: any, record: { key: React.Key } | any) => (
        <div>
          <div className="d-flex  cursor ">
            <Switch
              className="toggle-switch KYC-CustomerToggle"
              checkedChildren="Yes"
              unCheckedChildren="NO"
              onClick={() => handleDelete(record)}
              checked={record?.status}
            />
          </div>
        </div>
      ),
    },
  ];

  const highRiskCountryData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.RemitHighRiskCountryReducer.getAllHighRiskCountryList
  );

  const highRiskCountryUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.RemitHighRiskCountryReducer.getHighRiskCountryError
  );

  let highRiskCountryList = highRiskCountryData?.data;

  const fetchHighRiskCountrydata = useCallback(async () => {
    try {
      dispatch(getHighRiskCountryList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchHighRiskCountrydata().then(() => {
      if (!highRiskCountryData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchHighRiskCountrydata]);

  useEffect(() => {
    if (highRiskCountryData) {
      if (highRiskCountryData.data) {
        setIsLoading(false);
      }
    }
  }, [highRiskCountryData]);

  useEffect(() => {
    if (highRiskCountryUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
        window.location.reload();
      }, 3000);
    }
  }, [highRiskCountryUpdate]);

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
    setIsActive(!recordInfo?.status);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id, IsActive).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string, IsActive: boolean) => {
      try {
        dispatch(updateHighRiskCountry(recordId, IsActive));
      } catch (err) {}
    },
    [dispatch]
  );

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

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  if (searchUserData && searchCategory) {
    highRiskCountryList = highRiskCountryList.filter((e: any) => {
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
    <div className="RemitHighRiskCountry pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"HRC(High Risk Country) Setup"}
          SummaryFileName={"HRC(High Risk Country) Setup"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={highRiskCountryList}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={false}
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

            <option value="nameOfCountry" className="cursor">
              Name Of Country
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

      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"High Risk Country Updated Successfully"}
          />
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
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={highRiskCountryList}
            Delete={false}
            Edit={false}
            DisablePagination={true}
            DisableMange={true}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
        confirmheader={true}
        approvalReject={"Are you sure you want to update High Risk Country?"}
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default RemitHighRiskCountry;
