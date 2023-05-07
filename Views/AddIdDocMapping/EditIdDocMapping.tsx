import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useLocation } from "react-router";
import CustomButton from "../../Components/UI/CustomButton";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import {
  resetEditMessage,
  updateIdDocMappingData,
} from "../../redux/action/IdDocMappingAction";
import { Input } from "reactstrap";

function EditIdDocMapping() {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const [idDocMappingError, setidDocMappingError] = useState(false);
  const [apiMessage, setApiMessage] = useState(false);
  const [updateIdDocMapping, setIdDocMapping] = useState({
    id: location?.state?.value?.id,
    entityId: location?.state?.value?.entityId,
    idTypeCode: location?.state?.value?.idTypeCode,
    walletTypeCode: location?.state?.value?.walletTypeCode,
    walletLevelOne: location?.state?.value?.walletLevelOne,
    walletLevelTwo: location?.state?.value?.walletLevelTwo,
    walletLevelThree: location?.state?.value?.walletLevelThree,
  });

  const idDocMappingEditError: any = useSelector(
    (state: RootStateOrAny) =>
      state.IdDocMappingReducer.getIdDocMappingEditError
  );

  useEffect(() => {
    if (idDocMappingEditError?.message) {
      setApiMessage(true);
      setTimeout(function () {
        setApiMessage(false);
        dispatch(resetEditMessage());
      }, 3500);
    }
  }, [idDocMappingEditError]);

  const handleValidate = () => {
    if (
      updateIdDocMapping.walletLevelOne.length &&
      updateIdDocMapping.walletLevelTwo.length &&
      updateIdDocMapping.walletLevelThree.length
    ) {
      setidDocMappingError(false);
      return true;
    } else {
      setidDocMappingError(true);
      return false;
    }
  };

  const Wallet_onChange_handler = (e: any) => {
    setIdDocMapping({ ...updateIdDocMapping, [e.target.name]: e.target.value });
  };

  const idTypeSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      dispatch(updateIdDocMappingData(updateIdDocMapping));
    }
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  const handle_Cancel = () => {
    history.goBack();
  };

  return (
    <div className="EditIdDocMapping p-4">
      <h1 className="fw-bold container-header mb-4">
        Brand - ID Doc Mapping Edit
      </h1>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={false}
          message={idDocMappingEditError?.message}
          closeMessage={closeMessage}
        />
      )}
      <form onSubmit={idTypeSubmit_handler}>
        <div className="setting2">
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Brand<span className="span-col">*</span>
              </label>
              <Input
                type="text"
                className="idtype-input border-0 referenceData-readOnly"
                style={{ width: "40%" }}
                value={location?.state?.value?.walletTypeCode}
                readOnly={true}
              />
            </div>
          </>
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                ID Type Name<span className="span-col">*</span>
              </label>
              <Input
                type="text"
                className="idtype-input border-0 referenceData-readOnly"
                style={{ width: "40%" }}
                value={location?.state?.value?.idTypeCode}
                readOnly={true}
              />
            </div>
          </>

          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                L1 Wallet<span className="span-col">*</span>
              </label>
              <Input
                type="select"
                name="walletLevelOne"
                data-testid="status"
                id="walletLevelOne"
                className="idtype-input"
                onChange={Wallet_onChange_handler}
              >
                <option hidden key={0}>
                  {location.state.value.walletLevelOne}
                </option>
                <option>ORIGINAL</option>
                <option>PHOTOCOPY</option>
                <option>NOT ALLOWED</option>
              </Input>
            </div>
          </>

          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                L2 Wallet<span className="span-col">*</span>
              </label>
              <Input
                type="select"
                name="walletLevelTwo"
                data-testid="status"
                id="walletLevelTwo"
                className="idtype-input"
                onChange={Wallet_onChange_handler}
              >
                <option hidden key={0}>
                  {location.state.value.walletLevelTwo}
                </option>
                <option>ORIGINAL</option>
                <option>PHOTOCOPY</option>
                <option>NOT ALLOWED</option>
              </Input>
            </div>
          </>
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                L3 Wallet<span className="span-col">*</span>
              </label>
              <Input
                type="select"
                name="walletLevelThree"
                data-testid="status"
                id="walletLevelThree"
                className="idtype-input"
                onChange={Wallet_onChange_handler}
              >
                <option hidden key={0}>
                  {location.state.value.walletLevelThree}
                </option>
                <option>ORIGINAL</option>
                <option>PHOTOCOPY</option>
                <option>NOT ALLOWED</option>
              </Input>
            </div>
          </>
          {idDocMappingError && (
            <div
              style={{ color: "red", marginTop: "5px", marginLeft: "180px" }}
            >
              *Please Select Required Fields
            </div>
          )}
          <div className="idtype-submitButton">
            {/* <CustomButton
              color="danger Reference-DefaultButton"
              className="btn2"
            >
              Save
            </CustomButton>
            <CustomButton
              color="secondary referenceData-cancelButton"
              className="btn2"
              component={"payrollEnquiry"}
              onClick={handle_Cancel}
            >
              Cancel
            </CustomButton> */}
            <button
                className="container-save border-0 text-white"
              >
                Save
              </button>
              <button
              type="button"
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={handle_Cancel}
              >
                Cancel
              </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditIdDocMapping;
