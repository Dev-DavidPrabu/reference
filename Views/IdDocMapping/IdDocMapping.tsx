import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaReply } from "react-icons/fa";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useReactToPrint } from "react-to-print";
import { Button, Input } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomTable from "../../Components/CustomTable/CustomTable";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ReferenceDataModel } from "../../models/ReferenceDataModel";
import {
  getIdDocMappingList,
  resetCreateMessage,
  resetEditMessage,
} from "../../redux/action/IdDocMappingAction";

function IdDocMapping() {
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

  const Header = [
    {
      title: "Brand",
      dataIndex: "walletTypeCode",
      key: "walletTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletTypeCode
            ?.toString()
            .localeCompare(b.walletTypeCode?.toString()),
      },
    },
    {
      title: "ID Type Code",
      dataIndex: "idTypeCode",
      key: "idTypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idTypeCode?.toString().localeCompare(b.idTypeCode?.toString()),
      },
    },
    {
      title: "ID Type Name",
      dataIndex: "idtypeCodeDescription",
      key: "idtypeCodeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idtypeCodeDescription
            ?.toString()
            .localeCompare(b.idtypeCodeDescription?.toString()),
      },
    },
    {
      title: "L1 Wallet",
      dataIndex: "walletLevelOne",
      key: "walletLevelOne",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletLevelOne
            ?.toString()
            .localeCompare(b.walletLevelOne?.toString()),
      },
    },
    {
      title: "L2 Wallet",
      dataIndex: "walletLevelTwo",
      key: "walletLevelTwo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletLevelTwo
            ?.toString()
            .localeCompare(b.walletLevelTwo?.toString()),
      },
    },
    {
      title: "L3 Wallet",
      dataIndex: "walletLevelThree",
      key: "walletLevelThree",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.walletLevelThree
            ?.toString()
            .localeCompare(b.walletLevelThree?.toString()),
      },
    },
  ];

  const idDocMappingData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.IdDocMappingReducer.getAllIdDocMappingList
  );
  const idDocMappingCreate: any = useSelector(
    (state: RootStateOrAny) => state.IdDocMappingReducer.getIdDocMappingError
  );

  const idDocMappingUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.IdDocMappingReducer.getIdDocMappingEditError
  );

  let idDocMappingList = idDocMappingData?.data;

  const fetchidDocMappingdata = useCallback(async () => {
    try {
      dispatch(getIdDocMappingList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchidDocMappingdata().then(() => {
      if (!idDocMappingData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchidDocMappingdata]);

  useEffect(() => {
    if (idDocMappingData) {
      if (idDocMappingData.data) {
        setIsLoading(false);
      }
    }
  }, [idDocMappingData]);

  useEffect(() => {
    if (idDocMappingCreate?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetCreateMessage());
      }, 3000);
    }
  }, [idDocMappingCreate]);

  useEffect(() => {
    if (idDocMappingUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetEditMessage());
      }, 3000);
    }
  }, [idDocMappingUpdate]);

  const editUser = (e: any) => {
    history.push({
      pathname: "/dashboard/Setup-And-Configuration/ID-Doc-Mapping-Edit",
      state: {
        value: e,
      },
    });
  };

  const handle_idDocMappingAdd = () => {
    history.push({
      pathname: "/dashboard/Setup-And-Configuration/ID-Doc-Mapping-Add",
      state: {},
    });
  };

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
      idDocMappingList = idDocMappingList.filter((e: any) => {
        return (
          e.walletTypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idTypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.idtypeCodeDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.walletLevelOne
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.walletLevelTwo
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.walletLevelThree
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      idDocMappingList = idDocMappingList.filter((e: any) => {
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
    <div className="IdDocMapping pb-5">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Brand - ID Doc Mapping"}
          SummaryFileName={"Brand - ID Doc Mapping"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={idDocMappingList}
          Print={handlePrint}
          addButton={true}
          addOnClick={handle_idDocMappingAdd}
          addText={"Add"}
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

            <option value="walletTypeCode" className="cursor">
              Brand
            </option>
            <option value="idTypeCode" className="cursor">
              ID Type Code
            </option>
            <option value="idtypeCodeDescription" className="cursor">
              ID Doc
            </option>
            <option value="walletLevelOne" className="cursor">
              L1 Wallet
            </option>
            <option value="walletLevelTwo" className="cursor">
              L2 Wallet
            </option>
            <option value="walletLevelThree" className="cursor">
              L3 Wallet
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
            message={"ID Doc Mapping Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"ID Doc Mapping Updated Successfully"}
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
            TableData={columns.length > 0 ? columns : Header}
            CustomTableHeader={idDocMappingList}
            Delete={false}
            Edit={true}
            DisableMange={toPrint ? true : false}
            toPrint={toPrint ? true : false}
          />
        </div>
      )}
    </div>
  );
}

export default IdDocMapping;
