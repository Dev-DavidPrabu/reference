import React, { useState } from "react";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
  AiOutlineProfile,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsFilterLeft } from "react-icons/bs";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import "./CommonHeaderSummary.scss";
import { GoPlus } from "react-icons/go";
import CustomDNDPopup from "../CustomComponents/CustomDNDPopup/CustomDNDPopup";
import { filterTableData } from "../../Constants/HelperFunction";
import { Button } from "reactstrap";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { FaFilter } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { TiArrowBackOutline } from "react-icons/ti";
function CommonHeaderSummary(props: any) {
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPdfModal, setshowPdfModal] = useState(false);
  const [showPrintModal, setshowPrintModal] = useState(false);
  const [showList, setShowList] = useState(false);
  const checkboxCancel = () => {
    setshowPopUp(!showPopUp);
  };
  const checkboxPdfCancel = () => {
    setshowPdfModal(!showPdfModal);
  };
  const checkboxPrintCancel = () => {
    setshowPrintModal(!showPrintModal);
  };
  const checkboxSubmit = (filteredItems: any, _orginalList: any) => {
    setshowPopUp(!showPopUp);
    ExcelGeneration(props.TableData, filteredItems, props.SummaryFileName);
  };
  const checkboxListSubmit = (filteredItems: any, orginalList: any) => {
    setShowList(!showList);
    props.ListData(filteredItems, orginalList);
  };
  const checkboxListCancel = () => {
    setShowList(!showList);
  };
  const checkboxPdfSubmit = (filteredItems: any, _orginalList: any) => {
    setshowPdfModal(!showPdfModal);
    let data = filterTableData(filteredItems, props.TableData);
    PdfGeneration(data, props.SummaryFileName);
  };
  const checkboxPrintSubmit = (filteredItems: any, orginalList: any) => {
    setshowPrintModal(!showPrintModal);
    props.Print(filteredItems, orginalList);
  };

  const HeaderContent = () => (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="primary_heading">{props.RightContent}</div>
      <div className="d-flex">
        {props.List &&
          (props.TableData && props.TableData?.length > 0 ? (
            <div
              id="List"
              aria-disabled="true"
              className={
                props.TableData
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={() => {
                setShowList(true);
              }}
            >
              <AiOutlineProfile></AiOutlineProfile>

              <CustomTooltip target="List">List </CustomTooltip>
            </div>
          ) : (
            <div
              id="nodata"
              aria-disabled="true"
              className={
                props.TableData
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={() => {
                setShowList(false);
              }}
            >
              <AiOutlineProfile></AiOutlineProfile>

              <CustomTooltip target="nodata">No Data </CustomTooltip>
            </div>
          ))}

        {props.Refresh &&
          (props.TableData && props.TableData?.length > 0 ? (
            <div
              id="Refresh"
              aria-disabled="true"
              className={
                props.TableData
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={props.refresh}
            >
              <MdRefresh></MdRefresh>
              <CustomTooltip target="Refresh">Refresh</CustomTooltip>
            </div>
          ) : (
            <div
              id="refreshnodata"
              aria-disabled="true"
              className={
                props.TableData
                  ? "common-header-icons me-1 cursor"
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={props.refresh}
            >
              <MdRefresh></MdRefresh>
              <CustomTooltip target="refreshnodata">No Data</CustomTooltip>
            </div>
          ))}
        {!props.dataExpiring &&
        props.TableData &&
        props.TableData?.length > 0 ? (
          <div
            id="PDF"
            className={
              props.TableData && props.TableData?.length > 0
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={() => setshowPdfModal(true)}
          >
            <AiFillFilePdf></AiFillFilePdf>
            <CustomTooltip target="PDF">PDF</CustomTooltip>
          </div>
        ) : null}
        {!props.dataExpiring &&
        props.TableData &&
        props.TableData?.length > 0 ? (
          <div
            aria-disabled="true"
            id="Excel"
            className={
              props.TableData && props.TableData?.length > 0
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={() => {
              setshowPopUp(true);
            }}
          >
            <AiFillFileExcel></AiFillFileExcel>
            <CustomTooltip target="Excel">Excel</CustomTooltip>
          </div>
        ) : null}
        {props.TableData && props.TableData?.length > 0 ? (
          <div
            id="Print"
            className={
              props.TableData && props.TableData?.length > 0
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={() => setshowPrintModal(true)}
          >
            <AiOutlinePrinter></AiOutlinePrinter>
            <CustomTooltip target="Print">Print</CustomTooltip>
          </div>
        ) : (
          <div
            id="printnodata"
            className={
              props.dataExpiring === true
                ? "none-display"
                : props.TableData
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={() => setshowPrintModal(false)}
          >
            <AiOutlinePrinter></AiOutlinePrinter>
            <CustomTooltip target="printnodata">No data</CustomTooltip>
          </div>
        )}

        {props.filterLeft && (
          <div
            className={
              props.TableData && props.TableData?.length > 0
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
          >
            <BsFilterLeft />
          </div>
        )}

        {
          !props.dataExpiring && props.TableData && props.TableData?.length > 0 && (
            // props.search === true ?
            <div
              id="Search"
              className={
                props.TableData && props.TableData?.length > 0
                  ? `common-header-icons me-1 cursor ${
                      props.search && "bottom-arrow"
                    }`
                  : "common-header-icons-disabled cursor me-1"
              }
              onClick={props.searchArea}
            >
              <FiSearch></FiSearch>
              <CustomTooltip target="Search">Search</CustomTooltip>
            </div>
          )

          // : props.search === true ? (
          //   <div
          //     id="searchnodata"
          //     className={
          //       props.TableData
          //         ? `common-header-icons me-1 cursor ${
          //             props.search && "bottom-arrow"
          //           }`
          //         : "common-header-icons-disabled cursor me-1"
          //     }
          //     onClick={props.searchArea}
          //   >
          //     <FiSearch></FiSearch>
          //     <CustomTooltip target="searchnodata">No Data</CustomTooltip>
          //   </div>
          // ) : null
        }
        {props.Showsearch && (
          <div
            id="Search"
            className={
              props.TableData && props.TableData?.length > 0
                ? `common-header-icons me-1 cursor ${
                    props.search && "bottom-arrow"
                  }`
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={props.searchArea}
          >
            <FiSearch></FiSearch>
            <CustomTooltip target="Search">Search</CustomTooltip>
          </div>
        )}

        {props.showExcel && (
          <div
            aria-disabled="true"
            id="Excel"
            className={
              props.TableData && props.TableData?.length > 0
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={() => {
              setshowPopUp(true);
            }}
          >
            <AiFillFileExcel></AiFillFileExcel>
            <CustomTooltip target="Excel">Excel</CustomTooltip>
          </div>
        )}

        {props.filter && (
          <div
            id="Filter"
            className={
              props.TableData
                ? `common-header-icons me-1 cursor ${
                    props.filterEnabled && "bottom-arrow"
                  }`
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={props.filterArea}
          >
            <FaFilter></FaFilter>
            <CustomTooltip target="Filter">Filter</CustomTooltip>
          </div>
        )}
        {props.filterRemit && (
          <div
            id="Filter"
            className={`common-header-icons me-1 cursor ${
              props.filterEnabled && "bottom-arrow"
            }`}
            onClick={props.filterArea}
          >
            <FaFilter></FaFilter>
            <CustomTooltip target="Filter">Filter</CustomTooltip>
          </div>
        )}

        <div>
          {props.addButton && (
            <Button
              type="button"
              className="add-btn btn2 fs-14 me-0 addhovers"
              color="danger"
              id="addUser"
              onClick={props.addOnClick}
              data-testid="add"
            >
              <GoPlus />
              {props.addText}
            </Button>
          )}
        </div>

        {props.Add && (
          <div>
            <Button
              className="remit-add-btn cursor text-white addhovers btn--sizer"
              color="#E30613"
              onClick={() => props.AddAction()}
            >
              + Add
            </Button>
          </div>
        )}

        {props.Back && (
          <div
            className="d-flex commonEdit-BackButton"
            onClick={() => props.BackAction()}
            style={{ marginTop: "5px" }}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
  return (
    <div className="mb-2">
      {HeaderContent()}
      <CustomDNDPopup
        onSubmit={checkboxListSubmit}
        onCancel={checkboxListCancel}
        items={props.SummaryColumn}
        isOpen={showList}
        buttonText={"Submit"}
      />
      <CustomDNDPopup
        onSubmit={checkboxSubmit}
        onCancel={checkboxCancel}
        items={props.SummaryColumn}
        isOpen={showPopUp}
        buttonText={"Export Excel"}
      />
      <CustomDNDPopup
        onSubmit={checkboxPdfSubmit}
        onCancel={checkboxPdfCancel}
        items={props.SummaryColumn}
        isOpen={showPdfModal}
        buttonText={"Export PDF"}
      />
      <CustomDNDPopup
        onSubmit={checkboxPrintSubmit}
        onCancel={checkboxPrintCancel}
        items={props.SummaryColumn}
        isOpen={showPrintModal}
        buttonText={"Preview it and print"}
      />
    </div>
  );
}

export default CommonHeaderSummary;
