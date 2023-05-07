import React from "react";
import { Switch } from "antd";

import { TiArrowBackOutline } from "react-icons/ti";

import { useHistory, useLocation } from "react-router";

function ViewPromoCode() {
  const history = useHistory();
  const location: any = useLocation();

  const handle_Cancel = () => {
    history.goBack();
  };
  return (
    <div className="ViewPromoCode">
      <div className="p-4">
        <div className="d-flex">
          <h1 className="text-bold edit-summary-title">
            View Promo Code - {location?.state?.value?.promotionType}
          </h1>
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
          <form>
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Promo Name
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.promoName}
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
                        Promo Code{" "}
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.promoCode}
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
                        Valid From{" "}
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.validFrom}
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
                      <label className="KYCViewCustomer-label">Valid To </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.validTo}
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
                        First Time Transaction
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        disabled
                        className="toggle-switch KYC-CustomerToggle"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={location?.state?.value?.firstTimeTransaction}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2 d-flex">
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Multiple Use{" "}
                        </label>
                      </div>
                      <div className="col me-4">
                        <Switch
                          disabled
                          className="toggle-switch KYC-CustomerToggle"
                          checkedChildren="Yes"
                          unCheckedChildren="NO"
                          checked={location?.state?.value?.multipleUse}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          No.of Use<span className="span-col">*</span>
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={location?.state?.value?.multipleUseCount?.toString()}
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
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Total Redemptions Per Promo{" "}
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.totalPromoValue}
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
                        Value Per Remit{" "}
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.promoValue}
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
                        Free Service Charge
                      </label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        disabled
                        className="toggle-switch KYC-CustomerToggle"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={location?.state?.value?.freeServiceCharge}
                      />
                    </div>
                  </div>
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">
                        Type Of Promo{" "}
                      </label>
                    </div>
                    <div className="col me-4">
                      <input
                        className="border-0 form-control"
                        type="text"
                        value={location?.state?.value?.promotionType}
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
                  {location?.state?.value?.promotionType === "GROUP" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Group Name{" "}
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={
                            location?.state?.value?.promoCodeUserResponse
                              ?.groupName
                          }
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
                  )}
                  {location?.state?.value?.promotionType === "INDIVIDUAL" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Customer Name{" "}
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={
                            location?.state?.value?.promoCodeUserResponse
                              ?.customerName
                          }
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
                  )}
                  {location?.state?.value?.promotionType === "BIRTHDAY" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          BirthDay Month{" "}
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={
                            location?.state?.value?.birthDayMonthDescription
                          }
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
                  )}
                  {location?.state?.value?.promotionType !== "OPEN" && (
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Notification Id For Remittance
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={location?.state?.value?.notificationId}
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
                  )}
                </div>
              </div>

              {location?.state?.value?.promotionType === "GROUP" && (
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="col-12 d-flex">
                    <div className="col-3 me-2">
                      <div className="col">
                        <label className="KYCViewCustomer-label">
                          Reciever Country
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={
                            location?.state?.value?.payoutCountryDescription
                          }
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
                          Payment Method
                        </label>
                      </div>
                      <div className="col me-4">
                        <input
                          className="border-0 form-control"
                          type="text"
                          value={location?.state?.value?.payoutModeDescription}
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
                    {location?.state?.value?.payoutMode === "1" && (
                      <div className="col-3 me-2">
                        <div className="col">
                          <label className="KYCViewCustomer-label">
                            Payout Bank
                          </label>
                        </div>
                        <div className="col me-4">
                          <input
                            className="border-0 form-control"
                            type="text"
                            value={
                              location?.state?.value?.payoutBankDescription
                            }
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
                    )}
                    {location?.state?.value?.payoutMode === "2" && (
                      <div className="col-3 me-2">
                        <div className="col">
                          <label className="KYCViewCustomer-label">
                            Cash Pickup Agent
                          </label>
                        </div>
                        <div className="col me-4">
                          <input
                            className="border-0 form-control"
                            type="text"
                            value={
                              location?.state?.value?.pickUpAgentDescription
                            }
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
                    )}
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="col-12 d-flex">
                  <div className="col-3 me-2">
                    <div className="col">
                      <label className="KYCViewCustomer-label">Activate</label>
                    </div>
                    <div className="col me-4">
                      <Switch
                        disabled
                        className="toggle-switch KYC-CustomerToggle"
                        checkedChildren="Yes"
                        unCheckedChildren="NO"
                        checked={location?.state?.value?.activate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ViewPromoCode;
