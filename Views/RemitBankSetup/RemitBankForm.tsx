import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "../RemitBankSetup/RemitBankSetup.scss";
import { IoArrowUndoOutline } from "react-icons/io5";

const RemitBankForm = (props: any) => {
  const [type, setType] = useState();
  const [enable, setEnable] = useState(false);

  const [bankDetails, setBankDetails] = useState({
    bankCode: "",
    bankName: "",
    countryCode: "",
    id: "",
    payoutAgentCode: "",
    statusCode: "",
  });
  let location = props.location?.state;
  useEffect(() => {
    if (location !== undefined) {
      if (props.location.state === "") {
        setBankDetails(bankDetails);
      } else {
        setBankDetails(props.location.state);
      }
      setType(props.location.action);
    }
  }, [location]);

  const handleEnabled = () => {
    setEnable(!enable);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };
  const onCancel = () => {
    props.history?.push({ pathname: "/dashboard/remit-setup/Bank-Setup" });
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold remit-bank-title">{"View Bank Setup"}</h1>
          <button className="remit-bank-back border-0" onClick={onCancel}>
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="remit-bank-body p-3">
        {type === "view" ? (
          <div className="d-flex iconDivBank justify-content-end ">
            <div>
              <button className="payout-country-viewbutton border-0 text-white">
                <FaRegEdit />
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-end payout-country-message p-2">
            <span> * Indicates mandatory fields</span>
          </div>
        )}
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-bank-label">UID </label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-bank-input form-control"
              type="text"
              value={bankDetails.id}
              name="id"
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-bank-label">Parent Payout Agent Code</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-bank-input form-control"
              type="text"
              value={bankDetails.payoutAgentCode}
              name="payoutAgentCode"
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-bank-label">Bank Code</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-bank-input form-select form-control"
              type="select"
              name="bankCode"
              onChange={handleChange}
              readOnly={true}
              value={bankDetails.bankCode}
            ></input>
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-bank-label">Bank Name</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-bank-input form-control"
              type="text"
              value={bankDetails.bankName}
              name="bankName"
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-bank-label">Country Code</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-bank-input form-control"
              type="text"
              value={bankDetails.countryCode}
              name="countryCode"
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-bank-label">Active Flag</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-bank-input form-control"
              type="text"
              value={bankDetails.statusCode}
              name="statusCode"
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemitBankForm;
