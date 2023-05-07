import React from 'react'

function CustomCurrentPageCardType(props:any) {
  return (
    <div className="col d-flex mb-4 mt-4">
            <div className="col-8 d-flex">
                <button type="button" className={`current-page-lock customer-navigate-height border-0 p-1  ${props.page === 'cardType' ? "page-bottom-arrow text-white" : "text-bold"}`} onClick={()=>props.onClick("cardType")}>
                    Card Type
                </button>
                <button type="button" className={`current-page-lock customer-navigate-height border-0 p-1 ms-3 ${props.page === 'sourceCode' ? "page-bottom-arrow text-white" : "text-bold"}`} onClick={()=>props.onClick("sourceCode")}>
                    Source Code
                </button>
                <button type="button" className={`current-page-lock customer-navigate-height border-0 p-1 ms-3 ${props.page === 'promoCode' ? "page-bottom-arrow text-white" : "text-bold"}`} onClick={()=>props.onClick("promoCode")}>
                    Promo Code
                </button>
                <button type="button" className={`current-page-lock customer-navigate-height border-0 p-1 ms-3 ${props.page === 'linkage' ? "page-bottom-arrow text-white" : "text-bold"}`} onClick={()=>props.onClick("linkage")}>
                    Linkage
                </button>
            </div>
        </div>
  )
}

export default CustomCurrentPageCardType