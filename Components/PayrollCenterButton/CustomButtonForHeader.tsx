
import React from 'react'

const CustomButtonForHeader = (props:any) => {
    return (
        <button data-testid="button-custom-id" className={props.className} onClick={props.onClick}>{props.children}</button>
    )
}

export default CustomButtonForHeader
