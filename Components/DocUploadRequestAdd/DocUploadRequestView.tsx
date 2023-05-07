import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import { useHistory, useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import "./DocUploadRequestView.scss";
import {
  docUploadreqApproveCard,
  getDocUploadRequest,
  getViewDetails,
} from "../../redux/action/DocUploadRequestAction";
import { resetCreateMessage } from "../../redux/action/AgentGroupAction";
import CustomHeader from "../CustomTable/CustomTable";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

import { Button, Input, Label } from "reactstrap";
function DocUploadRequestView(props: any) {
  const history = useHistory();
  const [isPrint, setPrint] = useState(false);
  const dispatch = useDispatch();
  const [reasonError, setReasonError] = useState(false);
  const [transactionStatusId, setTransactionStatusId] = useState<any>([]);
  const [docStatus, setDocStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approveError, setApproveError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [expanAll, setExpandAll] = useState(false);
  const [frontImg, setFrontImg] = useState("");
  const [backImg, setBackImg] = useState("");
  const [signImg, setSignImg] = useState("");
  const [selfieImg, setSelfieImg] = useState("");
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");
  const [newSelfie, setNewSelfie] = useState("");
  const [newSign, setNewSign] = useState("");
  const [status, setStatus] = useState("Approve");
  const [reason, setReason] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [lockedStatus, setLockedStatus] = useState(true);
  const location: any = useLocation();

  useEffect(() => {
    const getdata = () => {
      dispatch({
        type: "DOC_UPLOAD_RESQUEST_APPROVE",
        data: [],
      });
    };

    getdata();
  }, []);

  const handleExpand = () => {
    setExpandAll(!expanAll);
  };

  const handleBack = async () => {
    history.goBack();
    dispatch(resetCreateMessage());
  };

  const handlePrint = (_data: any) => {
    setPrint(true);
  };
  const fetchDocUploadList = useCallback(async () => {
    try {
      dispatch(getDocUploadRequest());
    } catch (err) {}
  }, [dispatch]);
  const componentRef = useRef<any>();
  const docUploadRequestApproveRes = useSelector(
    (state: RootStateOrAny) => state.DocUploadRequestReducer?.getApproveRes
  );


  // docUploadRequestApproveRes?.data?.forEach((res: any) => {
  //   if (res.requestStatus === "REJECTED") {
  //     history.push({
  //       pathname: "/dashboard/SRF/Card-Upgrade-View-Details",
  //       state: "DocUploadRequest Rejected Successfully",
  //     });
  //   }
  // });

  // docUploadRequestApproveRes?.data?.forEach((res: any) => {
  //   if (res.requestStatus === "APPROVED") {
  //     history.push({
  //       pathname: "/dashboard/SRF/Card-Upgrade-View-Details",
  //       state: "DocUploadRequest Approved Successfully",
  //     });
  //   }
  // });

  // useEffect(() => {
  //   if (docUploadRequestApproveRes) {
  //     if (docUploadRequestApproveRes?.data) {
  //       setIsLoading(false);
  //       if (rejected) {
  //         setApiMessage("DocUploadRequest Rejected Successfully");
  //         setLockedStatus(true);
  //       }
  //       if (approvedRes) {
  //         setApiMessage("DocUploadRequest Approved Successfully");
  //         setLockedStatus(true);
  //         history.push({
  //           pathname: "dashboard/SRF/Doc-Upload-Request",
  //           state: { apiMessage },
  //         });
  //       }
  //       fetchDocUploadList();
  //     } else if (docUploadRequestApproveRes?.error) {
  //       setIsLoading(false);
  //       setLockedStatus(false);
  //       setApproveError(true);
  //       if (docUploadRequestApproveRes?.status === 500) {
  //         setApiMessage(docUploadRequestApproveRes?.error);
  //       } else {
  //         setApiMessage(docUploadRequestApproveRes?.message);
  //       }
  //       fetchDocUploadList();
  //     }
  //   }
  // }, [docUploadRequestApproveRes]);

  const fetchApproveDocUploadReq = useCallback(
    (id: any) => {
      try {
        dispatch(docUploadreqApproveCard(history, id));
      } catch (err) {}
    },
    [dispatch]
  );
  const getMobileNoResData = useSelector(
    (state: RootStateOrAny) =>
      state.DocUploadRequestReducer?.getDocUploadRequestView
  );

  let DocUploadValue = props?.location?.state?.data?.id;
  let Approvevalue = props?.location?.state?.data;
  useEffect(() => {
    dispatch(getViewDetails(DocUploadValue));
  }, [DocUploadValue]);

  let customerInfo = getMobileNoResData?.data;
  useEffect(() => {
    setFrontImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.kycUpdateRequestDTO?.idDocFrontPage}`
    );
    setBackImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.kycUpdateRequestDTO?.idDocBackPage}`
    );
    setSignImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.kycUpdateRequestDTO?.customerSignature}`
    );
    setSelfieImg(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.kycUpdateRequestDTO?.selfieFile}`
    );

    setNewFront(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.frontDocumentContent}`
    );
    setNewBack(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.backDocumentContent}`
    );
    setNewSign(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.signatureContent}`
    );
    setNewSelfie(
      `https://dmbzkkf9wrum7.cloudfront.net/${customerInfo?.photoContent}`
    );
  }, [
    customerInfo?.signatureContent,
    customerInfo?.frontDocumentContent,
    customerInfo?.backDocumentContent,
    customerInfo?.kycUpdateRequestDTO?.customerSignature,
    customerInfo?.kycUpdateRequestDTO?.idDocBackPage,
    customerInfo?.kycUpdateRequestDTO?.idDocFrontPage,
    customerInfo?.kycUpdateRequestDTO?.selfieFile,
    customerInfo?.photoContent,
  ]);
  const onClickBack = () => {
    props.history.push({
      pathname: "/dashboard/SRF/Doc-Upload-Request",
      state: true,
    });
  };
  let expiryDate =
    customerInfo?.cardExpiryDate?.slice(0, 2) +
    "/" +
    customerInfo?.cardExpiryDate?.slice(2);
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  let makerDetail = userData?.userInfo?.id;

  let locstatus = location?.state?.data?.requestStatus;
  let id = location?.state?.data?.id;
  let operatorId = location?.state?.data?.operatorId;

  const handleChangeReason = (e: any) => {
    setReason(e.target.value);
  };
  const statuschangehandler = (e: any) => {
    setStatus(e.target.value);
  };

  const validate = () => {
    if (makerDetail === operatorId) {
      setLockedStatus(false);
      setApproveError(true);
      setApiMessage("Maker can't approve his own request.");
    } else {
      setApiMessage("");
      return true;
    }
  };
  const closeMessage = () => {
    setApiMessage("");
  };

  const handleSubmit = (value: any, reason: any) => {
    if (validate()) {
      if (value === "Reject") {
        var body = JSON.stringify({
          approvalStatus: "REJECT",
          approverRemarks: reason,
          srfKycUpdateCheckers: [{ id }],
        });
        fetchApproveDocUploadReq(body);
      } else {
        var approveData = JSON.stringify({
          approvalStatus: "APPROVE",
          approverRemarks: reason,
          srfKycUpdateCheckers: [{ id }],
        });
        fetchApproveDocUploadReq(approveData);
      }
    }
  };

  useEffect(() => {
    if (apiMessage === "Request rejected successfully") {
      props.history.push({
        pathname: "dashboard/SRF/Doc-Upload-Request",
        state: apiMessage,
      });
    }
  }, [apiMessage]);
  return (
    <div className="KYCViewCustomerProfile">
      {/* <div className="p-3 d-flex">
        <h1 className="Enquiry-heading">Doc Upload Request View Details</h1>
        <div className="backBtnDevice" onClick={onClickBack}>
          <TiArrowBackOutline
            style={{ margin: "auto 5px", marginRight: "10px" }}
          />{" "}
          Back
        </div>
      </div> */}
      <div className="d-flex justify-content-between col-12 p-3">
        <h1 className="Enquiry-heading">Doc Upload Request View Details</h1>
        {/* <button
          className="block-card-back border-0"
          onClick={onClickBack}
        >
          <TiArrowBackOutline
            style={{ margin: "auto 5px", marginRight: "10px" }}
          />{" "}
          Back
        </button> */}
        <button
          className="doc-uploadRequest-back border-0"
          onClick={onClickBack}
        >
          <TiArrowBackOutline
            style={{ margin: "auto 5px", marginRight: "10px" }}
          />
          Back
        </button>
      </div>
      <CommonEditSummary
        style={{ maxHeight: "fit-content" }}
        print={true}
        handlePrint={handlePrint}
        backCustomer={handleBack}
      >
        {apiMessage && (
          <CustomResponseMessage
            apiStatus={lockedStatus}
            closeMessage={() => closeMessage()}
            message={apiMessage}
            errorFix={approveError}
          />
        )}
        <div className="px-3" ref={componentRef}>
          <div className="p-3">
            <div className="d-flex ms-2 justify-content-end">
              <button className="editbuttonOn" onClick={handleExpand}>
                {expanAll ? "Collapse All" : "Expand All"}
              </button>
            </div>

            <CustomAccordion
              eventKey="0"
              header="Request Details"
              print={isPrint}
              ExpandAll={expanAll}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="">
                      <label className="inputLabelDetails">
                        SRF Request ID
                      </label>
                    </div>
                    <div className=" me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.id}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="">
                      <label className="inputLabelDetails">
                        SRF Request Type
                      </label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.kycUpdateRequestDTO?.requestType}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="">
                      <label className="inputLabelDetails">Reason Code</label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.kycUpdateRequestDTO?.changeRequest}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="">
                      <label className="inputLabelDetails">
                        Request Status
                      </label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.kycUpdateRequestDTO?.requestStatus}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Input Channel</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={
                          customerInfo?.kycUpdateRequestDTO?.requestChannel
                        }
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Maker Name</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={props?.location?.state?.data?.makerName}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Input Time</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.kycUpdateRequestDTO?.inputTime}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              eventKey="1"
              header="Card Details"
              print={isPrint}
              ExpandAll={expanAll}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-2 me-2">
                    <div className="">
                      <label className="inputLabelDetails">Wallet ID</label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.kycUpdateRequestDTO?.walletId}
                      />
                    </div>
                  </div>
                  <div className="col-2 me-2">
                    <div className="">
                      <label className="inputLabelDetails">Customer Name</label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.customerName}
                      />
                    </div>
                  </div>
                  <div className="col-2 me-2">
                    <div className="">
                      <label className="inputLabelDetails">Mobile Number</label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.mobileNumber}
                      />
                    </div>
                  </div>
                  <div className="col-2 me-2">
                    <div className="">
                      <label className="inputLabelDetails">PAN</label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={customerInfo?.kycUpdateRequestDTO?.cardL4D}
                      />
                    </div>
                  </div>
                  <div className="col-2 me-2">
                    <div className="">
                      <label className="inputLabelDetails">
                        Card Expiry Date
                      </label>
                    </div>
                    <div className="me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize inpuWidth"
                        type="text"
                        readOnly={true}
                        value={expiryDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              eventKey="2"
              header="Accounting and Approve"
              print={isPrint}
              ExpandAll={expanAll}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Approver Name</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={props?.location?.state?.data?.approverName}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">Approver Time</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={Approvevalue?.approvalTime}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Approver Remarks
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={Approvevalue?.approverRemarks}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Account Update Time
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={Approvevalue?.accountingUpdateTime}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Accounting-Response Code
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={Approvevalue?.accountingResponseCode}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="inputLabelDetails">
                        Accounting Error Message
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control inputboxsize"
                        type="text"
                        readOnly={true}
                        value={Approvevalue?.accountingErrorMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion
              eventKey="3"
              header="Home Address"
              print={isPrint}
              ExpandAll={expanAll}
            >
              <p className="addressTitle">Old Address</p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  {customerInfo?.residentAddress1 === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          Address Line 1
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.residentAddress1}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.residentAddress2 === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          Address Line 2
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.residentAddress2}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.residentPostcode === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">Postal Code</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.residentPostcode}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.residentCityDescription === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">City</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.residentCityDescription}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.residentStateDescription === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">State</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.residentStateDescription}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {customerInfo?.kycUpdateRequestDTO?.homeAddress === true && (
                <>
                  <p className="addressTitle">New Address</p>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="col d-flex">
                      {customerInfo?.kycUpdateRequestDTO
                        ?.residentAddressLine === "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              Address Line 1
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.residentAddressLine1
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO
                        ?.residentAddressLine2 === "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              Address Line 2
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.residentAddressLine2
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.residentPostalCode ===
                      "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              Postal Code
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.residentPostalCode
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.residentCity ===
                      "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">City</label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO?.residentCity
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.residentState ===
                      "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">State</label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO?.residentState
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CustomAccordion>
            <CustomAccordion
              eventKey="3"
              header="Mailing Address"
              print={isPrint}
              ExpandAll={expanAll}
            >
              <p className="addressTitle">Old Address</p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  {customerInfo?.mailAddress1 === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          Address Line 1
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.mailAddress1}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.mailAddress2 === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          Address Line 2
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.mailAddress2}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.mailPostcode === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">Postal Code</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.mailPostcode}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.mailCityDescription === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">City</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.mailCityDescription}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.mailStateDescription === "" ? (
                    ""
                  ) : (
                    <div className="col me-2">
                      <div className="col">
                        <label className="inputLabelDetails">State</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.mailStateDescription}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {customerInfo?.kycUpdateRequestDTO?.mailingAddress === true && (
                <>
                  <p className="addressTitle">New Address</p>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="col d-flex">
                      {customerInfo?.kycUpdateRequestDTO
                        ?.mailingAddressLine1 === "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              Address Line 1
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.mailingAddressLine1
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO
                        ?.mailingAddressLine2 === "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              Address Line 2
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.mailingAddressLine2
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.mailingPostalCode ===
                      "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              Postal Code
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.mailingPostalCode
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.mailingCity === "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">City</label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO?.mailingCity
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.mailingState ===
                      "" ? (
                        ""
                      ) : (
                        <div className="col me-2">
                          <div className="col">
                            <label className="inputLabelDetails">State</label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO?.mailingState
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CustomAccordion>
            <CustomAccordion
              eventKey="4"
              header="ID Doc"
              print={isPrint}
              ExpandAll={expanAll}
            >
              <p className="addressTitle">Old Id Documents</p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col d-flex">
                  {customerInfo?.idTypeCodeDescription === "" ? (
                    ""
                  ) : (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="inputLabelDetails">ID Doc Type</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.idTypeCodeDescription}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.idValue === "" ? (
                    ""
                  ) : (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          ID Doc Number
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.idValue}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.newIdDate && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          ID Doc Issue Date
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.newIdDate}
                        />
                      </div>
                    </div>
                  )}
                  {customerInfo?.newIdExpiryDate && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="inputLabelDetails">
                          ID Doc Expiry Date
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control inputboxsize"
                          type="text"
                          readOnly={true}
                          value={customerInfo?.newIdExpiryDate}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {customerInfo?.kycUpdateRequestDTO?.idDocs === true && (
                <>
                  <p className="addressTitle">New Id Documents</p>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="col d-flex">
                      {customerInfo?.kycUpdateRequestDTO?.idDocType && (
                        <div className="col-3 me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              ID Doc Type
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO?.idDocType
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.idDocNumber && (
                        <div className="col-3 me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              ID Doc Number
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO?.idDocNumber
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.idDocIssueDate && (
                        <div className="col-3 me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              ID Doc Issue Date
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.idDocIssueDate
                              }
                            />
                          </div>
                        </div>
                      )}
                      {customerInfo?.kycUpdateRequestDTO?.idDocExpiryDate && (
                        <div className="col-3 me-2">
                          <div className="col">
                            <label className="inputLabelDetails">
                              ID Doc Expiry Date
                            </label>
                          </div>
                          <div className="col me-2">
                            <input
                              className="border-0 edit-sum-input form-control inputboxsize"
                              type="text"
                              readOnly={true}
                              value={
                                customerInfo?.kycUpdateRequestDTO
                                  ?.idDocExpiryDate
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              <p className="addressTitle">Old Images</p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                {newFront !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">
                      IDDoc Front Page
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="IdDocFrontImg"
                        src={newFront}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
                {newBack !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">
                      IDDoc Back Page
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="IdDocBckImg"
                        src={newBack}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
                {newSelfie !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">Selfie</label>
                    <div className="col-12 pt-2">
                      <img
                        alt="Selfie"
                        src={newSelfie}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
                {newSign !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">
                      Customer Signature
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="Signature"
                        src={newSign}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
              </div>

              {(frontImg !== "https://dmbzkkf9wrum7.cloudfront.net/undefined" ||
                backImg !== "https://dmbzkkf9wrum7.cloudfront.net/undefined" ||
                selfieImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" ||
                signImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined") && (
                <p className="addressTitle">New Images</p>
              )}
              <div className="d-flex align-items-center mb-4">
                {frontImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">
                      {" "}
                      IDDoc Front Page
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="IdDocFrontImg"
                        src={frontImg}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
                {backImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">
                      IDDoc Back Page
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="IdDocBckImg"
                        src={backImg}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
                {selfieImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">Selfie</label>
                    <div className="col-12 pt-2">
                      <img
                        alt="Selfie"
                        src={selfieImg}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
                {signImg !==
                  "https://dmbzkkf9wrum7.cloudfront.net/undefined" && (
                  <div className="col-3 p-1">
                    <label className="doc-Upload-view-label">
                      Customer Signature
                    </label>
                    <div className="col-12 pt-2">
                      <img
                        alt="Signature"
                        src={signImg}
                        className="col-12 selfieImage"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CustomAccordion>
          </div>
        </div>
        {locstatus === "CREATED" && (
          <div className="row filteredArea ps-4">
            <div className="col-2">
              <Input
                type="select"
                name=""
                className="form-select btn--sizer"
                value={status}
                onChange={statuschangehandler}
              >
                <option>Approve</option>
                <option>Reject</option>
              </Input>
            </div>
            <div className="col-1">
              <Label>Remarks</Label>
            </div>
            <div className="col-3">
              <Input
                type="text"
                name=""
                className="form-control"
                value={reason}
                onChange={handleChangeReason}
              />
            </div>
            <div className="col-2">
              <Button
                color="danger"
                //disabled={!props.disableCustomRowSelection}
                className="customApproval"
                onClick={() => handleSubmit(status, reason)}
                //handlesubmit={handleSubmit}
                // onClick={() => props.handleSubmit(status, reason, upgrade)}
              >
                Submit
              </Button>
            </div>
          </div>
        )}
      </CommonEditSummary>
    </div>
  );
}

export default DocUploadRequestView;
