/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useRef, useState } from "react";
import { Button, Input } from "reactstrap";
import "./FestiveSummary.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiOutlinePrinter,
} from "react-icons/ai";
import { FiFilter, FiSearch } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import {
  listOfFestivelItem,
  removeDeleteParticularSeason,
} from "../../redux/action/FestivePackageActions";
import DeleteConfirmationPopUp from "../DeletePopUp/DeleteConfirmationPopUp";
import { PdfGeneration } from "../../Utills/PdfGeneration";
import { ExcelGeneration } from "../../Utills/ExcelGeneration";
import CustomHeader from "../CustomTable/CustomTable";
import { useReactToPrint } from "react-to-print";
import { FestiveData } from "../../models/AddFestiveModal";
import { FaReply } from "react-icons/fa";
import { FestiveSummaryInfo } from "../../models/FestiveSummaryModel";

let pageSize = 7;
const FestiveSummary = (props: any) => {
  const dispatch = useDispatch();

  const [isFilterShows, setisFilterShows] = useState(false);
  const [selectedFestivalInfo, setSelectedFestivalInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [festiveSeasonSearch, setFestiveSeasonSearch] = useState("");

  const [toPrint, setPrint] = useState(false);
  const [seasonCode, setSeaonCode] = useState("");
  const [seasonStartDate, SetSeasonStartDate] = useState("");
  const [seasonEndDate, SetSeasonEndDate] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState<string>("");

  const ListOfFestivalDetails = useSelector(
    (state: RootStateOrAny) => state.FestivePackageReducer.listOfFestivels
  );

  const getListOfFestivels = useCallback(
    async (seasonCode, seasonStartDate, seasonEndDate) => {
      try {
        dispatch(
          listOfFestivelItem(seasonCode, seasonStartDate, seasonEndDate)
        );
      } catch (err) {}
    },
    [dispatch]
  );

  const deletingTheSelectedRecord = useCallback(
    async (festivalId: string) => {
      try {
        dispatch(removeDeleteParticularSeason(festivalId));
      } catch (err) {}
    },
    [dispatch]
  );

  function itemRender(_current: any, type: any, originalElement: any) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  const closeDeleteConfimation = () => {
    setShowModal(!showModal);
  };
  const selectedFestivalDetails = (festivalInfo: any) => {
    setShowModal(!showModal);
    setSelectedFestivalInfo(festivalInfo);
  };
  const deleteTheSelectedRecord = (FestivalDetails: any) => {
    deletingTheSelectedRecord(FestivalDetails?.id).then(() => {
      getListOfFestivels(seasonCode, seasonStartDate, seasonEndDate);
      setShowModal(!showModal);
    });
  };
  const editPackage = (e: any) => {
    props.history.push({
      pathname: "/dashboard/Festive-Packet-Summary/Edit-Festive-Package",
      state: e,
    });
  };
  const deletePackage = (e: any) => {
    selectedFestivalDetails(e);
  };

  const handlePrint = (_e: any) => {
    setPrint(!toPrint);
  };
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const Header = [
    {
      title: "UID",
      dataIndex: "id",
      key: "uid",
      sorter: {
        compare: (a: any, b: any) => a.id.localeCompare(b.id),
      },
    },
    {
      title: "Festive Packet Season",
      dataIndex: "seasonDescription",
      key: "season",
      sorter: {
        compare: (a: any, b: any) =>
          a.seasonDescription.localeCompare(b.seasonDescription),
      },
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "StartDate",
      sorter: {
        compare: (a: any, b: any) => a.startDate.localeCompare(b.startDate),
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "EndDate",
      sorter: {
        compare: (a: any, b: any) => a.endDate.localeCompare(b.endDate),
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "StartTime",
      sorter: {
        compare: (a: any, b: any) => a.startTime.localeCompare(b.startTime),
      },
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "EndTime",
      sorter: {
        compare: (a: any, b: any) => a.endTime.localeCompare(b.endTime),
      },
    },
  ];

  let festiveData = ListOfFestivalDetails?.data;
  if (festiveSeasonSearch) {
    festiveData = festiveData.filter((e: any) => {
      if (
        e.seasonDescription
          .toUpperCase()
          .includes(festiveSeasonSearch.toUpperCase())
      ) {
        return e;
      }
    });
  }
  const HandleFileds = (_festiveData: FestiveData[]) => {
    _festiveData?.length > 0 &&
      _festiveData?.map((e: FestiveData) => {
        let finalJson: FestiveData = e;
        delete finalJson.bannerContentId;
        delete finalJson.entityId;
        delete finalJson.failContentId;
        delete finalJson.maxAmount;
        delete finalJson.minAmount;
        delete finalJson.statusCode;
        delete finalJson.seasonCode;
        delete finalJson.successContentId;
        delete finalJson.summaryContentId;
        delete finalJson.failMessage;
        delete finalJson.successMessage;
        delete finalJson.packageDescription;
      });
    return _festiveData;
  };

  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      festiveData = festiveData?.filter((e: any | FestiveSummaryInfo) => {
        return (
          e.id.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.seasonDescription
            .toUpperCase()
            .includes(searchUserData.toUpperCase()) ||
          e.startDate.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.endDate.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.startTime.toUpperCase().includes(searchUserData.toUpperCase()) ||
          e.endTime.toUpperCase().includes(searchUserData.toUpperCase())
        );
      });
    } else {
      festiveData = festiveData?.filter((e: any | FestiveSummaryInfo) => {
        if (
          e[searchCategory]
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      });
    }
  }

  const selectedType = (selectedcategory: string) => {
    switch (selectedcategory) {
      case "id":
      case "seasonDescription":
        return "text";
      case "startDate":
      case "endDate":
        return "date";
      case "startTime":
      case "endTime":
        return "time";
      default:
        return "text";
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="primary_heading">Festive Package Summary</div>
        <div className="d-flex">
          <div
            aria-disabled="true"
            className={
              ListOfFestivalDetails && ListOfFestivalDetails?.data?.length > 0
                ? "common-icons me-1 cursor"
                : "common-icons-disabled me-1 cursor"
            }
            onClick={() =>
              ExcelGeneration(festiveData, [""], "FestiveSummary.")
            }
          >
            <AiFillFileExcel></AiFillFileExcel>
          </div>
          <div
            className={
              ListOfFestivalDetails && ListOfFestivalDetails?.data?.length > 0
                ? "common-icons me-1 cursor"
                : "common-icons-disabled me-1 cursor"
            }
            onClick={() =>
              PdfGeneration(HandleFileds(festiveData), "FestiveSummary")
            }
          >
            <AiFillFilePdf></AiFillFilePdf>
          </div>
          <div
            className={
              ListOfFestivalDetails && ListOfFestivalDetails?.data?.length > 0
                ? "common-icons me-1 cursor"
                : "common-icons-disabled me-1 cursor"
            }
            onClick={handlePrint}
          >
            <AiOutlinePrinter></AiOutlinePrinter>
          </div>
          <div
            className="common-icons me-3 cursor"
            onClick={() => setisFilterShows(!isFilterShows)}
          >
            <FiSearch></FiSearch>
          </div>
          <div
            className="common-icons me-3 cursor"
            onClick={() => setisFilterShows(!isFilterShows)}
          >
            <FiFilter></FiFilter>
          </div>
          <div>
            <Button
              className="add-btn cursor"
              color="danger"
              onClick={() =>
                props.history.push(
                  "/dashboard/Festive-Packet-Summary/Add-Festive-Package"
                )
              }
            >
              {" "}
              + Add New{" "}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-3 search-component d-flex cursor">
        {isFilterShows ? (
          <>
            {" "}
            <select
              className=" form-select user-search-drop ms-2 cursor"
              onChange={(e) => setSearchCategory(e.target.value)}
              defaultValue={"Select Field"}
            >
              <option selected className="cursor">
                Select Field
              </option>

              <option value="id" className="cursor">
                UID
              </option>
              <option value="seasonDescription" className="cursor">
                Festive Packet Season
              </option>
              <option value="startDate" className="cursor">
                Start Date
              </option>
              <option value="endDate" className="cursor">
                End Date
              </option>
              <option value="startTime" className="cursor">
                Start Time
              </option>
              <option value="endTime" className="cursor">
                End Time
              </option>
              <option value="any" className="cursor">
                Any
              </option>
            </select>
            <Input
              type={selectedType(searchCategory)}
              className="ms-1 user-search-input"
              onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
            />
            <div className="ms-1">
              <Button color="danger">Search</Button>
            </div>
            <div>
              <Button className="text-white  border-0 ms-1">
                <FaReply />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex fillter-wrapper cursor">
              <div className="fillter-select cursor">
                <Input
                  type="text"
                  onChange={(e) => setSeaonCode(e.target.value)}
                ></Input>
              </div>
              <div className="fillter-date cursor">
                <Input
                  type="date"
                  onChange={(e) => SetSeasonStartDate(e.target.value)}
                ></Input>
              </div>
              <div className="fillter-time cursor">
                <Input
                  type="date"
                  onChange={(e) => SetSeasonEndDate(e.target.value)}
                ></Input>
              </div>
              <div className="d-flex fillter-icon cursor">
                <div
                  className="fillter-icon-fillter cursor"
                  onClick={() =>
                    getListOfFestivels(
                      seasonCode,
                      seasonStartDate,
                      seasonEndDate
                    )
                  }
                >
                  <FiFilter></FiFilter>
                </div>
                <div className="fillter-icon-arrow cursor">
                  <TiArrowBackOutline></TiArrowBackOutline>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
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
          to confirm and Print !
        </span>
      )}

      <div ref={componentRef}>
        <div className="mt-3">
          {festiveData && (
            <CustomHeader
              deleteUser={deletePackage}
              editUser={editPackage}
              TableData={Header}
              CustomTableHeader={festiveData}
            />
          )}
        </div>
      </div>
      <DeleteConfirmationPopUp
        showModal={showModal}
        closeDeleteConfirmation={closeDeleteConfimation}
        selectedFestivalInfo={selectedFestivalInfo}
        deleteTheSelectedRecord={deleteTheSelectedRecord}
      ></DeleteConfirmationPopUp>
    </div>
  );
};

export default FestiveSummary;
