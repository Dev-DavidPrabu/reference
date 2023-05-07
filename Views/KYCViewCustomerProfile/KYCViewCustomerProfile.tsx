import React, { useCallback, useEffect, useRef, useState } from "react";
import "./KYCViewCustomerProfile.scss";
import CommonEditSummary from "../../Components/EditSummary/CommonEditSummary";
import CustomAccordion from "../../Components/CustomAccordion/CustomAccordion";
import {
  getKYCCustomerDetails,
  resetCustomerDetails,
} from "../../redux/action/KYCPendingCustomerAction";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Switch } from "antd";
import { useHistory, useLocation } from "react-router";
import { useReactToPrint } from "react-to-print";

function KYCViewCustomerProfile() {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const [isPrint, setPrint] = useState(false);
  const [expanAll, setExpandAll] = useState(false);

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

  const handlePrint = (data: any) => {
    setPrint(true);
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

  return (
    <div className="KYCViewCustomerProfile">
      <CommonEditSummary
        name={"View Customer Profile"}
        style={{ maxHeight: "fit-content" }}
        backButton={true}
        formData={KYCCustomerDetailsList?.data}
        print={true}
        handlePrint={handlePrint}
        backCustomer={handleBack}
      >
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
          <div className="p-3">
            <div className="d-flex ms-2 justify-content-end">
              <button className="editbuttonOn" onClick={handleExpand}>
                {expanAll ? "Collapse All" : "Expand All"}
              </button>
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
                        value={customerDetail?.customer?.customerId}
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
                        value={customerDetail?.customer?.title}
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
                        value={customerDetail?.customer?.customerName}
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
                      <label className="KYCViewCustomer-label">Mobile No</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.customer?.mobileNumber}
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
                        value={
                          customerDetail?.customer?.customerGroupDescription
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
                        Date of Onboarding
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.customer?.dateOfOnboarding}
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
                        value={customerDetail?.customer?.accountTypeName}
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
                        value={customerDetail?.customer?.statusCode}
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
                        value={customerDetail?.personalProfile?.birthDate}
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
                        value={customerDetail?.personalProfile?.gender}
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
                        value={customerDetail?.personalProfile?.maritalStatus}
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
                        value={customerDetail?.personalProfile?.raceDescription}
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
                        value={customerDetail?.personalProfile?.emailAddress}
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
                        value={
                          customerDetail?.personalProfile?.mothersMaidenName
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
                        value={
                          customerDetail?.residentialAddress?.residentAddress1
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
                        Address Line 2
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={
                          customerDetail?.residentialAddress?.residentAddress2
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
                        Postal Code
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={
                          customerDetail?.residentialAddress?.residentPostcode
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
                      <label className="KYCViewCustomer-label">City</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={
                          customerDetail?.residentialAddress?.residentCityCode
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
                      <label className="KYCViewCustomer-label">State</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={
                          customerDetail?.residentialAddress?.residentStateCode
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
                      <label className="KYCViewCustomer-label">Country</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={
                          customerDetail?.residentialAddress
                            ?.residentCountryCode
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
                        value={customerDetail?.mailingAddress?.mailAddress1}
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
                        value={customerDetail?.mailingAddress?.mailAddress2}
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
                        value={customerDetail?.mailingAddress?.mailPostcode}
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
                        value={customerDetail?.mailingAddress?.mailCityCode}
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
                        value={customerDetail?.mailingAddress?.mailStateCode}
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
                        value={customerDetail?.mailingAddress?.mailCountryCode}
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
                        value={
                          customerDetail?.employerProfile?.occupationDescription
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
                        Nature of Job
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={
                          customerDetail?.employerProfile
                            ?.natureOfBusinessDescription
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
                        Company Name
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.employerProfile?.companyId}
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
                        value={
                          customerDetail?.employerProfile?.natureOfEmployment
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
                        value={
                          customerDetail?.idDocumentsProfile?.nationalityCode
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
                        value={customerDetail?.idProfile?.idValue}
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
                        value={
                          customerDetail?.idDocumentsProfile?.nationalityCode
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
                        Issue Date
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.idProfile?.newIdDate}
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
                        value={customerDetail?.idProfile?.newIdExpiryDate}
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
                        value={
                          customerDetail?.idProfile?.immigrationVisaExpiryDate
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
                      <label className="KYCViewCustomer-label">PR Status</label>
                    </div>
                    <div className="col me-2">
                      <div className="my-1">
                        <Switch
                          disabled
                          className="toggle-switch KYC-CustomerToggle"
                          checkedChildren="Yes"
                          unCheckedChildren="NO"
                          checked={
                            customerDetail?.idProfile?.prStatus === "Y"
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
                        KYC Indicator
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
                            customerDetail?.idProfile?.isDocumentOriginal === "Y"
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
                        value={customerDetail?.cardProfile?.walletType}
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
                      <label className="KYCViewCustomer-label">Card Type</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.cardProfile?.cardType}
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
                        value={customerDetail?.cardProfile?.cardCrn}
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
                        value={customerDetail?.cardProfile?.preferredCardName}
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
                        value={customerDetail?.cardProfile?.cardUrn}
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
                        Purpose Of Card
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.cardProfile?.purposeOfCard}
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
                        value={customerDetail?.codeDetails?.sourceCode}
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
                        value={customerDetail?.codeDetails?.promoCode}
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
                        value={customerDetail?.codeDetails?.salesCode}
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
                        value={customerDetail?.codeDetails?.agentCode}
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
                        Branch Code
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.codeDetails?.branchCode}
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
                        value={customerDetail?.codeDetails?.referralCode}
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
                        value={customerDetail?.codeDetails?.referredCode}
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
                        Ecommerce TXN
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
                            customerDetail?.transactionDetails?.optInOutEcom ===
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
                        Overseas Retail TXN
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
                            customerDetail?.transactionDetails
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
                        Overseas Cash TXN
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
                            customerDetail?.transactionDetails
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
                        Direct Debit TXN
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
                            customerDetail?.transactionDetails
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
                      <label className="KYCViewCustomer-label">MOTO TXN</label>
                    </div>
                    <div className="col me-2">
                      <div className=" my-1">
                        <Switch
                          disabled
                          className="toggle-switch KYC-CustomerToggle"
                          checkedChildren="Yes"
                          unCheckedChildren="NO"
                          checked={
                            customerDetail?.transactionDetails?.optInOutMoto ===
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
                        value={customerDetail?.riskProfile?.pepsMatch}
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
                        value={customerDetail?.riskProfile?.msslMatch}
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
                        value={customerDetail?.riskProfile?.sanctionMatch}
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
                        Source of Fund
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.riskProfile?.sourceOfFund}
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
                        Source of Wealth
                      </label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.riskProfile?.sourceOfWealth}
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
              eventKey="6"
              header="Bank Profile"
              print={isPrint}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-9 d-flex">
                  <div className="col-4 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">Bank Name</label>
                    </div>
                    <div className="col me-2">
                      <input
                        className="border-0 edit-sum-input form-control"
                        type="text"
                        value={customerDetail?.bankProfile?.bankName}
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
                        value={customerDetail?.bankProfile?.bankAccountNo}
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
                        value={customerDetail?.bankProfile?.customerName}
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
                        value={customerDetail?.bankProfile?.rppAccountName}
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
                        value={customerDetail?.bankProfile?.rppCheckTimeStamp}
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
        </div>
      </CommonEditSummary>
    </div>
  );
}

export default KYCViewCustomerProfile;
