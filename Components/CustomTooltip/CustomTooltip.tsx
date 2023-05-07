import React, { useState } from 'react'
import {Tooltip } from "reactstrap";

function CustomTooltip(props:{target:string,children:string}) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    return (
       
             <Tooltip
                  placement="top"
                  isOpen={tooltipOpen}
                  target={props.target}
                  toggle={toggleTooltip}
                >
                  {props.children}
                </Tooltip>
       
    )
}

export default CustomTooltip
