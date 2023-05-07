import { useEffect, useRef, useState } from "react";
import { BsEye } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPayrollPrefund,
  viewPrefundList,
} from "../../redux/action/viewPayrollPrefundAction";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import "./ViewPayrollPrefund.scss";
import { approvePayrollPrefundApproval } from "../../redux/action/PayrollPrefundApprovalAction";
import ImagePreview from "../../Components/ImagePreview/ImagePreview";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import { ApiEndPoints } from "../../Constants/Constants";

const ViewPayrollPrefund = () => {
  let userData = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userType = userData?.userInfo?.userType;

  const makerCommentsRef =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const levelOneCommentsRef =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const levelTwoCommentsRef =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const levelThreeCommentsRef =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const location: any = useLocation();
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const [status, setStatus] = useState("Approve");
  const [reason, setReason] = useState("");
  const [level, setLevel] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [isImagePreviewEnable, setIsisImagePreviewEnable] = useState(false);
  const [, setShow] = useState(false);

  const userAccessList: any = useSelector(
    (state: any) => state.TopUpAddReducer.getUserAccessList
  );

  let levelThree = userAccessList?.data?.[0]?.approvalLevelThree;
  let levelTwo = userAccessList?.data?.[0]?.approvalLevelTwo;
  let levelOne = userAccessList?.data?.[0]?.approvalLevelOne;

  const state = useSelector(
    (state: any) => state.ViewPayrollPrefundReducer.viewPrefundResponse
  );

  const errorsMsg = useSelector(
    (state: any) => state.PayrollPrefundApprovalReducer.getPayrollPrefundCompany
  );

  useEffect(() => {
    if (errorsMsg.error !== undefined) {
      setApiMessage(errorsMsg.error);
    }
  }, [errorsMsg]);

  useEffect(() => {
    const data = () => {
      if (level === "3" && state.transactionStatus === "VERIFIED") {
        setShow(true);
      } else if (level === "2" && state.transactionStatus === "CREATED") {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    data();
  }, [level, state.transactionStatus]);

  useEffect(() => {
    if (location && location.state === undefined) {
      history.push("dashboard/PayrollPrefund");
    } else {
      dispatch(viewPrefundList(location.state));
    }
  }, [dispatch, history, location]);

  useEffect(() => {
    if (levelOne === true) {
      setLevel("1");
    } else if (levelTwo === true) {
      setLevel("2");
    } else {
      setLevel("3");
    }
  }, [levelOne, levelTwo, levelThree, userType]);

  useEffect(() => {
    makerCommentsRef.current.style.height = "2rem";
    levelOneCommentsRef.current.style.height = "2rem";
    levelTwoCommentsRef.current.style.height = "2rem";
    levelThreeCommentsRef.current.style.height = "2rem";

    makerCommentsRef.current.style.height = `${makerCommentsRef.current.scrollHeight}px`;
    levelOneCommentsRef.current.style.height = `${levelOneCommentsRef.current.scrollHeight}px`;
    levelTwoCommentsRef.current.style.height = `${levelTwoCommentsRef.current.scrollHeight}px`;
    levelThreeCommentsRef.current.style.height = `${levelThreeCommentsRef.current.scrollHeight}px`;
  }, [state]);

  const handle_Cancel = () => {
    console.log("resetPayrollPrefund");
    dispatch(resetPayrollPrefund());
    history.goBack();
  };

  const statusChangeHandler = (e: any) => {
    setStatus(e.target.value);
  };

  const handleChangeReason = (e: any) => {
    setReason(e.target.value);
  };

  const handleSubmit = (value: any, reason: any) => {
    dispatch(
      approvePayrollPrefundApproval(
        state.id,
        value.toUpperCase(),
        reason,
        level,
        history
      )
    );
  };

  const exitImagePreview = () => {
    setIsisImagePreviewEnable(!isImagePreviewEnable);
  };

  const closeMessage = () => {
    setApiMessage("");
  };

  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <h1 className="text-bold block-card-title">
            {levelOne
              ? "Payroll Prefund - View"
              : "Payroll Prefund Approval - View"}
          </h1>
          <button className="block-card-back border-0" onClick={handle_Cancel}>
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <CustomResponseMessage
        apiStatus={false}
        closeMessage={() => closeMessage()}
        message={apiMessage}
        errorFix={true}
      />
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-12">
          <div className="block-card-view-body p-3">
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col-3">
                    <label className="block-card-view-label">UID</label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state.id}
                    />
                  </div>
                  <div className="col-3">
                    <label className="block-card-view-label">
                      Company Name
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state?.companyName}
                    />
                  </div>
                  <div className="col-3">
                    <label className="block-card-view-label">
                      Designated Bank name
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state?.bankName}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      Bank Transaction Date
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state.transactionDate}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Transaction Ref No
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.transactionReference}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Transaction Amount
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.transactionAmount}
                      />
                    </div>
                  </div>
                  {/* <div className="col ">
                    <label className="block-card-view-label">
                      Current Balance
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.currentBalance}
                      />
                    </div>
                  </div> */}
                  {/* <div className="col ">
                    <label className="block-card-view-label">
                      Expected Balance
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.expectedBalance}
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">Maker Name</label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state.initiatorName}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">Maker Date</label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.initiatorDate}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Maker Comments
                    </label>
                    <div className="col">
                      <textarea
                        ref={makerCommentsRef}
                        className="border-1 block-card-view-inputMobile form-control"
                        readOnly={true}
                        value={state.initiatorComments}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      Proof of Deposit
                    </label>
                    <div
                      className={
                        state?.proofOfReceipt !== ""
                          ? `col viewBtn`
                          : "col disableviewBtn"
                      }
                      style={
                        state?.proofOfReceipt !== "" ? {} : { opacity: 0.7 }
                      }
                      onClick={() => setIsisImagePreviewEnable(true)}
                    >
                      <BsEye className="ms-4" />
                      View
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      L1 Approver Name
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state.levelOneApproverName}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      L1 Approve Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.levelOneApproveDate}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      L1 Approver Comments
                    </label>
                    <div className="col">
                      <textarea
                        ref={levelOneCommentsRef}
                        className="border-1 block-card-view-inputMobile form-control"
                        readOnly={true}
                        value={state.levelOneApproverComments}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      L2 Approver Name
                    </label>
                    <Input
                      type="text"
                      className="border-1 block-card-view-inputMobile form-control"
                      readOnly={true}
                      value={state.levelTwoApproverName}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      L2 Approve Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.levelTwoApproveDate}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      L2 Approver Comments
                    </label>
                    <div className="col">
                      <textarea
                        ref={levelTwoCommentsRef}
                        className="border-1 block-card-view-inputMobile form-control"
                        readOnly={true}
                        value={state.levelTwoApproverComments}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid row p-2">
              <div className="col-12 p-1">
                <div className="row">
                  <div className="col">
                    <label className="block-card-view-label">
                      L3 Approver Name
                    </label>
                    <Input
                      className="border-1 block-card-view-inputMobile form-control"
                      type="text"
                      readOnly={true}
                      value={state.levelThreeApproverName}
                    />
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      L3 Approve Date
                    </label>
                    <div className="col">
                      <Input
                        className="border-1 block-card-view-inputMobile form-control"
                        type="text"
                        readOnly={true}
                        value={state.levelThreeApproveDate}
                      />
                    </div>
                  </div>
                  <div className="col ">
                    <label className="block-card-view-label">
                      L3 Approver Comments
                    </label>
                    <div className="col">
                      <textarea
                        ref={levelThreeCommentsRef}
                        className="border-1 block-card-view-inputMobile form-control"
                        readOnly={true}
                        value={state.levelThreeApproverComments}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {levelOne === true && state.transactionStatus === "INITIATED" ? (
              <div className="row filteredArea ps-4">
                <div className="col-2">
                  <Input
                    type="select"
                    name=""
                    className="form-select btn--sizer"
                    value={status}
                    onChange={statusChangeHandler}
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
                    className="customApproval"
                    onClick={() => handleSubmit(status, reason)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {level === "3" && state.transactionStatus === "VERIFIED" ? (
                  <div className="row filteredArea ps-4">
                    <div className="col-2">
                      <Input
                        type="select"
                        name=""
                        className="form-select btn--sizer"
                        value={status}
                        onChange={statusChangeHandler}
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
                        className="customApproval"
                        onClick={() => handleSubmit(status, reason)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                ) : level === "2" && state.transactionStatus === "CREATED" ? (
                  <div className="row filteredArea ps-4">
                    <div className="col-2">
                      <Input
                        type="select"
                        name=""
                        className="form-select btn--sizer"
                        value={status}
                        onChange={statusChangeHandler}
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
                        className="customApproval"
                        onClick={() => handleSubmit(status, reason)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
          <ImagePreview
            showModal={isImagePreviewEnable}
            imageInfo={state.proofOfReceipt}
            cloudfrontUrl={ApiEndPoints.cloudfrontUrlKyc}
            closeModal={exitImagePreview}
          ></ImagePreview>
        </div>
      </div>
    </div>
  );
};
export default ViewPayrollPrefund;
