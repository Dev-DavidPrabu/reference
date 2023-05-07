import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CustomDND from "../CustomDragDrop/CustomDND";

function CustomDNDPopup(props: any) {
  const [manageHeader, setManageHeader] = useState(props.items || []);
  let updatedHeader = manageHeader.filter(
    (item: any) => item.title !== "Manage"
  );
  useEffect(() => {
    setManageHeader(props.items || []);
  }, [props.items]);
  return (
    <div>
      <Modal isOpen={props.isOpen} centered={true}>
        <ModalHeader className="modalpop-title">Table Columns</ModalHeader>
        <ModalBody>
          <div>
            <CustomDND
              items={updatedHeader}
              onSubmit={props.onSubmit}
              onCancel={props.onCancel}
              buttonText={props.buttonText}
            />
            {props.error && <div>{"*please select anyone column"}</div>}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CustomDNDPopup;
