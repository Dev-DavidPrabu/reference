import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteConfirmationModalObjects } from '../../models/DeleteConfirmationModel';
import CustomButton from '../UI/CustomButton';



const DeleteConfirmation:React.FC<deleteConfirmationModalObjects> = (props: deleteConfirmationModalObjects) => {
    return (
        <Modal isOpen={props.deleteConfirmation} size={"sm"} centered={true}>
            <ModalHeader >Delete Record</ModalHeader>
            <ModalBody>
                Are you sure you want to Delete this?
        </ModalBody>
            <ModalFooter>
                <CustomButton color="primary" onClick={() => props.deletePopUpHandler("yes")}>Yes</CustomButton>{' '}
                <CustomButton color="secondary" onClick={() => props.deletePopUpHandler("no")}>No</CustomButton>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteConfirmation;
