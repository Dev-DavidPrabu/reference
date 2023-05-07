import { Form } from "antd";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { FaReply } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import "./IdTypeSummary.scss";
import {
  deleteIdtypeSummaryData,
  getIdtypeCodeData,
  getIdtypeData,
  resetCreatedData,
  resetDeletedIdtypeData,
  resetFilterData,
} from "../../redux/action/IdTypeSummaryAction";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import SubmitCancelButton from "../../Components/SubmitCancelButton/SubmitCancelButton";
import FiltersSelected from "../../Components/FiltersSelected/FiltersSelected";

const IdTypeSummary = (props: any) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [toPrint, setPrint] = useState(false);
  const [showTableModal, setTableModal] = useState(false);
  const [searchArea, setSearchArea] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");
  const [form] = Form.useForm();
  const [filterOption, setfilterOption] = useState(false);
  const [filteredArea, setFilteredArea] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiStatus, setApiStatus] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [filterValue, setFilterValue] = useState({ idTypeCode: "" });
  const [errorMessage, setErrorMessage] = useState(false);
  const [tableShow, setTableShow] = useState(true);
  const [deleteId, setDeletId] = useState<any>(Object);

  const Header = [
    {
      title: "ID Type",
      dataIndex: "idtypeCode",
      key: "idtypeCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.idtypeCode?.toString().localeCompare(b.idtypeCode?.toString()),
      },
    },
    {
      title: "Description",
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
      title: "Country Specific",
      dataIndex: "isIdtypeCountrySpecific",
      key: "isIdtypeCountrySpecific",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isIdtypeCountrySpecific
            ?.toString()
            .localeCompare(b.isIdtypeCountrySpecific?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${statusCode === "Y" ? "textSuccess" : "textDanger"}`}
          >
            {statusCode}
          </label>
        );
      },
    },
    {
      title: "Bank Mandatory",
      dataIndex: "isBankFieldMandatory",
      key: "isBankFieldMandatory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isBankFieldMandatory
            ?.toString()
            .localeCompare(b.isBankFieldMandatory?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${statusCode === "Y" ? "textSuccess" : "textDanger"}`}
          >
            {statusCode}
          </label>
        );
      },
    },
    {
      title: "No of Pictures",
      dataIndex: "noOfPicturesToCapture",
      key: "noOfPicturesToCapture",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.noOfPicturesToCapture
            ?.toString()
            .localeCompare(b.noOfPicturesToCapture?.toString()),
      },
    },
    {
      title: "Issue Date",
      dataIndex: "isIssueDateMandatory",
      key: "isIssueDateMandatory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isIssueDateMandatory
            ?.toString()
            .localeCompare(b.isIssueDateMandatory?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${statusCode === "Y" ? "textSuccess" : "textDanger"}`}
          >
            {statusCode}
          </label>
        );
      },
    },
    {
      title: "Expiry Date",
      dataIndex: "isExpiryDateMandatory",
      key: "isExpiryDateMandatory",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isExpiryDateMandatory
            ?.toString()
            .localeCompare(b.isExpiryDateMandatory?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${statusCode === "Y" ? "textSuccess" : "textDanger"}`}
          >
            {statusCode}
          </label>
        );
      },
    },
    {
      title: "Downgrade Allowed",
      dataIndex: "isDowngradeAllowed",
      key: "isDowngradeAllowed",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isDowngradeAllowed
            ?.toString()
            .localeCompare(b.isDowngradeAllowed?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${statusCode === true ? "textSuccess" : "textDanger"}`}
          >
            {statusCode === true ? "Y" : " N"}
          </label>
        );
      },
    },

    {
      title: "Downgrade Basis",
      dataIndex: "downgradeBasis",
      key: "downgradeBasis",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.downgradeBasis
            ?.toString()
            .localeCompare(b.downgradeBasis?.toString()),
      },
    },

    {
      title: "Downgrade Grace Period",
      dataIndex: "downgradeGracePeriod",
      key: "downgradeGracePeriod",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.downgradeGracePeriod
            ?.toString()
            .localeCompare(b.downgradeGracePeriod?.toString()),
      },
    },
    {
      title: "Block Grace Period Allowed",
      dataIndex: "isBlockGracePeriodAllwowed",
      key: "isBlockGracePeriodAllwowed",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.isBlockGracePeriodAllwowed
            ?.toString()
            .localeCompare(b.isBlockGracePeriodAllwowed?.toString()),
      },
      render: (statusCode: any) => {
        return (
          <label
            className={` ${statusCode === "Y" ? "textSuccess" : "textDanger"}`}
          >
            {statusCode}
          </label>
        );
      },
    },
    {
      title: "Block Grace Period",
      dataIndex: "blockGracePeriod",
      key: "blockGracePeriod",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.blockGracePeriod
            ?.toString()
            .localeCompare(b.blockGracePeriod?.toString()),
      },
    },
    {
      title: "Created By Name",
      dataIndex: "createdByName",
      key: "createdBy",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.createdBy?.toString().localeCompare(b.createdBy?.toString()),
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
              statusCode === "ACTIVE" ? "textSuccess" : "textDanger"
            }`}
          >
            {statusCode}
          </label>
        );
      },
    },
  ];

  const idtypeSummaryListData = useSelector(
    (state: RootStateOrAny) =>
      state.idtypeSummaryReducer?.getAllIdtypeSummaryResponse
  );
  
  let datas = idtypeSummaryListData?.data?.map((data: any, index: any) => {
    return {
      ...data,
      key: index,
      createdDate: data?.createdDate?.slice(0, 10),
      isBankFieldMandatory: data.isBankFieldMandatory ? "Y" : "N",
      isBlockGracePeriodAllwowed: data.isBlockGracePeriodAllwowed ? "Y" : "N",
      isIdtypeCountrySpecific: data.isIdtypeCountrySpecific ? "Y" : "N",
      statusCode: data.statusCode === "A" ? "ACTIVE" : "INACTIVE",
      isIssueDateMandatory: data.isIssueDateMandatory ? "Y" : "N",
      isExpiryDateMandatory: data.isExpiryDateMandatory ? "Y" : "N",
    };
  });
  useEffect(() => {
    if (!idtypeSummaryListData?.data) {
      setIsLoading(true);
    }
  }, [idtypeSummaryListData]);

  useEffect(() => {
    if (idtypeSummaryListData?.data) {
      setIsLoading(false);
    }
  }, [idtypeSummaryListData]);

  const fetchIdtypeSummaryRes = useCallback(async () => {
    try {
      dispatch(getIdtypeData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchIdtypeSummaryRes();
  }, [fetchIdtypeSummaryRes]);
  
  const idtypeCodeSummaryData = useSelector(
    (state: RootStateOrAny) =>
      state.idtypeSummaryReducer?.getAllIdtypeCodeResponse
  );

  let filterData = idtypeCodeSummaryData?.data;
  if (filterData !== undefined) {
    datas = filterData;
  }

  useEffect(() => {
    if (idtypeCodeSummaryData) {
      if (idtypeCodeSummaryData?.data) {
        setIsLoading(false);
        setfilterOption(false);
        setFilteredArea(true);
        setTableShow(true);
      } else if (idtypeCodeSummaryData?.error) {
        setIsLoading(false);
        setfilterOption(false);
        setFilteredArea(true);
        setApiStatus(false);
        setApiMessage(idtypeCodeSummaryData?.message);
      }
    }
  }, [idtypeCodeSummaryData]);
  useEffect(() => {
    if (props?.location?.state) {
      setApiMessage(props?.location?.message);
      setApiStatus(true);
      resetCreatedData();
    }
  }, []);
  const deletingTheSelectedRecord = useCallback(
    async (id: any) => {
      try {
        dispatch(deleteIdtypeSummaryData(id));
      } catch (err) {}
    },
    [dispatch]
  );
  const deleteTheSelectedRecord = (id: any) => {
    deletingTheSelectedRecord(id).then(() => {
      fetchIdtypeSummaryRes();
      setIsLoading(true);
      setShowModal(!showModal);
    });
  };

  const deletedDataRes = useSelector(
    (state: RootStateOrAny) =>
      state.idtypeSummaryReducer?.deleteIdtypeSummaryResponse
  );

  const resetDeletedResponse = useCallback(async () => {
    try {
      dispatch(resetDeletedIdtypeData());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    if (deletedDataRes) {
      resetDeletedResponse();
      fetchIdtypeSummaryRes();
    } else if (deletedDataRes?.error) {
      setIsLoading(false);
      setApiMessage(deletedDataRes?.message);
      setApiStatus(false);
    }
  }, [fetchIdtypeSummaryRes]);

  const fetchIdtypeCodeRes = useCallback(
    async (id: any) => {
      try {
        dispatch(getIdtypeCodeData(id));
      } catch (err) {}
    },
    [dispatch]
  );
  const resetData = useCallback(async () => {
    try {
      dispatch(resetFilterData());
    } catch (err) {}
  }, [dispatch]);

  const viewUser = (e: any) => {
    let updatedE = {
      ...e,
      isBankFieldMandatory: e.isBankFieldMandatory === "Y" ? true : false,
      isBlockGracePeriodAllwowed:
        e.isBlockGracePeriodAllwowed === "Y" ? true : false,
      isIdtypeCountrySpecific: e.isIdtypeCountrySpecific === "Y" ? true : false,
      statusCode: e.statusCode === "ACTIVE" ? "A" : "D",
      isIssueDateMandatory: e.isIssueDateMandatory === "Y" ? true : false,
      isExpiryDateMandatory: e.isExpiryDateMandatory === "Y" ? true : false,
    };
    props.history.push({
      pathname: "/dashboard/View-Idtype-Summary",
      state: {
        data: updatedE,
        view: true,
      },
    });
  };
  const editUser = (e: any) => {
    let updatedE = {
      ...e,
      isBankFieldMandatory: e.isBankFieldMandatory === "Y" ? true : false,
      isBlockGracePeriodAllwowed:
        e.isBlockGracePeriodAllwowed === "Y" ? true : false,
      isIdtypeCountrySpecific: e.isIdtypeCountrySpecific === "Y" ? true : false,
      statusCode: e.statusCode === "ACTIVE" ? "A" : "D",
      isIssueDateMandatory: e.isIssueDateMandatory === "Y" ? true : false,
      isExpiryDateMandatory: e.isExpiryDateMandatory === "Y" ? true : false,
    };
    props.history.push({
      pathname: "/dashboard/Edit-Idtype-Summary",
      state: {
        data: updatedE,
        edit: true,
      },
    });
  };
  const deleteUser = (e: any) => {
    setShowModal(!showModal);
    setDeletId(e.id);
  };
  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const closeMessage = () => {
    setApiMessage("");
    setFilteredArea(false);
    fetchIdtypeSummaryRes();
  };

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = (filteredItems: any, orginalList: any) => {
    setSearchArea(false);
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(true);
  };
  const handleAdd = () => {
    props.history.push({
      pathname: "/dashboard/Add-Idtype-Summary",
      state: {
        data: "",
        add: true,
      },
    });
  };
  const toggleSearch = () => {
    setSearchArea(!searchArea);
    setfilterOption(false);
  };

  const cancelPrint = () => {
    setPrint(false);
    setcolumns([]);
  };

  const toggleRefresh = () => {
    setSearchArea(false);
    setcolumns([]);
    setorginalColumns([]);
    setPrint(false);
  };

  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setTableModal(!showTableModal);
  };

  const closeSearch = () => {
    setSearchArea(false);
  };

  if (searchUserData && searchCategory) {
    if (searchCategory === "any") {
      datas = datas?.filter((e: any) => {
        return (
          e.idtypeCode
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.idtypeCodeDescription
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.cardworksCodeMapping
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.isIdtypeCountrySpecific
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.isBankFieldMandatory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.noOfPicturesToCapture
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.createdBy
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.isDowngradeAllowed
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.isIssueDateMandatory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.isExpiryDateMandatory
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.downgradeBasis
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.downgradeGracePeriod
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.isBlockGracePeriodAllwowed
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.blockGracePeriod
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      datas = datas?.filter((e: any) => {
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

  const toggleFilter = () => {
    setfilterOption(!filterOption);
    setSearchArea(false);
    setFilteredArea(false);
    resetData();
    fetchIdtypeSummaryRes();
    setFilterValue({
      idTypeCode: "",
    });
  };

  const handleClick = () => {
    if (filterValue.idTypeCode) {
      setIsLoading(true);
      fetchIdtypeCodeRes(filterValue.idTypeCode);
      setErrorMessage(false);
      setTableShow(true);
    } else {
      setErrorMessage(true);
    }
  };
  const resetFilter = () => {
    setFilterValue({
      idTypeCode: "",
    });
  };
  const handleChangeCode = (e: any) => {
    setFilterValue({ ...filterValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <CommonHeaderSummary
        RightContent={"ID Type Summary"}
        SummaryFileName={"ID Type Summary"}
        SummaryColumn={orginalColumns.length > 0 ? orginalColumns : Header}
        TableData={Array.isArray(datas) ? datas : [datas]}
        Add={true}
        AddAction={handleAdd}
        Print={handlePrint}
        addButton={false}
        searchArea={toggleSearch}
        search={searchArea}
        filterLeft={false}
        filter={true}
        filterEnabled={filterOption}
        filterArea={toggleFilter}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
      />

      {apiMessage && (
        <CustomResponseMessage
          apiStatus={apiStatus}
          closeMessage={() => closeMessage()}
          message={apiMessage}
          errorFix={approveError}
        />
      )}
      {filterOption && (
        <div className="colorWhite payout-filter-section mt-3 p-3">
          <p className="branchSetupTitle">
            Filter
            {errorMessage && (
              <span className="colorRedUser">
                {" "}
                ** any one field value is mandatory
              </span>
            )}
          </p>
          <div className="container-fluid">
            <div className="row">
              <div className="col-2 countryName">
                <Label for="exampleEmail">
                  IdTypeCode{" "}
                  <span className="container-body-label-color">*</span>
                </Label>
              </div>
              <div className="col-6">
                <FormGroup>
                  <Input
                    onChange={handleChangeCode}
                    type="text"
                    name="idTypeCode"
                    className=""
                    placeholder="Enter idTypeCode"
                    value={filterValue.idTypeCode}
                  />
                </FormGroup>
              </div>
              <div className="col align-items-center d-flex ms-3">
                <SubmitCancelButton
                  button={"Submit"}
                  secondButton={"Reset"}
                  onSubmit={handleClick}
                  onCancel={resetFilter}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {filteredArea && <FiltersSelected value={filterValue} />}
      {searchArea && (
        <div className="d-flex user-search mt-2 mb-3 p-3 cursor">
          <select
            className=" form-select user-search-drop ms-2 cursor"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected hidden className="cursor">
              Select Field
            </option>

            <option value="idtypeCode" className="cursor">
              ID Type
            </option>
            <option value="idtypeCodeDescription" className="cursor">
              Description
            </option>
            <option value="isIdtypeCountrySpecific" className="cursor">
              Country Specific
            </option>
            <option value="isBankFieldMandatory" className="cursor">
              Bank Mandatory
            </option>
            <option value="noOfPicturesToCapture" className="cursor">
              No of Pictures
            </option>
            <option value="isIssueDateMandatory" className="cursor">
              Issue Date
            </option>
            <option value="isExpiryDateMandatory" className="cursor">
              Expiry Date
            </option>
            <option value="isDowngradeAllowed" className="cursor">
              Downgrade Allowed
            </option>
            <option value="downgradeBasis" className="cursor">
              Downgrade Basis
            </option>
            <option value="downgradeGracePeriod" className="cursor">
              Downgrade Grace Period
            </option>
            <option value="isBlockGracePeriodAllwowed" className="cursor">
              Block Grace Period Allowed
            </option>
            <option value="blockGracePeriod" className="cursor">
              Block Grace Period
            </option>
            <option value="createdBy" className="cursor">
              Creaated By
            </option>

            <option value="statusCode" className="cursor">
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
            <button
              className="border-0 bg-light"
              onClick={Print}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              here
            </button>{" "}
            to confirm and Print !. Or{" "}
            <button
              className="border-0 bg-light"
              onClick={cancelPrint}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Cancel
            </button>
          </span>
        )}
      </div>

      <div className="">
        <CustomLoader isLoading={isLoading} size={50} />
        {isLoading ? null : (
          <div className="mt-3" ref={componentRef}>
            <Form form={form} component={false}>
              {tableShow && (
                <CustomHeader
                  TableData={columns.length > 0 ? columns : Header}
                  columns={Header}
                  viewUser={viewUser}
                  editUser={editUser}
                  deleteUser={deleteUser}
                  noOfRows={true}
                  view={true}
                  Edit={true}
                  Delete={false}
                  CustomTableHeader={Array.isArray(datas) ? datas : [datas]}
                  DefaultColumnWidth={true}
                  toPrint={toPrint ? true : false}
                  DisableMange={toPrint ? true : false}
                />
              )}
            </Form>
          </div>
        )}
      </div>
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        confirmheader={true}
        buttonYes={true}
        selectedFestivalInfo={deleteId}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
};

export default IdTypeSummary;
