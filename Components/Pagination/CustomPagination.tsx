import React, { useEffect, useState } from "react";
import "./CustomPagination.scss";
const CustomPagination = (props: any) => {
  const {
    DataLength,
    PageNumber,
    DisplayItem,
    selectedPage,
    prevFunc,
    nextFunc,
    prevBatch,
    nextBatch,
    defaultIndex,
    defaultBatch,
    noOfBatches,
    RecordsToBeFetched,
    serverPagination,
    totalRecords,
    noOfRows,
    SearchFilterGo
  } = props;
  let updatedIndex = defaultIndex + 1;
  const [contact, setContact] = useState({
    page: updatedIndex,
  });
  useEffect(() => {
    setContact({ ...contact, ["page"]: updatedIndex });
  }, [defaultIndex]);
  
  useEffect(()=>{
    if(noOfRows){
      DisplayItem(50)
    }
  },[])
  useEffect(()=>{
    if(SearchFilterGo){
      setContact({ ...contact, ["page"]: 1 });
      selectedPage(1);
    }
  },[SearchFilterGo])
  
  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
    if (e.target.value <= props.PageNumber) {
      selectedPage(parseInt(e.target.value));
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-between mt-3 mb-5">
      <div className="d-flex">
        <div className="align-items-center d-flex font-style-pagination">
          Total {serverPagination ? totalRecords : DataLength} Records
        </div>
        &nbsp;
        <div className="align-items-center d-flex">|</div>&nbsp;
        {serverPagination && (
          <>
            {" "}
            <div className="d-flex align-items-center font-style-pagination">
              {" "}
              Records to be fetched&nbsp;
              <div>
                <select
                  className="pagination-select d-flex align-items-center font-style-pagination"
                  onChange={(e) => RecordsToBeFetched(e.target.value)}
                >
                  <option>7</option>
                  <option>50</option>
                  <option>100</option>
                  <option>150</option>
                  <option>300</option>
                  <option>500</option>
                </select>
              </div>
            </div>
            &nbsp;
            <div className="align-items-center d-flex">|</div>&nbsp;
          </>
        )}
        <div className="d-flex align-items-center font-style-pagination">
          {" "}
          Display per page&nbsp;
          <div>
            <select
              className="pagination-select d-flex align-items-center font-style-pagination"
              onChange={(e) => DisplayItem(e.target.value)}
            >
              <option>7</option>
              <option>12</option>
              <option>20</option>
              {!noOfRows && <option>50</option>}
              {noOfRows && <option selected>50</option>}
              <option>100</option>
            </select>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <div className="d-flex flex-row align-items-center font-style-pagination">
          <input
            type="number"
            name="page"
            onChange={handleChange}
            value={contact.page}
            className={
              "pagination-input border-1 p-2 align-items-center flex-row justify-content-center d-flex font-style-pagination"
            }
          />
          &nbsp;of {PageNumber}
        </div>{" "}
        &nbsp;
        {serverPagination && (
          <>
            {" "}
            <div
              onClick={prevBatch}
              className={
                defaultBatch == 1
                  ? "disable-pagination font-style-pagination"
                  : "pagination-navigator font-style-pagination"
              }
            >
              {" "}
              {"< Prev-batch"}{" "}
            </div>
            &nbsp;
          </>
        )}
        <div
          onClick={prevFunc}
          className={`${ props?.prevNextStatus ? "pagination-navigator-disable" : "pagination-navigator"} font-style-pagination`}
        >
          {" "}
          {"< Prev"}{" "}
        </div>
        &nbsp;
        <div className="align-items-center d-flex">|</div>&nbsp;
        <div
          onClick={nextFunc}
          className={`${ props?.prevNextStatus ? "pagination-navigator-disable" : "pagination-navigator"} font-style-pagination`}
        >
          {" "}
          {"Next >"}{" "}
        </div>
        &nbsp;
        {serverPagination && (
          <>
            {" "}
            <div
              onClick={nextBatch}
              className={
                noOfBatches < defaultBatch + 1
                  ? "disable-pagination font-style-pagination"
                  : "pagination-navigator font-style-pagination"
              }
            >
              {" "}
              {"Next-batch>"}{" "}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomPagination;
