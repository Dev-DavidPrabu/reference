import React from "react";
import { IoArrowUndoOutline } from "react-icons/io5";
import './BackButton.scss'



const BackButton = (props: any) => {

    return (
        <>
            <button className="custom-back-button border-0 mb-2" onClick={props.OnClick}>
                <IoArrowUndoOutline />
                Back
            </button>
        </>
    )

}

export default BackButton;