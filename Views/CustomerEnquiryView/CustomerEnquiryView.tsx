import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Switch } from "antd";
import { useHistory, useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";
import {
  getCustomerStatusDetail,
  getKYCCustomerEnquiryDetail,
  resetCustomerEnquiryDetails,
  resetCustomerStatusDetails,
  resetEditMessage,
} from "../../redux/action/CustomerEnquiryAction";
import { ApiEndPoints } from "../../Constants/Constants";
import { BsEye } from "react-icons/bs";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";
import { FaRegEdit } from "react-icons/fa";
import CustomTooltip from "../../Components/CustomTooltip/CustomTooltip";
import CustomLoader from "../../Components/Loader/CustomLoader";

function CustomerEnquiryView() {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const [isPrint, setPrint] = useState(false);
  const [expanAll, setExpandAll] = useState(false);
  const [imagePreviewInfo, setImagePreviewInfo] = useState();
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);
  const [fromSrf, setFromSrf] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const KYCCustomerDetailsList: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getCustomerDetails
  );

  const CustomerStatusDetails: any = useSelector(
    (state: RootStateOrAny) =>
      state.KYCCustomerEnquiryReducer.getCustomerStatusDetails
  );

  const customerDetail = KYCCustomerDetailsList?.data;
  const customerStatus = CustomerStatusDetails?.data;

  useEffect(() => {
    if (location?.state?.value?.cardOperation) {
      setFromSrf(location?.state?.value?.cardOperation);
      setExpandAll(true);
    }
  }, [location?.state?.value?.cardOperation]);

  const fetchKYCCustomerData = useCallback(async () => {
    try {
      dispatch(getKYCCustomerEnquiryDetail(location?.state?.value?.id));
    } catch (err) {}
  }, [dispatch]);

  const fetchCustomerStatus = useCallback(async () => {
    try {
      dispatch(getCustomerStatusDetail(location?.state?.value?.customerId));
    } catch (err) {}
  }, [dispatch]);

  useEffect(() => {
    fetchKYCCustomerData();
    fetchCustomerStatus();
    setIsLoading(true);
  }, [fetchKYCCustomerData, fetchCustomerStatus]);

  useEffect(() => {
    if (KYCCustomerDetailsList?.data) {
      setIsLoading(false);
      setExpandAll(true);
    }
  }, [KYCCustomerDetailsList]);

  const resetData = useCallback(async () => {
    try {
      dispatch(resetCustomerEnquiryDetails());
      dispatch(resetCustomerStatusDetails());
    } catch (err) {}
  }, [dispatch]);

  const resetApiData = useCallback(async () => {
    try {
      dispatch(resetEditMessage());
    } catch (err) {}
  }, [dispatch]);

  const handleBack = async () => {
    resetData().then(() => {
      history.goBack();
    });
  };

  const handlePrint = (data: any) => {
    setPrint(true);
  };

  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };

  const componentRef = useRef<any>();
  const Print: any = useReactToPrint({
    content: () => componentRef.current,
  });
  const cancelPrint = () => {
    setPrint(false);
  };
  const handleExpand = () => {
    setExpandAll(!expanAll);
  };
  const handleCustomer_Edit = () => {
    resetApiData().then(() => {
      history.push({
        pathname: "/dashboard/KYC-Customer-Enquiry/Edit-Customer-Enquiry",
        state: {
          value: customerDetail,
          customerStatus: customerStatus,
        },
      });
    });
  };

  const handle_History_onClick = () => {
    history.push({
      pathname: "/dashboard/KYC-Customer-Enquiry/Customer-Enquiry-History",
      state: {
        value: customerDetail,
      },
    });
  };

  return (
    <div className="KYCCustomerEnquiryView">
      <CommonEditSummary
        name={"View Customer Profile"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={KYCCustomerDetailsList?.data}
        print={true}
        handlePrint={handlePrint}
        backCustomer={handleBack}
      >
        <CustomLoader isLoading={isLoading} size={50} />
        {isPrint && (
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
        )}
        <div className="px-3" ref={componentRef}>
          {isPrint && (
            <>
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
                {"ID Type Routing"}
              </h3>
            </>
          )}

          {isLoading ? null : (
            <div className="p-3">
              <div className="d-flex ms-2 justify-content-end">
                <div className={`${fromSrf && "d-none"} d-flex`}>
                  <button
                    id="edit"
                    className={
                      customerDetail
                        ? "customerEnquiry-editBtn"
                        : "customerEnquiry-editBtn customerEnquiry-btn-disabled"
                    }
                    onClick={handleCustomer_Edit}
                  >
                    <FaRegEdit />
                    <CustomTooltip target="edit">Edit</CustomTooltip>
                  </button>
                  <button
                    className={
                      customerDetail
                        ? "editbuttonOn me-2"
                        : "editbuttonOn me-2 customerEnquiry-btn-disabled"
                    }
                    onClick={handle_History_onClick}
                  >
                    History
                  </button>
                </div>
                <button className="editbuttonOn" onClick={handleExpand}>
                  {expanAll ? "Collapse All" : "Expand All"}
                </button>
              </div>
              <div className="customer-status-container p-3 mt-2">
                <div className="me-2 my-3">
                  <label className="seperaterLabel">Profile Status</label>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          MMP Profile Status
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.mmpProfileStatus}
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
                          CW Card Status
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.walletStatus}
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
                          User Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.userName}
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
                          Group Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.groupName}
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
                        <label className="KYCViewCustomer-label">CMM</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.cmm}
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
                          App Login Status
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.appLoginStatus}
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
                          App Last Login Date & Time
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerStatus?.lastLoginDateTime}
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
              </div>

              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="0"
                header="Customer"
                print={isPrint}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Customer ID
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerId}
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
                        <label className="KYCViewCustomer-label">Title</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.titleDescription}
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
                        <label className="KYCViewCustomer-label">Name</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerName}
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
                          Mobile No
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mobileNumber}
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
                          Customer Category
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerGroupDescription}
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
                          Date of Onboarding
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.dateOfOnboarding}
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
                          Wallet Size Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.accountTypeName
                          }
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
                          Profile Status
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.statusCode === "A"
                              ? "ACTIVE"
                              : "INACTIVE"
                          }
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
              </CustomAccordion>
              <CustomAccordion
                eventKey="1"
                header="Personal Profile"
                print={isPrint}
                ExpandAll={expanAll}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Date of Birth
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.birthDate}
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
                        <label className="KYCViewCustomer-label">Gender</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.gender}
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
                          Marital Status
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.maritalStatus}
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
                        <label className="KYCViewCustomer-label">Race</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.raceDescription}
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
                          Email Address
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.emailAddress}
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
                          Mother's Maiden Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mothersMaidenName}
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

                <div className="me-2 my-5">
                  <label className="seperaterLabel">Residential Address</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Address Line 1
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.residentAddress1}
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
                          Address Line 2
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.residentAddress2}
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
                          Postal Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.residentPostcode}
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
                        <label className="KYCViewCustomer-label">City</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.residentCityCode}
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
                        <label className="KYCViewCustomer-label">State</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.residentStateCode}
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
                        <label className="KYCViewCustomer-label">Country</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.residentCountryDescription}
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

                <div className="me-2 my-5">
                  <label className="seperaterLabel">Mailing Address</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Address Line 1
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mailAddress1}
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
                          Address Line 2
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mailAddress2}
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
                          Postal Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mailPostcode}
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
                        <label className="KYCViewCustomer-label">City</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mailCityCode}
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
                        <label className="KYCViewCustomer-label">State</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mailStateCode}
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
                        <label className="KYCViewCustomer-label">Country</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.mailCountryDescription}
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
              </CustomAccordion>
              <CustomAccordion
                eventKey="2"
                header="Employer Profile"
                print={isPrint}
                ExpandAll={expanAll}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Occupation
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.occupationDescription}
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
                          Nature of Job
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.natureOfBusinessDescription}
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
                          Company Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.companyName}
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
                          Nature of Self Employment
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.natureOfSelfEmployed}
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
              </CustomAccordion>
              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="3"
                header="ID Profile"
                print={isPrint}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Nationality
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.nationalityCodeDescription}
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
                        <label className="KYCViewCustomer-label">ID Type</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.idTypeCodeDescription}
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
                          ID Number
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.idValue}
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
                          Country of Issue
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.countryOfIssue}
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
                          Issue Date
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.newIdDate}
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
                          Expiry Date
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.newIdExpiryDate}
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
                          Visa Expiry Date
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.immigrationVisaExpiryDate}
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
                          PR Status
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className="my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.prStatus === "Y" ? true : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Is Document Original
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.isDocumentOriginal === "Y"
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
                              customerDetail?.frontDocumentContent
                            );
                          }}
                        >
                          <BsEye
                            style={{ margin: "11px 17px", color: "white" }}
                          />
                        </div>
                      </div>
                    </div>
                    {customerDetail?.backDocumentContent && (
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
                                customerDetail?.backDocumentContent
                              );
                            }}
                          >
                            <BsEye
                              style={{ margin: "11px 17px", color: "white" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Selfie Image
                        </label>
                      </div>
                      <div className="col me-2">
                        <div
                          className="KYC-customerImage mx-4 my-1"
                          onClick={() => {
                            setIsisImagePreviewEnable(!isImagePreviewEnable);
                            setImagePreviewInfo(customerDetail?.photoContent);
                          }}
                        >
                          <BsEye
                            style={{ margin: "11px 17px", color: "white" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomAccordion>
              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="4"
                header="Card Profile"
                print={isPrint}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Brand Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.walletType}
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
                          Card Type
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.cardType}
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
                          Card Number
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.panLastFourdigits
                          }
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
                          Name Embossed
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.preferredCardName
                          }
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
                        <label className="KYCViewCustomer-label">URN</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.cardUrn}
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
                          CRN
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.cardCrn
                          }
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
                          Purpose Of Card
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.purposeOfCard
                          }
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
                          Source of Fund
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.sourceOfFundDescription}
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

                <div className="me-2 my-5">
                  <label className=" seperaterLabel">Code Details</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Source Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.sourceCode}
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
                          Promo Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.promoCode}
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
                          Sales Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.salesCode}
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
                          Agent Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerWalletDto?.agentCode}
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
                          Branch Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.branchName}
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
                          Referral Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.referralCode
                          }
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
                          Referred Code
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={
                            customerDetail?.customerWalletDto?.referredCode
                          }
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

                <div className="me-2 my-5">
                  <label className=" seperaterLabel">Transaction Details</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Online Purchase
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.customerWalletDto?.optInOutEcom ===
                              "Y"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Overseas Card Usage
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.customerWalletDto
                                ?.optInOutOverseaRet === "Y"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Overseas ATM Withdrawals
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.customerWalletDto
                                ?.optInOutOverseaCash === "Y"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Auto Billing Payment
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.customerWalletDto
                                ?.optInOutDirectDebit === "Y"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Mail Order/Tel. Order Purchases
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.customerWalletDto?.optInOutMoto ===
                              "Y"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Visa payWave
                        </label>
                      </div>
                      <div className="col me-2">
                        <div className=" my-1">
                          <Switch
                            disabled
                            className="toggle-switch KYC-CustomerToggle"
                            checkedChildren="Yes"
                            unCheckedChildren="NO"
                            checked={
                              customerDetail?.customerWalletDto?.optInOutContactLess ===
                              "Y"
                                ? true
                                : false
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CustomAccordion>
              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="5"
                header="Risk Profile"
                print={isPrint}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          PEPS Match
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.pepsMatch}
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
                          MSSL Match
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.msslMatch}
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
                          SANCTION Match
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.sanctionMatch}
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
                    {customerDetail?.pepsMatch && (
                      <div className="col-4 me-2">
                        <div className="col">
                          <label className="KYCViewCustomer-label">
                            Source of Wealth
                          </label>
                        </div>
                        <div className="col me-2">
                          <input
                            className="border-0 edit-sum-input form-control"
                            type="text"
                            value={customerDetail?.sourceOfWealthDescription}
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
                    )}
                  </div>
                </div>
              </CustomAccordion>
              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="6"
                header="Bank Profile"
                print={isPrint}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Bank Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.bankName}
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
                          Bank Account No
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.bankAccountNo}
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
                          Customer Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.customerName}
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
                          RPP Account Name
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.rppAccountName}
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
                          RPP Check Timestamp
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.rppCheckTimeStamp}
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
              </CustomAccordion>
              <CustomAccordion
                ExpandAll={expanAll}
                eventKey="7"
                header="Remarks"
                print={isPrint}
              >
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-9 d-flex">
                    <div className="col-4 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          OPS Remarks
                        </label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.opsRemarks}
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
                        <label className="KYCViewCustomer-label">Source</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.source}
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
                        <label className="KYCViewCustomer-label">Remarks</label>
                      </div>
                      <div className="col me-2">
                        <input
                          className="border-0 edit-sum-input form-control"
                          type="text"
                          value={customerDetail?.remarks}
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
              </CustomAccordion>
            </div>
          )}
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

export default CustomerEnquiryView;
