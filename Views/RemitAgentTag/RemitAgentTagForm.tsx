import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "../RemitAgentTag/RemitAgentTag.scss";
import EditToggle from "../../Components/EditSummary/EditToggle/EditToggle";
import { IoArrowUndoOutline } from "react-icons/io5";

const RemitAgentTagForm = (props: any) => {
  const [type, setType] = useState();
  const [enable, setEnable] = useState(false);

  const [agentDetails, setAgentDetails] = useState({
    code: "",
    groupname: "",
    countrycode: "",
    agentcode: "",
    agentname: "",
    paymentmode: "",
    flag: "",
  });
  let location = props.location?.state;
  useEffect(() => {
    if (location !== undefined) {
      if (props.location.state === "") {
        setAgentDetails(agentDetails);
      } else {
        setAgentDetails(props.location.state);
      }
      setType(props.location.action);
    }
  }, [location]);

  const handleEnabled = () => {
    setEnable(!enable);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgentDetails({ ...agentDetails, [e.target.name]: e.target.value });
  };
  const onCancel = () => {
    props.history?.push({ pathname: "/dashboard/remit-setup/Paying-Group" });
  };
  return (
    <div className="p-4">
      <div className="col mb-2">
        <div className="d-flex justify-content-between col-9">
          <h1 className="text-bold remit-agent-title">{"View Paying Group"}</h1>
          <button className="remit-agent-back border-0" onClick={onCancel}>
            <IoArrowUndoOutline />
            Back
          </button>
        </div>
      </div>
      <div className="remit-agent-body p-3">
        {type === "view" ? (
          <div className="d-flex iconDivAgent justify-content-end ">
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
            <label className="remit-agent-label">Paying Group Code </label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-agent-input form-control"
              type="text"
              value={agentDetails.code}
              name=""
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-agent-label">Group Name</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-agent-input form-control"
              type="text"
              value={agentDetails.groupname}
              name=""
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-agent-label">Country Code</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-agent-input form-control"
              type="text"
              name="status"
              onChange={handleChange}
              readOnly={true}
              value={agentDetails.countrycode}
            ></input>
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-agent-label">Pay Agent Code</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-agent-input form-control"
              type="text"
              value={agentDetails.agentcode}
              name=""
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-agent-label">Payment Agent Name</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-agent-input form-control"
              type="text"
              value={agentDetails.agentname}
              name=""
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-agent-label">Payment Mode</label>
          </div>
          <div className="col-5 p-1 ">
            <input
              className="border-0 remit-agent-input form-control"
              type="text"
              value={agentDetails.paymentmode}
              name=""
              readOnly={true}
            />
          </div>
        </div>
        <div className="col d-flex p-1">
          <div className="col-4 p-1">
            <label className="remit-agent-label">Active Flag</label>
          </div>
          <div className="col-5 p-1 ">
            <EditToggle
              isOn={enable}
              handleToggle={handleEnabled}
              onChange={handleChange}
              value={enable}
              name="enabled"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemitAgentTagForm;
