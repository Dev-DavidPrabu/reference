import { useState, DragEvent } from "react";
import { Label } from "reactstrap";
import CustomButton from "../../UI/CustomButton";
import CustomInput from "../../UI/CustomInput";
import "./CustomDND.scss";

const CustomDND = (props: any) => {
  const [list, setList] = useState(props.items);
  const [dragAndDrop, setDragAndDrop] = useState(Object);
  const [nullError, setNullError] = useState("");

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    event.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    const draggedFrom = dragAndDrop.draggedFrom;

    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (_item: any, index: number) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const handleCheck = (e: any, index: number) => {
    let items = list;
    items[index].checked = e.target.checked;

    setList([...items]);
  };

  const submitHandler = () => {
    let items = list;
    let filteredData = items.filter((item: any) => item.checked === true);
    if (filteredData.length > 0) {
      setNullError("");
      props.onSubmit(filteredData, list);
    } else {
      setNullError("*Select Atleast One Column");
    }
  };

  return (
    <section>
      <div>
        {list.map((item: any, index: number) => {
          return (
            <div
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className=" px-2 py-2 d-flex  mb-2"
              style={{ alignItems: "center", cursor: "pointer" }}
            >
              {/* <span className="number">{index + 1}</span> */}
              <div className="float-end">
                <CustomInput
                  type="checkbox"
                  name={item.title}
                  checked={item.checked}
                  disabled={item.disabled}
                  className="table_checkBox"
                  onChange={(e) => handleCheck(e, index)}
                />
              </div>
              <span className="ms-2">{item.title}</span>
            </div>
          );
        })}
      </div>
      {nullError && <Label className="error-text-red">{nullError}</Label>}
      <div className="mt-3 d-flex  pb-2">
        <CustomButton className="me-3 btn--sizer" color="danger" onClick={submitHandler}>
          {props.buttonText ? props.buttonText : "Submit"}
        </CustomButton>
        <CustomButton className="btn--sizer" onClick={props.onCancel}>Cancel</CustomButton>
      </div>
    </section>
  );
};
export default CustomDND;
