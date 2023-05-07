import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import './CustomMerchantSummary.scss'
const CustomMerchantSummary = (props: any) => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-between mb-4 mt-4">
      <div className="col d-flex">
        <div className="col-6 d-flex">
          <button
            type="button"
            className={`current-page-MerchantHQ border-0 p-1 ${
              props.page === "Merchant-summary-HQ"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("Merchant-summary-HQ")}
          >
            Merchant Summary HQ
          </button>
          <button
            type="button"
            className={`current-page-Merchant-branch border-0 p-1 ms-3 ${
              props.page === "Merchant-branch"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("Merchant-branch")}
          >
          Merchant Branch
          </button>
          <button
            type="button"
            className={`current-page-userRights border-0 ms-3 p-1 ${
              props.page === "userRights"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("userRights")}
          >
           Merchant Teller
          </button>
        </div>
      </div>
      <div>
        <CustomButton className="backBtnDevice" onClick={history.goBack}>
          <TiArrowBackOutline style={{ margin: "auto 5px" }} />
          Back
        </CustomButton>
      </div>
    </div>
  );
};

export default CustomMerchantSummary;
