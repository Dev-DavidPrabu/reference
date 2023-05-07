import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./AddParameterButton.scss";
import { Menu, Dropdown, Tooltip } from "antd";
import { useEffect, useState } from "react";

const AddParameterButton = (props: any) => {
  const [parameterDetail, setparameterDetail] = useState({
    parameters: "",
    content: "",
  });
  const [dropDown, setDropDown] = useState(false);
  let location = props.parameters;
  useEffect(() => {
    if (location !== undefined) {
      setparameterDetail(props);
    }
  }, [location]);
  var parameter = parameterDetail.parameters.split(",");
  const handlePopUp = () => {
    setDropDown(!dropDown);
  };
  const handleOnChange = (_position: any, type: string) => {
    if (checkParameterExist(type)) {
      props.handleContent(type, "remove");
    } else {
      props.handleContent(type, "add");
    }
  };

  const checkParameterExist = (value: string) => {
    return props.content.includes(value); //<input type="checkbox" value={item} onChange={handleCheckBox} checked={checkParameterExist(item)}/>
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" className="text-bold">
        Add Parameter
      </Menu.Item>
      <Menu.Divider />
      {parameter.map((item: any, index: number) => (
        <Menu.Item key={item} className="p-3 d-flex align-items-center">
          {" "}
          <input
            type="checkbox"
            id={`custom-checkbox-${index}`}
            name={item}
            value={item}
            checked={checkParameterExist(item)}
            onChange={() => handleOnChange(index, item)}
          />{" "}
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div className="ms-5">
      <Tooltip title="Parameter">
        <Dropdown overlay={menu} visible={dropDown}>
          <button className="border-0" onClick={handlePopUp}>
            <span className="d-flex text-bold add-button align-items-center justify-content-center text-white">
              <AiOutlineArrowLeft />
              <AiOutlineArrowRight />
            </span>
          </button>
        </Dropdown>
      </Tooltip>
    </div>
  );
};

export default AddParameterButton;
