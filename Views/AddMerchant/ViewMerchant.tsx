import { Switch } from "antd";
import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { useHistory, useLocation } from "react-router";
import { Input } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";
import CustomInput from "../../Components/UI/CustomInput";

function ViewMerchant() {
  const location: any = useLocation();
  const history = useHistory();

  const handle_Cancel = () => {
    history.goBack();
  };

  return (
    <div className="ViewMerchant">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">View Merchant</h1>
          <div
            className={"d-flex commonEdit-BackButton"}
            onClick={handle_Cancel}
          >
            <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
          </div>
        </div>
        <div
          className="target-group-body p-4"
          style={{ maxHeight: "fit-content" }}
        >
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-12 d-flex">
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant Code<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantCode}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant Name<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantName}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-2 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Activation Date<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantActivationDate}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-2 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Approval Date<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantApprovalDate}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant Phone No<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantPhoneNumber}
                      style={{
                        background: "#CFCFCF",
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
              <div className="col-12 d-flex">
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant Address
                      <span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantAddress}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Longitude<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantLongitude}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Latitude<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantLatitude}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2 d-flex">
                  <div className="col-6">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Start Time<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-3">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.operationStartHour}
                        style={{
                          background: "#CFCFCF",
                          borderRadius: "0px",
                          height: "35px",
                        }}
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        End Time<span className="span-col">*</span>
                      </label>
                    </div>
                    <div className="col me-3">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.operationEndHour}
                        style={{
                          background: "#CFCFCF",
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

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="col-12 d-flex">
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Np of Branches<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.noOfBranch}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Contact Person
                      <span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.contactPerson}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Contact Number<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.contactNumber}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Contact Person Email<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.contactPersonEmail}
                      style={{
                        background: "#CFCFCF",
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
              <div className="col-12 d-flex">
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant Status
                      <span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <Switch
                      className="toggle-switch"
                      checkedChildren="YES"
                      unCheckedChildren="NO"
                      checked={location?.state?.value?.merchantStatus}
                    />
                  </div>
                </div>

                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant Category<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.merchantCategory}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      MERS Code<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.mirsCode}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Old Registration Code<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.oldRegistrationCode}
                      style={{
                        background: "#CFCFCF",
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
              <div className="col-12 d-flex">
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Super Merchant
                      <span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <Switch
                      className="toggle-switch"
                      checkedChildren="Yes"
                      unCheckedChildren="NO"
                      checked={location?.state?.value?.isSuperMerchant}
                    />
                  </div>
                </div>

                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Merchant
                      <span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <Switch
                      className="toggle-switch"
                      checkedChildren="Yes"
                      unCheckedChildren="NO"
                      checked={location?.state?.value?.isMerchant}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Company Registration No<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.companyRegistrationNumber}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Company Expiry Date<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.companyExpiryDate}
                      style={{
                        background: "#CFCFCF",
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
              <div className="col-12 d-flex">
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Business Registration No
                      <span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.businessRegistrationNumber}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>

                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Business Expiry Date<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.businessExpiryDate}
                      style={{
                        background: "#CFCFCF",
                        minWidth: "150px",
                        borderRadius: "0px",
                        height: "35px",
                      }}
                      readOnly={true}
                    />
                  </div>
                </div>
                <div className="col-3 me-2">
                  <div className="col">
                    <label className="KYCViewCustomer-label">
                      Income Tax No<span className="span-col">*</span>
                    </label>
                  </div>
                  <div className="col me-4">
                    <input
                      className="border-0 form-control"
                      type="text"
                      value={location?.state?.value?.incomeTaxNumber}
                      style={{
                        background: "#CFCFCF",
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
        </div>
      </div>
    </div>
  );
}

export default ViewMerchant;
