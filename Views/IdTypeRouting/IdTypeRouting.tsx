import React, { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./IdTypeRouting.scss";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  getIdTypeRouting,
  deleteIdTypeRouting,
  resetCreateMessage,
} from "../../redux/action/idTypeRoutingActions";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { Button, Input } from "reactstrap";
import { FaReply } from "react-icons/fa";
import "antd/dist/antd.css";
import { useReactToPrint } from "react-to-print";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";

function IdTypeRouting(props: any) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [columns, setcolumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const date = new Date().toLocaleString();

  const Header = [
    {
      title: "Country",
      dataIndex: "countryCode",
      key: "CountryCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.countryCode?.toString().localeCompare(b.countryCode?.toString()),
      },
    },
    {
      title: "Description",
      dataIndex: "countryDescription",
      key: "CountryDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.countryDescription
            ?.toString()
            .localeCompare(b.countryDescription?.toString()),
      },
    },

    {
      title: "Id Type",
      dataIndex: "idType",
      key: "IdType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idType?.toString().localeCompare(b.idType?.toString()),
      },
    },

    {
      title: "Routing Channel",
      dataIndex: "routingChannel",
      key: "RoutingChannel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.routingChannel
            ?.toString()
            .localeCompare(b.routingChannel?.toString()),
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
    },
  ];

  const idtypeRoutingData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer.getAllIdTypeRoutingResponse
  );
  const idtypeCreate: any = useSelector(
    (state: RootStateOrAny) => state.idtypeReducer.getIdtypeCreateError
  );

  const idTypeList = idtypeRoutingData?.data;
  let moduleList = idtypeRoutingData?.data;

  const fetchIdtypeRoutingdata = useCallback(async () => {
    try {
      dispatch(getIdTypeRouting());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchIdtypeRoutingdata().then(() => {
      if (!idtypeRoutingData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchIdtypeRoutingdata]);

  useEffect(() => {
    if (idtypeRoutingData) {
      if (idtypeRoutingData.data) {
        setIsLoading(false);
      }
    }
  }, [idtypeRoutingData]);

  useEffect(() => {
    if (idtypeCreate?.data) {
      setApiMessage(true);
      setTimeout(function () {
        dispatch(resetCreateMessage());
      }, 1500);
    }
  }, [idtypeCreate]);

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/ID-Type-Routing/ID-Type-Edit",
      state: {
        value: e,
      },
    });
  };

  const handle_idTypeAdd = () => {
    history.push({
      pathname: "/dashboard/ID-Type-Routing/ID-Type-Create",
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
        dispatch(deleteIdTypeRouting(recordId));
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

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      moduleList = moduleList.filter((e: any | ToggleSummaryInfo) => {
        return (
          e.countryCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.countryDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.routingChannel
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.status
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      moduleList = moduleList.filter((e: any | ToggleSummaryInfo) => {
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
    <div className="Idtype">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"ID Type Routing"}
          SummaryFileName={"ID Type Routing"}
          SummaryColumn={Header}
          TableData={moduleList}
          Print={handlePrint}
          addButton={true}
          addOnClick={handle_idTypeAdd}
          addText={"Add"}
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

            <option value="countryCode" className="cursor">
              Country
            </option>
            <option value="countryDescription" className="cursor">
              Description
            </option>
            <option value="idType" className="cursor">
              Id Type
            </option>
            <option value="routingChannel" className="cursor">
              Routing Channel
            </option>
            <option value="status" className="cursor">
              Status
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
            message={"Id Type Updated Successfully"}
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
                {"ID Type Routing"}
              </h3>
            </>
          )}
          <CustomTable
            editUser={editUser}
            deleteUser={handleDelete}
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={moduleList}
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

export default IdTypeRouting;
