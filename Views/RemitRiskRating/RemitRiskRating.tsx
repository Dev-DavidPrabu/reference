import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  deleteRiskRating,
  getRiskRatingList,
  resetCreateMessage,
  resetEditMessage,
} from "../../redux/action/RemitRiskRatingAction";

function RemitRiskRating() {
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
      title: "Risk Rating",
      dataIndex: "riskRating",
      key: "riskRating",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.riskRating?.toString().localeCompare(b.riskRating?.toString()),
      },
    },
    {
      title: "Low Risk Scale",
      dataIndex: "lowRiskScale",
      key: "lowRiskScale",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.lowRiskScale?.toString().localeCompare(b.lowRiskScale?.toString()),
      },
    },
    {
      title: "High Risk Scale",
      dataIndex: "highRiskScale",
      key: "highRiskScale",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.highRiskScale
            ?.toString()
            .localeCompare(b.highRiskScale?.toString()),
      },
    },
  ];

  const riskRatingData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.RemitRiskRatingReducer.getAllRiskRatingList
  );
  const RiskRatingCreate: any = useSelector(
    (state: RootStateOrAny) => state.RemitRiskRatingReducer.getRiskRatingError
  );

  const RiskRatingUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.RemitRiskRatingReducer.getRiskRatingEditError
  );

  let riskRatingList = riskRatingData?.data;

  const fetchRiskRatingdata = useCallback(async () => {
    try {
      dispatch(getRiskRatingList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchRiskRatingdata().then(() => {
      if (!riskRatingData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchRiskRatingdata]);

  useEffect(() => {
    if (riskRatingData) {
      if (riskRatingData.data) {
        setIsLoading(false);
      }
    }
  }, [riskRatingData]);

  useEffect(() => {
    if (RiskRatingCreate?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3000);
    }
  }, [RiskRatingCreate]);

  useEffect(() => {
    if (RiskRatingUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
      }, 3000);
    }
  }, [RiskRatingUpdate]);

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/remit-setup/Risk-Rating/Edit-Risk-Rating",
      state: {
        value: e,
      },
    });
  };

  const handle_RiskRatingAdd = () => {
    history.push({
      pathname: "/dashboard/remit-setup/Risk-Rating/Add-Risk-Rating",
      state: {},
    });
  };

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteRiskRating(recordId));
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

  const toggleRefresh = () => {
    setSearchArea(false);
    setcolumns([]);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setShowModalList(!showModalList);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };
  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      riskRatingList = riskRatingList.filter((e: any) => {
        return (
          e.riskRating
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.lowRiskScale
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.highRiskScale
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      riskRatingList = riskRatingList.filter((e: any) => {
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
  return (
    <div className="RemitRiskRating pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Risk Rating"}
          SummaryFileName={"Risk Rating"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={riskRatingList}
          Print={handlePrint}
          addButton={false}
          searchArea={toggleSearch}
          search={searchArea}
          filterLeft={false}
          filter={false}
          List={true}
          ListData={handleList}
          Refresh={true}
          refresh={toggleRefresh}
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

            <option value="riskRating" className="cursor">
              Risk Rating
            </option>
            <option value="lowRiskScale" className="cursor">
              Low Risk Scale
            </option>
            <option value="highRiskScale" className="cursor">
              High Risk Scale
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
            message={"Risk Rating Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Risk Rating Updated Successfully"}
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
            editUser={editUser}
            deleteUser={handleDelete}
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={riskRatingList}
            DisablePagination={riskRatingList?.length <= 7 ? true : false}
            Delete={true}
            Edit={true}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default RemitRiskRating;
