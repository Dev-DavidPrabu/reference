import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader,Label } from "reactstrap";
import "./CustomFieldListPopup.scss";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "../UI/CustomButton";
import CustomLIstPopup from "./CustomLIstPopup";

function CustomFieldListPopup(props: any) {
  const [list, setList] = useState(props.items);
  const [nullError, setNullError] = useState("");

  const [manageHeader, setManageHeader] = useState(props.items || []);
  let updatedHeader = manageHeader.filter(
    (item: any) => item.title !== "Manage"
  );
  useEffect(() => {
    setManageHeader(props.items || []);
  }, [props.items]);

  const submitHandler = () => {
    let items = list;
    let filteredData = items.filter((item: any) => item.checked === true);
    if (filteredData.length > 0) {
      setNullError("");
      props.onSubmit(filteredData, list);
    } else {
      setNullError("*Select Atleast One Column");
    }
  };
  return (
    <div>
      <Modal isOpen={props.isOpen} centered={true} className="modalPosition">
        <ModalHeader className="listModalPop-title bodyColor">
          <span className="ms-2 fw-bold listModalPop-title">Field List</span>
          <span className="closeIconFieldList cursor">
            <AiOutlineClose onClick={props.onCancel} />
          </span>
        </ModalHeader>
        <ModalBody>
          <div>
            <CustomLIstPopup
              items={updatedHeader}
              buttonText={props.buttonText}
            />
            {props.error && <div>{"*please select anyone column"}</div>}
          </div>
        </ModalBody>
        {nullError && <Label className="error-text-red">{nullError}</Label>}
        <ModalFooter className="bodyColorFooter">
          

          <div className="mt-3 d-flex justify-content-evenly">
            <CustomButton
              className="me-3"
              color="danger"
              onClick={submitHandler}
            >
             Submit
            </CustomButton>
            <CustomButton onClick={props.onCancel}>Reset</CustomButton>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CustomFieldListPopup;
