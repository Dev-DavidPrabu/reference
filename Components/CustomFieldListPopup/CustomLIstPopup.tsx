import { useState, DragEvent } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import CustomInput from "../../Components/UI/CustomInput";
import "./CustomLIstPopup.scss";

const CustomLIstPopup = (props: any) => {
  const [list, setList] = useState(props.items);
  const [dragAndDrop, setDragAndDrop] = useState(Object);
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

  return (
    <section>
      <div>
        {list.map((item: any, index: number) => {
          return (
            <>
              <div className="row ">
                <div className="col-1 sideBar">
                  <AiOutlineArrowUp />
                  <AiOutlineArrowDown />
                </div>
                <div
                  key={index}
                  data-position={index}
                  draggable
                  onDragStart={onDragStart}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onDragLeave={onDragLeave}
                  className="basePopup py-2 d-flex justify-content-between mb-1 col-10"
                >
                  <div className="float-end">
                    <CustomInput
                      type="checkbox"
                      name={item.title}
                      checked={item.checked}
                      className="wh-20"
                      onChange={(e) => handleCheck(e, index)}
                    />
                    <span className="ms-2 fw-bold">{item.title}</span>
                  </div>
                </div>
                <div className="col-1 sideBarRight">
                  <BsThreeDotsVertical />
                  <BsThreeDotsVertical />
                </div>
              </div>
              <div className="linePopUp"></div>
            </>
          );
        })}
      </div>
    </section>
  );
};
export default CustomLIstPopup;
