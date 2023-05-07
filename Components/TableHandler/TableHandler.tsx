import React, { useEffect, useState } from "react";
import "./TableHandler.scss";
function TableHandler(props: any) {
  const [dropdown, setdropdown] = useState([]);
  const [selectedData, setselectedData] = useState("");

  useEffect(() => {
    if (props.moduleData !== undefined) {
      let UniqModule= props.moduleData?.filter((value:any, index:number, self:any) =>
      index === self.findIndex((t:any) => (
        t.module === value.module
      ))
    )
    UniqModule?.unshift({ id: 0, module: "All" });
      setdropdown(UniqModule);
    }
  }, [props?.moduleData]);

  return (
    <div>
      <div className="d-flex align-items-center p-3">
        <h5 className="ms-2 m-0 parameter-title">{props.CommonModules}</h5>
        <select
          className="w-25  ms-2 drop-down"
          onChange={(e) => setselectedData(e.target.value)}
        >
          <option hidden key={0} value="All">
            select
          </option>
          {props.isToggle
            ? dropdown.map((items: any) => (
                <option value={items}>{items}</option>
              ))
            : dropdown.map((items: any) => (
                <option value={items.module}>{items.module}</option>
              ))}
        </select>
        <button
          className=" border-0 bg-danger text-white ms-3 btn-view "
          onClick={() => props.View(selectedData)}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default TableHandler;
