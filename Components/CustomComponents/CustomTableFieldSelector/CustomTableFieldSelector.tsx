import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import Select from "react-select";
import "./CustomTableFieldSelector.scss";
import CustomButton from "../../UI/CustomButton";
import CustomDNDPopup from "../CustomDNDPopup/CustomDNDPopup";

const CustomTableFieldSelector = (props: any) => {
  let headerArray: any = props.headers;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [selectedField, setselectedField] = useState([]);
  const [manageHeader, setManageHeader] = useState(props.headers || []);
  let updateHeader = manageHeader.filter(
    (item: any) => item.title !== "Manage"
  );
  const toggle = () => {
    setShowDropdown(!showDropdown);
    setselectedField([]);
  };
  const handleChange = (e: any) => {
    setselectedField(e);
  };
  const cancelHandler = () => {
    setShowDropdown(!showDropdown);
    setselectedField([]);
  };
  const submitHandler = () => {
    setShowDropdown(!showDropdown);
    props.submit(selectedField);
  };
  const checkboxSubmit = (filteredItems: any, orginalList: any) => {
    setshowModal(!showModal);
    props.submit(filteredItems, orginalList);
  };
  const checkboxCancel = () => {
    setshowModal(!showModal);
  };

  const CustomTableFieldSelect = () => (
    <div>
      <Dropdown isOpen={showDropdown} toggle={toggle} className="hide-arrow">
        <DropdownToggle caret>
          <AiFillSetting size="1.5rem" />
        </DropdownToggle>
        <DropdownMenu>
          <div className="px-3 py-3 w-50">
            <Select
              value={selectedField}
              isMulti
              onChange={handleChange}
              options={headerArray}
            />
            <div className="pt-2 d-flex justify-content-around">
              <CustomButton color="danger" onClick={submitHandler}>
                Submit
              </CustomButton>
              &nbsp;&nbsp;&nbsp;
              <CustomButton onClick={cancelHandler}>cancel</CustomButton>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );

  const CheckboxButton = () => (
    <CustomButton
      onClick={() => setshowModal(!showModal)}
      className={props.select && "ms-3"}
    >
      <AiFillSetting size="1.5rem" />
    </CustomButton>
  );

  return (
    <div className="d-flex mb-2">
      {props.select && CustomTableFieldSelect()}
      {props.DND && CheckboxButton()}
      <CustomDNDPopup
        onSubmit={checkboxSubmit}
        onCancel={checkboxCancel}
        items={updateHeader}
        isOpen={showModal}
      />
    </div>
  );
};

export default CustomTableFieldSelector;
