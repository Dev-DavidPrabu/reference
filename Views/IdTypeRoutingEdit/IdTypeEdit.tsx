import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createIdType } from "../../redux/action/idTypeRoutingActions";
import { useHistory, useLocation } from "react-router";
import { Input } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";


function IdTypeEdit() {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [editIdData, setIdData] = useState({
    id: location.state.value.id,
    countryCode: location.state.value.countryCode,
    idType: location.state.value.idType,
    routingChannel: location.state.value.routingChannel,
    status: location.state.value.status,
  });

  const onChange_handler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdData({ ...editIdData, [e.target.name]: e.target.value });
  };

  const idTypeSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createIdType(editIdData));
  };
  const handle_Cancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  return (
    <div className="idtype-edit">
      <h1 className="fw-bold container-header mb-4">ID Type Edit</h1> 
      <form onSubmit={idTypeSubmit_handler}>
        <div className="setting2">
          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Country
              </label>
              <Input
                type="text"
                className="idtype-input border-0 referenceData-readOnly"
                style={{ width: "40%" }}
                value={location.state.value.countryCode}
                readOnly={true}
              />
            </div>
          </>
          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                ID Type
              </label>
              <Input
                type="text"
                className="idtype-input border-0 referenceData-readOnly"
                style={{ width: "40%" }}
                value={location.state.value.idType}
                readOnly={true}
              />
            </div>
          </>

          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Routing Channel<span className="span-col">*</span>
              </label>
              <Input
                type="select"
                name="routingChannel"
                data-testid="routingChannel"
                id="routingChannel"
                className="idtype-input"
                onChange={onChange_handler}
              >
                <option hidden key={0}>
                  {location.state.value.routingChannel}
                </option>
                <option>EKYC Verification</option>
                <option>Pre-Registration</option>
              </Input>
            </div>
          </>

          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Status<span className="span-col">*</span>
              </label>
              <Input
                type="select"
                name="status"
                data-testid="status"
                id="status"
                className="idtype-input"
                onChange={onChange_handler} 
              >
                <option hidden key={0}>
                  {location.state.value.status}
                </option>
                <option>Enable</option>
                <option>Disable</option>
              </Input>
            </div>
          </>

          <div className="idtype-submitButton">
            <CustomButton color="danger Reference-DefaultButton" className="btn2">
              Save
            </CustomButton>
            <CustomButton
              color="secondary referenceData-cancelButton"
              className="btn2"
              component={"payrollEnquiry"}
              onClick={handle_Cancel}
            >
              Cancel
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default IdTypeEdit;
