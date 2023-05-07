import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  getRiskFactorStatusConfigList,
  resetEditMessage,
  updateRiskFactorStatusConfig,
} from "../../redux/action/RemitRiskFactorStatusConfigurationAction";
import "./RemitRiskFactorStatusConfiguration.scss";

function RemitRiskFactorStatusConfiguration() {
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [showModalList, setShowModalList] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [showTableModal, setTableModal] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [apiUpdateMessage, setApiUpdateMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const [IsActive, setIsActive] = useState(false);

  const Header = [
    {
      title: "Risk Category",
      dataIndex: "riskCategory",
      key: "riskCategory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.riskCategory?.toString().localeCompare(b.riskCategory?.toString()),
      },
    },
    {
      title: "Risk Factors",
      dataIndex: "riskFactor",
      key: "riskFactor",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.riskFactor?.toString().localeCompare(b.riskFactor?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "statusCode",
      key: "statusCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.statusCode?.toString().localeCompare(b.statusCode?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${
              statusCode === "Active"
                ? "status-validated"
                : statusCode === "DeActive" && "status-error"
            }`}
          >
            {statusCode}
          </label>
        );
      },
    },
    {
      title: "Manage",
      render: (_: any, record: { key: React.Key } | any) => (
        <div>
          <div className="d-flex  cursor ">
            {record?.statusCode === "Active" && (
              <div
                className="riskFactorButton deActivate_risk"
                id="DeActivate"
                onClick={() => handleDelete(record)}
              >
                <TiTimes className="riskFactorIcon" />
                <CustomTooltip target="DeActivate">DeActivate</CustomTooltip>
              </div>
            )}
            {record?.statusCode === "DeActive" && (
              <div
                className="riskFactorButton activate_risk"
                id="Activate"
                onClick={() => handleDelete(record)}
              >
                <TiTick className="riskFactorIcon" />
                <CustomTooltip target="Activate">Activate</CustomTooltip>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  const riskFactorStatusData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.RemitRiskFactorStatusConfigurationReducer.getAllRiskFactorStatusList
  );

  const riskFactorStatusUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.RemitRiskFactorStatusConfigurationReducer.getRiskFactorStatusError
  );

  let riskFactorStatusList = riskFactorStatusData?.data;

  const fetchriskFactorStatusdata = useCallback(async () => {
    try {
      dispatch(getRiskFactorStatusConfigList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchriskFactorStatusdata().then(() => {
      if (!riskFactorStatusData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchriskFactorStatusdata]);

  useEffect(() => {
    if (riskFactorStatusData) {
      if (riskFactorStatusData.data) {
        setIsLoading(false);
      }
    }
  }, [riskFactorStatusData]);

  useEffect(() => {
    if (riskFactorStatusUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
        window.location.reload();
      }, 3000);
    }
  }, [riskFactorStatusUpdate]);

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (recordInfo: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(recordInfo);
    setIsActive(recordInfo?.statusCode === "Active" ? true : false);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo?.id, IsActive).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingTheSelectedRecord = useCallback(
    async (recordId: string, IsActive: boolean) => {
      try {
        if (IsActive) {
          dispatch(updateRiskFactorStatusConfig(recordId, "DEACTIVATE"));
        } else {
          dispatch(updateRiskFactorStatusConfig(recordId, "ACTIVATE"));
        }
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

  const closeUpdateMessage = () => {
    setApiUpdateMessage(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      riskFactorStatusList = riskFactorStatusList.filter((e: any) => {
        return (
          e.riskCategory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.riskFactor
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.statusCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      riskFactorStatusList = riskFactorStatusList.filter((e: any) => {
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
    <div className="RemitRiskFactorStatusConfiguration pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Risk Factor Status Configuration"}
          SummaryFileName={"Risk Factor Status Configuration"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={riskFactorStatusList}
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

            <option value="riskCategory" className="cursor">
              Risk Category
            </option>
            <option value="riskFactor" className="cursor">
              Risk Factor
            </option>
            <option value="statusCode" className="cursor">
              status
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
            <Button color="danger kyc-FilterSearchButton">Search</Button>
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
            message={"Risk Factor Status Updated Successfully"}
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
            CustomTableHeader={riskFactorStatusList}
            Delete={false}
            Edit={false}
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
        approvalReject={
          IsActive
            ? "Are you sure you want to Deactivate this Risk Factor?"
            : "Are you sure you want to Activate this Risk Factor?"
        }
      ></DeleteConfirmaionPopUp>
    </div>
  );
}

export default RemitRiskFactorStatusConfiguration;
