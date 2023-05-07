import { useCallback, useEffect, useState } from "react";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";
import Select from "react-select";
import CustomButton from "../../Components/UI/CustomButton";
import { useHistory } from "react-router-dom";
import "./BoFunctionalAdd.scss";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Col, Input } from "reactstrap";
import {
  createFunctionCode,
  EditFunctionCode,
  getFunctionalCode,
  resetCreateMessage,
} from "../../redux/action/BoFunctionalcodeAction";
import { Switch } from "antd";
const BOFunctionalCodeAdd = (props: any) => {
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);
  const [idTypeError, setIdTypeError] = useState(false);
  const [createFunctionalAdd, setFunctionalAdd] = useState({
    description: "",
    category: "",
    functionCode: "",
    id: "51222d84-87e7-11ec-a8a3-0242ac12000236",
    entityId: "92af85f3-bc0f-4831-bf6d-956bb9402774",
    appCode: "BO",
    status: "ACTIVE",
    appName: "Security",
  });
  const history = useHistory();
  const FunctionCreateAdd: any = useSelector(
    (state: RootStateOrAny) =>
      state.BoFunctionalcodeReducer?.getFunctionalCodeAddResponse
  );
  const fetchFunctionCode = useCallback(
    (body: any) => () => {
      try {
        dispatch(createFunctionCode(body));
      } catch (err) {}
    },
    [dispatch]
  );
  useEffect(() => {
    if (FunctionCreateAdd) {
      if (FunctionCreateAdd.data) {
        history.push({
          pathname: "/dashboard/Functional-code",
          state: {
            add: true,
          },
        });
      } else if (FunctionCreateAdd.error) {
        setApiMessage(FunctionCreateAdd?.message);
      }
    }
  }, [FunctionCreateAdd]);
  const handle_Cancel = () => {
    history.goBack();
  };
  const closeMessage = () => {
    setApiMessage(false);
  };
  const handleChange = (e: any) => {
    setFunctionalAdd({
      ...createFunctionalAdd,
      [e.target.name]: e.target.value,
    });
  };
  const idTypeSubmit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      dispatch(createFunctionCode(createFunctionalAdd));
    }
  };
  const handleValidate = () => {
    if (
      createFunctionalAdd.description &&
      createFunctionalAdd.category &&
      createFunctionalAdd.functionCode
    ) {
      setIdTypeError(false);
      return true;
    } else {
      setIdTypeError(true);
      return false;
    }
  };
  const handleEnabled = (e: any) => {
    setFunctionalAdd({
      ...createFunctionalAdd,
      ["status"]: e ? "ACTIVE" : "INACTIVE",
    });
  };
  return (
    <div className="Functional-add">
      <h1 className="fw-bold container-header mb-4">Functional Code Create</h1>
      {apiMessage && (
        <CustomResponseMessage
          apiStatus={false}
          message={FunctionCreateAdd?.message}
          closeMessage={closeMessage}
        />
      )}
      <form onSubmit={idTypeSubmit_handler}>
        <div className="setting2">
          <>
            <div className="selectSearch mb-3">
              <label
                className="createReference-label"
                style={{ width: "200px" }}
              >
                Description<span className="span-col">*</span>
              </label>
              <Input
                type="text"
                value={createFunctionalAdd.description}
                name="description"
                onChange={handleChange}
                className="customerScreenReport-input"
              ></Input>
            </div>
          </>
          <>
            <div className="selectSearch mb-3">
              <label
                className="createReference-label"
                style={{ width: "200px" }}
              >
                Category<span className="span-col">*</span>
              </label>
              <Input
                type="text"
                value={createFunctionalAdd.category}
                name="category"
                onChange={handleChange}
                className="customerScreenReport-input"
              ></Input>
            </div>
          </>

          <>
            <div className="selectSearch mb-3">
              <label
                className="createReference-label"
                style={{ width: "200px" }}
              >
                Functional Code<span className="span-col">*</span>
              </label>
              <Input
                type="text"
                value={createFunctionalAdd.functionCode}
                name="functionCode"
                onChange={handleChange}
                className="customerScreenReport-input"
              ></Input>
            </div>
          </>
          <>
            <div className="selectSearch">
              <label
                className="createReference-label"
                style={{ width: "200px" }}
              >
                Status<span className="span-col">*</span>
              </label>
              <Col sm={4}>
                <Switch
                  checkedChildren="ACTIVE"
                  unCheckedChildren="INACTIVE"
                  onChange={(e) => handleEnabled(e)}
                  checked={
                    createFunctionalAdd.status === "ACTIVE" ? true : false
                  }
                />
              </Col>
            </div>
          </>
          {idTypeError && (
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
              color="referenceData-cancelButton"
              className="btn2"
              component={"payrollEnquiry"}
              onClick={handle_Cancel}
            >
              Cancel
            </CustomButton> */}
             <button
                className="container-save border-0 text-white"
              >
                Submit
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
};
export default BOFunctionalCodeAdd;
