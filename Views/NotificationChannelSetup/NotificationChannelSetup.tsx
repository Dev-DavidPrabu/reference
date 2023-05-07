import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Input, Row, Modal, ModalBody } from "reactstrap";
import { Form } from "antd";
import CustomInput from "../../Components/UI/CustomInput";
import CommonHeaderSummary from "../../Components/CommonHeaderSummary/CommonHeaderSummary";
import CustomHeader from "../../Components/CustomTable/CustomTable";
import CustomButton from "../../Components/UI/CustomButton";
import { getAllChannels } from "../../redux/action/NotificationChannelAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import "./NotificationChannelSetup.scss";
import { useReactToPrint } from "react-to-print";
import { FaReply } from "react-icons/fa";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import CustomLoader from "../../Components/Loader/CustomLoader";

function NotificationChannelSetup(props: any) {
  const dispatch = useDispatch();
  const [filterArea, setFilterArea] = useState(false);
  const [toPrint, setPrint] = useState(false);
  const [popUp, setPopup] = useState(false);
  const [viewContent, setViewContent] = useState("");
  const [columns, setcolumns] = useState([]);
  const [orginalColumns, setorginalColumns] = useState([]);
  const [searchField, setSearchField] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const [showTableModal, setTableModal] = useState(false);
  const [apiMessage, setApiMessage] = useState(props.location?.state || false);
  const [isLoading, setIsLoading] = useState(true);
  const toggleFiler = () => {
    setFilterArea(!filterArea);
    setSearchField(false);
    setPrint(false);
  };
  const fetchChannelData = useCallback(async () => {
    try {
      dispatch(getAllChannels());
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchChannelData();
  }, [fetchChannelData]);

  const NotificationData = useSelector(
    (state: RootStateOrAny) =>
      state.NotificationChannelReducer?.getAllChannelResponse
  );

  const toggle = () => {
    setPopup(!popUp);
  };

  useEffect(() => {
    if (NotificationData) {
      if (NotificationData.data) {
        setIsLoading(false);
      } else if (NotificationData.error) {
        setIsLoading(false);
        setApiMessage(NotificationData.message);
      }
    }
  }, [NotificationData]);
  function extractContent(s: any) {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }
  const handleContent = (e: any) => {
    setViewContent(e.content);
    setPopup(!popUp);
  };
  const [form] = Form.useForm();
  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const closeMessage = () => {
    setApiMessage(!apiMessage);
  };

  const notificationChannelHeader = [
    {
      title: "Notification ID",
      dataIndex: ["notificationMasterDTO", "notificationId"],
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationMasterDTO.notificationId.localeCompare(
            b.notificationMasterDTO.notificationId
          ),
      },
      render: (record: any) => {
        return <div>{record}</div>;
      },
    },
    {
      title: "Description",
      dataIndex: ["notificationMasterDTO", "description"],
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.notificationMasterDTO.description.localeCompare(
            b.notificationMasterDTO.description
          ),
      },
      render: (flag: any) => {
        return <div>{flag}</div>;
      },
    },

    {
      title: "Channel",
      dataIndex: "channelCode",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.channelCode.localeCompare(b.channelCode),
      },
    },
    {
      title: "Content",
      dataIndex: "content",
      checked: true,
      sorter: {
        compare: (a: any, b: any) => a.content.localeCompare(b.content),
      },
      render: (_: any, record: any) => {
        const editable = false;
        return (
          <div
            className={`cursor ${
              editable
                ? "notification-channel-message"
                : "notification-channel-view"
            }`}
            onClick={() => handleContent(record)}
          >
            <u>View Content</u>
          </div>
        );
      },
    },
    {
      title: "Active Flag",
      dataIndex: "enabled",
      checked: true,
      sorter: {
        compare: (a: any, b: any) =>
          a.enabled.toString().localeCompare(b.enabled.toString()),
      },
      render: (flag: any) => (
        <div className={`${flag ? "text-success" : "text-danger"}`}>
          {flag ? "ACTIVE" : "INACTIVE"}
        </div>
      ),
    },
  ];
  const editNotification = (e: any) => {
    props.history.push({
      pathname: "/dashboard/notification-channel-edit",
      state: e,
      action: "edit",
    });
  };
  const viewNotification = (e: any) => {
    props.history.push({
      pathname: "/dashboard/notification-channel-view",
      state: e,
    });
  };
  const resetSearch = () => {
    setSearchField(!searchField);
    setsearchUserData("");
  };
  const toggleOption = () => {
    setSearchField(!searchField);
    setFilterArea(false);
  };
  const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (searchCategory) {
      setsearchUserData(ev.currentTarget.value);
    }
  };
  const handlePrint = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
    setPrint(!toPrint);
  };
  const cancelPrint = () => {
    setPrint(!toPrint);
    setcolumns([]);
  };
  const handleList = (filteredItems: any, orginalList: any) => {
    setcolumns(filteredItems);
    setorginalColumns(orginalList);
  };
  const toggleRefresh = () => {
    setcolumns([]);
    setorginalColumns([]);
  };
  let channelData = NotificationData?.data;
  if (searchUserData && searchCategory !== "Select Field") {
    if (searchCategory === "any") {
      channelData = channelData.filter((e: any) => {
        return (
          e.notificationMasterDTO?.notificationId
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.notificationMasterDTO.description
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.channelCode
            ?.toUpperCase()
            .includes(searchUserData?.toUpperCase()) ||
          e.content?.toUpperCase().includes(searchUserData?.toUpperCase()) ||
          e.enabled
            ?.toString()
            .toUpperCase()
            .includes(searchUserData?.toUpperCase())
        );
      });
    } else {
      channelData = channelData.filter((e: any) => {
        if (
          searchCategory === "notificationId" ||
          searchCategory === "description"
        ) {
          if (
            e.notificationMasterDTO[searchCategory]
              .toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        } else {
          if (
            e[searchCategory]
              .toString()
              .toUpperCase()
              .includes(searchUserData.toUpperCase())
          ) {
            return e;
          }
        }
      });
    }
  }

  return (
    <div className="p-3">
      <CommonHeaderSummary
        RightContent={"Notification Channel Setup"}
        SummaryFileName={"Notification Channel Setup"}
        SummaryColumn={
          orginalColumns?.length > 0
            ? orginalColumns
            : notificationChannelHeader
        }
        TableData={channelData}
        Print={handlePrint}
        searchArea={toggleOption}
        filterArea={toggleFiler}
        filter={filterArea}
        search={searchField}
        List={true}
        ListData={handleList}
        Refresh={true}
        refresh={toggleRefresh}
      />
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={true}
          closeMessage={closeMessage}
          message={props?.location?.message}
        />
      )}
      {filterArea && (
        <div className="user-filter-section p-3">
          <Form>
            <div className="Form-group">
              <div
                style={{
                  fontSize: "18px",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                Filter
              </div>
              <Row>
                <Col sm={2} className="Prefund-Account-row">
                  <Input type="select" name="fieldName1" id="fieldName1">
                    <option value="">---select---</option>
                    <option value="companyName">companyName</option>
                    <option value="statusCode">statusCode</option>
                  </Input>
                </Col>
                <Col sm={1} className="Prefund-Account-row">
                  <Input type="select" name="condition1" id="condition1">
                    <option key="-1" value="=">
                      =
                    </option>
                    <option value="Starts with">Starts with</option>
                  </Input>
                </Col>
                <Col sm={2} className="Prefund-Account-row">
                  <CustomInput
                    className="prefund-Account-input"
                    name="value1"
                    id="value1"
                  />
                </Col>
                <Col sm={2} className="Prefund-Account-row">
                  <Input type="select" name="condition3" id="condition3">
                    <option value="OR">OR</option>
                    <option value="AND">AND</option>
                  </Input>
                </Col>
                <Col sm={2} className="Prefund-Account-row">
                  <Input type="select" name="fieldName2" id="fieldName2">
                    <option value="">---select---</option>
                    <option value="companyName">companyName</option>
                    <option value="statusCode">statusCode</option>
                  </Input>
                </Col>
                <Col sm={1} className="Prefund-Account-row">
                  <Input type="select" name="condition2" id="condition2">
                    <option key="-1" value="=">
                      =
                    </option>
                    <option value="Starts with">Starts with</option>
                  </Input>
                </Col>
                <Col sm={2} className="Prefund-Account-row">
                  <CustomInput
                    className="prefund-Account-input"
                    name="value2"
                    id="value2"
                  />
                </Col>
              </Row>
            </div>
            <div className="Form-group">
              <Row>
                <Col>{null ? <div style={{ color: "red" }}></div> : null}</Col>
                <Col className="enquiry-buttons me-0">
                  <div className="d-flex justify-content-end">
                    <CustomButton
                      className="Submit-btn"
                      component={"payrollEnquiry"}
                      color={"secondary"}
                    >
                      Fetch
                    </CustomButton>
                    <div className="ps-3">
                      <CustomButton
                        color="secondary"
                        component={"payrollEnquiry"}
                      >
                        Reset
                      </CustomButton>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      )}
      {searchField && (
        <div className="d-flex notification-master-search mt-3 p-3">
          <select
            className=" form-select user-search-drop
             ms-2"
            onChange={(e) => setSearchCategory(e.target.value)}
            defaultValue={"Select Field"}
          >
            <option selected>Select Field</option>
            <option value="notificationId">Notification Id</option>
            <option value="description">Description</option>
            <option value="channelCode">Channel</option>
            <option value="content">Content</option>
            <option value="enabled">Active Flag</option>
            <option value="any">Any</option>
          </select>
          <Input
            type="text"
            className="ms-1 user-search-input "
            onChange={(ev) => handleSearch(ev)}
          />
          <div className="ms-3">
            <CustomButton color="danger" className="btn--sizer mt-1">
              search
            </CustomButton>
          </div>
          <div className="ms-3 mt-1">
            <CustomButton
              className="text-white  border-0 ms-1"
              onClick={() => resetSearch()}
            >
              <FaReply />
            </CustomButton>
          </div>
        </div>
      )}
      {toPrint && (
        <span
          className="span-col1"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "10px",
          }}
        >
          {" "}
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
      <CustomLoader isLoading={isLoading} size={50} />
      {isLoading ? null : (
        <div className="mt-3" ref={componentRef}>
          <Form form={form} component={false}>
            <CustomHeader
              TableData={
                columns?.length > 0 ? columns : notificationChannelHeader
              }
              Delete={false}
              Edit={true}
              CustomTableHeader={channelData}
              editUser={editNotification}
              viewUser={viewNotification}
              view={true}
              edit={true}
              toPrint={toPrint ? true : false}
              DisableMange={toPrint ? true : false}
            />
          </Form>
        </div>
      )}
      <div>
        <Modal isOpen={popUp} toggle={toggle} centered={true}>
          <ModalBody>
            <div className="p-2">{`${viewContent}`}</div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default NotificationChannelSetup;
