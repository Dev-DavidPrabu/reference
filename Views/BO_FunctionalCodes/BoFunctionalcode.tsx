import { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { useHistory, useLocation } from "react-router";

import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import { ToggleSummaryInfo } from "../../models/ToggleSummaryModel";
import {
  deleteFunctionCode,
  getFunctionalCode,
  resetCreateMessage,
  resetEditCreateMessage,
} from "../../redux/action/BoFunctionalcodeAction";

const BoFunctionalCode = () => {
  const [searchArea, setSearchArea] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [toPrint, setPrint] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const date = new Date().toLocaleString();
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const location: any = useLocation();
  const history = useHistory();
  const [searchUserData, setsearchUserData] = useState<string>("");
  const dispatch = useDispatch();

  const Functionalcode: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.BoFunctionalcodeReducer?.getBoFunctioanalcodeResponse
  );
  useEffect(() => {
    if (FunctionCreate?.data) {
      setApiMessage(true);

      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage())
      }, 3500);
    }
  }, [dispatch]);

  useEffect(() => {
    if (FunctionCodeEdit?.data) {
      setApiMessage(true);

      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditCreateMessage())
      }, 3500);
    }
  }, [dispatch]);

  const fetchFunctionalcodedata = useCallback(async () => {
    try {
      dispatch(getFunctionalCode());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchFunctionalcodedata().then(() => {
      if (!Functionalcode?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchFunctionalcodedata]);

  useEffect(() => {
    if (Functionalcode) {
      if (Functionalcode?.data) {
        setIsLoading(false);
      }
    }
  }, [Functionalcode]);

  const FunctionCreate: any = useSelector(
    (state: RootStateOrAny) =>
      state.BoFunctionalcodeReducer.getFunctionalCodeAddResponse
  );
  const FunctionCodeEdit: any = useSelector(
    (state: RootStateOrAny) =>
      state.BoFunctionalcodeReducer?.getFunctionalCodeEditResponse
  );

  let moduleList = Functionalcode?.data;

  const Header = [
    {
      title: "Allowable Mode",
      dataIndex: "allowableMode",
      key: "allowableMode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.allowableMode
            ?.toString()
            .localeCompare(b.allowableMode?.toString()),
      },
    },
    {
      title: "App Code",
      dataIndex: "appCode",
      key: "appCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.appCode?.toString().localeCompare(b.appCode?.toString()),
      },
    },

    {
      title: "Authority Level",
      dataIndex: "authorityLevel",
      key: "authorityLevel",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.authorityLevel
            ?.toString()
            .localeCompare(b.authorityLevel?.toString()),
      },
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.category?.toString().localeCompare(b.category?.toString()),
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
    {
      title: "Function Code",
      dataIndex: "functionCode",
      key: "functionCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.functionCode?.toString().localeCompare(b.functionCode?.toString()),
      },
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.status?.toString().localeCompare(b.status?.toString()),
      },
      render: (status: any) => {
        let value = status?.toString().toUpperCase();
        return (
          <label
            className={` ${
              value === "ACTIVE" ? "text-success" : "text-danger"
            }`}
          >
            {value === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
          </label>
        );
      },
    },
  ];

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/Functional-code/Functional-code-Edit",
      state: {
        value: e,
        edit: true,
      },
    });
  };
  const handleDelete = (record: any) => {
    setShowModal(!showModal);
    setSelectedRecordInfo(record);
  };
  const deleteTheSelectedRecord = (record: any) => {
    deletingRecord(record?.id).then(() => {
      setShowModal(!showModal);
    });
  };
  const deletingRecord = useCallback(
    async (recordId: string) => {
      try {
        dispatch(deleteFunctionCode(recordId));
      } catch (err) {}
    },
    [dispatch]
  );

  const toggleSearch = () => {
    setSearchArea(!searchArea);
  };
  const handle_idTypeAdd = () => {
    history.push({
      pathname: "/dashboard/Functional-code/FunctionalCode-Create",
    });
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const closeSearch = () => {
    setSearchArea(!searchArea);
    window.location.reload();
  };
  const handlePrint = (data: any) => {
    setSearchArea(false);
    setPrint(!toPrint);
    setcolumns(data);
  };
  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      moduleList = moduleList.filter((e: any | ToggleSummaryInfo) => {
        return (
          e.description
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.category
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.functionCode
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
    <div>
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Functional Code Setup"}
          SummaryFileName={"Functional Codes"}
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

            <option value="description" className="cursor">
              Description
            </option>
            <option value="category" className="cursor">
              Category
            </option>
            <option value="functionCode" className="cursor">
              Function Code
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
            message={
              location.state?.add === true
                ? "Function Code Added Successfully"
                : "Function Code Updated Successfully"
            }
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
};
export default BoFunctionalCode;
