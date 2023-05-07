import { useState } from "react";
import { Input } from "reactstrap";
import CustomButton from "./CustomButton";
import "./ApproveAction.scss"

const ApproveAction = (props: any) => {
  const [comments, setcomments] = useState("");
  return (
    <div className="approve-container mt-3 p-3 approve-position">
      <div className="d-flex btn-alig">
      { props.isCompany!=='company'&& <><select
          className="form-select approve-container-drop p-1"
          defaultValue={"Approve Action"}
        ></select>
        <Input
          type="text"
          placeholder="Comment"
          className="ms-1 approve-container-comment"
          value={comments}
          onChange={(e) => setcomments(e.target.value)}
        /></>}
        <CustomButton
          id="submit"
          color=""
          className="me-4 text-white approve-container-submit subhover"
          onClick={() => props.onSubmit(comments)}
        >
          {props.Submit ? "Submit" : "Approve"}
        </CustomButton>

        <CustomButton
          id="cancel"
          color=""
          className="approve-container-cancel cancelhover"
          onClick={() => props.onCancel()}
        >
          {props.Cancel ? "Cancel" : "Reject"}
        </CustomButton>
      </div>
    </div>
  );
};

export default ApproveAction;
