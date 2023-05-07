import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import "./CustomAccordion.scss";

function CustomAccordion(props: any) {
  const [activeArray, setActiveArray]: any = useState([]);
  useEffect(() => {
    if (props.ExpandAll) {
      setActiveArray(["0", "1", "2", "3", "4", "5", "6", "7", "8"]);
    } else {
      setActiveArray([]);
    }
  }, [props.ExpandAll]);

  const expandallhandler = () => {
    if (props.ExpandAll) {
      return (
        <Accordion activeKey={activeArray}>
          <Accordion.Item eventKey={props.eventKey} className="my-2">
            <Accordion.Header>{props.header}</Accordion.Header>
            <Accordion.Body>{props.children}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    } else {
      return (
        <Accordion>
          <Accordion.Item eventKey={props.eventKey} className="my-2">
            <Accordion.Header>{props.header}</Accordion.Header>
            <Accordion.Body>{props.children}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    }
  };

  return <div className="CustomAccordion">{expandallhandler()}</div>;
}

export default CustomAccordion;
