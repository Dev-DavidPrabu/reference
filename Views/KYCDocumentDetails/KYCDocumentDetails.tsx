import React, { useCallback, useEffect, useState } from "react";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import { ApiEndPoints } from "../../Constants/Constants";
import { BsEye } from "react-icons/bs";
import "./KYCDocumentDetails.scss";
import {
  getKYCCustomerDetails,
  resetCustomerDetails,
} from "../../redux/action/KYCPendingCustomerAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Switch } from "antd";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";
import { useHistory, useLocation } from "react-router";

function KYCDocumentDetails() {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();

  const [imagePreviewInfo, setImagePreviewInfo] = useState();
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);

  const KYCCustomerDetailsList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCPendingCustomerReducer.getCustomerDetails
  );

  const customerDetail = KYCCustomerDetailsList?.data;

  const fetchKYCCustomerData = useCallback(async () => {
    try {
      dispatch(getKYCCustomerDetails(location?.state?.value?.id));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchKYCCustomerData();
  }, [fetchKYCCustomerData]);

  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCustomerDetails());
    } catch (err) {}
  }, [dispatch]);

  const handleBack = async () => {
    resetData().then(() => {
      history.goBack();
    });
  };

  return (
    <div className="KYCDocumentDetails">
      <CommonEditSummary
        name={"Document Details"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={KYCCustomerDetailsList?.data}
        backCustomer={handleBack}
      >
        <div className="p-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Customer Name</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={customerDetail?.idDocumentsProfile?.customerName}
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
                  <label className="KYCViewCustomer-label">Mobile Number</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={customerDetail?.idDocumentsProfile?.mobileNumber}
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
                  <label className="KYCViewCustomer-label">Nationality</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={customerDetail?.idDocumentsProfile?.nationalityCode}
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
                  <label className="KYCViewCustomer-label">ID Type</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={customerDetail?.idDocumentsProfile?.idTypeCode}
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
                  <label className="KYCViewCustomer-label">ID Number</label>
                </div>
                <div className="col me-2">
                  <input
                    className="border-0 edit-sum-input form-control"
                    type="text"
                    value={customerDetail?.idDocumentsProfile?.idValue}
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
                  <label className="KYCViewCustomer-label">KYC Indicator</label>
                </div>
                <div className="col me-2">
                  <div className="my-1">
                    <Switch
                      disabled
                      className="toggle-switch KYC-CustomerToggle"
                      checkedChildren="Yes"
                      unCheckedChildren="NO"
                      checked={
                        customerDetail?.idDocumentsProfile
                          ?.isDocumentOriginal == "Y"
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="me-2 my-5">
            <label className="seperaterLabel">Document Image</label>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-9 d-flex">
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Front ID Image
                  </label>
                </div>
                <div className="col me-2">
                  <div
                    className="KYC-customerImage mx-4 my-1"
                    onClick={() => {
                      setIsisImagePreviewEnable(!isImagePreviewEnable);
                      setImagePreviewInfo(
                        customerDetail?.documents?.frontDocumentContent
                      );
                    }}
                  >
                    <BsEye style={{ margin: "11px 17px", color: "white" }} />
                  </div>
                </div>
              </div>
              {customerDetail?.documents?.backDocumentContent && (
                <div className="col-4 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Back ID Image
                    </label>
                  </div>
                  <div className="col me-2">
                    <div
                      className="KYC-customerImage mx-4 my-1"
                      onClick={() => {
                        setIsisImagePreviewEnable(!isImagePreviewEnable);
                        setImagePreviewInfo(
                          customerDetail?.documents?.backDocumentContent
                        );
                      }}
                    >
                      <BsEye style={{ margin: "11px 17px", color: "white" }} />
                    </div>
                  </div>
                </div>
              )}
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Selfie Image</label>
                </div>
                <div className="col me-2">
                  <div
                    className="KYC-customerImage mx-4 my-1"
                    onClick={() => {
                      setIsisImagePreviewEnable(!isImagePreviewEnable);
                      setImagePreviewInfo(
                        customerDetail?.documents?.photoContent
                      );
                    }}
                  >
                    <BsEye style={{ margin: "11px 17px", color: "white" }} />
                  </div>
                </div>
              </div>
              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Signature Image
                  </label>
                </div>
                <div className="col me-2">
                  <div
                    className="KYC-customerImage mx-4 my-1"
                    onClick={() => {
                      setIsisImagePreviewEnable(!isImagePreviewEnable);
                      setImagePreviewInfo(
                        customerDetail?.documents?.signatureContent
                      );
                    }}
                  >
                    <BsEye style={{ margin: "11px 17px", color: "white" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonEditSummary>
      <ImagePreview
        showModal={isImagePreviewEnable}
        imageInfo={imagePreviewInfo}
        closeModal={exitImagePreview}
        cloudfrontUrl={ApiEndPoints.cloudfrontUrlKyc}
      ></ImagePreview>
    </div>
  );
}

export default KYCDocumentDetails;
