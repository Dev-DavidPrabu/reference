import React, { useEffect, useState } from "react";

import { TiArrowBackOutline } from "react-icons/ti";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  approveDebitCredit,
  approveDebitCreditReset,
} from "../../redux/action/ManualDebitCreditAction";
import { useHistory, useLocation } from "react-router";
import { Button, Input, Label } from "reactstrap";
import { useDispatch } from "react-redux";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

interface LocationState {
  approverComments: string;
  approveDate: string;
  approverName: string;
  initiatorComments: string;
  initiatorName: string;
  expectedBalance: string;
  currentBalance: string;
  transactionReference: string;
  transactionDate: string;
  companyName: string;
  id: string;
}
function ViewManualDebitCredit() {
  const location: any = useLocation<LocationState>();
  const dispatch = useDispatch();
  const [level, setlevel] = useState("");
  const history = useHistory();
  const [status, setStatus] = useState("Approve");
  const [reason, setReason] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const UserAccess = useSelector(
    (state: RootStateOrAny) => state.CardUnBlockReducer?.getUserAccessResponse
  );
  const state = useSelector(
    (state: any) => state.ManualDebitCreditReducer.getDebitCreditApprove
  );
  const handle_Cancel = () => {
    history.goBack();
  };

  let makerAdd = false,
    makerView = false,
    checkerLevelOne = false,
    checkerLevelTwo = false,
    checkerLevelThree = false;

  let accessData = UserAccess?.data;

  accessData?.forEach((res: any) => {
    res?.add === true && (makerAdd = true);
    res?.view === true && (makerView = true);
    res?.approvalLevelOne === true && (checkerLevelOne = true);
    res?.approvalLevelTwo === true && (checkerLevelTwo = true);
    res?.approvalLevelThree === true && (checkerLevelThree = true);
  });

  useEffect(() => {
    if (checkerLevelOne) {
      setlevel("1");
    } else if (checkerLevelTwo) {
      setlevel("2");
    } else {
      setlevel("3");
    }
  }, [checkerLevelOne, checkerLevelTwo, checkerLevelThree]);

  const handleSubmit = (status: any, reason: any) => {
    dispatch(
      approveDebitCredit(
        location.state.id,
        status.toUpperCase(),
        reason,
        level,
        history
      )
    );
  };

  useEffect(() => {
    if (state.error !== undefined) {
      setApiMessage(state.error);
    }
  }, [state]);

  const handleClose = () => {
    setApiMessage("");
    dispatch(approveDebitCreditReset());
  };

  return (
    <div className="p-4">
      <div className="d-flex">
        <h1 className="text-bold edit-summary-title">
          Manual Credit / Debit - View
        </h1>
        <div className={"d-flex commonEdit-BackButton"} onClick={handle_Cancel}>
          <TiArrowBackOutline style={{ margin: "auto 5px" }} /> Back
        </div>
      </div>

      <div
        className="target-group-body p-4"
        style={{ maxHeight: "fit-content" }}
      >
        <CustomResponseMessage
          apiStatus={false}
          closeMessage={handleClose}
          message={apiMessage}
        />
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-12 d-flex">
              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">UID</label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.id ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-3 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Company Name</label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.companyName ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-12 d-flex">
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Transaction Date
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.transactionDate ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Transaction Ref No
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.transactionReference ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Transaction Amount
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.transactionAmount ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Transaction Type
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.transactionType ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Current Balance
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.currentBalance ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>{" "}
              {/* <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Expected Balance
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges merchant-fontSize"
                    value={location?.state?.expectedBalance ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-12 d-flex">
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Maker Name</label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.initiatorName ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
              {console.log(
                location?.state,
                "location?.statelocation?.statelocation?.state"
              )}
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Maker Date</label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.initiatorDate ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Maker Comments
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.initiatorComments ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="col-12 d-flex">
              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Approver Name</label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.approverName ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-2 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">Approve Date</label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.approveDate ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>

              <div className="col-4 me-2">
                <div className="col">
                  <label className="KYCViewCustomer-label">
                    Approver Comments
                  </label>
                </div>
                <div className="col me-4">
                  <Input
                    type="text"
                    className="no-border remit_feesAndCharges"
                    value={location?.state?.approverComments ?? "-"}
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {checkerLevelOne ? (
        <div className="row filteredArea ps-4">
          <div className="col-2">
            <Input
              type="select"
              name=""
              className="form-select btn--sizer"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="col-2">
            <Button
              color="danger"
              //disabled={!props.disableCustomRowSelection}
              className="customApproval"
              onClick={() => handleSubmit(status, reason)}
            >
              Submit
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ViewManualDebitCredit;
