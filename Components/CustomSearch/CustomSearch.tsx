import React, { useState } from "react";
import { FaReply } from "react-icons/fa";
import { Button, Input } from "reactstrap";
import { userDeatailsInfo } from "../../models/UserDetailModal";

function CustomSearch(props: any, _userDetailData: any) {
  const [selectedSearch, setSelectedSearch] = useState("");
  const [searchUserData, setsearchUserData] = useState("");
  const closeSearch = () => {
    setsearchUserData("");
  };

  if (searchUserData && selectedSearch !== "selected") {
    props.userDetailData.data = props.userDetailData.data?.filter(
      (e: any | userDeatailsInfo) => {
        if (
          e[selectedSearch]
            ?.toUpperCase()
            .includes(searchUserData.toUpperCase())
        ) {
          return e;
        }
      }
    );
  }

  return (
    <div className="d-flex user-search mt-3 p-3">
      <select
        className=" form-select user-search-drop ms-2"
        defaultValue={"selected"}
        onChange={(e) => setSelectedSearch(e.target.value)}
      >
        {props.options &&
          props.options.map((e: any) => {
            return <option value={e.value}>{e.Id}</option>;
          })}
      </select>
      <Input
        type="text"
        className="ms-1 user-search-input"
        onChange={(ev) => setsearchUserData(ev.currentTarget.value)}
      />
      <div className="ms-1 ">
        <Button color="danger">Search</Button>
      </div>
      <div>
        <Button
          className="text-white  border-0 ms-1"
          onClick={() => closeSearch()}
        >
          <FaReply />
        </Button>
      </div>
    </div>
  );
}

export default CustomSearch;
