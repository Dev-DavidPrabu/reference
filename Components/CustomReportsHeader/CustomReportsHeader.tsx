import { AiFillFileExcel, AiFillFilePdf } from "react-icons/ai";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { FaFilter } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import "./CustomReportsHeader.scss";

function CommonHeaderSummaryReports(props: any) {
  const HeaderContent = () => (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="primary_heading">{props.RightContent}</div>
      <div className="d-flex">
        {props.TableData && props.TableData?.length > 0 ? (
          <div
            id="Refresh"
            aria-disabled="true"
            className={
              props.TableData && props.TableData?.length > 0
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={props.toggleRefresh}
          >
            <MdRefresh></MdRefresh>
            <CustomTooltip target="Refresh">Refresh</CustomTooltip>
          </div>
        ) : null}
        {props.RightContent !== "Onboarding Detail Report" && (
        <div>
          <a
            className={
              props.TableData &&
              props.TableData?.length > 0 &&
              props.options === false 
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={props.downloadPdf}
          >
            <div id="PDF">
              <AiFillFilePdf></AiFillFilePdf>
              <CustomTooltip target="PDF">PDF</CustomTooltip>
            </div>

          </a>
        </div>
       )}
        <div>
          <a
            className={
              props.TableData &&
              props.TableData?.length > 0 &&
              props.options === false
                ? "common-header-icons me-1 cursor"
                : "common-header-icons-disabled cursor me-1"
            }
            onClick={props.downloadExcel}
          >
            <div id="EXCEL">
              <AiFillFileExcel></AiFillFileExcel>
              <CustomTooltip target="EXCEL">EXCEl</CustomTooltip>
            </div>
          </a>
        </div>

        <div
          id="Filter"
          className={
            props.filterEnabled
              ? "bottom-arrow common-header-icons me-1 cursor"
              : "common-header-icons me-1 cursor"
          }
          onClick={props.toggleFilter}
        >
          <FaFilter></FaFilter>
          <CustomTooltip target="Filter">Filter</CustomTooltip>
        </div>

        <div></div>
      </div>
    </div>
  );
  const AuditHeaderContent = () => (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="primary_heading">{props.RightContent}</div>
    </div>
  );
  return (
    <div className="mb-2">
      {props.Audit ? AuditHeaderContent() : HeaderContent()}
    </div>
  );
}

export default CommonHeaderSummaryReports;
