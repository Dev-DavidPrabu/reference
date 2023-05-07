import React from 'react'
import "./CustomNavigateDashBoard.scss"

const CustomNavigateDashBoard = (props:any) => {
  return (
    <>
    <div className="col d-flex mb-4 mt-4">
      <div className="col-6 d-flex">
        <button
          type="button"
          className={`current-page-agentGroup border-0 p-1 ${
            props.page === "agentGroup"
              ? "custom-page-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("agentGroup")}
        >
          Agent Group
        </button>
        <button
          type="button"
          className={`current-page-branchPage border-0 p-1 ms-3 ${
            props.page === "branchPage"
              ? "custom-page-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("branchPage")}
        >
          Branch
        </button>
        <button
          type="button"
          className={`current-page-eTerminal border-0 ms-3 p-1 ${
            props.page === "eTerminal"
              ? "custom-page-arrow text-white"
              : "text-bold"
          }`}
          onClick={() => props.onClick("eTerminal")}
        >
          E-Terminal
        </button>
      </div>
    </div>
</>

  )
}

export default CustomNavigateDashBoard