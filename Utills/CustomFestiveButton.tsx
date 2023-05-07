import React, { useState } from "react";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
} from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { FiFilter, FiSearch } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import { Tooltip } from "reactstrap";
import CustomButton from "../Components/UI/CustomButton";
import { Fields, DataArray } from "../models/ReferenceDataModel";
import "./CustomFestiveButton.scss";
import { ExcelGeneration } from "./ExcelGeneration";
import { PdfGeneration } from "./PdfGeneration";

const CustomFestiveButton = (props: {
  headings: Array<string>;
  datas: Fields;
  custom_values: Fields;
  MetaData: DataArray[];
}) => {
  const columns = props.headings;
  let dataArray: any = props.datas;
  const [tooltipOpened, setTooltipOpened] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const [tooltipOpenpdf, setTooltipOpenpdf] = useState(false);
  const [tooltipOpenprint, setTooltipOpenprint] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const toggleTooltip = () => setTooltipOpened(!tooltipOpened);
  const toggleToolTip = () => setTooltipOpen(!tooltipOpen);

  const toggleTooltipprint = () => setTooltipOpenprint(!tooltipOpenprint);

  const toggle_search = (e: any) => {
    e.preventDefault();
    setToggleSearch(!toggleSearch);
    setToggleFilter(false);
  };
  const toggle_filter = (e: any) => {
    e.preventDefault();
    setToggleFilter(!toggleFilter);
    setToggleSearch(false);
  };
  const handle_BacktoCategory = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.location.reload();
  };
  return (
    <div className="container row">
      <div className="icons col-4">
        <CustomButton
          id="exportExcel"
          className="btn2"
          onClick={() => ExcelGeneration(dataArray, columns, "festivePackage")}
        >
          <AiFillFileExcel style={{ marginRight: "3px" }} />
          <Tooltip
            placement="top"
            isOpen={tooltipOpened}
            target="exportExcel"
            toggle={toggleTooltip}
          >
            Export As Excel
          </Tooltip>
        </CustomButton>
        <CustomButton
          id="exportPdf"
          className="btn2"
          onClick={() => PdfGeneration(dataArray, "festivePackage")}
        >
          <AiFillFilePdf style={{ marginRight: "3px" }} />
          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target="exportPdf"
            toggle={toggleToolTip}
          >
            Export As Pdf
          </Tooltip>
        </CustomButton>
        <CustomButton testid="viewCategory" id="print" className="btn2">
          <AiOutlinePrinter style={{ marginRight: "3px" }} />
        </CustomButton>
        <Tooltip
          placement="bottom"
          isOpen={tooltipOpenprint}
          target="print"
          toggle={toggleTooltipprint}
        >
          Print
        </Tooltip>
        <CustomButton
          component={"payrollEnquiry"}
          className="Searchbtn btn-8"
          color={"secondary"}
          onClick={toggle_search}
        >
          <FiSearch />
        </CustomButton>
        <CustomButton
          component={"payrollEnquiry"}
          color={"secondary"}
          className="Filterbtn btn-8"
          onClick={toggle_filter}
        >
          <FiFilter />
        </CustomButton>
        <CustomButton
          component={"payrollEnquiry"}
          color={"secondary"}
          className="btn2"
          onClick={handle_BacktoCategory}
        >
          <TiArrowBackOutline style={{ margin: "auto 5px" }} />
        </CustomButton>
      </div>
      {toggleSearch ? (
        <>
          <div className="searchBar" />
          <div className="referenceSearchContainer">
            <div className="reference-search">
              <label>Search</label>
              <input
                className="search"
                type="text"
                onChange={(ev) => ev.currentTarget.value}
              ></input>
              <CustomButton
                testid="viewCategory"
                className="btttn2"
                color="danger"
              >
                Search
              </CustomButton>
            </div>
          </div>
        </>
      ) : null}
      {toggleFilter ? (
        <>
          <div className="searchBar" />
          <div className="referenceSearchContainer">
            <div className="reference-search">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option selected value="select season">
                  select season
                </option>
                <option value="4">4</option>
              </select>
              <input type="date"></input>
              <input type="time"></input>
              <CustomButton
                testid="viewCategory"
                className="btn2"
                color="danger"
              >
                <FiFilter />
              </CustomButton>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CustomFestiveButton;
