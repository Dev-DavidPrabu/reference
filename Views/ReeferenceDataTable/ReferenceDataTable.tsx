import React, { useState, useRef, useCallback, useEffect } from "react";
import { Table } from "reactstrap";
import { useDispatch } from "react-redux";
import CustomButton from "../../Components/UI/CustomButton";
import { deleteReferenceData } from "../../redux/action/ReferenceDataAction";
import { DataArray, Fields } from "../../models/ReferenceDataModel";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import { useReactToPrint } from "react-to-print";
import { lastRoute } from "../../Components/Breadcrumbs/Breadcrumbs";
import DeleteConfirmaionPopUp from "../../Components/DeletePopUp/DeleteConfirmationPopUp";

let pageSize = 7;

const ReferenceDataTable = (props: {
  headings: Array<string>;
  datas: Fields;
  custom_values: Fields;
  MetaData: DataArray[];
  toPrint: boolean;
  setPrint: any;
}) => {
  const dispatch = useDispatch();
  const columns = props.headings;
  let dataArray: any = props.datas;
  const referenceDatas = props.custom_values;
  const [toPrint, setPrint] = useState(props?.toPrint);
  const [currentPage, setCurrentPage] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(7);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(Object);
  const date = new Date().toLocaleString();
  const handleChangeForPagination = (value: number) => {
    setCurrentPage(value);
    setMinIndex((value - 1) * pageSize);
    setMaxIndex(value * pageSize);
  };

  const componentRef = useRef<any>();
  const handlePrint = () => {
    setPrint(true);
  };

  useEffect(() => {
    if (props.toPrint) {
      setPrint(true);
    }
  }, [props.toPrint, toPrint]);

  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });

  function itemRender(current: any, type: any, originalElement: any) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  const closeDeleteConfimationGroup = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (sno: number) => {
    setShowModal(!showModal);
    const idx = referenceDatas?.[sno]?.id;
    setSelectedRecordInfo(idx);
  };
  const deleteTheSelectedRecord = (recordInfo: any) => {
    deletingTheSelectedRecord(recordInfo).then(() => {
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
  const cancelPrint = () => {
    setPrint(!toPrint);
    props.setPrint(!toPrint);
  };

  return (
    <div>
      <div>
        {toPrint ? (
          <>
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
            <div ref={componentRef} className="referenceTable-div">
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
                {lastRoute}
              </h3>
              <Table>
                <thead
                  style={{
                    backgroundColor: "#36393a",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  <tr>
                    {columns.map((key: string) => {
                      return key != "Manage" && <th>{key}</th>;
                    })}
                  </tr>
                </thead>
                <tbody
                  style={{ backgroundColor: "#f3f3f3", textAlign: "left" }}
                >
                  {dataArray?.map((row: Fields) => {
                    return (
                      <tr>
                        {Object.values(row)?.map((ent: string) => {
                          return ent != "Manage" && <td>{ent}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <p style={{ color: "red" }}>Date : {date}</p>
            </div>
          </>
        ) : (
          <div className="referenceTable-div">
            <Table>
              <thead
                style={{
                  backgroundColor: "#36393a",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <tr>
                  {columns.map((key: string) => {
                    return <th>{key}</th>;
                  })}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#f3f3f3", textAlign: "left" }}>
                {dataArray?.map((row: Fields, index: number) => {
                  return (
                    index >= minIndex &&
                    index < maxIndex && (
                      <tr>
                        {Object.values(row)?.map((ent: string) => {
                          return (
                            <td>
                              {ent === "Manage" ? (
                                <>
                                  <Link
                                    to={{
                                      pathname:
                                        "/dashboard/reference-data/edit-code",
                                      state: {
                                        value: referenceDatas?.[index],
                                        MetaData: props.MetaData,
                                      },
                                    }}
                                  >
                                    <CustomButton
                                      color={"primary"}
                                      id={row.sno}
                                      className="manage-button"
                                    >
                                      <FaRegEdit />
                                    </CustomButton>
                                  </Link>
                                  <CustomButton
                                    color={"danger"}
                                    id={row.sno}
                                    className="manage-button"
                                    onClick={(e) => {
                                      const sno = index;
                                      handleDelete(sno);
                                    }}
                                  >
                                    <AiOutlineDelete />
                                  </CustomButton>
                                </>
                              ) : (
                                ent
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    )
                  );
                })}
              </tbody>
            </Table>
            <div style={{ display: "inline" }}>
              Total {dataArray?.length} Records{" "}
            </div>

            <Pagination
              style={{ float: "right", display: "inline" }}
              current={currentPage}
              pageSize={pageSize}
              onChange={handleChangeForPagination}
              total={dataArray?.length}
              showSizeChanger={false}
              itemRender={itemRender}
            />
          </div>
        )}
      </div>
      <DeleteConfirmaionPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimationGroup}
        selectedFestivalInfo={selectedRecordInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmaionPopUp>
    </div>
  );
};
export default ReferenceDataTable;
