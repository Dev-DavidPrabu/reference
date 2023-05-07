import React from 'react'
import './PayrollCommonHeader.scss'
const PayrollCommonHeader = (props:{children:React.ReactNode}) => {
    return (
            <div className="payroll-header-heading">
                <h3 data-testid="header-title">{props.children}​</h3>
            </div>
    )
}

export default PayrollCommonHeader;
