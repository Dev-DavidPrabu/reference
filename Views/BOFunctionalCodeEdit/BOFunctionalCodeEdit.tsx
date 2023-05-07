import { Input } from "reactstrap";
import CustomButton from "../../Components/UI/CustomButton";
import { useHistory, useLocation } from "react-router";
import './BoFunctionalCodeEdit.scss'
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { EditFunctionCode, resetCreateMessage } from "../../redux/action/BoFunctionalcodeAction";
import CustomResponseMessage from "../../Components/UI/ApiResponse/CustomResponseMessage";

const BoFunctionalCodeEdit = () =>{
  const location: any = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState(false);

  const [editFunctionalData, setFunctionalData] = useState({
    description: location.state.value.description,
    category: location.state.value.category,
    functionCode: location.state.value.functionCode,
    id:location.state.value.id,
    entityId:location.state.value.entityId,
    status:location.state.value.status, 
    appCode:location.state.value.appCode
  });

  const FunctionCodeEdit: any = useSelector(
    (state: RootStateOrAny) => state.BoFunctionalcodeReducer?.getFunctionalCodeEditResponse
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
    setFunctionalData({ ...editFunctionalData, [e.target.name]: e.target.value });
    
  };
  const Submit_handler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(EditFunctionCode(editFunctionalData));
  };

  useEffect(()=>{
    if(FunctionCodeEdit){
      if(FunctionCodeEdit.data){
        history.push({
          pathname: "/dashboard/Functional-code",
          state: {
            add:false 
          },
        });
      } else if (FunctionCodeEdit.error) {
        setApiMessage(FunctionCodeEdit?.message);
      }
    }
  }, [FunctionCodeEdit]);
      
   
  const handle_Cancel = (e: React.MouseEvent<HTMLElement>) => {
    history.goBack();
  };
  const closeMessage = () => {
    setApiMessage(false);
  };

    return(
<div className="Functional-edit">
<h1 className="fw-bold container-header mb-4">Functional Code Setup Edit</h1> 
{apiMessage && (
        <CustomResponseMessage
          apiStatus={true}
          closeMessage={closeMessage}
        />
      )} 
<form onSubmit={Submit_handler}>
        <div className="setting2">
          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
                Description
              </label>
              <Input
                type="text"
                className="idtype-input"
                style={{ width: "40%" }}
                name="description"
                value={editFunctionalData.description}
                onChange={handleChange}
              />
            </div>
          </>
          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
              Category
              </label>
              <Input
                type="text"
                className="idtype-input"
                style={{ width: "40%" }}
                value={editFunctionalData.category}
                name="category"
                onChange={handleChange}
              />
            </div>
          </>

          <>
            <div className="setting6 mb-3">
              <label
                className="createReference-label"
                style={{ width: "150px" }}
              >
               Function Code<span className="span-col">*</span>
              </label>
              <Input
               type="text"
               className="idtype-input"
               style={{ width: "40%" }}
               value={editFunctionalData.functionCode}
               name="functionCode"
                onChange={handleChange}
              >
                
              </Input>
            </div>
          </>

          <div className="idtype-submitButton">
            {/* <CustomButton color="danger Reference-DefaultButton" className="btn2">
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
                Submit
              </button>
              <button
                className="container-cancel border-0 ms-3 form-label-font-size"
                onClick={handle_Cancel}
              >
                Cancel
              </button>
          </div>
        </div>
      </form>

</div>
    )
}  
export default BoFunctionalCodeEdit;