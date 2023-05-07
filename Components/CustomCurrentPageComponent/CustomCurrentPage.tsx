import { IoArrowUndoOutline } from "react-icons/io5";
import "./CustomCurrentPage.scss";

const CustomCurrentPage = (props: any) => {
  return (
    <>
      {props.addCustomer ? (
        <div className="d-flex px-4">
          {props.Custom && (
            <>
            <div className="d-flex gap-4">
            <div className="">
                <button
                  type="button"
                  className={`current-page-customer border-0 p-1 ${
                    props.page === "customer"
                      ? "custom-page-arrow text-white"
                      : "text-bold"
                  }`}
                  onClick={() => props.onClick("customer")}
                >
                  Add Customer
                </button>
              </div>
              <div className="">
                <button
                  type="button"
                  className={`current-page-customer border-0 p-1 ${
                    props.page === "bulk"
                      ? "custom-page-arrow text-white"
                      : "text-bold"
                  }`}
                  onClick={() => props.onClick("bulk")}
                >
                  Bulk Upload Customer
                </button>
              </div>
            </div>
              <div className="d-flex flex-grow-1 justify-content-end">
              {props.Back && (
            <div className="">
              <button
                className="back-office-back border-0"
                onClick={props.onBack}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <IoArrowUndoOutline className="" />
                  <span className="mt-1 ms-1">Back</span>
                </div>
              </button>
            </div>
          )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="col d-flex mb-4 mt-4">
          <div className="col-6 d-flex">
            <button
              type="button"
              className={`current-page-payout border-0 p-1 ${
                props.page === "payout"
                  ? "custom-page-arrow text-white"
                  : "text-bold"
              }`}
              onClick={() => props.onClick("payout")}
            >
              <div className="d-flex justify-content-center">Payout Country</div>
            </button>
            <button
              type="button"
              className={`current-page-bank border-0 p-1 ms-3 ${
                props.page === "bank"
                  ? "custom-page-arrow text-white"
                  : "text-bold"
              }`}
              onClick={() => props.onClick("bank")}
            >
              Bank
            </button>
            <button
              type="button"
              className={`current-page-branch border-0 ms-3 p-1 ${
                props.page === "branch"
                  ? "custom-page-arrow text-white"
                  : "text-bold"
              }`}
              onClick={() => props.onClick("branch")}
            >
              Branch
            </button>
            <button
              type="button"
              className={`current-page-agent border-0 py-1 ms-3 ${
                props.page === "agent"
                  ? "custom-page-arrow text-white"
                  : "text-bold"
              }`}
              onClick={() => props.onClick("agent")}
            >
              <div className="d-flex justify-content-center">Paying Group</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCurrentPage;
