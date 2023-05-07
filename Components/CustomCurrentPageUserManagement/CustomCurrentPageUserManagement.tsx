import "./CustomCurrentPageUserManagement.scss";
import { TiArrowBackOutline } from "react-icons/ti";
import CustomButton from "../../Components/UI/CustomButton";
import { useHistory } from "react-router-dom";

const CustomCurrentPageUserManagement = (props: any) => {
  const history = useHistory();
  return (
    <div
      className="col d-flex mb-4 mt-4"
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <div className="col-8 d-flex">
        <button
          type="button"
          className={`current-page-lock customer-navigate-height border-0 p-1  ${
            props.page === "customer-mobile-device"
              ? "page-bottom-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("customer-mobile-device")}
        >
          Unlock Mobile or Device
        </button>
        <button
          type="button"
          className={`current-page-lock customer-navigate-height border-0 p-1 ms-3 ${
            props.page === "customer"
              ? "page-bottom-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("customer")}
        >
          Customer Login Records
        </button>
        <button
          type="button"
          className={`current-page-lock customer-navigate-height border-0 p-1 ms-3 ${
            props.page === "lock" ? "page-bottom-arrow text-white" : "text-bold"
          }`}
          onClick={() => props.onClick("lock")}
        >
          Account/Device History
        </button>
      </div>
      <CustomButton className="backBtnDevice" onClick={history.goBack}>
        <TiArrowBackOutline style={{ margin: "auto 5px" }} />
        Back
      </CustomButton>
    </div>
  );
};

export default CustomCurrentPageUserManagement;
