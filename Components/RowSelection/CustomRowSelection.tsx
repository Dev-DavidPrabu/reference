import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import "./CustomRowSelection.scss";

const CustomRowSelection = (props: any) => {
  const [status, setStatus] = useState("Approve");
  const [accountStatus, setAccountStatus] = useState("");
  const [accountComment, setComment] = useState("");
  const [upgrade, setUpgrade] = useState("Gold");
  const [reason, setReason] = useState("");
  const [active, setActive] = React.useState(0);

  const statuschangehandler = (e: any) => {
    setStatus(e.target.value);
  };

  const statuschangehandlerUpgrade = (e: any) => {
    setUpgrade(e.target.value);
  };
  const accountStatuschangehandler = (e: any) => {
    setAccountStatus(e.target.value);
  };
  const accountCommentchangehandler = (e: any) => {
    setComment(e.target.value);
  };

  const handleChangeReason = (e: any) => {
    setReason(e.target.value);
  };

  return (
    <>
      {props.approve && (
        <div className="row filteredArea">
          <div className="col-2">
            <Input
              type="select"
              name=""
              className="form-select actiondropdown"
              value={status}
              disabled={!props.disableCustomRowSelection}
              onChange={statuschangehandler}
            >
              <option>Approve</option>
              <option>Retry</option>
              <option value={"Refund"}>Refund & Reject</option>
              <option>Reject</option>
            </Input>
          </div>
          <div className="col-2">
            <Button
              disabled={!props.disableCustomRowSelection}
              className="customApproval"
              onClick={() => props.handleSubmit(status)}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {props.reason && (
        <div className="row filteredArea">
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
          {props.productApprove && (
            <div className="col-5">
              <div className="row">
                <div className="col">
                  <Label className="col mt-2">Product Name Approved</Label>
                </div>
                <div className="col">
                  <Input
                    type="select"
                    name=""
                    className="form-select"
                    value={upgrade}
                    onChange={statuschangehandlerUpgrade}
                  >
                    <option>Gold</option>
                    <option>Silver</option>
                  </Input>
                </div>
              </div>
            </div>
          )}
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
          {props.reasonError && (
            <div className="col-2">
              <p className="reasonErrors">please enter reason</p>
            </div>
          )}
          {props.mobError && (
            <div className="col-2">
              <p className="reasonErrors">
                Please select Original Document status
              </p>
            </div>
          )}
          <div className="col-2">
            <Button
            color="danger"
              disabled={!props.disableCustomRowSelection}
              className="customApproval"
              onClick={() => props.handleSubmit(status, reason, upgrade)}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {props.cancelBtn && (
        <div className="row filteredArea">
          <div className="col-2">
            <Input
              type="select"
              name=""
              className="form-select actiondropdown"
              value={accountStatus}
              onChange={accountStatuschangehandler}
            >
              <option>Approve Action</option>
              <option>Retry</option>
              <option value={"Refund"}>Refund & Reject</option>
              <option>Reject</option>
            </Input>
          </div>
          <div className="col-5">
            <Input
              type="text"
              className=""
              value={accountComment}
              onChange={accountCommentchangehandler}
              placeholder="comments"
            ></Input>
          </div>
          <div className="col-1">
            <Button
              disabled={!props.disableCustomRowSelection}
              className="customSubmit"
              onClick={() =>
                props.handleAccountSubmit(accountStatus, accountComment)
              }
            >
              Submit
            </Button>
          </div>
          <div className="col-1">
            <Button
              className="customCancel"
              onClick={() => props.handleAccountCancel()}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      {props.remarkOnly && (
        <>
          <div className="row filteredArea">
            <div
              className={`d-flex col-2 ${
                props.topupStatus === "DELAYED" ? "" : "d-none"
              }`}
            >
              <div className="bg-info mt-2">
                <Input
                  type="radio"
                  name="reprocess"
                  checked={active === 1}
                  onClick={() => setActive(1)}
                />
              </div>
              <div className="col-4 mt-2">
                <Label>Reprocess</Label>
              </div>
            </div>
            <div
              className={`d-flex col-2 ${
                props.topupStatus === "FAILURE" || "NO_MATCH" ? "" : "d-none"
              }`}
            >
              <div className="col-2 mt-2">
                <Input
                  type="radio"
                  name="reprocess"
                  checked={active === 2}
                  onClick={() => setActive(2)}
                />
              </div>
              <div className="col-4 mt-2">
                <Label>Manual Refund</Label>
              </div>
            </div>
            <div
              className={`d-flex col-2 ${
                props.topupStatus === "FAILURE" || "NO_MATCH" ? "" : "d-none"
              }`}
            >
              <div className="col-2 mt-2">
                <Input
                  type="radio"
                  name="reprocess"
                  checked={active === 3}
                  onClick={() => setActive(3)}
                />
              </div>
              <div className="col-4 mt-2">
                <Label>Manual Credit</Label>
              </div>
            </div>
            <div className="col-1 mt-2">
              <Label>Remarks</Label>
            </div>
            <div className="col-2">
              <Input
                type="text"
                name=""
                className="form-control"
                value={reason}
                onChange={handleChangeReason}
              />
            </div>

            {props.mobError && (
              <div className="col-4">
                <p className="reasonErrors">please select document status</p>
              </div>
            )}
            {props.reasonError && (
              <div className="col-2">
                <p className="reasonErrors">please enter reason</p>
              </div>
            )}

            <div className="col-2">
              <Button
                className="customApproval"
                onClick={() => props.handleSubmit(reason, active)}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomRowSelection;
