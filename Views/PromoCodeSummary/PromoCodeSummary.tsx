import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PromoCodeSummary.scss";
import { FaRegEdit, FaReply } from "react-icons/fa";
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
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import {
  deletePromoCodeSetup,
  getPromoCodeSetupList,
  resetPromoCreateMessage,
  resetPromoUpdateMessage,
} from "../../redux/action/PromoCodeSummaryAction";

function PromoCodeSummary() {
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
      title: "Promo Title",
      dataIndex: "promoName",
      key: "promoName",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.promoName?.toString().localeCompare(b.promoName?.toString()),
      },
    },

    {
      title: "Promo Code",
      dataIndex: "promoCode",
      key: "promoCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.promoCode?.toString().localeCompare(b.promoCode?.toString()),
      },
    },
    {
      title: "Promotion Type",
      dataIndex: "promotionType",
      key: "promotionType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.promotionType
            ?.toString()
            .localeCompare(b.promotionType?.toString()),
      },
    },
    {
      title: "Payment Method",
      dataIndex: "payoutModeDescription",
      key: "payoutModeDescription",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.payoutModeDescription
            ?.toString()
            .localeCompare(b.payoutModeDescription?.toString()),
      },
    },
    {
      title: "Value Per Transaction",
      dataIndex: "promoValue",
      key: "promoValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.promoValue?.toString().localeCompare(b.promoValue?.toString()),
      },
    },
    {
      title: "Total No.Of Redemption",
      dataIndex: "totalPromoValue",
      key: "totalPromoValue",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.totalPromoValue
            ?.toString()
            .localeCompare(b.totalPromoValue?.toString()),
      },
    },
    {
      title: "Valid From",
      dataIndex: "validFrom",
      key: "validFrom",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.validFrom?.toString().localeCompare(b.validFrom?.toString()),
      },
      render: (validFrom: any) => {
        let value = validFrom?.replace("T"," ");
        return (
          <label>
            {value}
          </label>
        );
      },
    },
    {
      title: "Valid To",
      dataIndex: "validTo",
      key: "validTo",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.validTo?.toString().localeCompare(b.validTo?.toString()),
      },
      render: (validTo: any) => {
        let value = validTo?.replace("T"," ");
        return (
          <label>
            {value}
          </label>
        );
      },
    },
    {
      title: "Notification Id",
      dataIndex: "notificationId",
      key: "notificationId",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationId
            ?.toString()
            .localeCompare(b.notificationId?.toString()),
      },
    },
    {
      title: "Notification Type",
      dataIndex: "notificationType",
      key: "notificationType",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationType
            ?.toString()
            .localeCompare(b.notificationType?.toString()),
      },
    },
    {
      title: "Activate (Y/N)",
      dataIndex: "activate",
      key: "activate",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.activate?.toString().localeCompare(b.activate?.toString()),
      },
      render: (active: any) => {
        return (
          <div>
            <label className={` ${active ? "text-success" : "text-danger"}`}>
              {active ? "Yes" : "No"}
            </label>
          </div>
        );
      },
    },
    {
      title: "Send (Y/N)",
      dataIndex: "send",
      key: "send",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.send?.toString().localeCompare(b.send?.toString()),
      },
      render: (send: any) => {
        return (
          <div>
            <label className={` ${send ? "text-success" : "text-danger"}`}>
              {send ? "Yes" : "No"}
            </label>
          </div>
        );
      },
    },
    {
      title: "Manage",
      dataIndex: "manage",
      key: "manage",
      checked: true,
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">
              <div
                className={` manage-button disable-background cursor`}
                onClick={() => handleView(record)}
              >
                <AiOutlineEye />
              </div>
              {record?.activate && !record?.validFrom && !record?.validTo && (
                <div
                  className={` manage-button cursor disable-background`}
                  onClick={() => handleEdit(record)}
                >
                  <FaRegEdit />
                </div>
              )}
              {!record?.activate && (
                <div
                  className={` manage-button cursor disable-background`}
                  onClick={() => handleEdit(record)}
                >
                  <FaRegEdit />
                </div>
              )}
              {!record?.activate && (
                <div
                  className={` manage-button cursor disable-background`}
                  onClick={() => handleDelete(record)}
                >
                  <AiOutlineDelete />
                </div>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  const promoCodeData: ReferenceDataModel | any = useSelector(
    (state: RootStateOrAny) => state.PromoCodeSummaryReducer.getAllPromoCodeList
  );
  const promoCodeDataCreate: any = useSelector(
    (state: RootStateOrAny) =>
      state.PromoCodeSummaryReducer.getPromoCodeCreateError
  );

  const promoCodeDataUpdate: any = useSelector(
    (state: RootStateOrAny) =>
      state.PromoCodeSummaryReducer.getPromoCodeUpdateError
  );

  let promoCodeDataList = promoCodeData?.data;

  const fetchPromoCodedata = useCallback(async () => {
    try {
      dispatch(getPromoCodeSetupList());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchPromoCodedata().then(() => {
      if (!promoCodeData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchPromoCodedata]);

  useEffect(() => {
    if (promoCodeData) {
      if (promoCodeData.data || promoCodeData.error === "EMPTY_LIST") {
        setIsLoading(false);
      }
    }
  }, [promoCodeData]);

  useEffect(() => {
    if (promoCodeDataCreate?.data) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetPromoCreateMessage());
      }, 3000);
    }
  }, [promoCodeDataCreate]);

  useEffect(() => {
    if (promoCodeDataUpdate?.data) {
      setApiUpdateMessage(true);
      setTimeout(function () {
        setApiUpdateMessage(false);
        dispatch(resetPromoUpdateMessage());
      }, 3000);
    }
  }, [promoCodeDataCreate]);

  const handleEdit = (e: any) => {
    history.push({
      pathname: "/dashboard/marketing/Promo-Code-Summary/Edit-Promo-Code-Setup",
      state: {
        value: e,
      },
    });
  };

  const handleView = (e: any) => {
    history.push({
      pathname: "/dashboard/marketing/Promo-Code-Summary/View-Promo-Code-Setup",
      state: {
        value: e,
      },
    });
  };

  const handle_PromoCodeAdd = () => {
    history.push({
      pathname: "/dashboard/marketing/Promo-Code-Summary/Add-Promo-Code",
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
        dispatch(deletePromoCodeSetup(recordId));
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
    let manage = {
      title: "Manage",
      dataIndex: "manage",
      key: "manage",
      checked: true,
      render: (_: any, record: { key: React.Key } | any) => {
        return (
          <div>
            <div className="col d-flex">
              <div
                className={` manage-button disable-background cursor`}
                onClick={() => handleView(record)}
              >
                <AiOutlineEye />
              </div>
              {record?.activate && !record?.validFrom && !record?.validTo && (
                <div
                  className={` manage-button cursor disable-background`}
                  onClick={() => handleEdit(record)}
                >
                  <FaRegEdit />
                </div>
              )}
              {!record?.activate && (
                <div
                  className={` manage-button cursor disable-background`}
                  onClick={() => handleEdit(record)}
                >
                  <FaRegEdit />
                </div>
              )}
              {!record?.activate && (
                <div
                  className={` manage-button cursor disable-background`}
                  onClick={() => handleDelete(record)}
                >
                  <AiOutlineDelete />
                </div>
              )}
            </div>
          </div>
        );
      },
    };
    filteredItems.push(manage);
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
      promoCodeDataList = promoCodeDataList.filter((e: any) => {
        return (
          e.promoName
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.promoCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.promotionType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.payoutModeDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.promoValue
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.totalPromoValue
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.validFrom
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.validTo
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.notificationId
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.notificationType
            ?.toString()
            .toUpperCase()
            .includes(searchUserData.toUpperCase())
        );
      });
    } else {
      promoCodeDataList = promoCodeDataList.filter((e: any) => {
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
    <div className="PromoCodeSummary">
      <div className="p-3 pb-0">
        <CommonHeaderSummary
          RightContent={"Promo Code Summary"}
          SummaryFileName={"Promo Code Summary"}
          SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
          TableData={promoCodeDataList}
          Print={handlePrint}
          addButton={true}
          addOnClick={handle_PromoCodeAdd}
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

            <option value="promoName" className="cursor">
              Promo Name
            </option>
            <option value="promoCode" className="cursor">
              Promo Code
            </option>
            <option value="promotionType" className="cursor">
              Promotion Type
            </option>
            <option value="payoutModeDescription" className="cursor">
              Payment Method
            </option>
            <option value="promoValue" className="cursor">
              Value Per Transaction
            </option>
            <option value="totalPromoValue" className="cursor">
              Total No.Of Redemption
            </option>
            <option value="validFrom" className="cursor">
              Valid From
            </option>
            <option value="validTo" className="cursor">
              Valid To
            </option>
            <option value="notificationId" className="cursor">
              Notification Id
            </option>
            <option value="notificationType" className="cursor">
              Notification Type
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
      {apiMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Promo Code Created Successfully"}
          />
        </div>
      )}
      {apiUpdateMessage && (
        <div className="px-3">
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeUpdateMessage}
            message={"Promo Code Updated Successfully"}
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
            CustomTableHeader={promoCodeDataList}
            DisablePagination={false}
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

export default PromoCodeSummary;
