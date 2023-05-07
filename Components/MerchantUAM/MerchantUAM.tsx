import React from "react";

function MerchantUAM(props: any) {
  return (
    <>
      <div className="col d-flex mb-4 mt-4">
        <div className="col-6 d-flex">
          <button
            type="button"
            className={`current-page-userGroup border-0 p-1 ${
              props.page === "merchant"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("merchant")}
          >
            Merchant
          </button>
          <button
            type="button"
            className={`current-page-userPage border-0 p-1 ms-3 ${
              props.page === "merchantBranch"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("merchantBranch")}
          >
            Merchant Branch
          </button>
          <button
            type="button"
            className={`current-page-userRights border-0 ms-3 p-1 ${
              props.page === "merchantTeller"
                ? "custom-page-arrow text-white"
                : "text-bold"
            }`}
            onClick={() => props.onClick("merchantTeller")}
          >
            Merchant Teller
          </button>
        </div>
      </div>
    </>
  );
}

export default MerchantUAM;
