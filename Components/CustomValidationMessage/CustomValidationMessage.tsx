import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomValidationMessage.scss";

const CustomValidationMessage = (props: any) => {
  return (
    <>
    {props.message && 
    <div className={"mb-1 mt-2 d-flex align-itms-center justify-content-between text-bold validation-message"}>
      <div className="ms-3 mt-1 d-flex align-items-center">
        <span className="validationmessagecolor py-2">
          {props.message}
        </span>
      </div>
      <div className={`validation-hover  d-flex align-items-center me-2 mt-1 fw-100 close close-validationResponse`} onClick={() => props.closeMessage()}>
         <AiOutlineCloseCircle />
      </div>
    </div>
    }
    </>
  );
};
export default CustomValidationMessage;
