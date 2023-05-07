import { AiOutlineCloseCircle } from "react-icons/ai";
import "./CustomResponseMessage.scss";

const CustomResponseMessage = (props: any) => {
  return (
    <>
      {props.message && (
        <div
          className={`mb-1 mt-2 d-flex align-itms-center justify-content-between text-bold ${
            props.apiStatus ? "api-message" : "api-message-error"
          }`}
        >
          <div className="ms-3 mt-1 d-flex align-items-center">
            <span className="apimessagecolor">
              {props.apiStatus
                ? `${props.message}`
                : !props.errorFix
                ? `Error Message ${props.message} `
                : `${props.message}`}
            </span>
          </div>
          <div
            className={`api-hover  d-flex align-items-center me-2 mt-1 fw-100 close ${
              props.apiStatus ? "close-apiResponse" : "close-errorResponse"
            }`}
            onClick={() => props.closeMessage()}
          >
            <AiOutlineCloseCircle />
          </div>
        </div>
      )}
    </>
  );
};
export default CustomResponseMessage;
