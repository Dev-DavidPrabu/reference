import FileSaver from "file-saver";
import React, { useCallback, useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";
import CustomLoader from "../../Components/Loader/CustomLoader";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  getDocumentfileDownload,
  getDocumentfileView,
  resetDocumentFileData,
} from "../../redux/action/MobileTopUpAction";

function MobileTopUpView(props: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [viewValue, setViewValue] = useState({
    customerName: "",
    errorDescription: "",
    id: "",
    originatorId: "",
    originatorType: "",
    statusCode: "",
    topupAmount: "",
    topupCurrency: "",
    topupType: "",
    transactionId: "",
    mobileNumber: "",
    originatingTime: "",
    originatorRefNo: "",
    beneficiaryName: "",
    originatorErrorCode: "",
    responseTime: "",
    accountingErrorCode: "",
    accountingErrorDetail: "",
    approverId: "",
    approverRemarks: "",
    approvalTime: "",
  });
  const [isApprover, setIsApprover] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [addMessage, setAddMessage] = useState("");

  const [imagePreviewInfo, setImagePreviewInfo] = useState({
    originatingTime: "",
    originatorErrorCode: "",
    originatorRefNo: "",
    originatorType: "",
    statusCode: "",
    topupAmount: 0,
    topupCurrency: "",
    topupType: "",
    transactionId: "",
  });
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);

  const MobileDocumentData = useSelector(
    (state: RootStateOrAny) => state.MobileTopUpReducer?.getMobileDocumentData
  );
  const MobileDocumentDownloadData = useSelector(
    (state: RootStateOrAny) =>
      state.MobileTopUpReducer?.getMobileDocumentDownloadData
  );
  const resetDocumentData = useCallback(
    async (fileType: any) => {
      try {
        dispatch(resetDocumentFileData(fileType));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (MobileDocumentData?.data) {
      setIsLoading(false);
      setImagePreviewInfo(MobileDocumentData?.data);
      setIsisImagePreviewEnable(!isImagePreviewEnable);
      resetDocumentData("view");
    } else if (MobileDocumentData?.error) {
      setIsLoading(false);
      setApiMessage(true);
      setAddMessage(MobileDocumentData?.message);
      resetDocumentData("view");
    }
  }, [MobileDocumentData]);

  const exportToData = (apiData: any, type: string) => {
    if (
      apiData?.length !== 0 &&
      MobileDocumentDownloadData?.data?.length !== 0
    ) {
      let file = new Blob([apiData], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(file, `MobileTopup.${type}`);
    }
    resetDocumentData("download");
  };
  useEffect(() => {
    if (MobileDocumentDownloadData?.data?.error) {
      setIsLoading(false);
      setApiMessage(true);
      setAddMessage(MobileDocumentDownloadData?.data?.message);
      resetDocumentData("download");
    } else if (
      MobileDocumentDownloadData?.length !== 0 &&
      MobileDocumentDownloadData !== undefined
    ) {
      exportToData(MobileDocumentDownloadData, ".txt");
      setIsLoading(false);
      resetDocumentData("download");
    }
  }, [MobileDocumentDownloadData]);

  useEffect(() => {
    if (props.location?.state) {
      setViewValue(props.location?.state);
    }
  }, [props.location?.state]);

  useEffect(() => {
    if (
      viewValue.statusCode === "DELAYED" ||
      viewValue.statusCode === "FAILURE" ||
      viewValue.statusCode === "SUCCESS" ||
      viewValue.statusCode === "NO_MATCH"
    ) {
      setIsApprover(true);
    }
    if (
      viewValue.statusCode === "MANUAL_REFUND" ||
      viewValue.statusCode === "SUCCESS" ||
      viewValue.statusCode === "MANUAL_CREDIT" ||
      viewValue.statusCode === "NO_MATCH"
    ) {
      setIsError(true);
    }
  }, [viewValue]);
  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };
  const fetchDocument = useCallback(
    async (fileType: any, id: any) => {
      try {
        dispatch(getDocumentfileView(fileType, id));
      } catch (err) {}
    },
    [dispatch]
  );

  const downlaodDocument = useCallback(
    async (fileType: any, id: any) => {
      try {
        dispatch(getDocumentfileDownload(fileType, id));
      } catch (err) {}
    },
    [dispatch]
  );

  const handleBack = async () => {
    history.goBack();
  };
  const handleRemitfile = (type: any) => {
    setIsLoading(true);
    if (type === "view") {
      fetchDocument("ORIGINATOR_DATA_FILE", viewValue?.id);
    } else {
      downlaodDocument("ORIGINATOR_DATA_FILE", viewValue?.id);
    }
  };

  const handleAccountFile = (type: any) => {
    setIsLoading(true);
    if (type === "view") {
      fetchDocument("ACCOUNTING_DATA_FILE", viewValue?.id);
    } else {
      downlaodDocument("ACCOUNTING_DATA_FILE", viewValue?.id);
    }
  };
  const closeMessage = () => {
    setApiMessage(false);
  };

  return (
    <div className="MobileTopUpView">
      <CommonEditSummary
        name={"Mobile Top Up - View Details"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={true}
        backCustomer={handleBack}
      >
        <div>
          {apiMessage && (
            <CustomResponseMessage
              apiStatus={false}
              closeMessage={() => closeMessage()}
              message={addMessage}
              errorFix={true}
            />
          )}
        </div>
        <div className="p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    MMP Unique Txn ID
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.transactionId}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    {viewValue.originatorType === "JOMPAY"
                      ? "rrn"
                      : "Mobile Number"}
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.mobileNumber}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    {viewValue.originatorType === "JOMPAY"
                      ? "rrn2"
                      : "Customer Name"}
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.customerName}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Top-Up Type</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.topupType}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Originator Type
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.originatorType}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Top-Up Currency
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.topupCurrency}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Top-Up Amount</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.topupAmount}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Remitter ID</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.originatorId}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Remitter Ref No
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.originatorRefNo}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Beneficiary Name
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.beneficiaryName}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Originating Timestamp
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.originatingTime}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Status Code</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue.statusCode}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Remitter Error Code
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.originatorErrorCode}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className={`col-4 me-2 ${isError ? "d-none" : ""}`}>
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Accounting Error Code
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.accountingErrorCode}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className={`col-4 me-2 ${isError ? "d-none" : ""}`}>
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Accounting Error Detail
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.accountingErrorDetail}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Response Timestamp
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.responseTime}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className={`col-4 me-2 ${isApprover ? "d-none" : ""}`}>
                <div className="col">
                  <label className="KYCViewCustomer-label">Approver ID</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.approverId}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className={`col-4 me-2 ${isApprover ? "d-none" : ""}`}>
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Approver Remarks
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.approverRemarks}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className={`col-4 me-2 ${isApprover ? "d-none" : ""}`}>
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Approval Timestamp
                  </label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={viewValue?.approvalTime}
                    style={{
                      background: "#CFCFCF",
                      width: "91%",
                      minWidth: "150px",
                      borderRadius: "0px",
                      height: "35px",
                    }}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Remittance Data File
                  </label>
                </div>
                <div className="col me-2 d-flex">
                  <div
                    className="KYC-customerImage  my-1"
                    onClick={() => handleRemitfile("view")}
                  >
                    <BsEye style={{ margin: "11px 17px", color: "white" }} />
                  </div>
                  <div
                    className="KYC-customerImage mx-4 my-1"
                    onClick={() => handleRemitfile("download")}
                  >
                    <MdFileDownload
                      style={{ margin: "11px 17px", color: "white" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Accounting Data File
                  </label>
                </div>
                <div className="col me-2 d-flex">
                  <div
                    className="KYC-customerImage  my-1"
                    onClick={() => handleAccountFile("view")}
                  >
                    <BsEye style={{ margin: "11px 17px", color: "white" }} />
                  </div>
                  <div
                    className="KYC-customerImage mx-4 my-1"
                    onClick={() => handleAccountFile("download")}
                  >
                    <MdFileDownload
                      style={{ margin: "11px 17px", color: "white" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CustomLoader isLoading={isLoading} size={50} />
        </div>
      </CommonEditSummary>
      <ImagePreview
        showModal={isImagePreviewEnable}
        imageInfo={imagePreviewInfo}
        closeModal={exitImagePreview}
        mobileTopup={true}
      ></ImagePreview>
    </div>
  );
}

export default MobileTopUpView;
