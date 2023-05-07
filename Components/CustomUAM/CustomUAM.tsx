import "./CustomUAM.scss";
import CustomButton from "../../Components/UI/CustomButton";
import { TiArrowBackOutline } from "react-icons/ti";
import { useHistory } from "react-router-dom";

const CustomUAM = (props: any) => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-between mb-4 mt-4">
      <div className="col d-flex">
        <div className="col-6 d-flex">
          <button
            type="button"
            className={`current-page-userGroup border-0 p-1 ${
              props.page === "userGroup"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("userGroup")}
          >
            User Group
          </button>
          <button
            type="button"
            className={`current-page-userPage border-0 p-1 ms-3 ${
              props.page === "userPage"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("userPage")}
          >
            User
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
            User Rights
          </button>
          <button
            type="button"
            className={`current-page-groupRights border-0 p-1 ms-3 ${
              props.page === "groupRights"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("groupRights")}
          >
            Group Rights
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

export default CustomUAM;
