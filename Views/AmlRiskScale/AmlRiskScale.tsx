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
  deleteRiskScale,
  getRiskScale,
  resetCreateMessage,
  resetEditMessage,
} from "../../redux/action/AmlRiskScaleAction";
import "./AmlRiskScale.scss";

function AmlRiskScale() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [columns, setcolumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const date = new Date().toLocaleString();

  const Header = [
    {
      title: "Risk Score",
      dataIndex: "riskScale",
      key: "riskScale",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.riskScale?.toString().localeCompare(b.riskScale?.toString()),
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.description?.toString().localeCompare(b.description?.toString()),
      },
    },
  ];

  const amlRiskScaleData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.AmlRiskScaleReducer.getAllRiskScaleList
  );
  const riskScaleCreate: any = useSelector(
    (state: RootStateOrAny) => state.AmlRiskScaleReducer.getRiskCreateError
  );

  const riskScaleUpdate: any = useSelector(
    (state: RootStateOrAny) => state.AmlRiskScaleReducer.getRiskEditError
  );

  let riskScaleList = amlRiskScaleData?.data;

  const fetchRiskScaledata = useCallback(async () => {
    try {
      dispatch(getRiskScale());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchRiskScaledata().then(() => {
      if (!amlRiskScaleData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchRiskScaledata]);

  useEffect(() => {
    if (amlRiskScaleData) {
      if (amlRiskScaleData.data) {
        setIsLoading(false);
      }
    }
  }, [amlRiskScaleData]);

  useEffect(() => {
    if (riskScaleCreate?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3000);
    }
  }, [riskScaleCreate]);

  useEffect(() => {
    if (riskScaleUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
      }, 3000);
    }
  }, [riskScaleUpdate]);

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/remit-setup/Risk-Score/Edit-Risk-Score",
      state: {
        value: e,
      },
    });
  };

  const handle_riskScaleAdd = () => {
    history.push({
      pathname: "/dashboard/remit-setup/Risk-Score/Add-Risk-Score",
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
        dispatch(deleteRiskScale(recordId));
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
  const closeMessage = () => {
    setApiMessage(false);
  };

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      riskScaleList = riskScaleList.filter((e: any) => {
        return (
          e.riskScale
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.description
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      riskScaleList = riskScaleList.filter((e: any) => {
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
    <div className="AmlRiskScale pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Risk Score"}
          SummaryFileName={"Risk Score"}
          SummaryColumn={Header}
          TableData={riskScaleList}
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

            <option value="riskScale" className="cursor">
              Risk Score
            </option>
            <option value="description" className="cursor">
              Description
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
            message={"Risk Scale Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Risk Scale Updated Successfully"}
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
          {columns.length > 0 && (
            <>
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                Merchant Trade Asia
              </h3>
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {"Risk Scale"}
              </h3>
            </>
          )}
          <CustomTable
            editUser={editUser}
            deleteUser={handleDelete}
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={riskScaleList}
            DisablePagination={riskScaleList?.length <= 7 ? true : false}
            Delete={true}
            Edit={true}
            DisableMange={columns.length > 0 ? true : false}
            toPrint={columns.length > 0 ? true : false}
          />
          {columns.length > 0 && (
            <p style={{ color: "red", marginTop: "5px" }}>Date : {date}</p>
          )}
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

export default AmlRiskScale;
