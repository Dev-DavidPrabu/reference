import React, { useEffect, useCallback, useState, useRef } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import {
  deleteReferenceData,
  getAllReferenceData,
  resetCreateMessage,
  resetReferenceData,
} from "../../redux/action/ReferenceDataAction";
import {
  Fields,
  ReferenceDataModel,
  ReferenceData,
} from "../../models/ReferenceDataModel";
import CustomLoader from "../../Components/Loader/CustomLoader";
import { useHistory, useLocation } from "react-router";
import CustomInput from "../../Components/UI/CustomInput";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { Button, Input } from "reactstrap";
import CustomTable from "../../Components/CustomTable/CustomTable";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";
import CustomDNDPopup from "../../Components/CustomComponents/CustomDNDPopup/CustomDNDPopup";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import { filterTableData } from "../../Constants/HelperFunction";
import { useReactToPrint } from "react-to-print";
import { FaReply } from "react-icons/fa";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";

function View() {
  const location: any = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [searchReferenceCode, setsearchReferenceCode] = useState("");
  const [columns, setcolumns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPdfModal, setshowPdfModal] = useState(false);
  const [showPrintModal, setshowPrintModal] = useState(false);
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [imagePreviewInfo, setImagePreviewInfo] = useState();
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const referenceCategory = location?.state?.category;
  const date = new Date().toLocaleString();
  let lastDot,
    ext = "";
  const referenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) =>
      state.referenceReducer.getAllReferenceDataResponse
  );
  const createReferenceData: ReferenceDataModel = useSelector(
    (state: RootStateOrAny) => state.referenceReducer.createReferenceData?.data
  );
  //Action call for GetList of wallet
  const fetchAllReferencedata = useCallback(async () => {
    try {
      dispatch(resetReferenceData());
      dispatch(getAllReferenceData(referenceCategory));
    } catch (err) {}
  }, [dispatch, referenceCategory]);
  //to load a initial data
  useEffect(() => {
    fetchAllReferencedata().then(() => {
      if (!referenceData?.data) {
        setIsLoading(true);
      }
    });
  }, [fetchAllReferencedata]);

  useEffect(() => {
    if (referenceData) {
      if (referenceData.data) {
        setIsLoading(false);
      }
    }
  }, [referenceData]);

  useEffect(() => {
    if (createReferenceData?.data) {
      setApiMessage(true);
      setTimeout(function () {
        dispatch(resetCreateMessage());
      }, 1500);
    }
  }, [createReferenceData]);

  const valuesArray = [
    "valueOne",
    "valueTwo",
    "valueThree",
    "valueFour",
    "valueFive",
    "valueSix",
    "valueSeven",
    "valueEight",
    "valueNine",
    "valueTen",
  ];

  const reference_DataArray: Fields = referenceData.data;
  let dataArray: any = referenceData.data;

  let result: Fields = reference_DataArray?.map(
    (e: ReferenceData, id: number) => ({
      code: e?.code,
      description: e?.description,
      content: e?.content,
      [e.field1]: e?.value1,
      [e.field2]: e?.value2,
      id: e?.id,
    })
  );

  let Header = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.code?.toString().localeCompare(b.code?.toString()),
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
      title: "Image",
      dataIndex: "content",
      key: "content",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.content?.toString().localeCompare(b.content?.toString()),
      },
      render: (_: any, record: { key: React.Key } | any) => {
        lastDot = record.content?.lastIndexOf(".");
        ext = record?.content?.substring(lastDot + 1);
        const imgName = record.code + "-image." + ext;
        return (
          <div>
            {record?.content && (
              <div>
                <div
                  className=" manage-button cursor"
                  style={{ backgroundColor: "transparent", padding: "0" }}
                  onClick={() => {
                    setIsisImagePreviewEnable(!isImagePreviewEnable);
                    setImagePreviewInfo(record?.content);
                  }}
                >
                  {imgName}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  let metaData_Values: Fields = {};
  Object.values(location?.state?.MetaData).forEach((key: any) => {
    if (key.categoryCode === referenceCategory) {
      metaData_Values = key.metadata;
    }
  });
  let tableColumn: Array<string> = [];
  const metadataLength = Object.keys(metaData_Values).length;
  var i: number = 1;

  switch (metadataLength) {
    case 0:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        code: e.code,
        description: e.description,
        content: e.content,
        id: e.id,
      }));
      break;
    case 1:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
      }));
      break;
    case 2:
      break;
    case 3:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
      }));
      break;
    case 4:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
      }));
      break;
    case 5:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
        [e.field5]: e.value5,
      }));
      break;
    case 6:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
        [e.field5]: e.value5,
        [e.field6]: e.value6,
      }));
      break;
    case 7:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
        [e.field5]: e.value5,
        [e.field6]: e.value6,
        [e.field7]: e.value7,
      }));
      break;
    case 8:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
        [e.field5]: e.value5,
        [e.field6]: e.value6,
        [e.field7]: e.value7,
        [e.field8]: e.value8,
      }));
      break;
    case 9:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        id: e.id,
        code: e.code,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
        [e.field5]: e.value5,
        [e.field6]: e.value6,
        [e.field7]: e.value7,
        [e.field8]: e.value8,
        [e.field9]: e.value9,
      }));
      break;
    case 10:
      result = reference_DataArray?.map((e: ReferenceData, idx: number) => ({
        code: e.code,
        id: e.id,
        description: e.description,
        content: e.content,
        [e.field1]: e.value1,
        [e.field2]: e.value2,
        [e.field3]: e.value3,
        [e.field4]: e.value4,
        [e.field5]: e.value5,
        [e.field6]: e.value6,
        [e.field7]: e.value7,
        [e.field8]: e.value8,
        [e.field9]: e.value9,
        [e.field10]: e.value10,
      }));
      break;
    default:
      break;
  }

  for (i = 0; i < metadataLength; i++) {
    const title = metaData_Values?.["field" + (i + 1)].fieldLabel;
    const custVal: any = {
      title: title,
      dataIndex: title,
      key: title,
      checked: true,
    };

    Header.push(custVal);
  }

  const handle_BacktoCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.history.back();
  };

  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };

  const closeMessage = () => {
    setApiMessage(false);
  };

  const toggle_search = (e: any) => {
    e.preventDefault();
    setToggleSearch(!toggleSearch);
  };
  const [toPrint, setPrint] = useState(false);

  const handlePrint = (data: any) => {
    setToggleSearch(false);
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

  const editUser = (e: any) => {
    let ertu = e.id;
    const editRecord = reference_DataArray?.filter((e: ReferenceData) => {
      if (e.id.includes(ertu)) {
        return e;
      }
      return false;
    });
    history.push({
      pathname: "/dashboard/reference-data/edit-code",
      state: {
        value: editRecord[0],
        MetaData: location?.state?.MetaData,
      },
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
        dispatch(deleteReferenceData(recordId));
      } catch (err) {}
    },
    [dispatch]
  );

  const checkboxCancel = () => {
    setshowPopUp(!showPopUp);
  };
  const checkboxPdfCancel = () => {
    setshowPdfModal(!showPdfModal);
  };
  const checkboxPrintCancel = () => {
    setshowPrintModal(!showPrintModal);
  };

  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowPopUp(!showPopUp);
    ExcelGeneration(result, filteredItems, "ReferenceData");
  };

  const checkboxPdfSubmit = (filteredItems: any, orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, result);
    PdfGeneration(data, "ReferenceData");
  };
  const checkboxPrintSubmit = (filteredItems: any, orginalList: any) => {
    setshowPrintModal(!showPrintModal);
    handlePrint(filteredItems);
  };

  if (searchReferenceCode && searchCategory !== "Select Field") {
    if (searchCategory) {
      result = result.filter((e: any | ReferenceData) => {
        if (
          e[searchCategory]
            ?.toString()
            .toUpperCase()
            .includes(searchReferenceCode.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  return (
    <div className="reference_container p-3">
      <div className="primary_heading">Reference Data Setup</div>

      <div className="reference-view d-flex">
        <div className="options-view">
          <p style={{ marginTop: "6px" }}>Category</p>
        </div>
        <div className="options-view">
          <CustomInput
            className="set-switch border-0 referenceData-readOnly"
            value={location?.state?.category}
            readOnly={true}
          />
        </div>
        <div className="options-view " style={{ marginRight: "auto" }}>
          <CustomButton
            component={"payrollEnquiry"}
            className="viewBack-buttonNew"
            color={"secondary"}
            id="backReference"
            onClick={handle_BacktoCategory}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} />
          </CustomButton>
          <CustomTooltip target="backReference">Back</CustomTooltip>
        </div>

        <div className="d-flex">
          <div
            id="PDF"
            className={
              dataArray && dataArray?.length > 0
                ? "common-icons me-1 cursor"
                : "common-icon-disabled cursor me-1"
            }
            onClick={() => setshowPdfModal(true)}
          >
            <AiFillFilePdf></AiFillFilePdf>
            <CustomTooltip target="PDF">PDF</CustomTooltip>
          </div>
          <div
            aria-disabled="true"
            id="Excel"
            className={
              dataArray && dataArray?.length > 0
                ? "common-icons me-1 cursor"
                : "common-icon-disabled cursor me-1"
            }
            onClick={() => {
              setshowPopUp(true);
            }}
          >
            <AiFillFileExcel></AiFillFileExcel>

            <CustomTooltip target="Excel">Excel</CustomTooltip>
          </div>
          <div
            id="Print"
            className={
              dataArray && dataArray?.length > 0
                ? "common-icons me-1 cursor"
                : "common-icon-disabled cursor me-1"
            }
            onClick={() => setshowPrintModal(true)}
          >
            <AiOutlinePrinter></AiOutlinePrinter>
            <CustomTooltip target="Print">Print</CustomTooltip>
          </div>
          <div
            id="Search"
            className={
              dataArray && dataArray?.length > 0
                ? `common-icons me-1 cursor ${toggleSearch && "bottom-arrow"}`
                : "common-icon-disabled cursor me-1"
            }
            onClick={toggle_search}
          >
            <FiSearch></FiSearch>
            <CustomTooltip target="Search">Search</CustomTooltip>
          </div>
        </div>
        <div className="createCode-btn">
          <Link
            to={{
              pathname: "/dashboard/reference-data/create-new-code",
              state: {
                value: location?.state?.category,
                MetaData: location?.state?.MetaData,
              },
            }}
          >
            <CustomButton
              testid="createCode"
              component={"payrollEnquiry"}
              color="danger Reference-DefaultButton"
              className="btn2 me-0"
            >
              <GoPlus /> Create New Code
            </CustomButton>
          </Link>
        </div>
        <div></div>
      </div>

      {toggleSearch ? (
        <>
          <div
            className="d-flex user-search mt-3 p-3 cursor"
            style={{ width: "auto" }}
          >
            <select
              className=" form-select user-search-drop ms-2 cursor"
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={"Select Field"}
            >
              <option selected hidden className="cursor">
                Select Field
              </option>
              <option value="code" className="cursor">
                Code
              </option>
              <option value="description" className="cursor">
                Description
              </option>
              {Object.values(metaData_Values).map((e: any) => {
                return (
                  <option value={e.fieldLabel} className="cursor">
                    {e.fieldLabel}
                  </option>
                );
              })}
            </select>
            <Input
              type="text"
              className="ms-1 user-search-input"
              onChange={(ev: any) =>
                setsearchReferenceCode(ev.currentTarget.value)
              }
            />
            <div className="ms-1">
              <Button color="danger kyc-FilterSearchButton">Search</Button>
            </div>
            <div>
              <Button
                className="text-white  border-0 ms-1"
                onClick={() => window.location.reload()}
              >
                <FaReply />
              </Button>
            </div>
          </div>
        </>
      ) : null}
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
      {apiMessage && (
        <div>
          <CustomResponseMessage
            apiStatus={true}
            closeMessage={closeMessage}
            message={"Code Updated Successfully"}
          />
        </div>
      )}
      <div className="setting7">
        <div className="View" style={{ width: "100%" }}>
          <CustomLoader isLoading={isLoading} size={50} />
          {isLoading ? null : (
            <div className="" ref={componentRef}>
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
                    {"Reference Data"}
                  </h3>
                </>
              )}
              <CustomTable
                editUser={editUser}
                deleteUser={handleDelete}
                TableData={columns.length > 0 ? columns : Header}
                CustomTableHeader={result}
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

          <CustomDNDPopup
            onSubmit={checkboxSubmit}
            onCancel={checkboxCancel}
            items={Header}
            isOpen={showPopUp}
            buttonText={"Export Excel"}
          />
          <CustomDNDPopup
            onSubmit={checkboxPdfSubmit}
            onCancel={checkboxPdfCancel}
            items={Header}
            isOpen={showPdfModal}
            buttonText={"Export PDF"}
          />
          <CustomDNDPopup
            onSubmit={checkboxPrintSubmit}
            onCancel={checkboxPrintCancel}
            items={Header}
            isOpen={showPrintModal}
            buttonText={"Preview it and print"}
          />

          <DeleteConfirmaionPopUp
            showModal={showModal}
            closeDeleteConfirmation={closeDeleteConfimationGroup}
            selectedFestivalInfo={selectedRecordInfo}
            deleteTheSelectedRecord={deleteTheSelectedRecord}
          ></DeleteConfirmaionPopUp>
          <ImagePreview
            showModal={isImagePreviewEnable}
            imageInfo={imagePreviewInfo}
            closeModal={exitImagePreview}
          ></ImagePreview>
        </div>
      </div>
    </div>
  );
}

export default View;
